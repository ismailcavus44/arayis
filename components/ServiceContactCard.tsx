import Link from 'next/link'
import { Mail, Phone } from 'lucide-react'

export default function ServiceContactCard() {
  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-500">İletişim</p>
      <h2 className="mt-2 text-lg font-semibold text-neutral-900">Bu hizmet için hızlıca ulaşın</h2>
      <p className="mt-2 text-sm leading-6 text-neutral-600">
        İhtiyacınızı paylaşın, size uygun çözüm ve süreç hakkında kısa sürede dönüş yapalım.
      </p>

      <div className="mt-5 space-y-3 text-sm">
        <a
          href="tel:+905052772628"
          className="flex items-start gap-3 rounded-xl border border-neutral-200 px-3 py-3 text-neutral-700 transition-colors hover:border-primary/30 hover:text-primary"
        >
          <Phone className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          <span>+90 505 277 2628</span>
        </a>
        <a
          href="mailto:info@arayisik.com"
          className="flex items-start gap-3 rounded-xl border border-neutral-200 px-3 py-3 text-neutral-700 transition-colors hover:border-primary/30 hover:text-primary"
        >
          <Mail className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          <span>info@arayisik.com</span>
        </a>
      </div>

      <Link
        href="/iletisim"
        className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-primary px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-primary/90"
      >
        İletişim sayfasına git
      </Link>
    </section>
  )
}
