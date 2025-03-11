import { AIRTABLE_CONFIG } from '@/config/airtable';
import { Card } from '@/types/card';
import { adaptCardFromAirtable } from '@/adapters/cardAdapter';

// Configuration de base pour les appels API
const AIRTABLE_BASE_URL = 'https://api.airtable.com/v0';

/**
 * Service d'API Airtable simplifié utilisant fetch
 */
class AirtableApiService {
  private accessToken: string;
  private baseId: string;
  private tables: typeof AIRTABLE_CONFIG.tables;

  constructor() {
    this.accessToken = AIRTABLE_CONFIG.accessToken || '';
    this.baseId = AIRTABLE_CONFIG.baseId || '';
    this.tables = AIRTABLE_CONFIG.tables;
    
    // Vérifier si les identifiants sont présents
    if (!this.accessToken || !this.baseId) {
      console.error('⚠️ Configuration Airtable incomplète', {
        accessToken: !!this.accessToken, 
        baseId: !!this.baseId
      });
    }
  }

  /**
   * Récupère les données d'une table Airtable
   */
  private async fetchTable<T>(table: string): Promise<T[]> {
    try {
      console.log(`📡 Appel API sur la table ${table}...`);
      console.log(`URL: ${AIRTABLE_BASE_URL}/${this.baseId}/${table}`);
      
      const response = await fetch(
        `${AIRTABLE_BASE_URL}/${this.baseId}/${table}`, 
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`Airtable API error: ${error.error?.message || response.statusText}`);
      }

      const data = await response.json();
      console.log(`✅ Données récupérées:`, data);
      
      if (!data.records) {
        return [];
      }
      
      // Transformer les enregistrements au format attendu
      return data.records.map((record: any) => ({
        id: record.id,
        ...record.fields,
        createdTime: record.createdTime || new Date().toISOString()
      })) as T[];
    } catch (error) {
      console.error('❌ Erreur lors de l\'appel à Airtable', error);
      throw error;
    }
  }

  /**
   * Récupère toutes les cartes
   */
  async getAllCards(): Promise<Card[]> {
    try {
      // Obtenir les données brutes de la table des cartes
      const cardsData = await this.fetchTable(this.tables.cards);
      console.log(`Données des cartes récupérées: ${cardsData.length}`);
      
      // Simpler des données fictives pour le développement local
      if (cardsData.length === 0) {
        console.log('Aucune carte trouvée, utilisation de données fictives');
        return this.getMockCards();
      }
      
      // Convertir les données au format de l'application
      const cards = cardsData.map(card => adaptCardFromAirtable(card as any));
      
      // Récupérer les relations parent-enfant
      cards.filter(card => card.type === 'parent').forEach(parentCard => {
        const childIds = cardsData
          .filter((card: any) => card.parentId === parentCard.id)
          .map((card: any) => card.id);
        (parentCard as any).childCards = childIds;
      });
      
      return cards;
    } catch (error) {
      console.error('Échec de la récupération des cartes:', error);
      return this.getMockCards();
    }
  }
  
  /**
   * Génère des cartes fictives pour le développement local
   */
  private getMockCards(): Card[] {
    console.log('Génération de cartes fictives pour le développement');
    
    return [
      {
        id: 'parent1',
        title: 'Module 1: Introduction au climat',
        description: 'Découvrez les bases du changement climatique',
        type: 'parent',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        childCards: ['child1', 'child2', 'child3']
      },
      {
        id: 'child1',
        title: 'Qu\'est-ce que le climat?',
        description: 'Comprendre la différence entre météo et climat',
        type: 'media',
        mediaType: 'video',
        mediaUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'child2',
        title: 'Quiz: Connaissances climatiques',
        description: 'Testez vos connaissances',
        type: 'qcm',
        question: 'Quelle est la principale cause du changement climatique?',
        options: [
          { id: 'opt1', text: 'Les émissions de gaz à effet de serre', isCorrect: true },
          { id: 'opt2', text: 'Les éruptions volcaniques', isCorrect: false },
          { id: 'opt3', text: 'Les variations naturelles du climat', isCorrect: false }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'child3',
        title: 'Documentation PDF',
        description: 'Ressources supplémentaires sur le climat',
        type: 'media',
        mediaType: 'pdf',
        mediaUrl: 'https://example.com/climate.pdf',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
  }
}

// Exporter une instance unique du service
export const airtableApi = new AirtableApiService(); 