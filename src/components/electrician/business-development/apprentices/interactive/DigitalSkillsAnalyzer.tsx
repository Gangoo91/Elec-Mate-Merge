import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, CheckCircle, AlertTriangle, Target } from "lucide-react";
import { useState } from "react";

const DigitalSkillsAnalyzer = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isComplete, setIsComplete] = useState(false);

  const skillsQuestions = [
    {
      category: "Technical Knowledge",
      question: "Understanding of BS 7671:2018+A2:2022 regulations",
      options: [
        { text: "Comprehensive understanding", score: 4 },
        { text: "Good working knowledge", score: 3 },
        { text: "Basic awareness", score: 2 },
        { text: "Limited knowledge", score: 1 }
      ]
    },
    {
      category: "Digital Portfolio",
      question: "Experience with digital evidence collection",
      options: [
        { text: "Proficient with digital tools", score: 4 },
        { text: "Comfortable with guidance", score: 3 },
        { text: "Basic smartphone skills", score: 2 },
        { text: "Minimal digital experience", score: 1 }
      ]
    },
    {
      category: "Health & Safety",
      question: "Risk assessment and method statement creation",
      options: [
        { text: "Can create independently", score: 4 },
        { text: "Can complete with templates", score: 3 },
        { text: "Understands basic concepts", score: 2 },
        { text: "Needs significant support", score: 1 }
      ]
    },
    {
      category: "Customer Service",
      question: "Professional communication skills",
      options: [
        { text: "Excellent interpersonal skills", score: 4 },
        { text: "Good communication abilities", score: 3 },
        { text: "Adequate social skills", score: 2 },
        { text: "Needs development", score: 1 }
      ]
    },
    {
      category: "Problem Solving",
      question: "Fault-finding and diagnostic abilities",
      options: [
        { text: "Systematic approach to problems", score: 4 },
        { text: "Good logical thinking", score: 3 },
        { text: "Basic problem-solving skills", score: 2 },
        { text: "Requires guidance", score: 1 }
      ]
    }
  ];

  const handleAnswer = (score) => {
    const newAnswers = { ...answers, [currentQuestion]: score };
    setAnswers(newAnswers);

    if (currentQuestion < skillsQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsComplete(true);
    }
  };

  const calculateResults = () => {
    const totalScore = Object.values(answers).reduce((sum: number, score: number) => sum + score, 0);
    const maxScore = skillsQuestions.length * 4;
    const percentage = (totalScore / maxScore) * 100;

    let level, recommendation, trainingFocus;
    
    if (percentage >= 85) {
      level = { text: "Advanced", color: "text-green-400", bg: "bg-green-500/10" };
      recommendation = "Excellent candidate ready for minimal supervision and accelerated progression.";
      trainingFocus = ["Leadership development", "Specialisation training", "EPA preparation"];
    } else if (percentage >= 70) {
      level = { text: "Proficient", color: "text-blue-400", bg: "bg-blue-500/10" };
      recommendation = "Strong foundation with some areas for targeted development.";
      trainingFocus = ["Digital skills enhancement", "Advanced regulations", "Customer service refinement"];
    } else if (percentage >= 55) {
      level = { text: "Developing", color: "text-amber-400", bg: "bg-amber-500/10" };
      recommendation = "Solid potential requiring structured support and training plan.";
      trainingFocus = ["Foundation skills", "Digital literacy", "Communication skills", "Safety awareness"];
    } else {
      level = { text: "Foundation", color: "text-red-400", bg: "bg-red-500/10" };
      recommendation = "Requires comprehensive support and extended development period.";
      trainingFocus = ["Basic skills development", "Intensive mentoring", "Functional skills support"];
    }

    return { totalScore, maxScore, percentage, level, recommendation, trainingFocus };
  };

  const resetAnalyzer = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setIsComplete(false);
  };

  if (isComplete) {
    const results = calculateResults();
    
    return (
      <Card className="border-blue-500/20 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Skills Gap Analysis Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Overall Score */}
            <div className="text-center">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${results.level.bg}`}>
                <Target className={`h-5 w-5 ${results.level.color}`} />
                <span className={`text-lg font-bold ${results.level.color}`}>
                  {results.level.text} Level
                </span>
              </div>
              <div className="mt-2">
                <Progress value={results.percentage} className="w-full" />
                <div className="text-sm text-muted-foreground mt-1">
                  {results.totalScore}/{results.maxScore} points ({results.percentage.toFixed(0)}%)
                </div>
              </div>
            </div>

            {/* Recommendation */}
            <div className="p-4 bg-elec-gray border border-elec-yellow/20 rounded-lg">
              <h4 className="font-semibold text-white mb-2">Recommendation</h4>
              <p className="text-muted-foreground">{results.recommendation}</p>
            </div>

            {/* Training Focus Areas */}
            <div>
              <h4 className="font-semibold text-white mb-3">Recommended Training Focus</h4>
              <div className="flex flex-wrap gap-2">
                {results.trainingFocus.map((focus, index) => (
                  <Badge key={index} variant="outline" className="text-blue-300 border-blue-400/30">
                    {focus}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Individual Category Breakdown */}
            <div>
              <h4 className="font-semibold text-white mb-3">Category Breakdown</h4>
              <div className="space-y-3">
                {skillsQuestions.map((question, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-elec-dark/50 rounded">
                    <span className="text-white">{question.category}</span>
                    <div className="flex items-center gap-2">
                      <Progress value={(answers[index] / 4) * 100} className="w-20" />
                      <span className="text-sm text-muted-foreground">{answers[index] || 0}/4</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button onClick={resetAnalyzer} variant="outline" className="w-full">
              Analyze Another Candidate
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-blue-500/20 bg-blue-500/10">
      <CardHeader>
        <CardTitle className="text-blue-400 flex items-center gap-2">
          <Brain className="h-5 w-5" />
          Digital Skills Gap Analyzer
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Progress */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-blue-200">
              Question {currentQuestion + 1} of {skillsQuestions.length}
            </span>
            <Progress value={((currentQuestion) / skillsQuestions.length) * 100} className="w-32" />
          </div>

          {/* Question */}
          <div className="p-4 bg-elec-gray border border-blue-500/20 rounded-lg">
            <h4 className="font-semibold text-blue-300 mb-2">
              {skillsQuestions[currentQuestion].category}
            </h4>
            <p className="text-white mb-4">
              {skillsQuestions[currentQuestion].question}
            </p>
            
            <div className="space-y-2">
              {skillsQuestions[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start border-blue-500/30 hover:bg-blue-500/20"
                  onClick={() => handleAnswer(option.score)}
                >
                  {option.text}
                </Button>
              ))}
            </div>
          </div>

          <div className="text-sm text-blue-200">
            This assessment helps identify training priorities and development needs for new apprentices.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DigitalSkillsAnalyzer;