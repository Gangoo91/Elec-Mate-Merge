/**
 * AssessmentCalendarSection — Calendar view for assessors.
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
  SectionHeader,
  ListCard,
  Pill,
  EmptyState,
  itemVariants,
  toneDot,
  type Tone,
} from '@/components/college/primitives';

interface AssessmentCalendarSectionProps {
  onNavigate: (section: CollegeSection) => void;
}

type AssessmentType = 'Observation' | 'Professional Discussion' | 'Portfolio Review' | 'Gateway Meeting';

interface ScheduledAssessment {
  id: string;
  studentId: string;
  studentName: string;
  assessmentType: AssessmentType;
  date: string;
  time: string;
  location: string;
  notes: string;
}

const ASSESSMENT_TYPES: AssessmentType[] = [
  'Observation',
  'Professional Discussion',
  'Portfolio Review',
  'Gateway Meeting',
];

const typeTone: Record<AssessmentType, Tone> = {
  Observation: 'blue',
  'Professional Discussion': 'purple',
  'Portfolio Review': 'emerald',
  'Gateway Meeting': 'amber',
};

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function AssessmentCalendarSection({
  onNavigate: _onNavigate,
}: AssessmentCalendarSectionProps) {
  const { students } = useCollegeSupabase();

  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const [assessments, setAssessments] = useState<ScheduledAssessment[]>([]);

  const [newAssessment, setNewAssessment] = useState({
    studentId: '',
    assessmentType: 'Observation' as AssessmentType,
    time: '09:00',
    location: '',
    notes: '',
  });

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();
  const startOffset = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

  const monthName = new Date(currentYear, currentMonth).toLocaleDateString('en-GB', {
    month: 'long',
    year: 'numeric',
  });

  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  const getDateStr = (day: number) =>
    `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  const assessmentsByDate = useMemo(() => {
    const map: Record<string, ScheduledAssessment[]> = {};
    assessments.forEach((a) => {
      if (!map[a.date]) map[a.date] = [];
      map[a.date].push(a);
    });
    return map;
  }, [assessments]);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
    setSelectedDay(null);
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
    setSelectedDay(null);
  };

  const goToToday = () => {
    setCurrentYear(today.getFullYear());
    setCurrentMonth(today.getMonth());
    setSelectedDay(today.getDate());
  };

  const selectedDateStr = selectedDay ? getDateStr(selectedDay) : null;
  const selectedDayAssessments = selectedDateStr ? assessmentsByDate[selectedDateStr] || [] : [];

  const upcomingAssessments = useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const sevenDaysLater = new Date(now);
    sevenDaysLater.setDate(sevenDaysLater.getDate() + 7);
    return assessments
      .filter((a) => {
        const d = new Date(a.date);
        return d >= now && d <= sevenDaysLater;
      })
      .sort((a, b) => {
        const cmp = a.date.localeCompare(b.date);
        return cmp !== 0 ? cmp : a.time.localeCompare(b.time);
      });
  }, [assessments]);

  const handleAddAssessment = () => {
    if (!newAssessment.studentId || !selectedDateStr) return;
    const student = students.find((s) => s.id === newAssessment.studentId);
    const assessment: ScheduledAssessment = {
      id: crypto.randomUUID(),
      studentId: newAssessment.studentId,
      studentName: student?.name || 'Unknown',
      assessmentType: newAssessment.assessmentType,
      date: selectedDateStr,
      time: newAssessment.time,
      location: newAssessment.location,
      notes: newAssessment.notes,
    };
    setAssessments((prev) => [...prev, assessment]);
    setNewAssessment({
      studentId: '',
      assessmentType: 'Observation',
      time: '09:00',
      location: '',
      notes: '',
    });
    setShowAddForm(false);
  };

  const activeStudents = students.filter((s) => s.status === 'Active');

  return (
    <PageFrame>
      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Tools · Assessment Calendar"
          title="Assessment calendar"
          description="Schedule observations, professional discussions, portfolio reviews and gateway meetings."
          tone="amber"
          actions={
            <button
              onClick={goToToday}
              className="text-[12.5px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation whitespace-nowrap"
            >
              Today →
            </button>
          }
        />
      </motion.div>

      {/* Month Nav */}
      <motion.div variants={itemVariants}>
        <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-2 flex items-center justify-between">
          <button
            onClick={handlePrevMonth}
            className="h-10 px-4 text-[12.5px] font-medium text-white/70 hover:text-white rounded-full hover:bg-white/[0.04] transition-colors touch-manipulation"
          >
            ← Previous
          </button>
          <h2 className="text-[13px] font-semibold text-white tracking-tight">{monthName}</h2>
          <button
            onClick={handleNextMonth}
            className="h-10 px-4 text-[12.5px] font-medium text-white/70 hover:text-white rounded-full hover:bg-white/[0.04] transition-colors touch-manipulation"
          >
            Next →
          </button>
        </div>
      </motion.div>

      {/* Calendar Grid */}
      <motion.div variants={itemVariants}>
        <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-3 sm:p-4">
          <div className="grid grid-cols-7 gap-1 mb-2">
            {WEEKDAYS.map((day) => (
              <div
                key={day}
                className="text-center text-[10px] font-medium text-white/40 uppercase tracking-[0.14em] py-1"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: startOffset }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dateStr = getDateStr(day);
              const dayAssessments = assessmentsByDate[dateStr] || [];
              const isToday = dateStr === todayStr;
              const isSelected = selectedDay === day;
              const uniqueTypes = [...new Set(dayAssessments.map((a) => a.assessmentType))];

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day === selectedDay ? null : day)}
                  className={cn(
                    'aspect-square rounded-lg flex flex-col items-center justify-center touch-manipulation transition-colors relative',
                    isSelected
                      ? 'bg-elec-yellow/15 ring-1 ring-elec-yellow/40'
                      : isToday
                        ? 'bg-white/[0.04] ring-1 ring-white/[0.08]'
                        : 'hover:bg-white/[0.03]'
                  )}
                >
                  <span
                    className={cn(
                      'text-[13px] font-medium tabular-nums',
                      isSelected ? 'text-elec-yellow' : isToday ? 'text-white' : 'text-white/70'
                    )}
                  >
                    {day}
                  </span>
                  {uniqueTypes.length > 0 && (
                    <div className="flex gap-0.5 mt-1">
                      {uniqueTypes.slice(0, 3).map((type) => (
                        <div
                          key={type}
                          className={cn('w-1 h-1 rounded-full', toneDot[typeTone[type]])}
                        />
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Day Detail */}
      {selectedDay !== null && (
        <motion.section variants={itemVariants} className="space-y-5">
          <SectionHeader
            eyebrow={new Date(currentYear, currentMonth, selectedDay).toLocaleDateString(
              'en-GB',
              { weekday: 'long' }
            )}
            title={new Date(currentYear, currentMonth, selectedDay).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
            action={showAddForm ? 'Cancel' : 'Add assessment'}
            onAction={() => setShowAddForm(!showAddForm)}
          />

          {showAddForm && (
            <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 sm:p-6 space-y-4">
              <div>
                <label className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">
                  Student
                </label>
                <select
                  value={newAssessment.studentId}
                  onChange={(e) =>
                    setNewAssessment((p) => ({ ...p, studentId: e.target.value }))
                  }
                  className="mt-2 w-full h-11 px-4 bg-[hsl(0_0%_9%)] border border-white/[0.08] rounded-xl text-white text-[13px] focus:outline-none focus:border-elec-yellow/60 touch-manipulation"
                >
                  <option value="">Select a student…</option>
                  {activeStudents.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">
                  Type
                </label>
                <div className="mt-2 grid grid-cols-2 gap-1.5">
                  {ASSESSMENT_TYPES.map((type) => {
                    const selected = newAssessment.assessmentType === type;
                    return (
                      <button
                        key={type}
                        onClick={() =>
                          setNewAssessment((p) => ({ ...p, assessmentType: type }))
                        }
                        className={cn(
                          'h-11 px-4 rounded-full text-[12.5px] font-medium transition-colors touch-manipulation flex items-center justify-center gap-1.5',
                          selected
                            ? 'bg-elec-yellow text-black'
                            : 'bg-[hsl(0_0%_9%)] border border-white/[0.08] text-white/70 hover:text-white'
                        )}
                      >
                        <span
                          aria-hidden
                          className={cn('w-1.5 h-1.5 rounded-full', toneDot[typeTone[type]])}
                        />
                        <span className="truncate">{type}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">
                    Time
                  </label>
                  <input
                    type="time"
                    value={newAssessment.time}
                    onChange={(e) => setNewAssessment((p) => ({ ...p, time: e.target.value }))}
                    className="mt-2 w-full h-11 px-4 bg-[hsl(0_0%_9%)] border border-white/[0.08] rounded-xl text-white text-[13px] tabular-nums focus:outline-none focus:border-elec-yellow/60 touch-manipulation"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">
                    Location / Notes
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Site visit — 42 Oak Lane"
                    value={newAssessment.location}
                    onChange={(e) =>
                      setNewAssessment((p) => ({ ...p, location: e.target.value }))
                    }
                    className="mt-2 w-full h-11 px-4 bg-[hsl(0_0%_9%)] border border-white/[0.08] rounded-xl text-white text-[13px] placeholder:text-white/35 focus:outline-none focus:border-elec-yellow/60 touch-manipulation"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-1">
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-[12.5px] font-medium text-white/70 hover:text-white transition-colors touch-manipulation"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddAssessment}
                  disabled={!newAssessment.studentId}
                  className="h-11 px-5 bg-elec-yellow text-black rounded-full text-[13px] font-semibold hover:opacity-90 disabled:opacity-40 transition-opacity touch-manipulation"
                >
                  Schedule →
                </button>
              </div>
            </div>
          )}

          {selectedDayAssessments.length === 0 ? (
            <EmptyState title="No assessments scheduled for this day" />
          ) : (
            <ListCard>
              {selectedDayAssessments
                .sort((a, b) => a.time.localeCompare(b.time))
                .map((a) => (
                  <div
                    key={a.id}
                    className="flex items-start gap-4 px-5 sm:px-6 py-4 hover:bg-[hsl(0_0%_15%)] transition-colors"
                  >
                    <span
                      aria-hidden
                      className={cn(
                        'w-[3px] self-stretch rounded-full shrink-0',
                        toneDot[typeTone[a.assessmentType]]
                      )}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-2">
                        <div className="min-w-0">
                          <div className="text-[14px] font-medium text-white truncate">
                            {a.studentName}
                          </div>
                          <div className="mt-0.5 text-[11.5px] text-white/50 tabular-nums">
                            {a.time}
                            {a.location ? ` · ${a.location}` : ''}
                          </div>
                        </div>
                        <Pill tone={typeTone[a.assessmentType]}>{a.assessmentType}</Pill>
                      </div>
                    </div>
                  </div>
                ))}
            </ListCard>
          )}
        </motion.section>
      )}

      {/* Upcoming 7 days */}
      <motion.section variants={itemVariants} className="space-y-5">
        <SectionHeader eyebrow="Upcoming" title="Next 7 days" />
        {upcomingAssessments.length === 0 ? (
          <EmptyState title="Nothing scheduled in the next 7 days" />
        ) : (
          <ListCard>
            {upcomingAssessments.map((a) => {
              const dateLabel = new Date(a.date).toLocaleDateString('en-GB', {
                weekday: 'short',
                day: 'numeric',
                month: 'short',
              });
              return (
                <div
                  key={a.id}
                  className="flex items-start gap-4 px-5 sm:px-6 py-4 hover:bg-[hsl(0_0%_15%)] transition-colors"
                >
                  <span
                    aria-hidden
                    className={cn(
                      'w-[3px] self-stretch rounded-full shrink-0',
                      toneDot[typeTone[a.assessmentType]]
                    )}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-2">
                      <div className="min-w-0">
                        <div className="text-[14px] font-medium text-white truncate">
                          {a.studentName}
                        </div>
                        <div className="mt-0.5 text-[11.5px] text-white/50 tabular-nums">
                          {dateLabel} · {a.time}
                          {a.location ? ` · ${a.location}` : ''}
                        </div>
                      </div>
                      <Pill tone={typeTone[a.assessmentType]}>{a.assessmentType}</Pill>
                    </div>
                  </div>
                </div>
              );
            })}
          </ListCard>
        )}
      </motion.section>
    </PageFrame>
  );
}
