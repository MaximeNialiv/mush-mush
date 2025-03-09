
import React from "react";
import { MediaCard } from "@/types/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { File, FileImage, FileVideo, Link } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MediaCardContentProps {
  card: MediaCard;
}

const MediaCardContent: React.FC<MediaCardContentProps> = ({ card }) => {
  const renderMediaContent = () => {
    switch (card.mediaType) {
      case 'video':
        return (
          <AspectRatio ratio={16 / 9} className="bg-muted rounded-md overflow-hidden">
            <div className="flex items-center justify-center h-full">
              {card.mediaUrl ? (
                <iframe 
                  src={card.mediaUrl} 
                  className="w-full h-full" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                />
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <FileVideo size={48} className="text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mt-2">Vidéo non disponible</p>
                </div>
              )}
            </div>
          </AspectRatio>
        );
      case 'pdf':
        return (
          <div className="flex flex-col items-center justify-center p-6 border rounded-md border-dashed">
            <File size={48} className="text-muted-foreground" />
            <p className="text-sm text-muted-foreground mt-2">Document PDF</p>
            <Button className="mt-4" variant="outline" asChild>
              <a href={card.mediaUrl} target="_blank" rel="noopener noreferrer">
                Télécharger
              </a>
            </Button>
          </div>
        );
      case 'url':
        return (
          <div className="flex flex-col items-center justify-center p-6 border rounded-md border-dashed">
            <Link size={48} className="text-muted-foreground" />
            <p className="text-sm text-muted-foreground mt-2">Lien externe</p>
            <Button className="mt-4" variant="outline" asChild>
              <a href={card.mediaUrl} target="_blank" rel="noopener noreferrer">
                Visiter
              </a>
            </Button>
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center p-6 border rounded-md border-dashed">
            <FileImage size={48} className="text-muted-foreground" />
            <p className="text-sm text-muted-foreground mt-2">Media non disponible</p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-4">
      {renderMediaContent()}
    </div>
  );
};

export default MediaCardContent;
