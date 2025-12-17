import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { FadeIn } from '@/components/motion/fade-in'

export async function ProblemSection() {
  const t = await getTranslations('problem')
  const points = ['one', 'two', 'three'] as const

  return (
    <section className="section-layout relative z-20 lg:min-h-[100vh] flex flex-col">
      <div className="section-container text-center flex-1 flex flex-col justify-center">
        <FadeIn delay={0}>
        <div className="flex items-center justify-center gap-2">
          <Image
            src="/images/isotipo_detail.svg"
            alt="Detalle isotipo decorativo"
            width={26}
            height={25}
            className="h-4 w-4 sm:h-5 sm:w-5"
            priority
          />
          <span className="tagline-secondary">
              {t('label')}
          </span>
        </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h3 className="section-title mx-auto mt-4 max-w-8xl">
            <span className="block">{t('highlight')}</span>
            <span className="mt-4 block whitespace-pre-line font-geist-light text-xl sm:text-2xl lg:text-[32px] text-nucleo-light">
              {t('titleRest').replace(/\/n\/n/g, '\n').replace(/\/n/g, '\n').replace(/^\s*\n+/, '').trim()}
            </span>
          </h3>
        </FadeIn>
        <div className="mt-12 sm:mt-16 lg:mt-24 grid gap-6 sm:gap-8 text-left sm:grid-cols-3">
          {points.map((point, index) => (
            <FadeIn key={point} delay={0.3 + index * 0.1}>
            {/* Card: HEIGHT FIJO h-[250px] = 250px */}
            <div
                className="problem-card flex min-h-[200px] sm:h-[250px] flex-col items-center justify-center rounded-3xl border border-nucleo-dark-secondary bg-nucleo-dark-tertiary p-4 sm:p-6 text-center shadow-sm"
            >
              {/* Icono: h-8 (32px) en móvil, h-11 (44px) en desktop */}
              <div className="relative h-8 w-8 sm:h-11 sm:w-11">
                <Image
                  src={t(`icons.${point}`)}
                  alt="Icono de problema"
                  fill
                  className="object-contain"
                />
              </div>
                <p className="mt-6 sm:mt-8 text-card-title">
                {t(`points.${point}`)}
              </p>
            </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}


