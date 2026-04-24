import { useState, useEffect, useMemo } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Pill } from '@/components/college/primitives';
import { Checkbox } from '@/components/ui/checkbox';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { CommentThread } from '@/components/college/comments';
import { useCollegeGrades, useGradeAssessment } from '@/hooks/college/useCollegeGrades';
import { useCollegeStudents } from '@/hooks/college/useCollegeStudents';
import { useCollegeStaff } from '@/hooks/college/useCollegeStaff';
import { cn } from '@/lib/utils';
import {
  Field,
  PrimaryButton,
  SecondaryButton,
  checkboxClass,
  fieldLabelClass,
  selectContentClass,
  selectTriggerClass,
  textareaClass,
} from '@/components/college/primitives';

interface RubricGradingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  assessmentId?: string;
}

interface CriterionScore {
  criterionCode: string;
  criterionText: string;
  score: number; // 0-4 (0=Not Assessed, 1=Not Met, 2=Partially Met, 3=Met, 4=Exceeded)
  feedback: string;
  evidenceLinked: boolean;
}

// Rubric criteria based on AM2 standards
const defaultCriteria = [
  {
    code: 'PB1',
    text: 'Select and install enclosures and mounting systems',
    category: 'Panel Building',
  },
  { code: 'PB2', text: 'Install busbars and distribution systems', category: 'Panel Building' },
  { code: 'PB3', text: 'Install circuit protection devices', category: 'Panel Building' },
  { code: 'WS1', text: 'Install cable containment systems', category: 'Wiring Systems' },
  { code: 'WS2', text: 'Install cables in containment systems', category: 'Wiring Systems' },
  { code: 'WS3', text: 'Install and terminate SWA cables', category: 'Wiring Systems' },
  { code: 'FF1', text: 'Identify symptoms and causes of faults', category: 'Fault Finding' },
  { code: 'FF2', text: 'Apply safe isolation procedures', category: 'Fault Finding' },
  { code: 'TS1', text: 'Conduct visual inspections', category: 'Testing' },
  { code: 'TS2', text: 'Test continuity of protective conductors', category: 'Testing' },
  { code: 'TS3', text: 'Test insulation resistance', category: 'Testing' },
  { code: 'SW1', text: 'Conduct risk assessments', category: 'Safe Working' },
  { code: 'SW2', text: 'Select and use appropriate PPE', category: 'Safe Working' },
];

const scoreLabels = [
  { value: 0, label: 'Not Assessed', color: 'bg-white/[0.04] text-white' },
  { value: 1, label: 'Not Met', color: 'bg-red-500/20 text-red-400' },
  { value: 2, label: 'Partially Met', color: 'bg-amber-500/20 text-amber-400' },
  { value: 3, label: 'Met', color: 'bg-emerald-500/20 text-emerald-400' },
  { value: 4, label: 'Exceeded', color: 'bg-elec-yellow/20 text-elec-yellow' },
];

