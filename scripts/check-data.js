import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://qeswzexucwpzdwwtvpjk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFlc3d6ZXh1Y3dwemR3d3R2cGprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2MDY5NzYsImV4cCI6MjA1NzE4Mjk3Nn0.g5mRG5FDdWRcCx7UkyUP61wIaPg5L3Eo7iY8iebvXyY'
);

async function checkData() {
  console.log('🔍 Vérification des données dans Supabase...');
  
  const { data: cards, error: cardsError } = await supabase
    .from('cards')
    .select('*');
  
  if (cardsError) {
    console.error('❌ Erreur lors de la récupération des cartes:', cardsError);
  } else {
    console.log('📚 Cartes trouvées:', cards?.length || 0);
    console.log(cards);
  }
  
  const { data: quizOptions, error: optionsError } = await supabase
    .from('quiz_options')
    .select('*');
  
  if (optionsError) {
    console.error('❌ Erreur lors de la récupération des options:', optionsError);
  } else {
    console.log('🎯 Options de quiz trouvées:', quizOptions?.length || 0);
    console.log(quizOptions);
  }
}

checkData(); 