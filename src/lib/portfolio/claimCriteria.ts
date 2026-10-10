/**
 * Writing a learner's criterion claims (set_portfolio_item_criteria) when the
 * database may refuse one.
 *
 * The database rejects a claim whose unit/AC is not in the qualification it is
 * filed under (_pic_criterion_guard, migration 20261011031500): "Criterion 333
 * 3.1 is not in qualification 5357". That refusal rolls back the whole call, so
 * setItemCriteria drops the refused claim and tries again, keeping every claim
 * that is in the qualification, and returns what was refused so the screen can
 * tell the learner in plain words instead of failing silently.
 */
import { supabase } from '@/integrations/supabase/client';
import type { AcRef } from '@/lib/portfolio/acRef';

const NOT_IN_QUALIFICATION = /^Criterion (.+) is not in qualification (.+)$/;

/** The refused criterion and qualification, when this is the guard's error. */
export function criterionMismatch(
  message: string | null | undefined
): { criterion: string; qualification: string } | null {
  const m = NOT_IN_QUALIFICATION.exec((message ?? '').trim());
  return m ? { criterion: m[1], qualification: m[2] } : null;
}

/** A plain sentence for a refused claim, or the message as it came. */
export function claimErrorText(message: string | null | undefined): string {
  const m = criterionMismatch(message);
  if (!m) return message || 'Check your connection and try again.';
  return `${m.criterion} is not in your qualification (${m.qualification}), so it has not been claimed. Choose criteria from your qualification.`;
}

/** The sentence to show after some claims were refused. */
export function rejectedClaimsText(rejected: AcRef[], qualification: string | null): string {
  const list = rejected
    .slice(0, 3)
    .map((r) => `${r.unit_code} AC ${r.ac_code}`)
    .join(', ');
  const more = rejected.length > 3 ? ` and ${rejected.length - 3} more` : '';
  const q = qualification ? ` (${qualification})` : '';
  return `${list}${more} ${rejected.length === 1 ? 'is' : 'are'} not in your qualification${q}, so ${rejected.length === 1 ? 'it was' : 'they were'} not claimed. Your evidence is saved. Open it to claim criteria from your qualification.`;
}

export interface SetCriteriaResult {
  /** Claims the database refused as not in the learner's qualification. */
  rejected: AcRef[];
  qualification: string | null;
  /** Any other failure (the claims were not written). */
  error: string | null;
}

export async function setItemCriteria(
  itemId: string,
  claimed: AcRef[],
  suggested: unknown[] | null = null
): Promise<SetCriteriaResult> {
  let remaining = [...claimed];
  const rejected: AcRef[] = [];
  let qualification: string | null = null;
  // One refusal per round; bounded by the number of claims.
  for (let round = 0; round <= claimed.length; round++) {
    const { error } = await supabase.rpc(
      'set_portfolio_item_criteria' as never,
      { p_item_id: itemId, p_claimed: remaining, p_suggested: suggested } as never
    );
    if (!error) return { rejected, qualification, error: null };
    const m = criterionMismatch(error.message);
    const bad = m
      ? remaining.find((c) => `${c.unit_code.trim()} ${c.ac_code.trim()}` === m.criterion)
      : undefined;
    if (!m || !bad) return { rejected, qualification, error: error.message };
    qualification = m.qualification;
    rejected.push(bad);
    remaining = remaining.filter((c) => c !== bad);
  }
  return { rejected, qualification, error: 'Too many criteria were refused' };
}
