import { UnicornEmbed } from './unicorn-embed'
import { HeroContent } from './hero-content'
import { CompaniesContent } from './companies-section'

export async function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-screen">
      <UnicornEmbed
        projectId="mebwhEqAY4unIkmgWtfB"
        className="absolute inset-0 z-0"
        style={{
          width: '100%',
          height: '100%',
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

