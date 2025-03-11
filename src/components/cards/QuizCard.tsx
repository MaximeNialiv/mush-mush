import { useState } from 'react';
import { AccordionCard } from './AccordionCard';
import { cn } from '@/lib/utils';
import { Check, X, Square, CheckSquare } from 'lucide-react';

interface QuizCardProps {
  number: string;
  question: string;
  options: Array<{
    id: string;
    text: string;
    isCorrect?: boolean;
    explanation?: string;
  }>;
  points?: {
    knowledge: { current: number; total: number; };
    behavior: { current: number; total: number; };
    skills: { current: number; total: number; };
    ranking?: number;
  };
}

export const QuizCard = ({ 
  number,
  question, 
  options,
  points: initialPoints
}: QuizCardProps) => {
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(new Set());
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [points, setPoints] = useState<QuizCardProps['points']>({
    knowledge: { current: 0, total: options.length },
    behavior: { current: 0, total: options.length },
    skills: { current: 0, total: options.length }
  });

  const handleOptionClick = (optionId: string) => {
    if (!isSubmitted) {
      setSelectedOptions(prev => {
        const newSet = new Set(prev);
        if (newSet.has(optionId)) {
          newSet.delete(optionId);
        } else {
          newSet.add(optionId);
        }
        return newSet;
      });
    }
  };

  const handleSubmit = () => {
    if (selectedOptions.size > 0 && !isSubmitted) {
      // Compter les points pour chaque option
      let correctAnswers = 0;
      
      options.forEach(option => {
        const isCorrectlyAnswered = (
          (option.isCorrect && selectedOptions.has(option.id)) || 
          (!option.isCorrect && !selectedOptions.has(option.id))
        );
        if (isCorrectlyAnswered) {
          correctAnswers++;
        }
      });

      setPoints({
        knowledge: { 
          current: correctAnswers,
          total: options.length
        },
        behavior: { 
          current: correctAnswers,
          total: options.length
        },
        skills: { 
          current: correctAnswers,
          total: options.length
        },
        ranking: initialPoints?.ranking
      });
      
      setIsSubmitted(true);
    }
  };

  const handleReset = () => {
    setSelectedOptions(new Set());
    setIsSubmitted(false);
    setPoints({
      knowledge: { current: 0, total: options.length },
      behavior: { current: 0, total: options.length },
      skills: { current: 0, total: options.length }
    });
  };

  return (
    <AccordionCard 
      title={`Question ${number}`}
      points={points}
      onReset={handleReset}
    >
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-base font-medium">{question}</p>
        </div>
        <div className="space-y-2">
          {options.map((option) => {
            const isSelected = selectedOptions.has(option.id);
            const showCorrection = isSubmitted && (isSelected || option.isCorrect);
            const isCorrectlyAnswered = isSubmitted && (
              (option.isCorrect && isSelected) || 
              (!option.isCorrect && !isSelected)
            );
            const shouldShowResult = isSubmitted && (isSelected || option.isCorrect);
            
            return (
              <button
                key={option.id}
                onClick={() => handleOptionClick(option.id)}
                className={cn(
                  "w-full text-left p-4 rounded-lg border transition-all relative",
                  isSelected && !isSubmitted && "border-gray-400 bg-gray-50",
                  !isSubmitted && "hover:border-gray-300 hover:bg-gray-50",
                  isSubmitted && isSelected && option.isCorrect && "border-green-500 bg-green-50",
                  isSubmitted && isSelected && !option.isCorrect && "border-red-500 bg-red-50",
                  isSubmitted && !isSelected && option.isCorrect && "border-green-500 bg-green-50",
                  isSubmitted && "cursor-default"
                )}
                disabled={isSubmitted}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {isSubmitted ? (
                      shouldShowResult ? (
                        <div className={cn(
                          "rounded-full p-1",
                          isCorrectlyAnswered ? "bg-green-100" : "bg-red-100"
                        )}>
                          {isCorrectlyAnswered ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <X className="w-4 h-4 text-red-600" />
                          )}
                        </div>
                      ) : (
                        <Square className="w-5 h-5 text-gray-400" />
                      )
                    ) : (
                      isSelected ? (
                        <CheckSquare className="w-5 h-5 text-gray-600" />
                      ) : (
                        <Square className="w-5 h-5 text-gray-400" />
                      )
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{option.text}</p>
                    {showCorrection && option.explanation && (
                      <p className="text-sm text-gray-600 mt-2">{option.explanation}</p>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {!isSubmitted && selectedOptions.size > 0 && (
          <button
            onClick={handleSubmit}
            className="w-full py-3 px-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            Valider ma réponse
          </button>
        )}

        {isSubmitted && (
          <div className={cn(
            "p-4 rounded-lg",
            points.knowledge.current === points.knowledge.total
              ? "bg-green-50 border border-green-200"
              : "bg-red-50 border border-red-200"
          )}>
            <p className="font-medium">
              {points.knowledge.current === points.knowledge.total
                ? `Bravo ! C'est la bonne réponse ! 🎉 Tu as gagné ${points.knowledge.current} points de chaque type !`
                : `Tu as obtenu ${points.knowledge.current} points sur ${points.knowledge.total} possibles. Continue comme ça ! 💪`}
            </p>
          </div>
        )}
      </div>
    </AccordionCard>
  );
}; 