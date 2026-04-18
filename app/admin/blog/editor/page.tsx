'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'

const BlogEditorScreen = dynamic(() => import('@/components/admin/BlogEditorScreen'), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  ),
})

function EditorSuspenseFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  )
}

export default function AdminBlogEditorPage() {
  return (
    <Suspense fallback={<EditorSuspenseFallback />}>
      <BlogEditorScreen />
    </Suspense>
  )
}
