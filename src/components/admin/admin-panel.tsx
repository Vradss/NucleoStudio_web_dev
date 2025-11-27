'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { UploadResource } from './upload-resource'
import { ResourcesManagement } from './resources-management'

export function AdminPanel() {
  const t = useTranslations('admin')
  const [activeTab, setActiveTab] = useState<'upload' | 'manage'>('upload')

  return (
    <div className="space-y-6">
      <div className="flex gap-2 border-b border-border">
        <button
          onClick={() => setActiveTab('upload')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'upload'
              ? 'border-b-2 border-primary text-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {t('uploadResource')}
        </button>
        <button
          onClick={() => setActiveTab('manage')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'manage'
              ? 'border-b-2 border-primary text-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {t('manageResources')}
        </button>
      </div>

      {activeTab === 'upload' ? <UploadResource /> : <ResourcesManagement />}
    </div>
  )
}

