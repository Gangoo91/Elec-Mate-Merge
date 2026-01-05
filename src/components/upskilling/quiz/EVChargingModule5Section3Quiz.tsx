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
    question: "What accuracy class is recommended as minimum for Dynamic Load Management applications?",
    options: [
      "Class 3 (±3%)",
      "Class 1 (±1%)",
      "Class 0.5 (±0.5%)",
      "Class 0.2 (±0.2%)"
    ],
    correctAnswer: 1,
    explanation: "Class 1 (±1%) accuracy is the minimum recommendation for DLM applications, providing sufficient accuracy for load management whilst being cost-effective."
  },
  {
    question: "What is the primary advantage of split-core CT clamps over solid-core types?",
    options: [
      "Higher accuracy",
      "Lower cost",
      "Retrofit installation without disconnection",
      "Better temperature stability"
    ],
    correctAnswer: 2,
    explanation: "Split-core CTs allow installation on existing electrical systems without breaking connections, making them ideal for retrofit monitoring applications."
  },
  {
    question: "Which communication protocol is specifically designed for utility meter integration?",
    options: [
      "OCPP",
      "Modbus RTU",
      "M-Bus",
      "CAN Bus"
    ],
    correctAnswer: 2,
    explanation: "M-Bus (Meter Bus) is the European standard specifically designed for utility meter reading and control applications."
  },
  {
    question: "What is the typical temperature stability coefficient for high-quality CT clamps?",
    options: [
      "<0.1%/°C",
      "<0.5%/°C",
      "<1.0%/°C",
      "<2.0%/°C"
    ],
    correctAnswer: 0,
    explanation: "High-quality CT clamps should have temperature stability better than 0.1%/°C for consistent performance across varying environmental conditions."
  },
  {
    question: "What is the maximum recommended distance for analogue CT signal transmission?",
    options: [
      "50m",
      "100m",
      "200m",
      "500m"
    ],
    correctAnswer: 1,
    explanation: "Analogue CT signals should be limited to 100m maximum distance with appropriate cable sizing to maintain signal integrity and accuracy."
  },
  {
    question: "Which type of CT is most suitable for measuring DC currents?",
    options: [
      "Split-core CT",
      "Solid-core CT",
      "Rogowski coil",
      "Hall effect sensor"
    ],
    correctAnswer: 3,
    explanation: "Hall effect sensors can measure both DC and AC currents, unlike traditional CTs which only work with AC due to electromagnetic induction principles."
  },
  {
    question: "What is the recommended sampling rate for load management applications?",
    options: [
      "0.1Hz",
      "1Hz minimum",
      "10Hz minimum",
      "100Hz minimum"
    ],
    correctAnswer: 1,
    explanation: "A minimum sampling rate of 1Hz is required for effective load management, with higher rates preferred for power quality analysis."
  },
  {
    question: "What is the most critical safety consideration when working with CT circuits?",
    options: [
      "Proper earthing connections",
      "Never open-circuit secondary under load",
      "Use appropriate PPE",
      "Check insulation resistance"
    ],
    correctAnswer: 1,
    explanation: "Never open-circuit CT secondary connections under load as this can create dangerous high voltages and damage equipment."
  },
  {
    question: "Which algorithm type is most suitable for complex optimisation in load management?",
    options: [
      "Linear programming",
      "Fuzzy logic",
      "Genetic algorithms",
      "Simple proportional control"
    ],
    correctAnswer: 2,
    explanation: "Genetic algorithms excel at solving complex multi-variable optimisation problems common in advanced load management systems."
  },
  {
    question: "What is the typical dynamic range requirement for effective load monitoring?",
    options: [
      "10% to 100% of rated current",
      "1% to 120% of rated current",
      "5% to 110% of rated current",
      "20% to 150% of rated current"
    ],
    correctAnswer: 1,
    explanation: "Effective load monitoring requires accurate measurement from 1% to 120% of rated current to cover full operational range and overload conditions."
  }
];

export function EVChargingModule5Section3Quiz() {
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