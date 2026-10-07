/**
 * usePortfolio — the one read model for a learner's portfolio (ELE-1917 / ELE-1862).
 *
 *   items       every evidence item with its TYPED criteria (portfolio_item_criteria,
 *               ELE-1864), each criterion's honest state, its submission, witnesses,
 *               content hash, and the next step the learner should take
 *   ac          per-criterion state from get_portfolio_ac_state (usePortfolioAcState):
 *               the same function the assessor, Student 360 and the export read
 *   headline    passed / total is THE progress figure; claimed and submitted are
 *               separate, smaller figures and never count as progress
 *
 * Works for a learner with no college: the state function falls back to the
 * learner's own qualification, and everything above "claimed" simply stays empty
 * until they invite an assessor.
 *
 * Any surface that changes the portfolio dispatches PORTFOLIO_CHANGED_EVENT and
 * every mounted instance reloads, so the list, coverage and detail never disagree.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import {
  usePortfolioAcState,
  type AcState,
  type AcStateRow,
} from '@/hooks/portfolio/usePortfolioAcState';

export const PORTFOLIO_CHANGED_EVENT = 'elecmate:portfolio-changed';
export const notifyPortfolioChanged = () => {
  if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent(PORTFOLIO_CHANGED_EVENT));
};

export type CriterionSource = 'learner' | 'ai_suggested' | 'assessor';

export interface ItemCriterion {
  unit_code: string;
  ac_code: string;
  source: CriterionSource;
  confidence: number | null;
  ai_reason: string | null;
  /** The criterion's state across the whole portfolio (decision outranks claim). */
  state: AcState;
  ac_text: string | null;
  unit_title: string | null;
  /** True when the current decision for this criterion cites this item. */
  decidedOnThisItem: boolean;
  decision_feedback: string | null;
  assessor_name: string | null;
  /** ELE-1870: the assessor's qualifications when they decided. */
  assessor_qualifications: string[] | null;
  decided_at: string | null;
  /** ELE-1926: AI-drafted feedback the assessor confirmed (shown with its provenance). */
  decision_feedback_source: string | null;
  decision_feedback_confirmed_at: string | null;
}

export interface EvidenceFile {
  url: string;
  name: string;
  type: string;
  sha256?: string;
  evidenceType?: string;
}

export interface ItemWitness {
  id: string;
  token: string;
  status: 'requested' | 'signed' | 'withdrawn' | 'expired';
  witness_email: string | null;
  witness_name: string | null;
  witness_role: string | null;
  witness_company: string | null;
  statement: string | null;
  signed_at: string | null;
  created_at: string;
  expires_at: string;
  statement_hash: string | null;
  evidence_hash: string | null;
}

export interface ItemSubmission {
  id: string;
  status: string;
  submitted_at: string | null;
  open: boolean;
}

/** One state per item, for chips and filters. */
export type ItemState = 'draft' | 'suggested' | 'claimed' | 'submitted' | 'needs_more' | 'passed';

export interface NextStep {
  key:
    | 'add_more'
    | 'add_file'
    | 'confirm'
    | 'claim'
    | 'witness'
    | 'submit'
    | 'waiting'
    | 'done'
    | 'acknowledge';
  label: string;
  /** Whether tapping it is something the learner can do now. */
  actionable: boolean;
}

/**
 * ELE-1873: evidence an assessor recorded by watching the learner work, or in a
 * professional discussion (save_college_observation). The learner reads and
 * acknowledges it; they never edit it.
 */
export interface ItemObservation {
  id: string;
  kind: 'observation' | 'professional_discussion';
  observer_name: string;
  observed_at: string | null;
  observed_time: string | null;
  duration_minutes: number | null;
  location: string | null;
  location_type: string | null;
  outcome: 'passed' | 'partial' | 'referred' | 'not_yet' | null;
  strengths: string | null;
  areas: string | null;
  action_points: string[];
  transcript: string | null;
  follow_up_date: string | null;
  content_hash: string | null;
  acknowledged_at: string | null;
  learner_comment: string | null;
}

