'use client'

import { UnicornEmbed } from './unicorn-embed'

interface SectionsEmbedProps {
  children: React.ReactNode
}

export function SectionsEmbed({ children }: SectionsEmbedProps) {
  return (
    <div className="relative">
      <UnicornEmbed
        projectId="IPL0ZQi6zKf8EJMCRvP1"
        className="fixed inset-0 z-0"
        style={{
          width: '100vw',
          height: '100vh',
        }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

