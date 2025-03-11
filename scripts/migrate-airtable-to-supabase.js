/**
 * Script de migration des données d'Airtable vers Supabase
 * 
 * Pour l'exécuter :
 * 1. Assurez-vous d'avoir configuré les variables d'environnement dans .env.local
 * 2. Exécutez: node scripts/migrate-airtable-to-supabase.js
 */

import Airtable from 'airtable';
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Charger les variables d'environnement depuis .env.local
dotenv.config({ path: join(__dirname, '..', '.env.local') });

// Configuration Airtable
const AIRTABLE_API_KEY = process.env.VITE_AIRTABLE_ACCESS_TOKEN;
const AIRTABLE_BASE_ID = process.env.VITE_AIRTABLE_BASE_ID;

// Configuration Supabase
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;

// Vérifier les variables d'environnement
if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
  console.error('❌ Variables d\'environnement Airtable manquantes');
  process.exit(1);
}

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('❌ Variables d\'environnement Supabase manquantes');
  process.exit(1);
}

// Initialiser les clients Airtable et Supabase
Airtable.configure({
  apiKey: AIRTABLE_API_KEY,
  endpointUrl: 'https://api.airtable.com'
});

const airtableBase = Airtable.base(AIRTABLE_BASE_ID);
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Tables Airtable
const AIRTABLE_TABLES = {
  cards: 'Cards',
  users: 'Users',
  userCardInteractions: 'UserCardInteractions',
  quizOptions: 'QuizOptions'
};

/**
 * Migration des cartes
 */
async function migrateCards() {
  console.log('🔄 Migration des cartes...');
  
  try {
    // Récupérer les cartes depuis Airtable
    const records = await airtableBase(AIRTABLE_TABLES.cards)
      .select()
      .all();
    
    console.log(`✅ ${records.length} cartes récupérées depuis Airtable`);
    
    // Transformer les cartes pour Supabase
    const cards = records.map(record => {
      const fields = record.fields;
      
      // Déterminer le type de carte
      let type;
      if (fields.type === 'workshop') {
        type = fields.isParent ? 'parent' : 'media';
      } else if (fields.type === 'quiz') {
        type = 'qcm';
      } else if (fields.type === 'media') {
        type = 'media';
      } else {
        type = 'media'; // Fallback
      }
      
      return {
        id: record.id,
        title: fields.title || 'Sans titre',
        description: fields.description || '',
        type,
        parent_id: fields.parentId || null,
        created_at: record.createdTime,
        updated_at: new Date().toISOString(),
        question: fields.description, // Pour les QCM
        media_type: fields.mediaType || null,
        media_url: fields.mediaUrl || null,
        thumbnail_url: fields.image || null
      };
    });
    
    // Insérer les cartes dans Supabase
    const { data, error } = await supabase
      .from('cards')
      .upsert(cards, { onConflict: 'id' });
    
    if (error) {
      console.error('❌ Erreur lors de l\'insertion des cartes dans Supabase:', error);
      return;
    }
    
    console.log(`✅ ${cards.length} cartes migrées vers Supabase`);
    return cards;
  } catch (error) {
    console.error('❌ Erreur lors de la migration des cartes:', error);
  }
}

/**
 * Migration des options de quiz
 */
async function migrateQuizOptions() {
  console.log('🔄 Migration des options de quiz...');
  
  try {
    // Récupérer les options depuis Airtable
    const records = await airtableBase(AIRTABLE_TABLES.quizOptions)
      .select()
      .all();
    
    console.log(`✅ ${records.length} options récupérées depuis Airtable`);
    
    // Transformer les options pour Supabase
    const options = records.map(record => {
      const fields = record.fields;
      
      return {
        id: record.id,
        card_id: fields.cardId,
        text: fields.text || '',
        is_correct: fields.isCorrect || false,
        explanation: fields.explanation || ''
      };
    });
    
    // Insérer les options dans Supabase
    const { data, error } = await supabase
      .from('quiz_options')
      .upsert(options, { onConflict: 'id' });
    
    if (error) {
      console.error('❌ Erreur lors de l\'insertion des options dans Supabase:', error);
      return;
    }
    
    console.log(`✅ ${options.length} options migrées vers Supabase`);
  } catch (error) {
    console.error('❌ Erreur lors de la migration des options:', error);
  }
}

/**
 * Migration des utilisateurs
 */
async function migrateUsers() {
  console.log('🔄 Migration des utilisateurs...');
  
  try {
    // Récupérer les utilisateurs depuis Airtable
    const records = await airtableBase(AIRTABLE_TABLES.users)
      .select()
      .all();
    
    console.log(`✅ ${records.length} utilisateurs récupérés depuis Airtable`);
    
    // Transformer les utilisateurs pour Supabase
    const users = records.map(record => {
      const fields = record.fields;
      
      return {
        id: record.id,
        email: fields.email || '',
        name: fields.name || '',
        avatar: fields.avatar || null,
        created_at: record.createdTime,
        last_login_at: fields.lastLoginAt || record.createdTime
      };
    });
    
    // Insérer les utilisateurs dans Supabase
    const { data, error } = await supabase
      .from('users')
      .upsert(users, { onConflict: 'id' });
    
    if (error) {
      console.error('❌ Erreur lors de l\'insertion des utilisateurs dans Supabase:', error);
      return;
    }
    
    console.log(`✅ ${users.length} utilisateurs migrés vers Supabase`);
  } catch (error) {
    console.error('❌ Erreur lors de la migration des utilisateurs:', error);
  }
}

/**
 * Migration des interactions utilisateur-carte
 */
async function migrateInteractions() {
  console.log('🔄 Migration des interactions utilisateur-carte...');
  
  try {
    // Récupérer les interactions depuis Airtable
    const records = await airtableBase(AIRTABLE_TABLES.userCardInteractions)
      .select()
      .all();
    
    console.log(`✅ ${records.length} interactions récupérées depuis Airtable`);
    
    // Transformer les interactions pour Supabase
    const interactions = records.map(record => {
      const fields = record.fields;
      
      return {
        id: record.id,
        user_id: fields.userId,
        card_id: fields.cardId,
        status: fields.status || 'viewed',
        points_knowledge: fields.pointsKnowledge || 0,
        points_behavior: fields.pointsBehavior || 0,
        points_skills: fields.pointsSkills || 0,
        last_interaction_at: fields.lastInteractionAt || record.createdTime,
        selected_options: fields.selectedOptions || []
      };
    });
    
    // Insérer les interactions dans Supabase
    const { data, error } = await supabase
      .from('user_card_interactions')
      .upsert(interactions, { onConflict: 'user_id,card_id' });
    
    if (error) {
      console.error('❌ Erreur lors de l\'insertion des interactions dans Supabase:', error);
      return;
    }
    
    console.log(`✅ ${interactions.length} interactions migrées vers Supabase`);
  } catch (error) {
    console.error('❌ Erreur lors de la migration des interactions:', error);
  }
}

/**
 * Fonction principale
 */
async function main() {
  console.log('🚀 Début de la migration Airtable → Supabase');
  
  // Exécuter les migrations dans l'ordre
  await migrateCards();
  await migrateQuizOptions();
  await migrateUsers();
  await migrateInteractions();
  
  console.log('✨ Migration terminée avec succès !');
}

// Lancer la migration
main().catch(error => {
  console.error('❌ Erreur fatale:', error);
  process.exit(1);
}); 