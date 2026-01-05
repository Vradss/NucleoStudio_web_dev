import type { ReactNode } from 'react'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { SmoothScroll } from '@/components/layout/smooth-scroll'
import { ClarityAnalytics } from '@/components/analytics/clarity-analytics'
import { GoogleAnalytics } from '@/components/analytics/google-analytics'
import {
  spaceMonoRegular,
  geistSans,
} from '@/lib/fonts'

interface LocaleLayoutProps {
  children: ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params

  if (!routing.locales.includes(locale as any)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* Preconnect para recursos externos */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        {/* Preload script de Unicorn Studio - alta prioridad */}
        <link
          rel="preload"
          href="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.0/dist/unicornStudio.umd.js"
          as="script"
          crossOrigin="anonymous"
        />
        {/* Preload animación de fondo - alta prioridad */}
        <link
          rel="preload"
          href="/animations/unicorn-bg.json"
          as="fetch"
          crossOrigin="anonymous"
        />
        {/* Preload recursos críticos */}
        <link
          rel="preload"
          href="/fonts/ArtificTrial/artifictrial-regular.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/ArtificTrial/artifictrial-semibold.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/ArtificTrial/artifictrial-superbold.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/images/favico-16x16.png" sizes="16x16" type="image/png" />
        <link rel="icon" href="/images/favico-32x32.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/images/isotipo.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/images/apple-touch-icon.png" />
        <meta name="theme-color" content="#6F31FF" />
        <GoogleAnalytics />
        <ClarityAnalytics />
      </head>
      <body
        className={`${spaceMonoRegular.variable} ${geistSans.variable} antialiased bg-[#17171A]`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SmoothScroll />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

