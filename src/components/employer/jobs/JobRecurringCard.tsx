/**
 * On the job sheet (ELE-1821): whether this job repeats, and the way in.
 *  - The source of a repeat visit: "Repeats every 3 months · next 10 Jan", Change.
 *  - A visit the schedule booked: "Repeat visit", open the schedule.
 *  - Anything else: "Make this recurring".
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Repeat } from 'lucide-react';
import { cn } from '@/lib/utils';
import { buttonSecondaryCn } from '@/components/forms/fieldStyles';
import { FREQUENCY_LABELS } from '@/hooks/useMaintenanceContracts';
import { useFirmRecurring, nextVisitLabel } from '@/hooks/useFirmRecurring';
import { MakeRecurringSheet } from '@/components/employer/jobs/MakeRecurringSheet';

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

  return (
    <div
      data-help="jobs.recurring"
      className="flex items-center justify-between gap-3 rounded-2xl border border-white/[0.1] bg-white/[0.04] px-4 py-3"
    >
      <div className="flex min-w-0 items-center gap-3">
        <Repeat className="h-4 w-4 shrink-0 text-elec-yellow" />
        <div className="min-w-0">
          <p className="text-[14px] font-medium text-white">
            {asSource
              ? asSource.status === 'paused'
                ? 'Repeat visit paused'
                : `Repeats ${freq(asSource)}`
              : asVisit
                ? 'A repeat visit'
                : 'One-off job'}
          </p>
          <p className="text-[12.5px] text-white truncate">
            {asSource
              ? asSource.status === 'paused'
                ? 'No visits are booked until you resume it.'
                : `Next visit ${nextVisitLabel(asSource.next_due_date)}`
              : asVisit
                ? `${asVisit.title}, ${freq(asVisit)}`
                : 'Annual test, PAT round or service? Book the next one automatically.'}
          </p>
        </div>
      </div>
      {asVisit ? (
        <button
          type="button"
          className={cn(buttonSecondaryCn, 'inline-flex items-center justify-center w-auto shrink-0 px-4')}
          onClick={() => navigate(`/employer?section=recurring&visit=${asVisit.id}`)}
        >
          Schedule
        </button>
      ) : (
        <button type="button" className={cn(buttonSecondaryCn, 'inline-flex items-center justify-center w-auto shrink-0 px-4')} onClick={() => setOpen(true)}>
          {asSource ? 'Change' : 'Make recurring'}
        </button>
      )}
      <MakeRecurringSheet open={open} onOpenChange={setOpen} job={job} existing={asSource} />
    </div>
  );
}
