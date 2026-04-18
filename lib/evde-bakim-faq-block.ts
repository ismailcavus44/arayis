/** Makale HTML içindeki FAQ bloğu (admin + hizmet sayfası). */

export type EvdeBakimFaqItem = { question: string; answer: string }

function stripHtml(text: string): string {
  return text.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function findStructuredFaqBlock(html: string): { start: number; end: number; blockHtml: string } | null {
  const taggedRegex = /<ul[^>]*data-faq-section=["']?true["']?[^>]*>[\s\S]*?<\/ul>/i
  const tagged = taggedRegex.exec(html)
  if (tagged) {
    return {
      start: tagged.index,
      end: tagged.index + tagged[0].length,
      blockHtml: tagged[0],
    }
  }

  const listRegex = /<ul[^>]*>[\s\S]*?<\/ul>/gi
  let match: RegExpExecArray | null
  while ((match = listRegex.exec(html)) !== null) {
    const blockHtml = match[0]
    const looksLikeFaqTemplate =
      /<strong>\s*(?:Soru|Question)\s*:/i.test(blockHtml) &&
      /<strong>\s*(?:Cevap|Yanıt|Answer)\s*:/i.test(blockHtml)
    if (!looksLikeFaqTemplate) continue
    return {
      start: match.index,
      end: match.index + blockHtml.length,
      blockHtml,
    }
  }

  return null
}

export function parseFaqItemsFromBlock(blockHtml: string): EvdeBakimFaqItem[] {
  const items: EvdeBakimFaqItem[] = []
  const itemRegex = /<li[^>]*>([\s\S]*?)<\/li>/gi
  let match: RegExpExecArray | null
  while ((match = itemRegex.exec(blockHtml)) !== null) {
    const li = match[1]
    const questionRaw = li.match(/<strong>\s*(?:Soru|Question)\s*:\s*<\/strong>([\s\S]*?)(?:<br\s*\/?>|<strong|$)/i)?.[1]
    const answerRaw = li.match(/<strong>\s*(?:Cevap|Yanıt|Answer)\s*:\s*<\/strong>([\s\S]*)$/i)?.[1]
    const question = questionRaw ? decodeHtmlEntities(stripHtml(questionRaw)) : ''
    const answer = answerRaw ? decodeHtmlEntities(stripHtml(answerRaw)) : ''
    if (!question || !answer) continue
    items.push({ question, answer })
  }
  return items
}

export function extractFaqSectionFromArticle(html: string): { cleanHtml: string; faqItems: EvdeBakimFaqItem[] } {
  const structured = findStructuredFaqBlock(html)
  if (!structured) return { cleanHtml: html, faqItems: [] }
  const faqItems = parseFaqItemsFromBlock(structured.blockHtml)
  if (!faqItems.length) return { cleanHtml: html, faqItems: [] }
  const cleanHtml = `${html.slice(0, structured.start)}${html.slice(structured.end)}`.trim()
  return { cleanHtml, faqItems }
}

function faqItemHtml(question: string, answer: string): string {
  return `<li><strong>Soru:</strong> ${escapeHtml(question)}<br /><strong>Cevap:</strong> ${escapeHtml(answer)}</li>`
}

export function buildFaqBlockHtml(items: EvdeBakimFaqItem[]): string {
  if (!items.length) return ''
  return `<ul data-faq-section="true">${items.map((x) => faqItemHtml(x.question, x.answer)).join('')}</ul>`
}
