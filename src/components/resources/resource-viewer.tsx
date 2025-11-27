'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { createClient } from '@/lib/supabase/client'

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

interface ResourceViewerProps {
  resource: Resource
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}

export function ResourceViewer({ resource }: ResourceViewerProps) {
  const t = useTranslations('resources')
  const tTypes = useTranslations('types')
  const [isDownloading, setIsDownloading] = useState(false)
  const supabase = createClient()

  async function handleDownload() {
    try {
      setIsDownloading(true)
      const { data, error } = await supabase.storage
        .from('resources')
        .download(resource.file_name)

      if (error) throw error

      const url = URL.createObjectURL(data)
      const a = document.createElement('a')
      a.href = url
      a.download = resource.file_name
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading file:', error)
      alert(t('downloadError'))
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Link
        href="/dashboard"
        className="inline-flex items-center text-sm font-artifictrial-regular text-muted-foreground transition-colors hover:text-foreground"
      >
        ← {t('backToDashboard')}
      </Link>

      <div className="rounded-lg border border-border bg-card p-8">
        <div className="mb-6">
          <h1 className="font-artifictrial-super text-3xl uppercase mb-2">{resource.title}</h1>
          {resource.description && (
            <p className="font-artifictrial-regular text-muted-foreground">{resource.description}</p>
          )}
        </div>

        <div className="mb-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span>{t('type')}: {tTypes(resource.type)}</span>
          <span>{t('size')}: {formatFileSize(resource.file_size)}</span>
          {resource.category && <span>{t('category')}: {resource.category}</span>}
        </div>

        {resource.type === 'video' ? (
          <div className="aspect-video w-full overflow-hidden rounded-lg bg-muted">
            <video
              src={resource.file_url}
              controls
              className="h-full w-full"
            >
              {t('videoNotSupported')}
            </video>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="rounded-lg border border-border bg-muted/50 p-12 text-center">
              <div className="mb-4 text-6xl">
                {resource.type === 'template' ? '📋' : '📄'}
              </div>
              <p className="text-muted-foreground mb-4">
                {resource.file_name}
              </p>
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDownloading ? t('downloading') : t('downloadFile')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

