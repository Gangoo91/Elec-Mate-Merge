
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";

interface Question {
  id: number;
  text: string;
  options: { value: number; label: string }[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "How often do you feel overwhelmed by your workload?",
    options: [
      { value: 1, label: "Never" },
      { value: 2, label: "Rarely" },
      { value: 3, label: "Sometimes" },
      { value: 4, label: "Often" },
      { value: 5, label: "Always" }
    ]
  },
  {
    id: 2,
    text: "How well do you sleep after a challenging day on site?",
    options: [
      { value: 1, label: "Very well" },
      { value: 2, label: "Well" },
      { value: 3, label: "Moderately" },
      { value: 4, label: "Poorly" },
      { value: 5, label: "Very poorly" }
    ]
  },
  {
    id: 3,
    text: "How often do you experience physical tension or headaches?",
    options: [
      { value: 1, label: "Never" },
      { value: 2, label: "Rarely" },
      { value: 3, label: "Sometimes" },
      { value: 4, label: "Often" },
      { value: 5, label: "Daily" }
    ]
  },
  {
    id: 4,
    text: "How confident do you feel about handling work challenges?",
    options: [
      { value: 1, label: "Very confident" },
      { value: 2, label: "Confident" },
      { value: 3, label: "Moderately confident" },
      { value: 4, label: "Not very confident" },
      { value: 5, label: "Not confident at all" }
    ]
  }
];

const InteractiveStressAssessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsComplete(true);
    }
  };

  const calculateStressLevel = () => {
    const total = answers.reduce((sum, answer) => sum + answer, 0);
    const average = total / answers.length;
    
    if (average <= 2) return { level: "Low", color: "text-green-400", icon: CheckCircle };
    if (average <= 3.5) return { level: "Moderate", color: "text-yellow-400", icon: AlertTriangle };
    return { level: "High", color: "text-red-400", icon: XCircle };
  };

  const getRecommendations = () => {
    const stress = calculateStressLevel();
    
    if (stress.level === "Low") {
      return [
        "Continue your current stress management practices",
        "Consider sharing your techniques with colleagues",
        "Maintain regular exercise and healthy sleep habits"
      ];
    } else if (stress.level === "Moderate") {
      return [
        "Try the breathing exercises in our Quick Tips section",
        "Consider speaking with your supervisor about workload",
        "Implement regular breaks during your workday",
        "Practice one stress reduction technique daily"
      ];
    } else {
      return [
        "Consider speaking with a mental health professional",
        "Contact your training provider about support options",
        "Try multiple stress reduction techniques daily",
        "Speak with your supervisor about managing workload",
        "Consider calling Samaritans (116 123) if you need immediate support"
      ];
    }
  };

  const resetAssessment = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setIsComplete(false);
  };

  if (isComplete) {
    const stress = calculateStressLevel();
    const Icon = stress.icon;
    
    return (
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Icon className={`h-6 w-6 ${stress.color}`} />
            Your Stress Level: {stress.level}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <h4 className="font-semibold text-white">Personalised Recommendations:</h4>
            <ul className="space-y-2">
              {getRecommendations().map((rec, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <div className="h-1.5 w-1.5 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
                  {rec}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button 
              onClick={resetAssessment}
              variant="outline"
              size="sm"
              className="border-elec-yellow/20 hover:bg-elec-yellow/10"
            >
              Retake Assessment
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="text-elec-yellow">Quick Stress Assessment</CardTitle>
        <div className="space-y-2">
          <Progress value={((currentQuestion + 1) / questions.length) * 100} className="h-2" />
          <p className="text-sm text-muted-foreground">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white">
            {questions[currentQuestion].text}
          </h3>
          
          <div className="space-y-2">
            {questions[currentQuestion].options.map((option) => (
              <Button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                variant="outline"
                className="w-full justify-start border-elec-yellow/20 hover:bg-elec-yellow/10"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InteractiveStressAssessment;
