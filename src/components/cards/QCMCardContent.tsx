
import React, { useState } from "react";
import { QCMCard } from "@/types/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface QCMCardContentProps {
  card: QCMCard;
}

const QCMCardContent: React.FC<QCMCardContentProps> = ({ card }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  
  const handleSubmit = () => {
    if (selectedOption === null) {
      toast({
        description: "Veuillez sélectionner une réponse"
      });
      return;
    }
    
    if (card.correctAnswer !== undefined && selectedOption === card.correctAnswer) {
      toast({
        description: "Bonne réponse !"
      });
    } else if (card.correctAnswer !== undefined) {
      toast({
        description: "Mauvaise réponse"
      });
    }
  };
  
  return (
    <div className="space-y-4">
      <h3 className="font-medium">{card.question}</h3>
      <RadioGroup value={selectedOption?.toString()} onValueChange={(value) => setSelectedOption(parseInt(value))}>
        {card.options.map((option, index) => (
          <div key={index} className="flex items-center space-x-2">
            <RadioGroupItem value={index.toString()} id={`option-${index}`} />
            <Label htmlFor={`option-${index}`}>{option}</Label>
          </div>
        ))}
      </RadioGroup>
      <Button onClick={handleSubmit} className="w-full">Valider</Button>
    </div>
  );
};

export default QCMCardContent;
