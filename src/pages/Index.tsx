
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import CardFeed from "@/components/CardFeed";
import { mockCards } from "@/data/mockCards";
import { Button } from "@/components/ui/button";
import { Leaf, Recycle, Search } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-mushlight">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <section className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-mushdark">
            Guide complet de l'écologie
          </h1>
          <p className="text-xl text-mushgray mb-8 max-w-3xl mx-auto">
            Découvrez les principes fondamentaux pour préserver notre planète et adoptez un mode de vie plus respectueux de l'environnement.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button className="bg-mushprimary hover:bg-mushprimary/90 text-white rounded-full px-6 py-6 flex items-center gap-2">
              <Search size={20} />
              Explorer le guide
            </Button>
            <Button variant="outline" className="border-mushprimary text-mushprimary hover:bg-mushprimary/10 rounded-full px-6 py-6 flex items-center gap-2">
              <Leaf size={20} />
              Astuces écologiques
            </Button>
          </div>
        </section>
        
        <section className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-mushdark">Catégories populaires</h2>
            <Button variant="ghost" className="text-mushprimary hover:text-mushprimary/80">
              Voir tout
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all flex items-center gap-4">
              <div className="bg-mushprimary/10 p-3 rounded-full">
                <Leaf className="text-mushprimary" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-mushdark">Énergie renouvelable</h3>
                <p className="text-sm text-mushgray">12 articles</p>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all flex items-center gap-4">
              <div className="bg-mushprimary/10 p-3 rounded-full">
                <Recycle className="text-mushprimary" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-mushdark">Recyclage</h3>
                <p className="text-sm text-mushgray">8 articles</p>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all flex items-center gap-4">
              <div className="bg-mushprimary/10 p-3 rounded-full">
                <Search className="text-mushprimary" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-mushdark">Conseils pratiques</h3>
                <p className="text-sm text-mushgray">15 articles</p>
              </div>
            </div>
          </div>
        </section>
        
        <main className="bg-white rounded-xl shadow-sm p-6">
          <CardFeed 
            cards={mockCards}
            title="Contenus éducatifs"
          />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
