'use client';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { FadeIn } from '@/components/motion/fade-in';

// Registrar ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

interface Card {
  id: number;
  key: string;
}

const cards: Card[] = [
  { id: 1, key: 'stage1' },
  { id: 2, key: 'stage2' },
  { id: 3, key: 'stage3' },
  { id: 4, key: 'stage4' }
];

function renderCardSubtitleWithHighlight(text: string, cardKey: string, locale: string) {
  const highlightTexts: Record<string, string[]> = {
    stage1: locale === 'es'
      ? ['mapa de oportunidades']
      : ['differentiation opportunities map'],
    stage2: locale === 'es'
      ? ['definimos los segmentos prioritarios']
      : ['define the priority segments'],
    stage3: locale === 'es'
      ? ['qué comunicar a cada audiencia']
      : ['what to communicate to each audience'],
    stage4: locale === 'es'
      ? ['assets que tu equipo puede usar desde el día 1']
      : ['assets that your team can use from day 1']
  }

  const textsToHighlight = highlightTexts[cardKey] || []
  const parts: Array<{ text: string; highlight: boolean }> = []
  let lastIndex = 0

  const matches: Array<{ start: number; end: number; text: string }> = []

  textsToHighlight.forEach((highlightText) => {
    const regex = new RegExp(highlightText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')
    let match
    while ((match = regex.exec(text)) !== null) {
      matches.push({
        start: match.index,
        end: match.index + match[0].length,
        text: match[0]
      })
    }
  })

  matches.sort((a, b) => a.start - b.start)

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
          <span key={index} className="font-geist-super text-nucleo-light">
            {part.text}
          </span>
        ) : (
          <span key={index}>{part.text}</span>
        )
      )}
    </>
  )
}

