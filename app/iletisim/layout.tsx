import type { Metadata } from 'next'
import { sitePageTitle } from '@/lib/hizmetlerimiz-silo'

export const metadata: Metadata = {
  title: sitePageTitle('İletişim'),
}

export default function IletisimLayout({ children }: { children: React.ReactNode }) {
  return children
}
