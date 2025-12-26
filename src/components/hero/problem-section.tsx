import Image from 'next/image'
import { getTranslations, getLocale } from 'next-intl/server'
import { FadeIn } from '@/components/motion/fade-in'

function renderPointWithHighlight(text: string, point: 'one' | 'two' | 'three') {
  // Definir los textos a resaltar según el punto para ambos idiomas
  const highlightTexts: Record<'one' | 'two' | 'three', string[]> = {
    one: ['múltiples segmentos', 'multiple segments'],
    two: ['no captan tu valor', "don't capture your value"],
    three: ['gastar más en contenido', 'spend more on content']
  }
  
  const possibleTexts = highlightTexts[point]
  // Buscar cualquiera de los textos posibles
  for (const highlightText of possibleTexts) {
    const parts = text.split(highlightText)
    if (parts.length === 2) {
      return (
        <>
          {parts[0]}<span className="font-geist-bold">{highlightText}</span>{parts[1]}
        </>
      )
    }
  }
  
  return text
}


export async function ProblemSection() {
  const t = await getTranslations('problem')
  const locale = await getLocale()
  const points = ['one', 'two', 'three'] as const
  const highlightText = t('highlight')

  return (
    <section className="section-layout relative z-20 lg:min-h-[100vh] flex flex-col">
      <div className="section-container text-center flex-1 flex flex-col justify-center">
        <FadeIn delay={0}>
        <div className="flex items-center justify-center gap-2 mb-4">
          <Image
            src="/images/isotipo_detail.svg"
            alt="Detalle isotipo decorativo"
            width={26}
            height={25}
            className="h-4 w-4 sm:h-5 sm:w-5"
            priority
          />
          <span className="tagline-secondary">
              {t('label')}
          </span>
        </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h3 className="section-title mx-auto max-w-8xl text-center">
            <span className="block">{highlightText}</span>
          </h3>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="mt-6 mx-auto max-w-6xl font-geist-light text-base text-nucleo-light/80 sm:text-xl whitespace-pre-line leading-normal text-center">
            {t('subtitle')}
          </p>
        </FadeIn>
        <div className="mt-12 text-base sm:text-lg lg:text-xl sm:mt-16 lg:mt-24 grid gap-6 sm:gap-8 text-left sm:grid-cols-3">
          {points.map((point, index) => (
            <FadeIn key={point} delay={0.3 + index * 0.1}>
            {/* Card: HEIGHT FIJO h-[250px] = 250px */}
            <div
                className="problem-card flex min-h-[200px] sm:h-[250px] flex-col items-center justify-center rounded-3xl border border-nucleo-dark-secondary bg-nucleo-dark-tertiary p-4 sm:p-6 text-center shadow-sm"
            >
              {/* Icono: tamaño uniforme, excepto PocaComunicacion que es un poco más pequeño */}
              <div className={`relative ${point === 'two' ? 'h-9 w-9 sm:h-10 sm:w-10' : 'h-10 w-10 sm:h-12 sm:w-12'}`}>
                <Image
                  src={t(`icons.${point}`)}
                  alt="Icono de problema"
                  fill
                  className="object-contain"
                />
              </div>
                <p className="mt-6 sm:mt-8 text-card-title">
                {renderPointWithHighlight(t(`points.${point}`), point)}
              </p>
            </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}


