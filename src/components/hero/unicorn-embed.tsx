'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from '@/i18n/routing'

// Extender la interfaz Window para incluir UnicornStudio
declare global {
  interface Window {
    UnicornStudio?: {
      init: () => void
      isInitialized: boolean
    }
  }
}

interface UnicornEmbedProps {
  projectId: string
  className?: string
  style?: React.CSSProperties
}

export function UnicornEmbed({ 
  projectId, 
  className = '', 
  style = {} 
}: UnicornEmbedProps) {
  const pathname = usePathname()
  const scriptLoadedRef = useRef(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const lastPathnameRef = useRef<string>('')

  useEffect(() => {
    // Cargar el script de Unicorn Studio solo una vez (global)
    if (!scriptLoadedRef.current && typeof window !== 'undefined') {
      scriptLoadedRef.current = true
      
      // Verificar si el script ya existe
      const existingScript = document.querySelector('script[src*="unicornStudio.umd.js"]')
      if (existingScript) {
        scriptLoadedRef.current = true
        // Si el script ya existe, solo inicializar
        if (window.UnicornStudio && !window.UnicornStudio.isInitialized) {
          window.UnicornStudio.init()
          window.UnicornStudio.isInitialized = true
        }
      } else {
        window.UnicornStudio = window.UnicornStudio || { 
          init: () => {},
          isInitialized: false 
        }
        
        const script = document.createElement('script')
        script.src = 'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.36/dist/unicornStudio.umd.js'
        script.async = true
        script.onload = function() {
          if (window.UnicornStudio) {
            window.UnicornStudio.init()
            window.UnicornStudio.isInitialized = true
          }
        }
        script.onerror = function() {
          console.error('Failed to load Unicorn Studio script')
          scriptLoadedRef.current = false
        }
        document.body.appendChild(script)
      }
    }

    // Reinicializar el embed cuando cambia la ruta (incluyendo cambios de idioma)
    if (pathname !== lastPathnameRef.current && 
        window.UnicornStudio && 
        window.UnicornStudio.isInitialized && 
        containerRef.current) {
      
      lastPathnameRef.current = pathname
      
      // Reinicializar el embed con un delay para asegurar que la navegación se complete
      const timeoutId = setTimeout(() => {
        const embedElement = containerRef.current
        if (embedElement && window.UnicornStudio) {
          const currentProjectId = embedElement.getAttribute('data-us-project')
          
          if (currentProjectId) {
            // Remover y re-agregar el atributo para forzar reinicialización
            embedElement.removeAttribute('data-us-project')
            requestAnimationFrame(() => {
              if (embedElement && currentProjectId && window.UnicornStudio) {
                embedElement.setAttribute('data-us-project', currentProjectId)
                // Reinicializar Unicorn Studio
                window.UnicornStudio.init()
              }
            })
          }
        }
      }, 500) // Delay más largo para producción

      return () => {
        clearTimeout(timeoutId)
      }
    } else {
      lastPathnameRef.current = pathname
    }
  }, [pathname, projectId])

  return (
    <div 
      ref={containerRef}
      data-us-project={projectId} 
      className={className}
      style={style}
    />
  )
}

