import { useState, useEffect } from 'react';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  inputCn,
  labelCn,
  selectTriggerCn,
  textareaCn,
} from '@/components/forms/fieldStyles';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import {
  useCollegeGrades,
  useCollegeGrade,
  useGradeAssessment,
} from '@/hooks/college/useCollegeGrades';
import { useCollegeStudents } from '@/hooks/college/useCollegeStudents';
import { useCollegeStaff } from '@/hooks/college/useCollegeStaff';
import { useToast } from '@/hooks/use-toast';
import { useHapticFeedback } from '@/components/college/ui/HapticFeedback';
import { SuccessCheckmark } from '@/components/college/primitives';
import { cn } from '@/lib/utils';

interface RecordGradeSheetProps {
  assessmentId?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const GRADE_OPTIONS: { value: string; label: string; description: string; tone: 'good' | 'warn' | 'bad' }[] = [
  { value: 'Distinction', label: 'Distinction', description: 'Outstanding achievement', tone: 'good' },
  { value: 'Merit', label: 'Merit', description: 'Very good achievement', tone: 'good' },
  { value: 'Pass', label: 'Pass', description: 'Meets required standard', tone: 'good' },
  { value: 'Competent', label: 'Competent', description: 'Demonstrates competence', tone: 'good' },
  { value: 'Refer', label: 'Refer', description: 'Requires resubmission', tone: 'warn' },
  { value: 'Not Yet Competent', label: 'Not Yet Competent', description: 'Does not meet standard', tone: 'bad' },
];

export function RecordGradeSheet({ assessmentId, open, onOpenChange }: RecordGradeSheetProps) {
  const { data: grades = [] } = useCollegeGrades();
  const { data: preloadedGrade } = useCollegeGrade(assessmentId || '');
  const { data: students = [] } = useCollegeStudents();
  const { data: staff = [] } = useCollegeStaff();
  const gradeAssessmentMutation = useGradeAssessment();
  const { toast } = useToast();
  const { triggerSuccess } = useHapticFeedback();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    assessmentId: '',
    grade: '',
    score: '',
    feedback: '',
    assessorId: '',
  });

  const pendingAssessments = grades.filter(
    (a) => a.status === 'Pending' || a.status === 'Submitted' || a.status === 'Resubmission'
  );

  const assessors = staff.filter((s) => s.role === 'tutor');

  useEffect(() => {
    if (open) {
      setFormData({
        assessmentId: assessmentId || '',
        grade: '',
        score: '',
        feedback: '',
        assessorId: '',
      });
      setShowSuccess(false);
    }
  }, [open, assessmentId]);

  const selectedAssessment =
    preloadedGrade && assessmentId
      ? preloadedGrade
      : grades.find((a) => a.id === formData.assessmentId);

  const selectedStudent = selectedAssessment
    ? students.find((s) => s.id === selectedAssessment.student_id)
    : null;

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const targetId = formData.assessmentId || assessmentId;
    if (!targetId || !formData.grade || !formData.assessorId) return;

    setIsSubmitting(true);

    try {
      const score = formData.score ? parseInt(formData.score) : 0;

      await gradeAssessmentMutation.mutateAsync({
        id: targetId,
        grade: formData.grade,
        score,
        feedback: formData.feedback,
        assessorId: formData.assessorId,
      });

      setShowSuccess(true);
      triggerSuccess(true);

      toast({
        title: 'Grade Recorded',
        description: `${selectedAssessment?.unit_name} graded as ${formData.grade}.`,
      });

      setTimeout(() => {
        setShowSuccess(false);
        setFormData({
          assessmentId: '',
          grade: '',
          score: '',
          feedback: '',
          assessorId: '',
        });
        onOpenChange(false);
      }, 700);
    } catch (error) {
      console.error('Failed to record grade:', error);
      toast({
        title: 'Grading Failed',
        description: 'There was an error recording the grade. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const canSubmit = !!(formData.assessmentId || assessmentId) && !!formData.grade && !!formData.assessorId;

  return (
    <>
      <FormSheet
        open={open}
        onOpenChange={onOpenChange}
        width="wide"
        eyebrow="Assessment"
        title="Record grade"
        description="Grade an assessment submission. Assessment, grade and assessor are required."
        bodyClassName="grid grid-cols-1 items-start gap-x-10 gap-y-6 lg:grid-cols-2"
        footer={
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
              className={buttonSecondaryCn}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting || !canSubmit}
              className={buttonPrimaryCn}
            >
              {isSubmitting ? 'Saving…' : 'Record grade'}
            </button>
          </div>
        }
      >
        <div className="space-y-5">
          {!assessmentId && (
            <div>
              <p className={labelCn}>Assessment</p>
              <div>
                <MobileSelectPicker
                  value={formData.assessmentId}
                  onValueChange={(value) => handleChange('assessmentId', value)}
                  title="Assessment to grade"
                  placeholder={
                    pendingAssessments.length === 0
                      ? 'No assessments pending'
                      : 'Select assessment to grade'
                  }
                  disabled={pendingAssessments.length === 0}
                  triggerClassName={selectTriggerCn}
                  options={pendingAssessments.map((grade) => {
                    const student = students.find((s) => s.id === grade.student_id);
                    return {
                      value: grade.id,
                      label: `${grade.unit_name} - ${student?.name || 'Unknown'}`,
                    };
                  })}
                />
              </div>
            </div>
          )}

          {selectedAssessment && (
            <div className="border-l-2 border-elec-yellow pl-3.5">
              <p className="text-[15px] font-semibold text-white">{selectedAssessment.unit_name}</p>
              <dl className="mt-1.5 space-y-0.5 text-[13px] text-white">
                <div>
                  <dt className="inline">Learner: </dt>
                  <dd className="inline font-medium">{selectedStudent?.name || 'Unknown'}</dd>
                </div>
                <div>
                  <dt className="inline">Type: </dt>
                  <dd className="inline font-medium">{selectedAssessment.assessment_type}</dd>
                </div>
                {selectedAssessment.assessed_at && (
                  <div>
                    <dt className="inline">Submitted: </dt>
                    <dd className="inline font-medium tabular-nums">
                      {new Date(selectedAssessment.assessed_at).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </dd>
                  </div>
                )}
                <div>
                  <dt className="inline">Status: </dt>
                  <dd className="inline font-medium">{selectedAssessment.status}</dd>
                </div>
              </dl>
            </div>
          )}

          <div className="grid grid-cols-2 gap-x-6 gap-y-5">
            <div>
              <label className={labelCn} htmlFor="rgs-score">
                Score (optional)
              </label>
              <input
                id="rgs-score"
                type="number"
                inputMode="numeric"
                min={0}
                max={100}
                value={formData.score}
                onChange={(e) => handleChange('score', e.target.value)}
                className={inputCn}
                placeholder="0 – 100"
              />
            </div>
            <div>
              <p className={labelCn}>Assessed by</p>
              <div>
                <MobileSelectPicker
                  value={formData.assessorId}
                  onValueChange={(value) => handleChange('assessorId', value)}
                  title="Assessed by"
                  placeholder={assessors.length === 0 ? 'No tutors available' : 'Select assessor'}
                  disabled={assessors.length === 0}
                  triggerClassName={selectTriggerCn}
                  options={assessors.map((assessor) => ({
                    value: assessor.id,
                    label: `${assessor.name} (${assessor.role})`,
                  }))}
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <p className={labelCn} id="rgs-grade-label">
            Grade
          </p>
          <div className="mt-1 grid grid-cols-2 gap-2" role="group" aria-labelledby="rgs-grade-label">
            {GRADE_OPTIONS.map((option) => {
              const on = formData.grade === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={on}
                  onClick={() => handleChange('grade', option.value)}
                  className={cn(
                    'min-h-[56px] rounded-xl border px-3 py-2 text-left transition-colors touch-manipulation active:scale-[0.98]',
                    on
                      ? 'border-elec-yellow bg-elec-yellow text-black'
                      : 'border-white/[0.12] bg-white/[0.06] text-white hover:border-white/[0.3]'
                  )}
                >
                  <span
                    className={cn(
                      'block text-[14px] font-semibold',
                      !on && option.tone === 'warn' && 'text-orange-300',
                      !on && option.tone === 'bad' && 'text-orange-300'
                    )}
                  >
                    {option.label}
                  </span>
                  <span className={cn('block text-[12px]', on ? 'text-black' : 'text-white')}>
                    {option.description}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-2">
          <label className={labelCn} htmlFor="rgs-feedback">
            Feedback (optional)
          </label>
          <textarea
            id="rgs-feedback"
            value={formData.feedback}
            onChange={(e) => handleChange('feedback', e.target.value)}
            className={`${textareaCn} min-h-[120px]`}
            placeholder="Feedback for the learner"
          />
        </div>
      </FormSheet>
      <SuccessCheckmark show={showSuccess} />
    </>
  );
}
