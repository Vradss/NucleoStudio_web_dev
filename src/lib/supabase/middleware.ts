import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet: Array<{ name: string; value: string; options?: CookieOptions }>) {
          // ✅ Primero setear en request
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          // ✅ Luego setear en response SIN recrearlo
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Extract locale from pathname (e.g., /es/dashboard -> es)
  const pathname = request.nextUrl.pathname
  const localeMatch = pathname.match(/^\/(es|en)/)
  const locale = localeMatch ? localeMatch[1] : 'es'
  const pathWithoutLocale = localeMatch ? pathname.replace(`/${locale}`, '') || '/' : pathname

  // Public routes that don't require authentication
  const publicRoutes = ['/', '/login', '/auth', '/pricing', '/web-audit']
  const isPublicRoute = publicRoutes.some(route => 
    pathWithoutLocale === route || pathWithoutLocale.startsWith(route + '/')
  )

  if (!user && !isPublicRoute) {
    const url = request.nextUrl.clone()
    url.pathname = `/${locale}/login`
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}