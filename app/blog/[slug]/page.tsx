'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ServicePageTwoColumn from '@/components/ServicePageTwoColumn'
import ServicePageToc from '@/components/ServicePageToc'
import ServiceContactCard from '@/components/ServiceContactCard'
import { blogService, utils, BlogPost } from '@/lib/admin'
import { Calendar, ChevronRight, Home, User } from 'lucide-react'

type TocItem = { id: string; label: string; level: 2 | 3 }

function stripHtml(text: string): string {
  return text.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}

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

export default function BlogDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [blog, setBlog] = useState<BlogPost | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const resolvedSlug = useMemo(() => {
    const raw = params?.slug
    if (Array.isArray(raw)) return raw[0] || ''
    return raw ? String(raw) : ''
  }, [params])

  useEffect(() => {
    if (resolvedSlug) {
      fetchBlog()
    }
  }, [resolvedSlug])

  const fetchBlog = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const data = await blogService.getBySlug(resolvedSlug)

      if (!data) {
        setError('Blog yazısı bulunamadı')
        return
      }

      setBlog(data)
    } catch (error) {
      console.error('Blog yazısı yüklenirken hata:', error)
      setError('Blog yazısı yüklenirken bir hata oluştu')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Blog yazısı yükleniyor...</p>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  if (error || !blog) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <span className="text-3xl">📝</span>
            </div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-4">Blog Yazısı Bulunamadı</h1>
            <p className="text-gray-600 mb-8">Aradığınız blog yazısı mevcut değil veya kaldırılmış olabilir.</p>
            <button
              onClick={() => router.push('/blog')}
              className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Blog'a Dön
            </button>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  const articleContent = blog.content?.trim() ? injectHeadingIdsAndCollectToc(blog.content) : null
  const tocItems = articleContent?.tocItems?.length
    ? articleContent.tocItems
    : [{ id: 'blog-icerik', label: 'Yazı', level: 2 as const }]
  const publishedDate = utils.formatDate(blog.created_at || new Date().toISOString())

  return (
    <>
      <Header />
      <ServicePageTwoColumn
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
                  <Link href="/blog" className="transition-colors hover:text-primary">
                    Blog
                  </Link>
                  <ChevronRight size={14} className="text-gray-400" aria-hidden />
                  <span className="font-medium text-gray-500">{blog.title}</span>
                </div>
              </nav>
              <hr className="mt-4 mb-2 border-gray-200" />
              <h3 className="text-[20px] font-bold leading-snug text-gray-900">{blog.title}</h3>
              <div className="mt-3 mb-6 flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span className="inline-flex items-center gap-1.5">
                  <User size={14} aria-hidden />
                  <span>Aray İş</span>
                </span>
                <span aria-hidden>|</span>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar size={14} aria-hidden />
                  <span>{publishedDate}</span>
                </span>
              </div>
              {blog.image_url ? (
                <div className="mb-8 overflow-hidden rounded-2xl border border-gray-200">
                  <img
                    src={blog.image_url}
                    alt={blog.image_alt || blog.title}
                    className="max-h-[500px] w-full object-cover"
                  />
                </div>
              ) : null}
            </section>
            <ServicePageToc items={tocItems} heading="Bu yazıda" />
          </>
        }
        sidebar={
          <div className="lg:mt-[56px]">
            <ServiceContactCard />
          </div>
        }
      >
        <section id="blog-icerik" className="scroll-mt-28 bg-white pt-6 pb-14">
          <div className="mx-auto max-w-3xl">
            {articleContent ? (
              <div
                className="prose prose-neutral max-w-none text-gray-600 prose-headings:my-0 prose-headings:text-gray-900 prose-p:my-0 prose-p:leading-relaxed prose-ul:my-0 prose-ol:my-0 prose-li:my-0 prose-blockquote:my-0 prose-a:text-primary"
                dangerouslySetInnerHTML={{ __html: articleContent.html }}
              />
            ) : (
              <p className="text-gray-600">İçerik bulunamadı.</p>
            )}
          </div>
        </section>
      </ServicePageTwoColumn>
      <Footer />
    </>
  )
}
