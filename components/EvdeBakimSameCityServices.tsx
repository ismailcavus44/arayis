import { ChevronRight, HeartHandshake, Stethoscope, Baby, Sparkles } from 'lucide-react'
import type { ReactNode } from 'react'
import {
  EVDE_BAKIM_SERVICE_KEYS,
  SERVICE_COPY,
  evdeBakimFlatHref,
  type EvdeBakimCity,
  type EvdeBakimServiceKey,
} from '@/lib/evde-bakim-flat-silo'

const iconByService: Record<EvdeBakimServiceKey, ReactNode> = {
  'yasli-bakicisi': <HeartHandshake size={26} className="text-primary" />,
  'hasta-bakicisi': <Stethoscope size={26} className="text-primary" />,
  'cocuk-bakicisi': <Baby size={26} className="text-primary" />,
  'ev-yardimcisi': <Sparkles size={26} className="text-primary" />,
}

interface EvdeBakimSameCityServicesProps {
  city: EvdeBakimCity
  currentService: EvdeBakimServiceKey
  /** Sayfa içi menü / #anchor */
  sectionId?: string
}

export default function EvdeBakimSameCityServices({
  city,
  currentService,
  sectionId = 'diger-hizmetler',
}: EvdeBakimSameCityServicesProps) {
  const others = EVDE_BAKIM_SERVICE_KEYS.filter((s) => s !== currentService)

  return (
    <section id={sectionId} className="scroll-mt-28 border-t border-gray-200 bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-medium text-gray-900 text-center mb-10">
          {city.locativeKi} Diğer Bakım Hizmetlerimiz
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {others.map((svc) => {
            const cfg = SERVICE_COPY[svc]
            return (
              <a
                key={svc}
                href={evdeBakimFlatHref(city.key, svc)}
                className="group flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-primary/40 hover:shadow-md no-underline text-inherit"
              >
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    {iconByService[svc]}
                  </div>
                  <div>
                    <h3 className="text-[20px] font-medium leading-snug text-gray-900 transition-colors group-hover:text-primary">
                      {cfg.sameCityCardTitle(city)}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">{cfg.sameCityCardDescription}</p>
                  </div>
                </div>
                <span className="mt-6 inline-flex items-center text-sm font-semibold text-primary">
                  Sayfaya git
                  <ChevronRight size={18} className="transition-transform group-hover:translate-x-0.5" aria-hidden />
                </span>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
