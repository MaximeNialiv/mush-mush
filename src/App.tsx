import { Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import Index from './pages/Index';
import NotFound from './pages/NotFound';

const Loading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
  </div>
);

const ErrorFallback = ({ error }: { error: Error }) => {
  console.error('Application error:', error);
  
  // Afficher plus d'informations sur l'erreur
  const errorDetails = {
    message: error.message,
    stack: error.stack,
    name: error.name,
    environment: {
      mode: import.meta.env.MODE,
      isProd: import.meta.env.PROD,
      supabaseUrl: import.meta.env.VITE_SUPABASE_URL ? 'Définie' : 'Non définie',
      supabaseKey: import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Définie' : 'Non définie'
    }
  };
  
  console.log('Error details:', errorDetails);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Oups ! Quelque chose s'est mal passé</h1>
      <p className="text-gray-600 mb-4">{error.message}</p>
      <div className="bg-gray-100 p-4 rounded mb-4 max-w-2xl w-full overflow-auto">
        <pre className="text-xs">{JSON.stringify(errorDetails, null, 2)}</pre>
      </div>
      <button 
        onClick={() => window.location.reload()} 
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Rafraîchir la page
      </button>
    </div>
  );
};

const App = () => {
  return (
    <div className="p-4 bg-blue-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Test de l'application</h1>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/*" element={<Index />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default App;
