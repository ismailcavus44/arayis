import type { Metadata } from 'next'
import './globals.css'
import MobileStickyCTA from '@/components/MobileStickyCTA'
import { sitePageTitle } from '@/lib/hizmetlerimiz-silo'

export const metadata: Metadata = {
  title: sitePageTitle('Anasayfa'),
  description: 'Profesyonel insan kaynakları hizmetleri ile iş arayışınızda yanınızdayız',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className="font-manrope pb-24 md:pb-0">
        {children}
        <MobileStickyCTA />
      </body>
    </html>
  )
}
