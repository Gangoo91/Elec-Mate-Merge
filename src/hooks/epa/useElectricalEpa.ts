/**
 * The electrical-only EPA pieces of the College Hub (P-ELE-13), one read
 * hook each, all on SECURITY DEFINER RPCs that check who is asking:
 *
 *   useAm2Exposure        ELE-2049  get_am2_exposure / set_am2_exposure_tag
 *   useCollegeAm2Exposure ELE-2049  get_college_am2_exposure / set_college_am2_exposure_weeks
 *   useNetChecklist       ELE-2050  get_net_am2s_checklist / save_ / sign_ / request_
 *   useGoldCardRoad       ELE-2055  get_gold_card_road / set_gold_card_step
 *   usePlanVersion        ELE-2054  get_learner_plan_version
 *
 * The learner and their tutor read the same RPC, so both see the same answer.
 */
import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { PORTFOLIO_CHANGED_EVENT } from '@/hooks/portfolio/usePortfolio';
import type { EpaRouteKind } from '@/lib/epa/readiness';
import type { Rating } from '@/data/net/am2sV1Checklist';

const rpc = async <T>(fn: string, args: Record<string, unknown>): Promise<T> => {
  const { data, error } = await supabase.rpc(fn as never, args as never);
  if (error) throw new Error(error.message);
  return data as unknown as T;
};

/** Generic loader: data, loading, error, reload; reloads on portfolio changes. */
function useRpc<T>(fn: string, args: Record<string, unknown> | null) {
  const key = args ? JSON.stringify(args) : null;
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!key) {
      setData(null);
      setLoading(false);
      return;
    }
    try {
      const d = await rpc<T>(fn, JSON.parse(key));
      setData(d);
      setError(null);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, [fn, key]);

  useEffect(() => {
    setLoading(true);
    void load();
  }, [load]);

  useEffect(() => {
    const on = () => void load();
    window.addEventListener(PORTFOLIO_CHANGED_EVENT, on);
    return () => window.removeEventListener(PORTFOLIO_CHANGED_EVENT, on);
  }, [load]);

  return { data, loading, error, reload: load, setData };
}

/* ── ELE-2049: AM2 exposure ──────────────────────────────────────────── */

export type ExposureArea = 'safe_isolation' | 'inspection_testing' | 'fault_finding';

export const EXPOSURE_AREAS: {
  key: ExposureArea;
  label: string;
  short: string;
  netTasks: string;
}[] = [
  { key: 'safe_isolation', label: 'Safe isolation', short: 'Isolation', netTasks: 'A1 and C' },
  { key: 'inspection_testing', label: 'Inspection and testing', short: 'I&T', netTasks: 'B' },
  { key: 'fault_finding', label: 'Fault finding', short: 'Faults', netTasks: 'D' },
];

export interface ExposureAreaState {
  area: ExposureArea;
  label: string;
  net_tasks: string;
  count: number;
  count_12w: number;
  last_done: string | null;
  days_since: number | null;
  overdue: boolean;
}

export interface ExposureSource {
  kind: 'evidence' | 'diary';
  id: string;
  title: string;
  date: string;
  tagged: ExposureArea[];
  suggested: ExposureArea[];
}

export interface Am2Exposure {
  learner_id: string;
  weeks: number;
  start_date: string | null;
  areas: ExposureAreaState[];
  sources: ExposureSource[];
  alerts: Array<{
    area: ExposureArea;
    alerted_at: string;
    employer_emailed: boolean;
    tutors: number;
  }>;
  viewer: 'learner' | 'staff';
}

export function useAm2Exposure(learnerId: string | null | undefined) {
  return useRpc<Am2Exposure>('get_am2_exposure', learnerId ? { p_learner: learnerId } : null);
}

export async function setExposureTag(
  kind: 'evidence' | 'diary',
  id: string,
  area: ExposureArea,
  state: 'tagged' | 'dismissed' | 'none'
) {
  return rpc<{ ok: boolean }>('set_am2_exposure_tag', {
    p_source_kind: kind,
    p_source_id: id,
    p_area: area,
    p_state: state,
  });
}

export interface CollegeExposureRow {
  student_id: string;
  user_id: string;
  name: string;
  cohort: string | null;
  employer: string | null;
  start_date: string | null;
  areas: Record<ExposureArea, { count: number; last_done: string | null; overdue: boolean }>;
  overdue_count: number;
}

export function useCollegeAm2Exposure(collegeId: string | null | undefined) {
  return useRpc<{ weeks: number; can_set_weeks: boolean; learners: CollegeExposureRow[] }>(
    'get_college_am2_exposure',
    collegeId ? { p_college: collegeId } : null
  );
}

export async function setCollegeExposureWeeks(collegeId: string, weeks: number) {
  return rpc<{ ok: boolean }>('set_college_am2_exposure_weeks', {
    p_college: collegeId,
    p_weeks: weeks,
  });
}

/* ── ELE-2050: NET's AM2S v1 checklist ───────────────────────────────── */

export type SignKind = 'candidate' | 'employer' | 'provider';

export interface NetSignature {
  id: string;
  signer_name: string | null;
  signer_company: string | null;
  signed_at: string | null;
  signature_image: string | null;
  stale: boolean;
  pending_link: boolean;
  token: string | null;
  token_expires_at: string | null;
  requested_by_name: string | null;
}

