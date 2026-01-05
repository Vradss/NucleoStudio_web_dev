import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

const intlMiddleware = createMiddleware({
  ...routing,
  localeDetection: false, // Desactivar detección automática de idioma del navegador
})

export function middleware(request: any) {
  return intlMiddleware(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api (API routes)
     * - animations (Unicorn Studio JSON files)
     */
    '/((?!_next/static|_next/image|favicon.ico|api|animations|.*\\.(?:svg|png|jpg|jpeg|gif|webp|json|ico)$).*)',
  ],
}
