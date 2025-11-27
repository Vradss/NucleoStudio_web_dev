import { GridPattern } from './grid-pattern'
import { HeroContent } from './hero-content'

export function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-5rem)] overflow-hidden bg-[#0A0A0A]">
      <GridPattern />
      <div
        aria-hidden="true"
        className="hero-noise absolute inset-0 -z-[5] opacity-40 mix-blend-screen"
      />
      <div className="relative z-20">
        <HeroContent />
      </div>
    </section>
  )
}

