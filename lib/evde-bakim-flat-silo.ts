/** Silo dosyasından bağımsız (döngüsel import önlenir) */
const SITE_BRAND = 'Aray-İş'
const HIZMETLERIMIZ_BASE = '/hizmetlerimiz'

/** Flat URL: /hizmetlerimiz/{cityKey}-{serviceKey} */
export const EVDE_BAKIM_SERVICE_KEYS = ['yasli-bakicisi', 'hasta-bakicisi', 'cocuk-bakicisi', 'ev-yardimcisi'] as const
export type EvdeBakimServiceKey = (typeof EVDE_BAKIM_SERVICE_KEYS)[number]

/** Admin panel: makale editöründe tüm evde bakım hizmetleri */
export const EVDE_BAKIM_ARTICLE_EDITOR_SERVICES = [
  'yasli-bakicisi',
  'hasta-bakicisi',
  'cocuk-bakicisi',
  'ev-yardimcisi',
] as const
export type EvdeBakimArticleEditorServiceKey = (typeof EVDE_BAKIM_ARTICLE_EDITOR_SERVICES)[number]

export function isEvdeBakimArticleEditorService(s: string): s is EvdeBakimArticleEditorServiceKey {
  return (EVDE_BAKIM_ARTICLE_EDITOR_SERVICES as readonly string[]).includes(s)
}

/** `?hizmet=` sorgu parametresinden geçerli hizmet anahtarı */
export function parseHizmetQueryParam(value: string | null | undefined): EvdeBakimServiceKey | null {
  if (!value) return null
  return (EVDE_BAKIM_SERVICE_KEYS as readonly string[]).includes(value) ? (value as EvdeBakimServiceKey) : null
}

export type EvdeBakimCity = {
  key: string
  ad: string
  locative: string
  /** "Ankara'daki" — aynı şehir modül başlığı */
  locativeKi: string
}

/** Supabase boş / hata verirse kullanılan yedek liste */
export const EVDE_BAKIM_CITIES_FALLBACK: EvdeBakimCity[] = [
  { key: 'ankara', ad: 'Ankara', locative: "Ankara'da", locativeKi: "Ankara'daki" },
  { key: 'kayseri', ad: 'Kayseri', locative: "Kayseri'de", locativeKi: "Kayseri'deki" },
  { key: 'cankiri', ad: 'Çankırı', locative: "Çankırı'da", locativeKi: "Çankırı'daki" },
  { key: 'yozgat', ad: 'Yozgat', locative: "Yozgat'ta", locativeKi: "Yozgat'taki" },
  { key: 'kirsehir', ad: 'Kırşehir', locative: "Kırşehir'de", locativeKi: "Kırşehir'deki" },
  { key: 'eskisehir', ad: 'Eskişehir', locative: "Eskişehir'de", locativeKi: "Eskişehir'deki" },
  { key: 'konya', ad: 'Konya', locative: "Konya'da", locativeKi: "Konya'daki" },
  { key: 'bolu', ad: 'Bolu', locative: "Bolu'da", locativeKi: "Bolu'daki" },
  { key: 'kirikkale', ad: 'Kırıkkale', locative: "Kırıkkale'de", locativeKi: "Kırıkkale'deki" },
  { key: 'nevsehir', ad: 'Nevşehir', locative: "Nevşehir'de", locativeKi: "Nevşehir'deki" },
  { key: 'sivas', ad: 'Sivas', locative: "Sivas'ta", locativeKi: "Sivas'taki" },
  { key: 'samsun', ad: 'Samsun', locative: "Samsun'da", locativeKi: "Samsun'daki" },
  { key: 'afyon', ad: 'Afyon', locative: "Afyon'da", locativeKi: "Afyon'daki" },
  { key: 'antalya', ad: 'Antalya', locative: "Antalya'da", locativeKi: "Antalya'daki" },
  { key: 'mugla', ad: 'Muğla', locative: "Muğla'da", locativeKi: "Muğla'daki" },
  { key: 'aydin', ad: 'Aydın', locative: "Aydın'da", locativeKi: "Aydın'daki" },
  { key: 'corum', ad: 'Çorum', locative: "Çorum'da", locativeKi: "Çorum'daki" },
]

/** @deprecated Yeni kodda `fetchEvdeBakimCities` veya `EVDE_BAKIM_CITIES_FALLBACK` kullanın */
export const EVDE_BAKIM_CITIES = EVDE_BAKIM_CITIES_FALLBACK

