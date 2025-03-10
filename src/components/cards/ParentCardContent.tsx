
import React from "react";
import { ParentCard } from "@/types/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface ParentCardContentProps {
  card: ParentCard;
}

const ParentCardContent: React.FC<ParentCardContentProps> = ({ card }) => {
  return (
    <div className="space-y-4">
      <Button 
        variant="outline" 
        className="w-full rounded-full border-mushprimary text-mushprimary hover:bg-mushprimary/5 flex items-center justify-center gap-2"
      >
        Explorer le contenu
        <ChevronRight size={16} />
      </Button>
    </div>
  );
};

export default ParentCardContent;
