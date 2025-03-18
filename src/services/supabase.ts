import { Card, QuizOption, Id } from '@/types/database';
import { supabase } from '@/lib/supabaseClient';

class SupabaseService {
  async getAllCards(): Promise<Card[]> {
    try {
      console.log('Récupération des cartes depuis Supabase...');
      
      // Récupérer toutes les cartes avec leurs options de quiz
      const { data: cards, error: cardsError } = await supabase
        .from('cards')
        .select('*, quiz_options(*)');
        
      if (cardsError) {
        console.error('Erreur lors de la récupération des cartes:', cardsError);
        throw cardsError;
      }
      
      if (!cards || cards.length === 0) {
        console.log('Aucune carte trouvée');
        return [];
      }

      console.log('Cartes récupérées:', cards);
      return cards;
    } catch (error) {
      console.error('Erreur lors de la récupération des cartes:', error);
      return [];
    }
  }



  // Créer une nouvelle carte avec contenu
  async createCard(params: {
    title: string;
    parent_id?: Id;
    type: 'quiz';
    question: string;
    owner: string;
    options: Array<{ text: string; is_correct: boolean; }>;
  }) {
    try {
      // Créer la carte
      const { data: card, error: cardError } = await supabase
        .from('cards')
        .insert([{
          title: params.title,
          parent_id: params.parent_id,
          type: params.type,
          question: params.question,
          owner: params.owner
        }])
        .select()
        .single();
        
      if (cardError) throw cardError;
      
      // Créer les options de quiz
      const { data: options, error: optionsError } = await supabase
        .from('quiz_options')
        .insert(
          params.options.map(option => ({
            card_id: card.id,
            text: option.text,
            is_correct: option.is_correct
          }))
        )
        .select();
        
      if (optionsError) throw optionsError;
      
      return { ...card, quiz_options: options };
    } catch (error) {
      console.error('Erreur lors de la création de la carte:', error);
      throw error;
    }
  }

  // Mettre à jour une carte existante
  async updateCard(
    cardId: Id,
    updates: {
      title?: string;
      parent_id?: Id;
      question?: string;
      options?: Array<{ id: Id; text: string; is_correct: boolean; }>;
    }
  ) {
    try {
      // Mettre à jour la carte
      const cardUpdates: Partial<Card> = {};
      if (updates.title) cardUpdates.title = updates.title;
      if (updates.parent_id) cardUpdates.parent_id = updates.parent_id;
      if (updates.question) cardUpdates.question = updates.question;
      
      const { data: card, error: cardError } = await supabase
        .from('cards')
        .update(cardUpdates)
        .eq('id', cardId)
        .select()
        .single();
        
      if (cardError) throw cardError;
      
      // Mettre à jour les options si nécessaire
      if (updates.options) {
        const { error: optionsError } = await supabase
          .from('quiz_options')
          .upsert(
            updates.options.map(option => ({
              id: option.id,
              card_id: cardId,
              text: option.text,
              is_correct: option.is_correct
            }))
          );
          
        if (optionsError) throw optionsError;
      }
      
      // Récupérer les options mises à jour
      const { data: options } = await supabase
        .from('quiz_options')
        .select('*')
        .eq('card_id', card.id);
        
      return { ...card, quiz_options: options };
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la carte:', error);
      throw error;
    }
  }


  // Récupérer toutes les cartes racines (avec parent_id = '00000')
  async getRootCards(): Promise<Card[]> {
    try {
      console.log('Récupération des cartes racines...');
      const { data: cards, error: cardsError } = await supabase
        .from('cards')
        .select('*, quiz_options(*)')
        .or('parent_id.eq.00000,parent_id.eq.00100');

      if (cardsError) {
        console.error('Erreur lors de la récupération des cartes racines:', cardsError);
        throw cardsError;
      }

      if (!cards || cards.length === 0) {
        console.log('Aucune carte racine trouvée');
        return [];
      }

      console.log('Cartes racines récupérées:', cards);
      return cards;
    } catch (error) {
      console.error('Erreur lors de la récupération des cartes racines:', error);
      return [];
    }
  }
}

export const supabaseService = new SupabaseService();
