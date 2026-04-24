import { useState, useEffect, useMemo } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  useCollegeILP,
  useUpdateILPTargetStatus,
  useReviewILP,
} from '@/hooks/college/useCollegeILP';
import { useCollegeStudents } from '@/hooks/college/useCollegeStudents';
import { useCollegeStaff } from '@/hooks/college/useCollegeStaff';
import { useHapticFeedback } from '@/components/college/ui/HapticFeedback';
import { useToast } from '@/hooks/use-toast';
import { formatUKDateShort } from '@/utils/collegeHelpers';
import {
  Pill,
  LoadingState,
  SheetShell,
  FormCard,
  Field,
  PrimaryButton,
  SecondaryButton,
  SuccessCheckmark,
  EmptyState,
  inputClass,
  textareaClass,
  selectTriggerClass,
  selectContentClass,
  type Tone,
} from '@/components/college/primitives';
import type { ILPTarget } from '@/services/college';

interface ILPReviewSheetProps {
  ilpId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type TargetStatus = ILPTarget['status'];

const statusOptions: TargetStatus[] = ['Pending', 'In Progress', 'Achieved', 'Overdue'];

const targetStatusTone = (status: string): Tone => {
  switch (status) {
    case 'Achieved':
      return 'green';
    case 'In Progress':
      return 'blue';
    case 'Overdue':
      return 'orange';
    case 'Pending':
    default:
      return 'yellow';
  }
};

export function ILPReviewSheet({ ilpId, open, onOpenChange }: ILPReviewSheetProps) {
  const { data: ilp, isLoading } = useCollegeILP(ilpId!);
  const { data: students = [] } = useCollegeStudents();
  const { data: staffList = [] } = useCollegeStaff();
  const updateTargetStatus = useUpdateILPTargetStatus();
  const reviewILP = useReviewILP();
  const { toast } = useToast();
  const { triggerSuccess } = useHapticFeedback();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [targetStatuses, setTargetStatuses] = useState<TargetStatus[]>([]);
  const [reviewNotes, setReviewNotes] = useState('');
  const [nextReviewDate, setNextReviewDate] = useState('');
  const [reviewerId, setReviewerId] = useState('');

  const student = useMemo(() => {
    if (!ilp?.student_id) return null;
    return students.find((s) => s.id === ilp.student_id) ?? null;
  }, [ilp, students]);

  const tutors = useMemo(() => {
    return staffList.filter((s) => s.role === 'tutor');
  }, [staffList]);

  useEffect(() => {
    if (ilp) {
      const targets = ilp.targets ?? [];
      setTargetStatuses(targets.map((t) => t.status));
      setNextReviewDate(ilp.review_date ?? '');
      setReviewerId(ilp.reviewed_by ?? '');
      setReviewNotes('');
    }
  }, [ilp]);

  const handleTargetStatusChange = (index: number, status: TargetStatus) => {
    setTargetStatuses((prev) => {
      const updated = [...prev];
      updated[index] = status;
      return updated;
    });
  };

  const handleSubmit = async () => {
    if (!ilpId || !ilp) return;
    setIsSubmitting(true);

    try {
      const targets = ilp.targets ?? [];

      const statusPromises = targets
        .map((target, index) => {
          if (targetStatuses[index] && targetStatuses[index] !== target.status) {
            return updateTargetStatus.mutateAsync({
              id: ilpId,
              targetIndex: index,
              status: targetStatuses[index],
            });
          }
          return null;
        })
        .filter(Boolean);

      await Promise.all(statusPromises);

      await reviewILP.mutateAsync({
        id: ilpId,
        reviewerId,
        nextReviewDate,
      });

      setShowSuccess(true);
      triggerSuccess(true);

      toast({
        title: 'Review Completed',
        description: `ILP review for ${student?.name ?? 'student'} has been recorded successfully.`,
      });

      setTimeout(() => {
        setShowSuccess(false);
        onOpenChange(false);
      }, 700);
    } catch (error) {
      console.error('Failed to complete ILP review:', error);
      toast({
        title: 'Review Failed',
        description: 'There was an error completing the review. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!ilpId) return null;

  const targets = ilp?.targets ?? [];
  const canSubmit = !isSubmitting && !!nextReviewDate && !!reviewerId && !isLoading;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[85vh] p-0 overflow-hidden bg-[hsl(0_0%_8%)]"
      >
        <SheetShell
          eyebrow="ILP Review"
          title="Conduct ILP review"
          description={student?.name ?? 'Loading…'}
          footer={
            <>
              <SecondaryButton
                fullWidth
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancel
              </SecondaryButton>
              <PrimaryButton fullWidth onClick={handleSubmit} disabled={!canSubmit}>
                {isSubmitting ? 'Submitting…' : 'Complete Review →'}
              </PrimaryButton>
            </>
          }
        >
          {isLoading ? (
            <LoadingState />
          ) : (
            <>
              <FormCard eyebrow="Target Status Updates">
                {targets.length > 0 ? (
                  targets.map((target, index) => (
                    <div
                      key={index}
                      className="rounded-xl bg-[hsl(0_0%_9%)] border border-white/[0.08] p-4 space-y-3"
                    >
                      <div className="flex items-start gap-2">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-elec-yellow shrink-0 mt-1.5" />
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] text-white leading-relaxed">
                            {target.description}
                          </p>
                          <p className="text-[11px] text-white mt-1">
                            Due: {formatUKDateShort(target.target_date)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Pill tone={targetStatusTone(target.status)}>Was: {target.status}</Pill>
                        <span className="text-[11px] text-white">→</span>
                        <Select
                          value={targetStatuses[index] ?? target.status}
                          onValueChange={(value) =>
                            handleTargetStatusChange(index, value as TargetStatus)
                          }
                        >
                          <SelectTrigger className={`${selectTriggerClass} flex-1`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className={selectContentClass}>
                            {statusOptions.map((status) => (
                              <SelectItem key={status} value={status}>
                                {status}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  ))
                ) : (
                  <EmptyState title="No targets to review." />
                )}
              </FormCard>

              <FormCard eyebrow="Review Notes">
                <textarea
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  placeholder="Record notes from this review…"
                  className={`${textareaClass} min-h-[120px]`}
                />
              </FormCard>

              <FormCard eyebrow="Review Details">
                <Field label="Reviewer" required>
                  <Select value={reviewerId} onValueChange={setReviewerId}>
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue placeholder="Select reviewer" />
                    </SelectTrigger>
                    <SelectContent className={selectContentClass}>
                      {tutors.map((tutor) => (
                        <SelectItem key={tutor.id} value={tutor.id}>
                          {tutor.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>

                <Field label="Next Review Date" required>
                  <input
                    type="date"
                    value={nextReviewDate}
                    onChange={(e) => setNextReviewDate(e.target.value)}
                    className={inputClass}
                  />
                </Field>
              </FormCard>
            </>
          )}
        </SheetShell>
        <SuccessCheckmark show={showSuccess} />
      </SheetContent>
    </Sheet>
  );
}
