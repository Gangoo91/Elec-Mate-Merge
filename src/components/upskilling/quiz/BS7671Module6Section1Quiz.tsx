import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle } from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const quizData: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the purpose of initial verification?",
    options: [
      "To check if the installation looks good",
      "To confirm compliance with BS 7671 and ensure safety before energising",
      "To calculate electricity bills",
      "To check the warranty status"
    ],
    correctAnswer: 1,
    explanation: "Initial verification confirms compliance with BS 7671 Wiring Regulations and ensures the installation is safe, compliant, and fit for service before energising."
  },
  {
    id: 2,
    question: "Under which regulation must initial verification be carried out?",
    options: [
      "BS 7430",
      "BS 7671",
      "BS 7909",
      "BS 7375"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 (Requirements for Electrical Installations) mandates initial verification for all new electrical installations under Chapter 61."
  },
  {
    id: 3,
    question: "Does initial verification apply to new installations, alterations, or both?",
    options: [
      "Only new installations",
      "Only alterations",
      "Both new installations and alterations that include new circuits",
      "Neither - it's optional"
    ],
    correctAnswer: 2,
    explanation: "Initial verification applies to all new electrical installations AND additions/alterations to existing installations if they include new circuits."
  },
  {
    id: 4,
    question: "When must initial verification be carried out — before or after energising?",
    options: [
      "After energising to test functionality",
      "Before energising the installation",
      "During energising process",
      "It doesn't matter when"
    ],
    correctAnswer: 1,
    explanation: "Initial verification must be carried out before the system is energised to ensure safety and prevent potential hazards from defective installations."
  },
  {
    id: 5,
    question: "Name two visual checks required in initial verification.",
    options: [
      "Colour coordination and aesthetic appeal",
      "Workmanship inspection and protective device verification",
      "Cost analysis and time management",
      "Client satisfaction and convenience"
    ],
    correctAnswer: 1,
    explanation: "Visual inspection includes checking workmanship, materials, compliance with regulations, protective devices, earthing, bonding, and labelling."
  },
  {
    id: 6,
    question: "Name two electrical tests required in initial verification.",
    options: [
      "Voltage measurement and power consumption",
      "Continuity testing and insulation resistance testing",
      "Load testing and efficiency testing",
      "Speed testing and capacity testing"
    ],
    correctAnswer: 1,
    explanation: "Electrical testing includes continuity of protective conductors, insulation resistance, polarity, earth fault loop impedance, RCD performance, and functional checks."
  },
  {
    id: 7,
    question: "What is the purpose of recording verification results?",
    options: [
      "To increase paperwork",
      "To provide documented evidence of compliance and baseline for future inspections",
      "To justify higher charges",
      "To satisfy insurance companies only"
    ],
    correctAnswer: 1,
    explanation: "Recording results provides documented evidence of compliance for clients, insurers, and regulators, and establishes a baseline for future inspections and testing (EICR)."
  },
  {
    id: 8,
    question: "What type of certificate is issued for a new installation?",
    options: [
      "Minor Electrical Installation Works Certificate (MEIWC)",
      "Electrical Installation Certificate (EIC)",
      "Electrical Installation Condition Report (EICR)",
      "Building Regulations Certificate"
    ],
    correctAnswer: 1,
    explanation: "An Electrical Installation Certificate (EIC) is issued for new installations and major alterations, while MEIWC is for minor works."
  },
  {
    id: 9,
    question: "Who must sign the verification certificate?",
    options: [
      "Anyone with basic electrical knowledge",
      "The building owner",
      "A competent person with sufficient technical knowledge and experience",
      "Only registered electrical contractors"
    ],
    correctAnswer: 2,
    explanation: "The certificate must be signed by a competent person who possesses sufficient technical knowledge, experience, and skill to avoid danger, taking full responsibility for compliance."
  },
  {
    id: 10,
    question: "In the real-world example, what error was detected because verification was carried out?",
    options: [
      "Wrong cable colour",
      "Reversed polarity on a lighting circuit",
      "Incorrect labelling",
      "Missing documentation"
    ],
    correctAnswer: 1,
    explanation: "In the Manchester commercial office example, reversed polarity on one lighting circuit was discovered during verification, which could have caused electric shock if not corrected."
  }
];

