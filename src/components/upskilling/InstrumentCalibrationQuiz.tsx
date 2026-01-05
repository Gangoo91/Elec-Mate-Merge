
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const InstrumentCalibrationQuiz = () => {
  const questions: QuizQuestion[] = [
    {
      id: 1,
      question: "What is the typical calibration interval for test instruments?",
      options: [
        "Every 3 months",
        "Every 6 months",
        "Every 12 months",
        "Every 2 years"
      ],
      correctAnswer: 2,
      explanation: "Test instruments typically require calibration every 12 months to ensure accuracy and compliance with safety standards."
    },
    {
      id: 2,
      question: "True or False: You can rely on your tester's 'self-test' instead of proper calibration.",
      options: [
        "True",
        "False"
      ],
      correctAnswer: 1,
      explanation: "False. Self-test functions are useful for basic checks, but they cannot replace proper calibration against known reference standards."
    },
    {
      id: 3,
      question: "Which standard requires instruments to be accurate and reliable?",
      options: [
        "BS 7671",
        "BS EN 61557",
        "ISO 9001",
        "EAWR 2005"
      ],
      correctAnswer: 1,
      explanation: "BS EN 61557 specifically covers the requirements for electrical safety in low voltage distribution systems, including instrument accuracy."
    },
    {
      id: 4,
      question: "What should you do if your test leads are cracked or damaged?",
      options: [
        "Use them gently",
        "Tape them up",
        "Replace them immediately",
        "Calibrate the tester again"
      ],
      correctAnswer: 2,
      explanation: "Damaged test leads pose a serious safety risk and can affect measurement accuracy. They must be replaced immediately."
    },
    {
      id: 5,
      question: "Why is calibration important in court or compliance checks?",
      options: [
        "It's good practice",
        "It ensures speed",
        "It proves your readings are trustworthy",
        "It boosts your marketing"
      ],
      correctAnswer: 2,
      explanation: "Calibration provides documented proof that your instrument readings are accurate and reliable, which is essential for legal and compliance purposes."
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
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

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswers(new Array(questions.length).fill(null));
    setShowResults(false);
    setQuizCompleted(false);
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  const getScorePercentage = () => {
    return Math.round((calculateScore() / questions.length) * 100);
  };

  if (showResults) {
    const score = calculateScore();
    const percentage = getScorePercentage();
    
    return (
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-elec-yellow" />
            Quiz Results
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-6">
          <div className="text-center space-y-4">
            <div className="text-3xl font-bold text-elec-yellow">
              {score}/{questions.length}
            </div>
            <div className="text-xl text-foreground">
              {percentage}% Complete
            </div>
            <div className="text-gray-400">
              {percentage >= 80 ? "Excellent work!" : percentage >= 60 ? "Good effort!" : "Consider reviewing the material again."}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-elec-yellow">Review Your Answers:</h4>
            {questions.map((question, index) => {
              const userAnswer = selectedAnswers[index];
              const isCorrect = userAnswer === question.correctAnswer;
              
              return (
                <div key={question.id} className="bg-[#323232] p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    {isCorrect ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                    <span className="font-semibold text-foreground">Question {index + 1}</span>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">{question.question}</p>
                  <p className="text-xs text-gray-400 mb-2">
                    Your answer: {userAnswer !== null ? question.options[userAnswer] : "Not answered"}
                  </p>
                  {!isCorrect && (
                    <p className="text-xs text-green-400 mb-2">
                      Correct answer: {question.options[question.correctAnswer]}
                    </p>
                  )}
                  <p className="text-xs text-gray-400">{question.explanation}</p>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center">
            <Button 
              onClick={handleRestart}
              className="bg-elec-yellow text-black hover:bg-yellow-400"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Retake Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const question = questions[currentQuestion];
  const selectedAnswer = selectedAnswers[currentQuestion];

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center justify-between">
          <span>Instrument Calibration Knowledge Check</span>
          <span className="text-sm text-gray-400">
            Question {currentQuestion + 1} of {questions.length}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-6">
        <div className="bg-[#323232] p-4 rounded-lg">
          <h4 className="font-semibold text-elec-yellow mb-3">
            Question {currentQuestion + 1}
          </h4>
          <p className="text-sm mb-4">{question.question}</p>
          
          <div className="space-y-2">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-3 rounded border transition-all duration-200 text-sm ${
                  selectedAnswer === index
                    ? 'border-elec-yellow bg-yellow-600/20 text-foreground'
                    : 'border-gray-600 hover:border-gray-500 text-gray-300 hover:bg-[#404040]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-6 h-6 rounded text-xs flex items-center justify-center ${
                    selectedAnswer === index 
                      ? 'bg-elec-yellow text-black' 
                      : 'bg-gray-600 text-foreground'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span>{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-[#404040] hover:text-foreground"
          >
            Previous
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={selectedAnswer === null}
            className="bg-elec-yellow text-black hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next'}
          </Button>
        </div>

        {selectedAnswer === null && (
          <p className="text-center text-sm text-gray-500">
            Please select an answer to continue
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default InstrumentCalibrationQuiz;
