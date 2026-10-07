/**
 * AssessmentCalendarSection — every assessment date in one place.
 *
 * Redesigned 7 Oct 2026 on the College Hub kit (CollegeUi + assessment kit).
 * CollegeDashboard draws the masthead and the landing ground; this is the
 * body:
 *
 *   header (+ "?", My learners / Everyone, Schedule) → figures →
 *   month (left) | the chosen day + next 7 days + other dates (right) →
 *   what is booked this month, by type
 *
 * What it shows:
 *   - Scheduled assessments (college_scheduled_assessments): observations,
 *     professional discussions, portfolio reviews, gateway meetings. These
 *     are the ones you book here.
 *   - EPA dates read from the EPA records (gateway date, EPA date), so the
 *     calendar is the whole picture, not only what was booked on this page.
 *   - Other dated work from the tutor's Today feed: observations due, IQA
 *     actions and EPA briefs this week.
 *
 * Mine first (ELE-1886): learners in cohorts you lead, one switch to see
 * the whole college.
 *
 * Kept from before: names resolved at render (the roster loads separately),
 * `status: 'Scheduled'` to match the column default.
 */
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { itemVariants } from '@/components/college/primitives';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import { useCollegeEPAs } from '@/hooks/college/useCollegeEPA';
import { useTutorToday } from '@/hooks/useTutorToday';
import type { PageHelpContent } from '@/components/hub/PageHelp';
import { FormSheet } from '@/components/forms/FormSheet';
import { inputCn, labelCn, textareaCn } from '@/components/forms/fieldStyles';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import {
  COLLEGE_BTN_PRIMARY,
  COLLEGE_CARD,
  COLLEGE_LIST,
  CollegePageHeader,
  CollegeSectionTitle,
  CollegeStats,
  chipCn,
} from '@/components/college/ui/CollegeUi';
import { useMyLearners } from '@/components/college/assessment/useMyLearners';
import { Bars, ScopeToggle, useScope } from '@/components/college/assessment/AssessmentKit';

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

/** One thing on the calendar: a booked assessment or an EPA date. */
interface CalItem {
  key: string;
  date: string;
  time: string | null;
  studentId: string | null;
  label: string;
  detail: string;
  /** Volt bar: gateway and EPA, the dates that cannot slip. */
  key_date: boolean;
  href: string;
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
const longDay = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });
const shortDay = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });

const WEEK_KIND: Record<string, string> = {
  observation_due: 'Observation due',
  iqa_action: 'IQA action',
  epa_brief: 'EPA brief',
};

const HELP: PageHelpContent = {
  id: 'college-assessment-calendar',
  title: 'The assessment calendar',
  what: 'Every assessment date for your learners on one month: observations, professional discussions, portfolio reviews and gateway meetings you book here, plus gateway and EPA dates from the EPA records.',
  steps: [
    { title: 'Pick a day', body: 'Tap a day on the month to see what is on it. Today is outlined; a dot means something is booked.' },
    { title: 'Schedule an assessment', body: 'Choose the learner, the type, the date and time, and where it happens. It appears on the calendar straight away.' },
    { title: 'Open the learner', body: 'Tap any row to open that learner’s record. Gateway and EPA dates open the gateway board.' },
  ],
  legend: [
    { swatch: 'bg-elec-yellow', label: 'Key date', body: 'Gateway meetings, gateway dates and EPA dates. These are the ones that cannot slip.' },
    { swatch: 'bg-white', label: 'Assessment', body: 'Observations, professional discussions and portfolio reviews.' },
  ],
  notes: [
    { title: 'My learners', body: 'Shows learners in the cohorts you lead. Switch to Everyone for the whole college.' },
  ],
};

