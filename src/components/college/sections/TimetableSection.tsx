/**
 * TimetableSection — Weekly timetable view showing lessons across the college.
 * Mobile: one day at a time with day tabs. Desktop: 5-day grid.
 */

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  User,
  Users,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';

interface TimetableSectionProps {
  onNavigate: (section: CollegeSection) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
};

const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] as const;
const DAY_FULL_NAMES = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] as const;

const TUTOR_COLOURS = [
  'border-l-blue-400',
  'border-l-emerald-400',
  'border-l-amber-400',
  'border-l-purple-400',
  'border-l-rose-400',
  'border-l-cyan-400',
  'border-l-orange-400',
  'border-l-indigo-400',
] as const;

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
    // 0=Sun, 1=Mon...5=Fri, 6=Sat → map to 0-4, default to 0 for weekend
    return today >= 1 && today <= 5 ? today - 1 : 0;
  });
  const [selectedTutorId, setSelectedTutorId] = useState<string | null>(null);

  // Build tutor colour map
  const tutorColourMap = useMemo(() => {
    const map = new Map<string, string>();
    const tutors = staff.filter((s) => s.role === 'tutor');
    tutors.forEach((t, i) => {
      map.set(t.id, TUTOR_COLOURS[i % TUTOR_COLOURS.length]);
    });
    return map;
  }, [staff]);

  // Week dates
  const weekDates = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => {
      const d = new Date(currentWeekStart);
      d.setDate(d.getDate() + i);
      return d;
    });
  }, [currentWeekStart]);

  const weekEnd = useMemo(() => {
    const d = new Date(currentWeekStart);
    d.setDate(d.getDate() + 4);
    return d;
  }, [currentWeekStart]);

  // Filter lessons for this week
  const weekLessons = useMemo(() => {
    return lessonPlans.filter((lp) => {
      if (!lp.scheduled_date) return false;
      const d = new Date(lp.scheduled_date);
      return d >= currentWeekStart && d <= weekEnd;
    });
  }, [lessonPlans, currentWeekStart, weekEnd]);

  // Filtered by tutor
  const filteredLessons = useMemo(() => {
    if (!selectedTutorId) return weekLessons;
    return weekLessons.filter((lp) => lp.tutor_id === selectedTutorId);
  }, [weekLessons, selectedTutorId]);

  // Group by day index (0=Mon, 4=Fri)
  const lessonsByDay = useMemo(() => {
    const groups: Map<number, typeof filteredLessons> = new Map();
    for (let i = 0; i < 5; i++) groups.set(i, []);

    filteredLessons.forEach((lp) => {
      if (!lp.scheduled_date) return;
      const d = new Date(lp.scheduled_date);
      const dayOfWeek = d.getDay(); // 0=Sun...6=Sat
      const idx = dayOfWeek - 1; // Mon=0...Fri=4
      if (idx >= 0 && idx <= 4) {
        groups.get(idx)!.push(lp);
      }
    });

    // Sort each day by time
    groups.forEach((lessons) => {
      lessons.sort((a, b) => {
        if (!a.scheduled_date || !b.scheduled_date) return 0;
        return new Date(a.scheduled_date).getTime() - new Date(b.scheduled_date).getTime();
      });
    });

    return groups;
  }, [filteredLessons]);

  // Tutors for filter
  const tutorsList = useMemo(() => {
    return staff.filter((s) => s.role === 'tutor');
  }, [staff]);

  const navigateWeek = (direction: -1 | 1) => {
    setCurrentWeekStart((prev) => {
      const d = new Date(prev);
      d.setDate(d.getDate() + direction * 7);
      return d;
    });
  };

  const goToCurrentWeek = () => {
    setCurrentWeekStart(getMonday(new Date()));
  };

  const getCohortName = (cohortId: string | null) => {
    if (!cohortId) return 'Unassigned';
    return cohorts.find((c) => c.id === cohortId)?.name ?? 'Unknown';
  };

  const getTutorName = (tutorId: string | null) => {
    if (!tutorId) return 'TBC';
    return staff.find((s) => s.id === tutorId)?.name ?? 'Unknown';
  };

  const getTutorColour = (tutorId: string | null) => {
    if (!tutorId) return 'border-l-white/20';
    return tutorColourMap.get(tutorId) ?? 'border-l-white/20';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
      </div>
    );
  }

  const renderLessonCard = (lp: (typeof lessonPlans)[0]) => (
    <button
      key={lp.id}
      onClick={() => onNavigate('lessonplans')}
      className="w-full text-left touch-manipulation"
    >
      <div
        className={cn(
          'group card-surface-interactive overflow-hidden active:scale-[0.98] transition-all border-l-[3px]',
          getTutorColour(lp.tutor_id)
        )}
      >
        <div className="relative z-10 p-3 space-y-1.5">
          <p className="text-sm font-semibold text-white leading-tight">{lp.title}</p>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="flex items-center gap-1 text-[11px] text-white">
              <Users className="h-3 w-3 text-blue-400 shrink-0" />
              {getCohortName(lp.cohort_id)}
            </span>
            <span className="flex items-center gap-1 text-[11px] text-white">
              <User className="h-3 w-3 text-emerald-400 shrink-0" />
              {getTutorName(lp.tutor_id)}
            </span>
            {lp.scheduled_date && (
              <span className="flex items-center gap-1 text-[11px] text-white">
                <Clock className="h-3 w-3 text-amber-400 shrink-0" />
                {formatTime(lp.scheduled_date)}
                {lp.duration_minutes ? ` (${lp.duration_minutes}min)` : ''}
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  );

  const renderDayColumn = (dayIndex: number, showHeader: boolean = true) => {
    const dayLessons = lessonsByDay.get(dayIndex) ?? [];
    const isToday =
      weekDates[dayIndex].toDateString() === new Date().toDateString();

    return (
      <div key={dayIndex} className="space-y-2 min-w-0">
        {showHeader && (
          <div
            className={cn(
              'text-center py-2 rounded-lg',
              isToday ? 'bg-elec-yellow/10 border border-elec-yellow/20' : 'bg-white/[0.02]'
            )}
          >
            <p
              className={cn(
                'text-xs font-semibold uppercase tracking-wider',
                isToday ? 'text-elec-yellow' : 'text-white'
              )}
            >
              {DAY_NAMES[dayIndex]}
            </p>
            <p className="text-[10px] text-white">{formatDate(weekDates[dayIndex])}</p>
          </div>
        )}
        <div className="space-y-2">
          {dayLessons.length > 0 ? (
            dayLessons.map(renderLessonCard)
          ) : (
            <div className="card-surface p-4 text-center">
              <p className="text-[11px] text-white">No lessons</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
      {/* Week Navigation */}
      <motion.div variants={itemVariants}>
        <div className="card-surface p-3 flex items-center justify-between">
          <button
            onClick={() => navigateWeek(-1)}
            className="h-11 w-11 flex items-center justify-center rounded-xl bg-white/[0.05] border border-white/[0.06] touch-manipulation active:scale-[0.98] transition-all"
          >
            <ChevronLeft className="h-5 w-5 text-white" />
          </button>
          <button
            onClick={goToCurrentWeek}
            className="flex items-center gap-2 touch-manipulation active:scale-[0.98] transition-all px-3 py-1.5 rounded-lg"
          >
            <Calendar className="h-4 w-4 text-elec-yellow" />
            <span className="text-sm font-semibold text-white">
              {formatDate(currentWeekStart)} — {formatDate(weekEnd)}
            </span>
          </button>
          <button
            onClick={() => navigateWeek(1)}
            className="h-11 w-11 flex items-center justify-center rounded-xl bg-white/[0.05] border border-white/[0.06] touch-manipulation active:scale-[0.98] transition-all"
          >
            <ChevronRight className="h-5 w-5 text-white" />
          </button>
        </div>
      </motion.div>

      {/* Tutor Filter */}
      <motion.div variants={itemVariants}>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setSelectedTutorId(null)}
            className={cn(
              'shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border touch-manipulation active:scale-[0.98] transition-all',
              !selectedTutorId
                ? 'bg-elec-yellow text-black border-elec-yellow'
                : 'bg-white/[0.04] text-white border-white/[0.06]'
            )}
          >
            All Tutors
          </button>
          {tutorsList.map((tutor) => (
            <button
              key={tutor.id}
              onClick={() => setSelectedTutorId(tutor.id === selectedTutorId ? null : tutor.id)}
              className={cn(
                'shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border touch-manipulation active:scale-[0.98] transition-all',
                selectedTutorId === tutor.id
                  ? 'bg-elec-yellow text-black border-elec-yellow'
                  : 'bg-white/[0.04] text-white border-white/[0.06]'
              )}
            >
              {tutor.name}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Mobile: Day tabs + single day view */}
      <motion.div variants={itemVariants} className="block sm:hidden space-y-3">
        <div className="flex gap-1">
          {DAY_NAMES.map((day, idx) => {
            const isToday =
              weekDates[idx].toDateString() === new Date().toDateString();
            const lessonCount = lessonsByDay.get(idx)?.length ?? 0;

            return (
              <button
                key={day}
                onClick={() => setSelectedDayIndex(idx)}
                className={cn(
                  'flex-1 py-2 rounded-lg text-center touch-manipulation active:scale-[0.98] transition-all relative',
                  selectedDayIndex === idx
                    ? 'bg-elec-yellow/10 border border-elec-yellow/20'
                    : 'bg-white/[0.02] border border-transparent'
                )}
              >
                <p
                  className={cn(
                    'text-xs font-semibold uppercase tracking-wider',
                    selectedDayIndex === idx
                      ? 'text-elec-yellow'
                      : isToday
                        ? 'text-elec-yellow'
                        : 'text-white'
                  )}
                >
                  {day}
                </p>
                <p className="text-[10px] text-white">{weekDates[idx].getDate()}</p>
                {lessonCount > 0 && (
                  <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-elec-yellow" />
                )}
              </button>
            );
          })}
        </div>

        <div>
          <h3 className="text-xs font-medium text-white uppercase tracking-wider px-0.5 mb-2">
            {DAY_FULL_NAMES[selectedDayIndex]} {formatDate(weekDates[selectedDayIndex])}
          </h3>
          {renderDayColumn(selectedDayIndex, false)}
        </div>
      </motion.div>

      {/* Desktop: 5-day grid */}
      <motion.div variants={itemVariants} className="hidden sm:grid sm:grid-cols-5 gap-3">
        {Array.from({ length: 5 }, (_, i) => renderDayColumn(i))}
      </motion.div>
    </motion.div>
  );
}
