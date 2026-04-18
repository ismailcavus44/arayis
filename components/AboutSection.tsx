import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

const points = [
  {
    title: 'Kişiselleştirilmiş Bakım Analizi',
    text: 'Ailenizin ve sevdiklerinizin özel ihtiyaçlarını analiz ediyor, beklentilerinize tam uyum sağlayan adayları eşleştiriyoruz.',
  },
  {
    title: 'Sürekli Denetim ve Destek',
    text: 'Personel yerleştirme sonrası süreçte de sizi yalnız bırakmıyor, hizmet kalitesini periyodik olarak takip ediyoruz.',
  },
  {
    title: 'Güvenli ve Referanslı Adaylar',
    text: 'Geçmiş tecrübeleri doğrulanmış, referans kontrolleri yapılmış ve güven veren profesyonellerle çalışmanızı sağlıyoruz.',
  },
]

export default function AboutSection() {
  return (
    <section className="about-trusted-section border-t border-neutral-200/80 bg-white py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="order-2 lg:order-1">
            <p className="text-xs font-semibold tracking-[0.2em] text-primary">KURUMSAL ÇÖZÜM ORTAĞINIZ</p>
            <h1 className="mt-5 text-3xl font-semibold leading-[1.12] tracking-tight text-neutral-900">
              Güvenilir <span className="highlight">bakıcı ve ev yardımcısı</span> danışmanlığı
            </h1>
            <p className="mt-5 text-neutral-600 leading-relaxed">
              Profesyonel ekibimizle, ailenizin huzuru için doğru personeli bulmanıza odaklanıyoruz. Evinize yardımcı,
              hastanıza şefkatli bir refakatçi veya çocuğunuza güvenilir bir bakıcı arayışınızda, seçme ve yerleştirme
              süreçlerimizle yanınızdayız.
            </p>

            <ul className="mt-10 space-y-6">
              {points.map((item) => (
                <li key={item.title} className="flex gap-4">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <CheckCircle size={18} strokeWidth={1.75} aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-[20px] font-semibold leading-snug text-neutral-900">{item.title}</h3>
                    <p className="mt-1 text-sm text-neutral-600 leading-relaxed">{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <Link
                href="/iletisim"
                className="inline-flex items-center justify-center rounded-full bg-secondary px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-secondary/90"
              >
                Hizmet Talebi Oluştur
              </Link>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-[0_24px_60px_-24px_rgba(19,34,99,0.25)]">
              <div className="relative aspect-[4/3] w-full sm:aspect-[5/4]">
                <img
                  src="/images/aray-is-yasli-bakicisi-hasta-bakicisi.webp"
                  alt="Yaşlı bakıcısı ve hasta bakıcı danışmanlığında Aray İş"
                  className="absolute inset-0 h-full w-full object-cover object-center"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-r from-secondary/70 via-secondary/50 to-secondary/20 sm:via-secondary/45 sm:to-transparent"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 lg:hidden"
                  aria-hidden
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
