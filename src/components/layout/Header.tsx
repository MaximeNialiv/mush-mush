
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-mushlight">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link to="/" className="font-bold text-2xl text-mushdark">
            mush•mush
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="text-base font-medium text-mushdark hover:text-mushprimary transition-colors"
          >
            Home
          </Link>
          <Link
            to="#features"
            className="text-base font-medium text-mushdark hover:text-mushprimary transition-colors"
          >
            About
          </Link>
          <Link
            to="#testimonials"
            className="text-base font-medium text-mushdark hover:text-mushprimary transition-colors"
          >
            Menu
          </Link>
          <Link
            to="#contact"
            className="text-base font-medium text-mushdark hover:text-mushprimary transition-colors"
          >
            Contact
          </Link>
          <Button 
            variant="default" 
            size="lg"
            className="bg-mushprimary hover:bg-mushprimary/90 text-white rounded-full"
          >
            Order Now
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
        >
          {isMenuOpen ? <X size={24} className="text-mushdark" /> : <Menu size={24} className="text-mushdark" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-mushlight">
          <nav className="container py-6 flex flex-col gap-6">
            <Link
              to="/"
              className="text-base font-medium text-mushdark hover:text-mushprimary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="#features"
              className="text-base font-medium text-mushdark hover:text-mushprimary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="#testimonials"
              className="text-base font-medium text-mushdark hover:text-mushprimary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Menu
            </Link>
            <Link
              to="#contact"
              className="text-base font-medium text-mushdark hover:text-mushprimary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Button 
              variant="default" 
              size="lg" 
              className="w-full bg-mushprimary hover:bg-mushprimary/90 text-white rounded-full"
            >
              Order Now
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
