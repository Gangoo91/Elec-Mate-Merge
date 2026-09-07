/**
 * AssessmentCalendarSection — observations, professional discussions,
 * portfolio reviews and gateway meetings on a month grid.
 *
 * Rebuilt on the shared hub language. CollegeDashboard draws the masthead;
 * this is content only:
 *
 *   KPI row → schedule (primary) → month → the selected day → next 7 days
 *
 * What went: the PageHero, the `bg-[hsl(0_0%_12%)]` month bar and grid, the
 * `bg-elec-yellow/15` selected-day wash (khaki over near-black), and the
 * blue/purple/emerald/amber dots that gave each assessment type a colour
 * nobody could learn. A day now shows a white dot per assessment; the type is
 * said in words on the row.
 *
 * Two things corrected:
 *
 * 1. Learner names were resolved INSIDE the query function from the roster
 *    in scope at the time it ran. The roster loads separately and is not in
 *    the query key, so on a cold load every row said "Learner" until
 *    something else refetched. Names are resolved at render now.
 *
 * 2. New rows were inserted with `status: 'scheduled'`; the column default
 *    (and so every other writer) is `'Scheduled'`. Matched to the default.
 */
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { containerVariants, itemVariants } from '@/components/college/primitives';
import { HubKpi, HubKpiRow, HubSectionHeading } from '@/components/hub/HubPrimitives';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';

interface AssessmentCalendarSectionProps {
  onNavigate: (section: CollegeSection) => void;
}

type AssessmentType = 'Observation' | 'Professional Discussion' | 'Portfolio Review' | 'Gateway Meeting';

