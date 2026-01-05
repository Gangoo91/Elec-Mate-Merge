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
    question: "What is the primary risk of certification errors in electrical installations?",
    options: [
      "Increased project costs",
      "Legal liability and safety compromise",
      "Client dissatisfaction only",
      "Delayed project completion"
    ],
    correctAnswer: 1,
    explanation: "Certification errors can create legal liability for electricians, compromise safety, invalidate insurance coverage, and potentially lead to accidents if defects are not properly documented."
  },
  {
    id: 2,
    question: "Which type of error is most commonly found in electrical certificates?",
    options: [
      "Mathematical calculation mistakes",
      "Incorrect circuit descriptions and protective device ratings",
      "Missing photographs",
      "Wrong signature formats"
    ],
    correctAnswer: 1,
    explanation: "Incorrect circuit descriptions and protective device ratings are the most common certification errors, often resulting from transcription mistakes and inadequate verification procedures."
  },
  {
    id: 3,
    question: "What must be done if a significant error is discovered after certificate issue?",
    options: [
      "Simply inform the client verbally",
      "Cross out the error and write the correction",
      "Issue formal correction notice and update all documentation",
      "Wait until the next inspection to correct it"
    ],
    correctAnswer: 2,
    explanation: "Significant errors require formal correction procedures including correction notices, updated documentation, re-testing if necessary, and notification of all relevant parties. Original certificates should never be altered."
  },
  {
    id: 4,
    question: "Which quality control measure is most effective for preventing certification errors?",
    options: [
      "Using expensive test equipment",
      "Peer review and systematic verification procedures",
      "Working faster to reduce mistakes",
      "Relying on experience alone"
    ],
    correctAnswer: 1,
    explanation: "Peer review and systematic verification procedures are the most effective prevention measures, providing independent checking of critical measurements, calculations, and documentation."
  },
  {
    id: 5,
    question: "What information must be included when recording test result errors?",
    options: [
      "Just the correct value",
      "Original reading, correct value, reason for error, and corrective action",
      "Only the date of correction",
      "The test equipment serial number"
    ],
    correctAnswer: 1,
    explanation: "Complete error correction documentation includes original reading, correct value, reason for error, corrective action taken, and verification of correction to maintain traceability."
  },
  {
    id: 6,
    question: "When should test instruments be calibrated to prevent measurement errors?",
    options: [
      "Only when they give obviously wrong readings",
      "Annually regardless of usage",
      "According to manufacturer's schedule and before critical tests",
      "Never - they don't need calibration"
    ],
    correctAnswer: 2,
    explanation: "Test instruments should be calibrated according to manufacturer's recommendations and before critical tests to ensure accuracy. Regular calibration prevents systematic measurement errors."
  },
  {
    id: 7,
    question: "What is the consequence of incomplete limitation statements on certificates?",
    options: [
      "No consequences - they're optional",
      "Potential liability for undiscovered defects in uninspected areas",
      "Higher insurance premiums only",
      "Client complaints about service"
    ],
    correctAnswer: 1,
    explanation: "Incomplete limitation statements can create liability for defects in areas that weren't inspected but weren't properly documented as limitations, potentially making the electrician responsible for undiscovered problems."
  },
  {
    id: 8,
    question: "Which administrative error most commonly invalidates electrical certificates?",
    options: [
      "Using blue ink instead of black",
      "Missing signatures, dates, or incorrect certificate types",
      "Slight spelling mistakes in addresses",
      "Using abbreviated circuit descriptions"
    ],
    correctAnswer: 1,
    explanation: "Missing signatures, incorrect dates, or using wrong certificate types are critical administrative errors that can completely invalidate certificates and create legal problems."
  },
  {
    id: 9,
    question: "How should circuit description errors be prevented during inspection?",
    options: [
      "Copy descriptions from old certificates",
      "Use generic descriptions for all circuits",
      "Verify each circuit individually and use precise descriptions",
      "Ask the client what each circuit does"
    ],
    correctAnswer: 2,
    explanation: "Each circuit must be individually verified and described precisely based on actual inspection findings, not assumptions or previous documentation which may be incorrect."
  },
  {
    id: 10,
    question: "What quality assurance procedure helps prevent transcription errors in test results?",
    options: [
      "Taking multiple readings and recording immediately",
      "Writing everything down later from memory",
      "Using only digital instruments",
      "Having someone else read the instruments"
    ],
    correctAnswer: 0,
    explanation: "Taking multiple readings for verification and recording results immediately while at the test location helps prevent transcription errors and ensures accuracy of recorded values."
  }
];

const BS7671Module6Section5Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswers[currentQuestion] !== undefined) return;
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
            Test your understanding of certification errors and quality control with this comprehensive 10-question quiz.
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
              {score >= 8 ? 'Excellent knowledge of certification quality control!' : score >= 6 ? 'Good understanding!' : 'Review the material and try again!'}
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

export default BS7671Module6Section5Quiz;