'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface ParallaxBoxesProps {
  className?: string
}

export function ParallaxBoxes({ className }: ParallaxBoxesProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const boxes = containerRef.current.querySelectorAll('.parallax-box')

    boxes.forEach((box, index) => {
      gsap.set(box, {
        opacity: 0,
        y: 50,
      })

      gsap.to(box, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: index * 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: box,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      })

      gsap.to(box, {
        y: -30,
        scrollTrigger: {
          trigger: box,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    })
  }, [])

  const boxSizes = [
    'w-32 h-32',
    'w-24 h-40',
    'w-40 h-24',
    'w-28 h-28',
    'w-36 h-20',
    'w-20 h-36',
  ]

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className={`parallax-box absolute rounded-lg border border-primary/20 bg-primary/5 backdrop-blur-sm ${boxSizes[i % boxSizes.length]}`}
          style={{
            left: `${(i * 13) % 85}%`,
            top: `${(i * 17) % 80}%`,
          }}
        />
      ))}
    </div>
  )
}


