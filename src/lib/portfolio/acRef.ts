/**
 * Parse a legacy criterion string ("204 AC 6.2: Test ring final",
 * "ELTP06 (Unit 317) AC 2.2", "Unit 312/212 AC 10.1") into a typed ref.
 *
 * Mirrors public._parse_ac_ref() in the database (ELE-1864) so the client and
 * the backfill/trigger agree on what a string claims. Returns null when the
 * string names no unit (e.g. a bare "1.1" or free text): that text is kept on
 * the item but is never counted as coverage.
 */
export interface AcRef {
  unit_code: string;
  ac_code: string;
}

const CODE = '([A-Za-z0-9/._-]+)';
const UNIT_PATTERNS = [
  new RegExp(`Unit\\s*${CODE}`),
  new RegExp(`\\(${CODE}\\)\\s*AC\\b`),
  new RegExp(`^\\s*${CODE}\\s+AC\\b`),
  new RegExp(`${CODE}\\s*AC\\b`),
];
const AC_PATTERN = /AC\s*([0-9]+(?:\.[0-9]+)*)/;

export function parseAcRef(ref: string | null | undefined): AcRef | null {
  if (!ref) return null;
  const ac = AC_PATTERN.exec(ref)?.[1];
  if (!ac) return null;
  for (const re of UNIT_PATTERNS) {
    const unit = re.exec(ref)?.[1];
    if (unit) return { unit_code: unit, ac_code: ac };
  }
  return null;
}

/** The canonical string form written to the one-release mirror. */
export const acRefString = (r: AcRef) => `${r.unit_code} AC ${r.ac_code}`;

export const acKey = (unit: string, ac: string) => `${unit}|${ac}`;
