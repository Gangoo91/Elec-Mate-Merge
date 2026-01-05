import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCollege } from "@/contexts/CollegeContext";
import { CheckSquare, Loader2 } from "lucide-react";

interface RecordGradeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  assessmentId?: string; // If provided, pre-select this assessment
}

const GRADE_OPTIONS = [
  { value: "Distinction", label: "Distinction", description: "Outstanding achievement" },
  { value: "Merit", label: "Merit", description: "Very good achievement" },
  { value: "Pass", label: "Pass", description: "Meets required standard" },
  { value: "Competent", label: "Competent", description: "Demonstrates competence" },
  { value: "Refer", label: "Refer", description: "Requires resubmission" },
  { value: "Not Yet Competent", label: "Not Yet Competent", description: "Does not meet standard" },
];

export function RecordGradeDialog({ open, onOpenChange, assessmentId }: RecordGradeDialogProps) {
  const { assessments, students, staff, gradeAssessment } = useCollege();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    assessmentId: assessmentId || "",
    grade: "",
    score: "",
    maxScore: "100",
    feedback: "",
    assessorId: "",
  });

  // Get pending/submitted assessments that need grading
  const pendingAssessments = assessments.filter(
    a => a.status === 'Pending' || a.status === 'Submitted' || a.status === 'Resubmit Required'
  );

  // Get tutors/assessors
  const assessors = staff.filter(s => s.role === 'tutor' || s.role === 'assessor' || s.role === 'iqa');

  // Update form when assessmentId prop changes
  useEffect(() => {
    if (assessmentId) {
      setFormData(prev => ({ ...prev, assessmentId }));
    }
  }, [assessmentId]);

  const selectedAssessment = assessments.find(a => a.id === formData.assessmentId);
  const selectedStudent = selectedAssessment
    ? students.find(s => s.id === selectedAssessment.studentId)
    : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.assessmentId || !formData.grade || !formData.assessorId) return;

    setIsSubmitting(true);

    try {
      const assessor = staff.find(s => s.id === formData.assessorId);
      const score = formData.score ? parseInt(formData.score) : 0;

      gradeAssessment(
        formData.assessmentId,
        formData.grade,
        score,
        formData.feedback,
        formData.assessorId,
        assessor?.name || 'Unknown'
      );

      // Reset form and close dialog
      setFormData({
        assessmentId: "",
        grade: "",
        score: "",
        maxScore: "100",
        feedback: "",
        assessorId: "",
      });
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to record grade:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckSquare className="h-5 w-5 text-elec-yellow" />
            Record Grade
          </DialogTitle>
          <DialogDescription>
            Grade an assessment submission. All fields marked with * are required.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Assessment Selection */}
          <div>
            <Label htmlFor="assessmentId">Assessment *</Label>
            <Select
              value={formData.assessmentId}
              onValueChange={(value) => handleChange("assessmentId", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select assessment to grade" />
              </SelectTrigger>
              <SelectContent>
                {pendingAssessments.map((assessment) => {
                  const student = students.find(s => s.id === assessment.studentId);
                  return (
                    <SelectItem key={assessment.id} value={assessment.id}>
                      {assessment.unitTitle} - {student?.name || 'Unknown'}
                    </SelectItem>
                  );
                })}
                {pendingAssessments.length === 0 && (
                  <SelectItem value="" disabled>
                    No assessments pending
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Show selected assessment details */}
          {selectedAssessment && (
            <div className="p-3 bg-muted/50 rounded-lg space-y-1">
              <p className="text-sm font-medium">{selectedAssessment.unitTitle}</p>
              <p className="text-xs text-muted-foreground">
                Student: {selectedStudent?.name} | Type: {selectedAssessment.assessmentType}
              </p>
              {selectedAssessment.submittedDate && (
                <p className="text-xs text-muted-foreground">
                  Submitted: {new Date(selectedAssessment.submittedDate).toLocaleDateString('en-GB')}
                </p>
              )}
            </div>
          )}

          {/* Grade Selection */}
          <div>
            <Label htmlFor="grade">Grade *</Label>
            <Select
              value={formData.grade}
              onValueChange={(value) => handleChange("grade", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select grade" />
              </SelectTrigger>
              <SelectContent>
                {GRADE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex flex-col">
                      <span>{option.label}</span>
                      <span className="text-xs text-muted-foreground">{option.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Score */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="score">Score</Label>
              <Input
                id="score"
                type="number"
                min="0"
                max={formData.maxScore || 100}
                value={formData.score}
                onChange={(e) => handleChange("score", e.target.value)}
                placeholder="0"
              />
            </div>
            <div>
              <Label htmlFor="maxScore">Max Score</Label>
              <Input
                id="maxScore"
                type="number"
                min="1"
                value={formData.maxScore}
                onChange={(e) => handleChange("maxScore", e.target.value)}
                placeholder="100"
              />
            </div>
          </div>

          {/* Assessor */}
          <div>
            <Label htmlFor="assessorId">Assessed By *</Label>
            <Select
              value={formData.assessorId}
              onValueChange={(value) => handleChange("assessorId", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select assessor" />
              </SelectTrigger>
              <SelectContent>
                {assessors.map((assessor) => (
                  <SelectItem key={assessor.id} value={assessor.id}>
                    {assessor.name} ({assessor.role})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Feedback */}
          <div>
            <Label htmlFor="feedback">Feedback</Label>
            <Textarea
              id="feedback"
              value={formData.feedback}
              onChange={(e) => handleChange("feedback", e.target.value)}
              placeholder="Provide feedback for the student..."
              rows={4}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !formData.assessmentId || !formData.grade || !formData.assessorId}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Record Grade"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
