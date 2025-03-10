
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import CardFeed from "@/components/CardFeed";
import { mockCards } from "@/data/mockCards";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col garden-bg">
      <Header />
      <div className="container mx-auto px-4 py-8 mt-16 mb-16">
        <main className="bg-white/80 backdrop-blur-sm rounded-[32px] shadow-lg p-6">
          <CardFeed 
            cards={mockCards}
            title="Le Potager"
          />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
