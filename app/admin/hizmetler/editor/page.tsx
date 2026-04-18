'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'

const EvdeBakimArticleEditorScreen = dynamic(() => import('@/components/admin/EvdeBakimArticleEditorScreen'), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  ),
})

function Fallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  )
}

export default function AdminEvdeBakimArticleEditorPage() {
  return (
    <Suspense fallback={<Fallback />}>
      <EvdeBakimArticleEditorScreen />
    </Suspense>
  )
}
