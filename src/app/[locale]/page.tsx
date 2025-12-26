import { HeroSection } from '@/components/hero/hero-section'
import { ProblemSection } from '@/components/hero/problem-section'
import { NivelesMensajesSection } from '@/components/hero/niveles-mensajes-section'
import { Header } from '@/components/layout/header'
import ScrollHorizontal from '@/components/hero/scroll-horizontal'
import { MetodologiaSection } from '@/components/hero/metodologia-section'
import { TestimonialsSection } from '@/components/hero/testimonials-section'
import { FaqsSection } from '@/components/hero/faqs-section'
import { Footer } from '@/components/layout/footer'
import { UnicornEmbed } from '@/components/hero/unicorn-embed'

export default function Home() {
  return (
    <div className="relative">
      {/* UnicornEmbed fijo como fondo global */}
      <UnicornEmbed
        projectId="mebwhEqAY4unIkmgWtfB"
        className="fixed inset-0 z-0"
        style={{
          width: '100%',
          height: '100%',
        }}
      />

      <div className="relative z-10">
        <Header />
        <HeroSection />

        {/* Main con fondo blanco para tapar el UnicornEmbed */}
        <main className="relative bg-white">
          <ProblemSection />
          <NivelesMensajesSection />
          <ScrollHorizontal />
          <MetodologiaSection />
          <TestimonialsSection />
          <FaqsSection />
        </main>
        <Footer />
      </div>
    </div>
  )
}

