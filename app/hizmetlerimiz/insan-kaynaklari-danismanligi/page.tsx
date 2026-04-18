import type { Metadata } from 'next'
import StaticIkHizmetPageShell from '@/components/StaticIkHizmetPageShell'
import { SITE_BRAND, sitePageTitle } from '@/lib/hizmetlerimiz-silo'

export const metadata: Metadata = {
  title: sitePageTitle('İnsan Kaynakları Danışmanlığı'),
  description: `${SITE_BRAND} ile İK süreç tasarımı, performans sistemleri, ücret politikası ve mevzuat uyumu konularında stratejik danışmanlık.`,
}

export default function InsanKaynaklariDanismanligiPage() {
  return (
    <StaticIkHizmetPageShell
      pageTitle="İnsan Kaynakları Danışmanlığı"
      breadcrumbCurrentLabel="İnsan Kaynakları Danışmanlığı"
    />
  )
}
