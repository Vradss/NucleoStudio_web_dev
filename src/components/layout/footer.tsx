'use client'

import { FooterContent } from './footer-content'

export function Footer() {
  return (
    <div 
      className="relative"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="relative">
        <div className="md:sticky md:bottom-0">
          <FooterContent />
        </div>
      </div>
    </div>
  )
}

