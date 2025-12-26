import { HeroContent } from './hero-content'
import { CompaniesContent } from './companies-section'

export async function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <HeroContent />
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <CompaniesContent />
      </div>
    </section>
  )
}

