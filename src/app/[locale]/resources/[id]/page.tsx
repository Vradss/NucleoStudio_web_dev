import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import { ResourceViewer } from '@/components/resources/resource-viewer'

interface ResourcePageProps {
  params: Promise<{ id: string; locale: string }>
}

export default async function ResourcePage({ params }: ResourcePageProps) {
  const { id, locale } = await params
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect(`/${locale}/login`)
  }

  const { data: resource, error } = await supabase
    .from('resources')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !resource) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8 text-[#F7F6F3]">
      <ResourceViewer resource={resource} />
    </div>
  )
}


