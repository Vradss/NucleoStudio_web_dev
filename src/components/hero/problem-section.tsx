import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { FadeIn } from '@/components/motion/fade-in'

export async function ProblemSection() {
  const t = await getTranslations('problem')
  const points = ['one', 'two', 'three'] as const

  return (
    <section className="relative bg-[#0A0A0A] text-[#F7F6F3] py-16 px-6 lg:px-24 lg:py-24">
      <div className="mx-auto max-w-7xl text-center">
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
          <h3 className="mx-auto mt-6 max-w-5xl text-[32px] font-artifictrial-regular leading-tight text-[#F7F6F3] sm:text-4xl">
          <span className="font-artifictrial-super text-[32px] sm:text-4xl">{t('highlight')}</span>
          {t('titleRest')}
        </h3>
        </FadeIn>
        <FadeIn delay={0.2}>
        <p className="heading-subtitle mt-6 text-base sm:text-lg ">{t('subtitle')}</p>
        </FadeIn>

        <div className="mt-12 grid gap-8 text-left sm:grid-cols-3">
          {points.map((point, index) => (
            <FadeIn key={point} delay={0.3 + index * 0.1}>
            <div
                className="problem-card group flex h-[250px] flex-col items-center justify-center rounded-3xl border border-[#1E1E1E] bg-[#101010] p-6 text-center shadow-sm"
            >
              <Image
                src="/images/plus_card.svg"
                alt="Ver más"
                width={24}
                height={24}
                  className="transition duration-300 group-hover:scale-110 rotate-45"
              />
                <p className="mt-8 font-artifictrial-regular text-base text-[#F7F6F3]">
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


