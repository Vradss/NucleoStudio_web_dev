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
    <div className="flex items-center gap-2 rounded-full border border-[#1F1F1F] bg-[#141214] p-1">
      <button
        onClick={() => switchLocale('es')}
        disabled={isPending}
        className={`rounded px-2 py-1 text-xs font-medium transition-colors ${
          currentLocale === 'es'
            ? 'bg-[#6F31FF] text-[#F7F6F3]'
            : 'text-[#C3BDFF] hover:text-[#F7F6F3]'
        } ${isPending ? 'opacity-50' : ''}`}
      >
        ES
      </button>
      <button
        onClick={() => switchLocale('en')}
        disabled={isPending}
        className={`rounded px-2 py-1 text-xs font-medium transition-colors ${
          currentLocale === 'en'
            ? 'bg-[#6F31FF] text-[#F7F6F3]'
            : 'text-[#C3BDFF] hover:text-[#F7F6F3]'
        } ${isPending ? 'opacity-50' : ''}`}
      >
        EN
      </button>
    </div>
  )
}

