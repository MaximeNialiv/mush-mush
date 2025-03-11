import { Button } from '@/components/ui/button';
import { Home, ChevronLeft, Search, Filter, Menu } from 'lucide-react';

export const CardFooter = () => {
  return (
    <footer className="bg-white border-t py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            className="rounded-full h-14 w-14"
          >
            <Home size={20} />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            className="rounded-full h-14 w-14"
          >
            <ChevronLeft size={20} />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            className="rounded-full h-14 w-14"
          >
            <Search size={20} />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            className="rounded-full h-14 w-14 relative"
          >
            <Filter size={20} />
            <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              2
            </span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            className="rounded-full h-14 w-14"
          >
            <Menu size={20} />
          </Button>
        </div>
      </div>
    </footer>
  );
}; 