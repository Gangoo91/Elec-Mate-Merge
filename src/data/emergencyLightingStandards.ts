/**
 * Emergency lighting standard designations — single source of truth for the
 * strings printed on the certificate.
 *
 * WHY: the cert defaulted to, and declared conformity with, BS 5266-1:2016,
 * BS EN 50172:2004 and BS EN 1838:2013 — all three superseded. BS 5266-1:2025
 * came into force on 31 October 2025 and withdrew the 2016 edition; it aligns
 * to BS EN 1838:2024 (performance) and BS EN 50172:2024 (system requirements).
 * The designation strings and edition dates below are publication status
 * facts, not standard content — no clause text is reproduced here.
 *
 * POLICY (mirrors formatDesignStandard in ./standards.ts): a certificate
 * designed and certified under an earlier edition must keep stating that
 * edition and must NOT be retrospectively relabelled. So the superseded values
 * remain selectable and stored values pass through untouched — only the
 * DEFAULT for a new certificate moves to the current edition.
 */

/** Current edition, used as the default for any new certificate. */
export const EL_CURRENT_DESIGN_STANDARD = 'BS 5266-1:2025';

/** Companion standards the current edition aligns to. */
export const EL_CURRENT_PERFORMANCE_STANDARD = 'BS EN 1838:2024';
export const EL_CURRENT_SYSTEM_STANDARD = 'BS EN 50172:2024';

/**
 * Picker options. Current edition first; superseded editions stay selectable
 * (and are labelled as such) so an earlier certificate can still be recorded
 * or re-issued against the edition that applied at the time.
 */
export const EL_DESIGN_STANDARD_OPTIONS: { value: string; label: string }[] = [
  { value: 'BS 5266-1:2025', label: 'BS 5266-1:2025' },
  { value: 'BS 5266-1:2025 + BS EN 50172:2024', label: 'BS 5266-1:2025 + BS EN 50172:2024' },
  { value: 'BS 5266-1:2016', label: 'BS 5266-1:2016 (superseded)' },
  { value: 'BS EN 50172:2004', label: 'BS EN 50172:2004 (superseded)' },
  { value: 'BS 5266-1 + BS EN 50172', label: 'BS 5266-1 + BS EN 50172 (unversioned)' },
];

/**
 * The full standards list printed in `metadata.standards` and woven into the
 * declaration. Derived from the design standard the user actually selected, so
 * a certificate recorded against the 2016 edition does not claim conformity to
 * the 2025 one (and vice versa).
 */
export const elStandardsList = (designStandard?: string): string => {
  const v = String(designStandard || '').trim();
  if (v.includes('2016') || v.includes('50172:2004')) {
    return 'BS 5266-1:2016, BS EN 50172:2004, BS EN 1838:2013';
  }
  return `${EL_CURRENT_DESIGN_STANDARD}, ${EL_CURRENT_SYSTEM_STANDARD}, ${EL_CURRENT_PERFORMANCE_STANDARD}`;
};

/** Declaration wording, citing the edition actually recorded on the cert. */
export const elDeclarationText = (designStandard?: string): string =>
  `I/We certify that the emergency lighting system has been inspected and tested in accordance with ${elStandardsList(
    designStandard
  )}, and the results are as recorded in this certificate.`;
