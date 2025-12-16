'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { FadeIn } from '@/components/motion/fade-in'

export function TestimonialsSection() {
  const t = useTranslations('testimonials')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const testimonials = [1, 2, 3, 4, 5, 6] as const
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const autoScrollIntervalRef = useRef<number | null>(null)
  const pauseTimeoutRef = useRef<number | null>(null)

  // Calcular el ancho de cada card
  const getCardWidth = useCallback(() => {
    if (typeof window === 'undefined') return 0
    const isMobile = window.innerWidth < 768
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024
    if (isMobile) {
      return window.innerWidth - 48 // 3rem = 48px (padding)
    } else if (isTablet) {
      return 800
    } else {
      return 1000
    }
  }, [])

  // Ir a un slide específico
  const goToSlide = useCallback((index: number) => {
    if (!scrollContainerRef.current) return
    
    const cardWidth = getCardWidth()
    const gap = 24 // gap-6 = 24px
    const scrollPosition = index * (cardWidth + gap)
    
    scrollContainerRef.current.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    })
    
    setCurrentIndex(index)
    
    // Pausar auto-scroll temporalmente
    setIsPaused(true)
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current)
    }
    pauseTimeoutRef.current = window.setTimeout(() => {
      setIsPaused(false)
    }, 5000)
  }, [getCardWidth])

  // Ir al siguiente slide
  const goToNext = useCallback(() => {
    const nextIndex = (currentIndex + 1) % testimonials.length
    goToSlide(nextIndex)
  }, [currentIndex, testimonials.length, goToSlide])

  // Ir al slide anterior
  const goToPrevious = useCallback(() => {
    const prevIndex = (currentIndex - 1 + testimonials.length) % testimonials.length
    goToSlide(prevIndex)
  }, [currentIndex, testimonials.length, goToSlide])

  // Auto-scroll
  useEffect(() => {
    if (isPaused) {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current)
        autoScrollIntervalRef.current = null
      }
      return
    }

    autoScrollIntervalRef.current = window.setInterval(() => {
      goToNext()
    }, 5000) // Cambiar cada 5 segundos

    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current)
        autoScrollIntervalRef.current = null
      }
    }
  }, [isPaused, goToNext])

  // Detectar el índice actual basado en el scroll
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return

    const handleScroll = () => {
      const cardWidth = getCardWidth()
      const gap = 24
      const scrollLeft = scrollContainer.scrollLeft
      const totalCardWidth = cardWidth + gap
      
      // Calcular el índice basado en la posición de scroll
      let newIndex = Math.round(scrollLeft / totalCardWidth)
      
      // Asegurar que el índice esté dentro del rango válido
      newIndex = Math.max(0, Math.min(newIndex, testimonials.length - 1))
      
      // Actualizar el índice
      setCurrentIndex((prevIndex) => {
        if (newIndex !== prevIndex) {
          return newIndex
        }
        return prevIndex
      })
    }

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true })
    return () => scrollContainer.removeEventListener('scroll', handleScroll)
  }, [getCardWidth, testimonials.length])

  // Cleanup
  useEffect(() => {
    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current)
      }
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current)
      }
    }
  }, [])

  return (
    <section className="relative min-h-screen overflow-hidden py-16 px-6 lg:px-24 lg:py-24" style={{ backgroundColor: '#FFFFFA', position: 'relative', zIndex: 50 }}>
      {/* Contenido */}
      <div className="relative z-10">
        <div className="mx-auto max-w-7xl">
          {/* Label */}
          <FadeIn delay={0}>
            <div className="flex items-center justify-left gap-2 mb-6">
              <Image
                src="/images/isotipo_morado_fuerte.svg"
                alt="Detalle isotipo decorativo"
                width={26}
                height={25}
                className="h-4 w-4 sm:h-5 sm:w-5"
                priority
              />
              <span className="tagline-primary">
                {t('label')}
              </span>
            </div>
          </FadeIn>

          {/* Título */}
          <FadeIn delay={0.1}>
            <h2 className="section-title text-left mb-12 text-nucleo-dark">
              {t('title').split('/n/n').map((line, index, array) => (
                <span key={index}>
                  {line}
                  {index < array.length - 1 && <br />}
                </span>
              ))}
            </h2>
          </FadeIn>

          {/* Carrusel */}
          <div className="relative flex flex-col items-center w-full">

            <div 
              ref={scrollContainerRef}
              className="overflow-x-auto w-full max-w-[1352px] mx-auto relative scroll-smooth testimonials-scroll-container"
              style={{ 
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none'
              }}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >

              <div 
                className="flex gap-6 relative z-10 w-fit items-stretch"
              >
                {testimonials.map((testimonialIndex, index) => {
                  return (
                    <div
                      key={`testimonial-${testimonialIndex}-${index}`}
                      className="w-[calc(100vw-3rem)] md:w-[800px] lg:max-w-[1000px] lg:w-[1000px] flex-shrink-0 h-full"
                    >
                      <div className="bg-nucleo-dark-secondary rounded-3xl p-6 md:p-8 lg:p-12 relative h-full flex flex-col md:flex-row overflow-hidden">
                        {/* Div izquierda: Contenido (mobile: vertical, desktop: izquierda) */}
                        <div className="w-full md:w-3/5 flex flex-col justify-center md:pr-4 lg:pr-8">
                          {/* Testimonio con saltos de línea */}
                          <div className="font-geist-regular text-sm sm:text-base md:text-lg lg:text-xl text-nucleo-light mb-6 md:mb-8 leading-relaxed text-left">
                            {t(`testimonial${testimonialIndex}.quote`).split('/n/n').map((paragraph, index, array) => (
                              <p key={index} className={index < array.length - 1 ? 'mb-4' : ''}>
                                {paragraph}
                              </p>
                            ))}
                          </div>

                          {/* Nombre */}
                          <div className="text-left mb-4 md:mb-1">
                            <p className="font-geist-bold text-base md:text-lg lg:text-xl text-nucleo-highlight uppercase">
                              {t(`testimonial${testimonialIndex}.name`).replace(/,/g, '').toUpperCase()}
                            </p>
                          </div>

                          {/* Imagen en mobile (debajo del nombre) */}
                          <div className="w-full md:hidden flex items-center justify-center mb-4">
                            <div className="relative w-full max-w-[200px] aspect-[3/4] rounded-2xl overflow-hidden">
                              <Image
                                src={t(`testimonial${testimonialIndex}.image`)}
                                alt={t(`testimonial${testimonialIndex}.name`)}
                                fill
                                className="object-contain"
                                sizes="200px"
                              />
                            </div>
                          </div>

                          {/* Posición */}
                          <div className="text-left">
                            <p className="font-geist-regular text-xs md:text-sm lg:text-base text-nucleo-dark-hover-light">
                              {t(`testimonial${testimonialIndex}.position`)}
                            </p>
                          </div>
                        </div>

                        {/* Div derecha: Imagen (solo desktop) */}
                        <div className="hidden md:flex md:w-2/5 flex-shrink-0 items-center justify-start">
                          <div className="relative w-full max-w-[280px] lg:max-w-[300px] aspect-[3/4] rounded-2xl overflow-hidden">
                            <Image
                              src={t(`testimonial${testimonialIndex}.image`)}
                              alt={t(`testimonial${testimonialIndex}.name`)}
                              fill
                              className="object-contain"
                              sizes="(max-width: 1024px) 280px, 300px"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Navegación: Dots a la izquierda, flechas a la derecha */}
            <div className="flex items-center justify-between w-full max-w-[1352px] mt-8 px-2 md:px-4 relative">
              {/* Indicadores (Dots) - Izquierda */}
              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      index === currentIndex
                        ? 'w-8 bg-nucleo-primary'
                        : 'w-2 bg-gray-300'
                    }`}
                    aria-label={`Ir al testimonio ${index + 1}`}
                  />
                ))}
              </div>

              {/* Flechas - Derecha */}
              <div className="flex items-center gap-2">
                {/* Flecha izquierda */}
                <button
                  onClick={goToPrevious}
                  className="bg-white rounded-full p-2 md:p-3 shadow-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
                  aria-label="Testimonio anterior"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-nucleo-dark"
                  >
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>

                {/* Flecha derecha */}
                <button
                  onClick={goToNext}
                  className="bg-white rounded-full p-2 md:p-3 shadow-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
                  aria-label="Siguiente testimonio"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-nucleo-dark"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


