import React from 'react';
import { Music } from 'lucide-react';
import { MediaMetadata } from '@/types/media';

interface SpotifyPlayerProps {
  url: string;
  metadata: MediaMetadata;
}

export const SpotifyPlayer: React.FC<SpotifyPlayerProps> = ({ url, metadata }) => {
  const { artistName, albumName, spotifyId } = metadata;

  return (
    <div className="rounded-lg overflow-hidden bg-[#1DB954] bg-opacity-5">
      <div className="flex items-center gap-3 p-4 border-b">
        <Music className="w-6 h-6 text-[#1DB954]" />
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-900 truncate">
            {metadata.title || 'Piste Spotify'}
          </h3>
          {artistName && (
            <p className="text-xs text-gray-500 truncate">
              {artistName} {albumName && `• ${albumName}`}
            </p>
          )}
        </div>
      </div>

      <div className="relative bg-black aspect-[16/9] max-h-[380px]">
        <audio
          controls
          className="w-full h-full"
          preload="metadata"
        >
          <source src={url} type="audio/mpeg" />
          Votre navigateur ne supporte pas la lecture audio.
        </audio>
      </div>
    </div>
  );
};
