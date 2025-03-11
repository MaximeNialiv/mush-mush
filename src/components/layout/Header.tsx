import { useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Leaf, Menu, Search, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-b z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🍄</span>
            <span className="text-xl font-semibold">Mush•Mush</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="text-sm font-medium text-mushdark hover:text-mushprimary transition-colors"
            >
              Accueil
            </Link>
            <Link
              to="#features"
              className="text-sm font-medium text-mushdark hover:text-mushprimary transition-colors"
            >
              Guide
            </Link>
            <Link
              to="#testimonials"
              className="text-sm font-medium text-mushdark hover:text-mushprimary transition-colors"
            >
              Ressources
            </Link>
            <Link
              to="#contact"
              className="text-sm font-medium text-mushdark hover:text-mushprimary transition-colors"
            >
              Contact
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="icon" className="text-mushgray">
              <Search size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="text-mushgray">
              <BookOpen size={20} />
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="rounded-full border-mushprimary text-mushprimary"
            >
              <User size={16} className="mr-2" />
              Se connecter
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-mushgray"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-md">
          <nav className="container py-4 flex flex-col gap-4">
            <Link
              to="/"
              className="text-sm font-medium text-mushdark hover:text-mushprimary transition-colors px-4 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Accueil
            </Link>
            <Link
              to="#features"
              className="text-sm font-medium text-mushdark hover:text-mushprimary transition-colors px-4 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Guide
            </Link>
            <Link
              to="#testimonials"
              className="text-sm font-medium text-mushdark hover:text-mushprimary transition-colors px-4 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Ressources
            </Link>
            <Link
              to="#contact"
              className="text-sm font-medium text-mushdark hover:text-mushprimary transition-colors px-4 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="flex items-center gap-2 px-4 py-2">
              <Button variant="ghost" size="icon" className="text-mushgray">
                <Search size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="text-mushgray">
                <BookOpen size={20} />
              </Button>
            </div>
            <Button 
              variant="outline" 
              className="m-4 rounded-full border-mushprimary text-mushprimary"
            >
              <User size={16} className="mr-2" />
              Se connecter
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};
