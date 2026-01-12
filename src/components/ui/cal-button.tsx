'use client'

import { useLocale } from 'next-intl'

interface CalButtonProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export function CalButton({ children, className, style }: CalButtonProps) {
  const locale = useLocale()

  return (
    <a
      href={`/${locale}/conversemos`}
      className={className}
      style={style}
    >
      {children}
    </a>
  )
}

