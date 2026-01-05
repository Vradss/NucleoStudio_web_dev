'use client'

import { useEffect, useRef, useState } from 'react'

declare global {
  interface Window {
    UnicornStudio?: {
      addScene: (config: Record<string, unknown>) => Promise<{ destroy: () => void }>
      destroy: () => void
    }
  }
}

interface UnicornEmbedProps {
  className?: string
  style?: React.CSSProperties
  filePath?: string
  dpi?: number
}

// Cargar script de forma asíncrona y no bloqueante
const loadUnicornScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Si ya está cargado, resolver inmediatamente
    if (window.UnicornStudio) {
      resolve()
      return
    }

    // Verificar si el script ya se está cargando
    const existingScript = document.querySelector(
      'script[src*="unicornstudio.js"]'
    )
    if (existingScript) {
      // Esperar a que termine de cargar
      existingScript.addEventListener('load', () => {
        const check = setInterval(() => {
          if (window.UnicornStudio) {
            clearInterval(check)
            resolve()
          }
        }, 50)
        // Timeout de seguridad
        setTimeout(() => {
          clearInterval(check)
          if (!window.UnicornStudio) {
            reject(new Error('UnicornStudio failed to load'))
          }
        }, 5000)
      })
      return
    }

    // Cargar script de forma asíncrona y no bloqueante
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.0/dist/unicornStudio.umd.js'
    script.async = true
    script.defer = true
    script.crossOrigin = 'anonymous'
    
    script.onload = () => {
      // Esperar a que se inicialice
      const check = setInterval(() => {
        if (window.UnicornStudio) {
          clearInterval(check)
          resolve()
        }
      }, 50)
      // Timeout de seguridad
      setTimeout(() => {
        clearInterval(check)
        if (!window.UnicornStudio) {
          reject(new Error('UnicornStudio failed to initialize'))
        }
      }, 5000)
    }
    
    script.onerror = () => {
      reject(new Error('Failed to load UnicornStudio script'))
    }
    
    document.head.appendChild(script)
  })
}

export function UnicornEmbed({ 
  className = '', 
  style = {},
  filePath = '/animations/unicorn-bg.json',
  dpi = 1.5
}: UnicornEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<{ destroy: () => void } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const elementId = 'unicorn-bg'

  useEffect(() => {
    let isMounted = true

    const init = async () => {
      try {
        // Esperar un poco para no bloquear el render inicial
        // Esto permite que el contenido crítico se renderice primero
        await new Promise(resolve => setTimeout(resolve, 100))

        if (!isMounted) return

        // Cargar script de forma no bloqueante
        await loadUnicornScript()

        if (!isMounted || !window.UnicornStudio) return

        // Inicializar la escena
        const scene = await window.UnicornStudio.addScene({
          elementId,
          fps: 60,
          scale: 1,
          dpi,
          filePath,
          lazyLoad: true, // Cambiar a true para carga diferida
          production: true
        })
        
        if (isMounted) {
          sceneRef.current = scene
          setIsLoading(false)
        } else {
          scene.destroy()
        }
      } catch (error) {
        console.error('[Unicorn] Error loading animation:', error)
        setIsLoading(false)
      }
    }

    // Iniciar carga después de que la página esté lista
    if (typeof window !== 'undefined') {
      if (document.readyState === 'complete') {
        init()
      } else {
        window.addEventListener('load', init, { once: true })
      }
    }

    return () => {
      isMounted = false
      if (sceneRef.current) {
        sceneRef.current.destroy()
      }
    }
  }, [filePath, dpi])

  return (
    <div 
      ref={containerRef}
      id={elementId}
      className={className}
      style={{
        width: '100%',
        height: '100%',
        ...style
      }}
    />
  )
}
