// Format des IDs : "00001" à "99999"
export type Id = string;

// Interface pour les questions de quiz
export interface QuizQuestion {
  text: string;
  options: {
    text: string;
    isCorrect: boolean;
    explanation?: string;
  }[];
}

// Interface pour les cartes (mise à jour selon la structure réelle de la base de données)
export interface Card {
  id: Id;
  title: string;
  description?: string;
  parent_id?: Id | null;
  owner: string;
  type?: string;
  media_type?: string | null;
  media_url?: string | null;
  question?: string | null;
  image_url?: string;
  content?: string | {
    type: 'quiz';
    questions: QuizQuestion[];
  } | {
    type: 'youtube' | 'spotify' | 'url';
    url: string;
  };
  created_at?: string;
  updated_at?: string;
}

// Type pour la base de données complète
export interface Database {
  public: {
    Tables: {
      cards: {
        Row: Card;
        Insert: Omit<Card, 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Card, 'created_at' | 'updated_at'>>;
      };
    };
  };
}
