
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Card as CardType } from "@/types/card";
import QCMCardContent from "./QCMCardContent";
import MediaCardContent from "./MediaCardContent";
import ParentCardContent from "./ParentCardContent";
import { ChevronRight, FileText, MoreVertical, PenTool, Play } from "lucide-react";

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
        return <PenTool size={16} className="text-white" />;
      case 'media':
        return card.mediaType === 'video' 
          ? <Play size={16} className="text-white" />
          : <FileText size={16} className="text-white" />;
      case 'parent':
        return <FileText size={16} className="text-white" />;
      default:
        return <FileText size={16} className="text-white" />;
    }
  };

  return (
    <Card className="w-full overflow-hidden border-none bg-white shadow-lg hover:shadow-xl transition-all rounded-[32px]">
      <CardHeader className="pb-2 relative">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="bg-mushprimary p-3 rounded-full">
              {getCardIcon()}
            </div>
            <CardTitle className="text-xl font-bold">{card.title}</CardTitle>
          </div>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreVertical size={20} />
          </Button>
        </div>
        <CardDescription className="text-mushgray mt-2">{card.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {renderCardContent()}
      </CardContent>
      <CardFooter className="justify-end pt-2 pb-4">
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
