
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import CardFeed from "@/components/CardFeed";
import { mockCards } from "@/data/mockCards";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <CardFeed 
          cards={mockCards}
          title="Mush•Mush - Guide des champignons"
        />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
