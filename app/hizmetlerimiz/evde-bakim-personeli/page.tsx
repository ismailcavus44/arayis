import type { Metadata } from 'next'
import { Suspense } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHeroMedia from '@/components/PageHeroMedia'
import EvdeBakimHeroMedia from '@/components/EvdeBakimHeroMedia'
import EvdeBakimPersoneliBody from '@/components/EvdeBakimPersoneliBody'
import { HIZMETLER_HUB_PATH, SITE_BRAND, sitePageTitle } from '@/lib/hizmetlerimiz-silo'

export const metadata: Metadata = {
  title: sitePageTitle('Evde Bakım Personeli Aracılığı'),
  description: `${SITE_BRAND} ile evde bakım personeli aracılığında güvenilir aday eşleştirmesi, referans kontrolü ve şeffaf süreç. Yaşlı, hasta, çocuk bakıcısı ve ev yardımcısı için il bazlı sayfalar.`,
}

export default function EvdeBakimPersoneliPage() {
  return (
    <>
      <Header />
      <Suspense
        fallback={
          <PageHeroMedia
            title="Evde Bakım Personeli Aracılığı"
            currentPage="Evde Bakım Personeli"
            breadcrumbTrail={[{ name: 'Hizmetlerimiz', href: HIZMETLER_HUB_PATH }]}
          />
        }
      >
        <EvdeBakimHeroMedia />
      </Suspense>
      <Suspense
        fallback={
          <div className="min-h-[24rem] border-t border-gray-200 bg-gradient-to-b from-gray-50 to-white py-16" aria-hidden />
        }
      >
        <EvdeBakimPersoneliBody />
      </Suspense>
      <Footer />
    </>
  )
}
