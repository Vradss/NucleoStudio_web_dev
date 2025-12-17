'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { FadeIn } from '@/components/motion/fade-in'
import Image from 'next/image'

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
}

export function PricingSection() {
  const t = useTranslations('pricing')

  const plans = ['starter', 'team', 'enterprise'] as const

  const getPlanData = (planId: typeof plans[number]): PricingPlan => {
    // Get features as raw object first
    const featuresRaw = t.raw(`plans.${planId}.features`)
    const features = Array.isArray(featuresRaw) ? featuresRaw : []

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
    <section className="section-layout">
      <div className="section-container">
        {/* Header */}
        <FadeIn delay={0.1}>
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 text-nucleo-secondary mb-4">
              <Image
                src="/images/isotipo_detail.svg"
                alt="Detalle isotipo decorativo"
                width={26}
                height={25}
                className="h-3 w-3 sm:h-5 sm:w-5"
                priority
              />
              <span className="tagline-secondary">
                {t('tagline')}
              </span>
            </div>
            <h1 className="section-title mb-4">
              <span className="block md:inline">
                {t('title').split('¿Cuál es el mejor para ti?')[0]}
              </span>
              <span className="block md:inline md:ml-1">
                <span className="block md:inline font-geist-bold text-nucleo-highlight">
                  ¿Cuál es el mejor para ti?
                </span>
              </span>
            </h1>
          </div>
        </FadeIn>

        {/* Pricing Cards */}
        <motion.div
          className="grid md:grid-cols-3 items-stretch"
          style={{ gap: '30px' }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {plans.map((planId, index) => {
            const plan = getPlanData(planId)
            const isMiddle = index === 1

            return (
              <motion.div
                key={planId}
                variants={cardVariants}
                className="relative flex flex-col h-full"
              >
                <div
                  className="relative flex flex-col h-full p-8 rounded-2xl overflow-hidden bg-nucleo-dark-tertiary"
                >
                  {/* Timeline */}
                  <div className="font-space-mono text-sm text-nucleo-secondary mb-[20px]">
                    {plan.timeline}
                  </div>

                  {/* Plan Name */}
                  <h3 className="font-geist-super text-3xl mb-[30px] text-nucleo-light">
                    {plan.name}
                  </h3>

                  {/* Price */}
                  <div className="mb-[30px]">
                    <div className="flex items-baseline gap-2">
                      <span className="font-geist-regular text-base text-nucleo-dark-hover-light">
                        {plan.pricePrefix}
                      </span>
                      <span className="font-geist-semibold text-[42px] text-nucleo-light">
                        {plan.price}
                      </span>
                      {plan.priceSubtext && (
                        <span className="font-geist-regular text-base text-nucleo-dark-hover-light">
                          {plan.priceSubtext}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="font-geist-regular text-base text-nucleo-dark-hover-light mb-8 whitespace-pre-line">
                    {plan.description.replace(/\\n/g, '\n')}
                  </p>

                  {/* CTA Button */}
                  <Link
                    href={plan.ctaLink}
                    className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium text-nucleo-light transition-all mb-8 hover:opacity-90"
                    style={{
                      background: '#6F31FF',
                    }}
                  >
                    {plan.cta}
                  </Link>

                  {/* Features */}
                  <ul className="space-y-4 flex-1">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-0.5 w-5 h-5 flex items-center justify-center">
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
                        <span className="font-geist-regular text-base text-nucleo-dark-hover-light leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
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
