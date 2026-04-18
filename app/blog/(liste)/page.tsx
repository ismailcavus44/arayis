'use client'

import { Suspense, useCallback, useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHeroMedia from '@/components/PageHeroMedia'
import { blogService, utils, BlogPost } from '@/lib/admin'

const POSTS_PER_PAGE = 6

function BlogListeInner() {
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const searchParams = useSearchParams()
  const router = useRouter()

  const totalPages = Math.max(1, Math.ceil(blogs.length / POSTS_PER_PAGE))
  const rawPage = parseInt(searchParams.get('sayfa') || '1', 10)
  const pageFromUrl = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1
  const currentPage = Math.min(pageFromUrl, totalPages)

  const fetchBlogs = useCallback(async () => {
    try {
      setIsLoading(true)
      const data = await blogService.getAll()
      setBlogs(data)
    } catch (error) {
      console.error('Blog yazıları yüklenirken hata:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void fetchBlogs()
  }, [fetchBlogs])

  useEffect(() => {
    if (isLoading) return
    if (pageFromUrl === currentPage) return
    const path = currentPage === 1 ? '/blog' : `/blog?sayfa=${currentPage}`
    router.replace(path)
  }, [isLoading, pageFromUrl, currentPage, router])

  const handlePageChange = (page: number) => {
    if (page === 1) {
      router.push('/blog')
    } else {
      router.push(`/blog?sayfa=${page}`)
    }
  }

  const paginatedBlogs =
    blogs.length === 0
      ? []
      : blogs.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE)

  if (isLoading) {
    return (
      <main className="min-h-screen bg-neutral-50 text-neutral-900 antialiased">
        <Header />
        <div className="flex min-h-[60vh] items-center justify-center px-4">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <p className="mt-4 text-sm text-neutral-600">Blog yazıları yükleniyor…</p>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white text-neutral-900 antialiased">
      <Header />

      <PageHeroMedia title="Kariyer Rehberi" currentPage="Blog" />

      <section className="border-t border-neutral-200/80 bg-neutral-50 py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Yazılar</p>
            <h2 className="mt-3 text-[30px] font-semibold leading-snug tracking-tight text-neutral-900">
              Son içerikler
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600 sm:text-base">
              Okumak istediğiniz konuya tıklayın; detay sayfasında tam metne ulaşabilirsiniz.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {paginatedBlogs.map((blog) => (
              <article
                key={blog.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200/80 bg-white transition-all hover:border-primary/25 hover:shadow-md"
              >
                <Link href={`/blog/${blog.slug}`} className="flex flex-1 flex-col">
                  {blog.image_url ? (
                    <div className="aspect-[16/10] overflow-hidden bg-neutral-100">
                      <img
                        src={blog.image_url}
                        alt=""
                        className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[16/10] bg-gradient-to-br from-neutral-100 to-neutral-200/80" />
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <time className="text-xs font-medium tabular-nums text-neutral-500">
                      {utils.formatDate(blog.created_at || '')}
                    </time>
                    <h3 className="mt-3 text-[20px] font-semibold leading-snug tracking-tight text-neutral-900 transition-colors group-hover:text-primary line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-600 line-clamp-3">
                      {utils.blogCardPreview(blog)}
                    </p>
                    <span className="mt-5 inline-flex items-center text-sm font-semibold text-primary">
                      Devamını oku
                      <span className="ml-1 transition-transform group-hover:translate-x-0.5" aria-hidden>
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {totalPages > 1 ? (
            <nav className="mt-12 flex flex-wrap items-center justify-center gap-2" aria-label="Sayfalama">
              {currentPage > 1 ? (
                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="rounded-full px-4 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-white hover:text-primary"
                >
                  ← Önceki
                </button>
              ) : null}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => handlePageChange(page)}
                  className={`min-w-[2.5rem] rounded-full px-3 py-2 text-sm font-semibold transition-colors ${
                    page === currentPage ? 'bg-primary text-white' : 'text-neutral-600 hover:bg-white'
                  }`}
                >
                  {page}
                </button>
              ))}
              {currentPage < totalPages ? (
                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="rounded-full px-4 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-white hover:text-primary"
                >
                  Sonraki →
                </button>
              ) : null}
            </nav>
          ) : null}
        </div>
      </section>

      <Footer />
    </main>
  )
}

function BlogListeFallback() {
  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900 antialiased">
      <Header />
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="mt-4 text-sm text-neutral-600">Blog yükleniyor…</p>
        </div>
      </div>
      <Footer />
    </main>
  )
}

export default function BlogPage() {
  return (
    <Suspense fallback={<BlogListeFallback />}>
      <BlogListeInner />
    </Suspense>
  )
}
