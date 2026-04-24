import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCollegeGrades, useGradeAssessment } from '@/hooks/college/useCollegeGrades';
import { useCollegeStudents } from '@/hooks/college/useCollegeStudents';
import { useCollegeStaff } from '@/hooks/college/useCollegeStaff';
import {
  Field,
  FormCard,
  FormGrid,
  PrimaryButton,
  SecondaryButton,
  inputClass,
  selectContentClass,
  selectTriggerClass,
  textareaClass,
} from '@/components/college/primitives';

interface RecordGradeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  assessmentId?: string; // If provided, pre-select this assessment
}

const GRADE_OPTIONS = [
  { value: 'Distinction', label: 'Distinction', description: 'Outstanding achievement' },
  { value: 'Merit', label: 'Merit', description: 'Very good achievement' },
  { value: 'Pass', label: 'Pass', description: 'Meets required standard' },
  { value: 'Competent', label: 'Competent', description: 'Demonstrates competence' },
  { value: 'Refer', label: 'Refer', description: 'Requires resubmission' },
  { value: 'Not Yet Competent', label: 'Not Yet Competent', description: 'Does not meet standard' },
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto bg-[hsl(0_0%_8%)] border-white/[0.08]">
        <DialogHeader>
          <DialogTitle className="text-white">Record grade</DialogTitle>
          <DialogDescription className="text-white">
            Grade an assessment submission. All fields marked with * are required.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormCard eyebrow="Assessment">
            <Field label="Assessment" required>
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
            </Field>

            {/* Show selected assessment details */}
            {selectedAssessment && (
              <div className="p-3 bg-white/[0.04] border border-white/[0.06] rounded-xl space-y-1">
                <p className="text-sm font-medium text-white">{selectedAssessment.unit_name}</p>
                <p className="text-xs text-white">
                  Student: {selectedStudent?.name} | Type: {selectedAssessment.assessment_type}
                </p>
                {selectedAssessment.assessed_at && (
                  <p className="text-xs text-white">
                    Submitted:{' '}
                    {new Date(selectedAssessment.assessed_at).toLocaleDateString('en-GB')}
                  </p>
                )}
              </div>
            )}
          </FormCard>

          <FormCard eyebrow="Grade & score">
            <Field label="Grade" required>
              <Select value={formData.grade} onValueChange={(value) => handleChange('grade', value)}>
                <SelectTrigger className={selectTriggerClass}>
                  <SelectValue placeholder="Select grade" />
                </SelectTrigger>
                <SelectContent className={selectContentClass}>
                  {GRADE_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex flex-col">
                        <span>{option.label}</span>
                        <span className="text-xs text-white">{option.description}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <FormGrid cols={2}>
              <Field label="Score">
                <Input
                  id="score"
                  type="number"
                  min="0"
                  max={formData.maxScore || 100}
                  value={formData.score}
                  onChange={(e) => handleChange('score', e.target.value)}
                  placeholder="0"
                  className={inputClass}
                />
              </Field>
              <Field label="Max score">
                <Input
                  id="maxScore"
                  type="number"
                  min="1"
                  value={formData.maxScore}
                  onChange={(e) => handleChange('maxScore', e.target.value)}
                  placeholder="100"
                  className={inputClass}
                />
              </Field>
            </FormGrid>

            <Field label="Assessed by" required>
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
                </SelectContent>
              </Select>
            </Field>

            <Field label="Feedback">
              <Textarea
                id="feedback"
                value={formData.feedback}
                onChange={(e) => handleChange('feedback', e.target.value)}
                placeholder="Provide feedback for the student..."
                rows={4}
                className={textareaClass}
              />
            </Field>
          </FormCard>

          <DialogFooter>
            <SecondaryButton
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </SecondaryButton>
            <PrimaryButton
              type="submit"
              disabled={
                isSubmitting || !formData.assessmentId || !formData.grade || !formData.assessorId
              }
              onClick={handleSubmit}
            >
              {isSubmitting ? 'Saving…' : 'Record grade'}
            </PrimaryButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
