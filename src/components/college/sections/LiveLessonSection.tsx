/**
 * LiveLessonSection — in-lesson register + timer + observation notes for tutors.
 *
 * Renders CONTENT ONLY under the CollegeDashboard masthead: KPI row (timer,
 * present, absent) → register rows → notes → one solid volt "Save & mark
 * delivered".
 *
 * Two saves were silently broken and are fixed here:
 *  - `college_attendance`'s unique index is (student_id, date). The upsert
 *    named `student_id,cohort_id,date` as its conflict target, which
 *    PostgREST rejects outright — the register never saved.
 *  - `college_lesson_plans.status` is CHECK-constrained to lowercase values;
 *    'Delivered' was rejected. It is 'delivered' now.
 *
 * Earlier fixes kept: no `notes` column on college_lesson_plans (notes go on
 * each attendance row), `student.name` is the schema field, one bulk upsert,
 * realtime so co-teaching tutors see each other's edits.
 */

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import { supabase } from '@/integrations/supabase/client';
import { realtimeChannelName } from '@/lib/realtimeChannel';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { containerVariants, itemVariants, EmptyState } from '@/components/college/primitives';
import { HubKpi, HubKpiRow, HubSectionHeading } from '@/components/hub/HubPrimitives';

interface LiveLessonSectionProps {
  lessonId?: string;
  onNavigate: (section: CollegeSection) => void;
  onBack: () => void;
}

type AttendanceStatus = 'Present' | 'Absent' | 'Late' | 'Authorised';

