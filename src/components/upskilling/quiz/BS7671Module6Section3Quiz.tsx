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
    question: "What is the purpose of RCD testing?",
    options: [
      "To measure insulation resistance",
      "To verify the RCD operates correctly at its rated current and within required time limits",
      "To check polarity connections", 
      "To measure earth fault loop impedance"
    ],
    correctAnswer: 1,
    explanation: "RCD testing verifies that the device operates correctly at its rated tripping current (IΔn) and within the required time limits as specified in BS 7671."
  },
  {
    id: 2,
    question: "What are the two main RCD tests required?",
    options: [
      "Visual inspection and continuity",
      "Insulation resistance and polarity",
      "Operation test at rated tripping current (IΔn) and time test",
      "Earth fault loop impedance and functional test"
    ],
    correctAnswer: 2,
    explanation: "The two main RCD tests are: 1) Operation test at rated tripping current (IΔn) to verify it trips, and 2) Time test to ensure it operates within specified time limits."
  },
  {
    id: 3,
    question: "At what test current should a 30mA RCD trip during testing?",
    options: [
      "15mA (½ IΔn)",
      "30mA (IΔn)", 
      "150mA (5 × IΔn)",
      "Any of the above depending on the test"
    ],
    correctAnswer: 3,
    explanation: "RCD testing involves multiple test currents: ½ IΔn (should NOT trip), IΔn (should trip), and 5 × IΔn for time testing. All are used in comprehensive RCD testing."
  },
  {
    id: 4,
    question: "What is the maximum tripping time for a 30mA RCD at 5 × IΔn (150mA)?",
    options: [
      "300ms",
      "150ms", 
      "40ms",
      "30ms"
    ],
    correctAnswer: 2,
    explanation: "For general purpose RCDs, the maximum tripping time at 5 × IΔn is 40ms. This fast operation is crucial for protection against electric shock."
  },
  {
    id: 5,
    question: "Why is the ½ IΔn test important?",
    options: [
      "To ensure the RCD trips quickly",
      "To verify the RCD does NOT trip at currents below its rating",
      "To measure earth fault loop impedance",
      "To test insulation resistance"
    ],
    correctAnswer: 1,
    explanation: "The ½ IΔn test (e.g., 15mA for a 30mA RCD) ensures the device does NOT trip at currents below its rating, preventing nuisance tripping while maintaining proper protection levels."
  },
  {
    id: 6,
    question: "What should you do before conducting RCD tests?",
    options: [
      "Start testing immediately",
      "Check that downstream circuits are isolated and equipment disconnected",
      "Only test during daylight hours",
      "Increase the test current gradually"
    ],
    correctAnswer: 1,
    explanation: "Before RCD testing, ensure downstream circuits are isolated and equipment is disconnected to prevent damage to sensitive electronic equipment and obtain accurate test results."
  },
  {
    id: 7,
    question: "How should RCD test results be recorded?",
    options: [
      "Only record if they fail",
      "Just note 'RCD OK' on the certificate",
      "Record actual tripping current and time for each test",
      "Recording is not required for RCDs"
    ],
    correctAnswer: 2,
    explanation: "All RCD test results must be recorded, including actual tripping current and time for each test phase. This provides evidence of compliance and helps identify deteriorating performance over time."
  },
  {
    id: 8,
    question: "What action is required if an RCD fails to meet test requirements?",
    options: [
      "Continue testing other circuits",
      "Replace or repair the RCD before energising",
      "Reduce the test current and retest", 
      "Note on certificate but continue"
    ],
    correctAnswer: 1,
    explanation: "If an RCD fails testing (doesn't trip at IΔn, trips at ½ IΔn, or exceeds time limits), it must be replaced or repaired before the installation can be energised safely."
  },
  {
    id: 9,
    question: "Why must RCD testing be carried out on each phase separately?",
    options: [
      "To save time",
      "To identify faults on specific phases and ensure all phases provide equal protection",
      "It's not necessary to test each phase",
      "To reduce wear on the test instrument"
    ],
    correctAnswer: 1,
    explanation: "Each phase must be tested separately to identify any faults on specific phases and ensure all phases provide equal protection. This also verifies proper RCD wiring and connection integrity."
  },
  {
    id: 10,
    question: "In the real-world example, what issue was discovered during RCD testing?",
    options: [
      "All RCDs failed completely",
      "One RCD was taking 65ms to trip at 5 × IΔn instead of the required 40ms maximum",
      "The RCDs were wired incorrectly",
      "The test equipment was faulty"
    ],
    correctAnswer: 1,
    explanation: "In the office building example, one RCD was taking 65ms to trip at 5 × IΔn, exceeding the 40ms maximum requirement. This indicated deteriorating performance requiring replacement before energising."
  }
];

const BS7671Module6Section3Quiz = () => {
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
            Test your understanding of RCD testing procedures and requirements with this comprehensive 10-question quiz.
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
              {score >= 8 ? 'Excellent knowledge of RCD testing procedures!' : score >= 6 ? 'Good understanding!' : 'Review the material and try again!'}
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

export default BS7671Module6Section3Quiz;