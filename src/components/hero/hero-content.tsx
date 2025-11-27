'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'

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
  const t = useTranslations('hero')
  const cards = heroCardIds.map(id => ({
    id,
    title: t(`cards.${id}.title`),
    detail: t(`cards.${id}.detail`),
  }))

  return (
    <motion.div
      className="relative z-20 mx-auto max-w-6xl space-y-8 px-6 py-20 text-left text-[#F7F6F3] lg:py-28"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="flex items-center gap-2 text-[#C3BDFF]" variants={itemVariants}>
        <Image
          src="/images/isotipo_detail.svg"
          alt="Detalle isotipo decorativo"
          width={26}
          height={25}
          className="h-4 w-4 sm:h-5 sm:w-5"
          priority
        />
        <span className="font-space-mono text-xs uppercase tracking-[0.3em]">
          {t('tagline')}
        </span>
      </motion.div>

      <motion.h1
        className="mr-10 font-artifictrial-super text-4xl uppercase leading-tight sm:text-5xl lg:text-6xl"
        variants={itemVariants}
      >
        {t('title')}
      </motion.h1>

      <motion.p
        className="max-w-4xl font-artifictrial-regular text-lg text-[#F7F6F3] sm:text-xl lg:text-lg"
        variants={itemVariants}
      >
        {t('subtitle')}
      </motion.p>

      <motion.div className="flex flex-col gap-4 sm:flex-row" variants={itemVariants}>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-full bg-[#6F31FF] px-8 py-4 text-base font-semibold transition-colors hover:bg-[#C3BDFF] hover:text-[#0A0A0A] sm:px-10"
        >
          {t('ctaConversemos')}
        </Link>
        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center rounded-full border-2 border-[#C3BDFF] px-8 py-4 text-base font-semibold transition-colors hover:bg-[#C3BDFF]/10 sm:px-10"
        >
          {t('ctaViewTemplates')}
        </Link>
      </motion.div>

      <div role="presentation" aria-hidden="true" className="h-10 sm:h-12" />

      <motion.div
        className="grid gap-4 sm:grid-cols-3"
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {cards.map(card => (
          <article
            key={card.id}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#050505]"
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-cover bg-center opacity-70 transition duration-500 group-hover:scale-105"
              style={{
                backgroundImage: "url('/images/Post%20mkt%203.jpg')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/90" />
            <div className="relative flex min-h-[520px] flex-col">
              <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-b from-transparent via-black/20 to-black/70" />
              <div className="absolute inset-x-4 bottom-4 rounded-3xl bg-black/40 p-5 backdrop-blur-xl transition-all duration-500 group-hover:-translate-y-6 group-hover:border-white/20 group-hover:bg-black/65">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-artifictrial-regular text-lg leading-tight text-white">
                    {card.title}
                  </p>
                  <Image
                    src="/images/plus_card.svg"
                    alt="Ver más"
                    width={20}
                    height={20}
                    className="transition duration-300 group-hover:scale-110"
                  />
                </div>
                <p className="max-h-0 overflow-hidden font-artifictrial-regular text-sm text-[#F7F6F3] opacity-0 transition-all duration-500 ease-out group-hover:mt-3 group-hover:max-h-40 group-hover:opacity-100">
                  {card.detail}
                </p>
              </div>
            </div>
          </article>
        ))}
      </motion.div>
    </motion.div>
  )
}
