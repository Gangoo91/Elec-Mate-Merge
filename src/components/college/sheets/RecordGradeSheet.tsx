import { useState, useEffect } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  useCollegeGrades,
  useCollegeGrade,
  useGradeAssessment,
} from '@/hooks/college/useCollegeGrades';
import { useCollegeStudents } from '@/hooks/college/useCollegeStudents';
import { useCollegeStaff } from '@/hooks/college/useCollegeStaff';
import { useToast } from '@/hooks/use-toast';
import { useHapticFeedback } from '@/components/college/ui/HapticFeedback';
import {
  Pill,
  SheetShell,
  FormCard,
  FormGrid,
  Eyebrow,
  PrimaryButton,
  SecondaryButton,
  SuccessCheckmark,
  inputClass,
  textareaClass,
  selectTriggerClass,
  selectContentClass,
  type Tone,
} from '@/components/college/primitives';

interface RecordGradeSheetProps {
  assessmentId?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const GRADE_OPTIONS: { value: string; label: string; description: string; tone: Tone }[] = [
  { value: 'Distinction', label: 'Distinction', description: 'Outstanding achievement', tone: 'yellow' },
  { value: 'Merit', label: 'Merit', description: 'Very good achievement', tone: 'blue' },
  { value: 'Pass', label: 'Pass', description: 'Meets required standard', tone: 'green' },
  { value: 'Competent', label: 'Competent', description: 'Demonstrates competence', tone: 'green' },
  { value: 'Refer', label: 'Refer', description: 'Requires resubmission', tone: 'amber' },
  { value: 'Not Yet Competent', label: 'Not Yet Competent', description: 'Does not meet standard', tone: 'red' },
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

  const selectedGradeOption = GRADE_OPTIONS.find((g) => g.value === formData.grade);

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

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[85vh] p-0 overflow-hidden bg-[hsl(0_0%_8%)]"
      >
        <SheetShell
          eyebrow="Assessment"
          title="Record grade"
          description="Grade an assessment submission. Fields marked * are required."
          footer={
            <>
              <SecondaryButton
                fullWidth
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancel
              </SecondaryButton>
              <PrimaryButton
                fullWidth
                onClick={handleSubmit}
                disabled={
                  isSubmitting ||
                  !(formData.assessmentId || assessmentId) ||
                  !formData.grade ||
                  !formData.assessorId
                }
              >
                {isSubmitting ? 'Saving…' : 'Record Grade →'}
              </PrimaryButton>
            </>
          }
        >
          {!assessmentId && (
            <FormCard eyebrow="Select Assessment *">
              <Select
                value={formData.assessmentId}
                onValueChange={(value) => handleChange('assessmentId', value)}
              >
                <SelectTrigger className={selectTriggerClass}>
                  <SelectValue placeholder="Select assessment to grade" />
                </SelectTrigger>
                <SelectContent className={selectContentClass}>
                  {pendingAssessments.map((grade) => {
                    const student = students.find((s) => s.id === grade.student_id);
                    return (
                      <SelectItem key={grade.id} value={grade.id}>
                        {grade.unit_name} - {student?.name || 'Unknown'}
                      </SelectItem>
                    );
                  })}
                  {pendingAssessments.length === 0 && (
                    <SelectItem value="no-assessments" disabled>
                      No assessments pending
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </FormCard>
          )}

          {selectedAssessment && (
            <FormCard eyebrow="Assessment Details">
              <p className="text-[15px] font-medium text-white">
                {selectedAssessment.unit_name}
              </p>
              <FormGrid cols={2}>
                <div>
                  <Eyebrow>Student</Eyebrow>
                  <p className="text-[13px] text-white font-medium mt-0.5">
                    {selectedStudent?.name || 'Unknown'}
                  </p>
                </div>
                <div>
                  <Eyebrow>Type</Eyebrow>
                  <p className="text-[13px] text-white font-medium mt-0.5">
                    {selectedAssessment.assessment_type}
                  </p>
                </div>
                {selectedAssessment.assessed_at && (
                  <div className="col-span-2">
                    <Eyebrow>Submission Date</Eyebrow>
                    <p className="text-[13px] text-white font-medium mt-0.5">
                      {new Date(selectedAssessment.assessed_at).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                )}
              </FormGrid>
              <Pill tone="blue">{selectedAssessment.status}</Pill>
            </FormCard>
          )}

          <FormCard eyebrow="Grade *">
            <Select
              value={formData.grade}
              onValueChange={(value) => handleChange('grade', value)}
            >
              <SelectTrigger className={selectTriggerClass}>
                <SelectValue placeholder="Select grade" />
              </SelectTrigger>
              <SelectContent className={selectContentClass}>
                {GRADE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex flex-col">
                      <span>{option.label}</span>
                      <span className="text-[11px] text-white">{option.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedGradeOption && <Pill tone={selectedGradeOption.tone}>{selectedGradeOption.label}</Pill>}
          </FormCard>

          <FormCard eyebrow="Score (Optional)">
            <input
              type="number"
              min={0}
              max={100}
              value={formData.score}
              onChange={(e) => handleChange('score', e.target.value)}
              className={inputClass}
              placeholder="0 – 100"
            />
          </FormCard>

          <FormCard eyebrow="Assessed By *">
            <Select
              value={formData.assessorId}
              onValueChange={(value) => handleChange('assessorId', value)}
            >
              <SelectTrigger className={selectTriggerClass}>
                <SelectValue placeholder="Select assessor" />
              </SelectTrigger>
              <SelectContent className={selectContentClass}>
                {assessors.map((assessor) => (
                  <SelectItem key={assessor.id} value={assessor.id}>
                    {assessor.name} ({assessor.role})
                  </SelectItem>
                ))}
                {assessors.length === 0 && (
                  <SelectItem value="no-assessors" disabled>
                    No tutors available
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </FormCard>

          <FormCard eyebrow="Feedback (Optional)">
            <textarea
              value={formData.feedback}
              onChange={(e) => handleChange('feedback', e.target.value)}
              className={`${textareaClass} min-h-[120px]`}
              placeholder="Provide feedback for the student…"
            />
          </FormCard>
        </SheetShell>
        <SuccessCheckmark show={showSuccess} />
      </SheetContent>
    </Sheet>
  );
}
