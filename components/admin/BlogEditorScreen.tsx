'use client'

import { useCallback, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, Loader2, Save, ImagePlus } from 'lucide-react'
import { supabase as supabaseSingleton } from '@/lib/supabase'
import { isAllowedAdminUser } from '@/lib/admin-auth'
import { blogService, utils, type BlogPost } from '@/lib/admin'

import 'react-quill/dist/quill.snow.css'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

const emptyForm = {
  title: '',
  content: '',
  excerpt: '',
  image_url: '',
  image_alt: '',
  meta_title: '',
  meta_description: '',
  category: '',
  featured: false,
}

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ['link', 'image'],
    ['clean'],
  ],
}

const quillFormats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'color',
  'background',
  'align',
  'link',
  'image',
]

export default function BlogEditorScreen() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const idRaw = searchParams.get('id')
  const editId = idRaw ? parseInt(idRaw, 10) : NaN
  const isEdit = Number.isFinite(editId)

  const [authReady, setAuthReady] = useState(false)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [blogForm, setBlogForm] = useState(emptyForm)
  const [editingBlogId, setEditingBlogId] = useState<number | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [loadingBlog, setLoadingBlog] = useState(isEdit)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const {
        data: { session },
      } = await supabaseSingleton.auth.getSession()
      if (cancelled) return
      if (!session?.user?.id || !isAllowedAdminUser(session.user.id)) {
        await supabaseSingleton.auth.signOut()
        router.replace('/admin')
        return
      }
      setAuthReady(true)
    })()
    return () => {
      cancelled = true
    }
  }, [router])

  useEffect(() => {
    if (!authReady || !isEdit) {
      setLoadingBlog(false)
      return
    }
    let cancelled = false
    ;(async () => {
      try {
        const blog = await blogService.getById(editId)
        if (cancelled) return
        setEditingBlogId(blog.id ?? editId)
        setBlogForm({
          title: blog.title,
          content: blog.content,
          excerpt: blog.excerpt || '',
          image_url: blog.image_url || '',
          image_alt: blog.image_alt || '',
          meta_title: blog.meta_title || '',
          meta_description: blog.meta_description || '',
          category: blog.category || '',
          featured: blog.featured || false,
        })
      } catch {
        if (!cancelled) setLoadError('Yazı yüklenemedi veya bulunamadı.')
      } finally {
        if (!cancelled) setLoadingBlog(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [authReady, isEdit, editId])

  const handleImageUpload = useCallback(
    async (file: File) => {
      if (!file) return
      if (file.size > 5 * 1024 * 1024) {
        alert("Dosya boyutu 5MB'dan küçük olmalıdır.")
        return
      }
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
      if (!allowedTypes.includes(file.type)) {
        alert('Sadece JPEG, PNG ve WebP yükleyebilirsiniz.')
        return
      }
      try {
        setIsUploading(true)
        const fileExt = file.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
        const { error } = await supabaseSingleton.storage.from('blog-images').upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
        })
        if (error) throw error
        const { data: urlData } = supabaseSingleton.storage.from('blog-images').getPublicUrl(fileName)
        setBlogForm((prev) => ({ ...prev, image_url: urlData.publicUrl }))
      } catch (e) {
        console.error(e)
        alert('Görsel yüklenirken hata oluştu.')
      } finally {
        setIsUploading(false)
      }
    },
    []
  )

  const save = async () => {
    if (!blogForm.title.trim()) {
      alert('Başlık zorunludur.')
      return
    }
    if (!blogForm.content.trim()) {
      alert('İçerik zorunludur.')
      return
    }
    setSaving(true)
    try {
      if (isEdit && editingBlogId != null) {
        await blogService.update(editingBlogId, {
          ...blogForm,
          slug: utils.createSlug(blogForm.title),
          title: blogForm.title.trim(),
          content: blogForm.content.trim(),
        })
      } else {
        await blogService.create({
          ...blogForm,
          slug: utils.createSlug(blogForm.title),
          title: blogForm.title.trim(),
          content: blogForm.content.trim(),
        })
      }
      router.push('/admin/dashboard?tab=blog')
    } catch (e: unknown) {
      console.error(e)
      const msg =
        e && typeof e === 'object' && 'message' in e
          ? String((e as { message: string }).message)
          : 'Kaydedilirken hata oluştu.'
      alert(msg)
    } finally {
      setSaving(false)
    }
  }

  if (!authReady || loadingBlog) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-100">
        <div className="flex items-center gap-3 text-neutral-600">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span>Yükleniyor…</span>
        </div>
      </div>
    )
  }

  if (loadError) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-neutral-100 px-4">
        <p className="text-red-600">{loadError}</p>
        <Link
          href="/admin/dashboard?tab=blog"
          className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
        >
          Blog listesine dön
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-900">
      <header className="sticky top-0 z-40 border-b border-neutral-200/80 bg-white/95 shadow-sm backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <Link
              href="/admin/dashboard?tab=blog"
              className="flex shrink-0 items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm font-medium text-neutral-700 transition-colors hover:border-primary/30 hover:text-primary"
            >
              <ArrowLeft size={18} aria-hidden />
              <span className="hidden sm:inline">Yazılara dön</span>
            </Link>
            <div className="min-w-0 border-l border-neutral-200 pl-3">
              <p className="truncate text-xs font-medium uppercase tracking-wide text-primary">
                {isEdit ? 'Yazıyı düzenle' : 'Yeni yazı'}
              </p>
              <p className="truncate text-sm text-neutral-500">
                {blogForm.title.trim() || 'Başlıksız taslak'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={save}
            disabled={saving}
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary/90 disabled:opacity-50"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {isEdit ? 'Güncelle' : 'Yayınla'}
          </button>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1600px] gap-6 px-4 py-6 lg:grid-cols-[17.5rem_minmax(0,1fr)] lg:items-start lg:gap-8 lg:px-6 lg:py-8">
        <aside className="space-y-5 rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-sm lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Yazı ayarları</h2>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-neutral-700">Öne çıkan görsel</label>
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-neutral-200 bg-neutral-50/80 px-3 py-6 text-center transition-colors hover:border-primary/40 hover:bg-primary/[0.04]">
              <ImagePlus className="mb-2 h-8 w-8 text-neutral-400" aria-hidden />
              <span className="text-xs text-neutral-600">JPEG, PNG veya WebP (max 5MB)</span>
              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                className="sr-only"
                onChange={(e) => {
                  const f = e.target.files?.[0]
                  if (f) handleImageUpload(f)
                  e.target.value = ''
                }}
              />
            </label>
            {isUploading && (
              <p className="mt-2 flex items-center gap-2 text-xs text-neutral-500">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Yükleniyor…
              </p>
            )}
            {blogForm.image_url ? (
              <div className="mt-3 overflow-hidden rounded-lg border border-neutral-200">
                <img src={blogForm.image_url} alt="" className="h-36 w-full object-cover" />
              </div>
            ) : null}
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-neutral-700">Görsel alt metni</label>
            <input
              type="text"
              value={blogForm.image_alt}
              onChange={(e) => setBlogForm({ ...blogForm, image_alt: e.target.value })}
              className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none ring-primary/20 focus:border-primary focus:ring-2"
              placeholder="SEO / erişilebilirlik"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-neutral-700">Özet</label>
            <textarea
              rows={4}
              value={blogForm.excerpt}
              onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
              className="w-full resize-y rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none ring-primary/20 focus:border-primary focus:ring-2"
              placeholder="Liste ve önizleme için kısa özet"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-neutral-700">Kategori</label>
            <select
              value={blogForm.category}
              onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
              className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none ring-primary/20 focus:border-primary focus:ring-2"
            >
              <option value="">Seçin</option>
              <option value="kariyer">Kariyer</option>
              <option value="is-ilanlari">İş ilanları</option>
              <option value="egitim">Eğitim</option>
              <option value="teknoloji">Teknoloji</option>
              <option value="genel">Genel</option>
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-neutral-700">Meta başlık</label>
            <input
              type="text"
              value={blogForm.meta_title}
              onChange={(e) => setBlogForm({ ...blogForm, meta_title: e.target.value })}
              className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none ring-primary/20 focus:border-primary focus:ring-2"
              placeholder="SEO başlığı"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-neutral-700">Meta açıklama</label>
            <textarea
              rows={3}
              value={blogForm.meta_description}
              onChange={(e) => setBlogForm({ ...blogForm, meta_description: e.target.value })}
              className="w-full resize-y rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none ring-primary/20 focus:border-primary focus:ring-2"
              placeholder="SEO açıklaması"
            />
          </div>

          <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-neutral-100 bg-neutral-50/50 px-3 py-2.5">
            <input
              type="checkbox"
              checked={blogForm.featured}
              onChange={(e) => setBlogForm({ ...blogForm, featured: e.target.checked })}
              className="h-4 w-4 rounded border-neutral-300 text-primary focus:ring-primary"
            />
            <span className="text-sm font-medium text-neutral-700">Öne çıkan yazı</span>
          </label>
        </aside>

        <main className="min-w-0 rounded-2xl border border-neutral-200/80 bg-white shadow-sm">
          <div className="border-b border-neutral-100 p-6 pb-4 sm:p-8 sm:pb-6">
            <input
              type="text"
              value={blogForm.title}
              onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
              className="w-full border-0 border-b-2 border-transparent bg-transparent text-2xl font-semibold tracking-tight text-neutral-900 outline-none placeholder:text-neutral-400 focus:border-primary sm:text-3xl"
              placeholder="Başlık ekleyin"
              autoComplete="off"
            />
          </div>
          <div className="blog-admin-editor border-t border-neutral-100 px-4 pb-8 pt-4 sm:px-8">
            <ReactQuill
              theme="snow"
              value={blogForm.content}
              onChange={(content) => setBlogForm({ ...blogForm, content })}
              modules={quillModules}
              formats={quillFormats}
              placeholder="İçeriğinizi buraya yazın…"
            />
          </div>
        </main>
      </div>
    </div>
  )
}
