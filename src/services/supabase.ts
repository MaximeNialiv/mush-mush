import { Card, Id } from '@/types/database';
import { supabase } from '@/lib/supabaseClient';

class SupabaseService {
  async insertTestCards() {
    try {
      // Créer la carte parent "Panel de test"
      const { data: parentCard, error: parentError } = await supabase
        .from('cards')
        .insert([{
          id: '00400',
          title: 'Panel de test',
          description: 'Un panel de cartes pour tester les différents types de contenu',
          parent_id: '00000',
          owner: 'fabienlopez69@gmail.com'
        }])
        .select()
        .single();

      if (parentError) throw parentError;
      console.log('Carte parent créée:', parentCard);

      // Créer les cartes enfants avec différents types de contenu
      const childCards = [
        {
          id: '00401',
          title: 'Test Quiz',
          description: 'Un exemple de quiz interactif',
          parent_id: '00400',
          owner: 'fabienlopez69@gmail.com',
          content: {
            type: 'quiz',
            questions: [
              {
                text: "Quelle est la capitale de la France ?",
                options: [
                  { text: "Paris", isCorrect: true, explanation: "Correct ! Paris est la capitale de la France depuis 508." },
                  { text: "Lyon", isCorrect: false, explanation: "Lyon est la 3ème plus grande ville de France." },
                  { text: "Marseille", isCorrect: false, explanation: "Marseille est la 2ème plus grande ville de France." }
                ]
              },
              {
                text: "Quel est l'arbre emblématique de la Canada ?",
                options: [
                  { text: "Le pin", isCorrect: false, explanation: "Le pin est commun au Canada mais n'est pas l'arbre emblématique." },
                  { text: "L'érable", isCorrect: true, explanation: "L'érable est l'emblème du Canada, présent sur son drapeau." },
                  { text: "Le chêne", isCorrect: false, explanation: "Le chêne n'est pas particulièrement associé au Canada." }
                ]
              }
            ]
          }
        },
        {
          id: '00402',
          title: 'Test YouTube',
          description: 'Une vidéo YouTube sur la nature',
          parent_id: '00400',
          owner: 'fabienlopez69@gmail.com',
          content: {
            type: 'youtube',
            url: 'https://www.youtube.com/watch?v=6v2L2UGZJAM'
          }
        },
        {
          id: '00403',
          title: 'Test Spotify',
          description: 'Une playlist de musique relaxante',
          parent_id: '00400',
          owner: 'fabienlopez69@gmail.com',
          content: {
            type: 'spotify',
            url: 'https://open.spotify.com/embed/playlist/37i9dQZF1DWZqd5JICZI0u'
          }
        },
        {
          id: '00404',
          title: 'Test URL',
          description: 'Un article intéressant sur le développement durable',
          parent_id: '00400',
          owner: 'fabienlopez69@gmail.com',
          content: {
            type: 'url',
            url: 'https://www.nationalgeographic.com/environment/article/sustainable-earth'
          }
        }
      ];

      for (const card of childCards) {
        const { data, error } = await supabase
          .from('cards')
          .insert([{
            ...card,
            content: JSON.stringify(card.content)
          }])
          .select()
          .single();

        if (error) throw error;
        console.log(`Carte enfant créée: ${card.title}`, data);
      }

      console.log('Toutes les cartes ont été créées avec succès !');
      return true;
    } catch (error) {
      console.error('Erreur lors de la création des cartes:', error);
      return false;
    }
  }

