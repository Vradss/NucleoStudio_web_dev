import { createClient } from '@/lib/supabase/server'
import { getTranslations } from 'next-intl/server'
import { headers } from 'next/headers'
import { LogoutButton } from '@/components/auth/logout-button'
import { LoginButton } from '@/components/auth/login-button'
import { LanguageSelector } from './language-selector'
import { Link } from '@/i18n/routing'
import Image from 'next/image'

export async function Header() {
  const supabase = await createClient()
  const t = await getTranslations('nav')
  const headersList = headers()
  const nextUrl = headersList.get('next-url') ?? ''
  let pathname = nextUrl

  try {
    const parsed = new URL(nextUrl, 'http://dummy-base')
    pathname = parsed.pathname
  } catch {
    // ignore
  }

  const isLoginRoute = pathname?.includes('/login')

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: profile } = user
    ? await supabase
        .from('users')
        .select('role, full_name')
        .eq('id', user.id)
        .single()
    : { data: null }

  if (isLoginRoute) {
    return (
      <header className="sticky top-0 z-40 border-b border-[#1A1A1A] bg-[#0A0A0A]/80 px-6 py-4 backdrop-blur supports-[backdrop-filter]:bg-[#0A0A0A]/70">
        <Link href="/" className="inline-flex items-center">
          <Image
            src="/images/nucleo_logo/nucleo_logo_blanco.svg"
            alt="Nucleo Studio"
            width={130}
            height={34}
            className="h-8 w-auto"
            priority
          />
        </Link>
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[#1A1A1A] bg-[#0A0A0A]/80 backdrop-blur supports-[backdrop-filter]:bg-[#0A0A0A]/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-6 text-[#F7F6F3]">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/nucleo_logo/nucleo_logo_blanco.svg"
            alt="Nucleo Studio"
            width={150}
            height={32}
            className="h-8 w-auto"
            priority
          />
        </Link>
        
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/pricing"
            className="text-sm font-medium text-[#F7F6F3]/80 transition-colors hover:text-[#C3BDFF]"
          >
            {t('pricing')}
          </Link>
          <Link
            href="/web-audit"
            className="text-sm font-medium text-[#F7F6F3]/80 transition-colors hover:text-[#C3BDFF]"
          >
            {t('webAudit')}
          </Link>
          <Link
            href="/dashboard"
            className="text-sm font-medium text-[#F7F6F3]/80 transition-colors hover:text-[#C3BDFF]"
          >
            {t('resources')}
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <div className="hidden items-center gap-3 md:flex">
                <span className="text-sm text-[#C3BDFF]">
                  {profile?.full_name || user.email}
                </span>
                {profile?.role === 'admin' && (
                  <Link
                    href="/admin"
                    className="text-sm font-medium text-[#F7F6F3]/80 transition-colors hover:text-[#C3BDFF]"
                  >
                    {t('admin')}
                  </Link>
                )}
              </div>
              <LanguageSelector />
              <LogoutButton />
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden rounded-full border border-[#C3BDFF]/50 px-5 py-2 text-sm font-medium text-[#F7F6F3] transition-colors hover:bg-[#C3BDFF]/10 md:inline-flex"
              >
                {t('login')}
              </Link>
              <Link
                href="/login"
                className="rounded-full bg-[#6F31FF] px-5 py-2 text-sm font-medium text-[#F7F6F3] transition-colors hover:bg-[#C3BDFF] hover:text-[#0A0A0A]"
              >
                {t('createAccount')}
              </Link>
              <LanguageSelector />
            </>
          )}
        </div>
      </div>
    </header>
  )
}
