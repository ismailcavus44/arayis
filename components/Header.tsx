'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '/hakkimizda', label: 'Hakkımızda' },
  { href: '/hizmetler', label: 'Hizmetlerimiz', activePrefix: '/hizmetlerimiz' as const },
  { href: '/is-ilanlari', label: 'İş ilanları' },
  { href: '/blog', label: 'Blog' },
  { href: '/iletisim', label: 'İletişim' },
] as const

function isNavActive(pathname: string, item: (typeof navLinks)[number]) {
  if (pathname === item.href) return true
  const extra = 'activePrefix' in item ? item.activePrefix : null
  if (extra && pathname.startsWith(extra)) return true
  if (pathname.startsWith(`${item.href}/`)) return true
  return false
}

const SCROLL_SOLID_PX = 20
const MQ_MOBILE = '(max-width: 1023px)'

export default function Header() {
  const pathname = usePathname()
  const isHome = pathname === '/'

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const homeMobileFixed = isHome && isMobile
  const homeMobileTransparent = homeMobileFixed && !scrolled
  const homeMobileSolid = homeMobileFixed && scrolled

  useEffect(() => {
    const mq = window.matchMedia(MQ_MOBILE)
    const onChange = () => setIsMobile(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (!homeMobileFixed) {
      setScrolled(false)
      return
    }
    const onScroll = () => setScrolled(window.scrollY > SCROLL_SOLID_PX)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [homeMobileFixed])

  return (
    <header
      className={`w-full sticky top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        homeMobileFixed ? 'max-lg:fixed max-lg:left-0 max-lg:right-0' : ''
      } ${
        homeMobileSolid
          ? 'shadow-[0_4px_24px_-4px_rgba(0,0,0,0.12),0_2px_10px_-2px_rgba(19,34,99,0.08)]'
          : ''
      }`}
      style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
    >
      {/* Ana navigasyon */}
      <div
        className={`transition-[background-color,box-shadow,border-color] duration-300 ${
          homeMobileTransparent
            ? 'border-0 bg-transparent'
            : homeMobileSolid
              ? 'border-0 bg-white/95 backdrop-blur-sm'
              : 'border-b border-neutral-200/80 bg-white/95 backdrop-blur-sm'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 py-3 sm:py-4">
            <Link href="/" className="flex shrink-0 items-center" onClick={() => setIsMenuOpen(false)}>
              <img
                src="/images/aray-is-logo-header.png"
                alt="Aray-İş"
                width={160}
                height={160}
                className={`h-12 w-auto object-contain sm:h-14 ${
                  homeMobileTransparent ? 'drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]' : ''
                }`}
              />
            </Link>

            <nav className="hidden items-center gap-8 lg:flex" aria-label="Ana menü">
              {navLinks.map((item) => {
                const active = isNavActive(pathname, item)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-full px-1 py-2 text-base transition-colors duration-200 ease-in-out ${
                      active
                        ? 'font-semibold text-sky-500'
                        : 'font-medium text-slate-700 hover:text-sky-500'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>

            <div className="hidden items-center gap-3 lg:flex">
              <Link
                href="/iletisim"
                className="rounded-xl bg-gradient-to-r from-sky-500 to-primary px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_26px_-14px_rgba(2,132,199,0.65)] transition-all duration-200 hover:-translate-y-0.5 hover:from-sky-600 hover:to-sky-500 hover:shadow-[0_14px_30px_-16px_rgba(2,132,199,0.75)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/70 focus-visible:ring-offset-2"
              >
                Bizi Arayın +90 505 277 26 28
              </Link>
            </div>

            <button
              type="button"
              className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors lg:hidden ${
                homeMobileTransparent
                  ? 'border-white/40 bg-black/15 text-white backdrop-blur-[2px] hover:bg-black/25'
                  : 'border-neutral-200 text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50'
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
            >
              {isMenuOpen ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
            </button>
          </div>

          {isMenuOpen && (
            <div
              id="mobile-menu"
              className={`pb-4 pt-2 lg:hidden ${
                homeMobileFixed ? '' : 'border-t border-neutral-200/80'
              }`}
            >
              <nav
                className={`flex flex-col gap-2 rounded-2xl p-1 ${
                  homeMobileTransparent ? 'bg-white shadow-lg ring-1 ring-black/5' : ''
                }`}
                aria-label="Mobil menü"
              >
                {navLinks.map((item) => {
                  const active = isNavActive(pathname, item)
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`rounded-xl px-4 py-3 text-base transition-colors duration-200 ease-in-out ${
                        active
                          ? 'font-semibold text-sky-500'
                          : `font-medium hover:text-sky-500 ${homeMobileTransparent ? 'text-slate-800' : 'text-slate-700'}`
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )
                })}
                <div className="mt-2 px-1 pb-1">
                  <Link
                    href="/iletisim"
                    className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-sky-500 to-primary px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_-16px_rgba(2,132,199,0.7)] transition-all duration-200 hover:from-sky-600 hover:to-sky-500 hover:shadow-[0_16px_28px_-18px_rgba(2,132,199,0.75)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/70 focus-visible:ring-offset-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Bizi Arayın +90 505 277 26 28
                  </Link>
                </div>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
