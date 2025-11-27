import localFont from 'next/font/local'
import { Space_Mono } from 'next/font/google'

// Space Mono Regular - para tags (desde Google Fonts)
export const spaceMonoRegular = Space_Mono({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-space-mono-regular',
  display: 'swap',
  fallback: ['monospace'],
})

export const artifictrialSuperbold = localFont({
  src: [
    {
      path: '../../public/fonts/ArtificTrial/artifictrial-superbold.otf',
      weight: '800',
      style: 'normal',
    },
  ],
  variable: '--font-artifictrial-superbold',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
})

export const artifictrialRegular = localFont({
  src: [
    {
      path: '../../public/fonts/ArtificTrial/artifictrial-regular.otf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-artifictrial-regular',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
})

export const artifictrialSemibold = localFont({
  src: [
    {
      path: '../../public/fonts/ArtificTrial/artifictrial-semibold.otf',
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--font-artifictrial-semibold',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
})

