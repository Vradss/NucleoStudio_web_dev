'use client'

import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'

export function LoginError({ error }: { error: string | null }) {
  const t = useTranslations('auth')
  const searchParams = useSearchParams()
  const errorParam = error || searchParams.get('error')

  if (!errorParam) return null

  const errorMessages: Record<string, string> = {
    auth_failed: 'La autenticación falló. Por favor, intenta nuevamente.',
    no_code: 'No se recibió el código de autenticación.',
    session_error: 'Error al crear la sesión. Por favor, intenta nuevamente.',
    no_session: 'No se pudo crear la sesión.',
    unexpected_error: 'Ocurrió un error inesperado. Por favor, intenta nuevamente.',
  }

  return (
    <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-destructive text-sm">
      {errorMessages[errorParam] || 'Error de autenticación. Por favor, intenta nuevamente.'}
    </div>
  )
}


