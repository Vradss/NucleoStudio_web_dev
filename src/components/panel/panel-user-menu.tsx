'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { ChevronDown } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface PanelUserMenuProps {
  name?: string | null
  email?: string | null
}

function getInitials(name?: string | null, email?: string | null): string {
  const source = name?.trim() || email || 'US'
  const initials = source
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase() || '')
    .join('')
  return initials || 'US'
}

export function PanelUserMenu({ name, email }: PanelUserMenuProps) {
  const [open, setOpen] = useState(false)
  const t = useTranslations('nav')
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createClient()
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
    const locale = pathname.split('/')[1] || 'es'
    router.push(`/${locale}/login`)
    router.refresh()
  }

  const displayName = name || email || 'Usuario'
  const initials = getInitials(name, email)

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen(prev => !prev)}
        className="flex items-center gap-3 rounded-full border border-[#1F1F1F] bg-[#111111] px-4 py-2 text-left text-sm font-medium text-[#F7F6F3] shadow-sm transition hover:border-[#6F31FF]"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#6F31FF]/20 text-base font-semibold text-[#C3BDFF]">
          {initials}
        </span>
        <div className="hidden text-left sm:block">
          <p className="text-sm font-semibold text-[#F7F6F3]">{displayName}</p>
          {email && <p className="text-xs text-[#C3BDFF]">{email}</p>}
        </div>
        <ChevronDown
          className={`h-4 w-4 text-[#C3BDFF] transition ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-2xl border border-[#1F1F1F] bg-[#0E0E0E] p-3 shadow-xl">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full rounded-xl px-4 py-2 text-left text-sm font-semibold text-[#F7F6F3] transition hover:bg-[#6F31FF]/10"
          >
            {t('logout')}
          </button>
        </div>
      )}
    </div>
  )
}


