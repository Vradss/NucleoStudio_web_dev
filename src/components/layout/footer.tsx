'use client'

import { FooterContent } from './footer-content'

export function Footer() {
  return (
    <div 
      className="relative md:h-[800px]"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="relative md:h-[calc(100vh+800px)] md:-top-[100vh]">
        <div className="md:h-[800px] md:sticky md:top-[calc(100vh-800px)]">
          <FooterContent />
        </div>
      </div>
    </div>
  )
}

