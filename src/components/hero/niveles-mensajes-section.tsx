import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { FadeIn } from '@/components/motion/fade-in'

function highlightTitle(title: string) {
  // Patrones para resaltar en español e inglés
  const patterns = [
    { text: 'mensajes confusos a', className: 'text-nucleo-highlight' },
    { text: 'diferenciados', className: 'text-nucleo-highlight' },
    { text: 'confused', className: 'text-nucleo-highlight' },
    { text: 'differentiated', className: 'text-nucleo-highlight' },
  ]

  let result = title
  const parts: Array<{ text: string; highlight: boolean }> = []
  let lastIndex = 0

  // Encontrar todas las coincidencias
  const matches: Array<{ start: number; end: number; className: string }> = []
  
  patterns.forEach((pattern) => {
    const regex = new RegExp(pattern.text, 'gi')
    let match
    while ((match = regex.exec(title)) !== null) {
      matches.push({
        start: match.index,
        end: match.index + match[0].length,
        className: pattern.className,
      })
    }
  })

  // Ordenar matches por posición
  matches.sort((a, b) => a.start - b.start)

  // Crear partes del texto
  matches.forEach((match) => {
    if (lastIndex < match.start) {
      parts.push({
        text: title.substring(lastIndex, match.start),
        highlight: false,
      })
    }
    parts.push({
      text: title.substring(match.start, match.end),
      highlight: true,
    })
    lastIndex = match.end
  })

  if (lastIndex < title.length) {
    parts.push({
      text: title.substring(lastIndex),
      highlight: false,
    })
  }

  return parts.length > 0 ? parts : [{ text: title, highlight: false }]
}

export async function NivelesMensajesSection() {
  const t = await getTranslations('nivelesMensajes')
  const benefits = ['one', 'two', 'three'] as const
  const titleParts = highlightTitle(t('title'))

  return (
    <section className="section-layout relative z-20">
      <div className="section-container text-left">
        <FadeIn delay={0}>
          <h2 className="section-title max-w-6xl">
            {titleParts.map((part, index) => (
              part.highlight ? (
                <span key={index} className="text-nucleo-highlight">
                  {part.text}
                </span>
              ) : (
                <span key={index}>{part.text}</span>
              )
            ))}
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="mt-6 max-w-6xl font-geist-light text-lg text-nucleo-light/80 sm:text-lg whitespace-pre-line leading-normal">
            {t('subtitle')}
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="mt-12 flex justify-center">
            <div className="max-w-5xl w-full">
              <Image
                src="/images/niveles_mensajes.svg"
                alt="Niveles de claridad"
                width={1100}
                height={519}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={0.3}>
          <h3 className="mt-12 max-w-7xl font-geist-regular text-xl text-nucleo-light sm:text-lg">
            {t('benefitsTitle')}
          </h3>
        </FadeIn>
        <div className="mt-12 grid gap-6 text-left sm:grid-cols-3">
          {benefits.map((benefit, index) => (
            <FadeIn key={benefit} delay={0.4 + index * 0.1}>
              <div className="problem-card flex min-h-[140px] sm:h-[165px] flex-col items-start justify-between rounded-3xl border border-nucleo-dark-secondary bg-nucleo-dark-tertiary p-4 sm:p-6 text-left shadow-sm">
                {/* Icono: h-8 (32px) en móvil, h-10 (40px) en desktop */}
                <div className="relative h-8 w-8 sm:h-8 sm:w-10 mb-3 sm:mb-4">
                  <Image
                    src={t(`icons.${benefit}`)}
                    alt={t(`benefits.${benefit}.alt`)}
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="font-geist-regular text-base text-nucleo-light sm:text-lg whitespace-pre-line">
                  {t(`benefits.${benefit}.text`)}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

