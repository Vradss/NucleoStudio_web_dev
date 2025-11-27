'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'
import { routing } from '@/i18n/routing'

export function LanguageSelector() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  function switchLocale(newLocale: string) {
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/'
    router.push(`/${newLocale}${pathWithoutLocale}`)
  }

  return (
    <div className="flex items-center gap-2 rounded-full border border-[#1F1F1F] bg-[#141214] p-1">
      <button
        onClick={() => switchLocale('es')}
        className={`rounded px-2 py-1 text-xs font-medium transition-colors ${
          locale === 'es'
            ? 'bg-[#6F31FF] text-[#F7F6F3]'
            : 'text-[#C3BDFF] hover:text-[#F7F6F3]'
        }`}
      >
        ES
      </button>
      <button
        onClick={() => switchLocale('en')}
        className={`rounded px-2 py-1 text-xs font-medium transition-colors ${
          locale === 'en'
            ? 'bg-[#6F31FF] text-[#F7F6F3]'
            : 'text-[#C3BDFF] hover:text-[#F7F6F3]'
        }`}
      >
        EN
      </button>
    </div>
  )
}

