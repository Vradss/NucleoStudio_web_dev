import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { AdminPanel } from '@/components/admin/admin-panel'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { PanelUserMenu } from '@/components/panel/panel-user-menu'

interface AdminPageProps {
  params: Promise<{ locale: string }>
}

export default async function AdminPage({ params }: AdminPageProps) {
  const { locale } = await params
  const supabase = await createClient()
  const t = await getTranslations('admin')

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect(`/${locale}/login`)
  }

  const { data: profile } = await supabase
    .from('users')
    .select('role, full_name, email')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') {
    redirect(`/${locale}/dashboard`)
  }

  return (
    <div className="flex min-h-screen bg-[#0A0A0A] text-[#F7F6F3]">
      <AdminSidebar locale={locale} />

      <div className="flex flex-1 flex-col px-6 py-10 lg:px-12">
        <div className="flex items-center justify-end">
          <PanelUserMenu
            name={profile?.full_name}
            email={profile?.email || user.email}
          />
        </div>

        <div className="mt-8 max-w-4xl">
          <p className="font-space-mono text-sm uppercase tracking-[0.2em] text-[#C3BDFF]">
            {t('title')}
          </p>
          <h1 className="mt-2 font-artifictrial-super text-4xl uppercase">{t('description')}</h1>
          <p className="mt-4 font-artifictrial-regular text-base text-[#C3BDFF]">
            Administra el contenido interno y mantén tus recursos organizados para el equipo.
          </p>
        </div>

        <div className="mt-10 rounded-3xl border border-[#1F1F1F] bg-[#111111] p-8 shadow-sm">
          <AdminPanel />
        </div>
      </div>
    </div>
  )
}

