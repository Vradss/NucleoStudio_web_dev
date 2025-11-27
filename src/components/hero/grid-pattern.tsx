'use client'

export function GridPattern() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(195, 189, 255, 0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(195, 189, 255, 0.06) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(111, 49, 255, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(111, 49, 255, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />
    </div>
  )
}


