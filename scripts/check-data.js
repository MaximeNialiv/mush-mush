import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
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