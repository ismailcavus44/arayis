import { Phone } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'

const PHONE_NUMBER = '+90 505 277 2628'
const PHONE_HREF = 'tel:+905052772628'
const WHATSAPP_HREF = 'https://wa.me/905052772628'

export default function MobileStickyCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 md:hidden">
      <div className="bg-transparent px-4 py-3">
        <div className="grid grid-cols-2 gap-3">
          <a
            href={PHONE_HREF}
            aria-label={`${PHONE_NUMBER} numarasını ara`}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
          >
            <Phone size={16} aria-hidden />
            <span>Ara</span>
          </a>

          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp üzerinden iletişime geç"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white transition-colors hover:brightness-95"
          >
            <FaWhatsapp size={16} aria-hidden />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  )
}
