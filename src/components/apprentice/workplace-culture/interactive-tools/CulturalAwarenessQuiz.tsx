
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, RotateCcw, Brain, ArrowLeft, Trophy } from "lucide-react";

interface CulturalAwarenessQuizProps {
  onBack: () => void;
}

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
}

const CulturalAwarenessQuiz = ({ onBack }: CulturalAwarenessQuizProps) => {
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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Professional Communication': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Safety Communication': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'Learning Culture': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'Professional Integrity': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Workplace Integration': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      default: return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
    }
  };

  if (quizCompleted) {
    const percentage = Math.round((score / questions.length) * 100);
    const isExcellent = percentage >= 80;
    const isGood = percentage >= 60;

    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="outline"
            onClick={onBack}
            className="flex items-center gap-2 h-11 border-white/20 hover:border-cyan-500/50 hover:bg-cyan-500/10 touch-manipulation active:scale-95 transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Tools
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-white">Quiz Complete!</h2>
            <p className="text-white/60">Review your performance</p>
          </div>
        </div>

        <Card className={`bg-gradient-to-br from-elec-gray to-elec-card ${isExcellent ? 'border-green-500/30' : isGood ? 'border-cyan-500/30' : 'border-orange-500/30'} overflow-hidden relative`}>
          <div className={`absolute top-0 right-0 w-64 h-64 ${isExcellent ? 'bg-green-500/5' : isGood ? 'bg-cyan-500/5' : 'bg-orange-500/5'} rounded-full blur-3xl -translate-y-1/2 translate-x-1/2`} />
          <CardHeader className="relative text-center pb-0">
            <div className={`mx-auto p-4 rounded-2xl ${isExcellent ? 'bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/30' : isGood ? 'bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 border border-cyan-500/30' : 'bg-gradient-to-br from-orange-500/20 to-orange-500/5 border border-orange-500/30'} w-fit mb-4`}>
              <Trophy className={`h-10 w-10 ${isExcellent ? 'text-green-400' : isGood ? 'text-cyan-400' : 'text-orange-400'}`} />
            </div>
            <CardTitle className="text-white text-2xl">Final Score</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 relative text-center">
            <div>
              <div className={`text-6xl font-bold mb-2 ${isExcellent ? 'text-green-400' : isGood ? 'text-cyan-400' : 'text-orange-400'}`}>
                {score}/{questions.length}
              </div>
              <div className="text-xl text-white/70 mb-4">
                {percentage}% Score
              </div>
              <div className={`inline-block px-6 py-3 rounded-xl ${isExcellent ? 'bg-green-500/10 border border-green-500/20' : isGood ? 'bg-cyan-500/10 border border-cyan-500/20' : 'bg-orange-500/10 border border-orange-500/20'}`}>
                <p className={`${isExcellent ? 'text-green-300' : isGood ? 'text-cyan-300' : 'text-orange-300'}`}>
                  {getScoreMessage()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-cyan-500/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <CardHeader className="relative">
            <CardTitle className="text-white flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 border border-cyan-500/30">
                <Brain className="h-5 w-5 text-cyan-400" />
              </div>
              Review Your Answers
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 relative">
            {questions.map((question, index) => {
              const isCorrect = answers[index] === question.correctAnswer;
              return (
                <div
                  key={question.id}
                  className={`p-4 rounded-xl ${isCorrect ? 'bg-green-500/10 border border-green-500/20' : 'bg-red-500/10 border border-red-500/20'}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg flex-shrink-0 ${isCorrect ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                      {isCorrect ? (
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-white text-sm mb-2">{question.question}</p>
                      <p className="text-xs text-white/60 mb-2">
                        <strong className="text-white/80">Correct answer:</strong> {question.options[question.correctAnswer]}
                      </p>
                      <p className="text-xs text-green-300/80">{question.explanation}</p>
                      <Badge variant="outline" className={`mt-3 text-xs ${getCategoryColor(question.category)}`}>
                        {question.category}
                      </Badge>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
              <Button
                onClick={handleRestart}
                className="h-11 bg-cyan-500 hover:bg-cyan-500/90 text-black touch-manipulation active:scale-95 transition-all"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Take Quiz Again
              </Button>
              <Button
                variant="outline"
                onClick={onBack}
                className="h-11 border-white/20 hover:border-cyan-500/50 hover:bg-cyan-500/10 touch-manipulation active:scale-95 transition-all"
              >
                Back to Tools
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex items-center gap-2 h-11 border-white/20 hover:border-cyan-500/50 hover:bg-cyan-500/10 touch-manipulation active:scale-95 transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Tools
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-white">Cultural Awareness Quiz</h2>
          <p className="text-white/60">Test your workplace culture knowledge</p>
        </div>
      </div>

      <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-cyan-500/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader className="relative">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 border border-cyan-500/30">
                <Brain className="h-5 w-5 text-cyan-400" />
              </div>
              <CardTitle className="text-white">Question {currentQuestion + 1}</CardTitle>
            </div>
            <Badge variant="outline" className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30">
              {currentQuestion + 1} of {questions.length}
            </Badge>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 transition-all duration-500 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </CardHeader>

        <CardContent className="space-y-6 relative">
          {!showResult ? (
            <>
              <div>
                <Badge variant="outline" className={`mb-4 ${getCategoryColor(currentQ.category)}`}>
                  {currentQ.category}
                </Badge>
                <h3 className="text-lg font-medium text-white">{currentQ.question}</h3>
              </div>

              <div className="space-y-3">
                {currentQ.options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className={`w-full text-left justify-start h-auto p-4 whitespace-normal transition-all ${
                      selectedAnswer === index
                        ? 'border-cyan-500 bg-cyan-500/10 text-white'
                        : 'border-white/10 hover:border-white/20 text-white/80 hover:text-white'
                    }`}
                    onClick={() => handleAnswerSelect(index)}
                  >
                    <span className="mr-3 font-bold text-cyan-400">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    <span className="flex-1">{option}</span>
                  </Button>
                ))}
              </div>

              <Button
                onClick={handleNextQuestion}
                disabled={selectedAnswer === null}
                className="w-full h-11 bg-cyan-500 hover:bg-cyan-500/90 text-black disabled:opacity-50 touch-manipulation active:scale-95 transition-all"
              >
                {currentQuestion === questions.length - 1 ? "Finish Quiz" : "Check Answer"}
              </Button>
            </>
          ) : (
            <div className="space-y-6">
              <div className={`p-6 rounded-xl text-center ${
                selectedAnswer === currentQ.correctAnswer
                  ? 'bg-green-500/10 border border-green-500/20'
                  : 'bg-red-500/10 border border-red-500/20'
              }`}>
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className={`p-3 rounded-xl ${
                    selectedAnswer === currentQ.correctAnswer ? 'bg-green-500/20' : 'bg-red-500/20'
                  }`}>
                    {selectedAnswer === currentQ.correctAnswer ? (
                      <CheckCircle className="h-8 w-8 text-green-400" />
                    ) : (
                      <XCircle className="h-8 w-8 text-red-400" />
                    )}
                  </div>
                  <h3 className={`text-2xl font-bold ${
                    selectedAnswer === currentQ.correctAnswer ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {selectedAnswer === currentQ.correctAnswer ? "Correct!" : "Incorrect"}
                  </h3>
                </div>

                {selectedAnswer !== currentQ.correctAnswer && (
                  <p className="text-white/70 mb-4">
                    <strong className="text-white">Correct answer:</strong> {currentQ.options[currentQ.correctAnswer]}
                  </p>
                )}
              </div>

              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/20 flex-shrink-0">
                    <Brain className="h-4 w-4 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-400 mb-1">Explanation</h4>
                    <p className="text-white/80 text-sm">{currentQ.explanation}</p>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleContinue}
                className="w-full h-11 bg-cyan-500 hover:bg-cyan-500/90 text-black touch-manipulation active:scale-95 transition-all"
              >
                {currentQuestion === questions.length - 1 ? "View Results" : "Next Question"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CulturalAwarenessQuiz;
