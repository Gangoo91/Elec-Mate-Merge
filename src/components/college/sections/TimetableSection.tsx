/**
 * TimetableSection — the week's lessons, Monday to Friday.
 *
 * `college_lesson_plans.scheduled_date` is a DATE and the start time lives in
 * `scheduled_start_time` (TIME). The previous version formatted the date as a
 * clock time (so every lesson read 00:00, or 01:00 in BST) and compared it as
 * a timestamp against Friday midnight, which dropped Friday's lessons in
 * summer time. Everything here works in calendar days.
 *
 * Renders CONTENT ONLY under the CollegeDashboard masthead: KPI row → week
 * navigation → tutor chips → the week. Phones get one day at a time; wider
 * screens get five columns. No horizontal scroll anywhere.
 */

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import type { CollegeLessonPlan } from '@/services/college/collegeLessonPlanService';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { containerVariants, itemVariants, LoadingState } from '@/components/college/primitives';
import { HubKpi, HubKpiRow, HubSectionHeading } from '@/components/hub/HubPrimitives';

interface TimetableSectionProps {
  onNavigate: (section: CollegeSection) => void;
}

type LessonRow = CollegeLessonPlan & { scheduled_start_time?: string | null };

const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] as const;
const DAY_FULL_NAMES = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] as const;

const CHIP =
  'inline-flex h-11 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-4 text-[12.5px] font-medium transition-colors touch-manipulation';
