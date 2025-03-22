-- Créer un type enum pour les types de médias
CREATE TYPE media_type AS ENUM ('youtube', 'pdf', 'spotify', 'url_preview');

-- Créer une table pour les métadonnées des médias
CREATE TABLE media_metadata (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
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

-- Mettre à jour la table cards
ALTER TABLE cards
    ADD COLUMN media_type media_type,
    ADD COLUMN media_metadata_id UUID REFERENCES media_metadata(id),
    ADD CONSTRAINT valid_media_type CHECK (
        (type = 'media' AND media_type IS NOT NULL) OR
        (type != 'media' AND media_type IS NULL)
    );

-- Trigger pour mettre à jour updated_at
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
CREATE INDEX idx_cards_media_type ON cards(media_type) WHERE type = 'media';
CREATE INDEX idx_media_metadata_youtube ON media_metadata(youtube_id) WHERE youtube_id IS NOT NULL;
CREATE INDEX idx_media_metadata_spotify ON media_metadata(spotify_id) WHERE spotify_id IS NOT NULL;
