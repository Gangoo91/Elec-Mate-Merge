import { photoList, str } from '../common.ts';

type Photo = { url: string; caption?: string };

/**
 * Photos from several columns (jsonb arrays, text[] arrays, or a single string),
 * resolved through ctx.photoUrl and de-duplicated on the stored reference, so a
 * photo kept in both `photos` and a legacy `photo_urls` prints once. Pass each
 * source as [rawValue, fallbackCaption].
 */
export function mergePhotos(resolve: (ref: string) => string, ...sources: [unknown, string?][]): Photo[] {
  const seen = new Set<string>();
  const out: Photo[] = [];
  for (const [raw, caption] of sources) {
    const arr = typeof raw === 'string' ? (str(raw) ? [raw] : []) : raw;
    for (const p of photoList(arr, (ref) => ref, caption ?? '')) {
      const key = p.url.split('?')[0];
      if (seen.has(key)) continue;
      seen.add(key);
      out.push({ url: resolve(p.url), ...(p.caption ? { caption: p.caption } : {}) });
    }
  }
  return out;
}

/** Cover facts: empties dropped, at most six, always an even count. */
export function evenFacts(facts: { label: string; value: string }[]): { label: string; value: string }[] {
  const f = facts.filter((x) => x.value).slice(0, 6);
  return f.length % 2 ? f.slice(0, -1) : f;
}

/** "14:30:00" (Postgres time) or an ISO timestamp → "14:30". */
export function clock(v: unknown): string {
  const s = str(v);
  if (!s) return '';
  if (/^\d{1,2}:\d{2}/.test(s)) return s.slice(0, 5);
  const d = new Date(s);
  return isNaN(d.getTime()) ? s : d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/London' });
}

/** A label from a lookup table, else the stored value made readable (keeps values that are already words). */
export function labelOf(map: Record<string, string>, v: unknown): string {
  const s = str(v);
  if (!s) return '';
  if (map[s]) return map[s];
  if (map[s.toLowerCase()]) return map[s.toLowerCase()];
  if (/[A-Z]/.test(s) && /\s/.test(s)) return s; // already a human label, e.g. "Working at Height"
  const h = s.replace(/[_-]+/g, ' ').trim();
  return h.charAt(0).toUpperCase() + h.slice(1).toLowerCase();
}

/** Short reference for a linked record id, or ''. */
export const linkRef = (prefix: string, id: unknown): string =>
  str(id) ? `${prefix}-${str(id).replace(/-/g, '').slice(0, 8).toUpperCase()}` : '';

export const plural = (n: number, one: string, many = `${one}s`): string => `${n} ${n === 1 ? one : many}`;

export const isPast = (v: unknown, now = new Date()): boolean => {
  const s = str(v);
  if (!s) return false;
  const d = new Date(s);
  return !isNaN(d.getTime()) && d.getTime() < now.getTime();
};
