/** "sellafield" → "Sellafield". Leaves anything the learner already cased
 *  (e.g. "HMP Stocken", "McDonald's") alone — only all-lowercase is tidied. */
export function displaySite(name: string | null | undefined): string {
  const s = (name ?? '').trim();
  if (!s) return 'Site';
  if (s !== s.toLowerCase()) return s;
  return s.replace(/(^|[\s\-/(])(\p{L})/gu, (_, sep: string, ch: string) => sep + ch.toUpperCase());
}

/** First letter up, rest as written — for task chips typed in lowercase. */
export function sentenceCase(s: string): string {
  const t = s.trim();
  return t ? t.charAt(0).toUpperCase() + t.slice(1) : t;
}
