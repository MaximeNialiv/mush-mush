import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://qeswzexucwpzdwwtvpjk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFlc3d6ZXh1Y3dwemR3d3R2cGprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2MDY5NzYsImV4cCI6MjA1NzE4Mjk3Nn0.g5mRG5FDdWRcCx7UkyUP61wIaPg5L3Eo7iY8iebvXyY'
);

async function addTestData() {
  console.log('🚀 Ajout des données de test...');

  // Créer des utilisateurs
  const { data: users, error: usersError } = await supabase
    .from('users')
    .upsert([
      {
        email: 'alice@example.com',
        name: 'Alice Dubois',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alice'
      },
      {
        email: 'bob@example.com',
        name: 'Bob Martin',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob'
      },
      {
        email: 'charlie@example.com',
        name: 'Charlie Garcia',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=charlie'
      }
    ]);

  if (usersError) {
    console.error('❌ Erreur lors de la création des utilisateurs:', usersError);
    return;
  }
  console.log('✅ Utilisateurs créés');

  // Créer de nouveaux modules parents
  const { data: modules, error: modulesError } = await supabase
    .from('cards')
    .upsert([
      {
        title: 'Module 2: Actions individuelles',
        description: 'Découvrez comment agir à votre échelle',
        type: 'parent'
      },
      {
        title: 'Module 3: Solutions collectives',
        description: 'Explorer les solutions à grande échelle',
        type: 'parent'
      }
    ]);

  if (modulesError) {
    console.error('❌ Erreur lors de la création des modules:', modulesError);
    return;
  }
  console.log('✅ Modules créés');

  // Récupérer les IDs des nouveaux modules
  const { data: allModules } = await supabase
    .from('cards')
    .select('id, title')
    .eq('type', 'parent');

  const module2Id = allModules?.find(m => m.title.includes('Module 2'))?.id;
  const module3Id = allModules?.find(m => m.title.includes('Module 3'))?.id;

  // Ajouter des cartes pour le Module 2
  if (module2Id) {
    const { error: cardsError } = await supabase
      .from('cards')
      .upsert([
        {
          title: 'Réduire son empreinte carbone',
          description: 'Guide pratique pour réduire son impact environnemental',
          type: 'media',
          parent_id: module2Id,
          media_type: 'pdf',
          media_url: 'https://example.com/guide-empreinte-carbone.pdf'
        },
        {
          title: 'Quiz: Gestes écologiques',
          description: 'Testez vos connaissances sur les écogestes',
          type: 'qcm',
          parent_id: module2Id,
          question: 'Quelle action permet d\'économiser le plus d\'énergie ?'
        }
      ]);

    if (cardsError) {
      console.error('❌ Erreur lors de la création des cartes du module 2:', cardsError);
      return;
    }
  }

  // Ajouter des cartes pour le Module 3
  if (module3Id) {
    const { error: cardsError } = await supabase
      .from('cards')
      .upsert([
        {
          title: 'Les énergies renouvelables',
          description: 'Panorama des solutions énergétiques durables',
          type: 'media',
          parent_id: module3Id,
          media_type: 'video',
          media_url: 'https://www.youtube.com/watch?v=example'
        },
        {
          title: 'Quiz: Politiques climatiques',
          description: 'Comprendre les enjeux politiques du climat',
          type: 'qcm',
          parent_id: module3Id,
          question: 'Quel accord international majeur a été signé en 2015 ?'
        }
      ]);

    if (cardsError) {
      console.error('❌ Erreur lors de la création des cartes du module 3:', cardsError);
      return;
    }
  }

  // Récupérer les IDs des nouveaux quiz
  const { data: quizCards } = await supabase
    .from('cards')
    .select('id, title')
    .eq('type', 'qcm');

  // Ajouter des options pour les nouveaux quiz
  for (const quiz of quizCards || []) {
    if (quiz.title.includes('Gestes écologiques')) {
      const { error: optionsError } = await supabase
        .from('quiz_options')
        .upsert([
          {
            card_id: quiz.id,
            text: 'Éteindre les appareils en veille',
            is_correct: true,
            explanation: 'Les appareils en veille consomment beaucoup d\'énergie sur une année.'
          },
          {
            card_id: quiz.id,
            text: 'Laisser les fenêtres ouvertes en hiver',
            is_correct: false,
            explanation: 'Cela gaspille beaucoup d\'énergie de chauffage.'
          },
          {
            card_id: quiz.id,
            text: 'Utiliser des ampoules classiques',
            is_correct: false,
            explanation: 'Les LED consomment beaucoup moins d\'énergie.'
          }
        ]);

      if (optionsError) {
        console.error('❌ Erreur lors de la création des options du quiz écogestes:', optionsError);
      }
    } else if (quiz.title.includes('Politiques climatiques')) {
      const { error: optionsError } = await supabase
        .from('quiz_options')
        .upsert([
          {
            card_id: quiz.id,
            text: 'L\'Accord de Paris',
            is_correct: true,
            explanation: 'L\'Accord de Paris vise à limiter le réchauffement climatique à 1.5°C.'
          },
          {
            card_id: quiz.id,
            text: 'Le Protocole de Kyoto',
            is_correct: false,
            explanation: 'Le Protocole de Kyoto a été signé en 1997.'
          },
          {
            card_id: quiz.id,
            text: 'L\'Accord de Londres',
            is_correct: false,
            explanation: 'Cet accord n\'existe pas pour le climat.'
          }
        ]);

      if (optionsError) {
        console.error('❌ Erreur lors de la création des options du quiz politiques:', optionsError);
      }
    }
  }

  // Ajouter des interactions utilisateur-carte
  if (users && quizCards) {
    const { error: interactionsError } = await supabase
      .from('user_card_interactions')
      .upsert([
        {
          user_id: users[0].id,
          card_id: quizCards[0].id,
          status: 'completed',
          points_knowledge: 10,
          points_behavior: 5,
          points_skills: 8
        },
        {
          user_id: users[1].id,
          card_id: quizCards[0].id,
          status: 'in_progress',
          points_knowledge: 5,
          points_behavior: 3,
          points_skills: 4
        }
      ]);

    if (interactionsError) {
      console.error('❌ Erreur lors de la création des interactions:', interactionsError);
    }
  }

  console.log('✨ Données de test ajoutées avec succès !');
}

addTestData().catch(console.error); 