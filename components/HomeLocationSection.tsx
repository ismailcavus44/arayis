import { Phone, Mail, MapPin, Clock } from 'lucide-react'

/** İletişim sayfası ile aynı Google Maps embed (Aray-İş). */
const GOOGLE_MAPS_EMBED_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d764.9128181536993!2d32.8539474696579!3d39.926819626666315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d34f4fdfafb767%3A0xcd7928db72f471e5!2zQVJBWS3EsMWeIMSwbnNhbiBLYXluYWtsYXLEsQ!5e0!3m2!1str!2str!4v1755079069600!5m2!1str!2str'

export default function HomeLocationSection() {
  return (
    <section className="border-t border-neutral-200/80 bg-white py-16 md:py-20" aria-labelledby="home-location-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">İletişim</p>
        <h2 id="home-location-heading" className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900">
          Konum ve iletişim
        </h2>
        <p className="mt-4 max-w-2xl text-neutral-600 leading-relaxed">
          Ofisimize haritadan ulaşabilir veya aşağıdaki bilgilerle doğrudan iletişime geçebilirsiniz.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12 lg:items-start">
          <div>
            <h3 className="text-[20px] font-semibold leading-snug text-neutral-900">Harita</h3>
            <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
              <iframe
                title="Aray-İş konum haritası"
                src={GOOGLE_MAPS_EMBED_SRC}
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

          <div>
            <h3 className="text-[20px] font-semibold leading-snug text-neutral-900">İletişim bilgileri</h3>
            <ul className="mt-6 space-y-7 text-sm">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                <div>
                  <p className="font-medium text-neutral-900">Adres</p>
                  <p className="mt-1 text-neutral-600 leading-relaxed">
                    Balıkçıoğlu iş merkezi, Korkutreis, Necatibey Cd. D:4, 06530 Çankaya/Ankara
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                <div>
                  <p className="font-medium text-neutral-900">Telefon</p>
                  <p className="mt-1 text-neutral-600">
                    <a href="tel:+905052772628" className="font-medium text-primary hover:underline">
                      +90 505 277 2628
                    </a>
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                <div>
                  <p className="font-medium text-neutral-900">E-posta</p>
                  <p className="mt-1 text-neutral-600">
                    <a href="mailto:info@arayisik.com" className="font-medium text-primary hover:underline">
                      info@arayisik.com
                    </a>
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
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
          </div>
        </div>
      </div>
    </section>
  )
}