export function evdeBakimFlatHref(cityKey: string, service: EvdeBakimServiceKey): string {
  return `${HIZMETLERIMIZ_BASE}/${cityKey}-${service}`
}

export type ParsedEvdeFlatSlug = {
  cityKey: string
  city: EvdeBakimCity
  service: EvdeBakimServiceKey
  slug: string
}

function cityKeySetFrom(cities: EvdeBakimCity[]): Set<string> {
  return new Set(cities.map((c) => c.key))
}

export function parseEvdeBakimFlatSlug(slug: string, cities: EvdeBakimCity[]): ParsedEvdeFlatSlug | null {
  const keySet = cityKeySetFrom(cities)
  for (const service of EVDE_BAKIM_SERVICE_KEYS) {
    const suf = `-${service}`
    if (!slug.endsWith(suf)) continue
    const cityKey = slug.slice(0, -suf.length)
    if (!cityKey || cityKey.includes('-') || !keySet.has(cityKey)) continue
    const city = cities.find((c) => c.key === cityKey)
    if (!city) continue
    return { cityKey, city, service, slug }
  }
  return null
}

export function getAllEvdeBakimFlatSlugs(cities: EvdeBakimCity[]): string[] {
  const out: string[] = []
  for (const c of cities) {
    for (const s of EVDE_BAKIM_SERVICE_KEYS) {
      out.push(`${c.key}-${s}`)
    }
  }
  return out
}

/** Breadcrumb son segment (H1’den kısa) */
export function breadcrumbCurrentLabel(city: EvdeBakimCity, service: EvdeBakimServiceKey): string {
  const m = SERVICE_COPY[service]
  return `${city.ad} ${m.breadcrumbServiceName}`
}

/** H1: lokasyon + temin/aracılık/danışmanlık */
export function pageH1(city: EvdeBakimCity, service: EvdeBakimServiceKey): string {
  const m = SERVICE_COPY[service]
  return `${city.ad} ${m.h1ServicePhrase}`
}

/** Meta title ≤60 karakter */
export function metaTitle(city: EvdeBakimCity, service: EvdeBakimServiceKey): string {
  const m = SERVICE_COPY[service]
  const suffix = ` | ${SITE_BRAND}`
  const budget = 60 - suffix.length
  const candidates = [`${city.ad} ${m.metaShort} Aracılığı`, `${city.ad} ${m.metaShort}`]
  for (const c of candidates) {
    if (c.length <= budget) return c + suffix
  }
  const trimmed = `${city.ad} ${m.metaShort}`.slice(0, Math.max(8, budget - 1)).trimEnd() + '…'
  return trimmed + suffix
}

export function metaDescription(city: EvdeBakimCity, service: EvdeBakimServiceKey): string {
  const m = SERVICE_COPY[service]
  return `${city.locative} güvenilir ve referanslı ${m.topicPhrase} arayışınızda yanınızdayız. ${m.aracilikPhrase} ${SITE_BRAND} İnsan Kaynakları.`
}

export function heroSubtitle(service: EvdeBakimServiceKey): string {
  return SERVICE_COPY[service].heroSubtitle
}

export function bodyParagraphs(city: EvdeBakimCity, service: EvdeBakimServiceKey): string {
  return SERVICE_COPY[service].body(city)
}

export const SERVICE_COPY: Record<
  EvdeBakimServiceKey,
  {
    breadcrumbServiceName: string
    h1ServicePhrase: string
    metaShort: string
    topicPhrase: string
    aracilikPhrase: string
    heroSubtitle: string
    sameCityCardTitle: (city: EvdeBakimCity) => string
    sameCityCardDescription: string
    body: (city: EvdeBakimCity) => string
  }
