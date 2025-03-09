
import React from "react";
import { ParentCard } from "@/types/card";
import { Button } from "@/components/ui/button";
import { FolderOpen } from "lucide-react";

interface ParentCardContentProps {
  card: ParentCard;
}

const ParentCardContent: React.FC<ParentCardContentProps> = ({ card }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <FolderOpen size={24} className="text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          Contient {card.childrenIds.length} élément{card.childrenIds.length > 1 ? 's' : ''}
        </p>
      </div>
      <Button variant="secondary" className="w-full">
        Explorer le contenu
      </Button>
    </div>
  );
};

export default ParentCardContent;
