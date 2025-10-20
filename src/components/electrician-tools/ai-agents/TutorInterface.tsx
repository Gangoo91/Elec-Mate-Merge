import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraduationCap, Loader2, Upload } from "lucide-react";
import { useSimpleAgent } from '@/hooks/useSimpleAgent';
import { transformTutorOutputToPDF } from '@/utils/tutor-transformer';
import type { TutorAgentOutput } from '@/utils/tutor-transformer';
import TutorPDFButton from './TutorPDFButton';
import ReactMarkdown from 'react-markdown';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

const TutorInterface = () => {
  const [qualificationLevel, setQualificationLevel] = useState('');
  const [topicArea, setTopicArea] = useState('');
  const [learningGoal, setLearningGoal] = useState('');
  const [query, setQuery] = useState('');
  const [hasPhoto, setHasPhoto] = useState(false);
  const [result, setResult] = useState<TutorAgentOutput | null>(null);
  
  const { callAgent, isLoading, progress } = useSimpleAgent();

  const examplePrompts = [
    "Explain three-phase star and delta connections for Level 3 exam",
    "Voltage drop calculation step-by-step example",
    "What is an RCD and how does it work?",
    "Explain the difference between TN-S and TN-C-S earthing systems"
  ];

  const handleSubmit = async () => {
    if (!query.trim()) return;

    const response = await callAgent('tutor', {
      query,
      qualificationLevel,
      topicArea,
      learningGoal,
      hasPhoto
    });

    if (response?.success && response.result) {
      setResult(response.result as TutorAgentOutput);
    }
  };


  return (
    <div className="space-y-6">
      {/* Input Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-indigo-400" />
            Learning Request
          </CardTitle>
          <CardDescription>
            Ask a question or upload an installation photo for feedback
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="qualificationLevel">Qualification Level</Label>
              <Select value={qualificationLevel} onValueChange={setQualificationLevel}>
                <SelectTrigger id="qualificationLevel">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="level_2">Level 2</SelectItem>
                  <SelectItem value="level_3">Level 3</SelectItem>
                  <SelectItem value="level_4">Level 4</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="topicArea">Topic Area</Label>
              <Select value={topicArea} onValueChange={setTopicArea}>
                <SelectTrigger id="topicArea">
                  <SelectValue placeholder="Select topic" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="theory">Theory</SelectItem>
                  <SelectItem value="practical">Practical</SelectItem>
                  <SelectItem value="regulations">Regulations</SelectItem>
                  <SelectItem value="calculations">Calculations</SelectItem>
                  <SelectItem value="testing">Testing & Inspection</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="learningGoal">Learning Goal</Label>
              <Select value={learningGoal} onValueChange={setLearningGoal}>
                <SelectTrigger id="learningGoal">
                  <SelectValue placeholder="Select goal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="understand">Understand Concept</SelectItem>
                  <SelectItem value="exam_prep">Exam Preparation</SelectItem>
                  <SelectItem value="solve_problem">Solve Problem</SelectItem>
                  <SelectItem value="installation_review">Installation Review</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="query">Your Question</Label>
            <Textarea
              id="query"
              placeholder="Ask a question or describe what you'd like to learn..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>

          {/* Photo Upload (placeholder) */}
          <div className="space-y-2">
            <Label>Installation Photo (Optional)</Label>
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Photo upload will be available soon
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2"
                onClick={() => setHasPhoto(!hasPhoto)}
              >
                {hasPhoto ? 'Photo Selected' : 'Simulate Photo Upload'}
              </Button>
            </div>
          </div>

          {/* Example Prompts */}
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Example prompts:</Label>
            <div className="flex flex-wrap gap-2">
              {examplePrompts.map((prompt, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  size="sm"
                  onClick={() => setQuery(prompt)}
                  className="text-xs h-auto py-1 px-2"
                >
                  {prompt}
                </Button>
              ))}
            </div>
          </div>

          <Button 
            onClick={handleSubmit} 
            disabled={isLoading || !query.trim()}
            className="w-full"
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {progress?.message || 'Processing...'}
              </>
            ) : (
              <>
                <GraduationCap className="mr-2 h-4 w-4" />
                Get Learning Guidance
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Results Display */}
      {result && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Learning Assessment Report</CardTitle>
                <CardDescription>
                  Educational guidance for your question
                </CardDescription>
              </div>
              <TutorPDFButton
                tutorPDFData={transformTutorOutputToPDF(result, {
                  qualificationLevel,
                  topic: query
                })}
                topic={query}
                variant="outline"
                className="gap-2"
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Overview */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Overview</h3>
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <ReactMarkdown>{result.response}</ReactMarkdown>
              </div>
            </div>

            {/* Concept Explanation */}
            <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-4 space-y-3">
              <h3 className="font-semibold text-indigo-400">Concept Explanation</h3>
              <div>
                <div className="text-sm font-medium mb-1">Simple Explanation:</div>
                <p className="text-sm">{result.conceptExplanation.simpleExplanation}</p>
              </div>
              <div>
                <div className="text-sm font-medium mb-1">Technical Definition:</div>
                <p className="text-sm">{result.conceptExplanation.technicalDefinition}</p>
              </div>
              <div>
                <div className="text-sm font-medium mb-1">Real-World Analogy:</div>
                <p className="text-sm">{result.conceptExplanation.realWorldAnalogy}</p>
              </div>
            </div>

            {/* Key Points */}
            <Collapsible>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-muted rounded-lg hover:bg-muted/80">
                <h3 className="font-semibold">Key Learning Points</h3>
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 p-4 border rounded-lg space-y-3">
                {result.keyPoints.map((kp, idx) => (
                  <div key={idx} className="border-l-2 border-indigo-400 pl-4">
                    <div className="font-semibold">{kp.point}</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Why: {kp.why}
                    </div>
                  </div>
                ))}
              </CollapsibleContent>
            </Collapsible>

            {/* Exam Questions */}
            {result.examQuestions && result.examQuestions.length > 0 && (
              <Collapsible>
                <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-muted rounded-lg hover:bg-muted/80">
                  <h3 className="font-semibold">Practice Exam Questions</h3>
                  <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2 p-4 border rounded-lg space-y-4">
                  {result.examQuestions.map((q) => (
                    <div key={q.questionNumber} className="space-y-2">
                      <div className="font-semibold">
                        Question {q.questionNumber} [{q.marks} marks]
                      </div>
                      <div className="text-sm">{q.question}</div>
                      <div className="bg-muted p-3 rounded text-sm">
                        <div className="font-medium mb-1">Model Answer:</div>
                        <div>{q.modelAnswer}</div>
                      </div>
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            )}

            {/* Study Plan */}
            <Collapsible>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-muted rounded-lg hover:bg-muted/80">
                <h3 className="font-semibold">Study Plan</h3>
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 p-4 border rounded-lg space-y-3">
                <div>
                  <div className="font-medium mb-2 text-green-400">Strengths:</div>
                  <ul className="list-disc pl-5 space-y-1">
                    {result.studyPlan.strengths.map((s, idx) => (
                      <li key={idx} className="text-sm">✓ {s}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="font-medium mb-2 text-orange-400">Areas to Improve:</div>
                  <ul className="list-disc pl-5 space-y-1">
                    {result.studyPlan.weaknesses.map((w, idx) => (
                      <li key={idx} className="text-sm">⚠ {w}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="font-medium mb-2">Recommended Activities:</div>
                  <ul className="space-y-2">
                    {result.studyPlan.recommendedActivities.map((a, idx) => (
                      <li key={idx} className="text-sm border-l-2 border-blue-400 pl-3">
                        <div className="font-medium">{a.activity}</div>
                        <div className="text-muted-foreground">{a.purpose}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TutorInterface;
