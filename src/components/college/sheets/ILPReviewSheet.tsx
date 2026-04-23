import { useState, useEffect, useMemo } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
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
import { useHapticFeedback, SuccessCheckmark } from '@/components/college/ui/HapticFeedback';
import { useToast } from '@/hooks/use-toast';
import { formatUKDateShort } from '@/utils/collegeHelpers';
import { Pill, LoadingState, type Tone } from '@/components/college/primitives';
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

const inputClass =
  'h-11 w-full px-4 bg-[hsl(0_0%_9%)] border border-white/[0.08] rounded-xl text-white text-[13px] placeholder:text-white/65 focus:outline-none focus:border-elec-yellow/60 touch-manipulation';

const textareaClass =
  'w-full px-4 py-3 bg-[hsl(0_0%_9%)] border border-white/[0.08] rounded-xl text-white text-[13px] placeholder:text-white/65 focus:outline-none focus:border-elec-yellow/60 touch-manipulation min-h-[120px] resize-none';

const selectTriggerClass =
  'h-11 px-4 bg-[hsl(0_0%_9%)] border border-white/[0.08] rounded-xl text-white text-[13px] focus:outline-none focus:border-elec-yellow/60 touch-manipulation data-[state=open]:border-elec-yellow/60';

const selectContentClass =
  'z-[100] max-w-[calc(100vw-2rem)] bg-[hsl(0_0%_12%)] border border-white/[0.08] text-white';

const eyebrow = 'text-[10px] font-medium uppercase tracking-[0.16em] text-white/55';

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
      }, 1200);
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
  const canSubmit = !isSubmitting && nextReviewDate && reviewerId && !isLoading;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden bg-[hsl(0_0%_8%)]">
        <div className="flex flex-col h-full">
          <div className="flex justify-center pt-2.5 pb-1 flex-shrink-0">
            <div className="h-1 w-10 rounded-full bg-white/20" />
          </div>

          <SheetHeader className="flex-shrink-0 border-b border-white/[0.06] px-5 pb-4">
            <div className={eyebrow}>ILP Review</div>
            <SheetTitle className="text-[20px] font-semibold text-white mt-1 text-left">
              Conduct ILP review
            </SheetTitle>
            <p className="text-[12.5px] text-white/55 mt-1 text-left">
              {student?.name ?? 'Loading…'}
            </p>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto overscroll-contain p-5 space-y-4">
            {isLoading ? (
              <LoadingState />
            ) : (
              <>
                <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 space-y-3">
                  <div className={eyebrow}>Target Status Updates</div>

                  {targets.length > 0 ? (
                    targets.map((target, index) => (
                      <div
                        key={index}
                        className="rounded-xl bg-[hsl(0_0%_9%)] border border-white/[0.06] p-4 space-y-3"
                      >
                        <div className="flex items-start gap-2">
                          <span className="inline-block h-1.5 w-1.5 rounded-full bg-elec-yellow shrink-0 mt-1.5" />
                          <div className="flex-1 min-w-0">
                            <p className="text-[13px] text-white leading-relaxed">
                              {target.description}
                            </p>
                            <p className="text-[11px] text-white/75 mt-1">
                              Due: {formatUKDateShort(target.target_date)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Pill tone={targetStatusTone(target.status)}>Was: {target.status}</Pill>
                          <span className="text-[11px] text-white/75">→</span>
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
                    <div className="rounded-xl bg-[hsl(0_0%_9%)] border border-white/[0.06] px-6 py-8 text-center">
                      <div className="text-[13px] text-white/70">No targets to review.</div>
                    </div>
                  )}
                </div>

                <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 space-y-3">
                  <div className={eyebrow}>Review Notes</div>
                  <textarea
                    value={reviewNotes}
                    onChange={(e) => setReviewNotes(e.target.value)}
                    placeholder="Record notes from this review…"
                    className={textareaClass}
                  />
                </div>

                <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 space-y-3">
                  <div className={eyebrow}>Review Details</div>

                  <div className="space-y-1.5">
                    <div className="text-[11.5px] text-white/60">Reviewer *</div>
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
                  </div>

                  <div className="space-y-1.5">
                    <div className="text-[11.5px] text-white/60">Next Review Date *</div>
                    <input
                      type="date"
                      value={nextReviewDate}
                      onChange={(e) => setNextReviewDate(e.target.value)}
                      className={inputClass}
                    />
                  </div>
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
              disabled={!canSubmit}
              className="flex-1 h-11 px-5 bg-elec-yellow text-black rounded-full text-[13px] font-semibold hover:opacity-90 disabled:opacity-40 transition-opacity touch-manipulation"
            >
              {isSubmitting ? 'Submitting…' : 'Complete Review →'}
            </button>
          </SheetFooter>
        </div>

        <SuccessCheckmark show={showSuccess} />
      </SheetContent>
    </Sheet>
  );
}
