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
import { useCollegeGrades, useGradeAssessment } from '@/hooks/college/useCollegeGrades';
import { useCollegeStudents } from '@/hooks/college/useCollegeStudents';
import { useCollegeStaff } from '@/hooks/college/useCollegeStaff';
import { cn } from '@/lib/utils';

interface RecordGradeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  assessmentId?: string; // If provided, pre-select this assessment
}

const GRADE_OPTIONS: { value: string; label: string; description: string; warn?: boolean }[] = [
  { value: 'Distinction', label: 'Distinction', description: 'Outstanding achievement' },
  { value: 'Merit', label: 'Merit', description: 'Very good achievement' },
  { value: 'Pass', label: 'Pass', description: 'Meets required standard' },
  { value: 'Competent', label: 'Competent', description: 'Demonstrates competence' },
  { value: 'Refer', label: 'Refer', description: 'Requires resubmission', warn: true },
  { value: 'Not Yet Competent', label: 'Not Yet Competent', description: 'Does not meet standard', warn: true },
];

export function RecordGradeDialog({ open, onOpenChange, assessmentId }: RecordGradeDialogProps) {
  const { data: grades = [] } = useCollegeGrades();
  const { data: students = [] } = useCollegeStudents();
  const { data: staff = [] } = useCollegeStaff();
  const gradeAssessmentMutation = useGradeAssessment();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    assessmentId: assessmentId || '',
    grade: '',
    score: '',
    maxScore: '100',
    feedback: '',
    assessorId: '',
  });

  // Get pending/submitted assessments that need grading
  const pendingAssessments = grades.filter(
    (a) => a.status === 'Pending' || a.status === 'Submitted' || a.status === 'Resubmission'
  );

  // Get tutors
  const assessors = staff.filter((s) => s.role === 'tutor');

  // Update form when assessmentId prop changes
  useEffect(() => {
    if (assessmentId) {
      setFormData((prev) => ({ ...prev, assessmentId }));
    }
  }, [assessmentId]);

  const selectedAssessment = grades.find((a) => a.id === formData.assessmentId);
  const selectedStudent = selectedAssessment
    ? students.find((s) => s.id === selectedAssessment.student_id)
    : null;

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!formData.assessmentId || !formData.grade || !formData.assessorId) return;

    setIsSubmitting(true);

    try {
      const score = formData.score ? parseInt(formData.score) : 0;

      gradeAssessmentMutation.mutate({
        id: formData.assessmentId,
        grade: formData.grade,
        score,
        feedback: formData.feedback,
        assessorId: formData.assessorId,
      });

      // Reset form and close dialog
      setFormData({
        assessmentId: '',
        grade: '',
        score: '',
        maxScore: '100',
        feedback: '',
        assessorId: '',
      });
      onOpenChange(false);
    } catch (error) {
      console.error('Failed to record grade:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const canSubmit = !!formData.assessmentId && !!formData.grade && !!formData.assessorId;

  return (
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
            onClick={() => handleSubmit()}
            disabled={isSubmitting || !canSubmit}
            className={buttonPrimaryCn}
          >
            {isSubmitting ? 'Saving…' : 'Record grade'}
          </button>
        </div>
      }
    >
      <div className="space-y-5">
        <div>
          <p className={labelCn}>Assessment</p>
          <MobileSelectPicker
            value={formData.assessmentId}
            onValueChange={(value) => handleChange('assessmentId', value)}
            title="Assessment to grade"
            placeholder={
              pendingAssessments.length === 0 ? 'No assessments pending' : 'Select assessment to grade'
            }
            disabled={pendingAssessments.length === 0}
            triggerClassName={selectTriggerCn}
            options={pendingAssessments.map((grade) => {
              const student = students.find((s) => s.id === grade.student_id);
              return { value: grade.id, label: `${grade.unit_name} - ${student?.name || 'Unknown'}` };
            })}
          />
        </div>

        {selectedAssessment && (
          <div className="border-l-2 border-elec-yellow pl-3.5">
            <p className="text-[15px] font-semibold text-white">{selectedAssessment.unit_name}</p>
            <p className="mt-1 text-[13px] text-white">
              Learner: <span className="font-medium">{selectedStudent?.name}</span> · Type:{' '}
              <span className="font-medium">{selectedAssessment.assessment_type}</span>
            </p>
            {selectedAssessment.assessed_at && (
              <p className="text-[13px] tabular-nums text-white">
                Submitted: {new Date(selectedAssessment.assessed_at).toLocaleDateString('en-GB')}
              </p>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 gap-x-6 gap-y-5">
          <div>
            <label className={labelCn} htmlFor="score">
              Score
            </label>
            <input
              id="score"
              type="number"
              inputMode="numeric"
              min="0"
              max={formData.maxScore || 100}
              value={formData.score}
              onChange={(e) => handleChange('score', e.target.value)}
              placeholder="0"
              className={inputCn}
            />
          </div>
          <div>
            <label className={labelCn} htmlFor="maxScore">
              Max score
            </label>
            <input
              id="maxScore"
              type="number"
              inputMode="numeric"
              min="1"
              value={formData.maxScore}
              onChange={(e) => handleChange('maxScore', e.target.value)}
              placeholder="100"
              className={inputCn}
            />
          </div>
        </div>

        <div>
          <p className={labelCn}>Assessed by</p>
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

      <div>
        <p className={labelCn} id="rgd-grade-label">
          Grade
        </p>
        <div className="mt-1 grid grid-cols-2 gap-2" role="group" aria-labelledby="rgd-grade-label">
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
                    !on && option.warn && 'text-orange-300'
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
        <label className={labelCn} htmlFor="feedback">
          Feedback
        </label>
        <textarea
          id="feedback"
          value={formData.feedback}
          onChange={(e) => handleChange('feedback', e.target.value)}
          placeholder="Feedback for the learner"
          rows={4}
          className={textareaCn}
        />
      </div>
    </FormSheet>
  );
}
