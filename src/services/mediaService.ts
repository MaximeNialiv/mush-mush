import { supabase } from './supabase';
import { MediaType, MediaMetadata } from '@/types/media';

interface CreateMediaParams {
  title: string;
  description?: string;
  mediaType: MediaType;
  mediaUrl: string;
  metadata: MediaMetadata;
  parentId?: string;
}

class MediaService {
  async extractMetadata(url: string, type: MediaType): Promise<MediaMetadata> {
    const metadata: MediaMetadata = {};

    switch (type) {
      case 'youtube': {
        const videoId = this.extractYoutubeId(url);
        if (videoId) {
          metadata.youtubeId = videoId;
          // Note: Ici on pourrait ajouter l'appel à l'API YouTube pour récupérer plus de métadonnées
          // si vous avez une clé API YouTube
        }
        break;
      }
      case 'spotify': {
        const spotifyId = this.extractSpotifyId(url);
        if (spotifyId) {
          metadata.spotifyId = spotifyId;
          // Note: Ici on pourrait ajouter l'appel à l'API Spotify pour récupérer plus de métadonnées
          // si vous avez une clé API Spotify
        }
        break;
      }
      case 'url_preview': {
        try {
          const response = await fetch(url);
          const html = await response.text();
          
          // Extraction basique des métadonnées OpenGraph
          const titleMatch = html.match(/<meta property="og:title" content="([^"]+)"/);
          const descMatch = html.match(/<meta property="og:description" content="([^"]+)"/);
          const imageMatch = html.match(/<meta property="og:image" content="([^"]+)"/);
          const siteNameMatch = html.match(/<meta property="og:site_name" content="([^"]+)"/);
          
          if (titleMatch) metadata.title = titleMatch[1];
          if (descMatch) metadata.description = descMatch[1];
          if (imageMatch) metadata.ogImage = imageMatch[1];
          if (siteNameMatch) metadata.siteName = siteNameMatch[1];
          
          // Favicon
          const faviconMatch = html.match(/<link[^>]*rel="(?:shortcut )?icon"[^>]*href="([^"]+)"/);
          if (faviconMatch) {
            metadata.favicon = new URL(faviconMatch[1], url).href;
          }
        } catch (error) {
          console.error('Erreur lors de l\'extraction des métadonnées:', error);
        }
        break;
      }
    }

    return metadata;
  }

  private extractYoutubeId(url: string): string | null {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  }

  private extractSpotifyId(url: string): string | null {
    const regExp = /^.*(spotify.com\/track\/)([a-zA-Z0-9]{22}).*/;
    const match = url.match(regExp);
    return match ? match[2] : null;
  }

  async createMedia({
    title,
    description,
    mediaType,
    mediaUrl,
    metadata,
    parentId
  }: CreateMediaParams) {
    try {
      // Insérer d'abord les métadonnées
      const { data: metadataData, error: metadataError } = await supabase
        .from('media_metadata')
        .insert([{
          title: metadata.title,
          description: metadata.description,
          thumbnail_url: metadata.thumbnailUrl,
          duration: metadata.duration,
          youtube_id: metadata.youtubeId,
          channel_title: metadata.channelTitle,
          spotify_id: metadata.spotifyId,
          artist_name: metadata.artistName,
          album_name: metadata.albumName,
          page_count: metadata.pageCount,
          file_size: metadata.fileSize,
          site_name: metadata.siteName,
          favicon: metadata.favicon,
          og_image: metadata.ogImage
        }])
        .select()
        .single();

      if (metadataError) throw metadataError;

      // Créer ensuite la carte média
      const { data: cardData, error: cardError } = await supabase
        .from('cards')
        .insert([{
          title,
          description,
          type: 'media',
          media_type: mediaType,
          media_url: mediaUrl,
          media_metadata_id: metadataData.id,
          parent_id: parentId
        }])
        .select(`
          *,
          media_metadata (*)
        `)
        .single();

      if (cardError) throw cardError;

      return {
        ...cardData,
        metadata: cardData.media_metadata
      };
    } catch (error) {
      console.error('Erreur lors de la création de la carte média:', error);
      throw error;
    }
  }

  async updateMedia(
    cardId: string,
    updates: Partial<CreateMediaParams>
  ) {
    try {
      const { data: currentCard, error: fetchError } = await supabase
        .from('cards')
        .select(`
          *,
          media_metadata (*)
        `)
        .eq('id', cardId)
        .single();

      if (fetchError) throw fetchError;

      // Mettre à jour les métadonnées si nécessaire
      if (updates.metadata) {
        const { error: metadataError } = await supabase
          .from('media_metadata')
          .update({
            title: updates.metadata.title,
            description: updates.metadata.description,
            thumbnail_url: updates.metadata.thumbnailUrl,
            duration: updates.metadata.duration,
            youtube_id: updates.metadata.youtubeId,
            channel_title: updates.metadata.channelTitle,
            spotify_id: updates.metadata.spotifyId,
            artist_name: updates.metadata.artistName,
            album_name: updates.metadata.albumName,
            page_count: updates.metadata.pageCount,
            file_size: updates.metadata.fileSize,
            site_name: updates.metadata.siteName,
            favicon: updates.metadata.favicon,
            og_image: updates.metadata.ogImage
          })
          .eq('id', currentCard.media_metadata_id);

        if (metadataError) throw metadataError;
      }

      // Mettre à jour la carte
      const { data: updatedCard, error: updateError } = await supabase
        .from('cards')
        .update({
          title: updates.title,
          description: updates.description,
          media_type: updates.mediaType,
          media_url: updates.mediaUrl,
          parent_id: updates.parentId
        })
        .eq('id', cardId)
        .select(`
          *,
          media_metadata (*)
        `)
        .single();

      if (updateError) throw updateError;

      return {
        ...updatedCard,
        metadata: updatedCard.media_metadata
      };
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la carte média:', error);
      throw error;
    }
  }
}

export const mediaService = new MediaService();
