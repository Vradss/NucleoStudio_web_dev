import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import '../globals.css'
import { SmoothScroll } from '@/components/layout/smooth-scroll'
import {
  spaceMonoRegular,
  artifictrialSuperbold,
  artifictrialRegular,
  artifictrialSemibold,
} from '@/lib/fonts'

export const metadata: Metadata = {
  title: 'Nucleo Studio',
  description: 'Aplicación Next.js con TypeScript, Tailwind CSS y Shadcn UI',
}

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
    <html lang={locale}>
            <body
              className={`${spaceMonoRegular.variable} ${artifictrialSuperbold.variable} ${artifictrialRegular.variable} ${artifictrialSemibold.variable} antialiased`}
            >
        <NextIntlClientProvider messages={messages}>
          <SmoothScroll />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

