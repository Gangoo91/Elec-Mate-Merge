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
    question: "What is the primary purpose of recording limitations on electrical certificates?",
    options: [
      "To reduce the electrician's workload",
      "To protect electricians from liability for uninspected areas",
      "To increase the certificate's value",
      "To impress clients with thoroughness"
    ],
    correctAnswer: 1,
    explanation: "Limitations protect electricians from liability for defects in areas that could not be inspected due to practical constraints, while informing clients of inspection scope restrictions."
  },
  {
    id: 2,
    question: "Which safety observation code indicates immediate danger requiring urgent action?",
    options: [
      "C2 - Potentially dangerous",
      "C3 - Improvement recommended",
      "C1 - Danger present",
      "FI - Further investigation"
    ],
    correctAnswer: 2,
    explanation: "C1 indicates danger present with immediate action required. The installation or affected circuits should be isolated immediately until remedial action is completed."
  },
  {
    id: 3,
    question: "What type of defect would typically receive a C2 classification?",
    options: [
      "Live parts accessible to normal contact",
      "Missing RCD protection where not originally required",
      "Inadequate earthing that could become dangerous under fault conditions",
      "Old cable colours that don't comply with current standards"
    ],
    correctAnswer: 2,
    explanation: "C2 indicates potentially dangerous defects that don't pose immediate danger but could become dangerous under fault conditions, such as inadequate earthing arrangements."
  },
  {
    id: 4,
    question: "When should extensive limitations affect certificate validity?",
    options: [
      "Never - any limitations are acceptable",
      "When limitations exceed 25% of the installation",
      "Only if the client requests it",
      "When major portions or critical safety systems cannot be inspected"
    ],
    correctAnswer: 3,
    explanation: "When major portions of the installation (typically >25%) or critical safety systems cannot be inspected, the certificate's validity and usefulness may be compromised."
  },
  {
    id: 5,
    question: "What information must be included when recording an observation?",
    options: [
      "Just the location and problem description",
      "Location, defect description, regulation reference, risk assessment, and recommended action",
      "Only the safety code classification",
      "The electrician's opinion about the installation"
    ],
    correctAnswer: 1,
    explanation: "Complete observations require precise location, clear defect description, relevant regulation reference, risk assessment, recommended remedial action, and appropriate safety code classification."
  },
  {
    id: 6,
    question: "Which scenario would justify recording a limitation?",
    options: [
      "The electrician doesn't want to inspect certain areas",
      "Locked rooms where keys are unavailable during inspection",
      "Areas that look difficult to access",
      "Circuits that appear to be working properly"
    ],
    correctAnswer: 1,
    explanation: "Legitimate limitations include physical access restrictions like locked rooms where keys are unavailable, safety restrictions, or operational constraints beyond the electrician's control."
  },
  {
    id: 7,
    question: "What does an 'FI' observation code indicate?",
    options: [
      "Fatal incident occurred",
      "Fire investigation needed",
      "Further investigation required to determine if defect exists",
      "Final inspection completed"
    ],
    correctAnswer: 2,
    explanation: "FI (Further Investigation) indicates items requiring additional investigation to determine if they constitute a defect, often requiring specialist knowledge or additional testing."
  },
  {
    id: 8,
    question: "How should C3 observations be prioritised?",
    options: [
      "Must be rectified immediately",
      "Should be addressed urgently within days",
      "Improvement recommended but not urgent",
      "Can be ignored as they're not important"
    ],
    correctAnswer: 2,
    explanation: "C3 observations indicate installations that don't comply with current standards but aren't dangerous. Improvement would enhance safety but is not urgent."
  },
  {
    id: 9,
    question: "What should be done if access to critical safety systems is limited?",
    options: [
      "Complete the certificate anyway",
      "Consider whether the certificate remains valid with such limitations",
      "Just mention it briefly in limitations",
      "Ignore the limitation and continue"
    ],
    correctAnswer: 1,
    explanation: "When access to critical safety systems is limited, professional judgment is required to determine if sufficient inspection has been completed to provide meaningful certification."
  },
  {
    id: 10,
    question: "Which statement best describes the difference between limitations and observations?",
    options: [
      "They are the same thing recorded differently",
      "Limitations record what couldn't be inspected; observations record defects found",
      "Observations are more important than limitations",
      "Limitations are optional while observations are mandatory"
    ],
    correctAnswer: 1,
    explanation: "Limitations record areas that could not be inspected due to constraints, while observations record actual defects or non-compliance issues found during inspection."
  }
];

const BS7671Module6Section6Quiz = () => {
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
            Test your understanding of limitations and observations in electrical certificates with this comprehensive 10-question quiz.
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
              {score >= 8 ? 'Excellent knowledge of limitations and observations!' : score >= 6 ? 'Good understanding!' : 'Review the material and try again!'}
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

export default BS7671Module6Section6Quiz;