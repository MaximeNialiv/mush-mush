import Airtable from 'airtable';

const token = 'pate33kUKAUbL6OsL.e3ccbb38db68cbbe9ce6458786478fae0a140b6bca7fa90819a82cb26d72b169';
const baseId = 'appErBTyHJri8gvdN';

console.log('Configuration de la connexion Airtable...');
console.log('Base ID:', baseId);

const base = new Airtable({ 
  apiKey: token,
  endpointUrl: 'https://api.airtable.com'
}).base(baseId);

async function testConnection() {
  try {
    console.log('Tentative de création d\'un enregistrement de test...');
    
    // Essaie de créer un enregistrement dans la table Cards
    const [record] = await base('Cards').create([
      {
        fields: {
          title: 'Test de connexion',
          description: 'Ceci est un test de connexion à Airtable',
          type: 'workshop'
        }
      }
    ]);

    console.log('Connexion réussie ! Record créé:', record.id);
    console.log('Données du record:', record.fields);

    // Supprime le record de test
    console.log('Suppression du record de test...');
    await base('Cards').destroy([record.id]);
    console.log('Record de test supprimé avec succès');

  } catch (error) {
    console.error('Erreur de connexion détaillée:');
    console.error('- Type:', error.constructor.name);
    console.error('- Message:', error.message);
    console.error('- Code:', error.statusCode);
    console.error('- Erreur complète:', error);
  }
}

console.log('Démarrage du test de connexion...');
testConnection(); 