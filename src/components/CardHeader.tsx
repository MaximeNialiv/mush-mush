import { Card } from '@/types/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Home } from 'lucide-react';

interface CardHeaderProps {
  selectedParentCard: Card | null;
  onBackToMain: () => void;
}

export const CardHeader = ({ selectedParentCard, onBackToMain }: CardHeaderProps) => {
  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBackToMain}
              className="flex items-center gap-1"
            >
              <Home size={16} />
              <span>Accueil</span>
            </Button>
            
            {selectedParentCard && (
              <div className="flex items-center gap-2">
                <ChevronLeft size={16} />
                <span className="text-sm text-gray-600">
                  {selectedParentCard.title}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-green-500">🌱</span>
              <span className="font-medium">9/13</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-500">❄️</span>
              <span className="font-medium">3/3</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-red-500">🔥</span>
              <span className="font-medium">21/21</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}; 