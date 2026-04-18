import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHeroMedia from '@/components/PageHeroMedia'
import {
  FileText,
  Users,
  Target,
  CheckCircle,
  Briefcase,
  Shield,
  Zap,
  Home,
  Heart,
  HardHat,
  Factory,
  BarChart2,
  ChevronRight,
  ArrowRight,
} from 'lucide-react'

export default function ServicesPage() {
  const services = [
    {
      id: 1,
      href: '/hizmetlerimiz/evde-bakim-personeli',
      icon: (
        <div className="relative flex h-9 w-9 items-center justify-center">
          <Home size={28} className="text-primary" />
          <Heart size={14} className="absolute -right-0.5 -top-0.5 fill-primary/15 text-primary" strokeWidth={2} />
        </div>
      ),
      title: 'Evde Bakım Personeli Aracılığı',
      description:
        'Sevdikleriniz ve eviniz için ihtiyaç duyduğunuz güvenilir personeli bulmanıza profesyonel düzeyde aracılık ediyoruz. Bakım hizmetini biz vermiyor, en doğru adayla sizi buluşturuyoruz.',
      features: [
        'Güvenilir yaşlı bakım personeli aracılığı',
        'Tecrübeli çocuk bakıcısı eşleştirmesi',
        'Şefkatli ve eğitimli hasta bakıcı yönlendirmesi',
        'Referanslı ev yardımcısı bulma',
        'Aday geçmişi ve detaylı referans kontrolü',
      ],
    },
    {
      id: 2,
      href: '/hizmetlerimiz/beyaz-yaka-personel-araciligi',
      icon: (
        <div className="relative flex h-9 w-9 items-center justify-center">
          <Briefcase size={26} className="text-primary" />
          <FileText size={13} className="absolute -bottom-0.5 -right-1 text-primary" strokeWidth={2} />
        </div>
      ),
      title: 'Beyaz Yaka Personel Aracılığı',
      description:
        'Şirketinizin vizyonuna ve kurum kültürüne değer katacak uzman ve yönetici kadrolarını tespit ediyor ve sizinle buluşturuyoruz.',
      features: [
        'Pozisyona özel yetenek taraması',
        'Yönetici ve uzman seçme, yerleştirme',
        'Detaylı mülakat ve yetkinlik analizi',
        'Kariyer geçmişi ve referans doğrulama',
        'Sektörel aday havuzu yönetimi',
      ],
    },
    {
      id: 3,
      href: '/hizmetlerimiz/mavi-yaka-personel-araciligi',
      icon: (
        <div className="relative flex h-9 w-9 items-center justify-center">
          <HardHat size={26} className="text-primary" />
          <Factory size={12} className="absolute -bottom-0.5 -right-1 text-primary" strokeWidth={2} />
        </div>
      ),
      title: 'Mavi Yaka Personel Aracılığı',
      description:
        'Üretim, lojistik ve hizmet sektörlerindeki operasyonel gücünüzü artıracak nitelikli iş gücünü kurumunuza hızlı ve güvenilir personel aracılığıyla buluşturuyoruz.',
      features: [
        'Toplu işe alım projeleri yönetimi',
        'Hızlı ve dönemsel personel aracılığı',
        'Mesleki yeterlilik ve belge kontrolü',
        'Üretim ve saha personeli eşleştirme',
        'Bölgesel iş gücü piyasası analizi',
      ],
    },
    {
      id: 4,
      href: '/hizmetlerimiz/insan-kaynaklari-danismanligi',
      icon: (
        <div className="relative flex h-9 w-9 items-center justify-center">
          <Target size={26} className="text-primary" />
          <BarChart2 size={13} className="absolute -bottom-0.5 -right-1 text-primary" strokeWidth={2} />
        </div>
      ),
      title: 'İnsan Kaynakları Danışmanlığı',
      description:
        'Şirketinizin insan kaynakları süreçlerini optimize ederek kurumsal verimliliğinizi ve çalışan memnuniyetini artıracak stratejik çözümler sunuyoruz.',
      features: [
        'İK süreç tasarımı ve organizasyonel yapılandırma',
        'Performans değerlendirme sistemleri kurulumu',
        'Ücret ve yan haklar yönetimi planlaması',
        'Çalışan bağlılığı ve kurumsal kültür analizi',
        'İş kanunu ve çalışma mevzuatı danışmanlığı',
      ],
    },
  ]

  const whyItems = [
    {
      icon: Shield,
      title: 'Güvenilir ve yasal hizmet',
      text: 'İŞKUR onaylı özel istihdam bürosu olarak süreçleri yasal çerçevede ve şeffaf yürütüyoruz.',
    },
    {
      icon: Zap,
      title: 'Hızlı ve etkili çözümler',
      text: 'İşveren ve aday eşleştirmelerinde modern yöntemlerle kısa sürede sonuç odaklı ilerliyoruz.',
    },
    {
      icon: Target,
      title: 'Sektöre özel uzmanlık',
      text: 'Farklı sektörlerdeki tecrübemizle her pozisyona uygun adayı hedefliyoruz.',
    },
    {
      icon: Users,
      title: 'Geniş aday ve işveren ağı',
      text: 'Türkiye genelinde güçlü bir istihdam ağı ve güncel veriyle çalışıyoruz.',
    },
  ]

  return (
    <main className="min-h-screen bg-white text-neutral-900 antialiased">
      <Header />

      <PageHeroMedia title="Hizmetlerimiz" currentPage="Hizmetlerimiz" />

      {/* Neden Aray-İş */}
      <section className="border-t border-neutral-200/80 bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Neden Aray-İş?</p>
              <h2 className="mt-3 text-[30px] font-semibold leading-snug tracking-tight text-neutral-900">
                Güvenilir, <span className="text-primary">hızlı</span> ve <span className="text-primary">profesyonel</span>{' '}
                çözümler
              </h2>
              <p className="mt-5 leading-relaxed text-neutral-600">
                Aray-İş İnsan Kaynakları, Suat Hapoğlu öncülüğünde faaliyet gösteren; işveren ve adayları şeffaf
                süreçlerle buluşturan bir özel istihdam bürosudur. Tek tip hizmet değil, ihtiyaca göre şekillenen İK
                desteği sunarız.
              </p>

              <ul className="mt-10 space-y-6">
                {whyItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <li key={item.title} className="flex gap-4">
                      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon size={18} strokeWidth={1.75} aria-hidden />
                      </span>
                      <div className="min-w-0">
                        <p className="text-[15px] font-medium leading-snug text-neutral-900">{item.title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-neutral-600">{item.text}</p>
                      </div>
                    </li>
                  )
                })}
              </ul>

              <div className="mt-10">
                <Link
                  href="/iletisim"
                  className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
                >
                  Bizimle iletişime geçin
                  <ArrowRight size={18} className="ml-2" aria-hidden />
                </Link>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-[0_24px_60px_-24px_rgba(19,34,99,0.2)]">
              <div className="aspect-[4/3] w-full lg:aspect-auto lg:min-h-[420px]">
                <img
                  src="/images/iskur-sertifikali-ozel-istihdam-burosu.webp"
                  alt="İŞKUR sertifikalı özel istihdam bürosu"
                  width={384}
                  height={384}
                  className="h-full w-full object-contain object-center p-6 sm:p-8"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hizmet kartları */}
      <section className="border-t border-slate-200/60 bg-sky-50/50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Alanlarımız</p>
            <h2 className="mt-3 text-[30px] font-semibold leading-snug tracking-tight text-neutral-900">
              Sunduğumuz hizmetler
            </h2>
            <p className="mt-4 leading-relaxed text-neutral-600">
              Detaylı bilgi için kartlara tıklayın; her hizmet için ayrı sayfamız mevcuttur.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
            {services.map((service) => (
              <Link
                key={service.id}
                href={service.href}
                className="group flex flex-col rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-[0_1px_0_rgba(0,0,0,0.04)] transition-all hover:border-primary/25 hover:shadow-md sm:p-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <div className="mb-6 flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/15">
                    {service.icon}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[20px] font-semibold leading-snug tracking-tight text-neutral-900 transition-colors group-hover:text-primary">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-600 sm:text-base">{service.description}</p>
                  </div>
                </div>

                <ul className="flex-1 space-y-2.5">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle size={18} className="mt-0.5 shrink-0 text-primary" aria-hidden />
                      <span className="text-sm leading-relaxed text-neutral-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex items-center justify-end border-t border-neutral-100 pt-6">
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    İncele
                    <ChevronRight size={18} className="transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
