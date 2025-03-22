import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

// Récupération des variables d'environnement pour Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('Initialisation du client Supabase...');
console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Anon Key (premiers caractères):', supabaseAnonKey ? supabaseAnonKey.substring(0, 10) + '...' : 'non définie');

// Vérification des variables d'environnement
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Variables d\'environnement Supabase manquantes');
  console.error('VITE_SUPABASE_URL:', supabaseUrl);
  console.error('VITE_SUPABASE_ANON_KEY existe:', !!supabaseAnonKey);
  throw new Error('Variables d\'environnement Supabase manquantes. Vérifiez votre fichier .env');
}

// Création du client Supabase
let supabase;

try {
  console.log('Création du client Supabase...');
  supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
  console.log('Client Supabase créé avec succès!');
} catch (error) {
  console.error('Erreur lors de la création du client Supabase:', error);
  throw error;
}

export { supabase };
