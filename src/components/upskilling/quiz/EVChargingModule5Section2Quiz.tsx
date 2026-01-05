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
    question: "What is the primary function of a Home Energy Management System (HEMS)?",
    options: [
      "Monitor electricity consumption only",
      "Coordinate energy flows between multiple sources and loads",
      "Control only solar panel operation",
      "Manage battery charging exclusively"
    ],
    correctAnswer: 1,
    explanation: "HEMS coordinates energy flows between multiple sources (solar, grid, battery) and loads (home, EV) to optimise efficiency and costs."
  },
  {
    question: "What percentage of solar self-consumption can typically be achieved with integrated EV/PV/Battery systems?",
    options: [
      "40-50%",
      "55-65%",
      "70-80%",
      "85-95%"
    ],
    correctAnswer: 3,
    explanation: "Well-designed integrated systems can achieve 85-95% solar self-consumption through intelligent load management and battery storage."
  },
  {
    question: "Which communication protocol is specifically designed for EV charge point integration?",
    options: [
      "SunSpec Modbus",
      "OCPP (Open Charge Point Protocol)",
      "CAN Bus",
      "Zigbee"
    ],
    correctAnswer: 1,
    explanation: "OCPP is the industry standard protocol specifically designed for EV charge point communication and control."
  },
  {
    question: "How does 'excess solar charging' mode operate?",
    options: [
      "Charges EV only during peak sunlight hours",
      "EV charging power matches surplus PV generation",
      "Uses only battery power for EV charging",
      "Prevents any grid electricity usage"
    ],
    correctAnswer: 1,
    explanation: "Excess solar charging dynamically adjusts EV charging power to match surplus PV generation, maximising solar utilisation."
  },
  {
    question: "What is the typical electricity bill reduction achieved with integrated HEMS systems?",
    options: [
      "20-30%",
      "35-45%",
      "50-60%",
      "60-80%"
    ],
    correctAnswer: 3,
    explanation: "Integrated HEMS systems typically achieve 60-80% reduction in electricity bills through intelligent energy management."
  },
  {
    question: "Which factor is most important for battery priority management in HEMS?",
    options: [
      "Battery temperature only",
      "Hierarchical charging based on tariff periods",
      "Maximum charging speed",
      "Battery age"
    ],
    correctAnswer: 1,
    explanation: "Battery priority management uses hierarchical charging strategies, prioritising home battery over EV during peak tariff periods."
  },
  {
    question: "What is the main advantage of predictive control algorithms in HEMS?",
    options: [
      "Faster charging speeds",
      "Reduced equipment costs",
      "Weather-based generation forecasting for optimisation",
      "Simpler installation requirements"
    ],
    correctAnswer: 2,
    explanation: "Predictive algorithms use weather forecasting to predict solar generation and optimise charging schedules accordingly."
  },
  {
    question: "How does time-of-use optimisation benefit integrated EV charging systems?",
    options: [
      "Increases charging speed",
      "Reduces equipment maintenance",
      "Schedules charging during lowest electricity price periods",
      "Improves battery lifespan only"
    ],
    correctAnswer: 2,
    explanation: "Time-of-use optimisation schedules charging during periods of lowest electricity prices to minimise costs."
  },
  {
    question: "What size solar PV system typically provides sufficient energy for average daily EV driving?",
    options: [
      "2-3kW",
      "4-6kW",
      "8-10kW",
      "12-15kW"
    ],
    correctAnswer: 1,
    explanation: "A 4-6kW solar system typically provides 15-25kWh daily generation, sufficient for 60-100 miles of daily EV driving."
  },
  {
    question: "What is the typical payback period for integrated EV/PV/Battery systems?",
    options: [
      "2-3 years",
      "5-8 years",
      "10-12 years",
      "15-20 years"
    ],
    correctAnswer: 1,
    explanation: "Integrated systems typically achieve 5-8 year payback periods including government incentives and reduced grid dependency."
  }
];

export function EVChargingModule5Section2Quiz() {
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