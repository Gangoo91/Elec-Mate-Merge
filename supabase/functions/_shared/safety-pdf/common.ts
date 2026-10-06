import type { KvRow, Signature } from './contract.ts';

// deno-lint-ignore no-explicit-any
export type Row = Record<string, any>;

const TZ = 'Europe/London';

export const str = (v: unknown): string =>
  v === null || v === undefined ? '' : typeof v === 'string' ? v.trim() : String(v);

export function fmtDate(v: unknown): string {
  const s = str(v);
  if (!s) return '';
  const d = new Date(s);
  if (isNaN(d.getTime())) return s;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: TZ });
}

export function fmtDateTime(v: unknown): string {
  const s = str(v);
  if (!s) return '';
  const d = new Date(s);
  if (isNaN(d.getTime())) return s;
  // One format for every date-time on the document: "4 October 2026, 10:15".
  const date = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: TZ });
  const time = d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: TZ });
  return `${date}, ${time}`;
}

export function fmtTime(v: unknown): string {
  const s = str(v);
  if (!s) return '';
  const d = new Date(s);
  if (isNaN(d.getTime())) return s.slice(0, 5);
  return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: TZ });
}

/** snake_case / kebab-case / lower → "Sentence case". */
export function humanise(v: unknown): string {
  const s = str(v).replace(/[_-]+/g, ' ').trim();
  if (!s) return '';
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

export const yesNo = (v: unknown, yes = 'Yes', no = 'No'): string =>
  v === true ? yes : v === false ? no : '';

/** Key/value rows with empty values dropped — the template never prints a blank cell. */
export function rows(pairs: [string, unknown, string?][]): KvRow[] {
  return pairs
    .map(([label, value, note]) => ({ label, value: str(value), note: note ? str(note) : undefined }))
    .filter((r) => r.value !== '');
}

/** Short, stable reference from a uuid: "ISO-54612E82". */
export const refFrom = (prefix: string, id: unknown): string =>
  `${prefix}-${str(id).replace(/-/g, '').slice(0, 8).toUpperCase()}`;

/**
 * How a signature was made, in words. A drawn signature on the user's own
 * device, a remote link signature (name typed by whoever opened the link) and
 * a typed name are different evidence and the document must not blur them.
 */
export function sigMethod(kind: 'device' | 'link' | 'typed' | 'present'): string {
  switch (kind) {
    case 'link':
      return 'Signed by link — name as typed; identity not verified';
    case 'typed':
      return 'Name typed — no drawn signature';
    case 'present':
      return 'Marked present by the person delivering it';
    default:
      return 'Signed on the device';
  }
}

export function signature(
  role: string,
  name: unknown,
  image: unknown,
  when: unknown,
  kind?: 'device' | 'link' | 'typed' | 'present'
): Signature | null {
  const n = str(name);
  const img = str(image);
  if (!n && !img) return null;
  const k = kind ?? (img ? 'device' : 'typed');
  return { role, name: n || 'Name not recorded', image: img, when: fmtDateTime(when), method: sigMethod(k) };
}

/** Photos stored as strings, {url,caption} objects, or mixed. */
export function photoList(
  raw: unknown,
  resolve: (ref: string) => string,
  fallbackCaption = ''
): { url: string; caption?: string }[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((p) => {
      if (typeof p === 'string') return { url: resolve(p), caption: fallbackCaption };
      if (p && typeof p === 'object') {
        const o = p as Row;
        const ref = str(o.url || o.path || o.publicUrl || o.public_url);
        return ref ? { url: resolve(ref), caption: str(o.caption || o.description || fallbackCaption) } : null;
      }
      return null;
    })
    .filter((p): p is { url: string; caption: string } => !!p && !!p.url);
}

/** Free text that may be a string or a string[] → paragraphs. */
export function paras(v: unknown): string[] {
  if (Array.isArray(v)) return v.map(str).filter(Boolean);
  const s = str(v);
  return s ? s.split(/\n{2,}/).map((x) => x.trim()).filter(Boolean) : [];
}

export const list = (v: unknown): string[] =>
  Array.isArray(v) ? v.map((x) => (typeof x === 'string' ? x : str((x as Row)?.name ?? (x as Row)?.label ?? x))).filter(Boolean) : [];
