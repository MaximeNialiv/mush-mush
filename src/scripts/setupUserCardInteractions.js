import Airtable from 'airtable';

const token = 'pate33kUKAUbL6OsL.e3ccbb38db68cbbe9ce6458786478fae0a140b6bca7fa90819a82cb26d72b169';
const baseId = 'appErBTyHJri8gvdN';

const base = new Airtable({ 
  apiKey: token,
  endpointUrl: 'https://api.airtable.com'
}).base(baseId);

async function testUserCardInteractions() {
  try {
    console.log('Test des interactions utilisateur-carte...\n');

    // 1. Créer un utilisateur de test
    console.log('1. Création d\'un utilisateur de test...');
    const [user] = await base('Users').create([
      {
        fields: {
          email: 'test.interactions@example.com',
          name: 'Test User',
          lastLoginAt: Date.now()
        }
      }
    ]);
    console.log('Utilisateur créé:', user.id);

    // 2. Créer des cartes de test (workshop, quiz, media)
    console.log('\n2. Création des cartes de test...');
    const [workshop, quiz, media] = await base('Cards').create([
      {
        fields: {
          title: 'Workshop Test',
          description: 'Workshop pour test des interactions',
          type: 'workshop',
          points_knowledge_total: 10,
          points_behavior_total: 5,
          points_skills_total: 5
        }
      },
      {
        fields: {
          title: 'Quiz Test',
          description: 'Quiz pour test des interactions',
          type: 'quiz',
          points_knowledge_total: 5,
          points_behavior_total: 3,
          points_skills_total: 2
        }
      },
      {
        fields: {
          title: 'Media Test',
          description: 'Media pour test des interactions',
          type: 'media',
          mediaType: 'youtube',
          points_knowledge_total: 3,
          points_behavior_total: 2,
          points_skills_total: 1
        }
      }
    ]);
    console.log('Cartes créées:', { workshop: workshop.id, quiz: quiz.id, media: media.id });

    // 3. Créer des options pour le quiz
    console.log('\n3. Création des options du quiz...');
    const [option1, option2] = await base('QuizOptions').create([
      {
        fields: {
          quizId: quiz.id,
          text: 'Option 1',
          isCorrect: true,
          explanation: 'Explication 1'
        }
      },
      {
        fields: {
          quizId: quiz.id,
          text: 'Option 2',
          isCorrect: false,
          explanation: 'Explication 2'
        }
      }
    ]);
    console.log('Options créées:', { option1: option1.id, option2: option2.id });

    // 4. Test des différents scénarios d'interaction
    console.log('\n4. Test des scénarios d\'interaction...');

    // 4.1 Commencer un workshop
    console.log('\n4.1 Démarrage d\'un workshop...');
    const [workshopStart] = await base('UserCardInteractions').create([
      {
        fields: {
          userId: user.id,
          cardId: workshop.id,
          status: 'in_progress',
          startedAt: Date.now(),
          pointsKnowledge: 0,
          pointsBehavior: 0,
          pointsSkills: 0
        }
      }
    ]);
    console.log('Workshop commencé:', workshopStart.id);

    // 4.2 Terminer le workshop
    console.log('\n4.2 Complétion du workshop...');
    const [workshopComplete] = await base('UserCardInteractions').update([
      {
        id: workshopStart.id,
        fields: {
          status: 'completed',
          completedAt: Date.now(),
          pointsKnowledge: 8,
          pointsBehavior: 4,
          pointsSkills: 5
        }
      }
    ]);
    console.log('Workshop terminé:', workshopComplete.fields);

    // 4.3 Répondre au quiz
    console.log('\n4.3 Réponse au quiz...');
    const [quizInteraction] = await base('UserCardInteractions').create([
      {
        fields: {
          userId: user.id,
          cardId: quiz.id,
          status: 'completed',
          startedAt: Date.now(),
          completedAt: Date.now(),
          pointsKnowledge: 4,
          pointsBehavior: 2,
          pointsSkills: 2,
          selectedOptions: JSON.stringify([option1.id])
        }
      }
    ]);
    console.log('Quiz complété:', quizInteraction.fields);

    // 4.4 Regarder une vidéo
    console.log('\n4.4 Visionnage d\'une vidéo...');
    const [mediaInteraction] = await base('UserCardInteractions').create([
      {
        fields: {
          userId: user.id,
          cardId: media.id,
          status: 'completed',
          startedAt: Date.now(),
          completedAt: Date.now(),
          pointsKnowledge: 3,
          pointsBehavior: 2,
          pointsSkills: 1
        }
      }
    ]);
    console.log('Media visionné:', mediaInteraction.fields);

    // 5. Rechercher toutes les interactions d'un utilisateur
    console.log('\n5. Recherche des interactions de l\'utilisateur...');
    const userInteractions = await base('UserCardInteractions')
      .select({
        filterByFormula: `{userId} = '${user.id}'`
      })
      .all();
    console.log('Nombre d\'interactions trouvées:', userInteractions.length);
    
    // Calculer les points totaux
    const totals = userInteractions.reduce((acc, interaction) => ({
      knowledge: acc.knowledge + (interaction.fields.pointsKnowledge || 0),
      behavior: acc.behavior + (interaction.fields.pointsBehavior || 0),
      skills: acc.skills + (interaction.fields.pointsSkills || 0)
    }), { knowledge: 0, behavior: 0, skills: 0 });
    
    console.log('Points totaux:', totals);

    // 6. Nettoyage
    console.log('\n6. Nettoyage des données de test...');
    await base('UserCardInteractions').destroy([
      workshopComplete.id,
      quizInteraction.id,
      mediaInteraction.id
    ]);
    await base('QuizOptions').destroy([option1.id, option2.id]);
    await base('Cards').destroy([workshop.id, quiz.id, media.id]);
    await base('Users').destroy([user.id]);
    console.log('Nettoyage terminé !');

  } catch (error) {
    console.error('\nErreur lors du test :');
    console.error('- Type:', error.constructor.name);
    console.error('- Message:', error.message);
    console.error('- Code:', error.statusCode);
    console.error('- Erreur complète:', error);
  }
}

console.log('Démarrage des tests d\'interaction utilisateur-carte...');
testUserCardInteractions(); 