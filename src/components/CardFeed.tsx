
import React, { useState } from "react";
import { Card } from "@/types/card";
import CardItem from "./cards/CardItem";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Filter } from "lucide-react";

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
      <header className="mb-6 border-b pb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-mushdark">{title}</h2>
          <Button variant="outline" size="sm" className="flex items-center gap-2 rounded-lg border-mushgray/30">
            <Filter size={14} />
            Filtrer
          </Button>
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

      <main className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayedCards.map((card) => (
          <CardItem key={card.id} card={card} onSelect={handleCardSelect} />
        ))}
      </main>

      <footer className="mt-6 pt-4 border-t flex justify-between">
        <Button variant="outline" className="text-mushgray border-mushgray/30">Précédent</Button>
        <Button className="bg-mushprimary hover:bg-mushprimary/90 text-white">Suivant</Button>
      </footer>
    </div>
  );
};

export default CardFeed;
