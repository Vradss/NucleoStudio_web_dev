'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { LanguageSelector } from './language-selector'
import { Link, usePathname } from '@/i18n/routing'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { CalButton } from '@/components/ui/cal-button'

export function Header() {
  const t = useTranslations('nav')
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Detectar si se ha hecho scroll
      if (currentScrollY > 10) {
        setHasScrolled(true)
      } else {
        setHasScrolled(false)
      }

      // Si estamos en la parte superior, siempre mostrar el header
      if (currentScrollY < 10) {
        setIsVisible(true)
        setLastScrollY(currentScrollY)
        return
      }

      // Si el menú móvil está abierto, no ocultar el header
      if (isMenuOpen) {
        setLastScrollY(currentScrollY)
        return
      }

      // Detectar dirección del scroll
      if (currentScrollY > lastScrollY) {
        // Scroll hacia abajo - ocultar
        setIsVisible(false)
      } else if (currentScrollY < lastScrollY) {
        // Scroll hacia arriba - mostrar
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY, isMenuOpen])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  // Detectar si estamos en la página de pricing
  const isPricingPage = pathname?.includes('/pricing')

  const scrollToSection = (sectionId: string) => {
    closeMenu()
    
    // Verificar si estamos en la página principal (puede ser /, /es, o /en)
    const isHomePage = pathname === '/' || pathname === '/es' || pathname === '/en'
    
    // Si no estamos en la página principal, navegar primero
    if (!isHomePage) {
      const locale = pathname.startsWith('/en') ? '/en' : '/es'
      window.location.href = locale
      // Esperar a que la página cargue antes de hacer scroll
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
      }, 500)
      return
    }

    // Pequeño delay para asegurar que la página esté cargada
    setTimeout(() => {
      const element = document.getElementById(sectionId)
      if (element) {
        const headerHeight = 64 // altura del header
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
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isPricingPage 
            ? 'bg-nucleo-dark' 
            : `bg-transparent ${hasScrolled ? 'backdrop-blur-md' : ''}`
        }`}
      >
        <div className="mx-auto max-w-7xl flex h-16 items-center justify-between p-4 text-nucleo-light">
          {/* Logo a la izquierda */}
          <Link href="/" className="flex items-center flex-shrink-0" onClick={closeMenu}>
            <Image
              src="/images/nucleo_logo/nucleo_logo_blanco.svg"
              alt="Nucleo Studio"
              width={150}
              height={32}
              className="h-5 w-auto md:h-6"
              priority
              unoptimized
            />
          </Link>
          
          {/* Navegación en el centro */}
          <nav className="hidden items-center gap-6 md:flex flex-1 justify-center">
            <button
              onClick={() => scrollToSection('solucion')}
              className="font-geist-regular text-sm text-nucleo-light/90 transition-colors hover:text-nucleo-secondary md:text-base py-2 px-3 min-h-[44px] flex items-center"
            >
              {t('solution')}
            </button>
            <button
              onClick={() => scrollToSection('entregables')}
              className="font-geist-regular text-sm text-nucleo-light/90 transition-colors hover:text-nucleo-secondary md:text-base py-2 px-3 min-h-[44px] flex items-center"
            >
              {t('deliverables')}
            </button>
            <Link
              href="/pricing"
              className="font-geist-regular text-sm text-nucleo-light/90 transition-colors hover:text-nucleo-secondary md:text-base py-2 px-3 min-h-[44px] flex items-center"
            >
              {t('pricing')}
            </Link>
            <button
              onClick={() => scrollToSection('faqs')}
              className="font-geist-regular text-sm text-nucleo-light/90 transition-colors hover:text-nucleo-secondary md:text-base py-2 px-3 min-h-[44px] flex items-center"
            >
              {t('faqs')}
            </button>
          </nav>

          {/* CTA y controles a la derecha */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <CalButton
              className="hidden rounded-full bg-nucleo-dark-secondary border border-nucleo-dark-secondary px-5 py-2.5 text-sm font-medium text-nucleo-light transition-colors hover:bg-nucleo-dark hover:text-nucleo-light md:inline-flex items-center min-h-[44px] cursor-pointer"
            >
              {t('contact')}
            </CalButton>
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
                className="block h-0.5 w-6 bg-nucleo-light"
              />
              <motion.span
                animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="block h-0.5 w-6 bg-nucleo-light"
              />
              <motion.span
                animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className="block h-0.5 w-6 bg-nucleo-light"
              />
            </button>
          </div>
        </div>
      </motion.header>

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
              className="fixed inset-0 bg-nucleo-dark z-40 md:hidden"
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
              className="fixed inset-0 z-50 bg-nucleo-dark md:hidden flex flex-col"
            >
              {/* Header del menú móvil */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-nucleo-dark-border">
                <Link href="/" className="flex items-center" onClick={closeMenu}>
                  <Image
                    src="/images/nucleo_logo/nucleo_logo_blanco.svg"
                    alt="Nucleo Studio"
                    width={150}
                    height={32}
                    className="h-5 w-auto md:h-8"
                    priority
                    unoptimized
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
                    className="text-nucleo-light"
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
                  <button
                    onClick={() => {
                      closeMenu()
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                    className="block text-lg font-geist-medium text-nucleo-light transition-colors hover:text-nucleo-secondary text-left w-full"
                  >
                    {t('home')}
                  </button>
                  <button
                    onClick={() => scrollToSection('solucion')}
                    className="block text-lg font-geist-medium text-nucleo-light transition-colors hover:text-nucleo-secondary text-left w-full"
                  >
                    {t('solution')}
                  </button>
                  <button
                    onClick={() => scrollToSection('entregables')}
                    className="block text-lg font-geist-medium text-nucleo-light transition-colors hover:text-nucleo-secondary text-left w-full "
                  >
                    {t('deliverables')}
                  </button>
                  <Link
                    href="/pricing"
                    onClick={closeMenu}
                    className="block text-lg font-geist-medium text-nucleo-light transition-colors hover:text-nucleo-secondary text-left w-full"
                  >
                    {t('pricing')}
                  </Link>
                  <button
                    onClick={() => scrollToSection('faqs')}
                    className="block text-lg font-geist-medium text-nucleo-light transition-colors hover:text-nucleo-secondary text-left w-full"
                  >
                    {t('faqs')}
                  </button>
                </motion.div>
              </nav>

              {/* CTA Button y Language Selector */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="px-6 pb-8 space-y-4"
              >
                <CalButton
                  className="block w-full rounded-full bg-nucleo-primary px-8 py-4 text-center text-lg font-geist-semibold text-nucleo-light transition-colors hover:bg-nucleo-secondary hover:text-nucleo-dark cursor-pointer"
                >
                  {t('contact')}
                </CalButton>
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
