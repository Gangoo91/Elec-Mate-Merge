import { useState, useMemo, useCallback, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { useCollegeGrade, useUpdateGrade } from '@/hooks/college/useCollegeGrades';
import { useCollegeStudents } from '@/hooks/college/useCollegeStudents';
import { useToast } from '@/hooks/use-toast';
import { SuccessCheckmark } from '@/components/college/ui/HapticFeedback';
import { LoadingState } from '@/components/college/primitives';

interface FeedbackSheetProps {
  gradeId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const eyebrow = 'text-[10px] font-medium uppercase tracking-[0.16em] text-white/55';

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

  useEffect(() => {
    if (grade?.feedback) {
      setFeedbackText(grade.feedback);
    } else {
      setFeedbackText('');
    }
  }, [grade?.feedback, gradeId]);

  // Retain callback for external AI generation integrations
  const _handleFeedbackGenerated = useCallback((feedback: string) => {
    setFeedbackText(feedback);
  }, []);
  void _handleFeedbackGenerated;

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
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden bg-[hsl(0_0%_8%)]">
        <div className="flex flex-col h-full">
          <div className="flex justify-center pt-2.5 pb-1 flex-shrink-0">
            <div className="h-1 w-10 rounded-full bg-white/20" />
          </div>

          {isLoading && <LoadingState className="flex-1" />}

          {!isLoading && grade && (
            <>
              <SheetHeader className="flex-shrink-0 border-b border-white/[0.06] px-5 pb-4">
                <div className={eyebrow}>Assessment Feedback</div>
                <SheetTitle className="text-[18px] font-semibold text-white mt-1 text-left">
                  {grade.unit_name ?? 'Unassigned Unit'}
                </SheetTitle>
                <p className="text-[12.5px] text-white/55 mt-1 text-left">
                  {student?.name ?? 'Unknown Student'}
                </p>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto overscroll-contain p-5 space-y-4">
                <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 space-y-3">
                  <div className={eyebrow}>Feedback Text</div>
                  <textarea
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    placeholder="Write or edit feedback for this assessment. You can also use the AI generator to create a draft."
                    className="w-full px-4 py-3 bg-[hsl(0_0%_9%)] border border-white/[0.08] rounded-xl text-white text-[13px] placeholder:text-white/65 focus:outline-none focus:border-elec-yellow/60 touch-manipulation min-h-[160px] resize-none"
                  />
                  <p className="text-[11px] text-white/70">{feedbackText.length} characters</p>
                </div>
              </div>

              <SheetFooter className="flex-shrink-0 border-t border-white/[0.06] p-4 flex-row gap-2">
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className="flex-1 h-11 text-[12.5px] font-medium text-white/70 hover:text-white transition-colors touch-manipulation border border-white/[0.08] rounded-full"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleApplyFeedback}
                  disabled={updateGrade.isPending || !feedbackText.trim()}
                  className="flex-1 h-11 px-5 bg-elec-yellow text-black rounded-full text-[13px] font-semibold hover:opacity-90 disabled:opacity-40 transition-opacity touch-manipulation"
                >
                  {updateGrade.isPending ? 'Saving…' : 'Apply Feedback →'}
                </button>
              </SheetFooter>
            </>
          )}

          <SuccessCheckmark show={showSuccess} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
