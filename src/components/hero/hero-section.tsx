import { UnicornEmbed } from './unicorn-embed'
import { HeroContent } from './hero-content'

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <UnicornEmbed />
      <div className="relative z-10">
        <HeroContent />
      </div>
    </section>
  )
}

