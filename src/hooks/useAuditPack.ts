import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { getMyCollegeId } from '@/lib/myCollege';

/* ==========================================================================
   useAuditPack — single-snapshot aggregate of everything an Ofsted/EQA pack
   needs: college info, Single Central Record rows, policies + per-policy
   acknowledgement logs, staff compliance matrix. RLS scopes everything to
   the caller's college via _ch_same_college.
   ========================================================================== */

export interface AuditPackCollege {
  id: string;
  name: string;
  code: string | null;
  address: string | null;
}

export interface AuditPackOfficer {
  user_id: string;
  name: string;
  role: string;
  email: string | null;
}

export interface ScrRow {
  college_staff_id: string;
  staff_name: string;
  staff_role: string;
  department: string | null;
  requirement_code: string;
  requirement_label: string;
  category: string;
  computed_status: 'valid' | 'expiring' | 'expired' | 'missing' | 'pending_verification';
  expires_at: string | null;
  reference_no: string | null;
  verified_at: string | null;
  days_to_expiry: number | null;
}

export interface PolicySummary {
  id: string;
  code: string | null;
  title: string;
  category: string;
  status: 'draft' | 'live' | 'archived';
  version: number;
  effective_from: string | null;
  review_due_at: string | null;
  owner_role: string | null;
  requires_acknowledgement: boolean;
  approved_at: string | null;
  ack_count: number;
  ack_target: number;
}

export interface PolicyAckLogEntry {
  staff_id: string;
  staff_name: string;
  staff_role: string;
  department: string | null;
  status: 'signed' | 'outdated' | 'outstanding';
  signed_version: number | null;
  signed_at: string | null;
}

export interface PolicyWithAckLog extends PolicySummary {
  log: PolicyAckLogEntry[];
}

export type IqaVerdict = 'pending' | 'agree' | 'disagree' | 'refer';
export type IqaSampleTargetKind = 'observation' | 'otj' | 'decision' | 'evidence';

/** get_iqa_sampling_rate (ELE-1871): share of assessment decisions an IQA sampled. */
export interface IqaSamplingRate {
  months: number;
  decisions_total: number;
  decisions_sampled: number;
  confirmed: number;
  returned: number;
  rate_pct: number | null;
  assessors_at_target: number;
  assessors_total: number;
  open_actions: number;
  assessors: Array<{
    staff_id: string;
    name: string;
    total: number;
    sampled: number;
    confirmed: number;
    returned: number;
    is_new: boolean;
    target_pct: number | null;
    rate_pct: number | null;
  }>;
}

export interface StandardisationMeetingRow {
  id: string;
  date: string | null;
  topic: string;
  status: string;
  attendees: string[];
  chair: string | null;
  decisions: string | null;
  action_items: string[];
}

/** get_intervention_history (ELE-1909): contact logged from the risk flags. No note bodies. */
export type InterventionMethod = 'call' | 'one_to_one' | 'email' | 'referral' | 'not_recorded';
export interface InterventionHistory {
  months: number;
  total: number;
  learners: number;
  open_next_steps: number;
  by_method: Record<InterventionMethod, number>;
  rows: Array<{
    id: string;
    at: string;
    learner: string;
    method: InterventionMethod;
    title: string | null;
    by: string;
    next_step: string | null;
    next_step_by: string | null;
    next_step_done: boolean;
  }>;
}

export interface IqaSampleAuditRow {
  id: string;
  sampling_plan_id: string;
  plan_period_start: string;
  plan_period_end: string;
  target_kind: IqaSampleTargetKind;
  target_title: string | null;
  target_date: string | null;
  iqa_name_snapshot: string | null;
  sampled_at: string;
  verdict: IqaVerdict;
  comments: string | null;
}

