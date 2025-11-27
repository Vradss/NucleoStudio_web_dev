'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface FadeSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  viewportAmount?: number
}

export function FadeSection({
  children,
  className,
  delay = 0,
  viewportAmount = 0.2,
}: FadeSectionProps) {
  return (
    <motion.section
      className={cn(className)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: viewportAmount }}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
    >
      {children}
    </motion.section>
  )
}

