'use client'

import Image from 'next/image'

interface AnimatedCasoProps {
  casoNumber: 1 | 2 | 3
}

export function AnimatedCaso({ casoNumber }: AnimatedCasoProps) {
  return (
    <div className="absolute inset-0 flex flex-col">
      {/* Imagen PNG en la parte superior del card */}
      <div className="relative h-[340px] w-full p-4 pt-6">
        <Image
          src={`/images/caso_uso_${casoNumber}.png`}
          alt={`Caso ${casoNumber}`}
          fill
          className="object-contain"
          priority
        />
      </div>
      
      {/* Espaciador para empujar el contenido hacia abajo */}
      <div className="flex-1" />
    </div>
  )
}
