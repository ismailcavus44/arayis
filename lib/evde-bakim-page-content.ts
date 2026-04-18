import { cache } from 'react'
import { supabase } from './supabase'
import type { EvdeBakimServiceKey } from './evde-bakim-flat-silo'

export type EvdeBakimPageContentRow = {
  article_html: string | null
  featured_image_url: string | null
  featured_image_alt: string | null
  meta_title: string | null
  meta_description: string | null
}

async function fetchCityServicePageContentImpl(
  cityKey: string,
  service: EvdeBakimServiceKey
): Promise<EvdeBakimPageContentRow | null> {
  const { data, error } = await supabase
    .from('evde_bakim_city_page_content')
    .select('article_html, featured_image_url, featured_image_alt, meta_title, meta_description')
    .eq('city_key', cityKey)
    .eq('service_key', service)
    .maybeSingle()

  if (error) {
    console.error('evde_bakim_city_page_content:', error.message)
    return null
  }
  if (!data) return null

  return {
    article_html: (data.article_html as string | null) ?? null,
    featured_image_url: (data.featured_image_url as string | null) ?? null,
    featured_image_alt: (data.featured_image_alt as string | null) ?? null,
    meta_title: (data.meta_title as string | null) ?? null,
    meta_description: (data.meta_description as string | null) ?? null,
  }
}

export const getCityServicePageContentCached = cache(fetchCityServicePageContentImpl)

export const getCityServiceArticleHtmlCached = cache(async (cityKey: string, service: EvdeBakimServiceKey) => {
  const row = await fetchCityServicePageContentImpl(cityKey, service)
  const html = row?.article_html?.trim()
  return html || null
})
