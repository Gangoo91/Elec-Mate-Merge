import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';

const quizData = [
  {
    question: "What is the primary purpose of Dynamic Load Management (DLM) in EV charging systems?",
    answers: [
      "To increase charging speed for individual vehicles",
      "To automatically adjust charging power based on available electrical capacity",
      "To reduce the cost of electricity for EV charging",
      "To monitor the condition of charging equipment"
    ],
    correctAnswer: 1,
    explanation: "DLM automatically adjusts EV charging power based on real-time electrical demand and available capacity to prevent infrastructure overload whilst maximising charging efficiency."
  },
  {
    question: "Which component is essential for DLM systems to monitor electrical demand?",
    answers: [
      "Smart meters only",
      "Current transformer (CT) clamps or smart meters",
      "Voltage sensors only",
      "Temperature monitoring equipment"
    ],
    correctAnswer: 1,
    explanation: "CT clamps or smart meters are essential for monitoring electrical current and demand in real-time, providing the data needed for effective DLM control algorithms."
  },
  {
    question: "What is the typical accuracy requirement for CT clamps used in DLM systems?",
    answers: [
      "Class 3 (±3% error)",
      "Class 2 (±2% error)",
      "Class 1 or better (±1% error)",
      "Class 0.5 (±0.5% error)"
    ],
    correctAnswer: 2,
    explanation: "CT clamps should have accuracy class 1 or better (±1% error) for effective DLM operation, allowing closer operation to maximum capacity limits whilst maintaining safety."
  },
  {
    question: "In an equal distribution DLM algorithm, how is available power allocated?",
    answers: [
      "Based on user priority levels",
      "Equally divided among all active charging sessions",
      "Allocated to the first vehicle to connect",
      "Based on vehicle battery capacity"
    ],
    correctAnswer: 1,
    explanation: "Equal distribution algorithm divides available power equally among all active charging sessions, providing fair allocation with simple implementation and predictable behaviour."
  },
  {
    question: "What protocol is commonly used for communication between DLM controllers and modern charge points?",
    answers: [
      "Modbus RTU only",
      "RS485 serial communication",
      "OCPP (Open Charge Point Protocol)",
      "CAN bus protocol"
    ],
    correctAnswer: 2,
    explanation: "OCPP (Open Charge Point Protocol) is the industry standard that enables external control of charging power and communication between DLM systems and modern charge points."
  },
  {
    question: "What is the typical response time requirement for effective DLM control?",
    answers: [
      "Within minutes",
      "Within 30 seconds",
      "Within seconds, preferably sub-second",
      "Within 10 minutes"
    ],
    correctAnswer: 2,
    explanation: "DLM systems should respond within seconds to load changes, with sub-second capability preferred for rapid adjustment to prevent electrical overload conditions."
  },
  {
    question: "What percentage safety margin is typically configured in DLM systems?",
    answers: [
      "1-2%",
      "5-10%",
      "15-20%",
      "25-30%"
    ],
    correctAnswer: 1,
    explanation: "A safety margin of 5-10% is typically configured to provide headroom and prevent overload conditions whilst maximising utilisation of available electrical capacity."
  },
  {
    question: "In priority-weighted DLM distribution, which factor is commonly used for allocation?",
    answers: [
      "Vehicle colour",
      "Charging cable length",
      "User type, departure time, or vehicle state of charge",
      "Ambient temperature"
    ],
    correctAnswer: 2,
    explanation: "Priority-weighted systems consider factors like user type, departure time, vehicle SoC, and subscription levels to intelligently allocate power based on real needs and priorities."
  },
  {
    question: "What happens in a well-designed DLM system if the central controller fails?",
    answers: [
      "All charging stops immediately",
      "Charge points revert to fail-safe mode with reduced power limits",
      "Charging continues at maximum power",
      "The electrical supply is disconnected"
    ],
    correctAnswer: 1,
    explanation: "Well-designed DLM systems include fail-safe modes where charge points revert to reduced power operation or predetermined limits to ensure continued safe operation."
  },
  {
    question: "Which advanced feature can DLM systems integrate with for optimal energy management?",
    answers: [
      "Solar PV and battery storage systems",
      "Air conditioning control only",
      "Lighting systems only", 
      "Fire alarm systems"
    ],
    correctAnswer: 0,
    explanation: "Advanced DLM systems can integrate with solar PV and battery storage to optimise charging from renewable generation, store excess energy, and reduce grid import during peak periods."
  }
];

export const EVChargingModule5Section1Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    if (quizCompleted) return;
    
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newSelectedAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
      setQuizCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setQuizCompleted(false);
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === quizData[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  const getScoreColor = (score: number) => {
    const percentage = (score / quizData.length) * 100;
    if (percentage >= 80) return "text-green-400";
    if (percentage >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  if (showResults) {
    const score = calculateScore();
    const percentage = (score / quizData.length) * 100;

    return (
      <Card className="bg-elec-gray border-gray-700">
        <CardHeader>
          <CardTitle className="text-foreground">Quiz Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className={`text-3xl font-bold ${getScoreColor(score)}`}>
              {score}/{quizData.length}
            </div>
            <div className="text-gray-400 text-lg">
              {percentage.toFixed(0)}% Correct
            </div>
          </div>
          
          <div className="space-y-4">
            {quizData.map((question, index) => {
              const isCorrect = selectedAnswers[index] === question.correctAnswer;
              return (
                <div key={index} className="border border-gray-600 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-2">
                    {isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <div className="font-medium text-foreground mb-2">
                        {question.question}
                      </div>
                      <div className="text-sm text-gray-400 mb-2">
                        Your answer: {question.answers[selectedAnswers[index]]}
                      </div>
                      {!isCorrect && (
                        <div className="text-sm text-green-400 mb-2">
                          Correct answer: {question.answers[question.correctAnswer]}
                        </div>
                      )}
                      <div className="text-sm text-gray-300">
                        {question.explanation}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center">
            <Button 
              onClick={handleRestart}
              className="bg-elec-yellow text-black hover:bg-yellow-600"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Retake Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentQ = quizData[currentQuestion];
  const isAnswered = selectedAnswers[currentQuestion] !== undefined;

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-foreground">Knowledge Check</CardTitle>
          <Badge variant="outline" className="border-gray-600 text-gray-300">
            {currentQuestion + 1} of {quizData.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4">
            {currentQ.question}
          </h3>
          
          <div className="space-y-3">
            {currentQ.answers.map((answer, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-4 rounded-lg border transition-all ${
                  selectedAnswers[currentQuestion] === index
                    ? 'border-elec-yellow bg-yellow-600/10 text-foreground'
                    : 'border-gray-600 bg-gray-800/50 text-gray-300 hover:border-gray-500'
                }`}
                disabled={quizCompleted}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedAnswers[currentQuestion] === index
                      ? 'border-elec-yellow bg-elec-yellow text-black'
                      : 'border-gray-500'
                  }`}>
                    {selectedAnswers[currentQuestion] === index && (
                      <CheckCircle className="h-4 w-4" />
                    )}
                  </div>
                  <span>{answer}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="bg-elec-gray border-gray-600 text-foreground hover:bg-gray-700"
          >
            Previous
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={!isAnswered}
            className="bg-elec-yellow text-black hover:bg-yellow-600"
          >
            {currentQuestion === quizData.length - 1 ? 'Finish Quiz' : 'Next'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};