'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'
import { HOME_FAQ_ITEMS } from '@/lib/home-faq'

export default function HomeFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [currentFaqImage, setCurrentFaqImage] = useState('/images/faq1.webp')

  const handleToggle = (index: number) => {
    const nextIndex = openIndex === index ? null : index
    setOpenIndex(nextIndex)
    setCurrentFaqImage(nextIndex === null ? '/images/faq1.webp' : '/images/faq2.webp')
  }

  return (
    <section className="border-t border-neutral-200/80 bg-white" aria-labelledby="home-faq-heading">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div className="order-2 text-left lg:order-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">MERAK EDİLENLER</p>
            <h2 id="home-faq-heading" className="mt-3 text-2xl font-semibold tracking-tight text-neutral-900 md:text-[28px]">
              Sorularınız mı var?
            </h2>

            <div className="mt-10 w-full">
              {HOME_FAQ_ITEMS.map((item, index) => {
                const isOpen = openIndex === index
                return (
                  <article
                    key={item.question}
                    className="mb-4 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white"
                  >
                    <button
                      type="button"
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6"
                      onClick={() => handleToggle(index)}
                      aria-expanded={isOpen}
                      aria-controls={`home-faq-answer-${index}`}
                    >
                      <span className="text-[15px] font-semibold text-slate-800">{item.question}</span>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-sky-500 transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        aria-hidden
                      />
                    </button>
                    <div
                      id={`home-faq-answer-${index}`}
                      className={`grid transition-all duration-300 ${
                        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="px-5 pb-5 text-slate-600 leading-relaxed md:px-6">{item.answer}</p>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>

          <div className="order-1 relative h-full min-h-[400px] w-full overflow-hidden rounded-3xl shadow-2xl lg:order-2 lg:min-h-[500px]">
            <Image
              src={currentFaqImage}
              alt="SSS bölümüne eşlik eden görsel"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="h-full w-full rounded-3xl object-cover object-top shadow-xl"
              priority={false}
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary/28 via-primary/12 to-transparent"
              aria-hidden
            />
          </div>
        </div>
      </div>
    </section>
  )
}