export default function ScrollHorizontal() {
  const t = useTranslations('steps');
  const locale = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isClient, setIsClient] = useState(false);

  // Detectar cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Detectar si es mobile o tablet (< 1024px usa layout vertical)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // GSAP ScrollTrigger animation
  useEffect(() => {
    if (!isClient || isMobile || !trackRef.current || !sectionRef.current) return;

    const track = trackRef.current;
    const section = sectionRef.current;

    let ctx: gsap.Context;
    let scrollTriggerInstance: ScrollTrigger | null = null;

    // Pequeño delay para asegurar que todo esté montado y Lenis inicializado
    const timer = setTimeout(() => {
      if (!track || !section) return;

      const scrollWidth = track.scrollWidth;
      const windowWidth = window.innerWidth;
      const scrollDistance = scrollWidth - windowWidth;

      // Usar gsap.context para limpieza automática
      ctx = gsap.context(() => {
        // Crear la animación horizontal
        // Dividir scrollDistance para hacer el scroll más rápido
        const scrollSpeed = scrollDistance * 0.5; // 50% más rápido

        // Buscar el elemento de fondo para la transición de color
        const bgElement = document.querySelector('.scroll-color-bg') as HTMLElement;

        const tween = gsap.to(track, {
          x: -scrollDistance,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${scrollSpeed}`,
            pin: true,
            scrub: 0.5, // Más responsivo
            invalidateOnRefresh: true,
            anticipatePin: 1,
            // markers: true, // Descomentar para debug
            onLeave: () => {
              // Cuando termina el scroll horizontal, cambiar a negro
              if (bgElement) {
                bgElement.style.backgroundColor = '#17171A';
              }
            },
            onEnterBack: () => {
              // Si vuelve atrás, restaurar blanco
              if (bgElement) {
                bgElement.style.backgroundColor = '#FFFFFA';
              }
            }
          }
        });

        scrollTriggerInstance = tween.scrollTrigger as ScrollTrigger;
      }, section);

      // Refresh después de crear
      ScrollTrigger.refresh();
    }, 300);

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      if (ctx) {
        ctx.revert();
      }
    };
  }, [isClient, isMobile]);

  // Mobile: ScrollTrigger para transición de color
  useEffect(() => {
    if (!isClient || !isMobile) return;

    const section = document.getElementById('solucion');
    const bgElement = document.querySelector('.scroll-color-bg') as HTMLElement;

    if (!section || !bgElement) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'bottom 50%',
        end: 'bottom 0%',
        onLeave: () => {
          if (bgElement) {
            bgElement.style.backgroundColor = '#17171A';
          }
        },
        onEnterBack: () => {
          if (bgElement) {
            bgElement.style.backgroundColor = '#FFFFFA';
          }
        }
      });
    });

    return () => {
      ctx.revert();
    };
  }, [isClient, isMobile]);

  // Mobile layout
  if (isMobile) {
    return (
      <section id="solucion" className="section-layout scroll-horizontal-section scroll-horizontal-mobile">
        <div className="scroll-horizontal-mobile-wrapper">
          <FadeIn delay={0}>
            <div className="mx-auto max-w-8xl text-center px-5">
              <div className="flex items-center justify-center gap-2 mb-4">
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
              <div className="scroll-horizontal-title-container mx-auto">
                <h2 className="section-title text-nucleo-dark">
                  {t('titleLine1')}
                </h2>
              </div>
            </div>
          </FadeIn>
          <div className="scroll-horizontal-cards-mobile">
            {cards.map((card, index) => (
              <FadeIn key={card.id} delay={0.2 + index * 0.1}>
                <div className="scroll-horizontal-card">
                  <div className={`scroll-horizontal-card-image card-${card.id}`}>
                    <Image
                      src={t(`cards.${card.key}.image`)}
                      alt={t(`cards.${card.key}.imageAlt`)}
                      width={600}
                      height={500}
                      className="scroll-horizontal-image"
                      unoptimized={true}
                      style={{
                        objectFit: 'contain',
                        objectPosition: 'center',
                      }}
                    />
                  </div>
                  <div className="scroll-horizontal-card-content">
                    <div className="flex items-center gap-2">
                      <Image
                        src="/images/isotipo_detail.svg"
                        alt="Detalle isotipo decorativo"
                        width={26}
                        height={25}
                        className="h-4 w-4 sm:h-5 sm:w-5"
                        unoptimized
                      />
                      <p className="tagline-secondary">
                        {t(`cards.${card.key}.label`)}
                      </p>
                    </div>
                    <h3 className="font-geist-semibold text-[30px] sm:text-3xl lg:text-[40px] text-nucleo-light mt-6 leading-tight lg:leading-[1.2]">
                      {t(`cards.${card.key}.title`)}
                    </h3>
                    <p className="heading-subtitle mt-6 text-sm text-nucleo-light opacity-80 sm:text-base lg:text-lg">
                      {renderCardSubtitleWithHighlight(t(`cards.${card.key}.subtitle`), card.key, locale)}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Desktop layout con scroll horizontal
  return (
    <section ref={sectionRef} id="solucion" className="scroll-horizontal-section">
      {/* Header con título */}
      <div className="scroll-horizontal-header">
        <div className="mx-auto max-w-7xl text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
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
          <div className="scroll-horizontal-title-container max-w-5xl mx-auto">
            <h2 className="scroll-horizontal-title">
              {t('titleLine1')}
            </h2>
          </div>
        </div>
      </div>

      {/* Track horizontal - se mueve con GSAP */}
      <div ref={trackRef} className="scroll-horizontal-track">
        {/* Spacer inicial para que los cards aparezcan desde la derecha */}
        <div className="scroll-horizontal-spacer" aria-hidden="true" />

        {cards.map((card) => (
          <div key={card.id} className="scroll-horizontal-card">
            <div className={`scroll-horizontal-card-image card-${card.id}`}>
              <Image
                src={t(`cards.${card.key}.image`)}
                alt={t(`cards.${card.key}.imageAlt`)}
                width={600}
                height={500}
                className="scroll-horizontal-image"
                unoptimized={true}
                style={{
                  objectFit: 'contain',
                  objectPosition: 'center',
                }}
              />
            </div>
            <div className="scroll-horizontal-card-content">
              <div className="flex items-center gap-2">
                <Image
                  src="/images/isotipo_detail.svg"
                  alt="Detalle isotipo decorativo"
                  width={26}
                  height={25}
                  className="h-4 w-4 sm:h-5 sm:w-5"
                  unoptimized
                />
                <p className="tagline-secondary">
                  {t(`cards.${card.key}.label`)}
                </p>
              </div>
              <h3 className="font-geist-semibold text-[30px] sm:text-3xl lg:text-[40px] text-nucleo-light mt-6 leading-tight lg:leading-[1.2]">
                {t(`cards.${card.key}.title`)}
              </h3>
              <p className="heading-subtitle mt-6 text-sm text-nucleo-light opacity-80 sm:text-base lg:text-lg">
                {renderCardSubtitleWithHighlight(t(`cards.${card.key}.subtitle`), card.key, locale)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
