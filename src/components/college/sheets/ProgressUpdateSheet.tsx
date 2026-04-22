import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCollegeStudent, useUpdateCollegeStudent } from '@/hooks/college/useCollegeStudents';
import { useToast } from '@/hooks/use-toast';
import { useHapticFeedback, SuccessCheckmark } from '@/components/college/ui/HapticFeedback';
import { Pill, LoadingState, type Tone } from '@/components/college/primitives';
import { cn } from '@/lib/utils';

interface ProgressUpdateSheetProps {
  studentId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RISK_LEVELS: { value: string; label: string; tone: Tone }[] = [
  { value: 'none', label: 'None', tone: 'yellow' },
  { value: 'low', label: 'Low', tone: 'green' },
  { value: 'medium', label: 'Medium', tone: 'amber' },
  { value: 'high', label: 'High', tone: 'orange' },
  { value: 'critical', label: 'Critical', tone: 'red' },
];

const inputClass =
  'h-11 w-full px-4 bg-[hsl(0_0%_9%)] border border-white/[0.08] rounded-xl text-white text-[13px] placeholder:text-white/35 focus:outline-none focus:border-elec-yellow/60 touch-manipulation';

const textareaClass =
  'w-full px-4 py-3 bg-[hsl(0_0%_9%)] border border-white/[0.08] rounded-xl text-white text-[13px] placeholder:text-white/35 focus:outline-none focus:border-elec-yellow/60 touch-manipulation min-h-[120px] resize-none';

const selectTriggerClass =
  'h-11 px-4 bg-[hsl(0_0%_9%)] border border-white/[0.08] rounded-xl text-white text-[13px] focus:outline-none focus:border-elec-yellow/60 touch-manipulation data-[state=open]:border-elec-yellow/60';

const selectContentClass =
  'z-[100] max-w-[calc(100vw-2rem)] bg-[hsl(0_0%_12%)] border border-white/[0.08] text-white';

const eyebrow = 'text-[10px] font-medium uppercase tracking-[0.16em] text-white/40';

function riskTone(level?: string | null): Tone {
  const l = (level || '').toLowerCase();
  if (l === 'critical') return 'red';
  if (l === 'high') return 'orange';
  if (l === 'medium') return 'amber';
  if (l === 'low') return 'green';
  return 'yellow';
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

      setShowSuccess(true);
      triggerSuccess(true);

      toast({
        title: 'Progress Updated',
        description: `${student?.name}'s progress updated to ${parsedNewProgress}%.`,
      });

      setTimeout(() => {
        setShowSuccess(false);
        onOpenChange(false);
      }, 1200);
    } catch (error) {
      console.error('Failed to update progress:', error);
      toast({
        title: 'Update Failed',
        description: 'There was an error updating progress. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!studentId) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden bg-[hsl(0_0%_8%)]">
        <div className="flex flex-col h-full">
          <div className="flex justify-center pt-2.5 pb-1 flex-shrink-0">
            <div className="h-1 w-10 rounded-full bg-white/20" />
          </div>

          <SheetHeader className="flex-shrink-0 border-b border-white/[0.06] px-5 pb-4">
            <div className={eyebrow}>Progress Update</div>
            <SheetTitle className="text-[20px] font-semibold text-white mt-1 text-left">
              Update progress
            </SheetTitle>
            <p className="text-[12.5px] text-white/55 mt-1 text-left">
              {isLoading ? 'Loading student…' : `Update progress for ${student?.name}`}
            </p>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto overscroll-contain p-5 space-y-4">
            {isLoading ? (
              <LoadingState />
            ) : (
              <>
                <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 space-y-3">
                  <div className={eyebrow}>Current Progress</div>
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] text-white/70">Overall completion</span>
                    <span className="text-[22px] font-semibold text-white tabular-nums">
                      {currentProgress}%
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-elec-yellow"
                      initial={{ width: 0 }}
                      animate={{ width: `${currentProgress}%` }}
                      transition={{ duration: 0.6 }}
                    />
                  </div>
                  <div className="flex items-center gap-2 text-[12px] text-white/70">
                    <span>Current risk level:</span>
                    <Pill tone={riskTone(student?.risk_level)}>{student?.risk_level || 'None'}</Pill>
                  </div>
                </div>

                <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 space-y-3">
                  <div className={eyebrow}>New Progress *</div>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={newProgress}
                    onChange={(e) => setNewProgress(e.target.value)}
                    className={inputClass}
                    placeholder="0 – 100"
                  />
                  {progressDelta !== 0 && newProgress !== '' && (
                    <p
                      className={cn(
                        'text-[12px] font-medium',
                        progressDelta > 0 ? 'text-green-400' : 'text-red-400'
                      )}
                    >
                      {progressDelta > 0 ? '+' : ''}
                      {progressDelta}% from current
                    </p>
                  )}
                </div>

                <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 space-y-3">
                  <div className={eyebrow}>Risk Level *</div>
                  <Select value={newRisk} onValueChange={setNewRisk}>
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue placeholder="Select risk level" />
                    </SelectTrigger>
                    <SelectContent className={selectContentClass}>
                      {RISK_LEVELS.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 space-y-3">
                  <div className={eyebrow}>Progress Notes (Optional)</div>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className={textareaClass}
                    placeholder="Add any notes about this progress update…"
                  />
                </div>
              </>
            )}
          </div>

          <SheetFooter className="flex-shrink-0 border-t border-white/[0.06] p-4 flex-row gap-2">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
              className="flex-1 h-11 text-[12.5px] font-medium text-white/70 hover:text-white transition-colors touch-manipulation border border-white/[0.08] rounded-full"
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
              className="flex-1 h-11 px-5 bg-elec-yellow text-black rounded-full text-[13px] font-semibold hover:opacity-90 disabled:opacity-40 transition-opacity touch-manipulation"
            >
              {isSubmitting ? 'Saving…' : 'Save Progress →'}
            </button>
          </SheetFooter>
        </div>

        <SuccessCheckmark show={showSuccess} />
      </SheetContent>
    </Sheet>
  );
}
