import type { Metadata } from 'next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { PrivacyPolicyContent } from '@/components/legal/privacy-policy-content'

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description:
    'Política de privacidad de Nucleo Studio. Conoce cómo recopilamos, usamos y protegemos tu información personal.',
  robots: {
    index: true,
    follow: true,
  },
}

interface PrivacyPolicyPageProps {
  params: Promise<{ locale: string }>
}

export default async function PrivacyPolicyPage({ params }: PrivacyPolicyPageProps) {
  await params

  return (
    <>
      <Header />
      <main className="relative bg-nucleo-dark min-h-screen">
        <PrivacyPolicyContent />
      </main>
      <Footer />
    </>
  )
}

