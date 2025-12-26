'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { FadeIn } from '@/components/motion/fade-in'

function TitleWithDisabledWord({ title }: { title: string }) {
  // Buscar la palabra "complejos" para desactivarla (case insensitive)
  const wordToDisable = 'complejos'
  const regex = new RegExp(wordToDisable.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')
  const match = regex.exec(title)

  if (match) {
    const before = title.substring(0, match.index)
    const word = match[0] // Preservar el caso original
    const after = title.substring(match.index + match[0].length)

    return (
      <h2 className="section-title max-w-7xl">
        {before}
        <span className="text-nucleo-dark-hover-light">
          {word}
        </span>
        {after}
      </h2>
    )
  }

  return <h2 className="section-title max-w-6xl">{title}</h2>
}

export function NivelesMensajesSection() {
  const t = useTranslations('nivelesMensajes')
  const benefits = ['one', 'two', 'three'] as const
  const title = t('title')

  return (
    <section className="section-layout relative z-20">
      <div className="section-container text-left">
        <FadeIn delay={0}>
          <TitleWithDisabledWord title={title} />
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="mt-6 max-w-6xl font-geist-light text-base text-nucleo-light/80 sm:text-lg whitespace-pre-line leading-normal">
            {t('subtitle')}
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="mt-12 flex justify-center">
            <div className="max-w-5xl w-full">
              {/* Imagen para mobile */}
              <Image
                src="/images/NIVELES_MOBILE.svg"
                alt="Niveles de claridad"
                width={1100}
                height={519}
                className="w-full h-auto md:hidden"
                priority
              />
              {/* Imagen para desktop */}
              <Image
                src="/images/niveles_msj.svg"
                alt="Niveles de claridad"
                width={1100}
                height={519}
                className="hidden md:block w-full h-auto"
                priority
              />
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={0.3}>
          <h3 className="mt-12 max-w-7xl font-geist-regular text-[18px] text-nucleo-light sm:text-lg">
            {t('benefitsTitle')}
          </h3>
        </FadeIn>
        <div className="mt-12 grid gap-6 text-left sm:grid-cols-3">
          {benefits.map((benefit, index) => (
            <FadeIn key={benefit} delay={0.4 + index * 0.1}>
              <div className="problem-card flex min-h-[140px] sm:h-[165px] flex-col items-start justify-between rounded-3xl border border-nucleo-dark-secondary bg-nucleo-dark-tertiary p-4 sm:p-6 text-left shadow-sm">
                {/* Icono: h-8 (32px) en móvil, h-10 (40px) en desktop */}
                <div className="relative h-8 w-8 sm:h-8 sm:w-10 mb-3 sm:mb-4">
                  <Image
                    src={t(`icons.${benefit}`)}
                    alt={t(`benefits.${benefit}.alt`)}
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="font-geist-regular text-base text-nucleo-light sm:text-lg whitespace-pre-line">
                  {t(`benefits.${benefit}.text`)}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

