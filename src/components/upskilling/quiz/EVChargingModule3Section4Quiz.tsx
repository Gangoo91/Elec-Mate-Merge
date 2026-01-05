import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, RotateCcw, Award } from 'lucide-react';
import { QuizQuestion } from '@/types/quiz';

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the minimum bend radius for a 10mm² SWA cable during installation?",
    options: [
      "3 times the cable diameter",
      "6 times the cable diameter", 
      "8 times the cable diameter",
      "12 times the cable diameter"
    ],
    correctAnswer: 1,
    explanation: "For SWA (Steel Wire Armoured) cables, the minimum bend radius during installation is 6 times the cable diameter. Once installed and fixed, this increases to 8 times the diameter to prevent damage to the armour and conductors."
  },
  {
    id: 2,
    question: "According to BS 7671, what is the maximum spacing for supports when installing PVC insulated cables horizontally?",
    options: [
      "300mm",
      "400mm",
      "600mm", 
      "750mm"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 requires PVC insulated cables to be supported at maximum 400mm intervals when installed horizontally, and 300mm when installed vertically. This ensures adequate support and prevents cable sag."
  },
  {
    id: 3,
    question: "What minimum IP rating is required for containment systems in external installations?",
    options: [
      "IP44",
      "IP54",
      "IP65",
      "IP68"
    ],
    correctAnswer: 2,
    explanation: "External installations require a minimum IP65 rating to provide protection against dust ingress (IP6X) and water jets from any direction (IPX5). This ensures adequate protection in outdoor environments."
  },
  {
    id: 4,
    question: "What is the minimum depth for burying EV charging cables under a domestic driveway?",
    options: [
      "300mm",
      "450mm", 
      "600mm",
      "750mm"
    ],
    correctAnswer: 2,
    explanation: "Cables under roads and driveways must be buried at a minimum depth of 600mm to provide adequate protection from vehicle loading and potential excavation damage. Normal burial depth is 450mm for areas without vehicle access."
  },
  {
    id: 5,
    question: "When installing cables in containment systems, what is the maximum fill factor to ensure proper heat dissipation?",
    options: [
      "30%",
      "40%",
      "50%",
      "60%"
    ],
    correctAnswer: 1,
    explanation: "The maximum fill factor for cable containment is 40% to ensure adequate heat dissipation and space for thermal expansion. This prevents overheating and allows for proper airflow around the cables."
  }
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
            <div className="text-xl text-gray-300">
              {percentage}% Score
            </div>
            <Badge 
              variant={percentage >= 80 ? "default" : percentage >= 60 ? "secondary" : "destructive"}
              className="text-lg px-4 py-2"
            >
              {percentage >= 80 ? "Excellent!" : percentage >= 60 ? "Good" : "Needs Improvement"}
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
                        <span className="font-medium">Your answer:</span> {question.options[userAnswer]}
                      </p>
                      {!isCorrect && (
                        <p className="text-sm text-green-400 mb-2">
                          <span className="font-medium">Correct answer:</span> {question.options[question.correctAnswer]}
                        </p>
                      )}
                      <p className="text-sm text-gray-400">
                        {question.explanation}
                      </p>
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
                <span className="font-medium mr-3">
                  {String.fromCharCode(65 + index)}.
                </span>
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