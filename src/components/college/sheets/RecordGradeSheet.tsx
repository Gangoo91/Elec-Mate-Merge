import { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
import { CheckSquare, Loader2, Save, Calendar, User, FileText } from 'lucide-react';

interface RecordGradeSheetProps {
  assessmentId?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const GRADE_OPTIONS = [
  {
    value: 'Distinction',
    label: 'Distinction',
    description: 'Outstanding achievement',
    colour: 'bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30',
  },
  {
    value: 'Merit',
    label: 'Merit',
    description: 'Very good achievement',
    colour: 'bg-info/20 text-info border-info/30',
  },
  {
    value: 'Pass',
    label: 'Pass',
    description: 'Meets required standard',
    colour: 'bg-success/20 text-success border-success/30',
  },
  {
    value: 'Competent',
    label: 'Competent',
    description: 'Demonstrates competence',
    colour: 'bg-success/20 text-success border-success/30',
  },
  {
    value: 'Refer',
    label: 'Refer',
    description: 'Requires resubmission',
    colour: 'bg-amber-500/20 text-amber-500 border-amber-500/30',
  },
  {
    value: 'Not Yet Competent',
    label: 'Not Yet Competent',
    description: 'Does not meet standard',
    colour: 'bg-destructive/20 text-destructive border-destructive/30',
  },
] as const;

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

  // Get pending/submitted assessments that need grading
  const pendingAssessments = grades.filter(
    (a) => a.status === 'Pending' || a.status === 'Submitted' || a.status === 'Resubmission'
  );

  // Get tutors for assessor selection
  const assessors = staff.filter((s) => s.role === 'tutor');

  // Update form when assessmentId prop changes or sheet opens
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

      // Show success animation
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
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
        <div className="flex flex-col h-full bg-background">
          {/* Drag Handle */}
          <div className="flex justify-center pt-2.5 pb-1 flex-shrink-0">
            <div className="h-1 w-10 rounded-full bg-white/20" />
          </div>

          {/* Header */}
          <SheetHeader className="flex-shrink-0 border-b border-border px-4 pb-4">
            <SheetTitle className="text-xl text-left flex items-center gap-2">
              <CheckSquare className="h-5 w-5 text-elec-yellow" />
              Record Grade
            </SheetTitle>
            <p className="text-sm text-white text-left">
              Grade an assessment submission. All fields marked with * are required.
            </p>
          </SheetHeader>

          {/* Scrollable Form */}
          <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-4">
            {/* Assessment Selection */}
            {!assessmentId && (
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
                  Select Assessment
                </h4>
                <div>
                  <Label htmlFor="grade-assessment">Assessment *</Label>
                  <Select
                    value={formData.assessmentId}
                    onValueChange={(value) => handleChange('assessmentId', value)}
                  >
                    <SelectTrigger className="h-11 touch-manipulation">
                      <SelectValue placeholder="Select assessment to grade" />
                    </SelectTrigger>
                    <SelectContent>
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
              </div>
            )}

            {/* Assessment Info Card */}
            {selectedAssessment && (
              <Card className="border-white/10">
                <CardContent className="p-4 space-y-3">
                  <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
                    Assessment Details
                  </h4>
                  <p className="text-base font-medium text-white">{selectedAssessment.unit_name}</p>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-white shrink-0" />
                      <div>
                        <p className="text-white text-xs">Student</p>
                        <p className="text-white font-medium">
                          {selectedStudent?.name || 'Unknown'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-white shrink-0" />
                      <div>
                        <p className="text-white text-xs">Type</p>
                        <p className="text-white font-medium">
                          {selectedAssessment.assessment_type}
                        </p>
                      </div>
                    </div>
                    {selectedAssessment.assessed_at && (
                      <div className="flex items-center gap-2 col-span-2">
                        <Calendar className="h-4 w-4 text-white shrink-0" />
                        <div>
                          <p className="text-white text-xs">Submission Date</p>
                          <p className="text-white font-medium">
                            {new Date(selectedAssessment.assessed_at).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  <Badge variant="outline" className="text-white border-white/20">
                    {selectedAssessment.status}
                  </Badge>
                </CardContent>
              </Card>
            )}

            {/* Grade Selection */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
                Grade
              </h4>
              <div>
                <Label htmlFor="grade-select">Grade *</Label>
                <Select
                  value={formData.grade}
                  onValueChange={(value) => handleChange('grade', value)}
                >
                  <SelectTrigger className="h-11 touch-manipulation">
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
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
              </div>
              {selectedGradeOption && (
                <Badge variant="outline" className={selectedGradeOption.colour}>
                  {selectedGradeOption.label}
                </Badge>
              )}
            </div>

            {/* Score */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
                Score
              </h4>
              <div>
                <Label htmlFor="grade-score">Score (optional)</Label>
                <Input
                  id="grade-score"
                  type="number"
                  min={0}
                  max={100}
                  value={formData.score}
                  onChange={(e) => handleChange('score', e.target.value)}
                  className="h-11 touch-manipulation"
                  placeholder="0 - 100"
                />
              </div>
            </div>

            {/* Assessor */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
                Assessor
              </h4>
              <div>
                <Label htmlFor="grade-assessor">Assessed By *</Label>
                <Select
                  value={formData.assessorId}
                  onValueChange={(value) => handleChange('assessorId', value)}
                >
                  <SelectTrigger className="h-11 touch-manipulation">
                    <SelectValue placeholder="Select assessor" />
                  </SelectTrigger>
                  <SelectContent>
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
            </div>

            {/* Feedback */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
                Feedback
              </h4>
              <div>
                <Label htmlFor="grade-feedback">Feedback (optional)</Label>
                <Textarea
                  id="grade-feedback"
                  value={formData.feedback}
                  onChange={(e) => handleChange('feedback', e.target.value)}
                  className="touch-manipulation text-base min-h-[120px]"
                  placeholder="Provide feedback for the student..."
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <SheetFooter className="flex-shrink-0 border-t border-border p-4 flex-row gap-2">
            <Button
              variant="outline"
              className="flex-1 h-11 touch-manipulation"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 h-11 touch-manipulation gap-2"
              onClick={handleSubmit}
              disabled={
                isSubmitting ||
                !(formData.assessmentId || assessmentId) ||
                !formData.grade ||
                !formData.assessorId
              }
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Record Grade
                </>
              )}
            </Button>
          </SheetFooter>
        </div>

        {/* Success overlay */}
        <SuccessCheckmark show={showSuccess} />
      </SheetContent>
    </Sheet>
  );
}
