/**
 * The one sheet for dispatching (ELE-1820): book someone onto a job, or move /
 * re-assign / take off an existing booking.
 *
 * On a phone this IS the board's "drag": tap a block or an empty slot, pick
 * the person and the day, save. Every person in the picker shows what they
 * would clash with (leave, another job) for the dates chosen, before anyone is
 * moved. Bottom sheet, h-[85vh], like every other Employer Hub sheet.
 */
import { useEffect, useMemo, useState } from 'react';
import { Check, ExternalLink, Search } from 'lucide-react';
import { toast } from 'sonner';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import {
  SheetShell,
  PrimaryButton,
  SecondaryButton,
  DestructiveButton,
  Pill,
  Avatar,
  inputClass,
  checkboxClass,
  fieldLabelClass,
} from '@/components/employer/editorial';
import {
  useDispatchAssign,
  useDispatchMove,
  useDispatchUnassign,
  dispatchErrorMessage,
  type DispatchBoard,
  type DispatchJob,
} from '@/hooks/useDispatchBoard';
import { jobStage, stageDef } from '@/lib/jobStages';
import {
  addDaysYmd,
  clashesFor,
  diffDays,
  fmtDay,
  initialsOf,
  niceFirstName,
  placeOf,
  rangeLabel,
  stampLabel,
  todayYmd,
  weekDays,
  mondayOf,
} from './dispatchModel';

export type DispatchTarget =
  | { kind: 'move'; assignmentId: string }
  | { kind: 'assign'; jobId?: string; employeeId?: string; day?: string };

interface DispatchSheetProps {
  target: DispatchTarget | null;
  onClose: () => void;
  board: DispatchBoard;
  jobsById: Map<string, DispatchJob>;
  /** The week the board is showing — the day chips offer it. */
  weekStart: string;
  onOpenJob?: (jobId: string) => void;
}

const HOUR_CHOICES: Array<{ value: number | null; label: string }> = [
  { value: null, label: 'Full day' },
  { value: 2, label: '2h' },
  { value: 4, label: '4h' },
  { value: 6, label: '6h' },
];

const chipCn = (on: boolean) =>
  cn(
    'h-11 rounded-xl border text-[13px] font-medium transition-colors touch-manipulation active:scale-[0.98]',
    on
      ? 'bg-elec-yellow border-elec-yellow text-black font-semibold'
      : 'bg-white/[0.06] border-white/[0.12] text-white hover:bg-white/[0.1]'
  );