  async getAllCards(): Promise<Card[]> {
    try {
      console.log('Récupération des cartes depuis Supabase...');
      
      // Récupérer toutes les cartes
      const { data: cards, error: cardsError } = await supabase
        .from('cards')
        .select('*');
      
      console.log('Cartes récupérées:', cards?.length || 0);
      if (cards && cards.length > 0) {
        console.log('Exemple de carte brute:', cards[0]);
      }
        
      if (cardsError) {
        console.error('Erreur lors de la récupération des cartes:', cardsError);
        throw cardsError;
      }
      
      if (!cards || cards.length === 0) {
        console.log('Aucune carte trouvée');
        return [];
      }

      // Convertir les contenus JSON en objets
      const processedCards = cards.map(card => {
        // Créer une copie de la carte pour éviter de modifier l'original
        const processedCard = { ...card };
        
        // Traiter le contenu s'il existe et est une chaîne
        if (processedCard.content && typeof processedCard.content === 'string') {
          try {
            const parsedContent = JSON.parse(processedCard.content);
            if (
              typeof parsedContent === 'object' &&
              parsedContent !== null &&
              'type' in parsedContent &&
              (
                (parsedContent.type === 'quiz' && 'questions' in parsedContent) ||
                ((parsedContent.type === 'youtube' || parsedContent.type === 'spotify' || parsedContent.type === 'url') && 'url' in parsedContent)
              )
            ) {
              processedCard.content = parsedContent;
            } else {
              console.log('Format de contenu non standard pour la carte:', processedCard.id);
              // Garder le contenu tel quel
            }
          } catch (e) {
            console.log('Contenu non JSON pour la carte:', processedCard.id);
            // Garder le contenu tel quel
          }
        }
        
        return processedCard;
      });

      console.log('Traitement des cartes terminé');
      if (processedCards.length > 0) {
        console.log('Exemple de carte traitée:', processedCards[0]);
      }
      
      return processedCards;
    } catch (error) {
      console.error('Erreur lors de la récupération des cartes:', error);
      return [];
    }
  }



  // Créer une nouvelle carte avec contenu
  async createCard(params: {
    title: string;
    description?: string;
    parent_id?: Id;
    owner: string;
    content?: {
      type: 'quiz';
      questions: Array<{
        text: string;
        options: Array<{
          text: string;
          isCorrect: boolean;
          explanation?: string;
        }>;
      }>;
    } | {
      type: 'youtube' | 'spotify' | 'url';
      url: string;
    };
  }) {
    try {
      // Créer la carte avec le contenu JSON
      const { data: card, error: cardError } = await supabase
        .from('cards')
        .insert([{
          title: params.title,
          description: params.description,
          parent_id: params.parent_id,
          owner: params.owner,
          content: params.content ? JSON.stringify(params.content) : null
        }])
        .select()
        .single();
        
      if (cardError) throw cardError;
      
      return {
        ...card,
        content: params.content
      };
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
      description?: string;
      parent_id?: Id;
      content?: {
        type: 'quiz';
        questions: Array<{
          text: string;
          options: Array<{
            text: string;
            isCorrect: boolean;
            explanation?: string;
          }>;
        }>;
      } | {
        type: 'youtube' | 'spotify' | 'url';
        url: string;
      };
    }
  ) {
    try {
      // Mettre à jour la carte
      const cardUpdates: Partial<Card> & { content?: string } = {};
      if (updates.title) cardUpdates.title = updates.title;
      if (updates.description) cardUpdates.description = updates.description;
      if (updates.parent_id) cardUpdates.parent_id = updates.parent_id;
      if (updates.content) cardUpdates.content = JSON.stringify(updates.content);
      
      const { data: card, error: cardError } = await supabase
        .from('cards')
        .update(cardUpdates)
        .eq('id', cardId)
        .select()
        .single();
        
      if (cardError) throw cardError;
      
      return {
        ...card,
        content: updates.content
      };
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la carte:', error);
      throw error;
    }
  }


  // Récupérer toutes les cartes racines (avec parent_id = null)
  async getRootCards(): Promise<Card[]> {
    try {
      console.log('Récupération des cartes racines...');
      
      // Récupérer les cartes racines (parent_id = null)
      const { data: rootCards, error: rootError } = await supabase
        .from('cards')
        .select('id, title, description, parent_id, owner, content')
        .is('parent_id', null);

      if (rootError) {
        console.error('Erreur lors de la récupération des cartes racines:', rootError);
        throw rootError;
      }

      if (!rootCards || rootCards.length === 0) {
        console.log('Aucune carte racine trouvée');
        return [];
      }

      // Convertir les contenus JSON en objets
      const processedCards = rootCards.map(card => ({
        ...card,
        content: card.content ? JSON.parse(card.content) : null
      }));

      console.log('Cartes racines récupérées:', processedCards);
      return processedCards;
    } catch (error) {
      console.error('Erreur lors de la récupération des cartes racines:', error);
      return [];
    }
  }
}

export const supabaseService = new SupabaseService();