interface StudentAttendance {
  /** college_students.id — the id space college_attendance.student_id uses. */
  studentId: string;
  name: string;
  status: AttendanceStatus;
}

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${m}:${String(s).padStart(2, '0')}`;
}

// Segmented register control — one tap sets the status directly (no cycle).
// Colour only where it encodes real state: absent is red. Present and
// authorised are solid white; late is volt text.
const REGISTER_OPTIONS: { status: AttendanceStatus; short: string; active: string }[] = [
  { status: 'Present', short: 'P', active: 'border-white bg-white text-black' },
  { status: 'Late', short: 'L', active: 'border-elec-yellow text-elec-yellow' },
  { status: 'Absent', short: 'A', active: 'border-red-400 text-red-300' },
  { status: 'Authorised', short: 'Au', active: 'border-white bg-white text-black' },
];

const PRIMARY =
  'inline-flex h-11 w-full items-center justify-center rounded-full bg-elec-yellow px-5 text-[13px] font-semibold text-black transition-[filter,transform] touch-manipulation hover:brightness-105 active:scale-[0.98] disabled:bg-white/[0.08] disabled:text-white disabled:opacity-60 sm:w-auto';
const SECONDARY =
  'inline-flex h-11 w-full items-center justify-center rounded-full border border-white/[0.14] px-5 text-[13px] font-medium text-white transition-colors touch-manipulation hover:bg-white/[0.06] active:scale-[0.98] sm:w-auto';
const LIST_CARD = cn(
  '-mx-4 overflow-hidden border-y border-elec-yellow/35 sm:mx-0 sm:rounded-2xl sm:border-x',
  CARD_SURFACE
);
const TEXTAREA =
  'min-h-[120px] w-full resize-none rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 py-2 text-base font-medium leading-relaxed text-white placeholder:text-white placeholder:opacity-40 caret-elec-yellow transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus:ring-0 focus:outline-none touch-manipulation';

function isoToday(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function LiveLessonSection({ lessonId, onBack }: LiveLessonSectionProps) {
  const { students } = useCollegeSupabase();
  const { user } = useAuth();

  const [lessonTitle, setLessonTitle] = useState('');
  const [cohortName, setCohortName] = useState('');
  const [cohortId, setCohortId] = useState('');
  const [loadError, setLoadError] = useState<string | null>(null);

  const [timerRunning, setTimerRunning] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [attendance, setAttendance] = useState<StudentAttendance[]>([]);
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);

  const today = useMemo(() => isoToday(), []);

  // Load the lesson plan + seed attendance from the cohort's active students.
  useEffect(() => {
    if (!lessonId) return;
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from('college_lesson_plans')
        .select('id, title, cohort_id, college_cohorts(id, name)')
        .eq('id', lessonId)
        .maybeSingle();

      if (cancelled) return;
      if (error) {
        console.error('Load lesson failed:', error);
        setLoadError(error.message);
        return;
      }
      if (!data) {
        setLoadError('Lesson not found');
        return;
      }

      const cohort = data.college_cohorts as { id?: string; name?: string } | null;
      const resolvedCohortId = data.cohort_id ?? cohort?.id ?? '';
      setLessonTitle(data.title);
      setCohortName(cohort?.name ?? 'Unknown cohort');
      setCohortId(resolvedCohortId);

      // college_students.status is Capitalised ('Active') in the DB — compare
      // case-insensitively rather than trusting the casing.
      const cohortStudents = students.filter(
        (s) => s.cohort_id === resolvedCohortId && (s.status ?? '').toLowerCase() === 'active'
      );
      setAttendance(
        cohortStudents.map((s) => ({
          studentId: s.id,
          name: s.name,
          status: 'Present' as AttendanceStatus,
        }))
      );
    })();
    return () => {
      cancelled = true;
    };
  }, [lessonId, students]);

  // Realtime: any other tutor (or this same tutor on another tab) editing
  // attendance for this cohort + date should sync into the UI.
  useEffect(() => {
    if (!cohortId) return;
    const channel = supabase
      .channel(realtimeChannelName(`live-lesson-attendance:${cohortId}:${today}`))
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'college_attendance',
          filter: `cohort_id=eq.${cohortId}`,
        },
        (payload) => {
          const row = (payload.new ?? payload.old) as
            | {
                student_id?: string;
                date?: string;
                status?: AttendanceStatus;
              }
            | null;
          if (!row || row.date !== today || !row.student_id || !row.status) return;
          setAttendance((prev) =>
            prev.map((a) =>
              a.studentId === row.student_id ? { ...a, status: row.status as AttendanceStatus } : a
            )
          );
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [cohortId, today]);

  // Lesson timer.
  useEffect(() => {
    if (timerRunning) {
      timerRef.current = setInterval(() => setElapsedSeconds((s) => s + 1), 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [timerRunning]);

  // One tap = one decision. Explicit P/L/A/Au segments beat a blind cycle when
  // a tutor is marking a register standing in front of the class.
  const setStatus = (studentId: string, status: AttendanceStatus) => {
    setAttendance((prev) =>
      prev.map((a) => (a.studentId === studentId ? { ...a, status } : a))
    );
  };

  const handleSave = async () => {
    if (!cohortId) {
      toast.error('Lesson has no cohort — cannot record attendance');
      return;
    }
    setSaving(true);
    try {
      // Single bulk upsert — far fewer round-trips than per-student inserts
      // and atomic from the user's POV.
      const rows = attendance.map((a) => ({
        student_id: a.studentId,
        cohort_id: cohortId,
        date: today,
        status: a.status,
        notes: notes || null,
        recorded_by: user?.id ?? null,
      }));

      if (rows.length > 0) {
        // The unique index is college_attendance_unique_per_day (student_id,
        // date). Naming cohort_id in the conflict target made PostgREST
        // reject the whole request.
        const { error: attErr } = await supabase
          .from('college_attendance')
          .upsert(rows, { onConflict: 'student_id,date' });
        if (attErr) throw attErr;
      }

      if (lessonId) {
        // college_lesson_plans has no `notes` column — only mark delivered
        // and stamp duration. Lowercase: the CHECK constraint allows only
        // draft/ready/published/delivered/archived.
        const { error: lessErr } = await supabase
          .from('college_lesson_plans')
          .update({
            status: 'delivered',
            duration_minutes: Math.floor(elapsedSeconds / 60) || null,
          })
          .eq('id', lessonId);
        if (lessErr) throw lessErr;
      }

      toast.success('Lesson saved — attendance recorded');
      setTimerRunning(false);
    } catch (err) {
      console.error('Save lesson failed:', err);
      toast.error((err as Error).message ?? 'Failed to save lesson');
    } finally {
      setSaving(false);
    }
  };

  const presentCount = attendance.filter(
    (a) => a.status === 'Present' || a.status === 'Late'
  ).length;
  const lateCount = attendance.filter((a) => a.status === 'Late').length;
  const absentCount = attendance.filter((a) => a.status === 'Absent').length;

  if (!lessonId) {
    return (
      <motion.div variants={itemVariants} initial="hidden" animate="visible">
        <EmptyState
          title="No lesson selected"
          description="Open a lesson from the timetable or a lesson plan to take its register."
          action="Back"
          onAction={onBack}
        />
      </motion.div>
    );
  }

  return (
    <>
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        <motion.div variants={itemVariants}>
          <h2 className="text-[17px] font-semibold leading-snug tracking-tight text-white sm:text-[19px]">
            {lessonTitle || 'Live lesson'}
          </h2>
          <p className="mt-1 text-[12.5px] leading-relaxed text-white">
            {[cohortName, 'Co-teaching tutors see each other’s edits live'].filter(Boolean).join(' · ')}
          </p>
        </motion.div>

        {loadError && (
          <motion.div
            variants={itemVariants}
            className="rounded-2xl border border-red-400/40 px-4 py-3 text-[13px] font-medium text-red-300"
          >
            {loadError}
          </motion.div>
        )}

        <HubKpiRow>
          <HubKpi
            accent
            label="Timer"
            value={formatTime(elapsedSeconds)}
            verdict={timerRunning ? 'Running — tap to pause' : 'Tap to start'}
            onClick={() => setTimerRunning(!timerRunning)}
          />
          <HubKpi
            label="Present"
            value={String(presentCount)}
            verdict={
              attendance.length > 0 ? `of ${attendance.length} on the register` : 'No register'
            }
            context={lateCount > 0 ? `${lateCount} late` : undefined}
          />
          <HubKpi
            label="Absent"
            value={String(absentCount)}
            sentiment={absentCount > 0 ? 'bad' : 'neutral'}
            verdict={absentCount > 0 ? 'Follow up after the lesson' : 'Everyone accounted for'}
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
          <HubSectionHeading>Register</HubSectionHeading>
          <span className="text-[11px] font-semibold tabular-nums text-white">
            {attendance.length} learner{attendance.length === 1 ? '' : 's'}
          </span>
        </motion.div>
        <motion.div variants={itemVariants} className={LIST_CARD}>
          {attendance.length === 0 ? (
            <p className="px-4 py-5 text-[12.5px] text-white sm:px-5">
              No active learners in this cohort — add learners to the cohort before taking a
              register.
            </p>
          ) : (
            <ul className="divide-y divide-white/[0.10]">
              {attendance.map((a) => (
                <li key={a.studentId} className="flex items-center gap-3 px-4 py-2.5 sm:px-5">
                  <span
                    aria-hidden="true"
                    className={cn(
                      'h-8 w-[3px] shrink-0 rounded-full',
                      a.status === 'Absent' ? 'bg-red-400' : 'bg-white/[0.25]'
                    )}
                  />
                  <span className="min-w-0 flex-1 truncate text-[14px] font-semibold text-white">
                    {a.name}
                  </span>
                  <div className="flex shrink-0 gap-1" role="group" aria-label={`Status for ${a.name}`}>
                    {REGISTER_OPTIONS.map((opt) => {
                      const active = a.status === opt.status;
                      return (
                        <button
                          key={opt.status}
                          type="button"
                          onClick={() => setStatus(a.studentId, opt.status)}
                          aria-pressed={active}
                          aria-label={`${a.name}: ${opt.status}`}
                          className={cn(
                            'h-11 min-w-11 rounded-full border px-2 text-[12.5px] font-semibold transition-colors touch-manipulation',
                            active
                              ? opt.active
                              : 'border-white/[0.14] text-white hover:bg-white/[0.06] active:bg-white/[0.09]'
                          )}
                        >
                          {opt.short}
                        </button>
                      );
                    })}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </motion.div>
      </motion.section>

      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        <HubSectionHeading>Lesson notes</HubSectionHeading>
        <motion.div variants={itemVariants} className="max-w-2xl">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Key observations, differentiation, engagement"
            autoCapitalize="sentences"
            autoCorrect="on"
            spellCheck
            aria-label="Lesson notes"
            className={TEXTAREA}
          />
          <p className="mt-2 text-[11.5px] leading-snug text-white">
            Saved against each learner’s attendance row for today.
          </p>
        </motion.div>
      </motion.section>

      {/* Sticky save bar — pinned bottom on mobile so the tutor never has
          to scroll past the register to commit. Stays inline on desktop. */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="sticky bottom-0 z-10 -mx-4 flex flex-col-reverse gap-2 border-t border-white/[0.10] bg-elec-dark/90 px-4 py-3 backdrop-blur-sm sm:mx-0 sm:flex-row sm:justify-end sm:gap-3 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 sm:backdrop-blur-none"
        style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
      >
        <button type="button" onClick={onBack} className={SECONDARY}>
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSave}
          disabled={saving || attendance.length === 0 || !cohortId}
          className={PRIMARY}
        >
          {saving ? 'Saving…' : 'Save & mark delivered'}
        </button>
      </motion.div>
    </>
  );
}
