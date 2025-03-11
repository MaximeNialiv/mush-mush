import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card = ({ children, className, onClick }: CardProps) => {
  return (
    <div 
      className={cn(
        "bg-white rounded-[16px] shadow-[2px_-2px_0px_0px_rgb(0,0,0)] overflow-hidden transition-transform hover:scale-[1.02] m-4 max-w-[350px] mx-auto border border-black",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  time?: string;
  progress?: string;
}

export const CardHeader = ({ title, subtitle, icon, time, progress }: CardHeaderProps) => {
  return (
    <div className="p-4 flex items-start justify-between">
      <div className="flex items-start gap-3">
        {icon && (
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            {icon}
          </div>
        )}
        <div>
          <h3 className="font-['Archivo_Black'] text-base text-gray-900">{title}</h3>
          {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
        </div>
      </div>
      {(time || progress) && (
        <div className="flex items-center gap-2">
          {time && (
            <span className="text-sm text-gray-600 flex items-center gap-1">
              ⏱️ {time}
            </span>
          )}
          {progress && (
            <span className="text-sm text-gray-600 flex items-center gap-1">
              📊 {progress}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export const CardContent = ({ children, className }: CardContentProps) => {
  return (
    <div className={cn("p-4", className)}>
      {children}
    </div>
  );
};

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

export const CardFooter = ({ children, className }: CardFooterProps) => {
  return (
    <div className={cn("p-4 border-t", className)}>
      {children}
    </div>
  );
}; 