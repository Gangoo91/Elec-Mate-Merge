import { useState } from 'react';
import { CheckCircle, XCircle, RotateCcw, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the minimum RCD type required for EV charging installations under BS 7671?",
    options: [
      "Type AC RCD",
      "Type A RCD", 
      "Type B RCD",
      "No RCD required"
    ],
    correctAnswer: 1,
    explanation: "Type A RCD is the minimum requirement for EV charging installations, providing protection against AC residual currents and pulsating DC. Type B RCD is preferred for enhanced protection."
  },
  {
    id: 2,
    question: "For a 7.4kW (32A) EV charging installation, what MCB rating should be selected?",
    options: [
      "32A Type B",
      "40A Type B",
      "32A Type C",
      "50A Type B"
    ],
    correctAnswer: 1,
    explanation: "A 40A Type B MCB should be selected to provide adequate protection while allowing for sustained 32A loading. The MCB rating must be greater than the design current."
  },
  {
    id: 3,
    question: "When installing EV charging equipment in livestock areas, what is the minimum mounting height to prevent animal interference?",
    options: [
      "1.8m",
      "2.0m",
      "2.5m",
      "3.0m"
    ],
    correctAnswer: 2,
    explanation: "A minimum height of 2.5m is recommended for equipment in livestock areas to prevent animal contact and damage whilst maintaining reasonable access for humans."
  },
  {
    id: 4,
    question: "What is the minimum depth required for direct burial of EV charging supply cables?",
    options: [
      "450mm",
      "600mm",
      "750mm",
      "900mm"
    ],
    correctAnswer: 1,
    explanation: "Direct burial cables must be installed at a minimum depth of 600mm, with 750mm required under driveways and areas subject to vehicle traffic."
  },
  {
    id: 5,
    question: "Which material consideration is most critical for outdoor EV charging equipment longevity?",
    options: [
      "Cost effectiveness",
      "Aesthetic appearance", 
      "UV resistance",
      "Electrical conductivity"
    ],
    correctAnswer: 2,
    explanation: "UV resistance is critical as UV radiation degrades plastic components, cable sheaths, and protective coatings, leading to safety risks and premature equipment failure."
  }
];

export const EVChargingModule3Section3Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
    } else {
      setShowResults(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowExplanation(selectedAnswers[currentQuestion - 1] !== undefined);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setShowExplanation(false);
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === quizQuestions[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  const getScoreMessage = (score: number) => {
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage >= 80) return "Excellent! You have a strong understanding of outdoor EV charging installations.";
    if (percentage >= 60) return "Good work! Review the areas you missed to strengthen your knowledge.";
    return "Keep studying! Review the section content and try again.";
  };

  if (showResults) {
    const score = calculateScore();
    const percentage = (score / quizQuestions.length) * 100;

    return (
      <Card className="bg-elec-gray border-elec-yellow/20 shadow-lg">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Award className="h-6 w-6 text-elec-yellow" />
            Quiz Results
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center space-y-4">
            <div className="text-4xl font-bold text-elec-yellow">
              {score}/{quizQuestions.length}
            </div>
            <div className="text-2xl text-foreground">
              {percentage.toFixed(0)}%
            </div>
            <Badge 
              variant={percentage >= 80 ? "default" : percentage >= 60 ? "secondary" : "destructive"}
              className="text-lg px-4 py-2"
            >
              {percentage >= 80 ? "Excellent" : percentage >= 60 ? "Good" : "Needs Improvement"}
            </Badge>
            <p className="text-gray-300">
              {getScoreMessage(score)}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-foreground font-semibold">Question Review:</h3>
            {quizQuestions.map((question, index) => (
              <div key={question.id} className="bg-elec-dark/50 p-3 rounded-lg border border-elec-yellow/20">
                <div className="flex items-start gap-2">
                  {selectedAnswers[index] === question.correctAnswer ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className="text-foreground text-sm font-medium">{question.question}</p>
                    <p className="text-gray-300 text-sm">
                      Your answer: {question.options[selectedAnswers[index]] || "Not answered"}
                    </p>
                    {selectedAnswers[index] !== question.correctAnswer && (
                      <p className="text-green-400 text-sm">
                        Correct answer: {question.options[question.correctAnswer]}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button 
            onClick={handleRestartQuiz}
            className="w-full bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Retake Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  const currentQ = quizQuestions[currentQuestion];
  const isAnswered = selectedAnswers[currentQuestion] !== undefined;
  const selectedAnswer = selectedAnswers[currentQuestion];

  return (
    <Card className="bg-elec-gray border-elec-yellow/20 shadow-lg">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center justify-between">
          <span className="flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-elec-yellow" />
            Section Quiz
          </span>
          <Badge variant="outline" className="border-elec-yellow text-elec-yellow">
            {currentQuestion + 1}/{quizQuestions.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-foreground text-lg font-semibold mb-4">
            {currentQ.question}
          </h3>
          
          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={isAnswered}
                variant="outline"
                className={`w-full text-left justify-start p-4 h-auto whitespace-normal transition-all duration-200 ${
                  isAnswered
                    ? index === currentQ.correctAnswer
                      ? 'border-green-500 bg-green-500/10 text-green-400'
                      : index === selectedAnswer && index !== currentQ.correctAnswer
                      ? 'border-red-500 bg-red-500/10 text-red-400'
                      : 'border-gray-600 text-gray-400'
                    : 'border-gray-600 text-foreground hover:border-elec-yellow hover:text-elec-yellow'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="font-semibold">{String.fromCharCode(65 + index)}.</span>
                  <span>{option}</span>
                  {isAnswered && index === currentQ.correctAnswer && (
                    <CheckCircle className="h-5 w-5 text-green-500 ml-auto flex-shrink-0" />
                  )}
                  {isAnswered && index === selectedAnswer && index !== currentQ.correctAnswer && (
                    <XCircle className="h-5 w-5 text-red-500 ml-auto flex-shrink-0" />
                  )}
                </div>
              </Button>
            ))}
          </div>
        </div>

        {showExplanation && (
          <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
            <h4 className="text-blue-400 font-semibold mb-2">Explanation:</h4>
            <p className="text-gray-300">{currentQ.explanation}</p>
          </div>
        )}

        <div className="flex justify-between">
          <Button
            onClick={handlePreviousQuestion}
            disabled={currentQuestion === 0}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:border-elec-yellow hover:text-elec-yellow"
          >
            Previous
          </Button>
          
          <Button
            onClick={handleNextQuestion}
            disabled={!isAnswered}
            className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentQuestion === quizQuestions.length - 1 ? 'Show Results' : 'Next Question'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};