export interface AuditPackData {
  generated_at: string;
  college: AuditPackCollege | null;
  officer: AuditPackOfficer | null;
  scr: ScrRow[];
  policies: PolicyWithAckLog[];
  staff: {
    id: string;
    name: string;
    role: string;
    department: string | null;
    email: string | null;
    archived_at: string | null;
    is_dsl: boolean;
    is_deputy_dsl: boolean;
    is_prevent_lead: boolean;
    is_h_and_s_lead: boolean;
    is_quality_nominee: boolean;
    is_mental_health_lead: boolean;
  }[];
  iqa_samples: IqaSampleAuditRow[];
  /** Null when the caller may not read it (not quality / IQA staff). */
  sampling_rate: IqaSamplingRate | null;
  standardisation: StandardisationMeetingRow[];
  interventions: InterventionHistory | null;
  /** Aggregate counts across all SCR rows for the cover stats. */
  summary: {
    total_staff: number;
    total_scr_rows: number;
    valid: number;
    expiring: number;
    expired: number;
    missing: number;
    pending_verification: number;
    policies_live: number;
    policies_draft: number;
    policies_archived: number;
    iqa_samples_total: number;
    iqa_samples_observation: number;
    iqa_samples_otj: number;
    iqa_samples_agree: number;
    iqa_samples_disagree: number;
    iqa_samples_refer: number;
    iqa_samples_pending: number;
  };
}

interface ScrViewRow {
  college_staff_id: string;
  name: string;
  role: string;
  department: string | null;
  requirement_code: string;
  requirement: string;
  category: string;
  computed_status: ScrRow['computed_status'];
  expires_at: string | null;
  reference_no: string | null;
  verified_at: string | null;
  days_to_expiry: number | null;
}

interface RawPolicy {
  id: string;
  code: string | null;
  title: string;
  category: string;
  status: PolicySummary['status'];
  version: number;
  effective_from: string | null;
  review_due_at: string | null;
  owner_role: string | null;
  requires_acknowledgement: boolean;
  approved_at: string | null;
}

interface RawAck {
  policy_id: string;
  user_id: string;
  policy_version: number;
  acknowledged_at: string;
}

interface RawStaff {
  id: string;
  name: string;
  role: string;
  department: string | null;
  email: string | null;
  user_id: string | null;
  archived_at: string | null;
  is_dsl: boolean;
  is_deputy_dsl: boolean;
  is_prevent_lead: boolean;
  is_h_and_s_lead: boolean;
  is_quality_nominee: boolean;
  is_mental_health_lead: boolean;
}

const SCR_COLS =
  'college_staff_id, name, role, department, requirement_code, requirement, category, computed_status, expires_at, reference_no, verified_at, days_to_expiry';

const POLICY_COLS =
  'id, code, title, category, status, version, effective_from, review_due_at, owner_role, requires_acknowledgement, approved_at';

const STAFF_COLS =
  'id, name, role, department, email, user_id, archived_at, is_dsl, is_deputy_dsl, is_prevent_lead, is_h_and_s_lead, is_quality_nominee, is_mental_health_lead';

