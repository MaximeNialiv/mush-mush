-- Désactiver temporairement la vérification de la contrainte sur media_type
ALTER TABLE public.cards DROP CONSTRAINT IF EXISTS "cards_media_type_check";

-- Créer la table pour les métadonnées des médias
CREATE TABLE IF NOT EXISTS public.media_metadata (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Métadonnées communes
    title TEXT,
    description TEXT,
    thumbnail_url TEXT,
    duration INTEGER,
    
    -- Métadonnées YouTube
    youtube_id TEXT,
    channel_title TEXT,
    
    -- Métadonnées Spotify
    spotify_id TEXT,
    artist_name TEXT,
    album_name TEXT,
    
    -- Métadonnées PDF
    page_count INTEGER,
    file_size INTEGER,
    
    -- Métadonnées URL Preview
    site_name TEXT,
    favicon TEXT,
    og_image TEXT
);

-- Activer RLS sur la nouvelle table
ALTER TABLE public.media_metadata ENABLE ROW LEVEL SECURITY;

-- Politique pour les métadonnées: tout le monde peut lire et écrire (pour les tests)
CREATE POLICY "Permettre l'accès complet aux métadonnées" ON public.media_metadata
  FOR ALL USING (true);

-- Ajouter la colonne media_metadata_id à la table cards
ALTER TABLE public.cards 
    ADD COLUMN IF NOT EXISTS media_metadata_id UUID REFERENCES public.media_metadata(id);

-- Migrer les données existantes
DO $$
DECLARE
    card_record RECORD;
    metadata_id UUID;
BEGIN
    FOR card_record IN SELECT * FROM public.cards WHERE type = 'media' LOOP
        -- Créer une entrée dans media_metadata
        INSERT INTO public.media_metadata (
            title,
            description,
            thumbnail_url,
            youtube_id,
            site_name
        ) VALUES (
            card_record.title,
            card_record.description,
            card_record.thumbnail_url,
            CASE 
                WHEN card_record.media_type = 'video' AND card_record.media_url LIKE '%youtube%'
                THEN substring(card_record.media_url from 'v=([^&]+)' for '#')
                ELSE NULL
            END,
            CASE 
                WHEN card_record.media_type = 'url' THEN substring(card_record.media_url from '.*://([^/]+)')
                ELSE NULL
            END
        ) RETURNING id INTO metadata_id;

        -- Mettre à jour la carte avec l'ID des métadonnées
        UPDATE public.cards
        SET media_metadata_id = metadata_id,
            media_type = CASE 
                WHEN card_record.media_type = 'video' AND card_record.media_url LIKE '%youtube%'
                THEN 'youtube'
                WHEN card_record.media_type = 'pdf'
                THEN 'pdf'
                WHEN card_record.media_type = 'url'
                THEN 'url_preview'
                ELSE card_record.media_type
            END
        WHERE id = card_record.id;
    END LOOP;
END $$;

-- Ajouter la nouvelle contrainte sur media_type
ALTER TABLE public.cards
    ADD CONSTRAINT "cards_media_type_check" 
    CHECK (
        (type = 'media' AND media_type IN ('youtube', 'pdf', 'spotify', 'url_preview')) OR
        (type != 'media' AND media_type IS NULL)
    );

-- Créer un trigger pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_media_metadata_updated_at
    BEFORE UPDATE ON media_metadata
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_cards_media_type ON cards(media_type) WHERE type = 'media';
CREATE INDEX IF NOT EXISTS idx_media_metadata_youtube ON media_metadata(youtube_id) WHERE youtube_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_media_metadata_spotify ON media_metadata(spotify_id) WHERE spotify_id IS NOT NULL;
