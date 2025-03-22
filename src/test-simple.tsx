import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

// Activer les logs pour le débogage
console.log('Chargement du composant TestSimple...');

/**
 * Composant de test simple pour vérifier la connexion à Supabase
 */
const TestSimple: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any[]>([]);
  const [supabaseUrl, setSupabaseUrl] = useState<string>('');
  const [supabaseKey, setSupabaseKey] = useState<string>('');

  useEffect(() => {
    console.log('TestSimple monté');
    
    // Récupérer les variables d'environnement
    const url = import.meta.env.VITE_SUPABASE_URL || '';
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
    
    console.log('Variables d\'environnement:', { 
      VITE_SUPABASE_URL: url,
      VITE_SUPABASE_ANON_KEY: key ? `${key.substring(0, 10)}...` : 'non définie'
    });
    
    setSupabaseUrl(url);
    setSupabaseKey(key ? key.substring(0, 10) + '...' : '');

    // Tester la connexion à Supabase directement
    const testConnection = async () => {
      try {
        setLoading(true);
        console.log('Tentative de connexion directe à Supabase...');
        
        // Vérifier que le client Supabase est disponible
        if (!supabase) {
          throw new Error('Le client Supabase n\'est pas disponible');
        }
        
        // Vérifier les variables d'environnement
        console.log('Variables d\'environnement Supabase:');
        console.log('- URL:', import.meta.env.VITE_SUPABASE_URL);
        console.log('- Clé définie:', !!import.meta.env.VITE_SUPABASE_ANON_KEY);
        
        console.log('Client Supabase disponible, récupération des cartes...');
        
        // Tester la connexion avec une requête simple
        console.log('Test de connexion avec une requête simple...');
        const { data: testData, error: testError } = await supabase
          .from('cards')
          .select('count')
          .limit(1);
          
        if (testError) {
          console.error('Erreur lors du test de connexion:', testError);
          throw testError;
        }
        
        console.log('Test de connexion réussi, récupération des cartes...');
        const { data, error } = await supabase
          .from('cards')
          .select('*')
          .limit(10);
        
        if (error) {
          console.error('Erreur lors de la récupération des cartes:', error);
          throw error;
        }
        
        console.log(`${data?.length || 0} cartes récupérées`);
        if (data && data.length > 0) {
          console.log('Exemple de carte:');
          console.log(JSON.stringify(data[0], null, 2));
          
          // Vérifier la structure des cartes
          console.log('Structure de la carte:');
          Object.keys(data[0]).forEach(key => {
            console.log(`- ${key}: ${typeof data[0][key]}`);
          });
        }
        
        setData(data || []);
        setError(null);
      } catch (err) {
        console.error('Erreur lors du test:', err);
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    };

    testConnection();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Test Simple de Connexion Supabase</h1>
      
      <div className="mb-6 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Configuration</h2>
        <div className="grid grid-cols-2 gap-2">
          <div className="font-medium">URL Supabase:</div>
          <div>{supabaseUrl || 'Non définie'}</div>
          
          <div className="font-medium">Clé Supabase:</div>
          <div>{supabaseKey || 'Non définie'}</div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Statut du test</h2>
        {loading ? (
          <div className="p-4 bg-blue-100 text-blue-700 rounded-lg">
            Chargement des données...
          </div>
        ) : error ? (
          <div className="p-4 bg-red-100 text-red-700 rounded-lg">
            <p className="font-bold">Erreur:</p>
            <p>{error}</p>
          </div>
        ) : (
          <div className="p-4 bg-green-100 text-green-700 rounded-lg">
            Connexion réussie! {data.length} cartes récupérées.
          </div>
        )}
      </div>

      {!loading && !error && data.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Cartes récupérées</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.map((card) => (
              <div key={card.id} className="p-4 border rounded-lg shadow-sm">
                <h3 className="font-bold">{card.title}</h3>
                <p className="text-sm text-gray-600">ID: {card.id}</p>
                {card.description && (
                  <p className="mt-2 text-sm">{card.description}</p>
                )}
                {card.parent_id && (
                  <p className="mt-1 text-xs text-gray-500">Parent: {card.parent_id}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 p-4 bg-yellow-50 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Diagnostic</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            {supabaseUrl ? (
              <span className="text-green-600">✓ URL Supabase configurée</span>
            ) : (
              <span className="text-red-600">✗ URL Supabase manquante</span>
            )}
          </li>
          <li>
            {supabaseKey ? (
              <span className="text-green-600">✓ Clé Supabase configurée</span>
            ) : (
              <span className="text-red-600">✗ Clé Supabase manquante</span>
            )}
          </li>
          <li>
            {!loading && !error ? (
              <span className="text-green-600">✓ Connexion à Supabase réussie</span>
            ) : (
              <span className="text-red-600">✗ Échec de connexion à Supabase</span>
            )}
          </li>
          <li>
            {!loading && !error && data.length > 0 ? (
              <span className="text-green-600">✓ Cartes récupérées avec succès</span>
            ) : (
              <span className="text-red-600">✗ Échec de récupération des cartes</span>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TestSimple;
