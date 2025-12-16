'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { FadeIn } from '@/components/motion/fade-in'
import { UnicornEmbed } from './unicorn-embed'

export function JeffersonTestimonialSection() {
  const t = useTranslations('testimonials.testimonial1')

  return (
    <section className="relative min-h-screen overflow-hidden flex items-center justify-center">
      <UnicornEmbed 
        projectId="QxaWWtJXzz6UPXFpnDbs"
        className="fixed inset-0 z-0"
        style={{
          width: '100vw',
          height: '100vh',
        }}
      />
      <div className="section-container relative z-10">
        <FadeIn delay={0}>
          <div className="text-center text-nucleo-light">
            <p className="font-geist-regular text-lg sm:text-xl lg:text-2xl leading-relaxed mb-8 whitespace-pre-line">
              {t('quote').replace(/\/n\/n/g, '\n\n')}
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="relative h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src="/images/jeferson_leguia.png"
                  alt="Jefferson Leguía"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-left">
                <p className="font-geist-semibold uppercase text-base sm:text-lg text-nucleo-light lg:text-xl">
                  {t('name')}
                </p>
                <p className="font-geist-regular uppercase text-sm sm:text-base text-nucleo-light-opacity-80 mt-2 lg:text-lg">
                  {t('position')}
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

