'use client'

import Image from 'next/image'

interface AnimatedCasoProps {
  casoNumber: 1 | 2 | 3
}

export function AnimatedCaso({ casoNumber }: AnimatedCasoProps) {
  return (
    <div className="relative h-full w-full p-4">
        <Image
          src={`/images/caso_uso_${casoNumber}.png`}
          alt={`Caso ${casoNumber}`}
          fill
          className="object-contain"
          priority
        />
    </div>
  )
}
