import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Sparkles,
  MessageSquare,
  Copy,
  Check,
  RotateCcw,
  ThumbsUp,
  AlertTriangle,
  Target,
  TrendingUp,
  Loader2,
  Wand2,
  ChevronRight,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AIFeedbackGeneratorProps {
  studentName?: string;
  assessmentType?: string;
  grade?: "Pass" | "Merit" | "Distinction" | "Refer" | "Not Yet Competent";
  criteria?: string[];
  existingNotes?: string;
  onFeedbackGenerated?: (feedback: string) => void;
  compact?: boolean;
}

interface FeedbackSection {
  type: "strength" | "improvement" | "action" | "encouragement";
  content: string;
}

// Feedback templates based on grade and assessment type
const feedbackTemplates = {
  Pass: {
    strengths: [
      "You have demonstrated a solid understanding of the key concepts",
      "Your work shows competence in the required skills",
      "You have met all the essential criteria for this assessment",
      "Your practical application of theory is sound",
      "You have shown the ability to work safely and methodically",
    ],
    improvements: [
      "Consider adding more technical detail to strengthen your evidence",
      "Try to include specific references to BS 7671 where applicable",
      "Think about how you could enhance the presentation of your work",
      "Include more examples from your practical experience",
      "Develop your explanation of the reasoning behind your decisions",
    ],
    actions: [
      "Review the distinction criteria and identify gaps",
      "Practice explaining your work process in more detail",
      "Seek opportunities to demonstrate additional competencies",
      "Document your work more thoroughly as you complete tasks",
    ],
    encouragement: [
      "Keep building on this foundation",
      "You're making good progress in your apprenticeship",
      "Continue to develop your skills and confidence",
    ],
  },
  Merit: {
    strengths: [
      "You have demonstrated a good understanding beyond the basic requirements",
      "Your work shows clear technical competence and knowledge application",
      "You have provided well-structured evidence with good explanations",
      "Your approach to the task was methodical and professional",
      "You have shown initiative in addressing the assessment criteria",
    ],
    improvements: [
      "To achieve distinction, consider providing more in-depth analysis",
      "Include more cross-referencing to regulations and industry standards",
      "Expand on the reasoning behind your technical decisions",
      "Consider alternative approaches and why you chose your method",
    ],
    actions: [
      "Research industry best practices to enhance your knowledge",
      "Seek out challenging tasks to demonstrate advanced skills",
      "Document your problem-solving process more thoroughly",
    ],
    encouragement: [
      "Excellent work - you're performing above the expected standard",
      "Your dedication to quality is evident",
      "You're well on your way to achieving distinction level",
    ],
  },
  Distinction: {
    strengths: [
      "Outstanding work that exceeds all expectations",
      "Your comprehensive understanding of the subject is impressive",
      "Excellent application of theory to practice with clear justification",
      "Your work demonstrates professional-level competence",
      "Exceptional attention to detail and quality throughout",
    ],
    improvements: [
      "Continue challenging yourself with complex scenarios",
      "Consider mentoring peers to reinforce your own learning",
      "Stay updated with industry developments and emerging practices",
    ],
    actions: [
      "Share your knowledge with colleagues when appropriate",
      "Seek advanced training opportunities",
      "Document your best practices for future reference",
    ],
    encouragement: [
      "Outstanding achievement - this is exemplary work",
      "You should be very proud of this accomplishment",
      "Your commitment to excellence is commendable",
    ],
  },
  Refer: {
    strengths: [
      "There are elements of your work that show potential",
      "You have made an attempt at addressing the criteria",
      "Some aspects of your submission are on the right track",
    ],
    improvements: [
      "The current submission does not fully meet the required standard",
      "Key evidence is missing or insufficient to demonstrate competence",
      "The work needs significant development before it can be assessed as competent",
      "You need to provide clearer evidence of your understanding",
      "The practical elements need to be revisited to ensure accuracy",
    ],
    actions: [
      "Review the assessment criteria carefully before resubmission",
      "Seek support from your tutor to understand the gaps",
      "Gather additional evidence that clearly demonstrates competence",
      "Take time to properly complete the work rather than rushing",
      "Use the feedback provided to guide your improvements",
    ],
    encouragement: [
      "This is an opportunity to develop your skills further",
      "Many apprentices need multiple attempts - this is normal",
      "With focused effort, you can achieve the required standard",
    ],
  },
  "Not Yet Competent": {
    strengths: [
      "You have shown willingness to engage with the assessment",
      "Some foundational understanding is emerging",
    ],
    improvements: [
      "The current submission does not demonstrate competence",
      "Fundamental concepts need to be reviewed and understood",
      "The practical skills demonstrated need significant development",
      "More time and practice is needed before this can be signed off",
    ],
    actions: [
      "Book a tutorial session to review the core concepts",
      "Practice the skills in a supervised environment",
      "Work through the learning materials again before reattempting",
      "Ask questions if any part of the criteria is unclear",
    ],
    encouragement: [
      "Learning is a journey - keep persevering",
      "Support is available to help you reach competence",
      "Focus on understanding rather than just completing tasks",
    ],
  },
};