const CHIP_ON = 'border-white bg-white text-black';
const CHIP_OFF = 'border-white/[0.14] text-white hover:bg-white/[0.06]';
const CARD = cn('overflow-hidden rounded-2xl border border-elec-yellow/35', CARD_SURFACE);

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

  const [currentWeekStart, setCurrentWeekStart] = useState(() => getMonday(new Date()));
  const [selectedDayIndex, setSelectedDayIndex] = useState(() => {
    const today = new Date().getDay();
    return today >= 1 && today <= 5 ? today - 1 : 0;
  });
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
      selectedTutorId
        ? weekLessons.filter((lp) => lp.tutor_id === selectedTutorId)
        : weekLessons,
    [weekLessons, selectedTutorId]
  );

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
  const todayCount = weekLessons.filter((lp) => lp.scheduled_date === todayIso).length;

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

  if (isLoading) return <LoadingState />;

  const renderLesson = (lp: LessonRow) => (
    <li key={lp.id}>
      <button
        type="button"
        onClick={() => navigate(`/college/lessons/${lp.id}`)}
        className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.09]"
      >
        <span
          aria-hidden="true"
          className={cn(
            'h-8 w-[3px] shrink-0 rounded-full',
            lp.scheduled_date === todayIso ? 'bg-elec-yellow' : 'bg-white/[0.25]'
          )}
        />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[14px] font-semibold leading-tight text-white">
            {lp.title}
          </span>
          <span className="mt-0.5 block truncate text-[12px] leading-tight text-white">
            {[getCohortName(lp.cohort_id), getTutorName(lp.tutor_id)].join(' · ')}
          </span>
        </span>
        <span className="shrink-0 text-right text-[13px] font-semibold tabular-nums text-white">
          <span className="block">{lp.scheduled_start_time?.slice(0, 5) ?? 'Time TBC'}</span>
          {lp.duration_minutes ? (
            <span className="block text-[11px] font-medium">{lp.duration_minutes} min</span>
          ) : null}
        </span>
        <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
      </button>
    </li>
  );

  const renderDay = (dayIndex: number, showHeader: boolean) => {
    const dayLessons = lessonsByDay.get(dayIndex) ?? [];
    const isToday = weekIsos[dayIndex] === todayIso;
    return (
      <div key={dayIndex} className={cn('flex min-w-0 flex-col', CARD)}>
        {showHeader && (
          <div className="flex items-baseline justify-between gap-2 border-b border-white/[0.10] px-4 py-3">
            <span
              className={cn(
                'text-[13px] font-semibold',
                isToday ? 'text-elec-yellow' : 'text-white'
              )}
            >
              {DAY_NAMES[dayIndex]}
            </span>
            <span className="text-[12px] font-medium tabular-nums text-white">
              {formatDate(weekDates[dayIndex])}
            </span>
          </div>
        )}
        {dayLessons.length > 0 ? (
          <ul className="divide-y divide-white/[0.10]">{dayLessons.map(renderLesson)}</ul>
        ) : (
          <p className="px-4 py-5 text-[12.5px] text-white">
            {selectedTutorId ? 'Nothing for this tutor' : 'No lessons'}
          </p>
        )}
      </div>
    );
  };

  return (
    <>
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        <HubKpiRow>
          <HubKpi
            accent
            label={isCurrentWeek ? 'This week' : 'Lessons that week'}
            value={String(weekLessons.length)}
            verdict={
              weekLessons.length > 0
                ? `${formatDate(currentWeekStart)} – ${formatDate(weekEnd)}`
                : 'Nothing scheduled'
            }
          />
          <HubKpi
            label="Today"
            value={isCurrentWeek ? String(todayCount) : '—'}
            verdict={
              !isCurrentWeek
                ? 'Viewing another week'
                : todayCount > 0
                  ? 'On the timetable today'
                  : 'No classes today'
            }
          />
          <HubKpi
            label="Tutors teaching"
            value={String(tutorsTeachingThisWeek)}
            verdict={
              tutorsList.length > 0
                ? `of ${tutorsList.length} on the team`
                : 'No tutors on the team yet'
            }
          />
        </HubKpiRow>
      </motion.section>

      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        <motion.div variants={itemVariants} className="flex items-end justify-between gap-4">
          <HubSectionHeading>
            {formatDate(currentWeekStart)} – {formatDate(weekEnd)}
          </HubSectionHeading>
          <button
            type="button"
            onClick={() => onNavigate('lessonplans')}
            className="-my-2 flex h-11 items-center px-2 text-[12px] font-bold text-elec-yellow transition-colors touch-manipulation"
          >
            All plans
          </button>
        </motion.div>

        {/* Week navigation — three 44px controls, no card around them. */}
        <motion.div variants={itemVariants} className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigateWeek(-1)}
            className={cn(CHIP, CHIP_OFF)}
            aria-label="Previous week"
          >
            ← Previous
          </button>
          <button
            type="button"
            onClick={goToCurrentWeek}
            disabled={isCurrentWeek}
            className={cn(CHIP, isCurrentWeek ? CHIP_ON : CHIP_OFF, 'disabled:cursor-default')}
          >
            This week
          </button>
          <button
            type="button"
            onClick={() => navigateWeek(1)}
            className={cn(CHIP, CHIP_OFF, 'ml-auto')}
            aria-label="Next week"
          >
            Next →
          </button>
        </motion.div>

        {tutorsList.length > 1 && (
          <motion.div
            variants={itemVariants}
            className="-mx-4 flex gap-2 overflow-x-auto px-4 hide-scrollbar sm:mx-0 sm:flex-wrap sm:px-0"
          >
            <button
              type="button"
              onClick={() => setSelectedTutorId(null)}
              className={cn(CHIP, !selectedTutorId ? CHIP_ON : CHIP_OFF)}
            >
              All tutors
            </button>
            {tutorsList.map((tutor) => (
              <button
                key={tutor.id}
                type="button"
                onClick={() => setSelectedTutorId(tutor.id === selectedTutorId ? null : tutor.id)}
                className={cn(CHIP, selectedTutorId === tutor.id ? CHIP_ON : CHIP_OFF)}
              >
                {tutor.name}
              </button>
            ))}
          </motion.div>
        )}

        {/* Phones: one day at a time. Five 44px day tabs, then that day's list. */}
        <motion.div variants={itemVariants} className="space-y-3 sm:hidden">
          <div className="grid grid-cols-5 gap-1.5">
            {DAY_NAMES.map((day, idx) => {
              const isToday = weekIsos[idx] === todayIso;
              const count = lessonsByDay.get(idx)?.length ?? 0;
              const selected = selectedDayIndex === idx;
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => setSelectedDayIndex(idx)}
                  aria-pressed={selected}
                  className={cn(
                    'flex h-14 flex-col items-center justify-center rounded-2xl border transition-colors touch-manipulation',
                    selected
                      ? 'border-white bg-white text-black'
                      : cn('border-white/[0.14]', isToday ? 'text-elec-yellow' : 'text-white')
                  )}
                >
                  <span className="text-[11px] font-semibold">{day}</span>
                  <span className="text-[12px] font-semibold tabular-nums">
                    {weekDates[idx].getDate()}
                    {count > 0 ? ` · ${count}` : ''}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-[13px] font-semibold text-white">
              {DAY_FULL_NAMES[selectedDayIndex]}
            </span>
            <span className="text-[12px] font-medium tabular-nums text-white">
              {formatDate(weekDates[selectedDayIndex])}
            </span>
          </div>
          {renderDay(selectedDayIndex, false)}
        </motion.div>

        {/* Wider screens: five columns of day cards. */}
        <motion.div
          variants={itemVariants}
          className="hidden gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-5"
        >
          {Array.from({ length: 5 }, (_, i) => renderDay(i, true))}
        </motion.div>
      </motion.section>
    </>
  );
}
