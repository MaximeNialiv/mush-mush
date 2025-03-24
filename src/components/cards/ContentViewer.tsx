import { ExternalLink, Play } from 'lucide-react';
import { Card } from '@/types/database';

interface ContentViewerProps {
  card: Card;
  onClose?: () => void;
}

export const ContentViewer = ({ card, onClose }: ContentViewerProps) => {
  if (!card.content) return null;

  // Extrait l'ID de la vidéo YouTube de l'URL
  const getYoutubeId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i);
    return match ? match[1] : null;
  };

  const renderContent = () => {
    switch (card.content?.type) {
      case 'quiz':
        return (
          <div className="space-y-4">
            {card.content.questions.map((question, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="font-medium mb-4 text-lg">{question.text}</h3>
                <div className="space-y-3">
                  {question.options.map((option, optIndex) => (
                    <button
                      key={optIndex}
                      className="w-full text-left p-4 rounded-lg border hover:border-[#1B5E20] hover:bg-[#1B5E20]/5 transition-colors"
                    >
                      {option.text}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case 'youtube':
        const videoId = getYoutubeId(card.content.url);
        return videoId ? (
          <div className="aspect-video rounded-lg overflow-hidden bg-black">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : null;

      case 'spotify':
        return (
          <iframe
            src={card.content.url}
            width="100%"
            height="152"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="rounded-lg"
          />
        );

      case 'url':
        return (
          <iframe
            src={card.content.url}
            className="w-full h-full rounded-lg border-0"
            loading="lazy"
          />
        );
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="space-y-1">
          <h2 className="font-['Archivo_Black'] text-xl text-gray-900">{card.title}</h2>
          {card.description && (
            <p className="text-gray-600">{card.description}</p>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {renderContent()}
      </div>
    </div>
  );
};
