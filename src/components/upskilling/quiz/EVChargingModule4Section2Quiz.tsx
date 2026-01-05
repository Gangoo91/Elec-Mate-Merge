import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';

const quizData = [
  {
    question: "What is the primary purpose of a Voltage Monitoring Relay (VMR) in EV charging installations?",
    answers: [
      "To monitor charging current levels",
      "To detect open PEN conductor faults and voltage rise",
      "To control charging speed based on demand",
      "To measure power consumption for billing"
    ],
    correctAnswer: 1,
    explanation: "A VMR continuously monitors the neutral-earth voltage difference to detect open PEN faults. When the voltage exceeds the set threshold (typically 50V), it trips to protect against dangerous voltage rise on exposed metalwork."
  },
  {
    question: "What is the typical trip threshold setting for a VMR in EV charging applications?",
    answers: [
      "25V with 5-second delay",
      "50V with 1-second delay", 
      "100V with instant trip",
      "35-50V with 40ms delay"
    ],
    correctAnswer: 3,
    explanation: "For EV charging, VMRs are typically set to 35-50V with fast response times (40ms) for enhanced safety, particularly in outdoor installations where touch voltage risks are higher."
  },
  {
    question: "During an open PEN fault condition, what is the worst-case voltage that could appear on exposed metalwork?",
    answers: [
      "50V above earth potential",
      "110V above earth potential",
      "230V above earth potential",
      "400V above earth potential"
    ],
    correctAnswer: 2,
    explanation: "In the worst-case scenario during an open PEN fault, the full line voltage (230V) can appear on exposed metalwork relative to true earth, creating a fatal shock hazard."
  },
  {
    question: "What type of RCD is essential for TT earthing systems converted from TN-C-S during PEN faults?",
    answers: [
      "Any standard RCD will work",
      "Type A RCD only",
      "30mA RCD with earth electrode ≤200Ω",
      "100mA time-delayed RCD"
    ],
    correctAnswer: 2,
    explanation: "For TT systems, RCD protection is mandatory as overcurrent devices cannot operate due to high earth fault loop impedance. A 30mA RCD requires earth electrode resistance ≤200Ω (50V ÷ 0.03A = 1667Ω maximum, but 200Ω provides better safety margin)."
  },
  {
    question: "What is the main advantage of automatic earth changeover systems in EV charging installations?",
    answers: [
      "Reduces installation costs",
      "Eliminates the need for RCD protection",
      "Provides continuous operation during PEN faults",
      "Switches from TN-C-S to TT operation during faults"
    ],
    correctAnswer: 3,
    explanation: "Automatic earth changeover systems detect PEN faults and switch the installation from TN-C-S to TT earthing system, isolating from the faulty PEN conductor and connecting to a local earth electrode for continued safe operation."
  },
  {
    question: "What earth electrode resistance is required for reliable 30mA RCD operation in TT systems?",
    answers: [
      "Any resistance below 1000Ω",
      "Maximum 500Ω for all applications",
      "200Ω or less for safety margin",
      "50Ω minimum for effective protection"
    ],
    correctAnswer: 2,
    explanation: "While the theoretical maximum is 1667Ω (50V ÷ 0.03A), practical installations require ≤200Ω to provide adequate safety margin and account for soil resistance variations and aging effects."
  },
  {
    question: "How frequently should automatic VMR test functions operate in critical EV charging installations?",
    answers: [
      "Daily automatic tests",
      "Weekly with manual backup",
      "Monthly automatic with annual manual verification",
      "Only when faults are suspected"
    ],
    correctAnswer: 2,
    explanation: "Monthly automatic testing ensures system reliability without excessive wear, while annual manual verification confirms proper operation of all protection functions and settings."
  },
  {
    question: "What is the main disadvantage of current-based PEN protection compared to voltage monitoring?",
    answers: [
      "Higher installation costs",
      "Cannot detect high-impedance PEN faults",
      "Requires more complex wiring",
      "Less reliable in wet conditions"
    ],
    correctAnswer: 1,
    explanation: "Current-based protection may not detect high-impedance PEN faults where dangerous voltages exist but little current flows. Voltage monitoring provides direct detection of the hazardous condition."
  },
  {
    question: "In an automatic earth changeover system, what happens to the installation earthing during a PEN fault?",
    answers: [
      "The installation remains connected to the PEN conductor",
      "All earthing connections are temporarily disconnected",
      "The installation switches from TN-C-S to TT operation",
      "A temporary TN-S system is created"
    ],
    correctAnswer: 2,
    explanation: "The system disconnects from the faulty PEN conductor and connects the installation's earth system to a local earth electrode, creating a TT system for continued safe operation."
  },
  {
    question: "What is the typical reconnection delay after a VMR trip in EV charging applications?",
    answers: [
      "Instant reconnection when fault clears",
      "30 seconds to allow fault clearance",
      "3 minutes to prevent cycling on intermittent faults",
      "Manual reset required in all cases"
    ],
    correctAnswer: 2,
    explanation: "A 3-minute delay prevents automatic cycling on intermittent PEN faults while allowing reasonable recovery time for genuine clearance of the fault condition."
  }
];

export const EVChargingModule4Section2Quiz = () => {
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