import Image from 'next/image'
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react'

const ISKUR_LEGAL_FOOTER =
  'Türkiye İş Kurumunun 13.12.2024 tarih ve 17249050 sayılı oluru ile 1772 izin numaralı özel istihdam bürosu olarak faaliyet göstermektedir. 4904 sayılı Türkiye İş Kanunu gereğince iş arayanlardan menfaat sağlanması ve ücret alınması yasaktır. Şikayetleriniz için Türkiye İş Kurumu çalışma ve iş kurumu il müdürlüğüne/hizmet merkezine başvurabilirsiniz. ADRES: UÇARLI CD. NO:29 ÇANKAYA/ANKARA TELEFON: 0312 435 15 65'

export default function Footer() {
  return (
    <footer className="bg-secondary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Şirket Bilgileri */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-xl font-bold">Aray-İş</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Profesyonel insan kaynakları çözümleri ile iş arayışınızda yanınızdayız. 
              İşe alım, danışmanlık ve eğitim hizmetlerimizle kariyerinizi destekliyoruz.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Hızlı Linkler */}
          <div className="space-y-4">
            <h3 className="text-[20px] font-semibold leading-snug text-white">Hızlı Linkler</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-300 hover:text-primary transition-colors text-sm">
                  Ana Sayfa
                </a>
              </li>
              <li>
                <a href="/hakkimizda" className="text-gray-300 hover:text-primary transition-colors text-sm">
                  Hakkımızda
                </a>
              </li>
              <li>
                <a href="/hizmetler" className="text-gray-300 hover:text-primary transition-colors text-sm">
                  Hizmetlerimiz
                </a>
              </li>
              <li>
                <a href="/is-ilanlari" className="text-gray-300 hover:text-primary transition-colors text-sm">
                  İş İlanları
                </a>
              </li>
              <li>
                <a href="/blog" className="text-gray-300 hover:text-primary transition-colors text-sm">
                  Blog
                </a>
              </li>
              <li>
                <a href="/iletisim" className="text-gray-300 hover:text-primary transition-colors text-sm">
                  İletişim
                </a>
              </li>
            </ul>
          </div>

          {/* Hizmetler */}
          <div className="space-y-4">
            <h3 className="text-[20px] font-semibold leading-snug text-white">Hizmetlerimiz</h3>
            <ul className="space-y-2">
              <li>
                <a href="/hizmetlerimiz/evde-bakim-personeli" className="text-gray-300 hover:text-primary transition-colors text-sm">
                  Evde Bakım Personeli Aracılığı
                </a>
              </li>
              <li>
                <a href="/hizmetlerimiz/insan-kaynaklari-danismanligi" className="text-gray-300 hover:text-primary transition-colors text-sm">
                  İnsan Kaynakları Danışmanlığı
                </a>
              </li>
              <li>
                <a href="/hizmetlerimiz/mavi-yaka-personel-araciligi" className="text-gray-300 hover:text-primary transition-colors text-sm">
                  Mavi Yaka Personel Aracılığı
                </a>
              </li>
              <li>
                <a href="/hizmetlerimiz/beyaz-yaka-personel-araciligi" className="text-gray-300 hover:text-primary transition-colors text-sm">
                  Beyaz Yaka Personel Aracılığı
                </a>
              </li>
            </ul>
          </div>

          {/* İletişim Bilgileri */}
          <div className="space-y-4">
            <h3 className="text-[20px] font-semibold leading-snug text-white">İletişim</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin size={16} className="text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">
                    Balıkçıoğlu iş merkezi, Korkutreis, Necatibey Cd.<br />
                    D:4, 06530 Çankaya/Ankara
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-primary flex-shrink-0" />
                <span className="text-gray-300 text-sm">+90 505 277 2628</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-primary flex-shrink-0" />
                <span className="text-gray-300 text-sm">info@arayisik.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock size={16} className="text-primary flex-shrink-0" />
                <span className="text-gray-300 text-sm">Pzt-Cmt: 09:00-18:00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Alt bar — İŞKUR yasal uyarı */}
        <div className="mt-8 border-t border-gray-700 pt-8">
          <div className="flex w-full min-w-0 flex-col items-center justify-center gap-4 text-center md:flex-row md:justify-start md:gap-6 md:text-left">
            <div className="shrink-0 rounded-full bg-white p-1">
              <Image
                src="/images/ozel-istihdam-burosu-logo.png"
                alt="İŞKUR özel istihdam bürosu logosu"
                width={64}
                height={64}
                className="h-14 w-14 shrink-0 object-contain md:h-16 md:w-16"
              />
            </div>
            <p className="min-w-0 max-w-full flex-1 break-words text-[10px] leading-snug text-slate-300 md:text-[11px] md:leading-normal">
              {ISKUR_LEGAL_FOOTER}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
