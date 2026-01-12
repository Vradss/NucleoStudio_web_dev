'use client'

import { useTranslations, useLocale } from 'next-intl'
import { FadeIn } from '@/components/motion/fade-in'

export function TimelineProcessSection() {
  const t = useTranslations('timelineProcess')
  const locale = useLocale()
  const stages = ['before', 'week1', 'week2_3', 'week4_plus'] as const

  return (
    <section 
      className="relative z-20 py-16 lg:py-24 bg-nucleo-bg-light"
    >
      <div className="section-container text-left px-4 lg:px-6">
        {/* Título */}
        <FadeIn delay={0.1}>
          <h2 className="section-title text-left mb-12 lg:mb-16 text-nucleo-dark">
            {t('title')}
          </h2>
        </FadeIn>

        {/* Timeline Desktop (lg+) - 4 columnas */}
        <div className="hidden lg:block relative">
          <div className="relative">
            {/* Grid de 4 columnas para las etapas */}
            <div className="grid grid-cols-4 gap-6 relative">
              {/* Línea punteada: del centro del círculo 1 al centro del círculo 2 */}
              <div 
                className="absolute h-px z-0"
                style={{ 
                  top: 'calc(1.75rem + 1.5rem + 0.5rem)',
                  left: 'calc(12.5% - 0.375rem)', // Centro columna 1 (considerando gaps)
                  width: 'calc(25% + 1.5rem)', // Una columna + gap
                  backgroundImage: 'repeating-linear-gradient(to right, #d1d5db 0px, #d1d5db 10px, transparent 10px, transparent 16px)'
                }}
              />
              
              {/* Línea sólida: del centro del círculo 2 al centro del círculo 4 */}
              <div 
                className="absolute h-px bg-gray-300 z-0"
                style={{ 
                  top: 'calc(1.75rem + 1.5rem + 0.5rem)',
                  left: 'calc(37.5% + 0.375rem)', // Centro columna 2
                  right: 'calc(12.5% - 0.375rem)' // Centro columna 4
                }}
              />

              {stages.map((stage, index) => {
                const stageData = t.raw(`stages.${stage}`)
                const isLast = index === stages.length - 1
                const isFirst = index === 0
                
                return (
                  <div key={stage} className="relative flex flex-col">
                    {/* Label arriba del timeline */}
                    <div className="text-center mb-6 h-7 flex items-center justify-center">
                      {isFirst ? (
                        <span className="text-sm font-space-mono px-3 py-1 rounded-lg inline-block border border-[#A0A0A0]" style={{ color: '#A0A0A0' }}>
                          {stageData.label}
                        </span>
                      ) : (
                        <span className="text-sm font-space-mono text-nucleo-primary-dark bg-nucleo-secondary px-3 py-1 rounded-lg inline-block">
                          {stageData.label}
                        </span>
                      )}
                    </div>

                    {/* Círculo del timeline */}
                    <div className="flex justify-center mb-8 relative z-10">
                      <div 
                        className={`w-4 h-4 rounded-full ${
                          isLast 
                            ? 'bg-nucleo-primary' 
                            : 'bg-nucleo-bg-light border-2 border-gray-300'
                        }`}
                      />
                    </div>

                    {/* Card con contenido */}
                    <div 
                      className="bg-nucleo-bg-light rounded-lg p-6 border border-gray-300 shadow-sm grid h-full"
                      style={{ gridTemplateRows: 'auto 1fr auto' }}
                    >
                      {/* Título */}
                      <h3 className="text-lg font-geist-bold text-nucleo-dark mb-4">
                        {stageData.title}
                      </h3>

                      {/* Sección "Tus acciones" */}
                      <div className="flex flex-col mb-4">
                        <h4 className="text-sm font-geist-bold text-nucleo-dark mb-3">
                          {locale === 'es' ? 'Tus acciones :' : 'Your actions:'}
                        </h4>
                        <ul className="space-y-2">
                          {stageData.tu.map((item: string, itemIndex: number) => (
                            <li key={itemIndex} className="text-sm leading-relaxed text-nucleo-dark flex items-start">
                              <span className="mr-2 flex-shrink-0">✓</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Sección "Núcleo" */}
                      <div 
                        className="rounded-lg p-4 h-[180px] w-full bg-nucleo-secondary"
                      >
                        <h4 className="text-sm font-geist-bold text-nucleo-dark mb-3">
                          {locale === 'es' ? 'Núcleo:' : 'Nucleo:'}
                        </h4>
                        <ul className="space-y-2">
                          {stageData.nosotros.map((item: string, itemIndex: number) => (
                            <li key={itemIndex} className="text-sm leading-relaxed text-nucleo-dark flex items-start">
                              <span className="mr-2 flex-shrink-0">✓</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Timeline Tablet (md) - 2 columnas */}
        <div className="hidden md:grid lg:hidden grid-cols-2 gap-6">
          {stages.map((stage, index) => {
            const stageData = t.raw(`stages.${stage}`)
            const isLast = index === stages.length - 1
            const isFirst = index === 0
            
            return (
              <div key={stage} className="relative flex flex-col">
                {/* Label y círculo */}
                <div className="flex items-center gap-3 mb-4">
                  <div 
                    className={`w-4 h-4 rounded-full flex-shrink-0 ${
                      isLast 
                        ? 'bg-nucleo-primary' 
                        : 'bg-nucleo-bg-light border-2 border-gray-300'
                    }`}
                  />
                  {isFirst ? (
                    <span className="text-sm font-space-mono px-3 py-1 rounded-lg inline-block border border-[#A0A0A0]" style={{ color: '#A0A0A0' }}>
                      {stageData.label}
                    </span>
                  ) : (
                    <span className="text-sm font-space-mono text-nucleo-primary-dark bg-nucleo-secondary px-3 py-1 rounded-lg inline-block">
                      {stageData.label}
                    </span>
                  )}
                </div>

                {/* Card con contenido */}
                <div className="bg-nucleo-bg-light rounded-lg p-5 border border-gray-300 shadow-sm flex flex-col h-full">
                  {/* Título */}
                  <h3 className="text-lg font-geist-bold text-nucleo-dark mb-4">
                    {stageData.title}
                  </h3>

                  {/* Sección "Tus acciones" */}
                  <div className="mb-4 flex-1">
                    <h4 className="text-sm font-geist-bold text-nucleo-dark mb-3">
                      {locale === 'es' ? 'Tus acciones :' : 'Your actions:'}
                    </h4>
                    <ul className="space-y-2">
                      {stageData.tu.map((item: string, itemIndex: number) => (
                        <li key={itemIndex} className="text-sm leading-relaxed text-nucleo-dark flex items-start">
                          <span className="mr-2 flex-shrink-0">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Sección "Núcleo" */}
                  <div className="rounded-lg p-4 bg-nucleo-secondary">
                    <h4 className="text-sm font-geist-bold text-nucleo-dark mb-3">
                      {locale === 'es' ? 'Núcleo:' : 'Nucleo:'}
                    </h4>
                    <ul className="space-y-2">
                      {stageData.nosotros.map((item: string, itemIndex: number) => (
                        <li key={itemIndex} className="text-sm leading-relaxed text-nucleo-dark flex items-start">
                          <span className="mr-2 flex-shrink-0">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Timeline Mobile - 1 columna */}
        <div className="md:hidden relative">
          <div className="space-y-4">
            {stages.map((stage, index) => {
              const stageData = t.raw(`stages.${stage}`)
              const isLast = index === stages.length - 1
              const isFirst = index === 0
              
              return (
                <div key={stage} className="relative pl-9">
                  {/* Línea vertical que conecta al siguiente círculo */}
                  {!isLast && (
                    <div 
                      className="absolute left-[11px] top-7 bottom-[-16px] w-px"
                      style={isFirst ? {
                        backgroundImage: 'repeating-linear-gradient(to bottom, #d1d5db 0px, #d1d5db 8px, transparent 8px, transparent 14px)'
                      } : {
                        backgroundColor: '#d1d5db'
                      }}
                    />
                  )}
                  
                  {/* Círculo del timeline - posicionado absolutamente */}
                  <div 
                    className={`absolute left-0 top-1 w-6 h-6 rounded-full z-10 ${
                      isLast 
                        ? 'bg-nucleo-primary' 
                        : 'bg-nucleo-bg-light border-2 border-gray-300'
                    }`}
                  />
                  
                  {/* Label */}
                  <div className="mb-3">
                    {isFirst ? (
                      <span className="text-xs font-space-mono px-3 py-1 rounded-md inline-block border border-[#A0A0A0]" style={{ color: '#A0A0A0' }}>
                        {stageData.label}
                      </span>
                    ) : (
                      <span className="text-xs font-space-mono text-nucleo-primary-dark bg-nucleo-secondary px-3 py-1 rounded-md inline-block">
                        {stageData.label}
                      </span>
                    )}
                  </div>

                  {/* Card con contenido */}
                  <div className="bg-nucleo-bg-light rounded-lg p-4 border border-gray-200 shadow-sm">
                    {/* Título */}
                    <h3 className="text-base font-geist-bold text-nucleo-dark mb-3">
                      {stageData.title}
                    </h3>

                    {/* Sección "Tus acciones" */}
                    <div className="mb-4">
                      <h4 className="text-sm font-geist-bold text-nucleo-dark mb-2">
                        {locale === 'es' ? 'Tus acciones :' : 'Your actions:'}
                      </h4>
                      <ul className="space-y-1.5">
                        {stageData.tu.map((item: string, itemIndex: number) => (
                          <li key={itemIndex} className="text-sm leading-relaxed text-nucleo-dark flex items-start">
                            <span className="mr-2 flex-shrink-0 text-gray-500">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Sección "Núcleo" */}
                    <div className="rounded-lg p-4 bg-nucleo-secondary">
                      <h4 className="text-sm font-geist-bold text-nucleo-dark mb-2">
                        {locale === 'es' ? 'Núcleo:' : 'Nucleo:'}
                      </h4>
                      <ul className="space-y-1.5">
                        {stageData.nosotros.map((item: string, itemIndex: number) => (
                          <li key={itemIndex} className="text-sm leading-relaxed text-nucleo-dark flex items-start">
                            <span className="mr-2 flex-shrink-0 text-gray-500">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
