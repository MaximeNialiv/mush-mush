import { create } from 'zustand';
import { Card } from '@/types/card';
import { supabaseService } from '@/services/supabase';

interface CardsState {
  cards: Card[];
  navigationHistory: string[];
  selectedParentId: string | null;
  isLoading: boolean;
  error: string | null;
  setCards: (cards: Card[]) => void;
  selectParent: (parentId: string | null) => void;
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
  // Pour cette version, nous allons simuler les points
  return {
    knowledge: { current: 10, total: 20 },
    behavior: { current: 5, total: 15 },
    skills: { current: 15, total: 30 }
  };
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
    const { selectedParentId, navigationHistory } = get();
    if (parentId !== selectedParentId) {
      set({
        selectedParentId: parentId,
        navigationHistory: parentId 
          ? [...navigationHistory, parentId]
          : []
      });
    }
  },
  
  handleBackNavigation: () => {
    console.log('Handling back navigation');
    const { navigationHistory } = get();
    const newHistory = [...navigationHistory];
    newHistory.pop();
    const previousParent = newHistory[newHistory.length - 1] || null;
    set({
      selectedParentId: previousParent,
      navigationHistory: newHistory
    });
  },
  
  getParentCard: () => {
    const { cards, selectedParentId } = get();
    const parentCard = selectedParentId ? cards.find(card => card.id === selectedParentId) : null;
    console.log('Getting parent card:', parentCard);
    return parentCard;
  },
  
  getFilteredCards: () => {
    const { cards, selectedParentId } = get();
    let relevantCards: Card[] = [];
    
    if (selectedParentId) {
      // Trouver la carte parent
      const parentCard = cards.find(card => card.id === selectedParentId);
      if (parentCard && parentCard.type === 'parent') {
        // Filtrer les cartes enfants basées sur les IDs stockés dans childCards
        relevantCards = cards.filter(card => 
          (parentCard as any).childCards.includes(card.id)
        );
      }
    } else {
      // Au niveau racine, ne montrer que les cartes de type 'parent'
      relevantCards = cards.filter(card => card.type === 'parent');
    }
    
    console.log('Getting filtered cards:', relevantCards);
    return relevantCards;
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
      const cards = await supabaseService.getAllCards();
      console.log('Cards fetched successfully:', cards);
      set({ cards, isLoading: false });
    } catch (error) {
      console.error('Error fetching cards from Supabase:', error);
      set({ 
        error: 'Une erreur est survenue lors du chargement des cartes',
        isLoading: false 
      });
    }
  }
})); 