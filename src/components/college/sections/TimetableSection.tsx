/**
 * TimetableSection — the week's lessons, Monday to Friday.
 *
 * `college_lesson_plans.scheduled_date` is a DATE and the start time lives in
 * `scheduled_start_time` (TIME). The previous version formatted the date as a
 * clock time (so every lesson read 00:00, or 01:00 in BST) and compared it as
 * a timestamp against Friday midnight, which dropped Friday's lessons in
 * summer time. Everything here works in calendar days.
 *
 * Renders CONTENT ONLY under the CollegeDashboard masthead: header (one
 * sentence with the week's counts) → week navigation → tutor chips → the
 * week. Phones get the week as a list of days; wide screens get five columns
 * by time. The four figure tiles were dropped 8 Oct: they repeated the
 * sentence and the grid.
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import { useMyCollegeContext } from '@/hooks/useMyCollegeContext';
import type { CollegeLessonPlan } from '@/services/college/collegeLessonPlanService';
import { itemVariants, LoadingState } from '@/components/college/primitives';
import type { PageHelpContent } from '@/components/hub/PageHelp';
import { CollegeSectionTitle } from '@/components/college/ui/CollegeUi';
import { CollegeCalendarFeedCard } from '@/components/college/calendar/CollegeCalendarFeedCard';
import {
  TEACH_BTN,
  TEACH_LIST,
  TEACH_PANEL,
  TeachingHeader,
  TeachTabs,
  TeachingScreen,
  plural,
} from '@/components/college/teaching/TeachingKit';
import { QuickRegisterSheet } from '@/components/college/teaching/QuickRegisterSheet';

interface TimetableSectionProps {
  onNavigate: (section: CollegeSection) => void;
}

type LessonRow = CollegeLessonPlan & { scheduled_start_time?: string | null };

const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] as const;
const DAY_FULL_NAMES = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] as const;

/** Week grid: one hour = 64px. */
const HOUR_PX = 64;

const HELP: PageHelpContent = {
  id: 'college-timetable',
  title: 'Timetable',
  what: 'Every lesson with a date, laid out as a week. On a computer you see the whole week by time; on a phone you see a list, day by day.',
  steps: [
    {
      title: 'Your week first',
      body: 'It opens on your own lessons. Tap "Everyone" to see the whole college, or a tutor to see theirs.',
    },
    { title: 'Open a lesson', body: 'Tap a lesson to open its plan, slides and register.' },
    {
      title: 'Take the register',
      body: "Today's lessons have a Register button. Your cohort and the date are already filled in.",
    },
  ],
  notes: [
    {
      title: 'Where lessons come from',
      body: 'A lesson shows here once its plan has a date. Add a start time and length to place it in the week grid; without one it sits at the top of the day.',
    },
  ],
};

const toMinutes = (t?: string | null) => {
  if (!t) return null;
  const [h, m] = t.split(':').map(Number);
  return Number.isFinite(h) ? h * 60 + (Number.isFinite(m) ? m : 0) : null;
};

const getMonday = (d: Date) => {
  const date = new Date(d);
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  date.setDate(diff);
  date.setHours(0, 0, 0, 0);
  return date;
};

/** Local calendar day as YYYY-MM-DD — the shape `scheduled_date` arrives in. */
const localIso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

const formatDate = (d: Date) => d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

