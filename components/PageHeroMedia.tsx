import Breadcrumb, { type BreadcrumbTrailItem } from '@/components/Breadcrumb'

export interface PageHeroMediaProps {
  /** Üst küçük etiket; verilmezse gösterilmez */
  eyebrow?: string
  title: string
  /** Boş bırakılırsa hero altında açıklama satırı gösterilmez */
  description?: string
  /** Breadcrumb son öğe metni */
  currentPage: string
  breadcrumbTrail?: BreadcrumbTrailItem[]
}

/**
 * Sayfa üst şeridi: fotoğraf yok; kurumsal lacivert + açık mavi (primary) geçişli arka plan.
 */
export default function PageHeroMedia({
  eyebrow,
  title,
  description,
  currentPage,
  breadcrumbTrail,
}: PageHeroMediaProps) {
  return (
    <section className="relative overflow-hidden text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-secondary via-[#1a2d7a] to-[#0c1428]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary/35 via-primary/10 to-transparent sm:from-primary/30 sm:via-primary/15"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/15"
        aria-hidden
      />
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <Breadcrumb currentPage={currentPage} items={breadcrumbTrail} tone="dark" />
        <div className="max-w-2xl">
          {eyebrow?.trim() ? (
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-primary sm:text-[11px] sm:tracking-[0.18em]">
              {eyebrow.trim()}
            </p>
          ) : null}
          <h1
            className={`text-2xl font-semibold leading-[1.15] tracking-tight sm:text-3xl sm:leading-tight md:text-4xl lg:text-[2.25rem] ${
              eyebrow?.trim() ? 'mt-2' : 'mt-0'
            }`}
          >
            {title}
          </h1>
          {description ? (
            <p className="mt-2 text-sm leading-snug text-white/90 sm:mt-3 sm:text-base sm:leading-relaxed lg:text-lg">
              {description}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  )
}
