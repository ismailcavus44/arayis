import Link from 'next/link'
import type { ReactNode } from 'react'
import {
  Home,
  Heart,
  Briefcase,
  FileText,
  HardHat,
  Factory,
  Target,
  BarChart2,
  ChevronRight,
} from 'lucide-react'

/** Ana sayfa — `/hizmetler` ile aynı dört hizmet. */
const services: {
  href: string
  title: string
  description: string
  icon: ReactNode
}[] = [
  {
    href: '/hizmetlerimiz/evde-bakim-personeli',
    icon: (
      <div className="relative flex h-9 w-9 items-center justify-center">
        <Home size={22} className="text-sky-500" />
        <Heart size={12} className="absolute -right-0.5 -top-0.5 fill-sky-500/15 text-sky-500" strokeWidth={2} />
      </div>
    ),
    title: 'Evde Bakım Personeli Aracılığı',
    description:
      'Sevdikleriniz ve eviniz için ihtiyaç duyduğunuz güvenilir personeli bulmanıza profesyonel düzeyde aracılık ediyoruz. Bakım hizmetini biz vermiyor, en doğru adayla sizi buluşturuyoruz.',
  },
  {
    href: '/hizmetlerimiz/beyaz-yaka-personel-araciligi',
    icon: (
      <div className="relative flex h-9 w-9 items-center justify-center">
        <Briefcase size={22} className="text-sky-500" />
        <FileText size={12} className="absolute -bottom-0.5 -right-1 text-sky-500" strokeWidth={2} />
      </div>
    ),
    title: 'Beyaz Yaka Personel Aracılığı',
    description:
      'Şirketinizin vizyonuna ve kurum kültürüne değer katacak uzman ve yönetici kadrolarını tespit ediyor ve sizinle buluşturuyoruz.',
  },
  {
    href: '/hizmetlerimiz/mavi-yaka-personel-araciligi',
    icon: (
      <div className="relative flex h-9 w-9 items-center justify-center">
        <HardHat size={22} className="text-sky-500" />
        <Factory size={11} className="absolute -bottom-0.5 -right-1 text-sky-500" strokeWidth={2} />
      </div>
    ),
    title: 'Mavi Yaka Personel Aracılığı',
    description:
      'Üretim, lojistik ve hizmet sektörlerindeki operasyonel gücünüzü artıracak nitelikli iş gücünü kurumunuza hızlı ve güvenilir personel aracılığıyla buluşturuyoruz.',
  },
  {
    href: '/hizmetlerimiz/insan-kaynaklari-danismanligi',
    icon: (
      <div className="relative flex h-9 w-9 items-center justify-center">
        <Target size={22} className="text-sky-500" />
        <BarChart2 size={12} className="absolute -bottom-0.5 -right-1 text-sky-500" strokeWidth={2} />
      </div>
    ),
    title: 'İnsan Kaynakları Danışmanlığı',
    description:
      'Şirketinizin insan kaynakları süreçlerini optimize ederek kurumsal verimliliğinizi ve çalışan memnuniyetini artıracak stratejik çözümler sunuyoruz.',
  },
]

function ServiceCard({
  href,
  title,
  description,
  icon,
}: {
  href: string
  title: string
  description: string
  icon: ReactNode
}) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-6 transition-all duration-300 hover:border-sky-100 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:p-8"
    >
      <div className="mb-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-500">
        {icon}
      </div>
      <h3 className="text-[20px] font-bold leading-snug text-slate-800">{title}</h3>
      <p className="mt-2 flex-grow text-base leading-relaxed text-slate-600">{description}</p>
      <div className="mt-4 flex justify-end">
        <span className="inline-flex items-center gap-1 text-base font-medium text-sky-500 transition-colors group-hover:text-sky-600">
          İncele
          <ChevronRight size={18} className="transition-transform group-hover:translate-x-0.5" aria-hidden />
        </span>
      </div>
    </Link>
  )
}

export default function ServicesSection() {
  return (
    <section className="border-t border-neutral-200/80 bg-white py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Hizmetlerimiz</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900">
            Sunduğumuz hizmetler
          </h2>
          <p className="mt-4 text-neutral-600 leading-relaxed">
            Detaylı bilgi için kartlara tıklayın; her hizmet için ayrı sayfamız mevcuttur.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2">
          {services.map((service) => (
            <ServiceCard
              key={service.href}
              href={service.href}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            href="/hizmetler"
            className="inline-flex items-center justify-center rounded-full border border-neutral-200 bg-white px-8 py-3 text-sm font-semibold text-secondary transition-colors hover:border-primary/35 hover:text-primary"
          >
            Tüm hizmetleri gör
          </Link>
        </div>
      </div>
    </section>
  )
}
