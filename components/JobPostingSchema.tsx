import { SITE_BRAND } from '@/lib/hizmetlerimiz-silo'
import { sanitizeJobPostingCopy } from '@/lib/schema-sanitize'
import { getSiteOrigin } from '@/lib/site-origin'

const HIRING_ORG_NAME = `${SITE_BRAND} İnsan Kaynakları`
/** Sabit kurum rolü — yasaklı kelimeler kullanılmaz. */
const HIRING_ORG_DESCRIPTION = 'İnsan Kaynakları Danışmanlığı ve Personel Aracılığı.'

export type JobPostingEmploymentType =
  | 'FULL_TIME'
  | 'PART_TIME'
  | 'CONTRACTOR'
  | 'TEMPORARY'
  | 'INTERN'
  | 'VOLUNTEER'
  | 'PER_DIEM'
  | 'OTHER'

export type JobPostingBaseSalary = {
  currency?: string
  minValue?: number
  maxValue?: number
  unitText?: 'YEAR' | 'MONTH' | 'WEEK' | 'DAY' | 'HOUR'
}

export interface JobPostingSchemaProps {
  jobTitle: string
  jobDescription: string
  /** ISO 8601 (örn. created_at) */
  datePosted: string
  /** ISO 8601 — ilanın geçerlilik bitişi */
  validThrough: string
  employmentType: JobPostingEmploymentType
  jobLocationCity: string
  /** Tam iş ilanı URL’si (Google JobPosting için zorunlu) */
  jobPageUrl: string
  baseSalary?: JobPostingBaseSalary
  /** Başvuru bu sayfadan mı (isteğe bağlı) */
  directApply?: boolean
}

function stripHtml(text: string): string {
  return text.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}

function buildBaseSalaryNode(s: JobPostingBaseSalary): Record<string, unknown> | null {
  const currency = (s.currency || 'TRY').toUpperCase()
  const hasMin = typeof s.minValue === 'number' && !Number.isNaN(s.minValue)
  const hasMax = typeof s.maxValue === 'number' && !Number.isNaN(s.maxValue)
  if (!hasMin && !hasMax) return null
  const value: Record<string, unknown> = { '@type': 'QuantitativeValue' }
  if (hasMin) value.minValue = s.minValue
  if (hasMax) value.maxValue = s.maxValue
  if (s.unitText) value.unitText = s.unitText
  return {
    '@type': 'MonetaryAmount',
    currency,
    value,
  }
}

/** Paneldeki Türkçe çalışma şekli → schema.org employmentType */
export function mapTurkishJobTypeToEmploymentType(type: string): JobPostingEmploymentType {
  const t = type.trim().toLowerCase()
  if (t.includes('tam') && t.includes('zaman')) return 'FULL_TIME'
  if (t.includes('yarı') || t.includes('yari')) return 'PART_TIME'
  if (t.includes('staj')) return 'INTERN'
  if (t.includes('sözleşmeli') || t.includes('sozlesmeli')) return 'CONTRACTOR'
  if (t.includes('geçici') || t.includes('gecici')) return 'TEMPORARY'
  if (t.includes('gönüllü') || t.includes('gonullu')) return 'VOLUNTEER'
  return 'OTHER'
}

/**
 * Google for Jobs uyumlu JobPosting JSON-LD.
 * [Kullandığın Teknoloji: React/Next.js/HTML]
 */
export default function JobPostingSchema({
  jobTitle,
  jobDescription,
  datePosted,
  validThrough,
  employmentType,
  jobLocationCity,
  jobPageUrl,
  baseSalary,
  directApply = true,
}: JobPostingSchemaProps) {
  const origin = getSiteOrigin()
  const plainDescription = sanitizeJobPostingCopy(stripHtml(jobDescription)).slice(0, 100000)

  const hiringOrganization: Record<string, unknown> = {
    '@type': 'Organization',
    name: HIRING_ORG_NAME,
    description: HIRING_ORG_DESCRIPTION,
    url: `${origin}/`,
  }

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: jobTitle,
    description: plainDescription,
    datePosted,
    validThrough,
    employmentType,
    hiringOrganization,
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: jobLocationCity.trim(),
        addressCountry: 'TR',
      },
    },
    url: jobPageUrl,
    directApply,
  }

  if (baseSalary) {
    const node = buildBaseSalaryNode(baseSalary)
    if (node) schema.baseSalary = node
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}
