// Debug des variables d'environnement
console.log('Variables d\'environnement Airtable:', {
  VITE_AIRTABLE_ACCESS_TOKEN: import.meta.env.VITE_AIRTABLE_ACCESS_TOKEN,
  VITE_AIRTABLE_BASE_ID: import.meta.env.VITE_AIRTABLE_BASE_ID,
  MODE: import.meta.env.MODE,
  DEV: import.meta.env.DEV
});

export const AIRTABLE_CONFIG = {
  accessToken: import.meta.env.VITE_AIRTABLE_ACCESS_TOKEN,
  baseId: import.meta.env.VITE_AIRTABLE_BASE_ID,
  tables: {
    cards: 'Cards',
    users: 'Users',
    userCardInteractions: 'UserCardInteractions',
    quizOptions: 'QuizOptions'
  }
} as const; 