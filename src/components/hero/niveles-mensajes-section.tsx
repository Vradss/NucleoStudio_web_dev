import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { FadeIn } from '@/components/motion/fade-in'

export async function NivelesMensajesSection() {
  const t = await getTranslations('nivelesMensajes')
  const benefits = ['one', 'two', 'three'] as const

  return (
    <section className="section-layout relative z-20">
      <div className="section-container text-left">
        <FadeIn delay={0}>
          <h2 className="section-title max-w-7xl">
            {t('title')}
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="mt-6 max-w-7xl font-geist-regular text-lg text-nucleo-light/80 sm:text-xl">
            {t('subtitle')}
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="mt-12 flex justify-center">
            <div className="max-w-5xl w-full">
              <Image
                src="/images/niveles_claridad.svg"
                alt="Niveles de claridad"
                width={1100}
                height={519}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={0.3}>
          <h3 className="mt-12 max-w-7xl font-geist-regular text-xl text-nucleo-light sm:text-xl">
            {t('benefitsTitle')}
          </h3>
        </FadeIn>
        <div className="mt-12 grid gap-6 text-left sm:grid-cols-3">
          {benefits.map((benefit, index) => (
            <FadeIn key={benefit} delay={0.4 + index * 0.1}>
              <div className="problem-card flex h-[200px] flex-col items-start justify-start rounded-3xl border border-nucleo-dark-secondary bg-nucleo-dark-tertiary p-6 text-left shadow-sm">
                {/* Icono: h-8 (32px) en móvil, h-10 (40px) en desktop */}
                <div className="relative h-8 w-8 sm:h-10 sm:w-10">
                  <Image
                    src={t(`icons.${benefit}`)}
                    alt={t(`benefits.${benefit}.alt`)}
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="mt-6 font-geist-regular text-base text-nucleo-light sm:text-xl">
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

