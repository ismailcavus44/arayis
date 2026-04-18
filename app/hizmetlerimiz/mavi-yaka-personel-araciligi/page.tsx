import type { Metadata } from 'next'
import StaticIkHizmetPageShell from '@/components/StaticIkHizmetPageShell'
import { SITE_BRAND, sitePageTitle } from '@/lib/hizmetlerimiz-silo'

export const metadata: Metadata = {
  title: sitePageTitle('Mavi Yaka Personel Aracılığı'),
  description: `${SITE_BRAND} ile üretim, lojistik ve saha rollerinde hızlı personel aracılığı, belge kontrolü ve toplu işe alım desteği.`,
}

export default function MaviYakaPersonelAraciligiPage() {
  return (
    <StaticIkHizmetPageShell
      pageTitle="Mavi Yaka Personel Aracılığı"
      breadcrumbCurrentLabel="Mavi Yaka Personel Aracılığı"
    />
  )
}
