/**
 * Phone Diary (ELE-1820): the week's shape on a day rail, then one day in
 * detail. Drag is unreliable on touch, so every move is tap → sheet.
 *
 * The rail follows the electrician calendar's phone week rail (ELE-1755):
 * seven chips, today in solid yellow, a load bar under each day, and a red
 * dot on a day where somebody is double-booked or booked on leave.
 */
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar } from '@/components/employer/editorial';
import type { DispatchBoard, DispatchJob } from '@/hooks/useDispatchBoard';
import {
  WORKING_DAY_HOURS,
  clashLabel,
  fmtDay,
  initialsOf,
  isWeekend,
  leaveLabel,
  personDay,
  todayYmd,
  unassignedOnDay,
} from './dispatchModel';
import { BookingBlock, JobBlock } from './DiaryBlocks';

const cardCn =
  '-mx-4 sm:mx-0 rounded-none sm:rounded-2xl border-y sm:border border-white/[0.08] bg-white/[0.04]';

export function DayRail({
  board,
  days,
  selected,
  onSelect,
}: {
  board: DispatchBoard;
  days: string[];
  selected: string;
  onSelect: (day: string) => void;
}) {
  const today = todayYmd();
  const capacity = Math.max(1, board.people.length * WORKING_DAY_HOURS);
  return (
    <div className="flex gap-1" data-help="diary.days">
      {days.map((d) => {
        const pds = board.people.map((p) => personDay(board, p.id, d));
        const hours = pds.reduce((s, pd) => s + pd.hours, 0);
        const clash = pds.some((pd) => pd.clash);
        const on = d === selected;
        return (
          <button
            key={d}
            type="button"
            onClick={() => onSelect(d)}
            aria-pressed={on}
            aria-label={`${fmtDay(d, { weekday: 'long', day: 'numeric', month: 'long' })}${clash ? ', has a clash' : ''}`}
            className={cn(
              'relative flex min-h-[68px] min-w-0 flex-1 flex-col items-center justify-start gap-1 rounded-xl border pb-1.5 pt-1.5 transition-colors touch-manipulation active:scale-[0.97]',
              on ? 'border-white/[0.30] bg-white/[0.08]' : 'border-transparent',
              isWeekend(d) && !on && 'opacity-60'
            )}
          >
            <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              {fmtDay(d, { weekday: 'narrow' })}
            </span>
            <span
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-full text-[14px] font-semibold tabular-nums',
                d === today ? 'bg-elec-yellow text-black' : 'text-white'
              )}
            >
              {fmtDay(d, { day: 'numeric' })}
            </span>
            <span className="flex h-[3px] w-8 overflow-hidden rounded-full bg-white/[0.10]">
              <span
                className={cn('h-full rounded-full', clash ? 'bg-red-400' : 'bg-emerald-400')}
                style={{ width: `${Math.min(100, Math.round((hours / capacity) * 100))}%` }}
              />
            </span>
            {clash && (
              <span aria-hidden className="absolute top-1 right-1.5 h-2 w-2 rounded-full bg-red-400" />
            )}
          </button>
        );
      })}
    </div>
  );
}

interface DiaryDayViewProps {
  board: DispatchBoard;
  day: string;
  jobsById: Map<string, DispatchJob>;
  assignedJobIds: Set<string>;
  onOpenBooking: (assignmentId: string) => void;
  onOpenJob: (jobId: string, day: string) => void;
  onBookPerson: (employeeId: string, day: string) => void;
}

export function DiaryDayView({
  board,
  day,
  jobsById,
  assignedJobIds,
  onOpenBooking,
  onOpenJob,
  onBookPerson,
}: DiaryDayViewProps) {
  const unassigned = unassignedOnDay(board.jobs, assignedJobIds, day);
  const people = board.people.map((p) => ({ person: p, pd: personDay(board, p.id, day) }));
  const busy = people.filter((x) => x.pd.bookings.length > 0).length;
  const off = people.filter((x) => x.pd.leave && x.pd.bookings.length === 0).length;

  return (
    <div className="space-y-5">
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="text-[18px] font-semibold text-white">
          {fmtDay(day, { weekday: 'long', day: 'numeric', month: 'long' })}
        </h2>
        <span className="text-[12px] text-white tabular-nums shrink-0">
          {busy} out{off ? ` · ${off} off` : ''}
        </span>
      </div>

      {unassigned.length > 0 && (
        <section className={cn(cardCn, 'border-red-500/40')} data-help="diary.nobody">
          <div className="px-4 pt-3.5 pb-2 flex items-center justify-between">
            <h3 className="text-[14px] font-semibold text-white">Nobody booked</h3>
            <span className="text-[12px] text-red-300 tabular-nums">
              {unassigned.length} {unassigned.length === 1 ? 'job' : 'jobs'}
            </span>
          </div>
          <div className="px-3 pb-3 space-y-2">
            {unassigned.map((j) => (
              <JobBlock
                key={j.id}
                job={j}
                day={day}
                note="Tap to book someone"
                onClick={() => onOpenJob(j.id, day)}
              />
            ))}
          </div>
        </section>
      )}

      {people.length === 0 ? (
        <p className="text-[13px] text-white">
          Nobody on the team yet. Invite people from People → Team, then book them in here.
        </p>
      ) : (
        <section className={cn(cardCn, 'divide-y divide-white/[0.06]')}>
          {people.map(({ person, pd }) => (
            <div key={person.id} className="px-4 py-3.5 space-y-2.5">
              <div className="flex items-center gap-3">
                <Avatar initials={initialsOf(person.name, person.initials)} photo={person.photo_url} />
                <div className="min-w-0 flex-1">
                  <div className="text-[14px] font-semibold text-white truncate">{person.name}</div>
                  <div
                    className={cn(
                      'text-[12px] truncate',
                      pd.clash ? 'text-red-300 font-medium' : 'text-white'
                    )}
                  >
                    {pd.clash
                      ? clashLabel(pd.clash, pd)
                      : pd.leave && pd.bookings.length === 0
                        ? leaveLabel(pd.leave)
                        : pd.hours
                          ? `${String(pd.hours).replace(/\.0+$/, '')} of ${WORKING_DAY_HOURS}h booked`
                          : person.linked
                            ? 'Free'
                            : 'Free · not on the app yet'}
                  </div>
                </div>
                <button
                  type="button"
                  data-help="diary.book-person"
                  onClick={() => onBookPerson(person.id, day)}
                  aria-label={`Book ${person.name}`}
                  className="h-11 px-4 inline-flex items-center gap-1.5 rounded-full border border-white/[0.12] bg-white/[0.06] text-[13px] font-medium text-white touch-manipulation active:scale-[0.97]"
                >
                  <Plus className="h-4 w-4" /> Book
                </button>
              </div>
              {pd.leave && pd.bookings.length > 0 && pd.clash !== 'leave' && (
                <div className="text-[12px] text-white">{leaveLabel(pd.leave)}</div>
              )}
              {pd.bookings.length > 0 && (
                <div className="space-y-2" data-help="diary.booking">
                  {pd.bookings.map((a) => (
                    <BookingBlock
                      key={a.id}
                      booking={a}
                      job={jobsById.get(a.job_id)}
                      day={day}
                      danger={!!pd.clash}
                      onClick={() => onOpenBooking(a.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
