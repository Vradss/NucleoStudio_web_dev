import { UnicornEmbed } from './unicorn-embed'
import { HeroContent } from './hero-content'
import { CompaniesContent } from './companies-section'

export async function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <UnicornEmbed 
        projectId="mebwhEqAY4unIkmgWtfB"
        className="fixed inset-0 z-0"
        style={{
          width: '100vw',
          height: '100vh',
        }}
      />
      <div className="relative z-10">
        <HeroContent />
        <div className="container mx-auto px-4 py-8 lg:py-12">
          <CompaniesContent />
        </div>
      </div>
    </section>
  )
}

