import { Link } from '@/i18n/routing'

interface DashboardSidebarProps {
  locale: string
}

const navItems = [
  { label: 'Recursos', href: '/dashboard', status: 'Activo' },
  { label: 'Podcast', disabled: true },
  { label: 'Mi perfil', disabled: true },
]

export function DashboardSidebar({ locale }: DashboardSidebarProps) {
  return (
    <aside className="hidden w-64 flex-col border-r border-[#1F1F1F] bg-[#0E0E0E] px-6 py-10 text-[#F7F6F3] shadow-sm md:flex">
      <div>
        <p className="font-space-mono text-xs uppercase tracking-[0.3em] text-[#C3BDFF]">
          Comunidad
        </p>
        <h2 className="mt-2 font-artifictrial-super text-2xl uppercase">Mi panel</h2>
        <p className="mt-2 font-artifictrial-regular text-sm text-[#C3BDFF]">
          Explora recursos, podcasts y actualiza tu perfil.
        </p>
      </div>

      <nav className="mt-10 space-y-2">
        {navItems.map(item =>
          item.disabled ? (
            <button
              key={item.label}
              type="button"
              disabled
              className="flex w-full items-center justify-between rounded-xl border border-[#1F1F1F] bg-[#131313] px-4 py-3 text-sm font-medium text-[#C3BDFF]/70"
            >
              <span>{item.label}</span>
              <span className="text-xs uppercase">Soon</span>
            </button>
          ) : (
            <Link
              key={item.label}
              href={`/${locale}${item.href}`}
              className="flex items-center justify-between rounded-xl border border-[#6F31FF]/30 bg-[#151515] px-4 py-3 text-sm font-medium text-[#F7F6F3]"
            >
              <span>{item.label}</span>
              <span className="text-xs text-[#C3BDFF]">{item.status}</span>
            </Link>
          )
        )}
      </nav>
    </aside>
  )
}


