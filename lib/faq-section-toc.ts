import type { ServiceTocItem } from '@/components/ServicePageToc'
import { assignUniqueDomIdsAgainstReserved } from '@/lib/slugify-dom-id'

export function buildFaqTocAppend(
  articleToc: ServiceTocItem[],
  faqTitle: string,
  faqItems: { question: string }[],
  /** Makale / sayfa bölümünde zaten kullanılan id’ler (çakışma önleme) */
  reservedDomIds: string[] = []
): { entries: ServiceTocItem[]; sectionId: string; questionIds: string[] } {
  if (!faqItems.length) {
    return { entries: [], sectionId: '', questionIds: [] }
  }

  const allLabels = [faqTitle, ...faqItems.map((x) => x.question)]
  const allIds = assignUniqueDomIdsAgainstReserved(allLabels, reservedDomIds)
  const sectionId = allIds[0]
  const questionIds = allIds.slice(1)

  const usesNumbering = articleToc.some((t) => /^\d+\s/.test(t.label))
  let h2Num = 1
  if (usesNumbering) {
    let max = 0
    for (const t of articleToc) {
      const m = t.label.match(/^(\d+)\s/)
      if (m) max = Math.max(max, parseInt(m[1], 10))
    }
    h2Num = max + 1
  }

  const entries: ServiceTocItem[] = [
    {
      id: sectionId,
      label: usesNumbering ? `${h2Num} ${faqTitle}` : faqTitle,
      level: 2,
    },
  ]

  faqItems.forEach((item, i) => {
    entries.push({
      id: questionIds[i],
      label: usesNumbering ? `${h2Num}.${i + 1} ${item.question}` : item.question,
      level: 3,
    })
  })

  return { entries, sectionId, questionIds }
}