export function RubricGradingDialog({
  open,
  onOpenChange,
  assessmentId,
}: RubricGradingDialogProps) {
  const { data: grades = [] } = useCollegeGrades();
  const { data: students = [] } = useCollegeStudents();
  const { data: staff = [] } = useCollegeStaff();
  const gradeAssessmentMutation = useGradeAssessment();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('criteria');
  const [assessorId, setAssessorId] = useState('');
  const [overallFeedback, setOverallFeedback] = useState('');
  const [signedOff, setSignedOff] = useState(false);
  const [criteriaScores, setCriteriaScores] = useState<CriterionScore[]>([]);

  // Get the selected assessment
  const grade = grades.find((a) => a.id === assessmentId);
  const student = grade ? students.find((s) => s.id === grade.student_id) : null;
  const assessors = staff.filter((s) => s.role === 'tutor');

  // Initialize criteria scores when dialog opens
  useEffect(() => {
    if (open && assessmentId) {
      const initialScores = defaultCriteria.map((c) => ({
        criterionCode: c.code,
        criterionText: c.text,
        score: 0,
        feedback: '',
        evidenceLinked: false,
      }));
      setCriteriaScores(initialScores);
      setActiveTab('criteria');
      setSignedOff(false);
      setOverallFeedback('');
    }
  }, [open, assessmentId]);

  // Calculate grade based on criteria scores
  const gradeCalculation = useMemo(() => {
    const assessedCriteria = criteriaScores.filter((c) => c.score > 0);
    if (assessedCriteria.length === 0) {
      return { grade: 'Not Graded', percentage: 0, color: 'bg-white/[0.04] text-white' };
    }

    const totalScore = assessedCriteria.reduce((sum, c) => sum + c.score, 0);
    const maxPossible = assessedCriteria.length * 4;
    const percentage = Math.round((totalScore / maxPossible) * 100);

    let calculatedGrade = 'Not Yet Competent';
    let color = 'bg-red-500/20 text-red-400';

    if (percentage >= 90) {
      calculatedGrade = 'Distinction';
      color = 'bg-elec-yellow/20 text-elec-yellow';
    } else if (percentage >= 75) {
      calculatedGrade = 'Merit';
      color = 'bg-blue-500/20 text-blue-400';
    } else if (percentage >= 60) {
      calculatedGrade = 'Pass';
      color = 'bg-emerald-500/20 text-emerald-400';
    } else if (percentage >= 40) {
      calculatedGrade = 'Refer';
      color = 'bg-amber-500/20 text-amber-400';
    }

    // Check if any criteria are "Not Met"
    const hasNotMet = assessedCriteria.some((c) => c.score === 1);
    if (hasNotMet && percentage >= 60) {
      calculatedGrade = 'Refer';
      color = 'bg-amber-500/20 text-amber-400';
    }

    return { grade: calculatedGrade, percentage, color };
  }, [criteriaScores]);

  // Group criteria by category
  const groupedCriteria = useMemo(() => {
    const groups: Record<string, typeof defaultCriteria> = {};
    defaultCriteria.forEach((c) => {
      if (!groups[c.category]) {
        groups[c.category] = [];
      }
      groups[c.category].push(c);
    });
    return groups;
  }, []);

  const updateCriterionScore = (code: string, field: keyof CriterionScore, value: any) => {
    setCriteriaScores((prev) =>
      prev.map((c) => (c.criterionCode === code ? { ...c, [field]: value } : c))
    );
  };

  const handleSubmit = async () => {
    if (!assessmentId || !assessorId) return;

    setIsSubmitting(true);

    try {
      gradeAssessmentMutation.mutate({
        id: assessmentId,
        grade: gradeCalculation.grade,
        score: gradeCalculation.percentage,
        feedback: overallFeedback,
        assessorId,
      });

      onOpenChange(false);
    } catch (error) {
      console.error('Failed to record grade:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateAIFeedback = () => {
    // Get scored criteria
    const scoredCriteria = criteriaScores.filter((c) => c.score > 0);
    const strengths = scoredCriteria.filter((c) => c.score >= 3);
    const improvements = scoredCriteria.filter((c) => c.score <= 2);

    let feedback = '';

    if (strengths.length > 0) {
      feedback += '**Strengths demonstrated:**\n';
      strengths.forEach((c) => {
        feedback += `- ${c.criterionText} (${scoreLabels[c.score].label})\n`;
      });
      feedback += '\n';
    }

    if (improvements.length > 0) {
      feedback += '**Areas for development:**\n';
      improvements.forEach((c) => {
        feedback += `- ${c.criterionText} - needs further practice\n`;
      });
      feedback += '\n';
    }

    // Add grade-specific guidance
    if (gradeCalculation.grade === 'Distinction') {
      feedback +=
        'Outstanding work! You have exceeded expectations across the assessment criteria.';
    } else if (gradeCalculation.grade === 'Merit') {
      feedback +=
        'Very good performance. Continue to build on your strengths while addressing the development areas.';
    } else if (gradeCalculation.grade === 'Pass') {
      feedback +=
        'You have met the required standard. Focus on the areas for development to achieve higher grades.';
    } else if (gradeCalculation.grade === 'Refer') {
      feedback +=
        'Some criteria require resubmission. Please review the feedback and gather additional evidence.';
    } else {
      feedback +=
        'Please review the assessment criteria carefully and work with your assessor to improve.';
    }

    setOverallFeedback(feedback);
  };

  const assessedCount = criteriaScores.filter((c) => c.score > 0).length;
  const totalCriteria = criteriaScores.length;

  if (!grade) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col bg-[hsl(0_0%_8%)] border-white/[0.08]">
        <DialogHeader>
          <DialogTitle className="text-white">Rubric grading</DialogTitle>
          <DialogDescription className="text-white">
            {grade?.unit_name} - {student?.name}
          </DialogDescription>
        </DialogHeader>

        {/* Grade Summary Bar */}
        <div className="flex items-center gap-4 p-3 rounded-xl bg-[hsl(0_0%_12%)] border border-white/[0.06]">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-white">Overall grade</span>
              <Pill tone="yellow">{gradeCalculation.grade}</Pill>
            </div>
            <Progress value={gradeCalculation.percentage} className="h-2" />
            <p className="text-xs text-white mt-1">
              {assessedCount}/{totalCriteria} criteria assessed ({gradeCalculation.percentage}%)
            </p>
          </div>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex-1 overflow-hidden flex flex-col"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="criteria">Criteria</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
            <TabsTrigger value="signoff">Sign off</TabsTrigger>
          </TabsList>

          {/* Criteria Scoring Tab */}
          <TabsContent value="criteria" className="flex-1 overflow-y-auto mt-4 space-y-4">
            {Object.entries(groupedCriteria).map(([category, criteria]) => (
              <div key={category}>
                <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                  <span className="w-1 h-4 bg-elec-yellow rounded-full"></span>
                  {category}
                </h3>
                <div className="space-y-2">
                  {criteria.map((criterion) => {
                    const score = criteriaScores.find((c) => c.criterionCode === criterion.code);
                    const currentScore = score?.score || 0;

                    return (
                      <div key={criterion.code} className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-xl">
                        <div className="p-3">
                          <div className="flex items-start gap-3">
                            <Pill tone="yellow" className="font-mono shrink-0">
                              {criterion.code}
                            </Pill>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-white">{criterion.text}</p>
                              <div className="flex items-center gap-2 mt-2">
                                {scoreLabels.map((sl) => (
                                  <button
                                    key={sl.value}
                                    type="button"
                                    className={cn(
                                      'text-xs px-2 py-1 h-auto rounded-full border border-white/[0.08] bg-[hsl(0_0%_9%)] text-white font-medium transition-colors touch-manipulation',
                                      currentScore === sl.value && `${sl.color} border-2`
                                    )}
                                    onClick={() =>
                                      updateCriterionScore(criterion.code, 'score', sl.value)
                                    }
                                  >
                                    {sl.value === 0 ? '-' : sl.value}
                                  </button>
                                ))}
                                <span className="text-xs text-white ml-2">
                                  {scoreLabels[currentScore].label}
                                </span>
                              </div>
                              {currentScore > 0 && (
                                <div className="mt-2">
                                  <Textarea
                                    placeholder="Criterion-specific feedback..."
                                    value={score?.feedback || ''}
                                    onChange={(e) =>
                                      updateCriterionScore(
                                        criterion.code,
                                        'feedback',
                                        e.target.value
                                      )
                                    }
                                    className={cn(textareaClass, 'min-h-[40px] text-sm')}
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </TabsContent>

          {/* Feedback Tab */}
          <TabsContent value="feedback" className="flex-1 overflow-y-auto mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <label className={fieldLabelClass}>Overall feedback</label>
              <SecondaryButton size="sm" onClick={generateAIFeedback}>
                Generate with AI
              </SecondaryButton>
            </div>
            <Textarea
              value={overallFeedback}
              onChange={(e) => setOverallFeedback(e.target.value)}
              placeholder="Provide comprehensive feedback for the student..."
              className={cn(textareaClass, 'min-h-[200px]')}
            />

            {/* Criteria Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <div className="bg-elec-yellow/10 border border-elec-yellow/20 rounded-xl">
                <div className="p-3 text-center">
                  <p className="text-lg font-bold text-elec-yellow">
                    {criteriaScores.filter((c) => c.score === 4).length}
                  </p>
                  <p className="text-xs text-white">Exceeded</p>
                </div>
              </div>
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                <div className="p-3 text-center">
                  <p className="text-lg font-bold text-emerald-400">
                    {criteriaScores.filter((c) => c.score === 3).length}
                  </p>
                  <p className="text-xs text-white">Met</p>
                </div>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl">
                <div className="p-3 text-center">
                  <p className="text-lg font-bold text-amber-400">
                    {criteriaScores.filter((c) => c.score === 2).length}
                  </p>
                  <p className="text-xs text-white">Partially</p>
                </div>
              </div>
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl">
                <div className="p-3 text-center">
                  <p className="text-lg font-bold text-red-400">
                    {criteriaScores.filter((c) => c.score === 1).length}
                  </p>
                  <p className="text-xs text-white">Not met</p>
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <Separator />
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-white">Discussion & comments</h3>
              <p className="text-xs text-white">
                Leave notes, request feedback, or discuss with colleagues using @mentions
              </p>
              <CommentThread contextType="assessment" contextId={grade.id} />
            </div>
          </TabsContent>

          {/* Sign Off Tab */}
          <TabsContent value="signoff" className="flex-1 overflow-y-auto mt-4 space-y-4">
            <div className="bg-[hsl(0_0%_12%)] border border-elec-yellow/20 rounded-xl">
              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-white">Assessment summary</h3>
                    <p className="text-sm text-white">{grade?.unit_name}</p>
                  </div>
                  <Pill tone="yellow" className="text-lg px-4 py-1">
                    {gradeCalculation.grade}
                  </Pill>
                </div>

                <div className="grid grid-cols-2 gap-4 p-3 bg-white/[0.04] rounded-xl">
                  <div>
                    <p className="text-xs text-white">Student</p>
                    <p className="font-medium text-white">{student?.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white">Score</p>
                    <p className="font-medium text-white">{gradeCalculation.percentage}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-white">Criteria assessed</p>
                    <p className="font-medium text-white">
                      {assessedCount}/{totalCriteria}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-white">Assessment type</p>
                    <p className="font-medium text-white">{grade?.assessment_type}</p>
                  </div>
                </div>

                <Field label="Assessed by" required>
                  <Select value={assessorId} onValueChange={setAssessorId}>
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

                <div className="flex items-start gap-3 p-3 rounded-xl border border-amber-500/30 bg-amber-500/10">
                  <Checkbox
                    id="signoff"
                    checked={signedOff}
                    onCheckedChange={(checked) => setSignedOff(checked as boolean)}
                    className={checkboxClass}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="signoff"
                      className="text-sm font-medium leading-none cursor-pointer text-white"
                    >
                      I confirm this assessment is accurate
                    </label>
                    <p className="text-xs text-white">
                      By signing off, you confirm that you have assessed all criteria fairly and
                      provided appropriate feedback.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="border-t border-white/[0.06] pt-4">
          <SecondaryButton onClick={() => onOpenChange(false)} disabled={isSubmitting}>
            Cancel
          </SecondaryButton>
          <PrimaryButton
            onClick={handleSubmit}
            disabled={isSubmitting || !assessorId || !signedOff || assessedCount === 0}
          >
            {isSubmitting ? 'Saving…' : 'Submit grade'}
          </PrimaryButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
