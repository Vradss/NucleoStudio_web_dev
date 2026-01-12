'use client'

import { useEffect } from 'react'
import { getCalApi } from '@calcom/embed-react'

export function CalEmbed() {
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo({ top: 0, behavior: 'instant' })

    ;(async function () {
      const cal = await getCalApi({ namespace: 'discovery-meeting' })
      cal('ui', {
        theme: 'dark',
        hideEventTypeDetails: false,
        layout: 'month_view',
      })
      cal('inline', {
        elementOrSelector: '#cal-embed',
        calLink: 'laurita-florez/discovery-meeting',
        config: {
          layout: 'month_view',
          theme: 'dark',
        },
      })
    })()
  }, [])

  return (
    <div
      id="cal-embed"
      style={{
        width: '100%',
        height: '100%',
        overflow: 'scroll',
        minHeight: '700px',
      }}
      data-cal-namespace="discovery-meeting"
      data-cal-link="laurita-florez/discovery-meeting"
      data-cal-config='{"layout":"month_view","theme":"dark"}'
    />
  )
}
