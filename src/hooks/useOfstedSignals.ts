import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { getMyCollegeId } from '@/lib/myCollege';
import {
  TOOLKIT_AREA_TITLE,
  type ToolkitAreaKey,
} from '@/components/college/quality/ComplianceToolkit';

/* ==========================================================================
   useOfstedSignals — aggregate live signals from across the college hub and
   key them by the seven evaluation areas of Ofsted's renewed framework for
   further education and skills (from November 2025; ELE-2021). The area
   list lives in ComplianceToolkit / _shared/ofsted-fe-skills-framework.ts.
   Pure read-only aggregator. RLS scopes everything to the caller's college.

   Each area returns a RAG dot (red/amber/green/grey: evidence readiness,
   never a predicted grade), a one-line summary, and evidence rows the
   inspector can click through to.

   "grey" = signal not tracked yet (a known gap, surfaced honestly).
   ========================================================================== */

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
  /** Known gaps the user should action — surfaced as red/grey rows below evidence. */
  gaps: string[];
}

export interface OfstedSnapshot {
  generated_at: string;
  college_id: string | null;
  college_name: string | null;
  judgements: JudgementSignal[];
}

const dayMs = 86_400_000;

function pct(n: number, d: number): number {
  if (!d) return 0;
  return Math.round((n / d) * 100);
}

function ragFromPct(p: number, redBelow: number, amberBelow: number): RagStatus {
  if (p < redBelow) return 'red';
  if (p < amberBelow) return 'amber';
  return 'green';
}

