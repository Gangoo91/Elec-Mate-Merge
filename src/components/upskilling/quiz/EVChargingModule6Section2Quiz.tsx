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
    question: "What is the maximum voltage drop allowed for a 32A EV charging circuit according to BS 7671?",
    options: [
      "3% of nominal voltage",
      "5% of nominal voltage", 
      "7% of nominal voltage",
      "10% of nominal voltage"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 allows maximum 5% voltage drop for circuits supplying fixed equipment like EV charging points."
  },
  {
    id: 2,
    question: "What type of cable is recommended for EV charging installations?",
    options: [
      "Standard PVC/PVC cable",
      "LSF cable for all installations",
      "SWA cable for outdoor runs, LSF for indoor",
      "Any BS 6004 compliant cable"
    ],
    correctAnswer: 2,
    explanation: "SWA (Steel Wire Armoured) cable provides mechanical protection for outdoor runs, while LSF (Low Smoke and Fume) cable is used indoors."
  },
  {
    id: 3,
    question: "When terminating SWA cable, what must be done with the steel wire armour?",
    options: [
      "Cut it back and ignore",
      "Connect to earth via CW gland",
      "Tape over the cut ends",
      "Leave it unconnected"
    ],
    correctAnswer: 1,
    explanation: "Steel wire armour must be properly earthed using a CW (Cable Wire) gland to maintain the earthing integrity and provide fault protection."
  },
  {
    id: 4,
    question: "What is the minimum bending radius for 6mm² SWA cable?",
    options: [
      "6 times the cable diameter",
      "8 times the cable diameter",
      "12 times the cable diameter",
      "15 times the cable diameter"
    ],
    correctAnswer: 2,
    explanation: "The minimum bending radius for SWA cable is 12 times the overall cable diameter to prevent damage to conductors and armour."
  },
  {
    id: 5,
    question: "How should cable joints be made in EV charging installations?",
    options: [
      "Electrical tape only",
      "Proper junction boxes with IP65 rating",
      "Heat shrink tubing",
      "Joints should be avoided where possible"
    ],
    correctAnswer: 3,
    explanation: "Cable joints should be avoided where possible. When necessary, use proper junction boxes with appropriate IP rating and maintenance access."
  },
  {
    id: 6,
    question: "What size earth conductor is required for a 6mm² EV charging circuit?",
    options: [
      "2.5mm²",
      "4mm²", 
      "6mm²",
      "10mm²"
    ],
    correctAnswer: 2,
    explanation: "For a 6mm² line conductor, a 6mm² earth conductor is required as the CSA is ≤16mm² (same size as line conductor)."
  },
  {
    id: 7,
    question: "What is the correct torque setting for 6mm² terminations in most consumer units?",
    options: [
      "1.2 Nm",
      "2.5 Nm",
      "3.5 Nm", 
      "5.0 Nm"
    ],
    correctAnswer: 1,
    explanation: "Most consumer unit terminals require 2.5 Nm torque for 6mm² conductors. Always check manufacturer specifications."
  },
  {
    id: 8,
    question: "How should cable entry points through external walls be sealed?",
    options: [
      "Expanding foam only",
      "Fire-rated sealant and weatherproofing",
      "Standard silicone sealant",
      "No sealing required"
    ],
    correctAnswer: 1,
    explanation: "Cable entries must be sealed with fire-rated sealant to maintain fire compartmentation and weatherproofing to prevent water ingress."
  },
  {
    id: 9,
    question: "What identification should be provided for EV charging circuits?",
    options: [
      "No special identification required",
      "Standard circuit number only",
      "Clear labelling including 'EV CHARGING CIRCUIT'",
      "Colour coding only"
    ],
    correctAnswer: 2,
    explanation: "EV charging circuits must be clearly identified with appropriate labelling including 'EV CHARGING CIRCUIT' for easy identification during maintenance."
  },
  {
    id: 10,
    question: "When routing cables in roof spaces, what minimum clearance from heat sources is required?",
    options: [
      "50mm",
      "100mm",
      "150mm",
      "200mm"
    ],
    correctAnswer: 2,
    explanation: "Cables must maintain at least 150mm clearance from heat sources like flues and hot water pipes to prevent thermal damage."
  }
];

export function EVChargingModule6Section2Quiz() {
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
            Cable Termination Quiz
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