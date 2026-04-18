'use client'

import { useCallback, useState } from 'react'
import { ChevronDown } from 'lucide-react'

export type FaqItem = {
  question: string
  answer: string
}

interface FaqSectionProps {
  title?: string
  items: FaqItem[]
  /** TOC ile aynı id’ler (buildFaqTocAppend çıktısı) */
  sectionId: string
  questionIds: string[]
}

export default function FaqSection({ title = 'Sık Sorulan Sorular', items, sectionId, questionIds }: FaqSectionProps) {
  const [open, setOpen] = useState<Record<number, boolean>>({})

  const toggle = useCallback((index: number) => {
    setOpen((prev) => ({ ...prev, [index]: !prev[index] }))
  }, [])

  if (!items.length || !sectionId || questionIds.length !== items.length) return null

  return (
    <section
      className="faq-after-prose bg-white scroll-mt-28 pb-8 md:pb-10 mt-6 md:mt-8 [&>p:empty]:hidden [&>p>br]:hidden [&>span:empty]:hidden"
      aria-labelledby={sectionId}
    >
      <div className="mx-auto max-w-3xl [&>p:empty]:hidden [&>p>br]:hidden [&>span:empty]:hidden [&>h2+p:empty]:hidden [&_p:empty]:hidden [&_span:empty]:hidden">
        <h2 id={sectionId} className="!mt-0 !mb-0 text-xl font-semibold text-gray-900 sm:text-2xl">
          {title}
        </h2>
        <div className="mt-5 space-y-3">
          {items.map((item, index) => {
            const qid = questionIds[index]
            const panelId = `${qid}-cevap`
            const expanded = !!open[index]
            return (
              <div key={qid} className="rounded-xl border border-gray-200 bg-white px-4 py-3">
                <h3 id={qid} className="text-[16px] font-semibold leading-snug text-gray-900">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-3 text-left text-[16px] font-semibold text-gray-900"
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    onClick={() => toggle(index)}
                  >
                    <span className="min-w-0 flex-1">{item.question}</span>
                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-gray-500 transition-transform ${expanded ? 'rotate-180' : ''}`}
                      aria-hidden
                    />
                  </button>
                </h3>
                <div id={panelId} role="region" aria-labelledby={qid} hidden={!expanded} className="mt-3">
                  <p className="text-sm leading-relaxed text-gray-600">{item.answer}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
