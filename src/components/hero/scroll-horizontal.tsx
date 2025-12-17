'use client';
import { useScroll, useTransform, motion } from 'framer-motion';
import React, { useRef, useState, useLayoutEffect, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { FadeIn } from '@/components/motion/fade-in';

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

export default function ScrollHorizontal() {
  const t = useTranslations('steps');
  const container = useRef<HTMLElement>(null);
  const cardsContainer = useRef<HTMLDivElement>(null);
  const cardsWrapper = useRef<HTMLDivElement>(null);
  const [scrollDistance, setScrollDistance] = useState<number>(0);
  const [sectionHeight, setSectionHeight] = useState<number>(500);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Detectar si es mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useLayoutEffect(() => {
    // No calcular scroll en mobile
    if (isMobile) return;

    const calculateScroll = () => {
      if (cardsWrapper.current && cardsContainer.current && container.current) {
        // Esperar un frame para que las imágenes se rendericen
        requestAnimationFrame(() => {
          if (cardsWrapper.current && cardsContainer.current && container.current) {
            const wrapperWidth = cardsWrapper.current.scrollWidth;
            const containerWidth = cardsContainer.current.offsetWidth;
            // El scroll distance es la diferencia entre el ancho total y el ancho visible
            // Esto nos dice cuánto necesitamos desplazar horizontalmente
            // Reducimos el buffer para una transición más precisa
            const distance = Math.max(0, wrapperWidth - containerWidth);
            setScrollDistance(distance);
            
            // Calcular la altura de la sección basada en el scroll distance
            // Necesitamos suficiente altura para que el scroll horizontal se complete
            const viewportHeight = window.innerHeight;
            // La altura debe ser suficiente para que el scroll vertical permita
            // completar el scroll horizontal de manera fluida
            // Usamos: viewport height + scroll distance (para que cada pixel de scroll vertical
            // mueva aproximadamente 1 pixel de scroll horizontal)
            // Reducimos el buffer para evitar el "cuelgue" al final
            const calculatedHeight = viewportHeight + distance + (viewportHeight * 0.1);
            // Mínimo 2.5 viewports para asegurar que haya suficiente espacio sin exceso
            setSectionHeight(Math.max(calculatedHeight, viewportHeight * 2.5));
          }
        });
      }
    };

    // Calcular inmediatamente
    calculateScroll();
    
    // Recalcular después de un pequeño delay para asegurar que todo esté renderizado
    const timeoutId = setTimeout(() => {
      calculateScroll();
    }, 100);
    
    // Recalcular después de que las imágenes se carguen
    const images = cardsWrapper.current?.querySelectorAll('img');
    let loadedCount = 0;
    const totalImages = images?.length || 0;
    
    const onImageLoad = () => {
      loadedCount++;
      if (loadedCount === totalImages) {
        calculateScroll();
      }
    };
    
    if (images && totalImages > 0) {
      images.forEach((img) => {
        if (img.complete) {
          onImageLoad();
        } else {
          img.addEventListener('load', onImageLoad);
          img.addEventListener('error', onImageLoad);
        }
      });
    }

    window.addEventListener('resize', calculateScroll);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', calculateScroll);
      if (images) {
        images.forEach((img) => {
          img.removeEventListener('load', onImageLoad);
          img.removeEventListener('error', onImageLoad);
        });
      }
    };
  }, [isMobile]);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
    layoutEffect: false
  });

  const x = useTransform(
    scrollYProgress, 
    [0, 1], 
    [0, scrollDistance > 0 ? -scrollDistance : 0],
    {
      clamp: true // Cambiar a true para evitar que el scroll continúe más allá del límite
    }
  );

  return (
    <section 
      ref={container} 
      id="solucion"
      className={`scroll-horizontal-section ${isMobile ? 'scroll-horizontal-mobile' : ''}`}
      style={!isMobile ? { height: `${sectionHeight}px` } : {}}
    >
      <div className={`scroll-horizontal-sticky ${isMobile ? 'scroll-horizontal-mobile-sticky' : ''}`}>
        {isMobile ? (
          <>
            <FadeIn delay={0}>
              <div className="mx-auto max-w-8xl text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
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
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="scroll-horizontal-title-container max-w-[900px] mx-auto">
                <h2 className="section-title text-nucleo-dark">
                  {t('titleLine1')} te {t('titleLine2').replace('te ', '')}
                </h2>
              </div>
            </FadeIn>
          </>
        ) : (
          <>
            <div className="mx-auto max-w-7xl text-center ">
              <div className="flex items-center justify-center gap-2 mb-4">
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
            </div>
            <div className="scroll-horizontal-title-container max-w-[900px] mx-auto">
              <h2 className="scroll-horizontal-title">
                {t('titleLine1')} te {t('titleLine2').replace('te ', '')}
              </h2>
            </div>
          </>
        )}
        <div ref={cardsContainer} className="scroll-horizontal-cards-container">
          <motion.div 
            ref={cardsWrapper}
            className="scroll-horizontal-cards-wrapper"
            style={isMobile ? {} : { x }}
          >
            {cards.map((card, index) => {
              const cardContent = (
                <div className="scroll-horizontal-card">
                  <div className={`scroll-horizontal-card-image card-${card.id}`}>
                    <Image 
                      src={t(`cards.${card.key}.image`)}
                      alt={t(`cards.${card.key}.imageAlt`)}
                      width={600}
                      height={500}
                      className="scroll-horizontal-image"
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
                      />
                      <p className="tagline-secondary">
                        {t(`cards.${card.key}.label`)}
                      </p>
                    </div>
                    <h3 className="font-geist-semibold text-[30px] sm:text-3xl lg:text-4xl text-nucleo-light mt-6 leading-tight">
                      {t(`cards.${card.key}.title`)}
                    </h3>
                    <p className="heading-subtitle mt-6 text-sm text-nucleo-light opacity-80 sm:text-base lg:text-lg">
                      {t(`cards.${card.key}.subtitle`)}
                    </p>
                  </div>
                </div>
              );

              return isMobile ? (
                <FadeIn key={card.id} delay={0.2 + index * 0.1}>
                  {cardContent}
                </FadeIn>
              ) : (
                <div key={card.id}>{cardContent}</div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