interface ScheduledAssessment {
  id: string;
  studentId: string;
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

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const DAY_MS = 86_400_000;

const pad = (n: number) => String(n).padStart(2, '0');
const isoDate = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

const chipCn = (active: boolean) =>
  cn(
    'inline-flex h-11 shrink-0 items-center whitespace-nowrap rounded-full border px-3.5 text-[12.5px] font-medium transition-colors touch-manipulation',
    active
      ? 'border-elec-yellow text-elec-yellow'
      : 'border-white/[0.12] text-white hover:bg-white/[0.06]'
  );

const inputCn =
  'h-11 w-full rounded-xl border border-white/[0.12] bg-transparent px-4 text-[14px] text-white placeholder:text-white placeholder:opacity-60 focus:border-elec-yellow focus:outline-none';

const labelCn = 'mb-1.5 block text-[12px] font-semibold text-white';

export function AssessmentCalendarSection({ onNavigate: _onNavigate }: AssessmentCalendarSectionProps) {
  void _onNavigate;
  const { students } = useCollegeSupabase();
  const navigate = useNavigate();

  const today = new Date();
  const todayStr = isoDate(today);
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const { profile } = useAuth();
  const collegeId = profile?.college_id ?? undefined;
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Persisted to college_scheduled_assessments (RLS scopes to this college).
  const { data: assessments = [] } = useQuery({
    queryKey: ['scheduled-assessments', collegeId],
    enabled: !!collegeId,
    queryFn: async () => {
      const { data } = await supabase
        .from('college_scheduled_assessments')
        .select('id, student_id, assessment_type, scheduled_date, scheduled_time, location, notes')
        .order('scheduled_date');
      type Row = {
        id: string;
        student_id: string;
        assessment_type: string;
        scheduled_date: string;
        scheduled_time: string | null;
        location: string | null;
        notes: string | null;
      };
      return ((data ?? []) as Row[]).map(
        (r): ScheduledAssessment => ({
          id: r.id,
          studentId: r.student_id,
          assessmentType: r.assessment_type as AssessmentType,
          date: r.scheduled_date,
          time: (r.scheduled_time ?? '09:00').slice(0, 5),
          location: r.location ?? '',
          notes: r.notes ?? '',
        })
      );
    },
  });

  const studentById = useMemo(() => new Map(students.map((s) => [s.id, s])), [students]);
  const learnerName = (id: string) => studentById.get(id)?.name ?? 'Learner';
  const activeStudents = useMemo(
    () => students.filter((s) => (s.status ?? '').toLowerCase() === 'active'),
    [students]
  );

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
  const monthPrefix = `${currentYear}-${pad(currentMonth + 1)}`;
  const getDateStr = (day: number) => `${monthPrefix}-${pad(day)}`;

  const byDate = useMemo(() => {
    const map: Record<string, ScheduledAssessment[]> = {};
    for (const a of assessments) (map[a.date] ??= []).push(a);
    for (const list of Object.values(map)) list.sort((a, b) => a.time.localeCompare(b.time));
    return map;
  }, [assessments]);

  const shiftMonth = (delta: 1 | -1) => {
    const d = new Date(currentYear, currentMonth + delta, 1);
    setCurrentYear(d.getFullYear());
    setCurrentMonth(d.getMonth());
    setSelectedDay(null);
  };
  const goToToday = () => {
    setCurrentYear(today.getFullYear());
    setCurrentMonth(today.getMonth());
    setSelectedDay(today.getDate());
  };

  const selectedDateStr = selectedDay ? getDateStr(selectedDay) : null;
  const selectedDayAssessments = selectedDateStr ? (byDate[selectedDateStr] ?? []) : [];

  const upcoming = useMemo(() => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = isoDate(new Date(start.getTime() + 7 * DAY_MS));
    return assessments
      .filter((a) => a.date >= todayStr && a.date <= end)
      .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));
  }, [assessments, todayStr]);

  const thisMonth = assessments.filter((a) => a.date.startsWith(monthPrefix));
  const gatewayThisMonth = thisMonth.filter((a) => a.assessmentType === 'Gateway Meeting').length;

  const openForm = () => {
    if (selectedDay === null) goToToday();
    setShowAddForm(true);
  };

  const handleAddAssessment = async () => {
    if (!newAssessment.studentId || !selectedDateStr || !collegeId) return;
    setSaving(true);
    const { error } = await supabase.from('college_scheduled_assessments').insert({
      college_id: collegeId,
      student_id: newAssessment.studentId,
      assessment_type: newAssessment.assessmentType,
      scheduled_date: selectedDateStr,
      scheduled_time: newAssessment.time,
      location: newAssessment.location.trim() || null,
      notes: newAssessment.notes.trim() || null,
      status: 'Scheduled',
    });
    setSaving(false);
    if (error) {
      toast({ title: 'Could not schedule', description: error.message, variant: 'destructive' });
      return;
    }
    toast({ title: 'Assessment scheduled' });
    await queryClient.invalidateQueries({ queryKey: ['scheduled-assessments'] });
    setNewAssessment({ studentId: '', assessmentType: 'Observation', time: '09:00', location: '', notes: '' });
    setShowAddForm(false);
  };

  const cardCn = cn(
    '-mx-4 overflow-hidden border-y border-elec-yellow/35 sm:mx-0 sm:rounded-2xl sm:border-x',
    CARD_SURFACE
  );

  const AssessmentRow = ({ a, showDate }: { a: ScheduledAssessment; showDate?: boolean }) => (
    <li>
      <button
        type="button"
        onClick={() => navigate(`/college?section=student360&studentId=${encodeURIComponent(a.studentId)}`)}
        className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.09] sm:px-5"
      >
        <span
          aria-hidden="true"
          className={cn(
            'h-8 w-[3px] shrink-0 rounded-full',
            a.assessmentType === 'Gateway Meeting' ? 'bg-elec-yellow' : 'bg-white/[0.25]'
          )}
        />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[14px] font-semibold leading-tight text-white">
            {learnerName(a.studentId)}
          </span>
          <span className="mt-0.5 block truncate text-[12px] leading-tight text-white">
            {[a.assessmentType, a.location || null, a.notes || null].filter(Boolean).join(' · ')}
          </span>
        </span>
        <span className="shrink-0 text-right text-[12px] font-semibold tabular-nums leading-tight text-white">
          {showDate && (
            <span className="block">
              {new Date(a.date).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}
            </span>
          )}
          {a.time}
        </span>
        <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
      </button>
    </li>
  );

  return (
    <>
      <HubKpiRow>
        <HubKpi
          accent
          label="Next 7 days"
          value={String(upcoming.length)}
          verdict={
            upcoming.length > 0
              ? `First: ${learnerName(upcoming[0].studentId)}, ${upcoming[0].assessmentType.toLowerCase()}`
              : 'Nothing scheduled this week'
          }
        />
        <HubKpi
          label={monthName.split(' ')[0]}
          value={String(thisMonth.length)}
          verdict={thisMonth.length > 0 ? 'Assessments in the month shown' : 'Nothing in the month shown'}
        />
        <HubKpi
          label="Gateway meetings"
          value={String(gatewayThisMonth)}
          verdict={gatewayThisMonth > 0 ? 'In the month shown' : 'None this month'}
        />
      </HubKpiRow>

      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        <motion.div
          variants={itemVariants}
          className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
        >
          <HubSectionHeading>{monthName}</HubSectionHeading>
          {/* The one solid volt control on this screen. While the form is
              open its Schedule button takes over, so this one steps back. */}
          {showAddForm ? (
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="inline-flex h-11 w-full items-center justify-center rounded-full border border-white/[0.15] px-5 text-[13px] font-medium text-white transition-colors touch-manipulation hover:bg-white/[0.06] sm:w-auto"
            >
              Cancel
            </button>
          ) : (
            <button
              type="button"
              onClick={openForm}
              className="inline-flex h-11 w-full items-center justify-center rounded-full bg-elec-yellow px-5 text-[13px] font-semibold text-black transition-colors touch-manipulation hover:bg-elec-yellow/90 sm:w-auto"
            >
              Schedule an assessment
            </button>
          )}
        </motion.div>

        <motion.div variants={itemVariants} className={cn(cardCn, 'p-3 sm:p-4')}>
          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => shiftMonth(-1)}
              className="flex h-11 items-center rounded-full px-3 text-[12.5px] font-medium text-white transition-colors touch-manipulation hover:bg-white/[0.06]"
            >
              ← Previous
            </button>
            <button
              type="button"
              onClick={goToToday}
              className="flex h-11 items-center px-3 text-[12px] font-bold text-elec-yellow transition-colors touch-manipulation"
            >
              Today
            </button>
            <button
              type="button"
              onClick={() => shiftMonth(1)}
              className="flex h-11 items-center rounded-full px-3 text-[12.5px] font-medium text-white transition-colors touch-manipulation hover:bg-white/[0.06]"
            >
              Next →
            </button>
          </div>

          <div className="mt-2 grid grid-cols-7 gap-1">
            {WEEKDAYS.map((day) => (
              <div key={day} className="py-1 text-center text-[11px] font-semibold text-white">
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
              const count = byDate[dateStr]?.length ?? 0;
              const isToday = dateStr === todayStr;
              const isSelected = selectedDay === day;
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => setSelectedDay(day === selectedDay ? null : day)}
                  aria-pressed={isSelected}
                  aria-label={`${day} ${monthName}${count ? `, ${count} scheduled` : ''}`}
                  className={cn(
                    'relative flex aspect-square min-h-11 flex-col items-center justify-center rounded-xl border transition-colors touch-manipulation',
                    isSelected
                      ? 'border-elec-yellow'
                      : isToday
                        ? 'border-white/[0.35]'
                        : 'border-transparent hover:bg-white/[0.06]'
                  )}
                >
                  <span
                    className={cn(
                      'text-[13px] tabular-nums',
                      isSelected ? 'font-bold text-elec-yellow' : isToday ? 'font-bold text-white' : 'font-medium text-white'
                    )}
                  >
                    {day}
                  </span>
                  {count > 0 && (
                    <span className="mt-0.5 flex gap-0.5" aria-hidden>
                      {Array.from({ length: Math.min(count, 3) }).map((_, j) => (
                        <span key={j} className="h-1 w-1 rounded-full bg-white" />
                      ))}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>

        {selectedDay !== null && (
          <motion.div variants={itemVariants} className="space-y-3">
            <p className="text-[13px] font-semibold text-white">
              {new Date(currentYear, currentMonth, selectedDay).toLocaleDateString('en-GB', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
              })}
            </p>

            {showAddForm && (
              <div className={cn('space-y-4 rounded-2xl border border-elec-yellow/35 p-4 sm:p-5', CARD_SURFACE)}>
                <div>
                  <label htmlFor="cal-learner" className={labelCn}>
                    Learner
                  </label>
                  <select
                    id="cal-learner"
                    value={newAssessment.studentId}
                    onChange={(e) => setNewAssessment((p) => ({ ...p, studentId: e.target.value }))}
                    className={cn(inputCn, 'bg-elec-dark')}
                  >
                    <option value="">Choose a learner</option>
                    {activeStudents.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <span className={labelCn}>Type</span>
                  <div className="flex flex-wrap gap-2">
                    {ASSESSMENT_TYPES.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setNewAssessment((p) => ({ ...p, assessmentType: type }))}
                        className={chipCn(newAssessment.assessmentType === type)}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-[minmax(0,140px)_1fr]">
                  <div>
                    <label htmlFor="cal-time" className={labelCn}>
                      Time
                    </label>
                    <input
                      id="cal-time"
                      type="time"
                      value={newAssessment.time}
                      onChange={(e) => setNewAssessment((p) => ({ ...p, time: e.target.value }))}
                      className={cn(inputCn, 'tabular-nums')}
                    />
                  </div>
                  <div>
                    <label htmlFor="cal-location" className={labelCn}>
                      Location or notes
                    </label>
                    <input
                      id="cal-location"
                      type="text"
                      placeholder="e.g. Site visit — 42 Oak Lane"
                      value={newAssessment.location}
                      onChange={(e) => setNewAssessment((p) => ({ ...p, location: e.target.value }))}
                      className={inputCn}
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleAddAssessment}
                    disabled={!newAssessment.studentId || saving}
                    className="inline-flex h-11 w-full items-center justify-center rounded-full bg-elec-yellow px-5 text-[13px] font-semibold text-black transition-colors touch-manipulation hover:bg-elec-yellow/90 disabled:bg-white/[0.08] disabled:text-white disabled:opacity-60 sm:w-auto"
                  >
                    {saving ? 'Scheduling…' : 'Schedule'}
                  </button>
                </div>
              </div>
            )}

            <div className={cardCn}>
              {selectedDayAssessments.length === 0 ? (
                <p className="px-4 py-6 text-[13px] text-white sm:px-5">Nothing scheduled on this day.</p>
              ) : (
                <ul className="divide-y divide-white/[0.10]">
                  {selectedDayAssessments.map((a) => (
                    <AssessmentRow key={a.id} a={a} />
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        )}
      </motion.section>

      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        <HubSectionHeading>Next 7 days</HubSectionHeading>
        <motion.div variants={itemVariants} className={cardCn}>
          {upcoming.length === 0 ? (
            <p className="px-4 py-6 text-[13px] text-white sm:px-5">Nothing scheduled in the next 7 days.</p>
          ) : (
            <ul className="divide-y divide-white/[0.10]">
              {upcoming.map((a) => (
                <AssessmentRow key={a.id} a={a} showDate />
              ))}
            </ul>
          )}
        </motion.div>
      </motion.section>
    </>
  );
}
