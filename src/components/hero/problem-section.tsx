import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { FadeIn } from '@/components/motion/fade-in'

export async function ProblemSection() {
  const t = await getTranslations('problem')
  const points = ['one', 'two', 'three'] as const

  return (
    <section className="relative z-20 bg-[#0A0A0A] text-[#F7F6F3] py-16 px-6 lg:px-24 lg:py-24">
      <div className="mx-auto max-w-7xl text-center py-10">
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
          <span className="font-space-mono text-xs tracking-[0.3em] uppercase text-[#C3BDFF]">
              {t('label')}
          </span>
        </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h3 className="mx-auto mt-4 max-w-8xl text-[32px] font-artifictrial-regular leading-tight text-[#F7F6F3] sm:text-4xl lg:text-5xl">
            <span className="font-artifictrial-semibold text-[#F7F6F3] text-[32px] sm:text-4xl lg:text-5xl block">{t('highlight')}</span>
            <span className="block whitespace-pre-line font-artifictrial-semibold sm:text-5xl">
              {t('titleRest').replace(/\/n\/n/g, '\n').replace(/\/n/g, '\n').replace(/^\s*\n+/, '').trim()}
            </span>
          </h3>
        </FadeIn>
        <div className="mt-24 grid gap-8 text-left sm:grid-cols-3">
          {points.map((point, index) => (
            <FadeIn key={point} delay={0.3 + index * 0.1}>
            {/* Card: HEIGHT FIJO h-[250px] = 250px */}
            <div
                className="problem-card group flex h-[250px] flex-col items-center justify-center rounded-3xl border border-[#1E1E1E] bg-[#101010] p-6 text-center shadow-sm"
            >
              {/* Icono: h-8 (32px) en móvil, h-11 (44px) en desktop */}
              <div className="relative h-8 w-8 sm:h-11 sm:w-11">
                <Image
                  src={t(`icons.${point}`)}
                  alt="Icono de problema"
                  fill
                  className="object-contain transition duration-300 group-hover:scale-110"
                />
              </div>
                <p className="mt-8 font-artifictrial-regular text-xl text-[#F7F6F3]">
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