export interface PortfolioItemView {
  id: string;
  title: string;
  description: string;
  reflection: string;
  createdAt: string;
  workDate: string | null;
  status: string | null;
  files: EvidenceFile[];
  thumbnail: string | null;
  contentHash: string | null;
  contentHashedAt: string | null;
  metadata: Record<string, unknown>;
  criteria: ItemCriterion[];
  claimed: ItemCriterion[];
  suggested: ItemCriterion[];
  units: string[];
  counts: {
    claimed: number;
    suggested: number;
    submitted: number;
    passed: number;
    needsMore: number;
  };
  submission: ItemSubmission | null;
  witnesses: ItemWitness[];
  witnessed: boolean;
  witnessPending: boolean;
  countersigned: boolean;
  /** Recorded by an assessor (ELE-1873); null for the learner's own evidence. */
  observation: ItemObservation | null;
  state: ItemState;
  next: NextStep;
}

const OPEN = new Set(['submitted', 'resubmitted', 'under_review']);
const PASSED = new Set<AcState>(['passed', 'iqa_confirmed']);
const NEEDS = new Set<AcState>(['referred', 'not_yet', 'iqa_rejected']);
const IMG = /\.(jpe?g|png|webp|heic|gif)(\?|$)/i;

interface ItemRow {
  id: string;
  title: string;
  description: string | null;
  reflection_notes: string | null;
  created_at: string;
  status: string | null;
  storage_urls: unknown;
  file_url: string | null;
  metadata: unknown;
  content_hash: string | null;
  content_hashed_at: string | null;
}
interface CritRow {
  portfolio_item_id: string;
  unit_code: string;
  ac_code: string;
  source: CriterionSource;
  confidence: number | null;
  ai_reason: string | null;
}
interface SubItemRow {
  portfolio_item_id: string;
  submission_id: string;
  portfolio_submissions: { id: string; status: string | null; submitted_at: string | null } | null;
}

function filesOf(row: ItemRow): EvidenceFile[] {
  const list = Array.isArray(row.storage_urls)
    ? (row.storage_urls as Record<string, unknown>[])
    : [];
  const out: EvidenceFile[] = list
    .filter((f) => f && typeof f.url === 'string')
    .map((f) => ({
      url: f.url as string,
      name: (f.name as string) || 'File',
      type: (f.type as string) || '',
      sha256: (f.sha256 as string) || undefined,
      evidenceType: (f.evidenceType as string) || undefined,
    }));
  if (out.length === 0 && row.file_url)
    out.push({ url: row.file_url, name: 'Attachment', type: '' });
  return out;
}

const isImage = (f: EvidenceFile) => (f.type ? f.type.startsWith('image') : IMG.test(f.url));

function observationOf(
  meta: Record<string, unknown>,
  ack: { at: string | null; comment: string | null } | undefined
): ItemObservation | null {
  if (meta.source !== 'college_observation') return null;
  const o = (meta.observation ?? {}) as Record<string, unknown>;
  const str = (v: unknown) => (typeof v === 'string' && v.trim() ? v : null);
  return {
    id: String(o.id ?? ''),
    kind: o.kind === 'professional_discussion' ? 'professional_discussion' : 'observation',
    observer_name: str(o.observer_name) ?? 'Your assessor',
    observed_at: str(o.observed_at),
    observed_time: str(o.observed_time),
    duration_minutes: typeof o.duration_minutes === 'number' ? o.duration_minutes : null,
    location: str(o.location),
    location_type: str(o.location_type),
    outcome: (str(o.outcome) as ItemObservation['outcome']) ?? null,
    strengths: str(o.strengths),
    areas: str(o.areas),
    action_points: Array.isArray(o.action_points)
      ? (o.action_points as string[]).filter(Boolean)
      : [],
    transcript: str(o.transcript),
    follow_up_date: str(o.follow_up_date),
    content_hash: str(o.content_hash),
    acknowledged_at: ack?.at ?? null,
    learner_comment: ack?.comment ?? null,
  };
}

