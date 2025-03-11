import Airtable from 'airtable';
import { AIRTABLE_CONFIG } from '../config/airtable';

const base = new Airtable({ 
  apiKey: AIRTABLE_CONFIG.accessToken,
  endpointUrl: 'https://api.airtable.com'
}).base(AIRTABLE_CONFIG.baseId);

// Données de test pour les cartes
const mockCards = [
  {
    title: 'La Fresque du Climat',
    description: 'Comprendre les enjeux du changement climatique',
    type: 'workshop',
    image: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=700&auto=format&fit=crop&q=80',
    isParent: true,
    points_knowledge_current: 9,
    points_knowledge_total: 13,
    points_behavior_current: 21,
    points_behavior_total: 21,
    points_skills_current: 3,
    points_skills_total: 3,
    ranking: 15
  },
  {
    title: 'Les bases du changement climatique',
    description: 'Testez vos connaissances sur les mécanismes du changement climatique',
    type: 'quiz',
    parentId: '', // Sera mis à jour après la création de la carte parent
    number: '4/7',
    points_knowledge_current: 0,
    points_knowledge_total: 5,
    points_behavior_current: 0,
    points_behavior_total: 3,
    points_skills_current: 0,
    points_skills_total: 2,
    ranking: 25
  }
];

// Options pour le quiz
const mockQuizOptions = [
  {
    text: 'Les émissions de gaz à effet de serre',
    isCorrect: true,
    explanation: "Les gaz à effet de serre, notamment le CO2, sont responsables de la majorité du réchauffement climatique en piégeant la chaleur dans l'atmosphère."
  },
  {
    text: 'La déforestation',
    isCorrect: false,
    explanation: "Bien que la déforestation contribue au réchauffement climatique en réduisant la capacité de la Terre à absorber le CO2, elle n'est pas la cause principale."
  },
  {
    text: 'Les éruptions volcaniques',
    isCorrect: false,
    explanation: "Les éruptions volcaniques ont un effet temporaire sur le climat et peuvent même parfois provoquer un refroidissement à court terme."
  }
];

async function setupAirtable() {
  try {
    // Créer la table Cards
    console.log('Création de la table Cards...');
    const cardsTable = await base(AIRTABLE_CONFIG.tables.cards).create([
      {
        fields: mockCards[0]
      }
    ]);
    const parentCard = cardsTable[0];
    console.log('Carte parent créée:', parentCard.id);

    // Créer la carte quiz avec le parentId
    const quizCard = {
      ...mockCards[1],
      parentId: parentCard.id
    };
    const quizTable = await base(AIRTABLE_CONFIG.tables.cards).create([
      {
        fields: quizCard
      }
    ]);
    const quiz = quizTable[0];
    console.log('Carte quiz créée:', quiz.id);

    // Créer les options du quiz
    console.log('Création des options du quiz...');
    const quizOptions = mockQuizOptions.map(option => ({
      fields: {
        ...option,
        quizId: quiz.id
      }
    }));
    await base(AIRTABLE_CONFIG.tables.quizOptions).create(quizOptions);
    console.log('Options du quiz créées');

    console.log('Configuration terminée avec succès !');
  } catch (error) {
    console.error('Erreur lors de la configuration:', error);
  }
}

setupAirtable(); 