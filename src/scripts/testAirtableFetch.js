const token = 'pate33kUKAUbL6OsL.e3ccbb38db68cbbe9ce6458786478fae0a140b6bca7fa90819a82cb26d72b169';
const baseId = 'appErBTyHJri8gvdN';

async function testAirtable() {
  try {
    console.log('🔄 Test de connexion à Airtable via fetch...');
    
    const response = await fetch(`https://api.airtable.com/v0/${baseId}/Cards`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('✅ Réponse reçue:', {
      records: data.records?.length || 0,
      firstRecord: data.records?.[0]
    });

  } catch (error) {
    console.error('❌ Erreur:', {
      name: error.name,
      message: error.message
    });
  }
}

// Pour Node.js < 18, nous devons importer fetch
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

testAirtable(); 