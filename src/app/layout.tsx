import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import './globals.css'

export const metadata: Metadata = {
  title: 'Nucleo Studio',
  description: 'Aplicación Next.js con TypeScript, Tailwind CSS y Shadcn UI',
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return children
}


