'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { FadeIn } from '@/components/motion/fade-in'
import Image from 'next/image'
import { CalButton } from '@/components/ui/cal-button'

interface PricingPlan {
  name: string
  pricePrefix: string
  price: string
  priceSubtext: string
  timeline: string
  description: string
  cta: string
  ctaLink: string
  features: string[]
  addons: string[]
}

export function PricingSection() {
  const t = useTranslations('pricing')

  const plans = ['starter', 'team', 'enterprise'] as const

  const getPlanData = (planId: typeof plans[number]): PricingPlan => {
    // Get features as raw object first
    const featuresRaw = t.raw(`plans.${planId}.features`)
    const features = Array.isArray(featuresRaw) ? featuresRaw : []
    
    // Get addons as raw object
    const addonsRaw = t.raw(`plans.${planId}.addons`)
    const addons = Array.isArray(addonsRaw) ? addonsRaw : []

    return {
      name: t(`plans.${planId}.name`),
      pricePrefix: t(`plans.${planId}.pricePrefix`),
      price: t(`plans.${planId}.price`),
      priceSubtext: t(`plans.${planId}.priceSubtext`),
      timeline: t(`plans.${planId}.timeline`),
      description: t(`plans.${planId}.description`),
      cta: t(`plans.${planId}.cta`),
      ctaLink: t(`plans.${planId}.ctaLink`),
      features: features as string[],
      addons: addons as string[],
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  }

  return (
    <section id="pricing-section" className="section-layout">
      <div className="section-container">
        {/* Header */}
        <FadeIn delay={0.1}>
          <div className="text-center mb-12 md:mb-16">
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
            <h1 className="section-title">
              <span className="block md:inline">
                {t('title')}
              </span>
            </h1>
          </div>
        </FadeIn>

        {/* Pricing Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 items-stretch pt-12 md:pt-16 gap-6 md:gap-[30px]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {plans.map((planId, index) => {
            const plan = getPlanData(planId)
            const isMiddle = index === 1
            const isPositioningCard = planId === 'team'

            return (
              <motion.div
                key={planId}
                variants={cardVariants}
                className={`relative flex flex-col h-full ${isPositioningCard ? 'md:-mt-12' : ''}`}
              >
                <div
                  className={`relative flex flex-col h-full p-6 md:p-8 rounded-2xl border border-nucleo-dark-border overflow-hidden ${isPositioningCard ? 'bg-nucleo-surface-color' : 'bg-nucleo-dark-tertiary'}`}
                >
                  {isPositioningCard && (
                    <div
                      className="absolute inset-0 opacity-[0.15] pointer-events-none rounded-2xl mix-blend-overlay"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix in='colorNoise' type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
                      }}
                    />
                  )}
                  {/* Timeline */}
                  <div className="font-space-mono text-sm text-nucleo-secondary mb-4 md:mb-[20px]">
                    {plan.timeline}
                  </div>

                  {/* Plan Name */}
                  <h3 className="font-geist-super text-xl md:text-2xl mb-6 md:mb-[30px] text-nucleo-light">
                    {plan.name}
                  </h3>

                  {/* Price */}
                  <div className="mb-6 md:mb-[30px]">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="font-geist-regular text-sm md:text-base text-nucleo-dark-hover-light">
                        {plan.pricePrefix}
                      </span>
                      <span className="font-geist-semibold text-[36px] md:text-[42px] text-nucleo-light">
                        {plan.price}
                      </span>
                      {plan.priceSubtext && (
                        <span className="font-geist-regular text-sm md:text-base text-nucleo-dark-hover-light">
                          {plan.priceSubtext}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="font-geist-regular text-sm md:text-base text-nucleo-dark-hover-light mb-6 md:mb-8 whitespace-pre-line leading-relaxed">
                    {plan.description.replace(/\\n/g, '\n')}
                  </p>

                  {/* CTA Button */}
                  <CalButton
                    className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium text-nucleo-light transition-all mb-6 md:mb-8 hover:opacity-90 w-full cursor-pointer"
                    style={{
                      background: '#6F31FF',
                    }}
                  >
                    {plan.cta}
                  </CalButton>

                  {/* Features */}
                  <div className="flex-1 flex flex-col">
                    <h4 className="font-geist-semibold text-sm md:text-base text-nucleo-light mb-3 md:mb-4">
                      {t('includesLabel')}
                    </h4>
                    <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-2 md:gap-3">
                          <div className="flex-shrink-0 mt-0.5 w-4 h-4 md:w-5 md:h-5 flex items-center justify-center">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M5 8L7 10L11 6"
                                stroke="#C3BDFF"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                          <span className="font-geist-regular text-sm md:text-base text-nucleo-dark-hover-light leading-relaxed">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                    
                    {/* Addons */}
                    {plan.addons && plan.addons.length > 0 && (
                      <>
                        <h4 className="font-geist-semibold text-sm md:text-base text-nucleo-light mb-3 md:mb-4">
                          {t('addonsLabel')}
                        </h4>
                        <ul className="space-y-3 md:space-y-4">
                          {plan.addons.map((addon, addonIndex) => (
                            <li key={addonIndex} className="flex items-start gap-2 md:gap-3">
                              <div className="flex-shrink-0 mt-0.5 w-4 h-4 md:w-5 md:h-5 flex items-center justify-center">
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M5 8L7 10L11 6"
                                    stroke="#C3BDFF"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                              <span className="font-geist-regular text-sm md:text-base text-nucleo-dark-hover-light leading-relaxed">
                                {addon}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
export { ComparisonSection } from './comparison-section'
