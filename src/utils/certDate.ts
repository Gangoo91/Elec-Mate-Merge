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
