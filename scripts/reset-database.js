import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://qeswzexucwpzdwwtvpjk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFlc3d6ZXh1Y3dwemR3d3R2cGprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2MDY5NzYsImV4cCI6MjA1NzE4Mjk3Nn0.g5mRG5FDdWRcCx7UkyUP61wIaPg5L3Eo7iY8iebvXyY'
);

// Données de test
const TEST_USERS = [
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
];

const TEST_MODULES = [
  {
    title: 'Module 1: Introduction au climat',
    description: 'Découvrez les bases du changement climatique',
    cards: [
      {
        title: 'Qu\'est-ce que le climat?',
        description: 'Comprendre la différence entre météo et climat',
        type: 'media',
        media_type: 'video',
        media_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      },
      {
        title: 'Les bases du changement climatique',
        description: 'Un article complet sur les fondamentaux',
        type: 'media',
        media_type: 'url',
        media_url: 'https://example.com/climate-basics'
      },
      {
        title: 'Quiz: Connaissances climatiques',
        description: 'Testez vos connaissances sur le climat',
        type: 'qcm',
        question: 'Quelle est la principale cause du changement climatique?',
        options: [
          {
            text: 'Les émissions de gaz à effet de serre',
            is_correct: true,
            explanation: 'C\'est la principale cause du réchauffement climatique actuel.'
          },
          {
            text: 'Les éruptions volcaniques',
            is_correct: false,
            explanation: 'Bien qu\'elles puissent avoir un impact temporaire, elles ne sont pas la cause principale.'
          },
          {
            text: 'Les variations naturelles du climat',
            is_correct: false,
            explanation: 'Les variations naturelles existent mais n\'expliquent pas le réchauffement actuel.'
          }
        ]
      }
    ]
  },
  {
    title: 'Module 2: Actions individuelles',
    description: 'Comment agir à votre échelle pour le climat',
    cards: [
      {
        title: 'Guide des écogestes',
        description: 'Guide pratique pour réduire son impact',
        type: 'media',
        media_type: 'pdf',
        media_url: 'https://example.com/eco-guide.pdf'
      },
      {
        title: 'Calculer son empreinte carbone',
        description: 'Outil interactif de calcul d\'empreinte',
        type: 'media',
        media_type: 'url',
        media_url: 'https://example.com/calculator'
      },
      {
        title: 'Quiz: Gestes écologiques',
        description: 'Évaluez vos connaissances sur les écogestes',
        type: 'qcm',
        question: 'Quelle action permet d\'économiser le plus d\'énergie au quotidien?',
        options: [
          {
            text: 'Éteindre complètement ses appareils la nuit',
            is_correct: true,
            explanation: 'La consommation en veille représente jusqu\'à 10% de la facture d\'électricité.'
          },
          {
            text: 'Prendre un bain plutôt qu\'une douche',
            is_correct: false,
            explanation: 'Un bain consomme 3 à 4 fois plus d\'eau qu\'une douche.'
          },
          {
            text: 'Laisser le chauffage constant toute la journée',
            is_correct: false,
            explanation: 'Il est plus économique de baisser le chauffage quand on s\'absente.'
          }
        ]
      }
    ]
  },
  {
    title: 'Module 3: Solutions collectives',
    description: 'Les grands leviers d\'action pour le climat',
    cards: [
      {
        title: 'Les énergies renouvelables',
        description: 'Panorama des solutions énergétiques',
        type: 'media',
        media_type: 'video',
        media_url: 'https://www.youtube.com/watch?v=renewable-energy'
      },
      {
        title: 'Rapport GIEC 2023',
        description: 'Résumé du dernier rapport du GIEC',
        type: 'media',
        media_type: 'pdf',
        media_url: 'https://example.com/giec-2023.pdf'
      },
      {
        title: 'Quiz: Politiques climatiques',
        description: 'Testez vos connaissances sur les accords climatiques',
        type: 'qcm',
        question: 'Quel est l\'objectif principal de l\'Accord de Paris?',
        options: [
          {
            text: 'Limiter le réchauffement à 1.5°C',
            is_correct: true,
            explanation: 'L\'Accord de Paris vise à limiter le réchauffement bien en dessous de 2°C, de préférence à 1.5°C.'
          },
          {
            text: 'Interdire les énergies fossiles',
            is_correct: false,
            explanation: 'L\'accord ne prévoit pas d\'interdiction directe mais encourage la transition.'
          },
          {
            text: 'Taxer les pays pollueurs',
            is_correct: false,
            explanation: 'L\'accord repose sur des engagements volontaires des pays.'
          }
        ]
      }
    ]
  }
];

async function resetDatabase() {
  try {
    console.log('🗑️  Nettoyage de la base de données...');
    
    // Supprimer toutes les données existantes
    const tables = ['user_card_interactions', 'quiz_options', 'cards', 'users'];
    for (const table of tables) {
      const { error } = await supabase
        .from(table)
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000');
      
      if (error) throw error;
    }
    console.log('✅ Base de données nettoyée');

    // Créer les utilisateurs
    const { data: users, error: usersError } = await supabase
      .from('users')
      .insert(TEST_USERS)
      .select();
    
    if (usersError) throw usersError;
    console.log('✅ Utilisateurs créés');

    // Créer les modules et leurs cartes
    for (const module of TEST_MODULES) {
      // Créer le module parent
      const { data: parentModule, error: moduleError } = await supabase
        .from('cards')
        .insert({
          title: module.title,
          description: module.description,
          type: 'parent'
        })
        .select()
        .single();
      
      if (moduleError) throw moduleError;

      // Créer les cartes du module
      for (const card of module.cards) {
        const { data: createdCard, error: cardError } = await supabase
          .from('cards')
          .insert({
            ...card,
            parent_id: parentModule.id
          })
          .select()
          .single();
        
        if (cardError) throw cardError;

        // Si c'est un quiz, créer ses options
        if (card.type === 'qcm' && card.options) {
          const { error: optionsError } = await supabase
            .from('quiz_options')
            .insert(card.options.map(option => ({
              ...option,
              card_id: createdCard.id
            })));
          
          if (optionsError) throw optionsError;
        }
      }
    }
    console.log('✅ Modules et cartes créés');

    // Créer des interactions aléatoires
    const { data: quizCards } = await supabase
      .from('cards')
      .select('id')
      .eq('type', 'qcm');

    if (quizCards && users) {
      const interactions = quizCards.flatMap(quiz => 
        users.map(user => ({
          user_id: user.id,
          card_id: quiz.id,
          status: Math.random() > 0.5 ? 'completed' : 'in_progress',
          points_knowledge: Math.floor(Math.random() * 10),
          points_behavior: Math.floor(Math.random() * 10),
          points_skills: Math.floor(Math.random() * 10)
        }))
      );

      const { error: interactionsError } = await supabase
        .from('user_card_interactions')
        .insert(interactions);
      
      if (interactionsError) throw interactionsError;
    }
    console.log('✅ Interactions créées');

    console.log('✨ Base de données réinitialisée avec succès !');
  } catch (error) {
    console.error('❌ Erreur lors de la réinitialisation:', error);
    process.exit(1);
  }
}

resetDatabase(); 