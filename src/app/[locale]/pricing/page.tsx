import type { Metadata } from 'next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { PricingSection } from '@/components/pricing/pricing-section'
import { CompaniesSection } from '@/components/hero/companies-section'
import { ComparisonSection } from '@/components/pricing/comparison-section'
import { FaqsSection } from '@/components/hero/faqs-section'

export const metadata: Metadata = {
  title: 'Planes y Precios',
  description:
    'Planes de posicionamiento y contenido B2B: desde proyectos one-time hasta planes mensuales. Clarifica tu propuesta de valor, crea mensajes diferenciados y ejecuta contenido estratégico.',
  openGraph: {
    title: 'Planes y Precios | Nucleo Studio',
    description:
      'Planes de posicionamiento y contenido B2B: proyectos one-time y planes mensuales para clarificar tu propuesta de valor.',
  },
}

interface PricingPageProps {
  params: Promise<{ locale: string }>
}

export default async function PricingPage({ params }: PricingPageProps) {
  await params // Ensure params is awaited

  return (
    <>
      <Header />
      <main className="relative bg-nucleo-dark">
        <PricingSection />
        <CompaniesSection />
        <ComparisonSection />
        <FaqsSection />
      </main>
      <Footer />
    </>
  )
}


