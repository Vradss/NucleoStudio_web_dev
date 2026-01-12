import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { HeroSection } from '@/components/hero/hero-section'
import { ProblemSection } from '@/components/hero/problem-section'
import { NivelesMensajesSection } from '@/components/hero/niveles-mensajes-section'
import { Header } from '@/components/layout/header'
import ScrollHorizontal from '@/components/hero/scroll-horizontal'
import { MetodologiaSection } from '@/components/hero/metodologia-section'
import { TestimonialsSection } from '@/components/hero/testimonials-section'
import { TimelineProcessSection } from '@/components/hero/timeline-process-section'
import { FaqsSection } from '@/components/hero/faqs-section'
import { Footer } from '@/components/layout/footer'
import { ScrollColorSections } from '@/components/hero/scroll-color-transition'

// Lazy load componentes pesados
const UnicornEmbed = dynamic(
  () => import('@/components/hero/unicorn-embed').then((mod) => mod.UnicornEmbed),
  {
    ssr: false,
    loading: () => null, // No mostrar nada mientras carga
  }
)

export const metadata: Metadata = {
  title: 'Nucleo Studio | Posicionamiento y Contenido para Empresas Tech B2B',
  description:
    'Ayudamos a empresas tech B2B a clarificar sus propuestas de valor, crear mensajes diferenciados y expandirlos en web, LinkedIn y estrategia de contenido. Empresas de tecnología y SaaS en LatAm confían en nosotros.',
  openGraph: {
    title: 'Nucleo Studio | Posicionamiento y Contenido B2B',
    description:
      'Clarificamos tu propuesta de valor y creamos mensajes diferenciados para empresas tech B2B.',
  },
}

// Transiciones de color basadas en secciones
const colorTransitions = [
  {
    // Oscuro → Blanco cuando entra ScrollHorizontal
    triggerSelector: '#solucion',
    toColor: '#FFFFFA',
    start: 'top 80%',
    end: 'top 30%',
  },
]

export default function Home() {
  return (
    <div className="relative bg-[#17171A]" suppressHydrationWarning>
      {/* UnicornEmbed fijo como fondo global */}
      <Suspense fallback={<div className="fixed inset-0 z-0 bg-[#17171A]" />}>
        <UnicornEmbed
          className="fixed inset-0 z-0"
        />
      </Suspense>

      <div className="relative z-10" suppressHydrationWarning>
        <Header />
        <HeroSection />

        {/* Main con fondo blanco para tapar el UnicornEmbed */}
        <main className="relative bg-white">
          <ProblemSection />

          {/* Secciones con transición de color animada */}
          <ScrollColorSections initialColor="#17171A" transitions={colorTransitions}>
            <NivelesMensajesSection />
            <ScrollHorizontal />
            <MetodologiaSection />
          </ScrollColorSections>

          <TestimonialsSection />
          <TimelineProcessSection />
          <FaqsSection faqIds={[11, 3, 5, 6, 7, 8, 10] as const} />
        </main>
        <Footer />
      </div>
    </div>
  )
}

