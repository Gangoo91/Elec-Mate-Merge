/**
 * AttendanceSection — registers and the learners slipping below target.
 *
 * Rebuilt on the shared hub language. CollegeDashboard draws the masthead;
 * this is content only:
 *
 *   KPI row → below 85% (needs you) → take a register → filters → registers
 *
 * What went: the PageHero, the five-cell colour-toned StatStrip, the
 * `bg-[hsl(0_0%_12%)]` panels and the green/blue/amber pills. Attendance IS
 * red-amber-green data, so the encoding stays but in the product's own
 * palette: Present and Authorised are quiet white, Late is volt text, an
 * unexplained absence is the one genuine problem here and keeps red.
 *
 * A register is now one row per learner with the status as a chip, grouped by
 * date, instead of a flat run of every mark in the period. Tap a row to
 * change the mark or add a note in place.
 *
 * One figure corrected. The old "rate" counted Authorised absences as
 * attended, so it disagreed with the Assessment hub's Attendance KPI, the
 * per-learner rate on this same page and collegeAttendanceService, all of
 * which count Present + Late. It is gone; every rate here is Present + Late.
 * Learners with no marks are no longer reported as "100%" — they have no rate.
 */
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { containerVariants, itemVariants } from '@/components/college/primitives';
import {
  HubKpi,
  HubKpiRow,
  HubSectionHeading,
  HubWorkList,
  type HubWorkItem,
} from '@/components/hub/HubPrimitives';
import { TakeAttendanceDialog } from '@/components/college/dialogs/TakeAttendanceDialog';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import { useToast } from '@/hooks/use-toast';

type Status = 'Present' | 'Late' | 'Absent' | 'Authorised';
const STATUSES: Status[] = ['Present', 'Late', 'Absent', 'Authorised'];

/** Present + Late = attended. Same rule as the hub KPI and the service. */
const LOW_ATTENDANCE = 85;
const VERY_LOW_ATTENDANCE = 70;

const chipCn = (active: boolean) =>
  cn(
    'inline-flex h-11 shrink-0 items-center whitespace-nowrap rounded-full border px-3.5 text-[12.5px] font-medium transition-colors touch-manipulation',
    active
      ? 'border-elec-yellow text-elec-yellow'
      : 'border-white/[0.12] text-white hover:bg-white/[0.06]'
  );

/** Read-only mark on a register row. */
const markChipCn = (status: string | null) =>
  cn(
    'inline-flex h-6 shrink-0 items-center rounded-full border px-2 text-[11px] font-medium',
    status === 'Absent'
      ? 'border-red-400/40 text-red-300'
      : status === 'Late'
        ? 'border-elec-yellow/40 text-elec-yellow'
        : 'border-white/[0.15] text-white'
  );

/** Selectable mark inside the inline editor — 44px, same colour rule. */
const markButtonCn = (status: Status, selected: boolean) =>
  cn(
    'inline-flex h-11 flex-1 items-center justify-center rounded-full border px-3 text-[12.5px] font-semibold transition-colors touch-manipulation',
    selected
      ? status === 'Absent'
        ? 'border-red-400 text-red-300'
        : status === 'Late'
          ? 'border-elec-yellow text-elec-yellow'
          : 'border-white text-white'
      : 'border-white/[0.12] text-white hover:bg-white/[0.06]'
  );

function longDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
}

