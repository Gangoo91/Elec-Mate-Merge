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
    question: "What power levels are expected for ultra-fast charging systems by 2027?",
    options: [
      "200-350kW",
      "500-750kW",
      "800-1000kW",
      "1500-2000kW"
    ],
    correctAnswer: 1,
    explanation: "Near-future ultra-fast charging systems (2025-2027) are expected to achieve 500-750kW with silicon carbide power electronics."
  },
  {
    question: "What is the typical efficiency range for wireless charging systems?",
    options: [
      "70-80%",
      "85-95%",
      "95-98%",
      "98-99%"
    ],
    correctAnswer: 1,
    explanation: "Current wireless charging systems achieve 85-95% efficiency, slightly lower than conductive charging (95-98%) but improving with technology advances."
  },
  {
    question: "Which communication standard is essential for Vehicle-to-Grid (V2G) implementation?",
    options: [
      "CAN Bus",
      "Modbus TCP",
      "ISO 15118",
      "MQTT"
    ],
    correctAnswer: 2,
    explanation: "ISO 15118 is the key communication standard for V2G, enabling bidirectional energy flow and smart grid integration."
  },
  {
    question: "What frequency is specified in SAE J2954 for wireless EV charging?",
    options: [
      "50kHz",
      "85kHz",
      "125kHz",
      "200kHz"
    ],
    correctAnswer: 1,
    explanation: "SAE J2954 specifies 85kHz as the standard frequency for wireless EV charging to ensure interoperability and safety."
  },
  {
    question: "What is the main advantage of dynamic wireless charging over static charging?",
    options: [
      "Higher efficiency",
      "Lower costs",
      "Continuous charging while driving",
      "Faster charging speeds"
    ],
    correctAnswer: 2,
    explanation: "Dynamic wireless charging allows continuous charging while driving, potentially reducing battery size requirements and extending vehicle range."
  },
  {
    question: "Which technology enables V2G systems to provide grid stabilisation services?",
    options: [
      "Unidirectional inverters",
      "Bidirectional inverters",
      "AC-DC converters only",
      "Simple rectifiers"
    ],
    correctAnswer: 1,
    explanation: "Bidirectional inverters enable V2G systems to both charge from and discharge to the grid, providing various grid services including frequency regulation."
  },
  {
    question: "What is the primary application of machine learning in future charging systems?",
    options: [
      "Hardware control only",
      "Predictive analytics and optimisation",
      "Basic on/off switching",
      "Temperature monitoring"
    ],
    correctAnswer: 1,
    explanation: "Machine learning enables predictive analytics for demand forecasting, optimisation of charging schedules, and real-time system adaptation."
  },
  {
    question: "How will autonomous vehicles impact charging infrastructure design?",
    options: [
      "No significant changes required",
      "Only faster charging needed",
      "Automated connection systems and potentially wireless charging",
      "Manual intervention will increase"
    ],
    correctAnswer: 2,
    explanation: "Autonomous vehicles will require automated connection systems and may drive adoption of wireless charging to enable unmanned operations."
  },
  {
    question: "What is the expected timeline for commercial deployment of dynamic wireless charging?",
    options: [
      "2024-2025",
      "2026-2028",
      "2030-2032",
      "After 2035"
    ],
    correctAnswer: 1,
    explanation: "Dynamic wireless charging is expected to see commercial deployment between 2026-2028, following static wireless charging adoption."
  },
  {
    question: "What is a key benefit of using AI for charging network management?",
    options: [
      "Reduced hardware requirements",
      "Elimination of all human oversight",
      "Dynamic pricing and load optimisation",
      "Simpler installation procedures"
    ],
    correctAnswer: 2,
    explanation: "AI enables dynamic pricing based on demand and grid conditions, plus real-time load optimisation to maximise efficiency and reduce costs."
  }
];

export function EVChargingModule5Section5Quiz() {
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