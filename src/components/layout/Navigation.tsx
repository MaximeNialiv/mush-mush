import { Home, BookOpen, Settings, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Search } from '@/components/Search';

export const Navigation = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Button variant="ghost" size="icon" className="rounded-full w-12 h-12">
          <Home className="w-6 h-6 text-gray-600" />
        </Button>
        
        <Search />
        
        <Button variant="ghost" size="icon" className="rounded-full w-12 h-12">
          <BookOpen className="w-6 h-6 text-gray-600" />
        </Button>
        
        <Button variant="ghost" size="icon" className="rounded-full w-12 h-12">
          <Settings className="w-6 h-6 text-gray-600" />
        </Button>
        
        <Button variant="ghost" size="icon" className="rounded-full w-12 h-12">
          <Menu className="w-6 h-6 text-gray-600" />
        </Button>
      </div>
    </nav>
  );
}; 