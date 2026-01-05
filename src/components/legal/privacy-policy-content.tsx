'use client'

import { useTranslations } from 'next-intl'
import { FadeIn } from '@/components/motion/fade-in'
import { Link } from '@/i18n/routing'

export function PrivacyPolicyContent() {
  const t = useTranslations('legal.privacyPolicy')
  const tLegal = useTranslations('legal')

  const sections = [
    'dataCollection',
    'dataUse',
    'dataProtection',
    'dataSharing',
    'cookies',
    'rights',
    'changes',
    'contact'
  ] as const

  const sectionsWithItems = ['dataCollection', 'dataUse']

  return (
    <section className="py-16 px-6 lg:px-24 lg:py-24 bg-nucleo-dark min-h-screen">
      <div className="mx-auto max-w-4xl">
        {/* Back button */}
        <FadeIn>
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-white hover:text-nucleo-secondary transition-colors mb-8 font-geist-medium"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {tLegal('backToHome')}
          </Link>
        </FadeIn>

        {/* Header */}
        <FadeIn delay={0.05}>
          <div className="mb-8">
            <h1 className="font-geist-bold text-4xl md:text-5xl text-nucleo-light mb-3">
              {t('title')}
            </h1>
            <p className="font-geist-regular text-nucleo-light/60 text-lg">
              {tLegal('subtitle')}
            </p>
          </div>
        </FadeIn>

        {/* Intro */}
        <FadeIn delay={0.1}>
          <div className="mb-8 pb-6 border-b border-nucleo-dark-border">
            <p className="font-geist-regular text-base text-nucleo-light/80 leading-relaxed">
              {t('intro')}
            </p>
            <p className="font-geist-regular text-nucleo-light/50 text-sm mt-3">
              {t('lastUpdated')}
            </p>
          </div>
        </FadeIn>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((sectionKey, index) => {
            const hasItems = sectionsWithItems.includes(sectionKey)
            
            return (
              <FadeIn key={sectionKey} delay={0.15 + index * 0.03}>
                <div className="group">
                  <h2 className="font-geist-semibold text-lg md:text-xl text-nucleo-light mb-2">
                    {t(`sections.${sectionKey}.title`)}
                  </h2>
                  <p className="font-geist-regular text-nucleo-light/70 leading-relaxed text-sm">
                    {t(`sections.${sectionKey}.content`)}
                  </p>
                  
                  {hasItems && (
                    <ul className="space-y-1 pl-5 mt-2">
                      {(t.raw(`sections.${sectionKey}.items`) as string[]).map((item, itemIndex) => (
                        <li 
                          key={itemIndex}
                          className="font-geist-regular text-nucleo-light/70 leading-relaxed text-sm relative before:content-['→'] before:absolute before:-left-5 before:text-nucleo-primary"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </FadeIn>
            )
          })}
        </div>

        {/* Footer */}
        <FadeIn delay={0.5}>
          <div className="mt-12 pt-6 border-t border-nucleo-dark-border">
            <p className="font-geist-regular text-nucleo-light/50 text-center text-sm">
              {tLegal('questionsContact')}{' '}
              <a 
                href="mailto:vradis@nucleostudio.co" 
                className="text-nucleo-secondary hover:underline"
              >
                vradis@nucleostudio.co
              </a>
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
