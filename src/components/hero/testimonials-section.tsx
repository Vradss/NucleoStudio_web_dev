'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { FadeIn } from '@/components/motion/fade-in'

export function TestimonialsSection() {
  const t = useTranslations('testimonials')
  const [currentIndex, setCurrentIndex] = useState(0)
  const testimonials = [1, 2, 3, 4, 5, 6] as const
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Auto-rotación del carrusel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = (prev + 1) % testimonials.length
        scrollToCard(nextIndex)
        return nextIndex
      })
    }, 5000) // Cambia cada 5 segundos

    return () => clearInterval(interval)
  }, [testimonials.length])

  const scrollToCard = (index: number) => {
    if (scrollContainerRef.current) {
      const isMobile = window.innerWidth < 768
      const isLg = window.innerWidth >= 1024 && window.innerWidth < 1280
      const isXl = window.innerWidth >= 1280 && window.innerWidth < 1536
      const is2xl = window.innerWidth >= 1536
      
      let cardWidth: number
      if (isMobile) {
        cardWidth = (window.innerWidth - 40) + 16
      } else if (isLg) {
        cardWidth = 1000 + 24
      } else if (isXl) {
        cardWidth = 1100 + 24
      } else if (is2xl) {
        cardWidth = 1200 + 24
      } else {
        cardWidth = 950 + 24
      }
      
      scrollContainerRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      })
    }
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    scrollToCard(index)
  }

  const goToPrevious = () => {
    const newIndex = (currentIndex - 1 + testimonials.length) % testimonials.length
    setCurrentIndex(newIndex)
    scrollToCard(newIndex)
  }

  const goToNext = () => {
    const newIndex = (currentIndex + 1) % testimonials.length
    setCurrentIndex(newIndex)
    scrollToCard(newIndex)
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0A0A0A]">
      {/* Contenido */}
      <div className="relative z-10 py-16 px-6 lg:px-24 lg:py-24">
        <div className="mx-auto max-w-7xl">
          {/* Label */}
          <FadeIn delay={0}>
            <div className="flex items-center justify-center gap-2 mb-6">
              <Image
                src="/images/isotipo_detail.svg"
                alt="Detalle isotipo decorativo"
                width={26}
                height={25}
                className="h-4 w-4 sm:h-5 sm:w-5"
                priority
              />
              <span className="font-space-mono text-xs tracking-[0.3em] uppercase text-[#C3BDFF]">
                {t('label')}
              </span>
            </div>
          </FadeIn>

          {/* Título */}
          <FadeIn delay={0.1}>
            <h2 className="text-center text-[32px] font-artifictrial-regular leading-tight text-[#F7F6F3] sm:text-4xl lg:text-5xl mb-12">
              {t('title').split('/n/n').map((line, index, array) => (
                <span key={index}>
                  {line}
                  {index < array.length - 1 && <br />}
                </span>
              ))}
            </h2>
          </FadeIn>

          {/* Carrusel */}
          <div className="relative flex flex-col items-center">
            <div 
              ref={scrollContainerRef}
              className="overflow-x-auto w-full flex justify-start gap-4 md:gap-6 px-5 md:px-4 pb-4 scroll-smooth" 
              style={{ 
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch'
              }}
              onScroll={(e) => {
                const container = e.currentTarget
                const isMobile = window.innerWidth < 768
                const isLg = window.innerWidth >= 1024 && window.innerWidth < 1280
                const isXl = window.innerWidth >= 1280 && window.innerWidth < 1536
                const is2xl = window.innerWidth >= 1536
                
                let cardWidth: number
                if (isMobile) {
                  cardWidth = (window.innerWidth - 40) + 16
                } else if (isLg) {
                  cardWidth = 1000 + 24
                } else if (isXl) {
                  cardWidth = 1100 + 24
                } else if (is2xl) {
                  cardWidth = 1200 + 24
                } else {
                  cardWidth = 950 + 24
                }
                
                const scrollLeft = container.scrollLeft
                const newIndex = Math.round(scrollLeft / cardWidth)
                if (newIndex !== currentIndex && newIndex >= 0 && newIndex < testimonials.length) {
                  setCurrentIndex(newIndex)
                }
              }}
            >
              <div className="flex gap-4 md:gap-6" style={{ minWidth: 'fit-content' }}>
                {testimonials.map((testimonialIndex, index) => {
                  const isActive = index === currentIndex
                  return (
                    <motion.div
                      key={testimonialIndex}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: isActive ? 1 : 0.6, scale: isActive ? 1 : 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="w-[calc(100vw-2.5rem)] md:w-[950px] lg:w-[1000px] xl:w-[1100px] 2xl:w-[1200px] flex-shrink-0"
                    >
                      <div className="bg-[#0A0A0A] rounded-3xl border border-[#1F1F1F] p-6 md:p-16 lg:p-24 xl:p-40 relative h-[600px] md:min-h-[600px] md:max-h-[700px] lg:max-h-[800px] xl:max-h-[900px] 2xl:max-h-[1000px] flex flex-col overflow-hidden">
                        {/* Icono de comillas en esquina superior izquierda */}
                        <div className="absolute left-6 top-6 md:left-16 md:top-16 lg:left-24 lg:top-24 xl:left-32 xl:top-16">
                          <Image
                            src="/images/comillas.svg"
                            alt="Comillas decorativas"
                            width={100}
                            height={105}
                            className="w-12 h-auto md:w-16 lg:w-20 xl:w-60"
                          />
                        </div>

                        {/* Logo de empresa en esquina superior derecha - solo desktop */}
                        <div className="hidden md:block absolute top-16 right-16 lg:top-24 lg:right-24 xl:top-16 xl:right-16">
                          <Image
                            src={t(`testimonial${testimonialIndex}.companyLogo`)}
                            alt={t(`testimonial${testimonialIndex}.companyName`)}
                            width={120}
                            height={60}
                            className="h-6 w-auto object-contain max-w-[100px]"
                          />
                        </div>

                        {/* Mobile: Logo encima del testimonio */}
                        <div className="md:hidden flex justify-center pt-4 pb-6">
                          <Image
                            src={t(`testimonial${testimonialIndex}.companyLogo`)}
                            alt={t(`testimonial${testimonialIndex}.companyName`)}
                            width={120}
                            height={60}
                            className="h-6 w-auto object-contain max-w-[100px]"
                          />
                        </div>

                        {/* Contenido principal - Centrado verticalmente */}
                        <div className="relative z-10 flex-1 flex flex-col justify-center">
                          {/* Testimonio con saltos de línea */}
                          <div className="font-artifictrial-regular text-base sm:text-lg md:text-xl lg:text-[22px] 2xl:text-[26px] text-[#F7F6F3] mb-8 md:mb-16 lg:mb-24 leading-relaxed md:leading-12 text-left">
                            {t(`testimonial${testimonialIndex}.quote`).split('/n/n').map((paragraph, index, array) => (
                              <p key={index} className={index < array.length - 1 ? 'mb-4' : ''}>
                                {paragraph}
                              </p>
                            ))}
                          </div>

                          {/* Mobile: Nombre, puesto e industria centrados */}
                          <div className="md:hidden flex flex-col items-center mt-8">
                            {/* Nombre y puesto centrados */}
                            <div className="text-center mb-2">
                              <p className="font-artifictrial-semibold text-sm text-[#F7F6F3]">
                                {t(`testimonial${testimonialIndex}.name`)}
                              </p>
                              <p className="font-artifictrial-regular uppercase text-base text-[#C3BDFF] mt-1">
                                {t(`testimonial${testimonialIndex}.position`)}
                              </p>
                            </div>
                            {/* Industria debajo */}
                            <div className="text-center">
                              <p className="font-artifictrial-regular text-sm text-[#C3BDFF]">
                                {t(`testimonial${testimonialIndex}.industria`)}
                              </p>
                            </div>
                          </div>

                          {/* Desktop: Nombre, puesto e industria */}
                          <div className="hidden md:flex justify-between items-end">
                            {/* Nombre y puesto a la izquierda */}
                            <div className="text-left">
                              <p className="font-artifictrial-semibold text-xl text-[#F7F6F3]">
                                {t(`testimonial${testimonialIndex}.name`)}
                              </p>
                              <p className="font-artifictrial-regular uppercase text-base text-[#C3BDFF] mt-1">
                                {t(`testimonial${testimonialIndex}.position`)}
                              </p>
                            </div>
                            {/* Industria a la derecha */}
                            <div className="text-right">
                              <p className="font-artifictrial-regular text-sm text-[#C3BDFF]">
                                {t(`testimonial${testimonialIndex}.industria`)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Controles de navegación */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={goToPrevious}
                className="p-2 rounded-full border border-[#1F1F1F] bg-[#0A0A0A] text-[#F7F6F3] hover:bg-[#1F1F1F] transition-colors"
                aria-label="Testimonio anterior"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {/* Indicadores */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentIndex
                        ? 'w-8 bg-[#6F31FF]'
                        : 'w-2 bg-[#1F1F1F] hover:bg-[#3F3F3F]'
                    }`}
                    aria-label={`Ir al testimonio ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={goToNext}
                className="p-2 rounded-full border border-[#1F1F1F] bg-[#0A0A0A] text-[#F7F6F3] hover:bg-[#1F1F1F] transition-colors"
                aria-label="Siguiente testimonio"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

