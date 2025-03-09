
import { Card } from "@/types/card";

export const mockCards: Card[] = [
  {
    id: "1",
    type: "qcm",
    title: "Question sur les champignons",
    description: "Testez vos connaissances sur les champignons",
    question: "Quelle partie du champignon est généralement visible au-dessus du sol?",
    options: ["Le mycélium", "Le chapeau", "Les spores", "Les racines"],
    correctAnswer: 1
  },
  {
    id: "2",
    type: "media",
    title: "Vidéo explicative",
    description: "Regardez cette vidéo pour en savoir plus sur les champignons",
    mediaType: "video",
    mediaUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: "3",
    type: "parent",
    title: "Types de champignons comestibles",
    description: "Explorer les différents types de champignons comestibles",
    childrenIds: ["4", "5", "6"]
  },
  {
    id: "4",
    type: "media",
    title: "Champignon de Paris",
    description: "Tout savoir sur le champignon de Paris",
    mediaType: "url",
    mediaUrl: "https://fr.wikipedia.org/wiki/Agaric_bispore"
  },
  {
    id: "5",
    type: "media",
    title: "Cèpe de Bordeaux",
    description: "Découvrez le fameux cèpe de Bordeaux",
    mediaType: "url",
    mediaUrl: "https://fr.wikipedia.org/wiki/C%C3%A8pe_de_Bordeaux"
  },
  {
    id: "6",
    type: "qcm",
    title: "Reconnaître les champignons comestibles",
    description: "Un petit quiz pour tester vos connaissances",
    question: "Lequel de ces champignons est comestible?",
    options: ["Amanite phalloïde", "Bolet Satan", "Pleurote en huître", "Galère marginée"],
    correctAnswer: 2
  },
  {
    id: "7",
    type: "media",
    title: "Guide des champignons",
    description: "Un guide complet au format PDF",
    mediaType: "pdf",
    mediaUrl: "https://example.com/champignons.pdf"
  }
];