> = {
  'yasli-bakicisi': {
    breadcrumbServiceName: 'Yaşlı Bakıcısı',
    h1ServicePhrase: 'Yaşlı Bakıcısı Aracılığı ve Danışmanlığı',
    metaShort: 'Yaşlı Bakıcısı',
    topicPhrase: 'yaşlı bakıcısı',
    aracilikPhrase: 'Yaşlı bakıcısı personeli bulmanıza profesyonel aracılık ediyoruz.',
    heroSubtitle: 'Referans kontrollü aday eşleştirmesi ve şeffaf istihdam aracılığı süreçleri.',
    sameCityCardTitle: (c) => `${c.ad} Yaşlı Bakıcısı`,
    sameCityCardDescription: 'Yaşlı bakımında güvenilir aday eşleştirmesi ve referans süreçleri.',
    body: (city) => `
<p>${city.ad} genelinde, en kıymetli varlıklarınız olan büyüklerinizin bakımı için profesyonel, şefkatli ve sabırlı adayları sizlerle buluşturuyoruz. Yaşlı bakımı, sadece fiziksel bir destek değil; aynı zamanda sevgi, saygı ve empati gerektiren çok hassas bir süreçtir.</p>
<h2>${city.ad} Yaşlı Bakıcısı Hizmetinde Neden Bizi Tercih Etmelisiniz?</h2>
<p>Aray-İş İnsan Kaynakları olarak, ${city.ad} bölgesindeki ailelerin hassasiyetini anlıyor ve adli sicil kayıtları ile referansları titizlikle doğrulanmış profesyonellerle eşleştirme sağlıyoruz. Alzheimer, demans, yatalak hasta bakımı veya sadece günlük yaşama destek olacak refakatçi arayışınızda; İŞKUR güvencesiyle yasal, şeffaf ve güven odaklı bir danışmanlık hizmeti sunuyoruz.</p>
<h2>${city.ad} Yaşlı Bakıcısı İletişim ve Başvuru</h2>
<p>Büyüklerinizin kendi ev konforunda, alıştıkları düzende huzurla yaşamalarına aracılık etmek için buradayız. ${city.ad} yaşlı bakıcısı iletişim hattımız üzerinden uzman danışmanlarımıza ulaşabilir, ailenizin ihtiyaçlarına en uygun personel profili için hemen ücretsiz talep oluşturabilirsiniz.</p>
`.trim(),
  },
  'hasta-bakicisi': {
    breadcrumbServiceName: 'Hasta Bakıcısı',
    h1ServicePhrase: 'Hasta Bakıcısı Aracılığı ve Danışmanlığı',
    metaShort: 'Hasta Bakıcısı',
    topicPhrase: 'hasta bakıcısı',
    aracilikPhrase: 'Hasta bakıcısı personeli bulmanıza profesyonel aracılık ediyoruz.',
    heroSubtitle: 'Deneyimli adaylarla güvenli eşleştirme ve kontrollü yönlendirme.',
    sameCityCardTitle: (c) => `${c.ad} Hasta Bakıcısı`,
    sameCityCardDescription: 'Hasta bakımında deneyimli ve kontrollü yönlendirme.',
    body: (city) => `
<p>${city.locative} güvenilir ve referanslı hasta bakıcısı seçiminde, adayların geçmişi ve referansları üzerinde detaylı kontroller uyguluyoruz.</p>
<h2>${city.ad} Hasta Bakıcısı Hizmetinde Neden Bizi Tercih Etmelisiniz?</h2>
<p>Hasta bakımı sürecinde hem hasta hem de aile yakınlarının psikolojik konforunu önemsiyoruz. Deneyimli, sabırlı ve referanslı adayları İŞKUR mevzuatına uygun, şeffaf bir danışmanlık modeli ile eşleştirerek güvenli bir süreç yönetiyoruz.</p>
<h2>${city.ad} Hasta Bakıcısı İletişim ve Başvuru</h2>
<p>İhtiyaç duyduğunuz destek için uzman ekibimizle hemen iletişime geçebilir, ${city.ad} hasta bakıcısı taleplerinizde ailenize en uygun adaylarla görüşme sürecini kısa sürede başlatabilirsiniz.</p>
`.trim(),
  },
  'cocuk-bakicisi': {
    breadcrumbServiceName: 'Çocuk Bakıcısı',
    h1ServicePhrase: 'Çocuk Bakıcısı Aracılığı ve Danışmanlığı',
    metaShort: 'Çocuk Bakıcısı',
    topicPhrase: 'çocuk bakıcısı',
    aracilikPhrase: 'Çocuk bakıcısı personeli bulmanıza profesyonel aracılık ediyoruz.',
    heroSubtitle: 'Güvenli, deneyimli ve uyumlu bakıcı adaylarıyla profesyonel eşleştirme.',
    sameCityCardTitle: (c) => `${c.ad} Çocuk Bakıcısı`,
    sameCityCardDescription: 'Çocuğunuz için titiz aday seçimi ve güven odaklı aracılık.',
    body: (city) => `
<p>Çocuğunuzu emanet edeceğiniz kişiyi seçmenin bir ebeveyn için dünyadaki en zor kararlardan biri olduğunu biliyoruz. ${city.ad} sınırları içerisinde, çocuğunuzun fiziksel ve zihinsel gelişimini destekleyecek, pedagojik yaklaşıma sahip ve ilk yardım bilincine sahip bakıcı adaylarını titizlikle seçiyoruz.</p>
<h2>${city.ad} Çocuk Bakıcısı Seçiminde Güvenli Eşleştirme</h2>
<p>Adayların sadece mesleki tecrübelerini değil, çocuklarla iletişimini, sabrını ve şefkatini de göz önünde bulunduruyoruz. ${city.ad} bölgesindeki ailelerimiz için oyun ablası, yenidoğan hemşiresi veya tam zamanlı çocuk bakıcısı ihtiyaçlarında tüm geçmiş taramaları yapılmış personellerle İŞKUR yasal güvencesi altında huzurlu bir süreç yürütüyoruz.</p>
<h2>${city.ad} Çocuk Bakıcısı İletişim ve Randevu</h2>
<p>Geleceğimizin teminatı olan çocuklarınız için en doğru ve güvenilir bakıcıyı bulma sürecini ertelemeyin. ${city.ad} çocuk bakıcısı iletişim sayfamızdan veya doğrudan telefon numaralarımızdan bize ulaşarak, ailenize en uygun bakıcı adaylarıyla tanışma sürecini başlatabilirsiniz.</p>
`.trim(),
  },
  'ev-yardimcisi': {
    breadcrumbServiceName: 'Ev Yardımcısı',
    h1ServicePhrase: 'Ev Yardımcısı Aracılığı ve Danışmanlığı',
    metaShort: 'Ev Yardımcısı',
    topicPhrase: 'ev yardımcısı',
    aracilikPhrase: 'Ev yardımcısı personeli bulmanıza profesyonel aracılık ediyoruz.',
    heroSubtitle: 'Düzenli ve güvenilir yardımcı adaylarıyla hızlı, kontrollü aracılık.',
    sameCityCardTitle: (c) => `${c.ad} Ev Yardımcısı`,
    sameCityCardDescription: 'Ev işlerinde referanslı ve uyumlu personel buluşturma.',
    body: (city) => `
<p>Yoğun iş temponuz ve günlük koşuşturmacanız içinde evinizin düzenini, hijyenini ve sıcaklığını korumak artık bir stres kaynağı olmasın. ${city.ad} bölgesinde güvenerek evinize alabileceğiniz, tecrübeli ve referanslı ev yardımcıları ile yaşam kalitenizi artırıyoruz.</p>
<h2>${city.ad} Ev Yardımcısı Sürecinde Yasal Çözümler</h2>
<p>Bir yabancıyı evinize kabul etmenin yarattığı güvenlik endişesinin farkındayız. Bu nedenle eşleştirmesini sağladığımız tüm adayların adli sicil kontrollerini, sağlık durumlarını ve önceki işveren referanslarını eksiksiz olarak doğruluyoruz. Gündüzlü veya yatılı çalışma modelleriyle, ailenizin yaşam rutinine en uygun personelleri İŞKUR yasal mevzuatlarına uygun sözleşmelerle evinize yönlendiriyoruz.</p>
<h2>${city.ad} Ev Yardımcısı İletişim ve Destek Hattı</h2>
<p>Evinize değer katacak ve günlük yükünüzü hafifletecek profesyonel bir destek almak için daha fazla beklemeyin. İhtiyaçlarınızı belirlemek ve güvenilir aday profillerimizi incelemek için ${city.ad} ev yardımcısı iletişim numaralarımızdan uzman ekibimize hemen ulaşın.</p>
`.trim(),
  },
}

export function employmentAgencyJsonLd(params: {
  slug: string
  cityAd: string
  pageUrl: string
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'EmploymentAgency',
    name: `${SITE_BRAND} İnsan Kaynakları`,
    description: `${params.cityAd} bölgesinde personel seçme, yerleştirme ve istihdam aracılığı.`,
    url: params.pageUrl,
    areaServed: {
      '@type': 'AdministrativeArea',
      name: params.cityAd,
    },
  }
}
