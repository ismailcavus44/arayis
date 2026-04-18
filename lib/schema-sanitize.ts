/** Şema metinlerinde yasaklı ifadeleri güvenli alternatiflerle değiştirir. */
export function sanitizeServiceSchemaText(input: string): string {
  return input.replace(/\btedarik\b/gi, 'danışmanlık')
}

/** İş ilanı JSON-LD metinleri için (tedarik / tedarikçi / temin yok). */
export function sanitizeJobPostingCopy(input: string): string {
  return input
    .replace(/\btedarik\b/gi, 'danışmanlık')
    .replace(/\btedarikçi\b/gi, 'danışmanlık ortağı')
    .replace(/\btemin\b/gi, 'eşleştirme')
}