export function AttendanceSection() {
  const { attendance, students, cohorts, updateAttendance, isLoading } = useCollegeSupabase();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCohort, setFilterCohort] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<'today' | 'week' | 'month'>('week');
  const [takeAttendanceOpen, setTakeAttendanceOpen] = useState(false);
  const [editingRecordId, setEditingRecordId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');
  const [savingId, setSavingId] = useState<string | null>(null);
  const [expandedDays, setExpandedDays] = useState<Set<string>>(new Set());

  const studentById = useMemo(() => new Map(students.map((s) => [s.id, s])), [students]);
  const cohortName = (cohortId: string | null | undefined) =>
    !cohortId ? 'Unassigned' : cohorts.find((c) => c.id === cohortId)?.name || 'Unknown';
  const activeCohorts = useMemo(
    () => cohorts.filter((c) => (c.status ?? '').toLowerCase() === 'active'),
    [cohorts]
  );

  const periodStart = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    if (dateFilter === 'week') d.setDate(d.getDate() - 7);
    if (dateFilter === 'month') d.setMonth(d.getMonth() - 1);
    return d;
  }, [dateFilter]);

  const q = searchQuery.trim().toLowerCase();
  const filteredAttendance = useMemo(
    () =>
      attendance.filter((record) => {
        const student = record.student_id ? studentById.get(record.student_id) : undefined;
        const matchesDate = new Date(record.date) >= periodStart;
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
  const sessionDays = useMemo(
    () => new Set(filteredAttendance.map((a) => a.date)).size,
    [filteredAttendance]
  );

  /** null when the learner has no marks — never a made-up 100%. */
  const rateFor = (studentId: string): number | null => {
    const records = attendance.filter((a) => a.student_id === studentId);
    if (records.length === 0) return null;
    const attended = records.filter((a) => a.status === 'Present' || a.status === 'Late').length;
    return Math.round((attended / records.length) * 100);
  };

  const lowAttendance = useMemo(
    () =>
      students
        .filter((s) => (s.status ?? '').toLowerCase() === 'active')
        .map((s) => ({ student: s, rate: rateFor(s.id) }))
        .filter((x): x is { student: (typeof students)[number]; rate: number } => x.rate !== null)
        .filter((x) => x.rate < LOW_ATTENDANCE)
        .sort((a, b) => a.rate - b.rate),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [students, attendance]
  );

  const lowAttendanceItems: HubWorkItem[] = lowAttendance.map(({ student, rate }) => ({
    id: `low-${student.id}`,
    title: student.name,
    reason: `${cohortName(student.cohort_id)} · attended ${rate}% of marked sessions`,
    trailing: `${rate}%`,
    urgent: rate < VERY_LOW_ATTENDANCE,
    onClick: () =>
      navigate(`/college?section=student360&studentId=${encodeURIComponent(student.id)}`),
  }));

  /** Registers, newest day first, one row per learner within a day. */
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
        rows: rows.sort((a, b) =>
          (studentById.get(a.student_id ?? '')?.name ?? '').localeCompare(
            studentById.get(b.student_id ?? '')?.name ?? ''
          )
        ),
        absent: rows.filter((r) => r.status === 'Absent').length,
      }));
  }, [filteredAttendance, studentById]);

  // Only the most recent day opens by default. A month of registers opened
  // flat swallowed everything below it on a phone.
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
      toast({
        title: 'Could not update the mark',
        description: (e as Error).message,
        variant: 'destructive',
      });
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
      toast({
        title: 'Could not save the note',
        description: (e as Error).message,
        variant: 'destructive',
      });
    } finally {
      setSavingId(null);
    }
  };

  const periodLabel =
    dateFilter === 'today' ? 'today' : dateFilter === 'week' ? 'in the last 7 days' : 'in the last month';

  return (
    <>
      {/* The hub's Attendance KPI is the 30-day rate. This row is what is
          behind it: who is below target, and what the marks in the selected
          period actually were. */}
      <HubKpiRow>
        <HubKpi
          accent
          label={`Below ${LOW_ATTENDANCE}%`}
          value={String(lowAttendance.length)}
          verdict={
            lowAttendance.length > 0
              ? lowAttendance[0].rate < VERY_LOW_ATTENDANCE
                ? `Lowest is ${lowAttendance[0].rate}% — talk to them this week`
                : 'Worth a conversation this week'
              : 'Everyone with marks is at or above target'
          }
          context="Present + Late, all marked sessions"
          sentiment={lowAttendance.length > 0 ? 'bad' : 'neutral'}
        />
        <HubKpi
          label="Absent"
          value={String(absentCount)}
          verdict={
            absentCount > 0 ? `Unauthorised absences ${periodLabel}` : `No unauthorised absences ${periodLabel}`
          }
          sentiment={absentCount > 0 ? 'bad' : 'neutral'}
        />
        <HubKpi
          label="Late"
          value={String(lateCount)}
          verdict={lateCount > 0 ? `Late arrivals ${periodLabel}` : `Nobody late ${periodLabel}`}
          context={authorisedCount > 0 ? `${authorisedCount} authorised absence${authorisedCount === 1 ? '' : 's'}` : undefined}
        />
        <HubKpi
          label="Register days"
          value={String(sessionDays)}
          verdict={
            sessionDays > 0
              ? `${filteredAttendance.length} marks ${periodLabel}`
              : `No registers taken ${periodLabel}`
          }
        />
      </HubKpiRow>

      {/* Renders nothing when nobody is below target. */}
      <HubWorkList label={`Below ${LOW_ATTENDANCE}% attendance`} items={lowAttendanceItems} unit="learner" />

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
          <HubSectionHeading>Registers</HubSectionHeading>
          {/* The one solid volt control on this screen. */}
          <button
            type="button"
            onClick={() => setTakeAttendanceOpen(true)}
            className="inline-flex h-11 w-full items-center justify-center rounded-full bg-elec-yellow px-5 text-[13px] font-semibold text-black transition-colors touch-manipulation hover:bg-elec-yellow/90 sm:w-auto"
          >
            Take a register
          </button>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-3">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by learner"
            aria-label="Search learners"
            className="h-11 w-full border-0 border-b border-white/[0.18] bg-transparent px-0 text-[14px] text-white placeholder:text-white placeholder:opacity-60 focus:border-elec-yellow focus:outline-none"
          />
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
            {(
              [
                ['today', 'Today'],
                ['week', 'Last 7 days'],
                ['month', 'Last month'],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setDateFilter(value)}
                className={chipCn(dateFilter === value)}
              >
                {label}
              </button>
            ))}
          </div>
          {activeCohorts.length > 1 && (
            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
              <button
                type="button"
                onClick={() => setFilterCohort('all')}
                className={chipCn(filterCohort === 'all')}
              >
                All cohorts
              </button>
              {activeCohorts.map((cohort) => (
                <button
                  key={cohort.id}
                  type="button"
                  onClick={() => setFilterCohort(cohort.id)}
                  className={chipCn(filterCohort === cohort.id)}
                >
                  {cohort.name}
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {isLoading ? (
          <motion.div variants={itemVariants} className="flex items-center justify-center py-12">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-elec-yellow border-t-transparent" />
          </motion.div>
        ) : days.length === 0 ? (
          <motion.div
            variants={itemVariants}
            className={cn(
              '-mx-4 border-y border-elec-yellow/35 px-4 py-6 sm:mx-0 sm:rounded-2xl sm:border-x sm:px-5',
              CARD_SURFACE
            )}
          >
            <p className="text-[13px] text-white">
              {attendance.length === 0
                ? 'No registers taken yet — take one to start the record.'
                : `No registers ${periodLabel}${q || filterCohort !== 'all' ? ' match these filters' : ''}.`}
            </p>
          </motion.div>
        ) : (
          days.map((day, index) => {
            const open = isDayOpen(day.date, index);
            return (
              <motion.div
                key={day.date}
                variants={itemVariants}
                className={cn(
                  '-mx-4 overflow-hidden border-y border-elec-yellow/35 sm:mx-0 sm:rounded-2xl sm:border-x',
                  CARD_SURFACE
                )}
              >
                <button
                  type="button"
                  onClick={() => toggleDay(day.date, index)}
                  aria-expanded={open}
                  className="flex h-12 w-full items-center gap-3 px-4 text-left touch-manipulation hover:bg-white/[0.06] sm:px-5"
                >
                  <span className="min-w-0 flex-1 truncate text-[14px] font-semibold text-white">
                    {longDate(day.date)}
                  </span>
                  <span
                    className={cn(
                      'shrink-0 text-[12px] font-semibold tabular-nums',
                      day.absent > 0 ? 'text-red-300' : 'text-white'
                    )}
                  >
                    {day.absent > 0
                      ? `${day.absent} absent · ${day.rows.length} marked`
                      : `${day.rows.length} marked`}
                  </span>
                  <ChevronDown
                    className={cn('h-4 w-4 shrink-0 text-white transition-transform', open && 'rotate-180')}
                    aria-hidden
                  />
                </button>

                {open && (
                  <ul className="divide-y divide-white/[0.10] border-t border-white/[0.10]">
                    {day.rows.map((record) => {
                      const student = record.student_id ? studentById.get(record.student_id) : undefined;
                      const editing = editingRecordId === record.id;
                      return (
                        <li key={record.id}>
                          <button
                            type="button"
                            onClick={() => {
                              if (editing) {
                                setEditingRecordId(null);
                              } else {
                                setEditingRecordId(record.id);
                                setNoteText(record.notes ?? '');
                              }
                            }}
                            aria-expanded={editing}
                            className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.09] sm:px-5"
                          >
                            <span
                              aria-hidden="true"
                              className={cn(
                                'h-8 w-[3px] shrink-0 rounded-full',
                                record.status === 'Absent' ? 'bg-red-400' : 'bg-white/[0.25]'
                              )}
                            />
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-[14px] font-semibold leading-tight text-white">
                                {student?.name ?? 'Unknown learner'}
                              </span>
                              <span className="mt-0.5 block truncate text-[12px] leading-tight text-white">
                                {[cohortName(student?.cohort_id), record.notes ? `Note · ${record.notes}` : null]
                                  .filter(Boolean)
                                  .join(' · ')}
                              </span>
                            </span>
                            <span className={markChipCn(record.status)}>{record.status ?? 'Unmarked'}</span>
                            <ChevronRight
                              className={cn('h-4 w-4 shrink-0 text-white transition-transform', editing && 'rotate-90')}
                              aria-hidden="true"
                            />
                          </button>

                          {editing && (
                            <div className="space-y-3 px-4 pb-4 sm:px-5">
                              <div className="flex gap-2">
                                {STATUSES.map((s) => (
                                  <button
                                    key={s}
                                    type="button"
                                    disabled={savingId === record.id}
                                    onClick={() => saveStatus(record.id, s)}
                                    className={markButtonCn(s, record.status === s)}
                                  >
                                    {s}
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
                                  className="h-11 min-w-0 flex-1 border-0 border-b border-white/[0.18] bg-transparent px-0 text-[14px] text-white placeholder:text-white placeholder:opacity-60 focus:border-elec-yellow focus:outline-none"
                                />
                                <button
                                  type="button"
                                  disabled={savingId === record.id}
                                  onClick={() => saveNote(record.id)}
                                  className="h-11 shrink-0 px-2 text-[12.5px] font-bold text-elec-yellow transition-colors touch-manipulation disabled:opacity-60"
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
          })
        )}
      </motion.section>

      <TakeAttendanceDialog
        open={takeAttendanceOpen}
        onOpenChange={setTakeAttendanceOpen}
        cohortId={filterCohort === 'all' ? undefined : filterCohort}
      />
    </>
  );
}
