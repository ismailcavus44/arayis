-- Mevcut Supabase projesinde çalıştırın: iş ilanları SEO alanları
ALTER TABLE job_listings ADD COLUMN IF NOT EXISTS meta_title VARCHAR(255);
ALTER TABLE job_listings ADD COLUMN IF NOT EXISTS meta_description VARCHAR(500);
