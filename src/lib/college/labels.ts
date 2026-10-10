/**
 * Readable words for snake_case keys stored in college tables.
 * "written_assessment" → "Written assessment". Already-readable text passes
 * through with only its first letter capitalised.
 */
export function keyLabel(key: string | null | undefined): string {
  if (!key) return '';
  const v = key.replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim();
  if (!v) return key;
  // Only lower-case a value that was a key; leave "AM2" or "EPA mock" alone.
  const words = /[_-]/.test(key) || key === key.toLowerCase() ? v.toLowerCase() : v;
  return words[0].toUpperCase() + words.slice(1);
}
