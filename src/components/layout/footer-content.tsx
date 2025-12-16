'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'

export function FooterContent() {
  const t = useTranslations('footer')
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar el newsletter
    console.log('Newsletter email:', email)
    setEmail('')
  }

  return (
    <footer className="bg-nucleo-dark text-nucleo-light w-full h-full">
      <div className="container mx-auto px-6 pt-16 pb-0 lg:pt-24 lg:pb-0 h-full flex flex-col">
        {/* Mobile Layout */}
        <div className="flex flex-col md:hidden gap-12 mb-12">
          {/* Logo y descripción */}
          <div>
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
            <p className="font-geist-regular text-sm text-nucleo-light/80 max-w-md">
              {t('description')}
            </p>
          </div>

          {/* Productos */}
          <div>
            <h3 className="font-geist-semibold text-lg mb-6 text-nucleo-light">
              {t('products')}
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/"
                  className="font-geist-regular text-sm text-nucleo-light/80 hover:text-nucleo-secondary transition-colors"
                >
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  onClick={(e) => {
                    if (window.location.pathname === '/') {
                      e.preventDefault()
                      const solutionSection = document.querySelector('.scroll-horizontal-section')
                      if (solutionSection) {
                        solutionSection.scrollIntoView({ behavior: 'smooth' })
                      }
                    }
                  }}
                  className="font-geist-regular text-sm text-nucleo-light/80 hover:text-nucleo-secondary transition-colors"
                >
                  {t('solution')}
                </Link>
              </li>
              <li>
                <Link
                  href="/web-audit"
                  className="font-geist-regular text-sm text-nucleo-light/80 hover:text-nucleo-secondary transition-colors"
                >
                  {t('webAudit')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Pricing y Redes sociales */}
          <div>
            <h3 className="font-geist-semibold text-lg mb-6 text-nucleo-light">
              {t('pricing')}
            </h3>
            <ul className="space-y-4 mb-6">
              <li>
                <Link
                  href="/pricing"
                  className="font-geist-regular text-sm text-nucleo-light/80 hover:text-nucleo-secondary transition-colors"
                >
                  {t('pricing')}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="font-geist-regular text-sm text-nucleo-light/80 hover:text-nucleo-secondary transition-colors"
                >
                  {t('contact')}
                </Link>
              </li>
            </ul>
            {/* Redes sociales */}
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/company/nucleo-studio"
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

          {/* Legal */}
          <div>
            <h3 className="font-geist-semibold text-lg mb-6 text-nucleo-light">
              LEGAL
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/privacy-policy"
                  className="font-geist-regular text-sm text-nucleo-light/80 hover:text-nucleo-secondary transition-colors"
                >
                  {t('privacyPolicy')}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-service"
                  className="font-geist-regular text-sm text-nucleo-light/80 hover:text-nucleo-secondary transition-colors"
                >
                  {t('termsOfService')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter - debajo de productos y pricing en mobile */}
          <div>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('newsletterPlaceholder')}
                className="flex-1 px-4 py-3 rounded-full bg-nucleo-dark-border border border-nucleo-dark-border text-nucleo-light placeholder:text-nucleo-light/50 focus:outline-none focus:border-nucleo-primary transition-colors"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-nucleo-primary text-nucleo-light font-geist-semibold text-sm transition-colors hover:bg-nucleo-secondary hover:text-nucleo-dark whitespace-nowrap"
              >
                {t('newsletterButton')}
              </button>
            </form>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Logo y descripción */}
          <div className="lg:col-span-2">
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
            <p className="font-geist-regular text-sm text-nucleo-light/80 max-w-md mb-8">
              {t('description')}
            </p>
            
            {/* Newsletter - solo visible en desktop */}
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('newsletterPlaceholder')}
                className="flex-1 px-4 py-3 rounded-full bg-nucleo-dark-border border border-nucleo-dark-border text-nucleo-light placeholder:text-nucleo-light/50 focus:outline-none focus:border-nucleo-primary transition-colors"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-nucleo-primary text-nucleo-light font-geist-semibold text-sm transition-colors hover:bg-nucleo-secondary hover:text-nucleo-dark whitespace-nowrap"
              >
                {t('newsletterButton')}
              </button>
            </form>
          </div>

          {/* Productos */}
          <div>
            <h3 className="font-geist-semibold text-lg mb-6 text-nucleo-light">
              {t('products')}
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/"
                  className="font-geist-regular text-sm text-nucleo-light/80 hover:text-nucleo-secondary transition-colors"
                >
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  onClick={(e) => {
                    if (window.location.pathname === '/') {
                      e.preventDefault()
                      const solutionSection = document.querySelector('.scroll-horizontal-section')
                      if (solutionSection) {
                        solutionSection.scrollIntoView({ behavior: 'smooth' })
                      }
                    }
                  }}
                  className="font-geist-regular text-sm text-nucleo-light/80 hover:text-nucleo-secondary transition-colors"
                >
                  {t('solution')}
                </Link>
              </li>
              <li>
                <Link
                  href="/web-audit"
                  className="font-geist-regular text-sm text-nucleo-light/80 hover:text-nucleo-secondary transition-colors"
                >
                  {t('webAudit')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Pricing y Redes sociales */}
          <div>
            <h3 className="font-geist-semibold text-lg mb-6 text-nucleo-light">
              {t('pricing')}
            </h3>
            <ul className="space-y-4 mb-6">
              <li>
                <Link
                  href="/pricing"
                  className="font-geist-regular text-sm text-nucleo-light/80 hover:text-nucleo-secondary transition-colors"
                >
                  {t('pricing')}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="font-geist-regular text-sm text-nucleo-light/80 hover:text-nucleo-secondary transition-colors"
                >
                  {t('contact')}
                </Link>
              </li>
            </ul>
            {/* Redes sociales */}
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/company/nucleo-studio"
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

          {/* Legal */}
          <div>
            <h3 className="font-geist-semibold text-lg mb-6 text-nucleo-light">
              Legal
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/privacy-policy"
                  className="font-geist-regular text-sm text-nucleo-light/80 hover:text-nucleo-secondary transition-colors"
                >
                  {t('privacyPolicy')}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-service"
                  className="font-geist-regular text-sm text-nucleo-light/80 hover:text-nucleo-secondary transition-colors"
                >
                  {t('termsOfService')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright y links legales */}
        <div className="border-t border-[#202025] pt-4 mt-auto">
          <div className="flex flex-col items-center gap-6">
            <div className="flex justify-right items-end text-sm text-nucleo-light/60">
              <p className="font-geist-regular text-nucleo-dark-hover-light">
                © 2025 Nucleo. {t('allRightsReserved')}
              </p>
            </div>
          </div>
            {/* Logo */}
            <div className="w-full flex justify-center">
              <Image
                src="/images/LOGO_DESKTOP.svg"
                alt="Nucleo"
                width={1368}
                height={363}
                className="h-auto w-full max-w-full"
                priority
              />
            </div>
        </div>
      </div>
    </footer>
  )
}

