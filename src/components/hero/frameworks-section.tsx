'use client'

import Image from 'next/image'
import { FadeIn } from '@/components/motion/fade-in'
import { useTranslations } from 'next-intl'

export function FrameworksSection() {
  const t = useTranslations('frameworks')

  return (
    <section className="section-layout">
      <div className="section-container">
        <FadeIn delay={0}>
          <div className="flex items-center justify-left gap-2 mb-4">
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
              {t('label')}
            </span>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="section-title mx-auto max-w-4xl text-left">
            {t('title')}
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="mt-12 flex justify-center">
            <Image
              src="/images/framework.png"
              alt="Frameworks"
              width={900}
              height={720}
              unoptimized
            />
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

