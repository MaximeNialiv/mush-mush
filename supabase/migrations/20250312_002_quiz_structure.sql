-- Créer une table pour les catégories de quiz
CREATE TABLE IF NOT EXISTS public.quiz_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    name TEXT NOT NULL,
    description TEXT,
    icon TEXT, -- Nom de l'icône Lucide à utiliser
    color TEXT -- Code couleur pour la catégorie
);

-- Activer RLS sur la table des catégories
ALTER TABLE public.quiz_categories ENABLE ROW LEVEL SECURITY;

-- Politique pour les catégories: tout le monde peut lire
CREATE POLICY "Permettre la lecture des catégories" ON public.quiz_categories
    FOR SELECT USING (true);

-- Politique pour les catégories: seuls les admins peuvent modifier
CREATE POLICY "Permettre la modification des catégories aux admins" ON public.quiz_categories
    FOR ALL USING (auth.role() = 'authenticated' AND auth.email() IN ('admin@example.com')); -- À adapter selon vos besoins

-- Ajouter une colonne category_id à la table cards pour les quiz
ALTER TABLE public.cards 
    ADD COLUMN IF NOT EXISTS category_id UUID REFERENCES public.quiz_categories(id);

-- Mettre à jour la contrainte sur le type de carte pour inclure la catégorie
ALTER TABLE public.cards DROP CONSTRAINT IF EXISTS "cards_type_check";
ALTER TABLE public.cards
    ADD CONSTRAINT "cards_type_check"
    CHECK (
        (type = 'qcm' AND category_id IS NOT NULL) OR
        (type != 'qcm' AND category_id IS NULL)
    );

-- Créer un trigger pour mettre à jour updated_at
CREATE TRIGGER update_quiz_categories_updated_at
    BEFORE UPDATE ON quiz_categories
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_cards_category ON cards(category_id) WHERE type = 'qcm';

-- Insérer les catégories de base
INSERT INTO public.quiz_categories (name, description, icon, color) VALUES
    ('Intro générale', 'Questions générales sur le développement durable', 'Globe2', '#4CAF50'),
    ('Climat', 'Questions sur le changement climatique', 'Cloud', '#2196F3'),
    ('Biodiversité', 'Questions sur la biodiversité et sa préservation', 'Leaf', '#8BC34A'),
    ('Energie', 'Questions sur l''énergie et ses impacts', 'Zap', '#FFC107'),
    ('Economie', 'Questions sur l''économie durable', 'TrendingUp', '#FF9800'),
    ('Psychologie Humaine', 'Questions sur le comportement et la psychologie', 'Users', '#9C27B0'),
    ('Ressources minérales', 'Questions sur les ressources minérales', 'Mountain', '#795548'),
    ('Déchets', 'Questions sur la gestion des déchets', 'Trash2', '#607D8B'),
    ('Numérique', 'Questions sur l''impact du numérique', 'Laptop', '#00BCD4'),
    ('Agriculture', 'Questions sur l''agriculture durable', 'Wheat', '#CDDC39'),
    ('Alimentation', 'Questions sur l''alimentation durable', 'Apple', '#FF5722'),
    ('Transports', 'Questions sur les transports', 'Car', '#3F51B5'),
    ('Logement', 'Questions sur le logement durable', 'Home', '#009688'),
    ('Vêtements', 'Questions sur la mode durable', 'Shirt', '#E91E63')
ON CONFLICT DO NOTHING;
