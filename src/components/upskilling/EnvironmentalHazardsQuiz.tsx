import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, RotateCcw, AlertTriangle } from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const EnvironmentalHazardsQuiz = () => {
  const questions: QuizQuestion[] = [
    {
      id: 1,
      question: "What's the key hazard when testing near a leaking ceiling?",
      options: [
        'Moisture sharply increases shock risk and can damage test equipment',
        'The reduced lighting makes the work harder to see',
        'Ceiling tiles overhead might come loose and fall',
        'The sound of dripping water is distracting',
      ],
      correctAnswer: 0,
      explanation:
        'Moisture significantly increases shock risk and could cause serious damage to sensitive test equipment, making it the primary safety concern.',
    },
    {
      id: 2,
      question:
        'Which of these environmental factors can impact the accuracy or safety of electrical testing?',
      options: [
        'Only temperature extremes',
        'Only excessive moisture',
        'Dust accumulation, temperature extremes, and inadequate lighting',
        'Only poor ventilation',
      ],
      correctAnswer: 2,
      explanation:
        'Dust accumulation, temperature extremes, and inadequate lighting can all significantly affect both safety and test accuracy in different ways.',
    },
    {
      id: 3,
      question:
        'How should poor access to a distribution board be handled before testing, even when it is properly isolated?',
      options: [
        'Proceed regardless, since isolation removes all the risk',
        'Address the access problem, as it adds risk and hinders emergencies',
        'Proceed only if you are working alone on site',
        'Proceed but work twice as fast to limit exposure',
      ],
      correctAnswer: 1,
      explanation:
        'Poor access creates additional safety risks and can compromise both the quality of testing and emergency response, so it should be resolved first.',
    },
    {
      id: 4,
      question: 'How can you effectively reduce trip hazards when conducting electrical testing?',
      options: [
        'Work as quickly as possible to clear up sooner',
        'Restrict testing to quiet periods only',
        'Organise leads neatly, use cable protectors and floor signage',
        'Use only the shortest available test leads',
      ],
      correctAnswer: 2,
      explanation:
        'Keeping leads tidy and routed safely, using cable protectors, and warning others with floor signage are the most effective ways to control trip hazards.',
    },
    {
      id: 5,
      question:
        'What should you do before starting testing work in an unfamiliar commercial or industrial site?',
      options: [
        'Request and take part in a full site walkthrough or local induction',
        'Start testing immediately if you have the right equipment',
        'Just confirm where the distribution board is located',
        'Simply ask for a copy of the building plans',
      ],
      correctAnswer: 0,
      explanation:
        'A comprehensive site walkthrough or formal local induction lets you identify hazards and understand site-specific procedures before any work begins.',
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(
    new Array(questions.length).fill(null)
  );
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
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
    setSelectedAnswers(new Array(questions.length).fill(null));
    setShowResults(false);
    setQuizCompleted(false);
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  const getScorePercentage = () => {
    return Math.round((calculateScore() / questions.length) * 100);
  };

  if (showResults) {
    const score = calculateScore();
    const percentage = getScorePercentage();

    return (
      <Card className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-purple-400" />
            Environmental Hazards Quiz Results
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-6">
          <div className="text-center space-y-4">
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              {score}/{questions.length}
            </div>
            <div className="text-xl text-foreground">{percentage}% Complete</div>
            <div
              className={`text-lg font-semibold ${
                percentage >= 80
                  ? 'text-green-400'
                  : percentage >= 60
                    ? 'text-yellow-400'
                    : 'text-red-400'
              }`}
            >
              {percentage >= 80
                ? 'Excellent work!'
                : percentage >= 60
                  ? 'Good effort!'
                  : 'Consider reviewing the material again.'}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-purple-400">Review Your Answers:</h4>
            {questions.map((question, index) => {
              const userAnswer = selectedAnswers[index];
              const isCorrect = userAnswer === question.correctAnswer;

              return (
                <div
                  key={question.id}
                  className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 p-4 rounded-lg border border-gray-700/30"
                >
                  <div className="flex items-center gap-2 mb-2">
                    {isCorrect ? (
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-400" />
                    )}
                    <span className="font-semibold text-foreground">Question {index + 1}</span>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">{question.question}</p>
                  <p className="text-xs text-gray-400 mb-2">
                    Your answer:{' '}
                    {userAnswer !== null ? question.options[userAnswer] : 'Not answered'}
                  </p>
                  {!isCorrect && (
                    <p className="text-xs text-green-400 mb-2">
                      Correct answer: {question.options[question.correctAnswer]}
                    </p>
                  )}
                  <p className="text-xs text-gray-400 bg-gray-800/30 p-2 rounded">
                    {question.explanation}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center">
            <Button
              onClick={handleRestart}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-foreground hover:from-purple-700 hover:to-blue-700"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Retake Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const question = questions[currentQuestion];
  const selectedAnswer = selectedAnswers[currentQuestion];

  return (
    <Card className="bg-gradient-to-br from-orange-900/20 to-red-900/20 border-orange-500/30">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-400" />
            <span>Environmental Hazards Knowledge Check</span>
          </div>
          <span className="text-sm text-gray-400">
            Question {currentQuestion + 1} of {questions.length}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-6">
        <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 p-4 rounded-lg border border-gray-700/30">
          <h4 className="font-semibold text-orange-400 mb-3">Question {currentQuestion + 1}</h4>
          <p className="text-sm mb-4">{question.question}</p>

          <div className="space-y-2">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-3 rounded border transition-all duration-200 text-sm ${
                  selectedAnswer === index
                    ? 'border-orange-400 bg-gradient-to-r from-orange-600/30 to-red-600/30 text-foreground shadow-lg'
                    : 'border-gray-600 hover:border-gray-500 text-gray-300 hover:bg-gradient-to-r hover:from-gray-700/30 hover:to-gray-800/30'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`w-6 h-6 rounded text-xs flex items-center justify-center font-semibold ${
                      selectedAnswer === index
                        ? 'bg-gradient-to-r from-orange-500 to-red-500 text-foreground shadow-md'
                        : 'bg-gray-600 text-foreground'
                    }`}
                  >
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span>{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gradient-to-r hover:from-gray-700/30 hover:to-gray-800/30 hover:text-foreground"
          >
            Previous
          </Button>

          <Button
            onClick={handleNext}
            disabled={selectedAnswer === null}
            className="bg-gradient-to-r from-orange-600 to-red-600 text-foreground hover:from-orange-700 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next'}
          </Button>
        </div>

        {selectedAnswer === null && (
          <p className="text-center text-sm text-gray-500">Please select an answer to continue</p>
        )}
      </CardContent>
    </Card>
  );
};

export default EnvironmentalHazardsQuiz;
