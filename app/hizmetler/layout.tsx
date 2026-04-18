import type { Metadata } from 'next'
import { sitePageTitle } from '@/lib/hizmetlerimiz-silo'

export const metadata: Metadata = {
  title: sitePageTitle('Hizmetlerimiz'),
}

export default function HizmetlerLayout({ children }: { children: React.ReactNode }) {
  return children
}
