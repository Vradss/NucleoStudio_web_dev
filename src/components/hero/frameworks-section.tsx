'use client'

import CharacterHighlight from './character-highlight'
import Image from 'next/image'
import { FadeIn } from '@/components/motion/fade-in'

export function FrameworksSection() {
  return (
    <section className="relative bg-[#0A0A0A] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn delay={0}>
          <CharacterHighlight />
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="mt-12 flex justify-center">
            <Image
              src="/images/framework.png"
              alt="Frameworks"
              width={1000}
              height={720}
            />
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

