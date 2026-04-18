import { Mail, MapPin, Phone } from 'lucide-react'

type ContactSectionProps = {
  title: string
  description: string
  phone: string
  email: string
  address: string
  mapIframeUrl: string
}

function normalizePhoneHref(phone: string) {
  return `tel:${phone.replace(/\s+/g, '')}`
}

export default function ContactSection({
  title,
  description,
  phone,
  email,
  address,
  mapIframeUrl,
}: ContactSectionProps) {
  return (
    <section className="pt-[4px] pb-[30px]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-gray-50 shadow-sm ring-1 ring-black/5">
          <div className="grid grid-cols-1 gap-0 lg:grid-cols-2">
            <div className="h-[320px] lg:h-full lg:min-h-[520px]">
              <iframe
                title={title}
                src={mapIframeUrl}
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="h-full w-full rounded-t-3xl border-0 lg:rounded-l-3xl lg:rounded-r-none"
              />
            </div>

            <div className="flex flex-col justify-start p-6 sm:p-8 lg:p-12">
              <div className="inline-flex w-fit rounded-full bg-black px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white">
                BİZE ULAŞIN
              </div>

              <p className="mt-5 text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
                {title}
              </p>
              <p className="mt-4 max-w-xl text-sm leading-7 text-gray-600 sm:text-base">
                {description}
              </p>

              <ul className="mt-8 space-y-5">
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-full bg-white p-2 text-gray-900 shadow-sm ring-1 ring-black/5">
                    <Phone className="h-4 w-4" aria-hidden />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Telefon</p>
                    <a
                      href={normalizePhoneHref(phone)}
                      className="mt-1 block text-sm text-gray-600 transition-colors hover:text-primary"
                    >
                      {phone}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-full bg-white p-2 text-gray-900 shadow-sm ring-1 ring-black/5">
                    <Mail className="h-4 w-4" aria-hidden />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">E-posta</p>
                    <a
                      href={`mailto:${email}`}
                      className="mt-1 block text-sm text-gray-600 transition-colors hover:text-primary"
                    >
                      {email}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-full bg-white p-2 text-gray-900 shadow-sm ring-1 ring-black/5">
                    <MapPin className="h-4 w-4" aria-hidden />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Adres</p>
                    <p className="mt-1 text-sm leading-6 text-gray-600">{address}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/*
Ornek kullanim:

<ContactSection
  title="Kayseri Hasta Bakicisi Iletisim"
  description="Kayseri ilimizde profesyonel hasta bakimi ve refakatci ihtiyaclariniz icin sizinle hizlica iletisime geciyoruz."
  phone="+90 532 555 01 23"
  email="kayseri@hizmetinizde.com"
  address="Sahabiye Mah. No:4 Kocasinan/Kayseri"
  mapIframeUrl="https://www.google.com/maps/embed?pb=..."
/>
*/
