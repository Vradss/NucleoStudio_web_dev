import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { FadeIn } from '@/components/motion/fade-in'

export async function MarketingThinkingSection() {
  const t = await getTranslations('marketingThinking')

  return (
    <section className="py-16 lg:py-24 px-4 lg:px-6" style={{ backgroundColor: '#FFFFFA' }}>
      <div className="container mx-auto max-w-6xl">
        <FadeIn delay={0}>
          <div 
            className="rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(to bottom, #1A0B33 0%, #000000 100%)',
            }}
          >
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-6 items-center">
              {/* Left Panel - Logo and Text */}
              <div className="relative flex flex-col p-6 lg:p-8 lg:min-h-[400px]">
                {/* Logo en esquina superior izquierda */}
                <div className="flex justify-end mb-8">
                  <Image
                    src="/images/marketing_thinking.svg"
                    alt="Marketing Thinking Logo"
                    width={120}
                    height={60}
                    className="h-8 lg:h-12 w-auto"
                    unoptimized
                  />
                </div>
                
                {/* Texto principal - grande y destacado, centrado verticalmente */}
                <div className="flex-1 flex items-center mb-8">
                  <h2 className="text-nucleo-light text-2xl lg:text-5xl xl:text-[42px] font-geist-semibold leading-tight">
                    {t('title')}
                  </h2>
                </div>
                
                {/* CTA con gradiente del hero */}
                <div className="flex justify-start">
                  <a
                    href="https://marketingthinking.co/podcast/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold text-nucleo-light transition-all hover:opacity-90"
                    style={{
                      background: 'linear-gradient(135deg, #6F31FF 50%, #5F20E5 75%, #1A0B33 100%)',
                    }}
                  >
                    {t('learnMore')}
                  </a>
                </div>
              </div>

              {/* Right Panel - Image */}
              <div className="flex items-center justify-center lg:justify-center">
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
