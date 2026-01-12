import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { FadeIn } from '@/components/motion/fade-in'

export async function MarketingThinkingSection() {
  const t = await getTranslations('marketingThinking')

  return (
    <section className="py-16 lg:py-24 px-4 lg:px-6" style={{ backgroundColor: '#FFFFFA' }}>
      <div className="container mx-auto max-w-6xl">
        <FadeIn delay={0}>
          <div className="bg-nucleo-dark-secondary rounded-2xl overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Panel - Logo and Text */}
              <div className="flex flex-col p-8 pt-12 lg:p-12">
                <div className="flex items-start gap-4 mb-6">
                  <Image
                    src="/images/nucleo_logo/nucleo_logo_blanco.svg"
                    alt="Núcleo Logo"
                    width={120}
                    height={40}
                    className="h-14 w-auto"
                    unoptimized
                  />
                  <div className="flex items-start mt-10">
                    <span className="text-xs text-nucleo-secondary font-space-mono mt-4">
                      by
                    </span>
                    <Image
                      src="/images/marketing_thinking.svg"
                      alt="Marketing Thinking Logo"
                      width={120}
                      height={60}
                      className="h-16 w-auto"
                      unoptimized
                    />
                  </div>
                </div>
                <p className="text-base lg:text-lg text-nucleo-light leading-relaxed mt-12">
                  {t('description')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <a
                    href="https://marketingthinking.co/podcast/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-semibold text-nucleo-light transition-all hover:opacity-90 border border-nucleo-primary bg-transparent hover:bg-nucleo-primary/10"
                  >
                    {t('learnMore')}
                  </a>
                </div>
              </div>

              {/* Right Panel - Image */}
              <div className="flex items-center justify-center lg:justify-end">
                <div className="relative w-full max-w-lg">
                  <Image
                    src="/images/imagenes_banner.png"
                    alt={t('imageAlt')}
                    width={600}
                    height={400}
                    className="w-full h-auto object-contain"
                    unoptimized
                  />
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
