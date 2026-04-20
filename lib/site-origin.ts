/** Ortamdan mutlak site kökü (JSON-LD logo/url için). */
export function getSiteOrigin(): string {
  const u = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (u) return u.replace(/\/$/, '')

  // Production'da canonical alan adını sabitle (sitemap/robots/JSON-LD).
  if (process.env.NODE_ENV === 'production') return 'https://www.arayisik.com'

  // Geliştirme/preview ortamlarında Vercel URL'si kullanılabilir.
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL.replace(/\/$/, '')}`
  return 'http://localhost:3000'
}
