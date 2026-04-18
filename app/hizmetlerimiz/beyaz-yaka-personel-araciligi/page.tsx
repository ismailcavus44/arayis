import type { Metadata } from 'next'
import StaticIkHizmetPageShell from '@/components/StaticIkHizmetPageShell'
import { SITE_BRAND, sitePageTitle } from '@/lib/hizmetlerimiz-silo'

export const metadata: Metadata = {
  title: sitePageTitle('Beyaz Yaka Personel Aracılığı'),
  description: `${SITE_BRAND} ile uzman ve yönetici kadrolarında pozisyona özel yetenek taraması, mülakat ve referans doğrulama.`,
}

export default function BeyazYakaPersonelAraciligiPage() {
  return (
    <StaticIkHizmetPageShell
      pageTitle="Beyaz Yaka Personel Aracılığı"
      breadcrumbCurrentLabel="Beyaz Yaka Personel Aracılığı"
    />
  )
}
