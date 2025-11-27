import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

interface RouteParams {
  params: Promise<{ locale: string }>
}

export async function GET(
  request: Request,
  { params }: RouteParams
) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'
  const errorParam = searchParams.get('error')
  const { locale } = await params

  // Si hay un error de OAuth, redirigir al login
  if (errorParam) {
    console.error('OAuth error:', errorParam)
    return NextResponse.redirect(
      new URL(`/${locale}/login?error=auth_failed`, origin)
    )
  }

  // Si no hay código, redirigir al login
  if (!code) {
    console.error('No code parameter found in callback URL')
    return NextResponse.redirect(
      new URL(`/${locale}/login?error=no_code`, origin)
    )
  }

  try {
    const supabase = await createClient()
    
    // Con Supabase SSR, el code_verifier debería estar en las cookies
    // que se guardaron cuando se inició el flujo OAuth
    // Si no está, puede ser un problema de configuración de cookies
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    
    // Si hay error de PKCE, intentar obtener el code_verifier de las cookies manualmente
    if (error && error.message.includes('code verifier')) {
      console.error('PKCE error - code_verifier not found in cookies')
      console.error('This usually means cookies are not being set/read correctly')
    }

    if (error) {
      console.error('Error exchanging code for session:', error)
      return NextResponse.redirect(
        new URL(`/${locale}/login?error=session_error`, origin)
      )
    }

    if (data?.session && data?.user) {
      // Asegurar que el perfil de usuario existe en la tabla public.users
      const { error: profileError } = await supabase
        .from('users')
        .upsert({
          id: data.user.id,
          email: data.user.email || '',
          full_name: data.user.user_metadata?.full_name || data.user.user_metadata?.name || data.user.email?.split('@')[0] || null,
          role: 'usuario',
        }, {
          onConflict: 'id',
        })

      if (profileError) {
        console.error('Error creating/updating user profile:', profileError)
        // No redirigir al error, el usuario ya está autenticado
      }

      // Autenticación exitosa, redirigir al dashboard
      const redirectUrl = new URL(`/${locale}${next}`, origin)
      return NextResponse.redirect(redirectUrl)
    } else {
      console.error('No session or user data returned')
      return NextResponse.redirect(
        new URL(`/${locale}/login?error=no_session`, origin)
      )
    }
  } catch (error) {
    console.error('Unexpected error in auth callback:', error)
    return NextResponse.redirect(
      new URL(`/${locale}/login?error=unexpected_error`, origin)
    )
  }
}

