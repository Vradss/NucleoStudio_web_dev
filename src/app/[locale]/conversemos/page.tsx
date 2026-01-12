import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { CalEmbed } from '@/components/ui/cal-embed'
import { FadeIn } from '@/components/motion/fade-in'
import { CompaniesContent } from '@/components/hero/companies-section'
import { TestimonialsSection } from '@/components/hero/testimonials-section'
import { FaqsSection } from '@/components/hero/faqs-section'

export const metadata: Metadata = {
  title: 'Conversemos | Nucleo Studio',
  description:
    'Agenda una reunión con nosotros para ver si hacemos fit. Descubre cómo podemos ayudarte a clarificar tu propuesta de valor y crear mensajes diferenciados.',
}

interface ConversemosPageProps {
  params: Promise<{ locale: string }>
}

export default async function ConversemosPage({ params }: ConversemosPageProps) {
  const { locale } = await params
  const t = await getTranslations('hero')

  return (
    <div className="relative bg-nucleo-bg-dark min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12 lg:py-20 max-w-4xl">
        <div className="text-center mb-12">
          <FadeIn delay={0}>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Image
                src="/images/isotipo_detail.svg"
                alt="Detalle isotipo decorativo"
                width={26}
                height={25}
                className="h-4 w-4 sm:h-5 sm:w-5"
                priority
                unoptimized
              />
              <span className="tagline-secondary">
                {t('conversemosTagline')}
              </span>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="section-title text-nucleo-light mb-4">
              {t('conversemosTitle')}
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-6 mx-auto max-w-6xl font-geist-light text-base text-nucleo-light/80 sm:text-xl whitespace-pre-line leading-normal text-center">
              {t('conversemosSubtitle')}
            </p>
          </FadeIn>
        </div>
        <div className="mb-16">
          <CalEmbed />
        </div>
        <div className="mt-16">
          <CompaniesContent />
        </div>
      </main>
      <TestimonialsSection />
      <FaqsSection faqIds={[11, 3, 5, 6, 7, 8, 10] as const} />
      <Footer />
    </div>
  )
}
