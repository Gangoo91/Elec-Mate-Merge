/**
 * AssessmentCalendarSection — Calendar view for assessors planning site visits and assessments.
 * Month navigation, day grid, day detail, add assessment, upcoming list.
 */

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Calendar,
  MapPin,
  Clock,
  User,
  Eye,
  MessageSquare,
  ClipboardCheck,
  Award,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';

interface AssessmentCalendarSectionProps {
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

type AssessmentType = 'Observation' | 'Professional Discussion' | 'Portfolio Review' | 'Gateway Meeting';

interface ScheduledAssessment {
  id: string;
  studentId: string;
  studentName: string;
  assessmentType: AssessmentType;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  location: string;
  notes: string;
}

const ASSESSMENT_TYPES: AssessmentType[] = [
  'Observation',
  'Professional Discussion',
  'Portfolio Review',
  'Gateway Meeting',
];

const typeColors: Record<AssessmentType, { dot: string; bg: string; text: string; border: string }> = {
  Observation: { dot: 'bg-blue-400', bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
  'Professional Discussion': { dot: 'bg-purple-400', bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20' },
  'Portfolio Review': { dot: 'bg-emerald-400', bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
  'Gateway Meeting': { dot: 'bg-amber-400', bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20' },
};

const typeIcons: Record<AssessmentType, typeof Eye> = {
  Observation: Eye,
  'Professional Discussion': MessageSquare,
  'Portfolio Review': ClipboardCheck,
  'Gateway Meeting': Award,
};

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function AssessmentCalendarSection({ onNavigate }: AssessmentCalendarSectionProps) {
  const { students } = useCollegeSupabase();

  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Assessment data (local state)
  const [assessments, setAssessments] = useState<ScheduledAssessment[]>([]);

  // Add form state
  const [newAssessment, setNewAssessment] = useState({
    studentId: '',
    assessmentType: 'Observation' as AssessmentType,
    time: '09:00',
    location: '',
    notes: '',
  });

  // Calendar calculations
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay(); // 0=Sun
  // Convert to Mon=0 based
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

  // Navigation
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

  // Selected day's assessments
  const selectedDateStr = selectedDay ? getDateStr(selectedDay) : null;
  const selectedDayAssessments = selectedDateStr ? (assessmentsByDate[selectedDateStr] || []) : [];

  // Upcoming 7 days
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

  // Add assessment handler
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
    setNewAssessment({ studentId: '', assessmentType: 'Observation', time: '09:00', location: '', notes: '' });
    setShowAddForm(false);
  };

  const activeStudents = students.filter((s) => s.status === 'Active');

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
      {/* Month Navigation */}
      <motion.div variants={itemVariants}>
        <div className="card-surface overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400 opacity-30" />
          <div className="relative z-10 p-4 flex items-center justify-between">
            <button
              onClick={handlePrevMonth}
              className="w-11 h-11 rounded-full bg-white/[0.05] border border-white/[0.06] flex items-center justify-center touch-manipulation active:scale-[0.98] transition-all"
            >
              <ChevronLeft className="h-5 w-5 text-white" />
            </button>
            <h2 className="text-base font-semibold text-white">{monthName}</h2>
            <button
              onClick={handleNextMonth}
              className="w-11 h-11 rounded-full bg-white/[0.05] border border-white/[0.06] flex items-center justify-center touch-manipulation active:scale-[0.98] transition-all"
            >
              <ChevronRight className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Calendar Grid */}
      <motion.div variants={itemVariants}>
        <div className="card-surface overflow-hidden">
          <div className="relative z-10 p-3">
            {/* Weekday headers */}
            <div className="grid grid-cols-7 gap-1 mb-1">
              {WEEKDAYS.map((day) => (
                <div key={day} className="text-center text-[10px] font-medium text-white uppercase tracking-wider py-1">
                  {day}
                </div>
              ))}
            </div>

            {/* Day cells */}
            <div className="grid grid-cols-7 gap-1">
              {/* Empty cells for offset */}
              {Array.from({ length: startOffset }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square" />
              ))}

              {/* Day cells */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const dateStr = getDateStr(day);
                const dayAssessments = assessmentsByDate[dateStr] || [];
                const isToday = dateStr === todayStr;
                const isSelected = selectedDay === day;

                // Get unique assessment types for dots
                const uniqueTypes = [...new Set(dayAssessments.map((a) => a.assessmentType))];

                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day === selectedDay ? null : day)}
                    className={cn(
                      'aspect-square rounded-lg flex flex-col items-center justify-center touch-manipulation active:scale-[0.95] transition-all relative',
                      isSelected
                        ? 'bg-elec-yellow/10 border border-elec-yellow/30'
                        : isToday
                        ? 'bg-blue-500/10 border border-blue-500/20'
                        : 'hover:bg-white/[0.03] border border-transparent'
                    )}
                  >
                    <span
                      className={cn(
                        'text-sm font-medium',
                        isSelected ? 'text-elec-yellow' : isToday ? 'text-blue-400' : 'text-white'
                      )}
                    >
                      {day}
                    </span>
                    {uniqueTypes.length > 0 && (
                      <div className="flex gap-0.5 mt-0.5">
                        {uniqueTypes.slice(0, 3).map((type) => (
                          <div
                            key={type}
                            className={cn('w-1.5 h-1.5 rounded-full', typeColors[type].dot)}
                          />
                        ))}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Day Detail */}
      {selectedDay !== null && (
        <motion.section variants={itemVariants} className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">
              {new Date(currentYear, currentMonth, selectedDay).toLocaleDateString('en-GB', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
              })}
            </h2>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-elec-yellow text-black text-xs font-semibold touch-manipulation active:scale-[0.98] transition-all h-11 min-h-[44px]"
            >
              <Plus className="h-3.5 w-3.5" />
              Add Assessment
            </button>
          </div>

          {/* Add Assessment Form */}
          {showAddForm && (
            <div className="card-surface overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-amber-500 to-yellow-400 opacity-30" />
              <div className="relative z-10 p-4 space-y-3">
                {/* Student selector */}
                <div>
                  <label className="text-xs font-medium text-white uppercase tracking-wider mb-1.5 block">Student</label>
                  <select
                    value={newAssessment.studentId}
                    onChange={(e) => setNewAssessment((p) => ({ ...p, studentId: e.target.value }))}
                    className="w-full h-11 px-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:border-elec-yellow/40 focus:outline-none touch-manipulation"
                  >
                    <option value="">Select a student...</option>
                    {activeStudents.map((s) => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>

                {/* Assessment type */}
                <div>
                  <label className="text-xs font-medium text-white uppercase tracking-wider mb-1.5 block">Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    {ASSESSMENT_TYPES.map((type) => {
                      const Icon = typeIcons[type];
                      const colors = typeColors[type];
                      return (
                        <button
                          key={type}
                          onClick={() => setNewAssessment((p) => ({ ...p, assessmentType: type }))}
                          className={cn(
                            'flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium border touch-manipulation active:scale-[0.98] transition-all h-11 min-h-[44px]',
                            newAssessment.assessmentType === type
                              ? `${colors.bg} ${colors.text} ${colors.border}`
                              : 'bg-white/[0.02] text-white border-white/[0.06]'
                          )}
                        >
                          <Icon className="h-3.5 w-3.5" />
                          <span className="truncate">{type}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time */}
                <div>
                  <label className="text-xs font-medium text-white uppercase tracking-wider mb-1.5 block">Time</label>
                  <input
                    type="time"
                    value={newAssessment.time}
                    onChange={(e) => setNewAssessment((p) => ({ ...p, time: e.target.value }))}
                    className="w-full h-11 px-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:border-elec-yellow/40 focus:outline-none touch-manipulation"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="text-xs font-medium text-white uppercase tracking-wider mb-1.5 block">Location / Notes</label>
                  <input
                    type="text"
                    placeholder="e.g. Site visit — 42 Oak Lane"
                    value={newAssessment.location}
                    onChange={(e) => setNewAssessment((p) => ({ ...p, location: e.target.value }))}
                    className="w-full h-11 px-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder:text-white/40 focus:border-elec-yellow/40 focus:outline-none touch-manipulation"
                  />
                </div>

                {/* Submit */}
                <div className="flex gap-2">
                  <button
                    onClick={handleAddAssessment}
                    disabled={!newAssessment.studentId}
                    className={cn(
                      'flex-1 h-11 rounded-lg text-sm font-semibold touch-manipulation active:scale-[0.98] transition-all',
                      newAssessment.studentId
                        ? 'bg-elec-yellow text-black'
                        : 'bg-white/[0.04] text-white/40 border border-white/[0.06]'
                    )}
                  >
                    Schedule
                  </button>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="h-11 px-4 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white text-sm touch-manipulation active:scale-[0.98] transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Day's Assessments */}
          {selectedDayAssessments.length === 0 ? (
            <div className="card-surface p-6 text-center">
              <Calendar className="h-8 w-8 text-white mx-auto mb-2" />
              <p className="text-sm text-white">No assessments scheduled for this day.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {selectedDayAssessments
                .sort((a, b) => a.time.localeCompare(b.time))
                .map((assessment) => {
                  const colors = typeColors[assessment.assessmentType];
                  const Icon = typeIcons[assessment.assessmentType];
                  return (
                    <div key={assessment.id} className="card-surface-interactive overflow-hidden">
                      <div className={cn('absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r opacity-40', `from-${assessment.assessmentType === 'Observation' ? 'blue' : assessment.assessmentType === 'Professional Discussion' ? 'purple' : assessment.assessmentType === 'Portfolio Review' ? 'emerald' : 'amber'}-500`)} />
                      <div className="relative z-10 p-3.5 flex items-center gap-3">
                        <div className={cn('p-2 rounded-xl border', colors.bg, colors.border)}>
                          <Icon className={cn('h-4 w-4', colors.text)} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-white">{assessment.studentName}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className={cn('px-2 py-0.5 rounded-full text-[10px] font-semibold border', colors.bg, colors.text, colors.border)}>
                              {assessment.assessmentType}
                            </span>
                            <span className="text-[11px] text-white flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {assessment.time}
                            </span>
                          </div>
                          {assessment.location && (
                            <p className="text-[11px] text-white flex items-center gap-1 mt-1">
                              <MapPin className="h-3 w-3" />
                              {assessment.location}
                            </p>
                          )}
                        </div>
                        <div className="w-6 h-6 rounded-full bg-white/[0.05] border border-elec-yellow/20 flex items-center justify-center shrink-0">
                          <ChevronRight className="w-3.5 h-3.5 text-elec-yellow" />
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </motion.section>
      )}

      {/* Upcoming Assessments */}
      <motion.section variants={itemVariants} className="space-y-3">
        <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">Upcoming (Next 7 Days)</h2>
        {upcomingAssessments.length === 0 ? (
          <div className="card-surface p-6 text-center">
            <p className="text-sm text-white">No assessments scheduled in the next 7 days.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {upcomingAssessments.map((assessment) => {
              const colors = typeColors[assessment.assessmentType];
              const Icon = typeIcons[assessment.assessmentType];
              const dateLabel = new Date(assessment.date).toLocaleDateString('en-GB', {
                weekday: 'short',
                day: 'numeric',
                month: 'short',
              });

              return (
                <div key={assessment.id} className="card-surface-interactive overflow-hidden">
                  <div className={cn('absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r opacity-30', `from-${assessment.assessmentType === 'Observation' ? 'blue' : assessment.assessmentType === 'Professional Discussion' ? 'purple' : assessment.assessmentType === 'Portfolio Review' ? 'emerald' : 'amber'}-500`)} />
                  <div className="relative z-10 p-3.5 flex items-center gap-3">
                    <div className={cn('p-2 rounded-xl border', colors.bg, colors.border)}>
                      <Icon className={cn('h-4 w-4', colors.text)} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white">{assessment.studentName}</p>
                      <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                        <span className={cn('px-2 py-0.5 rounded-full text-[10px] font-semibold border', colors.bg, colors.text, colors.border)}>
                          {assessment.assessmentType}
                        </span>
                        <span className="text-[11px] text-white">{dateLabel} at {assessment.time}</span>
                      </div>
                      {assessment.location && (
                        <p className="text-[11px] text-white flex items-center gap-1 mt-1">
                          <MapPin className="h-3 w-3" />
                          {assessment.location}
                        </p>
                      )}
                    </div>
                    <div className="w-6 h-6 rounded-full bg-white/[0.05] border border-elec-yellow/20 flex items-center justify-center shrink-0">
                      <ChevronRight className="w-3.5 h-3.5 text-elec-yellow" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </motion.section>
    </motion.div>
  );
}
