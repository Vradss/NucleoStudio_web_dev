'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Registrar ScrollTrigger una sola vez
gsap.registerPlugin(ScrollTrigger)

// Variable global para la instancia de Lenis
let lenisInstance: Lenis | null = null

export function useLenis() {
  const rafCallbackRef = useRef<((time: number) => void) | null>(null)

  useEffect(() => {
    // Crear instancia de Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    })

    lenisInstance = lenis

    // Sincronizar Lenis con ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Callback para el ticker de GSAP
    const rafCallback = (time: number) => {
      lenis.raf(time * 1000)
    }
    rafCallbackRef.current = rafCallback

    // Agregar Lenis al ticker de GSAP
    gsap.ticker.add(rafCallback)

    // Desactivar lag smoothing para evitar delays
    gsap.ticker.lagSmoothing(0)

    return () => {
      // Limpiar correctamente
      if (rafCallbackRef.current) {
        gsap.ticker.remove(rafCallbackRef.current)
      }
      lenis.destroy()
      lenisInstance = null
    }
  }, [])
}

// Exportar función para obtener la instancia de Lenis
export function getLenis(): Lenis | null {
  return lenisInstance
}
