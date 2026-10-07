/**
 * useAssessmentPlans — the learner's assessment plan (ELE-1874).
 *
 * A tutor or assessor sets plan items: these criteria, how (observation,
 * product evidence, professional discussion…), by this date, with a suggested
 * activity. The learner sees open items as a to-do; an item closes itself when
 * evidence claiming all its criteria is sent, or the criteria are passed.
 *
 * Reads get_assessment_plans (learner: own; staff who can assess: theirs).
 * Writes go through set_assessment_plan_item / close_assessment_plan_item.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { PORTFOLIO_CHANGED_EVENT } from '@/hooks/portfolio/usePortfolio';

export type PlanMethod =
  | 'observation'
  | 'product'
  | 'professional_discussion'
  | 'questioning'
  | 'witness'
  | 'simulation'
  | 'other';

export const PLAN_METHODS: { key: PlanMethod; label: string; hint: string }[] = [
  { key: 'observation', label: 'Observation', hint: 'Assessor watches the learner do the task on site or in the workshop.' },
  { key: 'product', label: 'Product evidence', hint: 'Photos, test sheets, drawings or the finished work itself.' },
  { key: 'witness', label: 'Witness statement', hint: 'A supervisor who saw the work signs to say so.' },
  { key: 'professional_discussion', label: 'Professional discussion', hint: 'The learner talks it through with the assessor.' },
  { key: 'questioning', label: 'Questioning', hint: 'Written or oral questions on the knowledge behind the task.' },
  { key: 'simulation', label: 'Simulation', hint: 'A realistic exercise in the workshop where site work is not possible.' },
  { key: 'other', label: 'Other', hint: 'Anything else that shows the criteria.' },
];

export const PLAN_METHOD_LABEL: Record<PlanMethod, string> = Object.fromEntries(
  PLAN_METHODS.map((m) => [m.key, m.label])
) as Record<PlanMethod, string>;

export interface PlanCriterion {
  unit_code: string;
  ac_code: string;
  unit_title: string | null;
  ac_text: string | null;
  met_at: string | null;
  met_by: 'evidence_submitted' | 'criteria_passed' | 'already_passed' | null;
}

export interface AssessmentPlanItem {
  id: string;
  activity: string;
  method: PlanMethod;
  method_label: string;
  due_date: string | null;
  notes: string | null;
  status: 'open' | 'done' | 'cancelled';
  overdue: boolean;
  set_by: string | null;
  set_by_name: string | null;
  created_at: string;
  closed_at: string | null;
  close_reason: 'evidence_submitted' | 'criteria_passed' | 'staff_closed' | 'cancelled' | null;
  close_note: string | null;
  college_student_id: string | null;
  criteria: PlanCriterion[];
}

export const CLOSE_REASON_LABEL: Record<NonNullable<AssessmentPlanItem['close_reason']>, string> = {
  evidence_submitted: 'Evidence sent',
  criteria_passed: 'Criteria passed',
  staff_closed: 'Marked done',
  cancelled: 'Cancelled',
};

export interface SetPlanInput {
  id?: string | null;
  criteria: { unit_code: string; ac_code: string }[];
  activity: string;
  method: PlanMethod;
  dueDate: string | null;
  notes?: string | null;
}

type Rpc = (
  fn: string,
  params: Record<string, unknown>
) => Promise<{ data: unknown; error: { message: string } | null }>;
// Bound: a bare supabase.rpc loses `this`.
const rpc = supabase.rpc.bind(supabase) as unknown as Rpc;

/** `${unit} AC ${ac}` — the format the capture sheet pre-selects. */
export const planAcRef = (c: { unit_code: string; ac_code: string }) => `${c.unit_code} AC ${c.ac_code}`;

/**
 * @param learnerUserId the learner's auth user id; null = the signed-in learner.
 * @param enabled set false to skip loading (e.g. no app account linked).
 */
export function useAssessmentPlans(learnerUserId: string | null, enabled = true) {
  const [items, setItems] = useState<AssessmentPlanItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const seq = useRef(0);

  const load = useCallback(async () => {
    const mine = ++seq.current;
    if (!enabled) {
      setItems([]);
      setLoading(false);
      return;
    }
    const { data, error: e } = await rpc('get_assessment_plans', { p_learner: learnerUserId });
    if (mine !== seq.current) return;
    setLoading(false);
    if (e) {
      setError(e.message);
      return;
    }
    setError(null);
    setItems((data as AssessmentPlanItem[]) ?? []);
  }, [learnerUserId, enabled]);

  useEffect(() => {
    setLoading(true);
    void load();
  }, [load]);

  // Evidence sent elsewhere in the app can close an item: reload on the
  // portfolio's change signal and when the tab comes back.
  useEffect(() => {
    const reload = () => void load();
    window.addEventListener(PORTFOLIO_CHANGED_EVENT, reload);
    window.addEventListener('focus', reload);
    return () => {
      window.removeEventListener(PORTFOLIO_CHANGED_EVENT, reload);
      window.removeEventListener('focus', reload);
    };
  }, [load]);

  const open = useMemo(() => items.filter((i) => i.status === 'open'), [items]);
  const closed = useMemo(() => items.filter((i) => i.status !== 'open'), [items]);
  const overdue = useMemo(() => open.filter((i) => i.overdue).length, [open]);

  const save = useCallback(
    async (input: SetPlanInput) => {
      if (!learnerUserId) throw new Error('No learner');
      const { data, error: e } = await rpc('set_assessment_plan_item', {
        p_learner: learnerUserId,
        p_criteria: input.criteria,
        p_activity: input.activity,
        p_method: input.method,
        p_due_date: input.dueDate || null,
        p_notes: input.notes ?? null,
        p_id: input.id ?? null,
      });
      if (e) throw new Error(e.message);
      await load();
      return data as { id: string; criteria: number; already_passed: number };
    },
    [learnerUserId, load]
  );

  const setStatus = useCallback(
    async (id: string, status: 'done' | 'cancelled' | 'open', note?: string) => {
      const { error: e } = await rpc('close_assessment_plan_item', {
        p_id: id,
        p_status: status,
        p_note: note ?? null,
      });
      if (e) throw new Error(e.message);
      await load();
    },
    [load]
  );

  return { items, open, closed, overdue, loading, error, refresh: load, save, setStatus };
}
