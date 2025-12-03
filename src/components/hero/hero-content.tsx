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

export function HeroContent() {
  const locale = useLocale()
  const t = useTranslations('hero')
  const cards = heroCardIds.map(id => ({
    id,
    title: t(`cards.${id}.title`),
  }))

  return (
    <motion.div
      key={locale}
      className="relative z-20 mx-auto max-w-7xl space-y-10 px-6 py-20 text-center text-[#F7F6F3] lg:py-28"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="flex items-center justify-center gap-2 text-[#C3BDFF]" variants={itemVariants}>
        <Image
          src="/images/isotipo_detail.svg"
          alt="Detalle isotipo decorativo"
          width={26}
          height={25}
          className="h-4 w-4 sm:h-5 sm:w-5"
          priority
        />
        <span className="font-space-mono text-base uppercase tracking-[0.3em]">
          {t('tagline')}
        </span>
      </motion.div>

      <motion.h1
        className="mx-auto font-artifictrial-super text-[32px] leading-tight sm:text-5xl lg:text-7xl whitespace-pre-line"
        variants={itemVariants}
      >
        {t('title').replace(/\/n\/n/g, '\n').replace(/\/n/g, '\n').replace(/^\s*\n+/, '').trim()}
      </motion.h1>

      <motion.p
        className="mx-auto max-w-3xl font-artifictrial-regular text-base text-[#F7F6F3] sm:text-xl lg:text-xl"
        variants={itemVariants}
      >
        {t('subtitle')}
      </motion.p>

      <motion.div className="flex flex-col items-center justify-center gap-4 sm:flex-row" variants={itemVariants}>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-full bg-[#1E1E1E] border border-white/10 px-8 py-4 text-base font-semibold transition-colors hover:bg-[#0A0A0A] hover:text-[#F7F6F3] sm:px-10"
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
            className="relative h-[450px] overflow-hidden rounded-3xl border border-white/10 bg-[#0A0A0A] flex flex-col"
          >
            <div className="relative z-10 px-6 pt-6 pb-4">
              <p className="font-artifictrial-semibold text-lg leading-tight text-[#CDB9FF]">
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
