import { SITE_BRAND } from '@/lib/hizmetlerimiz-silo'
import { getSiteOrigin } from '@/lib/site-origin'

const ORG_NAME = `${SITE_BRAND} İnsan Kaynakları`
const DESCRIPTION =
  'Kurumsal aracılık, İK danışmanlığı ve profesyonel personel eşleştirme süreçleriyle işverenler ve adaylar arasında güvenilir köprü kuruyoruz.'

const TELEPHONE = '+905052772628'
const PRICE_RANGE = '₺₺'

const ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: 'Balıkçıoğlu iş merkezi, Korkutreis, Necatibey Cd. D:4',
  addressLocality: 'Çankaya',
  addressRegion: 'Ankara',
  postalCode: '06530',
  addressCountry: 'TR',
} as const

/**
 * [Kullandığın Teknoloji: React/Next.js/HTML]
 * Ana sayfa için EmploymentAgency JSON-LD (tek script, SEO uyumlu).
 */
export default function HomePageSchema() {
  const origin = getSiteOrigin()
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'EmploymentAgency',
    name: ORG_NAME,
    description: DESCRIPTION,
    url: `${origin}/`,
    logo: `${origin}/images/aray-is-logo-header.png`,
    telephone: TELEPHONE,
    priceRange: PRICE_RANGE,
    address: ADDRESS,
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}
