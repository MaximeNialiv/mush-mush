import { Card } from '@/types/card';
import { Button } from '@/components/ui/button';
import { Play, FileText, Link } from 'lucide-react';

interface CardContentProps {
  card: Card;
  onSelect: () => void;
}

export const CardContent = ({ card, onSelect }: CardContentProps) => {
  const renderMediaIcon = () => {
    switch (card.type) {
      case 'media':
        switch (card.mediaType) {
          case 'video':
            return <Play className="w-6 h-6" />;
          case 'pdf':
            return <FileText className="w-6 h-6" />;
          case 'url':
            return <Link className="w-6 h-6" />;
        }
      case 'qcm':
        return <span className="text-lg">❓</span>;
      case 'parent':
        return <span className="text-lg">📚</span>;
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
          {renderMediaIcon()}
        </div>
        
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
          <p className="text-gray-600 mb-4">{card.description}</p>
          
          {card.type === 'qcm' && (
            <div className="space-y-2">
              {card.options.map((option) => (
                <Button
                  key={option.id}
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => onSelect()}
                >
                  {option.text}
                </Button>
              ))}
            </div>
          )}
          
          {card.type === 'media' && (
            <Button
              variant="default"
              className="w-full"
              onClick={() => onSelect()}
            >
              Ouvrir le contenu
            </Button>
          )}
          
          {card.type === 'parent' && (
            <Button
              variant="default"
              className="w-full"
              onClick={() => onSelect()}
            >
              Voir les cartes ({card.childCards.length})
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}; 