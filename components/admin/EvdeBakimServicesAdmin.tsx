'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { evdeBakimCityService, type EvdeBakimCityRecord } from '@/lib/admin'
import {
  EVDE_BAKIM_ARTICLE_EDITOR_SERVICES,
  SERVICE_COPY,
  type EvdeBakimArticleEditorServiceKey,
} from '@/lib/evde-bakim-flat-silo'

export default function EvdeBakimServicesAdmin() {
  const [rows, setRows] = useState<EvdeBakimCityRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [openKey, setOpenKey] = useState<EvdeBakimArticleEditorServiceKey | null>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const data = await evdeBakimCityService.getAll()
        if (!cancelled) setRows(data)
      } catch (e) {
        console.error(e)
        alert('İller yüklenemedi. Evde bakım illeri sekmesinden tabloyu kontrol edin.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-100/80 bg-white p-6 shadow-sm">
        <div className="flex flex-col items-center justify-center py-12 text-slate-500">
          <div className="h-9 w-9 animate-spin rounded-full border-2 border-green-600 border-t-transparent" />
          <p className="mt-3 text-xs font-normal">Yükleniyor…</p>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-slate-100/80 bg-white p-6 text-sm font-normal shadow-sm">
      <h2 className="text-lg font-medium tracking-tight text-slate-900">Hizmet sayfaları</h2>
      <p className="mt-1.5 text-xs font-normal leading-relaxed text-slate-600">
        Yaşlı bakıcısı, hasta bakıcısı, çocuk bakıcısı ve ev yardımcısı için il sayfalarının «Hizmet hakkında» bölümünü makale olarak
        düzenleyin (başlıklar, paragraflar).
      </p>

      <div className="mt-6 space-y-3">
        {EVDE_BAKIM_ARTICLE_EDITOR_SERVICES.map((svc) => {
          const isOpen = openKey === svc
          return (
            <div key={svc} className="overflow-hidden rounded-xl border border-gray-200 bg-gray-50/50">
              <button
                type="button"
                onClick={() => setOpenKey(isOpen ? null : svc)}
                className="flex w-full items-center justify-between px-3 py-2.5 text-left text-[13px] font-medium text-slate-800 transition-colors hover:bg-white/80"
              >
                {SERVICE_COPY[svc].breadcrumbServiceName}
                <ChevronDown
                  size={22}
                  className={`shrink-0 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  aria-hidden
                />
              </button>
              {isOpen && (
                <div className="border-t border-gray-200 bg-white px-4 py-4">
                  <p className="mb-2 text-xs font-normal text-slate-600">İle tıklayarak makale editörünü açın.</p>
                  {rows.length === 0 ? (
                    <p className="text-xs font-normal text-amber-700">Önce «Evde bakım illeri» sekmesinden il ekleyin.</p>
                  ) : (
                    <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                      {rows.map((c) => (
                        <li key={`${svc}-${c.city_key}`}>
                          <Link
                            href={`/admin/hizmetler/editor?city=${encodeURIComponent(c.city_key)}&hizmet=${encodeURIComponent(svc)}`}
                            className="flex items-center justify-between gap-2 rounded-lg border border-slate-100 bg-slate-50/90 px-2.5 py-2 text-[13px] font-normal text-slate-800 no-underline transition-colors hover:border-green-200 hover:bg-emerald-50/60 hover:text-green-800"
                          >
                            {c.city_name}
                            <ChevronRight size={16} className="shrink-0 opacity-50" aria-hidden />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
