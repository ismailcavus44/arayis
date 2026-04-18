'use client'

import { useEffect, useId, useState } from 'react'
import { ChevronDown } from 'lucide-react'

export type ServiceTocItem = { id: string; label: string; level?: 2 | 3 }

interface ServicePageTocProps {
  items: ServiceTocItem[]
  /** Varsayılan: "Yazı İçeriği" */
  heading?: string
  className?: string
  /**
   * Hizmet sayfaları: mobilde liste kapalı başlar (aç/kapa); masaüstünde (lg+) her zaman açık.
   */
  defaultCollapsed?: boolean
}

export default function ServicePageToc({
  items,
  heading = 'Yazı İçeriği',
  className = '',
  defaultCollapsed = false,
}: ServicePageTocProps) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null)
  const [isExpanded, setIsExpanded] = useState(!defaultCollapsed)
  const listId = useId()

  useEffect(() => {
    if (items.length === 0) return

    const elements = items
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]?.target.id) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-20% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    )

    for (const el of elements) observer.observe(el)
    return () => observer.disconnect()
  }, [items])

  if (items.length === 0) return null

  const headingClass =
    'text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-500'

  const listClassName = [
    'mt-2.5 space-y-1.5',
    defaultCollapsed && 'lg:block',
    defaultCollapsed && !isExpanded && 'max-lg:hidden',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <nav aria-label="Sayfa içi menü" className={`max-w-3xl ${className}`}>
      <div className="border-l border-neutral-200 pl-4 sm:pl-5">
        {defaultCollapsed ? (
          <>
            <button
              type="button"
              aria-expanded={isExpanded}
              aria-controls={listId}
              onClick={() => setIsExpanded((v) => !v)}
              className="flex w-full items-center gap-2 rounded-md py-1 text-left transition-colors hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25 lg:hidden"
            >
              <span className={headingClass}>{heading}</span>
              <ChevronDown
                className={`ml-auto h-4 w-4 shrink-0 text-neutral-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                aria-hidden
              />
            </button>
            <p className={`${headingClass} hidden lg:block`}>{heading}</p>
          </>
        ) : (
          <p className={headingClass}>{heading}</p>
        )}
        <ul id={listId} className={listClassName}>
          {items.map(({ id, label, level }) => {
            const active = activeId === id
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={`block text-[13px] leading-5 transition-colors ${
                    level === 3 ? 'pl-3.5' : ''
                  } ${
                    active ? 'font-semibold text-primary' : 'text-neutral-600 hover:text-primary'
                  }`}
                >
                  {label}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
