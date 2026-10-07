/**
 * Employer Hub → Jobs → Diary (ELE-1820): who is where, all week.
 *
 * Desktop: days across, people down, an Unassigned row on top; drag a block to
 * another day or person. Phone: the week as a day rail, one day in detail, and
 * every move is tap → sheet (drag is unreliable on touch).
 *
 * Moves write the booking's dates (and keep the job's dates covering its
 * crew) through firm-scoped RPCs, so office managers can dispatch. Each change
 * is logged; the worker gets ONE push with everything once the office has
 * stopped changing their week for a minute, or straight away on "Send now".
 */
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Copy, RefreshCw, Send } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useJobs } from '@/hooks/useJobs';
import {
  PageFrame,
  PageHero,
  StatStrip,
  IconButton,
  SecondaryButton,
  PrimaryButton,
  LoadingBlocks,
  EmptyState,
} from '@/components/employer/editorial';
import { ViewJobSheet } from '@/components/employer/sheets/ViewJobSheet';
import {
  useDispatchBoard,
  useDispatchIndex,
  useDispatchAssign,
  useDispatchMove,
  useRescheduleJob,
  usePublishDispatch,
  dispatchErrorMessage,
  type DispatchAssignment,
} from '@/hooks/useDispatchBoard';
import {
  addDaysYmd,
  clashesFor,
  diffDays,
  fmtDay,
  mondayOf,
  niceFirstName,
  personDay,
  rangeLabel,
  todayYmd,
  unassignedOnDay,
  weekDays,
  toSchedule,
} from '@/components/employer/diary/dispatchModel';
import { DiaryWeekGrid } from '@/components/employer/diary/DiaryWeekGrid';
import { DayRail, DiaryDayView } from '@/components/employer/diary/DiaryDayView';
import { DispatchSheet, type DispatchTarget } from '@/components/employer/diary/DispatchSheet';
import { CopyWeekSheet } from '@/components/employer/diary/CopyWeekSheet';
import { JobBlock } from '@/components/employer/diary/DiaryBlocks';
import type { DragPayload } from '@/components/employer/diary/dragPayload';
import { PageHelpButton, HowItWorks, type HelpBlocker } from '@/components/hub/PageHelp';
import { DIARY_HELP } from '@/components/employer/help/jobs';

