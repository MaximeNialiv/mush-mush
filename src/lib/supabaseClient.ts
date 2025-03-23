import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

// Fonction pour déterminer si nous sommes en production (sur Vercel)
const isProduction = () => {
  return import.meta.env.PROD && window.location.hostname !== 'localhost';
};

// Récupération des variables d'environnement pour Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('Initialisation du client Supabase...');
console.log('Mode de l\'application:', import.meta.env.MODE);
console.log('Est en production:', isProduction());
console.log('Hostname:', window.location.hostname);
console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Anon Key (premiers caractères):', supabaseAnonKey ? supabaseAnonKey.substring(0, 10) + '...' : 'non définie');

// Vérification des variables d'environnement
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Variables d\'environnement Supabase manquantes');
  console.error('VITE_SUPABASE_URL:', supabaseUrl);
  console.error('VITE_SUPABASE_ANON_KEY existe:', !!supabaseAnonKey);
  throw new Error('Variables d\'environnement Supabase manquantes. Vérifiez votre fichier .env');
}

// Création du client Supabase avec des options supplémentaires pour éviter les problèmes CORS
let supabase;

try {
  console.log('Création du client Supabase...');
  
  // Options supplémentaires pour le client Supabase
  const options = {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
    },
    global: {
      headers: {
        'X-Client-Info': 'mush-mush-app',
      },
    },
  };
  
  supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, options);
  console.log('Client Supabase créé avec succès!');
} catch (error) {
  console.error('Erreur lors de la création du client Supabase:', error);
  throw error;
}

export { supabase };
