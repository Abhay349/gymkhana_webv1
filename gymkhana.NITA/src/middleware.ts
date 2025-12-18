import { authMiddleware } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

function isBot(req: Request) {
  const ua = req.headers.get('user-agent') || ''
  return /Googlebot|bingbot|Slurp|DuckDuckBot|Baiduspider|YandexBot/i.test(ua)
}

export default function middleware(req: Request) {
  
  if (isBot(req)) {
    return NextResponse.next()
  }

  // Otherwise use Clerk auth
  return authMiddleware({
    afterAuth(auth, req) {
      const metadata = (auth.sessionClaims as any)?.metadata
      const registered = !!auth.userId && metadata?.role !== undefined

      if (!auth.userId && req.nextUrl.pathname === '/onboarding') {
        return NextResponse.redirect(new URL('/', req.url))
      }

      if (registered && req.nextUrl.pathname === '/onboarding') {
        return NextResponse.redirect(new URL('/', req.url))
      }

      if (
        !registered &&
        !auth.isPublicRoute &&
        req.nextUrl.pathname !== '/onboarding'
      ) {
        return NextResponse.redirect(new URL('/onboarding', req.url))
      }
    },
    publicRoutes: [
      '/',
      '/gymkhanaPage',
      /^\/clubs.*$/,
      /^\/events.*$/,
      /^\/blog.*$/,
      /^\/login.*$/,
      /^\/api.*$/,
    ],
    ignoredRoutes: ['/api/og'],
  })(req)
}

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
}
