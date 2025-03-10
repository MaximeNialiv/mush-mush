
import React, { useState } from "react";
import { QCMCard } from "@/types/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface QCMCardContentProps {
  card: QCMCard;
}

const QCMCardContent: React.FC<QCMCardContentProps> = ({ card }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{ message: string; variant: "default" | "destructive" } | null>(null);
  
  const handleSubmit = () => {
    if (selectedOption === null) {
      setFeedback({ 
        message: "Veuillez sélectionner une réponse", 
        variant: "destructive" 
      });
      return;
    }
    
    if (card.correctAnswer !== undefined && selectedOption === card.correctAnswer) {
      setFeedback({ 
        message: "Bonne réponse !", 
        variant: "default" 
      });
    } else if (card.correctAnswer !== undefined) {
      setFeedback({ 
        message: "Mauvaise réponse", 
        variant: "destructive" 
      });
    }
  };
  
  return (
    <div className="space-y-4">
      <h3 className="font-medium">{card.question}</h3>
      
      {feedback && (
        <Alert variant={feedback.variant}>
          <AlertDescription>{feedback.message}</AlertDescription>
        </Alert>
      )}
      
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
