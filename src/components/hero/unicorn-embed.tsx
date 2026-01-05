'use client'

import { useEffect, useRef } from 'react'

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

export function UnicornEmbed({ 
  className = '', 
  style = {},
  filePath = '/animations/unicorn-bg.json',
  dpi = 1.5
}: UnicornEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<{ destroy: () => void } | null>(null)
  const elementId = 'unicorn-bg'

  useEffect(() => {
    let isMounted = true

    const init = async () => {
      // Cargar script si no existe
      if (!window.UnicornStudio) {
        const script = document.createElement('script')
        script.src = 'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.0/dist/unicornStudio.umd.js'
        document.head.appendChild(script)
        
        await new Promise<void>((resolve) => {
          script.onload = () => {
            console.log('[Unicorn] Script loaded')
            resolve()
          }
        })
        
        // Esperar a que se inicialice
        await new Promise<void>((resolve) => {
          const check = setInterval(() => {
            if (window.UnicornStudio) {
              clearInterval(check)
              resolve()
            }
          }, 100)
        })
      }

      if (!isMounted || !window.UnicornStudio) return

      console.log('[Unicorn] Initializing scene with filePath:', filePath)

      try {
        const scene = await window.UnicornStudio.addScene({
          elementId,
          fps: 60,
          scale: 1,
          dpi,
          filePath,
          lazyLoad: false,
          production: true
        })
        
        console.log('[Unicorn] Scene created successfully')
        
        if (isMounted) {
          sceneRef.current = scene
        } else {
          scene.destroy()
        }
      } catch (error) {
        console.error('[Unicorn] Error:', error)
      }
    }

    init()

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
