
import React, { useState } from "react";
import { Card } from "@/types/card";
import CardItem from "./cards/CardItem";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Filter, Home } from "lucide-react";

interface CardFeedProps {
  cards: Card[];
  title: string;
  filteredBy?: string;
  parentCard?: Card;
}

const CardFeed: React.FC<CardFeedProps> = ({
  cards,
  title,
  filteredBy,
  parentCard,
}) => {
  const [selectedParent, setSelectedParent] = useState<Card | null>(
    parentCard || null
  );

  const displayedCards = selectedParent
    ? cards.filter(
        (card) =>
          selectedParent.type === "parent" &&
          (selectedParent as any).childrenIds.includes(card.id)
      )
    : cards;

  const handleCardSelect = (card: Card) => {
    if (card.type === "parent") {
      setSelectedParent(card);
    }
  };

  const handleBack = () => {
    setSelectedParent(null);
  };

  return (
    <div className="w-full">
      <header className="mb-6 pb-4 flex flex-col gap-2">
        <div className="flex items-center gap-2 text-mushdark mb-2">
          <Home size={16} />
          <span className="text-sm"> &gt; Ressources &gt; Le Jardin</span>
        </div>
        
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-mushdark flex items-center gap-2">
            <span>&gt;</span> {title}
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <span className="text-mushsecondary text-lg">🌱</span>
              <span className="font-semibold">9/13</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-blue-400 text-lg">❄️</span>
              <span className="font-semibold">3/3</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-red-500 text-lg">🔥</span>
              <span className="font-semibold">21/21</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-mushsecondary text-lg">🏆</span>
              <span className="font-semibold">15%</span>
            </div>
          </div>
        </div>
        
        {selectedParent && (
          <div className="mt-4 flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="flex items-center gap-1 text-mushprimary"
            >
              <ChevronLeft size={16} /> Retour
            </Button>
            <span className="text-mushgray text-sm">
              Affichage du contenu: {selectedParent.title}
            </span>
          </div>
        )}
      </header>

      <main className="space-y-6">
        {displayedCards.map((card) => (
          <CardItem key={card.id} card={card} onSelect={handleCardSelect} />
        ))}
      </main>

      <footer className="mt-8 pt-4 border-t flex justify-center">
        <div className="flex gap-4">
          <Button className="bg-white hover:bg-gray-100 text-mushdark rounded-full shadow-md h-14 w-14 p-0">
            <Home size={20} />
          </Button>
          <Button className="bg-white hover:bg-gray-100 text-mushdark rounded-full shadow-md h-14 w-14 p-0">
            <ChevronLeft size={20} />
          </Button>
          <Button className="bg-white hover:bg-gray-100 text-mushdark rounded-full shadow-md h-14 w-14 p-0">
            <Search size={20} />
          </Button>
          <Button className="bg-white hover:bg-gray-100 text-mushdark rounded-full shadow-md h-14 w-14 p-0 relative">
            <Filter size={20} />
            <span className="absolute -top-1 -right-1 bg-mushprimary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">2</span>
          </Button>
          <Button className="bg-white hover:bg-gray-100 text-mushdark rounded-full shadow-md h-14 w-14 p-0">
            <Menu size={20} />
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default CardFeed;
