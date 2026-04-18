'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHeroMedia from '@/components/PageHeroMedia'
import { MapPin, Building2, Clock, Search, Filter, X } from 'lucide-react'
import { jobService, utils, JobListing } from '@/lib/admin'

function plainTextFromHtml(html: string) {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase()
}

function jobSearchBlob(job: JobListing) {
  const parts = [
    job.title,
    job.company,
    job.location,
    plainTextFromHtml(job.description || ''),
    (job.requirements || []).join(' '),
    (job.responsibilities || []).join(' '),
    (job.benefits || []).join(' '),
    job.experience || '',
    job.salary || '',
  ]
  return parts.join(' ').toLowerCase()
}

export default function JobListingsPage() {
  const [jobs, setJobs] = useState<JobListing[]>([])
  const [filteredJobs, setFilteredJobs] = useState<JobListing[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [totalPages, setTotalPages] = useState(1)
  const [isExpanded, setIsExpanded] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()

  const rawPage = parseInt(searchParams.get('sayfa') || '1', 10)
  const currentPage = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1
  const searchQuery = searchParams.get('q') || ''
  const locationFilter = searchParams.get('lokasyon') || ''
  const typeFilter = searchParams.get('tip') || ''
  const jobsPerPage = 9

  const [localQ, setLocalQ] = useState('')
  const [localLokasyon, setLocalLokasyon] = useState('')
  const [localTip, setLocalTip] = useState('')

  useEffect(() => {
    setLocalQ(searchParams.get('q') || '')
    setLocalLokasyon(searchParams.get('lokasyon') || '')
    setLocalTip(searchParams.get('tip') || '')
  }, [searchParams])

  useEffect(() => {
    fetchJobs()
  }, [])

  const applyFilters = useCallback(() => {
    let filtered = [...jobs]

    const q = searchQuery.trim()
    if (q) {
      const terms = q
        .toLowerCase()
        .split(/\s+/)
        .map((t) => t.trim())
        .filter(Boolean)
      filtered = filtered.filter((job) => {
        const blob = jobSearchBlob(job)
        return terms.every((term) => blob.includes(term))
      })
    }

    const loc = locationFilter.trim()
    if (loc) {
      const locTerms = loc
        .toLowerCase()
        .split(/\s+/)
        .map((t) => t.trim())
        .filter(Boolean)
      filtered = filtered.filter((job) => {
        const jl = job.location.toLowerCase()
        return locTerms.every((term) => jl.includes(term))
      })
    }

    if (typeFilter) {
      filtered = filtered.filter((job) => job.type === typeFilter)
    }

    setFilteredJobs(filtered)
    setTotalPages(Math.max(1, Math.ceil(filtered.length / jobsPerPage)))
  }, [jobs, searchQuery, locationFilter, typeFilter])

  useEffect(() => {
    applyFilters()
  }, [applyFilters])

  const fetchJobs = async () => {
    try {
      setIsLoading(true)
      const data = await jobService.getAll()
      setJobs(data)
      setTotalPages(Math.ceil(data.length / jobsPerPage))
    } catch (error) {
      console.error('İş ilanları yüklenirken hata:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const commitFilters = () => {
    const params = new URLSearchParams()
    const q = localQ.trim()
    const lok = localLokasyon.trim()
    if (q) params.set('q', q)
    if (lok) params.set('lokasyon', lok)
    if (localTip) params.set('tip', localTip)
    const qs = params.toString()
    router.push(qs ? `/is-ilanlari?${qs}` : '/is-ilanlari')
  }

  const clearFilters = () => {
    setLocalQ('')
    setLocalLokasyon('')
    setLocalTip('')
    router.push('/is-ilanlari')
  }

  const hasActiveFilters = Boolean(searchQuery.trim() || locationFilter.trim() || typeFilter)

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())

    if (page === 1) {
      params.delete('sayfa')
    } else {
      params.set('sayfa', page.toString())
    }

    const newURL = params.toString() ? `?${params.toString()}` : ''
    router.push(`/is-ilanlari${newURL}`)
  }

  const activePage = Math.min(currentPage, totalPages)

  const getPaginatedJobs = () => {
    const startIndex = (activePage - 1) * jobsPerPage
    const endIndex = startIndex + jobsPerPage
    return filteredJobs.slice(startIndex, endIndex)
  }

  const truncateDescription = (text: string) => {
    const plain = text.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
    return plain.length > 140 ? plain.substring(0, 140) + '…' : plain
  }

  const careerContent = `<h2 style="font-size: 30px !important; font-weight: 600 !important; color: #171717 !important; margin-top: 1.5rem !important; margin-bottom: 0.75rem !important;">Türkiye'nin iş piyasasındaki güncel durum</h2>

<p style="font-size: 0.9375rem !important; margin-bottom: 1rem !important; color: #525252 !important; line-height: 1.65 !important;">Türkiye'de iş piyasası son yıllarda önemli değişimler geçiriyor. Teknoloji sektöründeki büyüme, uzaktan çalışma ve yeni nesil beklentiler işveren ve aday davranışlarını etkiliyor. Yazılım, dijital pazarlama ve veri analizi alanlarında talep artarken geleneksel sektörlerde dijital dönüşüm hızlanıyor.</p>

<h2 style="font-size: 30px !important; font-weight: 600 !important; color: #171717 !important; margin-top: 1.5rem !important; margin-bottom: 0.75rem !important;">Kariyer planlamasında dikkat edilmesi gerekenler</h2>

<p style="font-size: 0.9375rem !important; margin-bottom: 1rem !important; color: #525252 !important; line-height: 1.65 !important;">Teknik becerilerin yanında iletişim, problem çözme, takım çalışması ve öğrenmeye açıklık öne çıkıyor. Çok dilli olmak ve uluslararası deneyim avantaj sağlıyor.</p>

<h2 style="font-size: 30px !important; font-weight: 600 !important; color: #171717 !important; margin-top: 1.5rem !important; margin-bottom: 0.75rem !important;">İş arama sürecinde başarı faktörleri</h2>

<p style="font-size: 0.9375rem !important; margin-bottom: 1rem !important; color: #525252 !important; line-height: 1.65 !important;">Güçlü CV, güncel LinkedIn ve profesyonel ağ. Mülakat öncesi şirket araştırması ve net beklenti. Sektör trendlerini takip etmek uzun vadede fark yaratır.</p>

<h2 style="font-size: 30px !important; font-weight: 600 !important; color: #171717 !important; margin-top: 1.5rem !important; margin-bottom: 0.75rem !important;">İşverenlerin aradığı nitelikler</h2>

<p style="font-size: 0.9375rem !important; margin-bottom: 1rem !important; color: #525252 !important; line-height: 1.65 !important;">Uyum sağlayabilen, hızlı öğrenen ve inisiyatif alan profiller öne çıkıyor. Öz disiplin, zaman yönetimi ve dijital iletişim becerileri de değer görüyor.</p>`

  const getDisplayContent = () => {
    if (isExpanded) {
      return careerContent
    }
    return careerContent.length > 700 ? careerContent.substring(0, 700) + '…' : careerContent
  }

  const shouldShowExpandButton = () => {
    return careerContent.length > 700 && !isExpanded
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-neutral-50 text-neutral-900 antialiased">
        <Header />
        <PageHeroMedia title="İş ilanları" currentPage="İş ilanları" />
        <div className="flex min-h-[50vh] items-center justify-center px-4">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <p className="mt-4 text-sm text-neutral-600">İş ilanları yükleniyor…</p>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white text-neutral-900 antialiased">
      <Header />

      <PageHeroMedia title="İş ilanları" currentPage="İş ilanları" />

      <section className="sticky top-12 z-40 mt-3 bg-white sm:top-14 sm:mt-4 md:top-16 md:mt-5">
        <div className="mx-auto max-w-7xl bg-white px-3 py-3 sm:px-6 sm:py-4 lg:px-8">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-800">İlan ara</p>
            {hasActiveFilters ? (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 transition-colors hover:border-primary/40 hover:text-primary"
              >
                <X size={14} aria-hidden />
                Filtreleri temizle
              </button>
            ) : null}
          </div>
          <form
            className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3 lg:grid-cols-12 lg:items-end"
            onSubmit={(e) => {
              e.preventDefault()
              commitFilters()
            }}
            role="search"
            aria-label="İş ilanları filtre formu"
          >
            <div className="relative sm:col-span-2 lg:col-span-5">
              <Search
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                aria-hidden
              />
              <input
                type="search"
                name="q"
                placeholder="Başlık, şirket, açıklama veya anahtar kelime…"
                value={localQ}
                onChange={(e) => setLocalQ(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm leading-tight text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-primary/50 focus:ring-2 focus:ring-primary/15"
                autoComplete="off"
              />
            </div>
            <div className="grid grid-cols-1 gap-2 sm:col-span-2 sm:grid-cols-2 lg:col-span-4">
              <div className="relative min-w-0">
                <MapPin
                  size={16}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  aria-hidden
                />
                <input
                  type="text"
                  name="lokasyon"
                  placeholder="Lokasyon"
                  value={localLokasyon}
                  onChange={(e) => setLocalLokasyon(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm leading-tight text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-primary/50 focus:ring-2 focus:ring-primary/15"
                  autoComplete="off"
                />
              </div>
              <div className="relative min-w-0">
                <Filter
                  size={16}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  aria-hidden
                />
                <select
                  name="tip"
                  value={localTip}
                  onChange={(e) => setLocalTip(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm leading-tight text-slate-900 outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/15"
                >
                  <option value="">Tüm çalışma şekilleri</option>
                  <option value="Tam Zamanlı">Tam zamanlı</option>
                  <option value="Yarı Zamanlı">Yarı zamanlı</option>
                  <option value="Uzaktan">Uzaktan</option>
                  <option value="Staj">Staj</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:col-span-2 sm:flex-row sm:items-stretch lg:col-span-3">
              <button
                type="submit"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <Search size={18} aria-hidden />
                Ara
              </button>
              <div className="flex flex-1 items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700">
                <span className="font-semibold tabular-nums text-slate-900">{filteredJobs.length}</span>
                <span className="ml-1">ilan</span>
              </div>
            </div>
          </form>
          <p className="mt-3 text-xs leading-relaxed text-slate-600 sm:text-sm">
            Birden fazla kelime yazdığınızda tüm kelimeler açıklama ve gereksinimler dahil metinde aranır. Filtreleri
            uygulamak için <span className="font-semibold text-slate-800">Ara</span>ya basın veya Enter kullanın.
          </p>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {filteredJobs.length === 0 ? (
            <div className="rounded-2xl border border-neutral-200/80 bg-white py-16 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 text-neutral-400">
                <Search size={28} aria-hidden />
              </div>
              <h3 className="mt-6 text-[20px] font-semibold leading-snug text-neutral-900">İlan bulunamadı</h3>
              <p className="mt-2 text-sm text-neutral-600">Filtreleri veya arama terimini değiştirmeyi deneyin.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                {getPaginatedJobs().map((job) => (
                  <article
                    key={job.id}
                    className="flex h-full min-h-[280px] flex-col rounded-xl border border-neutral-200/80 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all hover:border-primary/30 hover:shadow-md"
                  >
                    <div className="flex min-w-0 items-start justify-between gap-2 border-b border-neutral-100 pb-3">
                      <h3 className="min-w-0 flex-1 text-[20px] font-semibold leading-snug tracking-tight text-neutral-900 line-clamp-2">
                        {job.title}
                      </h3>
                      <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
                        {job.type}
                      </span>
                    </div>

                    <div className="mt-3 flex flex-col gap-2 text-[12px] leading-snug text-neutral-600">
                      <span className="inline-flex min-w-0 items-start gap-1.5">
                        <Building2 size={14} className="mt-0.5 shrink-0 text-primary" aria-hidden />
                        <span className="line-clamp-2">{job.company}</span>
                      </span>
                      <span className="inline-flex min-w-0 items-start gap-1.5">
                        <MapPin size={14} className="mt-0.5 shrink-0 text-primary" aria-hidden />
                        <span className="line-clamp-2">{job.location}</span>
                      </span>
                    </div>

                    {job.salary ? (
                      <div className="mt-3 inline-flex max-w-full items-center gap-1.5 rounded-lg bg-neutral-50 px-2.5 py-1.5 text-[13px] font-semibold text-neutral-900 ring-1 ring-neutral-200/80">
                        <span
                          className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded bg-primary/10 text-[10px] font-bold leading-none text-primary"
                          aria-hidden
                        >
                          ₺
                        </span>
                        <span className="truncate">{job.salary}</span>
                      </div>
                    ) : null}

                    <p className="mt-3 flex-1 text-[13px] leading-relaxed text-neutral-600 line-clamp-4">
                      {truncateDescription(job.description)}
                    </p>

                    <div className="mt-4 flex flex-col gap-2 border-t border-neutral-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
                      <span className="inline-flex items-center gap-1 text-[11px] text-neutral-500">
                        <Clock size={12} aria-hidden />
                        {utils.formatDate(job.created_at || '')}
                      </span>
                      <button
                        type="button"
                        onClick={() => router.push(`/is-ilanlari/${job.id}`)}
                        className="w-full rounded-lg bg-primary py-2 text-center text-xs font-semibold text-white transition-colors hover:bg-primary/90 sm:w-auto sm:min-w-[7.5rem] sm:px-4 sm:py-2 sm:text-[13px]"
                      >
                        Detay
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              {totalPages > 1 ? (
                <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
                  {activePage > 1 ? (
                    <button
                      type="button"
                      onClick={() => handlePageChange(activePage - 1)}
                      className="rounded-full px-4 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-white hover:text-primary"
                    >
                      ← Önceki
                    </button>
                  ) : null}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => handlePageChange(page)}
                      className={`min-w-[2.5rem] rounded-full px-3 py-2 text-sm font-semibold transition-colors ${
                        page === activePage ? 'bg-primary text-white' : 'text-neutral-600 hover:bg-white'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  {activePage < totalPages ? (
                    <button
                      type="button"
                      onClick={() => handlePageChange(activePage + 1)}
                      className="rounded-full px-4 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-white hover:text-primary"
                    >
                      Sonraki →
                    </button>
                  ) : null}
                </div>
              ) : null}
            </>
          )}

          {activePage === 1 ? (
            <div className="mt-14 rounded-2xl border border-neutral-200/80 bg-white p-6 sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Rehber</p>
              <h2 className="mt-2 text-[30px] font-semibold leading-snug text-neutral-900">Kariyer ve iş piyasası</h2>
              <div
                className="prose prose-neutral mt-6 max-w-none text-neutral-600 prose-headings:text-neutral-900 prose-p:text-[0.9375rem] prose-p:leading-relaxed"
                dangerouslySetInnerHTML={{ __html: getDisplayContent() }}
              />
              {shouldShowExpandButton() ? (
                <button
                  type="button"
                  onClick={() => setIsExpanded(true)}
                  className="mt-4 text-sm font-semibold text-primary hover:text-primary/80"
                >
                  Devamını gör
                </button>
              ) : null}
              {isExpanded ? (
                <button
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  className="mt-4 text-sm font-semibold text-primary hover:text-primary/80"
                >
                  Daha az göster
                </button>
              ) : null}
            </div>
          ) : null}
        </div>
      </section>

      <Footer />
    </main>
  )
}