export interface NetChecklistState {
  context: {
    route: string;
    assessment: string | null;
    standard_code: string | null;
    college_student_id: string | null;
    college_name: string | null;
    learner_name: string | null;
    uln: string | null;
    ni_number: string | null;
    start_date: string | null;
    employer_name: string | null;
    employer_contact: string | null;
    applicable: boolean;
    not_applicable_reason: string | null;
  };
  checklist: {
    id: string;
    registered_version: '1.1' | '1.2' | null;
    ni_number: string | null;
    uln: string | null;
    ratings: Record<string, { k?: Rating; e?: Rating }>;
    action_plan: string | null;
    cert_delivery: 'employer' | 'apprentice' | null;
    cert_recipient_name: string | null;
    cert_organisation: string | null;
    cert_address: string | null;
    cert_postcode: string | null;
    updated_at: string;
  } | null;
  signatures: Partial<Record<SignKind, NetSignature>>;
  gaps: { unrated: string[]; below: string[] };
  ready_to_sign: boolean;
  all_signed: boolean;
  apply_by: string | null;
  statements: Record<SignKind, string>;
  viewer: 'learner' | 'staff';
  can_sign_provider: boolean;
}

export function useNetChecklist(learnerId: string | null | undefined) {
  return useRpc<NetChecklistState>(
    'get_net_am2s_checklist',
    learnerId ? { p_learner: learnerId } : null
  );
}

type Result = { success?: boolean; error?: string };

export async function saveNetChecklist(learnerId: string, patch: Record<string, unknown>) {
  const r = await rpc<Result>('save_net_am2s_checklist', { p_learner: learnerId, p_patch: patch });
  if (r?.error) throw new Error(r.error);
  return r;
}

export async function signNetChecklist(
  learnerId: string,
  kind: 'candidate' | 'provider',
  name: string,
  signature: string
) {
  const r = await rpc<Result>('sign_net_am2s_checklist', {
    p_learner: learnerId,
    p_kind: kind,
    p_name: name,
    p_signature: signature,
  });
  if (r?.error) throw new Error(r.error);
  return r;
}

export async function requestNetEmployerSignature(learnerId: string) {
  const r = await rpc<Result & { token?: string; employer_email?: string | null }>(
    'request_net_am2s_employer_signature',
    { p_learner: learnerId }
  );
  if (r?.error) throw new Error(r.error);
  return r;
}

/* ── ELE-2055: road to Gold Card ─────────────────────────────────────── */

export interface GoldCardState {
  viewer: 'learner' | 'staff';
  route: string;
  assessment: string | null;
  nation: string | null;
  college_epa: { result: string; epa_date: string | null } | null;
  steps: Record<string, { done_on: string; note: string | null }>;
}

export function useGoldCardRoad(learnerId: string | null | undefined) {
  return useRpc<GoldCardState>('get_gold_card_road', learnerId ? { p_learner: learnerId } : null);
}

export async function setGoldCardStep(
  step: string,
  done: boolean,
  doneOn?: string | null,
  note?: string | null
) {
  const r = await rpc<Result>('set_gold_card_step', {
    p_step: step,
    p_done: done,
    p_done_on: doneOn ?? null,
    p_note: note ?? null,
  });
  if (r?.error) throw new Error(r.error);
  return r;
}

/* ── ELE-2054: assessment plan version by start date ─────────────────── */

export interface PlanVersion {
  learner_id: string;
  start_date: string | null;
  as_of: string | null;
  route: string;
  status: 'current' | 'revised_plan' | 'no_start_date' | 'no_standard' | 'no_version_for_date';
  standard: {
    code: string;
    version?: string;
    title: string;
    effective_from?: string | null;
    effective_to?: string | null;
    source?: string;
    source_url?: string | null;
  } | null;
  end_assessment: {
    assessment_code: string;
    assessment_version: string | null;
    registered_from: string | null;
    registered_to: string | null;
    source: string;
    source_url: string | null;
  } | null;
  qualification: { code: string; version_label: string | null } | null;
  gaps: string[];
}

export function usePlanVersion(learnerId: string | null | undefined) {
  return useRpc<PlanVersion>(
    'get_learner_plan_version',
    learnerId ? { p_user_id: learnerId } : null
  );
}

/**
 * The route the AM2 task list should follow, given the plan version. The
 * task lists loaded are NET's AM2S v1 (and the AM2). A learner whose start
 * date puts them on the original AM2S (before Sept 2023) or on the revised
 * ST0152 plan (from 17 Dec 2026, end assessment not recorded) is not shown
 * the AM2S v1 tasks: 'none' makes the task list say it is not loaded.
 */
export function routeForPlan(kind: EpaRouteKind, plan: PlanVersion | null): EpaRouteKind {
  if (kind !== 'am2s' || !plan) return kind;
  if (plan.status === 'no_start_date' || plan.status === 'no_standard') return kind;
  const ea = plan.end_assessment;
  if (!ea || ea.assessment_code !== 'AM2S' || ea.assessment_version !== 'v1')
    return 'none' as EpaRouteKind;
  return kind;
}
