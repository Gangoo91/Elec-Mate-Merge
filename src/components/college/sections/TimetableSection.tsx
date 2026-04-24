/**
 * TimetableSection — Weekly timetable view.
 * Editorial redesign: typography-led, no icons.
 */

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import {
  PageFrame,
  PageHero,
  LoadingState,
  itemVariants,
  toneDot,
  type Tone,
} from '@/components/college/primitives';

interface TimetableSectionProps {
  onNavigate: (section: CollegeSection) => void;
}

const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] as const;
const DAY_FULL_NAMES = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] as const;

const TUTOR_TONES: Tone[] = [
  'blue',
  'emerald',
  'amber',
  'purple',
  'red',
  'cyan',
  'orange',
  'indigo',
];

const getMonday = (d: Date) => {
  const date = new Date(d);
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  date.setDate(diff);
  date.setHours(0, 0, 0, 0);
  return date;
};

const formatDate = (d: Date) =>
  d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

const formatTime = (dateStr: string) => {
  const d = new Date(dateStr);
  return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
};

export function TimetableSection({ onNavigate }: TimetableSectionProps) {
  const { lessonPlans, staff, cohorts, isLoading } = useCollegeSupabase();

  const [currentWeekStart, setCurrentWeekStart] = useState(() => getMonday(new Date()));
  const [selectedDayIndex, setSelectedDayIndex] = useState(() => {
    const today = new Date().getDay();
    return today >= 1 && today <= 5 ? today - 1 : 0;
  });
  const [selectedTutorId, setSelectedTutorId] = useState<string | null>(null);

  const tutorToneMap = useMemo(() => {
    const map = new Map<string, Tone>();
    const tutors = staff.filter((s) => s.role === 'tutor');
    tutors.forEach((t, i) => map.set(t.id, TUTOR_TONES[i % TUTOR_TONES.length]));
    return map;
  }, [staff]);

  const weekDates = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => {
        const d = new Date(currentWeekStart);
        d.setDate(d.getDate() + i);
        return d;
      }),
    [currentWeekStart]
  );

  const weekEnd = useMemo(() => {
    const d = new Date(currentWeekStart);
    d.setDate(d.getDate() + 4);
    return d;
  }, [currentWeekStart]);

  const weekLessons = useMemo(
    () =>
      lessonPlans.filter((lp) => {
        if (!lp.scheduled_date) return false;
        const d = new Date(lp.scheduled_date);
        return d >= currentWeekStart && d <= weekEnd;
      }),
    [lessonPlans, currentWeekStart, weekEnd]
  );

  const filteredLessons = useMemo(
    () => (selectedTutorId ? weekLessons.filter((lp) => lp.tutor_id === selectedTutorId) : weekLessons),
    [weekLessons, selectedTutorId]
  );

  const lessonsByDay = useMemo(() => {
    const groups: Map<number, typeof filteredLessons> = new Map();
    for (let i = 0; i < 5; i++) groups.set(i, []);
    filteredLessons.forEach((lp) => {
      if (!lp.scheduled_date) return;
      const d = new Date(lp.scheduled_date);
      const idx = d.getDay() - 1;
      if (idx >= 0 && idx <= 4) groups.get(idx)!.push(lp);
    });
    groups.forEach((lessons) => {
      lessons.sort((a, b) =>
        !a.scheduled_date || !b.scheduled_date
          ? 0
          : new Date(a.scheduled_date).getTime() - new Date(b.scheduled_date).getTime()
      );
    });
    return groups;
  }, [filteredLessons]);

  const tutorsList = useMemo(() => staff.filter((s) => s.role === 'tutor'), [staff]);

  const navigateWeek = (direction: -1 | 1) => {
    setCurrentWeekStart((prev) => {
      const d = new Date(prev);
      d.setDate(d.getDate() + direction * 7);
      return d;
    });
  };

  const goToCurrentWeek = () => setCurrentWeekStart(getMonday(new Date()));

  const getCohortName = (cohortId: string | null) =>
    !cohortId ? 'Unassigned' : cohorts.find((c) => c.id === cohortId)?.name ?? 'Unknown';
  const getTutorName = (tutorId: string | null) =>
    !tutorId ? 'TBC' : staff.find((s) => s.id === tutorId)?.name ?? 'Unknown';
  const getTutorTone = (tutorId: string | null): Tone =>
    !tutorId ? 'yellow' : tutorToneMap.get(tutorId) ?? 'yellow';

  if (isLoading) return <LoadingState />;

  const renderLessonCard = (lp: (typeof lessonPlans)[0]) => {
    const tone = getTutorTone(lp.tutor_id);
    return (
      <button
        key={lp.id}
        onClick={() => onNavigate('lessonplans')}
        className="w-full text-left touch-manipulation"
      >
        <div className="group bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors rounded-xl border border-white/[0.06] p-3 flex gap-3">
          <span
            aria-hidden
            className={cn('w-[3px] shrink-0 rounded-full self-stretch', toneDot[tone])}
          />
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-medium text-white leading-snug truncate">{lp.title}</p>
            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] text-white">
              <span className="truncate">{getCohortName(lp.cohort_id)}</span>
              <span className="truncate">{getTutorName(lp.tutor_id)}</span>
              {lp.scheduled_date && (
                <span className="tabular-nums">
                  {formatTime(lp.scheduled_date)}
                  {lp.duration_minutes ? ` · ${lp.duration_minutes}m` : ''}
                </span>
              )}
            </div>
          </div>
        </div>
      </button>
    );
  };

  const renderDayColumn = (dayIndex: number, showHeader: boolean = true) => {
    const dayLessons = lessonsByDay.get(dayIndex) ?? [];
    const isToday = weekDates[dayIndex].toDateString() === new Date().toDateString();
    return (
      <div key={dayIndex} className="space-y-2 min-w-0">
        {showHeader && (
          <div
            className={cn(
              'text-center py-2 rounded-lg border',
              isToday
                ? 'bg-elec-yellow/10 border-elec-yellow/20'
                : 'bg-[hsl(0_0%_10%)] border-white/[0.06]'
            )}
          >
            <p
              className={cn(
                'text-[10px] font-medium uppercase tracking-[0.18em]',
                isToday ? 'text-elec-yellow' : 'text-white'
              )}
            >
              {DAY_NAMES[dayIndex]}
            </p>
            <p className="mt-0.5 text-[11px] font-medium text-white tabular-nums">
              {formatDate(weekDates[dayIndex])}
            </p>
          </div>
        )}
        <div className="space-y-2">
          {dayLessons.length > 0 ? (
            dayLessons.map(renderLessonCard)
          ) : (
            <div className="bg-[hsl(0_0%_10%)] border border-white/[0.06] rounded-lg p-3 text-center">
              <p className="text-[11px] text-white">No lessons</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <PageFrame>
      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Tools · Timetable"
          title="Weekly timetable"
          description={`${formatDate(currentWeekStart)} — ${formatDate(weekEnd)} · Lessons across all cohorts.`}
          tone="purple"
          actions={
            <button
              onClick={goToCurrentWeek}
              className="text-[12.5px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation whitespace-nowrap"
            >
              This week →
            </button>
          }
        />
      </motion.div>

      {/* Week nav */}
      <motion.div variants={itemVariants}>
        <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-2 flex items-center justify-between">
          <button
            onClick={() => navigateWeek(-1)}
            className="h-10 px-4 text-[12.5px] font-medium text-white hover:text-white rounded-full hover:bg-white/[0.04] transition-colors touch-manipulation"
          >
            ← Previous
          </button>
          <div className="text-[13px] font-semibold text-white tabular-nums">
            {formatDate(currentWeekStart)} — {formatDate(weekEnd)}
          </div>
          <button
            onClick={() => navigateWeek(1)}
            className="h-10 px-4 text-[12.5px] font-medium text-white hover:text-white rounded-full hover:bg-white/[0.04] transition-colors touch-manipulation"
          >
            Next →
          </button>
        </div>
      </motion.div>

      {/* Tutor filter */}
      <motion.div variants={itemVariants}>
        <div className="flex gap-2 overflow-x-auto hide-scrollbar">
          <button
            onClick={() => setSelectedTutorId(null)}
            className={cn(
              'shrink-0 h-9 px-3.5 rounded-full text-[12px] font-medium transition-colors touch-manipulation',
              !selectedTutorId
                ? 'bg-elec-yellow text-black'
                : 'bg-[hsl(0_0%_12%)] border border-white/[0.06] text-white hover:text-white'
            )}
          >
            All Tutors
          </button>
          {tutorsList.map((tutor) => (
            <button
              key={tutor.id}
              onClick={() => setSelectedTutorId(tutor.id === selectedTutorId ? null : tutor.id)}
              className={cn(
                'shrink-0 h-9 px-3.5 rounded-full text-[12px] font-medium transition-colors touch-manipulation inline-flex items-center gap-1.5',
                selectedTutorId === tutor.id
                  ? 'bg-elec-yellow text-black'
                  : 'bg-[hsl(0_0%_12%)] border border-white/[0.06] text-white hover:text-white'
              )}
            >
              <span
                aria-hidden
                className={cn('h-1.5 w-1.5 rounded-full', toneDot[getTutorTone(tutor.id)])}
              />
              {tutor.name}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Mobile: day tabs */}
      <motion.div variants={itemVariants} className="block sm:hidden space-y-4">
        <div className="grid grid-cols-5 gap-1 bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-1">
          {DAY_NAMES.map((day, idx) => {
            const isToday = weekDates[idx].toDateString() === new Date().toDateString();
            const count = lessonsByDay.get(idx)?.length ?? 0;
            const selected = selectedDayIndex === idx;
            return (
              <button
                key={day}
                onClick={() => setSelectedDayIndex(idx)}
                className={cn(
                  'py-2 rounded-xl text-center transition-colors touch-manipulation relative',
                  selected
                    ? 'bg-elec-yellow text-black'
                    : isToday
                      ? 'text-elec-yellow'
                      : 'text-white hover:text-white'
                )}
              >
                <p className="text-[10px] font-semibold uppercase tracking-wider">{day}</p>
                <p
                  className={cn(
                    'mt-0.5 text-[11px] tabular-nums',
                    selected ? 'text-black/70' : 'text-white'
                  )}
                >
                  {weekDates[idx].getDate()}
                </p>
                {count > 0 && !selected && (
                  <div className="absolute top-1.5 right-1.5 w-1 h-1 rounded-full bg-elec-yellow" />
                )}
              </button>
            );
          })}
        </div>

        <div>
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
            {DAY_FULL_NAMES[selectedDayIndex]}
          </div>
          <div className="mt-1 text-base font-semibold text-white tabular-nums">
            {formatDate(weekDates[selectedDayIndex])}
          </div>
          <div className="mt-3">{renderDayColumn(selectedDayIndex, false)}</div>
        </div>
      </motion.div>

      {/* Desktop 5-day grid */}
      <motion.div variants={itemVariants} className="hidden sm:grid sm:grid-cols-5 gap-3">
        {Array.from({ length: 5 }, (_, i) => renderDayColumn(i))}
      </motion.div>
    </PageFrame>
  );
}
