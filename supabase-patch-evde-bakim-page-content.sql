-- =============================================================================
-- evde_bakim_city_page_content: makale gövdesi (article_html).
-- Eski kurulumlarda paragraph_1 / paragraph_2 varsa article_html’e taşınır.
-- Önkoşul: evde_bakim_cities tablosu mevcut olmalı.
-- =============================================================================

CREATE TABLE IF NOT EXISTS evde_bakim_city_page_content (
  id SERIAL PRIMARY KEY,
  city_key VARCHAR(64) NOT NULL,
  service_key VARCHAR(32) NOT NULL,
  article_html TEXT NOT NULL DEFAULT '',
  featured_image_url TEXT,
  featured_image_alt TEXT,
  meta_title TEXT,
  meta_description TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(city_key, service_key),
  CONSTRAINT evde_page_service_key CHECK (service_key IN ('yasli-bakicisi', 'hasta-bakicisi', 'cocuk-bakicisi', 'ev-yardimcisi'))
);

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'evde_bakim_city_page_content'
      AND column_name = 'paragraph_1'
  ) THEN
    ALTER TABLE evde_bakim_city_page_content ADD COLUMN IF NOT EXISTS article_html TEXT;
    UPDATE evde_bakim_city_page_content
    SET article_html = '<p>' || paragraph_1 || '</p><p>' || paragraph_2 || '</p>'
    WHERE article_html IS NULL OR trim(article_html) = '';
    ALTER TABLE evde_bakim_city_page_content DROP COLUMN paragraph_1;
    ALTER TABLE evde_bakim_city_page_content DROP COLUMN paragraph_2;
    ALTER TABLE evde_bakim_city_page_content ALTER COLUMN article_html SET NOT NULL;
    ALTER TABLE evde_bakim_city_page_content ALTER COLUMN article_html SET DEFAULT '';
  END IF;
END $$;

ALTER TABLE evde_bakim_city_page_content ADD COLUMN IF NOT EXISTS featured_image_url TEXT;
ALTER TABLE evde_bakim_city_page_content ADD COLUMN IF NOT EXISTS featured_image_alt TEXT;
ALTER TABLE evde_bakim_city_page_content ADD COLUMN IF NOT EXISTS meta_title TEXT;
ALTER TABLE evde_bakim_city_page_content ADD COLUMN IF NOT EXISTS meta_description TEXT;

ALTER TABLE evde_bakim_city_page_content DROP CONSTRAINT IF EXISTS evde_bakim_city_page_content_city_key_fkey;
ALTER TABLE evde_bakim_city_page_content
  ADD CONSTRAINT evde_bakim_city_page_content_city_key_fkey
  FOREIGN KEY (city_key) REFERENCES evde_bakim_cities(city_key) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE evde_bakim_city_page_content ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_evde_bakim_city_page_content" ON evde_bakim_city_page_content;
DROP POLICY IF EXISTS "authenticated_all_evde_bakim_city_page_content" ON evde_bakim_city_page_content;

CREATE POLICY "anon_select_evde_bakim_city_page_content" ON evde_bakim_city_page_content FOR SELECT TO anon USING (true);
CREATE POLICY "authenticated_all_evde_bakim_city_page_content" ON evde_bakim_city_page_content FOR ALL TO authenticated USING (true) WITH CHECK (true);
