import { SITE_BRAND } from '@/lib/hizmetlerimiz-silo'
import { sanitizeServiceSchemaText } from '@/lib/schema-sanitize'
import { getSiteOrigin } from '@/lib/site-origin'

export interface ServicePageSchemaProps {
  ilName: string
  serviceType: string
  pageUrl: string
  serviceDescription: string
  /** "İl Hizmetleri" kırılımı için; verilmezse evde bakım il hub kökü kullanılır. */
  intermediatePageUrl?: string
}

const ORG_NAME = `${SITE_BRAND} İnsan Kaynakları`

/**
 * [Kullandığın Teknoloji: React/Next.js/HTML]
 * İl/hizmet sayfaları: Service + BreadcrumbList tek @graph JSON-LD.
 */
export default function ServicePageSchema({
  ilName,
  serviceType,
  pageUrl,
  serviceDescription,
  intermediatePageUrl,
}: ServicePageSchemaProps) {
  const origin = getSiteOrigin()
  const hubUrl = intermediatePageUrl ?? `${origin}/hizmetlerimiz/evde-bakim-personeli`
  const safeDescription = sanitizeServiceSchemaText(serviceDescription.trim())
  const serviceName = `${ilName} ${serviceType} Danışmanlığı`

  const serviceId = `${pageUrl}#service`
  const breadcrumbId = `${pageUrl}#breadcrumb`

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': serviceId,
        name: serviceName,
        description: safeDescription,
        url: pageUrl,
        provider: {
          '@type': 'Organization',
          name: ORG_NAME,
          url: origin,
        },
        areaServed: {
          '@type': 'AdministrativeArea',
          name: ilName,
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': breadcrumbId,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Ana Sayfa',
            item: `${origin}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: `${ilName} Hizmetleri`,
            item: hubUrl,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: `${ilName} ${serviceType}`,
            item: pageUrl,
          },
        ],
      },
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />
}
