import type { Metadata } from 'next'
import { sitePageTitle } from '@/lib/hizmetlerimiz-silo'

export const metadata: Metadata = {
  title: sitePageTitle('Hakkımızda'),
}

export default function HakkimizdaLayout({ children }: { children: React.ReactNode }) {
  return children
}
