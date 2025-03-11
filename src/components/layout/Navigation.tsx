import { Home, Search, BookOpen, Settings, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Navigation = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t">
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          <Button variant="ghost" size="icon" className="rounded-full w-12 h-12">
            <Home className="w-6 h-6 text-gray-600" />
          </Button>
          
          <Button variant="ghost" size="icon" className="rounded-full w-12 h-12">
            <Search className="w-6 h-6 text-gray-600" />
          </Button>
          
          <Button 
            variant="primary" 
            size="icon" 
            className="rounded-full w-16 h-16 -mt-8 bg-mushprimary shadow-lg hover:bg-mushprimary/90"
          >
            <BookOpen className="w-8 h-8 text-white" />
          </Button>
          
          <Button variant="ghost" size="icon" className="rounded-full w-12 h-12">
            <Settings className="w-6 h-6 text-gray-600" />
          </Button>
          
          <Button variant="ghost" size="icon" className="rounded-full w-12 h-12">
            <Menu className="w-6 h-6 text-gray-600" />
          </Button>
        </div>
      </div>
    </nav>
  );
}; 