function deriveNext(
  v: Omit<PortfolioItemView, 'next' | 'state'>,
  state: ItemState,
  hasCollegeOrAssessor: boolean
): NextStep {
  const needs = v.claimed.find((c) => NEEDS.has(c.state));
  if (v.observation) {
    const who = v.observation.observer_name.split(' ')[0] || 'your assessor';
    if (!v.observation.acknowledged_at) {
      return {
        key: 'acknowledge',
        label: `Read and acknowledge what ${who} recorded`,
        actionable: true,
      };
    }
    if (needs) {
      return {
        key: 'add_more',
        label: `Add more for ${needs.unit_code} AC ${needs.ac_code}`,
        actionable: true,
      };
    }
    if (state === 'passed') return { key: 'done', label: 'Passed', actionable: false };
    return { key: 'waiting', label: `With ${who} for a decision`, actionable: false };
  }
  if (needs) {
    return {
      key: 'add_more',
      label: `Add more for ${needs.unit_code} AC ${needs.ac_code}, then send again`,
      actionable: true,
    };
  }
  if (state === 'passed') return { key: 'done', label: 'Passed', actionable: false };
  if (v.files.length === 0 && !v.description.trim()) {
    return { key: 'add_file', label: 'Add a photo or document', actionable: true };
  }
  if (v.claimed.length === 0 && v.suggested.length > 0) {
    return {
      key: 'confirm',
      label: `Check ${v.suggested.length} suggested ${v.suggested.length === 1 ? 'criterion' : 'criteria'}`,
      actionable: true,
    };
  }
  if (v.claimed.length === 0)
    return { key: 'claim', label: 'Claim the criteria this shows', actionable: true };
  if (v.submission?.open) return { key: 'waiting', label: 'With your assessor', actionable: false };
  const namedWitness = (v.metadata?.witness as { name?: string } | undefined)?.name;
  if (!v.witnessed && !v.witnessPending && namedWitness) {
    return { key: 'witness', label: `Ask ${namedWitness} to sign`, actionable: true };
  }
  const unit = v.units[0];
  if (!hasCollegeOrAssessor) {
    return { key: 'submit', label: 'Invite an assessor to review this', actionable: true };
  }
  return {
    key: 'submit',
    label: unit ? `Submit for unit ${unit}` : 'Submit for assessment',
    actionable: true,
  };
}

