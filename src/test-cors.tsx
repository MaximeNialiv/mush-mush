import React, { useEffect, useState } from 'react';
import { supabase } from './lib/supabaseClient';
import { Card } from './types/database';

const TestCORS: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [envInfo, setEnvInfo] = useState<Record<string, any>>({});

  useEffect(() => {
    // Collecter les informations sur l'environnement
    const info = {
      mode: import.meta.env.MODE,
      isProd: import.meta.env.PROD,
      hostname: window.location.hostname,
      supabaseUrl: import.meta.env.VITE_SUPABASE_URL || 'Non définie',
      supabaseKeyExists: !!import.meta.env.VITE_SUPABASE_ANON_KEY,
      userAgent: navigator.userAgent,
      protocol: window.location.protocol,
    };
    
    setEnvInfo(info);
    
    // Tester la connexion à Supabase
    testSupabaseConnection();
  }, []);

  const testSupabaseConnection = async () => {
    try {
      console.log('Test de connexion à Supabase...');
      setLoading(true);
      
      // Test 1: Vérifier si le client Supabase est correctement initialisé
      if (!supabase) {
        throw new Error('Client Supabase non initialisé');
      }
      
      // Test 2: Tester une requête simple pour récupérer les cartes
      console.log('Récupération des cartes...');
      const { data, error } = await supabase
        .from('cards')
        .select('*')
        .limit(5);
      
      if (error) {
        console.error('Erreur lors de la récupération des cartes:', error);
        throw error;
      }
      
      console.log('Cartes récupérées avec succès:', data);
      setCards(data || []);
      setLoading(false);
    } catch (err: any) {
      console.error('Erreur lors du test de connexion:', err);
      setError(err.message || 'Erreur inconnue');
      setLoading(false);
    }
  };

  // Test manuel avec fetch pour contourner Supabase
  const testDirectFetch = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !supabaseKey) {
        throw new Error('Variables d\'environnement manquantes');
      }
      
      const response = await fetch(`${supabaseUrl}/rest/v1/cards?select=*&limit=5`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`
        }
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erreur HTTP: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      console.log('Données récupérées avec fetch direct:', data);
      setCards(data || []);
      setLoading(false);
    } catch (err: any) {
      console.error('Erreur lors du test direct:', err);
      setError(err.message || 'Erreur inconnue');
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Test de connexion Supabase</h1>
      
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
        <h2>Informations d'environnement</h2>
        <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(envInfo, null, 2)}</pre>
      </div>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button 
          onClick={testSupabaseConnection}
          style={{ padding: '10px 15px', backgroundColor: '#3ECF8E', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Tester avec Supabase Client
        </button>
        
        <button 
          onClick={testDirectFetch}
          style={{ padding: '10px 15px', backgroundColor: '#6366F1', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Tester avec Fetch Direct
        </button>
      </div>
      
      {loading && <p>Chargement en cours...</p>}
      
      {error && (
        <div style={{ padding: '15px', backgroundColor: '#FEE2E2', color: '#B91C1C', borderRadius: '5px', marginBottom: '20px' }}>
          <h3>Erreur</h3>
          <p>{error}</p>
        </div>
      )}
      
      {!loading && !error && (
        <div>
          <h2>Cartes récupérées ({cards.length})</h2>
          {cards.length === 0 ? (
            <p>Aucune carte trouvée.</p>
          ) : (
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {cards.map((card) => (
                <li key={card.id} style={{ padding: '10px', margin: '5px 0', backgroundColor: '#E0F2FE', borderRadius: '5px' }}>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  <p><strong>ID:</strong> {card.id}</p>
                  <p><strong>Parent ID:</strong> {card.parent_id}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default TestCORS;
