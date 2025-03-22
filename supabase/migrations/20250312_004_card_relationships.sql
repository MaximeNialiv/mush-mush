-- Créer la table card_relationships si elle n'existe pas
CREATE TABLE IF NOT EXISTS card_relationships (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    parent_id UUID NOT NULL REFERENCES cards(id) ON DELETE CASCADE,
    child_id UUID NOT NULL REFERENCES cards(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    CONSTRAINT card_relationships_parent_child_unique UNIQUE (parent_id, child_id)
);

-- Activer Row Level Security
ALTER TABLE card_relationships ENABLE ROW LEVEL SECURITY;

-- Créer les politiques RLS
DO $$ BEGIN
    CREATE POLICY "Enable read access for all users" ON card_relationships
    FOR SELECT
    TO public
    USING (true);
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE POLICY "Enable insert for authenticated users only" ON card_relationships
    FOR INSERT
    TO authenticated
    WITH CHECK (true);
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE POLICY "Enable update for authenticated users only" ON card_relationships
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE POLICY "Enable delete for authenticated users only" ON card_relationships
    FOR DELETE
    TO authenticated
    USING (true);
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Créer un trigger pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_card_relationships_updated_at
    BEFORE UPDATE ON card_relationships
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
