'use client'

import { useEffect } from 'react'
import Clarity from '@microsoft/clarity'

export function ClarityAnalytics() {
  useEffect(() => {
    const clarityId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID

    // Solo inicializar en producción y si existe el ID
    if (process.env.NODE_ENV === 'production' && clarityId) {
      Clarity.init(clarityId)
    }
  }, [])

  return null
}

