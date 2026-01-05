'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import Image from 'next/image'
import { FadeIn } from '@/components/motion/fade-in'
import { CalButton } from '@/components/ui/cal-button'

function renderComparisonTitleWithHighlight(title: string, locale: string) {
  // Texto a resaltar según el idioma
  const highlightTexts = locale === 'es' 
    ? ['tus contenidos cada mes']
    : ['your content every month']
  
  const parts: Array<{ text: string; highlight: boolean }> = []
  let lastIndex = 0
  
  // Encontrar todas las coincidencias
  const matches: Array<{ start: number; end: number; text: string }> = []
  
  highlightTexts.forEach((highlightText) => {
    const regex = new RegExp(highlightText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')
    let match
    while ((match = regex.exec(title)) !== null) {
      matches.push({
        start: match.index,
        end: match.index + match[0].length,
        text: match[0] // Preservar el caso original
      })
    }
  })
  
  // Ordenar matches por posición
  matches.sort((a, b) => a.start - b.start)
  
  // Crear partes del texto
  matches.forEach((match) => {
    if (lastIndex < match.start) {
      parts.push({
        text: title.substring(lastIndex, match.start),
        highlight: false,
      })
    }
    parts.push({
      text: match.text,
      highlight: true,
    })
    lastIndex = match.end
  })
  
  if (lastIndex < title.length) {
    parts.push({
      text: title.substring(lastIndex),
      highlight: false,
    })
  }
  
  if (parts.length === 0) {
    return title
  }
  
  return (
    <>
      {parts.map((part, index) => 
        part.highlight ? (
          <span key={index} className="text-nucleo-highlight font-geist-black" style={{ fontWeight: 900 }}>{part.text}</span>
        ) : (
          <span key={index}>{part.text}</span>
        )
      )}
    </>
  )
}

export function ComparisonSection() {
  const t = useTranslations('pricing.afterEstrategia')
  const locale = useLocale()
  const [isMonthly, setIsMonthly] = useState(false) // false = quarterly (default), true = monthly

  const planIds = ['starter', 'pro', 'fractional'] as const
  const categoryIds = ['estrategia', 'ejecucion', 'operaciones'] as const

  const getPlanData = (planId: typeof planIds[number]) => ({
    name: t(`plans.${planId}.name`),
    description: t(`plans.${planId}.description`),
    price: isMonthly 
      ? t(`plans.${planId}.priceMonthly`)
      : t(`plans.${planId}.priceQuarterly`),
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
    <section id="comparison-section" className="section-layout">
      <div className="section-container">
        {/* Tagline con isotipo */}
        <FadeIn delay={0}>
          <div className="flex items-center justify-center gap-2 text-nucleo-secondary mb-4">
            <Image
              src="/images/isotipo_detail.svg"
              alt="Detalle isotipo decorativo"
              width={26}
              height={25}
              className="h-3 w-3 sm:h-5 sm:w-5"
              priority
              unoptimized
            />
            <span className="tagline-secondary">
              {t('tagline')}
            </span>
          </div>
        </FadeIn>

        {/* Title */}
        <FadeIn delay={0.1}>
          <div className="text-center mb-8">
            <h2 className="section-title mb-8 whitespace-pre-line">
              {renderComparisonTitleWithHighlight(t('title'), locale)}
            </h2>
            
            {/* Pricing Toggle */}
            <div className="flex items-center justify-center gap-4">
              <span className={`font-geist-regular text-base transition-colors ${!isMonthly ? 'text-nucleo-light' : 'text-nucleo-dark-hover-light'}`}>
                {t('quarterlyLabel')}
              </span>
              <button
                onClick={() => setIsMonthly(!isMonthly)}
                className="relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-nucleo-highlight focus:ring-offset-2"
                style={{
                  backgroundColor: isMonthly ? '#6F31FF' : '#3F3F50',
                }}
                role="switch"
                aria-checked={isMonthly}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    isMonthly ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`font-geist-regular text-base transition-colors ${isMonthly ? 'text-nucleo-light' : 'text-nucleo-dark-hover-light'}`}>
                {t('monthlyLabel')}
              </span>
            </div>
          </div>
        </FadeIn>

        {/* Plan Headers */}
          {/* Desktop version with empty first column */}
          <div className="hidden md:grid md:grid-cols-4 border border-nucleo-dark-border rounded-2xl mb-0 overflow-hidden">
            <div className="p-6 border-r border-nucleo-dark-border flex items-start">
              <h4 className="font-geist-semibold text-lg text-nucleo-light">
                {t('featuresLabel')}
              </h4>
            </div> {/* Features header */}
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
                    <CalButton
                      className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium text-nucleo-light transition-all hover:opacity-90 w-full cursor-pointer"
                      style={{
                        background: '#6F31FF',
                      }}
                    >
                      {plan.cta}
                    </CalButton>
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
                    <p className="font-geist-regular text-base text-nucleo-dark-hover-light mb-4 leading-relaxed">
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
                    <CalButton
                      className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium text-nucleo-light transition-all hover:opacity-90 w-full cursor-pointer"
                      style={{
                        background: '#6F31FF',
                      }}
                    >
                      {plan.cta}
                    </CalButton>
                  </div>
                </div>
              )
            })}
          </div>

        {/* Comparison Table - Desktop only */}
        <div className="hidden md:block space-y-12 mt-6">
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
                  <div className="border border-nucleo-dark-border rounded-2xl overflow-hidden">
                    {features.map((featureId, featureIndex) => {
                      const feature = getFeatureData(categoryId, featureId)
                      const isLastFeature = featureIndex === features.length - 1
                      
                      return (
                        <div
                          key={featureId}
                          className={`grid grid-cols-4 border-b border-nucleo-dark-border ${isLastFeature ? 'border-b-0' : ''}`}
                        >
                          {/* Feature Name */}
                          <div className={`p-4 border-r border-nucleo-dark-border font-geist-regular text-base text-nucleo-light bg-nucleo-dark-tertiary ${featureIndex === 0 ? 'rounded-tl-2xl' : ''} ${isLastFeature ? 'rounded-bl-2xl' : ''}`}>
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

        {/* Subtext with link */}
        <FadeIn delay={0.5}>
          <div className="text-left mt-12 md:mt-16">
            <p className="font-geist-regular text-base text-nucleo-dark-hover-light">
              {(() => {
                const subtext = t('subtext')
                const linkText = t('subtextLink')
                const linkUrl = t('subtextLinkUrl')
                const parts = subtext.split(linkText)
                
                if (parts.length === 2) {
                  return (
                    <>
                      {parts[0]}
                      <a
                        href={linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-geist-super text-nucleo-light hover:text-nucleo-highlight transition-colors underline"
                      >
                        {linkText}
                      </a>
                      {parts[1]}
                    </>
                  )
                }
                return subtext
              })()}
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

