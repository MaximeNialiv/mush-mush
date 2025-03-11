
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
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ message: string; variant: "default" | "destructive" } | null>(null);
  
  const handleSubmit = () => {
    if (!selectedOption) {
      setFeedback({ 
        message: "Veuillez sélectionner une réponse", 
        variant: "destructive" 
      });
      return;
    }
    
    const correctOption = card.options.find(opt => opt.isCorrect);
    if (correctOption && selectedOption === correctOption.id) {
      setFeedback({ 
        message: "Bonne réponse !", 
        variant: "default" 
      });
    } else {
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
      
      <RadioGroup value={selectedOption || ''} onValueChange={setSelectedOption}>
        {card.options.map((option) => (
          <div key={option.id} className="flex items-center space-x-2">
            <RadioGroupItem value={option.id} id={option.id} />
            <Label htmlFor={option.id}>{option.text}</Label>
          </div>
        ))}
      </RadioGroup>
      <Button onClick={handleSubmit} className="w-full">Valider</Button>
    </div>
  );
};

export default QCMCardContent;
