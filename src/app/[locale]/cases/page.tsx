import type { Metadata } from 'next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { CasesHero } from '@/components/cases/cases-hero'
import { CasesList } from '@/components/cases/cases-list'
import { UnicornEmbed } from '@/components/hero/unicorn-embed'

export const metadata: Metadata = {
  title: 'Casos de Éxito',
  description:
    'Descubre cómo hemos ayudado a empresas tech B2B a clarificar su propuesta de valor y diferenciarse. Casos reales de Fintech, Educación, Innovación y más.',
  openGraph: {
    title: 'Casos de Éxito | Nucleo Studio',
    description:
      'Casos reales de empresas B2B que clarificaron su propuesta de valor y se diferenciaron en el mercado.',
  },
}

interface CasesPageProps {
  params: Promise<{ locale: string }>
}

export default async function CasesPage({ params }: CasesPageProps) {
  await params

  return (
    <div className="relative">
      {/* UnicornEmbed fijo como fondo global */}
      <UnicornEmbed
        projectId="mebwhEqAY4unIkmgWtfB"
        className="fixed inset-0 z-0"
        style={{
          width: '100%',
          height: '100%',
        }}
      />

      <div className="relative z-10">
        <Header />
        <main className="relative">
          {/* Hero Section with Companies inside */}
          <CasesHero />

          {/* Cases List */}
          <CasesList />
        </main>
        <Footer />
      </div>
    </div>
  )
}
