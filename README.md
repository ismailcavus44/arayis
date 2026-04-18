# Aray-İş - İnsan Kaynakları Platformu

Modern ve kullanıcı dostu bir insan kaynakları platformu. İş arayanlar ve işverenler için profesyonel çözümler sunar.

## 🚀 Özellikler

### Ana Site
- **Modern UI/UX**: Temiz ve kullanıcı dostu arayüz
- **Responsive Tasarım**: Tüm cihazlarda mükemmel görünüm
- **Blog Sistemi**: Kariyer rehberi ve güncel içerikler
- **İş İlanları**: Detaylı iş ilanları ve başvuru sistemi
- **İletişim Formu**: KVKK uyumlu iletişim sistemi

### Admin Paneli
- **Güvenli Giriş**: Kullanıcı adı/şifre ile admin erişimi
- **Blog Yönetimi**: Blog yazıları ekleme, düzenleme, silme
- **İş İlanları Yönetimi**: İlan ekleme, düzenleme, silme
- **Başvuru Yönetimi**: Gelen başvuruları görüntüleme ve yönetme
- **Site Ayarları**: Temel site konfigürasyonu

## 🛠️ Teknolojiler

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **UI Bileşenleri**: Lucide React Icons
- **Font**: Manrope (Optimized WOFF2)
- **Styling**: Tailwind CSS with custom design system

## 📁 Proje Yapısı

```
arayis/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin paneli
│   │   ├── page.tsx       # Admin giriş
│   │   └── dashboard/     # Admin dashboard
│   ├── blog/              # Blog sayfası
│   ├── contact/           # İletişim sayfası
│   ├── is-ilanlari/       # İş ilanları
│   └── page.tsx           # Ana sayfa
├── components/            # React bileşenleri
├── lib/                   # Yardımcı fonksiyonlar
│   ├── admin.ts          # Admin servisleri
│   └── supabase.ts       # Supabase konfigürasyonu
├── public/               # Statik dosyalar
│   └── fonts/           # Font dosyaları
└── supabase-schema.sql   # Veritabanı şeması
```

## 🗄️ Veritabanı Şeması

### Tablolar
- **blog_posts**: Blog yazıları
- **job_listings**: İş ilanları
- **job_applications**: İş başvuruları
- **admin_users**: Admin kullanıcıları

### İlişkiler
- `job_applications.job_id` → `job_listings.id` (Foreign Key)

## 🔧 Kurulum

### 1. Projeyi Klonlayın
```bash
git clone <repository-url>
cd arayis
```

### 2. Bağımlılıkları Yükleyin
```bash
npm install
```

### 3. Supabase Kurulumu
1. [Supabase](https://supabase.com) hesabı oluşturun
2. Yeni proje oluşturun
3. `supabase-schema.sql` dosyasını SQL editöründe çalıştırın

### 4. Environment Variables
`.env.local` dosyası oluşturun:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 5. Font Dosyaları
`public/fonts/` klasörüne Manrope font dosyalarını yükleyin:
- `Manrope-Regular.woff2`
- `Manrope-Medium.woff2`
- `Manrope-SemiBold.woff2`
- `Manrope-Bold.woff2`

### 6. Geliştirme Sunucusunu Başlatın
```bash
npm run dev
```

## 🔐 Admin Paneli

### Giriş Bilgileri
- **URL**: `/admin`
- **Kullanıcı Adı**: `admin`
- **Şifre**: `admin123`

### Özellikler
- **Blog Yönetimi**: Yazı ekleme, düzenleme, silme
- **İş İlanları**: İlan ekleme, düzenleme, silme
- **Başvuru Yönetimi**: Gelen başvuruları görüntüleme
- **Site Ayarları**: Temel konfigürasyon

## 🎨 Tasarım Sistemi

### Renkler
- **Primary**: `#00afeb` (Mavi)
- **Secondary**: `#132263` (Koyu Mavi)
- **Background**: `#ffffff` (Beyaz)

### Font
- **Aile**: Manrope
- **Ağırlıklar**: Regular (400), Medium (500), SemiBold (600), Bold (700)

### Bileşenler
- **Kartlar**: `rounded-2xl shadow-sm border border-gray-100`
- **Butonlar**: `bg-primary text-white rounded-xl hover:bg-primary/90`
- **Inputlar**: `border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20`

## 📱 Responsive Tasarım

- **Mobile First**: Tüm bileşenler mobil öncelikli
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Grid Sistemi**: Tailwind CSS grid ve flexbox

## 🔒 Güvenlik

- **KVKK Uyumlu**: Kişisel veri koruma uyumlu
- **Admin Auth**: Basit kullanıcı adı/şifre sistemi
- **Input Validation**: Form doğrulama
- **SQL Injection Protection**: Supabase güvenlik

## 🚀 Deployment

### Vercel (Önerilen)
1. GitHub'a push edin
2. Vercel'de yeni proje oluşturun
3. Environment variables ekleyin
4. Deploy edin

### Diğer Platformlar
- Netlify
- Railway
- DigitalOcean App Platform

## 📝 API Endpoints

### Blog
- `GET /api/blog` - Tüm blog yazıları
- `GET /api/blog/[id]` - Tek blog yazısı
- `POST /api/blog` - Yeni blog yazısı
- `PUT /api/blog/[id]` - Blog yazısı güncelleme
- `DELETE /api/blog/[id]` - Blog yazısı silme

### İş İlanları
- `GET /api/jobs` - Tüm iş ilanları
- `GET /api/jobs/[id]` - Tek iş ilanı
- `POST /api/jobs` - Yeni iş ilanı
- `PUT /api/jobs/[id]` - İş ilanı güncelleme
- `DELETE /api/jobs/[id]` - İş ilanı silme

### Başvurular
- `GET /api/applications` - Tüm başvurular
- `POST /api/applications` - Yeni başvuru
- `DELETE /api/applications/[id]` - Başvuru silme

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 📞 İletişim

- **Website**: [arayis.com](https://arayis.com)
- **Email**: info@arayis.com
- **Telefon**: +90 XXX XXX XX XX

---

**Aray-İş** - Kariyerinizi şekillendiren profesyonel çözümler

