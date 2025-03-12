import React from 'react';
import { AccordionCard } from './AccordionCard';
import { YouTubePlayer } from '../media/YouTubePlayer';
import { PDFViewer } from '../media/PDFViewer';
import { SpotifyPlayer } from '../media/SpotifyPlayer';
import { URLPreview } from '../media/URLPreview';
import { MediaCardData } from '@/types/media';
import { FileText, Music, Link, Video } from 'lucide-react';

const MediaIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'youtube':
      return <Video className="w-5 h-5 text-red-600" />;
    case 'pdf':
      return <FileText className="w-5 h-5 text-blue-600" />;
    case 'spotify':
      return <Music className="w-5 h-5 text-green-600" />;
    default:
      return <Link className="w-5 h-5 text-gray-600" />;
  }
};

interface MediaCardProps {
  card: MediaCardData;
  onClose?: () => void;
}

export const MediaCard: React.FC<MediaCardProps> = ({ card, onClose }) => {
  const { title, description, mediaType, mediaUrl, metadata } = card;

  const renderMedia = () => {
    switch (mediaType) {
      case 'youtube':
        return <YouTubePlayer url={mediaUrl} metadata={metadata} />;
      case 'pdf':
        return <PDFViewer url={mediaUrl} metadata={metadata} />;
      case 'spotify':
        return <SpotifyPlayer url={mediaUrl} metadata={metadata} />;
      case 'url_preview':
        return <URLPreview url={mediaUrl} metadata={metadata} />;
      default:
        return (
          <div className="flex items-center justify-center h-48 bg-gray-100 rounded-lg">
            <p className="text-sm text-gray-500">Type de média non supporté</p>
          </div>
        );
    }
  };

  return (
    <AccordionCard 
      title={title}
      onClose={onClose}
    >
      <div className="space-y-4">
        {(description || metadata?.description) && (
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
            <MediaIcon type={mediaType} />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-600">
                {description || metadata.description}
              </p>
              {metadata?.channelTitle && (
                <p className="mt-1 text-xs text-gray-500">
                  Par {metadata.channelTitle}
                </p>
              )}
              {metadata?.artistName && (
                <p className="mt-1 text-xs text-gray-500">
                  {metadata.artistName} {metadata.albumName && `• ${metadata.albumName}`}
                </p>
              )}
              {metadata?.pageCount && (
                <p className="mt-1 text-xs text-gray-500">
                  {metadata.pageCount} pages
                  {metadata.fileSize && ` • ${(metadata.fileSize / 1024 / 1024).toFixed(1)} MB`}
                </p>
              )}
            </div>
          </div>
        )}
        
        <div className="overflow-hidden rounded-lg border bg-white">
          {renderMedia()}
        </div>
      </div>
    </AccordionCard>
  );
};
