import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';

const quizData = [
  {
    question: "What is the typical accuracy class required for current transformers used in EV charging revenue metering?",
    answers: [
      "Class 1",
      "Class 0.5",
      "Class 0.2S", 
      "Class 3"
    ],
    correctAnswer: 2,
    explanation: "Class 0.2S CTs are required for revenue-grade metering applications as they provide the highest accuracy (±0.2%) needed for billing and financial transactions in commercial EV charging."
  },
  {
    question: "What is the recommended voltage trip setting for undervoltage protection in EV charging applications?",
    answers: [
      "85% of nominal voltage",
      "90% of nominal voltage (207V)",
      "95% of nominal voltage", 
      "80% of nominal voltage"
    ],
    correctAnswer: 1,
    explanation: "EV charging equipment typically requires 90% of nominal voltage (207V for 230V systems) to ensure proper operation and prevent damage to charging electronics. This is more stringent than general electrical equipment requirements."
  },
  {
    question: "What is the maximum allowable Total Harmonic Distortion (THD) for current in EV charging applications?",
    answers: [
      "5%",
      "8%",
      "12%",
      "15%"
    ],
    correctAnswer: 1,
    explanation: "IEC 61851 and most standards limit current THD to <8% at nominal power for EV charging equipment to ensure power quality compliance and minimize network disturbance."
  },
  {
    question: "What is the primary safety consideration when working with current transformers?",
    answers: [
      "Always use the highest burden possible",
      "Secondary circuits must never be open-circuited during operation",
      "Primary current should not exceed 50% of rating",
      "CTs can be installed in any orientation"
    ],
    correctAnswer: 1,
    explanation: "CT secondary circuits must never be open-circuited during operation as this causes dangerous high voltages (potentially kV levels) to appear across the secondary terminals, creating serious shock and equipment damage risks."
  },
  {
    question: "What type of arc fault detection provides the fastest response time for DC charging installations?",
    answers: [
      "Current signature analysis only",
      "Light-based arc detection (<2ms)",
      "Voltage-based detection",
      "Temperature-based detection"
    ],
    correctAnswer: 1,
    explanation: "Light-based arc detection systems provide the fastest response time (<2ms) by detecting the characteristic light emission from electrical arcs, which is essential for the rapid disconnection required in high-power DC charging applications."
  },
  {
    question: "What is the typical burden rating for a CT used with a multifunction power meter?",
    answers: [
      "1VA per CT",
      "2.5VA per CT",
      "5-10VA per CT",
      "15VA per CT"
    ],
    correctAnswer: 2,
    explanation: "Multifunction power meters typically require 5-10VA burden per CT, depending on the meter's input characteristics and cable length. This ensures accurate measurement across the full operating range."
  },
  {
    question: "What phase unbalance level typically triggers protection in EV charging systems?",
    answers: [
      "1% unbalance",
      "3% unbalance",
      "5% unbalance",
      "10% unbalance"
    ],
    correctAnswer: 1,
    explanation: "EV charging systems typically trip at 3% voltage unbalance to protect sensitive electronics and motors from overheating and reduced efficiency caused by negative sequence currents."
  },
  {
    question: "Which monitoring parameter is most critical for preventing thermal damage in EV charging equipment?",
    answers: [
      "Voltage magnitude only",
      "Current magnitude and temperature",
      "Power factor only",
      "Frequency deviation"
    ],
    correctAnswer: 1,
    explanation: "Current magnitude and temperature monitoring are critical as high currents combined with poor cooling can cause rapid thermal damage to cables, contactors, and power electronics in EV charging systems."
  },
  {
    question: "What is the recommended minimum clearance for CT installation in EV charging panels?",
    answers: [
      "50mm from adjacent conductors",
      "100mm from adjacent conductors",
      "200mm from adjacent conductors",
      "300mm from adjacent conductors"
    ],
    correctAnswer: 2,
    explanation: "200mm minimum clearance prevents electromagnetic interference between CTs and ensures safe access for installation, testing, and maintenance in typical EV charging panel configurations."
  },
  {
    question: "How often should power quality monitoring data be reviewed for commercial EV charging installations?",
    answers: [
      "Real-time monitoring with weekly reports",
      "Daily manual checks only",
      "Monthly data review only",
      "Annual review sufficient"
    ],
    correctAnswer: 0,
    explanation: "Real-time monitoring with automated alarms plus weekly trending reports ensures immediate response to power quality issues while identifying long-term trends that could affect equipment reliability and customer satisfaction."
  }
];

export const EVChargingModule4Section3Quiz = () => {
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