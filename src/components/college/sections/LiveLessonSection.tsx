/**
 * LiveLessonSection — in-lesson mode for tutors.
 * Quick attendance, timer, notes, and mark-as-delivered.
 */

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Play,
  Pause,
  Square,
  Users,
  BookOpen,
  Save,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.03 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
};

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${m}:${String(s).padStart(2, '0')}`;
}

const STATUS_CYCLE: AttendanceStatus[] = ['Present', 'Absent', 'Late', 'Authorised'];

const STATUS_STYLES: Record<AttendanceStatus, { bg: string; border: string; color: string; icon: typeof CheckCircle }> = {
  Present: { bg: 'bg-green-500/10', border: 'border-green-500/20', color: 'text-green-400', icon: CheckCircle },
  Absent: { bg: 'bg-red-500/10', border: 'border-red-500/20', color: 'text-red-400', icon: XCircle },
  Late: { bg: 'bg-amber-500/10', border: 'border-amber-500/20', color: 'text-amber-400', icon: AlertTriangle },
  Authorised: { bg: 'bg-blue-500/10', border: 'border-blue-500/20', color: 'text-blue-400', icon: Clock },
};

export function LiveLessonSection({ lessonId, onNavigate, onBack }: LiveLessonSectionProps) {
  const { students, staff } = useCollegeSupabase();

  // Lesson data
  const [lessonTitle, setLessonTitle] = useState('');
  const [cohortName, setCohortName] = useState('');
  const [cohortId, setCohortId] = useState('');

  // Timer
  const [timerRunning, setTimerRunning] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Attendance
  const [attendance, setAttendance] = useState<StudentAttendance[]>([]);

  // Notes
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);

  // Load lesson data
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

        // Load students for this cohort
        const cohortStudents = students.filter(
          (s) => s.cohort_id === (data.cohort_id || data.college_cohorts?.id) && s.status === 'Active'
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

  // Timer effect
  useEffect(() => {
    if (timerRunning) {
      timerRef.current = setInterval(() => setElapsedSeconds((s) => s + 1), 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [timerRunning]);

  // Toggle attendance status
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

  // Save attendance + notes + mark delivered
  const handleSave = async () => {
    setSaving(true);
    try {
      // Save attendance records
      for (const a of attendance) {
        await (supabase as any).from('college_attendance').upsert({
          student_id: a.studentId,
          cohort_id: cohortId,
          date: new Date().toISOString().split('T')[0],
          status: a.status,
        }, { onConflict: 'student_id,cohort_id,date' });
      }

      // Mark lesson as delivered
      if (lessonId) {
        await (supabase as any).from('college_lesson_plans').update({
          status: 'Delivered',
          notes: notes || null,
          duration_minutes: Math.floor(elapsedSeconds / 60) || null,
        }).eq('id', lessonId);
      }

      toast.success('Lesson saved — attendance recorded');
      setTimerRunning(false);
    } catch (err) {
      toast.error('Failed to save lesson');
    }
    setSaving(false);
  };

  const presentCount = attendance.filter((a) => a.status === 'Present' || a.status === 'Late').length;
  const absentCount = attendance.filter((a) => a.status === 'Absent').length;

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
      {/* Lesson Info */}
      <motion.div variants={itemVariants} className="card-surface p-4">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20">
            <BookOpen className="h-5 w-5 text-blue-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-base font-semibold text-white">{lessonTitle || 'Live Lesson'}</h2>
            <p className="text-xs text-white mt-0.5">{cohortName}</p>
          </div>
        </div>
      </motion.div>

      {/* Timer + Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-3 gap-2">
        <button
          onClick={() => setTimerRunning(!timerRunning)}
          className="card-surface p-3 flex flex-col items-center touch-manipulation active:scale-[0.98] transition-all"
        >
          {timerRunning ? <Pause className="h-4 w-4 text-amber-400 mb-1" /> : <Play className="h-4 w-4 text-green-400 mb-1" />}
          <span className="text-lg font-bold text-white font-mono">{formatTime(elapsedSeconds)}</span>
          <span className="text-[10px] text-white uppercase tracking-wider">{timerRunning ? 'Running' : 'Timer'}</span>
        </button>
        <div className="card-surface p-3 flex flex-col items-center">
          <CheckCircle className="h-4 w-4 text-green-400 mb-1" />
          <span className="text-lg font-bold text-green-400">{presentCount}</span>
          <span className="text-[10px] text-white uppercase tracking-wider">Present</span>
        </div>
        <div className="card-surface p-3 flex flex-col items-center">
          <XCircle className="h-4 w-4 text-red-400 mb-1" />
          <span className="text-lg font-bold text-red-400">{absentCount}</span>
          <span className="text-[10px] text-white uppercase tracking-wider">Absent</span>
        </div>
      </motion.div>

      {/* Attendance Register */}
      <motion.section variants={itemVariants} className="space-y-3">
        <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">
          Register ({attendance.length} students)
        </h2>
        <div className="space-y-1.5">
          {attendance.map((a) => {
            const style = STATUS_STYLES[a.status];
            const Icon = style.icon;
            return (
              <button
                key={a.studentId}
                onClick={() => toggleStatus(a.studentId)}
                className="w-full card-surface-interactive p-3 flex items-center gap-3 touch-manipulation active:scale-[0.98] transition-all text-left"
              >
                <div className={cn('p-1.5 rounded-lg', style.bg, style.border)}>
                  <Icon className={cn('h-4 w-4', style.color)} />
                </div>
                <span className="text-sm font-medium text-white flex-1">{a.name}</span>
                <span className={cn('text-xs font-semibold px-2 py-0.5 rounded-full', style.bg, style.border, style.color)}>
                  {a.status}
                </span>
              </button>
            );
          })}
          {attendance.length === 0 && (
            <div className="card-surface p-6 text-center">
              <Users className="h-8 w-8 text-white mx-auto mb-2" />
              <p className="text-xs text-white">No students in this cohort</p>
            </div>
          )}
        </div>
      </motion.section>

      {/* Lesson Notes */}
      <motion.section variants={itemVariants} className="space-y-3">
        <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">Lesson Notes</h2>
        <Textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Key observations, differentiation notes, student engagement..."
          className="min-h-[100px] text-sm touch-manipulation bg-[hsl(0,0%,12%)] border-white/[0.06] text-white placeholder:text-white"
        />
      </motion.section>

      {/* Actions */}
      <motion.div variants={itemVariants} className="space-y-2">
        <Button
          onClick={handleSave}
          disabled={saving || attendance.length === 0}
          className="w-full h-11 touch-manipulation bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold disabled:opacity-40"
        >
          {saving ? 'Saving...' : (
            <>
              <Save className="h-4 w-4 mr-1.5" />
              Save & Mark Delivered
            </>
          )}
        </Button>
        <Button
          variant="outline"
          onClick={onBack}
          className="w-full h-11 touch-manipulation border-white/15 text-white"
        >
          Cancel
        </Button>
      </motion.div>
    </motion.div>
  );
}
