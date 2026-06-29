import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, RotateCcw, Award } from 'lucide-react';
import { QuizQuestion } from '@/types/quiz';

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question:
      'When planning dual EV charging on a domestic supply with smart charging, which diversity factor is typically applied?',
    options: [
      '0.8 (around 20% diversity)',
      '1.0 (no diversity at all)',
      '0.6 (around 40% diversity)',
      '0.4 (around 60% diversity)',
    ],
    correctAnswer: 0,
    explanation:
      'Smart charging manages load dynamically, so a factor of around 0.8 is commonly used for two domestic chargers, allowing some simultaneous charging without overloading the supply.',
  },
  {
    id: 2,
    question:
      'For a typical UK residential PV-and-EV system, roughly what share of annual EV charging energy can solar realistically supply?',
    options: ['30-40%', '50-60%', '80-90%', '60-70%'],
    correctAnswer: 3,
    explanation:
      'A well-designed domestic PV array of around 6 kWp can supply roughly 60-70% of annual EV charging energy when combined with direct use and battery storage.',
  },
  {
    id: 3,
    question:
      'What minimum spare capacity is good practice to leave in cable containment for future expansion?',
    options: ['About 15%', 'About 25%', 'About 40%', 'About 50%'],
    correctAnswer: 2,
    explanation:
      'Leaving roughly 40% spare in containment allows for future cables, easier maintenance access and heat dissipation, supporting later system growth.',
  },
  {
    id: 4,
    question:
      'Which communication standard underpins Vehicle-to-Grid (V2G) charging?',
    options: ['OCPP 1.6', 'ISO 15118', 'Modbus TCP', 'IEC 61851'],
    correctAnswer: 1,
    explanation:
      'ISO 15118 enables plug-and-charge, bidirectional power flow and secure authentication between the vehicle and charging infrastructure, making it central to V2G.',
  },
  {
    id: 5,
    question:
      'Roughly what proportion of UK properties are forecast to have more than one EV by around 2030?',
    options: ['About 25%', 'About 55%', 'About 40%', 'About 70%'],
    correctAnswer: 2,
    explanation:
      'Industry forecasts suggest roughly 40% of properties could have two or more EVs by around 2030, driven by falling vehicle prices and better charging infrastructure.',
  },
];

export const EVChargingModule3Section5Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    if (quizCompleted) return;

    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === quizQuestions[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setQuizCompleted(false);
  };

  const score = calculateScore();
  const percentage = Math.round((score / quizQuestions.length) * 100);

  if (showResults) {
    return (
      <Card className="bg-elec-gray border-gray-700">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Award className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-foreground">Quiz Results</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="text-3xl font-bold text-foreground">
              {score}/{quizQuestions.length}
            </div>
            <div className="text-xl text-gray-300">{percentage}% Score</div>
            <Badge
              variant={
                percentage >= 80 ? 'default' : percentage >= 60 ? 'secondary' : 'destructive'
              }
              className="text-lg px-4 py-2"
            >
              {percentage >= 80 ? 'Excellent!' : percentage >= 60 ? 'Good' : 'Needs Improvement'}
            </Badge>
          </div>

          <div className="space-y-4">
            {quizQuestions.map((question, index) => {
              const userAnswer = selectedAnswers[index];
              const isCorrect = userAnswer === question.correctAnswer;

              return (
                <div key={question.id} className="border border-gray-600 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    {isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="text-foreground font-medium mb-2">
                        Question {index + 1}: {question.question}
                      </p>
                      <p className="text-sm text-gray-300 mb-2">
                        <span className="font-medium">Your answer:</span>{' '}
                        {question.options[userAnswer]}
                      </p>
                      {!isCorrect && (
                        <p className="text-sm text-green-400 mb-2">
                          <span className="font-medium">Correct answer:</span>{' '}
                          {question.options[question.correctAnswer]}
                        </p>
                      )}
                      <p className="text-sm text-gray-400">{question.explanation}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <Button
            onClick={resetQuiz}
            className="w-full bg-elec-yellow text-black hover:bg-yellow-600"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Retake Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-foreground">
            Knowledge Check - Future-Proofing Installations
          </CardTitle>
          <Badge variant="outline" className="text-elec-yellow border-elec-yellow">
            {currentQuestion + 1} / {quizQuestions.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            {quizQuestions[currentQuestion].question}
          </h3>

          <div className="space-y-3">
            {quizQuestions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                  selectedAnswers[currentQuestion] === index
                    ? 'border-elec-yellow bg-yellow-900/20 text-foreground'
                    : 'border-gray-600 bg-gray-800/50 text-gray-300 hover:border-gray-500 hover:bg-gray-800'
                }`}
              >
                <span className="font-medium mr-3">{String.fromCharCode(65 + index)}.</span>
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            variant="outline"
            className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800"
          >
            Previous
          </Button>

          <Button
            onClick={handleNext}
            disabled={selectedAnswers[currentQuestion] === undefined}
            className="bg-elec-yellow text-black hover:bg-yellow-600"
          >
            {currentQuestion === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
