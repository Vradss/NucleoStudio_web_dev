import { Link } from '@/i18n/routing'

interface AdminSidebarProps {
  locale: string
}

const navItems = [
  { label: 'Inicio', href: '/admin', status: 'Activo' },
  { label: 'Mi perfil', disabled: true },
  { label: 'Resources', href: '/dashboard' },
]

export function AdminSidebar({ locale }: AdminSidebarProps) {
  return (
    <aside className="flex w-64 flex-col border-r border-[#1F1F1F] bg-[#0E0E0E] px-6 py-8 text-[#F7F6F3] shadow-sm">
      <div>
        <p className="font-space-mono text-xs uppercase tracking-[0.3em] text-[#C3BDFF]">Panel</p>
        <h2 className="mt-2 font-artifictrial-super text-2xl uppercase">Administración</h2>
        <p className="mt-2 font-artifictrial-regular text-sm text-[#C3BDFF]">
          Controla usuarios y recursos desde esta vista.
        </p>
      </div>

      <nav className="mt-10 space-y-2">
        {navItems.map((item) =>
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
              className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition ${
                item.href === '/admin'
                  ? 'border border-[#6F31FF]/30 bg-[#151515] text-[#F7F6F3]'
                  : 'text-[#C3BDFF] hover:bg-[#151515] hover:text-[#F7F6F3]'
              }`}
            >
              <span>{item.label}</span>
              {item.href === '/admin' && (
                <span className="text-xs text-[#C3BDFF]">{item.status}</span>
              )}
            </Link>
          )
        )}
      </nav>
    </aside>
  )
}


