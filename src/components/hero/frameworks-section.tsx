'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { BrowserAnimation } from './browser-animation'

const containerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      staggerChildren: 0.05,
    },
  },
}

const wordVariants = {
  hidden: { opacity: 0.2, y: 12 },
  visible: { opacity: 1, y: 0 },
}

export function FrameworksSection() {
  const t = useTranslations('frameworks')
  const text = t('title').toUpperCase()
  const words = text.split(' ')

  return (
    <section className="section-spacing bg-[#0A0A0A] text-[#F7F6F3]">
      <div className="container mx-auto mt-60 mb-40 px-4">
        <motion.div
          className="mx-auto max-w-5xl text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            className="heading-title flex flex-wrap items-center justify-left gap-x-3 gap-y-2 text-3xl leading-tight sm:text-4xl lg:text-5xl xl:text-7xl"
            variants={containerVariants}
          >
            {words.map((word, index) => (
              <motion.span
                key={`${word}-${index}`}
                variants={wordVariants}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="inline-block"
              >
                {word}
              </motion.span>
            ))}
          </motion.h2>

          {/* Browser Animation */}
          {/* <BrowserAnimation /> */}
        </motion.div>
      </div>
    </section>
  )
}

