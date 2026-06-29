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
      'What is the typical minimum bend radius for a multicore SWA cable when being pulled into position during installation?',
    options: [
      '6 times the overall cable diameter',
      '3 times the overall cable diameter',
      '10 times the overall cable diameter',
      '15 times the overall cable diameter',
    ],
    correctAnswer: 0,
    explanation:
      'Industry guidance gives a minimum bend radius of around 6 times the overall diameter for multicore steel wire armoured cable. A tighter radius risks damaging the armour, bedding and conductor insulation, which BS 7671 Regulation 522.8.3 prohibits.',
  },
  {
    id: 2,
    question:
      'Per IET On-Site Guide support tables, what is the maximum horizontal support spacing for a small (up to 9mm) PVC-insulated and sheathed cable run on a surface?',
    options: ['250mm', '300mm', '400mm', '550mm'],
    correctAnswer: 2,
    explanation:
      'The On-Site Guide support table gives 400mm horizontal (and 250mm vertical) for non-armoured PVC cables up to 9mm overall diameter. Adequate support satisfies the BS 7671 requirement that cables do not collapse prematurely or suffer mechanical strain.',
  },
  {
    id: 3,
    question:
      'What minimum IP rating is generally specified for enclosures and containment exposed to the weather on an outdoor EV charging installation?',
    options: ['IP44', 'IP65', 'IP54', 'IP55'],
    correctAnswer: 1,
    explanation:
      'IP65 gives complete dust protection (first digit 6) plus protection against water jets from any direction (second digit 5), which is the practical minimum for weather-exposed outdoor enclosures and containment.',
  },
  {
    id: 4,
    question:
      'What burial depth is generally recommended for a direct-buried cable running under a domestic driveway subject to vehicle loading?',
    options: ['350mm', '450mm', '500mm', '600mm'],
    correctAnswer: 3,
    explanation:
      'Under driveways and roads where vehicles pass, a burial depth of about 600mm is recommended to resist loading and reduce the risk of accidental excavation damage; 450mm is typical only in areas without vehicle access.',
  },
  {
    id: 5,
    question:
      'As a common rule of thumb, what maximum space factor is used when filling trunking to allow heat dissipation and easy cable drawing-in?',
    options: ['25%', '35%', '45%', '55%'],
    correctAnswer: 2,
    explanation:
      'A 45% space factor is the long-standing rule of thumb for trunking fill, leaving room for heat dissipation, thermal expansion and pulling additional cables in later without forcing them.',
  },
];

export const EVChargingModule3Section4Quiz = () => {
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
            Knowledge Check - Cable Routing & Containment
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
