-- =============================================================================
-- Aray-İş projesi — SADECE BOŞ (yeni) Supabase projesinde, tablolar YOKKEN çalıştırın.
--
-- Tablolar zaten varsa (blog_posts already exists hatası): BU DOSYAYI ÇALIŞTIRMAYIN.
-- Bunun yerine: supabase-patch-auth-rls.sql veya ihtiyaca özel küçük migration dosyalarını kullanın.
-- =============================================================================

-- Blog yazıları
CREATE TABLE blog_posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  excerpt VARCHAR(500),
  slug VARCHAR(255) UNIQUE NOT NULL,
  image_url VARCHAR(500),
  image_alt VARCHAR(255),
  meta_title VARCHAR(255),
  meta_description VARCHAR(500),
  category VARCHAR(100),
  featured BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- İş ilanları (job_applications bundan FK alır; önce bu oluşmalı)
CREATE TABLE job_listings (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  type VARCHAR(100) NOT NULL,
  experience VARCHAR(100),
  salary VARCHAR(255),
  description TEXT NOT NULL,
  requirements TEXT[],
  responsibilities TEXT[],
  benefits TEXT[],
  slug VARCHAR(255) UNIQUE NOT NULL,
  meta_title VARCHAR(255),
  meta_description VARCHAR(500),
  published_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Admin kullanıcıları (lib/admin.ts içinde adminService var; giriş sayfası şu an sabit admin/admin123)
CREATE TABLE admin_users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Başvurular
CREATE TABLE job_applications (
  id SERIAL PRIMARY KEY,
  job_id INTEGER REFERENCES job_listings(id) ON DELETE CASCADE,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255) NOT NULL,
  experience TEXT,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Örnek admin satırı (şifre kontrolü uygulamada sabit; hash kullanılmıyor)
INSERT INTO admin_users (username, password_hash) VALUES ('admin', '-');

-- =============================================================================
-- Row Level Security: tarayıcıdaki anon key ile CRUD için (demo). Canlıda sıkılaştırın.
-- =============================================================================
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon_all_blog_posts" ON blog_posts FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "anon_all_job_listings" ON job_listings FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "anon_all_job_applications" ON job_applications FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "anon_all_admin_users" ON admin_users FOR ALL TO anon USING (true) WITH CHECK (true);

-- Admin paneli Supabase Auth ile giriş yaptığında istekler authenticated rolüyle gider (anon politikaları uygulanmaz).
CREATE POLICY "authenticated_all_blog_posts" ON blog_posts FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "authenticated_all_job_listings" ON job_listings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "authenticated_all_job_applications" ON job_applications FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "authenticated_all_admin_users" ON admin_users FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- =============================================================================
-- Storage: admin panel blog görseli (bucket: blog-images)
-- =============================================================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'blog-images',
  'blog-images',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/jpg']
)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "blog_images_public_read"
ON storage.objects FOR SELECT TO public
USING (bucket_id = 'blog-images');

CREATE POLICY "blog_images_anon_insert"
ON storage.objects FOR INSERT TO anon
WITH CHECK (bucket_id = 'blog-images');

CREATE POLICY "blog_images_anon_update"
ON storage.objects FOR UPDATE TO anon
USING (bucket_id = 'blog-images');

CREATE POLICY "blog_images_anon_delete"
ON storage.objects FOR DELETE TO anon
USING (bucket_id = 'blog-images');

CREATE POLICY "blog_images_authenticated_insert"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'blog-images');

CREATE POLICY "blog_images_authenticated_update"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'blog-images');

CREATE POLICY "blog_images_authenticated_delete"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'blog-images');

-- Evde bakım: il bazlı sayfalar (yaşlı/hasta bakıcısı vb. — admin panelden yönetilir)
CREATE TABLE evde_bakim_cities (
  id SERIAL PRIMARY KEY,
  city_key VARCHAR(64) NOT NULL UNIQUE,
  city_name VARCHAR(100) NOT NULL,
  locative VARCHAR(150) NOT NULL,
  locative_ki VARCHAR(150) NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT evde_bakim_cities_key_format CHECK (city_key ~ '^[a-z0-9]+$' AND length(city_key) >= 2)
);

ALTER TABLE evde_bakim_cities ENABLE ROW LEVEL SECURITY;

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
  ('corum', 'Çorum', 'Çorum''da', 'Çorum''daki', 16);

-- Evde bakım: il + hizmet bazlı makale gövdesi (HTML; yoksa kod şablonu kullanılır)
CREATE TABLE evde_bakim_city_page_content (
  id SERIAL PRIMARY KEY,
  city_key VARCHAR(64) NOT NULL REFERENCES evde_bakim_cities(city_key) ON DELETE CASCADE ON UPDATE CASCADE,
  service_key VARCHAR(32) NOT NULL,
  article_html TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(city_key, service_key),
  CONSTRAINT evde_page_service_key CHECK (service_key IN ('yasli-bakicisi', 'hasta-bakicisi', 'cocuk-bakicisi', 'ev-yardimcisi'))
);

ALTER TABLE evde_bakim_city_page_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon_select_evde_bakim_city_page_content" ON evde_bakim_city_page_content FOR SELECT TO anon USING (true);
CREATE POLICY "authenticated_all_evde_bakim_city_page_content" ON evde_bakim_city_page_content FOR ALL TO authenticated USING (true) WITH CHECK (true);
