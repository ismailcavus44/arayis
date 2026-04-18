'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import KVKKModal from '@/components/KVKKModal'
import JobPostingSchema, { mapTurkishJobTypeToEmploymentType } from '@/components/JobPostingSchema'
import { MapPin, Building, Clock, CheckCircle, Send, ChevronRight, Home, User, Calendar, X } from 'lucide-react'
import { jobService, applicationService, utils, JobListing, JobApplication } from '@/lib/admin'
import { getSiteOrigin } from '@/lib/site-origin'

const inputClass =
  'w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-800 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15'

export default function JobDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [job, setJob] = useState<JobListing | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false)
  const [isKVKKModalOpen, setIsKVKKModalOpen] = useState(false)
  const [kvkkAccepted, setKvkkAccepted] = useState(false)
  const [applicationForm, setApplicationForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    experience: '',
    message: ''
  })

  useEffect(() => {
    if (params.id) {
      fetchJob()
    }
  }, [params.id])

  const fetchJob = async () => {
    try {
      setIsLoading(true)
      const data = await jobService.getById(parseInt(params.id as string))
      setJob(data)
    } catch (error) {
      console.error('İş ilanı yüklenirken hata:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleApplicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!kvkkAccepted) {
      alert('KVKK metnini kabul etmelisiniz.')
      return
    }
    
    if (!job) return

    try {
      const application: JobApplication = {
        job_id: job.id!,
        first_name: applicationForm.firstName,
        last_name: applicationForm.lastName,
        phone: applicationForm.phone,
        email: applicationForm.email,
        experience: applicationForm.experience,
        message: applicationForm.message
      }

      await applicationService.create(application)
      alert('Başvurunuz başarıyla gönderildi!')
      setIsApplicationModalOpen(false)
      setApplicationForm({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        experience: '',
        message: ''
      })
      setKvkkAccepted(false)
    } catch (error) {
      console.error('Başvuru gönderilirken hata:', error)
      alert('Başvuru gönderilirken bir hata oluştu. Lütfen tekrar deneyin.')
    }
  }

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">İlan detayları yükleniyor...</p>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  if (!job) {
    return (
      <>
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-medium text-gray-900 mb-4">İlan Bulunamadı</h1>
          <p className="text-gray-600 mb-8">Aradığınız ilan mevcut değil veya kaldırılmış olabilir.</p>
          <button
            onClick={() => router.push('/is-ilanlari')}
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            İlanlara Dön
          </button>
        </div>
        <Footer />
      </>
    )
  }

  const publishedDate = utils.formatDate(job.created_at || new Date().toISOString())
  const origin = getSiteOrigin()
  const postedAt = job.created_at ? new Date(job.created_at) : new Date()
  const datePostedIso = postedAt.toISOString()
  const validThroughDate = new Date(postedAt)
  validThroughDate.setDate(validThroughDate.getDate() + 90)
  const validThroughIso = validThroughDate.toISOString()
  const jobPageUrl = `${origin}/is-ilanlari/${job.id}`
  const cityFromLocation = job.location?.split(',')[0]?.trim() || job.location?.trim() || 'Türkiye'
  const schemaDescription = [
    job.description,
    job.responsibilities?.length
      ? `\n\nYapılacak işler:\n- ${job.responsibilities.join('\n- ')}`
      : '',
  ].join('')

  return (
    <>
      <JobPostingSchema
        jobTitle={job.title}
        jobDescription={schemaDescription}
        datePosted={datePostedIso}
        validThrough={validThroughIso}
        employmentType={mapTurkishJobTypeToEmploymentType(job.type)}
        jobLocationCity={cityFromLocation}
        jobPageUrl={jobPageUrl}
        directApply
      />
      <Header />
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-9 sm:px-6 lg:px-8 lg:py-12">
          <nav aria-label="Sayfa konumu" className="text-sm">
            <div className="flex flex-wrap items-center gap-1 text-gray-600">
              <Link href="/" className="inline-flex items-center gap-1 transition-colors hover:text-primary">
                <Home size={15} aria-hidden />
                <span>Anasayfa</span>
              </Link>
              <ChevronRight size={14} className="text-gray-400" aria-hidden />
              <Link href="/is-ilanlari" className="transition-colors hover:text-primary">
                İş İlanları
              </Link>
              <ChevronRight size={14} className="text-gray-400" aria-hidden />
              <span className="font-medium text-gray-500">{job.title}</span>
            </div>
          </nav>
          <hr className="my-4 border-gray-200" />

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_19rem] lg:items-start lg:gap-8">
            <div className="min-w-0">
              <section className="rounded-[6px] border border-gray-200/80 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <h1 className="text-2xl font-semibold leading-tight text-gray-900 sm:text-3xl">{job.title}</h1>
                  <span className="inline-flex rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
                    {job.type}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-gray-500 sm:text-sm">
                  <span className="inline-flex items-center gap-1.5">
                    <User size={14} className="text-primary" aria-hidden />
                    <span>Aray İş</span>
                  </span>
                  <span aria-hidden>|</span>
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar size={14} className="text-primary" aria-hidden />
                    <span>{publishedDate}</span>
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-gray-600 sm:text-sm">
                  <span className="inline-flex items-center gap-2">
                    <Building size={16} className="text-primary" aria-hidden />
                    <span className="font-medium">{job.company}</span>
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <MapPin size={16} className="text-primary" aria-hidden />
                    <span>{job.location}</span>
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Clock size={16} className="text-primary" aria-hidden />
                    <span>Güncel ilan</span>
                  </span>
                </div>

                {job.salary ? (
                  <div className="mt-4 inline-flex items-center gap-2 text-xl font-semibold text-gray-900">
                    <span
                      className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-sm font-bold leading-none text-primary"
                      aria-hidden
                    >
                      ₺
                    </span>
                    {job.salary}
                  </div>
                ) : null}
              </section>

              <section className="mt-5 rounded-[6px] border border-gray-200/80 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] sm:p-6">
                <h2 className="text-xl font-semibold text-gray-900">İş Tanımı</h2>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{job.description}</p>

                <h3 className="mt-7 text-[20px] font-semibold leading-snug text-gray-900">Yapılacak İşler</h3>
                <ul className="mt-3 space-y-2.5">
                  {job.responsibilities.map((resp, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle size={18} className="mr-3 mt-0.5 flex-shrink-0 text-primary" />
                      <span className="text-sm text-gray-600">{resp}</span>
                    </li>
                  ))}
                </ul>

                {job.requirements.length > 0 ? (
                  <>
                    <h3 className="mt-7 text-[20px] font-semibold leading-snug text-gray-900">Aranan Özellikler</h3>
                    <ul className="mt-3 space-y-2.5">
                      {job.requirements.map((req, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle size={18} className="mr-3 mt-0.5 flex-shrink-0 text-primary" />
                          <span className="text-sm text-gray-600">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : null}

                {job.benefits.length > 0 ? (
                  <>
                    <h3 className="mt-7 text-[20px] font-semibold leading-snug text-gray-900">Sunduğumuz Faydalar</h3>
                    <ul className="mt-3 space-y-2.5">
                      {job.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle size={18} className="mr-3 mt-0.5 flex-shrink-0 text-primary" />
                          <span className="text-sm text-gray-600">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : null}
              </section>
            </div>

            <aside className="hidden min-w-0 lg:block">
              <div className="sticky top-28 rounded-[6px] border border-gray-200/80 bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-500">Hızlı Başvuru</p>
                <h2 className="mt-2 text-base font-semibold text-gray-900">Bu ilana başvurun</h2>
                <p className="mt-2 text-xs leading-5 text-gray-600">
                  Bilgilerinizi iletin, ekibimiz kısa sürede sizinle iletişime geçsin.
                </p>
                <button
                  onClick={() => setIsApplicationModalOpen(true)}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
                >
                  <Send size={16} />
                  <span>Bu İlana Başvur</span>
                </button>
                <button
                  onClick={() => router.push('/is-ilanlari')}
                  className="mt-2.5 inline-flex w-full items-center justify-center rounded-full border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:border-primary/30 hover:text-primary"
                >
                  İlanlara Dön
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Başvuru Modal */}
      {isApplicationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-[2px]">
          <div className="w-full max-w-2xl overflow-y-auto rounded-3xl border border-gray-200/80 bg-white shadow-xl">
            <div className="border-b border-gray-100 px-5 py-4 sm:px-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-500">Başvuru</p>
                  <h2 className="mt-1 text-lg font-semibold text-gray-900 sm:text-xl">
                    {job.title}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setIsApplicationModalOpen(false)}
                  className="rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
                  aria-label="Modalı kapat"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="px-5 py-5 sm:px-6">
              <form onSubmit={handleApplicationSubmit} className="space-y-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className="mb-1.5 block text-xs font-medium text-gray-700">
                      Ad <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      required
                      value={applicationForm.firstName}
                      onChange={(e) => setApplicationForm({...applicationForm, firstName: e.target.value})}
                      className={inputClass}
                      placeholder="Adınız"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="mb-1.5 block text-xs font-medium text-gray-700">
                      Soyad <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      required
                      value={applicationForm.lastName}
                      onChange={(e) => setApplicationForm({...applicationForm, lastName: e.target.value})}
                      className={inputClass}
                      placeholder="Soyadınız"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="mb-1.5 block text-xs font-medium text-gray-700">
                    Telefon <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    value={applicationForm.phone}
                    onChange={(e) => setApplicationForm({...applicationForm, phone: e.target.value})}
                    className={inputClass}
                    placeholder="+90 5XX XXX XX XX"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-gray-700">
                    E-posta <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={applicationForm.email}
                    onChange={(e) => setApplicationForm({...applicationForm, email: e.target.value})}
                    className={inputClass}
                    placeholder="ornek@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="experience" className="mb-1.5 block text-xs font-medium text-gray-700">
                    Deneyim
                  </label>
                  <textarea
                    id="experience"
                    rows={3}
                    value={applicationForm.experience}
                    onChange={(e) => setApplicationForm({...applicationForm, experience: e.target.value})}
                    className={`${inputClass} min-h-[92px] resize-y`}
                    placeholder="İlgili deneyimlerinizi kısaca açıklayın..."
                  ></textarea>
                </div>

                <div>
                  <label htmlFor="message" className="mb-1.5 block text-xs font-medium text-gray-700">
                    Ek Mesajınız
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={applicationForm.message}
                    onChange={(e) => setApplicationForm({...applicationForm, message: e.target.value})}
                    className={`${inputClass} min-h-[110px] resize-y`}
                    placeholder="Kendiniz hakkında ek bilgiler veya mesajınız..."
                  ></textarea>
                </div>

                {/* KVKK Checkbox */}
                <div className="rounded-xl border border-gray-100 bg-gray-50/60 p-3">
                  <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="kvkk"
                    checked={kvkkAccepted}
                    onChange={(e) => setKvkkAccepted(e.target.checked)}
                    required
                    className="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <label htmlFor="kvkk" className="text-sm text-gray-700">
                    <span 
                      className="text-primary cursor-pointer hover:underline"
                      onClick={() => setIsKVKKModalOpen(true)}
                    >
                      KVKK Metni
                    </span>
                    'ni okudum ve kabul ediyorum. <span className="text-red-500">*</span>
                  </label>
                  </div>
                </div>

                <div className="flex gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => setIsApplicationModalOpen(false)}
                    className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
                  >
                    Başvuruyu Gönder
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* KVKK Modal */}
      <KVKKModal 
        isOpen={isKVKKModalOpen} 
        onClose={() => setIsKVKKModalOpen(false)} 
      />

      <Footer />
    </>
  )
}
