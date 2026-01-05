import { useState } from 'react';
import { Lightbulb, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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
    question: "What is the maximum insertion force required for a properly made RJ45 termination according to TIA-568 standards?",
    options: [
      "20 Newtons (4.5 lbf)",
      "40 Newtons (9 lbf)", 
      "60 Newtons (13.5 lbf)",
      "80 Newtons (18 lbf)"
    ],
    correctAnswer: 1,
    explanation: "TIA-568 specifies that a properly terminated RJ45 connector should require no more than 40 Newtons (approximately 9 lbf) of insertion force to mate with its corresponding jack."
  },
  {
    id: 2,
    question: "Which termination method provides the most reliable connection for Cat 6A cables in high-vibration environments?",
    options: [
      "Standard crimp termination",
      "IDC punch-down termination",
      "Compression termination with strain relief",
      "Solder termination"
    ],
    correctAnswer: 2,
    explanation: "Compression termination with proper strain relief provides the most reliable connection for Cat 6A in high-vibration environments as it creates a gas-tight connection and better mechanical stability."
  },
  {
    id: 3,
    question: "What is the correct untwist length for Cat 6A cables when terminating to RJ45 connectors?",
    options: [
      "6mm (0.25 inches)",
      "13mm (0.5 inches)",
      "19mm (0.75 inches)",
      "25mm (1 inch)"
    ],
    correctAnswer: 1,
    explanation: "For Cat 6A cables, the untwist length should not exceed 13mm (0.5 inches) to maintain proper impedance and minimise crosstalk at the termination point."
  },
  {
    id: 4,
    question: "According to BS 7671, what is the minimum contact resistance for a properly terminated copper connection?",
    options: [
      "Less than 1 milliohm",
      "Less than 5 milliohms",
      "Less than 10 milliohms",
      "Less than 20 milliohms"
    ],
    correctAnswer: 2,
    explanation: "BS 7671 and related standards specify that properly terminated copper connections should have a contact resistance of less than 10 milliohms to ensure reliable signal transmission and minimal power loss."
  },
  {
    id: 5,
    question: "Which tool calibration frequency is recommended for professional crimp tools used in Cat 6A installations?",
    options: [
      "Monthly",
      "Quarterly", 
      "Annually",
      "Every two years"
    ],
    correctAnswer: 1,
    explanation: "Professional crimp tools should be calibrated quarterly (every 3 months) to maintain consistent termination quality and ensure compliance with performance standards, especially for high-category cables like Cat 6A."
  }
];

export const TerminationQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizComplete(true);
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setQuizComplete(false);
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === quizQuestions[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  const currentQ = quizQuestions[currentQuestion];
  const score = calculateScore();
  const percentage = Math.round((score / quizQuestions.length) * 100);

  if (showResults) {
    return (
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Lightbulb className="h-5 w-5 text-elec-yellow" />
            Quiz Results
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-elec-yellow mb-2">
              {score} / {quizQuestions.length}
            </div>
            <div className="text-xl text-foreground mb-4">
              {percentage}% Complete
            </div>
            <div className={`text-lg ${percentage >= 80 ? 'text-green-400' : percentage >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
              {percentage >= 80 ? 'Excellent work!' : percentage >= 60 ? 'Good effort!' : 'Keep studying and try again!'}
            </div>
          </div>

          <div className="space-y-4">
            {quizQuestions.map((question, index) => {
              const userAnswer = selectedAnswers[index];
              const isCorrect = userAnswer === question.correctAnswer;
              
              return (
                <div key={question.id} className="bg-[#323232] rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    {isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <h4 className="text-foreground font-medium mb-2">
                        Question {index + 1}: {question.question}
                      </h4>
                      <p className={`text-sm mb-2 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                        Your answer: {question.options[userAnswer]}
                      </p>
                      {!isCorrect && (
                        <p className="text-sm text-green-400 mb-2">
                          Correct answer: {question.options[question.correctAnswer]}
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

          <div className="flex justify-center">
            <Button
              onClick={resetQuiz}
              className="bg-elec-yellow text-black hover:bg-yellow-500"
            >
              Take Quiz Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Lightbulb className="h-5 w-5 text-elec-yellow" />
          Quick Quiz
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-between items-center text-sm text-gray-400">
          <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
          <span>{Math.round(((currentQuestion + 1) / quizQuestions.length) * 100)}% Complete</span>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">
            {currentQ.question}
          </h3>

          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                  selectedAnswers[currentQuestion] === index
                    ? 'border-elec-yellow bg-yellow-600/10 text-elec-yellow'
                    : 'border-gray-600 bg-[#323232] text-gray-300 hover:border-gray-500'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            variant="outline"
            className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            Previous
          </Button>

          <Button
            onClick={handleNext}
            disabled={selectedAnswers[currentQuestion] === undefined}
            className="bg-elec-yellow text-black hover:bg-yellow-500"
          >
            {currentQuestion === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
