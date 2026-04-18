import type { ReactNode } from 'react'
import ServiceContactCard from '@/components/ServiceContactCard'

interface ServicePageTwoColumnProps {
  toc: ReactNode
  /** TOC ile makale gövdesi arası (ör. İŞKUR güven kartı) */
  afterToc?: ReactNode
  children: ReactNode
  sidebar?: ReactNode
  className?: string
}

/** Hizmet sayfaları: TOC tüm ekranlarda içerik akışında üstte kalır. */
export default function ServicePageTwoColumn({
  toc,
  afterToc,
  children,
  sidebar = <ServiceContactCard />,
  className = '',
}: ServicePageTwoColumnProps) {
  return (
    <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="py-10 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start lg:gap-10">
          <div className="min-w-0">
            <aside className="mx-auto max-w-3xl border-b border-neutral-200 pb-2">
              <div>{toc}</div>
            </aside>
            {afterToc}
            <div className={afterToc ? 'mt-0' : 'mt-2'}>{children}</div>
          </div>
          <aside className="hidden min-w-0 lg:block">
            <div className="lg:sticky lg:top-28">
              {sidebar}
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
