import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, RotateCcw, Trophy } from 'lucide-react';

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const quizQuestions: QuizQuestion[] = [
  {
    question: "What is the current per phase for a 22kW three-phase EV charger operating at 400V?",
    options: [
      "32A",
      "55A",
      "16A",
      "63A"
    ],
    correctAnswer: 0,
    explanation: "For a 22kW three-phase charger: I = P ÷ (√3 × V) = 22,000W ÷ (1.732 × 400V) = 32A per phase."
  },
  {
    question: "Which diversity factor is typically applied for workplace EV charging installations?",
    options: [
      "0.3-0.5",
      "0.6-0.7",
      "0.8-1.0",
      "1.0-1.2"
    ],
    correctAnswer: 1,
    explanation: "Workplace charging typically uses 0.6-0.7 diversity factor due to predictable usage patterns and 8-hour dwell times."
  },
  {
    question: "What is the primary advantage of Dynamic Load Management (DLM) over static load allocation?",
    options: [
      "Lower installation costs",
      "Simpler configuration",
      "Maximises infrastructure utilisation",
      "Faster charging speeds"
    ],
    correctAnswer: 2,
    explanation: "DLM maximises infrastructure utilisation by dynamically allocating available power based on real-time demand rather than fixed allocations."
  },
  {
    question: "What minimum power factor is typically required for three-phase EV charging installations?",
    options: [
      "0.85 lagging",
      "0.90 lagging",
      "0.95 lagging",
      "1.00 unity"
    ],
    correctAnswer: 2,
    explanation: "Most grid codes require a minimum power factor of 0.95 lagging for three-phase installations to maintain grid power quality."
  },
  {
    question: "Which protection device is specifically required for EV charging circuits under BS 7671?",
    options: [
      "Standard RCD Type AC",
      "RCD Type A or Type B",
      "RCBO only",
      "No special protection required"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 requires RCD Type A or Type B for EV charging due to DC residual currents that can saturate standard AC RCDs."
  },
  {
    question: "What is the maximum individual harmonic distortion typically allowed for EV charging installations?",
    options: [
      "1%",
      "3%",
      "5%",
      "8%"
    ],
    correctAnswer: 1,
    explanation: "Individual harmonics should be limited to less than 3% to maintain power quality, while total harmonic distortion (THD) should be under 5%."
  },
  {
    question: "How does load balancing work for single-phase vehicles on three-phase infrastructure?",
    options: [
      "All vehicles charge on the same phase",
      "Vehicles are manually assigned to phases",
      "Smart systems automatically distribute loads across phases",
      "Single-phase vehicles cannot use three-phase infrastructure"
    ],
    correctAnswer: 2,
    explanation: "Modern charging systems automatically balance single-phase vehicles across the three phases to maintain system balance and prevent overloading."
  },
  {
    question: "What cable size is typically required for a 32A three-phase EV charging circuit?",
    options: [
      "2.5mm²",
      "4mm²",
      "6mm²",
      "10mm²"
    ],
    correctAnswer: 2,
    explanation: "For 32A three-phase circuits, 6mm² copper cable is typically the minimum size, though this depends on installation method and ambient temperature."
  },
  {
    question: "Which grid code compliance requirement is essential for three-phase EV charging installations in the UK?",
    options: [
      "G98 only",
      "G99 engineering recommendation",
      "G100 standard",
      "No specific grid code required"
    ],
    correctAnswer: 1,
    explanation: "G99 engineering recommendation applies to installations that may affect power quality or grid stability, including larger EV charging installations."
  },
  {
    question: "What is the typical frequency tolerance range that EV charging systems must operate within?",
    options: [
      "49-51Hz",
      "47.5-52Hz",
      "45-55Hz",
      "48-52Hz"
    ],
    correctAnswer: 1,
    explanation: "UK grid codes typically require equipment to operate within 47.5-52Hz frequency range, with specific response requirements for frequency excursions."
  }
];

export function EVChargingModule5Section4Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(new Array(quizQuestions.length).fill(-1));
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newSelectedAnswers);
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

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswers(new Array(quizQuestions.length).fill(-1));
    setShowResults(false);
    setQuizCompleted(false);
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === quizQuestions[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  const getScoreColor = (score: number) => {
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBadge = (score: number) => {
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage >= 80) return { label: 'Excellent', color: 'bg-green-500' };
    if (percentage >= 60) return { label: 'Good', color: 'bg-yellow-500' };
    return { label: 'Needs Improvement', color: 'bg-red-500' };
  };

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / quizQuestions.length) * 100);
    const badge = getScoreBadge(score);

    return (
      <Card className="bg-elec-gray border-gray-700">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Trophy className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-foreground">Quiz Results</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className={`text-4xl font-bold ${getScoreColor(score)}`}>
              {score}/{quizQuestions.length}
            </div>
            <div className="text-xl text-gray-300">
              {percentage}% Correct
            </div>
            <Badge className={`${badge.color} text-foreground px-4 py-2 text-sm`}>
              {badge.label}
            </Badge>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground mb-4">Review Your Answers:</h3>
            {quizQuestions.map((question, index) => (
              <div key={index} className="bg-[#323232] p-4 rounded-lg">
                <div className="flex items-start gap-3 mb-2">
                  {selectedAnswers[index] === question.correctAnswer ? (
                    <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className="text-foreground font-medium mb-2">
                      Question {index + 1}: {question.question}
                    </p>
                    <p className="text-sm text-gray-300 mb-2">
                      Your answer: {question.options[selectedAnswers[index]]}
                    </p>
                    {selectedAnswers[index] !== question.correctAnswer && (
                      <p className="text-sm text-green-400 mb-2">
                        Correct answer: {question.options[question.correctAnswer]}
                      </p>
                    )}
                    <p className="text-sm text-blue-200">
                      {question.explanation}
                    </p>
                  </div>
                </div>
              </div>
            ))}
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

  const question = quizQuestions[currentQuestion];
  const isAnswered = selectedAnswers[currentQuestion] !== -1;

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Trophy className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-foreground">Knowledge Check Quiz</CardTitle>
          </div>
          <Badge variant="secondary" className="bg-yellow-600/40 text-elec-yellow">
            Question {currentQuestion + 1} of {quizQuestions.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            {question.question}
          </h3>
          
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-4 text-left rounded-lg border transition-all duration-200 ${
                  selectedAnswers[currentQuestion] === index
                    ? 'border-elec-yellow bg-yellow-600/20 text-foreground'
                    : 'border-gray-600 bg-[#323232] text-gray-300 hover:border-gray-500 hover:bg-[#3a3a3a]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedAnswers[currentQuestion] === index
                      ? 'border-elec-yellow bg-elec-yellow'
                      : 'border-gray-500'
                  }`}>
                    {selectedAnswers[currentQuestion] === index && (
                      <div className="w-2 h-2 rounded-full bg-black"></div>
                    )}
                  </div>
                  <span className="text-sm">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center pt-4">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-[#323232] hover:text-foreground disabled:opacity-50"
          >
            Previous
          </Button>
          
          <div className="flex gap-2">
            {quizQuestions.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentQuestion
                    ? 'bg-elec-yellow'
                    : selectedAnswers[index] !== -1
                    ? 'bg-blue-400'
                    : 'bg-gray-600'
                }`}
              />
            ))}
          </div>

          <Button
            onClick={handleNext}
            disabled={!isAnswered}
            className="bg-elec-yellow text-black hover:bg-yellow-400 disabled:opacity-50"
          >
            {currentQuestion === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}