import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import MobileStickyCTA from '@/components/MobileStickyCTA'
import { sitePageTitle } from '@/lib/hizmetlerimiz-silo'

export const metadata: Metadata = {
  title: sitePageTitle('Anasayfa'),
  description: 'Profesyonel insan kaynakları hizmetleri ile iş arayışınızda yanınızdayız',
  verification: {
    google: '0vRGKkKZ-G1LeCFojEoOg1AfegDqKC9Y0FbP-7kSKuo',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18135854284"
          strategy="afterInteractive"
        />
        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18135854284');
          `}
        </Script>
      </head>
      <body className="font-manrope pb-24 md:pb-0">
        {children}
        <MobileStickyCTA />
      </body>
    </html>
  )
}
