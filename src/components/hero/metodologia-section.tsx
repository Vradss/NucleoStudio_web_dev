'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
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

function renderBulletPointWithHighlight(text: string, locale: string) {
  // Textos a resaltar según el idioma
  const highlightTexts = locale === 'es'
    ? ['Quick research', 'Workshops', 'Arquitectura', 'Wireframes', 'Contenido de productos', 'Founder-led growth', 'thought leadership', 'Frameworks']
    : ['Quick research', 'workshops', 'Message architecture', 'wireframes', 'Product content', 'Founder-led growth', 'Thought leadership', 'Frameworks']
  
  const parts: Array<{ text: string; highlight: boolean }> = []
  let lastIndex = 0
  
  // Encontrar todas las coincidencias
  const matches: Array<{ start: number; end: number; text: string }> = []
  
  highlightTexts.forEach((highlightText) => {
    const regex = new RegExp(highlightText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')
    let match
    while ((match = regex.exec(text)) !== null) {
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
        text: text.substring(lastIndex, match.start),
        highlight: false,
      })
    }
    parts.push({
      text: match.text,
      highlight: true,
    })
    lastIndex = match.end
  })
  
  if (lastIndex < text.length) {
    parts.push({
      text: text.substring(lastIndex),
      highlight: false,
    })
  }
  
  if (parts.length === 0) {
    return text
  }
  
  return (
    <>
      {parts.map((part, index) => 
        part.highlight ? (
          <span key={index} className="font-geist-bold">{part.text}</span>
        ) : (
          <span key={index}>{part.text}</span>
        )
      )}
    </>
  )
}

function renderMetodologiaTitleWithHighlight(title: string, locale: string) {
  // Texto a resaltar según el idioma
  const highlightTexts = locale === 'es' 
    ? ['aplicamos en todos tus canales B2B']
    : ['we deploy it across all your B2B channels'] // El texto en inglés es diferente, no hay texto equivalente para resaltar
  
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

export function MetodologiaSection() {
  const t = useTranslations('metodologia')
  const locale = useLocale()
  const [activeTab, setActiveTab] = useState<'strategy' | 'web' | 'content' | 'conversion'>('strategy')
  const [expandedTabs, setExpandedTabs] = useState<Set<string>>(new Set(['strategy']))
  
  const toggleTab = (tab: string) => {
    setExpandedTabs(prev => {
      // Si el tab ya está expandido, colapsarlo
      if (prev.has(tab)) {
        return new Set()
      } else {
        // Si no está expandido, expandir solo este tab (colapsar los demás)
        return new Set([tab])
      }
    })
    setActiveTab(tab as typeof activeTab)
  }

  return (
    <section id="entregables" className="section-layout relative z-20 min-h-[125vh] flex flex-col py-24 lg:py-12">
      <div className="section-container text-left flex-1 flex flex-col justify-center">
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
          <h2 className="section-title mt-6 max-w-6xl whitespace-pre-line">
            {renderMetodologiaTitleWithHighlight(t('title'), locale)}
          </h2>
        </FadeIn>
        
        {/* Desktop: Tabs Navigation */}
        <FadeIn delay={0.3}>
          <div className="hidden md:block mt-8 lg:mt-12 border-b" style={{ borderColor: '#3F3F50' }}>
            <div className="grid grid-cols-4 gap-0">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex items-center justify-center gap-2 py-0 pb-5 font-geist-regular text-[20px] transition-all ${
                    activeTab === tab
                      ? 'border-b-2'
                      : ''
                  }`}
                  style={{
                    color: activeTab === tab ? 'var(--nucleo-secondary)' : 'var(--nucleo-dark-hover-light)',
                    borderBottomColor: activeTab === tab ? 'var(--nucleo-highlight)' : 'transparent',
                  }}
                >
                  {activeTab === tab && (
                    <div className="h-5 w-5 relative flex-shrink-0">
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
          </div>
        </FadeIn>

        {/* Mobile: Accordion */}
        <div className="md:hidden mt-8">
          {tabs.map((tab) => {
            const isExpanded = expandedTabs.has(tab)
            return (
              <div key={tab} className="mb-4">
                <button
                  onClick={() => toggleTab(tab)}
                  className="w-full flex items-center justify-between py-3 px-4 font-geist-medium text-[18px] transition-all rounded-lg"
                  style={{
                    color: isExpanded ? 'var(--nucleo-secondary)' : 'var(--nucleo-dark-hover-light)',
                    backgroundColor: isExpanded ? '#27273F' : 'transparent',
                  }}
                >
                  <span>{t(`tabs.${tab}.label`)}</span>
                  <svg
                    className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {isExpanded && (
                  <div className="mt-2 border rounded-lg" style={{ borderColor: '#3F3F50', borderRadius: '12px' }}>
                    <div className="p-4">
                      <div className="space-y-3">
                        {(() => {
                          try {
                            const desc1 = t(`tabs.${tab}.description1`)
                            if (desc1 && typeof desc1 === 'string' && desc1.trim() !== '') {
                              return (
                                <p className="font-geist-regular text-base text-nucleo-light">
                                  {desc1}
                                </p>
                              )
                            }
                          } catch (e) {}
                          return null
                        })()}
                        {(() => {
                          try {
                            const desc2 = t(`tabs.${tab}.description2`)
                            if (desc2 && typeof desc2 === 'string' && desc2.trim() !== '') {
                              return (
                                <p className="font-geist-regular text-base text-nucleo-light">
                                  {desc2}
                                </p>
                              )
                            }
                          } catch (e) {}
                          return null
                        })()}
                      </div>
                      
                      <ul className="mt-6 space-y-2">
                        {(tab === 'web' ? [0, 1] : [0, 1, 2]).map((index) => {
                          try {
                            const point = t(`tabs.${tab}.points.${index}`)
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
                                <span className="font-geist-light text-base text-nucleo-light/80 leading-relaxed">
                                  {renderBulletPointWithHighlight(point, locale)}
                                </span>
                              </li>
                            )
                          } catch (e) {
                            return null
                          }
                        })}
                      </ul>
                      
                      <div className="mt-6 flex items-center justify-center">
                        <Image
                          src={tabImages[tab]}
                          alt={t(`tabs.${tab}.imageAlt`)}
                          width={800}
                          height={600}
                          className="w-full max-w-[500px] h-auto object-contain"
                          style={{ borderRadius: '12px' }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Desktop: Tab Content */}
        <FadeIn delay={0.4}>
          <div 
            className="hidden md:flex mt-4 border flex-1 flex-col min-h-0" 
            style={{ 
              borderColor: '#3F3F50', 
              borderRadius: '12px'
            }}
          >
            <div className="grid lg:grid-cols-2 flex-1 min-h-0">
              {/* Left: Text Content */}
              <div className="p-6 lg:p-8 flex flex-col justify-center lg:overflow-y-auto">
                <div className="space-y-4">
                  {(() => {
                    try {
                      const desc1 = t(`tabs.${activeTab}.description1`)
                      if (desc1 && typeof desc1 === 'string' && desc1.trim() !== '') {
                        return (
                          <p className="font-geist-regular text-[18px] text-nucleo-light">
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
                          <p className="font-geist-regular text-[18px] text-nucleo-light">
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
                <ul className="mt-8 space-y-5">
                  {(activeTab === 'web' ? [0, 1] : [0, 1, 2]).map((index) => {
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
                            {renderBulletPointWithHighlight(point, locale)}
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
              <div className="flex items-center justify-center p-6 lg:p-6 min-h-0">
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

