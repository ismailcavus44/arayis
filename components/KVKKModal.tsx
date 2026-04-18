import { X } from 'lucide-react'

interface KVKKModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function KVKKModal({ isOpen, onClose }: KVKKModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-[2px]">
      <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-gray-200/80 bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 border-b border-gray-100 px-5 py-4 sm:px-6">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-500">KVKK</p>
            <h2 className="mt-1 text-lg font-semibold text-gray-900 sm:text-xl">
              Kişisel Verilerin Korunması Kanunu Aydınlatma Metni
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
            aria-label="KVKK modalını kapat"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="px-5 py-5 sm:px-6">
          <div className="prose prose-gray max-w-none">
            <h3 className="text-[20px] font-semibold leading-snug text-gray-900 mb-3">
              1. Veri Sorumlusu
            </h3>
            <p className="text-sm leading-relaxed text-gray-600 mb-5">
              Aray-İş İnsan Kaynakları Danışmanlık Ltd. Şti. olarak, kişisel verilerinizin işlenmesi konusunda veri sorumlusu sıfatıyla hareket etmekteyiz.
            </p>

            <h3 className="text-[20px] font-semibold leading-snug text-gray-900 mb-3">
              2. Kişisel Verilerin İşlenme Amaçları
            </h3>
            <p className="text-sm leading-relaxed text-gray-600 mb-3">
              Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:
            </p>
            <ul className="list-disc pl-5 text-sm leading-relaxed text-gray-600 mb-5 space-y-1.5">
              <li>İnsan kaynakları hizmetlerinin sunulması</li>
              <li>İşe alım süreçlerinin yürütülmesi</li>
              <li>Kariyer danışmanlığı hizmetlerinin sağlanması</li>
              <li>Müşteri ilişkilerinin yönetimi</li>
              <li>Yasal yükümlülüklerin yerine getirilmesi</li>
              <li>İletişim faaliyetlerinin gerçekleştirilmesi</li>
            </ul>

            <h3 className="text-[20px] font-semibold leading-snug text-gray-900 mb-3">
              3. İşlenen Kişisel Veri Kategorileri
            </h3>
            <p className="text-sm leading-relaxed text-gray-600 mb-3">
              İşlenen kişisel veri kategorileri şunlardır:
            </p>
            <ul className="list-disc pl-5 text-sm leading-relaxed text-gray-600 mb-5 space-y-1.5">
              <li>Kimlik bilgileri (ad, soyad, TC kimlik numarası vb.)</li>
              <li>İletişim bilgileri (telefon, e-posta, adres vb.)</li>
              <li>Eğitim ve iş deneyimi bilgileri</li>
              <li>CV ve özgeçmiş bilgileri</li>
              <li>Mülakat ve değerlendirme bilgileri</li>
            </ul>

            <h3 className="text-[20px] font-semibold leading-snug text-gray-900 mb-3">
              4. Kişisel Verilerin Aktarılması
            </h3>
            <p className="text-sm leading-relaxed text-gray-600 mb-5">
              Kişisel verileriniz, yukarıda belirtilen amaçların gerçekleştirilmesi kapsamında, iş ortaklarımıza, müşterilerimize ve yasal yükümlülüklerimiz gereği yetkili kamu kurum ve kuruluşlarına aktarılabilir.
            </p>

            <h3 className="text-[20px] font-semibold leading-snug text-gray-900 mb-3">
              5. Kişisel Veri Toplamanın Yöntemi ve Hukuki Sebebi
            </h3>
            <p className="text-sm leading-relaxed text-gray-600 mb-5">
              Kişisel verileriniz, elektronik ortamda, yazılı olarak veya sözlü olarak toplanmaktadır. Bu veriler, hizmet sözleşmesinin kurulması ve yürütülmesi, yasal yükümlülüklerin yerine getirilmesi ve meşru menfaatin korunması hukuki sebeplerine dayanılarak işlenmektedir.
            </p>

            <h3 className="text-[20px] font-semibold leading-snug text-gray-900 mb-3">
              6. KVKK Kapsamındaki Haklarınız
            </h3>
            <p className="text-sm leading-relaxed text-gray-600 mb-3">
              KVKK'nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:
            </p>
            <ul className="list-disc pl-5 text-sm leading-relaxed text-gray-600 mb-5 space-y-1.5">
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
              <li>Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme</li>
              <li>Kişisel verilerinizin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</li>
              <li>Yurt içinde veya yurt dışında kişisel verilerinizin aktarıldığı üçüncü kişileri bilme</li>
              <li>Kişisel verilerinizin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme</li>
              <li>KVKK'nın 7. maddesinde öngörülen şartlar çerçevesinde kişisel verilerinizin silinmesini veya yok edilmesini isteme</li>
              <li>Kişisel verilerinizin aktarıldığı üçüncü kişilere yukarıda sayılan (e) ve (f) bentleri uyarınca yapılan işlemlerin bildirilmesini isteme</li>
              <li>İşlenen verilerinizin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle kişiliğiniz aleyhine bir sonucun ortaya çıkmasına itiraz etme</li>
              <li>Kişisel verilerinizin kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme</li>
            </ul>

            <h3 className="text-[20px] font-semibold leading-snug text-gray-900 mb-3">
              7. İletişim
            </h3>
            <p className="text-sm leading-relaxed text-gray-600 mb-4">
              Yukarıda belirtilen haklarınızı kullanmak için aşağıdaki iletişim kanallarından bize ulaşabilirsiniz:
            </p>
            <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-4">
              <p className="text-sm leading-relaxed text-gray-600">
                <strong>Adres:</strong> Levent Mahallesi, Büyükdere Caddesi No: 123, Kat: 5, Beşiktaş / İstanbul<br />
                <strong>Telefon:</strong> +90 212 555 0123<br />
                <strong>E-posta:</strong> kvkk@arayis.com
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 border-t border-gray-100 px-5 py-4 sm:px-6">
          <button
            onClick={onClose}
            className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            Forma geri dön
          </button>
          <button
            onClick={onClose}
            className="rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
          >
            Anladım
          </button>
        </div>
      </div>
    </div>
  )
}







