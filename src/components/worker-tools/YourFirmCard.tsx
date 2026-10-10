/**
 * YourFirmCard — "Your firm" on the Electrician Hub and the Apprentice Hub
 * (ELE-1998 / ELE-2011).
 *
 * Shown only while the signed-in person is on an ACTIVE roster row: it reads
 * get_worker_home(), which returns null for anyone not on a team and for a
 * removed (Archived) worker. Visibility follows the team, not a paid seat —
 * seats and billing are enforced on the employer's side (ELE-1831).
 *
 * It answers the three things a worker opens the app for: where am I today
 * (next job + directions), am I on the clock, and is anything waiting on me.
 * Everything opens the existing Worker Tools pages; nothing is forked.
 *
 * Deliberately no money and no customer contact details — an apprentice on a
 * firm never sees the customer's phone or the job's value.
 */
import { useNavigate } from 'react-router-dom';
import { differenceInCalendarDays, differenceInMinutes, format, parseISO } from 'date-fns';
import { ChevronRight, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { useOnTeam, type WorkerHome } from '@/hooks/useWorkerHome';
import { WORKER_TOOLS_BASE } from '@/lib/workerTeam';

const plural = (n: number, one: string, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;

function shiftLength(clockIn: string) {
  const mins = Math.max(0, differenceInMinutes(new Date(), parseISO(clockIn)));
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

function whenLabel(starts: string | null) {
  if (!starts) return 'Next job';
  const d = parseISO(starts);
  const days = differenceInCalendarDays(d, new Date());
  if (days === 0) return 'Today';
  if (days === 1) return 'Tomorrow';
  if (days < 0) return `On now · since ${format(d, 'd MMM')}`;
  return `Next job · ${format(d, 'EEE d MMM')}`;
}

interface WaitingRow {
  key: string;
  title: string;
  detail: string;
  to: string;
  urgent?: boolean;
}

function waitingRows(h: WorkerHome): WaitingRow[] {
  const rows: WaitingRow[] = [];
  if (h.timesheets_sent_back > 0)
    rows.push({
      key: 'ts-back',
      title: `${plural(h.timesheets_sent_back, 'timesheet')} sent back`,
      detail: 'Change it and send it again',
      to: `${WORKER_TOOLS_BASE}/timesheets`,
      urgent: true,
    });
  if (h.to_sign > 0)
    rows.push({
      key: 'sign',
      title: `${plural(h.to_sign, 'pack')} to read and sign`,
      detail: 'RAMS and job packs. Sign before you start',
      to: `${WORKER_TOOLS_BASE}/signoffs`,
    });
  if ((h.jobs_new ?? 0) > 0)
    rows.push({
      key: 'new',
      title: h.jobs_new === 1 ? 'New job for you' : `${h.jobs_new} new jobs for you`,
      detail: 'Not opened yet',
      to: `${WORKER_TOOLS_BASE}/jobs`,
    });
  if (h.tasks_due > 0)
    rows.push({
      key: 'tasks',
      title: `${plural(h.tasks_due, 'task')} due`,
      detail: 'Due today or overdue',
      to: `${WORKER_TOOLS_BASE}/tasks`,
      urgent: true,
    });
  return rows;
}

export function YourFirmCard({
  className,
  layout = 'split',
}: {
  className?: string;
  /** 'split' puts "waiting on you" beside the job on wide screens (full-width
      use); 'stack' keeps one column, for when the card shares a row. */
  layout?: 'split' | 'stack';
}) {
  const navigate = useNavigate();
  const { home: h } = useOnTeam();
  if (!h) return null;

  const onClock = !!h.open_shift;
  const job = h.next_job;
  const maps = job?.location
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(job.location)}`
    : null;
  const rows = waitingRows(h);
  // Two columns only when there is a list to put on the right. With nothing
  // waiting, one column: a lone line beside the job left half the card empty.
  const split = layout === 'split' && rows.length > 0;
  // Full width with nothing waiting: the actions sit in the header row on desktop.
  const actionsUp = layout === 'split' && rows.length === 0;
  const jobsOn = h.jobs_active ?? 0;
  const actions = (
    <>
      <button
        type="button"
        onClick={() => navigate(`${WORKER_TOOLS_BASE}/timesheets`)}
        className="h-11 rounded-xl bg-elec-yellow px-5 text-[14px] font-semibold text-black touch-manipulation active:scale-[0.98]"
      >
        {onClock ? 'Clock out' : 'Clock in'}
      </button>
      <button
        type="button"
        onClick={() => navigate(WORKER_TOOLS_BASE)}
        className="h-11 rounded-xl border border-white/[0.18] bg-white/[0.06] px-5 text-[14px] font-semibold text-white touch-manipulation active:scale-[0.98]"
      >
        Worker Tools
      </button>
    </>
  );
  const status = onClock
    ? `On the clock · ${shiftLength(h.open_shift!.clock_in)}${h.open_shift?.job_title ? ` on ${h.open_shift.job_title}` : ''}`
    : `Not clocked in · ${h.week_hours}h this week`;

  return (
    <section className={cn('space-y-3', className)}>
      <h2 className="text-[15px] font-semibold tracking-tight text-elec-yellow">Your firm</h2>

      <div
        className={cn(
          '-mx-4 overflow-hidden border-y border-elec-yellow/35 sm:mx-0 sm:rounded-2xl sm:border-x',
          CARD_SURFACE
        )}
      >
        <div className={cn('grid', split && 'lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]')}>
          {/* Left: who, where, when */}
          <div className="min-w-0">
            <div className="flex items-center gap-4 px-4 pt-4 pb-3.5 sm:px-5">
              <div className="min-w-0 flex-1">
                <p className="truncate text-[17px] font-semibold leading-tight tracking-tight text-white">
                  {h.firm}
                </p>
                <p
                  className={cn(
                    'mt-1 text-[13px] leading-snug',
                    onClock ? 'font-semibold text-elec-yellow' : 'text-white'
                  )}
                >
                  {status}
                </p>
              </div>
              {/* One column on desktop: the actions sit up here, not in a footer of their own. */}
              {actionsUp && <div className="hidden shrink-0 gap-2 lg:flex">{actions}</div>}
            </div>

            {job ? (
              <div className="flex items-stretch border-t border-white/[0.10]">
                <button
                  type="button"
                  onClick={() => navigate(`${WORKER_TOOLS_BASE}/jobs?job=${job.id}`)}
                  className="min-w-0 flex-1 px-4 py-3.5 text-left touch-manipulation sm:px-5"
                >
                  <p className="text-[12px] font-semibold text-elec-yellow">
                    {whenLabel(job.starts)}
                  </p>
                  <p className="mt-1 line-clamp-1 text-[15px] font-semibold text-white">{job.title}</p>
                  {job.location && (
                    <p className="mt-0.5 line-clamp-1 text-[13px] text-white">{job.location}</p>
                  )}
                </button>
                {maps && (
                  <a
                    href={maps}
                    target="_blank"
                    rel="noreferrer"
                    className="flex w-[92px] shrink-0 flex-col items-center justify-center gap-1 border-l border-white/[0.10] text-white touch-manipulation"
                  >
                    <MapPin className="h-5 w-5" aria-hidden />
                    <span className="text-[12px] font-semibold">Directions</span>
                  </a>
                )}
              </div>
            ) : (
              <p className="border-t border-white/[0.10] px-4 py-3.5 text-[13px] leading-snug text-white sm:px-5">
                {jobsOn > 0
                  ? `You are on ${plural(jobsOn, 'job')} for ${h.firm}, with no date booked in yet. When the office books a day, it shows here with directions.`
                  : 'No job booked in for you yet. When the office puts you on one, it shows here with directions.'}
              </p>
            )}
          </div>

          {/* Right on desktop, below on phone: what is waiting on you */}
          <div
            className={cn(
              'min-w-0 border-t border-white/[0.10]',
              split && 'lg:border-l lg:border-t-0'
            )}
          >
            {rows.length > 0 ? (
              <ul className="divide-y divide-white/[0.10]">
                {rows.map((r) => (
                  <li key={r.key}>
                    <button
                      type="button"
                      onClick={() => navigate(r.to)}
                      className="flex min-h-[56px] w-full items-center gap-3 px-4 py-2.5 text-left touch-manipulation sm:px-5"
                    >
                      <span
                        aria-hidden
                        className={cn(
                          'h-8 w-[3px] shrink-0 rounded-full',
                          r.urgent ? 'bg-red-400' : 'bg-elec-yellow'
                        )}
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[14px] font-semibold leading-tight text-white">
                          {r.title}
                        </span>
                        <span className="mt-0.5 block truncate text-[12px] leading-tight text-white">
                          {r.detail}
                        </span>
                      </span>
                      <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="px-4 py-3.5 text-[13px] leading-snug text-white sm:px-5">
                Nothing waiting on you from {h.firm}.
              </p>
            )}
          </div>
        </div>

        <div
          className={cn(
            'grid grid-cols-2 gap-2 border-t border-white/[0.10] p-3 sm:flex sm:justify-end sm:px-5',
            actionsUp && 'lg:hidden'
          )}
        >
          {actions}
        </div>
      </div>
    </section>
  );
}
