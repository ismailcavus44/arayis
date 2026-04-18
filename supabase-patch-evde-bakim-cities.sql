-- =============================================================================
-- Mevcut Supabase projesine evde bakım il tablosu + RLS (şema zaten kuruluysa).
-- =============================================================================

CREATE TABLE IF NOT EXISTS evde_bakim_cities (
  id SERIAL PRIMARY KEY,
  city_key VARCHAR(64) NOT NULL UNIQUE,
  city_name VARCHAR(100) NOT NULL,
  locative VARCHAR(150) NOT NULL,
  locative_ki VARCHAR(150) NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE evde_bakim_cities DROP CONSTRAINT IF EXISTS evde_bakim_cities_key_format;
ALTER TABLE evde_bakim_cities ADD CONSTRAINT evde_bakim_cities_key_format
  CHECK (city_key ~ '^[a-z0-9]+$' AND length(city_key) >= 2);

ALTER TABLE evde_bakim_cities ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_evde_bakim_cities" ON evde_bakim_cities;
DROP POLICY IF EXISTS "authenticated_all_evde_bakim_cities" ON evde_bakim_cities;

CREATE POLICY "anon_select_evde_bakim_cities" ON evde_bakim_cities FOR SELECT TO anon USING (true);
CREATE POLICY "authenticated_all_evde_bakim_cities" ON evde_bakim_cities FOR ALL TO authenticated USING (true) WITH CHECK (true);

INSERT INTO evde_bakim_cities (city_key, city_name, locative, locative_ki, sort_order) VALUES
  ('ankara', 'Ankara', 'Ankara''da', 'Ankara''daki', 0),
  ('kayseri', 'Kayseri', 'Kayseri''de', 'Kayseri''deki', 1),
  ('cankiri', 'Çankırı', 'Çankırı''da', 'Çankırı''daki', 2),
  ('yozgat', 'Yozgat', 'Yozgat''ta', 'Yozgat''taki', 3),
  ('kirsehir', 'Kırşehir', 'Kırşehir''de', 'Kırşehir''deki', 4),
  ('eskisehir', 'Eskişehir', 'Eskişehir''de', 'Eskişehir''deki', 5),
  ('konya', 'Konya', 'Konya''da', 'Konya''daki', 6),
  ('bolu', 'Bolu', 'Bolu''da', 'Bolu''daki', 7),
  ('kirikkale', 'Kırıkkale', 'Kırıkkale''de', 'Kırıkkale''deki', 8),
  ('nevsehir', 'Nevşehir', 'Nevşehir''de', 'Nevşehir''deki', 9),
  ('sivas', 'Sivas', 'Sivas''ta', 'Sivas''taki', 10),
  ('samsun', 'Samsun', 'Samsun''da', 'Samsun''daki', 11),
  ('afyon', 'Afyon', 'Afyon''da', 'Afyon''daki', 12),
  ('antalya', 'Antalya', 'Antalya''da', 'Antalya''daki', 13),
  ('mugla', 'Muğla', 'Muğla''da', 'Muğla''daki', 14),
  ('aydin', 'Aydın', 'Aydın''da', 'Aydın''daki', 15),
  ('corum', 'Çorum', 'Çorum''da', 'Çorum''daki', 16)
ON CONFLICT (city_key) DO NOTHING;
