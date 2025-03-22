-- Migration générée automatiquement pour l'import des quiz
-- Date de génération: 2025-03-12 16:48:11

BEGIN;

-- Questions pour la catégorie: Intro générale
WITH category AS (
    SELECT id FROM quiz_categories WHERE name = 'Intro générale'
)
-- Questions pour la catégorie: Climat
WITH category AS (
    SELECT id FROM quiz_categories WHERE name = 'Climat'
)
-- Questions pour la catégorie: Biodiversité
WITH category AS (
    SELECT id FROM quiz_categories WHERE name = 'Biodiversité'
)
-- Questions pour la catégorie: Energie
WITH category AS (
    SELECT id FROM quiz_categories WHERE name = 'Energie'
)
-- Questions pour la catégorie: Economie
WITH category AS (
    SELECT id FROM quiz_categories WHERE name = 'Economie'
)
-- Questions pour la catégorie: Psychologie Humaine
WITH category AS (
    SELECT id FROM quiz_categories WHERE name = 'Psychologie Humaine'
)
-- Questions pour la catégorie: Ressources minérales
WITH category AS (
    SELECT id FROM quiz_categories WHERE name = 'Ressources minérales'
)
-- Questions pour la catégorie: Déchets
WITH category AS (
    SELECT id FROM quiz_categories WHERE name = 'Déchets'
)
-- Questions pour la catégorie: Numérique
WITH category AS (
    SELECT id FROM quiz_categories WHERE name = 'Numérique'
)
-- Questions pour la catégorie: Agriculture
WITH category AS (
    SELECT id FROM quiz_categories WHERE name = 'Agriculture'
)
-- Questions pour la catégorie: Alimentation
WITH category AS (
    SELECT id FROM quiz_categories WHERE name = 'Alimentation'
)
-- Questions pour la catégorie: Transports
WITH category AS (
    SELECT id FROM quiz_categories WHERE name = 'Transports'
)
-- Questions pour la catégorie: Logement
WITH category AS (
    SELECT id FROM quiz_categories WHERE name = 'Logement'
)
-- Questions pour la catégorie: Vêtements
WITH category AS (
    SELECT id FROM quiz_categories WHERE name = 'Vêtements'
)
-- Questions pour la catégorie: Copie de Copie de Copie de Tans
WITH category AS (
    SELECT id FROM quiz_categories WHERE name = 'Copie de Copie de Copie de Tans'
)
COMMIT;
