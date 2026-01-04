import { getTranslations } from 'next-intl/server'
import { FadeIn } from '@/components/motion/fade-in'
import { CompaniesContent } from '@/components/hero/companies-section'

export async function CasesHero() {
  const t = await getTranslations('cases')

  return (
    <section className="relative min-h-[70vh] flex flex-col justify-center px-6 lg:px-24 py-24 lg:py-32">
      <div className="mx-auto max-w-5xl text-center mb-16">
        {/* Tagline */}
        <FadeIn>
          <span className="tagline-secondary mb-6 inline-block">
            {t('tagline')}
          </span>
        </FadeIn>

        {/* Title */}
        <FadeIn delay={0.1}>
          <h1 className="font-geist-bold text-4xl md:text-5xl lg:text-6xl text-nucleo-light leading-tight">
            {t('title')}
          </h1>
        </FadeIn>
      </div>

      {/* Companies Section */}
      <FadeIn delay={0.2}>
        <div className="container mx-auto">
          <CompaniesContent />
        </div>
      </FadeIn>
    </section>
  )
}
