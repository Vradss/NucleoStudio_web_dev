'use client'

import { useLocale } from 'next-intl'
import { formatDistanceToNow } from 'date-fns'
import { es, enUS } from 'date-fns/locale'
import { Link } from '@/i18n/routing'

interface Resource {
  id: string
  title: string
  description: string | null
  type: 'video' | 'documento' | 'template'
  file_url: string
  file_name: string
  file_size: number
  category: string | null
  created_at: string
}

interface ResourceCardProps {
  resource: Resource
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}

function getTypeIcon(type: string) {
  switch (type) {
    case 'video':
      return '🎥'
    case 'documento':
      return '📄'
    case 'template':
      return '📋'
    default:
      return '📁'
  }
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const locale = useLocale()
  const dateLocale = locale === 'es' ? es : enUS
  
  const formattedDate = formatDistanceToNow(new Date(resource.created_at), {
    addSuffix: true,
    locale: dateLocale,
  })

  return (
    <Link
      href={`/resources/${resource.id}`}
      className="group block rounded-lg border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-lg"
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="text-4xl">{getTypeIcon(resource.type)}</div>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          {resource.type}
        </span>
      </div>

      <h3 className="mb-2 font-artifictrial-super text-xl uppercase tracking-tight transition-colors group-hover:text-primary">
        {resource.title}
      </h3>

      {resource.description && (
        <p className="font-artifictrial-regular mb-4 line-clamp-2 text-sm text-muted-foreground">
          {resource.description}
        </p>
      )}

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{formatFileSize(resource.file_size)}</span>
        <span>{formattedDate}</span>
      </div>
    </Link>
  )
}

