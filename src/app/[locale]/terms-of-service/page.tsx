import type { Metadata } from 'next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { TermsOfServiceContent } from '@/components/legal/terms-of-service-content'

export const metadata: Metadata = {
  title: 'Términos de Servicio',
  description:
    'Términos de servicio de Nucleo Studio. Condiciones para el uso de nuestros servicios de posicionamiento y contenido B2B.',
  robots: {
    index: true,
    follow: true,
  },
}

interface TermsOfServicePageProps {
  params: Promise<{ locale: string }>
}

export default async function TermsOfServicePage({ params }: TermsOfServicePageProps) {
  await params

  return (
    <>
      <Header />
      <main className="relative bg-nucleo-dark min-h-screen">
        <TermsOfServiceContent />
      </main>
      <Footer />
    </>
  )
}

