import { supabase } from './supabase'

// Blog yazıları için tip tanımları
export interface BlogPost {
  id?: number
  title: string
  content: string
  excerpt?: string
  slug: string
  image_url?: string
  image_alt?: string
  meta_title?: string
  meta_description?: string
  category?: string
  featured?: boolean
  published_at?: string
  created_at?: string
  updated_at?: string
}

// İş ilanları için tip tanımları
export interface JobListing {
  id?: number
  title: string
  company: string
  location: string
  type: string
  experience?: string
  salary?: string
  description: string
  requirements: string[]
  responsibilities: string[]
  benefits: string[]
  slug: string
  meta_title?: string | null
  meta_description?: string | null
  published_at?: string
  created_at?: string
  updated_at?: string
}

// Başvuru için tip tanımları
export interface JobApplication {
  id?: number
  job_id: number
  first_name: string
  last_name: string
  phone: string
  email: string
  experience?: string
  message?: string
  created_at?: string
}

/** Evde bakım il sayfaları (Supabase `evde_bakim_cities`) */
export interface EvdeBakimCityRecord {
  id?: number
  city_key: string
  city_name: string
  locative: string
  locative_ki: string
  sort_order: number
  created_at?: string
  updated_at?: string
}

// Blog yazıları işlemleri
export const blogService = {
  // Tüm blog yazılarını getir
  async getAll() {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Tek blog yazısı getir
  async getById(id: number) {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  // Slug'a göre blog yazısı getir
  async getBySlug(slug: string) {
    const normalizedSlug = decodeURIComponent(slug || '').trim().toLowerCase()
    if (!normalizedSlug) return null

    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .ilike('slug', normalizedSlug)
      .limit(1)
      .maybeSingle()
    
    if (error) throw error
    return data
  },

  // Blog yazısı ekle
  async create(blog: BlogPost) {
    const { id: _id, created_at: _c, updated_at: _u, published_at: _p, ...rest } = blog
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([
        {
          ...rest,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Blog yazısı güncelle
  async update(id: number, blog: Partial<BlogPost>) {
    const { id: _omitId, created_at: _oc, ...rest } = blog as BlogPost
    const { data, error } = await supabase
      .from('blog_posts')
      .update({ ...rest, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Blog yazısı sil
  async delete(id: number) {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// İş ilanları işlemleri
export const jobService = {
  // Tüm iş ilanlarını getir
  async getAll() {
    const { data, error } = await supabase
      .from('job_listings')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Tek iş ilanı getir
  async getById(id: number) {
    const { data, error } = await supabase
      .from('job_listings')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  // İş ilanı ekle
  async create(job: JobListing) {
    const { data, error } = await supabase
      .from('job_listings')
      .insert([job])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // İş ilanı güncelle
  async update(id: number, job: Partial<JobListing>) {
    const { data, error } = await supabase
      .from('job_listings')
      .update({ ...job, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // İş ilanı sil
  async delete(id: number) {
    const { error } = await supabase
      .from('job_listings')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

export const evdeBakimCityService = {
  async getAll() {
    const { data, error } = await supabase
      .from('evde_bakim_cities')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('city_name', { ascending: true })

    if (error) throw error
    return data as EvdeBakimCityRecord[]
  },

  async create(row: Omit<EvdeBakimCityRecord, 'id' | 'created_at' | 'updated_at'>) {
    const now = new Date().toISOString()
    const { data, error } = await supabase
      .from('evde_bakim_cities')
      .insert([
        {
          city_key: row.city_key,
          city_name: row.city_name,
          locative: row.locative,
          locative_ki: row.locative_ki,
          sort_order: row.sort_order ?? 0,
          created_at: now,
          updated_at: now,
        },
      ])
      .select()
      .single()

    if (error) throw error
    return data as EvdeBakimCityRecord
  },

  async update(id: number, row: Partial<EvdeBakimCityRecord>) {
    const { id: _i, created_at: _c, ...rest } = row as EvdeBakimCityRecord
    const { data, error } = await supabase
      .from('evde_bakim_cities')
      .update({ ...rest, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as EvdeBakimCityRecord
  },

  async delete(id: number) {
    const { error } = await supabase.from('evde_bakim_cities').delete().eq('id', id)
    if (error) throw error
  },
}

/** `evde_bakim_city_page_content` — il + hizmet makalesi (Quill HTML) */
export interface EvdeBakimCityPageContent {
  id?: number
  city_key: string
  service_key: string
  article_html: string
  featured_image_url?: string | null
  featured_image_alt?: string | null
  meta_title?: string | null
  meta_description?: string | null
  updated_at?: string
}

export const evdeBakimCityPageContentService = {
  async listByCity(cityKey: string) {
    const { data, error } = await supabase
      .from('evde_bakim_city_page_content')
      .select('*')
      .eq('city_key', cityKey)
      .order('service_key', { ascending: true })

    if (error) throw error
    return data as EvdeBakimCityPageContent[]
  },

  async getByCityAndService(cityKey: string, serviceKey: string) {
    const { data, error } = await supabase
      .from('evde_bakim_city_page_content')
      .select('*')
      .eq('city_key', cityKey)
      .eq('service_key', serviceKey)
      .maybeSingle()

    if (error) throw error
    return data as EvdeBakimCityPageContent | null
  },

  /** Boş metin gönderilirse satır silinir (sitede şablon kullanılır). */
  async upsertArticle(
    row: Pick<
      EvdeBakimCityPageContent,
      'city_key' | 'service_key' | 'article_html' | 'featured_image_url' | 'featured_image_alt' | 'meta_title' | 'meta_description'
    >
  ) {
    const html = row.article_html.trim()
    if (!html) {
      await evdeBakimCityPageContentService.deleteByCityAndService(row.city_key, row.service_key)
      return null
    }
    const now = new Date().toISOString()
    const { data, error } = await supabase
      .from('evde_bakim_city_page_content')
      .upsert(
        {
          city_key: row.city_key,
          service_key: row.service_key,
          article_html: html,
          featured_image_url: row.featured_image_url?.trim() || null,
          featured_image_alt: row.featured_image_alt?.trim() || null,
          meta_title: row.meta_title?.trim() || null,
          meta_description: row.meta_description?.trim() || null,
          updated_at: now,
        },
        { onConflict: 'city_key,service_key' }
      )
      .select()
      .single()

    if (error) throw error
    return data as EvdeBakimCityPageContent
  },

  async deleteByCityAndService(cityKey: string, serviceKey: string) {
    const { error } = await supabase
      .from('evde_bakim_city_page_content')
      .delete()
      .eq('city_key', cityKey)
      .eq('service_key', serviceKey)

    if (error) throw error
  },
}

// Başvuru işlemleri
export const applicationService = {
  // Tüm başvuruları getir
  async getAll() {
    const { data, error } = await supabase
      .from('job_applications')
      .select(`
        *,
        job_listings (
          title,
          company
        )
      `)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Başvuru ekle
  async create(application: JobApplication) {
    const { data, error } = await supabase
      .from('job_applications')
      .insert([application])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Başvuru sil
  async delete(id: number) {
    const { error } = await supabase
      .from('job_applications')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Admin kullanıcı işlemleri
export const adminService = {
  // Admin giriş kontrolü
  async login(username: string, password: string) {
    // Basit kontrol - gerçek uygulamada hash kontrolü yapılmalı
    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('username', username)
      .single()
    
    if (error) throw error
    
    // Şifre kontrolü (gerçek uygulamada bcrypt kullanılmalı)
    if (data && password === 'admin123') {
      return data
    }
    
    throw new Error('Geçersiz kullanıcı adı veya şifre')
  }
}

// Yardımcı fonksiyonlar
export const utils = {
  // Slug oluştur
  createSlug(text: string): string {
    return text
      .toLowerCase()
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  },

  /** URL parçası: tire yok (slug: {key}-{hizmet} ayrışması için) */
  evdeBakimCityKeyFromName(name: string): string {
    return utils.createSlug(name).replace(/-/g, '')
  },

  /** Liste kartları için: Quill HTML'ini düz metne çevirir */
  htmlToPlainText(html: string): string {
    if (!html) return ''
    const t = html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/gi, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/\s+/g, ' ')
      .trim()
    return t
  },

  /** Kart önizlemesi: excerpt veya içerikten kısa düz metin */
  blogCardPreview(blog: { excerpt?: string; content: string }, maxLen = 160): string {
    const raw = (blog.excerpt && blog.excerpt.trim()) || blog.content || ''
    const plain = utils.htmlToPlainText(raw)
    if (plain.length <= maxLen) return plain
    return `${plain.slice(0, maxLen).trimEnd()}…`
  },

  // Tarih formatla
  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
}


