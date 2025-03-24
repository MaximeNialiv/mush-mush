import { useEffect, useCallback, memo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Navigation } from '@/components/layout/Navigation';
import { WorkshopCard } from '@/components/cards/WorkshopCard';
import { ContentViewer } from '@/components/cards/ContentViewer';
import { useCardsStore } from '@/store/cards';
import { Card } from '@/types/card';
import { ChevronRight, ArrowLeft } from 'lucide-react';

const Index = () => {
  const [selectedContent, setSelectedContent] = useState<Card | null>(null);
  const { 
    selectParent, 
    getParentCard, 
    getFilteredCards,
    handleBackNavigation,
    getTotalPoints,
    fetchCards,
    isLoading,
    error,
    cards,
    navigationHistory
  } = useCardsStore();

  // Charger les cartes au montage du composant
  useEffect(() => {
    console.log('Index component mounted, fetching cards...');
    fetchCards();
    
    // Forcer un rechargement des cartes après 2 secondes si nécessaire
    const timer = setTimeout(() => {
      if (cards.length === 0 && !isLoading && !error) {
        console.log('Aucune carte chargée après le délai, rechargement...');
        fetchCards();
      }
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [fetchCards, cards.length, isLoading, error]);
  
  // Effet pour logger l'état des cartes après chargement
  useEffect(() => {
    console.log('Cards state updated:', {
      totalCards: cards.length,
      isLoading,
      error,
      navigationHistory
    });
    
    if (cards.length > 0) {
      console.log('Sample cards:', cards.slice(0, 3));
    }
    
    // Si aucune carte n'est sélectionnée et que nous avons des cartes, sélectionnons la racine
    if (cards.length > 0 && !selectedContent && navigationHistory.length === 0) {
      console.log('Aucune carte sélectionnée, affichage des cartes racines');
      // Réinitialiser la sélection pour afficher les cartes racines
      selectParent(null);
    }
  }, [cards, isLoading, error, navigationHistory, selectedContent, selectParent]);

  const handleOpenContent = useCallback((card: Card) => {
    if (card.content) {
      setSelectedContent(card);
    } else {
      selectParent(card.id);
    }
  }, [selectParent]);



  
  const parentCard = getParentCard();
  console.log('Parent card:', parentCard);
  
  const filteredCards = getFilteredCards();
  console.log('Filtered cards:', {
    count: filteredCards.length,
    parentId: parentCard?.id || 'null',
    cards: filteredCards.map(card => ({
      id: card.id,
      title: card.title,
      parent_id: card.parent_id
    }))
  });
  
  // S'assurer que nous avons bien des cartes filtrées
  useEffect(() => {
    if (filteredCards.length === 0 && cards.length > 0 && !isLoading) {
      console.log('Aucune carte filtrée trouvée, retour à la racine');
      selectParent(null);
    }
  }, [filteredCards.length, cards.length, isLoading, selectParent]);
  
  const totalPoints = getTotalPoints();
  console.log('Total points:', totalPoints);

  const navigate = useNavigate();
  const location = useLocation();

  // Charger l'état initial une seule fois au montage
  useEffect(() => {
    const loadInitialState = async () => {
      await fetchCards();
      
      // Récupérer le chemin depuis l'URL initiale
      const pathSegments = location.pathname
        .split('/')
        .filter(segment => segment !== '');
      
      // Si nous avons un chemin initial, sélectionner le dernier segment
      if (pathSegments.length > 0) {
        selectParent(pathSegments[pathSegments.length - 1]);
      }
    };
    
    loadInitialState();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Gérer le bouton retour du navigateur
  useEffect(() => {
    const handlePopState = () => {
      handleBackNavigation();
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [handleBackNavigation]);

  // Mettre à jour l'URL quand la navigation change
  useEffect(() => {
    if (navigationHistory.length > 0) {
      const path = navigationHistory.join('/');
      navigate(`/${path}`, { replace: true });
    } else {
      navigate('/', { replace: true });
    }
  }, [navigationHistory, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#E0F2F1]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-black border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des cartes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#E0F2F1]">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => fetchCards()}
            className="button-primary"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-[#E0F2F1] to-[#B2DFDB]"
    >
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-b border-black z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {parentCard ? (
                  <button 
                    onClick={() => selectParent(null)}
                    className="flex items-center gap-2 hover:opacity-75 transition-opacity"
                  >
                    <span className="text-2xl">←</span>
                    <span className="font-['Archivo_Black'] text-base">{parentCard.title}</span>
                  </button>
                ) : (
                  <>
                    <span className="text-2xl">🍄</span>
                    <span className="font-['Archivo_Black'] text-base">Mush•Mush</span>
                  </>
                )}
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  🪴 {totalPoints.knowledge.current}/{totalPoints.knowledge.total}
                </span>
                <span className="text-sm text-gray-600">
                  🧊 {totalPoints.skills.current}/{totalPoints.skills.total}
                </span>
                <span className="text-sm text-gray-600">
                  🔥 {totalPoints.behavior.current}/{totalPoints.behavior.total}
                </span>
              </div>
            </div>
            
            {/* Breadcrumb */}
            {parentCard && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <button 
                  onClick={() => selectParent(null)}
                  className="hover:text-gray-900 transition-colors"
                >
                  Accueil
                </button>
                {cards
                  .filter(card => navigationHistory.includes(card.id))
                  .map((card, index) => (
                    <div key={card.id} className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4" />
                      {index === navigationHistory.length - 1 ? (
                        <span className="font-medium text-gray-900">
                          {card.title}
                        </span>
                      ) : (
                        <button
                          onClick={() => selectParent(card.id)}
                          className="hover:text-gray-900 transition-colors"
                        >
                          {card.title}
                        </button>
                      )}
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Débogage - Visible uniquement en développement */}
      {process.env.NODE_ENV !== 'production' && (
        <div className="fixed bottom-0 right-0 bg-white/90 p-2 text-xs border border-gray-300 m-2 rounded z-50 max-w-xs overflow-auto max-h-48">
          <p><strong>Debug:</strong> {cards.length} cartes</p>
          <p><strong>Parent:</strong> {parentCard?.id || 'racine'}</p>
          <p><strong>Historique:</strong> {navigationHistory.join(' > ')}</p>
          <p><strong>Filtrées:</strong> {filteredCards?.length || 0} cartes</p>
          <button 
            onClick={() => {
              console.log('Toutes les cartes:', cards);
              console.log('Cartes filtrées:', filteredCards);
              console.log('Historique:', navigationHistory);
              console.log('Parent:', parentCard);
            }}
            className="bg-gray-200 px-1 py-0.5 rounded mt-1 hover:bg-gray-300"
          >
            Log détails
          </button>
        </div>
      )}
      
      {/* Main Content */}
      <main className="fixed inset-x-0 bottom-0 top-24 overflow-x-auto">
        <div className="h-full flex">
          {/* Colonnes de navigation */}
          <div className="flex-1 flex overflow-x-auto">
            {/* Version mobile : uniquement la colonne active */}
            <div className="md:hidden h-full w-full">
              <div 
                className="w-full h-full border-r border-gray-200 overflow-y-auto p-4 relative"
                style={{
                  backgroundImage: navigationHistory.length > 0 
                    ? `linear-gradient(to bottom, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url(${cards.find(c => c.id === navigationHistory[navigationHistory.length - 1])?.image_url || ''})`
                    : undefined,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {navigationHistory.length === 0 ? (
                  // Afficher la colonne racine
                  cards
                    .filter(card => card.parent_id === '00000')
                    .map((card) => (
                      <div key={card.id} className="mb-4 last:mb-0">
                        <WorkshopCard 
                          card={card}
                          onOpenContent={handleOpenContent}
                          isSelected={navigationHistory.includes(card.id)}
                        />
                      </div>
                    ))
                ) : (
                  // Afficher la colonne active
                  <>
                    {cards
                      .filter(card => card.parent_id === navigationHistory[navigationHistory.length - 1])
                      .map((card) => (
                        <div key={card.id} className="mb-4 last:mb-0">
                          <WorkshopCard 
                            card={card}
                            onOpenContent={handleOpenContent}
                            isSelected={navigationHistory.includes(card.id)}
                          />
                        </div>
                      ))}
                    {cards.filter(card => card.parent_id === navigationHistory[navigationHistory.length - 1]).length === 0 && (
                      <div className="h-full flex flex-col items-center justify-center text-center p-4">
                        <button
                          onClick={() => handleBackNavigation()}
                          className="flex flex-col items-center gap-4 text-gray-500 hover:text-gray-700 transition-colors"
                        >
                          <ArrowLeft className="w-8 h-8" />
                          <p>Cette colonne est vide.<br />Cliquez ici pour revenir à la colonne précédente</p>
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Version desktop : afficher uniquement le chemin direct */}
            <div className="hidden md:flex h-full transition-transform duration-300 ease-in-out">
              {/* Colonne racine */}
              <div 
                className="w-[350px] min-w-[350px] border-r border-gray-200 overflow-y-auto p-4 relative"
                style={{
                  backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url(${cards.find(c => c.parent_id === '00000')?.image_url || ''})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {cards
                  .filter(card => card.parent_id === '00000')
                  .map((card) => (
                    <div key={card.id} className="mb-4 last:mb-0">
                      <WorkshopCard 
                        card={card}
                        onOpenContent={handleOpenContent}
                        isSelected={navigationHistory.includes(card.id)}
                      />
                    </div>
                  ))}
              </div>

              {/* Colonnes du chemin direct */}
              {navigationHistory.map((id, index) => {
                const levelCards = cards.filter(card => card.parent_id === id);
                return (
                  <div 
                    key={id} 
                    className="w-[350px] min-w-[350px] border-r border-gray-200 overflow-y-auto p-4 animate-slideIn relative"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url(${cards.find(c => c.id === id)?.image_url || ''})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    {levelCards.length > 0 ? (
                      levelCards.map((card) => (
                        <div key={card.id} className="mb-4 last:mb-0">
                          <WorkshopCard 
                            card={card}
                            onOpenContent={handleOpenContent}
                            isSelected={navigationHistory.includes(card.id)}
                          />
                        </div>
                      ))
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-center p-4">
                        <button
                          onClick={() => handleBackNavigation()}
                          className="flex flex-col items-center gap-4 text-gray-500 hover:text-gray-700 transition-colors"
                        >
                          <ArrowLeft className="w-8 h-8" />
                          <p>Cette colonne est vide.<br />Cliquez ici pour revenir à la colonne précédente</p>
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Colonne de contenu */}
          {selectedContent && (
            <div className="w-[500px] min-w-[500px] border-l border-gray-200 bg-white">
              <ContentViewer card={selectedContent} onClose={() => setSelectedContent(null)} />
            </div>
          )}
        </div>
      </main>

      {/* Navigation */}
      <Navigation />
    </div>
  );
};

export default Index;
