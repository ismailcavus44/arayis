'use client'

import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

export interface BreadcrumbTrailItem {
  name: string
  href: string
}

interface BreadcrumbProps {
  title?: string
  currentPage: string
  items?: BreadcrumbTrailItem[]
  /** Koyu hero üzerinde açık renkler */
  tone?: 'light' | 'dark'
}

export default function Breadcrumb({ currentPage, items, tone = 'light' }: BreadcrumbProps) {
  const isDark = tone === 'dark'

  return (
    <div
      className={`w-full ${isDark ? 'mb-2' : 'mb-8 border-b border-gray-200'}`}
    >
      <div
        className={
          isDark
            ? 'mx-auto max-w-7xl px-0 py-0'
            : 'container mx-auto px-4 py-4'
        }
      >
        <nav
          className={`flex flex-wrap items-center gap-x-1.5 gap-y-0.5 sm:gap-x-2 sm:gap-y-1 ${
            isDark ? 'text-xs sm:text-sm' : 'text-sm'
          }`}
          aria-label="Sayfa konumu"
        >
          <Link
            href="/"
            className={`flex items-center space-x-1 transition-colors ${
              isDark ? 'text-white/75 hover:text-white' : 'text-gray-600 hover:text-primary'
            }`}
          >
            <Home size={isDark ? 14 : 16} aria-hidden />
            <span>Anasayfa</span>
          </Link>

          {items?.map((item) => (
            <span key={item.href} className="flex items-center">
              <ChevronRight
                size={16}
                className={`mx-1 shrink-0 ${isDark ? 'text-white/35' : 'text-gray-400'}`}
                aria-hidden
              />
              <Link
                href={item.href}
                className={isDark ? 'text-white/75 hover:text-white' : 'text-gray-600 hover:text-primary transition-colors'}
              >
                {item.name}
              </Link>
            </span>
          ))}

          <span className="flex items-center">
            <ChevronRight
              size={16}
              className={`mx-1 shrink-0 ${isDark ? 'text-white/35' : 'text-gray-400'}`}
              aria-hidden
            />
            <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-500'}`}>{currentPage}</span>
          </span>
        </nav>
      </div>
    </div>
  )
}
