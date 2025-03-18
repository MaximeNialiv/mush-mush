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
    // Pour l'instant, on attribue des points fixes par type de carte
    if (card.type === 'quiz') {
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
    if (!selectedParentId) return null;
    
    const parentCard = cards.find(card => card.id === selectedParentId);
    console.log('Getting parent card:', parentCard);
    return parentCard;
  },
  
  getFilteredCards: () => {
    const { cards, selectedParentId } = get();
    
    if (!selectedParentId) {
      // Afficher les cartes racines (parent_id = '00000')
      return cards.filter(card => card.parent_id === '00000');
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