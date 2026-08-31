/**
 * AM2 grade bands — the one place the EPA simulator decides what a score means.
 *
 * Source: the Installation Electrician / Maintenance Electrician apprenticeship
 * ASSESSMENT PLAN (ST0152), which sets the end-point assessment as the AM2:
 *
 *   "The AM2 will be graded pass/merit/distinction. Candidates will require 70%
 *    to pass, a level set and agreed by employers, with merit at 80% and
 *    distinction at 90%. It is possible to retake AM2 if necessary but any
 *    subsequent successful attempt will be graded Pass. Only on the first
 *    attempt can a candidate achieve Merit or Distinction."
 *
 * Why this file exists — the two mocks disagreed with the AM2 and with each
 * other:
 *
 *   professional discussion : distinction >= 70, pass >= 40
 *   knowledge test          : distinction >= 80, pass >= 60
 *   AM2                     : distinction >= 90, merit >= 80, pass >= 70
 *
 * So the same 75% was a Distinction in one mock and a Pass in the other, and
 * MERIT WAS UNREACHABLE in both even though the history screen has a Merit
 * branch. Worse, a 70% — the real AM2 pass mark — was displayed as a
 * Distinction, which is exactly the wrong signal before a high-stakes
 * assessment. Practising against a 40% pass bar tells an apprentice they are
 * ready when they are thirty points short.
 *
 * Both mocks now grade on the AM2 bands, which also makes the two comparable
 * so the history trajectory means something.
 */

export type EPAGrade = 'distinction' | 'merit' | 'pass' | 'fail';

/** AM2 thresholds, as percentages. */
export const AM2_BANDS = {
  distinction: 90,
  merit: 80,
  pass: 70,
} as const;

/** Score (0–100) → AM2 grade. */
export function gradeForScore(score: number): EPAGrade {
  if (score >= AM2_BANDS.distinction) return 'distinction';
  if (score >= AM2_BANDS.merit) return 'merit';
  if (score >= AM2_BANDS.pass) return 'pass';
  return 'fail';
}

/**
 * How far off the next band, for nudging in the UI.
 * Returns null once the apprentice is at distinction.
 */
export function pointsToNextBand(
  score: number
): { target: Exclude<EPAGrade, 'fail'>; points: number } | null {
  if (score < AM2_BANDS.pass) return { target: 'pass', points: AM2_BANDS.pass - score };
  if (score < AM2_BANDS.merit) return { target: 'merit', points: AM2_BANDS.merit - score };
  if (score < AM2_BANDS.distinction)
    return { target: 'distinction', points: AM2_BANDS.distinction - score };
  return null;
}

/**
 * Display label + colour for a grade.
 *
 * Kept beside the bands so a label and its colour can never disagree — merit is
 * a grade above pass (not "Pass"), and anything below the pass mark must read
 * red rather than neutral.
 */
export function gradeDisplay(grade: string | null | undefined): {
  label: string;
  className: string;
} {
  switch (grade) {
    case 'distinction':
      return { label: 'Distinction', className: 'text-elec-yellow' };
    case 'merit':
      return { label: 'Merit', className: 'text-elec-yellow/80' };
    case 'pass':
      return { label: 'Pass', className: 'text-white' };
    case 'fail':
    case 'not_yet_ready':
    case 'not_yet_pass':
      return { label: 'Below pass', className: 'text-red-400' };
    default:
      return { label: grade ? grade.replace(/_/g, ' ') : '—', className: 'text-white/85' };
  }
}
