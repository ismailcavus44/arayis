-- =============================================================================
-- MEVCUT veritabanı için — SADECE BU DOSYAYI çalıştırın.
-- supabase-schema.sql tablo oluşturur; projede tablolar varken onu çalıştırmayın (42P07 hatası).
--
-- Ne zaman: Admin Supabase Auth ile giriş + RLS reddi:
--   "new row violates row-level security policy for table blog_posts"
-- =============================================================================

DROP POLICY IF EXISTS "authenticated_all_blog_posts" ON blog_posts;
DROP POLICY IF EXISTS "authenticated_all_job_listings" ON job_listings;
DROP POLICY IF EXISTS "authenticated_all_job_applications" ON job_applications;
DROP POLICY IF EXISTS "authenticated_all_admin_users" ON admin_users;

CREATE POLICY "authenticated_all_blog_posts" ON blog_posts FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "authenticated_all_job_listings" ON job_listings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "authenticated_all_job_applications" ON job_applications FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "authenticated_all_admin_users" ON admin_users FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Blog görseli yükleme (Storage), authenticated kullanıcı
DROP POLICY IF EXISTS "blog_images_authenticated_insert" ON storage.objects;
DROP POLICY IF EXISTS "blog_images_authenticated_update" ON storage.objects;
DROP POLICY IF EXISTS "blog_images_authenticated_delete" ON storage.objects;

CREATE POLICY "blog_images_authenticated_insert"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'blog-images');

CREATE POLICY "blog_images_authenticated_update"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'blog-images');

CREATE POLICY "blog_images_authenticated_delete"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'blog-images');
