import React, { useState } from "react";
import { Card } from "@/types/card";
import { CardHeader } from './CardHeader';
import { CardContent } from './CardContent';
import { CardFooter } from './CardFooter';
import { Button } from "@/components/ui/button";
import { ChevronLeft, Filter, Home } from "lucide-react";

interface CardFeedProps {
  cards: Card[];
  title: string;
  filteredBy?: string;
  parentCard?: Card;
  onCardSelect?: (card: Card) => void;
}

const CardFeed: React.FC<CardFeedProps> = ({
  cards,
  title,
  filteredBy,
  parentCard,
  onCardSelect,
}) => {
  const [selectedParentCard, setSelectedParentCard] = useState<Card | null>(
    parentCard || null
  );
  const [filteredCards, setFilteredCards] = useState<Card[]>(cards);

  const handleCardSelect = (card: Card) => {
    if (card.type === "parent") {
      setSelectedParentCard(card);
      setFilteredCards(cards.filter(c => card.childCards.includes(c.id)));
    }
    onCardSelect?.(card);
  };

  const handleBackToMain = () => {
    setSelectedParentCard(null);
    setFilteredCards(cards);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <CardHeader 
        selectedParentCard={selectedParentCard}
        onBackToMain={handleBackToMain}
      />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="space-y-6">
          {filteredCards.map((card) => (
            <div 
              key={card.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <CardContent 
                card={card}
                onSelect={() => handleCardSelect(card)}
              />
            </div>
          ))}
        </div>
      </main>

      <CardFooter />
    </div>
  );
};

export default CardFeed;
