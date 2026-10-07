// deno-lint-ignore-file no-explicit-any
/* ==========================================================================
   Ofsted lens signals, server side (ELE-2017 / ELE-2021).

   The same read as src/hooks/useOfstedSignals.ts, for the "Ofsted lens" PDF
   made by learner-document-pdf. Run it with a client carrying the CALLER'S
   JWT, so row-level security scopes every read exactly as the screen does.
   Each signal is filed under the evaluation area it evidences; the RAG is how
   ready the evidence is, never a predicted grade.

   Keep the two in step. The hook can switch to this module (it has no Deno
   or Vite only imports) once its own in-flight changes have landed.
   ========================================================================== */
import { TOOLKIT_AREA_TITLE, type ToolkitAreaKey } from './ofsted-fe-skills-framework.ts';

export type RagStatus = 'red' | 'amber' | 'green' | 'grey';

export interface EvidenceRow {
  label: string;
  value: string;
  href?: string;
  status?: RagStatus;
}

export interface JudgementSignal {
  key: ToolkitAreaKey;
  title: string;
  rag: RagStatus;
  summary: string;
  evidence: EvidenceRow[];
  gaps: string[];
}

export interface OfstedSnapshot {
  generated_at: string;
  college_id: string | null;
  college_name: string | null;
  audit_window_days: number;
  judgements: JudgementSignal[];
}

const dayMs = 86_400_000;
const pct = (n: number, d: number) => (d ? Math.round((n / d) * 100) : 0);
const ragFromPct = (p: number, redBelow: number, amberBelow: number): RagStatus =>
  p < redBelow ? 'red' : p < amberBelow ? 'amber' : 'green';
const worst = (rags: RagStatus[]): RagStatus =>
  rags.includes('red') ? 'red' : rags.includes('amber') ? 'amber' : rags.includes('grey') ? 'grey' : 'green';

/** Every row of a query, a page at a time (the API caps a single read). */
async function every(make: () => any, page = 1000): Promise<any[]> {
  const out: any[] = [];
  for (let from = 0; from < 100_000; from += page) {
    const { data, error } = await make().range(from, from + page - 1);
    if (error) throw new Error(error.message);
    out.push(...(data ?? []));
    if (!data || data.length < page) break;
  }
  return out;
}

