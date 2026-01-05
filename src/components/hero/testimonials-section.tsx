'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { FadeIn } from '@/components/motion/fade-in'

// Helper function to map testimonial logos to actual file paths
function getLogoPath(logoPath: string): string {
  const logoMap: Record<string, string> = {
    '/images/logos/Colectivo_23.png': '/images/testimonios/logo_colectivo.svg',
    '/images/logos/Logo_shift.svg': '/images/testimonios/logo_shift.svg',
    '/images/logos/INVOINET_LOGO.svg': '/images/testimonios/logo_invoinet.svg',
    '/images/logos/reevalua_logo.svg': '/images/testimonios/logo_okr_university.png',
    '/images/logos/Logo_BioActiva.svg': '/images/testimonios/Logo_BioActiva.svg',
    '/images/logos/ngrowth.svg': '/images/testimonios/ngrowth_logo.svg',
  }
  
  return logoMap[logoPath] || logoPath
}

export function TestimonialsSection() {
  const t = useTranslations('testimonials')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const testimonials = [1, 2, 3, /* 4 */ 5, 6, 7] as const // Comentado: Luis Chao (testimonial 4)
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
    <section className="relative min-h-screen overflow-hidden py-24 px-6 lg:px-24 lg:py-24" style={{ backgroundColor: '#FFFFFA', position: 'relative', zIndex: 50 }}>
      {/* Contenido */}
      <div className="relative z-10">
        <div className="mx-auto max-w-7xl">
          {/* Label */}
          <FadeIn delay={0}>
            <div className="flex items-center justify-left gap-2 mb-4">
              <Image
                src="/images/isotipo_morado_fuerte.svg"
                alt="Detalle isotipo decorativo"
                width={26}
                height={25}
                className="h-4 w-4 sm:h-5 sm:w-5"
                priority
                unoptimized
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
                  const companyLogo = getLogoPath(t(`testimonial${testimonialIndex}.companyLogo`))
                  const quote = t(`testimonial${testimonialIndex}.quote`)
                  const name = t(`testimonial${testimonialIndex}.name`)
                  const position = t(`testimonial${testimonialIndex}.position`)
                  const image = t(`testimonial${testimonialIndex}.image`)
                  
                  return (
                    <div
                      key={`testimonial-${testimonialIndex}-${index}`}
                      className="w-[calc(100vw-3rem)] md:w-[800px] lg:max-w-[1000px] lg:w-[1000px] flex-shrink-0 h-full lg:h-[550px]"
                    >
                      <div className="bg-nucleo-dark-secondary rounded-3xl p-6 md:p-8 lg:p-12 relative h-full flex flex-col overflow-hidden">
                        {/* Testimonio con comillas */}
                        <div className="relative mb-8 md:mb-10 flex-1">
                          {/* Logo de la empresa - Alineado con el texto */}
                          <div className="mb-6 md:mb-16 flex items-center justify-start">
                            <div className="relative h-8 md:h-10 lg:h-12 w-auto">
                              <Image
                                src={companyLogo}
                                alt={t(`testimonial${testimonialIndex}.companyName`)}
                                width={200}
                                height={80}
                                className="h-full w-auto object-contain object-left"
                                style={{ maxWidth: '200px' }}
                                unoptimized
                              />
                            </div>
                          </div>
                          
                          {/* Texto del testimonio */}
                          <div className="relative z-10 font-geist-regular text-base md:text-lg lg:text-xl text-nucleo-light leading-relaxed text-left">
                            {quote.split('/n/n').map((paragraph, pIndex, array) => (
                              <p key={pIndex} className={pIndex < array.length - 1 ? 'mb-4' : ''}>
                                {paragraph}
                              </p>
                            ))}
                          </div>
                          
                          {/* Comillas decorativas - Al final del texto, a la altura del logo */}
                          <div className="absolute top-0 right-0 z-0">
                            <Image
                              src="/images/testimonios/comillas2.png"
                              alt="Comillas decorativas"
                              width={80}
                              height={80}
                              className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 opacity-30"
                              unoptimized
                            />
                          </div>
                        </div>

                        {/* Información de la persona - Parte inferior */}
                        <div className="flex items-center gap-4 md:gap-6">
                          {/* Foto circular */}
                          <div className="relative flex-shrink-0">
                            <div className="relative w-16 h-16 md:w-20 md:h-20 lg:w-20 lg:h-20 rounded-full overflow-hidden">
                              <Image
                                src={image}
                                alt={name}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 64px, (max-width: 1024px) 80px, 96px"
                                unoptimized
                              />
                            </div>
                          </div>

                          {/* Nombre y posición */}
                          <div className="flex flex-col">
                            <p className="font-geist-bold text-base md:text-lg lg:text-xl text-nucleo-highlight uppercase">
                              {name.replace(/,/g, '').toUpperCase()}
                            </p>
                            <p className="font-geist-regular text-sm md:text-base lg:text-lg text-nucleo-dark-hover-light">
                              {position}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Controles: Pointers a la izquierda, Botones a la derecha */}
            <div className="flex items-center justify-between w-full mt-4">
              {/* Indicadores (Dots) - Izquierda */}
              <div className="flex items-center justify-start gap-1">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className="min-w-[24px] min-h-[24px] flex items-center justify-center cursor-pointer"
                    aria-label={`Ir al testimonio ${index + 1}`}
                  >
                    <span
                      className={`h-2 rounded-full transition-all ${
                        index === currentIndex
                          ? 'w-8 bg-nucleo-primary'
                          : 'w-2 bg-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>

              {/* Botones de navegación - Derecha */}
              <div className="flex items-center gap-2">
                {/* Flecha izquierda */}
                <button
                  onClick={goToPrevious}
                  className="border border-nucleo-primary rounded-full p-3 hover:bg-nucleo-primary/10 transition-colors flex items-center justify-center"
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
                    className="text-nucleo-primary"
                  >
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>

                {/* Flecha derecha */}
                <button
                  onClick={goToNext}
                  className="border border-nucleo-primary rounded-full p-3 hover:bg-nucleo-primary/10 transition-colors flex items-center justify-center"
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
                    className="text-nucleo-primary"
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


