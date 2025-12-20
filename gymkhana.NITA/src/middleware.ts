import { authMiddleware } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import type { NextFetchEvent, NextRequest } from 'next/server'

function isBot(req: NextRequest) {
  const ua = req.headers.get('user-agent') || ''
  return /Googlebot|bingbot|Slurp|DuckDuckBot|Baiduspider|YandexBot/i.test(ua)
}

export default function middleware(req: NextRequest, evt: NextFetchEvent) {
 
  if (isBot(req)) {
    return NextResponse.next()
  }

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
      /^\/add-event.*$/,
      /^\/blog.*$/,
      /^\/login.*$/,
      /^\/api.*$/,
    ],
    ignoredRoutes: ['/api/og'],
  })(req, evt) 
}


export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
