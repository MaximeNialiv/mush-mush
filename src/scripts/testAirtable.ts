import Airtable from 'airtable';

const token = 'pate33kUKAUbL6OsL.e3ccbb38db68cbbe9ce6458786478fae0a140b6bca7fa90819a82cb26d72b169';
const baseId = 'appErBTyHJri8gvdN';

const base = new Airtable({ 
  apiKey: token,
  endpointUrl: 'https://api.airtable.com'
}).base(baseId);

// Liste toutes les tables
base.tables.forEach(table => {
  console.log('Table trouvée:', table.name);
});

async function testConnection() {
  try {
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

    // Supprime le record de test
    await base('Cards').destroy([record.id]);
    console.log('Record de test supprimé');

  } catch (error) {
    console.error('Erreur de connexion:', error);
  }
}

testConnection(); 