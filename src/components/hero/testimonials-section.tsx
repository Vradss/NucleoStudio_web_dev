'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { FadeIn } from '@/components/motion/fade-in'

export function TestimonialsSection() {
  const t = useTranslations('testimonials')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const testimonials = [1, 2, 3, 4, 5, 6] as const
  const marqueeRef = useRef<HTMLDivElement>(null)

  const intervalRef = useRef<number | null>(null)

  // Actualizar índice automáticamente para los indicadores
  useEffect(() => {
    if (isPaused) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      return
    }

    intervalRef.current = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 10000) // Cambiar cada 10 segundos (80s / 6 cards ≈ 13.3s por card)

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [isPaused, testimonials.length])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    // Pausar temporalmente al hacer clic
    setIsPaused(true)
    // Reanudar después de 5 segundos
    setTimeout(() => {
      setIsPaused(false)
    }, 5000)
  }

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
              className="overflow-hidden w-full max-w-[1352px] mx-auto relative"
              style={{ 
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none'
              }}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Gradiente izquierdo */}
              <div 
                className="pointer-events-none absolute left-0 top-0 h-full w-16 md:w-20 lg:w-24"
                style={{
                  background: 'linear-gradient(90deg, rgb(250, 250, 252) 0%, rgba(250, 250, 252, 0) 100%)',
                  zIndex: 30,
                  opacity: 1
                }}
              />
              {/* Gradiente derecho */}
              <div 
                className="pointer-events-none absolute right-0 top-0 h-full w-16 md:w-20 lg:w-24"
                style={{
                  background: 'linear-gradient(270deg, rgb(250, 250, 252) 0%, rgba(250, 250, 252, 0) 100%)',
                  zIndex: 30,
                  opacity: 1
                }}
              />
              
              <div 
                ref={marqueeRef}
                className="flex gap-6 relative z-10 w-fit animate-marquee-testimonials items-stretch"
                style={{ 
                  animationPlayState: isPaused ? 'paused' : 'running'
                }}
              >
                {/* Primera copia */}
                {testimonials.map((testimonialIndex, index) => {
                  return (
                    <div
                      key={`testimonial-1-${testimonialIndex}-${index}`}
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
                        <div className="hidden md:flex md:w-2/5 flex-shrink-0 items-center justify-center">
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
                {/* Segunda copia para loop infinito */}
                {testimonials.map((testimonialIndex, index) => {
                  return (
                    <div
                      key={`testimonial-2-${testimonialIndex}-${index}`}
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
                        <div className="hidden md:flex md:w-2/5 flex-shrink-0 items-center justify-center">
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

            {/* Indicadores */}
            <div className="flex items-center justify-center gap-2 mt-8">
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
          </div>
        </div>
      </div>
    </section>
  )
}

