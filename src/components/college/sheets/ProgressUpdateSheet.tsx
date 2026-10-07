import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCollegeStudent, useUpdateCollegeStudent } from '@/hooks/college/useCollegeStudents';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useHapticFeedback } from '@/components/college/ui/HapticFeedback';
import { LoadingState, SuccessCheckmark } from '@/components/college/primitives';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  inputCn,
  labelCn,
  textareaCn,
} from '@/components/forms/fieldStyles';
import { chipCn } from '@/components/college/ui/CollegeUi';
import { cn } from '@/lib/utils';

interface ProgressUpdateSheetProps {
  studentId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RISK_LEVELS: { value: string; label: string }[] = [
  { value: 'none', label: 'None' },
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'critical', label: 'Critical' },
];

function riskTextTone(level?: string | null): string {
  const l = (level || '').toLowerCase();
  if (l === 'critical' || l === 'high') return 'text-red-400';
  if (l === 'medium') return 'text-orange-300';
  if (l === 'low') return 'text-emerald-400';
  return 'text-white';
}

export function ProgressUpdateSheet({ studentId, open, onOpenChange }: ProgressUpdateSheetProps) {
  const { data: student, isLoading } = useCollegeStudent(studentId || '');
  const updateStudentMutation = useUpdateCollegeStudent();
  const { toast } = useToast();
  const { triggerSuccess } = useHapticFeedback();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [newProgress, setNewProgress] = useState('');
  const [newRisk, setNewRisk] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (student) {
      setNewProgress(String(student.progress_percent ?? 0));
      setNewRisk(student.risk_level?.toLowerCase() || 'none');
      setNotes('');
    }
  }, [student]);

  useEffect(() => {
    if (!open) {
      setNewProgress('');
      setNewRisk('');
      setNotes('');
      setShowSuccess(false);
    }
  }, [open]);

  const currentProgress = student?.progress_percent ?? 0;
  const parsedNewProgress = parseInt(newProgress) || 0;
  const progressDelta = parsedNewProgress - currentProgress;

  const handleSubmit = async () => {
    if (!studentId) return;
    setIsSubmitting(true);

    try {
      await updateStudentMutation.mutateAsync({
        id: studentId,
        updates: {
          progress_percent: parsedNewProgress,
          risk_level:
            newRisk === 'none' ? 'Low' : newRisk.charAt(0).toUpperCase() + newRisk.slice(1),
        },
      });

      // The notes used to be thrown away. Keep them on the learner's record
      // as a staff note (visible to tutors), with the change in the title.
      // The author is the tutor's staff row in THIS learner's college — a
      // tutor can hold rows in more than one college.
      let noteProblem: string | null = null;
      if (notes.trim()) {
        const collegeId = student?.college_id ?? null;
        const { data: auth } = await supabase.auth.getUser();
        const { data: staffRows } = collegeId
          ? await supabase
              .from('college_staff')
              .select('id')
              .eq('user_id', auth.user?.id ?? '')
              .eq('college_id', collegeId)
              .is('archived_at', null)
              .limit(1)
          : { data: null };
        const me = ((staffRows ?? []) as { id: string }[])[0] ?? null;
        if (!collegeId || !me) {
          noteProblem = "You don't have a staff record at this learner's college, so the note wasn't saved.";
        } else {
          const { error: noteErr } = await supabase.from('pastoral_notes').insert({
            student_id: studentId,
            college_id: collegeId,
            author_id: me.id,
            kind: 'note',
            visibility: 'tutors',
            title: `Progress update: ${currentProgress}% → ${parsedNewProgress}%`,
            body: notes.trim(),
          } as never);
          if (noteErr) noteProblem = `The note wasn't saved: ${noteErr.message}`;
        }
      }

      setShowSuccess(true);
      triggerSuccess(true);

      // One message: either all saved, or progress saved and the note not.
      if (noteProblem) {
        toast({
          title: 'Progress saved, note not saved',
          description: `${student?.name}'s progress is now ${parsedNewProgress}%. ${noteProblem}`,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Progress updated',
          description: `${student?.name}'s progress updated to ${parsedNewProgress}%.`,
        });
      }

      setTimeout(() => {
        setShowSuccess(false);
        onOpenChange(false);
      }, 700);
    } catch (error) {
      console.error('Failed to update progress:', error);
      toast({
        title: 'Update failed',
        description: 'There was an error updating progress. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!studentId) return null;

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow="Progress update"
      title="Update progress"
      description={isLoading ? 'Loading student…' : `Update progress for ${student?.name}.`}
      bodyClassName={isLoading ? undefined : 'grid grid-cols-1 items-start gap-x-10 gap-y-6 lg:grid-cols-2'}
      footer={
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
            className={buttonSecondaryCn}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={
              isSubmitting ||
              isLoading ||
              newProgress === '' ||
              parsedNewProgress < 0 ||
              parsedNewProgress > 100
            }
            className={buttonPrimaryCn}
          >
            {isSubmitting ? 'Saving…' : 'Save progress'}
          </button>
        </div>
      }
    >
      {isLoading ? (
        <LoadingState />
      ) : (
        <>
          <div className="min-w-0 space-y-6">
            <section className="space-y-3">
              <h3 className="border-b border-white/[0.08] pb-2 text-[15px] font-semibold text-white">
                Where they are now
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-[14px] text-white">Overall completion</span>
                <span className="text-[22px] font-semibold tabular-nums text-white">{currentProgress}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                <motion.div
                  className="h-full rounded-full bg-elec-yellow"
                  initial={{ width: 0 }}
                  animate={{ width: `${currentProgress}%` }}
                  transition={{ duration: 0.6 }}
                />
              </div>
              <p className="text-[13px] text-white">
                Current risk level:{' '}
                <span className={cn('font-semibold', riskTextTone(student?.risk_level))}>
                  {student?.risk_level || 'None'}
                </span>
              </p>
            </section>

            <div className="max-w-xs">
              <label className={labelCn} htmlFor="pu-progress">
                New progress (%)
              </label>
              <input
                id="pu-progress"
                type="number"
                min={0}
                max={100}
                value={newProgress}
                onChange={(e) => setNewProgress(e.target.value)}
                className={inputCn}
                placeholder="0 to 100"
              />
              {progressDelta !== 0 && newProgress !== '' && (
                <p
                  className={cn(
                    'mt-1.5 text-[12px] font-medium',
                    progressDelta > 0 ? 'text-emerald-400' : 'text-orange-300'
                  )}
                >
                  {progressDelta > 0 ? '+' : ''}
                  {progressDelta}% from current
                </p>
              )}
            </div>

            <div>
              <p className={labelCn}>Risk level</p>
              <div className="mt-1 flex flex-wrap gap-2">
                {RISK_LEVELS.map((level) => (
                  <button
                    key={level.value}
                    type="button"
                    aria-pressed={newRisk === level.value}
                    onClick={() => setNewRisk(level.value)}
                    className={cn(chipCn(newRisk === level.value), 'h-11')}
                  >
                    {level.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="min-w-0">
            <label className={labelCn} htmlFor="pu-notes">
              Progress notes (optional)
            </label>
            <textarea
              id="pu-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={6}
              className={cn(textareaCn, 'min-h-[160px]')}
              placeholder="Add any notes about this progress update…"
            />
          </div>
        </>
      )}
      <SuccessCheckmark show={showSuccess} />
    </FormSheet>
  );
}