const assessmentTypes = [
  { value: "practical", label: "Practical Assessment" },
  { value: "knowledge", label: "Knowledge Test" },
  { value: "portfolio", label: "Portfolio Evidence" },
  { value: "observation", label: "Workplace Observation" },
  { value: "project", label: "Project Work" },
  { value: "professional", label: "Professional Discussion" },
];

const feedbackStyles = [
  { value: "balanced", label: "Balanced (Standard)" },
  { value: "supportive", label: "Supportive (Encouraging)" },
  { value: "developmental", label: "Developmental (Action-focused)" },
  { value: "formal", label: "Formal (Assessment-style)" },
];

export function AIFeedbackGenerator({
  studentName = "",
  assessmentType = "practical",
  grade,
  criteria = [],
  existingNotes = "",
  onFeedbackGenerated,
  compact = false,
}: AIFeedbackGeneratorProps) {
  const [selectedGrade, setSelectedGrade] = useState<string>(grade || "");
  const [selectedType, setSelectedType] = useState(assessmentType);
  const [feedbackStyle, setFeedbackStyle] = useState("balanced");
  const [notes, setNotes] = useState(existingNotes);
  const [generatedFeedback, setGeneratedFeedback] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateFeedback = () => {
    if (!selectedGrade) return;

    setIsGenerating(true);

    setTimeout(() => {
      const templates = feedbackTemplates[selectedGrade as keyof typeof feedbackTemplates];
      if (!templates) {
        setIsGenerating(false);
        return;
      }

      const sections: FeedbackSection[] = [];

      // Pick random items from templates based on style
      const getRandomItems = (arr: string[], count: number) => {
        const shuffled = [...arr].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, count);
      };

      // Build feedback based on style
      let strengthCount = 2;
      let improvementCount = 2;
      let actionCount = 2;
      let includeEncouragement = true;

      switch (feedbackStyle) {
        case "supportive":
          strengthCount = 3;
          improvementCount = 1;
          actionCount = 1;
          break;
        case "developmental":
          strengthCount = 1;
          improvementCount = 2;
          actionCount = 3;
          includeEncouragement = false;
          break;
        case "formal":
          strengthCount = 2;
          improvementCount = 2;
          actionCount = 2;
          includeEncouragement = false;
          break;
      }

      // Strengths
      const strengths = getRandomItems(templates.strengths, strengthCount);
      strengths.forEach(s => sections.push({ type: "strength", content: s }));

      // Improvements
      const improvements = getRandomItems(templates.improvements, improvementCount);
      improvements.forEach(s => sections.push({ type: "improvement", content: s }));

      // Actions
      const actions = getRandomItems(templates.actions, actionCount);
      actions.forEach(s => sections.push({ type: "action", content: s }));

      // Encouragement
      if (includeEncouragement && templates.encouragement.length > 0) {
        const encouragement = getRandomItems(templates.encouragement, 1);
        encouragement.forEach(s => sections.push({ type: "encouragement", content: s }));
      }

      // Format feedback
      const typeLabel = assessmentTypes.find(t => t.value === selectedType)?.label || selectedType;
      let feedback = "";

      if (studentName) {
        feedback += `${studentName},\n\n`;
      }

      feedback += `Thank you for your submission for this ${typeLabel}.\n\n`;

      // Strengths section
      feedback += "**What you did well:**\n";
      sections.filter(s => s.type === "strength").forEach(s => {
        feedback += `- ${s.content}\n`;
      });
      feedback += "\n";

      // Areas for improvement
      const improvementSections = sections.filter(s => s.type === "improvement");
      if (improvementSections.length > 0) {
        feedback += "**Areas for development:**\n";
        improvementSections.forEach(s => {
          feedback += `- ${s.content}\n`;
        });
        feedback += "\n";
      }

      // Actions
      const actionSections = sections.filter(s => s.type === "action");
      if (actionSections.length > 0) {
        feedback += "**Next steps:**\n";
        actionSections.forEach(s => {
          feedback += `- ${s.content}\n`;
        });
        feedback += "\n";
      }

      // Encouragement
      const encouragementSections = sections.filter(s => s.type === "encouragement");
      if (encouragementSections.length > 0) {
        feedback += encouragementSections[0].content + "\n\n";
      }

      // Add tutor notes if provided
      if (notes.trim()) {
        feedback += "**Additional comments:**\n";
        feedback += notes + "\n\n";
      }

      // Sign off
      if (feedbackStyle === "formal") {
        feedback += "Assessed by: [Tutor Name]\nDate: " + new Date().toLocaleDateString('en-GB');
      } else {
        feedback += "Best regards,\n[Tutor Name]";
      }

      setGeneratedFeedback(feedback);
      setIsGenerating(false);
      onFeedbackGenerated?.(feedback);
    }, 1500);
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(generatedFeedback);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const regenerate = () => {
    setGeneratedFeedback("");
    generateFeedback();
  };

  if (compact) {
    return (
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-elec-yellow" />
            AI Feedback Generator
            <Badge className="bg-elec-yellow/20 text-elec-yellow text-[10px]">AI</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground mb-3">
            Generate constructive, professional feedback for student assessments
          </p>
          <div className="flex items-center justify-between p-2 rounded-lg bg-background border border-border">
            <div className="flex items-center gap-2">
              <Wand2 className="h-4 w-4 text-elec-yellow" />
              <span className="text-sm">Create personalized feedback</span>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-elec-yellow" />
          AI Feedback Generator
          <Badge className="bg-elec-yellow/20 text-elec-yellow">AI-Powered</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Configuration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="grade">Assessment Grade</Label>
            <Select value={selectedGrade} onValueChange={setSelectedGrade}>
              <SelectTrigger id="grade" className="mt-1">
                <SelectValue placeholder="Select grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Distinction">Distinction</SelectItem>
                <SelectItem value="Merit">Merit</SelectItem>
                <SelectItem value="Pass">Pass</SelectItem>
                <SelectItem value="Refer">Refer (Resubmit)</SelectItem>
                <SelectItem value="Not Yet Competent">Not Yet Competent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="type">Assessment Type</Label>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger id="type" className="mt-1">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {assessmentTypes.map(type => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="style">Feedback Style</Label>
          <Select value={feedbackStyle} onValueChange={setFeedbackStyle}>
            <SelectTrigger id="style" className="mt-1">
              <SelectValue placeholder="Select style" />
            </SelectTrigger>
            <SelectContent>
              {feedbackStyles.map(style => (
                <SelectItem key={style.value} value={style.value}>
                  {style.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="notes">Additional Notes (Optional)</Label>
          <Textarea
            id="notes"
            placeholder="Add any specific points you want to include..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="mt-1 min-h-[60px]"
          />
        </div>

        {/* Generate Button */}
        <Button
          onClick={generateFeedback}
          disabled={isGenerating || !selectedGrade}
          className="w-full gap-2 bg-elec-yellow hover:bg-elec-yellow/90 text-black"
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Generating feedback...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              Generate Feedback
            </>
          )}
        </Button>

        {/* Generated Feedback */}
        {generatedFeedback && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-elec-yellow" />
                Generated Feedback
              </h3>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={regenerate}
                  className="gap-1"
                >
                  <RotateCcw className="h-3 w-3" />
                  Regenerate
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyToClipboard}
                  className="gap-1"
                >
                  {copied ? (
                    <>
                      <Check className="h-3 w-3 text-success" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-background border border-border">
              <pre className="whitespace-pre-wrap text-sm font-sans">
                {generatedFeedback}
              </pre>
            </div>

            {/* Feedback breakdown */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-success/10 border border-success/20">
                <ThumbsUp className="h-4 w-4 text-success" />
                <span className="text-xs text-success">Strengths</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <span className="text-xs text-amber-500">Development</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-info/10 border border-info/20">
                <Target className="h-4 w-4 text-info" />
                <span className="text-xs text-info">Actions</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
                <TrendingUp className="h-4 w-4 text-elec-yellow" />
                <span className="text-xs text-elec-yellow">Encouragement</span>
              </div>
            </div>
          </div>
        )}

        {/* Tips */}
        {!generatedFeedback && (
          <div className="p-3 rounded-lg bg-info/10 border border-info/20">
            <div className="flex items-start gap-2">
              <Sparkles className="h-4 w-4 text-info mt-0.5 shrink-0" />
              <div className="text-xs text-info">
                <p className="font-medium mb-1">AI Feedback Features:</p>
                <ul className="space-y-0.5 list-disc list-inside">
                  <li>Grade-appropriate language and tone</li>
                  <li>Constructive improvement suggestions</li>
                  <li>Clear action points for development</li>
                  <li>Professional formatting ready to use</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
