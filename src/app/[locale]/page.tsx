import { HeroSection } from '@/components/hero/hero-section'
import { ProblemSection } from '@/components/hero/problem-section'
import { Header } from '@/components/layout/header'
import { FrameworksSection } from '@/components/hero/frameworks-section'
import { JeffersonTestimonialSection } from '@/components/hero/jefferson-testimonial-section'
import ScrollHorizontal from '@/components/hero/scroll-horizontal'
import { TestimonialsSection } from '@/components/hero/testimonials-section'
import { FaqsSection } from '@/components/hero/faqs-section'
import { Footer } from '@/components/layout/footer'
import { SectionsEmbed } from '@/components/hero/sections-embed'
import { CharacterHighlight } from '@/components/hero/character-highlight'

export default function Home() {
  return (
    <>
      <Header />
      <main className="relative">
        <HeroSection />
        <ProblemSection />
        <SectionsEmbed>
          <CharacterHighlight />
        </SectionsEmbed>
        <ScrollHorizontal />
        <TestimonialsSection />
        <FaqsSection />
      </main>
      <Footer />
    </>
  )
}

