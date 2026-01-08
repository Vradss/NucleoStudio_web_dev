'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { FadeIn } from '@/components/motion/fade-in'
import Image from 'next/image'
import Link from 'next/link'

interface FaqsSectionProps {
  faqIds?: readonly number[]
}

export function FaqsSection({ faqIds }: FaqsSectionProps) {
  const t = useTranslations('faqs')
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  // Si no se proporciona faqIds, mostrar todas las preguntas (1-11)
  const faqs = faqIds || ([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as const)

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const renderAnswer = (answer: string) => {
    // Buscar enlaces en el formato [url]
    const linkRegex = /\[([^\]]+)\]/g
    const parts: Array<{ type: 'text' | 'link'; content: string }> = []
    let lastIndex = 0
    let match

    while ((match = linkRegex.exec(answer)) !== null) {
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: answer.substring(lastIndex, match.index)
        })
      }
      parts.push({
        type: 'link',
        content: match[1]
      })
      lastIndex = match.index + match[0].length
    }

    if (lastIndex < answer.length) {
      parts.push({
        type: 'text',
        content: answer.substring(lastIndex)
      })
    }

    if (parts.length === 0) {
      return <span className="whitespace-pre-line">{answer}</span>
    }

    return (
      <span className="whitespace-pre-line">
        {parts.map((part, idx) => {
          if (part.type === 'link') {
            return (
              <Link
                key={idx}
                href={part.content}
                className="text-nucleo-primary hover:underline font-geist-semibold"
              >
                aquí
              </Link>
            )
          }
          return <span key={idx}>{part.content}</span>
        })}
      </span>
    )
  }

  return (
    <section id="faqs" className="section-layout" style={{ backgroundColor: '#FFFFFA' }}>
      <div className="section-container max-w-full md:max-w-7xl">
        {/* Label */}

        {/* Título */}
        <FadeIn delay={0.1}>
          <h2 className="section-title text-center mb-12 text-nucleo-dark">
            {t('title')}
          </h2>
        </FadeIn>

        {/* FAQs */}
        <div className="space-y-0">
          {faqs.map((faqIndex, index) => {
            const isOpen = openIndex === index
            const isLast = index === faqs.length - 1
            return (
              <FadeIn key={faqIndex} delay={0.2 + index * 0.1}>
                <div className={`overflow-hidden ${!isLast ? 'border-b border-gray-200' : ''}`} style={{ backgroundColor: '#FFFFFA' }}>
                  {/* Pregunta */}
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between px-0 py-4 md:p-6 text-left transition-colors"
                    style={{ backgroundColor: '#FFFFFA' }}
                  >
                    <h3 className="font-geist-semibold text-lg text-nucleo-dark pr-2 md:pr-4">
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
                        className="text-nucleo-primary"
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
                        <div className="px-0 md:px-6 pb-4 md:pb-6">
                          <p className="font-geist-regular text-base text-gray-700 leading-relaxed">
                            {renderAnswer(t(`faq${faqIndex}.answer`))}
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


