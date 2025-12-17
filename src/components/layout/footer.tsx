'use client'

import { FooterContent } from './footer-content'

export function Footer() {
  return (
    <div 
      className="relative min-h-[600px] md:h-[800px]"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="relative h-[calc(100vh+600px)] md:h-[calc(100vh+800px)] -top-[100vh]">
        <div className="min-h-[600px] md:h-[800px] sticky top-[calc(100vh-600px)] md:top-[calc(100vh-800px)]">
          <FooterContent />
        </div>
      </div>
    </div>
  )
}

