import Airtable from 'airtable';

const token = 'pate33kUKAUbL6OsL.e3ccbb38db68cbbe9ce6458786478fae0a140b6bca7fa90819a82cb26d72b169';
const baseId = 'appErBTyHJri8gvdN';

const base = new Airtable({ 
  apiKey: token,
  endpointUrl: 'https://api.airtable.com'
}).base(baseId);

async function testQuizOptions() {
  try {
    console.log('Création d\'une carte quiz...');
    
    // Créer d'abord une carte quiz
    const [quizCard] = await base('Cards').create([
      {
        fields: {
          title: 'Les causes du changement climatique',
          description: 'Quelles sont les principales causes du changement climatique ?',
          type: 'quiz',
          isParent: false,
          points_knowledge_current: 0,
          points_knowledge_total: 5,
          points_behavior_current: 0,
          points_behavior_total: 3,
          points_skills_current: 0,
          points_skills_total: 2,
          ranking: 25,
          number: '1/5'
        }
      }
    ]);

    console.log('Quiz créé avec succès !');
    console.log('ID du quiz:', quizCard.id);

    // Créer les options du quiz
    console.log('\nCréation des options du quiz...');
    const options = await base('QuizOptions').create([
      {
        fields: {
          quizId: quizCard.id,
          text: 'Les émissions de gaz à effet de serre',
          isCorrect: true,
          explanation: "Les gaz à effet de serre, notamment le CO2, sont responsables de la majorité du réchauffement climatique en piégeant la chaleur dans l'atmosphère."
        }
      },
      {
        fields: {
          quizId: quizCard.id,
          text: 'La déforestation',
          isCorrect: false,
          explanation: "Bien que la déforestation contribue au réchauffement climatique en réduisant la capacité de la Terre à absorber le CO2, elle n'est pas la cause principale."
        }
      },
      {
        fields: {
          quizId: quizCard.id,
          text: 'Les éruptions volcaniques',
          isCorrect: false,
          explanation: "Les éruptions volcaniques ont un effet temporaire sur le climat et peuvent même parfois provoquer un refroidissement à court terme."
        }
      }
    ]);

    console.log('Options créées avec succès !');
    console.log('Nombre d\'options créées:', options.length);
    options.forEach((option, index) => {
      console.log(`\nOption ${index + 1}:`);
      console.log('ID:', option.id);
      console.log('Texte:', option.fields.text);
      console.log('Correcte:', option.fields.isCorrect ? 'Oui' : 'Non');
    });

    // Lire toutes les options pour ce quiz
    console.log('\nLecture des options du quiz...');
    const records = await base('QuizOptions')
      .select({
        filterByFormula: `{quizId} = '${quizCard.id}'`
      })
      .all();
    
    console.log('Options trouvées:', records.length);

    // Nettoyage
    console.log('\nNettoyage des données de test...');
    await base('QuizOptions').destroy(options.map(opt => opt.id));
    await base('Cards').destroy([quizCard.id]);
    console.log('Nettoyage terminé !');

  } catch (error) {
    console.error('Erreur lors du test :');
    console.error('- Type:', error.constructor.name);
    console.error('- Message:', error.message);
    console.error('- Code:', error.statusCode);
    console.error('- Erreur complète:', error);
  }
}

console.log('Démarrage du test des options de quiz...');
testQuizOptions(); 