'use client'

import { Link } from '@/i18n/routing'

interface CalButtonProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export function CalButton({ children, className, style }: CalButtonProps) {
  return (
    <Link
      href="/conversemos"
      className={className}
      style={style}
    >
      {children}
    </Link>
  )
}

