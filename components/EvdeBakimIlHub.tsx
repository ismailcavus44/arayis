'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Baby, ChevronLeft, ChevronRight, HeartHandshake, Sparkles, Stethoscope } from 'lucide-react'
import type { ReactNode } from 'react'
import { fetchEvdeBakimCities } from '@/lib/evde-bakim-cities'
import {
  EVDE_BAKIM_CITIES_FALLBACK,
  EVDE_BAKIM_SERVICE_KEYS,
  SERVICE_COPY,
  evdeBakimFlatHref,
  parseHizmetQueryParam,
  type EvdeBakimCity,
  type EvdeBakimServiceKey,
} from '@/lib/evde-bakim-flat-silo'

const iconByService: Record<EvdeBakimServiceKey, ReactNode> = {
  'yasli-bakicisi': <HeartHandshake size={28} className="text-primary" aria-hidden />,
  'hasta-bakicisi': <Stethoscope size={28} className="text-primary" aria-hidden />,
  'cocuk-bakicisi': <Baby size={28} className="text-primary" aria-hidden />,
  'ev-yardimcisi': <Sparkles size={28} className="text-primary" aria-hidden />,
}

export default function EvdeBakimIlHub() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [cities, setCities] = useState<EvdeBakimCity[]>(EVDE_BAKIM_CITIES_FALLBACK)
  const [citiesLoading, setCitiesLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const list = await fetchEvdeBakimCities()
        if (!cancelled) setCities(list)
      } finally {
        if (!cancelled) setCitiesLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const selectedService = useMemo(() => parseHizmetQueryParam(searchParams.get('hizmet')), [searchParams])

  const openService = useCallback(
    (svc: EvdeBakimServiceKey) => {
      router.push(`${pathname}?hizmet=${encodeURIComponent(svc)}`)
    },
    [router, pathname]
  )

  const closeService = useCallback(() => {
    router.push(pathname)
  }, [router, pathname])

  if (!selectedService) {
    return (
      <section id="hizmet-sec" className="scroll-mt-28 border-t border-gray-200 bg-gradient-to-b from-gray-50 to-white py-16 lg:py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-medium tracking-tight text-gray-900">Hizmet seçin</h2>
            <p className="mt-3 text-gray-600 text-sm lg:text-base max-w-2xl mx-auto leading-relaxed">
              Aradığınız personel türünü seçin; ardından il listesinden şehre giderek ilgili aracılık sayfasına ulaşın.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
            {EVDE_BAKIM_SERVICE_KEYS.map((svc) => {
              const cfg = SERVICE_COPY[svc]
              return (
                <button
                  key={svc}
                  type="button"
                  onClick={() => openService(svc)}
                  className="group flex min-h-[220px] flex-col rounded-2xl border border-gray-200/80 bg-white p-6 lg:p-8 text-left shadow-sm transition-all duration-200 hover:border-primary/35 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/5 transition-colors group-hover:bg-primary/[0.12]">
                    {iconByService[svc]}
                  </div>
                  <h3 className="text-[20px] font-semibold leading-snug text-gray-900 transition-colors group-hover:text-primary">
                    {cfg.breadcrumbServiceName}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-gray-600 leading-relaxed">{cfg.sameCityCardDescription}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    İlleri görüntüle
                    <ChevronRight size={18} className="transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </section>
    )
  }

  const cfg = SERVICE_COPY[selectedService]
  const serviceTitle = cfg.breadcrumbServiceName

  return (
    <section id="il-sec" className="scroll-mt-28 border-t border-gray-200 bg-gradient-to-b from-gray-50 to-white py-16 lg:py-20">
      <div className="container mx-auto px-4 max-w-5xl">
        <button
          type="button"
          onClick={closeService}
          className="mb-8 inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:border-primary/30 hover:text-primary"
        >
          <ChevronLeft size={18} aria-hidden />
          Tüm hizmetlere dön
        </button>
        <div className="text-center mb-10">
          <h2 className="text-2xl lg:text-3xl font-medium text-gray-900">
            {serviceTitle} — il seçin
          </h2>
          <p className="mt-3 text-sm text-gray-600 max-w-xl mx-auto">
            Bir ile tıklayarak o şehirdeki {serviceTitle.toLowerCase()} aracılık sayfasına gidebilirsiniz.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {citiesLoading
            ? Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="min-h-[3.25rem] animate-pulse rounded-xl bg-gray-200/80"
                  aria-hidden
                />
              ))
            : cities.map((c) => (
                <a
                  key={c.key}
                  href={evdeBakimFlatHref(c.key, selectedService)}
                  className="flex min-h-[3.25rem] items-center justify-center rounded-xl border border-gray-200 bg-white px-2 py-3 text-center text-sm font-medium text-gray-800 shadow-sm transition-all hover:border-primary/40 hover:bg-primary/[0.06] hover:text-primary no-underline"
                >
                  {c.ad}
                </a>
              ))}
        </div>
      </div>
    </section>
  )
}
