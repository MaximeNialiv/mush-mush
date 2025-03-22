// Script pour tester la connexion à Supabase
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Configuration pour charger les variables d'environnement
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

// Récupération des variables d'environnement
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Anon Key (premiers caractères):', supabaseAnonKey ? supabaseAnonKey.substring(0, 10) + '...' : 'non définie');

// Vérification des variables d'environnement
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Variables d\'environnement Supabase manquantes');
  console.error('VITE_SUPABASE_URL:', supabaseUrl);
  console.error('VITE_SUPABASE_ANON_KEY existe:', !!supabaseAnonKey);
  process.exit(1);
}

// Création du client Supabase
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Test de connexion
async function testConnection() {
  try {
    console.log('Tentative de connexion à Supabase...');
    
    // Récupération des cartes
    const { data, error } = await supabase
      .from('cards')
      .select('*')
      .limit(10);
    
    if (error) {
      throw error;
    }
    
    console.log(`Connexion réussie! ${data.length} cartes récupérées.`);
    
    if (data.length > 0) {
      console.log('Exemple de carte:');
      console.log(JSON.stringify(data[0], null, 2));
    }
    
    return true;
  } catch (error) {
    console.error('Erreur lors de la connexion à Supabase:', error);
    return false;
  }
}

// Exécution du test
testConnection()
  .then(success => {
    console.log('Test terminé avec', success ? 'succès' : 'échec');
    process.exit(success ? 0 : 1);
  })
  .catch(error => {
    console.error('Erreur inattendue:', error);
    process.exit(1);
  });
