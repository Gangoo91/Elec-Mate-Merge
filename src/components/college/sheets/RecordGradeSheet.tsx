import { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
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
import { useHapticFeedback, SuccessCheckmark } from '@/components/college/ui/HapticFeedback';
import { Pill, type Tone } from '@/components/college/primitives';

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

const inputClass =
  'h-11 w-full px-4 bg-[hsl(0_0%_9%)] border border-white/[0.08] rounded-xl text-white text-[13px] placeholder:text-white/35 focus:outline-none focus:border-elec-yellow/60 touch-manipulation';

const textareaClass =
  'w-full px-4 py-3 bg-[hsl(0_0%_9%)] border border-white/[0.08] rounded-xl text-white text-[13px] placeholder:text-white/35 focus:outline-none focus:border-elec-yellow/60 touch-manipulation min-h-[120px] resize-none';

const selectTriggerClass =
  'h-11 px-4 bg-[hsl(0_0%_9%)] border border-white/[0.08] rounded-xl text-white text-[13px] focus:outline-none focus:border-elec-yellow/60 touch-manipulation data-[state=open]:border-elec-yellow/60';

const selectContentClass =
  'z-[100] max-w-[calc(100vw-2rem)] bg-[hsl(0_0%_12%)] border border-white/[0.08] text-white';

const eyebrow = 'text-[10px] font-medium uppercase tracking-[0.16em] text-white/40';

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
      }, 1200);
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
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden bg-[hsl(0_0%_8%)]">
        <div className="flex flex-col h-full">
          <div className="flex justify-center pt-2.5 pb-1 flex-shrink-0">
            <div className="h-1 w-10 rounded-full bg-white/20" />
          </div>

          <SheetHeader className="flex-shrink-0 border-b border-white/[0.06] px-5 pb-4">
            <div className={eyebrow}>Assessment</div>
            <SheetTitle className="text-[20px] font-semibold text-white mt-1 text-left">
              Record grade
            </SheetTitle>
            <p className="text-[12.5px] text-white/55 mt-1 text-left">
              Grade an assessment submission. Fields marked * are required.
            </p>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto overscroll-contain p-5 space-y-4">
            {!assessmentId && (
              <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 space-y-3">
                <div className={eyebrow}>Select Assessment *</div>
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
              </div>
            )}

            {selectedAssessment && (
              <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 space-y-3">
                <div className={eyebrow}>Assessment Details</div>
                <p className="text-[15px] font-medium text-white">
                  {selectedAssessment.unit_name}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[11px] text-white/40 uppercase tracking-wider">Student</p>
                    <p className="text-[13px] text-white font-medium mt-0.5">
                      {selectedStudent?.name || 'Unknown'}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] text-white/40 uppercase tracking-wider">Type</p>
                    <p className="text-[13px] text-white font-medium mt-0.5">
                      {selectedAssessment.assessment_type}
                    </p>
                  </div>
                  {selectedAssessment.assessed_at && (
                    <div className="col-span-2">
                      <p className="text-[11px] text-white/40 uppercase tracking-wider">
                        Submission Date
                      </p>
                      <p className="text-[13px] text-white font-medium mt-0.5">
                        {new Date(selectedAssessment.assessed_at).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                  )}
                </div>
                <Pill tone="blue">{selectedAssessment.status}</Pill>
              </div>
            )}

            <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 space-y-3">
              <div className={eyebrow}>Grade *</div>
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
                        <span className="text-[11px] text-white/50">{option.description}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedGradeOption && <Pill tone={selectedGradeOption.tone}>{selectedGradeOption.label}</Pill>}
            </div>

            <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 space-y-3">
              <div className={eyebrow}>Score (Optional)</div>
              <input
                type="number"
                min={0}
                max={100}
                value={formData.score}
                onChange={(e) => handleChange('score', e.target.value)}
                className={inputClass}
                placeholder="0 – 100"
              />
            </div>

            <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 space-y-3">
              <div className={eyebrow}>Assessed By *</div>
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
            </div>

            <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 space-y-3">
              <div className={eyebrow}>Feedback (Optional)</div>
              <textarea
                value={formData.feedback}
                onChange={(e) => handleChange('feedback', e.target.value)}
                className={textareaClass}
                placeholder="Provide feedback for the student…"
              />
            </div>
          </div>

          <SheetFooter className="flex-shrink-0 border-t border-white/[0.06] p-4 flex-row gap-2">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
              className="flex-1 h-11 text-[12.5px] font-medium text-white/70 hover:text-white transition-colors touch-manipulation border border-white/[0.08] rounded-full"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={
                isSubmitting ||
                !(formData.assessmentId || assessmentId) ||
                !formData.grade ||
                !formData.assessorId
              }
              className="flex-1 h-11 px-5 bg-elec-yellow text-black rounded-full text-[13px] font-semibold hover:opacity-90 disabled:opacity-40 transition-opacity touch-manipulation"
            >
              {isSubmitting ? 'Saving…' : 'Record Grade →'}
            </button>
          </SheetFooter>
        </div>

        <SuccessCheckmark show={showSuccess} />
      </SheetContent>
    </Sheet>
  );
}
