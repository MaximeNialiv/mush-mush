import { createClient } from '@supabase/supabase-js';
import { Card, QCMCard, MediaCard, ParentCard } from '@/types/card';

// Initialisation du client Supabase
// Ces URL et clé devront être définies dans votre fichier .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.error('Les variables d\'environnement Supabase ne sont pas définies');
}

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Service pour interagir avec Supabase
 */
class SupabaseService {
  /**
   * Récupère toutes les cartes
   */
  async getAllCards(): Promise<Card[]> {
    try {
      console.log('Récupération des cartes depuis Supabase...');
      
      // Récupérer toutes les cartes
      const { data: cards, error } = await supabase
        .from('cards')
        .select('*');
        
      if (error) throw error;
      
      if (!cards || cards.length === 0) {
        console.log('Aucune carte trouvée, utilisation de données fictives');
        return this.getMockCards();
      }
      
      console.log(`${cards.length} cartes récupérées`);
      
      // Récupérer les options pour les cartes QCM
      const qcmCards = cards.filter(card => card.type === 'qcm');
      if (qcmCards.length > 0) {
        const qcmIds = qcmCards.map(card => card.id);
        const { data: options, error: optionsError } = await supabase
          .from('quiz_options')
          .select('*')
          .in('card_id', qcmIds);
          
        if (optionsError) throw optionsError;
        
        if (options) {
          qcmCards.forEach(card => {
            card.options = options.filter(option => option.card_id === card.id);
          });
        }
      }
      
      // Récupérer les relations parent-enfant pour les cartes parent
      const parentCards = cards.filter(card => card.type === 'parent');
      if (parentCards.length > 0) {
        parentCards.forEach(parentCard => {
          parentCard.childCards = cards
            .filter(card => card.parent_id === parentCard.id)
            .map(card => card.id);
        });
      }
      
      // Transformer les données de Supabase en type Card
      return this.transformCards(cards);
    } catch (error) {
      console.error('Erreur lors de la récupération des cartes:', error);
      return this.getMockCards();
    }
  }
  
  /**
   * Transforme les données Supabase en types de l'application
   */
  private transformCards(supabaseCards: any[]): Card[] {
    return supabaseCards.map(card => {
      const baseCard = {
        id: card.id,
        title: card.title,
        description: card.description,
        createdAt: card.created_at,
        updatedAt: card.updated_at
      };
      
      switch (card.type) {
        case 'qcm':
          return {
            ...baseCard,
            type: 'qcm',
            question: card.question,
            options: (card.options || []).map((opt: any) => ({
              id: opt.id,
              text: opt.text,
              isCorrect: opt.is_correct
            }))
          } as QCMCard;
          
        case 'media':
          return {
            ...baseCard,
            type: 'media',
            mediaType: card.media_type,
            mediaUrl: card.media_url,
            thumbnailUrl: card.thumbnail_url
          } as MediaCard;
          
        case 'parent':
          return {
            ...baseCard,
            type: 'parent',
            childCards: card.childCards || []
          } as ParentCard;
          
        default:
          console.error('Type de carte inconnu:', card.type);
          return null;
      }
    }).filter(Boolean) as Card[];
  }
  
  /**
   * Génère des cartes fictives pour le développement
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
  
  /**
   * Interactions utilisateur-carte
   */
  async getUserCardInteractions(userId: string): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('user_card_interactions')
        .select('*')
        .eq('user_id', userId);
        
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Erreur lors de la récupération des interactions:', error);
      return [];
    }
  }
  
  /**
   * Enregistre une interaction utilisateur-carte
   */
  async saveUserCardInteraction(
    userId: string, 
    cardId: string, 
    status: 'viewed' | 'completed' | 'in_progress',
    points: { knowledge: number, behavior: number, skills: number },
    selectedOptions?: string[]
  ): Promise<any> {
    try {
      const { data, error } = await supabase
        .from('user_card_interactions')
        .upsert({
          user_id: userId,
          card_id: cardId,
          status,
          points_knowledge: points.knowledge,
          points_behavior: points.behavior,
          points_skills: points.skills,
          selected_options: selectedOptions || [],
          last_interaction_at: new Date().toISOString()
        }, {
          onConflict: 'user_id,card_id'
        });
        
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement de l\'interaction:', error);
      throw error;
    }
  }
}

// Exporter une instance unique du service
export const supabaseService = new SupabaseService(); 