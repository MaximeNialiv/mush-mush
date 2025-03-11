import Airtable from 'airtable';

const token = 'pate33kUKAUbL6OsL.e3ccbb38db68cbbe9ce6458786478fae0a140b6bca7fa90819a82cb26d72b169';
const baseId = 'appErBTyHJri8gvdN';

const base = new Airtable({ 
  apiKey: token,
  endpointUrl: 'https://api.airtable.com'
}).base(baseId);

async function testCardsFields() {
  try {
    console.log('Création d\'un enregistrement de test avec tous les champs...');
    
    const [record] = await base('Cards').create([
      {
        fields: {
          title: 'La Fresque du Climat',
          description: 'Comprendre les enjeux du changement climatique',
          type: 'workshop',
          parentId: null,
          image: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=700&auto=format&fit=crop&q=80',
          isParent: true,
          points_knowledge_current: 9,
          points_knowledge_total: 13,
          points_behavior_current: 21,
          points_behavior_total: 21,
          points_skills_current: 3,
          points_skills_total: 3,
          ranking: 15,
          mediaType: null,
          mediaUrl: null,
          number: null
        }
      }
    ]);

    console.log('Record créé avec succès !');
    console.log('ID:', record.id);
    console.log('Champs:', record.fields);

    // Créer un enregistrement enfant pour tester les relations
    console.log('\nCréation d\'un enregistrement enfant (quiz)...');
    const [childRecord] = await base('Cards').create([
      {
        fields: {
          title: 'Quiz sur le changement climatique',
          description: 'Testez vos connaissances sur les mécanismes du changement climatique',
          type: 'quiz',
          parentId: record.id,
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
    console.log('ID:', childRecord.id);
    console.log('Champs:', childRecord.fields);

    // Créer un enregistrement média
    console.log('\nCréation d\'un enregistrement média...');
    const [mediaRecord] = await base('Cards').create([
      {
        fields: {
          title: 'Comprendre l\'effet de serre',
          description: 'Une vidéo explicative sur le mécanisme de l\'effet de serre',
          type: 'media',
          parentId: record.id,
          isParent: false,
          points_knowledge_current: 2,
          points_knowledge_total: 3,
          points_behavior_current: 1,
          points_behavior_total: 2,
          points_skills_current: 1,
          points_skills_total: 1,
          ranking: 40,
          mediaType: 'youtube',
          mediaUrl: 'https://www.youtube-nocookie.com/embed/LFwxuNhQ-Yg'
        }
      }
    ]);

    console.log('Média créé avec succès !');
    console.log('ID:', mediaRecord.id);
    console.log('Champs:', mediaRecord.fields);

    // Nettoyage
    console.log('\nNettoyage des enregistrements de test...');
    await base('Cards').destroy([record.id, childRecord.id, mediaRecord.id]);
    console.log('Nettoyage terminé !');

  } catch (error) {
    console.error('Erreur lors du test :');
    console.error('- Type:', error.constructor.name);
    console.error('- Message:', error.message);
    console.error('- Code:', error.statusCode);
    console.error('- Erreur complète:', error);
  }
}

console.log('Démarrage du test des champs de la table Cards...');
testCardsFields(); 