import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, RotateCcw, Award } from 'lucide-react';

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
    question: 'What is the main purpose of a smart home hub?',
    options: [
      'To act as a central controller that connects and manages smart devices',
      'To provide the home with its internet connection',
      'To store backup energy for the smart devices',
      'To replace the traditional electrical wiring',
    ],
    correctAnswer: 0,
    explanation:
      'A smart home hub is the central controller that links different devices and lets them communicate, often translating between different protocols.',
  },
  {
    id: 2,
    question: 'Which of these is an example of an open-source smart home hub?',
    options: ['SmartThings', 'Philips Hue Bridge', 'Home Assistant', 'Amazon Echo'],
    correctAnswer: 2,
    explanation:
      'Home Assistant is the leading open-source smart home platform and can run on a wide range of hardware.',
  },
  {
    id: 3,
    question: 'What hardware can Home Assistant run on?',
    options: [
      'Only dedicated proprietary smart home hubs',
      'Raspberry Pi and dedicated mini PCs',
      'Only remote cloud servers',
      'Only smartphones and tablets',
    ],
    correctAnswer: 1,
    explanation:
      'Home Assistant runs on hardware such as a Raspberry Pi, dedicated mini PCs and virtual machines, making it very flexible to deploy.',
  },
  {
    id: 4,
    question: 'What is a key strength of Home Assistant?',
    options: [
      'Its effortless setup for complete beginners',
      'Its deliberately limited device support',
      'Its restriction to proprietary devices only',
      'Its flexibility, with thousands of integrations',
    ],
    correctAnswer: 3,
    explanation:
      "Home Assistant's main strength is its flexibility and support for thousands of integrations, working with almost any smart device.",
  },
  {
    id: 5,
    question: 'Why might some clients struggle with Home Assistant?',
    options: [
      'It is far more expensive than rival hubs',
      'It needs technical knowledge to set up and maintain',
      'It is not compatible with any devices',
      'It only functions with an internet connection',
    ],
    correctAnswer: 1,
    explanation:
      'Home Assistant needs real technical knowledge for setup, configuration and maintenance, which can be challenging for non-technical users.',
  },
  {
    id: 6,
    question: 'Which communication protocols does SmartThings support?',
    options: [
      'Only Wi-Fi devices',
      'Only Zigbee devices',
      'Zigbee, Z-Wave and Wi-Fi devices',
      'Only proprietary Samsung protocols',
    ],
    correctAnswer: 2,
    explanation:
      'SmartThings supports Zigbee, Z-Wave and Wi-Fi, giving it compatibility with a broad range of devices.',
  },
  {
    id: 7,
    question: 'Why is SmartThings a good option for beginners?',
    options: [
      'It requires some programming skills',
      'It only works with Samsung-branded devices',
      'It is easy to set up with a user-friendly app',
      'It runs completely offline with no app',
    ],
    correctAnswer: 2,
    explanation:
      'SmartThings is beginner-friendly thanks to its simple setup, intuitive app and broad device support, without needing technical expertise.',
  },
  {
    id: 8,
    question: 'Which pair are examples of proprietary smart home hubs?',
    options: [
      'Home Assistant and SmartThings',
      'Amazon Echo and Google Home',
      'Raspberry Pi and Arduino',
      'Philips Hue Bridge and Hive Hub',
    ],
    correctAnswer: 3,
    explanation:
      'The Philips Hue Bridge and Hive Hub are proprietary hubs built specifically for their own brand ecosystems.',
  },
  {
    id: 9,
    question: 'What is the main drawback of proprietary hubs?',
    options: [
      'They are unusually difficult to set up',
      'Limited compatibility outside their own brand ecosystem',
      'They never work with any voice assistant',
      'They are always the most expensive option',
    ],
    correctAnswer: 1,
    explanation:
      'Proprietary hubs are mainly limited by their narrow compatibility outside their brand, often forcing the use of several hubs together.',
  },
  {
    id: 10,
    question:
      'In the worked example, why was SmartThings chosen over several proprietary hubs?',
    options: [
      'It was simply the cheapest product available',
      'It unified control in one app and enabled cross-system automation',
      'It offered noticeably stronger security features',
      'It was the only option that worked without internet',
    ],
    correctAnswer: 1,
    explanation:
      'SmartThings was chosen because it brought the separate Hue, Hive and Ring systems into one app, removing multiple interfaces and enabling cross-system automation.',
  },
];

export const SmartHomeModule6Section1Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);

    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestion] = answerIndex;
    setUserAnswers(newUserAnswers);

    if (answerIndex === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizCompleted(false);
    setUserAnswers([]);
  };

  const getScoreColor = () => {
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreMessage = () => {
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage >= 80)
      return 'Excellent work! You have a strong understanding of smart home hubs.';
    if (percentage >= 60)
      return 'Good job! Review the areas you missed to strengthen your knowledge.';
    return 'Keep studying! Review the content and try again to improve your understanding.';
  };

  if (quizCompleted) {
    return (
      <Card className="bg-elec-gray border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
            <Award className="h-7 w-7 text-elec-yellow" />
            Quiz Complete!
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="space-y-4">
            <div className={`text-6xl font-bold ${getScoreColor()}`}>
              {score}/{quizQuestions.length}
            </div>
            <div className={`text-xl ${getScoreColor()}`}>
              {Math.round((score / quizQuestions.length) * 100)}%
            </div>
            <p className="text-foreground">{getScoreMessage()}</p>
          </div>

          <Button onClick={resetQuiz} className="bg-elec-yellow text-elec-dark hover:bg-yellow-500">
            <RotateCcw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  const question = quizQuestions[currentQuestion];

  return (
    <Card className="bg-elec-gray border-elec-yellow/20">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-foreground flex items-center justify-between">
          <span className="flex items-center gap-3">
            <Award className="h-7 w-7 text-elec-yellow" />
            Knowledge Check Quiz
          </span>
          <Badge variant="secondary" className="bg-elec-yellow text-elec-dark">
            {currentQuestion + 1} of {quizQuestions.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">{question.question}</h3>

          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => !showResult && handleAnswerSelect(index)}
                disabled={showResult}
                className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                  showResult
                    ? index === question.correctAnswer
                      ? 'bg-green-900/30 border-green-500 text-green-300'
                      : index === selectedAnswer && index !== question.correctAnswer
                        ? 'bg-red-900/30 border-red-500 text-red-300'
                        : 'bg-gray-800/30 border-gray-600 text-gray-400'
                    : 'bg-elec-dark hover:bg-elec-dark/70 border-gray-600 text-foreground hover:border-elec-yellow/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  {showResult && index === question.correctAnswer && (
                    <CheckCircle2 className="h-5 w-5 text-green-400" />
                  )}
                  {showResult && index === selectedAnswer && index !== question.correctAnswer && (
                    <XCircle className="h-5 w-5 text-red-400" />
                  )}
                  <span>{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {showResult && (
          <div className="space-y-4">
            <div
              className={`p-4 rounded-lg border ${
                selectedAnswer === question.correctAnswer
                  ? 'bg-green-900/20 border-green-500/30'
                  : 'bg-red-900/20 border-red-500/30'
              }`}
            >
              <p className="text-foreground font-medium mb-2">
                {selectedAnswer === question.correctAnswer ? 'Correct!' : 'Incorrect'}
              </p>
              <p className="text-foreground text-sm">{question.explanation}</p>
            </div>

            <Button
              onClick={handleNextQuestion}
              className="w-full bg-elec-yellow text-elec-dark hover:bg-yellow-500"
            >
              {currentQuestion < quizQuestions.length - 1 ? 'Next Question' : 'Complete Quiz'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
