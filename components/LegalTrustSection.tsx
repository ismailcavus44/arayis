import Image from 'next/image'
import { ShieldCheck, FileCheck, BadgeCheck } from 'lucide-react'

const highlights = [
  {
    icon: ShieldCheck,
    title: 'Resmi Onaylı Faaliyet',
    text: 'İŞKUR güvencesiyle yasal ve denetlenebilir aracılık hizmeti.',
  },
  {
    icon: FileCheck,
    title: 'Güvenilir Sözleşmeler',
    text: 'Hem aileyi hem de personeli koruyan şeffaf yasal zemin.',
  },
  {
    icon: BadgeCheck,
    title: 'Sıfır Risk',
    text: 'Kayıt dışı personelden uzak, adli sicil kontrollü kurumsal süreçler.',
  },
]

export default function LegalTrustSection() {
  return (
    <section
      className="border-t border-slate-200/60 bg-sky-50/50 py-16 md:py-20"
      aria-labelledby="legal-trust-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-14">
          <div className="flex shrink-0 justify-center lg:justify-start">
            <div className="flex h-32 w-32 items-center justify-center rounded-2xl border border-slate-200/80 bg-white p-3 shadow-sm ring-1 ring-slate-100/80 md:h-36 md:w-36 md:p-4">
              <Image
                src="/images/ozel-istihdam-burosu-logo.png"
                alt="İŞKUR onaylı özel istihdam bürosu logosu"
                width={200}
                height={200}
                className="h-full w-full object-contain"
                sizes="(max-width: 1024px) 128px, 144px"
              />
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              YASAL GÜVENCE VE ŞEFFAFLIK
            </p>
            <h2 id="legal-trust-heading" className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
              İŞKUR Onaylı Özel İstihdam Bürosu -{' '}
              <span className="text-primary">Aray İş</span>
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600">
              Sevdiklerinizi şansa bırakmayın. Firmamız, Türkiye İş Kurumu&apos;nun yetkilendirdiği, düzenli olarak
              denetlenen ve yasal güvence altında hizmet veren resmi bir istihdam bürosudur. Hizmet alan ailelerimizin ve
              yönlendirdiğimiz personellerin tüm hakları yasal sözleşmelerle koruma altındadır.
            </p>

            <ul className="mt-10 grid gap-6 sm:grid-cols-3 sm:gap-6 lg:gap-8">
              {highlights.map((item) => {
                const Icon = item.icon
                return (
                  <li
                    key={item.title}
                    className="flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm ring-1 ring-slate-100/80 transition-shadow duration-300 hover:shadow-md md:p-6"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200/80 bg-sky-50/80 text-blue-900">
                      <Icon size={22} strokeWidth={1.75} aria-hidden />
                    </span>
                    <div className="mt-4 min-w-0 flex-1">
                      <h3 className="text-[20px] font-semibold leading-snug text-slate-800">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.text}</p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
