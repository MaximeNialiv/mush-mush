import { useEffect, useCallback, memo } from 'react';
import { Navigation } from '@/components/layout/Navigation';
import { WorkshopCard } from '@/components/cards/WorkshopCard';
import { QuizCard } from '@/components/cards/QuizCard';
import { MediaCard } from '@/components/cards/MediaCard';
import { useCardsStore } from '@/store/cards';
import { Card } from '@/types/card';
import { ChevronRight } from 'lucide-react';

const CardComponent = memo(({ card }: { card: Card }) => {
  const selectParent = useCardsStore(state => state.selectParent);

  const handleParentClick = useCallback(() => {
    if (card.type === 'parent') {
      selectParent(card.id);
    }
  }, [card.id, card.type, selectParent]);

  switch (card.type) {
    case 'parent':
      return (
        <WorkshopCard
          title={card.title}
          description={card.description}
          image="https://picsum.photos/300/200"
          points={{knowledge: {current: 0, total: 10}, behavior: {current: 0, total: 5}, skills: {current: 0, total: 8}}}
          isParent={true}
          onClick={handleParentClick}
        />
      );
    
    case 'qcm':
      return (
        <QuizCard
          number="1"
          question={card.question}
          options={card.options.map(opt => ({ id: opt.id, text: opt.text, isCorrect: opt.isCorrect }))}
          points={{knowledge: {current: 0, total: 10}, behavior: {current: 0, total: 5}, skills: {current: 0, total: 8}}}
        />
      );
    
    case 'media':
      return (
        <MediaCard
          title={card.title}
          description={card.description}
          mediaType={card.mediaType}
          mediaUrl={card.mediaUrl}
          points={{knowledge: {current: 0, total: 10}, behavior: {current: 0, total: 5}, skills: {current: 0, total: 8}}}
        />
      );
  }
});

const Index = () => {
  const { 
    selectParent, 
    getParentCard, 
    getFilteredCards,
    handleBackNavigation,
    getTotalPoints,
    fetchCards,
    isLoading,
    error
  } = useCardsStore();
  
  const parentCard = getParentCard();
  const filteredCards = getFilteredCards();
  const totalPoints = getTotalPoints();

  const handlePopState = useCallback(() => {
    handleBackNavigation();
  }, [handleBackNavigation]);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  useEffect(() => {
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [handlePopState]);

  useEffect(() => {
    if (parentCard) {
      window.history.pushState({ parentId: parentCard.id }, '', `/${parentCard.id}`);
    } else {
      window.history.pushState({ parentId: null }, '', '/');
    }
  }, [parentCard?.id]);

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
      className="min-h-screen bg-cover bg-center bg-fixed bg-[#E0F2F1]"
      style={{
        backgroundImage: parentCard 
          ? `url('${(parentCard as any).image}')`
          : `url('https://assets.softr-files.com/applications/0529c7f1-880a-41d3-addc-b489b2ba7989/assets/411467df-de8f-47cd-aa64-c8bfef1242db.jpeg')`,
        backgroundBlendMode: 'overlay',
      }}
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
                <ChevronRight className="w-4 h-4" />
                <span className="font-medium text-gray-900">
                  {parentCard.title}
                </span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto pt-24 pb-24">
        <div className="-m-4">
          {filteredCards.map(card => (
            <CardComponent key={card.id} card={card} />
          ))}
        </div>
      </main>

      {/* Navigation */}
      <Navigation />
    </div>
  );
};

export default Index;