export function useAuditPack() {
  const [data, setData] = useState<AuditPackData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // 1. Resolve current user → profile → college
      const { data: userRes } = await supabase.auth.getUser();
      const userId = userRes.user?.id ?? null;
      let collegeId: string | null = null;
      let officer: AuditPackOfficer | null = null;
      if (userId) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name, role')
          .eq('id', userId)
          .maybeSingle();
        collegeId = await getMyCollegeId(userId);
        if (profile) {
          officer = {
            user_id: userId,
            name: (profile.full_name as string | null) ?? 'Unknown',
            role: (profile.role as string | null) ?? '',
            // profiles has no email column (selecting it 400'd and dropped the
            // officer + college scope); the auth user carries it.
            email: userRes.user?.email ?? null,
          };
        }
      }

      // 2. Fetch all the bits in parallel
      const staffQuery = supabase
        .from('college_staff')
        .select(STAFF_COLS)
        .is('archived_at', null)
        .order('name');
      if (collegeId) staffQuery.eq('college_id', collegeId);

      const collegeQuery = collegeId
        ? supabase
            .from('colleges')
            .select('id, name, code, address')
            .eq('id', collegeId)
            .maybeSingle()
        : Promise.resolve({ data: null, error: null } as const);

      // IQA samples query — pulls every IQA verdict on observation OR OTJ in
      // this college. Implemented as a two-step lookup because RLS scopes
      // sample rows via their parent plan's college_id, not directly on the
      // sample row, so we resolve plan_ids first and filter by them.
      const iqaPlansQuery = collegeId
        ? supabase
            .from('college_iqa_sampling')
            .select('id, period_start, period_end, assessor_id, iqa_name_snapshot')
            .eq('college_id', collegeId)
        : Promise.resolve({ data: [], error: null } as const);

      const none = Promise.resolve({ data: null, error: null } as const);
      const rateQuery = collegeId
        ? supabase.rpc(
            'get_iqa_sampling_rate' as never,
            { p_college: collegeId, p_months: 12 } as never
          )
        : none;
      const interventionsQuery = collegeId
        ? supabase.rpc(
            'get_intervention_history' as never,
            { p_college: collegeId, p_months: 12 } as never
          )
        : none;
      const meetingsQuery = collegeId
        ? supabase
            .from('college_standardisation_meetings')
            .select(
              'id, date, scheduled_at, topic, status, attendee_ids, attendees_count, chair_id, decisions, outcome, action_items'
            )
            .eq('college_id', collegeId)
            .order('date', { ascending: false })
        : Promise.resolve({ data: [], error: null } as const);

      const [
        scrRes,
        policiesRes,
        acksRes,
        staffRes,
        collegeRes,
        iqaPlansRes,
        rateRes,
        interventionsRes,
        meetingsRes,
      ] = await Promise.all([
        supabase.from('v_single_central_record').select(SCR_COLS),
        supabase
          .from('college_policies')
          .select(POLICY_COLS)
          .order('status', { ascending: true })
          .order('updated_at', { ascending: false }),
        supabase
          .from('policy_acknowledgements')
          .select('policy_id, user_id, policy_version, acknowledged_at')
          .order('acknowledged_at', { ascending: false }),
        staffQuery,
        collegeQuery,
        iqaPlansQuery,
        rateQuery,
        interventionsQuery,
        meetingsQuery,
      ]);

      if (scrRes.error) throw scrRes.error;
      if (policiesRes.error) throw policiesRes.error;
      if (acksRes.error) throw acksRes.error;
      if (staffRes.error) throw staffRes.error;

      const scrRows: ScrViewRow[] = (scrRes.data ?? []) as ScrViewRow[];
      const rawPolicies: RawPolicy[] = (policiesRes.data ?? []) as RawPolicy[];
      const rawAcks: RawAck[] = (acksRes.data ?? []) as RawAck[];
      const rawStaff: RawStaff[] = (staffRes.data ?? []) as RawStaff[];

      // 3. Map SCR rows to public shape
      const scr: ScrRow[] = scrRows.map((r) => ({
        college_staff_id: r.college_staff_id,
        staff_name: r.name,
        staff_role: r.role,
        department: r.department,
        requirement_code: r.requirement_code,
        requirement_label: r.requirement,
        category: r.category,
        computed_status: r.computed_status,
        expires_at: r.expires_at,
        reference_no: r.reference_no,
        verified_at: r.verified_at,
        days_to_expiry: r.days_to_expiry,
      }));

      // 4. Build per-policy ack log
      const ackTarget = rawStaff.length;
      const acksByPolicy = new Map<string, RawAck[]>();
      for (const a of rawAcks) {
        const list = acksByPolicy.get(a.policy_id) ?? [];
        list.push(a);
        acksByPolicy.set(a.policy_id, list);
      }

      const policies: PolicyWithAckLog[] = rawPolicies.map((p) => {
        const policyAcks = acksByPolicy.get(p.id) ?? [];
        const latestByUser = new Map<string, RawAck>();
        for (const a of policyAcks) {
          const existing = latestByUser.get(a.user_id);
          if (!existing || a.acknowledged_at > existing.acknowledged_at) {
            latestByUser.set(a.user_id, a);
          }
        }

        const ackCount = policyAcks.filter((a) => a.policy_version === p.version).length;

        const log: PolicyAckLogEntry[] = rawStaff.map((s) => {
          const ack = s.user_id ? latestByUser.get(s.user_id) : undefined;
          let status: PolicyAckLogEntry['status'] = 'outstanding';
          if (ack) {
            status = ack.policy_version === p.version ? 'signed' : 'outdated';
          }
          return {
            staff_id: s.id,
            staff_name: s.name,
            staff_role: s.role,
            department: s.department,
            status,
            signed_version: ack?.policy_version ?? null,
            signed_at: ack?.acknowledged_at ?? null,
          };
        });

        return {
          ...p,
          ack_count: ackCount,
          ack_target: ackTarget,
          log,
        };
      });

      // 5. IQA samples — second-step query: now we have the plan ids,
      //    fetch every sample row that targets either an observation or
      //    an OTJ entry under one of OUR plans. Pre-existing IqaSamples
      //    contains both observation and otj rows (mutually exclusive).
      const rawPlans = (iqaPlansRes.data ?? []) as Array<{
        id: string;
        period_start: string;
        period_end: string;
        iqa_name_snapshot: string | null;
      }>;
      const planById = new Map(rawPlans.map((p) => [p.id, p]));
      const planIds = rawPlans.map((p) => p.id);

      let iqaSamples: IqaSampleAuditRow[] = [];
      if (planIds.length > 0) {
        const { data: samplesData, error: samplesErr } = await supabase
          .from('college_iqa_samples')
          .select(
            'id, sampling_plan_id, observation_id, observation_title_snapshot, observation_date_snapshot, otj_id, otj_title_snapshot, otj_date_snapshot, decision_id, portfolio_item_id, target_title_snapshot, target_date_snapshot, iqa_name_snapshot, sampled_at, verdict, comments'
          )
          .in('sampling_plan_id', planIds)
          .order('sampled_at', { ascending: false });
        if (samplesErr) throw samplesErr;
        const raw = (samplesData ?? []) as unknown as Array<{
          id: string;
          sampling_plan_id: string;
          observation_id: string | null;
          observation_title_snapshot: string | null;
          observation_date_snapshot: string | null;
          otj_id: string | null;
          otj_title_snapshot: string | null;
          otj_date_snapshot: string | null;
          decision_id: string | null;
          portfolio_item_id: string | null;
          target_title_snapshot: string | null;
          target_date_snapshot: string | null;
          iqa_name_snapshot: string | null;
          sampled_at: string;
          verdict: IqaVerdict;
          comments: string | null;
        }>;
        iqaSamples = raw.map((s) => {
          const plan = planById.get(s.sampling_plan_id);
          const isOtj = Boolean(s.otj_id);
          const kind: IqaSampleTargetKind = isOtj
            ? 'otj'
            : s.decision_id
              ? 'decision'
              : s.portfolio_item_id
                ? 'evidence'
                : 'observation';
          const isTarget = kind === 'decision' || kind === 'evidence';
          return {
            id: s.id,
            sampling_plan_id: s.sampling_plan_id,
            plan_period_start: plan?.period_start ?? '',
            plan_period_end: plan?.period_end ?? '',
            target_kind: kind,
            target_title: isOtj
              ? s.otj_title_snapshot
              : isTarget
                ? s.target_title_snapshot
                : s.observation_title_snapshot,
            target_date: isOtj
              ? s.otj_date_snapshot
              : isTarget
                ? s.target_date_snapshot
                : s.observation_date_snapshot,
            iqa_name_snapshot: s.iqa_name_snapshot ?? plan?.iqa_name_snapshot ?? null,
            sampled_at: s.sampled_at,
            verdict: s.verdict,
            comments: s.comments,
          };
        });
      }

      // 6. Sampling rate, standardisation record, intervention history.
      //    The two RPCs refuse callers without quality access: show nothing
      //    rather than fail the whole pack.
      const staffNameById = new Map(rawStaff.map((s) => [s.id, s.name]));
      const standardisation: StandardisationMeetingRow[] = (
        (meetingsRes.data ?? []) as Array<{
          id: string;
          date: string | null;
          scheduled_at: string | null;
          topic: string;
          status: string;
          attendee_ids: string[] | null;
          attendees_count: number | null;
          chair_id: string | null;
          decisions: string | null;
          outcome: string | null;
          action_items: string[] | null;
        }>
      ).map((m) => {
        const names = (m.attendee_ids ?? [])
          .map((id) => staffNameById.get(id))
          .filter((n): n is string => !!n);
        return {
          id: m.id,
          date: m.date ?? m.scheduled_at,
          topic: m.topic,
          status: m.status,
          attendees: names.length
            ? names
            : m.attendees_count
              ? [`${m.attendees_count} people`]
              : [],
          chair: (m.chair_id && staffNameById.get(m.chair_id)) || null,
          decisions: m.decisions ?? m.outcome ?? null,
          action_items: m.action_items ?? [],
        };
      });

      // 7. Summary stats
      const summary = {
        total_staff: rawStaff.length,
        total_scr_rows: scr.length,
        valid: 0,
        expiring: 0,
        expired: 0,
        missing: 0,
        pending_verification: 0,
        policies_live: 0,
        policies_draft: 0,
        policies_archived: 0,
        iqa_samples_total: iqaSamples.length,
        iqa_samples_observation: iqaSamples.filter((s) => s.target_kind === 'observation').length,
        iqa_samples_otj: iqaSamples.filter((s) => s.target_kind === 'otj').length,
        iqa_samples_agree: iqaSamples.filter((s) => s.verdict === 'agree').length,
        iqa_samples_disagree: iqaSamples.filter((s) => s.verdict === 'disagree').length,
        iqa_samples_refer: iqaSamples.filter((s) => s.verdict === 'refer').length,
        iqa_samples_pending: iqaSamples.filter((s) => s.verdict === 'pending').length,
      };
      for (const r of scr) {
        summary[r.computed_status] += 1;
      }
      for (const p of rawPolicies) {
        if (p.status === 'live') summary.policies_live += 1;
        else if (p.status === 'draft') summary.policies_draft += 1;
        else if (p.status === 'archived') summary.policies_archived += 1;
      }

      setData({
        generated_at: new Date().toISOString(),
        college: collegeRes.data
          ? {
              id: (collegeRes.data as { id: string }).id,
              name: (collegeRes.data as { name: string }).name,
              code: (collegeRes.data as { code: string | null }).code ?? null,
              address: (collegeRes.data as { address: string | null }).address ?? null,
            }
          : null,
        officer,
        scr,
        policies,
        staff: rawStaff.map((s) => ({
          id: s.id,
          name: s.name,
          role: s.role,
          department: s.department,
          email: s.email,
          archived_at: s.archived_at,
          is_dsl: s.is_dsl,
          is_deputy_dsl: s.is_deputy_dsl,
          is_prevent_lead: s.is_prevent_lead,
          is_h_and_s_lead: s.is_h_and_s_lead,
          is_quality_nominee: s.is_quality_nominee,
          is_mental_health_lead: s.is_mental_health_lead,
        })),
        iqa_samples: iqaSamples,
        sampling_rate: rateRes.error ? null : ((rateRes.data as IqaSamplingRate | null) ?? null),
        standardisation,
        interventions: interventionsRes.error
          ? null
          : ((interventionsRes.data as InterventionHistory | null) ?? null),
        summary,
      });
    } catch (e) {
      setError((e as Error).message ?? 'Could not build audit pack');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, loading, error, refresh: fetch };
}
