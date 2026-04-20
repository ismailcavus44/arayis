import type { ReactNode } from 'react'
import Link from 'next/link'
import { Calendar, ChevronRight, Home, User } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ServicePageToc from '@/components/ServicePageToc'
import ServicePageTwoColumn from '@/components/ServicePageTwoColumn'
import IskurTrustBadge from '@/components/IskurTrustBadge'
import ServiceContactCard from '@/components/ServiceContactCard'
import type { ServiceTocItem } from '@/components/ServicePageToc'
import { HIZMETLER_HUB_PATH } from '@/lib/hizmetlerimiz-silo'

export type StaticIkHizmetPageShellProps = {
  /** Üst şeritteki büyük başlık (şehir detay sayfasındaki gibi) */
  pageTitle: string
  /** Breadcrumb son segmenti */
  breadcrumbCurrentLabel: string
  heroImageSrc?: string
  heroImageAlt?: string
  /** İçindekiler; verilmezse tek “Hizmet hakkında” */
  tocItems?: ServiceTocItem[]
  /** Ana sütun içeriği; verilmezse kısa yer tutucu */
  children?: ReactNode
}

const DEFAULT_HERO = '/images/aray-is-ik-sablon.png'

/**
 * Evde bakım şehir detay (`hizmetlerimiz/[slug]`) ile aynı üst düzen: breadcrumb + başlık + görsel + TOC + iki sütun.
 * Statik İK hizmet sayfaları için; veri tabanı yok.
 */
export default function StaticIkHizmetPageShell({
  pageTitle,
  breadcrumbCurrentLabel,
  heroImageSrc = DEFAULT_HERO,
  heroImageAlt = '',
  tocItems,
  children,
}: StaticIkHizmetPageShellProps) {
  const heroAlt = heroImageAlt || pageTitle
  const tocResolved: ServiceTocItem[] = tocItems ?? [{ id: 'hizmet-hakkinda', label: 'Hizmet hakkında', level: 2 }]

  return (
    <>
      <Header />
      <ServicePageTwoColumn
        afterToc={<IskurTrustBadge />}
        toc={
          <>
            <section className="bg-white">
              <nav aria-label="Sayfa konumu" className="text-sm">
                <div className="flex flex-wrap items-center gap-1 text-gray-600">
                  <Link href="/" className="inline-flex items-center gap-1 transition-colors hover:text-primary">
                    <Home size={15} aria-hidden />
                    <span>Anasayfa</span>
                  </Link>
                  <ChevronRight size={14} className="text-gray-400" aria-hidden />
                  <Link href={HIZMETLER_HUB_PATH} className="transition-colors hover:text-primary">
                    Hizmetlerimiz
                  </Link>
                  <ChevronRight size={14} className="text-gray-400" aria-hidden />
                  <span className="font-medium text-gray-500">{breadcrumbCurrentLabel}</span>
                </div>
              </nav>
              <hr className="mt-4 mb-2 border-gray-200" />
              <h1 className="text-[30px] font-bold leading-snug tracking-tight text-gray-900">{pageTitle}</h1>
              <div className="mt-3 mb-6 flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span className="inline-flex items-center gap-1.5">
                  <User size={14} aria-hidden />
                  <span>Aray İş</span>
                </span>
                <span aria-hidden>|</span>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar size={14} aria-hidden />
                  <span>16 Nisan 2026</span>
                </span>
              </div>
              <div className="mb-8 overflow-hidden rounded-2xl border border-gray-200">
                <img src={heroImageSrc} alt={heroAlt} className="max-h-[500px] w-full object-cover" />
              </div>
            </section>
            <ServicePageToc items={tocResolved} defaultCollapsed />
          </>
        }
        sidebar={
          <div className="lg:mt-[56px]">
            <ServiceContactCard />
          </div>
        }
      >
        <section id="hizmet-hakkinda" className="scroll-mt-28 bg-white pt-4 pb-14">
          {children ?? (
            <div className="mx-auto max-w-3xl">
              <div className="evde-bakim-hizmet-hakkinda text-gray-600 leading-relaxed">
                <h2 className="!mt-0 !mb-0 !text-xl !font-semibold text-gray-900 sm:!text-2xl">Hizmet hakkında</h2>
                <p className="!m-0 mt-3">İçerik yakında eklenecek.</p>
              </div>
            </div>
          )}
        </section>
      </ServicePageTwoColumn>
      <Footer />
    </>
  )
}
