'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ColorTransition {
  triggerSelector: string
  toColor: string
  start?: string
  end?: string
}

interface ScrollColorSectionsProps {
  children: React.ReactNode
  initialColor: string
  transitions: ColorTransition[]
  className?: string
}

export function ScrollColorSections({
  children,
  initialColor,
  transitions,
  className = ''
}: ScrollColorSectionsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !bgRef.current) return

    const container = containerRef.current
    const bg = bgRef.current

    const ctx = gsap.context(() => {
      transitions.forEach((transition) => {
        const trigger = container.querySelector(transition.triggerSelector)
        if (!trigger) return

        gsap.to(bg, {
          backgroundColor: transition.toColor,
          ease: 'none',
          scrollTrigger: {
            trigger: trigger,
            start: transition.start || 'top 80%',
            end: transition.end || 'top 20%',
            scrub: 0.5,
          }
        })
      })
    }, container)

    return () => {
      ctx.revert()
    }
  }, [transitions])

  return (
    <div ref={containerRef} className={`relative scroll-color-wrapper ${className}`}>
      {/* Fondo animado */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 scroll-color-bg"
        style={{
          backgroundColor: initialColor,
          transition: 'background-color 0.3s ease-out'
        }}
      />
      {/* Contenido */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
