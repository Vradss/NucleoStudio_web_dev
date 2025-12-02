'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
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
  const t = useTranslations('hero')
  const cards = heroCardIds.map(id => ({
    id,
    title: t(`cards.${id}.title`),
    detail: t(`cards.${id}.detail`),
    image: id === 'build' ? '/images/caso_USO_1.png' 
      : id === 'brand' ? '/images/caso_USO_2.png' 
      : '/images/caso_USO_3.png'
  }))

  return (
    <motion.div
      className="relative z-20 mx-auto max-w-7xl space-y-8 px-6 py-20 text-left text-[#F7F6F3] lg:py-28"
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
            className="group relative h-[450px] overflow-hidden rounded-3xl border border-white/10 bg-[#0A0A0A]"
          >
            {/* Imagen PNG con líneas animadas en la parte superior */}
            <AnimatedCaso casoNumber={
              card.id === 'build' ? 1 : card.id === 'brand' ? 2 : 3
            } />
            
            {/* Gradiente sutil solo en la parte inferior para el texto */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90" />
            <div className="relative flex h-full flex-col justify-end pb-4">
              <div className="relative mx-4 rounded-3xl bg-black/50 p-5 backdrop-blur-md transition-all duration-500 group-hover:backdrop-blur-2xl group-hover:bg-black/70">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-artifictrial-regular text-lg leading-tight text-white">
                    {card.title}
                  </p>
                  <Image
                    src="/images/plus_card.svg"
                    alt="Ver más"
                    width={20}
                    height={20}
                    className="flex-shrink-0 transition duration-300 group-hover:scale-110"
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
