import { getTranslations } from 'next-intl/server'

interface PricingPageProps {
  params: Promise<{ locale: string }>
}

export default async function PricingPage({ params }: PricingPageProps) {
  const { locale } = await params
  const t = await getTranslations('nav')

  return (
    <main className="container mx-auto px-4 py-20 text-[#F7F6F3]">
      <h1 className="font-artifictrial-super text-4xl uppercase mb-8">{t('pricing')}</h1>
      <p className="font-artifictrial-regular text-[#C3BDFF]">
        Página de Pricing - Próximamente
      </p>
    </main>
  )
}


