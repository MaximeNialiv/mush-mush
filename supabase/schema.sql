-- Supprimer toutes les tables existantes
DROP TABLE IF EXISTS public.user_card_interactions CASCADE;
DROP TABLE IF EXISTS public.quiz_options CASCADE;
DROP TABLE IF EXISTS public.cards CASCADE;
DROP TABLE IF EXISTS public.users CASCADE;

-- Activer l'extension UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Utilisateurs
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  avatar TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_login_at TIMESTAMPTZ DEFAULT NOW()
);

-- Cartes (toutes les types)
CREATE TABLE IF NOT EXISTS public.cards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('qcm', 'media', 'parent')),
  parent_id UUID REFERENCES public.cards(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  -- Champs spécifiques aux cartes QCM
  question TEXT,
  -- Champs spécifiques aux cartes média
  media_type TEXT CHECK (media_type IN ('video', 'url', 'pdf')),
  media_url TEXT,
  thumbnail_url TEXT
);

-- Options pour les questions QCM
CREATE TABLE IF NOT EXISTS public.quiz_options (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  card_id UUID REFERENCES public.cards(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL DEFAULT false,
  explanation TEXT
);

-- Interactions utilisateur-carte
CREATE TABLE IF NOT EXISTS public.user_card_interactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  card_id UUID REFERENCES public.cards(id) ON DELETE CASCADE,
  status TEXT NOT NULL CHECK (status IN ('viewed', 'completed', 'in_progress')),
  points_knowledge INTEGER NOT NULL DEFAULT 0,
  points_behavior INTEGER NOT NULL DEFAULT 0,
  points_skills INTEGER NOT NULL DEFAULT 0,
  last_interaction_at TIMESTAMPTZ DEFAULT NOW(),
  selected_options UUID[], -- Options sélectionnées pour les quiz
  UNIQUE (user_id, card_id)
);

-- Politiques de sécurité RLS (Row Level Security)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_card_interactions ENABLE ROW LEVEL SECURITY;

-- Supprimer les politiques existantes
DROP POLICY IF EXISTS "Cartes accessibles à tous" ON public.cards;
DROP POLICY IF EXISTS "Options de quiz accessibles à tous" ON public.quiz_options;
DROP POLICY IF EXISTS "Utilisateurs peuvent voir leurs propres interactions" ON public.user_card_interactions;
DROP POLICY IF EXISTS "Utilisateurs peuvent modifier leurs propres interactions" ON public.user_card_interactions;
DROP POLICY IF EXISTS "Utilisateurs peuvent mettre à jour leurs propres interactions" ON public.user_card_interactions;
DROP POLICY IF EXISTS "Permettre l'insertion de données de test" ON public.users;
DROP POLICY IF EXISTS "Permettre l'accès complet aux utilisateurs" ON public.users;
DROP POLICY IF EXISTS "Permettre l'accès complet aux interactions" ON public.user_card_interactions;

-- Politique pour les cartes: tout le monde peut lire et écrire
CREATE POLICY "Cartes accessibles à tous" ON public.cards
  FOR ALL USING (true);

-- Politique pour les options de quiz: tout le monde peut lire et écrire
CREATE POLICY "Options de quiz accessibles à tous" ON public.quiz_options
  FOR ALL USING (true);

-- Politique pour les utilisateurs: tout le monde peut lire et écrire
CREATE POLICY "Permettre l'accès complet aux utilisateurs" ON public.users
  FOR ALL USING (true);

-- Politique pour les interactions: tout le monde peut lire et écrire (pour les tests)
CREATE POLICY "Permettre l'accès complet aux interactions" ON public.user_card_interactions
  FOR ALL USING (true);

-- Nettoyer les données existantes
TRUNCATE TABLE public.user_card_interactions CASCADE;
TRUNCATE TABLE public.quiz_options CASCADE;
TRUNCATE TABLE public.cards CASCADE;
TRUNCATE TABLE public.users CASCADE;

-- Ajout de quelques données de test
INSERT INTO public.cards (id, title, description, type, question, media_type, media_url)
VALUES 
  (uuid_generate_v4(), 'Module 1: Introduction au climat', 'Découvrez les bases du changement climatique', 'parent', NULL, NULL, NULL),
  (uuid_generate_v4(), 'Qu''est-ce que le climat?', 'Comprendre la différence entre météo et climat', 'media', NULL, 'video', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'),
  (uuid_generate_v4(), 'Quiz: Connaissances climatiques', 'Testez vos connaissances', 'qcm', 'Quelle est la principale cause du changement climatique?', NULL, NULL);

-- Récupérer l'ID du quiz inséré pour ajouter des options
DO $$
DECLARE
    quiz_id UUID;
BEGIN
    SELECT id INTO quiz_id FROM public.cards WHERE type = 'qcm' LIMIT 1;
    
    -- Ajouter des options de quiz
    INSERT INTO public.quiz_options (card_id, text, is_correct, explanation)
    VALUES 
      (quiz_id, 'Les émissions de gaz à effet de serre', TRUE, 'C''est la principale cause du réchauffement climatique actuel.'),
      (quiz_id, 'Les éruptions volcaniques', FALSE, 'Bien qu''elles puissent avoir un impact temporaire, elles ne sont pas la cause principale.'),
      (quiz_id, 'Les variations naturelles du climat', FALSE, 'Les variations naturelles existent mais n''expliquent pas le réchauffement actuel.');
    
    -- Mettre à jour la relation parent-enfant
    UPDATE public.cards
    SET parent_id = (SELECT id FROM public.cards WHERE type = 'parent' LIMIT 1)
    WHERE type IN ('media', 'qcm');
END $$; 