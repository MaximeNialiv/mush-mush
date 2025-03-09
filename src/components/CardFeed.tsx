
import React, { useState } from "react";
import { Card } from "@/types/card";
import CardItem from "./cards/CardItem";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

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
    <div className="container mx-auto py-6">
      <header className="mb-6 border-b pb-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{title}</h1>
          {filteredBy && (
            <div className="bg-muted px-3 py-1 rounded-full text-sm">
              Filtré par: {filteredBy}
            </div>
          )}
        </div>
        {selectedParent && (
          <div className="mt-4 flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="flex items-center gap-1"
            >
              <ChevronLeft size={16} /> Retour
            </Button>
            <span className="text-muted-foreground">
              Affichage du contenu: {selectedParent.title}
            </span>
          </div>
        )}
      </header>

      <main className="space-y-4">
        {displayedCards.map((card) => (
          <CardItem key={card.id} card={card} onSelect={handleCardSelect} />
        ))}
      </main>

      <footer className="mt-6 pt-4 border-t flex justify-between">
        <Button variant="outline">Précédent</Button>
        <Button>Suivant</Button>
      </footer>
    </div>
  );
};

export default CardFeed;