export function usePortfolio(learnerIdArg?: string | null, opts: { withHours?: boolean } = {}) {
  const { user } = useAuth();
  const learnerId = learnerIdArg ?? user?.id ?? null;
  const ac = usePortfolioAcState(learnerId);

  const [itemRows, setItemRows] = useState<ItemRow[]>([]);
  const [critRows, setCritRows] = useState<CritRow[]>([]);
  const [subRows, setSubRows] = useState<SubItemRow[]>([]);
  const [witnessRows, setWitnessRows] = useState<
    (ItemWitness & { portfolio_item_id: string | null })[]
  >([]);
  const [countersignedIds, setCountersignedIds] = useState<Set<string>>(new Set());
  const [assessorLinks, setAssessorLinks] = useState(0);
  // ELE-1897: on a college roll (someone there can assess) or not. Having a
  // course chosen is not the same thing: a learner with no college must be
  // told to invite an assessor, not to "Submit for unit 113".
  const [inCollege, setInCollege] = useState<boolean | null>(null);
  useEffect(() => {
    if (!learnerId) return;
    let live = true;
    void supabase
      .from('college_students')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', learnerId)
      .then(({ count, error }) => {
        if (live) setInCollege(error ? null : (count ?? 0) > 0);
      });
    return () => {
      live = false;
    };
  }, [learnerId]);
  const [obsAcks, setObsAcks] = useState<
    Map<string, { at: string | null; comment: string | null }>
  >(new Map());
  const [hours, setHours] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const seq = useRef(0);

  const load = useCallback(async () => {
    const mine = ++seq.current;
    if (!learnerId) {
      setItemRows([]);
      setLoading(false);
      return;
    }
    const [items, crit, subs, wit, ver, links, otj, obs] = await Promise.all([
      supabase
        .from('portfolio_items')
        .select(
          'id, title, description, reflection_notes, created_at, status, storage_urls, file_url, metadata, content_hash, content_hashed_at'
        )
        .eq('user_id', learnerId)
        .order('created_at', { ascending: false }),
      supabase
        .from('portfolio_item_criteria' as never)
        .select('portfolio_item_id, unit_code, ac_code, source, confidence, ai_reason')
        .eq('learner_id', learnerId),
      supabase
        .from('portfolio_submission_items' as never)
        .select(
          'portfolio_item_id, submission_id, portfolio_submissions!inner(id, status, submitted_at, user_id)'
        )
        .eq('portfolio_submissions.user_id', learnerId),
      supabase
        .from('portfolio_witness_statements' as never)
        .select(
          'id, token, status, portfolio_item_id, witness_email, witness_name, witness_role, witness_company, statement, signed_at, created_at, expires_at, statement_hash, evidence_hash'
        )
        .eq('learner_id', learnerId)
        .order('created_at', { ascending: false }),
      supabase
        .from('supervisor_verifications')
        .select('portfolio_item_id')
        .eq('requested_by', learnerId)
        .not('verified_at', 'is', null),
      supabase
        .from('portfolio_assessor_links' as never)
        .select('id', { count: 'exact', head: true })
        .eq('learner_id', learnerId)
        .eq('status', 'active'),
      opts.withHours
        ? supabase.rpc('get_otj_summary' as never, { p_user: learnerId } as never)
        : Promise.resolve({ data: null, error: null }),
      supabase
        .from('college_observations')
        .select('portfolio_item_id, learner_acknowledged_at, learner_comment' as never)
        .eq('learner_user_id' as never, learnerId as never)
        .not('portfolio_item_id' as never, 'is', null),
    ]);
    if (mine !== seq.current) return;
    setLoading(false);
    if (items.error) {
      setError(items.error.message);
      return;
    }
    setError(null);
    setItemRows((items.data ?? []) as unknown as ItemRow[]);
    setCritRows((crit.data ?? []) as unknown as CritRow[]);
    setSubRows((subs.data ?? []) as unknown as SubItemRow[]);
    setWitnessRows(
      (wit.data ?? []) as unknown as (ItemWitness & { portfolio_item_id: string | null })[]
    );
    setCountersignedIds(
      new Set(
        ((ver.data ?? []) as { portfolio_item_id: string | null }[])
          .map((v) => v.portfolio_item_id)
          .filter((x): x is string => !!x)
      )
    );
    setAssessorLinks(links.count ?? 0);
    setObsAcks(
      new Map(
        (
          (obs.data ?? []) as unknown as {
            portfolio_item_id: string;
            learner_acknowledged_at: string | null;
            learner_comment: string | null;
          }[]
        ).map((o) => [
          o.portfolio_item_id,
          { at: o.learner_acknowledged_at, comment: o.learner_comment },
        ])
      )
    );
    setHours((otj.data as Record<string, unknown> | null) ?? null);
  }, [learnerId, opts.withHours]);

  useEffect(() => {
    setLoading(true);
    void load();
  }, [load]);

  const refreshAll = useCallback(async () => {
    await Promise.all([load(), ac.refresh()]);
  }, [load, ac]);

  // One change anywhere reloads every instance.
  const refreshRef = useRef(refreshAll);
  refreshRef.current = refreshAll;
  useEffect(() => {
    const on = () => void refreshRef.current();
    window.addEventListener(PORTFOLIO_CHANGED_EVENT, on);
    return () => window.removeEventListener(PORTFOLIO_CHANGED_EVENT, on);
  }, []);

  const acByKey = useMemo(() => {
    const m = new Map<string, AcStateRow>();
    for (const r of ac.rows) m.set(`${r.unit_code}|${r.ac_code}`, r);
    return m;
  }, [ac.rows]);

  /** A college roll row or an active independent assessor means "Submit" reaches someone. */
  const hasAssessor =
    assessorLinks > 0 || ac.rows.some((r) => !!r.decision_id) || subRows.length > 0;

  const items = useMemo<PortfolioItemView[]>(() => {
    const critByItem = new Map<string, CritRow[]>();
    for (const c of critRows) {
      const list = critByItem.get(c.portfolio_item_id) ?? [];
      list.push(c);
      critByItem.set(c.portfolio_item_id, list);
    }
    const subByItem = new Map<string, ItemSubmission>();
    for (const s of subRows) {
      const sub = s.portfolio_submissions;
      if (!sub) continue;
      const prev = subByItem.get(s.portfolio_item_id);
      const cand: ItemSubmission = {
        id: sub.id,
        status: sub.status ?? 'submitted',
        submitted_at: sub.submitted_at,
        open: OPEN.has(sub.status ?? 'submitted'),
      };
      if (!prev || (cand.submitted_at ?? '') > (prev.submitted_at ?? ''))
        subByItem.set(s.portfolio_item_id, cand);
    }
    const witByItem = new Map<string, ItemWitness[]>();
    for (const w of witnessRows) {
      if (!w.portfolio_item_id || w.status === 'withdrawn') continue;
      const list = witByItem.get(w.portfolio_item_id) ?? [];
      list.push(w);
      witByItem.set(w.portfolio_item_id, list);
    }

    return itemRows.map((row) => {
      const files = filesOf(row);
      const meta =
        row.metadata && typeof row.metadata === 'object' && !Array.isArray(row.metadata)
          ? (row.metadata as Record<string, unknown>)
          : {};
      const criteria: ItemCriterion[] = (critByItem.get(row.id) ?? [])
        .map((c) => {
          const st = acByKey.get(`${c.unit_code}|${c.ac_code}`);
          // A suggestion never carries the criterion's state: it is not a claim.
          const state: AcState =
            c.source === 'ai_suggested' ? 'suggested' : ((st?.state as AcState) ?? 'claimed');
          return {
            unit_code: c.unit_code,
            ac_code: c.ac_code,
            source: c.source,
            confidence: c.confidence,
            ai_reason: c.ai_reason,
            state,
            ac_text: st?.ac_text ?? null,
            unit_title: st?.unit_title ?? null,
            decidedOnThisItem: !!st?.decision_id && (st.evidence_item_ids ?? []).includes(row.id),
            decision_feedback: st?.decision_feedback ?? null,
            assessor_name: st?.assessor_name ?? null,
            assessor_qualifications: st?.assessor_qualifications ?? null,
            decided_at: st?.decided_at ?? null,
            decision_feedback_source: st?.decision_feedback_source ?? null,
            decision_feedback_confirmed_at: st?.decision_feedback_confirmed_at ?? null,
          };
        })
        .sort((a, b) =>
          `${a.unit_code} ${a.ac_code}`.localeCompare(`${b.unit_code} ${b.ac_code}`, undefined, {
            numeric: true,
          })
        );
      const claimed = criteria.filter((c) => c.source !== 'ai_suggested');
      const suggested = criteria.filter((c) => c.source === 'ai_suggested');
      const submission = subByItem.get(row.id) ?? null;
      const witnesses = witByItem.get(row.id) ?? [];
      const counts = {
        claimed: claimed.length,
        suggested: suggested.length,
        submitted: claimed.filter((c) => c.state === 'submitted').length,
        passed: claimed.filter((c) => PASSED.has(c.state)).length,
        needsMore: claimed.filter((c) => NEEDS.has(c.state)).length,
      };
      const state: ItemState =
        counts.needsMore > 0
          ? 'needs_more'
          : counts.claimed > 0 && counts.passed === counts.claimed
            ? 'passed'
            : submission?.open
              ? 'submitted'
              : counts.claimed > 0
                ? 'claimed'
                : counts.suggested > 0
                  ? 'suggested'
                  : 'draft';
      const base = {
        id: row.id,
        title: row.title,
        description: row.description ?? '',
        reflection: row.reflection_notes ?? '',
        createdAt: row.created_at,
        workDate: (meta.workDate as string) ?? null,
        status: row.status,
        files,
        thumbnail: files.find(isImage)?.url ?? null,
        contentHash: row.content_hash,
        contentHashedAt: row.content_hashed_at,
        metadata: meta,
        criteria,
        claimed,
        suggested,
        units: [...new Set(claimed.map((c) => c.unit_code))],
        counts,
        submission,
        witnesses,
        witnessed: witnesses.some((w) => w.status === 'signed'),
        witnessPending: witnesses.some((w) => w.status === 'requested'),
        countersigned: countersignedIds.has(row.id),
        observation: observationOf(meta, obsAcks.get(row.id)),
      };
      return {
        ...base,
        state,
        next: deriveNext(base, state, hasAssessor || (inCollege ?? ac.rows.length > 0)),
      };
    });
  }, [
    itemRows,
    critRows,
    subRows,
    witnessRows,
    countersignedIds,
    acByKey,
    hasAssessor,
    ac.rows.length,
    obsAcks,
    inCollege,
  ]);

  /** The headline: passed over total. Claimed and submitted are separate, smaller figures. */
  const headline = useMemo(() => {
    const t = ac.totals;
    const passed = t.passed + t.iqa_confirmed;
    return {
      total: t.total,
      passed,
      percent: t.total > 0 ? Math.round((passed / t.total) * 100) : 0,
      claimed: t.claimed,
      submitted: t.submitted,
      needsMore: t.referred + t.not_yet + t.iqa_rejected,
      suggested: t.suggested,
      iqaConfirmed: t.iqa_confirmed,
      notStarted: t.not_started,
    };
  }, [ac.totals]);

  const qualificationCode = ac.rows[0]?.qualification_code ?? null;

  return {
    learnerId,
    loading: loading || ac.loading,
    error: error ?? ac.error,
    items,
    ac,
    headline,
    qualificationCode,
    hasAssessor,
    /** Submitting reaches someone: a college roll or an assessor (ELE-1897). */
    canReachAssessor: hasAssessor || inCollege === true,
    assessorLinks,
    hours,
    refresh: refreshAll,
  };
}

export type UsePortfolioResult = ReturnType<typeof usePortfolio>;
