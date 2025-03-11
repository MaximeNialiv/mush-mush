import Airtable from 'airtable';

const token = 'pate33kUKAUbL6OsL.e3ccbb38db68cbbe9ce6458786478fae0a140b6bca7fa90819a82cb26d72b169';
const baseId = 'appErBTyHJri8gvdN';

const base = new Airtable({ 
  apiKey: token,
  endpointUrl: 'https://api.airtable.com'
}).base(baseId);

async function testUsers() {
  try {
    console.log('Test de la table Users...\n');

    // Création d'un utilisateur
    console.log('1. Création d\'un nouvel utilisateur...');
    const [user] = await base('Users').create([
      {
        fields: {
          email: 'test@example.com',
          name: 'Jean Test',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JeanTest',
          lastLoginAt: Date.now()
        }
      }
    ]);

    console.log('Utilisateur créé avec succès !');
    console.log('ID:', user.id);
    console.log('Données:', user.fields);

    // Recherche d'un utilisateur par email
    console.log('\n2. Recherche de l\'utilisateur par email...');
    const foundUsers = await base('Users')
      .select({
        filterByFormula: `{email} = 'test@example.com'`
      })
      .all();

    console.log('Utilisateur trouvé:', foundUsers.length > 0 ? 'Oui' : 'Non');
    if (foundUsers.length > 0) {
      console.log('Données trouvées:', foundUsers[0].fields);
    }

    // Mise à jour d'un utilisateur
    console.log('\n3. Mise à jour de l\'utilisateur...');
    const [updatedUser] = await base('Users').update([
      {
        id: user.id,
        fields: {
          name: 'Jean Test Updated',
          lastLoginAt: Date.now()
        }
      }
    ]);

    console.log('Utilisateur mis à jour avec succès !');
    console.log('Nouveau nom:', updatedUser.fields.name);
    console.log('Nouvelle date de connexion:', new Date(updatedUser.fields.lastLoginAt).toLocaleString());

    // Test de création d'un utilisateur avec le même email
    console.log('\n4. Test de création d\'un doublon...');
    try {
      await base('Users').create([
        {
          fields: {
            email: 'test@example.com',
            name: 'Doublon Test',
            lastLoginAt: Date.now()
          }
        }
      ]);
    } catch (error) {
      console.log('Erreur de doublon détectée (c\'est normal) :', error.message);
    }

    // Nettoyage
    console.log('\n5. Nettoyage des données de test...');
    await base('Users').destroy([user.id]);
    console.log('Nettoyage terminé !');

    // Vérification finale
    console.log('\n6. Vérification finale...');
    const finalCheck = await base('Users')
      .select({
        filterByFormula: `{email} = 'test@example.com'`
      })
      .all();

    console.log('Utilisateur toujours présent:', finalCheck.length > 0 ? 'Oui' : 'Non');

  } catch (error) {
    console.error('\nErreur lors du test :');
    console.error('- Type:', error.constructor.name);
    console.error('- Message:', error.message);
    console.error('- Code:', error.statusCode);
    console.error('- Erreur complète:', error);
  }
}

console.log('Démarrage des tests de la table Users...');
testUsers(); 