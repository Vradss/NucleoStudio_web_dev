'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { LanguageSelector } from './language-selector'
import { Link } from '@/i18n/routing'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

export function Header() {
  const t = useTranslations('nav')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-transparent backdrop-blur-md">
        <div className="container mx-auto flex h-12 items-center justify-between px-6 text-[#F7F6F3]">
          <Link href="/" className="flex items-center" onClick={closeMenu}>
            <Image
              src="/images/nucleo_logo/nucleo_logo_blanco.svg"
              alt="Nucleo Studio"
              width={150}
              height={32}
              className="h-5 w-auto md:h-8"
              priority
            />
          </Link>
          
          <nav className="hidden items-center gap-8 md:flex">
            <Link
              href="/product"
              className="text-sm font-medium text-[#F7F6F3]/80 transition-colors hover:text-[#C3BDFF]"
            >
              {t('product')}
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium text-[#F7F6F3]/80 transition-colors hover:text-[#C3BDFF]"
            >
              {t('pricing')}
            </Link>
            <Link
              href="/web-audit"
              className="text-sm font-medium text-[#F7F6F3]/80 transition-colors hover:text-[#C3BDFF]"
            >
              {t('resources')}
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="hidden rounded-full bg-[#6F31FF] px-5 py-2 text-sm font-medium text-[#F7F6F3] transition-colors hover:bg-[#C3BDFF] hover:text-[#0A0A0A] md:inline-block"
            >
              {t('contact')}
            </Link>
            <div className="hidden md:block">
              <LanguageSelector />
            </div>
            
            {/* Botón hamburguesa - solo mobile */}
            <button
              onClick={toggleMenu}
              className="md:hidden flex flex-col gap-1.5 p-2"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className="block h-0.5 w-6 bg-[#F7F6F3]"
              />
              <motion.span
                animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="block h-0.5 w-6 bg-[#F7F6F3]"
              />
              <motion.span
                animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className="block h-0.5 w-6 bg-[#F7F6F3]"
              />
            </button>
          </div>
        </div>
      </header>

      {/* Menú móvil con animación de despliegue */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Overlay de fondo */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-[#0A0A0A] z-40 md:hidden"
              onClick={closeMenu}
            />
            
            {/* Menú desplegable */}
            <motion.div
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ 
                type: 'spring',
                damping: 25,
                stiffness: 200
              }}
              className="fixed inset-0 z-50 bg-[#0A0A0A] md:hidden flex flex-col"
            >
              {/* Header del menú móvil */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#1F1F1F]">
                <Link href="/" className="flex items-center" onClick={closeMenu}>
                  <Image
                    src="/images/nucleo_logo/nucleo_logo_blanco.svg"
                    alt="Nucleo Studio"
                    width={150}
                    height={32}
                    className="h-5 w-auto md:h-8"
                    priority
                  />
                </Link>
                <button
                  onClick={closeMenu}
                  className="p-2"
                  aria-label="Close menu"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-[#F7F6F3]"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Navegación */}
              <nav className="flex-1 flex flex-col justify-center px-6 py-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="space-y-8"
                >
                  <Link
                    href="/"
                    onClick={closeMenu}
                    className="block text-2xl font-artifictrial-semibold text-[#F7F6F3] transition-colors hover:text-[#C3BDFF]"
                  >
                    HOME
                  </Link>
                  <Link
                    href="/"
                    onClick={(e) => {
                      closeMenu()
                      // Scroll suave a la sección de solución (scroll-horizontal)
                      if (window.location.pathname === '/') {
                        e.preventDefault()
                        const solutionSection = document.querySelector('.scroll-horizontal-section')
                        if (solutionSection) {
                          solutionSection.scrollIntoView({ behavior: 'smooth' })
                        }
                      }
                    }}
                    className="block text-2xl font-artifictrial-semibold text-[#F7F6F3] transition-colors hover:text-[#C3BDFF]"
                  >
                    SOLUTION
                  </Link>
                  <Link
                    href="/pricing"
                    onClick={closeMenu}
                    className="block text-2xl font-artifictrial-semibold text-[#F7F6F3] transition-colors hover:text-[#C3BDFF]"
                  >
                    PRICING
                  </Link>
                </motion.div>
              </nav>

              {/* CTA Button y Language Selector */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="px-6 pb-8 space-y-4"
              >
                <Link
                  href="/contact"
                  onClick={closeMenu}
                  className="block w-full rounded-full bg-[#6F31FF] px-8 py-4 text-center text-lg font-artifictrial-semibold text-[#F7F6F3] transition-colors hover:bg-[#C3BDFF] hover:text-[#0A0A0A]"
                >
                  CONVERSEMOS
                </Link>
                <div className="flex justify-center">
                  <LanguageSelector />
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
