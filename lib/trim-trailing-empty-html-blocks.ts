/**
 * WYSIWYG kalıntıları: makale HTML’inin sonundaki boş <p>/<div> ve sondaki <br>’leri kaldırır
 * (FAQ’nin hemen üstünde biriken hayalet boşlukları azaltmak için).
 */
export function trimTrailingEmptyRichTextBlocks(html: string): string {
  let s = html.trimEnd()

  const tailChunks = [
    /<p[^>]*>\s*(?:<br\s[^>]*\/?>|&nbsp;|&#160;|&#x0*A0;)\s*<\/p>\s*$/gi,
    /<p[^>]*>\s*(?:<br\s[^>]*\/?>|&nbsp;|&#160;|&#x0*A0;|\s|<span[^>]*>\s*(?:<br\s[^>]*\/?>|&nbsp;|&#160;|\s)*<\/span>)*\s*<\/p>\s*$/gi,
    /<p[^>]*>\s*<\/p>\s*$/gi,
    /<div[^>]*>\s*(?:<br\s[^>]*\/?>|&nbsp;|&#160;|\s)*<\/div>\s*$/gi,
  ]

  let prev: string
  do {
    prev = s
    for (const re of tailChunks) {
      s = s.replace(re, '').trimEnd()
    }
  } while (s !== prev)

  s = s.replace(/(?:<br\s[^>]*\/?>|\s)+$/gi, '').trimEnd()
  return s
}
