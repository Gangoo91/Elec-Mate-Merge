
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, CheckCircle, XCircle, RotateCcw } from "lucide-react";
import { useState } from "react";

const RightsQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      question: "How much annual leave are apprentices entitled to?",
      options: [
        "20 days plus bank holidays",
        "15 days plus bank holidays", 
        "25 days plus bank holidays",
        "It depends on your employer"
      ],
      correct: 0,
      explanation: "Apprentices are entitled to 20 days annual leave plus bank holidays as a minimum."
    },
    {
      question: "What percentage of your time should be spent on off-the-job training?",
      options: [
        "10%",
        "15%",
        "20%",
        "25%"
      ],
      correct: 2,
      explanation: "Apprentices are entitled to a minimum of 20% off-the-job training (typically 1 day per week)."
    },
    {
      question: "Can your employer make you work overtime without extra pay?",
      options: [
        "Yes, as an apprentice you have no choice",
        "Only if it's written in your contract",
        "No, overtime must be paid at enhanced rates",
        "Only during busy periods"
      ],
      correct: 1,
      explanation: "Your contract should specify overtime arrangements. Generally, overtime should be paid at enhanced rates."
    },
    {
      question: "Who should you contact first if you have concerns about your apprenticeship?",
      options: [
        "ACAS",
        "Your training provider",
        "Citizens Advice",
        "A trade union"
      ],
      correct: 1,
      explanation: "Your training provider should be your first port of call for apprenticeship-related issues."
    },
    {
      question: "What is the current apprentice minimum wage for first year apprentices?",
      options: [
        "£5.28",
        "£6.40",
        "£7.20",
        "£10.42"
      ],
      correct: 1,
      explanation: "The apprentice minimum wage is £6.40 per hour for apprentices under 19 or in their first year."
    }
  ];

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
  };

  const getScore = () => {
    return answers.reduce((score, answer, index) => {
      return score + (answer === questions[index].correct ? 1 : 0);
    }, 0);
  };

  const getScoreColor = (score: number) => {
    if (score >= 4) return "text-green-400";
    if (score >= 3) return "text-yellow-400";
    return "text-red-400";
  };

  if (showResults) {
    const score = getScore();
    return (
      <Card className="border-blue-500/30 bg-blue-500/10">
        <CardHeader>
          <div className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-blue-400" />
            <CardTitle className="text-blue-400">Quiz Results</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <div className={`text-4xl font-bold ${getScoreColor(score)} mb-2`}>
              {score}/{questions.length}
            </div>
            <p className="text-muted-foreground">
              {score >= 4 ? "Excellent! You know your rights well." :
               score >= 3 ? "Good knowledge, but room for improvement." :
               "Consider reviewing your rights and entitlements."}
            </p>
          </div>
          
          <div className="space-y-4 mb-6">
            {questions.map((question, index) => {
              const userAnswer = answers[index];
              const isCorrect = userAnswer === question.correct;
              
              return (
                <div key={index} className="border border-blue-500/20 rounded-lg p-4">
                  <div className="flex items-start gap-2 mb-2">
                    {isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                    )}
                    <div>
                      <h4 className="font-medium text-white mb-1">{question.question}</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Your answer: {question.options[userAnswer]}
                      </p>
                      {!isCorrect && (
                        <p className="text-sm text-green-400 mb-2">
                          Correct answer: {question.options[question.correct]}
                        </p>
                      )}
                      <p className="text-xs text-blue-400">{question.explanation}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <Button onClick={resetQuiz} className="w-full">
            <RotateCcw className="h-4 w-4 mr-2" />
            Retake Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  const question = questions[currentQuestion];

  return (
    <Card className="border-blue-500/30 bg-blue-500/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-blue-400" />
            <CardTitle className="text-blue-400">Rights Assessment Quiz</CardTitle>
          </div>
          <Badge variant="outline" className="border-blue-400/40 text-blue-400">
            {currentQuestion + 1} of {questions.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <h3 className="text-lg font-medium text-white mb-4">{question.question}</h3>
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full text-left justify-start h-auto p-4 border-blue-500/20 hover:bg-blue-500/20"
                onClick={() => handleAnswer(index)}
              >
                <span className="mr-3 text-blue-400 font-bold">{String.fromCharCode(65 + index)}.</span>
                {option}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="w-full bg-elec-gray rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default RightsQuiz;
