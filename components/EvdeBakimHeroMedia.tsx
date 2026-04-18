'use client'

import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import PageHeroMedia from '@/components/PageHeroMedia'
import { SERVICE_COPY, parseHizmetQueryParam } from '@/lib/evde-bakim-flat-silo'
import { EVDE_BAKIM_BASE, HIZMETLER_HUB_PATH } from '@/lib/hizmetlerimiz-silo'

const HUB_DEFAULT = {
  title: 'Evde Bakım Personeli Aracılığı',
  currentPage: 'Evde Bakım Personeli',
  breadcrumbTrail: [{ name: 'Hizmetlerimiz', href: HIZMETLER_HUB_PATH }],
} as const

export default function EvdeBakimHeroMedia() {
  const searchParams = useSearchParams()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const svc = useMemo(
    () => (mounted ? parseHizmetQueryParam(searchParams.get('hizmet')) : null),
    [mounted, searchParams]
  )

  if (svc) {
    const cfg = SERVICE_COPY[svc]
    return (
      <PageHeroMedia
        title={cfg.h1ServicePhrase}
        currentPage={cfg.breadcrumbServiceName}
        breadcrumbTrail={[
          { name: 'Hizmetlerimiz', href: HIZMETLER_HUB_PATH },
          { name: 'Evde Bakım', href: EVDE_BAKIM_BASE },
        ]}
      />
    )
  }

  return (
    <PageHeroMedia
      title={HUB_DEFAULT.title}
      currentPage={HUB_DEFAULT.currentPage}
      breadcrumbTrail={[...HUB_DEFAULT.breadcrumbTrail]}
    />
  )
}
