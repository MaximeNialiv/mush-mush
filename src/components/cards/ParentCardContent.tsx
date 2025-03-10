
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
        <FolderOpen size={24} className="text-mushprimary" />
        <p className="text-sm text-mushgray">
          Contient {card.childrenIds.length} élément{card.childrenIds.length > 1 ? 's' : ''}
        </p>
      </div>
      <Button variant="outline" className="w-full rounded-full border-mushprimary/30 text-mushprimary hover:bg-mushprimary/5">
        Explorer le contenu
      </Button>
    </div>
  );
};

export default ParentCardContent;
