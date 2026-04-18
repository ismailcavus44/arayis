/** TOC / anchor id: Türkçe uyumlu kebab-case. */
export function slugifyDomId(text: string): string {
  const s = text
    .trim()
    .replace(/İ/g, 'i')
    .replace(/I/g, 'i')
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/&[^;\s]+;/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
  return s || 'baslik'
}

/** Aynı slug çakışırsa -2, -3 ekler. */
export function assignUniqueDomIds(labels: string[]): string[] {
  const counts = new Map<string, number>()
  return labels.map((raw) => {
    let base = slugifyDomId(raw)
    const c = counts.get(base) ?? 0
    counts.set(base, c + 1)
    if (c > 0) base = `${base}-${c + 1}`
    return base
  })
}

/**
 * Makaledeki mevcut id’ler + aynı batch içi çakışmaları önler (TOC anchor güvenliği).
 */
export function assignUniqueDomIdsAgainstReserved(labels: string[], reserved: Iterable<string>): string[] {
  const taken = new Set(reserved)
  const out: string[] = []
  for (const label of labels) {
    const base = slugifyDomId(label)
    let id = base
    let n = 2
    while (taken.has(id)) {
      id = `${base}-${n}`
      n += 1
    }
    taken.add(id)
    out.push(id)
  }
  return out
}
