-- Supprimer la contrainte unique sur card_relationships
ALTER TABLE card_relationships DROP CONSTRAINT IF EXISTS card_relationships_child_id_key;

-- Créer un index composite pour éviter les doublons de relations parent-enfant
CREATE UNIQUE INDEX IF NOT EXISTS card_relationships_parent_child_unique 
ON card_relationships(parent_id, child_id);

-- Créer une carte parent par catégorie
INSERT INTO cards (title, description, type, category_id)
SELECT 
    name as title,
    description,
    'parent' as type,
    id as category_id
FROM quiz_categories
ON CONFLICT (category_id) WHERE type = 'parent' DO UPDATE
SET title = EXCLUDED.title,
    description = EXCLUDED.description;

-- Lier toutes les cartes de quiz à leur carte parent respective
INSERT INTO card_relationships (parent_id, child_id)
SELECT p.id as parent_id, c.id as child_id
FROM cards c
JOIN cards p ON c.category_id = p.category_id
WHERE c.type = 'qcm'
  AND p.type = 'parent'
  AND NOT EXISTS (
    SELECT 1 
    FROM card_relationships cr 
    WHERE cr.parent_id = p.id 
    AND cr.child_id = c.id
  );

-- Ajouter des politiques RLS pour les nouvelles cartes parent
ALTER TABLE cards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON cards
FOR SELECT
TO public
USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON cards
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users only" ON cards
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Enable delete for authenticated users only" ON cards
FOR DELETE
TO authenticated
USING (true);