export function DiarySection() {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const navigate = useNavigate();
  const [weekStart, setWeekStart] = useState(() => mondayOf(todayYmd()));
  const [selectedDay, setSelectedDay] = useState(() => todayYmd());
  const [target, setTarget] = useState<DispatchTarget | null>(null);
  const [copyOpen, setCopyOpen] = useState(false);
  const [viewJobId, setViewJobId] = useState<string | null>(null);

  const days = useMemo(() => weekDays(weekStart), [weekStart]);
  const weekEnd = days[6];
  const {
    data: board,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useDispatchBoard(weekStart, weekEnd);
  const { jobsById, peopleById, assignedJobIds } = useDispatchIndex(board);
  const { data: allJobs = [] } = useJobs();

  const assign = useDispatchAssign();
  const move = useDispatchMove();
  const reschedule = useRescheduleJob();
  const publish = usePublishDispatch();

  const goWeek = (delta: number) => {
    const next = addDaysYmd(weekStart, delta * 7);
    setWeekStart(next);
    setSelectedDay(addDaysYmd(next, (diffDays(selectedDay, weekStart) + 7) % 7));
  };
  const goToday = () => {
    setWeekStart(mondayOf(todayYmd()));
    setSelectedDay(todayYmd());
  };

  // Week-at-a-glance numbers for the strip.
  const stats = useMemo(() => {
    let clashes = 0;
    let hours = 0;
    for (const p of board.people) {
      for (const d of days) {
        const pd = personDay(board, p.id, d);
        hours += pd.hours;
        if (pd.clash) clashes += 1;
      }
    }
    const nobody = new Set<string>();
    days.forEach((d) =>
      unassignedOnDay(board.jobs, assignedJobIds, d).forEach((j) => nobody.add(j.id))
    );
    return { clashes, hours, nobody: nobody.size };
  }, [board, days, assignedJobIds]);

  const tray = useMemo(() => toSchedule(board.jobs), [board.jobs]);

  /** After a drag lands somewhere awkward, say so — with a one-tap undo. */
  const warnIfClash = (
    employeeId: string,
    start: string,
    end: string,
    opts: { ignoreAssignmentId?: string; ignoreJobId?: string; hours?: number | null },
    undo?: () => void
  ) => {
    const clashes = clashesFor(board, jobsById, employeeId, start, end, opts);
    if (!clashes.length) return;
    const name = niceFirstName(peopleById.get(employeeId)?.name) || 'They';
    toast.warning(`${name} clashes`, {
      description: clashes.join(' · '),
      action: undo ? { label: 'Undo', onClick: undo } : undefined,
      duration: 8000,
    });
  };

  const moveBooking = async (a: DispatchAssignment, employeeId: string, delta: number) => {
    const start = addDaysYmd(a.start_date, delta);
    const end = addDaysYmd(a.end_date, delta);
    try {
      await move.mutateAsync({
        assignmentId: a.id,
        employeeId,
        start,
        end,
        startTime: a.start_time,
        hours: a.hours_per_day,
      });
      warnIfClash(
        employeeId,
        start,
        end,
        { ignoreAssignmentId: a.id, ignoreJobId: a.job_id, hours: a.hours_per_day },
        () =>
          move.mutate({
            assignmentId: a.id,
            employeeId: a.employee_id,
            start: a.start_date,
            end: a.end_date,
            startTime: a.start_time,
            hours: a.hours_per_day,
          })
      );
    } catch (e) {
      toast.error(dispatchErrorMessage(e));
    }
  };

  const handleDrop = async (p: DragPayload, employeeId: string | null, day: string) => {
    if (p.type === 'booking') {
      const a = board.assignments.find((x) => x.id === p.id);
      if (!a) return;
      if (!employeeId) {
        toast.info('Drop it on a person, or tap the block to take them off the job.');
        return;
      }
      const delta = diffDays(day, p.fromDay);
      if (delta === 0 && employeeId === a.employee_id) return;
      await moveBooking(a, employeeId, delta);
      return;
    }

    const job = jobsById.get(p.id);
    if (!job) return;
    const len = job.start_date ? diffDays(job.end_date || job.start_date, job.start_date) : 0;
    const start =
      job.start_date && p.fromDay ? addDaysYmd(job.start_date, diffDays(day, p.fromDay)) : day;
    const end = addDaysYmd(start, len);

    try {
      if (!employeeId) {
        if (job.start_date === start) return;
        await reschedule.mutateAsync({ jobId: job.id, start, end });
        toast.success(`${job.title} moved to ${rangeLabel(start, end)}`);
        return;
      }
      await assign.mutateAsync({
        jobId: job.id,
        employeeId,
        start,
        end,
        email: true,
        jobTitle: job.title,
        jobLocation: job.location,
      });
      const person = peopleById.get(employeeId);
      toast.success(`${niceFirstName(person?.name) || 'They'} booked on ${job.title}`, {
        description: person?.linked
          ? 'They have been sent a push.'
          : 'Not on the app yet, so tell them directly.',
      });
      warnIfClash(employeeId, start, end, { ignoreJobId: job.id });
    } catch (e) {
      toast.error(dispatchErrorMessage(e));
    }
  };

  const sendNow = async () => {
    try {
      const n = await publish.mutateAsync();
      toast.success(
        n ? `Sent to ${n} ${n === 1 ? 'person' : 'people'}` : 'Nothing waiting to send'
      );
    } catch (e) {
      toast.error(dispatchErrorMessage(e));
    }
  };

  const viewJob = viewJobId ? (allJobs.find((j) => j.id === viewJobId) ?? null) : null;
  const sameMonth = weekStart.slice(0, 7) === weekEnd.slice(0, 7);
  const weekLabel = `${fmtDay(weekStart, sameMonth ? { day: 'numeric' } : { day: 'numeric', month: 'short' })} to ${fmtDay(weekEnd, { day: 'numeric', month: 'short' })}`;

  // Live "Before you start" lines for the help (ELE-1980).
  const helpBlockers: HelpBlocker[] = [];
  if (!isLoading && !isError && board.people.length === 0) {
    helpBlockers.push({
      text: 'Nobody on the team yet, so there is no one to book.',
      fixLabel: 'Open the team',
      onFix: () => navigate('/employer?section=team'),
    });
  }
  if (!isLoading && !isError && board.jobs.length === 0) {
    helpBlockers.push({
      text: 'No jobs to book yet.',
      fixLabel: 'Open jobs',
      onFix: () => navigate('/employer?section=jobs'),
    });
  }
  const helpAsk = { page: 'diary', tab: isDesktop ? 'week' : selectedDay };

  const hero = (
    <PageHero
      eyebrow="Operations"
      title="Diary"
      description={
        isDesktop
          ? 'Who is where this week. Drag a job onto a person, or a booking to another day.'
          : 'Who is where this week. Tap a day, then tap a job or a person to book or move.'
      }
      tone="blue"
      actions={
        <div className="flex items-center gap-2">
          <SecondaryButton data-help="diary.copy" onClick={() => setCopyOpen(true)}>
            <Copy className="h-4 w-4 mr-2" />
            Copy last week
          </SecondaryButton>
          <IconButton onClick={() => refetch()} aria-label="Refresh diary">
            <RefreshCw className={cn('h-4 w-4', isFetching && 'animate-spin')} />
          </IconButton>
          <PageHelpButton help={DIARY_HELP} blockers={helpBlockers} askContext={helpAsk} />
        </div>
      }
    />
  );

  if (isLoading) {
    return (
      <PageFrame>
        {hero}
        <LoadingBlocks />
      </PageFrame>
    );
  }

  return (
    <PageFrame className="space-y-6 sm:space-y-8 lg:space-y-8">
      {hero}
      <HowItWorks help={DIARY_HELP} blockers={helpBlockers} askContext={helpAsk} />

      {isError ? (
        <EmptyState
          title="Couldn't load the diary"
          description={dispatchErrorMessage(error)}
          action="Try again"
          onAction={() => refetch()}
        />
      ) : (
        <>
          {isDesktop && (
            <StatStrip
              columns={3}
              stats={[
                { label: 'Hours booked', value: Math.round(stats.hours), tone: 'blue' },
                {
                  label: 'Jobs with nobody',
                  value: stats.nobody,
                  tone: stats.nobody ? 'red' : 'emerald',
                },
                { label: 'Clashes', value: stats.clashes, tone: stats.clashes ? 'red' : 'emerald' },
              ]}
            />
          )}

          {/* Week navigation */}
          <div className="flex items-center gap-2">
            <IconButton onClick={() => goWeek(-1)} aria-label="Previous week">
              <ChevronLeft className="h-4 w-4" />
            </IconButton>
            <div className="flex-1 min-w-0 text-center">
              <div className="text-[15px] font-semibold text-white tabular-nums truncate">
                {weekLabel}
              </div>
              <div className="text-[11.5px] text-white">
                {weekStart === mondayOf(todayYmd())
                  ? 'This week'
                  : weekStart > mondayOf(todayYmd())
                    ? `${diffDays(weekStart, mondayOf(todayYmd())) / 7} ${diffDays(weekStart, mondayOf(todayYmd())) === 7 ? 'week' : 'weeks'} ahead`
                    : `${diffDays(mondayOf(todayYmd()), weekStart) / 7} ${diffDays(mondayOf(todayYmd()), weekStart) === 7 ? 'week' : 'weeks'} ago`}
              </div>
            </div>
            <IconButton onClick={() => goWeek(1)} aria-label="Next week">
              <ChevronRight className="h-4 w-4" />
            </IconButton>
            <SecondaryButton
              onClick={goToday}
              disabled={weekStart === mondayOf(todayYmd()) && selectedDay === todayYmd()}
            >
              Today
            </SecondaryButton>
          </div>

          {/* Changes not yet pushed */}
          {board.unsent.changes > 0 && (
            <div className="-mx-4 sm:mx-0 flex items-center gap-3 border-y sm:border sm:rounded-2xl border-white/[0.10] bg-white/[0.04] px-4 py-3">
              <span aria-hidden className="h-2 w-2 rounded-full bg-orange-400 shrink-0" />
              <p className="flex-1 min-w-0 text-[13px] text-white">
                {board.unsent.changes} {board.unsent.changes === 1 ? 'change' : 'changes'} for{' '}
                {board.unsent.people} {board.unsent.people === 1 ? 'person' : 'people'} not sent
                yet.
                <span className="hidden sm:inline">
                  {' '}
                  They go as one push each, about a minute after your last change.
                </span>
              </p>
              <PrimaryButton
                data-help="diary.send"
                size="sm"
                onClick={sendNow}
                disabled={publish.isPending}
                className="shrink-0 h-11"
              >
                <Send className="h-4 w-4 mr-1.5" />
                Send now
              </PrimaryButton>
            </div>
          )}

          {board.people.length === 0 && board.jobs.length === 0 ? (
            <EmptyState
              title="Nothing to plan yet"
              description="Add your team under People and your jobs under Jobs. They appear here to book in."
            />
          ) : isDesktop ? (
            <DiaryWeekGrid
              board={board}
              days={days}
              jobsById={jobsById}
              assignedJobIds={assignedJobIds}
              onDrop={handleDrop}
              onOpenBooking={(id) => setTarget({ kind: 'move', assignmentId: id })}
              onOpenJob={(jobId, day) => setTarget({ kind: 'assign', jobId, day })}
              onEmptyCell={(employeeId, day) => setTarget({ kind: 'assign', employeeId, day })}
            />
          ) : (
            <div className="space-y-5">
              <DayRail board={board} days={days} selected={selectedDay} onSelect={setSelectedDay} />
              <DiaryDayView
                board={board}
                day={selectedDay}
                jobsById={jobsById}
                assignedJobIds={assignedJobIds}
                onOpenBooking={(id) => setTarget({ kind: 'move', assignmentId: id })}
                onOpenJob={(jobId, day) => setTarget({ kind: 'assign', jobId, day })}
                onBookPerson={(employeeId, day) => setTarget({ kind: 'assign', employeeId, day })}
              />
            </div>
          )}

          {/* Won work with no date */}
          {tray.length > 0 && (
            <section className="space-y-3">
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="text-[15px] font-semibold text-white">To schedule</h2>
                <span className="text-[12px] text-white">
                  {isDesktop ? 'Drag onto a person and day' : 'Tap to book a day'}
                </span>
              </div>
              <div className={cn(isDesktop ? 'grid grid-cols-4 gap-2' : 'space-y-2')}>
                {tray.map((j) => (
                  <JobBlock
                    key={j.id}
                    job={j}
                    day={null}
                    draggable={isDesktop}
                    note="No date yet"
                    onClick={() =>
                      setTarget({
                        kind: 'assign',
                        jobId: j.id,
                        day: isDesktop ? undefined : selectedDay,
                      })
                    }
                  />
                ))}
              </div>
            </section>
          )}

          {!isDesktop && (
            <p className="text-[12px] text-white text-center">
              {fmtDay(selectedDay, { weekday: 'long' })}: red means double-booked or booked on
              leave.
            </p>
          )}
        </>
      )}

      <DispatchSheet
        target={target}
        onClose={() => setTarget(null)}
        board={board}
        jobsById={jobsById}
        weekStart={weekStart}
        onOpenJob={(id) => {
          setTarget(null);
          setViewJobId(id);
        }}
      />
      <CopyWeekSheet open={copyOpen} onOpenChange={setCopyOpen} weekStart={weekStart} />
      <ViewJobSheet job={viewJob} open={!!viewJob} onOpenChange={(o) => !o && setViewJobId(null)} />
    </PageFrame>
  );
}
