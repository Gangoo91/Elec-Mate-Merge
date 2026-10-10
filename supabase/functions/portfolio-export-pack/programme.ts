// deno-lint-ignore-file no-explicit-any
/**
 * portfolio-export-pack — the programme record in the evidence pack (10 Oct 2026).
 *
 * What the rules expect a portfolio to carry, read from what the app already
 * holds: assessor observations, progress reviews, the signed training plan,
 * the starting point and prior learning, English and maths, the employer's
 * behaviour verification, IQA sampling, assessment plans, results, feedback
 * threads and the learning plan.
 *
 * Sources: City & Guilds 5357 handbook v2.8 (unit 102: two observations, at
 * least one face to face); Apprenticeship funding rules 2026/27 v3 paras
 * 100–103 (training plan, delivered sign-off, progress reviews every 3
 * calendar months) and 347–349 (evidence kept).
 *
 * Never in the pack: safeguarding, wellbeing or "concerns" text, learning
 * support / LDD fields, ILR equality fields, contact emails, phone numbers,
 * network addresses or link tokens. The apprentice's own copy also leaves out
 * prices and the provider's IQA findings about its assessors.
 */
import type { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

type Row = Record<string, any>;

export interface ProgrammeRecord {
  observations: Row[];
  reviews: Row[];
  reviewActions: Row[];
  trainingPlans: Row[];
  planSignatures: Row[];
  startingPoint: Row | null;
  iqaSamples: Row[];
  iqaFindings: Row[];
  acSignoffs: Row[];
  assessmentPlans: Row[];
  grades: Row[];
  /** college_grades.assessed_by → name */
  gradeMarkers: Record<string, string>;
  comments: Row[];
  ilp: Row | null;
  ilpVersions: number;
  ilpGoals: Row[];
  reviewFrequencyMonths: number;
  studentStatus: string | null;
  /** Tables that could not be read when the pack was made. */
  unread: string[];
}

export const emptyProgramme = (): ProgrammeRecord => ({
  observations: [],
  reviews: [],
  reviewActions: [],
  trainingPlans: [],
  planSignatures: [],
  startingPoint: null,
  iqaSamples: [],
  iqaFindings: [],
  acSignoffs: [],
  assessmentPlans: [],
  grades: [],
  gradeMarkers: {},
  comments: [],
  ilp: null,
  ilpVersions: 0,
  ilpGoals: [],
  reviewFrequencyMonths: 3,
  studentStatus: null,
  unread: [],
});

// ── Loading ─────────────────────────────────────────────────────────────────

/** A read that never sinks the pack: on error the section says it could not be read. */
async function soft(
  p: PromiseLike<{ data: unknown; error: any }>,
  what: string,
  unread: string[]
): Promise<Row[]> {
  try {
    const { data, error } = await p;
    if (error) {
      console.warn(`[portfolio-export-pack] ${what}:`, error.message ?? error);
      unread.push(what);
      return [];
    }
    return Array.isArray(data) ? (data as Row[]) : data ? [data as Row] : [];
  } catch (e) {
    console.warn(`[portfolio-export-pack] ${what}:`, e);
    unread.push(what);
    return [];
  }
}

const OBS_COLS =
  'id, kind, observed_at, observed_time, duration_minutes, location, location_type, activity_title, activity_summary, qualification_code, unit_code, acs_evidenced, ksbs_observed, criteria, outcome, grade, feedback_strengths, feedback_areas, action_points, follow_up_required, follow_up_date, assessor_name_snapshot, assessor_signed, assessor_signed_at, learner_acknowledged, learner_acknowledged_at, learner_comment, sent_at, content_hash, portfolio_item_id, media, transcript, created_at';
// No employer_contact_email / _phone, meeting_url, employer_token, contact log or snapshot (it carries the concerns prompts).
const REVIEW_COLS =
  'id, scheduled_at, held_on, duration_minutes, mode, location, status, employer_contact_name, employer_attendance, outcomes, signatures, learner_input, employer_input, completed_at, locked_at, content_hash';
const IQA_SAMPLE_COLS =
  'id, observation_id, observation_title_snapshot, observation_date_snapshot, otj_id, otj_title_snapshot, otj_date_snapshot, decision_id, portfolio_item_id, target_title_snapshot, target_date_snapshot, learner_user_id, iqa_name_snapshot, sampled_at, verdict, comments, created_at';

export async function loadProgramme(
  admin: SupabaseClient,
  o: {
    learnerId: string;
    studentId: string | null;
    access: 'learner' | 'staff';
    itemIds: string[];
    decisionIds: string[];
  }
): Promise<ProgrammeRecord> {
  const { learnerId, studentId, access, itemIds, decisionIds } = o;
  const unread: string[] = [];
  const none = Promise.resolve([] as Row[]);
  const sid = studentId;

  const [
    student,
    observations,
    reviews,
    reviewActions,
    trainingPlans,
    startingPoint,
    acSignoffs,
    assessmentPlans,
    grades,
    comments,
    ilps,
    findings,
  ] = await Promise.all([
    sid
      ? soft(
          admin.from('college_students').select('review_frequency_months, status').eq('id', sid),
          'review frequency',
          unread
        )
      : none,
    soft(
      admin
        .from('college_observations')
        .select(OBS_COLS)
        .or(
          sid
            ? `college_student_id.eq.${sid},learner_user_id.eq.${learnerId}`
            : `learner_user_id.eq.${learnerId}`
        )
        .order('observed_at', { ascending: true }),
      'assessor observations',
      unread
    ),
    sid
      ? soft(
          admin
            .from('college_tripartite_reviews')
            .select(REVIEW_COLS)
            .eq('student_id', sid)
            .neq('status', 'cancelled')
            .order('scheduled_at', { ascending: true }),
          'progress reviews',
          unread
        )
      : none,
    sid
      ? soft(
          admin
            .from('college_review_actions')
            .select(
              'id, review_id, action, owner_party, due_date, status, outcome_note, closed_in_review_id, closed_at, position, created_at'
            )
            .eq('student_id', sid)
            .order('position', { ascending: true }),
          'review actions',
          unread
        )
      : none,
    sid
      ? soft(
          admin
            .from('college_training_plans')
            .select(
              'id, version, status, content, content_hash, planned_otj_hours, change_reason, created_by_name, created_at, issued_at, in_force_from, superseded_at, delivered_requested_at, delivered_at'
            )
            .eq('student_id', sid)
            .neq('status', 'draft')
            .order('version', { ascending: true }),
          'training plan',
          unread
        )
      : none,
    sid
      ? soft(
          admin
            .from('college_learner_starting_points')
            .select(
              [
                'assessed_on, english_level, maths_level, digital_level, prior_learning, rpl_decision, rpl_hours_reduced, rpl_base_hours, rpl_reason, rpl_decided_at, ksb_scan, ksb_scan_on, updated_at',
                // Prices are the provider's: never in the apprentice's copy.
                ...(access === 'staff'
                  ? [
                      'rpl_percent, funding_band_max, price_reduction_min, max_price, agreed_price, price_recorded_at',
                    ]
                  : []),
              ].join(', ')
            )
            .eq('student_id', sid),
          'starting point',
          unread
        )
      : none,
    sid
      ? soft(
          admin
            .from('ac_signoffs')
            .select(
              'id, qualification_code, unit_code, ac_code, assessor_verdict, assessor_signed_at, assessor_name_snapshot, iqa_verdict, iqa_sampled_at, iqa_name_snapshot, iqa_feedback, created_at'
            )
            .eq('student_id', sid)
            .order('unit_code', { ascending: true }),
          'criterion sign-offs',
          unread
        )
      : none,
    soft(
      admin
        .from('portfolio_assessment_plans')
        .select(
          'id, qualification_code, activity, method, due_date, notes, status, set_by_name, closed_at, close_reason, close_note, created_at'
        )
        .eq('learner_id', learnerId)
        .order('due_date', { ascending: true }),
      'assessment plans',
      unread
    ),
    sid
      ? soft(
          admin
            .from('college_grades')
            .select(
              'id, unit_name, assessment_type, grade, score, feedback, assessed_by, assessed_at, status, created_at'
            )
            .eq('student_id', sid)
            .order('assessed_at', { ascending: true }),
          'results',
          unread
        )
      : none,
    itemIds.length
      ? soft(
          admin
            .from('portfolio_comments')
            .select(
              'id, evidence_id, parent_id, context_type, content, author_name, author_role, requires_action, is_resolved, resolved_by_name, created_at'
            )
            .in('evidence_id', itemIds)
            .order('created_at', { ascending: true }),
          'feedback comments',
          unread
        )
      : none,
    sid
      ? soft(
          admin
            .from('college_ilps')
            .select(
              'id, version, status, is_current, review_date, last_reviewed, tutor_name_snapshot, headline_focus, headline_strengths, headline_areas, target_completion_date, published_at, created_at, narrative_source, narrative_confirmed_at, narrative_confirmed_by_name'
            )
            .eq('student_id', sid)
            .order('created_at', { ascending: false }),
          'learning plan',
          unread
        )
      : none,
    // The provider's findings about its assessors: college copy only.
    sid && access === 'staff'
      ? soft(
          admin
            .from('college_iqa_findings')
            .select(
              'id, finding_type, area, severity, description, action_plan, status, due_date, closed_at, resolution_notes, assessor_name, iqa_name_snapshot, created_at'
            )
            .eq('college_student_id', sid)
            .order('created_at', { ascending: true }),
          'IQA findings',
          unread
        )
      : none,
  ]);

  const planIds = trainingPlans.map((p) => p.id);
  const obsIds = observations.map((x) => x.id);
  const ilp = ilps.find((x) => x.is_current) ?? ilps[0] ?? null;

  const [planSignatures, ilpGoals, samplesA, samplesB, samplesC, samplesD] = await Promise.all([
    planIds.length
      ? soft(
          admin
            .from('college_training_plan_signatures')
            // No user_agent: it is a device fingerprint.
            .select(
              'id, plan_id, purpose, role, signer_name, signer_title, signer_company, method, statement, content_hash, prev_signature_hash, signature_hash, signed_at'
            )
            .in('plan_id', planIds)
            .order('signed_at', { ascending: true }),
          'training plan signatures',
          unread
        )
      : none,
    ilp
      ? soft(
          admin
            .from('college_ilp_goals')
            .select(
              'id, position, category, priority, title, description, acceptance_criteria, target_date, status, completed_at, student_acknowledged, student_acknowledged_at, created_at'
            )
            .eq('ilp_id', ilp.id)
            // Wellbeing goals stay with the college.
            .neq('category', 'wellbeing')
            .order('position', { ascending: true }),
          'learning plan targets',
          unread
        )
      : none,
    soft(
      admin.from('college_iqa_samples').select(IQA_SAMPLE_COLS).eq('learner_user_id', learnerId),
      'IQA samples',
      unread
    ),
    obsIds.length
      ? soft(
          admin.from('college_iqa_samples').select(IQA_SAMPLE_COLS).in('observation_id', obsIds),
          'IQA samples',
          unread
        )
      : none,
    decisionIds.length
      ? soft(
          admin.from('college_iqa_samples').select(IQA_SAMPLE_COLS).in('decision_id', decisionIds),
          'IQA samples',
          unread
        )
      : none,
    itemIds.length
      ? soft(
          admin
            .from('college_iqa_samples')
            .select(IQA_SAMPLE_COLS)
            .in('portfolio_item_id', itemIds),
          'IQA samples',
          unread
        )
      : none,
  ]);
  const sampleMap = new Map<string, Row>();
  for (const s of [...samplesA, ...samplesB, ...samplesC, ...samplesD]) sampleMap.set(s.id, s);
  const iqaSamples = [...sampleMap.values()].sort((a, b) =>
    String(a.sampled_at ?? a.created_at).localeCompare(String(b.sampled_at ?? b.created_at))
  );

  const markerIds = [...new Set(grades.map((g) => g.assessed_by).filter(Boolean))] as string[];
  const markers = markerIds.length
    ? await soft(
        admin.from('profiles').select('id, full_name').in('id', markerIds),
        'markers',
        unread
      )
    : [];

  return {
    observations,
    reviews,
    reviewActions,
    trainingPlans,
    planSignatures,
    startingPoint: startingPoint[0] ?? null,
    iqaSamples,
    iqaFindings: findings,
    acSignoffs,
    assessmentPlans,
    grades,
    gradeMarkers: Object.fromEntries(markers.map((m) => [m.id, String(m.full_name ?? '')])),
    comments,
    ilp,
    ilpVersions: ilps.length,
    ilpGoals,
    reviewFrequencyMonths: Number(student[0]?.review_frequency_months) || 3,
    studentStatus: (student[0]?.status as string) ?? null,
    unread: [...new Set(unread)],
  };
}

// ── Formatting ──────────────────────────────────────────────────────────────

const TZ = 'Europe/London';
const fmtDate = (iso?: string | null) =>
  iso
    ? new Date(iso.length === 10 ? `${iso}T12:00:00Z` : iso).toLocaleDateString('en-GB', {
        timeZone: TZ,
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '';
const fmtShort = (iso?: string | null) =>
  iso
    ? new Date(iso.length === 10 ? `${iso}T12:00:00Z` : iso).toLocaleDateString('en-GB', {
        timeZone: TZ,
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : '';
const hrs = (n: unknown) => {
  const v = Number(n);
  return Number.isFinite(v) ? v.toLocaleString('en-GB', { maximumFractionDigits: 1 }) : '0';
};
/** "ANDREW MOORE" → "Andrew Moore", "Jo Smith (jsmith1)" → "Jo Smith"; mixed case left as typed. */
const nm = (raw: unknown): string => {
  let t = String(raw ?? '')
    .replace(/\s+/g, ' ')
    .trim();
  const h = t.match(/^(.+?)\s*\(([^()\s]+)\)$/);
  if (h && /[0-9_@.]|^[a-z0-9]+$/.test(h[2])) t = h[1].trim();
  if (!t.includes('@') && /[a-z]/i.test(t) && (t === t.toUpperCase() || t === t.toLowerCase()))
    t = t.toLowerCase().replace(/(^|[\s\-'’])(\p{L})/gu, (_m, p, c) => p + c.toUpperCase());
  return t;
};
const plural = (n: number, one: string, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;
const cap = (t: string) => (t ? t.charAt(0).toUpperCase() + t.slice(1) : t);
const words = (v: unknown) => cap(String(v ?? '').replace(/_/g, ' '));
/** A London calendar date (YYYY-MM-DD) for a timestamp or a date. */
const londonDay = (iso?: string | null) =>
  !iso
    ? null
    : iso.length === 10
      ? iso
      : new Date(iso).toLocaleDateString('en-CA', { timeZone: TZ });
const addMonths = (day: string, m: number) => {
  const [y, mo, d] = day.split('-').map(Number);
  const last = new Date(Date.UTC(y, mo - 1 + m + 1, 0)).getUTCDate();
  return new Date(Date.UTC(y, mo - 1 + m, Math.min(d, last))).toISOString().slice(0, 10);
};
const daysBetween = (a: string, b: string) =>
  Math.round((Date.parse(`${b}T12:00:00Z`) - Date.parse(`${a}T12:00:00Z`)) / 86_400_000);
/** "3 months 12 days" between two calendar dates. */
function monthsDays(a: string, b: string): string {
  let m = 0;
  while (addMonths(a, m + 1) <= b) m++;
  const d = daysBetween(addMonths(a, m), b);
  return [m ? plural(m, 'month') : '', d || !m ? plural(d, 'day') : ''].filter(Boolean).join(' ');
}

/**
 * The kv panel is a 3-column grid. A run of short cells that does not fill
 * its last row would leave a hole before the next wide cell (or the end): the
 * last short cell of the run stretches to close it (whole row or two columns).
 */
export function fillGrid<T extends { wide?: boolean; span2?: boolean }>(rows: T[]): T[] {
  const out = rows.map((r) => ({ ...r }));
  let run: T[] = [];
  const close = () => {
    const left = run.length % 3;
    if (left === 1) run[run.length - 1].wide = true;
    if (left === 2) run[run.length - 1].span2 = true;
    run = [];
  };
  for (const r of out) {
    if (r.wide) close();
    else run.push(r);
  }
  close();
  return out;
}

// ── Labels ──────────────────────────────────────────────────────────────────

const OBS_OUTCOME: Record<string, string> = {
  passed: 'Competent',
  partial: 'Partly',
  referred: 'Referred',
  not_yet: 'Not yet',
};
const OBS_TONE: Record<string, string> = {
  passed: 'passed',
  partial: 'referred',
  referred: 'referred',
  not_yet: 'referred',
};
const OBS_SETTING: Record<string, string> = {
  workshop: 'Workshop',
  employer_site: 'On site',
  classroom: 'Classroom',
  remote: 'Online',
  other: 'Other',
};
const REVIEW_MODE: Record<string, string> = {
  in_person: 'In person',
  video: 'Video call',
  phone: 'Phone',
  email: 'By email',
};
const ATTENDANCE: Record<string, string> = {
  attended: 'Attended',
  contributed: 'Contributed, did not attend',
  invited_no_response: 'Invited, no reply',
};
const PROGRESS: Record<string, string> = {
  ahead: 'Ahead',
  on_track: 'On track',
  behind: 'Behind',
  steady: 'Steady progress',
  behind_hours: 'Behind on off-the-job hours',
};
const PLAN_CHANGE: Record<string, string> = {
  none: 'No change',
  minor: 'Small change',
  content: 'Content added or removed',
  end_date: 'End date changed',
  otj_release: 'Off-the-job release changed',
};
const OWNER: Record<string, string> = {
  apprentice: 'Apprentice',
  employer: 'Employer',
  college: 'College',
};
const ACTION_STATUS: Record<string, [string, string]> = {
  open: ['Open', 'neutral'],
  done: ['Done', 'passed'],
  not_done: ['Not done', 'referred'],
  dropped: ['Dropped', 'neutral'],
};
const PLAN_STATUS: Record<string, [string, string]> = {
  awaiting_signatures: ['Waiting for signatures', 'todo'],
  in_force: ['In force', 'passed'],
  superseded: ['Replaced', 'neutral'],
  withdrawn: ['Withdrawn', 'neutral'],
};
const PLAN_ROLE: Record<string, string> = {
  apprentice: 'Apprentice',
  employer: 'Employer',
  provider: 'Training provider',
};
const SAMPLE_VERDICT: Record<string, [string, string]> = {
  pending: ['Waiting', 'neutral'],
  agree: ['Agreed', 'passed'],
  disagree: ['Disagreed', 'rejected'],
  refer: ['Referred back', 'referred'],
};
const AC_IQA: Record<string, [string, string]> = {
  confirmed: ['Confirmed', 'passed'],
  returned: ['Returned', 'referred'],
  not_sampled: ['Not sampled', 'neutral'],
  not_confirmed: ['Not confirmed', 'rejected'],
};
const GOAL_STATUS: Record<string, [string, string]> = {
  not_started: ['Not started', 'neutral'],
  in_progress: ['In progress', 'submitted'],
  completed: ['Completed', 'passed'],
  overdue: ['Overdue', 'referred'],
};
const METHOD: Record<string, string> = {
  observation: 'Observation',
  product: 'Product evidence',
  professional_discussion: 'Professional discussion',
  questioning: 'Questioning',
  witness: 'Witness testimony',
  evidence_review: 'Evidence review',
};
const RPL: Record<string, string> = {
  not_decided: 'Not decided yet',
  none: 'No reduction',
  reduced: 'Reduced for prior learning',
};
const KSB_LEVEL: Record<string, string> = { none: 'None', partial: 'Partly', full: 'Fully' };

// ── Observations ────────────────────────────────────────────────────────────

/** "102 AC 2.1" for each criterion an observation evidenced. */
export function obsCriteria(o: Row): string[] {
  const c = Array.isArray(o.criteria) ? (o.criteria as Row[]) : [];
  if (c.length)
    return c
      .filter((x) => x?.ac_code)
      .map((x) => `${x.unit_code ?? o.unit_code ?? ''} AC ${x.ac_code}`.trim());
  return ((o.acs_evidenced ?? []) as string[]).map((s) =>
    String(s).includes(':')
      ? `${String(s).split(':')[0]} AC ${String(s).split(':')[1]}`
      : `${o.unit_code ?? ''} AC ${s}`.trim()
  );
}
const obsUnits = (o: Row) =>
  new Set(
    [o.unit_code, ...obsCriteria(o).map((c) => c.split(' AC ')[0])]
      .filter(Boolean)
      .map((u) => String(u).trim())
  );
/** A finished observation: the assessor signed it or sent it to the apprentice. */
const obsFinal = (o: Row) => !!(o.assessor_signed_at || o.sent_at || o.assessor_signed);
const faceToFace = (o: Row) =>
  o.location_type === 'remote' ? false : o.location_type ? true : null;

export function observationsFor(p: ProgrammeRecord, access: 'learner' | 'staff'): Row[] {
  return access === 'staff' ? p.observations : p.observations.filter(obsFinal);
}

/**
 * C&G 5357 unit 102: two observations, at least one face to face. Only said
 * when the qualification is 5357 or an observation covers unit 102.
 */
export function unit102Check(obs: Row[], qualCode: string | null | undefined) {
  const of102 = obs.filter(
    (o) => (o.kind ?? 'observation') === 'observation' && obsFinal(o) && obsUnits(o).has('102')
  );
  if (!String(qualCode ?? '').includes('5357') && !of102.length) return null;
  const f2f = of102.filter((o) => faceToFace(o) === true).length;
  const met = of102.length >= 2 && f2f >= 1;
  return {
    total: of102.length,
    f2f,
    met,
    text: met
      ? `Met: ${plural(of102.length, 'observation')} of unit 102, ${f2f} face to face.`
      : `Not met yet: ${plural(of102.length, 'observation')} of unit 102 recorded, ${f2f} face to face. The unit needs two, at least one face to face.`,
  };
}

// ── Progress reviews ────────────────────────────────────────────────────────

const reviewDay = (r: Row) => londonDay(r.held_on ?? r.scheduled_at);
const reviewHeld = (r: Row) => !!(r.locked_at || r.status === 'completed');

/**
 * The gap before each held review, from the start date or the previous review,
 * against the agreed frequency (funding rules 2026/27 para 102: at least every
 * 3 calendar months unless another timetable is agreed). Anything longer is
 * flagged.
 */
export function reviewGaps(
  p: ProgrammeRecord,
  startDate: string | null,
  generatedAt: string
): Row[] {
  const m = p.reviewFrequencyMonths || 3;
  const held = p.reviews
    .filter(reviewHeld)
    .sort((a, b) => String(reviewDay(a)).localeCompare(String(reviewDay(b))));
  const out: Row[] = [];
  let prev = startDate ? londonDay(startDate) : null;
  let prevLabel = 'Start';
  held.forEach((r, i) => {
    const day = reviewDay(r)!;
    const over = prev ? day > addMonths(prev, m) : false;
    out.push({
      label: `Review ${i + 1}`,
      day,
      from: prev,
      fromLabel: prevLabel,
      gap: prev ? monthsDays(prev, day) : '',
      over,
      kind: 'held',
    });
    prev = day;
    prevLabel = `Review ${i + 1}`;
  });
  const today = londonDay(generatedAt)!;
  const ended = ['withdrawn', 'completed', 'archived'].includes(
    String(p.studentStatus ?? '').toLowerCase()
  );
  if (prev && !ended && prev <= today) {
    out.push({
      label: 'Since then',
      day: today,
      from: prev,
      fromLabel: prevLabel,
      gap: monthsDays(prev, today),
      over: today > addMonths(prev, m),
      kind: 'open',
      dueBy: addMonths(prev, m),
    });
  }
  return out;
}

// ── Sections ────────────────────────────────────────────────────────────────

export interface ProgrammeCtx {
  access: 'learner' | 'staff';
  generatedAt: string;
  startDate: string | null;
  qualCode: string | null;
  /** portfolio item id → E01 */
  refs: Map<string, string>;
  /** "unit|ac" → criterion wording */
  acText: Map<string, string>;
  /** Signed URLs for observation photos, by "O01-1". */
  obsPhotos: Map<string, string>;
  /** Observation media copied into the ZIP, by "O01-1". */
  obsFiles: Map<
    string,
    { zipPath: string | null; sha256: string | null; note: string | null; withheld?: boolean }
  >;
  /** "Leave out photos of people and site addresses": photos become placeholders. */
  leaveOutPhotos?: boolean;
}

const unreadNote = (p: ProgrammeRecord, what: string) =>
  p.unread.includes(what) ? `The ${what} could not be read when this pack was made.` : '';

export const obsRef = (i: number) => `O${String(i + 1).padStart(2, '0')}`;

export function observationSections(p: ProgrammeRecord, c: ProgrammeCtx): Row[] {
  const obs = observationsFor(p, c.access);
  const check = unit102Check(obs, c.qualCode);
  const f2f = obs.filter((o) => faceToFace(o) === true).length;
  const remote = obs.filter((o) => faceToFace(o) === false).length;
  const out: Row[] = [];
  const counts: Row[] = [
    { label: 'Recorded', value: plural(obs.length, 'observation') },
    { label: 'Face to face', value: String(f2f) },
    { label: 'Online', value: String(remote) },
  ];
  if (check)
    counts.push({
      label: 'City & Guilds 5357 unit 102: two observations, at least one face to face',
      value: check.text,
      tone: check.met ? 'ok' : 'warn',
      wide: true,
    });
  out.push({
    heading: `Assessor observations · ${obs.length}`,
    toc: 'Assessor observations',
    intro:
      unreadNote(p, 'assessor observations') ||
      (obs.length
        ? 'Each observation or professional discussion an assessor recorded, with the criteria it evidenced, the feedback and the action points.'
        : 'No assessor observations are recorded in the app yet.'),
    kind: 'kv',
    rows: counts,
  });
  obs.forEach((o, i) => {
    const ref = obsRef(i);
    const crit = obsCriteria(o);
    const ksbs = ((o.ksbs_observed ?? []) as string[]).filter(Boolean);
    const media = Array.isArray(o.media) ? (o.media as Row[]) : [];
    const points = ((o.action_points ?? []) as string[]).filter((x) => String(x ?? '').trim());
    const ff = faceToFace(o);
    out.push({
      heading: '',
      kind: 'evidence',
      ref,
      title:
        o.activity_title ||
        (o.kind === 'professional_discussion' ? 'Professional discussion' : 'Observation'),
      state: o.outcome ? (OBS_OUTCOME[o.outcome] ?? words(o.outcome)) : obsFinal(o) ? '' : 'Draft',
      tone: o.outcome ? (OBS_TONE[o.outcome] ?? 'neutral') : 'neutral',
      facts: [
        {
          label: 'Date',
          value: `${fmtDate(o.observed_at)}${o.observed_time ? `, ${String(o.observed_time).slice(0, 5)}` : ''}${o.duration_minutes ? ` (${o.duration_minutes} min)` : ''}`,
        },
        {
          label: o.kind === 'professional_discussion' ? 'Professional discussion' : 'Observation',
          value:
            ff === null
              ? 'Setting not recorded'
              : ff
                ? `Face to face, ${OBS_SETTING[o.location_type] ?? words(o.location_type)}`
                : 'Remote (online)',
        },
        { label: 'Where', value: o.location || OBS_SETTING[o.location_type] || 'Not recorded' },
        { label: 'Assessor', value: nm(o.assessor_name_snapshot) || 'Not recorded' },
        {
          label: 'Signed by the assessor',
          value: o.assessor_signed_at ? fmtDate(o.assessor_signed_at) : 'Not signed',
        },
        {
          label: 'Seen by the apprentice',
          value: o.learner_acknowledged_at ? fmtDate(o.learner_acknowledged_at) : 'Not yet',
        },
        ...(o.portfolio_item_id && c.refs.get(o.portfolio_item_id)
          ? [{ label: 'Filed as evidence', value: c.refs.get(o.portfolio_item_id)! }]
          : []),
        ...(o.grade ? [{ label: 'Grade', value: String(o.grade) }] : []),
        ...(o.follow_up_required
          ? [
              {
                label: 'Follow-up',
                value: o.follow_up_date ? `By ${fmtDate(o.follow_up_date)}` : 'Needed',
              },
            ]
          : []),
        ...(o.content_hash
          ? [{ label: 'Record fingerprint (SHA-256)', value: o.content_hash, mono: true }]
          : []),
      ],
      texts: [
        ...(o.activity_summary ? [{ label: 'What was observed', body: o.activity_summary }] : []),
        ...(o.feedback_strengths ? [{ label: 'Strengths', body: o.feedback_strengths }] : []),
        ...(o.feedback_areas ? [{ label: 'Areas to develop', body: o.feedback_areas }] : []),
        ...(points.length
          ? [{ label: 'Action points', body: points.map((x) => `• ${x}`).join('\n') }]
          : []),
        ...(o.learner_comment
          ? [{ label: 'The apprentice’s response', body: o.learner_comment }]
          : []),
        ...(o.transcript
          ? [
              {
                label: 'Transcript',
                body: 'Held in the ZIP (Observations/observations.json).',
              },
            ]
          : []),
      ],
      tables: [
        ...(crit.length || ksbs.length
          ? [
              {
                label: 'Criteria evidenced',
                code: true,
                columns: ['AC', 'Criterion'],
                widths: ['26mm', ''],
                rows: [
                  ...crit.map((code) => {
                    const [u, a] = code.split(' AC ');
                    return [code, cap(c.acText.get(`${u}|${a}`) ?? '')];
                  }),
                  ...ksbs.map((k) => [k, 'Knowledge, skill or behaviour observed']),
                ],
              },
            ]
          : []),
      ],
      photos: c.leaveOutPhotos
        ? media
            .map((m, j) => ({ key: `${ref}-${j + 1}`, m }))
            .filter((x) => c.obsFiles.get(x.key)?.withheld)
            .slice(0, 3)
            .map((x) => ({ withheld: true, caption: `${x.key} · ${x.m.name ?? 'photo'}` }))
        : media
            .map((m, j) => ({ key: `${ref}-${j + 1}`, m }))
            .filter((x) => c.obsPhotos.has(x.key))
            .map((x) => ({
              url: c.obsPhotos.get(x.key)!,
              caption: `${x.key} · ${x.m.name ?? 'photo'}`,
            })),
      files: media.map((m, j) => {
        const f = c.obsFiles.get(`${ref}-${j + 1}`);
        return {
          name: `${ref}-${j + 1} · ${m.name ?? 'file'}`,
          path: f?.zipPath ? `In the ZIP: ${f.zipPath}` : f?.note || 'Not included',
          sha256: f?.sha256 || m.sha256 || '',
        };
      }),
    });
  });
  return out;
}

export function assessmentPlanSection(p: ProgrammeRecord, c: ProgrammeCtx): Row {
  const today = londonDay(c.generatedAt)!;
  const tones: string[] = [];
  const rows = p.assessmentPlans.map((a) => {
    const open = a.status === 'open';
    const overdue = open && a.due_date && a.due_date < today;
    const [label, tone] = open
      ? overdue
        ? ['Overdue', 'referred']
        : ['Open', 'neutral']
      : a.status === 'done'
        ? ['Done', 'passed']
        : [words(a.close_reason || a.status || 'Closed'), 'neutral'];
    tones.push(tone);
    return [
      fmtShort(a.due_date) || 'No date',
      [a.activity, a.notes, a.close_note ? `Closed: ${a.close_note}` : '']
        .filter(Boolean)
        .join('\n'),
      METHOD[a.method] ?? words(a.method),
      nm(a.set_by_name),
      label,
    ];
  });
  return {
    heading: `Assessment plans · ${p.assessmentPlans.length}`,
    toc: 'Assessment plans',
    intro: 'Assessments the assessor planned with the apprentice: what, how and by when.',
    kind: 'table',
    compact: true,
    columns: ['Due', 'Activity', 'Method', 'Set by', 'Status'],
    widths: ['24mm', '', '30mm', '30mm', '24mm'],
    rows,
    state_col: 4,
    row_tones: tones,
    empty: unreadNote(p, 'assessment plans') || 'No assessment plans are recorded yet.',
  };
}

export function gradesSection(p: ProgrammeRecord): Row {
  const rows = p.grades.map((g) => [
    fmtShort(g.assessed_at || g.created_at),
    [g.unit_name, g.feedback ? `Feedback: ${g.feedback}` : ''].filter(Boolean).join('\n'),
    words(g.assessment_type),
    [g.grade, g.score != null ? `${hrs(g.score)}%` : ''].filter(Boolean).join(', ') || '',
    nm(p.gradeMarkers[g.assessed_by]),
    words(g.status),
  ]);
  return {
    heading: `Assignment and test results · ${p.grades.length}`,
    toc: 'Assignment and test results',
    kind: 'table',
    compact: true,
    columns: ['Date', 'Unit and feedback', 'Type', 'Result', 'Marked by', 'Status'],
    widths: ['22mm', '', '26mm', '22mm', '28mm', '18mm'],
    rows,
    empty: unreadNote(p, 'results') || 'No assignment or test results are recorded yet.',
  };
}

export function iqaSections(
  p: ProgrammeRecord,
  c: ProgrammeCtx,
  decisions: Row[],
  obsRefs: Map<string, string>
): Row[] {
  const tones: string[] = [];
  const rows: string[][] = [];
  const sampledDecisions = new Set(p.iqaSamples.map((s) => s.decision_id).filter(Boolean));
  const items: Array<{ at: string; row: string[]; tone: string }> = [];
  for (const s of p.iqaSamples) {
    const dec = s.decision_id ? decisions.find((d) => d.id === s.decision_id) : null;
    const what = s.observation_id
      ? `Observation ${obsRefs.get(s.observation_id) ?? ''}: ${s.observation_title_snapshot ?? ''}${s.observation_date_snapshot ? `, ${fmtShort(s.observation_date_snapshot)}` : ''}`
      : s.otj_id
        ? `Off-the-job entry: ${s.otj_title_snapshot ?? ''}${s.otj_date_snapshot ? `, ${fmtShort(s.otj_date_snapshot)}` : ''}`
        : dec
          ? `Assessment decision ${dec.unit_code} AC ${dec.ac_code}`
          : s.portfolio_item_id
            ? `Evidence ${c.refs.get(s.portfolio_item_id) ?? ''}${s.target_title_snapshot ? `: ${s.target_title_snapshot}` : ''}`
            : s.target_title_snapshot || 'Sample';
    const [label, tone] = SAMPLE_VERDICT[s.verdict] ?? [words(s.verdict), 'neutral'];
    items.push({
      at: String(s.sampled_at ?? s.created_at ?? ''),
      row: [
        fmtShort(s.sampled_at ?? s.created_at),
        what.replace(/\s+:/, ':').trim(),
        nm(s.iqa_name_snapshot),
        label,
        s.comments || '',
      ],
      tone,
    });
  }
  // Decisions the IQA confirmed or not on the decision itself (no sample row).
  for (const d of decisions) {
    if (!d.iqa_verdict || sampledDecisions.has(d.id)) continue;
    const ok = d.iqa_verdict === 'confirmed';
    items.push({
      at: String(d.iqa_at ?? ''),
      row: [
        fmtShort(d.iqa_at),
        `Assessment decision ${d.unit_code} AC ${d.ac_code} (${words(d.decision)} by ${nm(d.assessor_name) || 'assessor'})`,
        '',
        ok ? 'Confirmed' : 'Not confirmed',
        d.iqa_feedback || '',
      ],
      tone: ok ? 'passed' : 'rejected',
    });
  }
  items.sort((a, b) => a.at.localeCompare(b.at));
  for (const it of items) {
    rows.push(it.row);
    tones.push(it.tone);
  }
  const out: Row[] = [
    {
      heading: `Internal quality assurance · ${plural(items.length, 'sample')}`,
      toc: 'Internal quality assurance',
      intro:
        'What the internal quality assurer sampled from this apprentice’s assessment, and their verdict.',
      kind: 'table',
      compact: true,
      columns: ['Sampled', 'What was sampled', 'IQA', 'Verdict', 'Comments'],
      widths: ['22mm', '', '28mm', '24mm', '52mm'],
      rows,
      state_col: 3,
      row_tones: tones,
      empty: unreadNote(p, 'IQA samples') || 'Nothing from this apprentice has been sampled yet.',
    },
  ];
  if (p.acSignoffs.length) {
    const t: string[] = [];
    out.push({
      heading: `Criterion sign-offs · ${p.acSignoffs.length}`,
      sub: true,
      intro:
        'Criteria signed off on the college’s earlier sign-off record, with the IQA verdict where one was given.',
      kind: 'table',
      compact: true,
      columns: ['AC', 'Assessor', 'IQA verdict', 'IQA and feedback'],
      widths: ['24mm', '52mm', '26mm', ''],
      rows: p.acSignoffs.map((a) => {
        const [label, tone] = a.iqa_verdict
          ? (AC_IQA[a.iqa_verdict] ?? [words(a.iqa_verdict), 'neutral'])
          : ['Not sampled', 'neutral'];
        t.push(tone);
        return [
          `${a.unit_code} AC ${a.ac_code}`,
          `${words(a.assessor_verdict) || 'Signed'}, ${nm(a.assessor_name_snapshot) || 'assessor'}${a.assessor_signed_at ? `\n${fmtShort(a.assessor_signed_at)}` : ''}`,
          label,
          [
            a.iqa_name_snapshot
              ? `${nm(a.iqa_name_snapshot)}${a.iqa_sampled_at ? `, ${fmtShort(a.iqa_sampled_at)}` : ''}`
              : '',
            a.iqa_feedback || '',
          ]
            .filter(Boolean)
            .join('\n'),
        ];
      }),
      state_col: 2,
      row_tones: t,
    });
  }
  if (c.access === 'staff' && p.iqaFindings.length) {
    const t: string[] = [];
    out.push({
      heading: `IQA findings · ${p.iqaFindings.length}`,
      sub: true,
      intro: 'Findings the IQA raised against this apprentice’s assessment. College copy only.',
      kind: 'table',
      compact: true,
      columns: ['Raised', 'Finding', 'Action plan', 'Status'],
      widths: ['22mm', '', '58mm', '24mm'],
      rows: p.iqaFindings.map((f) => {
        const closed = !!f.closed_at || /closed|resolved/i.test(String(f.status ?? ''));
        t.push(closed ? 'passed' : 'neutral');
        return [
          fmtShort(f.created_at),
          [
            [f.finding_type, f.area, f.severity].filter(Boolean).map(words).join(' · '),
            f.description,
            f.assessor_name ? `Assessor: ${nm(f.assessor_name)}` : '',
          ]
            .filter(Boolean)
            .join('\n'),
          [f.action_plan, f.due_date ? `By ${fmtShort(f.due_date)}` : '', f.resolution_notes]
            .filter(Boolean)
            .join('\n'),
          closed ? `Closed${f.closed_at ? ` ${fmtShort(f.closed_at)}` : ''}` : words(f.status),
        ];
      }),
      state_col: 3,
      row_tones: t,
    });
  }
  return out;
}

export function startingPointSections(p: ProgrammeRecord, c: ProgrammeCtx): Row[] {
  const sp = p.startingPoint;
  if (!sp)
    return [
      {
        heading: 'Starting point and prior learning',
        kind: 'text',
        paragraphs: [
          unreadNote(p, 'starting point') ||
            'No initial assessment or prior-learning decision is recorded in the app yet.',
        ],
      },
    ];
  const scan = Array.isArray(sp.ksb_scan) ? (sp.ksb_scan as Row[]) : [];
  const withPrior = scan.filter((k) => k.level && k.level !== 'none');
  const full = scan.filter((k) => k.level === 'full').length;
  const base = Number(sp.rpl_base_hours ?? 0);
  const cut = Number(sp.rpl_hours_reduced ?? 0);
  const rows: Row[] = [
    {
      label: 'Initial assessment',
      value: sp.assessed_on ? fmtDate(sp.assessed_on) : 'Not recorded',
    },
    { label: 'English', value: sp.english_level || 'Not recorded' },
    { label: 'Maths', value: sp.maths_level || 'Not recorded' },
    { label: 'Digital', value: sp.digital_level || 'Not recorded' },
    {
      label: 'Skills scan against the standard',
      value: scan.length
        ? `${withPrior.length} of ${scan.length} with prior learning (${full} fully)`
        : 'Not done',
      note: sp.ksb_scan_on ? `Scanned ${fmtDate(sp.ksb_scan_on)}` : '',
    },
    {
      label: 'Prior learning decision',
      value: RPL[sp.rpl_decision] ?? (sp.rpl_decision ? words(sp.rpl_decision) : 'Not decided yet'),
      tone: sp.rpl_decision && sp.rpl_decision !== 'not_decided' ? 'ok' : 'warn',
      note: sp.rpl_decided_at ? `Decided ${fmtDate(sp.rpl_decided_at)}` : '',
    },
    ...(sp.prior_learning
      ? [{ label: 'Prior learning recorded', value: sp.prior_learning, wide: true }]
      : []),
    ...(sp.rpl_decision === 'reduced'
      ? [
          {
            label: 'Effect on off-the-job hours',
            value: base
              ? `${hrs(base)} hours reduced by ${hrs(cut)} to ${hrs(base - cut)} hours`
              : `Reduced by ${hrs(cut)} hours`,
            wide: true,
          },
        ]
      : sp.rpl_decision === 'none'
        ? [{ label: 'Effect on off-the-job hours', value: 'None: no reduction', wide: true }]
        : []),
    ...(sp.rpl_reason ? [{ label: 'Reason', value: sp.rpl_reason, wide: true }] : []),
  ];
  if (c.access === 'staff' && sp.rpl_decision === 'reduced') {
    rows.push(
      {
        label: 'Prior learning share',
        value: sp.rpl_percent != null ? `${hrs(sp.rpl_percent)}%` : 'Not worked out',
      },
      {
        label: 'Price reduction (at least)',
        value: sp.price_reduction_min != null ? `£${hrs(sp.price_reduction_min)}` : 'Not recorded',
      },
      {
        label: 'Agreed price',
        value:
          sp.agreed_price != null
            ? `£${hrs(sp.agreed_price)}${sp.max_price != null ? ` (most allowed £${hrs(sp.max_price)})` : ''}`
            : 'Not recorded',
        note: 'College copy only',
      }
    );
  }
  const out: Row[] = [
    {
      heading: 'Starting point and prior learning',
      intro:
        'The initial assessment, the skills scan against the apprenticeship standard and the prior-learning decision (funding rules 2026/27 paras 38–39).',
      kind: 'kv',
      rows: fillGrid(rows),
    },
  ];
  if (withPrior.length)
    out.push({
      heading: `Skills scan · ${plural(withPrior.length, 'KSB')} with prior learning`,
      sub: true,
      kind: 'table',
      compact: true,
      columns: ['Code', 'Knowledge, skill or behaviour', 'Prior learning', 'Evidence', 'Hours'],
      widths: ['16mm', '', '24mm', '50mm', '14mm'],
      rows: withPrior.map((k) => [
        String(k.code ?? ''),
        String(k.title ?? ''),
        KSB_LEVEL[k.level] ?? words(k.level),
        String(k.evidence ?? ''),
        k.hours_credit != null ? hrs(k.hours_credit) : '',
      ]),
    });
  return out;
}

const sigLine = (s: Row) =>
  `${PLAN_ROLE[s.role] ?? words(s.role)}: ${nm(s.signer_name)}${s.signer_title ? `, ${s.signer_title}` : ''}${s.signer_company ? ` (${s.signer_company})` : ''}, ${fmtShort(s.signed_at)}`;

export function trainingPlanSections(p: ProgrammeRecord): Row[] {
  const plans = p.trainingPlans;
  if (!plans.length)
    return [
      {
        heading: 'Training plan',
        kind: 'text',
        paragraphs: [
          unreadNote(p, 'training plan') ||
            'No training plan has been issued in the app yet. If the plan is held on paper, attach the signed copy.',
        ],
      },
    ];
  const tones: string[] = [];
  const rows = plans.map((pl) => {
    const [label, tone] = PLAN_STATUS[pl.status] ?? [words(pl.status), 'neutral'];
    tones.push(tone);
    const sigs = p.planSignatures.filter((s) => s.plan_id === pl.id && s.purpose === 'plan');
    return [
      `Version ${pl.version}`,
      label,
      [
        pl.issued_at ? `Issued ${fmtShort(pl.issued_at)}` : '',
        pl.in_force_from
          ? `In force ${fmtShort(pl.in_force_from)}${pl.superseded_at ? ` to ${fmtShort(pl.superseded_at)}` : ''}`
          : '',
        pl.change_reason ? `Why: ${pl.change_reason}` : '',
      ]
        .filter(Boolean)
        .join('\n'),
      sigs.length ? sigs.map(sigLine).join('\n') : 'Not signed yet',
      pl.planned_otj_hours != null ? hrs(pl.planned_otj_hours) : '',
    ];
  });
  const current =
    plans.find((x) => x.status === 'in_force') ??
    [...plans].reverse().find((x) => x.status === 'awaiting_signatures') ??
    plans[plans.length - 1];
  const delivered = p.planSignatures.filter(
    (s) => s.plan_id === current.id && s.purpose === 'delivered'
  );
  const content = (current.content ?? {}) as Row;
  const out: Row[] = [
    {
      heading: `Training plan · ${plural(plans.length, 'version')}`,
      toc: 'Training plan',
      intro:
        'Every issued version of the training plan, with who signed it and when (funding rules 2026/27 paras 99–101 and 103.4). A new version replaces the old one, which is kept with the dates it was in force.',
      kind: 'table',
      compact: true,
      columns: ['Version', 'Status', 'Dates', 'Signed', 'Planned hours'],
      widths: ['18mm', '26mm', '44mm', '', '18mm'],
      rows,
      state_col: 1,
      row_tones: tones,
    },
    {
      heading: '',
      kind: 'kv',
      rows: [
        { label: 'Current version', value: `Version ${current.version}` },
        {
          label: 'Planned off-the-job hours',
          value:
            current.planned_otj_hours != null
              ? `${hrs(current.planned_otj_hours)} hours`
              : 'Not set',
        },
        { label: 'Delivery model', value: content.delivery_model || 'Not recorded' },
        {
          label: 'Progress reviews',
          value: content.reviews?.frequency_months
            ? `Every ${plural(Number(content.reviews.frequency_months), 'month')}`
            : 'Not recorded',
        },
        {
          label: 'Programme dates',
          value:
            content.programme?.start_date || content.programme?.end_date
              ? `${fmtShort(content.programme?.start_date) || 'not set'} to ${fmtShort(content.programme?.end_date) || 'not set'}`
              : 'Not recorded',
        },
        {
          label: 'Plan delivered (para 101)',
          value: delivered.length
            ? delivered.map(sigLine).join('\n')
            : current.delivered_requested_at
              ? `Asked for ${fmtShort(current.delivered_requested_at)}, not signed yet`
              : 'Not asked for yet',
          tone: current.delivered_at ? 'ok' : '',
        },
        {
          label: 'Plan fingerprint (SHA-256)',
          value: current.content_hash || 'Not issued',
          mono: true,
          wide: true,
        },
      ],
    },
  ];
  const train = Array.isArray(content.occupational_training)
    ? (content.occupational_training as Row[])
    : [];
  if (train.length)
    out.push({
      heading: `Training to be delivered · version ${current.version}`,
      sub: true,
      kind: 'table',
      compact: true,
      columns: ['Training', 'When', 'Who', 'Off-the-job', 'Hours'],
      widths: ['', '34mm', '34mm', '20mm', '14mm'],
      rows: train.map((t) => [
        [t.content, t.activity].filter(Boolean).join('\n'),
        String(t.when ?? ''),
        String(t.who ?? ''),
        t.in_otj === true ? 'Yes' : t.in_otj === false ? 'No' : '',
        t.hours != null ? hrs(t.hours) : '',
      ]),
    });
  return out;
}

export function ilpSections(p: ProgrammeRecord, c: ProgrammeCtx): Row[] {
  const ilp = p.ilp;
  if (!ilp)
    return [
      {
        heading: 'Learning plan and targets',
        kind: 'text',
        paragraphs: [
          unreadNote(p, 'learning plan') || 'No individual learning plan is recorded yet.',
        ],
      },
    ];
  const today = londonDay(c.generatedAt)!;
  const tones: string[] = [];
  const rows = p.ilpGoals.map((g) => {
    const late =
      g.status !== 'completed' && g.target_date && g.target_date < today ? 'overdue' : g.status;
    const [label, tone] = GOAL_STATUS[late] ?? [words(late), 'neutral'];
    tones.push(tone);
    return [
      [g.title, g.acceptance_criteria ? `Done when: ${g.acceptance_criteria}` : '']
        .filter(Boolean)
        .join('\n'),
      words(g.category),
      fmtShort(g.target_date),
      g.status === 'completed' && g.completed_at ? `Completed ${fmtShort(g.completed_at)}` : label,
    ];
  });
  return [
    {
      heading: 'Learning plan and targets',
      intro:
        'The apprentice’s individual learning plan as it stands. Support needs and wellbeing targets stay with the college and are not in this pack.',
      kind: 'kv',
      rows: [
        {
          label: 'Version',
          value: `Version ${ilp.version ?? 1}${p.ilpVersions > 1 ? ` (${p.ilpVersions} recorded)` : ''}`,
        },
        { label: 'Tutor', value: nm(ilp.tutor_name_snapshot) || 'Not recorded' },
        {
          label: 'Next review',
          value: ilp.review_date ? fmtDate(ilp.review_date) : 'Not set',
        },
        ...(ilp.headline_focus ? [{ label: 'Focus', value: ilp.headline_focus, wide: true }] : []),
        ...(ilp.headline_strengths
          ? [{ label: 'Strengths', value: ilp.headline_strengths, wide: true }]
          : []),
        ...(ilp.headline_areas
          ? [{ label: 'Areas to develop', value: ilp.headline_areas, wide: true }]
          : []),
      ],
    },
    {
      heading: `Targets · ${p.ilpGoals.length}`,
      sub: true,
      kind: 'table',
      compact: true,
      columns: ['Target', 'Area', 'Due', 'Status'],
      widths: ['', '28mm', '24mm', '30mm'],
      rows,
      state_col: 3,
      row_tones: tones,
      empty: 'No targets are set on this plan.',
    },
  ];
}

const inputText = (x: Row | null | undefined) =>
  x
    ? [
        x.progress ? `Progress: ${PROGRESS[x.progress] ?? words(x.progress)}` : '',
        x.going_well ? `Going well: ${x.going_well}` : '',
        x.focus_next ? `Focus next: ${x.focus_next}` : '',
        // x.concerns is never printed.
      ]
        .filter(Boolean)
        .join('\n')
    : '';

export function reviewSections(p: ProgrammeRecord, c: ProgrammeCtx): Row[] {
  const m = p.reviewFrequencyMonths || 3;
  const gaps = reviewGaps(p, c.startDate, c.generatedAt);
  const held = p.reviews
    .filter(reviewHeld)
    .sort((a, b) => String(reviewDay(a)).localeCompare(String(reviewDay(b))));
  const next = p.reviews
    .filter(
      (r) =>
        !reviewHeld(r) && r.scheduled_at && londonDay(r.scheduled_at)! >= londonDay(c.generatedAt)!
    )
    .sort((a, b) => String(a.scheduled_at).localeCompare(String(b.scheduled_at)))[0];
  const tones: string[] = [];
  const rows = gaps.map((g) => {
    tones.push(g.over ? 'referred' : 'passed');
    return [
      g.kind === 'open' ? `No review since ${fmtShort(g.from)}` : `${g.label}, ${fmtShort(g.day)}`,
      g.from ? `${g.fromLabel}, ${fmtShort(g.from)}` : 'Start date not recorded',
      g.gap,
      g.over
        ? `Over ${plural(m, 'month')}`
        : g.kind === 'open'
          ? `Due by ${fmtShort(g.dueBy)}`
          : `Within ${plural(m, 'month')}`,
    ];
  });
  if (next) {
    rows.push([`Next review booked, ${fmtShort(next.scheduled_at)}`, '', '', 'Booked']);
    tones.push('neutral');
  }
  const over = gaps.filter((g) => g.over).length;
  const out: Row[] = [
    {
      heading: `Progress reviews · ${held.length} held`,
      toc: 'Progress reviews',
      intro:
        unreadNote(p, 'progress reviews') ||
        `Funding rules 2026/27 para 102: the provider, apprentice and employer review progress at least every 3 calendar months${m !== 3 ? ` (agreed for this apprentice: every ${plural(m, 'month')})` : ''}. Each gap is measured from the start date or the previous review, and any gap over ${plural(m, 'calendar month')} is flagged. (The app shows the next review as due by the end of the calendar month ${plural(m, 'month')} on.)${over ? ` ${plural(over, 'gap')} ran over.` : ''}`,
      kind: 'table',
      compact: true,
      columns: ['Review', 'Measured from', 'Gap', 'Result'],
      widths: ['', '46mm', '34mm', '30mm'],
      rows,
      state_col: 3,
      row_tones: tones,
      empty: 'No progress reviews are recorded yet.',
    },
  ];
  held.forEach((r, i) => {
    const o = (r.outcomes ?? {}) as Row;
    const sg = (r.signatures ?? {}) as Row;
    const acts = p.reviewActions.filter((a) => a.review_id === r.id);
    const checked = p.reviewActions.filter(
      (a) => a.closed_in_review_id === r.id && a.review_id !== r.id
    );
    const signedAll = !!(sg.tutor_signed_at && sg.student_signed_at);
    const at: string[] = [];
    out.push({
      heading: '',
      kind: 'evidence',
      ref: `R${i + 1}`,
      title: `Progress review, ${fmtDate(reviewDay(r))}`,
      state: signedAll ? 'Signed' : 'Awaiting signatures',
      tone: signedAll ? 'passed' : 'referred',
      facts: [
        {
          label: 'How',
          value: `${REVIEW_MODE[r.mode] ?? words(r.mode) ?? ''}${r.duration_minutes ? `, ${r.duration_minutes} min` : ''}`,
        },
        { label: 'Where', value: r.location || 'Not recorded' },
        {
          label: 'Progress',
          value: o.progress ? (PROGRESS[o.progress] ?? words(o.progress)) : 'Not recorded',
        },
        { label: 'Tutor', value: nm(sg.tutor_name) || 'Not recorded' },
        {
          label: 'Employer',
          value: `${nm(r.employer_contact_name) || 'Not named'}${r.employer_attendance ? `, ${ATTENDANCE[r.employer_attendance] ?? words(r.employer_attendance)}` : ''}`,
        },
        {
          label: 'Training plan',
          value: o.plan_change
            ? (PLAN_CHANGE[o.plan_change] ?? words(o.plan_change))
            : 'Not recorded',
        },
        {
          label: 'Signed by the tutor',
          value: sg.tutor_signed_at ? fmtShort(sg.tutor_signed_at) : 'Not signed',
        },
        {
          label: 'Signed by the apprentice',
          value: sg.student_signed_at
            ? `${fmtShort(sg.student_signed_at)}${sg.student_signed_via === 'paper' ? ' (on paper)' : ''}`
            : 'Not signed',
        },
        {
          label: 'Signed by the employer',
          value: sg.employer_signed_at
            ? `${nm(sg.employer_name)}${sg.employer_role ? `, ${sg.employer_role}` : ''}, ${fmtShort(sg.employer_signed_at)}`.replace(
                /^, /,
                ''
              )
            : 'Not signed',
        },
        ...(r.content_hash
          ? [{ label: 'Record fingerprint (SHA-256)', value: r.content_hash, mono: true }]
          : []),
      ],
      // Never: concerns, wellbeing_check, safeguarding_check, learning_support, ilp_updates.
      texts: [
        ...(o.summary ? [{ label: 'Summary', body: o.summary }] : []),
        ...(o.progress_notes ? [{ label: 'Progress', body: o.progress_notes }] : []),
        ...(o.training_notes ? [{ label: 'Training', body: o.training_notes }] : []),
        ...(o.evidence_notes ? [{ label: 'Evidence', body: o.evidence_notes }] : []),
        ...(o.otj_review ? [{ label: 'Off-the-job hours', body: o.otj_review }] : []),
        ...(inputText(r.learner_input)
          ? [{ label: 'The apprentice’s view', body: inputText(r.learner_input) }]
          : []),
        ...(inputText(r.employer_input)
          ? [{ label: 'The employer’s view', body: inputText(r.employer_input) }]
          : []),
      ],
      tables: [
        ...(acts.length || checked.length
          ? [
              {
                label: 'Actions',
                columns: ['Action', 'Who', 'Due', 'Status'],
                widths: ['', '24mm', '24mm', '34mm'],
                rows: [...checked, ...acts].map((a) => {
                  const [label] = ACTION_STATUS[a.status] ?? [words(a.status)];
                  at.push(a.review_id === r.id ? 'agreed' : 'checked');
                  return [
                    `${a.review_id === r.id ? '' : 'Checked from an earlier review: '}${a.action}`,
                    OWNER[a.owner_party] ?? words(a.owner_party),
                    fmtShort(a.due_date),
                    `${label}${a.outcome_note ? `\n${a.outcome_note}` : ''}`,
                  ];
                }),
              },
            ]
          : []),
      ],
    });
  });
  return out;
}

/** Feedback on one piece of evidence: the latest few for the PDF; the ZIP has them all. */
export const COMMENTS_IN_PDF = 3;
export function commentsFor(p: ProgrammeRecord, itemId: string) {
  const all = p.comments.filter((x) => x.evidence_id === itemId);
  if (!all.length) return null;
  const latest = all.slice(-COMMENTS_IN_PDF);
  return {
    count: all.length,
    items: latest.map((x) => ({
      who: nm(x.author_name) || 'Someone',
      role: words(x.author_role),
      when: fmtShort(x.created_at),
      text: x.content || '',
      flag: x.requires_action ? (x.is_resolved ? 'Action done' : 'Action needed') : '',
    })),
    more:
      all.length > latest.length
        ? `${plural(all.length - latest.length, 'earlier comment')} in the ZIP (Evidence feedback/comments.csv).`
        : '',
  };
}

// ── ZIP data ────────────────────────────────────────────────────────────────

/** Review rows as they go in the ZIP: no contact details, concerns or wellbeing. */
export function reviewsForZip(p: ProgrammeRecord) {
  const strip = (x: Row | null | undefined) => {
    if (!x) return null;
    const { concerns: _c, ...rest } = x;
    return rest;
  };
  return p.reviews.map((r) => {
    const o = (r.outcomes ?? {}) as Row;
    return {
      id: r.id,
      status: r.status,
      held_on: r.held_on,
      scheduled_at: r.scheduled_at,
      mode: r.mode,
      location: r.location,
      duration_minutes: r.duration_minutes,
      employer_contact_name: r.employer_contact_name,
      employer_attendance: r.employer_attendance,
      outcomes: {
        summary: o.summary ?? null,
        progress: o.progress ?? null,
        progress_notes: o.progress_notes ?? null,
        training_notes: o.training_notes ?? null,
        evidence_notes: o.evidence_notes ?? null,
        otj_review: o.otj_review ?? null,
        otj_discussed: o.otj_discussed ?? null,
        plan_change: o.plan_change ?? null,
        summary_source: o.summary_source ?? null,
      },
      learner_input: strip(r.learner_input),
      employer_input: strip(r.employer_input),
      signatures: {
        tutor_name: r.signatures?.tutor_name ?? null,
        tutor_signed_at: r.signatures?.tutor_signed_at ?? null,
        student_name: r.signatures?.student_name ?? null,
        student_signed_at: r.signatures?.student_signed_at ?? null,
        student_signed_via: r.signatures?.student_signed_via ?? null,
        employer_name: r.signatures?.employer_name ?? null,
        employer_role: r.signatures?.employer_role ?? null,
        employer_signed_at: r.signatures?.employer_signed_at ?? null,
      },
      completed_at: r.completed_at,
      locked_at: r.locked_at,
      content_sha256: r.content_hash,
      actions: p.reviewActions
        .filter((a) => a.review_id === r.id)
        .map(({ review_id: _r, ...a }) => a),
    };
  });
}

/** The training plan versions for the ZIP: support needs left out. */
export function plansForZip(p: ProgrammeRecord) {
  return p.trainingPlans.map((pl) => {
    const { support: _s, ...content } = (pl.content ?? {}) as Row;
    return {
      ...pl,
      content,
      signatures: p.planSignatures.filter((s) => s.plan_id === pl.id),
    };
  });
}

export { fmtDate as progFmtDate, fmtShort as progFmtShort, words as progWords, OBS_OUTCOME };
