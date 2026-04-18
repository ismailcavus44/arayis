import { cache } from 'react'
import { supabase } from './supabase'
import { EVDE_BAKIM_CITIES_FALLBACK, type EvdeBakimCity } from './evde-bakim-flat-silo'

export type EvdeBakimCityRow = {
  id?: number
  city_key: string
  city_name: string
  locative: string
  locative_ki: string
  sort_order?: number
  created_at?: string
  updated_at?: string
}

export function evdeBakimRowToCity(row: EvdeBakimCityRow): EvdeBakimCity {
  return {
    key: row.city_key,
    ad: row.city_name,
    locative: row.locative,
    locativeKi: row.locative_ki,
  }
}

async function fetchEvdeBakimCitiesImpl(): Promise<EvdeBakimCity[]> {
  const { data, error } = await supabase
    .from('evde_bakim_cities')
    .select('city_key, city_name, locative, locative_ki, sort_order')
    .order('sort_order', { ascending: true })
    .order('city_name', { ascending: true })

  if (error) {
    console.error('evde_bakim_cities okunamadı:', error.message)
    return EVDE_BAKIM_CITIES_FALLBACK
  }
  if (!data?.length) return EVDE_BAKIM_CITIES_FALLBACK
  return data.map((r) => evdeBakimRowToCity(r as EvdeBakimCityRow))
}

/** İstemci bileşenleri ve her istekte güncel liste */
export async function fetchEvdeBakimCities(): Promise<EvdeBakimCity[]> {
  return fetchEvdeBakimCitiesImpl()
}

/** Sunucu bileşenlerinde aynı istekte tek sorgu */
export const getEvdeBakimCitiesCached = cache(fetchEvdeBakimCitiesImpl)
