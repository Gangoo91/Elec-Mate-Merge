/**
 * On the job sheet (ELE-1821): whether this job repeats, and the way in.
 *  - The source of a repeat visit: "Repeats every 3 months · next 10 Jan", Change.
 *  - A visit the schedule booked: "Repeat visit", open the schedule.
 *  - Anything else: "Make this recurring".
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Repeat } from 'lucide-react';
import { FREQUENCY_LABELS } from '@/hooks/useMaintenanceContracts';
import { useFirmRecurring, nextVisitLabel } from '@/hooks/useFirmRecurring';
import { MakeRecurringSheet } from '@/components/employer/jobs/MakeRecurringSheet';
import { PlanRow, planBtn } from '@/components/employer/jobs/PlanRow';

interface Props {
  job: {
    id: string;
    title: string;
    start_date?: string | null;
    end_date?: string | null;
    recurring_contract_id?: string | null;
  };
}

export function JobRecurringCard({ job }: Props) {
  const navigate = useNavigate();
  const { data: list = [] } = useFirmRecurring();
  const [open, setOpen] = useState(false);

  const asSource = list.find((r) => r.source_job_id === job.id && r.status !== 'ended') ?? null;
  const asVisit =
    !asSource && job.recurring_contract_id
      ? list.find(
          (r) => r.id === job.recurring_contract_id && r.source_job_id !== job.id && r.status !== 'ended'
        ) ?? null
      : null;

  const freq = (f: (typeof list)[number]) =>
    f.frequency === 'custom' ? `every ${f.frequency_custom_days ?? 30} days` : FREQUENCY_LABELS[f.frequency].toLowerCase();

  const status = asSource
    ? asSource.status === 'paused'
      ? 'Repeat visit paused'
      : `Repeats ${freq(asSource)}, next ${nextVisitLabel(asSource.next_due_date)}`
    : asVisit
      ? `A visit from "${asVisit.title}", ${freq(asVisit)}`
      : 'One-off job';
  return (
    <>
      <PlanRow
        helpId="jobs.recurring"
        icon={Repeat}
        tone={asSource?.status === 'paused' ? 'warn' : asSource || asVisit ? 'ok' : 'neutral'}
        title="Repeat visits"
        status={status}
        detail={
          !asSource && !asVisit ? <p>Annual test, PAT round or service? The next one books itself.</p> : asSource?.status === 'paused' ? <p>No visits are booked until you resume it.</p> : undefined
        }
        actions={
          asVisit ? (
            <button type="button" className={planBtn} onClick={() => navigate(`/employer?section=recurring&visit=${asVisit.id}`)}>
              See the schedule
            </button>
          ) : (
            <button type="button" className={planBtn} onClick={() => setOpen(true)}>
              {asSource ? 'Change' : 'Make recurring'}
            </button>
          )
        }
      />
      <MakeRecurringSheet open={open} onOpenChange={setOpen} job={job} existing={asSource} />
    </>
  );
}
