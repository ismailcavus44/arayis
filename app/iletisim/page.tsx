'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHeroMedia from '@/components/PageHeroMedia'
import KVKKModal from '@/components/KVKKModal'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

const fieldClass =
  'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500'

const labelClass = 'mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300'

const segmentActive =
  'cursor-pointer rounded-lg bg-sky-500 px-6 py-2.5 text-center text-sm font-medium text-white shadow-md transition-all duration-300'

const segmentInactive =
  'cursor-pointer rounded-lg px-6 py-2.5 text-center text-sm font-medium text-slate-600 transition-all duration-300 hover:bg-slate-200/50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-100'

const MAP_EMBED_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d764.9128181536993!2d32.8539474696579!3d39.926819626666315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d34f4fdfafb767%3A0xcd7928db72f471e5!2zQVJBWS3EsMWeIMSwbnNhbiBLYXluYWtsYXLEsQ!5e0!3m2!1str!2str!4v1755079069600!5m2!1str!2str'

export default function ContactPage() {
  const [userType, setUserType] = useState<string>('employer')
  const [kvkkAccepted, setKvkkAccepted] = useState(false)
  const [isKVKKModalOpen, setIsKVKKModalOpen] = useState(false)

  return (
    <main className="min-h-screen bg-white text-neutral-900 antialiased dark:bg-slate-950 dark:text-slate-100">
      <Header />

      <PageHeroMedia title="İletişim" currentPage="İletişim" />

      <section className="border-t border-neutral-200 py-10 dark:border-slate-800 md:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Üst: harita (sol lg) + iletişim (sağ lg) — mobil order: 1 iletişim, 2 harita */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <aside className="order-1 min-w-0 lg:order-2">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">İletişim</h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Doğrudan ulaşım.</p>

              <ul className="mt-8 space-y-8 text-sm">
                <li className="flex gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-500 dark:bg-slate-800 dark:text-sky-400">
                    <MapPin className="h-5 w-5" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className="font-medium text-neutral-900 dark:text-slate-100">Adres</p>
                    <p className="mt-1 leading-relaxed text-slate-600 dark:text-slate-400">
                      Balıkçıoğlu iş merkezi, Korkutreis, Necatibey Cd. D:4, 06530 Çankaya/Ankara
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-500 dark:bg-slate-800 dark:text-sky-400">
                    <Phone className="h-5 w-5" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className="font-medium text-neutral-900 dark:text-slate-100">Telefon</p>
                    <p className="mt-1 text-slate-600 dark:text-slate-400">
                      <a href="tel:+905052772628" className="hover:text-sky-600 dark:hover:text-sky-400">
                        +90 505 277 2628
                      </a>
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-500 dark:bg-slate-800 dark:text-sky-400">
                    <Mail className="h-5 w-5" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className="font-medium text-neutral-900 dark:text-slate-100">E-posta</p>
                    <p className="mt-1 text-slate-600 dark:text-slate-400">
                      <a href="mailto:info@arayisik.com" className="hover:text-sky-600 dark:hover:text-sky-400">
                        info@arayisik.com
                      </a>
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-500 dark:bg-slate-800 dark:text-sky-400">
                    <Clock className="h-5 w-5" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className="font-medium text-neutral-900 dark:text-slate-100">Çalışma saatleri</p>
                    <p className="mt-1 leading-relaxed text-slate-600 dark:text-slate-400">
                      Pazartesi – Cuma: 09:00 – 18:00
                      <br />
                      Cumartesi: 09:00 – 14:00
                      <br />
                      Pazar: kapalı
                    </p>
                  </div>
                </li>
              </ul>
            </aside>

            <div className="order-2 min-h-0 lg:order-1">
              <div className="h-full min-h-[350px] w-full overflow-hidden rounded-2xl border border-slate-100 bg-slate-100 shadow-lg dark:border-slate-800 dark:bg-slate-900">
                <iframe
                  title="Aray-İş konum haritası"
                  src={MAP_EMBED_SRC}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: 350 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block h-full min-h-[350px] w-full"
                />
              </div>
            </div>
          </div>

          {/* Alt: form — üst grid ile aynı container genişliği */}
          <div className="mt-12 w-full">
            <div className="w-full rounded-2xl border border-slate-100 bg-white p-8 shadow-lg dark:border-slate-800 dark:bg-slate-900 md:p-10">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Mesaj gönderin</h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Formu doldurun, size geri dönelim.</p>

              <form className="mt-6 space-y-5">
                <fieldset>
                  <legend className="mb-3 text-sm font-semibold text-slate-700 dark:text-slate-300">Kimsiniz?</legend>
                  <div
                    className="mb-6 inline-flex w-full rounded-xl bg-slate-100 p-1 dark:bg-slate-800 lg:w-auto"
                    role="radiogroup"
                    aria-label="Kullanıcı tipi"
                  >
                    <label
                      className={`flex min-w-0 flex-1 items-center justify-center lg:flex-none ${
                        userType === 'employee' ? segmentActive : segmentInactive
                      }`}
                    >
                      <input
                        type="radio"
                        name="userType"
                        value="employee"
                        checked={userType === 'employee'}
                        onChange={(e) => setUserType(e.target.value)}
                        className="sr-only"
                      />
                      İş arayan
                    </label>
                    <label
                      className={`flex min-w-0 flex-1 items-center justify-center lg:flex-none ${
                        userType === 'employer' ? segmentActive : segmentInactive
                      }`}
                    >
                      <input
                        type="radio"
                        name="userType"
                        value="employer"
                        checked={userType === 'employer'}
                        onChange={(e) => setUserType(e.target.value)}
                        className="sr-only"
                      />
                      İşveren
                    </label>
                  </div>
                </fieldset>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className={labelClass}>
                      Ad
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className={fieldClass}
                      placeholder="Adınız"
                      autoComplete="given-name"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className={labelClass}>
                      Soyad
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className={fieldClass}
                      placeholder="Soyadınız"
                      autoComplete="family-name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className={labelClass}>
                    Telefon
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className={fieldClass}
                    placeholder="+90 5XX XXX XX XX"
                    autoComplete="tel"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className={labelClass}>
                    Konu
                  </label>
                  <select id="subject" name="subject" className={fieldClass}>
                    <option value="">Konu seçiniz</option>
                    <option value="job-search">İş arama</option>
                    <option value="cv-service">CV hazırlama</option>
                    <option value="career-consulting">Kariyer danışmanlığı</option>
                    <option value="interview-preparation">Mülakat hazırlığı</option>
                    <option value="hr-consulting">İK danışmanlığı</option>
                    <option value="recruitment-service">İşe alım hizmeti</option>
                    <option value="other">Diğer</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className={labelClass}>
                    Mesajınız
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className={`${fieldClass} min-h-[120px] resize-y`}
                    placeholder="Mesajınız…"
                  />
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="kvkk"
                    name="kvkk"
                    checked={kvkkAccepted}
                    onChange={(e) => setKvkkAccepted(e.target.checked)}
                    required
                    className="mt-1 h-4 w-4 shrink-0 rounded border-slate-300 text-sky-500 focus:ring-sky-500 dark:border-slate-600 dark:bg-slate-800 dark:text-sky-500"
                  />
                  <label htmlFor="kvkk" className="text-sm text-slate-600 dark:text-slate-400">
                    <button
                      type="button"
                      className="font-medium text-sky-600 underline-offset-2 hover:underline dark:text-sky-400"
                      onClick={() => setIsKVKKModalOpen(true)}
                    >
                      KVKK metni
                    </button>
                    ’ni okudum ve kabul ediyorum. <span className="text-red-500">*</span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={!kvkkAccepted}
                  className="w-full rounded-xl bg-sky-500 py-3.5 text-base font-bold text-white shadow-md transition-colors hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Gönder
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <KVKKModal isOpen={isKVKKModalOpen} onClose={() => setIsKVKKModalOpen(false)} />

      <Footer />
    </main>
  )
}
