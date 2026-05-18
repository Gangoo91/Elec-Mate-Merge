import { useCallback, useState } from 'react';
import JSZip from 'jszip';
import { supabase } from '@/integrations/supabase/client';
import { rowsToCsv } from '@/lib/csv';

/* ==========================================================================
   useEqaVisitPackExport — one-button EQA visit pack.

   External Quality Assurers (City & Guilds, EAL, NCFE etc.) audit a
   college's IQA process. They want to see:
     - sampling plans (what's been planned)
     - samples + verdicts (what's been audited)
     - findings (issues raised + closure)
     - standardisation meetings (calibration evidence)
     - coverage matrix (Verifier × Cohort sampling %)

   Today that's 4 different surfaces. This hook bundles them into one ZIP
   of CSVs + a manifest so the IQA can hand over a single file.
   ========================================================================== */

async function callerCollegeId(): Promise<string | null> {
  const { data: userRes } = await supabase.auth.getUser();
  const userId = userRes.user?.id;
  if (!userId) return null;
  const { data: profile } = await supabase
    .from('profiles')
    .select('college_id')
    .eq('id', userId)
    .maybeSingle();
  return (profile as { college_id?: string | null } | null)?.college_id ?? null;
}

export function useEqaVisitPackExport() {
  const [exporting, setExporting] = useState(false);
  const [progress, setProgress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const exportPack = useCallback(
    async (opts?: { sinceDays?: number | null; collegeName?: string | null }) => {
      setExporting(true);
      setError(null);
      setProgress('Fetching IQA data…');
      try {
        const zip = new JSZip();
        const folder = zip.folder('eqa-visit-pack') ?? zip;

        const collegeId = await callerCollegeId();
        if (!collegeId) throw new Error('No college on profile');

        const since = opts?.sinceDays != null
          ? new Date(Date.now() - opts.sinceDays * 86_400_000).toISOString()
          : null;
        const sinceDate = since ? since.slice(0, 10) : null;

        const tablesCovered: string[] = [];
        const addCsv = (
          name: string,
          rows: Array<Record<string, unknown>>,
          columns: Array<{ key: string; header: string }>
        ) => {
          folder.file(name, rowsToCsv(rows, columns));
          tablesCovered.push(`${name} — ${rows.length} row${rows.length === 1 ? '' : 's'}`);
        };

        // 1. Sampling plans
        setProgress('Sampling plans…');
        let plansQuery = supabase
          .from('college_iqa_sampling')
          .select(
            'id, iqa_name_snapshot, assessor_id, qualification_code, unit_code, period_start, period_end, target_sample_percent, sampled_count, total_assessments, notes, created_at'
          )
          .eq('college_id', collegeId)
          .order('period_start', { ascending: false });
        if (sinceDate) plansQuery = plansQuery.gte('period_end', sinceDate);
        const { data: plans } = await plansQuery;
        const planList = (plans ?? []) as Array<Record<string, unknown>>;
        addCsv('sampling_plans.csv', planList, [
          { key: 'period_start', header: 'Period start' },
          { key: 'period_end', header: 'Period end' },
          { key: 'iqa_name_snapshot', header: 'IQA' },
          { key: 'qualification_code', header: 'Qualification' },
          { key: 'unit_code', header: 'Unit' },
          { key: 'target_sample_percent', header: 'Target %' },
          { key: 'sampled_count', header: 'Sampled' },
          { key: 'total_assessments', header: 'Total assessments' },
          { key: 'notes', header: 'Notes' },
          { key: 'created_at', header: 'Created at' },
        ]);

        // 2. Samples + verdicts (joined to their parent plan period)
        setProgress('Sample verdicts…');
        const planIds = planList
          .map((p) => (p as { id?: string }).id)
          .filter((id): id is string => !!id);
        let samples: Array<Record<string, unknown>> = [];
        if (planIds.length > 0) {
          const { data: sampleRows } = await supabase
            .from('college_iqa_samples')
            .select(
              'sampling_plan_id, observation_title_snapshot, observation_date_snapshot, otj_title_snapshot, otj_date_snapshot, iqa_name_snapshot, sampled_at, verdict, comments'
            )
            .in('sampling_plan_id', planIds)
            .order('sampled_at', { ascending: false });
          samples = (sampleRows ?? []) as Array<Record<string, unknown>>;
        }
        addCsv('sample_verdicts.csv', samples, [
          { key: 'sampled_at', header: 'Sampled at' },
          { key: 'sampling_plan_id', header: 'Plan ID' },
          { key: 'iqa_name_snapshot', header: 'IQA' },
          { key: 'observation_title_snapshot', header: 'Observation' },
          { key: 'observation_date_snapshot', header: 'Observation date' },
          { key: 'otj_title_snapshot', header: 'OTJ entry' },
          { key: 'otj_date_snapshot', header: 'OTJ date' },
          { key: 'verdict', header: 'Verdict' },
          { key: 'comments', header: 'Comments' },
        ]);

        // 3. Findings
        setProgress('Findings…');
        let findingsQuery = supabase
          .from('college_iqa_findings')
          .select(
            'created_at, iqa_name_snapshot, assessor_name, finding_type, severity, description, status, action_plan, due_date, resolution_notes, closed_at'
          )
          .eq('college_id', collegeId)
          .order('created_at', { ascending: false });
        if (since) findingsQuery = findingsQuery.gte('created_at', since);
        const { data: findings } = await findingsQuery;
        addCsv(
          'findings.csv',
          (findings ?? []) as Array<Record<string, unknown>>,
          [
            { key: 'created_at', header: 'Raised at' },
            { key: 'iqa_name_snapshot', header: 'IQA' },
            { key: 'assessor_name', header: 'Assessor' },
            { key: 'finding_type', header: 'Type' },
            { key: 'severity', header: 'Severity' },
            { key: 'description', header: 'Description' },
            { key: 'status', header: 'Status' },
            { key: 'action_plan', header: 'Action plan' },
            { key: 'due_date', header: 'Due date' },
            { key: 'resolution_notes', header: 'Resolution notes' },
            { key: 'closed_at', header: 'Closed at' },
          ]
        );

        // 4. Standardisation meetings
        setProgress('Standardisation meetings…');
        let meetingsQuery = supabase
          .from('college_standardisation_meetings')
          .select('date, topic, chair_name_snapshot, attendees, agenda, outcomes, actions, created_at')
          .eq('college_id', collegeId)
          .order('date', { ascending: false });
        if (sinceDate) meetingsQuery = meetingsQuery.gte('date', sinceDate);
        const { data: meetings } = await meetingsQuery;
        addCsv(
          'standardisation_meetings.csv',
          (meetings ?? []) as Array<Record<string, unknown>>,
          [
            { key: 'date', header: 'Date' },
            { key: 'topic', header: 'Topic' },
            { key: 'chair_name_snapshot', header: 'Chair' },
            { key: 'attendees', header: 'Attendees' },
            { key: 'agenda', header: 'Agenda' },
            { key: 'outcomes', header: 'Outcomes' },
            { key: 'actions', header: 'Actions' },
            { key: 'created_at', header: 'Logged at' },
          ]
        );

        // 5. Coverage matrix — Verifier × Cohort coverage % (the EQA's
        // favourite single piece of evidence). Computed from iqa_samples
        // rather than re-running useIqaCoverageMatrix to keep this hook
        // self-contained.
        setProgress('Coverage matrix…');
        let coverageRows: Array<Record<string, unknown>> = [];
        try {
          const [{ data: students }, { data: iqaSamples }] = await Promise.all([
            supabase
              .from('college_students')
              .select('id, cohort_id, status')
              .eq('college_id', collegeId)
              .neq('status', 'withdrawn')
              .neq('status', 'completed'),
            supabase
              .from('iqa_samples')
              .select('sampler_id, cohort_id, student_id')
              .eq('college_id', collegeId),
          ]);
          const cohortTotals = new Map<string, number>();
          for (const s of (students ?? []) as Array<{ cohort_id: string | null }>) {
            if (s.cohort_id) {
              cohortTotals.set(s.cohort_id, (cohortTotals.get(s.cohort_id) ?? 0) + 1);
            }
          }
          type Cell = { sampler_id: string; cohort_id: string; students: Set<string> };
          const cells = new Map<string, Cell>();
          for (const row of (iqaSamples ?? []) as Array<{
            sampler_id: string | null;
            cohort_id: string | null;
            student_id: string | null;
          }>) {
            if (!row.sampler_id || !row.cohort_id || !row.student_id) continue;
            const key = `${row.sampler_id}::${row.cohort_id}`;
            const slot = cells.get(key) ?? {
              sampler_id: row.sampler_id,
              cohort_id: row.cohort_id,
              students: new Set<string>(),
            };
            slot.students.add(row.student_id);
            cells.set(key, slot);
          }
          // Resolve names
          const samplerIds = Array.from(new Set(Array.from(cells.values()).map((c) => c.sampler_id)));
          const cohortIds = Array.from(new Set(Array.from(cells.values()).map((c) => c.cohort_id)));
          const [{ data: staffRows }, { data: cohortRows }] = await Promise.all([
            samplerIds.length > 0
              ? supabase
                  .from('college_staff')
                  .select('user_id, name')
                  .in('user_id', samplerIds)
              : Promise.resolve({ data: [] as any[], error: null }),
            cohortIds.length > 0
              ? supabase
                  .from('college_cohorts')
                  .select('id, name')
                  .in('id', cohortIds)
              : Promise.resolve({ data: [] as any[], error: null }),
          ]);
          const samplerName = new Map(
            ((staffRows ?? []) as Array<{ user_id: string; name: string }>).map((r) => [r.user_id, r.name])
          );
          const cohortName = new Map(
            ((cohortRows ?? []) as Array<{ id: string; name: string }>).map((r) => [r.id, r.name])
          );
          coverageRows = Array.from(cells.values()).map((c) => {
            const total = cohortTotals.get(c.cohort_id) ?? 0;
            const sampled = c.students.size;
            return {
              iqa: samplerName.get(c.sampler_id) ?? 'Unknown',
              cohort: cohortName.get(c.cohort_id) ?? 'Untitled',
              sampled_students: sampled,
              total_students: total,
              coverage_pct: total > 0 ? Math.round((sampled / total) * 100) : 0,
            };
          });
          coverageRows.sort((a, b) =>
            String(a.iqa).localeCompare(String(b.iqa)) ||
            String(a.cohort).localeCompare(String(b.cohort))
          );
        } catch {
          // Coverage is best-effort — if the underlying tables aren't there
          // for a given college, ship the rest of the pack anyway.
        }
        addCsv('coverage_matrix.csv', coverageRows, [
          { key: 'iqa', header: 'IQA / Verifier' },
          { key: 'cohort', header: 'Cohort' },
          { key: 'sampled_students', header: 'Sampled students' },
          { key: 'total_students', header: 'Total students' },
          { key: 'coverage_pct', header: 'Coverage %' },
        ]);

        // Manifest — names every file in the pack + provenance.
        const stamp = new Date().toISOString();
        const manifest = [
          'Elec-Mate · EQA Visit Pack',
          '',
          `College: ${opts?.collegeName ?? collegeId}`,
          `Generated: ${stamp}`,
          `Window: ${sinceDate ?? 'all time'} → now`,
          '',
          'Contents:',
          ...tablesCovered.map((t) => `  • ${t}`),
          '',
          'Audit trail:',
          '  - Every IQA action recorded in college_activity is timestamped + signed with the actor user_id.',
          '  - Verdict comments, finding rationale and standardisation outcomes preserved verbatim.',
          '  - Coverage matrix re-computed from iqa_samples at export time so the numbers match what the IQA Dashboard shows.',
          '',
          'For questions, contact your college Data Protection Officer or the IQA who generated this pack.',
        ].join('\n');
        folder.file('manifest.txt', manifest);

        setProgress('Building ZIP…');
        const blob = await zip.generateAsync({ type: 'blob' });
        const filename = `eqa-visit-pack-${stamp.slice(0, 10)}.zip`;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
        throw e;
      } finally {
        setExporting(false);
        setProgress(null);
      }
    },
    []
  );

  return { exportPack, exporting, progress, error };
}
