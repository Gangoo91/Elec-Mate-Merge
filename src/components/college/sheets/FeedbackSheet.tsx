import { useState, useMemo, useCallback, useEffect } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useCollegeGrade, useUpdateGrade } from '@/hooks/college/useCollegeGrades';
import { useCollegeStudents } from '@/hooks/college/useCollegeStudents';
import { useToast } from '@/hooks/use-toast';
import {
  SheetShell,
  FormCard,
  PrimaryButton,
  SecondaryButton,
  LoadingState,
  SuccessCheckmark,
  textareaClass,
} from '@/components/college/primitives';

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
          }, 700);
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
      <SheetContent
        side="bottom"
        className="h-[85vh] p-0 overflow-hidden bg-[hsl(0_0%_8%)]"
      >
        {isLoading && <LoadingState className="h-full" />}
        {!isLoading && grade && (
          <SheetShell
            eyebrow="Assessment Feedback"
            title={grade.unit_name ?? 'Unassigned Unit'}
            description={student?.name ?? 'Unknown Student'}
            footer={
              <>
                <SecondaryButton fullWidth onClick={() => onOpenChange(false)}>
                  Cancel
                </SecondaryButton>
                <PrimaryButton
                  fullWidth
                  onClick={handleApplyFeedback}
                  disabled={updateGrade.isPending || !feedbackText.trim()}
                >
                  {updateGrade.isPending ? 'Saving…' : 'Apply Feedback →'}
                </PrimaryButton>
              </>
            }
          >
            <FormCard eyebrow="Feedback Text">
              <textarea
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="Write or edit feedback for this assessment. You can also use the AI generator to create a draft."
                className={`${textareaClass} min-h-[160px]`}
              />
              <p className="text-[11px] text-white">{feedbackText.length} characters</p>
            </FormCard>
          </SheetShell>
        )}
        <SuccessCheckmark show={showSuccess} />
      </SheetContent>
    </Sheet>
  );
}
