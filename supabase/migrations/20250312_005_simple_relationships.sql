-- Créer la table card_relationships
CREATE TABLE IF NOT EXISTS public.card_relationships (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    parent_id UUID NOT NULL REFERENCES public.cards(id) ON DELETE CASCADE,
    child_id UUID NOT NULL REFERENCES public.cards(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);
