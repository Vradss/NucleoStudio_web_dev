import type { ReactNode } from 'react'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { SmoothScroll } from '@/components/layout/smooth-scroll'
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
      <body
        className={`${spaceMonoRegular.variable} ${geistSans.variable} antialiased`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SmoothScroll />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

