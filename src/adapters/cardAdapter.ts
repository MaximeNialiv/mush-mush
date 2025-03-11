import { Card as AppCard, QCMCard, MediaCard, ParentCard } from '@/types/card';
import { Card as AirtableCard, Option } from '@/types/cards';

/**
 * Convertit une carte Airtable en carte pour l'application
 */
export function adaptCardFromAirtable(airtableCard: AirtableCard): AppCard {
  console.log('Adapting card:', airtableCard);
  
  // Conversion commune
  const baseCard = {
    id: airtableCard.id,
    title: airtableCard.title,
    description: airtableCard.description,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // Conversion spécifique selon le type
  switch (airtableCard.type) {
    case 'quiz':
      return {
        ...baseCard,
        type: 'qcm',
        question: airtableCard.description,
        options: (airtableCard as any).options?.map((opt: Option) => ({
          id: opt.id,
          text: opt.text,
          isCorrect: opt.isCorrect
        })) || []
      } as QCMCard;
    
    case 'media':
      return {
        ...baseCard,
        type: 'media',
        mediaType: adaptMediaType(airtableCard.mediaType),
        mediaUrl: airtableCard.mediaUrl || '',
        thumbnailUrl: airtableCard.image
      } as MediaCard;
    
    case 'workshop':
      if (airtableCard.isParent) {
        return {
          ...baseCard,
          type: 'parent',
          childCards: []  // Ces IDs seront remplis plus tard
        } as ParentCard;
      } else {
        // Fallback - traiter comme une carte média si pas parent
        return {
          ...baseCard,
          type: 'media',
          mediaType: 'url',
          mediaUrl: airtableCard.image || ''
        } as MediaCard;
      }
    
    default:
      console.error('Type de carte inconnu:', airtableCard.type);
      // Fallback en cas de type inconnu
      return {
        ...baseCard,
        type: 'media',
        mediaType: 'url',
        mediaUrl: ''
      } as MediaCard;
  }
}

/**
 * Convertit un type de média Airtable en type de média pour l'application
 */
function adaptMediaType(airtableMediaType?: string): 'video' | 'url' | 'pdf' {
  if (!airtableMediaType) return 'url';
  
  switch (airtableMediaType) {
    case 'youtube':
    case 'video':
    case 'podcast':
      return 'video';
    case 'pdf':
      return 'pdf';
    default:
      return 'url';
  }
} 