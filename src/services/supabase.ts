import { createClient } from '@supabase/supabase-js';
import { Card, QCMCard, ParentCard } from '@/types/card';
import { MediaCardData, MediaType, MediaMetadata } from '@/types/media';
import { mediaService } from './mediaService';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.error('Les variables d\'environnement Supabase ne sont pas définies');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

class SupabaseService {
  async getAllCards(): Promise<Card[]> {
    try {
      console.log('Récupération des cartes depuis Supabase...');
      
      const { data: cards, error } = await supabase
        .from('cards')
        .select(`
          *,
          media_metadata (*),
          quiz_options (*)
        `);
        
      if (error) throw error;
      
      if (!cards || cards.length === 0) {
        console.log('Aucune carte trouvée, utilisation de données fictives');
        return this.getMockCards();
      }
      
      console.log(`${cards.length} cartes récupérées`);
      
      // Récupérer les relations parent-enfant
      const parentCards = cards.filter(card => card.type === 'parent');
      if (parentCards.length > 0) {
        parentCards.forEach(parentCard => {
          parentCard.childCards = cards
            .filter(card => card.parent_id === parentCard.id)
            .map(card => card.id);
        });
      }
      
      return this.transformCards(cards);
    } catch (error) {
      console.error('Erreur lors de la récupération des cartes:', error);
      return this.getMockCards();
    }
  }

  private transformCards(supabaseCards: any[]): Card[] {
    return supabaseCards.map(card => {
      const baseCard = {
        id: card.id,
        title: card.title,
        description: card.description,
        createdAt: card.created_at,
        updatedAt: card.updated_at
      };
      
      switch (card.type) {
        case 'qcm':
          return {
            ...baseCard,
            type: 'qcm',
            question: card.question,
            options: (card.quiz_options || []).map((opt: any) => ({
              id: opt.id,
              text: opt.text,
              isCorrect: opt.is_correct
            }))
          } as QCMCard;
          
        case 'media':
          return {
            ...baseCard,
            type: 'media',
            mediaType: card.media_type as MediaType,
            mediaUrl: card.media_url,
            metadata: this.transformMediaMetadata(card.media_metadata)
          } as MediaCardData;
          
        case 'parent':
          return {
            ...baseCard,
            type: 'parent',
            childCards: card.childCards || []
          } as ParentCard;
          
        default:
          console.error('Type de carte inconnu:', card.type);
          return null;
      }
    }).filter(Boolean) as Card[];
  }

  private transformMediaMetadata(metadata: any): MediaMetadata {
    if (!metadata) return {};

    return {
      title: metadata.title,
      description: metadata.description,
      thumbnailUrl: metadata.thumbnail_url,
      duration: metadata.duration,
      // YouTube
      youtubeId: metadata.youtube_id,
      channelTitle: metadata.channel_title,
      // Spotify
      spotifyId: metadata.spotify_id,
      artistName: metadata.artist_name,
      albumName: metadata.album_name,
      // PDF
      pageCount: metadata.page_count,
      fileSize: metadata.file_size,
      // URL Preview
      siteName: metadata.site_name,
      favicon: metadata.favicon,
      ogImage: metadata.og_image
    };
  }

  private getMockCards(): Card[] {
    return [
      {
        id: 'media1',
        title: 'Introduction au changement climatique',
        description: 'Une vidéo explicative sur le changement climatique',
        type: 'media',
        mediaType: 'youtube',
        mediaUrl: 'https://www.youtube.com/watch?v=example',
        metadata: {
          title: 'Le changement climatique expliqué',
          description: 'Une introduction claire au changement climatique',
          youtubeId: 'example',
          channelTitle: 'Science Française',
          thumbnailUrl: 'https://example.com/thumbnail.jpg',
          duration: 360
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'media2',
        title: 'Ressources sur le climat',
        description: 'Document PDF avec des informations détaillées',
        type: 'media',
        mediaType: 'pdf',
        mediaUrl: 'https://example.com/climate.pdf',
        metadata: {
          title: 'Guide du climat',
          pageCount: 25,
          fileSize: 2048576
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ] as Card[];
  }

  // Déléguer les opérations sur les médias au service spécialisé
  async createMediaCard(params: {
    title: string;
    description?: string;
    mediaType: MediaType;
    mediaUrl: string;
    parentId?: string;
  }) {
    try {
      // Extraire les métadonnées automatiquement
      const metadata = await mediaService.extractMetadata(params.mediaUrl, params.mediaType);
      return await mediaService.createMedia({
        ...params,
        metadata
      });
    } catch (error) {
      console.error('Erreur lors de la création de la carte média:', error);
      throw error;
    }
  }

  async updateMediaCard(
    cardId: string,
    updates: {
      title?: string;
      description?: string;
      mediaType?: MediaType;
      mediaUrl?: string;
      parentId?: string;
    }
  ) {
    try {
      let metadata;
      if (updates.mediaUrl && updates.mediaType) {
        metadata = await mediaService.extractMetadata(updates.mediaUrl, updates.mediaType);
      }
      return await mediaService.updateMedia(cardId, {
        ...updates,
        metadata
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la carte média:', error);
      throw error;
    }
  }

  async getUserCardInteractions(userId: string): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('user_card_interactions')
        .select('*')
        .eq('user_id', userId);
        
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Erreur lors de la récupération des interactions:', error);
      return [];
    }
  }
}

export const supabaseService = new SupabaseService();
