'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { FadeIn } from '@/components/motion/fade-in'
import Image from 'next/image'

export function FaqsSection() {
  const t = useTranslations('faqs')
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const faqs = [1, 2, 3, 4] as const

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="relative bg-[#0A0A0A] py-16 px-6 lg:px-24 lg:py-24">
      <div className="mx-auto max-w-4xl">
        {/* Label */}

        {/* Título */}
        <FadeIn delay={0.1}>
          <h2 className="text-center text-[32px] font-artifictrial-semibold leading-tight text-[#F7F6F3] sm:text-4xl mb-12">
            {t('title')}
          </h2>
        </FadeIn>

        {/* FAQs */}
        <div className="space-y-4">
          {faqs.map((faqIndex, index) => {
            const isOpen = openIndex === index
            return (
              <FadeIn key={faqIndex} delay={0.2 + index * 0.1}>
                <div className="border border-[#1F1F1F] rounded-2xl bg-[#101010] overflow-hidden">
                  {/* Pregunta */}
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-[#151515] transition-colors"
                  >
                    <h3 className="font-artifictrial-semibold text-lg text-[#F7F6F3] pr-4">
                      {t(`faq${faqIndex}.question`)}
                    </h3>
                    <motion.div
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="flex-shrink-0"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-[#C3BDFF]"
                      >
                        <path
                          d="M12 5V19M5 12H19"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.div>
                  </button>

                  {/* Respuesta */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6">
                          <p className="font-artifictrial-regular text-base text-[#F7F6F3]/80 leading-relaxed">
                            {t(`faq${faqIndex}.answer`)}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}


