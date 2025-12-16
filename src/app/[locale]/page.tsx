import { HeroSection } from '@/components/hero/hero-section'
import { ProblemSection } from '@/components/hero/problem-section'
import { NivelesMensajesSection } from '@/components/hero/niveles-mensajes-section'
import { Header } from '@/components/layout/header'
import ScrollHorizontal from '@/components/hero/scroll-horizontal'
import { MetodologiaSection } from '@/components/hero/metodologia-section'
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
        <NivelesMensajesSection />
        <ScrollHorizontal />
        <MetodologiaSection />
        <TestimonialsSection />
        <FaqsSection />
      </main>
      <Footer />
    </>
  )
}

