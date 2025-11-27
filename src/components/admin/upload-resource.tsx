'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export function UploadResource() {
  const t = useTranslations('admin')
  const tForm = useTranslations('admin.form')
  const router = useRouter()
  const supabase = createClient()
  const [isUploading, setIsUploading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'documento' as 'video' | 'documento' | 'template',
    category: '',
    file: null as File | null,
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!formData.file) return

    try {
      setIsUploading(true)

      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        throw new Error('Usuario no autenticado')
      }

      const fileExt = formData.file.name.split('.').pop()
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('resources')
        .upload(fileName, formData.file)

      if (uploadError) throw uploadError

      const {
        data: { publicUrl },
      } = supabase.storage.from('resources').getPublicUrl(fileName)

      const { error: dbError } = await supabase.from('resources').insert({
        title: formData.title,
        description: formData.description || null,
        type: formData.type,
        file_url: publicUrl,
        file_name: fileName,
        file_size: formData.file.size,
        category: formData.category || null,
        created_by: user.id,
      })

      if (dbError) throw dbError

      router.refresh()
      setFormData({
        title: '',
        description: '',
        type: 'documento',
        category: '',
        file: null,
      })
      alert(t('uploadSuccess'))
    } catch (error) {
      console.error('Error uploading resource:', error)
      alert(t('uploadError'))
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-lg border border-border bg-card p-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-2">
          {tForm('titleRequired')}
        </label>
        <input
          id="title"
          type="text"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-2">
          {tForm('description')}
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          rows={4}
          className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>

      <div>
        <label htmlFor="type" className="block text-sm font-medium mb-2">
          {tForm('typeRequired')}
        </label>
        <select
          id="type"
          required
          value={formData.type}
          onChange={(e) =>
            setFormData({
              ...formData,
              type: e.target.value as 'video' | 'documento' | 'template',
            })
          }
          className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="video">Video</option>
          <option value="documento">Documento</option>
          <option value="template">Template</option>
        </select>
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium mb-2">
          {tForm('category')}
        </label>
        <input
          id="category"
          type="text"
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>

      <div>
        <label htmlFor="file" className="block text-sm font-medium mb-2">
          {tForm('fileRequired')}
        </label>
        <input
          id="file"
          type="file"
          required
          onChange={(e) =>
            setFormData({
              ...formData,
              file: e.target.files?.[0] || null,
            })
          }
          className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>

      <button
        type="submit"
        disabled={isUploading}
        className="w-full rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isUploading ? t('uploading') : tForm('submit')}
      </button>
    </form>
  )
}
