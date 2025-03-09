
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Card as CardType } from "@/types/card";
import QCMCardContent from "./QCMCardContent";
import MediaCardContent from "./MediaCardContent";
import ParentCardContent from "./ParentCardContent";
import { ChevronRight } from "lucide-react";

interface CardItemProps {
  card: CardType;
  onSelect?: (card: CardType) => void;
}

const CardItem: React.FC<CardItemProps> = ({ card, onSelect }) => {
  const renderCardContent = () => {
    switch (card.type) {
      case 'qcm':
        return <QCMCardContent card={card} />;
      case 'media':
        return <MediaCardContent card={card} />;
      case 'parent':
        return <ParentCardContent card={card} />;
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mb-4">
      <CardHeader>
        <CardTitle>{card.title}</CardTitle>
        <CardDescription>{card.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {renderCardContent()}
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button 
          variant="outline" 
          onClick={() => onSelect && onSelect(card)}
          className="flex items-center gap-2"
        >
          Voir détails <ChevronRight size={16} />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CardItem;
