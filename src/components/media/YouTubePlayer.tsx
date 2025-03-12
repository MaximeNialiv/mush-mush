import React, { useRef, useEffect, useState } from 'react';
import { MediaMetadata } from '@/types/media';

interface YouTubePlayerProps {
  url: string;
  metadata: MediaMetadata;
}

export const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ url, metadata }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoId, setVideoId] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const id = metadata.youtubeId || extractYouTubeId(url);
    if (id) {
      setVideoId(id);
      // Utiliser l'API YouTube Data pour récupérer les métadonnées si nécessaire
    } else {
      setError('ID YouTube invalide');
    }
  }, [url, metadata]);

  const extractYouTubeId = (url: string): string => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : '';
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-48 bg-gray-100 rounded-lg">
        <p className="text-gray-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
      <video
        ref={videoRef}
        src={`https://www.youtube-nocookie.com/embed/${videoId}`}
        controls
        className="w-full h-full"
        poster={metadata.thumbnailUrl}
        preload="metadata"
      >
        <source src={`https://www.youtube-nocookie.com/embed/${videoId}`} type="video/mp4" />
        Votre navigateur ne supporte pas la lecture vidéo.
      </video>
    </div>
  );
};
