
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  MessageCircle, 
  CheckCircle, 
  AlertCircle, 
  Lightbulb, 
  Users, 
  FileText,
  Target,
  Brain
} from "lucide-react";

const InteractiveToolsTab = () => {
  const [currentAssessment, setCurrentAssessment] = useState<number>(0);
  const [assessmentScores, setAssessmentScores] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const assessmentQuestions = [
    {
      category: "Verbal Communication",
      questions: [
        "I speak clearly and at an appropriate pace",
        "I ask questions when I don't understand something",
        "I can explain technical concepts in simple terms",
        "I listen actively to others without interrupting"
      ]
    },
    {
      category: "Non-Verbal Communication", 
      questions: [
        "I maintain appropriate eye contact during conversations",
        "My body language shows I'm engaged and respectful",
        "I'm aware of personal space boundaries",
        "I can read others' non-verbal cues effectively"
      ]
    },
    {
      category: "Written Communication",
      questions: [
        "I write clear, professional emails and messages",
        "I document my work accurately and thoroughly",
        "I check my writing for errors before sending",
        "I use appropriate tone for different audiences"
      ]
    },
    {
      category: "Difficult Situations",
      questions: [
        "I stay calm under pressure",
        "I can handle criticism constructively",
        "I speak up when I notice safety issues",
        "I can resolve conflicts professionally"
      ]
    }
  ];

  const communicationFrameworks = [
    {
      title: "STAR Method",
      description: "Structure for explaining situations professionally",
      points: [
        "Situation: Set the context",
        "Task: Describe what needed to be done", 
        "Action: Explain what you did",
        "Result: Share the outcome"
      ]
    },
    {
      title: "PREP Framework",
      description: "Quick structure for clear explanations",
      points: [
        "Point: State your main message",
        "Reason: Explain why",
        "Example: Give a specific instance",
        "Point: Restate your message"
      ]
    },
    {
      title: "5W1H Method",
      description: "Ensure complete information sharing",
      points: [
        "Who: People involved",
        "What: What happened/needs doing",
        "When: Time frame",
        "Where: Location",
        "Why: Reason/purpose",
        "How: Method/process"
      ]
    }
  ];

  const handleAssessmentScore = (questionIndex: number, score: number) => {
    const globalIndex = assessmentQuestions.slice(0, currentAssessment).reduce((acc, cat) => acc + cat.questions.length, 0) + questionIndex;
    setAssessmentScores(prev => ({
      ...prev,
      [globalIndex]: score
    }));
  };

  const nextCategory = () => {
    if (currentAssessment < assessmentQuestions.length - 1) {
      setCurrentAssessment(currentAssessment + 1);
    } else {
      setShowResults(true);
    }
  };

  const resetAssessment = () => {
    setCurrentAssessment(0);
    setAssessmentScores({});
    setShowResults(false);
  };

  const calculateResults = () => {
    const totalQuestions = assessmentQuestions.reduce((acc, cat) => acc + cat.questions.length, 0);
    const totalScore = Object.values(assessmentScores).reduce((acc, score) => acc + score, 0);
    const percentage = Math.round((totalScore / (totalQuestions * 5)) * 100);
    
    let level = "Developing";
    let color = "bg-yellow-500";
    
    if (percentage >= 80) {
      level = "Strong";
      color = "bg-green-500";
    } else if (percentage >= 60) {
      level = "Good";
      color = "bg-blue-500";
    }
    
    return { percentage, level, color, totalScore, totalQuestions };
  };

  if (showResults) {
    const results = calculateResults();
    
    return (
      <div className="space-y-6">
        <Card className="border-green-500/30 bg-gradient-to-br from-green-500/10 to-emerald-500/10">
          <CardHeader>
            <CardTitle className="text-green-400 flex items-center gap-2">
              <CheckCircle className="h-6 w-6" />
              Communication Skills Assessment Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">{results.percentage}%</div>
                <Badge className={`${results.color} text-white`}>{results.level}</Badge>
                <p className="text-sm text-muted-foreground mt-2">
                  {results.totalScore} out of {results.totalQuestions * 5} points
                </p>
              </div>
              
              <Progress value={results.percentage} className="h-3" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div>
                  <h4 className="font-medium mb-2">Strengths to Maintain:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {results.percentage >= 80 && <li>• Excellent overall communication skills</li>}
                    {results.percentage >= 60 && <li>• Good foundation in communication basics</li>}
                    <li>• Willingness to self-assess and improve</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Areas for Development:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {results.percentage < 60 && <li>• Focus on fundamental communication skills</li>}
                    {results.percentage < 80 && <li>• Practice active listening techniques</li>}
                    <li>• Continue regular self-reflection</li>
                    <li>• Seek feedback from supervisors and colleagues</li>
                  </ul>
                </div>
              </div>
              
              <Button onClick={resetAssessment} className="w-full mt-4">
                Retake Assessment
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentCategory = assessmentQuestions[currentAssessment];
  const progress = ((currentAssessment + 1) / assessmentQuestions.length) * 100;

  return (
    <div className="space-y-6">
      <Alert className="border-blue-500/50 bg-blue-500/10">
        <Lightbulb className="h-4 w-4 text-blue-400" />
        <AlertDescription className="text-blue-200">
          <strong>Communication Tools & Self-Assessment:</strong> Use these frameworks and assess your current communication skills to identify areas for improvement.
        </AlertDescription>
      </Alert>

      {/* Communication Frameworks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {communicationFrameworks.map((framework, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-elec-yellow flex items-center gap-2">
                <Brain className="h-5 w-5" />
                {framework.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground">{framework.description}</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {framework.points.map((point, pointIndex) => (
                  <li key={pointIndex} className="flex items-start gap-2 text-sm">
                    <Badge variant="outline" className="mt-0.5 h-2 w-2 rounded-full p-0 border-elec-yellow/50 bg-elec-yellow/20 flex-shrink-0" />
                    <span className="text-muted-foreground">{point}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Self-Assessment */}
      <Card className="border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-pink-500/10">
        <CardHeader>
          <CardTitle className="text-purple-400 flex items-center gap-2">
            <Target className="h-6 w-6" />
            Communication Skills Self-Assessment
          </CardTitle>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Category {currentAssessment + 1} of {assessmentQuestions.length}: {currentCategory.category}
              </span>
              <span className="text-sm text-purple-400">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <p className="text-sm text-muted-foreground">
              Rate yourself honestly on each statement (1 = Strongly Disagree, 5 = Strongly Agree):
            </p>
            
            {currentCategory.questions.map((question, index) => (
              <div key={index} className="border border-muted/30 rounded-lg p-4 bg-background/30">
                <p className="font-medium mb-3">{question}</p>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((score) => (
                    <Button
                      key={score}
                      variant={assessmentScores[assessmentQuestions.slice(0, currentAssessment).reduce((acc, cat) => acc + cat.questions.length, 0) + index] === score ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleAssessmentScore(index, score)}
                      className="min-w-[2.5rem]"
                    >
                      {score}
                    </Button>
                  ))}
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>Strongly Disagree</span>
                  <span>Strongly Agree</span>
                </div>
              </div>
            ))}
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => setCurrentAssessment(Math.max(0, currentAssessment - 1))}
                disabled={currentAssessment === 0}
              >
                Previous
              </Button>
              <Button 
                onClick={nextCategory}
                disabled={currentCategory.questions.some((_, index) => {
                  const globalIndex = assessmentQuestions.slice(0, currentAssessment).reduce((acc, cat) => acc + cat.questions.length, 0) + index;
                  return !assessmentScores[globalIndex];
                })}
              >
                {currentAssessment === assessmentQuestions.length - 1 ? "View Results" : "Next Category"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Tips */}
      <Card className="border-green-500/30 bg-gradient-to-br from-green-500/10 to-emerald-500/10">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Quick Communication Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Body Language Basics
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Maintain open posture (uncrossed arms)</li>
                <li>• Make appropriate eye contact (3-5 seconds at a time)</li>
                <li>• Match your facial expressions to your message</li>
                <li>• Use gestures to support your words</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                Voice & Tone Tips
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Speak clearly and at moderate pace</li>
                <li>• Vary your tone to maintain interest</li>
                <li>• Use pauses effectively for emphasis</li>
                <li>• Match your volume to the environment</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InteractiveToolsTab;