const BS7671Module6Section1Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswers[currentQuestion] !== undefined) return; // lock after first pick
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
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
    setQuizStarted(false);
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === quizData[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-400';
    if (score >= 6) return 'text-yellow-400';
    return 'text-red-400';
  };

  if (!quizStarted) {
    return (
      <Card className="bg-gradient-to-r from-elec-yellow/10 to-elec-gray border-elec-yellow/30">
        <CardHeader>
          <CardTitle className="text-foreground">🧠 Knowledge Check Quiz</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-foreground">
            Test your understanding of initial verification requirements with this comprehensive 10-question quiz.
          </p>
          <Button 
            onClick={() => setQuizStarted(true)}
            className="bg-elec-yellow text-elec-dark hover:bg-yellow-600"
          >
            Start Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (showResults) {
    const score = calculateScore();
    return (
      <Card className="bg-gradient-to-r from-elec-yellow/10 to-elec-gray border-elec-yellow/30">
        <CardHeader>
          <CardTitle className="text-foreground">Quiz Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className={`text-4xl font-bold ${getScoreColor(score)}`}>
              {score}/{quizData.length}
            </div>
            <p className="text-foreground mt-2">
              {score >= 8 ? 'Excellent knowledge of initial verification!' : score >= 6 ? 'Good understanding!' : 'Review the material and try again!'}
            </p>
          </div>
          
          <div className="space-y-3">
            {quizData.map((question, index) => (
              <div key={question.id} className="bg-elec-dark p-3 rounded-md border border-gray-600">
                <div className="flex items-start gap-2">
                  {selectedAnswers[index] === question.correctAnswer ? (
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                  )}
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-1">
                      {question.id}. {question.question}
                    </p>
                    <p className="text-xs text-foreground">
                      {question.explanation}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <Button 
            onClick={handleRestart}
            className="w-full bg-elec-yellow text-elec-dark hover:bg-yellow-600"
          >
            Retake Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  const question = quizData[currentQuestion];
  const progress = ((currentQuestion + 1) / quizData.length) * 100;

  return (
    <Card className="bg-gradient-to-r from-elec-yellow/10 to-elec-gray border-elec-yellow/30">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-foreground">Knowledge Check Quiz</CardTitle>
          <Badge variant="secondary" className="bg-elec-yellow text-elec-dark">
            Question {currentQuestion + 1} of {quizData.length}
          </Badge>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-elec-yellow h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <p className="text-foreground font-semibold mb-4">
            {question.id}. {question.question}
          </p>
          
          <div className="space-y-2">
            {question.options.map((option, index) => {
              const answered = selectedAnswers[currentQuestion] !== undefined;
              const isCorrect = answered && index === question.correctAnswer;
              const isSelected = answered && index === selectedAnswers[currentQuestion];

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={answered}
                  className={`w-full text-left p-3 rounded-md border transition-all duration-200 ${
                    answered
                      ? isCorrect
                        ? 'border-green-500/60 bg-green-500/10 text-foreground'
                        : isSelected
                          ? 'border-red-500/60 bg-red-500/10 text-foreground'
                          : 'border-gray-600 bg-elec-gray text-foreground opacity-60'
                      : selectedAnswers[currentQuestion] === index
                        ? 'border-elec-yellow bg-elec-yellow/10 text-foreground'
                        : 'border-gray-600 bg-elec-gray text-foreground hover:border-gray-500'
                  }`}
                >
                  <span className="font-semibold text-elec-yellow mr-2">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  {option}
                </button>
              );
            })}

            {selectedAnswers[currentQuestion] !== undefined && (
              <div className="mt-3 p-3 rounded-md border border-gray-600 bg-elec-gray">
                <div className="flex items-start gap-2">
                  {selectedAnswers[currentQuestion] === question.correctAnswer ? (
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                  )}
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {selectedAnswers[currentQuestion] === question.correctAnswer ? 'Correct' : 'Incorrect'}
                    </p>
                    <p className="text-xs text-foreground">{question.explanation}</p>
                    {selectedAnswers[currentQuestion] !== question.correctAnswer && (
                      <p className="text-xs text-foreground mt-1">
                        Correct answer: <span className="text-elec-yellow font-medium">
                          {String.fromCharCode(65 + question.correctAnswer)}. {question.options[question.correctAnswer]}
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex justify-between">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            variant="outline"
            className="border-gray-600 text-foreground hover:bg-elec-gray disabled:opacity-50"
          >
            Previous
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={selectedAnswers[currentQuestion] === undefined}
            className="bg-elec-yellow text-elec-dark hover:bg-yellow-600 disabled:opacity-50"
          >
            {currentQuestion === quizData.length - 1 ? 'Finish Quiz' : 'Next'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BS7671Module6Section1Quiz;