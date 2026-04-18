'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import type ReactQuillType from 'react-quill'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, FilePlus2, HelpCircle, ImagePlus, Loader2, Pencil, RotateCcw, Save, Trash2 } from 'lucide-react'
import { supabase as supabaseSingleton } from '@/lib/supabase'
import { isAllowedAdminUser } from '@/lib/admin-auth'
import {
  evdeBakimCityPageContentService,
  evdeBakimCityService,
  type EvdeBakimCityRecord,
} from '@/lib/admin'
import {
  bodyParagraphs,
  evdeBakimFlatHref,
  isEvdeBakimArticleEditorService,
  SERVICE_COPY,
  type EvdeBakimArticleEditorServiceKey,
} from '@/lib/evde-bakim-flat-silo'
import { buildFaqBlockHtml, extractFaqSectionFromArticle, type EvdeBakimFaqItem } from '@/lib/evde-bakim-faq-block'

import 'react-quill/dist/quill.snow.css'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
const CONTACT_PHONE = '+90 505 277 2628'
const CONTACT_EMAIL = 'info@arayisik.com'
const CONTACT_ADDRESS = 'Balıkçıoğlu iş merkezi, Korkutreis, Necatibey Cd. D:4, 06530 Çankaya/Ankara'
const CONTACT_MAP_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d764.9128181536993!2d32.8539474696579!3d39.926819626666315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d34f4fdfafb767%3A0xcd7928db72f471e5!2zQVJBWS3EsMWeIMSwbnNhbiBLYXluYWtsYXLEsQ!5e0!3m2!1str!2str!4v1755079069600!5m2!1str!2str'

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function stripHtml(text: string): string {
  return text.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}

function defaultArticleHtml(
  city: Pick<EvdeBakimCityRecord, 'city_key' | 'city_name' | 'locative' | 'locative_ki'>,
  service: EvdeBakimArticleEditorServiceKey
): string {
  const cityObj = {
    key: city.city_key,
    ad: city.city_name,
    locative: city.locative,
    locativeKi: city.locative_ki,
  }
  const [p1, p2] = bodyParagraphs(cityObj, service)
  return `<h2>Hizmet hakkında</h2><p>${escapeHtml(p1)}</p><p>${escapeHtml(p2)}</p>`
}

function contactSectionHtml(title: string, description: string): string {
  return [
    '<ul data-contact-section="true">',
    `<li><strong>Baslik:</strong> ${escapeHtml(title)}</li>`,
    `<li><strong>Aciklama:</strong> ${escapeHtml(description)}</li>`,
    `<li><strong>Telefon:</strong> ${escapeHtml(CONTACT_PHONE)}</li>`,
    `<li><strong>E-posta:</strong> ${escapeHtml(CONTACT_EMAIL)}</li>`,
    `<li><strong>Adres:</strong> ${escapeHtml(CONTACT_ADDRESS)}</li>`,
    `<li><strong>Harita URL:</strong> ${escapeHtml(CONTACT_MAP_URL)}</li>`,
    '</ul>',
  ].join('')
}

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ align: [] }],
    ['link', 'clean'],
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
  'align',
  'link',
]

