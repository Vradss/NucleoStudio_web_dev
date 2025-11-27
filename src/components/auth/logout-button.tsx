'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { createClient } from '@/lib/supabase/client'

export function LogoutButton() {
  const router = useRouter()
  const pathname = usePathname()
  const t = useTranslations('nav')
  const supabase = createClient()

  async function handleLogout() {
    await supabase.auth.signOut()
    const locale = pathname.split('/')[1] || 'es'
    router.push(`/${locale}/login`)
    router.refresh()
  }

  return (
    <button
      onClick={handleLogout}
      className="rounded-full border border-[#C3BDFF]/40 px-4 py-2 text-sm font-medium text-[#F7F6F3] transition-colors hover:bg-[#C3BDFF]/10"
    >
      {t('logout')}
    </button>
  )
}

