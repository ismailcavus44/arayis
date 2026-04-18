import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Calendar, ChevronRight, Home, User } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ContactSection from '@/components/ContactSection'
import FaqSchema from '@/components/FaqSchema'
import FaqSection from '@/components/FaqSection'
import { extractFaqSectionFromArticle } from '@/lib/evde-bakim-faq-block'
import { buildFaqTocAppend } from '@/lib/faq-section-toc'
import { trimTrailingEmptyRichTextBlocks } from '@/lib/trim-trailing-empty-html-blocks'
import EvdeBakimSameCityServices from '@/components/EvdeBakimSameCityServices'
import ServicePageToc from '@/components/ServicePageToc'
import ServicePageTwoColumn from '@/components/ServicePageTwoColumn'
import IskurTrustBadge from '@/components/IskurTrustBadge'
import ServiceContactCard from '@/components/ServiceContactCard'
import ServicePageSchema from '@/components/ServicePageSchema'
import { EVDE_BAKIM_BASE, HIZMETLER_HUB_PATH, SITE_BRAND } from '@/lib/hizmetlerimiz-silo'
import { getEvdeBakimCitiesCached } from '@/lib/evde-bakim-cities'
import { getCityServicePageContentCached } from '@/lib/evde-bakim-page-content'
import {
  bodyParagraphs,
  breadcrumbCurrentLabel,
  metaDescription,
  metaTitle,
  pageH1,
  parseEvdeBakimFlatSlug,
  SERVICE_COPY,
  type EvdeBakimCity,
  type EvdeBakimServiceKey,
} from '@/lib/evde-bakim-flat-silo'
import { getSiteOrigin } from '@/lib/site-origin'

type Props = { params: { slug: string } }
type TocItem = { id: string; label: string; level: 2 | 3 }
type ContactSectionData = {
  title: string
  description: string
  phone: string
  email: string
  address: string
  mapIframeUrl: string
}

const CONTACT_ADDRESS = 'Balıkçıoğlu iş merkezi, Korkutreis, Necatibey Cd. D:4, 06530 Çankaya/Ankara'

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/&[^;\s]+;/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

function stripHtml(text: string): string {
  return text.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
}

function extractListField(blockHtml: string, labelPattern: string): string {
  const regex = new RegExp(
    `<li[^>]*>[\\s\\S]*?<strong>\\s*(?:${labelPattern})\\s*:\\s*<\\/strong>([\\s\\S]*?)<\\/li>`,
    'i'
  )
  const match = blockHtml.match(regex)
  if (!match?.[1]) return ''
  return decodeHtmlEntities(stripHtml(match[1])).replace(/\s+/g, ' ').trim()
}

