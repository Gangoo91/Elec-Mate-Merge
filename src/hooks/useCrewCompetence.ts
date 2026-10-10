/**
 * The firm's competence matrix for dispatch checks (ELE-1834). Same data and
 * builder as Elec-ID › Competence, cached under the same profiles query, so
 * the assign sheet, job sheet and diary agree with the matrix screen.
 */
import { useCallback, useMemo } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { checkCrew } from '@/utils/crewCompetence';
import { useElecIdProfiles } from '@/hooks/useElecId';
import { buildCompetenceMatrix } from '@/utils/competenceMatrix';

export function useCrewCompetence() {
  const { data: profiles, isLoading } = useElecIdProfiles();
  const matrix = useMemo(() => (profiles ? buildCompetenceMatrix(profiles, [], { horizonDays: 60 }) : null), [profiles]);
  return { matrix, isLoading };
}

/**
 * After the diary books someone (ELE-1834): check the job's whole crew and
 * warn if it doesn't cover what the job needs. Never blocks a drag; the
 * assign sheet is where "Send anyway" is asked and logged.
 */
export function useCrewWarning() {
  const { matrix } = useCrewCompetence();
  return useCallback(
    async (jobId: string, onOpenJob?: () => void) => {
      const [{ data: job }, { data: rows }] = await Promise.all([
        supabase.from('employer_jobs').select('required_credentials, start_date').eq('id', jobId).maybeSingle(),
        supabase
          .from('employer_job_assignments')
          .select('employee_id, status, employer_employees(name, team_role, role)')
          .eq('job_id', jobId),
      ]);
      const crew = ((rows ?? []) as unknown as Array<{
        employee_id: string;
        status: string | null;
        employer_employees: { name: string | null; team_role: string | null; role: string | null } | null;
      }>)
        .filter((r) => !['removed', 'cancelled', 'ended'].includes(String(r.status ?? 'assigned').toLowerCase()))
        .map((r) => ({
          employeeId: r.employee_id,
          name: r.employer_employees?.name ?? 'Team member',
          role: r.employer_employees?.team_role ?? r.employer_employees?.role ?? null,
        }));
      const req = ((job as { required_credentials?: string[] } | null)?.required_credentials ?? []) as string[];
      const check = checkCrew(matrix, req, crew, (job as { start_date?: string | null } | null)?.start_date ?? null);
      if (!check.problems.length) return;
      toast.warning(check.problems[0], {
        description:
          check.problems.length > 1 ? `${check.problems.slice(1).join('. ')}.` : 'Check who else is going before the day.',
        action: onOpenJob ? { label: 'Open job', onClick: onOpenJob } : undefined,
        duration: 8000,
      });
    },
    [matrix]
  );
}