export function useOfstedSignals() {
  const [data, setData] = useState<OfstedSnapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data: userRes } = await supabase.auth.getUser();
      const userId = userRes.user?.id ?? null;
      if (!userId) throw new Error('Not signed in');

      const collegeId = await getMyCollegeId(userId);
      if (!collegeId) throw new Error('No college on profile');

      const { data: college } = await supabase
        .from('colleges')
        .select('id, name')
        .eq('id', collegeId)
        .maybeSingle();

      // Audit window is per-college configurable (defaults 90 days). Falls
      // back to 90 if the college hasn't created a settings row yet.
      const { data: cs } = await supabase
        .from('college_settings')
        .select('audit_window_days')
        .eq('college_id', collegeId)
        .maybeSingle();
      const auditWindowDays =
        (cs as { audit_window_days?: number } | null)?.audit_window_days ?? 90;

      const auditCutoff = new Date(Date.now() - auditWindowDays * dayMs).toISOString().slice(0, 10);
      const yearAgo = new Date(Date.now() - 365 * dayMs).toISOString();

      const [
        curriculumRes,
        staffRes,
        policiesRes,
        acksRes,
        attendanceRes,
        observationsRes,
        lessonPlansRes,
        otjRes,
        iqaPlansRes,
        epaRes,
        studentsRes,
      ] = await Promise.all([
        supabase
          .from('college_curriculum_settings')
          .select(
            'include_british_values, include_stretch_challenge, include_inclusive_practice, prevent_lead_name, dsl_name'
          )
          .eq('college_id', collegeId)
          .maybeSingle(),
        supabase
          .from('college_staff')
          .select('id, name, role, user_id, archived_at, status, is_dsl')
          .eq('college_id', collegeId)
          .is('archived_at', null),
        supabase
          .from('college_policies')
          .select('id, category, status, version, requires_acknowledgement')
          .eq('college_id', collegeId),
        // Acknowledgements are scoped through the policy relationship so we
        // never accidentally pull rows from other colleges. We use an inner
        // join filter on college_policies.college_id rather than relying on
        // RLS alone — RLS exists, but defense in depth makes the scope
        // explicit at the call site.
        supabase
          .from('policy_acknowledgements')
          .select('policy_id, user_id, policy_version, college_policies!inner(college_id)')
          .eq('college_policies.college_id', collegeId),
        supabase.from('college_attendance').select('status, date').gte('date', auditCutoff),
        supabase
          .from('college_observations')
          .select('id, observed_at, outcome')
          .gte('observed_at', auditCutoff),
        // Delivered = scheduled in the window, on or before today, and ready
        // or delivered (drafts and future lessons are not delivery).
        supabase
          .from('college_lesson_plans')
          .select('id, scheduled_date, status, created_at')
          .eq('college_id', collegeId)
          .gte('scheduled_date', auditCutoff)
          .lte('scheduled_date', new Date().toISOString().slice(0, 10))
          .in('status', ['ready', 'delivered']),
        supabase
          .from('college_otj_entries')
          .select('id, duration_minutes, activity_date, verification_status')
          .gte('activity_date', auditCutoff),
        // IQA plans for THIS college within the period — used as the parent
        // filter for the actual samples lookup below. We resolve plans in
        // parallel with everything else, then issue a follow-up samples
        // query once we know the plan ids (RLS scopes samples through
        // their parent plan's college_id).
        supabase.from('college_iqa_sampling').select('id').eq('college_id', collegeId),
        supabase
          .from('college_epa_judgements')
          .select('predicted_grade, source, created_at')
          .gte('created_at', yearAgo),
        supabase.from('college_students').select('id, status').eq('college_id', collegeId),
      ]);
      // Recorded deliveries count too, even if the plan was never marked ready.
      // college_lesson_deliveries is not in the generated types yet.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: deliveriesData } = await (supabase as any)
        .from('college_lesson_deliveries')
        .select('lesson_plan_id, delivered_on')
        .eq('college_id', collegeId)
        .gte('delivered_on', auditCutoff);

      const curriculum = (curriculumRes.data ?? null) as {
        include_british_values?: boolean;
        include_stretch_challenge?: boolean;
        include_inclusive_practice?: boolean;
        prevent_lead_name?: string | null;
        dsl_name?: string | null;
      } | null;

      const staff = (staffRes.data ?? []) as Array<{
        id: string;
        name: string;
        role: string;
        user_id: string | null;
        status: string | null;
        is_dsl: boolean | null;
      }>;
      // The DSL is whoever the staff list says it is (active, not archived,
      // flagged as DSL, with an account so concerns reach them), not the
      // free-text name in curriculum settings.
      const dsls = staff.filter(
        (st) =>
          st.is_dsl && !!st.user_id && (st.status ?? 'active').trim().toLowerCase() === 'active'
      );
      const dslNames = dsls
        .map((d) => d.name)
        .filter(Boolean)
        .join(', ');

      const policies = (policiesRes.data ?? []) as Array<{
        id: string;
        category: string;
        status: 'draft' | 'live' | 'archived';
        version: number;
        requires_acknowledgement: boolean;
      }>;

      const acks = (acksRes.data ?? []) as Array<{
        policy_id: string;
        user_id: string;
        policy_version: number;
      }>;

      const attendance = (attendanceRes.data ?? []) as Array<{ status: string | null }>;
      const observations = (observationsRes.data ?? []) as Array<{
        outcome: string | null;
      }>;
      const lessonPlans = (lessonPlansRes.data ?? []) as Array<{
        id: string;
        status: string | null;
      }>;
      const deliveredIds = new Set(lessonPlans.map((p) => p.id));
      let unplannedDeliveries = 0;
      for (const d of (deliveriesData ?? []) as Array<{ lesson_plan_id: string | null }>) {
        if (d.lesson_plan_id) deliveredIds.add(d.lesson_plan_id);
        else unplannedDeliveries += 1;
      }
      const otj = (otjRes.data ?? []) as Array<{
        duration_minutes: number | null;
        verification_status: string | null;
      }>;
      // Resolve IQA samples for our college's plans (RLS-safe two-step).
      const iqaPlanIds = ((iqaPlansRes.data ?? []) as Array<{ id: string }>).map((p) => p.id);
      let iqaSamples: Array<{ verdict: string | null }> = [];
      if (iqaPlanIds.length > 0) {
        const { data: samplesData } = await supabase
          .from('college_iqa_samples')
          .select('verdict, sampled_at')
          .in('sampling_plan_id', iqaPlanIds)
          .gte('sampled_at', yearAgo);
        iqaSamples = (samplesData ?? []) as Array<{ verdict: string | null }>;
      }
      const epa = (epaRes.data ?? []) as Array<{
        predicted_grade: string | null;
        source: string | null;
      }>;
      const students = (studentsRes.data ?? []) as Array<{ status: string | null }>;

      // Every signal below is filed under the evaluation area it evidences in
      // Ofsted's renewed FE and skills framework (ComplianceToolkit). RAG =
      // how ready our evidence is, never a predicted grade.

      // ─── Shared figures ───────────────────────────────────────────
      const intentSet = Boolean(
        curriculum?.include_british_values &&
        curriculum?.include_stretch_challenge &&
        curriculum?.include_inclusive_practice
      );
      const planCount = deliveredIds.size + unplannedDeliveries;
      const epaTutor = epa.filter((e) => e.source === 'tutor');
      const epaPassEquiv = epaTutor.filter(
        (e) => e.predicted_grade && e.predicted_grade !== 'fail'
      ).length;
      const passRate = pct(epaPassEquiv, epaTutor.length || 1);
      const intentRag: RagStatus = intentSet ? 'green' : 'amber';
      const implRag: RagStatus = planCount === 0 ? 'red' : planCount < 5 ? 'amber' : 'green';
      const impactRag: RagStatus = epaTutor.length === 0 ? 'grey' : ragFromPct(passRate, 60, 80);

      // Registers store 'Present' / 'Late' / 'Absent' / 'Authorised' (capitalised).
      // Compare case-insensitively: an exact 'present' match read every
      // session as absent and showed 0% attendance (ELE-2021).
      const statusOf = (a: { status: string | null }) => (a.status ?? '').trim().toLowerCase();
      const present = attendance.filter((a) => statusOf(a) === 'present').length;
      const late = attendance.filter((a) => statusOf(a) === 'late').length;
      const authorised = attendance.filter((a) => statusOf(a) === 'authorised').length;
      const sessions = attendance.length;
      const attendanceRate = pct(present + late, sessions || 1);
      const punctualityRate = pct(present, present + late || 1);
      const obsRated = observations.filter((o) => o.outcome).length;

      const attendanceRag: RagStatus = sessions === 0 ? 'grey' : ragFromPct(attendanceRate, 80, 90);
      const punctualityRag: RagStatus =
        present + late === 0 ? 'grey' : ragFromPct(punctualityRate, 85, 95);
      const obsRag: RagStatus = obsRated === 0 ? 'amber' : 'green';

      const preventPolicy = policies.find((p) => p.category === 'prevent' && p.status === 'live');
      let preventAckRate = 0;
      if (preventPolicy) {
        const preventAcks = acks.filter(
          (a) => a.policy_id === preventPolicy.id && a.policy_version === preventPolicy.version
        );
        const ackedUserIds = new Set(preventAcks.map((a) => a.user_id));
        const eligible = staff.filter((s) => s.user_id);
        preventAckRate = pct(
          eligible.filter((s) => s.user_id && ackedUserIds.has(s.user_id)).length,
          eligible.length || 1
        );
      }
      const bvRag: RagStatus = curriculum?.include_british_values ? 'green' : 'red';
      const preventRag: RagStatus = !preventPolicy ? 'red' : ragFromPct(preventAckRate, 70, 95);
      const inclusionRag: RagStatus = curriculum?.include_inclusive_practice ? 'green' : 'amber';
      const dslRag: RagStatus = dsls.length > 0 ? 'green' : 'red';

      const livePolicies = policies.filter((p) => p.status === 'live');
      const reqAckPolicies = livePolicies.filter((p) => p.requires_acknowledgement);
      let totalAckSlots = 0;
      let totalAckHits = 0;
      const eligibleStaff = staff.filter((s) => s.user_id);
      const eligibleUserIds = new Set(eligibleStaff.map((s) => s.user_id as string));
      for (const p of reqAckPolicies) {
        totalAckSlots += eligibleStaff.length;
        const matched = acks.filter(
          (a) =>
            a.policy_id === p.id && a.policy_version === p.version && eligibleUserIds.has(a.user_id)
        );
        totalAckHits += new Set(matched.map((a) => a.user_id)).size;
      }
      const policyAckRate = pct(totalAckHits, totalAckSlots || 1);
      const policyAckRag: RagStatus =
        reqAckPolicies.length === 0 ? 'amber' : ragFromPct(policyAckRate, 70, 95);
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

      // Progress reviews (funding rules para 97): every learner within 3
      // calendar months, the employer attending most of them.
      const { data: board } = await supabase.rpc('get_review_board' as never);
      const reviewRows =
        (
          board as unknown as {
            rows?: Array<{ state: string; employer_attended: number; reviews_done: number }>;
          }
        )?.rows ?? [];
      const reviewsOverdue = reviewRows.filter(
        (r) => r.state === 'overdue' || r.state === 'late'
      ).length;
      const reviewsInDate = reviewRows.length - reviewsOverdue;
      const reviewRate = pct(reviewsInDate, reviewRows.length || 1);
      const reviewRag: RagStatus =
        reviewRows.length === 0 ? 'amber' : ragFromPct(reviewRate, 80, 95);
      const empDone = reviewRows.reduce((n, r) => n + r.reviews_done, 0);
      const empAttended = reviewRows.reduce((n, r) => n + r.employer_attended, 0);
      const empRate = pct(empAttended, empDone || 1);
      const empRag: RagStatus = empDone === 0 ? 'amber' : ragFromPct(empRate, 50, 75);

      const area = (
        key: ToolkitAreaKey,
        summary: string,
        evidence: EvidenceRow[],
        gaps: string[] = []
      ): JudgementSignal => ({
        key,
        title: TOOLKIT_AREA_TITLE[key],
        rag: worst(evidence.map((e) => e.status ?? 'grey')),
        summary,
        evidence,
        gaps,
      });

      // ─── Safeguarding (met / not met) ──────────────────────────────
      const safeguarding = area(
        'safeguarding',
        `DSL ${dsls.length > 0 ? 'named' : 'not named'} · Prevent ${preventPolicy ? `${preventAckRate}% signed` : 'no live policy'}`,
        [
          {
            label: 'DSL named',
            value: dsls.length > 0 ? dslNames || 'Set' : 'No DSL with an account',
            status: dslRag,
            href: '/college?section=compliancedocs',
          },
          {
            label: 'Prevent policy signed by staff',
            value: preventPolicy
              ? `v${preventPolicy.version} · ${preventAckRate}%`
              : 'No live policy',
            status: preventRag,
            href: '/college/compliance',
          },
        ],
        ['Mental health and wellbeing log not tracked yet']
      );

      // ─── Inclusion ─────────────────────────────────────────────────
      const inclusion = area(
        'inclusion',
        `Inclusive practice ${curriculum?.include_inclusive_practice ? 'set up' : 'not set up'} in the curriculum`,
        [
          {
            label: 'Inclusive practice embedded',
            value: curriculum?.include_inclusive_practice ? 'Yes' : 'Not configured',
            status: inclusionRag,
            href: '/college/settings/curriculum',
          },
        ]
      );

      // ─── Leadership and governance ─────────────────────────────────
      const leadership = area(
        'leadership_governance',
        `${livePolicies.length} live policies · ${policyAckRate}% staff signed · ${iqaThisYear} IQA samples (12 months)`,
        [
          {
            label: 'Policy acknowledgement rate',
            value: `${policyAckRate}% across ${reqAckPolicies.length} required`,
            status: policyAckRag,
            href: '/college/compliance',
          },
          {
            label: 'Live policies in vault',
            value: `${livePolicies.length} live · ${policies.length - livePolicies.length} draft/archived`,
            status: livePolicies.length === 0 ? 'red' : 'green',
            href: '/college/compliance',
          },
          {
            label: 'IQA samples (last 12 months)',
            value: `${iqaThisYear} samples`,
            status: iqaRag,
            href: '/college/iqa',
          },
          {
            label: 'Active staff on roll',
            value: `${staff.length} staff`,
            status: 'green',
            href: '/college/compliance',
          },
        ],
        ['CPD currency rate not yet computed', 'Risk register (institutional) not tracked yet']
      );

      // ─── Contribution to meeting skills needs (colleges) ───────────
      const skillsNeeds = area(
        'skills_needs',
        empDone
          ? `Employers attended ${empRate}% of progress reviews`
          : 'No signed progress reviews yet',
        [
          {
            label: 'Employer attended progress reviews',
            value: empDone ? `${empAttended} of ${empDone} (${empRate}%)` : 'No signed reviews yet',
            status: empRag,
            href: '/college/reviews?filter=employer',
          },
        ],
        // Nothing in the live data evidences this area beyond employer
        // attendance at reviews; say so rather than look complete.
        ['Employer and local skills plan links not tracked yet']
      );

      // ─── Curriculum, teaching and training ─────────────────────────
      const curriculumArea = area(
        'curriculum_teaching_training',
        `${planCount} lessons in last ${auditWindowDays} days · ${otjVerifyRate}% OTJ checked · ${reviewRate}% reviews in date`,
        [
          {
            label: 'Curriculum set up with British values, stretch and inclusive practice',
            value: intentSet ? 'All three set' : 'Some missing',
            status: intentRag,
            href: '/college/settings/curriculum',
          },
          {
            label: `Lesson plans delivered (last ${auditWindowDays} days)`,
            value: `${planCount} delivered`,
            status: implRag,
            href: '/college?section=lessonplans',
          },
          {
            label: 'Lesson observations recorded',
            value: `${obsRated} recorded (${auditWindowDays} days)`,
            status: obsRag,
            href: '/college',
          },
          {
            label: 'Off-the-job hours checked by an assessor',
            value: `${verifiedOtj}/${totalOtj} verified`,
            status: otjRag,
            href: '/college',
          },
          {
            label: 'Progress reviews within 3 calendar months',
            value: `${reviewsInDate}/${reviewRows.length} learners${reviewsOverdue ? ` · ${reviewsOverdue} overdue` : ''}`,
            status: reviewRag,
            href: '/college/reviews',
          },
        ],
        ['IQA checks on assessor sign-off of off-the-job hours not recorded yet']
      );

      // ─── Achievement ───────────────────────────────────────────────
      const achievement = area(
        'achievement',
        `${activeStudents} active apprentices · ${epaTutor.length ? `${passRate}% predicted to pass EPA` : 'no tutor EPA predictions yet'}`,
        [
          {
            label: 'Predicted end-point assessment pass rate',
            value: epaTutor.length
              ? `${passRate}% (${epaTutor.length} tutor judgements)`
              : 'No tutor judgements yet',
            status: impactRag,
            href: '/college',
          },
          {
            label: 'Active apprentices',
            value: `${activeStudents} on roll`,
            status: 'green',
            href: '/college',
          },
        ]
      );

      // ─── Participation and development ─────────────────────────────
      const participation = area(
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
            href: '/college',
          },
          {
            label: 'Punctuality',
            value: present + late ? `${punctualityRate}% on time` : 'No attendance yet',
            status: punctualityRag,
            href: '/college',
          },
          {
            label: 'British values embedded in curriculum',
            value: curriculum?.include_british_values ? 'Yes' : 'Not configured',
            status: bvRag,
            href: '/college/settings/curriculum',
          },
        ],
        [
          'Fundamental British values and wellbeing not tracked yet',
          'Careers advice and guidance records not tracked yet',
        ]
      );

      setData({
        generated_at: new Date().toISOString(),
        college_id: collegeId,
        college_name: (college as { name?: string } | null)?.name ?? null,
        judgements: [
          safeguarding,
          inclusion,
          leadership,
          skillsNeeds,
          curriculumArea,
          achievement,
          participation,
        ],
      });
    } catch (e) {
      setError((e as Error).message ?? 'Could not build Ofsted signals');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, loading, error, refresh: fetch };
}

/** Return the worst RAG status across a set — red beats amber beats green. */
function worst(rags: RagStatus[]): RagStatus {
  if (rags.includes('red')) return 'red';
  if (rags.includes('amber')) return 'amber';
  if (rags.includes('grey')) return 'grey';
  return 'green';
}
