'use client'

import { useEffect } from 'react'
import { getCalApi } from '@calcom/embed-react'

interface CalButtonProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export function CalButton({ children, className, style }: CalButtonProps) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: 'discovery-meeting' })
      cal('ui', {
        theme: 'dark',
        hideEventTypeDetails: false,
        layout: 'month_view',
      })
    })()
  }, [])

  return (
    <button
      data-cal-namespace="discovery-meeting"
      data-cal-link="laurita-florez/discovery-meeting"
      data-cal-config='{"layout":"month_view","theme":"dark"}'
      className={className}
      style={style}
    >
      {children}
    </button>
  )
}

