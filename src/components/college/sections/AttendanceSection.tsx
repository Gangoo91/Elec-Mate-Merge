/**
 * AttendanceSection — registers and the learners slipping below target.
 *
 * College Hub redesign (7 Oct 2026), built from the kit (CollegeUi):
 *
 *   header + "?" → four figures → today's classes (lesson → register)
 *   → below 85% → registers by day (tap a mark to change it)
 *
 * ELE-1887: "Take a register" opens QuickRegisterSheet with the cohort, date
 * and tutor already chosen; one tap marks everyone else present, each learner
 * is one tap, and the last change can be undone.
 * ELE-1890: today's lessons sit at the top with whether their register is
 * done, and open the register for that lesson's cohort directly.
 *
 * Every rate is Present + Late over marked sessions (same rule as the hub KPI
 * and collegeAttendanceService). Learners with no marks have no rate.
 */
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { itemVariants } from '@/components/college/primitives';
import type { PageHelpContent } from '@/components/hub/PageHelp';
import {
  COLLEGE_BTN,
  COLLEGE_BTN_PRIMARY,
  COLLEGE_CARD,
  COLLEGE_LIST,
  CollegeEmpty,
  CollegePageHeader,
  CollegeSectionTitle,
  CollegeStats,
  chipCn,
} from '@/components/college/ui/CollegeUi';
import { TeachingScreen, WorkRows } from '@/components/college/teaching/TeachingKit';
import { QuickRegisterSheet } from '@/components/college/teaching/QuickRegisterSheet';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import { useMyCollegeContext } from '@/hooks/useMyCollegeContext';
import { useToast } from '@/hooks/use-toast';
import { SESSION_LABEL, SESSION_SHORT, asSession, sessionOfTime } from '@/lib/college/attendanceSession';

type Status = 'Present' | 'Late' | 'Absent' | 'Authorised';
const STATUSES: Status[] = ['Present', 'Late', 'Absent', 'Authorised'];

const LOW_ATTENDANCE = 85;
const VERY_LOW_ATTENDANCE = 70;

const HELP: PageHelpContent = {
  id: 'college-attendance',
  title: 'Registers and attendance',
  what: 'Take the register for a class in two taps, fix a mark after the event, and see which learners are below 85% attendance.',
  steps: [
    {
      title: 'Take the register',
      body: 'Tap "Take a register" or the class under Today. Your cohort, today\'s date and your name are already filled in.',
    },
    {
      title: 'Mark the exceptions',
      body: 'Tap "Everyone else here", then tap Late, Absent or Authorised for anyone who is not. Every tap saves. Undo puts the last change back.',
    },
    {
      title: 'Follow up',
      body: 'Learners below 85% are listed with their rate. Tap one to open their record and log the conversation.',
    },
  ],
  notes: [
    { title: 'How the rate works', body: 'Present and Late count as attended. Absent and Authorised do not. A learner with no marks has no rate yet.' },
    { title: 'One mark a session', body: 'A learner has one mark for the morning and one for the afternoon. Taking the same session again updates its marks. Rates count sessions, not days.' },
    { title: 'Changing a mark', body: 'Open a day under Registers and tap a learner to change their mark or add a note.' },
  ],
  legend: [
    { swatch: 'bg-orange-400', label: 'Orange', body: 'absent, or attendance below 85%' },
    { swatch: 'bg-emerald-400', label: 'Green', body: 'register done' },
  ],
};

const SESSION_ORDER = { morning: 0, afternoon: 1, all_day: 2 } as const;

const isoDay = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

function longDate(iso: string): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
}

const markCn = (status: string | null) =>
  cn(
    'inline-flex h-7 shrink-0 items-center rounded-full border px-2.5 text-[11.5px] font-semibold',
    status === 'Absent'
      ? 'border-orange-400 text-orange-400'
      : status === 'Late'
        ? 'border-elec-yellow text-elec-yellow'
        : 'border-white/[0.2] text-white'
  );

