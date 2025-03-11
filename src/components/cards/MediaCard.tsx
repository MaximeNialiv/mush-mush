import { AccordionCard } from './AccordionCard';
import { Play, FileText, Headphones, Youtube } from 'lucide-react';

type MediaType = 'youtube' | 'pdf' | 'podcast' | 'video';

interface MediaCardProps {
  title: string;
  description?: string;
  mediaType: MediaType;
  mediaUrl: string;
  points?: {
    knowledge: { current: number; total: number; };
    behavior: { current: number; total: number; };
    skills: { current: number; total: number; };
    ranking?: number;
  };
}

const getYoutubeEmbedUrl = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11
    ? `https://www.youtube.com/embed/${match[2]}`
    : url;
};

const MediaContent = ({ type, url }: { type: MediaType; url: string }) => {
  switch (type) {
    case 'youtube':
      return (
        <div className="relative pb-[56.25%] h-0 rounded-lg overflow-hidden">
          <iframe
            src={getYoutubeEmbedUrl(url)}
            className="absolute top-0 left-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer"
            sandbox="allow-same-origin allow-scripts allow-popups allow-presentation"
          />
        </div>
      );
    
    case 'pdf':
      return (
        <div className="relative pb-[141%] h-0 rounded-lg overflow-hidden">
          <iframe
            src={url}
            className="absolute top-0 left-0 w-full h-full"
            loading="lazy"
            referrerPolicy="no-referrer"
            sandbox="allow-same-origin allow-scripts allow-popups allow-presentation"
          />
        </div>
      );
    
    case 'podcast':
      return (
        <div className="relative pb-[56.25%] h-0 rounded-lg overflow-hidden">
          <iframe
            src={url}
            className="absolute top-0 left-0 w-full h-full"
            loading="lazy"
            referrerPolicy="no-referrer"
            sandbox="allow-same-origin allow-scripts allow-popups allow-presentation"
            allow="autoplay"
          />
        </div>
      );
    
    case 'video':
      return (
        <div className="relative pb-[56.25%] h-0 rounded-lg overflow-hidden">
          <iframe
            src={url}
            className="absolute top-0 left-0 w-full h-full"
            loading="lazy"
            referrerPolicy="no-referrer"
            sandbox="allow-same-origin allow-scripts allow-popups allow-presentation"
            allow="autoplay; fullscreen"
          />
        </div>
      );
    
    default:
      return null;
  }
};

const MediaIcon = ({ type }: { type: MediaType }) => {
  switch (type) {
    case 'youtube':
      return <Youtube className="w-6 h-6 text-red-600" />;
    case 'pdf':
      return <FileText className="w-6 h-6 text-blue-600" />;
    case 'podcast':
      return <Headphones className="w-6 h-6 text-purple-600" />;
    case 'video':
      return <Play className="w-6 h-6 text-green-600" />;
    default:
      return null;
  }
};

export const MediaCard = ({ 
  title,
  description,
  mediaType,
  mediaUrl,
  points
}: MediaCardProps) => {
  return (
    <AccordionCard 
      title={title}
      points={points}
    >
      <div className="space-y-4">
        {description && (
          <div className="flex items-start gap-3">
            <MediaIcon type={mediaType} />
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        )}
        
        <div className="border rounded-lg overflow-hidden">
          <MediaContent type={mediaType} url={mediaUrl} />
        </div>
      </div>
    </AccordionCard>
  );
}; 