import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useOfstedSignals — aggregate live signals from across the college hub and
   bucket them under the four Ofsted EIF judgements + the apprenticeship lens.
   Pure read-only aggregator. RLS scopes everything to the caller's college.

   Each judgement returns a RAG dot (red/amber/green/grey), a one-line summary,
   and 3-5 evidence rows the inspector can click through to.

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
  key:
    | 'quality_of_education'
    | 'behaviour_and_attitudes'
    | 'personal_development'
    | 'leadership_and_management'
    | 'apprenticeships';
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

      const { data: profile } = await supabase
        .from('profiles')
        .select('college_id')
        .eq('id', userId)
        .maybeSingle();
      const collegeId = (profile as { college_id?: string | null } | null)?.college_id ?? null;
      if (!collegeId) throw new Error('No college on profile');

      const { data: college } = await supabase
        .from('colleges')
        .select('id, name')
        .eq('id', collegeId)
        .maybeSingle();

      const ninetyDaysAgo = new Date(Date.now() - 90 * dayMs).toISOString().slice(0, 10);
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
          .select('id, name, role, user_id, archived_at')
          .eq('college_id', collegeId)
          .is('archived_at', null),
        supabase
          .from('college_policies')
          .select('id, category, status, version, requires_acknowledgement')
          .eq('college_id', collegeId),
        supabase.from('policy_acknowledgements').select('policy_id, user_id, policy_version'),
        supabase.from('college_attendance').select('status, date').gte('date', ninetyDaysAgo),
        supabase
          .from('college_observations')
          .select('id, observed_at, outcome')
          .gte('observed_at', ninetyDaysAgo),
        supabase
          .from('college_lesson_plans')
          .select('id, scheduled_date, status, created_at')
          .gte('scheduled_date', ninetyDaysAgo),
        supabase
          .from('college_otj_entries')
          .select('id, duration_minutes, activity_date, verification_status')
          .gte('activity_date', ninetyDaysAgo),
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
      }>;

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
      const lessonPlans = (lessonPlansRes.data ?? []) as Array<{ status: string | null }>;
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

      // ─── Quality of education ──────────────────────────────────────
      const intentSet = Boolean(
        curriculum?.include_british_values &&
        curriculum?.include_stretch_challenge &&
        curriculum?.include_inclusive_practice
      );
      const planCount = lessonPlans.length;
      const epaTutor = epa.filter((e) => e.source === 'tutor');
      const epaPassEquiv = epaTutor.filter(
        (e) => e.predicted_grade && e.predicted_grade !== 'fail'
      ).length;
      const passRate = pct(epaPassEquiv, epaTutor.length || 1);
      const intentRag: RagStatus = intentSet ? 'green' : 'amber';
      const implRag: RagStatus = planCount === 0 ? 'red' : planCount < 5 ? 'amber' : 'green';
      const impactRag: RagStatus = ragFromPct(passRate, 60, 80);
      const qualityRag: RagStatus = worst([intentRag, implRag, impactRag]);

      const qualityOfEducation: JudgementSignal = {
        key: 'quality_of_education',
        title: 'Quality of education',
        rag: qualityRag,
        summary: `${planCount} lessons in last 90 days · ${passRate}% predicted pass-equivalent`,
        evidence: [
          {
            label: 'Intent — BV / Stretch / Inclusive practice configured',
            value: intentSet ? 'All three set' : 'Some missing',
            status: intentRag,
            href: '/college/curriculum-settings',
          },
          {
            label: 'Implementation — lesson plans (last 90d)',
            value: `${planCount} delivered`,
            status: implRag,
            href: '/college/lesson-plans',
          },
          {
            label: 'Impact — predicted EPA pass-equivalent',
            value: `${passRate}% (${epaTutor.length} judgements)`,
            status: impactRag,
            href: '/college',
          },
        ],
        gaps: [],
      };

      // ─── Behaviour & attitudes ─────────────────────────────────────
      const present = attendance.filter((a) => a.status === 'present').length;
      const late = attendance.filter((a) => a.status === 'late').length;
      const totalSessions = attendance.length || 1;
      const attendanceRate = pct(present + late, totalSessions);
      const punctualityRate = pct(present, present + late || 1);
      const obsRated = observations.filter((o) => o.outcome).length;

      const attendanceRag = ragFromPct(attendanceRate, 80, 90);
      const punctualityRag = ragFromPct(punctualityRate, 85, 95);
      const obsRag: RagStatus = obsRated === 0 ? 'amber' : 'green';
      const behaviourRag = worst([attendanceRag, punctualityRag, obsRag]);

      const behaviour: JudgementSignal = {
        key: 'behaviour_and_attitudes',
        title: 'Behaviour & attitudes',
        rag: behaviourRag,
        summary: `${attendanceRate}% attendance · ${punctualityRate}% punctuality (last 90d)`,
        evidence: [
          {
            label: 'Attendance rate',
            value: `${attendanceRate}% (${totalSessions} sessions)`,
            status: attendanceRag,
            href: '/college',
          },
          {
            label: 'Punctuality',
            value: `${punctualityRate}% on time`,
            status: punctualityRag,
            href: '/college',
          },
          {
            label: 'Observations recorded',
            value: `${obsRated} with conduct rating (90d)`,
            status: obsRag,
            href: '/college',
          },
        ],
        gaps: [],
      };

      // ─── Personal development ──────────────────────────────────────
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

      const personalDev: JudgementSignal = {
        key: 'personal_development',
        title: 'Personal development',
        rag: worst([bvRag, preventRag, inclusionRag]),
        summary: `BV ${bvRag === 'green' ? '✓' : '✗'} · Prevent ack ${preventPolicy ? `${preventAckRate}%` : 'no policy'} · Inclusion ${inclusionRag === 'green' ? '✓' : '✗'}`,
        evidence: [
          {
            label: 'British Values embedded in curriculum',
            value: curriculum?.include_british_values ? 'Yes' : 'Not configured',
            status: bvRag,
            href: '/college/curriculum-settings',
          },
          {
            label: 'Prevent policy + ack rate',
            value: preventPolicy
              ? `v${preventPolicy.version} · ${preventAckRate}%`
              : 'No live policy',
            status: preventRag,
            href: '/college/compliance',
          },
          {
            label: 'Inclusive practice embedded',
            value: curriculum?.include_inclusive_practice ? 'Yes' : 'Not configured',
            status: inclusionRag,
            href: '/college/curriculum-settings',
          },
          {
            label: 'DSL named',
            value: curriculum?.dsl_name || 'Not set',
            status: curriculum?.dsl_name ? 'green' : 'red',
            href: '/college/curriculum-settings',
          },
        ],
        gaps: [
          'SMSC threads not tracked yet',
          'Careers / IAG records not tracked yet',
          'Mental-health & wellbeing log not tracked yet',
        ],
      };

      // ─── Leadership & management ───────────────────────────────────
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
      const policyAckRag =
        reqAckPolicies.length === 0 ? 'amber' : ragFromPct(policyAckRate, 70, 95);

      const iqaThisYear = iqaSamples.length;
      const iqaRag: RagStatus = iqaThisYear === 0 ? 'red' : iqaThisYear < 5 ? 'amber' : 'green';

      const leadership: JudgementSignal = {
        key: 'leadership_and_management',
        title: 'Leadership & management',
        rag: worst([policyAckRag, iqaRag]),
        summary: `${livePolicies.length} live policies · ${policyAckRate}% staff acked · ${iqaThisYear} IQA samples (12mo)`,
        evidence: [
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
        gaps: [
          'CPD currency rate not yet computed',
          'Risk register (institutional) not tracked yet',
        ],
      };

      // ─── Apprenticeships ───────────────────────────────────────────
      const verifiedOtj = otj.filter((o) => o.verification_status === 'verified').length;
      const totalOtj = otj.length;
      const otjVerifyRate = pct(verifiedOtj, totalOtj || 1);
      const activeStudents = students.filter(
        (s) => s.status !== 'archived' && s.status !== 'withdrawn'
      ).length;
      const otjRag: RagStatus = totalOtj === 0 ? 'red' : ragFromPct(otjVerifyRate, 60, 85);
      const bvScIpRag: RagStatus = intentSet ? 'green' : 'amber';

      const apprenticeships: JudgementSignal = {
        key: 'apprenticeships',
        title: 'Apprenticeships',
        rag: worst([otjRag, bvScIpRag]),
        summary: `${activeStudents} active apprentices · ${otjVerifyRate}% OTJ verified (90d)`,
        evidence: [
          {
            label: 'OTJ entries with assessor verification',
            value: `${verifiedOtj}/${totalOtj} verified`,
            status: otjRag,
            href: '/college',
          },
          {
            label: 'BV / Stretch & challenge / Inclusive practice embedded',
            value: intentSet ? 'All three set' : 'Some missing',
            status: bvScIpRag,
            href: '/college/curriculum-settings',
          },
          {
            label: 'Active apprentices',
            value: `${activeStudents} on roll`,
            status: 'green',
            href: '/college',
          },
          {
            label: 'Observations (last 90d)',
            value: `${obsRated} recorded`,
            status: obsRag,
            href: '/college',
          },
        ],
        gaps: [
          'Tripartite reviews (apprentice + tutor + employer) not tracked yet',
          'Employer engagement surface parked',
          'IQA-checks-assessor chain on OTJ not yet shipped',
        ],
      };

      setData({
        generated_at: new Date().toISOString(),
        college_id: collegeId,
        college_name: (college as { name?: string } | null)?.name ?? null,
        judgements: [qualityOfEducation, behaviour, personalDev, leadership, apprenticeships],
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
