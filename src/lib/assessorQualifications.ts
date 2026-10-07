/**
 * Assessor qualifications (ELE-1870) — the options an assessor picks on their
 * profile (assessor_profiles.qualifications) and the short form shown to
 * learners next to an assessor's name. Every decision snapshots the list
 * (portfolio_assessment_decisions.assessor_qualifications).
 */

export const ASSESSOR_QUALIFICATIONS = [
  'TAQA (CAVA)',
  'A1',
  'D32/D33',
  'Level 3 Certificate in Assessing Vocational Achievement',
  'IQA (V1 / D34)',
  'AM2 assessor',
  'Other',
] as const;

const SHORT: Record<string, string> = {
  'TAQA (CAVA)': 'TAQA',
  'Level 3 Certificate in Assessing Vocational Achievement': 'CAVA',
  'IQA (V1 / D34)': 'IQA',
};

/** "TAQA · AM2 assessor", or null when there is nothing worth showing. */
export function qualificationsLine(quals: string[] | null | undefined): string | null {
  const shown = (quals ?? []).filter((q) => q && q !== 'Other').map((q) => SHORT[q] ?? q);
  return shown.length ? [...new Set(shown)].join(' · ') : null;
}

/** "Owen Price (TAQA)" when the decision carries a qualifications snapshot. */
export function assessorWithQualifications(
  name: string,
  quals: string[] | null | undefined
): string {
  const line = qualificationsLine(quals);
  return line ? `${name} (${line})` : name;
}
