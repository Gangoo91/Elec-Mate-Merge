/**
 * WitnessCompetence — the expert witness's own confirmation of competence and
 * no conflict of interest (C&G 5357: an expert witness must be occupationally
 * competent in the area and have no conflict of interest), under a signed
 * witness statement.
 *
 * Statements signed before the witness was asked (10 Oct 2026) say
 * "Competence not confirmed" quietly, to staff only.
 */
export interface WitnessCompetenceFields {
  witness_competence?: string | null;
  witness_card_number?: string | null;
  witness_years_in_trade?: number | null;
  witness_no_conflict?: boolean | null;
}

/** The columns to select alongside a witness statement. */
export const WITNESS_COMPETENCE_COLUMNS =
  'witness_competence, witness_card_number, witness_years_in_trade, witness_no_conflict';

/** "JIB gold card, Approved Electrician · card 123456 · 12 years in the trade", or null. */
export function witnessCompetenceText(w: WitnessCompetenceFields): string | null {
  const comp = w.witness_competence?.trim();
  if (!comp) return null;
  return [
    comp,
    w.witness_card_number ? `card ${w.witness_card_number}` : null,
    typeof w.witness_years_in_trade === 'number'
      ? `${w.witness_years_in_trade} year${w.witness_years_in_trade === 1 ? '' : 's'} in the trade`
      : null,
  ]
    .filter(Boolean)
    .join(' · ');
}

export function WitnessCompetence({
  w,
  audience,
  className,
}: {
  w: WitnessCompetenceFields;
  /** Staff see "Competence not confirmed" on older statements; learners see nothing. */
  audience: 'staff' | 'learner';
  className?: string;
}) {
  const text = witnessCompetenceText(w);
  if (!text && !w.witness_no_conflict) {
    if (audience === 'learner') return null;
    return (
      <p data-testid="witness-competence" className={className ?? 'mt-1 text-[12px] text-white'}>
        Competence not confirmed
      </p>
    );
  }
  return (
    <p
      data-testid="witness-competence"
      className={className ?? 'mt-1 text-[12px] leading-snug text-white'}
    >
      {text ? `Competence: ${text}.` : 'Competence not given.'}
      {w.witness_no_conflict ? ' Confirmed no conflict of interest.' : ''}
    </p>
  );
}
