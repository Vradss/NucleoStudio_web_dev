'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { FadeIn } from '@/components/motion/fade-in'

const tabs = ['strategy', 'web', 'content', 'conversion'] as const

// Mapeo de iconos para cada tab
const tabIcons = {
  strategy: '/images/Lightbulb.svg',
  web: '/images/Browser.svg',
  content: '/images/LinkedinLogo.svg',
  conversion: '/images/ChartLineUp.svg',
} as const

// Mapeo de imágenes para cada tab
const tabImages = {
  strategy: '/images/toggle_1.webp',
  web: '/images/toggle_2.webp',
  content: '/images/toggle_3.webp',
  conversion: '/images/toggle_1.webp',
} as const

export function MetodologiaSection() {
  const t = useTranslations('metodologia')
  const [activeTab, setActiveTab] = useState<'strategy' | 'web' | 'content' | 'conversion'>('strategy')

  return (
    <section id="entregables" className="section-layout relative z-20 min-h-screen flex flex-col py-8 lg:py-12">
      <div className="section-container text-left flex-1 flex flex-col">
        {/*<FadeIn delay={0}>
          <div className="flex items-center gap-2">
            <Image
              src="/images/isotipo_detail.svg"
              alt="Detalle isotipo decorativo"
              width={26}
              height={25}
              className="h-4 w-4 sm:h-5 sm:w-5"
              priority
            />
            <span className="tagline-secondary">
              {t('label')}
            </span>
          </div>
        </FadeIn>*/}
        <FadeIn delay={0.1}>
          <h2 className="section-title mt-6 max-w-7xl">
            {t('title')}
          </h2>
        </FadeIn>
        
        {/* Tabs Navigation */}
        <FadeIn delay={0.3}>
          <div className="mt-8 lg:mt-12 grid grid-cols-2 md:grid-cols-4 gap-0 border-b md:border-b-0" style={{ borderColor: '#3F3F50' }}>
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center justify-center gap-2 py-3 md:py-0 md:pb-5 font-geist-regular text-base transition-all sm:text-lg ${
                  activeTab === tab
                    ? 'text-nucleo-light md:border-b-2 rounded-lg md:rounded-none'
                    : 'text-nucleo-light/60 hover:text-nucleo-light'
                }`}
                style={{
                  backgroundColor: activeTab === tab ? '#27273F' : 'transparent',
                  borderBottomColor: activeTab === tab ? 'var(--nucleo-highlight)' : 'transparent',
                }}
              >
                {activeTab === tab && (
                  <div 
                    className="hidden sm:block h-4 w-4 sm:h-5 sm:w-5 relative flex-shrink-0"
                  >
                    <Image
                      src={tabIcons[tab]}
                      alt={`Icono ${t(`tabs.${tab}.label`)}`}
                      width={20}
                      height={20}
                      className="h-full w-full"
                    />
                  </div>
                )}
                <span>{t(`tabs.${tab}.label`)}</span>
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Tab Content */}
        <FadeIn delay={0.4}>
          <div 
            className="mt-4 border flex-1 flex flex-col min-h-0" 
            style={{ 
              borderColor: '#3F3F50', 
              borderRadius: '12px'
            }}
          >
            <div className="grid lg:grid-cols-2 flex-1 min-h-0">
              {/* Left: Text Content */}
              <div className="p-4 sm:p-6 lg:p-8 flex flex-col justify-center lg:overflow-y-auto">
                <div className="space-y-3 sm:space-y-4">
                  {(() => {
                    try {
                      const desc1 = t(`tabs.${activeTab}.description1`)
                      if (desc1 && typeof desc1 === 'string' && desc1.trim() !== '') {
                        return (
                          <p className="font-geist-regular text-base text-nucleo-light sm:text-xl">
                            {desc1}
                          </p>
                        )
                      }
                    } catch (e) {
                      // Key doesn't exist
                    }
                    return null
                  })()}
                  {(() => {
                    try {
                      const desc2 = t(`tabs.${activeTab}.description2`)
                      if (desc2 && typeof desc2 === 'string' && desc2.trim() !== '') {
                        return (
                          <p className="font-geist-regular text-base text-nucleo-light sm:text-xl">
                            {desc2}
                          </p>
                        )
                      }
                    } catch (e) {
                      // Key doesn't exist
                    }
                    return null
                  })()}
                </div>
                
                {/* Bullet Points */}
                <ul className="mt-6 sm:mt-8 space-y-4 sm:space-y-5">
                  {[0, 1, 2].map((index) => {
                    try {
                      const point = t(`tabs.${activeTab}.points.${index}`)
                      if (!point || typeof point !== 'string' || point.trim() === '') {
                        return null
                      }
                      return (
                        <li key={index} className="flex items-baseline gap-3">
                          <span 
                            className="flex-shrink-0"
                            style={{
                              width: '8px',
                              height: '8px',
                              border: '4px solid var(--nucleo-secondary)',
                              backgroundColor: 'transparent',
                              display: 'block',
                              marginTop: '0.4em',
                            }}
                          />
                          <span className="font-geist-light text-base text-nucleo-light/80 sm:text-base leading-relaxed">
                            {point}
                          </span>
                        </li>
                      )
                    } catch (e) {
                      // Key doesn't exist, don't render
                      return null
                    }
                  })}
                </ul>
              </div>

              {/* Right: Image */}
              <div className="flex items-center justify-center p-4 sm:p-6 lg:p-6 min-h-0">
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={tabImages[activeTab]}
                    alt={t(`tabs.${activeTab}.imageAlt`)}
                    width={800}
                    height={600}
                    className="w-full max-w-[500px] h-full object-contain"
                    style={{ borderRadius: '12px' }}
                    priority={activeTab === 'strategy'}
                  />
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

