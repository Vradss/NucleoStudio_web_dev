'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/routing'

export function FooterContent() {
  const t = useTranslations('footer')
  const pathname = usePathname()
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar el newsletter
    console.log('Newsletter email:', email)
    setEmail('')
  }

  const scrollToSection = (sectionId: string) => {
    const isHomePage = pathname === '/' || pathname === '/es' || pathname === '/en'
    
    if (!isHomePage) {
      const locale = pathname.startsWith('/en') ? '/en' : '/es'
      window.location.href = `${locale}#${sectionId}`
      return
    }

    setTimeout(() => {
      const element = document.getElementById(sectionId)
      if (element) {
        const headerHeight = 64
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }, 100)
  }

  return (
    <footer className="bg-nucleo-dark text-nucleo-light w-full min-h-full" style={{ paddingBottom: 0, marginBottom: 0 }}>
      <div className="container mx-auto px-6 pt-8 md:pt-16 lg:pt-24 pb-0 min-h-full flex flex-col" style={{ paddingBottom: 0, marginBottom: 0 }}>
        {/* Layout - Mobile and Desktop */}
        <div className="mb-8 md:mb-12">
          <div className="flex flex-col md:flex-row items-start md:items-start justify-between gap-8 md:gap-0">
            {/* Logo, descripción, contacto y newsletter - Left Side */}
            <div className="flex-shrink-0 w-full md:w-auto">
              <Link href="/" className="inline-block mb-6">
                <Image
                  src="/images/nucleo_logo/nucleo_logo_blanco.svg"
                  alt="Nucleo Studio"
                  width={150}
                  height={32}
                  className="h-8 w-auto"
                  priority
                />
              </Link>
 
              {/* Newsletter */}
              <div className="mb-4">
                <h4 className="font-geist-semibold text-sm text-nucleo-light mb-3">Newsletter</h4>
                <form onSubmit={handleSubmit} className="flex gap-2 max-w-md">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('newsletterPlaceholder')}
                    className="flex-1 px-4 py-3 rounded bg-nucleo-dark-border border border-nucleo-dark-border text-nucleo-light placeholder:text-nucleo-light/50 focus:outline-none focus:border-nucleo-primary transition-colors"
                    required
                  />
                  <button
                    type="submit"
                    className="w-12 h-12 rounded bg-nucleo-light text-nucleo-dark font-geist-semibold text-lg transition-colors hover:bg-nucleo-light/90 flex items-center justify-center"
                  >
                    {t('newsletterButton')}
                  </button>
                </form>
              </div>
            </div>

            {/* 3 Columnas juntas - Right Side */}
            <div className="flex flex-col justify-end items-start md:items-end w-full md:w-auto">
              <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 lg:gap-16 w-full md:w-auto">
                {/* Company */}
                <div>
                  <h3 className="font-geist-semibold text-base md:text-lg mb-4 md:mb-6 text-nucleo-light">
                    {t('company')}
                  </h3>
                  <ul className="space-y-3 md:space-y-4">
                    <li>
                      <button
                        onClick={() => scrollToSection('solucion')}
                        className="font-geist-regular text-sm text-nucleo-light/80 hover:text-nucleo-secondary transition-colors text-left"
                      >
                        {t('solution')}
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => scrollToSection('entregables')}
                        className="font-geist-regular text-sm text-nucleo-light/80 hover:text-nucleo-secondary transition-colors text-left"
                      >
                        {t('deliverables')}
                      </button>
                    </li>
                  </ul>
                </div>

                {/* Products */}
                <div>
                  <h3 className="font-geist-semibold text-base md:text-lg mb-4 md:mb-6 text-nucleo-light">
                    {t('products')}
                  </h3>
                  <ul className="space-y-3 md:space-y-4">
                    <li>
                      <Link
                        href="/pricing"
                        className="font-geist-regular text-sm text-nucleo-light/80 hover:text-nucleo-secondary transition-colors"
                      >
                        {t('pricing')}
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Socials */}
                <div>
                  <h3 className="font-geist-semibold text-base md:text-lg mb-4 md:mb-6 text-nucleo-light">
                    {t('socials')}
                  </h3>
                  <div className="flex items-center gap-4">
                    <a
                      href="https://www.linkedin.com/company/nucleo-studio-pmm/?viewAsMember=true"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-nucleo-light/80 hover:text-nucleo-secondary transition-colors"
                      aria-label="LinkedIn"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Copyright debajo de las 3 columnas */}
              <div className="pt-6 border-t mt-6 md:mt-10 border-[#202025] w-full md:w-auto">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-[14px] text-nucleo-dark-hover-light gap-3 sm:gap-4">
                  <p className="font-geist-regular">
                    © 2025 Núcleo. {t('allRightsReserved')}
                  </p>
                  <div className="flex gap-4">
                    <Link
                      href="/privacy-policy"
                      className="font-geist-regular hover:text-nucleo-secondary transition-colors"
                    >
                      {t('privacyPolicy')}
                    </Link>
                    <Link
                      href="/terms-of-service"
                      className="font-geist-regular hover:text-nucleo-secondary transition-colors"
                    >
                      {t('termsOfService')}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Logo watermark - Sin padding inferior */}
        <div className="flex w-full justify-center mt-8" style={{ paddingBottom: 0, marginBottom: 0 }}>
          <Image
            src="/images/LOGO_DESKTOP.svg"
            alt="Nucleo"
            width={1368}
            height={363}
            className="h-auto w-full max-w-full opacity-20"
            style={{ paddingBottom: 0, marginBottom: 0, display: 'block' }}
            priority
          />
        </div>
      </div>
    </footer>
  )
}

