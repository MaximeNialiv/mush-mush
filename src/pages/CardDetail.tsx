
import React from "react";
import { useParams } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { mockCards } from "@/data/mockCards";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import QCMCardContent from "@/components/cards/QCMCardContent";
import MediaCardContent from "@/components/cards/MediaCardContent";
import ParentCardContent from "@/components/cards/ParentCardContent";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CardDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const card = mockCards.find(card => card.id === id);
  
  if (!card) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Carte non trouvée</h1>
            <Button onClick={() => navigate("/")}>Retour à l'accueil</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const renderCardContent = () => {
    switch (card.type) {
      case 'qcm':
        return <QCMCardContent card={card} />;
      case 'media':
        return <MediaCardContent card={card} />;
      case 'parent':
        return <ParentCardContent card={card} />;
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="mb-4 flex items-center gap-2"
        >
          <ChevronLeft size={16} /> Retour
        </Button>
        
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>{card.title}</CardTitle>
            <CardDescription>{card.description}</CardDescription>
          </CardHeader>
          <CardContent>
            {renderCardContent()}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => navigate("/")}
            >
              Retour à la liste
            </Button>
            
            {card.type === "parent" && (
              <Button onClick={() => navigate("/")}>
                Explorer le contenu
              </Button>
            )}
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default CardDetail;
