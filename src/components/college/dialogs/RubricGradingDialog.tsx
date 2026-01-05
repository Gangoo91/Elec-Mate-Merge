import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CommentThread } from "@/components/college/comments";
import { useCollege } from "@/contexts/CollegeContext";
import {
  CheckSquare,
  Loader2,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  XCircle,
  ClipboardCheck,
  Target,
  Award,
  MessageSquare,
  FileCheck,
  PenLine,
} from "lucide-react";

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
  { code: "PB1", text: "Select and install enclosures and mounting systems", category: "Panel Building" },
  { code: "PB2", text: "Install busbars and distribution systems", category: "Panel Building" },
  { code: "PB3", text: "Install circuit protection devices", category: "Panel Building" },
  { code: "WS1", text: "Install cable containment systems", category: "Wiring Systems" },
  { code: "WS2", text: "Install cables in containment systems", category: "Wiring Systems" },
  { code: "WS3", text: "Install and terminate SWA cables", category: "Wiring Systems" },
  { code: "FF1", text: "Identify symptoms and causes of faults", category: "Fault Finding" },
  { code: "FF2", text: "Apply safe isolation procedures", category: "Fault Finding" },
  { code: "TS1", text: "Conduct visual inspections", category: "Testing" },
  { code: "TS2", text: "Test continuity of protective conductors", category: "Testing" },
  { code: "TS3", text: "Test insulation resistance", category: "Testing" },
  { code: "SW1", text: "Conduct risk assessments", category: "Safe Working" },
  { code: "SW2", text: "Select and use appropriate PPE", category: "Safe Working" },
];

const scoreLabels = [
  { value: 0, label: "Not Assessed", color: "bg-muted text-muted-foreground" },
  { value: 1, label: "Not Met", color: "bg-destructive/20 text-destructive" },
  { value: 2, label: "Partially Met", color: "bg-amber-500/20 text-amber-500" },
  { value: 3, label: "Met", color: "bg-success/20 text-success" },
  { value: 4, label: "Exceeded", color: "bg-elec-yellow/20 text-elec-yellow" },
];

