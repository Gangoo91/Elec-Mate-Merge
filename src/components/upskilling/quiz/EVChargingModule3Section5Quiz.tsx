import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, RotateCcw, Award } from 'lucide-react';
import { QuizQuestion } from '@/types/quiz';

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "When planning for dual EV charging in a domestic installation, what diversity factor should be applied with smart charging systems?",
    options: [
      "1.0 (no diversity)",
      "0.8 (20% diversity)", 
      "0.6 (40% diversity)",
      "0.4 (60% diversity)"
    ],
    correctAnswer: 1,
    explanation: "With smart charging systems managing load dynamically, a diversity factor of 0.8 (20% diversity) is appropriate for dual domestic EV charging. This allows for some simultaneous charging whilst preventing grid connection overload."
  },
  {
    id: 2,
    question: "For a residential PV-EV integrated system, what percentage of EV energy consumption can typically be met by solar generation?",
    options: [
      "30-40%",
      "50-60%",
      "60-70%",
      "80-90%"
    ],
    correctAnswer: 2,
    explanation: "In the UK, a well-designed 6kWp PV system can typically provide 60-70% of annual EV charging energy (approximately 3,500kWh) through a combination of direct charging and battery storage systems."
  },
  {
    id: 3,
    question: "What is the minimum spare capacity that should be planned in cable containment systems for future expansion?",
    options: [
      "15%",
      "25%",
      "40%",
      "50%"
    ],
    correctAnswer: 2,
    explanation: "Cable containment systems should have a minimum of 40% spare capacity to accommodate future cable installations, maintenance access, and heat dissipation requirements whilst allowing for system growth."
  },
  {
    id: 4,
    question: "Which communication protocol is essential for Vehicle-to-Grid (V2G) implementations?",
    options: [
      "OCPP 1.6",
      "Modbus TCP",
      "ISO 15118",
      "IEC 61851"
    ],
    correctAnswer: 2,
    explanation: "ISO 15118 is the key standard for V2G communication, enabling plug-and-charge functionality, bidirectional power flow control, and secure authentication between vehicles and charging infrastructure."
  },
  {
    id: 5,
    question: "By 2030, what percentage of UK properties are projected to have multiple EVs according to current forecasts?",
    options: [
      "25%",
      "40%",
      "55%",
      "70%"
    ],
    correctAnswer: 1,
    explanation: "Current UK government and industry forecasts suggest that approximately 40% of properties will have 2 or more electric vehicles by 2030, driven by falling vehicle costs and improved charging infrastructure."
  }
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