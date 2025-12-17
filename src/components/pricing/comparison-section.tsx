'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { FadeIn } from '@/components/motion/fade-in'

export function ComparisonSection() {
  const t = useTranslations('pricing.afterEstrategia')

  const planIds = ['starter', 'pro', 'fractional'] as const
  const categoryIds = ['estrategia', 'ejecucion', 'operaciones'] as const

  const getPlanData = (planId: typeof planIds[number]) => ({
    name: t(`plans.${planId}.name`),
    description: t(`plans.${planId}.description`),
    price: t(`plans.${planId}.price`),
    priceSubtext: t(`plans.${planId}.priceSubtext`),
    cta: t(`plans.${planId}.cta`),
    ctaLink: t(`plans.${planId}.ctaLink`),
  })

  const getFeatureData = (categoryId: typeof categoryIds[number], featureId: string) => {
    const featurePath = `categories.${categoryId}.features.${featureId}`
    const featureRaw = t.raw(featurePath)
    
    return {
      name: t(`${featurePath}.name`),
      starter: featureRaw?.starter || null,
      pro: featureRaw?.pro || null,
      fractional: featureRaw?.fractional || null,
    }
  }

  // Helper to render checkmark or dash
  const renderFeature = (value: string | null) => {
    // Empty string means checkmark only (like fractional for solicitudes)
    if (value === null) {
      return (
        <div className="flex items-center justify-center">
          <span className="text-nucleo-dark-hover-light">—</span>
        </div>
      )
    }

    // Empty string means just checkmark, no text
    if (value === '') {
      return (
        <div className="flex items-center justify-center">
          <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 8L6 11L13 4"
                stroke="#C3BDFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      )
    }

    return (
      <div className="flex items-start gap-2">
        <div className="flex-shrink-0 mt-0.5 w-5 h-5 flex items-center justify-center">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 8L6 11L13 4"
              stroke="#C3BDFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span className="font-geist-regular text-sm text-nucleo-dark-hover-light leading-relaxed">
          {value}
        </span>
      </div>
    )
  }

  return (
    <section className="section-layout">
      <div className="section-container">
        {/* Title */}
        <FadeIn delay={0.1}>
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">
              {t('title')}
            </h2>
          </div>
        </FadeIn>

        {/* Plan Headers */}
        <FadeIn delay={0.2}>
          {/* Desktop version with empty first column */}
          <div className="hidden md:grid md:grid-cols-4 border border-nucleo-dark-border mb-0">
            <div className="p-6 border-r border-nucleo-dark-border"></div> {/* Empty cell for feature names */}
            {planIds.map((planId, index) => {
              const plan = getPlanData(planId)
              const isLast = index === planIds.length - 1
              return (
                <div 
                  key={planId} 
                  className={`text-left p-6 flex flex-col justify-between ${!isLast ? 'border-r border-nucleo-dark-border' : ''}`}
                >
                  <div>
                    <h3 className="font-geist-super text-2xl mb-3 text-nucleo-light">
                      {plan.name}
                    </h3>
                    <p className="font-geist-regular text-sm text-nucleo-dark-hover-light mb-4 leading-relaxed">
                      {plan.description}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2 mb-6">
                      <span className="font-geist-semibold text-[42px] text-nucleo-light">
                        {plan.price}
                      </span>
                      {plan.priceSubtext && (
                        <span className="font-geist-regular text-base text-nucleo-dark-hover-light">
                          {plan.priceSubtext}
                        </span>
                      )}
                    </div>
                    <Link
                      href={plan.ctaLink}
                      className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium text-nucleo-light transition-all hover:opacity-90 w-full"
                      style={{
                        background: '#6F31FF',
                      }}
                    >
                      {plan.cta}
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Mobile version - only plans, no first column */}
          <div className="grid grid-cols-1 md:hidden gap-6">
            {planIds.map((planId) => {
              const plan = getPlanData(planId)
              return (
                <div 
                  key={planId} 
                  className="text-left p-6 border border-nucleo-dark-border rounded-2xl flex flex-col justify-between bg-nucleo-dark-tertiary"
                >
                  <div>
                    <h3 className="font-geist-super text-2xl mb-3 text-nucleo-light">
                      {plan.name}
                    </h3>
                    <p className="font-geist-regular text-sm text-nucleo-dark-hover-light mb-4 leading-relaxed">
                      {plan.description}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2 mb-6">
                      <span className="font-geist-semibold text-[42px] text-nucleo-light">
                        {plan.price}
                      </span>
                      {plan.priceSubtext && (
                        <span className="font-geist-regular text-base text-nucleo-dark-hover-light">
                          {plan.priceSubtext}
                        </span>
                      )}
                    </div>
                    <Link
                      href={plan.ctaLink}
                      className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium text-nucleo-light transition-all hover:opacity-90 w-full"
                      style={{
                        background: '#6F31FF',
                      }}
                    >
                      {plan.cta}
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </FadeIn>

        {/* Comparison Table - Desktop only */}
        <FadeIn delay={0.3}>
          <div className="hidden md:block space-y-12">
            {categoryIds.map((categoryId, categoryIndex) => {
              const categoryName = t(`categories.${categoryId}.name`)
              
              // Get feature IDs for this category
              const featuresRaw = t.raw(`categories.${categoryId}.features`)
              const features = featuresRaw && typeof featuresRaw === 'object' 
                ? Object.keys(featuresRaw) 
                : []

              return (
                <div key={categoryId}>
                  {/* Category Header */}
                  <h4 className="font-geist-semibold text-lg text-nucleo-light mb-6">
                    {categoryName}
                  </h4>

                  {/* Features */}
                  <div className="border-l border-r border-b border-nucleo-dark-border">
                    {features.map((featureId, featureIndex) => {
                      const feature = getFeatureData(categoryId, featureId)
                      const isLastFeature = featureIndex === features.length - 1
                      
                      return (
                        <div
                          key={featureId}
                          className={`grid grid-cols-4 border-b border-nucleo-dark-border ${isLastFeature ? 'border-b-0' : ''}`}
                        >
                          {/* Feature Name */}
                          <div className="p-4 border-r border-nucleo-dark-border font-geist-regular text-base text-nucleo-light bg-nucleo-dark-tertiary">
                            {feature.name}
                          </div>

                          {/* Plan Values */}
                          <div className="p-4 border-r border-nucleo-dark-border flex items-start">
                            {renderFeature(typeof feature.starter === 'string' ? feature.starter : null)}
                          </div>
                          <div className="p-4 border-r border-nucleo-dark-border flex items-start">
                            {renderFeature(typeof feature.pro === 'string' ? feature.pro : null)}
                          </div>
                          <div className="p-4 flex items-start">
                            {renderFeature(typeof feature.fractional === 'string' ? feature.fractional : null)}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

