import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function NotFoundPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900 antialiased">
      <Header />

      <section className="border-t border-neutral-200 py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">404</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
            Aradığınız sayfa bulunamadı
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-neutral-600 md:text-base">
            Bağlantı hatalı olabilir veya sayfa taşınmış olabilir. Ana sayfaya dönerek gezinmeye devam edebilirsiniz.
          </p>

          <div className="mt-8">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl bg-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-sky-600"
            >
              Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
