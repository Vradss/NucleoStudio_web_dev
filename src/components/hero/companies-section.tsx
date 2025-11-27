import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { FadeSection } from '@/components/motion/fade-section'

const companies = [
  { name: 'BioActiva', logo: '/images/logos/Logo_BioActiva.svg', alt: 'Logo de BioActiva' },
  { name: 'Shift', logo: '/images/logos/Logo_shift.svg', alt: 'Logo de Shift' },
  { name: 'Colectivo23', logo: '/images/logos/Colectivo_23.png', alt: 'Logo de Colectivo 23' },
  { name: 'DataScienceResearch', logo: '/images/logos/logo-Data_science_research.png', alt: 'Logo de Data Science Research', textOnly: true },
  { name: 'Ngrowth', logo: '/images/logos/Ngrowth_logo.svg', alt: 'Logo de Ngrowth' },
  { name: 'Reevalua', logo: '/images/logos/reevalua_logo.svg', alt: 'Logo de Reevalua', textOnly: true },
  { name: 'MonkeyFit', logo: '/images/logos/MonekyFitLogo.svg', alt: 'Logo de MonkeyFit' },
  { name: 'Seek', logo: '/images/logos/Seek_logo.svg', alt: 'Logo de Seek' },
  { name: 'Freenanzas', logo: '/images/logos/freenanzas_logo.svg', alt: 'Logo de Freenanzas', textOnly: true },
  { name: 'VTEX', logo: '/images/logos/vtex_logo.svg', alt: 'Logo de VTEX' },
  { name: 'Worthit', logo: '/images/logos/WORTHIT 24.svg', alt: 'Logo de Worthit', textOnly: true },
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
        isCompact ? 'h-16 px-1 py-0' : 'h-20'
      }`}
      style={{ width: '150px' }}
    >
      {isTextOnly ? (
        <div className="h-12 w-auto">
          <Image
            src={encodeLogoPath(company.logo)}
            alt={company.alt}
            width={150}
            height={80}
            className="h-12 w-auto object-contain"
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
          className="h-12 w-auto object-contain"
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

export async function CompaniesSection() {
  const t = await getTranslations('hero')

  return (
    <FadeSection className="relative bg-[#0A0A0A] py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <h2 className="font-artifictrial-regular mb-12 text-center text-2xl text-[#F7F6F3] lg:text-lg">
          {t('companiesTitle')}
        </h2>
        <div className="relative overflow-hidden">
          {/* Gradiente izquierdo */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-[#0A0A0A] to-transparent" />
          {/* Gradiente derecho */}
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-[#0A0A0A] to-transparent" />
          
          {/* Marquee container */}
          <div className="flex animate-marquee gap-24">
            {/* Primera fila de logos */}
            {companies.map((company) => renderLogo(company, company.name))}
            {/* Duplicar logos para efecto infinito */}
            {companies.map((company) => renderLogo(company, `duplicate-${company.name}`))}
          </div>
        </div>
      </div>
    </FadeSection>
  )
}
