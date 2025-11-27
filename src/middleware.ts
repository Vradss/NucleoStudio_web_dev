import createMiddleware from 'next-intl/middleware'
import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'
import { routing } from './i18n/routing'

const intlMiddleware = createMiddleware(routing)

export async function middleware(request: NextRequest) {
  // Apply i18n middleware first
  const intlResponse = intlMiddleware(request)
  
  // Then apply Supabase auth middleware
  const authResponse = await updateSession(request)
  
  // If auth middleware wants to redirect, use that
  if (authResponse && authResponse.status === 307) {
    return authResponse
  }
  
  // Otherwise use i18n response
  return intlResponse || authResponse
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api (API routes)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

