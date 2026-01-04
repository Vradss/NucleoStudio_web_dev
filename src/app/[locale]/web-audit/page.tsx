import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export const metadata: Metadata = {
  title: 'Web Audit',
  description:
    'Auditoría de tu sitio web B2B. Analizamos tu propuesta de valor, mensajes y contenido para identificar oportunidades de mejora.',
}

interface WebAuditPageProps {
  params: Promise<{ locale: string }>
}

export default async function WebAuditPage({ params }: WebAuditPageProps) {
  const { locale } = await params
  const t = await getTranslations('nav')

  return (
    <main className="container mx-auto px-4 py-20 text-nucleo-light">
      <h1 className="font-geist-super text-4xl uppercase mb-8">{t('webAudit')}</h1>
      <p className="font-geist-regular text-nucleo-secondary">
        Página de Web Audit - Próximamente
      </p>
    </main>
  )
}


