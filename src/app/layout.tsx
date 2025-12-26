import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import './globals.css'
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

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html suppressHydrationWarning>
      <body
        className={`${spaceMonoRegular.variable} ${geistSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}


