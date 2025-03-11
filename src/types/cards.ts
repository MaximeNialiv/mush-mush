interface Points {
  knowledge: { current: number; total: number; };
  behavior: { current: number; total: number; };
  skills: { current: number; total: number; };
  ranking?: number;
}

export interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
  quizId?: string;
}

interface BaseCard {
  id: string;
  type: 'workshop' | 'quiz' | 'media';
  title: string;
  description: string;
  points: Points;
  parentId?: string;
}

interface WorkshopCard extends BaseCard {
  type: 'workshop';
  image: string;
  isParent?: boolean;
}

interface QuizCard extends BaseCard {
  type: 'quiz';
  number: string;
  options: Option[];
}

interface MediaCard extends BaseCard {
  type: 'media';
  mediaType: 'youtube' | 'pdf' | 'podcast';
  mediaUrl: string;
}

export type Card = WorkshopCard | QuizCard | MediaCard; 