export function AttendanceSection() {
  const { attendance, students, cohorts, lessonPlans, updateAttendance, isLoading } = useCollegeSupabase();
  const { staff: me } = useMyCollegeContext();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCohort, setFilterCohort] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<'today' | 'week' | 'month'>('week');
  const [register, setRegister] = useState<{ open: boolean; cohortId?: string | null; title?: string | null; lessonId?: string | null }>({ open: false });
  const [editingRecordId, setEditingRecordId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');
  const [savingId, setSavingId] = useState<string | null>(null);
  const [expandedDays, setExpandedDays] = useState<Set<string>>(new Set());

  const today = isoDay(new Date());
  const studentById = useMemo(() => new Map(students.map((s) => [s.id, s])), [students]);
  const cohortName = (cohortId: string | null | undefined) =>
    !cohortId ? 'Unassigned' : cohorts.find((c) => c.id === cohortId)?.name || 'Unknown';
  const activeCohorts = useMemo(
    () => cohorts.filter((c) => (c.status ?? '').toLowerCase() === 'active'),
    [cohorts]
  );

  /* ── Today's classes: lesson → register (ELE-1890) ─────────────────── */
  const todaysClasses = useMemo(() => {
    // A lesson's register is done when today's marks carry that lesson. Marks
    // taken without a lesson (plain cohort registers) count for the cohort's
    // lessons in the same session (morning / afternoon); an all-day mark from
    // before per-session registers counts for every lesson that day.
    const todays = attendance.filter((a) => a.date === today);
    const byLesson = new Set(todays.map((a) => a.lesson_plan_id).filter(Boolean));
    const cohortNoLesson = new Set(
      todays.filter((a) => !a.lesson_plan_id).map((a) => `${a.cohort_id}|${asSession(a.session)}`)
    );
    return lessonPlans
      .filter((lp) => lp.scheduled_date === today && !!lp.cohort_id)
      .map((lp) => ({
        lesson: lp,
        mine: !!me?.staff_id && lp.tutor_id === me.staff_id,
        done:
          byLesson.has(lp.id) ||
          cohortNoLesson.has(`${lp.cohort_id}|all_day`) ||
          cohortNoLesson.has(`${lp.cohort_id}|${sessionOfTime(lp.scheduled_start_time) ?? 'all_day'}`),
        time: lp.scheduled_start_time?.slice(0, 5) ?? null,
      }))
      .sort((a, b) => Number(b.mine) - Number(a.mine) || (a.time ?? '99').localeCompare(b.time ?? '99'));
  }, [lessonPlans, attendance, today, me]);

  const periodStart = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    // Last 7 days = today and the six days before it.
    if (dateFilter === 'week') d.setDate(d.getDate() - 6);
    if (dateFilter === 'month') d.setMonth(d.getMonth() - 1);
    return isoDay(d);
  }, [dateFilter]);

  const q = searchQuery.trim().toLowerCase();
  const filteredAttendance = useMemo(
    () =>
      attendance.filter((record) => {
        const student = record.student_id ? studentById.get(record.student_id) : undefined;
        const matchesDate = record.date >= periodStart;
        const matchesCohort = filterCohort === 'all' || student?.cohort_id === filterCohort;
        const matchesSearch = !q || (student?.name ?? '').toLowerCase().includes(q);
        return matchesDate && matchesCohort && matchesSearch;
      }),
    [attendance, studentById, periodStart, filterCohort, q]
  );

  const count = (status: Status) => filteredAttendance.filter((a) => a.status === status).length;
  const absentCount = count('Absent');
  const lateCount = count('Late');
  const authorisedCount = count('Authorised');
  /** A register is one cohort's session on one day (morning, afternoon, or an older all-day mark). */
  const registersTaken = useMemo(
    () => new Set(filteredAttendance.map((a) => `${a.cohort_id}|${a.date}|${asSession(a.session)}`)).size,
    [filteredAttendance]
  );

  const lowAttendance = useMemo(() => {
    const by = new Map<string, { n: number; att: number }>();
    for (const a of attendance) {
      if (!a.student_id) continue;
      const x = by.get(a.student_id) ?? { n: 0, att: 0 };
      x.n += 1;
      if (a.status === 'Present' || a.status === 'Late') x.att += 1;
      by.set(a.student_id, x);
    }
    return students
      .filter((s) => (s.status ?? '').toLowerCase() === 'active')
      .map((s) => {
        const x = by.get(s.id);
        return { student: s, rate: x && x.n > 0 ? Math.round((x.att / x.n) * 100) : null };
      })
      .filter((x): x is { student: (typeof students)[number]; rate: number } => x.rate !== null && x.rate < LOW_ATTENDANCE)
      .sort((a, b) => a.rate - b.rate);
  }, [students, attendance]);

  /** Registers, newest day first, one row per learner per session within a day (morning first). */
  const days = useMemo(() => {
    const byDate = new Map<string, typeof filteredAttendance>();
    for (const r of filteredAttendance) {
      const arr = byDate.get(r.date) ?? [];
      arr.push(r);
      byDate.set(r.date, arr);
    }
    return [...byDate.entries()]
      .sort((a, b) => b[0].localeCompare(a[0]))
      .map(([date, rows]) => ({
        date,
        rows: [...rows].sort(
          (a, b) =>
            (studentById.get(a.student_id ?? '')?.name ?? '').localeCompare(studentById.get(b.student_id ?? '')?.name ?? '') ||
            SESSION_ORDER[asSession(a.session)] - SESSION_ORDER[asSession(b.session)]
        ),
        absent: rows.filter((r) => r.status === 'Absent').length,
      }));
  }, [filteredAttendance, studentById]);

  const isDayOpen = (date: string, index: number) =>
    expandedDays.has(date) || (index === 0 && !expandedDays.has(`closed:${date}`));
  const toggleDay = (date: string, index: number) => {
    setExpandedDays((prev) => {
      const next = new Set(prev);
      const open = isDayOpen(date, index);
      if (index === 0) {
        if (open) {
          next.add(`closed:${date}`);
          next.delete(date);
        } else {
          next.delete(`closed:${date}`);
          next.add(date);
        }
      } else if (open) next.delete(date);
      else next.add(date);
      return next;
    });
  };

  const saveStatus = async (recordId: string, status: Status) => {
    setSavingId(recordId);
    try {
      await updateAttendance(recordId, { status });
      toast({ title: 'Mark updated', description: `Set to ${status}` });
    } catch (e) {
      toast({ title: 'Could not update the mark', description: (e as Error).message, variant: 'destructive' });
    } finally {
      setSavingId(null);
    }
  };

  const saveNote = async (recordId: string) => {
    setSavingId(recordId);
    try {
      await updateAttendance(recordId, { notes: noteText.trim() || null });
      toast({ title: 'Note saved' });
      setEditingRecordId(null);
    } catch (e) {
      toast({ title: 'Could not save the note', description: (e as Error).message, variant: 'destructive' });
    } finally {
      setSavingId(null);
    }
  };

  const periodLabel = dateFilter === 'today' ? 'today' : dateFilter === 'week' ? 'in the last 7 days' : 'in the last month';
  const openRegister = (cohortId?: string | null, title?: string | null, lessonId?: string | null) =>
    setRegister({ open: true, cohortId, title, lessonId });

  return (
    <TeachingScreen>
      <CollegePageHeader
        eyebrow="Teaching"
        title="Registers"
        description="Take today's register in two taps, then see who is slipping below 85%."
        help={HELP}
        actions={
          <button type="button" onClick={() => openRegister(filterCohort === 'all' ? null : filterCohort)} className={COLLEGE_BTN_PRIMARY}>
            Take a register
          </button>
        }
      />

      <CollegeStats
        items={[
          {
            label: `Below ${LOW_ATTENDANCE}%`,
            value: String(lowAttendance.length),
            sub: lowAttendance.length > 0 ? `lowest ${lowAttendance[0].rate}%` : 'everyone at target',
            warn: lowAttendance.length > 0,
          },
          { label: 'Absent', value: String(absentCount), sub: `unauthorised ${periodLabel}`, warn: absentCount > 0 },
          {
            label: 'Late',
            value: String(lateCount),
            sub: authorisedCount > 0 ? `${authorisedCount} authorised absence${authorisedCount === 1 ? '' : 's'}` : `late ${periodLabel}`,
          },
          { label: 'Registers', value: String(registersTaken), sub: `${filteredAttendance.length} session marks ${periodLabel}` },
        ]}
      />

      {/* ── Today: lesson → register ─────────────────────────────────── */}
      <section className="space-y-4">
        <CollegeSectionTitle
          title="Today's classes"
          sub={
            todaysClasses.length > 0
              ? `${todaysClasses.filter((c) => c.done).length} of ${todaysClasses.length} registers done`
              : undefined
          }
        />
        {todaysClasses.length === 0 ? (
          <CollegeEmpty
            title="No lessons on the timetable today"
            body="You can still take a register for any cohort. Give a lesson plan today's date and it shows here with its register."
            action={
              <button type="button" className={COLLEGE_BTN} onClick={() => openRegister(null)}>
                Take a register
              </button>
            }
          />
        ) : (
          <motion.ul variants={itemVariants} className={COLLEGE_LIST}>
            {todaysClasses.map(({ lesson, mine, done, time }) => (
              <li key={lesson.id} className="flex min-h-[64px] flex-col gap-3 px-5 py-3 sm:flex-row sm:items-center sm:px-6">
                <button
                  type="button"
                  onClick={() => navigate(`/college/lessons/${lesson.id}`)}
                  className="flex min-w-0 flex-1 items-center gap-3 text-left touch-manipulation"
                >
                  <span className="w-12 shrink-0 text-[13px] font-semibold tabular-nums text-white">{time ?? 'TBC'}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[14.5px] font-semibold text-white">{lesson.title}</span>
                    <span className="mt-0.5 block truncate text-[12.5px] text-white">
                      {cohortName(lesson.cohort_id)}
                      {mine ? ' · your class' : ''}
                    </span>
                  </span>
                </button>
                <div className="flex shrink-0 items-center gap-3 pl-[60px] sm:pl-0">
                  <span className={cn('text-[12.5px] font-semibold', done ? 'text-emerald-400' : 'text-white')}>
                    {done ? 'Register done' : 'Not taken'}
                  </span>
                  <button
                    type="button"
                    onClick={() => openRegister(lesson.cohort_id, lesson.title, lesson.id)}
                    className={done ? COLLEGE_BTN : COLLEGE_BTN_PRIMARY}
                  >
                    {done ? 'Open register' : 'Take register'}
                  </button>
                </div>
              </li>
            ))}
          </motion.ul>
        )}
      </section>

      {/* ── Below target ─────────────────────────────────────────────── */}
      {lowAttendance.length > 0 && (
        <section className="space-y-4">
          <CollegeSectionTitle
            title={`Below ${LOW_ATTENDANCE}% attendance`}
            sub={`${lowAttendance.length} learner${lowAttendance.length === 1 ? '' : 's'}, lowest first. Present and Late count as attended.`}
          />
          <WorkRows
            rows={lowAttendance.map(({ student, rate }) => ({
              id: `low-${student.id}`,
              title: student.name,
              sub: `${cohortName(student.cohort_id)} · attended ${rate}% of marked sessions`,
              trailing: <span className={cn('text-[15px] font-bold tabular-nums', rate < VERY_LOW_ATTENDANCE ? 'text-orange-400' : 'text-white')}>{rate}%</span>,
              warn: rate < VERY_LOW_ATTENDANCE,
              onClick: () => navigate(`/college?section=student360&studentId=${encodeURIComponent(student.id)}`),
            }))}
          />
        </section>
      )}

      {/* ── Registers by day ─────────────────────────────────────────── */}
      <section className="space-y-4">
        <CollegeSectionTitle title="Registers" sub="Open a day and tap a learner to change their mark or add a note." />

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] lg:items-center">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by learner"
            aria-label="Search learners"
            className="h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-[15px] text-white placeholder:text-white/40 caret-elec-yellow focus:border-elec-yellow focus:outline-none touch-manipulation"
          />
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0 lg:justify-end">
            {(
              [
                ['today', 'Today'],
                ['week', 'Last 7 days'],
                ['month', 'Last month'],
              ] as const
            ).map(([value, label]) => (
              <button key={value} type="button" onClick={() => setDateFilter(value)} className={chipCn(dateFilter === value)}>
                {label}
              </button>
            ))}
          </div>
        </div>
        {activeCohorts.length > 1 && (
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
            <button type="button" onClick={() => setFilterCohort('all')} className={chipCn(filterCohort === 'all')}>
              All cohorts
            </button>
            {activeCohorts.map((cohort) => (
              <button key={cohort.id} type="button" onClick={() => setFilterCohort(cohort.id)} className={chipCn(filterCohort === cohort.id)}>
                {cohort.name}
              </button>
            ))}
          </div>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-elec-yellow border-t-transparent" />
          </div>
        ) : days.length === 0 ? (
          <CollegeEmpty
            title={attendance.length === 0 ? 'No registers taken yet' : `No registers ${periodLabel}`}
            body={
              attendance.length === 0
                ? 'Take one to start the record. It takes two taps.'
                : q || filterCohort !== 'all'
                  ? 'Nothing matches these filters. Clear the search or pick All cohorts.'
                  : 'Try a longer period, or take today\'s register.'
            }
            action={
              <button type="button" className={COLLEGE_BTN} onClick={() => openRegister(filterCohort === 'all' ? null : filterCohort)}>
                Take a register
              </button>
            }
          />
        ) : (
          <div className="space-y-3">
            {days.map((day, index) => {
              const open = isDayOpen(day.date, index);
              return (
                <motion.div key={day.date} variants={itemVariants} className={cn(COLLEGE_CARD, 'p-0 sm:p-0')}>
                  <button
                    type="button"
                    onClick={() => toggleDay(day.date, index)}
                    aria-expanded={open}
                    className="flex min-h-[56px] w-full items-center gap-3 px-5 text-left touch-manipulation hover:bg-white/[0.04] sm:px-6"
                  >
                    <span className="min-w-0 flex-1 truncate text-[15px] font-semibold text-white">
                      {day.date === today ? 'Today' : longDate(day.date)}
                    </span>
                    <span className={cn('shrink-0 text-[12.5px] font-semibold tabular-nums', day.absent > 0 ? 'text-orange-400' : 'text-white')}>
                      {day.absent > 0 ? `${day.absent} absent · ${day.rows.length} marked` : `${day.rows.length} marked`}
                    </span>
                    <ChevronDown className={cn('h-4 w-4 shrink-0 text-white transition-transform', open && 'rotate-180')} aria-hidden />
                  </button>

                  {open && (
                    <ul className="grid grid-cols-1 border-t border-white/[0.06] lg:grid-cols-2">
                      {day.rows.map((record) => {
                        const student = record.student_id ? studentById.get(record.student_id) : undefined;
                        const editing = editingRecordId === record.id;
                        return (
                          <li key={record.id} className={cn('border-b border-white/[0.06] lg:odd:border-r', editing && 'lg:col-span-2')}>
                            <button
                              type="button"
                              onClick={() => {
                                if (editing) setEditingRecordId(null);
                                else {
                                  setEditingRecordId(record.id);
                                  setNoteText(record.notes ?? '');
                                }
                              }}
                              aria-expanded={editing}
                              className="flex min-h-[60px] w-full items-center gap-3 px-5 py-3 text-left transition-colors touch-manipulation hover:bg-white/[0.04] sm:px-6"
                            >
                              <span className="min-w-0 flex-1">
                                <span className="block truncate text-[14.5px] font-semibold leading-tight text-white">
                                  {student?.name ?? 'Unknown learner'}
                                </span>
                                <span className="mt-1 block truncate text-[12.5px] leading-tight text-white">
                                  {[cohortName(student?.cohort_id), record.notes ? `Note: ${record.notes}` : null].filter(Boolean).join(' · ')}
                                </span>
                              </span>
                              <span
                                className="shrink-0 text-[11.5px] font-semibold tabular-nums text-white"
                                title={SESSION_LABEL[asSession(record.session)]}
                              >
                                {SESSION_SHORT[asSession(record.session)]}
                              </span>
                              <span className={markCn(record.status)}>{record.status ?? 'Not marked'}</span>
                              <ChevronRight className={cn('h-4 w-4 shrink-0 text-white transition-transform', editing && 'rotate-90')} aria-hidden />
                            </button>

                            {editing && (
                              <div className="grid grid-cols-1 gap-3 px-5 pb-4 sm:px-6 lg:grid-cols-2">
                                <div className="grid grid-cols-4 gap-2">
                                  {STATUSES.map((s) => (
                                    <button
                                      key={s}
                                      type="button"
                                      disabled={savingId === record.id}
                                      onClick={() => saveStatus(record.id, s)}
                                      aria-label={s}
                                      className={chipCn(record.status === s) + ' h-11 min-w-0 justify-center px-2'}
                                    >
                                      <span className="sm:hidden" aria-hidden>
                                        {s === 'Authorised' ? 'Au' : s.charAt(0)}
                                      </span>
                                      <span className="hidden sm:inline">{s}</span>
                                    </button>
                                  ))}
                                </div>
                                <div className="flex items-end gap-3">
                                  <input
                                    type="text"
                                    value={noteText}
                                    onChange={(e) => setNoteText(e.target.value)}
                                    placeholder="Add a note"
                                    aria-label="Note"
                                    className="h-11 min-w-0 flex-1 rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-[15px] text-white placeholder:text-white/40 caret-elec-yellow focus:border-elec-yellow focus:outline-none"
                                  />
                                  <button
                                    type="button"
                                    disabled={savingId === record.id}
                                    onClick={() => saveNote(record.id)}
                                    className={COLLEGE_BTN}
                                  >
                                    {savingId === record.id ? 'Saving…' : 'Save note'}
                                  </button>
                                </div>
                              </div>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      <QuickRegisterSheet
        open={register.open}
        onOpenChange={(o) => setRegister((r) => ({ ...r, open: o }))}
        cohortId={register.cohortId}
        lessonTitle={register.title}
        lessonPlanId={register.lessonId}
      />
    </TeachingScreen>
  );
}
