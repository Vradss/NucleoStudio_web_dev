'use client'

import { useEffect } from 'react'

// Extender la interfaz Window para incluir UnicornStudio
declare global {
  interface Window {
    UnicornStudio?: {
      init: () => void
      isInitialized: boolean
    }
  }
}

export function UnicornEmbed() {
  useEffect(() => {
    // Cargar el script de Unicorn Studio
    if (!window.UnicornStudio) {
      window.UnicornStudio = { 
        init: () => {},
        isInitialized: false 
      }
      
      const script = document.createElement('script')
      script.src = 'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.36/dist/unicornStudio.umd.js'
      script.onload = function() {
        if (window.UnicornStudio && !window.UnicornStudio.isInitialized) {
          window.UnicornStudio.init()
          window.UnicornStudio.isInitialized = true
        }
      }
      document.body.appendChild(script)
    }

    // Cleanup opcional
    return () => {
      // Si necesitas limpiar recursos más adelante, puedes hacerlo aquí
    }
  }, [])

  return (
    <div 
      data-us-project="QxaWWtJXzz6UPXFpnDbs" 
      className="fixed inset-0 z-0"
      style={{
        width: '100vw',
        height: '100vh',
      }}
    />
  )
}

