'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

const SLIDE_INTERVAL_MS = 6500

type HeadingPart = { text: string; highlight?: boolean }

type HeroSlide = {
  eyebrow: string
  headingParts: HeadingPart[]
  description: string
  image: string | null
  /** Hizmet detay sayfası (Detaylar) */
  detailHref: string
}

const slides: HeroSlide[] = [
  {
    eyebrow: 'KURUMSAL PERSONEL ÇÖZÜMLERİ',
    headingParts: [
      { text: 'Mavi yaka personel aracılığı', highlight: true },
      { text: ' ve İK danışmanlığı', highlight: false },
    ],
    description:
      'İşletmeniz için nitelikli iş gücü ve uzman personel sağlama süreçlerini profesyonel ekiplerimizle yönetiyoruz.',
    image: '/images/aray-is-slider-1.webp',
    detailHref: '/hizmetlerimiz/mavi-yaka-personel-araciligi',
  },
  {
    eyebrow: 'EV HİZMETLERİ DANIŞMANLIĞI',
    headingParts: [
      { text: 'Güvenilir ', highlight: false },
      { text: 'ev yardımcısı ve yardımcı bayan', highlight: true },
      { text: ' aracılığı', highlight: false },
    ],
    description:
      'Referanslı, deneyimli ve adli sicil kaydı kontrol edilmiş ev yardımcıları ile yaşam alanlarınıza profesyonel destek sağlıyoruz.',
    image: '/images/aray-is-slider-2.webp',
    detailHref: '/hizmetlerimiz/evde-bakim-personeli?hizmet=ev-yardimcisi',
  },
  {
    eyebrow: 'REFAKATÇİ VE BAKIM HİZMETLERİ',
    headingParts: [
      { text: 'Yatılı ', highlight: false },
      { text: 'yaşlı bakıcısı ve hasta bakıcı', highlight: true },
      { text: ' danışmanlığı', highlight: false },
    ],
    description:
      'Şefkat odaklı profesyonel bakım personeli eşleştirmeleri ile sevdiklerinize en güvenli refakat hizmetini sunuyoruz.',
    image: '/images/aray-is-slider-3.webp',
    detailHref: '/hizmetlerimiz/evde-bakim-personeli',
  },
]

/** Ana sayfa slider başlığı: 36px (sabit) */
const heroHeadingClass =
  'text-4xl font-semibold leading-snug tracking-tight text-white'

/** Ana sayfa hero / MainSlider */
export default function HeroSection() {
  const [index, setIndex] = useState(0)
  const slide = slides[index]

  const go = useCallback((dir: -1 | 1) => {
    setIndex((i) => (i + dir + slides.length) % slides.length)
  }, [])

  useEffect(() => {
    const t = setInterval(() => go(1), SLIDE_INTERVAL_MS)
    return () => clearInterval(t)
  }, [go])

  return (
    <section className="hero-main-slider relative isolate z-10 bg-neutral-900 text-white">
      <div className="relative min-h-[420px] md:min-h-[520px] lg:min-h-[560px]">
        <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden>
          <div
            className="flex h-full min-h-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {slides.map((s, i) => (
              <div key={i} className="relative h-full min-h-full w-full min-w-full shrink-0">
                {s.image ? (
                  <>
                    <img
                      src={s.image}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover object-center"
                      loading={i === 0 ? 'eager' : 'lazy'}
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/80 to-secondary/25 sm:via-secondary/65 sm:to-transparent"
                      aria-hidden
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25 lg:hidden"
                      aria-hidden
                    />
                  </>
                ) : (
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-secondary via-[#1a2d7a] to-neutral-900"
                    aria-hidden
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 mx-auto flex min-h-[420px] w-full max-w-7xl flex-col justify-center px-12 pb-16 pt-[calc(env(safe-area-inset-top,0px)+3.5rem)] sm:px-14 md:absolute md:inset-0 md:h-full md:min-h-0 md:flex-row md:items-center md:justify-start md:px-12 md:pb-20 lg:py-10">
          <div className="w-full max-w-xl">
            <p className="text-[11px] font-semibold tracking-[0.18em] text-primary">{slide.eyebrow}</p>
            <h2 className={`mt-2 ${heroHeadingClass}`}>
              {slide.headingParts.map((part, i) =>
                part.highlight ? (
                  <span key={i} className="highlight">
                    {part.text}
                  </span>
                ) : (
                  <span key={i}>{part.text}</span>
                )
              )}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/90 sm:text-[15px]">{slide.description}</p>
            <div className="mt-6 flex w-full flex-col gap-3 sm:flex-row sm:gap-3 md:w-auto">
              <Link
                href={slide.detailHref}
                className="inline-flex w-full items-center justify-center rounded-full border border-white/35 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-[2px] transition-colors hover:bg-white/15 sm:px-6 sm:py-3 md:w-auto"
              >
                Detaylar
                <ArrowRight size={16} className="ml-2" aria-hidden />
              </Link>
              <Link
                href="/iletisim"
                className="inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90 sm:px-6 sm:py-3 md:w-auto"
              >
                İletişime geç
                <ArrowRight size={16} className="ml-2" aria-hidden />
              </Link>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => go(-1)}
          className="absolute left-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/25 text-white backdrop-blur-sm transition-colors hover:bg-black/40 sm:left-4"
          aria-label="Önceki slayt"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          className="absolute right-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/25 text-white backdrop-blur-sm transition-colors hover:bg-black/40 sm:right-4"
          aria-label="Sonraki slayt"
        >
          <ChevronRight size={18} />
        </button>

        <div className="pointer-events-none absolute bottom-6 left-0 right-0 z-30 flex justify-center gap-1.5 sm:bottom-8 [&>button]:pointer-events-auto">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? 'w-8 bg-primary' : 'w-1.5 bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Slayt ${i + 1}`}
              aria-current={i === index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