export async function readOfstedSignals(client: any, collegeId: string, collegeName: string | null): Promise<OfstedSnapshot> {
  const { data: cs } = await client.from('college_settings').select('audit_window_days').eq('college_id', collegeId).maybeSingle();
  const auditWindowDays = (cs as { audit_window_days?: number } | null)?.audit_window_days ?? 90;
  const auditCutoff = new Date(Date.now() - auditWindowDays * dayMs).toISOString().slice(0, 10);
  const yearAgo = new Date(Date.now() - 365 * dayMs).toISOString();
  const today = new Date().toISOString().slice(0, 10);

  const [curriculumRes, staffRes, policiesRes, acks, attendance, observations, lessonPlansRes, otj, iqaPlansRes, epaRes, studentsRes, deliveriesRes] =
    await Promise.all([
      client
        .from('college_curriculum_settings')
        .select('include_british_values, include_stretch_challenge, include_inclusive_practice, prevent_lead_name, dsl_name')
        .eq('college_id', collegeId)
        .maybeSingle(),
      client.from('college_staff').select('id, name, role, user_id, archived_at, status, is_dsl').eq('college_id', collegeId).is('archived_at', null),
      client.from('college_policies').select('id, category, status, version, requires_acknowledgement').eq('college_id', collegeId),
      every(() =>
        client
          .from('policy_acknowledgements')
          .select('policy_id, user_id, policy_version, college_policies!inner(college_id)')
          .eq('college_policies.college_id', collegeId)
          .order('policy_id')
          .order('user_id')
          .order('policy_version')
      ),
      every(() => client.from('college_attendance').select('id, status, date').gte('date', auditCutoff).order('id')),
      every(() => client.from('college_observations').select('id, observed_at, outcome').gte('observed_at', auditCutoff).order('id')),
      client
        .from('college_lesson_plans')
        .select('id, scheduled_date, status, created_at')
        .eq('college_id', collegeId)
        .gte('scheduled_date', auditCutoff)
        .lte('scheduled_date', today)
        .in('status', ['ready', 'delivered']),
      every(() =>
        client.from('college_otj_entries').select('id, duration_minutes, activity_date, verification_status').gte('activity_date', auditCutoff).order('id')
      ),
      client.from('college_iqa_sampling').select('id').eq('college_id', collegeId),
      client.from('college_epa_judgements').select('predicted_grade, source, created_at').gte('created_at', yearAgo),
      client.from('college_students').select('id, status').eq('college_id', collegeId),
      client.from('college_lesson_deliveries').select('lesson_plan_id, delivered_on').eq('college_id', collegeId).gte('delivered_on', auditCutoff),
    ]);

  const curriculum = (curriculumRes.data ?? null) as Record<string, any> | null;
  const staff = (staffRes.data ?? []) as Array<{ id: string; name: string; user_id: string | null; status: string | null; is_dsl: boolean | null }>;
  // The DSL is whoever the staff list says it is (active, with an account).
  const dsls = staff.filter((st) => st.is_dsl && !!st.user_id && (st.status ?? 'active').trim().toLowerCase() === 'active');
  const dslNames = dsls.map((d) => d.name).filter(Boolean).join(', ');
  const policies = (policiesRes.data ?? []) as Array<{ id: string; category: string; status: string; version: number; requires_acknowledgement: boolean }>;
  const lessonPlans = (lessonPlansRes.data ?? []) as Array<{ id: string }>;
  const deliveredIds = new Set(lessonPlans.map((p) => p.id));
  let unplannedDeliveries = 0;
  for (const d of (deliveriesRes.data ?? []) as Array<{ lesson_plan_id: string | null }>) {
    if (d.lesson_plan_id) deliveredIds.add(d.lesson_plan_id);
    else unplannedDeliveries += 1;
  }
  const iqaPlanIds = ((iqaPlansRes.data ?? []) as Array<{ id: string }>).map((p) => p.id);
  let iqaSamples: any[] = [];
  if (iqaPlanIds.length > 0) {
    const { data } = await client.from('college_iqa_samples').select('verdict, sampled_at').in('sampling_plan_id', iqaPlanIds).gte('sampled_at', yearAgo);
    iqaSamples = data ?? [];
  }
  const epa = (epaRes.data ?? []) as Array<{ predicted_grade: string | null; source: string | null }>;
  const students = (studentsRes.data ?? []) as Array<{ status: string | null }>;

  // ─── Shared figures ───────────────────────────────────────────
  const intentSet = Boolean(curriculum?.include_british_values && curriculum?.include_stretch_challenge && curriculum?.include_inclusive_practice);
  const planCount = deliveredIds.size + unplannedDeliveries;
  const epaTutor = epa.filter((e) => e.source === 'tutor');
  const epaPassEquiv = epaTutor.filter((e) => e.predicted_grade && e.predicted_grade !== 'fail').length;
  const passRate = pct(epaPassEquiv, epaTutor.length || 1);
  const intentRag: RagStatus = intentSet ? 'green' : 'amber';
  const implRag: RagStatus = planCount === 0 ? 'red' : planCount < 5 ? 'amber' : 'green';
  const impactRag: RagStatus = epaTutor.length === 0 ? 'grey' : ragFromPct(passRate, 60, 80);

  // Registers store 'Present' / 'Late' / 'Absent' / 'Authorised' (capitalised).
  const statusOf = (a: { status: string | null }) => (a.status ?? '').trim().toLowerCase();
  const present = attendance.filter((a) => statusOf(a) === 'present').length;
  const late = attendance.filter((a) => statusOf(a) === 'late').length;
  const authorised = attendance.filter((a) => statusOf(a) === 'authorised').length;
  const sessions = attendance.length;
  const attendanceRate = pct(present + late, sessions || 1);
  const punctualityRate = pct(present, present + late || 1);
  const obsRated = observations.filter((o) => o.outcome).length;
  const attendanceRag: RagStatus = sessions === 0 ? 'grey' : ragFromPct(attendanceRate, 80, 90);
  const punctualityRag: RagStatus = present + late === 0 ? 'grey' : ragFromPct(punctualityRate, 85, 95);
  const obsRag: RagStatus = obsRated === 0 ? 'amber' : 'green';

  const preventPolicy = policies.find((p) => p.category === 'prevent' && p.status === 'live');
  let preventAckRate = 0;
  if (preventPolicy) {
    const acked = new Set(acks.filter((a) => a.policy_id === preventPolicy.id && a.policy_version === preventPolicy.version).map((a) => a.user_id));
    const eligible = staff.filter((s) => s.user_id);
    preventAckRate = pct(eligible.filter((s) => s.user_id && acked.has(s.user_id)).length, eligible.length || 1);
  }
  const bvRag: RagStatus = curriculum?.include_british_values ? 'green' : 'red';
  const preventRag: RagStatus = !preventPolicy ? 'red' : ragFromPct(preventAckRate, 70, 95);
  const inclusionRag: RagStatus = curriculum?.include_inclusive_practice ? 'green' : 'amber';
  const dslRag: RagStatus = dsls.length > 0 ? 'green' : 'red';

  const livePolicies = policies.filter((p) => p.status === 'live');
  const reqAckPolicies = livePolicies.filter((p) => p.requires_acknowledgement);
  const eligibleStaff = staff.filter((s) => s.user_id);
  const eligibleUserIds = new Set(eligibleStaff.map((s) => s.user_id as string));
  let totalAckSlots = 0;
  let totalAckHits = 0;
  for (const p of reqAckPolicies) {
    totalAckSlots += eligibleStaff.length;
    const matched = acks.filter((a) => a.policy_id === p.id && a.policy_version === p.version && eligibleUserIds.has(a.user_id));
    totalAckHits += new Set(matched.map((a) => a.user_id)).size;
  }
  const policyAckRate = pct(totalAckHits, totalAckSlots || 1);
  const policyAckRag: RagStatus = reqAckPolicies.length === 0 ? 'amber' : ragFromPct(policyAckRate, 70, 95);
  const iqaThisYear = iqaSamples.length;
  const iqaRag: RagStatus = iqaThisYear === 0 ? 'red' : iqaThisYear < 5 ? 'amber' : 'green';

  const verifiedOtj = otj.filter((o) => o.verification_status === 'verified').length;
  const totalOtj = otj.length;
  const otjVerifyRate = pct(verifiedOtj, totalOtj || 1);
  const activeStudents = students.filter((s) => {
    const st = (s.status ?? '').toLowerCase();
    return st !== 'archived' && st !== 'withdrawn';
  }).length;
  const otjRag: RagStatus = totalOtj === 0 ? 'red' : ragFromPct(otjVerifyRate, 60, 85);

  // Progress reviews (funding rules para 97): every learner within 3 calendar
  // months, the employer attending most of them.
  const { data: board } = await client.rpc('get_review_board');
  const reviewRows = ((board as any)?.rows ?? []) as Array<{ state: string; employer_attended: number; reviews_done: number }>;
  const reviewsOverdue = reviewRows.filter((r) => r.state === 'overdue' || r.state === 'late').length;
  const reviewsInDate = reviewRows.length - reviewsOverdue;
  const reviewRate = pct(reviewsInDate, reviewRows.length || 1);
  const reviewRag: RagStatus = reviewRows.length === 0 ? 'amber' : ragFromPct(reviewRate, 80, 95);
  const empDone = reviewRows.reduce((n, r) => n + (r.reviews_done ?? 0), 0);
  const empAttended = reviewRows.reduce((n, r) => n + (r.employer_attended ?? 0), 0);
  const empRate = pct(empAttended, empDone || 1);
  const empRag: RagStatus = empDone === 0 ? 'amber' : ragFromPct(empRate, 50, 75);

  const area = (key: ToolkitAreaKey, summary: string, evidence: EvidenceRow[], gaps: string[] = []): JudgementSignal => ({
    key,
    title: TOOLKIT_AREA_TITLE[key],
    rag: worst(evidence.map((e) => e.status ?? 'grey')),
    summary,
    evidence,
    gaps,
  });

  const judgements: JudgementSignal[] = [
    area(
      'safeguarding',
      `DSL ${dsls.length > 0 ? 'named' : 'not named'} · Prevent ${preventPolicy ? `${preventAckRate}% signed` : 'no live policy'}`,
      [
        { label: 'DSL named', value: dsls.length > 0 ? dslNames || 'Set' : 'No DSL with an account', status: dslRag },
        {
          label: 'Prevent policy signed by staff',
          value: preventPolicy ? `v${preventPolicy.version} · ${preventAckRate}%` : 'No live policy',
          status: preventRag,
        },
      ],
      ['Mental health and wellbeing log not tracked yet']
    ),
    area('inclusion', `Inclusive practice ${curriculum?.include_inclusive_practice ? 'set up' : 'not set up'} in the curriculum`, [
      { label: 'Inclusive practice embedded', value: curriculum?.include_inclusive_practice ? 'Yes' : 'Not configured', status: inclusionRag },
    ]),
    area(
      'leadership_governance',
      `${livePolicies.length} live policies · ${policyAckRate}% staff signed · ${iqaThisYear} IQA samples (12 months)`,
      [
        { label: 'Policy acknowledgement rate', value: `${policyAckRate}% across ${reqAckPolicies.length} required`, status: policyAckRag },
        {
          label: 'Live policies in vault',
          value: `${livePolicies.length} live · ${policies.length - livePolicies.length} draft/archived`,
          status: livePolicies.length === 0 ? 'red' : 'green',
        },
        { label: 'IQA samples (last 12 months)', value: `${iqaThisYear} samples`, status: iqaRag },
        { label: 'Active staff on roll', value: `${staff.length} staff`, status: 'green' },
      ],
      ['CPD currency rate not yet computed', 'Risk register (institutional) not tracked yet']
    ),
    area(
      'skills_needs',
      empDone ? `Employers attended ${empRate}% of progress reviews` : 'No signed progress reviews yet',
      [
        {
          label: 'Employer attended progress reviews',
          value: empDone ? `${empAttended} of ${empDone} (${empRate}%)` : 'No signed reviews yet',
          status: empRag,
        },
      ],
      ['Employer and local skills plan links not tracked yet']
    ),
    area(
      'curriculum_teaching_training',
      `${planCount} lessons in last ${auditWindowDays} days · ${otjVerifyRate}% OTJ checked · ${reviewRate}% reviews in date`,
      [
        {
          label: 'Curriculum set up with British values, stretch and inclusive practice',
          value: intentSet ? 'All three set' : 'Some missing',
          status: intentRag,
        },
        { label: `Lesson plans delivered (last ${auditWindowDays} days)`, value: `${planCount} delivered`, status: implRag },
        { label: 'Lesson observations recorded', value: `${obsRated} recorded (${auditWindowDays} days)`, status: obsRag },
        { label: 'Off-the-job hours checked by an assessor', value: `${verifiedOtj}/${totalOtj} verified`, status: otjRag },
        {
          label: 'Progress reviews within 3 calendar months',
          value: `${reviewsInDate}/${reviewRows.length} learners${reviewsOverdue ? ` · ${reviewsOverdue} overdue` : ''}`,
          status: reviewRag,
        },
      ],
      ['IQA checks on assessor sign-off of off-the-job hours not recorded yet']
    ),
    area(
      'achievement',
      `${activeStudents} active apprentices · ${epaTutor.length ? `${passRate}% predicted to pass EPA` : 'no tutor EPA predictions yet'}`,
      [
        {
          label: 'Predicted end-point assessment pass rate',
          value: epaTutor.length ? `${passRate}% (${epaTutor.length} tutor judgements)` : 'No tutor judgements yet',
          status: impactRag,
        },
        { label: 'Active apprentices', value: `${activeStudents} on roll`, status: 'green' },
      ]
    ),
    area(
      'participation_development',
      sessions
        ? `${attendanceRate}% attendance · ${punctualityRate}% punctuality (last ${auditWindowDays} days)`
        : `No register marks in the last ${auditWindowDays} days`,
      [
        {
          label: 'Attendance rate',
          value: sessions
            ? `${attendanceRate}% (${present + late} of ${sessions} marks${authorised ? `, ${authorised} authorised absence` : ''})`
            : 'No register marks',
          status: attendanceRag,
        },
        { label: 'Punctuality', value: present + late ? `${punctualityRate}% on time` : 'No attendance yet', status: punctualityRag },
        { label: 'British values embedded in curriculum', value: curriculum?.include_british_values ? 'Yes' : 'Not configured', status: bvRag },
      ],
      ['Fundamental British values and wellbeing not tracked yet', 'Careers advice and guidance records not tracked yet']
    ),
  ];

  return {
    generated_at: new Date().toISOString(),
    college_id: collegeId,
    college_name: collegeName,
    audit_window_days: auditWindowDays,
    judgements,
  };
}
