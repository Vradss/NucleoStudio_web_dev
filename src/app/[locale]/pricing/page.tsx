import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { PricingSection } from '@/components/pricing/pricing-section'
import { ComparisonSection } from '@/components/pricing/comparison-section'
import { FaqsSection } from '@/components/hero/faqs-section'

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
        <ComparisonSection />
        <FaqsSection />
      </main>
      <Footer />
    </>
  )
}