export default function EvdeBakimArticleEditorScreen() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const cityKey = (searchParams.get('city') || '').trim().toLowerCase()
  const hizmetRaw = (searchParams.get('hizmet') || '').trim()

  const service = useMemo((): EvdeBakimArticleEditorServiceKey | null => {
    if (!isEvdeBakimArticleEditorService(hizmetRaw)) return null
    return hizmetRaw
  }, [hizmetRaw])

  const [authReady, setAuthReady] = useState(false)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [cityRow, setCityRow] = useState<EvdeBakimCityRecord | null>(null)
  const [html, setHtml] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false)
  const [contactTitle, setContactTitle] = useState('')
  const [contactDescription, setContactDescription] = useState('')
  const [faqQuestion, setFaqQuestion] = useState('')
  const [faqAnswer, setFaqAnswer] = useState('')
  const [faqItems, setFaqItems] = useState<EvdeBakimFaqItem[]>([])
  const [editingFaqIndex, setEditingFaqIndex] = useState<number | null>(null)
  const [featuredImageUrl, setFeaturedImageUrl] = useState('')
  const [featuredImageAlt, setFeaturedImageAlt] = useState('')
  const [metaTitleInput, setMetaTitleInput] = useState('')
  const [metaDescriptionInput, setMetaDescriptionInput] = useState('')
  const quillRef = useMemo(() => ({ current: null as ReactQuillType | null }), [])

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

  const loadContent = useCallback(async () => {
    if (!cityKey || !service) return
    setLoading(true)
    setLoadError(null)
    try {
      const cities = await evdeBakimCityService.getAll()
      const c = cities.find((x) => x.city_key === cityKey)
      if (!c) {
        setLoadError('Bu il bulunamadı.')
        setCityRow(null)
        setHtml('')
        setFaqItems([])
        return
      }
      setCityRow(c)
      const row = await evdeBakimCityPageContentService.getByCityAndService(cityKey, service)
      if (row?.article_html?.trim()) {
        const { cleanHtml, faqItems: loadedFaq } = extractFaqSectionFromArticle(row.article_html)
        setHtml(cleanHtml)
        setFaqItems(loadedFaq)
      } else {
        setHtml(defaultArticleHtml(c, service))
        setFaqItems([])
      }
      setFeaturedImageUrl(row?.featured_image_url || '')
      setFeaturedImageAlt(row?.featured_image_alt || '')
      setMetaTitleInput(row?.meta_title || '')
      setMetaDescriptionInput(row?.meta_description || '')
    } catch (e) {
      console.error(e)
      setLoadError('İçerik veya il bilgisi yüklenemedi. Veritabanı yamasını çalıştırdınız mı?')
      setCityRow(null)
      setHtml('')
      setFaqItems([])
      setFeaturedImageUrl('')
      setFeaturedImageAlt('')
      setMetaTitleInput('')
      setMetaDescriptionInput('')
    } finally {
      setLoading(false)
    }
  }, [cityKey, service])

  useEffect(() => {
    if (!authReady) return
    if (!cityKey || !service) {
      setLoading(false)
      setLoadError('Geçersiz veya eksik adres. ?city=ankara&hizmet=yasli-bakicisi gibi kullanın.')
      return
    }
    loadContent()
  }, [authReady, cityKey, service, loadContent])

  const resetToTemplate = async () => {
    if (!cityRow || !service) return
    if (!confirm('Özel makale silinsin mi? Sitede tekrar varsayılan şablon kullanılacak.')) return
    try {
      await evdeBakimCityPageContentService.deleteByCityAndService(cityRow.city_key, service)
      setHtml(defaultArticleHtml(cityRow, service))
      setFaqItems([])
      setFeaturedImageUrl('')
      setFeaturedImageAlt('')
      setMetaTitleInput('')
      setMetaDescriptionInput('')
      alert('Veritabanındaki özel içerik kaldırıldı; aşağıda şablon metni görünüyor. Yayınlamak için Kaydet demenize gerek yok.')
    } catch (e) {
      console.error(e)
      alert('Sıfırlanamadı.')
    }
  }

  const save = async () => {
    if (!cityRow || !service) return
    const trimmed = html.trim()
    if (!trimmed) {
      alert('İçerik boş olamaz. Tamamen kaldırmak için «Şablona dön» kullanın.')
      return
    }
    setSaving(true)
    try {
      const faqSuffix = buildFaqBlockHtml(faqItems)
      const article_html = faqSuffix ? `${trimmed}\n${faqSuffix}` : trimmed
      await evdeBakimCityPageContentService.upsertArticle({
        city_key: cityRow.city_key,
        service_key: service,
        article_html,
        featured_image_url: featuredImageUrl,
        featured_image_alt: featuredImageAlt,
        meta_title: metaTitleInput,
        meta_description: metaDescriptionInput,
      })
      router.push('/admin/dashboard?tab=hizmetler')
    } catch (e) {
      console.error(e)
      alert('Kaydedilemedi.')
    } finally {
      setSaving(false)
    }
  }

  const handleFeaturedImageUpload = useCallback(async (file: File) => {
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
      setFeaturedImageUrl(urlData.publicUrl)
    } catch (e) {
      console.error(e)
      alert('Görsel yüklenirken hata oluştu.')
    } finally {
      setIsUploading(false)
    }
  }, [])

  if (!authReady || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-100">
        <div className="flex items-center gap-3 text-neutral-600">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span>Yükleniyor…</span>
        </div>
      </div>
    )
  }

  if (loadError || !cityRow || !service) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-neutral-100 px-4">
        <p className="max-w-md text-center text-red-600">{loadError || 'Sayfa açılamadı.'}</p>
        <Link
          href="/admin/dashboard?tab=hizmetler"
          className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
        >
          Hizmetlere dön
        </Link>
      </div>
    )
  }

  const publicUrl = evdeBakimFlatHref(cityRow.city_key, service)
  const serviceLabel = SERVICE_COPY[service].breadcrumbServiceName
  const defaultContactTitle = `${cityRow.city_name} ${serviceLabel} İletişim`
  const defaultContactDescription = `${cityRow.city_name} ${serviceLabel} hizmeti için bizimle hızlıca iletişime geçebilirsiniz.`

  const openContactModal = () => {
    setContactTitle(defaultContactTitle)
    setContactDescription(defaultContactDescription)
    setIsContactModalOpen(true)
  }

  const insertContactSection = () => {
    const title = contactTitle.trim()
    const description = contactDescription.trim()
    if (!title || !description) {
      alert('Başlık ve açıklama zorunludur.')
      return
    }
    const block = contactSectionHtml(title, description)
    const editor = quillRef.current?.getEditor()
    if (!editor) {
      setHtml((prev) => `${prev}${block}`)
      setIsContactModalOpen(false)
      return
    }
    const range = editor.getSelection(true)
    const insertIndex = typeof range?.index === 'number' ? range.index : editor.getLength()
    editor.clipboard.dangerouslyPasteHTML(insertIndex, block, 'user')
    setHtml(editor.root.innerHTML)
    setIsContactModalOpen(false)
  }

  const closeFaqModal = () => {
    setIsFaqModalOpen(false)
    setEditingFaqIndex(null)
    setFaqQuestion('')
    setFaqAnswer('')
  }

  const openFaqModal = () => {
    setEditingFaqIndex(null)
    setFaqQuestion('')
    setFaqAnswer('')
    setIsFaqModalOpen(true)
  }

  const openFaqEditModal = (index: number) => {
    const item = faqItems[index]
    if (!item) return
    setEditingFaqIndex(index)
    setFaqQuestion(item.question)
    setFaqAnswer(item.answer)
    setIsFaqModalOpen(true)
  }

  const removeFaqAt = (index: number) => {
    setFaqItems((prev) => prev.filter((_, i) => i !== index))
  }

  const submitFaqModal = () => {
    const question = faqQuestion.trim()
    const answer = faqAnswer.trim()
    if (!question || !answer) {
      alert('Soru ve cevap zorunludur.')
      return
    }
    if (editingFaqIndex === null) {
      setFaqItems((prev) => [...prev, { question, answer }])
    } else {
      setFaqItems((prev) =>
        prev.map((item, i) => (i === editingFaqIndex ? { question, answer } : item))
      )
    }
    closeFaqModal()
  }

  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-900">
      <header className="sticky top-0 z-40 border-b border-neutral-200/80 bg-white/95 shadow-sm backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <Link
              href="/admin/dashboard?tab=hizmetler"
              className="flex shrink-0 items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm font-medium text-neutral-700 transition-colors hover:border-primary/30 hover:text-primary"
            >
              <ArrowLeft size={18} aria-hidden />
              <span className="hidden sm:inline">Hizmetlere dön</span>
            </Link>
            <div className="min-w-0 border-l border-neutral-200 pl-3">
              <p className="truncate text-xs font-medium uppercase tracking-wide text-primary">Makale</p>
              <p className="truncate text-sm text-neutral-700">
                {cityRow.city_name} · {serviceLabel}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <a
              href={publicUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-600 hover:border-primary/30 hover:text-primary"
            >
              Sitede aç
            </a>
            <button
              type="button"
              onClick={openContactModal}
              className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
            >
              <FilePlus2 size={16} />
              İletişim kartı ekle
            </button>
            <button
              type="button"
              onClick={openFaqModal}
              className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
            >
              <HelpCircle size={16} />
              FAQ ekle
            </button>
            <button
              type="button"
              onClick={resetToTemplate}
              className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
            >
              <RotateCcw size={16} />
              Şablona dön
            </button>
            <button
              type="button"
              onClick={save}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 disabled:opacity-50"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Kaydet
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1200px] px-4 py-6 sm:px-6 sm:py-8">
        <p className="mb-4 text-sm text-neutral-600">
          Başlık (H1–H3), paragraf, liste ve bağlantı ekleyebilirsiniz. Kaydettiğiniz HTML, sitede «Hizmet hakkında» bölümünde gösterilir. FAQ’lar editörde görünmez; aşağıdaki listeden ekleyip düzenleyebilirsiniz — kayıtta makalenin sonuna eklenir ve sitede ayrı bölüm olarak çıkar.
        </p>
        <div className="mb-4 grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-neutral-200/80 bg-white p-4 shadow-sm sm:p-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-500">Öne çıkan görsel</p>
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-neutral-200 bg-neutral-50/80 px-3 py-6 text-center transition-colors hover:border-primary/40 hover:bg-primary/[0.04]">
              <ImagePlus className="mb-2 h-8 w-8 text-neutral-400" aria-hidden />
              <span className="text-xs text-neutral-600">JPEG, PNG veya WebP (max 5MB)</span>
              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                className="sr-only"
                onChange={(e) => {
                  const f = e.target.files?.[0]
                  if (f) handleFeaturedImageUpload(f)
                  e.target.value = ''
                }}
              />
            </label>
            {isUploading ? (
              <p className="mt-2 flex items-center gap-2 text-xs text-neutral-500">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Yükleniyor…
              </p>
            ) : null}
            {featuredImageUrl ? (
              <div className="mt-3 overflow-hidden rounded-lg border border-neutral-200">
                <img src={featuredImageUrl} alt="" className="h-36 w-full object-cover" />
              </div>
            ) : null}
            <label className="mt-3 block">
              <span className="mb-1.5 block text-xs font-medium text-neutral-700">Görsel URL</span>
              <input
                type="text"
                value={featuredImageUrl}
                onChange={(e) => setFeaturedImageUrl(e.target.value)}
                className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none ring-primary/20 focus:border-primary focus:ring-2"
                placeholder="https://..."
              />
            </label>
            <label className="mt-3 block">
              <span className="mb-1.5 block text-xs font-medium text-neutral-700">Görsel alt metni</span>
              <input
                type="text"
                value={featuredImageAlt}
                onChange={(e) => setFeaturedImageAlt(e.target.value)}
                className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none ring-primary/20 focus:border-primary focus:ring-2"
                placeholder="SEO / erişilebilirlik"
              />
            </label>
          </div>

          <div className="rounded-2xl border border-neutral-200/80 bg-white p-4 shadow-sm sm:p-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-500">SEO</p>
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-neutral-700">Meta başlık</span>
              <input
                type="text"
                value={metaTitleInput}
                onChange={(e) => setMetaTitleInput(e.target.value)}
                className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none ring-primary/20 focus:border-primary focus:ring-2"
                placeholder="SEO başlığı"
              />
            </label>
            <label className="mt-3 block">
              <span className="mb-1.5 block text-xs font-medium text-neutral-700">Meta açıklama</span>
              <textarea
                rows={4}
                value={metaDescriptionInput}
                onChange={(e) => setMetaDescriptionInput(e.target.value)}
                className="w-full resize-y rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none ring-primary/20 focus:border-primary focus:ring-2"
                placeholder="SEO açıklaması"
              />
            </label>
          </div>
        </div>

        <div className="mb-4 rounded-2xl border border-neutral-200/80 bg-white p-4 shadow-sm sm:p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Sık sorulan sorular (FAQ)</p>
          <p className="mt-1 text-sm text-neutral-600">
            Sorular burada listelenir. «Kaydet» ile makale metninin sonuna HTML olarak eklenir; canlı sitede makale altında FAQ bileşeni olarak gösterilir.
          </p>
          {faqItems.length === 0 ? (
            <p className="mt-3 text-sm text-neutral-500">Henüz FAQ eklenmedi. Üstteki «FAQ ekle» ile ekleyin.</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {faqItems.map((item, i) => (
                <li
                  key={`${item.question}-${i}`}
                  className="flex flex-col gap-3 rounded-xl border border-neutral-200/80 bg-neutral-50/50 p-4 sm:flex-row sm:items-start sm:justify-between"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-neutral-900">{item.question}</p>
                    <p className="mt-1 text-sm leading-relaxed text-neutral-600">{item.answer}</p>
                  </div>
                  <div className="flex shrink-0 gap-2 sm:flex-col sm:items-end">
                    <button
                      type="button"
                      onClick={() => openFaqEditModal(i)}
                      className="inline-flex items-center gap-1 rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-50"
                    >
                      <Pencil size={14} aria-hidden />
                      Düzenle
                    </button>
                    <button
                      type="button"
                      onClick={() => removeFaqAt(i)}
                      className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50"
                    >
                      <Trash2 size={14} aria-hidden />
                      Sil
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-2xl border border-neutral-200/80 bg-white p-4 shadow-sm sm:p-6">
          <div className="blog-admin-editor">
            <ReactQuill
              ref={(instance) => {
                quillRef.current = instance
              }}
              theme="snow"
              value={html}
              onChange={setHtml}
              modules={quillModules}
              formats={quillFormats}
              placeholder="Makaleyi buraya yazın…"
            />
          </div>
        </div>
      </div>

      {isContactModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-xl rounded-2xl bg-white p-5 shadow-xl sm:p-6">
            <h2 className="text-lg font-semibold text-neutral-900">İletişim kartı ekle</h2>
            <p className="mt-1 text-sm text-neutral-600">
              Telefon, e-posta ve harita URL sabittir. Sadece başlık ve açıklama girin.
            </p>

            <div className="mt-4 space-y-4">
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-neutral-700">Kart başlığı</span>
                <input
                  value={contactTitle}
                  onChange={(e) => setContactTitle(e.target.value)}
                  className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm text-neutral-800 outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                  placeholder="Kayseri Hasta Bakıcısı İletişim"
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-sm font-medium text-neutral-700">Açıklama</span>
                <textarea
                  value={contactDescription}
                  onChange={(e) => setContactDescription(e.target.value)}
                  rows={4}
                  className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm text-neutral-800 outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                  placeholder="Bu hizmet için bizimle hızlıca iletişime geçebilirsiniz."
                />
              </label>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsContactModalOpen(false)}
                className="rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
              >
                Vazgeç
              </button>
              <button
                type="button"
                onClick={insertContactSection}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90"
              >
                Ekle
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {isFaqModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-xl rounded-2xl bg-white p-5 shadow-xl sm:p-6">
            <h2 className="text-lg font-semibold text-neutral-900">
              {editingFaqIndex === null ? 'FAQ ekle' : 'FAQ düzenle'}
            </h2>
            <p className="mt-1 text-sm text-neutral-600">
              Kaydettiğinizde makalenin sonuna eklenir; sitede FAQ bölümü ve şema üretilir.
            </p>

            <div className="mt-4 space-y-4">
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-neutral-700">Soru</span>
                <input
                  value={faqQuestion}
                  onChange={(e) => setFaqQuestion(e.target.value)}
                  className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm text-neutral-800 outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                  placeholder="Örn: Bu hizmette süreç nasıl ilerliyor?"
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-sm font-medium text-neutral-700">Cevap</span>
                <textarea
                  value={faqAnswer}
                  onChange={(e) => setFaqAnswer(e.target.value)}
                  rows={4}
                  className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm text-neutral-800 outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                  placeholder="Cevabı buraya yazın."
                />
              </label>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={closeFaqModal}
                className="rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
              >
                Vazgeç
              </button>
              <button
                type="button"
                onClick={submitFaqModal}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90"
              >
                {editingFaqIndex === null ? 'Ekle' : 'Kaydet'}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
