import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react'

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
                <a href="/hizmetlerimiz/evde-bakim-personeli" className="text-gray-300 hover:text-primary transition-colors text-sm">
                  Evde Bakım Personeli
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

        {/* Alt Çizgi */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © 2024 HR Office. Tüm hakları saklıdır.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="/privacy" className="text-gray-300 hover:text-primary transition-colors text-sm">
                Gizlilik Politikası
              </a>
              <a href="/terms" className="text-gray-300 hover:text-primary transition-colors text-sm">
                Kullanım Şartları
              </a>
              <a href="/cookies" className="text-gray-300 hover:text-primary transition-colors text-sm">
                Çerez Politikası
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