export function DispatchSheet({
  target,
  onClose,
  board,
  jobsById,
  weekStart,
  onOpenJob,
}: DispatchSheetProps) {
  const assign = useDispatchAssign();
  const move = useDispatchMove();
  const unassign = useDispatchUnassign();

  const booking =
    target?.kind === 'move' ? board.assignments.find((a) => a.id === target.assignmentId) : null;

  const [jobId, setJobId] = useState<string | null>(null);
  const [employeeId, setEmployeeId] = useState<string | null>(null);
  const [start, setStart] = useState<string>(todayYmd());
  const [end, setEnd] = useState<string>(todayYmd());
  const [startTime, setStartTime] = useState<string>('');
  const [hours, setHours] = useState<number | null>(null);
  const [email, setEmail] = useState(true);
  const [jobSearch, setJobSearch] = useState('');
  const [confirmRemove, setConfirmRemove] = useState(false);

  // Reset whenever a different block / slot is opened.
  useEffect(() => {
    if (!target) return;
    setConfirmRemove(false);
    setJobSearch('');
    setEmail(true);
    if (target.kind === 'move') {
      const a = board.assignments.find((x) => x.id === target.assignmentId);
      if (!a) return;
      setJobId(a.job_id);
      setEmployeeId(a.employee_id);
      setStart(a.start_date);
      setEnd(a.end_date);
      setStartTime(a.start_time ?? '');
      setHours(a.hours_per_day ?? null);
    } else {
      const job = target.jobId ? jobsById.get(target.jobId) : null;
      const day = target.day ?? job?.start_date ?? todayYmd();
      setJobId(target.jobId ?? null);
      setEmployeeId(target.employeeId ?? null);
      setStart(day);
      // A job's own length when it has one and we're booking its first day.
      const len =
        job?.start_date && job.end_date && !target.day ? diffDays(job.end_date, job.start_date) : 0;
      setEnd(addDaysYmd(day, Math.max(0, len)));
      setStartTime('');
      setHours(null);
    }
    // Only when the sheet is (re)opened, not on every board refetch.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  const job = jobId ? jobsById.get(jobId) ?? null : null;
  const isMove = target?.kind === 'move';
  const span = Math.max(0, diffDays(end, start));
  const days = useMemo(() => weekDays(weekStart), [weekStart]);

  const setStartKeepLength = (d: string) => {
    setStart(d);
    setEnd(addDaysYmd(d, span));
  };

  const peopleWithClashes = useMemo(
    () =>
      board.people.map((p) => ({
        person: p,
        clashes: clashesFor(board, jobsById, p.id, start, end < start ? start : end, {
          ignoreAssignmentId: booking?.id,
          ignoreJobId: jobId ?? undefined,
          hours,
        }),
        alreadyOn:
          !!jobId &&
          board.assignments.some(
            (a) => a.job_id === jobId && a.employee_id === p.id && a.id !== booking?.id
          ),
      })),
    [board, jobsById, start, end, booking?.id, jobId, hours]
  );

  const jobChoices = useMemo(() => {
    const q = jobSearch.trim().toLowerCase();
    return board.jobs
      .filter((j) => j.stage !== 'Complete')
      .filter(
        (j) =>
          !q ||
          j.title.toLowerCase().includes(q) ||
          (j.client || '').toLowerCase().includes(q) ||
          (j.location || '').toLowerCase().includes(q)
      );
  }, [board.jobs, jobSearch]);

  const busy = assign.isPending || move.isPending || unassign.isPending;
  const selectedClashes = peopleWithClashes.find((x) => x.person.id === employeeId)?.clashes ?? [];
  const canSave = !!jobId && !!employeeId && !!start && end >= start && !busy;

  const save = async () => {
    if (!jobId || !employeeId) return;
    try {
      if (isMove && booking) {
        await move.mutateAsync({
          assignmentId: booking.id,
          employeeId,
          start,
          end,
          startTime: startTime || null,
          hours,
        });
        toast.success('Booking moved', {
          description: 'They get one push with all your changes in about a minute.',
        });
      } else {
        await assign.mutateAsync({
          jobId,
          employeeId,
          start,
          end,
          startTime: startTime || null,
          hours,
          email,
          jobTitle: job?.title,
          jobLocation: job?.location,
        });
        const person = board.people.find((p) => p.id === employeeId);
        toast.success(`${niceFirstName(person?.name) || 'They'} booked on`, {
          description: person?.linked
            ? 'They have been sent a push.'
            : 'They have not joined the app yet, so no push. Tell them directly.',
        });
      }
      onClose();
    } catch (e) {
      toast.error(dispatchErrorMessage(e));
    }
  };

  const remove = async () => {
    if (!booking) return;
    try {
      await unassign.mutateAsync(booking.id);
      toast.success('Taken off the job', {
        description: 'They are told in the next batched push.',
      });
      onClose();
    } catch (e) {
      toast.error(dispatchErrorMessage(e));
    }
  };

  const stage = job ? stageDef(jobStage({ board_stage: job.stage, status: job.status })) : null;
  const place = placeOf(job?.location);

  return (
    <Sheet open={!!target} onOpenChange={(o) => !o && onClose()}>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
        <SheetShell
          eyebrow={isMove ? 'Booking' : 'Book someone in'}
          title={job ? job.title : 'Choose a job'}
          description={
            job ? (
              <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                {job.client && <span>{job.client}</span>}
                {place && <span>· {place}</span>}
                {stage && <Pill tone={stage.tone}>{stage.label}</Pill>}
              </span>
            ) : (
              'Pick the job, then who and when.'
            )
          }
          footer={
            job ? (
              <>
                {isMove &&
                  (confirmRemove ? (
                    <DestructiveButton onClick={remove} disabled={busy} className="flex-1">
                      Yes, take off
                    </DestructiveButton>
                  ) : (
                    <SecondaryButton
                      data-help="diary.take-off"
                      onClick={() => setConfirmRemove(true)}
                      disabled={busy}
                    >
                      Take off
                    </SecondaryButton>
                  ))}
                <PrimaryButton
                  data-help="diary.save"
                  onClick={save}
                  disabled={!canSave}
                  className="flex-1"
                >
                  {busy ? 'Saving…' : isMove ? 'Save' : 'Book'}
                </PrimaryButton>
              </>
            ) : undefined
          }
        >
          {!job ? (
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-1 top-1/2 -translate-y-1/2 h-4 w-4 text-white" />
                <input
                  value={jobSearch}
                  onChange={(e) => setJobSearch(e.target.value)}
                  placeholder="Search jobs, clients, postcodes"
                  className={cn(inputClass, 'pl-7')}
                />
              </div>
              {jobChoices.length === 0 ? (
                <p className="text-[13px] text-white py-6 text-center">
                  No open jobs this week. Add one from Jobs, or move a job onto this week on the
                  Timeline.
                </p>
              ) : (
                <div
                  className="-mx-5 divide-y divide-white/[0.06] border-y border-white/[0.06]"
                  data-help="diary.job-pick"
                >
                  {jobChoices.map((j) => {
                    const sd = stageDef(jobStage({ board_stage: j.stage, status: j.status }));
                    return (
                      <button
                        key={j.id}
                        type="button"
                        onClick={() => {
                          setJobId(j.id);
                          if (j.start_date && target?.kind === 'assign' && !target.day) {
                            setStart(j.start_date);
                            setEnd(j.end_date || j.start_date);
                          }
                        }}
                        className="w-full min-h-[56px] px-5 py-3 flex items-center gap-3 text-left hover:bg-white/[0.04] active:bg-white/[0.06] touch-manipulation"
                      >
                        <span className={cn('h-8 w-1 rounded-full shrink-0', sd.bar)} />
                        <span className="min-w-0 flex-1">
                          <span className="block text-[14px] font-medium text-white truncate">
                            {j.title}
                          </span>
                          <span className="block text-[12px] text-white truncate">
                            {[j.client, placeOf(j.location)].filter(Boolean).join(' · ')}
                            {j.start_date
                              ? ` · ${rangeLabel(j.start_date, j.end_date)}`
                              : ' · no date yet'}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {isMove && booking?.last_change && (
                <p className="text-[12.5px] text-white">
                  {booking.last_change.kind === 'moved' ? 'Moved' : 'Booked'} by{' '}
                  {niceFirstName(booking.last_change.by) || 'the office'},{' '}
                  {stampLabel(booking.last_change.at)}
                  {booking.last_change.sent ? '' : ' · not sent yet'}
                </p>
              )}

              {/* Who */}
              <section className="space-y-3" data-help="diary.who">
                <h3 className="text-[15px] font-semibold text-white">Who</h3>
                {board.people.length === 0 ? (
                  <p className="text-[13px] text-white">
                    Nobody on the team yet. Invite people from People → Team.
                  </p>
                ) : (
                  <div className="-mx-5 divide-y divide-white/[0.06] border-y border-white/[0.06]">
                    {peopleWithClashes.map(({ person, clashes, alreadyOn }) => {
                      const on = employeeId === person.id;
                      return (
                        <button
                          key={person.id}
                          type="button"
                          disabled={alreadyOn}
                          onClick={() => setEmployeeId(person.id)}
                          aria-pressed={on}
                          className={cn(
                            'w-full min-h-[60px] px-5 py-3 flex items-center gap-3 text-left touch-manipulation transition-colors',
                            on ? 'bg-white/[0.08]' : 'hover:bg-white/[0.04]',
                            alreadyOn && 'opacity-50'
                          )}
                        >
                          <Avatar initials={initialsOf(person.name, person.initials)} />
                          <span className="min-w-0 flex-1">
                            <span className="block text-[14px] font-medium text-white truncate">
                              {person.name}
                            </span>
                            <span
                              className={cn(
                                'block text-[12px] truncate',
                                clashes.length ? 'text-red-300' : 'text-white'
                              )}
                            >
                              {alreadyOn
                                ? 'Already on this job'
                                : clashes.length
                                  ? clashes.join(' · ')
                                  : `Free${person.linked ? '' : ' · not on the app yet'}`}
                            </span>
                          </span>
                          <span
                            className={cn(
                              'h-6 w-6 rounded-full border flex items-center justify-center shrink-0',
                              on ? 'bg-elec-yellow border-elec-yellow' : 'border-white/[0.2]'
                            )}
                          >
                            {on && <Check className="h-4 w-4 text-black" />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
                {selectedClashes.length > 0 && (
                  <p className="rounded-xl border border-red-500/50 bg-white/[0.04] px-3 py-2.5 text-[12.5px] text-white">
                    <span className="font-semibold text-red-300">Clash: </span>
                    {selectedClashes.join('; ')}. You can still book it.
                  </p>
                )}
              </section>

              {/* When */}
              <section className="space-y-3" data-help="diary.when">
                <h3 className="text-[15px] font-semibold text-white">When</h3>
                <div className="grid grid-cols-7 gap-1.5">
                  {days.map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setStartKeepLength(d)}
                      aria-pressed={start === d}
                      className={cn(chipCn(start === d), 'flex flex-col items-center justify-center h-14 px-0')}
                    >
                      <span className="text-[10px] uppercase tracking-[0.12em]">
                        {fmtDay(d, { weekday: 'short' })}
                      </span>
                      <span className="text-[15px] tabular-nums">{fmtDay(d, { day: 'numeric' })}</span>
                    </button>
                  ))}
                </div>
                <div className="flex items-center justify-between gap-2">
                  <SecondaryButton
                    size="sm"
                    onClick={() => setStartKeepLength(addDaysYmd(start, -7))}
                  >
                    ← Week before
                  </SecondaryButton>
                  <SecondaryButton size="sm" onClick={() => setStartKeepLength(addDaysYmd(start, 7))}>
                    Week after →
                  </SecondaryButton>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <label className="block">
                    <span className={fieldLabelClass}>From</span>
                    <input
                      type="date"
                      value={start}
                      onChange={(e) => e.target.value && setStartKeepLength(e.target.value)}
                      className={inputClass}
                    />
                  </label>
                  <label className="block">
                    <span className={fieldLabelClass}>To</span>
                    <input
                      type="date"
                      value={end}
                      min={start}
                      onChange={(e) => e.target.value && setEnd(e.target.value)}
                      className={inputClass}
                    />
                  </label>
                </div>
                <p className="text-[12.5px] text-white">
                  {rangeLabel(start, end)}
                  {mondayOf(start) !== weekStart ? ' (another week)' : ''}
                </p>
              </section>

              {/* Time */}
              <section className="space-y-3" data-help="diary.time">
                <h3 className="text-[15px] font-semibold text-white">Time on site</h3>
                <div className="grid grid-cols-4 gap-1.5">
                  {HOUR_CHOICES.map((h) => (
                    <button
                      key={h.label}
                      type="button"
                      onClick={() => setHours(h.value)}
                      aria-pressed={hours === h.value}
                      className={chipCn(hours === h.value)}
                    >
                      {h.label}
                    </button>
                  ))}
                </div>
                <label className="block max-w-[200px]">
                  <span className={fieldLabelClass}>Start time (optional)</span>
                  <input
                    type="time"
                    value={startTime}
                    step={900}
                    onChange={(e) => setStartTime(e.target.value)}
                    className={inputClass}
                  />
                </label>
              </section>

              {!isMove && (
                <label
                  className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.04] p-4 cursor-pointer touch-manipulation"
                >
                  <Checkbox
                    checked={email}
                    onCheckedChange={(c) => setEmail(c === true)}
                    className={checkboxClass}
                  />
                  <span className="text-[13px] text-white">
                    Email them the job details too (they always get a push)
                  </span>
                </label>
              )}

              {onOpenJob && (
                <button
                  type="button"
                  onClick={() => onOpenJob(job.id)}
                  className="h-11 inline-flex items-center gap-2 text-[13px] font-medium text-white touch-manipulation"
                >
                  <ExternalLink className="h-4 w-4" /> Open the job
                </button>
              )}
              {target?.kind === 'assign' && !target.jobId && (
                <button
                  type="button"
                  onClick={() => setJobId(null)}
                  className="h-11 ml-4 text-[13px] font-medium text-white underline underline-offset-4 touch-manipulation"
                >
                  Pick a different job
                </button>
              )}
            </div>
          )}
        </SheetShell>
      </SheetContent>
    </Sheet>
  );
}
