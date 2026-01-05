import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, RotateCcw, ArrowRight, ArrowLeft } from 'lucide-react';

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
    question: "What is the first step when arriving at an EV charging installation site?",
    options: [
      "Start unloading equipment",
      "Conduct a site risk assessment",
      "Begin electrical isolation",
      "Test the supply voltage"
    ],
    correctAnswer: 1,
    explanation: "A comprehensive site risk assessment must be conducted first to identify hazards and plan safe working procedures before any work begins."
  },
  {
    id: 2,
    question: "According to BS 7671, what is the minimum isolation distance required before working on electrical circuits?",
    options: [
      "Switching off at the consumer unit only",
      "Visible break isolation with proof of dead testing",
      "Removing the main fuse",
      "Using a non-contact voltage tester"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 requires visible break isolation followed by proving dead with an approved voltage indicator on all conductors."
  },
  {
    id: 3,
    question: "What PPE is mandatory when working on EV charging installations?",
    options: [
      "Safety glasses only",
      "Hard hat and high-vis vest",
      "Arc flash protection rated to 8 cal/cm²",
      "Safety glasses, hard hat, and electrical safety footwear"
    ],
    correctAnswer: 3,
    explanation: "Minimum PPE includes safety glasses, hard hat, and electrical safety footwear. Arc flash PPE may be required for specific work."
  },
  {
    id: 4,
    question: "When must a permit to work system be implemented?",
    options: [
      "For all EV charging installations",
      "Only for commercial installations",
      "For work on live systems or high-risk activities",
      "Never required for qualified electricians"
    ],
    correctAnswer: 2,
    explanation: "Permit to work systems are mandatory for live working and high-risk activities to ensure proper safety controls are in place."
  },
  {
    id: 5,
    question: "What is the maximum earth fault loop impedance for a 32A Type B MCB protecting an EV charging circuit?",
    options: [
      "1.37Ω",
      "1.45Ω",
      "2.3Ω",
      "0.87Ω"
    ],
    correctAnswer: 0,
    explanation: "For a 32A Type B MCB, the maximum Zs is 1.37Ω to ensure disconnection within the required time under fault conditions."
  },
  {
    id: 6,
    question: "What type of RCD is required for EV charging points under BS 7671:2018+A2:2022?",
    options: [
      "Type AC RCD",
      "Type A RCD",
      "Type B RCD or RCM",
      "Standard 30mA RCD"
    ],
    correctAnswer: 2,
    explanation: "Type B RCD or residual current monitoring (RCM) is required to detect DC fault currents that can occur in EV charging systems."
  },
  {
    id: 7,
    question: "What is the minimum cable burial depth for EV charging supply cables?",
    options: [
      "300mm",
      "450mm",
      "600mm",
      "750mm"
    ],
    correctAnswer: 2,
    explanation: "Underground cables must be buried at a minimum depth of 600mm with appropriate protection and warning tape."
  },
  {
    id: 8,
    question: "When working near underground services, what detection method should be used?",
    options: [
      "Visual inspection only",
      "CAT scanner and hand digging",
      "Mechanical excavation",
      "Trial pit digging"
    ],
    correctAnswer: 1,
    explanation: "CAT scanner detection followed by careful hand digging is required to locate and avoid damage to existing underground services."
  },
  {
    id: 9,
    question: "What documentation must be completed before starting installation work?",
    options: [
      "Installation certificate only",
      "Risk assessment, method statement, and permits",
      "Test sheet only",
      "Customer agreement"
    ],
    correctAnswer: 1,
    explanation: "Risk assessment, method statement, and any required permits must be completed before work commences to ensure safe working."
  },
  {
    id: 10,
    question: "How should temporary electrical connections be protected during installation?",
    options: [
      "Basic tape covering",
      "IP44 rated protection with RCD",
      "No protection needed",
      "Plastic sheeting"
    ],
    correctAnswer: 1,
    explanation: "Temporary connections must have appropriate IP rating and RCD protection to ensure safety during the installation process."
  }
];

export function EVChargingModule6Section1Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
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
    setSelectedAnswers([]);
    setShowResults(false);
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === quizQuestions[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-400';
    if (score >= 6) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 8) return 'Excellent';
    if (score >= 6) return 'Good';
    return 'Needs Improvement';
  };

  if (showResults) {
    const score = calculateScore();
    return (
      <Card className="bg-elec-gray border-gray-700">
        <CardHeader>
          <CardTitle className="text-foreground text-center">Quiz Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className={`text-4xl font-bold ${getScoreColor(score)}`}>
              {score}/{quizQuestions.length}
            </div>
            <Badge variant="secondary" className="mt-2">
              {getScoreBadge(score)}
            </Badge>
          </div>

          <div className="space-y-4">
            {quizQuestions.map((question, index) => {
              const userAnswer = selectedAnswers[index];
              const isCorrect = userAnswer === question.correctAnswer;
              
              return (
                <div key={question.id} className="bg-[#323232] p-4 rounded-lg">
                  <div className="flex items-start gap-3 mb-3">
                    {isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="text-foreground font-medium mb-2">{question.question}</p>
                      <p className="text-sm text-gray-300 mb-2">
                        Your answer: <span className={isCorrect ? 'text-green-400' : 'text-red-400'}>
                          {question.options[userAnswer]}
                        </span>
                      </p>
                      {!isCorrect && (
                        <p className="text-sm text-gray-300 mb-2">
                          Correct answer: <span className="text-green-400">
                            {question.options[question.correctAnswer]}
                          </span>
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
              onClick={handleRestart}
              className="bg-elec-yellow text-elec-dark hover:bg-yellow-400"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Restart Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-foreground">
            Question {currentQuestion + 1} of {quizQuestions.length}
          </CardTitle>
          <Badge variant="outline" className="border-gray-600 text-gray-300">
            Safe Installation Quiz
          </Badge>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-elec-yellow h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4">{question.question}</h3>
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                  selectedAnswers[currentQuestion] === index
                    ? 'border-elec-yellow bg-yellow-600/20 text-foreground'
                    : 'border-gray-600 bg-[#323232] text-gray-300 hover:border-gray-500 hover:bg-gray-700/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    selectedAnswers[currentQuestion] === index
                      ? 'border-elec-yellow'
                      : 'border-gray-500'
                  }`}>
                    {selectedAnswers[currentQuestion] === index && (
                      <div className="w-2 h-2 rounded-full bg-elec-yellow" />
                    )}
                  </div>
                  <span>{option}</span>
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
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={selectedAnswers[currentQuestion] === undefined}
            className="bg-elec-yellow text-elec-dark hover:bg-yellow-400 disabled:bg-gray-600 disabled:text-gray-400"
          >
            {currentQuestion === quizQuestions.length - 1 ? 'Finish' : 'Next'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}