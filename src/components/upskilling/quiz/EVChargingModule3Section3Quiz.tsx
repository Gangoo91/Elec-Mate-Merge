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
    question: 'What is the minimum RCD type normally required to protect an EV charging point?',
    options: ['A Type AC RCD', 'No RCD is required', 'A Type A RCD', 'A Type B RCD'],
    correctAnswer: 2,
    explanation:
      'A Type A RCD is the minimum, protecting against AC and pulsating DC residual currents; a Type B RCD (or equivalent DC-fault detection) is used where smooth DC fault current can occur.',
  },
  {
    id: 2,
    question: 'For a 7.4 kW (32 A) EV charging circuit, which protective device rating is suitable?',
    options: ['A 32 A Type C MCB', 'A 40 A Type B MCB', 'A 32 A Type B MCB', 'A 50 A Type B MCB'],
    correctAnswer: 1,
    explanation:
      'A 40 A Type B device suits a sustained 32 A load, providing headroom above the design current while still meeting the cable’s protection requirements.',
  },
  {
    id: 3,
    question:
      'What minimum mounting height is recommended for EV charging equipment in livestock areas?',
    options: ['1.8 m', '2.0 m', '3.0 m', '2.5 m'],
    correctAnswer: 3,
    explanation:
      'Around 2.5 m is recommended so animals cannot contact or damage the equipment, while it remains reasonably accessible for people.',
  },
  {
    id: 4,
    question: 'What is a sensible minimum burial depth for an EV charging supply cable in open ground?',
    options: ['450 mm', '900 mm', '600 mm', '300 mm'],
    correctAnswer: 2,
    explanation:
      'A minimum of about 600 mm is used in open ground, increasing to around 750 mm under driveways and other areas subject to vehicle traffic.',
  },
  {
    id: 5,
    question:
      'Which material property is most critical for the longevity of outdoor EV charging equipment?',
    options: [
      'Its overall cost effectiveness',
      'UV (ultraviolet) resistance',
      'Its aesthetic appearance',
      'Its electrical conductivity',
    ],
    correctAnswer: 1,
    explanation:
      'UV resistance is critical because sunlight degrades plastics, cable sheaths and coatings over time, leading to cracking, exposed conductors and premature failure.',
  },
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
    if (percentage >= 80)
      return 'Excellent! You have a strong understanding of outdoor EV charging installations.';
    if (percentage >= 60)
      return 'Good work! Review the areas you missed to strengthen your knowledge.';
    return 'Keep studying! Review the section content and try again.';
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
            <div className="text-2xl text-foreground">{percentage.toFixed(0)}%</div>
            <Badge
              variant={
                percentage >= 80 ? 'default' : percentage >= 60 ? 'secondary' : 'destructive'
              }
              className="text-lg px-4 py-2"
            >
              {percentage >= 80 ? 'Excellent' : percentage >= 60 ? 'Good' : 'Needs Improvement'}
            </Badge>
            <p className="text-gray-300">{getScoreMessage(score)}</p>
          </div>

          <div className="space-y-3">
            <h3 className="text-foreground font-semibold">Question Review:</h3>
            {quizQuestions.map((question, index) => (
              <div
                key={question.id}
                className="bg-elec-dark/50 p-3 rounded-lg border border-elec-yellow/20"
              >
                <div className="flex items-start gap-2">
                  {selectedAnswers[index] === question.correctAnswer ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className="text-foreground text-sm font-medium">{question.question}</p>
                    <p className="text-gray-300 text-sm">
                      Your answer: {question.options[selectedAnswers[index]] || 'Not answered'}
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
          <h3 className="text-foreground text-lg font-semibold mb-4">{currentQ.question}</h3>

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
