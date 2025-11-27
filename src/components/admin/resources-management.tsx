'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface Resource {
  id: string
  title: string
  type: 'video' | 'documento' | 'template'
  created_at: string
}

export function ResourcesManagement() {
  const t = useTranslations('admin')
  const tCommon = useTranslations('common')
  const router = useRouter()
  const supabase = createClient()
  const [resources, setResources] = useState<Resource[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadResources()
  }, [])

  async function loadResources() {
    try {
      const { data, error } = await supabase
        .from('resources')
        .select('id, title, type, created_at')
        .order('created_at', { ascending: false })

      if (error) throw error
      setResources(data || [])
    } catch (error) {
      console.error('Error loading resources:', error)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm(t('deleteConfirm'))) return

    try {
      const { error } = await supabase.from('resources').delete().eq('id', id)
      if (error) throw error
      router.refresh()
      loadResources()
    } catch (error) {
      console.error('Error deleting resource:', error)
      alert(t('deleteError'))
    }
  }

  if (isLoading) {
    return <div className="text-center py-12 text-muted-foreground">{tCommon('loading')}</div>
  }

  return (
    <div className="rounded-lg border border-border bg-card">
      <div className="p-6">
        <h2 className="font-artifictrial-super text-2xl uppercase mb-4">{t('existingResources')}</h2>
        {resources.length === 0 ? (
          <p className="font-artifictrial-regular text-muted-foreground">{t('noResources')}</p>
        ) : (
          <div className="space-y-2">
            {resources.map((resource) => (
              <div
                key={resource.id}
                className="flex items-center justify-between rounded-lg border border-border bg-background p-4"
              >
                <div>
                  <h3 className="font-artifictrial-super text-base uppercase">{resource.title}</h3>
                  <p className="font-artifictrial-regular text-sm text-muted-foreground">
                    {resource.type} • {new Date(resource.created_at).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(resource.id)}
                  className="rounded-lg bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground transition-colors hover:bg-destructive/90"
                >
                  {tCommon('delete')}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
