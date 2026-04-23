/**
 * LiveLessonSection — in-lesson mode for tutors.
 * Editorial redesign: typography-led, no icons.
 */

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import { supabase } from '@/integrations/supabase/client';
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
  itemVariants,
  type Tone,
} from '@/components/college/primitives';
import { cn } from '@/lib/utils';

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

export function LiveLessonSection({ lessonId, onBack }: LiveLessonSectionProps) {
  const { students } = useCollegeSupabase();

  const [lessonTitle, setLessonTitle] = useState('');
  const [cohortName, setCohortName] = useState('');
  const [cohortId, setCohortId] = useState('');

  const [timerRunning, setTimerRunning] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [attendance, setAttendance] = useState<StudentAttendance[]>([]);
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!lessonId) return;
    const loadLesson = async () => {
      const { data } = await (supabase as any)
        .from('college_lesson_plans')
        .select('*, college_cohorts(id, name)')
        .eq('id', lessonId)
        .single();

      if (data) {
        setLessonTitle(data.title);
        setCohortName(data.college_cohorts?.name || 'Unknown Cohort');
        setCohortId(data.cohort_id || data.college_cohorts?.id || '');

        const cohortStudents = students.filter(
          (s) =>
            s.cohort_id === (data.cohort_id || data.college_cohorts?.id) && s.status === 'Active'
        );
        setAttendance(
          cohortStudents.map((s) => ({
            studentId: s.id,
            name: `${s.first_name} ${s.last_name}`,
            status: 'Present' as AttendanceStatus,
          }))
        );
      }
    };
    loadLesson();
  }, [lessonId, students]);

  useEffect(() => {
    if (timerRunning) {
      timerRef.current = setInterval(() => setElapsedSeconds((s) => s + 1), 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
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
    setSaving(true);
    try {
      for (const a of attendance) {
        await (supabase as any).from('college_attendance').upsert(
          {
            student_id: a.studentId,
            cohort_id: cohortId,
            date: new Date().toISOString().split('T')[0],
            status: a.status,
          },
          { onConflict: 'student_id,cohort_id,date' }
        );
      }
      if (lessonId) {
        await (supabase as any)
          .from('college_lesson_plans')
          .update({
            status: 'Delivered',
            notes: notes || null,
            duration_minutes: Math.floor(elapsedSeconds / 60) || null,
          })
          .eq('id', lessonId);
      }
      toast.success('Lesson saved — attendance recorded');
      setTimerRunning(false);
    } catch (err) {
      toast.error('Failed to save lesson');
    }
    setSaving(false);
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
          description="In-lesson register with built-in timer and notes."
          tone="yellow"
          actions={
            <button
              onClick={onBack}
              className="text-[12.5px] font-medium text-white/70 hover:text-white transition-colors touch-manipulation whitespace-nowrap"
            >
              ← Back
            </button>
          }
        />
      </motion.div>

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
                <span className="text-white/60 text-[12px]" aria-hidden>
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
          className="min-h-[120px] text-sm touch-manipulation bg-[hsl(0_0%_12%)] border-white/[0.06] text-white placeholder:text-white/65 focus:border-elec-yellow"
        />
      </motion.section>

      <motion.div variants={itemVariants} className="flex items-center justify-end gap-4">
        <button
          onClick={onBack}
          className="text-[12.5px] font-medium text-white/70 hover:text-white transition-colors touch-manipulation"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={saving || attendance.length === 0}
          className={cn(
            'h-11 px-5 bg-elec-yellow text-black rounded-full text-[13px] font-semibold transition-opacity touch-manipulation',
            (saving || attendance.length === 0) && 'opacity-40'
          )}
        >
          {saving ? 'Saving…' : 'Save & mark delivered →'}
        </button>
      </motion.div>
    </PageFrame>
  );
}
