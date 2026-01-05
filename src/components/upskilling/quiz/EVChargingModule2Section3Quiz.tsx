import React, { useState, useMemo } from 'react';
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

const questions: QuizQuestion[] = [
  {
    id: 1,
    question: "Which connectivity technology offers the highest reliability for EV charging stations?",
    options: [
      "Wi-Fi (802.11ac)",
      "4G/5G Cellular",
      "Ethernet/Hardwired",
      "OCPP over PLC"
    ],
    correctAnswer: 2,
    explanation: "Ethernet/hardwired connections provide the highest stability with no interference and are ideal for commercial installations requiring maximum reliability."
  },
  {
    id: 2,
    question: "What is the primary benefit of OCPP (Open Charge Point Protocol)?",
    options: [
      "Faster charging speeds",
      "Lower installation costs",
      "Interoperability between systems",
      "Better user interface design"
    ],
    correctAnswer: 2,
    explanation: "OCPP ensures interoperability between charging stations and central management systems from different manufacturers, preventing vendor lock-in."
  },
  {
    id: 3,
    question: "Which OCPP version introduced ISO 15118 support and enhanced security features?",
    options: [
      "OCPP 1.5",
      "OCPP 1.6J",
      "OCPP 2.0.1",
      "OCPP 3.0"
    ],
    correctAnswer: 2,
    explanation: "OCPP 2.0.1, released in 2020, introduced ISO 15118 support, enhanced security, device model framework, and display message support among other new features."
  },
  {
    id: 4,
    question: "In dynamic load management, what does 'equal distribution' algorithm do?",
    options: [
      "Gives priority to paying customers",
      "Divides available power equally among active sessions",
      "Allocates power based on vehicle type",
      "Charges vehicles in order of arrival"
    ],
    correctAnswer: 1,
    explanation: "Equal distribution algorithm divides the available power equally among all active charging sessions, ensuring fair power allocation."
  },
  {
    id: 5,
    question: "What is the typical range limitation for OCPP over PLC (Power Line Communication)?",
    options: [
      "Up to 100m",
      "Up to 200m",
      "Up to 300m",
      "Up to 500m"
    ],
    correctAnswer: 2,
    explanation: "OCPP over PLC can work up to 300m on low voltage networks, though it's susceptible to noise and has variable performance compared to other connectivity methods."
  }
];

interface SequentialQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const EVChargingModule2Section3Quiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(
    new Array(questions.length).fill(null)
  );
  const [showResults, setShowResults] = useState(false);
  const [answered, setAnswered] = useState(false);

  const sequentialQuestions: SequentialQuestion[] = useMemo(
    () => questions.map(q => ({
      id: q.id,
      question: q.question,
      options: q.options,
      correct: q.correctAnswer,
      explanation: q.explanation
    })),
    []
  );

  const handleAnswerSelect = (answerIndex: number) => {
    if (answered) return;
    
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
    setAnswered(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setAnswered(selectedAnswers[currentQuestion + 1] !== null);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswered(selectedAnswers[currentQuestion - 1] !== null);
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setSelectedAnswers(new Array(questions.length).fill(null));
    setShowResults(false);
    setAnswered(false);
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  const getScoreColor = (score: number) => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground text-center">Quiz Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className={`text-4xl font-bold ${getScoreColor(score)} mb-2`}>
              {score}/{questions.length}
            </div>
            <div className="text-gray-300">
              You scored {percentage}%
            </div>
          </div>

          <div className="space-y-4">
            {questions.map((question, index) => {
              const userAnswer = selectedAnswers[index];
              const isCorrect = userAnswer === question.correctAnswer;

              return (
                <div key={question.id} className="border border-gray-600 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    {isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="text-foreground font-medium mb-2">{question.question}</p>
                      <p className="text-sm text-gray-300 mb-2">
                        Your answer: {question.options[userAnswer || 0]}
                      </p>
                      {!isCorrect && (
                        <p className="text-sm text-green-300 mb-2">
                          Correct answer: {question.options[question.correctAnswer]}
                        </p>
                      )}
                      <p className="text-sm text-gray-400">{question.explanation}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <Button 
              onClick={handleReset}
              className="bg-elec-yellow text-elec-dark hover:bg-yellow-600"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Retake Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentQ = sequentialQuestions[currentQuestion];
  const isAnswered = selectedAnswers[currentQuestion] !== null;
  const selectedAnswer = selectedAnswers[currentQuestion];

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center justify-between">
          <span>Section 3 Quiz</span>
          <span className="text-sm font-normal text-gray-400">
            {currentQuestion + 1} of {questions.length}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-elec-yellow h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>

        <div>
          <h3 className="text-lg font-medium text-foreground mb-4">{currentQ.question}</h3>
          <div className="space-y-3">
            {currentQ.options.map((option, index) => {
              let buttonClass = "w-full p-4 text-left border transition-all duration-200 ";
              
              if (selectedAnswer === index) {
                if (answered && index === currentQ.correct) {
                  buttonClass += "border-green-500 bg-green-500/20 text-green-300";
                } else if (answered && index !== currentQ.correct) {
                  buttonClass += "border-red-500 bg-red-500/20 text-red-300";
                } else {
                  buttonClass += "border-elec-yellow bg-elec-yellow/20 text-elec-yellow";
                }
              } else if (answered && index === currentQ.correct) {
                buttonClass += "border-green-500 bg-green-500/20 text-green-300";
              } else {
                buttonClass += "border-gray-600 text-gray-300 hover:border-gray-500 hover:bg-gray-700/50";
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={buttonClass}
                  disabled={answered}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        {answered && (
          <div className="bg-blue-600/20 border border-blue-600/30 rounded-lg p-4">
            <p className="text-blue-200 text-sm">{currentQ.explanation}</p>
          </div>
        )}

        <div className="flex justify-between">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-elec-gray"
          >
            Previous
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={!answered}
            className="bg-elec-yellow text-elec-dark hover:bg-yellow-600"
          >
            {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EVChargingModule2Section3Quiz;