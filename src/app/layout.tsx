import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import './globals.css'
import { SmoothScroll } from '@/components/layout/smooth-scroll'
import {
  spaceMonoRegular,
  geistSans,
} from '@/lib/fonts'

export const metadata: Metadata = {
  title: 'Nucleo Studio',
  description: 'Aplicación Next.js con TypeScript, Tailwind CSS y Shadcn UI',
}

interface RootLayoutProps {
  children: ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${spaceMonoRegular.variable} ${geistSans.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <SmoothScroll />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}


