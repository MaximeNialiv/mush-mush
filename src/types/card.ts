export type CardType = 'qcm' | 'media' | 'parent';

export interface BaseCard {
  id: string;
  title: string;
  description: string;
  type: CardType;
  createdAt: string;
  updatedAt: string;
}

export interface QCMCard extends BaseCard {
  type: 'qcm';
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
}

export interface MediaCard extends BaseCard {
  type: 'media';
  mediaType: 'video' | 'url' | 'pdf';
  mediaUrl: string;
  thumbnailUrl?: string;
  image?: string;
}

export interface ParentCard extends BaseCard {
  type: 'parent';
  childCards: string[]; // IDs des cartes enfants
}

export type Card = QCMCard | MediaCard | ParentCard;

interface AirtableCard {
  id: string;
  type: 'workshop' | 'quiz' | 'media';
  title: string;
  description: string;
  parentId?: string;
  ranking: number; // Pour l'ordre d'affichage
  image?: string;
  mediaType?: 'youtube' | 'pdf' | 'podcast' | 'video';
  mediaUrl?: string;
  isParent: boolean;
  pointsKnowledge: number; // Points totaux possibles
  pointsBehavior: number;
  pointsSkills: number;
}

interface AirtableUser {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: string;
  lastLoginAt: string;
}

interface AirtableUserCardInteraction {
  id: string;
  userId: string;
  cardId: string;
  status: 'viewed' | 'completed' | 'in_progress';
  pointsKnowledge: number; // Points obtenus
  pointsBehavior: number;
  pointsSkills: number;
  lastInteractionAt: string;
}

interface AirtableQuizOption {
  id: string;
  cardId: string; // Référence à la carte quiz parent
  text: string;
  isCorrect: boolean;
  explanation?: string;
}
