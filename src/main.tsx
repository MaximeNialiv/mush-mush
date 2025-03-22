import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
// import TestApp from './test-app';
import TestSimple from './test-simple';
import './index.css';

console.log('Démarrage de l\'application...');

// Afficher les variables d'environnement
console.log('Variables d\'environnement:');
console.log('VITE_SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL || 'Non définie');
console.log('VITE_SUPABASE_ANON_KEY existe:', !!import.meta.env.VITE_SUPABASE_ANON_KEY);
console.log('Mode de l\'application:', import.meta.env.MODE);
console.log('Est en production:', import.meta.env.PROD);

try {
  const rootElement = document.getElementById('root');
  console.log('Root element:', rootElement);
  
  if (!rootElement) {
    throw new Error('Element #root introuvable dans le DOM');
  }

  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <BrowserRouter>
        <TestSimple />
      </BrowserRouter>
    </React.StrictMode>,
  );
  console.log('Application rendue avec succès');
} catch (error) {
  console.error('Erreur lors du rendu de l\'application:', error);
  
  // Affichage d'un message d'erreur dans le DOM
  const errorDiv = document.createElement('div');
  errorDiv.style.padding = '20px';
  errorDiv.style.backgroundColor = '#f8d7da';
  errorDiv.style.color = '#721c24';
  errorDiv.style.borderRadius = '5px';
  errorDiv.style.margin = '20px';
  errorDiv.innerHTML = `<h1>Erreur de chargement</h1><p>${error instanceof Error ? error.message : 'Une erreur inconnue est survenue'}</p>`;
  
  document.body.appendChild(errorDiv);
}
