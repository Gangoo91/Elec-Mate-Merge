
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, XCircle, RotateCcw, Brain } from "lucide-react";

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
}

const CulturalAwarenessQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions: QuizQuestion[] = [
    {
      id: 1,
      question: "What's the most appropriate way to address a senior electrician you haven't met before?",
      options: [
        "Alright mate, how's it going?",
        "Good morning, I'm [your name], the new apprentice",
        "Hey there!",
        "What's up?"
      ],
      correctAnswer: 1,
      explanation: "Professional introductions show respect and help establish good working relationships from the start.",
      category: "Professional Communication"
    },
    {
      id: 2,
      question: "If you don't understand a technical instruction, what should you do?",
      options: [
        "Pretend you understand and figure it out later",
        "Ask for clarification immediately",
        "Wait until break time to ask",
        "Ask another apprentice instead"
      ],
      correctAnswer: 1,
      explanation: "Safety is paramount in electrical work. Always ask for clarification if you're unsure about any instruction.",
      category: "Safety Communication"
    },
    {
      id: 3,
      question: "What's the best response if a colleague uses unfamiliar electrical slang?",
      options: [
        "Ignore it and hope to understand from context",
        "Politely ask what the term means",
        "Pretend you know what they mean",
        "Look it up later without asking"
      ],
      correctAnswer: 1,
      explanation: "Learning industry terminology is part of your development. Most colleagues are happy to explain terms to apprentices.",
      category: "Learning Culture"
    },
    {
      id: 4,
      question: "How should you handle a situation where you've made a mistake?",
      options: [
        "Try to fix it quietly without telling anyone",
        "Report it immediately to your supervisor",
        "Wait to see if anyone notices",
        "Blame it on someone else"
      ],
      correctAnswer: 1,
      explanation: "Honesty about mistakes is crucial for safety and learning. It shows maturity and responsibility.",
      category: "Professional Integrity"
    },
    {
      id: 5,
      question: "What's the appropriate way to join a conversation among experienced electricians?",
      options: [
        "Jump in with your own stories",
        "Listen and contribute when appropriate",
        "Stay completely silent",
        "Change the subject to something you know"
      ],
      correctAnswer: 1,
      explanation: "Active listening and thoughtful contribution shows respect and helps you learn from experienced colleagues.",
      category: "Workplace Integration"
    }
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    setShowResult(true);
  };

  const handleContinue = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers([]);
    setQuizCompleted(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) {
      return "Excellent! You have a strong understanding of workplace culture.";
    } else if (percentage >= 60) {
      return "Good work! You're developing solid cultural awareness.";
    } else {
      return "Keep learning! Review the explanations and practice more.";
    }
  };

  if (quizCompleted) {
    return (
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-elec-yellow">
            <Brain className="h-6 w-6" />
            Quiz Complete!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-elec-yellow mb-2">
              {score}/{questions.length}
            </div>
            <div className="text-lg text-muted-foreground mb-4">
              {Math.round((score / questions.length) * 100)}% Score
            </div>
            <Alert className="border-green-500/50 bg-green-500/10 mb-4">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <AlertDescription className="text-green-200">
                {getScoreMessage()}
              </AlertDescription>
            </Alert>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-elec-yellow">Review Your Answers:</h3>
            {questions.map((question, index) => (
              <Card key={question.id} className="border-elec-yellow/10 bg-elec-gray/50">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3 mb-2">
                    {answers[index] === question.correctAnswer ? (
                      <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium text-sm mb-2">{question.question}</p>
                      <p className="text-xs text-muted-foreground mb-2">
                        <strong>Correct answer:</strong> {question.options[question.correctAnswer]}
                      </p>
                      <p className="text-xs text-green-300">{question.explanation}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {question.category}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button onClick={handleRestart} className="w-full" variant="outline">
            <RotateCcw className="mr-2 h-4 w-4" />
            Take Quiz Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-elec-yellow">
            <Brain className="h-5 w-5" />
            Cultural Awareness Quiz
          </CardTitle>
          <Badge variant="outline">
            {currentQuestion + 1} of {questions.length}
          </Badge>
        </div>
        <Progress value={progress} className="w-full" />
      </CardHeader>
      
      <CardContent className="space-y-6">
        {!showResult ? (
          <>
            <div>
              <Badge className="mb-4" variant="secondary">
                {currentQ.category}
              </Badge>
              <h3 className="text-lg font-medium mb-4">{currentQ.question}</h3>
            </div>
            
            <div className="space-y-3">
              {currentQ.options.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedAnswer === index ? "default" : "outline"}
                  className="w-full text-left justify-start h-auto p-4"
                  onClick={() => handleAnswerSelect(index)}
                >
                  <span className="mr-3 font-bold">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  {option}
                </Button>
              ))}
            </div>
            
            <Button 
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
              className="w-full"
            >
              {currentQuestion === questions.length - 1 ? "Finish Quiz" : "Next Question"}
            </Button>
          </>
        ) : (
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              {selectedAnswer === currentQ.correctAnswer ? (
                <CheckCircle className="h-8 w-8 text-green-400" />
              ) : (
                <XCircle className="h-8 w-8 text-red-400" />
              )}
              <h3 className="text-xl font-semibold">
                {selectedAnswer === currentQ.correctAnswer ? "Correct!" : "Incorrect"}
              </h3>
            </div>
            
            <Alert className="border-blue-500/50 bg-blue-500/10">
              <AlertDescription className="text-blue-200">
                <strong>Explanation:</strong> {currentQ.explanation}
              </AlertDescription>
            </Alert>
            
            {selectedAnswer !== currentQ.correctAnswer && (
              <div className="text-sm text-muted-foreground">
                <strong>Correct answer:</strong> {currentQ.options[currentQ.correctAnswer]}
              </div>
            )}
            
            <Button onClick={handleContinue} className="w-full">
              {currentQuestion === questions.length - 1 ? "View Results" : "Continue"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CulturalAwarenessQuiz;
