import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, ArrowLeft, ArrowRight } from 'lucide-react';

export const SmartHomeSection5Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      question: 'What is the main advantage of retrofit smart home installations?',
      options: [
        'Lower upfront costs and minimal disruption',
        'A fully concealed, professional wiring finish',
        'Comprehensive whole-property system integration',
        'Structured cabling that future-proofs the home',
      ],
      correct: 0,
      explanation:
        'Retrofit uses mostly wireless devices fitted to an existing property, keeping cost and disruption low — the trade-off is less integration and visible hardware.',
    },
    {
      question: 'Which installation approach is best suited to renters?',
      options: [
        'New build structured-cabling integration',
        'Retrofit using portable, removable devices',
        'A hybrid wired-and-wireless system',
        'A professionally hardwired installation',
      ],
      correct: 1,
      explanation:
        'Renters benefit from retrofit devices such as smart plugs and bulbs that need no rewiring and can be taken to the next property.',
    },
    {
      question: 'What is a key benefit of new build smart home integration?',
      options: [
        'It has the lowest initial cost of any approach',
        'It can be completed in a single afternoon',
        'Hidden wiring and a professional finish',
        'Devices are the easiest to swap out later',
      ],
      correct: 2,
      explanation:
        'Designing the system in during construction allows cables to be concealed in walls, giving a clean, professional finish that retrofit cannot match.',
    },
    {
      question: 'For a budget under £3,000, which approach is typically recommended?',
      options: [
        'A comprehensive new build installation',
        'A professionally cabled hybrid system',
        'A commercial-grade control system',
        'A retrofit installation',
      ],
      correct: 3,
      explanation:
        'Retrofit keeps costs low by avoiding building work, making it the realistic choice for modest budgets around £3,000.',
    },
    {
      question: 'What makes new build installations more future-proof?',
      options: [
        'They rely entirely on wireless technology',
        'They are cheaper to expand later',
        'They use a simpler initial setup',
        'Structured cabling and spare conduits',
      ],
      correct: 3,
      explanation:
        'Running structured cabling and leaving spare conduit during construction lets the system be upgraded and expanded without disruptive rewiring later.',
    },
    {
      question: 'Which factor is most important when choosing between retrofit and new build?',
      options: [
        'The customer’s preferred device brands',
        'The room colour schemes',
        'Property status and available budget',
        'Local weather conditions',
      ],
      correct: 2,
      explanation:
        'Whether the property is owned, rented or being built, plus the budget available, are the decisive factors in choosing retrofit versus new build.',
    },
    {
      question: 'What is typically the highest-cost component in new build smart homes?',
      options: [
        'Professional installation and structured cabling',
        'The smart bulbs throughout the property',
        'The voice assistant speakers',
        'The smart plugs and adaptors',
      ],
      correct: 0,
      explanation:
        'Labour and the structured cabling infrastructure dominate the cost of a new build system, far outweighing individual devices like bulbs or plugs.',
    },
    {
      question:
        'For a growing family wanting security and energy management, which approach is recommended?',
      options: [
        'Basic retrofit with no expansion planned',
        'A hybrid retrofit with gradual expansion',
        'Waiting for a future new build opportunity',
        'A commercial-grade control system',
      ],
      correct: 1,
      explanation:
        'A hybrid retrofit lets a family add security and energy devices in stages, spreading cost while building toward a fuller system.',
    },
    {
      question: 'What is the typical disruption level for retrofit installations?',
      options: [
        'Major structural construction is required',
        'The whole property must be rewired',
        'Minimal disruption with near-immediate use',
        'The property must be vacated during work',
      ],
      correct: 2,
      explanation:
        'Because retrofit relies on wireless devices fitted to existing fixtures, disruption is minimal and the system is usable almost immediately.',
    },
    {
      question: 'Which scenario best suits comprehensive new build integration?',
      options: [
        'A permanent family home with a high budget',
        'Short-term student accommodation',
        'A short-term rental property',
        'A temporary living arrangement',
      ],
      correct: 0,
      explanation:
        'The cost and permanence of designed-in cabling only pay off in a long-term, owner-occupied home where the budget supports it.',
    },
  ];

  const handleAnswerSelect = (answerIndex: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: answerIndex,
    });
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correct.toString()) {
        correct++;
      }
    });
    return correct;
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
  };

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <Card className="bg-elec-gray border-gray-700">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Brain className="h-5 w-5 text-elec-yellow" />
            Quiz Results
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="text-4xl font-bold text-elec-yellow">
            {score}/{questions.length}
          </div>
          <div className="text-xl text-foreground">{percentage}% Correct</div>
          <div className="text-gray-300">
            {percentage >= 80
              ? 'Excellent work!'
              : percentage >= 60
                ? 'Good effort!'
                : 'Keep studying!'}
          </div>
          <Button onClick={resetQuiz} className="bg-elec-yellow text-elec-dark hover:bg-yellow-600">
            Retake Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Brain className="h-5 w-5 text-elec-yellow" />
          Knowledge Quiz
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-between items-center text-sm text-gray-400">
          <span>
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <div className="flex gap-1">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentQuestion
                    ? 'bg-elec-yellow'
                    : selectedAnswers[index] !== undefined
                      ? 'bg-green-400'
                      : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">
            {questions[currentQuestion].question}
          </h3>

          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => handleAnswerSelect(index.toString())}
                className={`w-full text-left justify-start p-4 border-gray-600 hover:bg-[#323232] ${
                  selectedAnswers[currentQuestion] === index.toString()
                    ? 'bg-elec-yellow text-elec-dark border-elec-yellow'
                    : 'text-gray-300'
                }`}
              >
                {option}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentQuestion(currentQuestion - 1)}
            disabled={currentQuestion === 0}
            className="border-gray-600 text-gray-300 hover:bg-[#323232] hover:text-foreground disabled:opacity-50"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          {currentQuestion === questions.length - 1 ? (
            <Button
              onClick={() => setShowResults(true)}
              disabled={Object.keys(selectedAnswers).length !== questions.length}
              className="bg-elec-yellow text-elec-dark hover:bg-yellow-600 disabled:opacity-50"
            >
              Submit Quiz
            </Button>
          ) : (
            <Button
              onClick={() => setCurrentQuestion(currentQuestion + 1)}
              disabled={!selectedAnswers[currentQuestion]}
              className="bg-elec-yellow text-elec-dark hover:bg-yellow-600 disabled:opacity-50"
            >
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
