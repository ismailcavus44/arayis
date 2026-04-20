import type { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'
import { EVDE_BAKIM_CITIES_FALLBACK, EVDE_BAKIM_SERVICE_KEYS, evdeBakimFlatHref } from '@/lib/evde-bakim-flat-silo'
import { getSiteOrigin } from '@/lib/site-origin'

type BlogRow = {
  slug: string
  updated_at: string | null
  created_at: string | null
}

type JobRow = {
  id: number
  updated_at: string | null
  created_at: string | null
}

type CityKeyRow = {
  city_key: string
}

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()
  if (!url || !key) return null
  return createClient(url, key)
}

function toAbsolute(origin: string, path: string) {
  return `${origin}${path}`
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const origin = getSiteOrigin()
  const nowIso = new Date().toISOString()
  const supabase = getSupabaseClient()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: toAbsolute(origin, '/'), changeFrequency: 'daily', priority: 1, lastModified: nowIso },
    { url: toAbsolute(origin, '/hakkimizda'), changeFrequency: 'monthly', priority: 0.8, lastModified: nowIso },
    { url: toAbsolute(origin, '/hizmetler'), changeFrequency: 'weekly', priority: 0.85, lastModified: nowIso },
    { url: toAbsolute(origin, '/hizmetlerimiz'), changeFrequency: 'weekly', priority: 0.9, lastModified: nowIso },
    { url: toAbsolute(origin, '/hizmetlerimiz/evde-bakim-personeli'), changeFrequency: 'weekly', priority: 0.9, lastModified: nowIso },
    {
      url: toAbsolute(origin, '/hizmetlerimiz/beyaz-yaka-personel-araciligi'),
      changeFrequency: 'monthly',
      priority: 0.75,
      lastModified: nowIso,
    },
    {
      url: toAbsolute(origin, '/hizmetlerimiz/mavi-yaka-personel-araciligi'),
      changeFrequency: 'monthly',
      priority: 0.75,
      lastModified: nowIso,
    },
    {
      url: toAbsolute(origin, '/hizmetlerimiz/insan-kaynaklari-danismanligi'),
      changeFrequency: 'monthly',
      priority: 0.75,
      lastModified: nowIso,
    },
    { url: toAbsolute(origin, '/blog'), changeFrequency: 'daily', priority: 0.8, lastModified: nowIso },
    { url: toAbsolute(origin, '/is-ilanlari'), changeFrequency: 'daily', priority: 0.85, lastModified: nowIso },
    { url: toAbsolute(origin, '/iletisim'), changeFrequency: 'monthly', priority: 0.7, lastModified: nowIso },
  ]

  let cityKeys = EVDE_BAKIM_CITIES_FALLBACK.map((c) => c.key)
  let blogRows: BlogRow[] = []
  let jobRows: JobRow[] = []

  if (supabase) {
    const [citiesRes, blogsRes, jobsRes] = await Promise.all([
      supabase.from('evde_bakim_cities').select('city_key').order('sort_order', { ascending: true }),
      supabase
        .from('blog_posts')
        .select('slug, updated_at, created_at')
        .eq('is_active', true)
        .not('slug', 'is', null)
        .order('created_at', { ascending: false }),
      supabase
        .from('job_listings')
        .select('id, updated_at, created_at')
        .eq('is_active', true)
        .order('created_at', { ascending: false }),
    ])

    if (!citiesRes.error && citiesRes.data?.length) {
      cityKeys = (citiesRes.data as CityKeyRow[])
        .map((r) => r.city_key?.trim())
        .filter((k): k is string => Boolean(k))
    }

    if (!blogsRes.error && blogsRes.data?.length) {
      blogRows = (blogsRes.data as BlogRow[]).filter((r) => Boolean(r.slug))
    }

    if (!jobsRes.error && jobsRes.data?.length) {
      jobRows = jobsRes.data as JobRow[]
    }
  }

  const dynamicServiceRoutes: MetadataRoute.Sitemap = cityKeys.flatMap((cityKey) =>
    EVDE_BAKIM_SERVICE_KEYS.map((service) => ({
      url: toAbsolute(origin, evdeBakimFlatHref(cityKey, service)),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
      lastModified: nowIso,
    }))
  )

  const blogRoutes: MetadataRoute.Sitemap = blogRows.map((blog) => ({
    url: toAbsolute(origin, `/blog/${blog.slug}`),
    changeFrequency: 'weekly',
    priority: 0.7,
    lastModified: blog.updated_at || blog.created_at || nowIso,
  }))

  const jobRoutes: MetadataRoute.Sitemap = jobRows.map((job) => ({
    url: toAbsolute(origin, `/is-ilanlari/${job.id}`),
    changeFrequency: 'daily',
    priority: 0.75,
    lastModified: job.updated_at || job.created_at || nowIso,
  }))

  return [...staticRoutes, ...dynamicServiceRoutes, ...blogRoutes, ...jobRoutes]
}
