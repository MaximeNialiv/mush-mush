import Airtable from 'airtable';

const token = 'pate33kUKAUbL6OsL.e3ccbb38db68cbbe9ce6458786478fae0a140b6bca7fa90819a82cb26d72b169';
const baseId = 'appErBTyHJri8gvdN';

const base = new Airtable({ 
  apiKey: token,
  endpointUrl: 'https://api.airtable.com'
}).base(baseId);

async function seedData() {
  try {
    console.log('Création des données de test...\n');

    // 1. Créer les cartes parentes (workshops)
    console.log('1. Création des workshops parents...');
    const [fresqueClimat, fresqueBiodiv, frescheDechets] = await base('Cards').create([
      {
        fields: {
          title: 'La Fresque du Climat',
          description: 'Comprendre les enjeux du changement climatique et ses impacts sur notre environnement. Un atelier collaboratif pour visualiser la complexité du système climatique.',
          type: 'workshop',
          isParent: true,
          image: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=700&auto=format&fit=crop&q=80',
          points_knowledge_total: 15,
          points_behavior_total: 10,
          points_skills_total: 8,
          ranking: 1
        }
      },
      {
        fields: {
          title: 'La Fresque de la Biodiversité',
          description: 'Explorer les liens entre les espèces et comprendre l\'importance de la biodiversité. Un voyage au cœur des écosystèmes et de leur fragilité.',
          type: 'workshop',
          isParent: true,
          image: 'https://images.unsplash.com/photo-1500829243541-74b677fecc30?w=700&auto=format&fit=crop&q=80',
          points_knowledge_total: 12,
          points_behavior_total: 8,
          points_skills_total: 6,
          ranking: 2
        }
      },
      {
        fields: {
          title: 'La Fresque des Déchets',
          description: 'Comprendre le cycle de vie des déchets et leur impact sur l\'environnement. Une exploration des solutions pour réduire notre empreinte.',
          type: 'workshop',
          isParent: true,
          image: 'https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=700&auto=format&fit=crop&q=80',
          points_knowledge_total: 10,
          points_behavior_total: 12,
          points_skills_total: 8,
          ranking: 3
        }
      }
    ]);
    console.log('Workshops parents créés !');

    // 2. Créer les contenus pour La Fresque du Climat
    console.log('\n2. Création des contenus pour La Fresque du Climat...');
    const [climatQuiz1, climatVideo1, climatPDF] = await base('Cards').create([
      {
        fields: {
          title: 'Quiz - Les bases du climat',
          description: 'Testez vos connaissances sur les mécanismes du changement climatique',
          type: 'quiz',
          parentId: fresqueClimat.id,
          points_knowledge_total: 5,
          points_behavior_total: 2,
          points_skills_total: 1,
          number: '1/3',
          ranking: 1
        }
      },
      {
        fields: {
          title: 'Comprendre l\'effet de serre',
          description: 'Une vidéo explicative sur le mécanisme de l\'effet de serre et son impact sur le climat',
          type: 'media',
          parentId: fresqueClimat.id,
          mediaType: 'youtube',
          mediaUrl: 'https://www.youtube-nocookie.com/embed/LFwxuNhQ-Yg',
          points_knowledge_total: 3,
          points_behavior_total: 1,
          points_skills_total: 1,
          ranking: 2
        }
      },
      {
        fields: {
          title: 'Rapport du GIEC 2023',
          description: 'Le résumé pour décideurs du dernier rapport de synthèse du GIEC sur l\'état du climat',
          type: 'media',
          parentId: fresqueClimat.id,
          mediaType: 'pdf',
          mediaUrl: 'https://www.ipcc.ch/site/assets/uploads/sites/2/2022/07/SR15_SPM_LowRes.pdf',
          points_knowledge_total: 5,
          points_behavior_total: 2,
          points_skills_total: 1,
          ranking: 3
        }
      }
    ]);

    // Créer les options du quiz climat
    const climatQuizOptions = await base('QuizOptions').create([
      {
        fields: {
          quizId: climatQuiz1.id,
          text: 'Les émissions de gaz à effet de serre',
          isCorrect: true,
          explanation: 'Les gaz à effet de serre, notamment le CO2, sont responsables de la majorité du réchauffement climatique en piégeant la chaleur dans l\'atmosphère.'
        }
      },
      {
        fields: {
          quizId: climatQuiz1.id,
          text: 'La déforestation',
          isCorrect: false,
          explanation: 'Bien que la déforestation contribue au réchauffement climatique en réduisant la capacité de la Terre à absorber le CO2, elle n\'est pas la cause principale.'
        }
      },
      {
        fields: {
          quizId: climatQuiz1.id,
          text: 'Les éruptions volcaniques',
          isCorrect: false,
          explanation: 'Les éruptions volcaniques ont un effet temporaire sur le climat et peuvent même parfois provoquer un refroidissement à court terme.'
        }
      }
    ]);

    // 3. Créer les contenus pour La Fresque de la Biodiversité
    console.log('\n3. Création des contenus pour La Fresque de la Biodiversité...');
    const [biodivQuiz1, biodivVideo1, biodivPodcast] = await base('Cards').create([
      {
        fields: {
          title: 'Quiz - Les écosystèmes',
          description: 'Évaluez votre compréhension des écosystèmes et de leur fonctionnement',
          type: 'quiz',
          parentId: fresqueBiodiv.id,
          points_knowledge_total: 4,
          points_behavior_total: 2,
          points_skills_total: 2,
          number: '1/3',
          ranking: 1
        }
      },
      {
        fields: {
          title: 'La 6ème extinction de masse',
          description: 'Un documentaire sur la perte actuelle de biodiversité et ses conséquences',
          type: 'media',
          parentId: fresqueBiodiv.id,
          mediaType: 'youtube',
          mediaUrl: 'https://www.youtube-nocookie.com/embed/z9gHuAwxwAs',
          points_knowledge_total: 3,
          points_behavior_total: 2,
          points_skills_total: 1,
          ranking: 2
        }
      },
      {
        fields: {
          title: 'Les pollinisateurs en danger',
          description: 'Un podcast sur l\'importance des insectes pollinisateurs et leur déclin',
          type: 'media',
          parentId: fresqueBiodiv.id,
          mediaType: 'podcast',
          mediaUrl: 'https://open.spotify.com/embed/episode/0eH1xAL2T6DE7kjbCRtVZt',
          points_knowledge_total: 2,
          points_behavior_total: 3,
          points_skills_total: 1,
          ranking: 3
        }
      }
    ]);

    // Créer les options du quiz biodiversité
    const biodivQuizOptions = await base('QuizOptions').create([
      {
        fields: {
          quizId: biodivQuiz1.id,
          text: 'La diversité des espèces dans un habitat',
          isCorrect: true,
          explanation: 'La biodiversité comprend la variété des espèces vivantes dans un écosystème donné.'
        }
      },
      {
        fields: {
          quizId: biodivQuiz1.id,
          text: 'Uniquement les animaux sauvages',
          isCorrect: false,
          explanation: 'La biodiversité inclut toutes les formes de vie : animaux, plantes, champignons, bactéries...'
        }
      },
      {
        fields: {
          quizId: biodivQuiz1.id,
          text: 'Les espèces en voie de disparition',
          isCorrect: false,
          explanation: 'La biodiversité concerne toutes les espèces, pas seulement celles qui sont menacées.'
        }
      }
    ]);

    // 4. Créer les contenus pour La Fresque des Déchets
    console.log('\n4. Création des contenus pour La Fresque des Déchets...');
    const [dechetsQuiz1, dechetsVideo1, dechetsPDF] = await base('Cards').create([
      {
        fields: {
          title: 'Quiz - Le recyclage',
          description: 'Testez vos connaissances sur le recyclage et la gestion des déchets',
          type: 'quiz',
          parentId: frescheDechets.id,
          points_knowledge_total: 3,
          points_behavior_total: 4,
          points_skills_total: 2,
          number: '1/3',
          ranking: 1
        }
      },
      {
        fields: {
          title: 'Le voyage d\'une bouteille plastique',
          description: 'Suivez le parcours d\'une bouteille en plastique, de sa production à son recyclage',
          type: 'media',
          parentId: frescheDechets.id,
          mediaType: 'youtube',
          mediaUrl: 'https://www.youtube-nocookie.com/embed/Rr2WZX8BqCg',
          points_knowledge_total: 2,
          points_behavior_total: 3,
          points_skills_total: 2,
          ranking: 2
        }
      },
      {
        fields: {
          title: 'Guide du tri',
          description: 'Un guide pratique pour bien trier ses déchets au quotidien',
          type: 'media',
          parentId: frescheDechets.id,
          mediaType: 'pdf',
          mediaUrl: 'https://www.ecologie.gouv.fr/sites/default/files/Guide_du_tri_2020.pdf',
          points_knowledge_total: 2,
          points_behavior_total: 4,
          points_skills_total: 3,
          ranking: 3
        }
      }
    ]);

    // Créer les options du quiz déchets
    const dechetsQuizOptions = await base('QuizOptions').create([
      {
        fields: {
          quizId: dechetsQuiz1.id,
          text: 'Les plastiques de type 1 (PET) et 2 (PEHD)',
          isCorrect: true,
          explanation: 'Les plastiques de type PET (bouteilles) et PEHD (flacons) sont les plus facilement recyclables.'
        }
      },
      {
        fields: {
          quizId: dechetsQuiz1.id,
          text: 'Tous les plastiques sans exception',
          isCorrect: false,
          explanation: 'Tous les plastiques ne sont pas recyclables. Certains types sont trop complexes ou coûteux à recycler.'
        }
      },
      {
        fields: {
          quizId: dechetsQuiz1.id,
          text: 'Uniquement les emballages alimentaires',
          isCorrect: false,
          explanation: 'Le recyclage ne dépend pas de l\'usage mais du type de plastique utilisé.'
        }
      }
    ]);

    console.log('\nDonnées créées avec succès !');
    console.log('\nRécapitulatif :');
    console.log('- 3 parcours créés');
    console.log('- 9 cartes de contenu');
    console.log('- 9 options de quiz');

  } catch (error) {
    console.error('\nErreur lors de la création des données :');
    console.error('- Type:', error.constructor.name);
    console.error('- Message:', error.message);
    console.error('- Code:', error.statusCode);
    console.error('- Erreur complète:', error);
  }
}

console.log('Démarrage de la création des données...');
seedData(); 