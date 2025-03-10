
import { Link } from "react-router-dom";
import { Facebook, Instagram, Leaf, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-mushdark py-12 text-white">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="font-bold text-xl text-white flex items-center mb-4">
              <Leaf className="mr-1" size={20} />
              mush•mush
            </Link>
            <p className="text-gray-300 max-w-md mb-6">
              Votre guide complet pour comprendre et agir face aux défis environnementaux.
              Découvrez des ressources éducatives et des conseils pratiques pour adopter
              un mode de vie plus écologique.
            </p>
            
            <div className="flex gap-4">
              <a 
                href="#" 
                className="bg-white/10 hover:bg-mushprimary transition-colors rounded-full h-9 w-9 flex items-center justify-center"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="#" 
                className="bg-white/10 hover:bg-mushprimary transition-colors rounded-full h-9 w-9 flex items-center justify-center"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="#" 
                className="bg-white/10 hover:bg-mushprimary transition-colors rounded-full h-9 w-9 flex items-center justify-center"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a 
                href="#" 
                className="bg-white/10 hover:bg-mushprimary transition-colors rounded-full h-9 w-9 flex items-center justify-center"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Nos ressources</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-mushprimary transition-colors text-sm"
                >
                  Guides pratiques
                </Link>
              </li>
              <li>
                <Link
                  to="#features"
                  className="text-gray-300 hover:text-mushprimary transition-colors text-sm"
                >
                  Quiz interactifs
                </Link>
              </li>
              <li>
                <Link
                  to="#testimonials"
                  className="text-gray-300 hover:text-mushprimary transition-colors text-sm"
                >
                  Vidéos éducatives
                </Link>
              </li>
              <li>
                <Link
                  to="#contact"
                  className="text-gray-300 hover:text-mushprimary transition-colors text-sm"
                >
                  Articles approfondis
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Informations</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="text-gray-300 hover:text-mushprimary transition-colors text-sm"
                >
                  À propos
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-mushprimary transition-colors text-sm"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-gray-300 hover:text-mushprimary transition-colors text-sm"
                >
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-gray-300 hover:text-mushprimary transition-colors text-sm"
                >
                  Conditions d'utilisation
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Mush•Mush. Tous droits réservés.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a
              href="/sitemap"
              className="text-gray-400 hover:text-mushprimary transition-colors text-xs"
            >
              Plan du site
            </a>
            <a
              href="/accessibility"
              className="text-gray-400 hover:text-mushprimary transition-colors text-xs"
            >
              Accessibilité
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
