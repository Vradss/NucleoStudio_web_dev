import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import './globals.css'

const siteUrl = 'https://nucleostudio.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Nucleo Studio | Posicionamiento y Contenido B2B',
    template: '%s | Nucleo Studio',
  },
  description:
    'Ayudamos a empresas tech B2B a clarificar sus propuestas de valor, crear mensajes diferenciados y expandirlos en web, LinkedIn y estrategia de contenido. Studio de producto y content marketing.',
  keywords: [
    'posicionamiento B2B',
    'content marketing B2B',
    'propuesta de valor',
    'messaging',
    'estrategia de contenido',
    'marketing B2B',
    'SaaS marketing',
    'tech marketing',
    'diferenciación de marca',
    'go-to-market',
    'LinkedIn marketing',
    'startup marketing',
    'product marketing',
    'brand positioning',
    'B2B content strategy',
  ],
  authors: [{ name: 'Nucleo Studio' }],
  creator: 'Nucleo Studio',
  publisher: 'Nucleo Studio',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'es_LA',
    alternateLocale: 'en_US',
    url: siteUrl,
    siteName: 'Nucleo Studio',
    title: 'Nucleo Studio | Posicionamiento y Contenido B2B',
    description:
      'Clarificamos tu propuesta de valor y creamos mensajes diferenciados para empresas tech B2B. Posicionamiento, web, LinkedIn y estrategia de contenido.',
    images: [
      {
        url: '/images/open_graph.jpg',
        width: 1200,
        height: 630,
        alt: 'Nucleo Studio - Posicionamiento y Contenido B2B',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nucleo Studio | Posicionamiento y Contenido B2B',
    description:
      'Clarificamos tu propuesta de valor y creamos mensajes diferenciados para empresas tech B2B.',
    images: ['/images/open_graph.jpg'],
    creator: '@nucleostudio',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/images/isotipo_morado_fuerte.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/apple-touch-icon.png' }],
  },
  manifest: '/manifest.json',
  alternates: {
    canonical: siteUrl,
    languages: {
      'es-LA': `${siteUrl}/es`,
      'en-US': `${siteUrl}/en`,
    },
  },
  category: 'business',
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return children
}
