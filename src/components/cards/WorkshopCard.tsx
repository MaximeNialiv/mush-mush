import { AccordionCard } from './AccordionCard';

interface WorkshopCardProps {
  title: string;
  description: string;
  image?: string;
  points?: {
    knowledge: { current: number; total: number; };
    behavior: { current: number; total: number; };
    skills: { current: number; total: number; };
    ranking?: number;
  };
  isParent?: boolean;
  onClick?: () => void;
}

export const WorkshopCard = ({ 
  title, 
  description, 
  image,
  points,
  isParent,
  onClick
}: WorkshopCardProps) => {
  return (
    <AccordionCard 
      title={title}
      points={points}
      onReset={isParent ? undefined : onClick}
    >
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        
        <div className="relative">
          {image && (
            <img 
              src={image} 
              alt={title}
              className="w-full h-48 object-cover rounded-[4px]"
            />
          )}
          {isParent && (
            <button
              onClick={onClick}
              className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-medium rounded-[4px] hover:bg-black/60 transition-colors"
            >
              Voir le contenu
            </button>
          )}
        </div>
      </div>
    </AccordionCard>
  );
}; 