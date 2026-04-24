import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCollegeStudent, useUpdateCollegeStudent } from '@/hooks/college/useCollegeStudents';
import { useToast } from '@/hooks/use-toast';
import { useHapticFeedback } from '@/components/college/ui/HapticFeedback';
import {
  Pill,
  LoadingState,
  SheetShell,
  FormCard,
  PrimaryButton,
  SecondaryButton,
  SuccessCheckmark,
  inputClass,
  textareaClass,
  selectTriggerClass,
  selectContentClass,
  type Tone,
} from '@/components/college/primitives';
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
      }, 700);
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
      <SheetContent
        side="bottom"
        className="h-[85vh] p-0 overflow-hidden bg-[hsl(0_0%_8%)]"
      >
        <SheetShell
          eyebrow="Progress Update"
          title="Update progress"
          description={isLoading ? 'Loading student…' : `Update progress for ${student?.name}`}
          footer={
            <>
              <SecondaryButton
                fullWidth
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancel
              </SecondaryButton>
              <PrimaryButton
                fullWidth
                onClick={handleSubmit}
                disabled={
                  isSubmitting ||
                  isLoading ||
                  newProgress === '' ||
                  parsedNewProgress < 0 ||
                  parsedNewProgress > 100
                }
              >
                {isSubmitting ? 'Saving…' : 'Save Progress →'}
              </PrimaryButton>
            </>
          }
        >
          {isLoading ? (
            <LoadingState />
          ) : (
            <>
              <FormCard eyebrow="Current Progress">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-white">Overall completion</span>
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
                <div className="flex items-center gap-2 text-[12px] text-white">
                  <span>Current risk level:</span>
                  <Pill tone={riskTone(student?.risk_level)}>{student?.risk_level || 'None'}</Pill>
                </div>
              </FormCard>

              <FormCard eyebrow="New Progress *">
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
              </FormCard>

              <FormCard eyebrow="Risk Level *">
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
              </FormCard>

              <FormCard eyebrow="Progress Notes (Optional)">
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className={`${textareaClass} min-h-[120px]`}
                  placeholder="Add any notes about this progress update…"
                />
              </FormCard>
            </>
          )}
        </SheetShell>
        <SuccessCheckmark show={showSuccess} />
      </SheetContent>
    </Sheet>
  );
}