export function TimetableSection({ onNavigate }: TimetableSectionProps) {
  const navigate = useNavigate();
  const { lessonPlans, staff, cohorts, isLoading } = useCollegeSupabase();
  const [register, setRegister] = useState<{
    open: boolean;
    cohortId?: string | null;
    title?: string | null;
    date?: string | null;
    lessonId?: string | null;
  }>({ open: false });

  const [currentWeekStart, setCurrentWeekStart] = useState(() => getMonday(new Date()));
  const [selectedTutorId, setSelectedTutorId] = useState<string | null>(null);

  const weekDates = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => {
        const d = new Date(currentWeekStart);
        d.setDate(d.getDate() + i);
        return d;
      }),
    [currentWeekStart]
  );
  const weekIsos = useMemo(() => weekDates.map(localIso), [weekDates]);
  const weekEnd = weekDates[4];
  const todayIso = localIso(new Date());
  const isCurrentWeek = weekIsos.includes(todayIso);

  const plans = lessonPlans as LessonRow[];

  const weekLessons = useMemo(
    () => plans.filter((lp) => !!lp.scheduled_date && weekIsos.includes(lp.scheduled_date)),
    [plans, weekIsos]
  );

  const filteredLessons = useMemo(
    () =>
      selectedTutorId ? weekLessons.filter((lp) => lp.tutor_id === selectedTutorId) : weekLessons,
    [weekLessons, selectedTutorId]
  );

  // Default the tutor filter to the signed-in user once, on first load, and
  // only when they teach in the week on screen (this week). Mine first
  // (ELE-1886), with "Everyone" one tap away. The chip bar shows whenever
  // the user owns a plan, so the filter can always be cleared.
  const { staff: me } = useMyCollegeContext();
  const myStaffId = me?.staff_id ?? null;
  const iOwnPlans = !!myStaffId && plans.some((lp) => lp.tutor_id === myStaffId);
  const defaultedTutor = useRef(false);
  useEffect(() => {
    if (defaultedTutor.current || isLoading || !myStaffId) return;
    defaultedTutor.current = true;
    if (weekLessons.some((lp) => lp.tutor_id === myStaffId)) setSelectedTutorId(myStaffId);
  }, [isLoading, myStaffId, weekLessons]);
  // A tap on a chip is a decision; the default must never override it.
  const pickTutor = (id: string | null) => {
    defaultedTutor.current = true;
    setSelectedTutorId(id);
  };

  const lessonsByDay = useMemo(() => {
    const groups = new Map<number, LessonRow[]>();
    for (let i = 0; i < 5; i++) groups.set(i, []);
    for (const lp of filteredLessons) {
      const idx = weekIsos.indexOf(lp.scheduled_date as string);
      if (idx >= 0) groups.get(idx)!.push(lp);
    }
    groups.forEach((lessons) =>
      lessons.sort((a, b) =>
        (a.scheduled_start_time ?? '99').localeCompare(b.scheduled_start_time ?? '99')
      )
    );
    return groups;
  }, [filteredLessons, weekIsos]);

  // college_lesson_plans.tutor_id → college_staff.id (FK-checked), so the
  // tutor list and the lesson filter share the college row id.
  const tutorsList = useMemo(() => staff.filter((s) => s.role === 'tutor'), [staff]);
  const tutorsTeachingThisWeek = useMemo(
    () => new Set(weekLessons.map((lp) => lp.tutor_id).filter(Boolean)).size,
    [weekLessons]
  );
  const todayCount = filteredLessons.filter((lp) => lp.scheduled_date === todayIso).length;

  const navigateWeek = (direction: -1 | 1) => {
    setCurrentWeekStart((prev) => {
      const d = new Date(prev);
      d.setDate(d.getDate() + direction * 7);
      return d;
    });
  };

  const goToCurrentWeek = () => setCurrentWeekStart(getMonday(new Date()));

  const getCohortName = (cohortId: string | null) =>
    !cohortId ? 'No cohort' : (cohorts.find((c) => c.id === cohortId)?.name ?? 'Unknown cohort');
  const getTutorName = (tutorId: string | null) =>
    !tutorId ? 'Tutor TBC' : (staff.find((s) => s.id === tutorId)?.name ?? 'Unknown tutor');
  /** Two tutors with the same name get their email name after it, so the chips differ. */
  const tutorChipLabel = (t: { name: string; email: string }) => {
    const same = tutorsList.filter(
      (x) => x.name.trim().toLowerCase() === t.name.trim().toLowerCase()
    );
    if (same.length < 2) return t.name;
    const handle = (t.email ?? '').split('@')[0];
    return handle ? `${t.name} (${handle})` : t.name;
  };

  if (isLoading) return <LoadingState />;

  const range = `${formatDate(currentWeekStart)} – ${formatDate(weekEnd)}`;
  // Mine covers the signed-in user even when their staff role isn't 'tutor'.
  const otherTutors = tutorsList.filter((t) => !(iOwnPlans && t.id === myStaffId));
  const openRegister = (lp: LessonRow) =>
    setRegister({
      open: true,
      cohortId: lp.cohort_id,
      title: lp.title,
      date: lp.scheduled_date,
      lessonId: lp.id,
    });

  /** Compact Register action for today's lessons in the desktop grid. */
  const registerBtn = (lp: LessonRow, extra?: string) => (
    <button
      type="button"
      onClick={() => openRegister(lp)}
      aria-label={`Take the register for ${lp.title}`}
      className={cn(
        'h-9 shrink-0 rounded-lg border border-white/[0.2] bg-[hsl(0_0%_14%)] px-2.5 text-[12px] font-semibold text-white touch-manipulation hover:border-white/[0.4]',
        extra
      )}
    >
      Register
    </button>
  );

  /* ── Desktop week grid geometry ───────────────────────────────────── */
  const timed = filteredLessons.filter((lp) => toMinutes(lp.scheduled_start_time) !== null);
  const untimedByDay = Array.from({ length: 5 }, (_, i) =>
    (lessonsByDay.get(i) ?? []).filter((lp) => toMinutes(lp.scheduled_start_time) === null)
  );
  const hasUntimed = untimedByDay.some((d) => d.length > 0);
  const earliest = Math.min(8 * 60, ...timed.map((lp) => toMinutes(lp.scheduled_start_time)!));
  const latest = Math.max(
    17 * 60,
    ...timed.map((lp) => toMinutes(lp.scheduled_start_time)! + (lp.duration_minutes ?? 60))
  );
  const gridStart = Math.floor(earliest / 60) * 60;
  const gridEnd = Math.ceil(latest / 60) * 60;
  const hours = Array.from({ length: (gridEnd - gridStart) / 60 }, (_, i) => gridStart / 60 + i);
  const gridHeight = ((gridEnd - gridStart) / 60) * HOUR_PX;
  const now = new Date();
  const nowMin = now.getHours() * 60 + now.getMinutes();
  const todayIdx = weekIsos.indexOf(todayIso);

  /** Side-by-side lanes for lessons that overlap on the same day. */
  const placeDay = (dayIndex: number) => {
    const items = (lessonsByDay.get(dayIndex) ?? [])
      .filter((lp) => toMinutes(lp.scheduled_start_time) !== null)
      .map((lp) => {
        const start = toMinutes(lp.scheduled_start_time)!;
        return {
          lp,
          start,
          end: start + Math.max(lp.duration_minutes ?? 60, 30),
          lane: 0,
          lanes: 1,
        };
      })
      .sort((a, b) => a.start - b.start);
    // Connected clusters: a run of lessons each overlapping the run so far.
    // Every lesson in a cluster shares one lane count, so widths line up and
    // no two cards can cover each other.
    let cluster: typeof items = [];
    let clusterEnd = -1;
    let laneEnds: number[] = [];
    const closeCluster = () => {
      const lanes = cluster.reduce((m, c) => Math.max(m, c.lane), 0) + 1;
      for (const c of cluster) c.lanes = lanes;
    };
    for (const it of items) {
      if (cluster.length > 0 && it.start >= clusterEnd) {
        closeCluster();
        cluster = [];
        laneEnds = [];
      }
      let lane = laneEnds.findIndex((e) => e <= it.start);
      if (lane === -1) lane = laneEnds.length;
      laneEnds[lane] = it.end;
      it.lane = lane;
      cluster.push(it);
      clusterEnd = Math.max(clusterEnd, it.end);
    }
    if (cluster.length > 0) closeCluster();
    return items;
  };

  const lessonMeta = (lp: LessonRow) =>
    [
      getCohortName(lp.cohort_id),
      lp.scheduled_room
        ? /^room\b/i.test(lp.scheduled_room)
          ? lp.scheduled_room
          : `Room ${lp.scheduled_room}`
        : null,
      selectedTutorId ? null : getTutorName(lp.tutor_id),
    ]
      .filter(Boolean)
      .join(' · ');

  /* ── Phone and tablet: the week as a list of days ─────────────────── */
  const dayList = (
    <div className="space-y-6 lg:hidden">
      {Array.from({ length: 5 }, (_, i) => {
        const dayLessons = lessonsByDay.get(i) ?? [];
        const isToday = weekIsos[i] === todayIso;
        return (
          <section key={i} className="space-y-2.5" aria-label={DAY_FULL_NAMES[i]}>
            <h3 className="flex items-baseline justify-between gap-3">
              <span
                className={cn(
                  'text-[15px] font-semibold',
                  isToday ? 'text-elec-yellow' : 'text-white'
                )}
              >
                {isToday ? 'Today' : DAY_FULL_NAMES[i]}
              </span>
              <span className="text-[12.5px] font-medium tabular-nums text-white">
                {formatDate(weekDates[i])}
                {dayLessons.length > 0
                  ? ` · ${dayLessons.length} lesson${dayLessons.length === 1 ? '' : 's'}`
                  : ''}
              </span>
            </h3>
            {dayLessons.length === 0 ? (
              <p className="text-[13px] text-white">
                {selectedTutorId
                  ? selectedTutorId === myStaffId
                    ? 'Nothing for you'
                    : 'Nothing for this tutor'
                  : 'No lessons'}
              </p>
            ) : (
              <ul className={TEACH_LIST}>
                {dayLessons.map((lp) => (
                  <li key={lp.id} className="flex items-center gap-2 pr-3 sm:pr-4">
                    <button
                      type="button"
                      onClick={() => navigate(`/college/lessons/${lp.id}`)}
                      className="flex min-h-[64px] min-w-0 flex-1 items-center gap-3 px-4 py-3 text-left touch-manipulation hover:bg-white/[0.04] sm:px-5"
                    >
                      <span className="w-14 shrink-0 text-[13.5px] font-semibold tabular-nums text-white">
                        <span className="block">
                          {lp.scheduled_start_time?.slice(0, 5) ?? 'TBC'}
                        </span>
                        {lp.duration_minutes ? (
                          <span className="block text-[12px] font-medium">
                            {lp.duration_minutes} min
                          </span>
                        ) : null}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="line-clamp-2 text-[14.5px] font-semibold leading-snug text-white">
                          {lp.title}
                        </span>
                        <span className="mt-0.5 block text-[12.5px] leading-snug text-white">
                          {lessonMeta(lp)}
                        </span>
                      </span>
                    </button>
                    {isToday && lp.cohort_id ? (
                      <button
                        type="button"
                        onClick={() => openRegister(lp)}
                        className={cn(TEACH_BTN, 'shrink-0 px-3')}
                      >
                        Register
                      </button>
                    ) : (
                      <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden />
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>
        );
      })}
    </div>
  );

  /* ── Desktop: a proper week view by time ──────────────────────────── */
  const weekGrid = (
    <div className={cn(TEACH_PANEL, 'hidden lg:block')}>
      <div className="grid grid-cols-[64px_repeat(5,minmax(0,1fr))] border-b border-white/[0.08]">
        <div />
        {DAY_NAMES.map((d, i) => {
          const isToday = i === todayIdx;
          const n = lessonsByDay.get(i)?.length ?? 0;
          return (
            <div key={d} className="border-l border-white/[0.06] px-3 py-3">
              <p
                className={cn(
                  'text-[13px] font-semibold',
                  isToday ? 'text-elec-yellow' : 'text-white'
                )}
              >
                {DAY_FULL_NAMES[i]}
              </p>
              <p className="text-[12px] tabular-nums text-white">
                {formatDate(weekDates[i])}
                {n > 0 ? ` · ${n}` : ''}
              </p>
            </div>
          );
        })}
      </div>

      {hasUntimed && (
        <div className="grid grid-cols-[64px_repeat(5,minmax(0,1fr))] border-b border-white/[0.08]">
          <div className="px-2 py-2 text-right text-[12px] font-medium leading-tight text-white">
            No time
          </div>
          {untimedByDay.map((list, i) => (
            <div key={i} className="space-y-1.5 border-l border-white/[0.06] p-1.5">
              {list.map((lp) => (
                <div
                  key={lp.id}
                  className="flex w-full items-start gap-1.5 rounded-xl border border-dashed border-white/[0.2] px-2.5 py-2 hover:border-white/[0.4]"
                >
                  <button
                    type="button"
                    onClick={() => navigate(`/college/lessons/${lp.id}`)}
                    className="min-w-0 flex-1 text-left touch-manipulation"
                  >
                    <span className="line-clamp-2 text-[12.5px] font-semibold leading-snug text-white">
                      {lp.title}
                    </span>
                    <span className="mt-0.5 block truncate text-[12px] text-white">
                      {lessonMeta(lp)}
                    </span>
                  </button>
                  {i === todayIdx && lp.cohort_id && registerBtn(lp)}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-[64px_repeat(5,minmax(0,1fr))]">
        <div className="relative" style={{ height: gridHeight }}>
          {hours.map((h, i) => (
            <span
              key={h}
              className="absolute right-2 -translate-y-1/2 text-[12px] font-medium tabular-nums text-white"
              style={{ top: i * HOUR_PX }}
            >
              {i === 0 ? '' : `${String(h).padStart(2, '0')}:00`}
            </span>
          ))}
        </div>
        {Array.from({ length: 5 }, (_, dayIndex) => {
          const placed = placeDay(dayIndex);
          const isToday = dayIndex === todayIdx;
          return (
            <div
              key={dayIndex}
              className={cn('relative border-l border-white/[0.06]', isToday && 'bg-white/[0.025]')}
              style={{ height: gridHeight }}
            >
              {hours.map((h, i) => (
                <div
                  key={h}
                  className="absolute inset-x-0 border-t border-white/[0.05]"
                  style={{ top: i * HOUR_PX }}
                  aria-hidden
                />
              ))}
              {isToday && nowMin >= gridStart && nowMin <= gridEnd && (
                <div
                  className="absolute inset-x-0 z-20 border-t-2 border-elec-yellow"
                  style={{ top: ((nowMin - gridStart) / 60) * HOUR_PX }}
                  aria-label="Now"
                />
              )}
              {placed.map(({ lp, start, end, lane, lanes }) => {
                const top = ((start - gridStart) / 60) * HOUR_PX;
                const height = Math.max(((end - start) / 60) * HOUR_PX - 4, 40);
                return (
                  <div
                    key={lp.id}
                    className="absolute z-10 p-0.5"
                    style={{
                      top,
                      height,
                      left: `${(lane / lanes) * 100}%`,
                      width: `${100 / lanes}%`,
                    }}
                  >
                    <div
                      className={cn(
                        'relative flex h-full flex-col overflow-hidden rounded-xl border px-2.5 py-2',
                        isToday
                          ? 'border-elec-yellow/60 bg-[hsl(0_0%_16%)]'
                          : 'border-white/[0.14] bg-[hsl(0_0%_14%)]'
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => navigate(`/college/lessons/${lp.id}`)}
                        className={cn(
                          // A button centres its content by default: pin the
                          // time and title to the top of the block.
                          'flex min-h-0 flex-1 flex-col items-stretch justify-start text-left touch-manipulation',
                          isToday && lp.cohort_id && height <= 84 && 'pr-[68px]'
                        )}
                        title={lp.title}
                      >
                        <span className="block text-[12px] font-semibold tabular-nums text-white">
                          {lp.scheduled_start_time?.slice(0, 5)}
                          {lp.duration_minutes ? ` · ${lp.duration_minutes} min` : ''}
                        </span>
                        <span className="mt-0.5 line-clamp-2 text-[13px] font-semibold leading-snug text-white">
                          {lp.title}
                        </span>
                        {height > 84 && (
                          <span className="mt-0.5 line-clamp-2 text-[12px] leading-snug text-white">
                            {lessonMeta(lp)}
                          </span>
                        )}
                      </button>
                      {isToday &&
                        lp.cohort_id &&
                        registerBtn(
                          lp,
                          height > 84 ? 'mt-1 self-start' : 'absolute right-1.5 top-1.5'
                        )}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );

  const who = selectedTutorId
    ? selectedTutorId === myStaffId
      ? 'for you'
      : `for ${getTutorName(selectedTutorId)}`
    : 'across the college';
  const weekWord = isCurrentWeek ? 'this week' : `in the week of ${formatDate(currentWeekStart)}`;
  const untimedCount = filteredLessons.filter((lp) => !lp.scheduled_start_time).length;
  const summary =
    filteredLessons.length === 0
      ? `No lessons ${who} ${weekWord}. A lesson plan shows here once it has a date.`
      : `${plural(filteredLessons.length, 'lesson')} ${who} ${weekWord}${
          isCurrentWeek ? (todayCount > 0 ? `, ${todayCount} today` : ', none today') : ''
        }. ${
          tutorsList.length > 0
            ? `${tutorsTeachingThisWeek} of ${plural(tutorsList.length, 'tutor')} ${tutorsTeachingThisWeek === 1 ? 'is' : 'are'} teaching.`
            : ''
        }`.trim();

  return (
    <TeachingScreen>
      <TeachingHeader
        eyebrow="Teaching"
        title="Timetable"
        help={HELP}
        summary={summary}
        sub={
          untimedCount > 0
            ? `${plural(untimedCount, 'lesson')} this week ${untimedCount === 1 ? 'has' : 'have'} no start time, so ${untimedCount === 1 ? 'it sits' : 'they sit'} at the top of the day.`
            : undefined
        }
        actions={
          <>
            <button
              type="button"
              className={cn(TEACH_BTN, 'flex-1 sm:flex-none')}
              onClick={() => onNavigate('lessonplans')}
            >
              Lesson plans
            </button>
            <button
              type="button"
              className={cn(TEACH_BTN, 'flex-1 sm:flex-none')}
              onClick={() => onNavigate('attendance')}
            >
              Registers
            </button>
          </>
        }
      />

      <section className="space-y-4">
        <CollegeSectionTitle title={range} sub={isCurrentWeek ? 'This week' : undefined} />

        <motion.div variants={itemVariants} className="flex flex-col gap-3">
          <div
            role="group"
            aria-label="Week"
            className="inline-flex w-full rounded-xl border border-white/[0.12] p-0.5 sm:w-auto sm:self-start"
          >
            <button
              type="button"
              onClick={() => navigateWeek(-1)}
              className="inline-flex h-11 flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-[10px] px-3.5 text-[13px] font-semibold text-white transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.1] sm:flex-none"
              aria-label="Previous week"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={1.75} aria-hidden />
              Previous
            </button>
            <button
              type="button"
              onClick={goToCurrentWeek}
              disabled={isCurrentWeek}
              className={cn(
                'inline-flex h-11 flex-1 items-center justify-center whitespace-nowrap rounded-[10px] px-3.5 text-[13px] font-semibold transition-colors touch-manipulation sm:flex-none',
                isCurrentWeek
                  ? 'bg-white text-black'
                  : 'text-white hover:bg-white/[0.06] active:bg-white/[0.1]'
              )}
            >
              This week
            </button>
            <button
              type="button"
              onClick={() => navigateWeek(1)}
              className="inline-flex h-11 flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-[10px] px-3.5 text-[13px] font-semibold text-white transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.1] sm:flex-none"
              aria-label="Next week"
            >
              Next
              <ChevronRight className="h-4 w-4" strokeWidth={1.75} aria-hidden />
            </button>
          </div>

          {(tutorsList.length > 1 || iOwnPlans) && (
            <TeachTabs
              label="Whose lessons"
              value={selectedTutorId ?? 'all'}
              onChange={(v) => pickTutor(v === 'all' ? null : v)}
              tabs={[
                ...(myStaffId && iOwnPlans ? [{ value: myStaffId, label: 'Mine' }] : []),
                { value: 'all', label: 'Everyone' },
                ...otherTutors.map((tutor) => ({ value: tutor.id, label: tutorChipLabel(tutor) })),
              ]}
            />
          )}
        </motion.div>

        {dayList}
        {weekGrid}
      </section>

      {/* The tutor's teaching, reviews and meetings in their own calendar */}
      <CollegeCalendarFeedCard variant="tutor" />

      <QuickRegisterSheet
        open={register.open}
        onOpenChange={(o) => setRegister((r) => ({ ...r, open: o }))}
        cohortId={register.cohortId}
        lessonTitle={register.title}
        lessonPlanId={register.lessonId}
        date={register.date}
      />
    </TeachingScreen>
  );
}
