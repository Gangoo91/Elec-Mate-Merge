/**
 * Date formatting for certificate PDFs — ONE helper for the whole fleet.
 *
 * Form fields store dates as ISO (`YYYY-MM-DD`) because that is what
 * `<input type="date">` produces. Nothing converted them on the way to the PDF,
 * so seven certificates printed "2026-08-02" on a UK compliance document.
 *
 * Four formatters had each grown their own private copy of this function
 * (smokeCO, emergencyLighting, solarPV, disconnection). Duplication of a tiny
 * shared rule is exactly what produced the three divergent `calculateStatus`
 * copies in reportCloud.ts, so new work uses this one.
 */

/**
 * ISO (`YYYY-MM-DD`) -> UK (`DD/MM/YYYY`).
 *
 * Anything that is not an ISO date passes through untouched: certificates carry
 * free-text dates ("On completion", "Annually") and already-formatted values,
 * and a formatter must never mangle or blank what the electrician typed.
 */
export const ukDate = (value: unknown): string => {
  const s = String(value ?? '').trim();
  const m = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
  return m ? `${m[3]}/${m[2]}/${m[1]}` : s;
};

/** Keys whose value must reach the template untouched, even if it looks ISO. */
const PRESERVE_KEYS = new Set(['created_at', 'updated_at', 'generated_at']);

/** Strict form of the rule above: the WHOLE string must be a calendar date. */
const ISO_DATE_ONLY = /^(\d{4})-(\d{2})-(\d{2})$/;

/**
 * Rewrite every ISO date in a finished PDF payload to UK format — ELE-1552.
 *
 * `ukDate` above fixes a field someone remembered to wrap. This fixes the field
 * they forgot. Auditing the stored `pdf_payload` of every report found 23 keys
 * still shipping ISO across five certificate types — including three formatters
 * that *had* a local helper but had not applied it to every field, and nested
 * values no field-by-field pass would ever have reached: `luminaires[n]
 * .install_date`, `declarations.inspected_by.date`, `test_instrument_details
 * .calibration_date`. Run this last in a formatter and a date field added later
 * is covered without anyone having to remember it.
 *
 * Idempotent, so it is safe on formatters that already call `ukDate`.
 *
 * ## Why this is stricter than `ukDate`
 *
 * `ukDate` matches an ISO *prefix*, so it deliberately turns a stored timestamp
 * into a printable date when a formatter asks it to. A blanket walk must not:
 * it would rewrite `created_at` and every other timestamp it met. So this
 * anchors the whole string, and skips the keys above as well.
 */
export function normalisePdfDates<T>(payload: T): T {
  return walk(payload) as T;
}

function walk(node: unknown, key?: string): unknown {
  if (typeof node === 'string') {
    if (key && PRESERVE_KEYS.has(key)) return node;
    const m = ISO_DATE_ONLY.exec(node);
    if (!m) return node;
    // Reject impossible dates so a serial or reference shaped like one survives.
    const month = Number(m[2]);
    const day = Number(m[3]);
    if (month < 1 || month > 12 || day < 1 || day > 31) return node;
    return `${m[3]}/${m[2]}/${m[1]}`;
  }

  if (Array.isArray(node)) return node.map((item) => walk(item));

  // Plain objects only. Anything exotic that reaches a payload (a Date, a class
  // instance) is returned as-is rather than rebuilt into a broken copy.
  if (node !== null && typeof node === 'object') {
    const proto = Object.getPrototypeOf(node);
    if (proto !== Object.prototype && proto !== null) return node;
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(node)) out[k] = walk(v, k);
    return out;
  }

  return node;
}

/**
 * ISO -> UK long form (`2 August 2026`), for cover sheets where a single date
 * is set in large type and slashes read as clutter.
 */
export const ukDateLong = (value: unknown): string => {
  const s = String(value ?? '').trim();
  const m = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return s;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return isNaN(d.getTime())
    ? s
    : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
};
