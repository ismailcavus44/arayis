import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHeroMedia from '@/components/PageHeroMedia'
import { Shield, Heart, Scale, Headphones, Target, Compass, CheckCircle, ArrowRight } from 'lucide-react'

export default function AboutPage() {
  const values = [
    {
      icon: Shield,
      title: 'Güvenilirlik',
      text: 'Kayıt dışı hiçbir sürece izin vermez, personellerin adli ve mesleki geçmişini titizlikle doğrularız.',
    },
    {
      icon: Heart,
      title: 'Şefkat ve Empati',
      text: 'Sadece işi bilen değil, yaşlılara, hastalara ve çocuklara şefkatle yaklaşacak doğru karakterleri seçeriz.',
    },
    {
      icon: Scale,
      title: 'Yasal Şeffaflık',
      text: 'İŞKUR mevzuatına tam uyumlu çalışır, hem ailenin hem de personelin haklarını sözleşmelerle koruruz.',
    },
    {
      icon: Headphones,
      title: 'Sürekli Destek',
      text: 'İşe yerleştirme sonrasında da aileyi yalnız bırakmaz, uyum sürecini düzenli olarak takip ederiz.',
    },
  ]

  const storyHighlights = [
    'İŞKUR onaylı özel istihdam bürosu güvencesi',
    'Titiz referans ve geçmiş taraması kontrolü',
    'Beklentilerinize özel, empati odaklı personel eşleştirmesi',
  ]

  return (
    <main className="min-h-screen bg-white text-neutral-900 antialiased">
      <Header />

      <PageHeroMedia title="Hakkımızda" currentPage="Hakkımızda" />

      {/* Misyon & vizyon */}
      <section className="border-t border-neutral-200/80 bg-white py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              DEĞERLERİMİZ VE YÖNELİMİMİZ
            </span>
            <h2 className="mt-2 text-[30px] font-semibold leading-snug tracking-tight text-neutral-900">
              Neden varız ve neyi hedefliyoruz?
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 lg:mt-14 lg:grid-cols-2 lg:items-stretch lg:gap-10">
            <article className="flex h-full flex-col rounded-2xl border border-slate-100/80 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl">
              <div className="mb-6 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-sky-500">
                <Target size={26} strokeWidth={1.75} aria-hidden />
              </div>
              <span className="mb-2 block text-xs font-extrabold tracking-widest text-slate-400">MİSYONUMUZ</span>
              <h3 className="mb-4 text-[20px] font-bold leading-snug text-slate-800">
                Ailelerin En Güvenilir Destekçisi Olmak
              </h3>
              <p className="flex-1 text-base leading-relaxed text-slate-600">
                Evinize yardımcı, hastanıza refakatçi veya çocuğunuza şefkatli bir bakıcı arayışınızda; referanslı, adli
                sicil kaydı kontrol edilmiş doğru personellerle sizi buluşturarak yaşam kalitenizi artırmak.
              </p>
            </article>

            <article className="flex h-full flex-col rounded-2xl border border-slate-100/80 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl">
              <div className="mb-6 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-sky-500">
                <Compass size={26} strokeWidth={1.75} aria-hidden />
              </div>
              <span className="mb-2 block text-xs font-extrabold tracking-widest text-slate-400">VİZYONUMUZ</span>
              <h3 className="mb-4 text-[20px] font-bold leading-snug text-slate-800">Bakım Danışmanlığında Öncü Marka</h3>
              <p className="flex-1 text-base leading-relaxed text-slate-600">
                T.C. İŞKUR yasal güvencesiyle, Türkiye genelinde ailelerin gözü kapalı güvendiği, şeffaf, yenilikçi ve en
                saygın İnsan Kaynakları danışmanlık kurumu olmak.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Hikâye — anasayfa zebra: açık mavi bant */}
      <section className="border-t border-slate-200/60 bg-sky-50/50 py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
            <div>
              <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-primary">HİKAYEMİZ</span>
              <h2 className="mt-2 text-[30px] font-semibold leading-snug tracking-tight text-neutral-900">
                Ailenizin huzuru için yasal ve profesyonel çözümler
              </h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-600">
                Aray-İş İnsan Kaynakları olarak, en değerli varlıklarınızı emanet edeceğiniz personelleri seçmenin ne kadar
                zor olduğunu biliyoruz. Bu yüzden süreci sizin yerinize yasal, şeffaf ve titiz bir şekilde yönetiyoruz.
              </p>

              <ul className="mt-8 space-y-3">
                {storyHighlights.map((line) => (
                  <li key={line} className="flex gap-3 text-base text-neutral-700">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" strokeWidth={1.75} aria-hidden />
                    <span className="leading-relaxed">{line}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-8 text-base leading-relaxed text-neutral-600">
                Sektörel birikimimizi ailelerin hassasiyetleriyle birleştiriyor; sadece bir personel bulmuyor, evinize uzun
                vadeli bir huzur ve güven getiriyoruz.
              </p>
            </div>

            <div className="relative lg:sticky lg:top-24">
              <div className="overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-[0_24px_60px_-24px_rgba(19,34,99,0.25)] ring-1 ring-black/[0.03]">
                <div className="relative aspect-[4/3] w-full lg:aspect-[5/4]">
                  <img
                    src="/images/aray-is-hakkimizda.webp"
                    alt="Aray-İş hakkımızda"
                    className="absolute inset-0 h-full w-full object-cover object-center"
                    loading="lazy"
                  />
                  {/* Ana sayfa ile aynı yön; daha açık (düşük opaklık) filigran */}
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-r from-secondary/45 via-secondary/28 to-secondary/5 sm:via-secondary/22 sm:to-transparent"
                    aria-hidden
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10 lg:hidden"
                    aria-hidden
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Değerler */}
      <section className="border-t border-neutral-200/80 bg-white py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-[30px] font-semibold leading-snug tracking-tight text-neutral-900">
              Çalışma prensiplerimizi şekillendiren temel ilkeler
            </h2>
            <div className="mt-4 h-1 w-14 rounded-full bg-primary sm:w-16" aria-hidden />
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-12 lg:grid-cols-4 lg:gap-6">
            {values.map((item) => {
              const Icon = item.icon
              return (
                <article
                  key={item.title}
                  className="flex flex-col rounded-2xl border border-neutral-200/80 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md sm:p-6"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon size={22} strokeWidth={1.75} aria-hidden />
                  </span>
                  <h3 className="mt-4 text-[20px] font-semibold leading-snug text-neutral-900">{item.title}</h3>
                  <p className="mt-2 flex-1 text-base leading-relaxed text-neutral-600">{item.text}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA — dış bant zebra (sky); mavi yalnızca ortadaki kartta */}
      <section className="border-t border-slate-200/60 bg-sky-50/50 py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-2xl bg-gradient-to-br from-secondary via-secondary to-neutral-900 px-6 py-10 text-white shadow-[0_24px_60px_-24px_rgba(19,34,99,0.28)] sm:px-10 sm:py-12 md:px-12">
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl"
              aria-hidden
            />
            <div className="relative max-w-2xl">
              <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-primary">İletişim</span>
              <h2 className="mt-2 text-[30px] font-semibold leading-snug tracking-tight text-white">
                Sevdikleriniz için en doğru personeli birlikte bulalım
              </h2>
              <p className="mt-3 text-base leading-relaxed text-white/85">
                İhtiyaçlarınızı ertelemeyin. Uzman danışmanlarımızla görüşmek ve güvenilir eşleştirme sürecini başlatmak
                için bize ulaşın.
              </p>
              <Link
                href="/iletisim"
                className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90 sm:mt-8"
              >
                Hizmet Talebi Oluştur
                <ArrowRight size={18} className="ml-2" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
