'use client'

import { useTransition, useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

export function LanguageSelector() {
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()
  
  // Extraer el locale directamente del pathname en el cliente
  const currentLocale = pathname.split('/')[1] === 'en' ? 'en' : 'es'

  function switchLocale(newLocale: 'es' | 'en') {
    if (currentLocale === newLocale) return
    
    startTransition(() => {
      const parts = pathname.split('/')
      
      // Reemplazar el locale en el pathname
      const newParts = parts.map((part, index) => {
        if (index === 1 && (part === 'es' || part === 'en')) {
          return newLocale
        }
        return part
      })
      
      const newPath = newParts.join('/')
      router.push(newPath || `/${newLocale}`)
    })
  }

  return (
    <div className="flex items-center gap-2 rounded-full border border-nucleo-dark-border p-1" style={{ backgroundColor: 'var(--nucleo-bg-selector)' }}>
      <button
        onClick={() => switchLocale('es')}
        disabled={isPending}
        className={`px-3 py-1.5 text-xs font-medium transition-all ${
          currentLocale === 'es'
            ? 'bg-nucleo-primary text-foreground rounded-full'
            : 'text-nucleo-secondary hover:text-foreground rounded-full'
        } ${isPending ? 'opacity-50' : ''}`}
      >
        ES
      </button>
      <button
        onClick={() => switchLocale('en')}
        disabled={isPending}
        className={`px-3 py-1.5 text-xs font-medium transition-all ${
          currentLocale === 'en'
            ? 'bg-nucleo-primary text-foreground rounded-full'
            : 'text-nucleo-secondary hover:text-foreground rounded-full'
        } ${isPending ? 'opacity-50' : ''}`}
      >
        EN
      </button>
    </div>
  )
}

