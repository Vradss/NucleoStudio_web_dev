import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { FadeIn } from '@/components/motion/fade-in'

const companies = [
  { name: 'BioActiva', logo: '/images/logos/bioactiva.svg', alt: 'Logo de BioActiva' },
  { name: 'Shift', logo: '/images/logos/shift.svg', alt: 'Logo de Shift' },
  { name: 'Colectivo23', logo: '/images/logos/colectivo.svg', alt: 'Logo de Colectivo 23' },
  { name: 'DataScienceResearch', logo: '/images/logos/data_science.svg', alt: 'Logo de Data Science Research', textOnly: true },
  { name: 'Ngrowth', logo: '/images/logos/ngrowth.svg', alt: 'Logo de Ngrowth' },
  { name: 'Reevalua', logo: '/images/logos/reevalua.svg', alt: 'Logo de Reevalua', textOnly: true },
  { name: 'MonkeyFit', logo: '/images/logos/monket_fit.svg', alt: 'Logo de MonkeyFit' },
  { name: 'Seek', logo: '/images/logos/seek.svg', alt: 'Logo de Seek' },
  { name: 'Freenanzas', logo: '/images/logos/freenanzas.svg', alt: 'Logo de Freenanzas', textOnly: true },
  { name: 'VTEX', logo: '/images/logos/vtex.svg', alt: 'Logo de VTEX' },
  { name: 'Worthit', logo: '/images/logos/worthit.svg', alt: 'Logo de Worthit', textOnly: true },
  { name: 'Invoinet', logo: '/images/logos/invoinet.svg', alt: 'Logo de Invoinet' },
]

// Helper function to encode file names with spaces
function encodeLogoPath(path: string): string {
  return path.replace(/\s/g, '%20')
}

// Helper function to render a logo
interface CompanyLogo {
  name: string
  logo: string
  alt: string
  textOnly?: boolean
  compact?: boolean
}

function renderLogo(company: CompanyLogo, key: string) {
  // Logos donde solo el texto debe ser negro (isotipo mantiene color)
  const isTextOnly = company.textOnly || false
  const isCompact = company.compact || false

  return (
    <div
      key={key}
      className={`flex shrink-0 items-center justify-center transition-opacity hover:opacity-80 ${
        isCompact ? 'h-20 px-1 py-0' : 'h-24'
      }`}
      style={{ width: '120px' }}
    >
      {isTextOnly ? (
        <div className="h-20 w-auto">
          <Image
            src={encodeLogoPath(company.logo)}
            alt={company.alt}
            width={150}
            height={80}
            className="h-20 w-auto object-contain"
            style={{
              maxWidth: '150px',
              maxHeight: '80px',
            }}
          />
        </div>
      ) : (
        <Image
          src={encodeLogoPath(company.logo)}
          alt={company.alt}
          width={150}
          height={80}
          className="h-20 w-auto object-contain"
          style={{
            maxWidth: '150px',
            maxHeight: '80px',
            ...(isCompact && {
              padding: '2px 8px',
              objectFit: 'contain',
            }),
          }}
        />
      )}
    </div>
  )
}

export async function CompaniesContent() {
  const t = await getTranslations('hero')

  return (
    <>
      <FadeIn delay={0}>
        <h2 className="mx-auto max-w-3xl font-geist-regular text-base text-nucleo-light sm:text-base lg:text-base mb-1 text-center">
          {t('companiesTitle')}
        </h2>
      </FadeIn>
      <FadeIn delay={0.1}>
        <div className="relative overflow-hidden">
          {/* Marquee container */}
          <div className="flex animate-marquee md:animate-marquee-desktop gap-6 md:gap-24">
            {/* Primera fila de logos */}
            {companies.map((company) => renderLogo(company, company.name))}
            {/* Duplicar logos para efecto infinito */}
            {companies.map((company) => renderLogo(company, `duplicate-${company.name}`))}
          </div>
        </div>
      </FadeIn>
    </>
  )
}

export async function CompaniesSection() {
  const t = await getTranslations('hero')

  return (
    <section className="section-layout relative z-20">
      <div className="section-container">
        <FadeIn delay={0}>
          <h2 className="section-title mb-12 text-center">
            {t('companiesTitle')}
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="relative overflow-hidden">
            {/* Gradiente izquierdo */}
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-nucleo-dark to-transparent" />
            {/* Gradiente derecho */}
            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-nucleo-dark to-transparent" />
            
            {/* Marquee container */}
            <div className="flex animate-marquee md:animate-marquee-desktop gap-6 md:gap-24">
              {/* Primera fila de logos */}
              {companies.map((company) => renderLogo(company, company.name))}
              {/* Duplicar logos para efecto infinito */}
              {companies.map((company) => renderLogo(company, `duplicate-${company.name}`))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
