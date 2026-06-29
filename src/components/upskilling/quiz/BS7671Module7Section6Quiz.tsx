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
    question: 'Which new Part of BS 7671 was introduced by Amendment 2?',
    options: [
      'Part 7 — Special Installations or Locations',
      'Part 9 — Emergency Systems',
      'Part 8 — Prosumer Electrical Installations',
      'Part 10 — Data and Communication Systems',
    ],
    correctAnswer: 2,
    explanation:
      'Amendment 2 added Part 8, covering prosumer electrical installations that both consume and generate electrical energy, such as PV with storage.',
  },
  {
    id: 2,
    question: 'How did Amendment 2 change requirements for EV charger safety?',
    options: [
      'It enhanced PEN fault protection and RCD requirements',
      'It made no changes to EV charging requirements',
      'It introduced only cosmetic, editorial updates',
      'It removed existing EV safety requirements',
    ],
    correctAnswer: 0,
    explanation:
      'Amendment 2 tightened the rules for EV charging, including protection against an open PEN conductor and the required RCD types for charging points.',
  },
  {
    id: 3,
    question: 'How did Amendment 2 affect surge protective device (SPD) requirements?',
    options: [
      'It reduced the situations where SPDs are needed',
      'It removed references to SPDs entirely',
      'It applied SPD requirements to domestic properties only',
      'It expanded the situations requiring surge protection',
    ],
    correctAnswer: 3,
    explanation:
      'Amendment 2 broadened where surge protection must be provided, giving better protection against transient overvoltages across more installation types.',
  },
  {
    id: 4,
    question: 'Which fire-safety area did Amendment 2 strengthen?',
    options: [
      'Fire safety requirements were largely removed',
      'Cable selection and installation along escape routes',
      'Only the appearance of fitted equipment',
      'Fire safety applied to domestic properties only',
    ],
    correctAnswer: 1,
    explanation:
      'Amendment 2 strengthened fire-safety provisions, particularly the selection and support of cables in escape routes and other higher-risk areas.',
  },
  {
    id: 5,
    question: 'How did Amendment 2 treat protective bonding requirements?',
    options: [
      'It relaxed them, removing many requirements',
      'It removed the need for bonding altogether',
      'It made no changes to bonding requirements',
      'It clarified them with expanded applications',
    ],
    correctAnswer: 3,
    explanation:
      'Amendment 2 gave clearer guidance on when supplementary bonding is needed and extended bonding considerations into more special locations.',
  },
];

const BS7671Module7Section6Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
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
            Test your understanding of Amendment 2 changes to special locations with this 5-question
            quiz.
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
              {score >= 4
                ? 'Excellent knowledge of Amendment 2 updates!'
                : score >= 3
                  ? 'Good understanding!'
                  : 'Review the material and try again!'}
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
                    <p className="text-xs text-gray-400">{question.explanation}</p>
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
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-3 rounded-md border transition-all duration-200 ${
                  selectedAnswers[currentQuestion] === index
                    ? 'border-elec-yellow bg-elec-yellow/10 text-foreground'
                    : 'border-gray-600 bg-elec-gray text-gray-300 hover:border-gray-500'
                }`}
              >
                <span className="font-semibold text-elec-yellow mr-2">
                  {String.fromCharCode(65 + index)}.
                </span>
                {option}
              </button>
            ))}
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

export default BS7671Module7Section6Quiz;
