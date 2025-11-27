import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { LoginButton } from '@/components/auth/login-button'
import { LoginError } from '@/components/auth/login-error'
import { Link } from '@/i18n/routing'
import Image from 'next/image'

interface LoginPageProps {
  params: Promise<{ locale: string }>
}

export default async function LoginPage({ params }: LoginPageProps) {
  const { locale } = await params
  const supabase = await createClient()
  const t = await getTranslations('auth')

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect(`/${locale}/dashboard`)
  }

  return (
    <div className="flex min-h-screen bg-[#0A0A0A] text-[#F7F6F3]">
      {/* Left panel */}
      <div className="flex w-full flex-col justify-between px-10 py-12 md:w-1/2">
        <div>
          <Link href="/" className="inline-block">
            <Image
              src="/images/logo-color.svg"
              alt="Nucleo Studio"
              width={150}
              height={40}
              priority
              className="h-8 w-auto"
            />
          </Link>
        </div>

        <div className="mx-auto w-full max-w-md">
          <h1 className="font-artifictrial-super text-3xl uppercase">
            {t('loginHeroTitle')}
          </h1>
          <p className="mt-2 font-artifictrial-regular text-sm text-[#C3BDFF]">
            {t('loginHeroSubtitle')}
          </p>

          <div className="mt-8 rounded-3xl border border-[#1F1F1F] bg-[#111111] p-6 shadow-inner">
            <form className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#F7F6F3]">
                  Correo
                </label>
                <input
                  type="email"
                  placeholder="Introduce tu correo"
                  className="w-full rounded-xl border border-[#1F1F1F] bg-[#141214] px-4 py-3 text-sm text-[#F7F6F3] placeholder:text-[#6F31FF] outline-none transition focus:border-[#6F31FF]"
                  disabled
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#F7F6F3]">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Introduce tu contraseña"
                    className="w-full rounded-xl border border-[#1F1F1F] bg-[#141214] px-4 py-3 text-sm text-[#F7F6F3] placeholder:text-[#6F31FF] outline-none transition focus:border-[#6F31FF]"
                    disabled
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full cursor-not-allowed rounded-full border border-[#1F1F1F] bg-[#151515] px-6 py-3 font-medium text-[#6F31FF]"
                disabled
              >
                {t('loginButtonText')}
              </button>
            </form>

            <div className="relative my-6 flex items-center">
              <div className="flex-grow border-t border-[#1F1F1F]" />
              <span className="mx-4 flex-shrink text-sm text-[#C3BDFF]">
                {t('loginDivider')}
              </span>
              <div className="flex-grow border-t border-[#1F1F1F]" />
            </div>

            <LoginError error={null} />
            <LoginButton />
          </div>
        </div>

        <div className="text-xs text-[#C3BDFF]">
          {t('loginLegalPrefix')}{' '}
          <Link href="/legal/terms" className="text-[#6F31FF] hover:underline">
            {t('loginTerms')}
          </Link>{' '}
          {t('loginAnd')}{' '}
          <Link href="/legal/privacy" className="text-[#6F31FF] hover:underline">
            {t('loginPrivacy')}
          </Link>
        </div>
      </div>

      {/* Right panel */}
      <div className="relative hidden w-1/2 items-center justify-center bg-gradient-to-b from-[#6F31FF] to-[#C3BDFF] md:flex">
        <div className="space-y-4 px-10 text-left text-[#0A0A0A]">
          <p className="text-xl font-artifictrial-super uppercase">
            &ldquo;{t('loginQuote')}&rdquo;
          </p>
          <div className="flex items-center gap-3 text-sm font-artifictrial-regular text-[#0A0A0A]/80">
            <div>
              <div className="font-semibold text-[#0A0A0A]">{t('loginQuoteAuthor')}</div>
              <div>{t('loginQuoteTitle')}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

