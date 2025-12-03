'use client'

import Image from 'next/image'
import { FadeIn } from '@/components/motion/fade-in'
import { useTranslations } from 'next-intl'

export function FrameworksSection() {
  const t = useTranslations('frameworks')

  return (
    <section className="relative bg-[#0A0A0A] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn delay={0}>
          <div className="flex items-center justify-left gap-2">
            <Image
              src="/images/isotipo_detail.svg"
              alt="Detalle isotipo decorativo"
              width={26}
              height={25}
              className="h-4 w-4 sm:h-5 sm:w-5"
              priority
            />
            <span className="font-space-mono text-xs tracking-[0.3em] uppercase text-[#C3BDFF]">
              {t('label')}
            </span>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="mx-auto mt-6 max-w-4xl text-left font-artifictrial-regular text-[32px] leading-tight text-[#F7F6F3] sm:text-4xl">
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
            />
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

