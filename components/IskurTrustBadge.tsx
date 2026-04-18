import Image from 'next/image'

/** TOC ile makale gövdesi arasına yerleşen İŞKUR onay / güven bandı (hizmet & il detay). */
export default function IskurTrustBadge() {
  return (
    <div
      className="mx-auto mt-5 mb-0 max-w-3xl"
      role="note"
      aria-label="İŞKUR onaylı özel istihdam bürosu ve yasal güvence"
    >
      <div className="flex flex-row flex-nowrap items-center gap-4 rounded-xl border border-sky-100 bg-sky-50 p-3 shadow-sm md:p-4">
        <div className="flex shrink-0">
          <Image
            src="/images/ozel-istihdam-burosu-logo.png"
            alt="İŞKUR Özel İstihdam Bürosu logosu"
            width={48}
            height={48}
            className="h-12 w-12 object-contain"
          />
        </div>
        <p className="min-w-0 text-sm font-normal leading-snug text-slate-700">
          Aray İş,{' '}
          <span className="font-semibold text-slate-800">İŞKUR onaylı Özel İstihdam bürosudur</span>. Tüm
          süreçlerimiz yasal güvence ve denetim altındadır.
        </p>
      </div>
    </div>
  )
}
