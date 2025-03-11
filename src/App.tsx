import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import Index from './pages/Index';
import NotFound from './pages/NotFound';

const Loading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
  </div>
);

const ErrorFallback = ({ error }: { error: Error }) => (
  <div className="flex flex-col items-center justify-center min-h-screen p-4">
    <h1 className="text-2xl font-bold text-red-600 mb-4">Oups ! Quelque chose s'est mal passé</h1>
    <p className="text-gray-600 mb-4">{error.message}</p>
    <button 
      onClick={() => window.location.reload()} 
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Rafraîchir la page
    </button>
  </div>
);

const App = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<Loading />}>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;
