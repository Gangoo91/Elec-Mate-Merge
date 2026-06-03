/**
 * LiveLessonSection — in-lesson register + timer + observation notes for tutors.
 *
 * Improvements (2026-05-03):
 *  - Removed `(supabase as any)` casts that were hiding a real bug:
 *    `college_lesson_plans` has no `notes` column. Attendance notes live
 *    on `college_attendance.notes` per row.
 *  - Uses `student.name` (the actual schema field) instead of broken
 *    `first_name + last_name` concatenation.
 *  - Single bulk upsert for attendance instead of N round-trips.
 *  - Added realtime subscription so co-teaching tutors see each other's
 *    attendance edits live without manual refresh.
 *  - Hardened error handling on lesson load.
 */

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import { supabase } from '@/integrations/supabase/client';
import { realtimeChannelName } from '@/lib/realtimeChannel';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';
import {
  PageFrame,
  PageHero,
  StatStrip,
  SectionHeader,
  ListCard,
  Pill,
  EmptyState,
  PrimaryButton,
  SecondaryButton,
  textareaClass,
  itemVariants,
  type Tone,
} from '@/components/college/primitives';

interface LiveLessonSectionProps {
  lessonId?: string;
  onNavigate: (section: CollegeSection) => void;
  onBack: () => void;
}

type AttendanceStatus = 'Present' | 'Absent' | 'Late' | 'Authorised';

interface StudentAttendance {
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

const STATUS_CYCLE: AttendanceStatus[] = ['Present', 'Absent', 'Late', 'Authorised'];
const STATUS_TONE: Record<AttendanceStatus, Tone> = {
  Present: 'green',
  Absent: 'red',
  Late: 'amber',
  Authorised: 'blue',
};

function isoToday(): string {
  return new Date().toISOString().split('T')[0];
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

      const cohortStudents = students.filter(
        (s) => s.cohort_id === resolvedCohortId && s.status === 'Active'
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

  const toggleStatus = (studentId: string) => {
    setAttendance((prev) =>
      prev.map((a) => {
        if (a.studentId !== studentId) return a;
        const currentIdx = STATUS_CYCLE.indexOf(a.status);
        const nextIdx = (currentIdx + 1) % STATUS_CYCLE.length;
        return { ...a, status: STATUS_CYCLE[nextIdx] };
      })
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
        const { error: attErr } = await supabase
          .from('college_attendance')
          .upsert(rows, { onConflict: 'student_id,cohort_id,date' });
        if (attErr) throw attErr;
      }

      if (lessonId) {
        // college_lesson_plans has no `notes` column — only mark delivered
        // and stamp duration. (The previous code wrote to a phantom column
        // and was masked by an `as any` cast.)
        const { error: lessErr } = await supabase
          .from('college_lesson_plans')
          .update({
            status: 'Delivered',
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
  const absentCount = attendance.filter((a) => a.status === 'Absent').length;

  return (
    <PageFrame>
      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow={cohortName}
          title={lessonTitle || 'Live lesson'}
          description="In-lesson register with built-in timer and notes. Co-teaching tutors see each other's edits live."
          tone="yellow"
          actions={
            <SecondaryButton onClick={onBack} size="sm">
              ← Back
            </SecondaryButton>
          }
        />
      </motion.div>

      {loadError && (
        <motion.div variants={itemVariants}>
          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 text-[13px] text-red-300">
            {loadError}
          </div>
        </motion.div>
      )}

      <motion.div variants={itemVariants}>
        <StatStrip
          columns={3}
          stats={[
            {
              value: formatTime(elapsedSeconds),
              label: timerRunning ? 'Running' : 'Timer',
              sub: timerRunning ? 'Tap to pause' : 'Tap to start',
              onClick: () => setTimerRunning(!timerRunning),
              tone: timerRunning ? 'amber' : 'yellow',
            },
            { value: presentCount, label: 'Present', sub: 'In attendance', tone: 'green' },
            {
              value: absentCount,
              label: 'Absent',
              sub: 'No show',
              tone: 'red',
              accent: absentCount > 0,
            },
          ]}
        />
      </motion.div>

      <motion.section variants={itemVariants} className="space-y-5">
        <SectionHeader
          eyebrow="Register"
          title={`${attendance.length} student${attendance.length === 1 ? '' : 's'}`}
        />
        {attendance.length === 0 ? (
          <EmptyState
            title="No students in this cohort"
            description="Add students to the cohort before starting the lesson."
          />
        ) : (
          <ListCard>
            {attendance.map((a) => (
              <button
                key={a.studentId}
                onClick={() => toggleStatus(a.studentId)}
                className="w-full flex items-center gap-3 px-5 sm:px-6 py-4 hover:bg-[hsl(0_0%_15%)] transition-colors text-left touch-manipulation"
              >
                <span className="text-[13.5px] font-medium text-white flex-1 truncate">
                  {a.name}
                </span>
                <Pill tone={STATUS_TONE[a.status]}>{a.status}</Pill>
                <span
                  className="text-white/60 text-[15px] leading-none w-7 text-center"
                  aria-hidden
                >
                  ↻
                </span>
              </button>
            ))}
          </ListCard>
        )}
      </motion.section>

      <motion.section variants={itemVariants} className="space-y-5">
        <SectionHeader eyebrow="Observations" title="Lesson notes" />
        <Textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Key observations, differentiation notes, student engagement…"
          autoCapitalize="sentences"
          autoCorrect="on"
          spellCheck
          className={`${textareaClass} min-h-[120px] max-w-2xl`}
        />
        <p className="text-[11px] text-white/50">
          Notes are saved alongside each student's attendance row for the day.
        </p>
      </motion.section>

      {/* Sticky save bar — pinned bottom on mobile so the tutor never has
          to scroll past the register to commit. Stays inline on desktop. */}
      <motion.div
        variants={itemVariants}
        className="sticky bottom-0 -mx-4 sm:mx-0 px-4 sm:px-0 py-3 sm:py-4 bg-elec-dark/90 backdrop-blur-sm border-t border-white/[0.06] sm:border-0 sm:bg-transparent sm:backdrop-blur-none flex items-center justify-end gap-3 z-10"
      >
        <SecondaryButton onClick={onBack}>Cancel</SecondaryButton>
        <PrimaryButton
          onClick={handleSave}
          disabled={saving || attendance.length === 0 || !cohortId}
        >
          {saving ? 'Saving…' : 'Save & mark delivered →'}
        </PrimaryButton>
      </motion.div>
    </PageFrame>
  );
}
