import { Link } from "react-router-dom";
import { Facebook, Instagram, Leaf, Linkedin, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-white/80 backdrop-blur-sm border-t">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🍄</span>
            <span className="text-lg font-semibold">Mush•Mush</span>
          </div>
          <p className="text-sm text-gray-600">
            © 2024 Mush•Mush. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};
