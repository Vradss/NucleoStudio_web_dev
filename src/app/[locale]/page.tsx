import { HeroSection } from '@/components/hero/hero-section'
import { CompaniesSection } from '@/components/hero/companies-section'
import { ProblemSection } from '@/components/hero/problem-section'
import { Header } from '@/components/layout/header'
import { FrameworksSection } from '@/components/hero/frameworks-section'
import ScrollHorizontal from '@/components/hero/scroll-horizontal'
import { TestimonialsSection } from '@/components/hero/testimonials-section'
import { FaqsSection } from '@/components/hero/faqs-section'
import { Footer } from '@/components/layout/footer'

export default function Home() {
  return (
    <>
      <Header />
      <main className="relative">
        <HeroSection />
        <CompaniesSection />
        <ProblemSection />
        <FrameworksSection />
        <ScrollHorizontal />
        <TestimonialsSection />
        <FaqsSection />
      </main>
      <Footer />
    </>
  )
}

