import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center garden-bg">
      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl mb-6">Page non trouvée</p>
        <Link 
          to="/" 
          className="text-mushprimary hover:text-mushsecondary transition-colors"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
