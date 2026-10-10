/**
 * "Who can go" on the job sheet (ELE-1834): what the crew must hold between
 * them, and whether today's crew does. Requirements start from a suggestion
 * based on the job (an EICR wants Inspection & Testing, an EV install wants
 * EV Charging) and the office changes them. The check reads the same
 * credentials as Elec-ID › Competence.
 */
import { useMemo, useState } from 'react';
import { ShieldCheck, ShieldAlert, Loader2, MapPin, CalendarSearch } from 'lucide-react';
import { PlanRow, planBtn } from '@/components/employer/jobs/PlanRow';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { FormSheet } from '@/components/forms/FormSheet';
import { buttonPrimaryCn, buttonSecondaryCn } from '@/components/forms/fieldStyles';
import { useUpdateJob } from '@/hooks/useJobs';
import { useJobAssignments } from '@/hooks/useJobAssignments';
import { useCrewCompetence } from '@/hooks/useCrewCompetence';
import { CREW_REQUIREMENTS, checkCrew, requirementName, suggestRequirements } from '@/utils/crewCompetence';
import type { Job } from '@/services/jobService';
import { NearestFreeSheet } from '@/components/employer/jobs/NearestFreeSheet';
import { SuggestSlotSheet } from '@/components/employer/jobs/SuggestSlotSheet';

export function JobCompetenceCard({ job }: { job: Job }) {
  const { data: assignments = [] } = useJobAssignments(job.id);
  const { matrix, isLoading } = useCrewCompetence();
  const [editing, setEditing] = useState(false);
  const [nearest, setNearest] = useState(false);
  // ELE-2072: who and when, from leave, the diary, credentials and travel.
  const [suggest, setSuggest] = useState(false);
  const required = useMemo(() => job.required_credentials ?? [], [job.required_credentials]);

  const crew = useMemo(
    () =>
      assignments
        .filter((a) => !['removed', 'cancelled', 'ended'].includes(String(a.status ?? 'assigned').toLowerCase()))
        .map((a) => ({
          employeeId: a.employee_id,
          name: a.employee?.name ?? 'Team member',
          role: a.employee?.team_role ?? a.employee?.role ?? null,
        })),
    [assignments]
  );
  const check = useMemo(() => checkCrew(matrix, required, crew, job.start_date), [matrix, required, crew, job.start_date]);

  const ok = crew.length > 0 && check.problems.length === 0;
  const status =
    required.length === 0
      ? 'Nothing required yet'
      : `Needs ${required.map(requirementName).join(', ')}`;
  const detail = isLoading ? (
    <p>Checking the crew…</p>
  ) : crew.length === 0 ? (
    <p>Nobody booked yet. Everyone you book is checked against this.</p>
  ) : ok ? (
    <p>{required.length ? 'The crew covers it.' : 'Set what the crew must hold and Elec-Mate checks everyone you book.'}</p>
  ) : (
    check.problems.map((p) => (
      <p key={p} className="font-medium text-orange-300">
        {p}
      </p>
    ))
  );
  return (
    <>
      <PlanRow
        helpId="jobs.competence"
        icon={ok || (!crew.length && !required.length) ? ShieldCheck : ShieldAlert}
        tone={crew.length && !ok ? 'warn' : ok && required.length ? 'ok' : 'neutral'}
        title="Who can go"
        status={status}
        detail={detail}
        actions={
          <>
            <button type="button" onClick={() => setEditing(true)} className={planBtn}>
              {required.length ? 'Change what they need' : 'Set what they need'}
            </button>
            <button type="button" data-help="jobs.nearest" onClick={() => setNearest(true)} className={planBtn}>
              <MapPin className="h-4 w-4 text-elec-yellow" />
              Nearest free
            </button>
          </>
        }
      >
        {/* ELE-2072: its own line, so the row keeps two buttons beside the text. */}
        <div className="mt-3 sm:pl-[30px]">
          <button
            type="button"
            data-help="jobs.suggest"
            onClick={() => setSuggest(true)}
            className={cn(planBtn, 'w-full sm:w-auto')}
          >
            <CalendarSearch className="h-4 w-4 text-elec-yellow" />
            Suggest a slot
          </button>
        </div>
      </PlanRow>
      {editing && <RequirementsSheet job={job} onClose={() => setEditing(false)} />}
      {nearest && <NearestFreeSheet job={job} onClose={() => setNearest(false)} />}
      {suggest && <SuggestSlotSheet job={job} onClose={() => setSuggest(false)} />}
    </>
  );
}

function RequirementsSheet({ job, onClose }: { job: Job; onClose: () => void }) {
  const update = useUpdateJob();
  const suggested = useMemo(() => suggestRequirements(job), [job]);
  const [keys, setKeys] = useState<string[]>(job.required_credentials?.length ? job.required_credentials : suggested);
  const toggle = (k: string) => setKeys((s) => (s.includes(k) ? s.filter((x) => x !== k) : [...s, k]));

  const save = async () => {
    try {
      await update.mutateAsync({ id: job.id, updates: { required_credentials: keys } });
      toast.success(keys.length ? 'Requirements saved' : 'No requirements on this job');
      onClose();
    } catch (e) {
      toast.error((e as Error).message || 'Not saved');
    }
  };

  return (
    <FormSheet
      open
      onOpenChange={(o) => !o && onClose()}
      eyebrow="Who can go"
      title="What must the crew hold?"
      description="Between them, the people on this job must hold each of these on the start date. Assigning and the diary warn you when they don't."
      width="wide"
      footer={
        <div className="grid grid-cols-2 gap-2 lg:ml-auto lg:max-w-md">
          <button type="button" className={buttonSecondaryCn} onClick={onClose}>
            Cancel
          </button>
          <button type="button" className={buttonPrimaryCn} disabled={update.isPending} onClick={save}>
            {update.isPending ? <Loader2 className="mx-auto h-4 w-4 animate-spin" /> : 'Save'}
          </button>
        </div>
      }
    >
      {!job.required_credentials?.length && suggested.length > 0 && (
        <p className="text-[13px] text-white">Suggested from the job: {suggested.map(requirementName).join(', ')}. Change it as you like.</p>
      )}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {CREW_REQUIREMENTS.map((r) => {
          const on = keys.includes(r.key);
          return (
            <button
              key={r.key}
              type="button"
              onClick={() => toggle(r.key)}
              className={cn(
                'min-h-14 rounded-xl border px-3 py-2 text-left touch-manipulation',
                on ? 'border-elec-yellow bg-elec-yellow text-black' : 'border-white/[0.12] bg-white/[0.04] text-white'
              )}
            >
              <span className="block text-[14px] font-semibold">{r.label}</span>
              <span className="block text-[12px]">{r.hint}</span>
            </button>
          );
        })}
      </div>
      <p className="text-[12.5px] text-white">
        Credentials come from each person&rsquo;s Elec-ID and the team&rsquo;s training records. Add or check them in Elec-ID ›
        Competence.
      </p>
    </FormSheet>
  );
}
