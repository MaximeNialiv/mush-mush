const Airtable = require('airtable');

const token = 'pate33kUKAUbL6OsL.e3ccbb38db68cbbe9ce6458786478fae0a140b6bca7fa90819a82cb26d72b169';
const baseId = 'appErBTyHJri8gvdN';

console.log('🔄 Test de connexion à Airtable...');

const base = new Airtable({ 
  apiKey: token,
  endpointUrl: 'https://api.airtable.com/v0'
}).base(baseId);

async function testCards() {
  try {
    console.log('📊 Lecture de la table Cards...');
    const records = await base('Cards').select().all();
    
    console.log('✅ Nombre de cartes trouvées:', records.length);
    if (records.length > 0) {
      console.log('📝 Premier enregistrement:', {
        id: records[0].id,
        fields: records[0].fields
      });
    } else {
      console.log('⚠️ Aucune carte trouvée dans la table');
    }
  } catch (error) {
    console.error('❌ Erreur lors de la lecture des cartes:', {
      name: error.name,
      message: error.message,
      statusCode: error.statusCode,
      stack: error.stack
    });
  }
}

testCards(); 