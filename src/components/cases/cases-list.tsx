'use client'

import { useTranslations } from 'next-intl'
import { FadeIn } from '@/components/motion/fade-in'
import { Link } from '@/i18n/routing'
import Image from 'next/image'

const caseKeys = ['case1', 'case2'] as const

export function CasesList() {
  const t = useTranslations('cases')

  const cases = caseKeys.map((caseKey) => ({
    id: caseKey,
    company: t(`${caseKey}.company`),
    logo: t(`${caseKey}.logo`),
    webImage: t(`${caseKey}.webImage`),
    category: t(`${caseKey}.category`),
    industry: t(`${caseKey}.industry`),
    challenge: t(`${caseKey}.challenge`),
  }))

  return (
    <section className="bg-nucleo-dark py-16 px-6 lg:px-24 lg:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Cases */}
        <div className="space-y-12 lg:space-y-16">
          {cases.map((caseItem, index) => (
            <FadeIn key={caseItem.id} delay={0.1 + index * 0.1}>
              <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 items-center`}>
                {/* Content Side */}
                <div className="flex-1 w-full lg:w-auto">
                  <div className="max-w-lg">
                    {/* Logo */}
                    <div className="mb-6">
                      <Image
                        src={caseItem.logo}
                        alt={`${caseItem.company} logo`}
                        width={140}
                        height={40}
                        className="h-40 w-auto brightness-0 invert"
                      />
                    </div>

                    {/* Industry */}
                    <p className="font-geist-regular text-sm text-nucleo-light/50 mb-4">
                      {caseItem.industry}
                    </p>

                    {/* Challenge Text */}
                    <p className="font-geist-regular text-lg md:text-xl text-nucleo-light/80 leading-relaxed mb-8">
                      {caseItem.challenge}
                    </p>

                    {/* CTA */}
                    <Link
                      href={`/cases/${caseItem.id}`}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-nucleo-primary text-white font-geist-semibold text-sm rounded-full hover:bg-nucleo-primary-dark transition-colors group"
                    >
                      {t('viewCase')}
                      <svg 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        className="group-hover:translate-x-1 transition-transform"
                      >
                        <path 
                          d="M5 12H19M19 12L12 5M19 12L12 19" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>

                {/* Image Side */}
                <div className="flex-1 w-full lg:w-auto">
                  <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-nucleo-dark-tertiary border border-nucleo-dark-border shadow-2xl">
                    <Image
                      src={caseItem.webImage}
                      alt={`${caseItem.company} website`}
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                </div>
              </div>

              {/* Divider between cases */}
              {index < cases.length - 1 && (
                <div className="border-b border-nucleo-dark-border mt-12 lg:mt-16" />
              )}
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

