'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHeroMedia from '@/components/PageHeroMedia'
import KVKKModal from '@/components/KVKKModal'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

const inputClass =
  'w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-900 outline-none placeholder:text-neutral-400 focus:border-primary focus:ring-1 focus:ring-primary/20'

export default function ContactPage() {
  const [userType, setUserType] = useState<string>('')
  const [kvkkAccepted, setKvkkAccepted] = useState(false)
  const [isKVKKModalOpen, setIsKVKKModalOpen] = useState(false)

  return (
    <main className="min-h-screen bg-white text-neutral-900 antialiased">
      <Header />

      <PageHeroMedia title="İletişim" currentPage="İletişim" />

      <section className="border-t border-neutral-200 py-10 md:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-lg border border-neutral-200">
            <iframe
              title="Aray-İş konum haritası"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d764.9128181536993!2d32.8539474696579!3d39.926819626666315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d34f4fdfafb767%3A0xcd7928db72f471e5!2zQVJBWS3EsMWeIMSwbnNhbiBLYXluYWtsYXLEsQ!5e0!3m2!1str!2str!4v1755079069600!5m2!1str!2str"
              width="100%"
              height="360"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-64 w-full sm:h-80"
            />
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-neutral-50/50 py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <h2 className="text-lg font-semibold text-neutral-900">Mesaj gönderin</h2>
              <p className="mt-1 text-sm text-neutral-600">Formu doldurun, size geri dönelim.</p>

              <form className="mt-6 space-y-4">
                <fieldset>
                  <legend className="mb-2 text-sm font-medium text-neutral-800">Kimsiniz?</legend>
                  <div className="flex flex-wrap gap-6">
                    <label className="flex cursor-pointer items-center gap-2 text-sm">
                      <input
                        type="radio"
                        name="userType"
                        value="employee"
                        checked={userType === 'employee'}
                        onChange={(e) => setUserType(e.target.value)}
                        className="border-neutral-300 text-primary focus:ring-primary"
                      />
                      İş arayan
                    </label>
                    <label className="flex cursor-pointer items-center gap-2 text-sm">
                      <input
                        type="radio"
                        name="userType"
                        value="employer"
                        checked={userType === 'employer'}
                        onChange={(e) => setUserType(e.target.value)}
                        className="border-neutral-300 text-primary focus:ring-primary"
                      />
                      İşveren
                    </label>
                  </div>
                </fieldset>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className="mb-1 block text-sm text-neutral-700">
                      Ad
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className={inputClass}
                      placeholder="Adınız"
                      autoComplete="given-name"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="mb-1 block text-sm text-neutral-700">
                      Soyad
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className={inputClass}
                      placeholder="Soyadınız"
                      autoComplete="family-name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="mb-1 block text-sm text-neutral-700">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className={inputClass}
                    placeholder="+90 5XX XXX XX XX"
                    autoComplete="tel"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="mb-1 block text-sm text-neutral-700">
                    Konu
                  </label>
                  <select id="subject" name="subject" className={inputClass}>
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
                  <label htmlFor="message" className="mb-1 block text-sm text-neutral-700">
                    Mesajınız
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className={`${inputClass} min-h-[100px] resize-y`}
                    placeholder="Mesajınız…"
                  />
                </div>

                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="kvkk"
                    name="kvkk"
                    checked={kvkkAccepted}
                    onChange={(e) => setKvkkAccepted(e.target.checked)}
                    required
                    className="mt-1 h-4 w-4 rounded border-neutral-300 text-primary"
                  />
                  <label htmlFor="kvkk" className="text-sm text-neutral-600">
                    <button
                      type="button"
                      className="text-primary underline-offset-2 hover:underline"
                      onClick={() => setIsKVKKModalOpen(true)}
                    >
                      KVKK metni
                    </button>
                    ’ni okudum ve kabul ediyorum. <span className="text-red-600">*</span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={!kvkkAccepted}
                  className="w-full rounded-full bg-primary py-3 text-sm font-medium text-white hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-neutral-300"
                >
                  Gönder
                </button>
              </form>
            </div>

            <aside className="lg:col-span-5">
              <h2 className="text-lg font-semibold text-neutral-900">İletişim</h2>
              <p className="mt-1 text-sm text-neutral-600">Doğrudan ulaşım.</p>

              <ul className="mt-8 space-y-8 text-sm">
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-neutral-400" aria-hidden />
                  <div>
                    <p className="font-medium text-neutral-900">Adres</p>
                    <p className="mt-1 text-neutral-600 leading-relaxed">
                      Balıkçıoğlu iş merkezi, Korkutreis, Necatibey Cd. D:4, 06530 Çankaya/Ankara
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-neutral-400" aria-hidden />
                  <div>
                    <p className="font-medium text-neutral-900">Telefon</p>
                    <p className="mt-1 text-neutral-600">
                      <a href="tel:+905052772628" className="hover:text-primary">
                        +90 505 277 2628
                      </a>
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-neutral-400" aria-hidden />
                  <div>
                    <p className="font-medium text-neutral-900">E-posta</p>
                    <p className="mt-1 text-neutral-600">
                      <a href="mailto:info@arayisik.com" className="hover:text-primary">
                        info@arayisik.com
                      </a>
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-neutral-400" aria-hidden />
                  <div>
                    <p className="font-medium text-neutral-900">Çalışma saatleri</p>
                    <p className="mt-1 text-neutral-600 leading-relaxed">
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
          </div>
        </div>
      </section>

      <KVKKModal isOpen={isKVKKModalOpen} onClose={() => setIsKVKKModalOpen(false)} />

      <Footer />
    </main>
  )
}
