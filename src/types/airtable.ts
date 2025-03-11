import { Card, Option } from './cards';

export interface AirtableRecord {
  id: string;
  createdTime: string;
}

export interface AirtableCardRecord extends AirtableRecord {
  fields: Omit<Card, 'id'> & {
    options?: string[]; // IDs des options pour les quiz
  };
}

export interface AirtableOptionRecord extends AirtableRecord {
  fields: Option & {
    quizId: string;
  };
}

export interface AirtableUserRecord extends AirtableRecord {
  fields: {
    email: string;
    name: string;
    avatar?: string;
    lastLoginAt: string;
  };
}

export interface AirtableUserCardInteractionRecord extends AirtableRecord {
  fields: {
    userId: string;
    cardId: string;
    status: 'completed' | 'in_progress' | 'not_started';
    pointsKnowledge: number;
    pointsBehavior: number;
    pointsSkills: number;
    completedAt?: string;
    selectedOptions?: string[]; // Pour les quiz
  };
}

export type AirtableResponse<T> = {
  records: T[];
  offset?: string;
}; 