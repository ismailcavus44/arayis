import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

/** Eski *-yasli-bakim URL'lerini *-yasli-bakicisi flat yapısına yönlendirir */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const m = pathname.match(/^\/hizmetlerimiz\/(.+)-yasli-bakim$/)
  if (m) {
    const url = request.nextUrl.clone()
    url.pathname = `/hizmetlerimiz/${m[1]}-yasli-bakicisi`
    return NextResponse.redirect(url, 308)
  }
  return NextResponse.next()
}

export const config = {
  matcher: '/hizmetlerimiz/:path*',
}
