'use client'

export function GridPattern() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--nucleo-secondary-opacity-06) 1px, transparent 1px),
            linear-gradient(to bottom, var(--nucleo-secondary-opacity-06) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--nucleo-primary-opacity-08) 1px, transparent 1px),
            linear-gradient(to bottom, var(--nucleo-primary-opacity-08) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />
    </div>
  )
}