function findStructuredContactBlock(html: string): { start: number; end: number; blockHtml: string } | null {
  const taggedRegex = /<ul[^>]*data-contact-section=["']?true["']?[^>]*>[\s\S]*?<\/ul>/i
  const tagged = taggedRegex.exec(html)
  if (tagged) {
    return {
      start: tagged.index,
      end: tagged.index + tagged[0].length,
      blockHtml: tagged[0],
    }
  }

  const listRegex = /<ul[^>]*>[\s\S]*?<\/ul>/gi
  let match: RegExpExecArray | null
  while ((match = listRegex.exec(html)) !== null) {
    const blockHtml = match[0]
    const looksLikeContactTemplate =
      /<strong>\s*(?:Baslik|Başlık)\s*:/i.test(blockHtml) &&
      /<strong>\s*(?:Aciklama|Açıklama)\s*:/i.test(blockHtml) &&
      /<strong>\s*Telefon\s*:/i.test(blockHtml) &&
      /<strong>\s*E-?posta\s*:/i.test(blockHtml)
    if (!looksLikeContactTemplate) continue
    return {
      start: match.index,
      end: match.index + blockHtml.length,
      blockHtml,
    }
  }

  return null
}

function extractContactSectionFromArticle(
  html: string,
  fallback: ContactSectionData
): { cleanHtml: string; contact: ContactSectionData | null } {
  const structured = findStructuredContactBlock(html)
  if (!structured) return { cleanHtml: html, contact: null }

  const blockHtml = structured.blockHtml
  const cleanHtml = `${html.slice(0, structured.start)}${html.slice(structured.end)}`.trim()
  const decodedBlock = decodeHtmlEntities(blockHtml)

  const title = extractListField(blockHtml, 'Baslik|Başlık') || fallback.title
  const description = extractListField(blockHtml, 'Aciklama|Açıklama') || fallback.description
  const phone = extractListField(blockHtml, 'Telefon') || fallback.phone
  const email = extractListField(blockHtml, 'E-?posta') || fallback.email
  const address = CONTACT_ADDRESS
  const mapSrcMatch = decodedBlock.match(/src=["'](https:\/\/www\.google\.com\/maps\/embed\?[^"']+)["']/i)
  const mapUrlTextMatch = decodedBlock.match(/https:\/\/www\.google\.com\/maps\/embed\?[^\s<"]+/i)
  const mapIframeUrl =
    extractListField(blockHtml, 'Harita(?: iframe)? URL') || mapSrcMatch?.[1] || mapUrlTextMatch?.[0] || fallback.mapIframeUrl

  return {
    cleanHtml,
    contact: {
      title: title.trim(),
      description: description.trim(),
      phone: phone.trim(),
      email: email.trim(),
      address,
      mapIframeUrl: mapIframeUrl.trim(),
    },
  }
}

function injectHeadingIdsAndCollectToc(html: string): { html: string; tocItems: TocItem[] } {
  const tocItems: TocItem[] = []
  const slugCounts = new Map<string, number>()
  let h2Index = 0
  let h3Index = 0

  const withIds = html.replace(/<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi, (_, levelRaw, attrsRaw, innerHtml) => {
    const level = Number(levelRaw) as 2 | 3
    const rawLabel = stripHtml(innerHtml)
    if (!rawLabel) return `<h${level}${attrsRaw}>${innerHtml}</h${level}>`

    let numbering = ''
    if (level === 2) {
      h2Index += 1
      h3Index = 0
      numbering = `${h2Index}`
    } else {
      if (h2Index === 0) h2Index = 1
      h3Index += 1
      numbering = `${h2Index}.${h3Index}`
    }

    const label = `${numbering} ${rawLabel}`

    const existingId = attrsRaw.match(/\sid=(['"])(.*?)\1/i)?.[2]
    let id = existingId || slugifyHeading(rawLabel) || `bolum-${tocItems.length + 1}`

    const count = slugCounts.get(id) ?? 0
    slugCounts.set(id, count + 1)
    if (!existingId && count > 0) id = `${id}-${count + 1}`

    tocItems.push({ id, label, level })

    if (existingId) return `<h${level}${attrsRaw}>${innerHtml}</h${level}>`
    return `<h${level}${attrsRaw} id="${id}">${innerHtml}</h${level}>`
  })

  return { html: withIds, tocItems }
}

async function resolveArticleOrTemplate(
  city: EvdeBakimCity,
  service: EvdeBakimServiceKey
): Promise<{
  articleHtml: string | null
  p1: string
  p2: string
  featuredImageUrl: string | null
  featuredImageAlt: string | null
  metaTitleOverride: string | null
  metaDescriptionOverride: string | null
}> {
  const pageContent = await getCityServicePageContentCached(city.key, service)
  const articleHtml = pageContent?.article_html?.trim() || null
  const [p1, p2] = bodyParagraphs(city, service)
  return {
    articleHtml,
    p1,
    p2,
    featuredImageUrl: pageContent?.featured_image_url?.trim() || null,
    featuredImageAlt: pageContent?.featured_image_alt?.trim() || null,
    metaTitleOverride: pageContent?.meta_title?.trim() || null,
    metaDescriptionOverride: pageContent?.meta_description?.trim() || null,
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cities = await getEvdeBakimCitiesCached()
  const parsed = parseEvdeBakimFlatSlug(params.slug, cities)
  if (!parsed) return { title: SITE_BRAND }
  const pageContent = await getCityServicePageContentCached(parsed.city.key, parsed.service)
  const overrideTitle = pageContent?.meta_title?.trim()
  const overrideDescription = pageContent?.meta_description?.trim()
  return {
    title: overrideTitle || metaTitle(parsed.city, parsed.service),
    description: overrideDescription || metaDescription(parsed.city, parsed.service),
  }
}

export default async function EvdeBakimFlatPage({ params }: Props) {
  const cities = await getEvdeBakimCitiesCached()
  const parsed = parseEvdeBakimFlatSlug(params.slug, cities)
  if (!parsed) notFound()

  const { city, service, slug } = parsed
  const origin = getSiteOrigin()
  const pageUrl = `${origin}/hizmetlerimiz/${slug}`
  const { articleHtml, p1, p2, featuredImageUrl, featuredImageAlt, metaDescriptionOverride } =
    await resolveArticleOrTemplate(city, service)
  const pageTitle = pageH1(city, service)
  const pageLabel = breadcrumbCurrentLabel(city, service)
  const heroImageSrc = featuredImageUrl || '/images/aray-is-ik-isci-personel-temini.webp'
  const heroImageAlt = featuredImageAlt || pageTitle
  const serviceSchemaDescription = metaDescriptionOverride || metaDescription(city, service)
  const intermediateHubUrl = `${origin}${EVDE_BAKIM_BASE}?city=${encodeURIComponent(city.key)}`
  const fallbackContactSection: ContactSectionData = {
    title: `${pageH1(city, service)} İletişim`,
    description: `${pageH1(city, service)} hizmeti için bizimle hızlıca iletişime geçebilirsiniz.`,
    phone: '+90 505 277 2628',
    email: 'info@arayisik.com',
    address: CONTACT_ADDRESS,
    mapIframeUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d764.9128181536993!2d32.8539474696579!3d39.926819626666315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d34f4fdfafb767%3A0xcd7928db72f471e5!2zQVJBWS3EsMWeIMSwbnNhbiBLYXluYWtsYXLEsQ!5e0!3m2!1str!2str!4v1755079069600!5m2!1str!2str',
  }
  const extractedContact = articleHtml
    ? extractContactSectionFromArticle(articleHtml, fallbackContactSection)
    : null
  const afterContactHtml = extractedContact?.cleanHtml || articleHtml
  const extractedFaq = afterContactHtml ? extractFaqSectionFromArticle(afterContactHtml) : null
  const articleBodyRaw = extractedFaq?.cleanHtml || afterContactHtml
  const articleBodyHtml = articleBodyRaw ? trimTrailingEmptyRichTextBlocks(articleBodyRaw.trim()) : null
  const faqItems = extractedFaq?.faqItems || []
  const articleContent = articleBodyHtml ? injectHeadingIdsAndCollectToc(articleBodyHtml) : null
  const contactSectionData = extractedContact?.contact ?? null
  const articleSectionClassName = contactSectionData
    ? 'scroll-mt-28 bg-white pt-4 pb-0'
    : faqItems.length > 0
      ? 'scroll-mt-28 bg-white pt-4 pb-0'
      : 'scroll-mt-28 bg-white pt-4 pb-14'
  const articleTocForFaq = articleContent?.tocItems ?? []
  const reservedDomIds = ['hizmet-hakkinda', ...articleTocForFaq.map((t) => t.id)].filter(
    (id, i, arr) => arr.indexOf(id) === i
  )
  const faqTocMeta =
    faqItems.length > 0
      ? buildFaqTocAppend(articleTocForFaq, 'Sık Sorulan Sorular', faqItems, reservedDomIds)
      : null
  const tocItems = [
    ...(articleContent?.tocItems.length
      ? articleContent.tocItems
      : [{ id: 'hizmet-hakkinda', label: 'Hizmet hakkında', level: 2 as const }]),
    ...(faqTocMeta?.entries ?? []),
  ]

  return (
    <>
      <ServicePageSchema
        ilName={city.ad}
        serviceType={SERVICE_COPY[service].breadcrumbServiceName}
        pageUrl={pageUrl}
        serviceDescription={serviceSchemaDescription}
        intermediatePageUrl={intermediateHubUrl}
      />
      <FaqSchema items={faqItems} />
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
                  <Link href={EVDE_BAKIM_BASE} className="transition-colors hover:text-primary">
                    Evde Bakım
                  </Link>
                  <ChevronRight size={14} className="text-gray-400" aria-hidden />
                  <span className="font-medium text-gray-500">{pageLabel}</span>
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
                <img
                  src={heroImageSrc}
                  alt={heroImageAlt}
                  className="max-h-[500px] w-full object-cover"
                />
              </div>
            </section>
            <ServicePageToc items={tocItems} defaultCollapsed />
          </>
        }
        sidebar={
          <div className="lg:mt-[56px]">
            <ServiceContactCard />
          </div>
        }
      >
        <section id="hizmet-hakkinda" className={articleSectionClassName}>
          <div className="mx-auto max-w-3xl">
            {articleContent ? (
              <div
                className="evde-bakim-hizmet-hakkinda prose prose-neutral max-w-none text-gray-600 prose-headings:!my-0 prose-headings:text-gray-900 prose-p:my-0 prose-p:first-of-type:mt-0 prose-p:leading-relaxed prose-p:empty:hidden [&>:first-child]:!mt-0 [&_p:has(>br:only-child)]:hidden [&_p:has(>span:empty:only-child)]:hidden [&_span:empty]:hidden prose-ul:my-0 prose-ol:my-0 prose-li:my-0 prose-blockquote:my-0 prose-a:text-primary [&>*:last-child]:!mb-0 [&>*:last-child]:!pb-0"
                dangerouslySetInnerHTML={{ __html: articleContent.html }}
              />
            ) : (
              <div className="evde-bakim-hizmet-hakkinda text-gray-600 leading-relaxed">
                <h2 className="!mt-0 !mb-0 !text-xl !font-semibold text-gray-900 sm:!text-2xl">Hizmet hakkında</h2>
                <p className="!m-0">{p1}</p>
                <p className="!m-0">{p2}</p>
              </div>
            )}
          </div>
        </section>
        {faqTocMeta ? (
          <FaqSection
            items={faqItems}
            sectionId={faqTocMeta.sectionId}
            questionIds={faqTocMeta.questionIds}
          />
        ) : null}
        {contactSectionData ? (
          <ContactSection
            title={contactSectionData.title}
            description={contactSectionData.description}
            phone={contactSectionData.phone}
            email={contactSectionData.email}
            address={contactSectionData.address}
            mapIframeUrl={contactSectionData.mapIframeUrl}
          />
        ) : null}
        <EvdeBakimSameCityServices city={city} currentService={service} />
      </ServicePageTwoColumn>
      <Footer />
    </>
  )
}