export function RubricGradingDialog({ open, onOpenChange, assessmentId }: RubricGradingDialogProps) {
  const { assessments, students, staff, gradeAssessment } = useCollege();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("criteria");
  const [assessorId, setAssessorId] = useState("");
  const [overallFeedback, setOverallFeedback] = useState("");
  const [signedOff, setSignedOff] = useState(false);
  const [criteriaScores, setCriteriaScores] = useState<CriterionScore[]>([]);

  // Get the selected assessment
  const assessment = assessments.find(a => a.id === assessmentId);
  const student = assessment ? students.find(s => s.id === assessment.studentId) : null;
  const assessors = staff.filter(s => ['tutor', 'assessor', 'iqa'].includes(s.role));

  // Initialize criteria scores when dialog opens
  useEffect(() => {
    if (open && assessmentId) {
      const initialScores = defaultCriteria.map(c => ({
        criterionCode: c.code,
        criterionText: c.text,
        score: 0,
        feedback: "",
        evidenceLinked: false,
      }));
      setCriteriaScores(initialScores);
      setActiveTab("criteria");
      setSignedOff(false);
      setOverallFeedback("");
    }
  }, [open, assessmentId]);

  // Calculate grade based on criteria scores
  const gradeCalculation = useMemo(() => {
    const assessedCriteria = criteriaScores.filter(c => c.score > 0);
    if (assessedCriteria.length === 0) {
      return { grade: "Not Graded", percentage: 0, color: "bg-muted text-muted-foreground" };
    }

    const totalScore = assessedCriteria.reduce((sum, c) => sum + c.score, 0);
    const maxPossible = assessedCriteria.length * 4;
    const percentage = Math.round((totalScore / maxPossible) * 100);

    let grade = "Not Yet Competent";
    let color = "bg-destructive/20 text-destructive";

    if (percentage >= 90) {
      grade = "Distinction";
      color = "bg-elec-yellow/20 text-elec-yellow";
    } else if (percentage >= 75) {
      grade = "Merit";
      color = "bg-info/20 text-info";
    } else if (percentage >= 60) {
      grade = "Pass";
      color = "bg-success/20 text-success";
    } else if (percentage >= 40) {
      grade = "Refer";
      color = "bg-amber-500/20 text-amber-500";
    }

    // Check if any criteria are "Not Met"
    const hasNotMet = assessedCriteria.some(c => c.score === 1);
    if (hasNotMet && percentage >= 60) {
      grade = "Refer";
      color = "bg-amber-500/20 text-amber-500";
    }

    return { grade, percentage, color };
  }, [criteriaScores]);

  // Group criteria by category
  const groupedCriteria = useMemo(() => {
    const groups: Record<string, typeof defaultCriteria> = {};
    defaultCriteria.forEach(c => {
      if (!groups[c.category]) {
        groups[c.category] = [];
      }
      groups[c.category].push(c);
    });
    return groups;
  }, []);

  const updateCriterionScore = (code: string, field: keyof CriterionScore, value: any) => {
    setCriteriaScores(prev =>
      prev.map(c =>
        c.criterionCode === code ? { ...c, [field]: value } : c
      )
    );
  };

  const handleSubmit = async () => {
    if (!assessmentId || !assessorId) return;

    setIsSubmitting(true);

    try {
      const assessor = staff.find(s => s.id === assessorId);

      gradeAssessment(
        assessmentId,
        gradeCalculation.grade,
        gradeCalculation.percentage,
        overallFeedback,
        assessorId,
        assessor?.name || 'Unknown'
      );

      onOpenChange(false);
    } catch (error) {
      console.error("Failed to record grade:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateAIFeedback = () => {
    // Get scored criteria
    const scoredCriteria = criteriaScores.filter(c => c.score > 0);
    const strengths = scoredCriteria.filter(c => c.score >= 3);
    const improvements = scoredCriteria.filter(c => c.score <= 2);

    let feedback = "";

    if (strengths.length > 0) {
      feedback += "**Strengths demonstrated:**\n";
      strengths.forEach(c => {
        feedback += `- ${c.criterionText} (${scoreLabels[c.score].label})\n`;
      });
      feedback += "\n";
    }

    if (improvements.length > 0) {
      feedback += "**Areas for development:**\n";
      improvements.forEach(c => {
        feedback += `- ${c.criterionText} - needs further practice\n`;
      });
      feedback += "\n";
    }

    // Add grade-specific guidance
    if (gradeCalculation.grade === "Distinction") {
      feedback += "Outstanding work! You have exceeded expectations across the assessment criteria.";
    } else if (gradeCalculation.grade === "Merit") {
      feedback += "Very good performance. Continue to build on your strengths while addressing the development areas.";
    } else if (gradeCalculation.grade === "Pass") {
      feedback += "You have met the required standard. Focus on the areas for development to achieve higher grades.";
    } else if (gradeCalculation.grade === "Refer") {
      feedback += "Some criteria require resubmission. Please review the feedback and gather additional evidence.";
    } else {
      feedback += "Please review the assessment criteria carefully and work with your assessor to improve.";
    }

    setOverallFeedback(feedback);
  };

  const assessedCount = criteriaScores.filter(c => c.score > 0).length;
  const totalCriteria = criteriaScores.length;

  if (!assessment) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ClipboardCheck className="h-5 w-5 text-elec-yellow" />
            Rubric Grading
          </DialogTitle>
          <DialogDescription>
            {assessment.unitTitle} - {student?.name}
          </DialogDescription>
        </DialogHeader>

        {/* Grade Summary Bar */}
        <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 border border-border">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium">Overall Grade</span>
              <Badge className={gradeCalculation.color}>
                <Award className="h-3 w-3 mr-1" />
                {gradeCalculation.grade}
              </Badge>
            </div>
            <Progress value={gradeCalculation.percentage} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {assessedCount}/{totalCriteria} criteria assessed ({gradeCalculation.percentage}%)
            </p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 overflow-hidden flex flex-col">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="criteria" className="gap-1">
              <Target className="h-4 w-4" />
              Criteria
            </TabsTrigger>
            <TabsTrigger value="feedback" className="gap-1">
              <MessageSquare className="h-4 w-4" />
              Feedback
            </TabsTrigger>
            <TabsTrigger value="signoff" className="gap-1">
              <FileCheck className="h-4 w-4" />
              Sign Off
            </TabsTrigger>
          </TabsList>

          {/* Criteria Scoring Tab */}
          <TabsContent value="criteria" className="flex-1 overflow-y-auto mt-4 space-y-4">
            {Object.entries(groupedCriteria).map(([category, criteria]) => (
              <div key={category}>
                <h3 className="text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-2">
                  <span className="w-1 h-4 bg-elec-yellow rounded-full"></span>
                  {category}
                </h3>
                <div className="space-y-2">
                  {criteria.map(criterion => {
                    const score = criteriaScores.find(c => c.criterionCode === criterion.code);
                    const currentScore = score?.score || 0;

                    return (
                      <Card key={criterion.code} className="border-border">
                        <CardContent className="p-3">
                          <div className="flex items-start gap-3">
                            <Badge variant="outline" className="font-mono shrink-0">
                              {criterion.code}
                            </Badge>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium">{criterion.text}</p>
                              <div className="flex items-center gap-2 mt-2">
                                {scoreLabels.map(sl => (
                                  <Button
                                    key={sl.value}
                                    variant="outline"
                                    size="sm"
                                    className={`text-xs px-2 py-1 h-auto ${
                                      currentScore === sl.value
                                        ? sl.color + " border-2"
                                        : ""
                                    }`}
                                    onClick={() => updateCriterionScore(criterion.code, "score", sl.value)}
                                  >
                                    {sl.value === 0 ? "-" : sl.value}
                                  </Button>
                                ))}
                                <span className="text-xs text-muted-foreground ml-2">
                                  {scoreLabels[currentScore].label}
                                </span>
                              </div>
                              {currentScore > 0 && (
                                <div className="mt-2">
                                  <Textarea
                                    placeholder="Criterion-specific feedback..."
                                    value={score?.feedback || ""}
                                    onChange={(e) => updateCriterionScore(criterion.code, "feedback", e.target.value)}
                                    className="min-h-[40px] text-sm"
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            ))}
          </TabsContent>

          {/* Feedback Tab */}
          <TabsContent value="feedback" className="flex-1 overflow-y-auto mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <Label>Overall Feedback</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={generateAIFeedback}
                className="gap-1"
              >
                <Sparkles className="h-3 w-3 text-elec-yellow" />
                Generate with AI
              </Button>
            </div>
            <Textarea
              value={overallFeedback}
              onChange={(e) => setOverallFeedback(e.target.value)}
              placeholder="Provide comprehensive feedback for the student..."
              className="min-h-[200px]"
            />

            {/* Criteria Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <Card className="bg-elec-yellow/10 border-elec-yellow/20">
                <CardContent className="p-3 text-center">
                  <p className="text-lg font-bold text-elec-yellow">
                    {criteriaScores.filter(c => c.score === 4).length}
                  </p>
                  <p className="text-xs text-muted-foreground">Exceeded</p>
                </CardContent>
              </Card>
              <Card className="bg-success/10 border-success/20">
                <CardContent className="p-3 text-center">
                  <p className="text-lg font-bold text-success">
                    {criteriaScores.filter(c => c.score === 3).length}
                  </p>
                  <p className="text-xs text-muted-foreground">Met</p>
                </CardContent>
              </Card>
              <Card className="bg-amber-500/10 border-amber-500/20">
                <CardContent className="p-3 text-center">
                  <p className="text-lg font-bold text-amber-500">
                    {criteriaScores.filter(c => c.score === 2).length}
                  </p>
                  <p className="text-xs text-muted-foreground">Partially</p>
                </CardContent>
              </Card>
              <Card className="bg-destructive/10 border-destructive/20">
                <CardContent className="p-3 text-center">
                  <p className="text-lg font-bold text-destructive">
                    {criteriaScores.filter(c => c.score === 1).length}
                  </p>
                  <p className="text-xs text-muted-foreground">Not Met</p>
                </CardContent>
              </Card>
            </div>

            {/* Comments Section */}
            <Separator />
            <div className="space-y-2">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Discussion & Comments
              </h3>
              <p className="text-xs text-muted-foreground">
                Leave notes, request feedback, or discuss with colleagues using @mentions
              </p>
              <CommentThread
                contextType="assessment"
                contextId={assessment.id}
              />
            </div>
          </TabsContent>

          {/* Sign Off Tab */}
          <TabsContent value="signoff" className="flex-1 overflow-y-auto mt-4 space-y-4">
            <Card className="border-elec-yellow/20">
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Assessment Summary</h3>
                    <p className="text-sm text-muted-foreground">{assessment.unitTitle}</p>
                  </div>
                  <Badge className={gradeCalculation.color + " text-lg px-4 py-1"}>
                    {gradeCalculation.grade}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="text-xs text-muted-foreground">Student</p>
                    <p className="font-medium">{student?.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Score</p>
                    <p className="font-medium">{gradeCalculation.percentage}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Criteria Assessed</p>
                    <p className="font-medium">{assessedCount}/{totalCriteria}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Assessment Type</p>
                    <p className="font-medium">{assessment.assessmentType}</p>
                  </div>
                </div>

                <div>
                  <Label>Assessed By *</Label>
                  <Select value={assessorId} onValueChange={setAssessorId}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select assessor" />
                    </SelectTrigger>
                    <SelectContent>
                      {assessors.map(assessor => (
                        <SelectItem key={assessor.id} value={assessor.id}>
                          {assessor.name} ({assessor.role})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg border border-amber-500/30 bg-amber-500/10">
                  <Checkbox
                    id="signoff"
                    checked={signedOff}
                    onCheckedChange={(checked) => setSignedOff(checked as boolean)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="signoff"
                      className="text-sm font-medium leading-none cursor-pointer"
                    >
                      I confirm this assessment is accurate
                    </label>
                    <p className="text-xs text-muted-foreground">
                      By signing off, you confirm that you have assessed all criteria fairly and provided appropriate feedback.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <DialogFooter className="border-t pt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !assessorId || !signedOff || assessedCount === 0}
            className="gap-2 bg-elec-yellow hover:bg-elec-yellow/90 text-black"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4" />
                Submit Grade
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
