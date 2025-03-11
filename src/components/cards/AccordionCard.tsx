import { ReactNode, useState } from 'react';
import { ChevronDown, Share, Archive, Star, MoreVertical, RotateCcw } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { cn } from '@/lib/utils';

interface AccordionCardProps {
  title: string;
  children: ReactNode;
  points?: {
    knowledge: { current: number; total: number; };
    behavior: { current: number; total: number; };
    skills: { current: number; total: number; };
    ranking?: number;
  };
  onReset?: () => void;
}

export const AccordionCard = ({ title, children, points, onReset }: AccordionCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-[16px] shadow-[2px_-2px_0px_0px_rgb(0,0,0)] border border-black m-4 max-w-[350px] mx-auto overflow-hidden">
      <div className="p-4 flex items-center justify-between">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-3 flex-1"
        >
          <ChevronDown 
            className={cn(
              "w-5 h-5 transition-transform duration-300",
              isOpen && "transform rotate-180"
            )}
          />
          <h3 className="font-['Archivo_Black'] text-base text-gray-900">{title}</h3>
        </button>
        
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="p-1 hover:bg-gray-100 rounded-full">
              <MoreVertical className="w-5 h-5" />
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content 
              className="bg-white rounded-lg shadow-lg border border-gray-200 py-1 min-w-[160px]"
              sideOffset={5}
            >
              {onReset && (
                <DropdownMenu.Item 
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={onReset}
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Réessayer</span>
                </DropdownMenu.Item>
              )}
              <DropdownMenu.Item className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer">
                <Share className="w-4 h-4" />
                <span>Partager</span>
              </DropdownMenu.Item>
              <DropdownMenu.Item className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer">
                <Archive className="w-4 h-4" />
                <span>Archiver</span>
              </DropdownMenu.Item>
              <DropdownMenu.Item className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer">
                <Star className="w-4 h-4" />
                <span>Mettre en favori</span>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>

      <div 
        className={cn(
          "grid transition-all duration-300",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <div className="p-4 border-t border-gray-200">
            {children}
          </div>
          
          {points && (
            <div className="px-4 pb-4 text-sm text-gray-600">
              <div className="flex items-center gap-2 flex-wrap">
                <span>🪴 {points.knowledge.current}/{points.knowledge.total}</span>
                <span>•</span>
                <span>🔥 {points.behavior.current}/{points.behavior.total}</span>
                <span>•</span>
                <span>🧊 {points.skills.current}/{points.skills.total}</span>
                {points.ranking && (
                  <>
                    <span>•</span>
                    <span>🏆 Top {points.ranking}%</span>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 