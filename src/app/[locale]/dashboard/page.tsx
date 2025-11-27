import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { ResourcesList } from '@/components/resources/resources-list'
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar'
import { PanelUserMenu } from '@/components/panel/panel-user-menu'

interface DashboardPageProps {
  params: Promise<{ locale: string }>
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { locale } = await params
  const supabase = await createClient()
  const t = await getTranslations('dashboard')

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect(`/${locale}/login`)
  }

  const { data: profile } = await supabase
    .from('users')
    .select('full_name, email')
    .eq('id', user.id)
    .single()

  const { data: resources, error } = await supabase
    .from('resources')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="flex min-h-screen bg-[#0A0A0A] text-[#F7F6F3]">
      <DashboardSidebar locale={locale} />

      <div className="flex flex-1 flex-col px-6 py-10 lg:px-12">
        <div className="flex items-center justify-end">
          <PanelUserMenu
            name={profile?.full_name}
            email={profile?.email || user.email}
          />
        </div>

        <div className="mt-8 max-w-4xl">
          <p className="font-space-mono text-sm uppercase tracking-[0.3em] text-[#C3BDFF]">
            {t('title')}
          </p>
          <h1 className="mt-2 font-artifictrial-super text-4xl uppercase">
            {t('description')}
          </h1>
          <p className="mt-4 font-artifictrial-regular text-base text-[#C3BDFF]">
            Accede a plantillas, procesos y contenidos exclusivos de la comunidad.
          </p>
        </div>

        <div className="mt-10 rounded-3xl border border-[#1F1F1F] bg-[#111111] p-6 shadow-sm">
          {error ? (
            <div className="rounded-xl border border-destructive/50 bg-destructive/10 p-4 text-destructive">
              {t('errorLoading')}: {error.message}
            </div>
          ) : (
            <ResourcesList resources={resources || []} />
          )}
        </div>
      </div>
    </div>
  )
}

