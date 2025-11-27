'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { ResourceCard } from './resource-card'

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

interface ResourcesListProps {
  resources: Resource[]
}

export function ResourcesList({ resources }: ResourcesListProps) {
  const t = useTranslations('dashboard')
  const tTypes = useTranslations('types')
  const [filter, setFilter] = useState<'all' | 'video' | 'documento' | 'template'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredResources = resources.filter((resource) => {
    const matchesFilter = filter === 'all' || resource.type === filter
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description?.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1">
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:max-w-md"
          />
        </div>
        <div className="flex gap-2">
          {(['all', 'video', 'documento', 'template'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                filter === type
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {type === 'all'
                ? t('filterAll')
                : type === 'video'
                ? t('filterVideo')
                : type === 'documento'
                ? t('filterDocument')
                : t('filterTemplate')}
            </button>
          ))}
        </div>
      </div>

      {filteredResources.length === 0 ? (
        <div className="rounded-lg border border-border bg-muted/50 p-12 text-center">
          <p className="text-muted-foreground">{t('noResources')}</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredResources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      )}
    </div>
  )
}

