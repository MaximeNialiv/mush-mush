import Airtable from 'airtable';
import { AIRTABLE_CONFIG } from '@/config/airtable';
import { 
  AirtableCardRecord, 
  AirtableOptionRecord,
  AirtableUserRecord, 
  AirtableUserCardInteractionRecord,
  AirtableResponse 
} from '@/types/airtable';
import { Card as AirtableCard, Option } from '@/types/cards';
import { Card } from '@/types/card';
import { adaptCardFromAirtable } from '@/adapters/cardAdapter';

// Configuration d'Airtable
console.log('Configuration Airtable:', {
  accessToken: AIRTABLE_CONFIG.accessToken?.slice(0, 10) + '...',
  baseId: AIRTABLE_CONFIG.baseId,
  tables: AIRTABLE_CONFIG.tables
});

if (!AIRTABLE_CONFIG.accessToken || !AIRTABLE_CONFIG.baseId) {
  console.error('❌ Configuration Airtable manquante:', {
    accessToken: !!AIRTABLE_CONFIG.accessToken,
    baseId: !!AIRTABLE_CONFIG.baseId
  });
}

Airtable.configure({
  apiKey: AIRTABLE_CONFIG.accessToken,
  endpointUrl: 'https://api.airtable.com'
});

const base = Airtable.base(AIRTABLE_CONFIG.baseId);

// Fonction utilitaire pour transformer les enregistrements Airtable
const transformAirtableRecord = <T extends { id: string }>(record: any): T => ({
  id: record.id,
  ...record.fields,
  createdTime: record.createdTime || new Date().toISOString(),
});

// Service Cards
export const cardsService = {
  async getAll(): Promise<Card[]> {
    console.log('Starting Airtable API call...');
    console.log('Access Token exists:', !!AIRTABLE_CONFIG.accessToken);
    console.log('Base ID exists:', !!AIRTABLE_CONFIG.baseId);
    
    try {
      const records = await base(AIRTABLE_CONFIG.tables.cards)
        .select()
        .all();
      
      console.log('Airtable records received:', records.length);
      const airtableCards = records.map(record => transformAirtableRecord<AirtableCard>(record));
      console.log('Transformed airtable cards:', airtableCards);
      
      // Récupérer les options pour les quiz
      const quizCards = airtableCards.filter(card => card.type === 'quiz');
      if (quizCards.length > 0) {
        console.log('Fetching quiz options for', quizCards.length, 'quiz cards');
        const options = await optionsService.getByQuizIds(quizCards.map(card => card.id));
        quizCards.forEach(card => {
          const cardOptions = options.filter(opt => opt.quizId === card.id);
          if (cardOptions.length > 0) {
            (card as any).options = cardOptions;
          }
        });
        console.log('Quiz options added to cards');
      }

      // Convertir les cartes Airtable en cartes pour l'application
      const appCards = airtableCards.map(adaptCardFromAirtable);
      console.log('Converted to app cards:', appCards);
      
      // Remplir les childCards pour les cartes de type parent
      const parentCards = appCards.filter(card => card.type === 'parent');
      parentCards.forEach(parentCard => {
        const childIds = airtableCards
          .filter(airtableCard => airtableCard.parentId === parentCard.id)
          .map(airtableCard => airtableCard.id);
        (parentCard as any).childCards = childIds;
      });

      return appCards;
    } catch (error) {
      console.error('❌ Erreur de connexion à Airtable:', {
        error,
        config: {
          baseId: AIRTABLE_CONFIG.baseId ? 'exists' : 'missing',
          accessToken: AIRTABLE_CONFIG.accessToken ? 'exists' : 'missing',
          table: AIRTABLE_CONFIG.tables.cards
        }
      });
      
      // Ne plus renvoyer de données mockées mais lever l'erreur
      throw new Error(`Erreur de connexion à Airtable: ${error.message}`);
    }
  },
};

// Service Options
export const optionsService = {
  async getByQuizIds(quizIds: string[]): Promise<Option[]> {
    try {
      const filterFormula = `OR(${quizIds.map(id => `{quizId}='${id}'`).join(',')})`;
      const records = await base(AIRTABLE_CONFIG.tables.quizOptions)
        .select({
          filterByFormula: filterFormula
        })
        .all();
      
      return records.map(record => transformAirtableRecord<Option>(record));
    } catch (error) {
      console.error('Error fetching options:', error);
      throw error;
    }
  },
};

// Service Users
export const usersService = {
  async getByEmail(email: string): Promise<AirtableUserRecord | null> {
    try {
      const records = await base(AIRTABLE_CONFIG.tables.users)
        .select({
          filterByFormula: `{email}='${email}'`,
          maxRecords: 1
        })
        .all();
      
      return records.length > 0 ? records[0] : null;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  },

  async createOrUpdate(email: string, data: Partial<AirtableUserRecord['fields']>): Promise<AirtableUserRecord> {
    try {
      const existingUser = await this.getByEmail(email);
      
      if (existingUser) {
        const [updatedUser] = await base(AIRTABLE_CONFIG.tables.users)
          .update([
            {
              id: existingUser.id,
              fields: {
                ...existingUser.fields,
                ...data,
                lastLoginAt: new Date().toISOString()
              }
            }
          ]);
        return updatedUser;
      }
      
      const [newUser] = await base(AIRTABLE_CONFIG.tables.users)
        .create([
          {
            fields: {
              email,
              ...data,
              lastLoginAt: new Date().toISOString()
            }
          }
        ]);
      return newUser;
    } catch (error) {
      console.error('Error creating/updating user:', error);
      throw error;
    }
  }
};

// Service UserCardInteractions
export const userCardInteractionsService = {
  async getByUserAndCard(userId: string, cardId: string): Promise<AirtableUserCardInteractionRecord | null> {
    try {
      const records = await base(AIRTABLE_CONFIG.tables.userCardInteractions)
        .select({
          filterByFormula: `AND({userId}='${userId}',{cardId}='${cardId}')`,
          maxRecords: 1
        })
        .all();
      
      return records.length > 0 ? records[0] : null;
    } catch (error) {
      console.error('Error fetching interaction:', error);
      throw error;
    }
  },

  async createOrUpdate(
    userId: string, 
    cardId: string, 
    data: Partial<AirtableUserCardInteractionRecord['fields']>
  ): Promise<AirtableUserCardInteractionRecord> {
    try {
      const existingInteraction = await this.getByUserAndCard(userId, cardId);
      
      if (existingInteraction) {
        const [updatedInteraction] = await base(AIRTABLE_CONFIG.tables.userCardInteractions)
          .update([
            {
              id: existingInteraction.id,
              fields: {
                ...existingInteraction.fields,
                ...data
              }
            }
          ]);
        return updatedInteraction;
      }
      
      const [newInteraction] = await base(AIRTABLE_CONFIG.tables.userCardInteractions)
        .create([
          {
            fields: {
              userId,
              cardId,
              status: 'not_started',
              pointsKnowledge: 0,
              pointsBehavior: 0,
              pointsSkills: 0,
              ...data
            }
          }
        ]);
      return newInteraction;
    } catch (error) {
      console.error('Error creating/updating interaction:', error);
      throw error;
    }
  }
}; 