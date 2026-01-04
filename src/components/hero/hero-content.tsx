'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { AnimatedCaso } from './animated-caso'
import { CalButton } from '@/components/ui/cal-button'

const heroCardIds = ['build', 'brand', 'ai'] as const

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    filter: 'blur(4px)'
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { 
      duration: 0.8, 
      ease: [0.4, 0, 0.2, 1] // cubic-bezier más suave
    },
  },
}

function renderSubtitleWithHighlight(subtitle: string, locale: string) {
  // Textos a resaltar según el idioma
  const highlightTexts = locale === 'es' 
    ? ['empresas tech B2B a clarificar sus propuestas de valor']
    : ['help B2B tech companies clarify their value propositions']
  
  let result = subtitle
  const parts: Array<{ text: string; highlight: boolean }> = []
  let lastIndex = 0
  
  // Encontrar todas las coincidencias
  const matches: Array<{ start: number; end: number; text: string }> = []
  
  highlightTexts.forEach((highlightText) => {
    const regex = new RegExp(highlightText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')
    let match
    while ((match = regex.exec(subtitle)) !== null) {
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
        text: subtitle.substring(lastIndex, match.start),
        highlight: false,
      })
    }
    parts.push({
      text: match.text,
      highlight: true,
    })
    lastIndex = match.end
  })
  
  if (lastIndex < subtitle.length) {
    parts.push({
      text: subtitle.substring(lastIndex),
      highlight: false,
    })
  }
  
  if (parts.length === 0) {
    return subtitle
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

function renderTitleWithHighlight(title: string, locale: string) {
  // Limpiar los saltos de línea primero
  const cleanTitle = title.replace(/\/n\/n/g, '\n').replace(/\/n/g, '\n').replace(/^\s*\n+/, '').trim()
  
  // Texto a resaltar según el idioma
  const highlightTexts = locale === 'es' 
    ? ['si no entienden qué hacen']
    : ["product's value isn't clear"]
  
  const parts: Array<{ text: string; highlight: boolean }> = []
  let lastIndex = 0
  
  // Encontrar todas las coincidencias
  const matches: Array<{ start: number; end: number; text: string }> = []
  
  highlightTexts.forEach((highlightText) => {
    // Escapar caracteres especiales para regex, reemplazando apóstrofes por una clase que acepta ambos tipos
    const escaped = highlightText
      .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      .replace(/'/g, "[\\u2018\\u2019']") // Acepta apóstrofes curvos (') y rectos (')
    const regex = new RegExp(escaped, 'gi')
    let match
    while ((match = regex.exec(cleanTitle)) !== null) {
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
        text: cleanTitle.substring(lastIndex, match.start),
        highlight: false,
      })
    }
    parts.push({
      text: match.text,
      highlight: true,
    })
    lastIndex = match.end
  })
  
  if (lastIndex < cleanTitle.length) {
    parts.push({
      text: cleanTitle.substring(lastIndex),
      highlight: false,
    })
  }
  
  if (parts.length === 0) {
    return cleanTitle
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

export function HeroContent() {
  const locale = useLocale()
  const t = useTranslations('hero')
  const cards = heroCardIds.map(id => ({
    id,
    title: t(`cards.${id}.title`),
  }))
  const subtitle = t('subtitle')

  return (
    <motion.div
      key={locale}
      className="relative z-20 mx-auto max-w-7xl space-y-6 sm:space-y-8 lg:space-y-10 px-6 py-12 sm:py-16 lg:py-28 text-center text-nucleo-light"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div className="flex items-center justify-center gap-1.5 sm:gap-2 text-nucleo-secondary whitespace-nowrap mb-4" variants={itemVariants}>
        <Image
          src="/images/isotipo_detail.svg"
          alt="Detalle isotipo decorativo"
          width={26}
          height={25}
          className="h-3 w-3 flex-shrink-0 sm:h-5 sm:w-5"
          priority
        />
        <span className="tagline whitespace-nowrap text-[12px] sm:text-sm tracking-[0.1em] sm:tracking-[0.1em]">
          {t('tagline')}
        </span>
      </motion.div>

      <motion.h1
        className="mx-auto font-geist-black text-[36px] leading-tight sm:text-5xl lg:text-[75px] whitespace-pre-line"
        variants={itemVariants}
      >
        {renderTitleWithHighlight(t('title'), locale)}
      </motion.h1>

      <motion.p
        className="mx-auto max-w-5xl font-geist-regular text-[15px] text-nucleo-light sm:text-xl lg:text-[22px]"
        variants={itemVariants}
      >
        {renderSubtitleWithHighlight(subtitle, locale)}
      </motion.p>

      <motion.div className="flex flex-col items-center justify-center gap-4 sm:flex-row" variants={itemVariants}>
        <CalButton
          className="inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold text-nucleo-light transition-all hover:opacity-90 sm:px-10 cursor-pointer"
          style={{
            background: 'linear-gradient(135deg, #6F31FF 50%, #5F20E5 75%, #1A0B33 100%)',
          }}
        >
          {t('ctaConversemos')}
        </CalButton>
      </motion.div>

      <div role="presentation" aria-hidden="true" className="h-10 sm:h-12" />

      {/* Cards del hero section comentados */}
      {/* <motion.div
        className="grid gap-4 sm:grid-cols-3"
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {cards.map(card => (
          <article
            key={card.id}
            className="relative h-[450px] overflow-hidden rounded-3xl border border-nucleo-light-opacity-10 bg-nucleo-dark flex flex-col"
          >
            <div className="relative z-10 px-6 pt-6 pb-4">
              <p className="font-geist-semibold text-lg leading-tight text-nucleo-highlight">
                {card.title}
              </p>
            </div>
            
            <div className="relative flex-1">
              <AnimatedCaso casoNumber={
                card.id === 'build' ? 1 : card.id === 'brand' ? 2 : 3
              } />
            </div>
          </article>
        ))}
      </motion.div> */}
    </motion.div>
  )
}
