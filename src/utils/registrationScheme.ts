/**
 * ELE-1570 — one canonical reading of `company_profiles.registration_scheme`.
 *
 * The column has been written by more than one control with different casing:
 * the live `SchemeLogoPicker` stores uppercase (`NICEIC`, `NAPIT`), while
 * legacy rows hold lowercase (`other`, `none`). Certificates printed the value
 * RAW, straight out of the column onto a legal document — so whatever string
 * happened to be stored is what an assessor read.
 *
 * That is the actual defect behind the report: a firm registered with NICEIC
 * had `other` stored, and page 1 of their certificate said "Other" next to
 * their NICEIC number. Had they instead been switched to the lowercase value,
 * it would have printed "niceic".
 *
 * Nothing downstream should compare or print the raw column again. Read it
 * through `normaliseScheme` (for comparison) or `schemeDisplayLabel` (for
 * anything a human or a PDF will see).
 */

/** Canonical stored values — uppercase, matching src/constants/schemeLogos.ts. */
export const CANONICAL_SCHEMES = [
  'NICEIC',
  'NAPIT',
  'ELECSA',
  'STROMA',
  'OFTEC',
  'BESCA',
  'BRE',
] as const;

export type CanonicalScheme = (typeof CANONICAL_SCHEMES)[number];

/** How each canonical value is rendered. Deliberately explicit rather than
 *  upper-casing the raw string — "Other" is title case, the bodies are not. */
const DISPLAY: Record<string, string> = {
  NICEIC: 'NICEIC',
  NAPIT: 'NAPIT',
  ELECSA: 'ELECSA',
  STROMA: 'STROMA',
  OFTEC: 'OFTEC',
  BESCA: 'BESCA',
  BRE: 'BRE',
  OTHER: 'Other',
  NONE: '',
};

/**
 * Fold any stored spelling to its canonical form.
 * Returns '' for none/unset, so callers can treat "no scheme" as falsy.
 */
export function normaliseScheme(raw: string | null | undefined): string {
  const key = (raw ?? '').trim().toUpperCase();
  if (!key || key === 'NONE') return '';
  if (key in DISPLAY) return key === 'OTHER' ? 'OTHER' : key;
  // Unknown body the user typed themselves — keep it, don't silently drop it.
  return key;
}

/**
 * What should be printed. Never returns the raw column value for a scheme we
 * recognise, which is what let "other" and "niceic" reach a certificate.
 */
export function schemeDisplayLabel(raw: string | null | undefined): string {
  const key = normaliseScheme(raw);
  if (!key) return '';
  if (key in DISPLAY) return DISPLAY[key];
  // Unrecognised: present it tidily rather than shouting the raw value.
  return key.charAt(0) + key.slice(1).toLowerCase();
}

/** True when the two values mean the same scheme, whatever their casing. */
export function isSameScheme(a: string | null | undefined, b: string | null | undefined): boolean {
  return normaliseScheme(a) === normaliseScheme(b);
}
