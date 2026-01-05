'use client'

import { UnicornEmbed } from './unicorn-embed'

interface SectionsEmbedProps {
  children: React.ReactNode
}

export function SectionsEmbed({ children }: SectionsEmbedProps) {
  return (
    <div className="relative">
      <UnicornEmbed
        className="fixed inset-0 z-0"
        dpi={1.5}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

