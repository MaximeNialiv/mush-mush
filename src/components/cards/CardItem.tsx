
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Card as CardType } from "@/types/card";
import QCMCardContent from "./QCMCardContent";
import MediaCardContent from "./MediaCardContent";
import ParentCardContent from "./ParentCardContent";
import { ChevronRight, FileText, PenTool, Play } from "lucide-react";

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

  const getCardIcon = () => {
    switch (card.type) {
      case 'qcm':
        return <PenTool size={16} className="text-mushprimary" />;
      case 'media':
        return card.mediaType === 'video' 
          ? <Play size={16} className="text-mushprimary" />
          : <FileText size={16} className="text-mushprimary" />;
      case 'parent':
        return <FileText size={16} className="text-mushprimary" />;
      default:
        return <FileText size={16} className="text-mushprimary" />;
    }
  };

  return (
    <Card className="w-full overflow-hidden border border-gray-100 hover:shadow-md transition-all rounded-2xl">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2 mb-1">
          <div className="bg-mushprimary/10 p-1 rounded-md">
            {getCardIcon()}
          </div>
          <span className="text-xs text-mushgray uppercase font-medium">
            {card.type === 'qcm' ? 'Quiz' : card.type === 'parent' ? 'Collection' : card.mediaType}
          </span>
        </div>
        <CardTitle className="text-lg font-semibold">{card.title}</CardTitle>
        <CardDescription className="text-mushgray">{card.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {renderCardContent()}
      </CardContent>
      <CardFooter className="flex justify-end pt-2 pb-4 border-t">
        <Button 
          variant="ghost" 
          onClick={() => onSelect && onSelect(card)}
          className="text-sm text-mushprimary hover:text-mushprimary/90 hover:bg-mushprimary/5 p-2 h-auto"
        >
          Voir détails <ChevronRight size={14} />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CardItem;
