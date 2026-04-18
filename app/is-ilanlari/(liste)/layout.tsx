import type { Metadata } from 'next'
import { sitePageTitle } from '@/lib/hizmetlerimiz-silo'

export const metadata: Metadata = {
  title: sitePageTitle('İş İlanları'),
}

export default function IsIlanlariListeLayout({ children }: { children: React.ReactNode }) {
  return children
}