export function AssessmentCalendarSection({ onNavigate: _onNavigate }: AssessmentCalendarSectionProps) {
  void _onNavigate;
  const { students } = useCollegeSupabase();
  const navigate = useNavigate();
  const my = useMyLearners();
  const [scope, setScope] = useScope('assessment-calendar', my);

  const today = new Date();
  const todayStr = isoDate(today);
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<string>(todayStr);
  const [showAddForm, setShowAddForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const { profile } = useAuth();
  const collegeId = profile?.college_id ?? undefined;
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: epaRecords = [] } = useCollegeEPAs();
  const { data: todayFeed } = useTutorToday();

  // Persisted to college_scheduled_assessments (RLS scopes to this college).
  const { data: assessments = [], isLoading } = useQuery({
    queryKey: ['scheduled-assessments', collegeId],
    enabled: !!collegeId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('college_scheduled_assessments')
        .select('id, student_id, assessment_type, scheduled_date, scheduled_time, location, notes')
        .order('scheduled_date');
      if (error) throw error;
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
  const learnerName = (id: string | null) => (id ? studentById.get(id)?.name : null) ?? 'Learner';
  const activeStudents = useMemo(
    () => students.filter((s) => (s.status ?? '').toLowerCase() === 'active'),
    [students]
  );
  const inScope = (studentId: string | null) =>
    scope === 'all' || (!!studentId && my.isMine({ studentId, cohortId: studentById.get(studentId)?.cohort_id }));

  const [newAssessment, setNewAssessment] = useState({
    studentId: '',
    assessmentType: 'Observation' as AssessmentType,
    date: todayStr,
    time: '09:00',
    location: '',
    notes: '',
  });

  // Everything on the calendar, booked or read from EPA records.
  const allItems = useMemo<CalItem[]>(() => {
    const out: CalItem[] = assessments.map((a) => ({
      key: `a-${a.id}`,
      date: a.date,
      time: a.time,
      studentId: a.studentId,
      label: a.assessmentType,
      detail: [a.location || null, a.notes || null].filter(Boolean).join(' · '),
      key_date: a.assessmentType === 'Gateway Meeting',
      href: `/college?section=student360&studentId=${encodeURIComponent(a.studentId)}`,
    }));
    for (const e of epaRecords) {
      if (e.gateway_date)
        out.push({
          key: `g-${e.id}`,
          date: e.gateway_date.slice(0, 10),
          time: null,
          studentId: e.student_id,
          label: 'Gateway date',
          detail: e.status ?? '',
          key_date: true,
          href: '/college/epa',
        });
      if (e.epa_date)
        out.push({
          key: `e-${e.id}`,
          date: e.epa_date.slice(0, 10),
          time: null,
          studentId: e.student_id,
          label: 'EPA date',
          detail: e.status ?? '',
          key_date: true,
          href: '/college/epa',
        });
    }
    return out;
  }, [assessments, epaRecords]);

  const mineCount = allItems.filter((i) => i.date >= todayStr && !!i.studentId && my.isMine({ studentId: i.studentId, cohortId: studentById.get(i.studentId)?.cohort_id })).length;
  const items = useMemo(
    () => allItems.filter((i) => inScope(i.studentId)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [allItems, scope, my.loading, studentById]
  );

  const byDate = useMemo(() => {
    const map: Record<string, CalItem[]> = {};
    for (const a of items) (map[a.date] ??= []).push(a);
    for (const list of Object.values(map)) list.sort((a, b) => (a.time ?? '').localeCompare(b.time ?? ''));
    return map;
  }, [items]);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();
  const startOffset = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
  const monthName = new Date(currentYear, currentMonth).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
  const monthWord = monthName.split(' ')[0];
  const monthPrefix = `${currentYear}-${pad(currentMonth + 1)}`;
  const getDateStr = (day: number) => `${monthPrefix}-${pad(day)}`;

  const shiftMonth = (delta: 1 | -1) => {
    const d = new Date(currentYear, currentMonth + delta, 1);
    setCurrentYear(d.getFullYear());
    setCurrentMonth(d.getMonth());
  };
  const goToToday = () => {
    setCurrentYear(today.getFullYear());
    setCurrentMonth(today.getMonth());
    setSelectedDate(todayStr);
  };

  const selectedItems = byDate[selectedDate] ?? [];

  const weekEnd = isoDate(new Date(new Date(`${todayStr}T00:00:00`).getTime() + 7 * DAY_MS));
  const upcoming = useMemo(
    () =>
      items
        .filter((a) => a.date >= todayStr && a.date <= weekEnd)
        .sort((a, b) => a.date.localeCompare(b.date) || (a.time ?? '').localeCompare(b.time ?? '')),
    [items, todayStr, weekEnd]
  );
  const otherDates = (todayFeed?.thisWeek ?? []).filter((w) => w.kind !== 'lesson');

  const thisMonth = items.filter((a) => a.date.startsWith(monthPrefix));
  const keyThisMonth = thisMonth.filter((a) => a.key_date).length;
  const byType = useMemo(() => {
    const labels = [...ASSESSMENT_TYPES, 'Gateway date', 'EPA date'];
    return labels.map((l) => ({
      label: l,
      n: thisMonth.filter((a) => a.label === l).length,
      cls: l === 'Gateway Meeting' || l === 'Gateway date' || l === 'EPA date' ? 'bg-elec-yellow' : 'bg-white',
    }));
  }, [thisMonth]);

  const openForm = (date?: string) => {
    setNewAssessment((p) => ({ ...p, date: date ?? (selectedDate >= todayStr ? selectedDate : todayStr) }));
    setShowAddForm(true);
  };

  const handleAddAssessment = async () => {
    if (!newAssessment.studentId || !newAssessment.date || !collegeId) return;
    setSaving(true);
    const { error } = await supabase.from('college_scheduled_assessments').insert({
      college_id: collegeId,
      student_id: newAssessment.studentId,
      assessment_type: newAssessment.assessmentType,
      scheduled_date: newAssessment.date,
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
    toast({ title: 'Assessment scheduled', description: `${learnerName(newAssessment.studentId)}, ${shortDay(newAssessment.date)}` });
    await queryClient.invalidateQueries({ queryKey: ['scheduled-assessments'] });
    const d = new Date(`${newAssessment.date}T12:00:00`);
    setCurrentYear(d.getFullYear());
    setCurrentMonth(d.getMonth());
    setSelectedDate(newAssessment.date);
    setNewAssessment({ studentId: '', assessmentType: 'Observation', date: todayStr, time: '09:00', location: '', notes: '' });
    setShowAddForm(false);
  };

  const Row = ({ a, showDate }: { a: CalItem; showDate?: boolean }) => (
    <li>
      <button
        type="button"
        onClick={() => navigate(a.href)}
        className="flex min-h-[60px] w-full items-center gap-3 px-5 py-3 text-left transition-colors touch-manipulation hover:bg-white/[0.04] active:bg-white/[0.07] sm:px-6"
      >
        <span aria-hidden="true" className={cn('h-9 w-[3px] shrink-0 rounded-full', a.key_date ? 'bg-elec-yellow' : 'bg-white/[0.3]')} />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[14.5px] font-semibold leading-tight text-white">{learnerName(a.studentId)}</span>
          <span className="mt-0.5 block truncate text-[12.5px] leading-tight text-white">
            {[a.label, a.detail || null].filter(Boolean).join(' · ')}
          </span>
        </span>
        <span className="shrink-0 text-right text-[12.5px] font-semibold tabular-nums leading-tight text-white">
          {showDate && <span className="block">{shortDay(a.date)}</span>}
          {a.time ?? (showDate ? '' : 'All day')}
        </span>
        <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
      </button>
    </li>
  );

  return (
    <>
      <CollegePageHeader
        eyebrow="Assessment"
        title="Assessment calendar"
        description="Observations, discussions, portfolio reviews, gateway and EPA dates for your learners, on one month."
        help={HELP}
        actions={
          <>
            <ScopeToggle scope={scope} onChange={setScope} my={my} mineCount={mineCount} />
            <button type="button" onClick={() => openForm()} className={COLLEGE_BTN_PRIMARY}>
              Schedule an assessment
            </button>
          </>
        }
      />

      <CollegeStats
        items={[
          {
            label: 'Next 7 days',
            value: String(upcoming.length),
            sub: upcoming.length > 0 ? `First: ${learnerName(upcoming[0].studentId)}, ${shortDay(upcoming[0].date)}` : 'Nothing booked this week',
          },
          { label: `In ${monthWord}`, value: String(thisMonth.length), sub: thisMonth.length ? 'Booked and EPA dates' : 'Nothing in this month' },
          { label: 'Key dates this month', value: String(keyThisMonth), sub: 'Gateway and EPA' },
          {
            label: 'Other dates this week',
            value: String(otherDates.length),
            sub: otherDates.length ? 'Observations, IQA, EPA briefs' : 'None this week',
          },
        ]}
      />

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        {/* Month */}
        <motion.section variants={itemVariants} initial="hidden" animate="visible" className={cn(COLLEGE_CARD, 'p-3 sm:p-5')}>
          <div className="flex items-center justify-between gap-2 px-1">
            <h2 className="text-[17px] font-semibold tracking-tight text-white">{monthName}</h2>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => shiftMonth(-1)}
                aria-label="Previous month"
                className="flex h-11 w-11 items-center justify-center rounded-xl text-white touch-manipulation hover:bg-white/[0.06]"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={goToToday}
                className="flex h-11 items-center rounded-xl px-3 text-[13px] font-semibold text-elec-yellow touch-manipulation hover:bg-white/[0.06]"
              >
                Today
              </button>
              <button
                type="button"
                onClick={() => shiftMonth(1)}
                aria-label="Next month"
                className="flex h-11 w-11 items-center justify-center rounded-xl text-white touch-manipulation hover:bg-white/[0.06]"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
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
              <div key={`empty-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dateStr = getDateStr(day);
              const list = byDate[dateStr] ?? [];
              const isToday = dateStr === todayStr;
              const isSelected = selectedDate === dateStr;
              const hasKey = list.some((x) => x.key_date);
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => setSelectedDate(dateStr)}
                  aria-pressed={isSelected}
                  aria-label={`${day} ${monthName}${list.length ? `, ${list.length} on this day` : ''}`}
                  className={cn(
                    'relative flex min-h-11 flex-col items-center justify-start rounded-xl border px-1 pb-1 pt-2 transition-colors touch-manipulation sm:min-h-[64px] lg:min-h-[84px] lg:items-stretch',
                    isSelected
                      ? 'border-elec-yellow bg-white/[0.05]'
                      : isToday
                        ? 'border-white/[0.4]'
                        : 'border-white/[0.05] hover:bg-white/[0.05]'
                  )}
                >
                  <span
                    className={cn(
                      'text-center text-[13px] tabular-nums lg:px-1 lg:text-left',
                      isSelected ? 'font-bold text-elec-yellow' : isToday ? 'font-bold text-white' : 'font-medium text-white'
                    )}
                  >
                    {day}
                  </span>
                  {list.length > 0 && (
                    <>
                      <span className="mt-1 flex justify-center gap-0.5 lg:hidden" aria-hidden>
                        {list.slice(0, 3).map((x) => (
                          <span key={x.key} className={cn('h-1.5 w-1.5 rounded-full', x.key_date ? 'bg-elec-yellow' : 'bg-white')} />
                        ))}
                      </span>
                      <span className="mt-1 hidden space-y-0.5 lg:block" aria-hidden>
                        {list.slice(0, 2).map((x) => (
                          <span
                            key={x.key}
                            className={cn(
                              'block truncate rounded-md px-1.5 py-0.5 text-left text-[10.5px] font-semibold',
                              x.key_date ? 'bg-elec-yellow text-black' : 'bg-white/[0.12] text-white'
                            )}
                          >
                            {learnerName(x.studentId).split(' ')[0]}
                          </span>
                        ))}
                        {list.length > 2 && <span className="block px-1.5 text-left text-[10.5px] text-white">+{list.length - 2} more</span>}
                      </span>
                      {hasKey && <span className="sr-only">Includes a key date</span>}
                    </>
                  )}
                </button>
              );
            })}
          </div>
        </motion.section>

        {/* The chosen day, the week, other dates */}
        <div className="min-w-0 space-y-6">
          <section className="space-y-3">
            <CollegeSectionTitle
              title={selectedDate === todayStr ? `Today, ${shortDay(selectedDate)}` : longDay(selectedDate)}
              sub={selectedItems.length ? `${selectedItems.length} on this day` : undefined}
              action={
                selectedDate >= todayStr ? (
                  <button type="button" onClick={() => openForm(selectedDate)} className="inline-flex h-11 items-center px-1 text-[13px] font-semibold text-elec-yellow touch-manipulation">
                    Book this day
                  </button>
                ) : undefined
              }
            />
            {selectedItems.length === 0 ? (
              <div className={cn(COLLEGE_CARD, 'py-5')}>
                <p className="text-[14px] font-semibold text-white">Nothing on this day</p>
                <p className="mt-1 text-[13px] text-white">
                  {selectedDate >= todayStr ? 'Book an observation, discussion or review for this day.' : 'Pick another day on the month.'}
                </p>
              </div>
            ) : (
              <ul className={COLLEGE_LIST}>
                {selectedItems.map((a) => (
                  <Row key={a.key} a={a} />
                ))}
              </ul>
            )}
          </section>

          <section className="space-y-3">
            <CollegeSectionTitle title="Next 7 days" sub={scope === 'mine' ? 'Your learners' : 'Everyone at the college'} />
            {isLoading ? (
              <div className="h-[120px] animate-pulse rounded-3xl bg-white/[0.04]" />
            ) : upcoming.length === 0 ? (
              <div className={cn(COLLEGE_CARD, 'py-5')}>
                <p className="text-[14px] font-semibold text-white">Nothing booked this week</p>
                <p className="mt-1 text-[13px] text-white">
                  {scope === 'mine' ? 'Nothing for your learners. Switch to Everyone to see the whole college.' : 'Schedule an assessment and it shows here.'}
                </p>
              </div>
            ) : (
              <ul className={COLLEGE_LIST}>
                {upcoming.map((a) => (
                  <Row key={a.key} a={a} showDate />
                ))}
              </ul>
            )}
          </section>

          {otherDates.length > 0 && (
            <section className="space-y-3">
              <CollegeSectionTitle title="Also due this week" sub="Observations, IQA actions and EPA briefs" />
              <ul className={COLLEGE_LIST}>
                {otherDates.map((w, i) => (
                  <li key={`${w.date}-${i}`}>
                    <button
                      type="button"
                      onClick={() => navigate(w.href)}
                      className="flex min-h-[60px] w-full items-center gap-3 px-5 py-3 text-left transition-colors touch-manipulation hover:bg-white/[0.04] sm:px-6"
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[14.5px] font-semibold text-white">{w.title}</span>
                        <span className="mt-0.5 block text-[12.5px] text-white">{WEEK_KIND[w.kind] ?? 'Date'}</span>
                      </span>
                      <span className="shrink-0 text-[12.5px] font-semibold tabular-nums text-white">{shortDay(w.date)}</span>
                      <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>

      <section className="space-y-3">
        <CollegeSectionTitle title={`${monthWord} by type`} sub="What is on the calendar for the month shown" />
        <div className={cn(COLLEGE_CARD, 'grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]')}>
          {thisMonth.length === 0 ? (
            <p className="text-[13.5px] text-white">Nothing on the calendar in {monthWord}. Book an assessment or move to another month.</p>
          ) : (
            <Bars rows={byType} labelWidth="11rem" />
          )}
          <div className="space-y-2 border-t border-white/[0.06] pt-4 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
            <p className="text-[13px] font-semibold text-white">Gateway and EPA</p>
            <p className="text-[13px] leading-relaxed text-white">
              Gateway and EPA dates come from each learner’s EPA record. Change them on the gateway board.
            </p>
            <button type="button" onClick={() => navigate('/college/epa')} className="inline-flex h-11 items-center gap-1 px-1 text-[13px] font-semibold text-elec-yellow touch-manipulation">
              Open the gateway board <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      <FormSheet
        open={showAddForm}
        onOpenChange={setShowAddForm}
        eyebrow="Assessment calendar"
        title="Schedule an assessment"
        description="It goes on the calendar for everyone at the college."
        width="wide"
        bodyClassName="grid grid-cols-1 gap-x-10 gap-y-5 lg:grid-cols-2"
        footer={
          <button
            type="button"
            onClick={() => void handleAddAssessment()}
            disabled={!newAssessment.studentId || !newAssessment.date || saving}
            className={cn(COLLEGE_BTN_PRIMARY, 'w-full')}
          >
            {saving ? 'Scheduling…' : 'Schedule'}
          </button>
        }
      >
        <div className="space-y-5">
          <div>
            <span className={labelCn}>Learner</span>
            <MobileSelectPicker
              value={newAssessment.studentId}
              onValueChange={(v) => setNewAssessment((p) => ({ ...p, studentId: v }))}
              options={activeStudents.map((s) => ({ value: s.id, label: s.name }))}
              placeholder="Choose a learner"
              title="Learner"
            />
          </div>
          <div>
            <span className={labelCn}>Type</span>
            <div className="flex flex-wrap gap-2">
              {ASSESSMENT_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  aria-pressed={newAssessment.assessmentType === type}
                  onClick={() => setNewAssessment((p) => ({ ...p, assessmentType: type }))}
                  className={cn(chipCn(newAssessment.assessmentType === type), 'h-11')}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="cal-date" className={labelCn}>
                Date
              </label>
              <input
                id="cal-date"
                type="date"
                min={todayStr}
                value={newAssessment.date}
                onChange={(e) => setNewAssessment((p) => ({ ...p, date: e.target.value }))}
                className={cn(inputCn, 'tabular-nums')}
              />
            </div>
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
          </div>
        </div>
        <div className="space-y-5">
          <div>
            <label htmlFor="cal-location" className={labelCn}>
              Where
            </label>
            <input
              id="cal-location"
              type="text"
              placeholder="e.g. Site visit, 42 Oak Lane"
              value={newAssessment.location}
              onChange={(e) => setNewAssessment((p) => ({ ...p, location: e.target.value }))}
              className={inputCn}
            />
          </div>
          <div>
            <label htmlFor="cal-notes" className={labelCn}>
              Notes
            </label>
            <textarea
              id="cal-notes"
              rows={4}
              placeholder="What will be assessed, what to bring"
              value={newAssessment.notes}
              onChange={(e) => setNewAssessment((p) => ({ ...p, notes: e.target.value }))}
              className={textareaCn}
            />
          </div>
        </div>
      </FormSheet>
    </>
  );
}
