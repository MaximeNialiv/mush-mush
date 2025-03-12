export type MediaType = 'youtube' | 'pdf' | 'spotify' | 'url_preview';

export interface MediaMetadata {
  // Métadonnées communes
  title?: string;
  description?: string;
  thumbnailUrl?: string;
  duration?: number;

  // Métadonnées spécifiques YouTube
  youtubeId?: string;
  channelTitle?: string;

  // Métadonnées Spotify
  spotifyId?: string;
  artistName?: string;
  albumName?: string;

  // Métadonnées PDF
  pageCount?: number;
  fileSize?: number;

  // Métadonnées URL Preview
  siteName?: string;
  favicon?: string;
  ogImage?: string;
}

export interface MediaCardData {
  id: string;
  type: 'media';
  title: string;
  description?: string;
  mediaType: MediaType;
  mediaUrl: string;
  metadata: MediaMetadata;
  createdAt: string;
  updatedAt: string;
}
