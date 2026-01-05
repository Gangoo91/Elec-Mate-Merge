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
    question: "What is the main purpose of an Electrical Installation Certificate (EIC)?",
    options: [
      "To record maintenance activities",
      "To certify that new electrical work complies with BS 7671",
      "To provide warranty information",
      "To record energy consumption"
    ],
    correctAnswer: 1,
    explanation: "An EIC certifies that new electrical installation work has been designed, constructed, inspected and tested in accordance with BS 7671, confirming compliance and safety."
  },
  {
    id: 2,
    question: "Who can sign an Electrical Installation Certificate?",
    options: [
      "Any qualified electrician",
      "Only the client or building owner",
      "The person responsible for the design, construction, inspection and testing",
      "The local building inspector"
    ],
    correctAnswer: 2,
    explanation: "Only the skilled person responsible for the design, construction, inspection and testing of the electrical work can sign an EIC, taking legal responsibility for compliance."
  },
  {
    id: 3,
    question: "What information must be included on test result schedules?",
    options: [
      "Only failed test results",
      "All test results including continuity, insulation resistance, polarity, earth fault loop impedance, and RCD tests",
      "Just the final inspection outcome",
      "Only visual inspection notes"
    ],
    correctAnswer: 1,
    explanation: "Test result schedules must include ALL test results: continuity of protective conductors, insulation resistance, polarity, earth fault loop impedance, and RCD test results."
  },
  {
    id: 4,
    question: "When should a Minor Electrical Installation Works Certificate (MEIWC) be used?",
    options: [
      "For all electrical work",
      "For small additions and alterations that don't affect the main characteristics of the installation",
      "Only for emergency repairs",
      "For major rewiring projects"
    ],
    correctAnswer: 1,
    explanation: "MEIWC is used for minor work such as adding socket outlets, lighting points, or replacing consumer units where the work doesn't affect the installation's main characteristics."
  },
  {
    id: 5,
    question: "What is the purpose of an Electrical Installation Condition Report (EICR)?",
    options: [
      "To certify new installations",
      "To assess the condition of existing electrical installations and identify defects",
      "To record minor electrical work",
      "To provide energy efficiency ratings"
    ],
    correctAnswer: 1,
    explanation: "An EICR assesses the safety and condition of existing electrical installations, identifying any deterioration, defects, or non-compliance with current standards."
  },
  {
    id: 6,
    question: "What are the EICR classification codes for defects?",
    options: [
      "Pass, Fail, Unsatisfactory",
      "C1 (Danger present), C2 (Potentially dangerous), C3 (Improvement recommended)",
      "Red, Amber, Green",
      "Class A, Class B, Class C"
    ],
    correctAnswer: 1,
    explanation: "EICR uses C1 (danger present - immediate action required), C2 (potentially dangerous - urgent remedial action required), and C3 (improvement recommended)."
  },
  {
    id: 7,
    question: "How long should electrical certificates be retained?",
    options: [
      "1 year",
      "5 years",
      "Until the next inspection or when the installation is modified",
      "Indefinitely"
    ],
    correctAnswer: 2,
    explanation: "Electrical certificates should be retained until the next inspection/test or when the installation is modified, providing ongoing evidence of compliance and safety."
  },
  {
    id: 8,
    question: "What must be checked before signing any electrical certificate?",
    options: [
      "Only the final test results",
      "That all inspection and test results are accurate and within acceptable limits",
      "Just the visual inspection",
      "Only the client's satisfaction"
    ],
    correctAnswer: 1,
    explanation: "Before signing, all inspection and test results must be verified as accurate and within acceptable limits defined in BS 7671, ensuring complete compliance."
  },
  {
    id: 9,
    question: "Who should receive copies of electrical certificates?",
    options: [
      "Only the electrician",
      "The client/building owner and Local Authority Building Control (if applicable)",
      "Just the client",
      "Only Building Control"
    ],
    correctAnswer: 1,
    explanation: "Copies should be given to the client/building owner for their records and to Local Authority Building Control when required under Building Regulations."
  },
  {
    id: 10,
    question: "In the real-world example, what issue was identified during certificate completion?",
    options: [
      "Missing test equipment calibration",
      "Several circuits were not properly identified on the schedule, requiring correction before certificate completion",
      "Incorrect voltage readings",
      "Wrong cable calculations"
    ],
    correctAnswer: 1,
    explanation: "In the commercial installation example, several circuits were not properly identified on the test result schedule, requiring correction to ensure accurate documentation before certificate completion."
  }
];

const BS7671Module6Section4Quiz = () => {
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
          <CardTitle className="text-foreground">Knowledge Check Quiz</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-foreground">
            Test your understanding of electrical certification forms and completion procedures with this comprehensive 10-question quiz.
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
              {score >= 8 ? 'Excellent knowledge of certification procedures!' : score >= 6 ? 'Good understanding!' : 'Review the material and try again!'}
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

export default BS7671Module6Section4Quiz;