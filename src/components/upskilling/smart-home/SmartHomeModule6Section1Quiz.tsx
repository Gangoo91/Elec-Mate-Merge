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
    question: "What is the main purpose of a smart home hub?",
    options: [
      "To provide internet access to the home",
      "To act as a central controller connecting and managing smart devices",
      "To store energy for smart devices",
      "To replace traditional electrical wiring"
    ],
    correctAnswer: 1,
    explanation: "A smart home hub acts as the central controller that connects different smart devices and allows them to communicate with each other, translating between different protocols."
  },
  {
    id: 2,
    question: "Give one example of an open-source smart home hub.",
    options: [
      "SmartThings",
      "Philips Hue Bridge",
      "Home Assistant",
      "Amazon Echo"
    ],
    correctAnswer: 2,
    explanation: "Home Assistant is the most popular open-source smart home hub platform that can run on various hardware."
  },
  {
    id: 3,
    question: "What hardware can Home Assistant run on?",
    options: [
      "Only dedicated smart home hubs",
      "Raspberry Pi and dedicated mini PCs",
      "Only cloud servers",
      "Only smartphones and tablets"
    ],
    correctAnswer: 1,
    explanation: "Home Assistant can run on Raspberry Pi, dedicated mini PCs, and even virtual machines, making it very flexible in terms of hardware requirements."
  },
  {
    id: 4,
    question: "Name one strength of Home Assistant.",
    options: [
      "Easy setup for beginners",
      "Limited device compatibility",
      "Very flexible with thousands of integrations",
      "Only works with proprietary devices"
    ],
    correctAnswer: 2,
    explanation: "Home Assistant's main strength is its flexibility and support for thousands of integrations, allowing it to work with virtually any smart device."
  },
  {
    id: 5,
    question: "Why might some clients struggle with Home Assistant?",
    options: [
      "It's too expensive",
      "It requires technical knowledge to set up and maintain",
      "It doesn't work with any devices",
      "It only works with internet connection"
    ],
    correctAnswer: 1,
    explanation: "Home Assistant requires significant technical knowledge for setup, configuration, and ongoing maintenance, which can be challenging for non-technical users."
  },
  {
    id: 6,
    question: "What communication protocols does SmartThings support?",
    options: [
      "Only Wi-Fi",
      "Only Zigbee",
      "Zigbee, Z-Wave, and Wi-Fi devices",
      "Only proprietary Samsung protocols"
    ],
    correctAnswer: 2,
    explanation: "SmartThings supports multiple protocols including Zigbee, Z-Wave, and Wi-Fi, making it compatible with a wide range of devices."
  },
  {
    id: 7,
    question: "Why is SmartThings a good option for beginners?",
    options: [
      "It requires programming skills",
      "It's easy to set up with a user-friendly app",
      "It only works with Samsung devices",
      "It works completely offline"
    ],
    correctAnswer: 1,
    explanation: "SmartThings is designed for beginners with its simple setup process, intuitive mobile app, and broad device compatibility without requiring technical expertise."
  },
  {
    id: 8,
    question: "Give two examples of proprietary smart home hubs.",
    options: [
      "Home Assistant and SmartThings",
      "Philips Hue Bridge and Hive Hub",
      "Amazon Echo and Google Home",
      "Raspberry Pi and Arduino"
    ],
    correctAnswer: 1,
    explanation: "Philips Hue Bridge and Hive Hub are examples of proprietary hubs designed specifically for their respective brand ecosystems."
  },
  {
    id: 9,
    question: "What is the main drawback of proprietary hubs?",
    options: [
      "They are too difficult to set up",
      "Limited device compatibility outside their brand ecosystem",
      "They don't work with any voice assistants",
      "They are always more expensive"
    ],
    correctAnswer: 1,
    explanation: "The main disadvantage of proprietary hubs is their limited compatibility outside their specific brand ecosystem, often requiring multiple hubs for different systems."
  },
  {
    id: 10,
    question: "In the real-world example, why was SmartThings chosen over multiple proprietary hubs?",
    options: [
      "It was cheaper",
      "It provided unified control through one app and enabled cross-system automation",
      "It had better security features",
      "It worked without internet"
    ],
    correctAnswer: 1,
    explanation: "SmartThings was chosen because it could integrate all three separate systems (Hue, Hive, Ring) into one unified app, eliminating the frustration of managing multiple interfaces and enabling cross-system automation."
  }
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
    if (percentage >= 80) return 'Excellent work! You have a strong understanding of smart home hubs.';
    if (percentage >= 60) return 'Good job! Review the areas you missed to strengthen your knowledge.';
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
          
          <Button
            onClick={resetQuiz}
            className="bg-elec-yellow text-elec-dark hover:bg-yellow-500"
          >
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
            <div className={`p-4 rounded-lg border ${
              selectedAnswer === question.correctAnswer
                ? 'bg-green-900/20 border-green-500/30'
                : 'bg-red-900/20 border-red-500/30'
            }`}>
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