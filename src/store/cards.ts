import { create } from 'zustand';
import { Card } from '@/types/card';
import { Id } from '@/types/database';
import { supabaseService } from '@/services/supabase';

interface CardsState {
  cards: Card[];
  navigationHistory: Id[];
  selectedParentId: Id | null;
  isLoading: boolean;
  error: string | null;
  setCards: (cards: Card[]) => void;
  selectParent: (parentId: Id | null) => void;
  getParentCard: () => Card | null;
  getFilteredCards: () => Card[];
  getTotalPoints: () => {
    knowledge: { current: number; total: number; };
    behavior: { current: number; total: number; };
    skills: { current: number; total: number; };
  };
  handleBackNavigation: () => void;
  fetchCards: () => Promise<void>;
}

const calculateTotalPoints = (cards: Card[]) => {
  const points = {
    knowledge: { current: 0, total: 0 },
    behavior: { current: 0, total: 0 },
    skills: { current: 0, total: 0 }
  };

  cards.forEach(card => {
    // Pour l'instant, on attribue des points fixes par type de contenu
    if (card.content?.type === 'quiz') {
      points.knowledge.total += 2;
      points.behavior.total += 1;
      points.skills.total += 1;
    }
  });

  return points;
};

export const useCardsStore = create<CardsState>((set, get) => ({
  cards: [],
  navigationHistory: [],
  selectedParentId: null,
  isLoading: false,
  error: null,

  setCards: (cards) => {
    console.log('Setting cards:', cards);
    set({ cards });
  },
  
  selectParent: (parentId) => {
    console.log('Selecting parent:', parentId);
    const { cards } = get();
    
    if (parentId === null || parentId === '00000') {
      // Retour à l'accueil
      set({ selectedParentId: null, navigationHistory: [] });
      return;
    }

    // Trouver la carte parente
    const parentCard = cards.find(card => card.id === parentId);
    if (!parentCard) {
      console.error('Carte parente non trouvée:', parentId);
      return;
    }

    // Construire le chemin direct jusqu'à la racine
    const path: Id[] = [parentId];
    let currentCard = parentCard;

    // Remonter jusqu'à la racine
    while (currentCard.parent_id && currentCard.parent_id !== '00000') {
      const nextCard = cards.find(card => card.id === currentCard.parent_id);
      if (!nextCard) {
        console.error('Carte parente non trouvée dans la chaîne:', currentCard.parent_id);
        break;
      }
      path.unshift(nextCard.id);
      currentCard = nextCard;
    }

    console.log('Chemin direct de navigation:', path);
    set({
      selectedParentId: parentId,
      navigationHistory: path
    });
  },
  
  handleBackNavigation: () => {
    console.log('Handling back navigation');
    const { navigationHistory } = get();
    
    // Retirer la dernière carte du chemin
    const newHistory = navigationHistory.slice(0, -1);
    const previousParent = newHistory[newHistory.length - 1] || null;

    set({
      selectedParentId: previousParent,
      navigationHistory: newHistory
    });
  },
  
  getParentCard: () => {
    const { cards, selectedParentId } = get();
    if (!selectedParentId) return null;
    
    const parentCard = cards.find(card => card.id === selectedParentId);
    console.log('Getting parent card:', parentCard);
    return parentCard;
  },
  
  getFilteredCards: () => {
    const { cards, selectedParentId } = get();
    
    if (!selectedParentId) {
      // Afficher les cartes racines (parent_id = null)
      return cards.filter(card => !card.parent_id);
    }

    // Afficher les cartes enfants du parent sélectionné
    const filteredCards = cards.filter(card => card.parent_id === selectedParentId);
    
    console.log('Getting filtered cards:', filteredCards);
    return filteredCards;
  },

  getTotalPoints: () => {
    const points = calculateTotalPoints(get().cards);
    console.log('Getting total points:', points);
    return points;
  },

  fetchCards: async () => {
    console.log('Fetching cards from Supabase...');
    set({ isLoading: true, error: null });
    try {
      // Log des variables d'environnement
      console.log('Variables d\'environnement:');
      console.log('MODE:', import.meta.env.MODE);
      console.log('VITE_SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL || 'Non définie');
      console.log('VITE_SUPABASE_ANON_KEY existe:', !!import.meta.env.VITE_SUPABASE_ANON_KEY);
      
      const cards = await supabaseService.getAllCards();
      console.log('Cards fetched successfully:', cards);
      
      if (!cards || cards.length === 0) {
        console.warn('Aucune carte n\'a été récupérée');
      }
      
      set({ cards: cards || [], isLoading: false });

      // Vérifier les cartes filtrées
      const filteredCards = (cards || []).filter(card => card.parent_id === '00000' || card.id === '00200');
      console.log('Filtered root cards:', filteredCards);
    } catch (error: any) {
      console.error('Error fetching cards from Supabase:', error);
      console.error('Error details:', {
        message: error.message,
        name: error.name,
        stack: error.stack,
        code: error.code,
        details: error.details
      });
      set({ 
        error: `Une erreur est survenue lors du chargement des cartes: ${error.message}`,
        isLoading: false 
      });
    }
  }
})); 