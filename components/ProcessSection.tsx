import { ClipboardList, Users, ShieldCheck, UserRound, BadgeCheck } from 'lucide-react'

const steps = [
  {
    icon: ClipboardList,
    title: 'İhtiyaç Analizi',
    description:
      'Talebinizi, beklentilerinizi ve hassasiyetlerinizi dinleyerek aradığınız personelin profilini netleştiriyoruz.',
  },
  {
    icon: Users,
    title: 'Aday Eşleştirme',
    description: 'Geniş ve referanslı havuzumuzdan, ailenize en uygun ve deneyimli adayları özenle seçiyoruz.',
  },
  {
    icon: ShieldCheck,
    title: 'Güvenlik ve Referans Kontrolü',
    description: 'Seçilen adayların adli sicil kayıtlarını ve geçmiş iş referanslarını detaylıca inceliyoruz.',
  },
  {
    icon: UserRound,
    title: 'Yüz Yüze Görüşme',
    description:
      'Onay verdiğiniz adaylarla sizi bir araya getiriyor, doğru kararı vermeniz için mülakat sürecini yönetiyoruz.',
  },
  {
    icon: BadgeCheck,
    title: 'İşe Başlama ve Takip',
    description:
      'Personel işe başladıktan sonra da süreci yakından takip ediyor, uyum ve memnuniyet garantisi sunuyoruz.',
  },
]

export default function ProcessSection() {
  return (
    <section className="border-t border-neutral-200/80 bg-sky-50/50 py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">ADIM ADIM HİZMETİMİZ</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900">
            Doğru personeli sizinle nasıl buluşturuyoruz?
          </h2>
          <p className="mt-4 text-neutral-600 leading-relaxed">
            Ailenizin güvenliği ve huzuru için şeffaf, hızlı ve titiz bir eşleştirme süreci yürütüyoruz.
          </p>
        </div>

        <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <li
                key={step.title}
                className="relative rounded-2xl border border-slate-100 bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-xl"
              >
                <span className="text-sm font-bold tabular-nums text-primary">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="mt-4 flex h-12 w-12 items-center justify-center rounded-full bg-sky-50 text-primary ring-1 ring-sky-100/80">
                  <Icon size={22} strokeWidth={1.75} aria-hidden />
                </div>
                <h3 className="mt-4 text-[20px] font-bold leading-snug text-slate-800">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.description}</p>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
