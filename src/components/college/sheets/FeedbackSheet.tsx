import { useState, useMemo, useCallback, useEffect } from 'react';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  labelCn,
  textareaCn,
} from '@/components/forms/fieldStyles';
import { useCollegeGrade, useUpdateGrade } from '@/hooks/college/useCollegeGrades';
import { useCollegeStudents } from '@/hooks/college/useCollegeStudents';
import { useToast } from '@/hooks/use-toast';
import { LoadingState, SuccessCheckmark } from '@/components/college/primitives';
import { formatUKDateShort } from '@/utils/collegeHelpers';
import { keyLabel } from '@/lib/college/labels';

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

  const rows: [string, string][] = grade
    ? [
        ['Learner', student?.name ?? 'Unknown learner'],
        ['Unit', grade.unit_name ?? 'Unassigned unit'],
        ['Assessment type', keyLabel(grade.assessment_type) || 'Not specified'],
        ['Grade', grade.grade ?? 'Not yet graded'],
        ['Score', grade.score != null ? `${grade.score}%` : 'No score'],
        ['Assessed', grade.assessed_at ? formatUKDateShort(grade.assessed_at) : 'Not yet'],
      ]
    : [];

  return (
    <>
      <FormSheet
        open={open}
        onOpenChange={onOpenChange}
        width="wide"
        eyebrow="Assessment feedback"
        title={isLoading ? 'Loading…' : (grade?.unit_name ?? 'Unassigned unit')}
        description={
          grade
            ? `Written feedback for ${student?.name ?? 'this learner'}. Saving replaces any feedback already on the assessment.`
            : undefined
        }
        bodyClassName="grid grid-cols-1 items-start gap-x-10 gap-y-5 lg:grid-cols-[minmax(0,1fr)_20rem]"
        footer={
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className={buttonSecondaryCn}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleApplyFeedback}
              disabled={updateGrade.isPending || !feedbackText.trim() || !grade}
              className={buttonPrimaryCn}
            >
              {updateGrade.isPending ? 'Saving…' : 'Save feedback'}
            </button>
          </div>
        }
      >
        {isLoading && <LoadingState className="lg:col-span-2" />}
        {!isLoading && grade && (
          <>
            <div>
              <label className={labelCn} htmlFor="fb-text">
                Feedback
              </label>
              <textarea
                id="fb-text"
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="What went well, what to work on, and the next step for the learner"
                className={`${textareaCn} min-h-[220px]`}
              />
              <p className="mt-1.5 text-[12px] tabular-nums text-white">
                {feedbackText.length} characters
              </p>
            </div>

            <aside className="border-t border-white/[0.08] pt-4 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
              <h3 className="text-[14px] font-semibold text-white">The assessment</h3>
              <dl className="mt-2 divide-y divide-white/[0.06]">
                {rows.map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-4 py-2 text-[13px]">
                    <dt className="text-white">{k}</dt>
                    <dd className="min-w-0 truncate text-right font-medium text-white">{v}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </>
        )}
      </FormSheet>
      <SuccessCheckmark show={showSuccess} />
    </>
  );
}
