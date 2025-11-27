import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

const cardConfigs = [
  {
    key: 'stage1',
    imageSrc: '/images/cards_step1.png',
    imageWidth: 960,
    imageHeight: 720,
  },
  {
    key: 'stage2',
    imageSrc: '/images/cards_step1.png',
    imageWidth: 960,
    imageHeight: 700,
  },
  {
    key: 'stage3',
    imageSrc: '/images/cards_step1.png',
    imageWidth: 960,
    imageHeight: 700,
  },
  {
    key: 'stage4',
    imageSrc: '/images/cards_step1.png',
    imageWidth: 960,
    imageHeight: 700,
  },
] as const

type StepCard = (typeof cardConfigs)[number]

export async function StepSection() {
  const t = await getTranslations('steps')

  function renderCard(card: StepCard) {
    return (
      <div
        key={card.key}
        className="grid gap-6 rounded-2xl border border-white/10 bg-[#050505] p-5 shadow-[0_20px_80px_rgba(0,0,0,0.45)] sm:gap-10 sm:rounded-3xl sm:p-8 lg:grid-cols-[1.2fr,1fr] lg:items-center lg:p-10"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-black sm:aspect-[16/10] lg:aspect-auto">
          <Image
            src={card.imageSrc}
            alt={t(`cards.${card.key}.imageAlt`)}
            width={card.imageWidth}
            height={card.imageHeight}
            className="h-full w-full object-cover"
            loading="lazy"
            sizes="(min-width: 1280px) 640px, (min-width: 1024px) 50vw, 100vw"
          />
        </div>

        <div className="text-base sm:text-lg">
          <p className="font-space-mono text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-[#C3BDFF] sm:text-xs">
            {t(`cards.${card.key}.label`)}
          </p>
          <h4 className="font-artifictrial-semibold mt-3 text-2xl leading-tight text-white sm:mt-4 sm:text-3xl lg:text-4xl">
            {t(`cards.${card.key}.title`)}
          </h4>
          <p className="heading-subtitle mt-3 text-sm text-[#CFCFCF] sm:mt-4 sm:text-base">
            {t(`cards.${card.key}.subtitle`)}
          </p>
        </div>
      </div>
    )
  }

  return (
    <section className="bg-[#0A0A0A] py-16 text-[#F7F6F3] sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-6xl px-6 text-left sm:px-8 lg:px-10">
        <h3 className="max-w-4xl text-xl font-semibold leading-tight sm:max-w-5xl sm:text-3xl lg:text-4xl">
          {t('titleLine1')}
          <br />
          {t('titleLine2')}
        </h3>

        <div className="mt-10 flex flex-col gap-8 sm:mt-16 sm:gap-10">{cardConfigs.map(renderCard)}</div>
      </div>
    </section>
  )
}


