'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface AnimatedIconsProps {
  className?: string
}

export function AnimatedIcons({ className }: AnimatedIconsProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const paths = containerRef.current.querySelectorAll('path')

    paths.forEach((path, index) => {
      const pathLength = path.getTotalLength()
      
      gsap.set(path, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      })

      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 2,
        delay: index * 0.3,
        ease: 'power2.inOut',
      })

      gsap.to(path, {
        opacity: [0.5, 1, 0.5],
        duration: 3,
        delay: index * 0.3,
        repeat: -1,
        ease: 'power1.inOut',
      })
    })
  }, [])

  return (
    <div
      ref={containerRef}
      className={`flex items-center gap-8 ${className}`}
    >
      <svg
        width="60"
        height="60"
        viewBox="0 0 100 100"
        className="text-primary"
      >
        <path
          d="M50 10 L90 30 L90 70 L50 90 L10 70 L10 30 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M50 10 L50 50 L10 30 M50 50 L90 30"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>

      <svg
        width="60"
        height="60"
        viewBox="0 0 100 100"
        className="text-primary"
      >
        <path
          d="M20 20 L80 20 L80 80 L20 80 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M35 35 L65 35 L65 65 L35 65 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>

      <svg
        width="60"
        height="60"
        viewBox="0 0 100 100"
        className="text-primary"
      >
        <circle
          cx="50"
          cy="50"
          r="30"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M50 20 L50 50 L70 50"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}


