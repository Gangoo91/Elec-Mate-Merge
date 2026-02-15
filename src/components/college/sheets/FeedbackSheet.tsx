import { useState, useMemo, useCallback, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useCollegeGrade, useUpdateGrade } from '@/hooks/college/useCollegeGrades';
import { useCollegeStudents } from '@/hooks/college/useCollegeStudents';
import { useToast } from '@/hooks/use-toast';
import { SuccessCheckmark } from '@/components/college/ui/HapticFeedback';
import { Loader2, MessageSquare, Send } from 'lucide-react';

interface FeedbackSheetProps {
  gradeId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FeedbackSheet({ gradeId, open, onOpenChange }: FeedbackSheetProps) {
  const { data: grade, isLoading } = useCollegeGrade(gradeId!);
  const { data: students } = useCollegeStudents();
  const updateGrade = useUpdateGrade();
  const { toast } = useToast();

  const [feedbackText, setFeedbackText] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const student = useMemo(() => {
    if (!grade?.student_id || !students) return null;
    return students.find((s) => s.id === grade.student_id) ?? null;
  }, [grade, students]);

  // Pre-populate feedback text when grade data loads
  useEffect(() => {
    if (grade?.feedback) {
      setFeedbackText(grade.feedback);
    } else {
      setFeedbackText('');
    }
  }, [grade?.feedback, gradeId]);

  const handleFeedbackGenerated = useCallback((feedback: string) => {
    setFeedbackText(feedback);
  }, []);

  const handleApplyFeedback = () => {
    if (!gradeId || !feedbackText.trim()) return;

    updateGrade.mutate(
      { id: gradeId, updates: { feedback: feedbackText.trim() } },
      {
        onSuccess: () => {
          setShowSuccess(true);
          toast({
            title: 'Feedback saved',
            description: 'Assessment feedback has been updated successfully.',
          });
          setTimeout(() => {
            setShowSuccess(false);
            onOpenChange(false);
          }, 1200);
        },
        onError: () => {
          toast({
            title: 'Error saving feedback',
            description: 'Something went wrong. Please try again.',
            variant: 'destructive',
          });
        },
      }
    );
  };

  if (!gradeId) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
        <div className="flex flex-col h-full bg-background">
          {/* Drag Handle */}
          <div className="flex justify-center pt-2.5 pb-1 flex-shrink-0">
            <div className="h-1 w-10 rounded-full bg-white/20" />
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex-1 flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-white" />
            </div>
          )}

          {/* Content */}
          {!isLoading && grade && (
            <>
              {/* Header */}
              <SheetHeader className="flex-shrink-0 border-b border-border px-4 pb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-elec-yellow/20 border border-elec-yellow/30 flex items-center justify-center shrink-0">
                    <MessageSquare className="h-5 w-5 text-elec-yellow" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <SheetTitle className="text-lg text-left">Assessment Feedback</SheetTitle>
                    <p className="text-sm text-white mt-0.5">
                      {student?.name ?? 'Unknown Student'} — {grade.unit_name ?? 'Unassigned Unit'}
                    </p>
                  </div>
                </div>
              </SheetHeader>

              {/* Scrollable Body */}
              <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-4">
                {/* Feedback Textarea */}
                <div className="space-y-2">
                  <Label
                    htmlFor="feedback-text"
                    className="text-sm font-semibold text-white flex items-center gap-2"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
                    Feedback Text
                  </Label>
                  <Textarea
                    id="feedback-text"
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    placeholder="Write or edit feedback for this assessment. You can also use the AI generator above to create a draft."
                    className="touch-manipulation text-base min-h-[160px] focus:ring-2 focus:ring-elec-yellow/20 border-white/30 focus:border-yellow-500 text-white"
                  />
                  <p className="text-xs text-white">{feedbackText.length} characters</p>
                </div>
              </div>

              {/* Footer */}
              <SheetFooter className="flex-shrink-0 border-t border-border p-4 flex-row gap-2">
                <Button
                  variant="outline"
                  className="flex-1 h-11 touch-manipulation"
                  onClick={() => onOpenChange(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 h-11 touch-manipulation gap-2 bg-elec-yellow hover:bg-elec-yellow/90 text-black"
                  onClick={handleApplyFeedback}
                  disabled={updateGrade.isPending || !feedbackText.trim()}
                >
                  {updateGrade.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  Apply Feedback
                </Button>
              </SheetFooter>
            </>
          )}

          {/* Success Checkmark Animation */}
          <SuccessCheckmark show={showSuccess} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
