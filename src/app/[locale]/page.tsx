import { HeroSection } from '@/components/hero/hero-section'
import { CompaniesSection } from '@/components/hero/companies-section'
import { ProblemSection } from '@/components/hero/problem-section'
import { FrameworksSection } from '@/components/hero/frameworks-section'
import { Header } from '@/components/layout/header'
import { StepSection } from '@/components/hero/step-section'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <CompaniesSection />
        <ProblemSection />
        <FrameworksSection />
        <StepSection />
      </main>
    </>
  )
}

