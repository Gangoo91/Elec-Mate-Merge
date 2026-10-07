import { useState, useMemo } from 'react';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  labelCn,
  textareaCn,
} from '@/components/forms/fieldStyles';
import { useCollegeGrade, useUpdateGrade } from '@/hooks/college/useCollegeGrades';
import { useCollegeStudents } from '@/hooks/college/useCollegeStudents';
import { useCollegeStaff } from '@/hooks/college/useCollegeStaff';
import { formatUKDateShort } from '@/utils/collegeHelpers';
import { LoadingState } from '@/components/college/primitives';
import { cn } from '@/lib/utils';

interface GradeDetailSheetProps {
  gradeId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Optional: open the rubric grader for this assessment. The button only shows when wired. */
  onRubricGrade?: (gradeId: string) => void;
  /** Optional: open the quick grade sheet for this assessment. The button only shows when wired. */
  onQuickGrade?: (gradeId: string) => void;
}

export function GradeDetailSheet({
  gradeId,
  open,
  onOpenChange,
  onRubricGrade,
  onQuickGrade,
}: GradeDetailSheetProps) {
  const { data: grade, isLoading } = useCollegeGrade(gradeId!);
  const { data: students } = useCollegeStudents();
  const { data: staff } = useCollegeStaff();
  const updateGrade = useUpdateGrade();

  const [isEditingFeedback, setIsEditingFeedback] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');

  const student = useMemo(() => {
    if (!grade?.student_id || !students) return null;
    return students.find((s) => s.id === grade.student_id) ?? null;
  }, [grade, students]);

  const assessor = useMemo(() => {
    if (!grade?.assessed_by || !staff) return null;
    return staff.find((s) => s.id === grade.assessed_by) ?? null;
  }, [grade, staff]);

  /** Text colour for a grade or status: orange = needs another go / waiting, emerald = done. */
  const gradeTextCn = (gradeValue: string | null | undefined) =>
    gradeValue === 'Refer' || gradeValue === 'Not Yet Competent'
      ? 'text-orange-300'
      : gradeValue
        ? 'text-emerald-400'
        : 'text-white';

  const statusTextCn = (s: string | null) =>
    s === 'Graded' ? 'text-emerald-400' : s === 'Pending' || s === 'Resubmission' ? 'text-orange-300' : 'text-white';

  const handleStartFeedback = () => {
    setFeedbackText(grade?.feedback ?? '');
    setIsEditingFeedback(true);
  };

  const handleSaveFeedback = () => {
    if (!gradeId) return;
    updateGrade.mutate(
      { id: gradeId, updates: { feedback: feedbackText } },
      {
        onSuccess: () => setIsEditingFeedback(false),
      }
    );
  };

  if (!gradeId) return null;

  const sectionTitleCn = 'text-[15px] font-semibold text-white';
  const showGradeActions = !!(onRubricGrade || onQuickGrade);

  const rowList = (rows: [string, React.ReactNode][]) => (
    <dl className="mt-2 divide-y divide-white/[0.06] text-[13px]">
      {rows.map(([k, v]) => (
        <div key={k} className="flex items-baseline justify-between gap-4 py-2">
          <dt className="text-white">{k}</dt>
          <dd className="min-w-0 truncate text-right font-medium tabular-nums text-white">{v}</dd>
        </div>
      ))}
    </dl>
  );

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow="Assessment"
      title={isLoading ? 'Loading…' : (student?.name ?? 'Unknown learner')}
      description={grade ? (grade.unit_name ?? 'Unassigned unit') : undefined}
      headerTrailing={
        grade ? (
          <div className="pr-6 text-right text-[13px] font-semibold leading-tight">
            <div className={statusTextCn(grade.status)}>{grade.status ?? 'Pending'}</div>
            {grade.grade && <div className={cn('mt-0.5', gradeTextCn(grade.grade))}>{grade.grade}</div>}
          </div>
        ) : null
      }
      bodyClassName="grid grid-cols-1 items-start gap-x-10 gap-y-8 lg:grid-cols-2"
      footer={
        showGradeActions ? (
          <div className={cn('grid gap-2.5', onRubricGrade && onQuickGrade ? 'grid-cols-3' : 'grid-cols-2')}>
            <button type="button" onClick={() => onOpenChange(false)} className={buttonSecondaryCn}>
              Close
            </button>
            {onRubricGrade && gradeId && (
              <button
                type="button"
                onClick={() => onRubricGrade(gradeId)}
                className={onQuickGrade ? buttonSecondaryCn : buttonPrimaryCn}
              >
                Rubric grade
              </button>
            )}
            {onQuickGrade && gradeId && (
              <button type="button" onClick={() => onQuickGrade(gradeId)} className={buttonPrimaryCn}>
                Quick grade
              </button>
            )}
          </div>
        ) : (
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className={cn(buttonSecondaryCn, 'w-full')}
          >
            Close
          </button>
        )
      }
    >
      {isLoading && <LoadingState className="lg:col-span-2" />}
      {!isLoading && grade && (
        <>
          <div className="space-y-8">
            <section>
              <h3 className={sectionTitleCn}>The assessment</h3>
              {rowList([
                ['Type', grade.assessment_type ?? 'Not specified'],
                [
                  'Grade',
                  <span key="g" className={gradeTextCn(grade.grade)}>
                    {grade.grade ?? 'Not yet graded'}
                  </span>,
                ],
                ['Score', grade.score != null ? `${grade.score}%` : 'No score'],
                ['Assessor', assessor?.name ?? 'Not assigned'],
                ['Assessed', formatUKDateShort(grade.assessed_at)],
                ['Created', formatUKDateShort(grade.created_at)],
              ])}
            </section>

            <section>
              <h3 className={sectionTitleCn}>History</h3>
              <ol className="relative mt-4 space-y-5 pl-6 before:absolute before:bottom-1 before:left-[5px] before:top-1 before:w-px before:bg-white/[0.1] before:content-['']">
                <li className="relative">
                  <div className="absolute -left-6 top-1 h-2.5 w-2.5 rounded-full bg-white/40" />
                  <div className="text-[14px] font-medium text-white">Assessment created</div>
                  <div className="mt-0.5 text-[12px] tabular-nums text-white">
                    {formatUKDateShort(grade.created_at)} · Unit: {grade.unit_name ?? 'Not specified'}
                  </div>
                </li>

                {grade.status && grade.status !== 'Pending' && (
                  <li className="relative">
                    <div className="absolute -left-6 top-1 h-2.5 w-2.5 rounded-full bg-white/40" />
                    <div className="text-[14px] font-medium text-white">Status → {grade.status}</div>
                    <div className="mt-0.5 text-[12px] tabular-nums text-white">
                      {grade.assessed_at ? formatUKDateShort(grade.assessed_at) : 'Date not recorded'}
                    </div>
                  </li>
                )}

                {grade.assessed_at && (
                  <li className="relative">
                    <div className="absolute -left-6 top-1 h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    <div className="text-[14px] font-medium text-white">Graded</div>
                    <div className="mt-0.5 text-[12px] tabular-nums text-white">
                      {formatUKDateShort(grade.assessed_at)}
                      {assessor && ` · ${assessor.name}`}
                    </div>
                    {grade.grade && (
                      <div className={cn('mt-1 text-[13px] font-semibold', gradeTextCn(grade.grade))}>
                        {grade.grade}
                        {grade.score != null && ` · ${grade.score}%`}
                      </div>
                    )}
                  </li>
                )}

                {grade.feedback && (
                  <li className="relative">
                    <div className="absolute -left-6 top-1 h-2.5 w-2.5 rounded-full bg-elec-yellow" />
                    <div className="text-[14px] font-medium text-white">Feedback recorded</div>
                    <div className="mt-0.5 text-[12px] tabular-nums text-white">
                      {grade.feedback.length} characters
                    </div>
                  </li>
                )}
              </ol>
            </section>
          </div>

          <section className="border-t border-white/[0.08] pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <div className="flex items-end justify-between gap-3">
              <h3 className={sectionTitleCn}>Feedback</h3>
              {!isEditingFeedback && grade.feedback && (
                <button
                  type="button"
                  onClick={handleStartFeedback}
                  className="h-9 px-1 text-[13px] font-semibold text-elec-yellow touch-manipulation"
                >
                  Edit
                </button>
              )}
            </div>

            {isEditingFeedback ? (
              <div className="mt-3 space-y-3">
                <label className={labelCn} htmlFor="gd-feedback">
                  Feedback for the learner
                </label>
                <textarea
                  id="gd-feedback"
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Assessment feedback for the learner"
                  className={`${textareaCn} min-h-[200px]`}
                />
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setIsEditingFeedback(false)}
                    className={cn(buttonSecondaryCn, 'h-11')}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveFeedback}
                    disabled={updateGrade.isPending}
                    className={cn(buttonPrimaryCn, 'h-11')}
                  >
                    {updateGrade.isPending ? 'Saving…' : 'Save feedback'}
                  </button>
                </div>
              </div>
            ) : grade.feedback ? (
              <p className="mt-3 whitespace-pre-wrap text-[14px] leading-relaxed text-white">
                {grade.feedback}
              </p>
            ) : (
              <div className="mt-3">
                <p className="text-[13.5px] text-white">No feedback has been recorded for this assessment.</p>
                <button
                  type="button"
                  onClick={handleStartFeedback}
                  className="mt-1 h-10 px-1 text-[13px] font-semibold text-elec-yellow touch-manipulation"
                >
                  Add feedback
                </button>
              </div>
            )}
          </section>
        </>
      )}
    </FormSheet>
  );
}
