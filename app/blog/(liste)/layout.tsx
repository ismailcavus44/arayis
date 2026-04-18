import type { Metadata } from 'next'
import { sitePageTitle } from '@/lib/hizmetlerimiz-silo'

export const metadata: Metadata = {
  title: sitePageTitle('Kariyer Rehberi'),
}

export default function BlogListeLayout({ children }: { children: React.ReactNode }) {
  return children
}
