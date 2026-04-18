import type { Metadata } from 'next'
import { jobService, utils } from '@/lib/admin'
import { sitePageTitle } from '@/lib/hizmetlerimiz-silo'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const id = Number.parseInt(params.id, 10)
  if (!Number.isFinite(id) || id < 1) {
    return { title: sitePageTitle('İş ilanı') }
  }
  try {
    const job = await jobService.getById(id)
    const titleSource = (job.meta_title && String(job.meta_title).trim()) || job.title || 'İş ilanı'
    const title = sitePageTitle(titleSource)
    const rawDesc =
      (job.meta_description && String(job.meta_description).trim()) ||
      utils.htmlToPlainText(job.description || '')
    const description =
      rawDesc.length > 160 ? `${rawDesc.slice(0, 157).trimEnd()}…` : rawDesc || undefined
    return { title, description }
  } catch {
    return { title: sitePageTitle('İş ilanı') }
  }
}

export default function IsIlanDetayLayout({ children }: { children: React.ReactNode }) {
  return children
}
