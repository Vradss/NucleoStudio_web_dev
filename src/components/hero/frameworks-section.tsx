'use client'

import { useTranslations } from 'next-intl'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { BrowserAnimation } from './browser-animation'

export function FrameworksSection() {
  const t = useTranslations('frameworks')
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Detectar el scroll dentro de este contenedor
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end center'], // Empieza cuando entra, termina cuando sale
  })

  const text = t('title').toUpperCase()
  const words = text.split(' ')

  return (
    <motion.section
      ref={containerRef}
      className="section-spacing bg-[#0A0A0A] text-[#F7F6F3]"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="container mx-auto mt-60 mb-40 px-4">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="heading-title flex flex-wrap items-center justify-left gap-x-3 gap-y-2 text-3xl leading-tight sm:text-4xl lg:text-5xl xl:text-7xl">
            {words.map((word, index) => {
              // Cada palabra se revela progresivamente según el scroll
              const start = index / words.length
              const end = (index + 1) / words.length
              
              const opacity = useTransform(
                scrollYProgress,
                [start, end],
                [0.2, 1]
              )

              return (
                <motion.span
                  key={index}
                  style={{ opacity }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              )
            })}
          </h2>
          
          {/* Browser Animation */}
          {/* <BrowserAnimation /> */}
        </div>
      </div>
    </motion.section>
  )
}


