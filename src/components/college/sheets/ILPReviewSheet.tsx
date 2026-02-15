import { useState, useEffect, useMemo } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
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
import { cn } from '@/lib/utils';
import { ClipboardCheck, Loader2, Save, Target, Calendar } from 'lucide-react';
import type { ILPTarget } from '@/services/college';

interface ILPReviewSheetProps {
  ilpId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type TargetStatus = ILPTarget['status'];

const statusOptions: TargetStatus[] = ['Pending', 'In Progress', 'Achieved', 'Overdue'];

const getTargetStatusColour = (status: string) => {
  switch (status) {
    case 'Achieved':
      return 'bg-success/10 text-success border-success/20';
    case 'In Progress':
      return 'bg-info/10 text-info border-info/20';
    case 'Overdue':
      return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
    case 'Pending':
    default:
      return 'bg-muted text-white border-white/10';
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

  // Initialise form when ILP data loads
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

      // Update each changed target status
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

      // Conduct the review
      await reviewILP.mutateAsync({
        id: ilpId,
        reviewerId: reviewerId,
        nextReviewDate: nextReviewDate,
      });

      // Show success animation
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
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
        <div className="flex flex-col h-full bg-background">
          {/* Drag Handle */}
          <div className="flex justify-center pt-2.5 pb-1 flex-shrink-0">
            <div className="h-1 w-10 rounded-full bg-white/20" />
          </div>

          {/* Header */}
          <SheetHeader className="flex-shrink-0 border-b border-border px-4 pb-4">
            <SheetTitle className="text-xl text-left flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5 text-elec-yellow" />
              Conduct ILP Review
            </SheetTitle>
            <p className="text-sm text-white text-left">{student?.name ?? 'Loading...'}</p>
          </SheetHeader>

          {/* Scrollable Form */}
          <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-4">
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-20 bg-muted animate-pulse rounded-lg" />
                ))}
              </div>
            ) : (
              <>
                {/* Target Status Updates */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
                    Target Status Updates
                  </h4>

                  {targets.length > 0 ? (
                    targets.map((target, index) => (
                      <Card key={index} className="border-white/10">
                        <CardContent className="p-3 space-y-2">
                          <div className="flex items-start gap-2">
                            <Target className="h-4 w-4 mt-0.5 shrink-0 text-elec-yellow" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-white">{target.description}</p>
                              <p className="text-xs text-white mt-0.5">
                                Due: {formatUKDateShort(target.target_date)}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className={cn(
                                'text-xs shrink-0',
                                getTargetStatusColour(target.status)
                              )}
                            >
                              Was: {target.status}
                            </Badge>
                            <span className="text-xs text-white">to</span>
                            <Select
                              value={targetStatuses[index] ?? target.status}
                              onValueChange={(value) =>
                                handleTargetStatusChange(index, value as TargetStatus)
                              }
                            >
                              <SelectTrigger className="h-11 touch-manipulation flex-1">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {statusOptions.map((status) => (
                                  <SelectItem key={status} value={status}>
                                    {status}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <Card className="border-white/10">
                      <CardContent className="p-6 text-center">
                        <Target className="h-8 w-8 mx-auto text-white mb-2" />
                        <p className="text-sm text-white">No targets to review.</p>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Review Notes */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
                    Review Notes
                  </h4>
                  <Textarea
                    value={reviewNotes}
                    onChange={(e) => setReviewNotes(e.target.value)}
                    placeholder="Record notes from this review..."
                    className="touch-manipulation text-base min-h-[120px] focus:ring-2 focus:ring-elec-yellow/20 border-white/30 focus:border-yellow-500"
                  />
                </div>

                {/* Review Details */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
                    Review Details
                  </h4>

                  <div>
                    <Label htmlFor="review-reviewer">Reviewer *</Label>
                    <Select value={reviewerId} onValueChange={setReviewerId}>
                      <SelectTrigger className="h-11 touch-manipulation">
                        <SelectValue placeholder="Select reviewer" />
                      </SelectTrigger>
                      <SelectContent>
                        {tutors.map((tutor) => (
                          <SelectItem key={tutor.id} value={tutor.id}>
                            {tutor.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="review-next-date">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        Next Review Date *
                      </span>
                    </Label>
                    <Input
                      id="review-next-date"
                      type="date"
                      value={nextReviewDate}
                      onChange={(e) => setNextReviewDate(e.target.value)}
                      className="h-11 touch-manipulation"
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <SheetFooter className="flex-shrink-0 border-t border-border p-4 flex-row gap-2">
            <Button
              variant="outline"
              className="flex-1 h-11 touch-manipulation"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 h-11 touch-manipulation gap-2"
              onClick={handleSubmit}
              disabled={!canSubmit}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Complete Review
                </>
              )}
            </Button>
          </SheetFooter>
        </div>

        {/* Success overlay */}
        <SuccessCheckmark show={showSuccess} />
      </SheetContent>
    </Sheet>
  );
}
