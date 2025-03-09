
export type CardType = 'qcm' | 'media' | 'parent';

export interface BaseCard {
  id: string;
  title: string;
  description: string;
  type: CardType;
}

export interface QCMCard extends BaseCard {
  type: 'qcm';
  question: string;
  options: string[];
  correctAnswer?: number;
}

export interface MediaCard extends BaseCard {
  type: 'media';
  mediaType: 'video' | 'url' | 'pdf';
  mediaUrl: string;
}

export interface ParentCard extends BaseCard {
  type: 'parent';
  childrenIds: string[];
}

export type Card = QCMCard | MediaCard | ParentCard;
