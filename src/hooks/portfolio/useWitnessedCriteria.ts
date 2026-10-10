/**
 * useWitnessedCriteria — which criteria a signed witness statement backs up
 * (ELE-1869), keyed "unit|ac", for the learner's Coverage, the assessor's
 * criteria list and anything else that lists criteria.
 *
 * A statement's criteria are stored as "113 AC 1.1" (what the learner picked
 * when asking). The learner reads their own statements; assessing staff read
 * them through the "Assessing staff read witness statements" policy. The
 * export pack applies the same rule server-side (portfolio-export-pack).
 */
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { PORTFOLIO_CHANGED_EVENT } from '@/hooks/portfolio/usePortfolio';

export interface CriterionWitness {
  id: string;
  portfolio_item_id: string | null;
  name: string;
  role: string | null;
  company: string | null;
  signed_at: string | null;
  /** C&G expert witness: their own competence and no-conflict confirmation. */
  competence?: string | null;
  no_conflict?: boolean | null;
}

/**
 * For staff: "Competence: JIB gold card. No conflict of interest confirmed."
 * or "Competence not confirmed" on a statement signed before it was asked.
 */
export function witnessCompetenceLine(w: CriterionWitness): string {
  if (!w.competence && !w.no_conflict) return 'Competence not confirmed';
  return [
    w.competence ? `Competence: ${w.competence}.` : null,
    w.no_conflict ? 'No conflict of interest confirmed.' : null,
  ]
    .filter(Boolean)
    .join(' ');
}

/** "113 AC 1.1" → "113|1.1"; null if it is not in that shape. */
export function witnessCriterionKey(code: string): string | null {
  const m = code.match(/^(.+?) AC (.+)$/);
  return m ? `${m[1].trim()}|${m[2].trim()}` : null;
}

/** "Witnessed by Jane Smith, Site supervisor, 6 Oct" */
export function witnessedByLine(w: CriterionWitness): string {
  const when = w.signed_at
    ? new Date(w.signed_at).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        timeZone: 'Europe/London',
      })
    : null;
  return `Witnessed by ${[w.name, w.role, when].filter(Boolean).join(', ')}`;
}

export function useWitnessedCriteria(learnerId: string | null | undefined) {
  const [byKey, setByKey] = useState<Map<string, CriterionWitness[]>>(new Map());
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const on = () => setTick((t) => t + 1);
    window.addEventListener(PORTFOLIO_CHANGED_EVENT, on);
    return () => window.removeEventListener(PORTFOLIO_CHANGED_EVENT, on);
  }, []);

  useEffect(() => {
    if (!learnerId) {
      setByKey(new Map());
      return;
    }
    let cancelled = false;
    void (async () => {
      const { data } = await supabase
        .from('portfolio_witness_statements' as never)
        .select(
          'id, portfolio_item_id, witness_name, witness_role, witness_company, criteria, signed_at, witness_competence, witness_no_conflict'
        )
        .eq('learner_id', learnerId)
        .eq('status', 'signed')
        .order('signed_at', { ascending: true });
      if (cancelled) return;
      const m = new Map<string, CriterionWitness[]>();
      for (const w of (data ?? []) as unknown as Array<{
        id: string;
        portfolio_item_id: string | null;
        witness_name: string | null;
        witness_role: string | null;
        witness_company: string | null;
        criteria: string[] | null;
        signed_at: string | null;
        witness_competence: string | null;
        witness_no_conflict: boolean | null;
      }>) {
        for (const c of w.criteria ?? []) {
          const k = witnessCriterionKey(c);
          if (!k) continue;
          const list = m.get(k) ?? [];
          list.push({
            id: w.id,
            portfolio_item_id: w.portfolio_item_id,
            name: w.witness_name || 'A witness',
            role: w.witness_role,
            company: w.witness_company,
            signed_at: w.signed_at,
            competence: w.witness_competence,
            no_conflict: w.witness_no_conflict,
          });
          m.set(k, list);
        }
      }
      setByKey(m);
    })();
    return () => {
      cancelled = true;
    };
  }, [learnerId, tick]);

  return byKey;
}
