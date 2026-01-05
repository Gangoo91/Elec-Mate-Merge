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
    question: "What's a medical IT system?",
    options: [
      "A computer system for hospitals",
      "An isolating transformer system with earth monitoring",
      "A backup power system",
      "An emergency lighting system"
    ],
    correctAnswer: 1,
    explanation: "A medical IT system uses an isolating transformer to provide electrical separation with continuous insulation monitoring to ensure patient safety in medical locations."
  },
  {
    id: 2,
    question: "How are hospital socket outlets protected?",
    options: [
      "Standard domestic RCDs",
      "Medical IT systems with insulation monitoring",
      "No special protection needed",
      "Only surge protection"
    ],
    correctAnswer: 1,
    explanation: "Hospital socket outlets in medical locations are typically supplied from medical IT systems with continuous insulation monitoring to prevent the first fault from causing disconnection."
  },
  {
    id: 3,
    question: "What is the key design requirement for industrial power systems?",
    options: [
      "Lowest cost installation",
      "Continuity of supply and safety",
      "Fastest installation method",
      "Simplest wiring arrangement"
    ],
    correctAnswer: 1,
    explanation: "Industrial power systems require high continuity of supply to avoid production losses while maintaining safety standards through proper design and protection."
  },
  {
    id: 4,
    question: "Why is selectivity important?",
    options: [
      "To reduce installation costs",
      "To ensure only the faulty circuit disconnects, maintaining supply to healthy circuits",
      "To increase cable sizes",
      "To reduce maintenance"
    ],
    correctAnswer: 1,
    explanation: "Selectivity ensures that only the protective device closest to the fault operates, maintaining supply to healthy circuits and minimising disruption."
  },
  {
    id: 5,
    question: "Can safety and non-safety circuits share containment?",
    options: [
      "Yes, always allowed",
      "No, they must be segregated",
      "Only in domestic installations",
      "Only with special cable types"
    ],
    correctAnswer: 1,
    explanation: "Safety circuits (fire alarms, emergency lighting) must be segregated from non-safety circuits to prevent non-safety circuit faults affecting critical safety systems."
  }
];

const BS7671Module7Section4Quiz = () => {
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
    if (score >= 4) return 'text-green-400';
    if (score >= 3) return 'text-yellow-400';
    return 'text-red-400';
  };

  if (!quizStarted) {
    return (
      <Card className="bg-gradient-to-r from-elec-yellow/10 to-elec-gray border-elec-yellow/30">
        <CardHeader>
          <CardTitle className="text-foreground">🧠 Knowledge Check Quiz</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-300">
            Test your understanding of medical, commercial, and industrial installation requirements with this 5-question quiz.
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
            <p className="text-gray-300 mt-2">
              {score >= 4 ? 'Excellent knowledge of critical installations!' : score >= 3 ? 'Good understanding!' : 'Review the material and try again!'}
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
                    <p className="text-xs text-gray-400">
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
                          : 'border-gray-600 bg-elec-gray text-gray-300 opacity-60'
                      : selectedAnswers[currentQuestion] === index
                        ? 'border-elec-yellow bg-elec-yellow/10 text-foreground'
                        : 'border-gray-600 bg-elec-gray text-gray-300 hover:border-gray-500'
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
                    <p className="text-xs text-gray-400">{question.explanation}</p>
                    {selectedAnswers[currentQuestion] !== question.correctAnswer && (
                      <p className="text-xs text-gray-400 mt-1">
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
            className="border-gray-600 text-gray-300 hover:bg-elec-gray disabled:opacity-50"
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

export default BS7671Module7Section4Quiz;