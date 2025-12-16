import { GeistSans } from 'geist/font/sans'
import { Space_Mono } from 'next/font/google'

// Space Mono Regular - para tags (desde Google Fonts)
export const spaceMonoRegular = Space_Mono({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-space-mono-regular',
  display: 'swap',
  fallback: ['monospace'],
})

// Geist Sans - fuente variable (reemplaza todas las variantes de ArtificTrial)
// GeistSans ya viene configurado como fuente variable que soporta todos los pesos (100-900)
// No necesita configuración adicional, solo se importa y exporta
export const geistSans = GeistSans

// Exportamos la misma instancia con diferentes nombres para mantener compatibilidad
export const geistSuperbold = geistSans
export const geistRegular = geistSans
export const geistSemibold = geistSans

