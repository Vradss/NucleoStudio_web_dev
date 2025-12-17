'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/routing'
import { AnimatedCaso } from './animated-caso'

const heroCardIds = ['build', 'brand', 'ai'] as const

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      staggerChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: 'easeOut' },
  },
}

function renderSubtitleWithHighlight(subtitle: string, locale: string) {
  // Textos a resaltar según el idioma
  const highlightText = locale === 'es' ? 'empresas tech B2B' : 'B2B tech companies'
  const parts = subtitle.split(highlightText)
  
  if (parts.length === 2) {
    return (
      <>
        {parts[0]}<span className="font-geist-medium text-nucleo-highlight">{highlightText}</span>{parts[1]}
      </>
    )
  }
  
  // Fallback: si no se encuentra el texto a resaltar, mostrar el texto original
  return subtitle
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
        <span className="tagline whitespace-nowrap text-[12px] sm:text-sm tracking-[0.08em] sm:tracking-[0.1em]">
          {t('tagline')}
        </span>
      </motion.div>

      <motion.h1
        className="mx-auto font-geist-super text-[41px] leading-tight sm:text-5xl lg:text-7xl whitespace-pre-line"
        variants={itemVariants}
      >
        {t('title').replace(/\/n\/n/g, '\n').replace(/\/n/g, '\n').replace(/^\s*\n+/, '').trim()}
      </motion.h1>

      <motion.p
        className="mx-auto max-w-3xl font-geist-regular text-base text-nucleo-light sm:text-xl lg:text-xl"
        variants={itemVariants}
      >
        {renderSubtitleWithHighlight(subtitle, locale)}
      </motion.p>

      <motion.div className="flex flex-col items-center justify-center gap-4 sm:flex-row" variants={itemVariants}>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold text-nucleo-light transition-all hover:opacity-90 sm:px-10"
          style={{
            background: 'linear-gradient(135deg, #BBBFF9 -15%, #6F31FF 50%, #5F20E5 75%, #1A0B33 100%)',
          }}
        >
          {t('ctaConversemos')}
        </Link>
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
