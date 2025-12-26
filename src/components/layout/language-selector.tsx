'use client'

import { useTransition } from 'react'
import { useRouter, usePathname } from '@/i18n/routing'
import { useLocale } from 'next-intl'

export function LanguageSelector() {
  const router = useRouter()
  const pathname = usePathname()
  const currentLocale = useLocale()
  const [isPending, startTransition] = useTransition()

  function switchLocale(newLocale: 'es' | 'en') {
    if (currentLocale === newLocale) return

    startTransition(() => {
      router.replace(pathname, { locale: newLocale })
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

