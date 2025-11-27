import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { FadeSection } from '@/components/motion/fade-section'

export async function ProblemSection() {
  const t = await getTranslations('problem')
  const points = ['one', 'two', 'three'] as const

  return (
    <FadeSection className="section-spacing bg-[#0A0A0A] text-[#F7F6F3]">
      <div className="mx-auto max-w-5xl text-center">
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
            THE PROBLEM
          </span>
        </div>
        <h3 className="mx-auto mt-6 max-w-4xl text-xl font-artifictrial-regular leading-tight text-[#F7F6F3] sm:text-4xl">
          <span className="font-artifictrial-super">{t('highlight')}</span>
          {t('titleRest')}
        </h3>
        <p className="heading-subtitle mt-6 text-base sm:text-lg ">{t('subtitle')}</p>

        <div className="mt-12 grid gap-8 text-left sm:grid-cols-3">
          {points.map(point => (
            <div
              key={point}
              className="problem-card group flex flex-col items-center rounded-3xl border border-[#1F1F1F] bg-[#101010] p-6 text-center shadow-sm"
            >
              <Image
                src="/images/plus_card.svg"
                alt="Ver más"
                width={24}
                height={24}
                className="transition duration-300 group-hover:scale-110"
              />
              <p className="mt-4 font-artifictrial-regular text-base text-[#F7F6F3]">
                {t(`points.${point}`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </FadeSection>
  )
}


