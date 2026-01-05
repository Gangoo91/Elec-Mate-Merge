import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, RotateCcw, Award } from 'lucide-react';

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
    question: "What does remote access mean in a smart home system?",
    options: [
      "Only controlling lights from another room",
      "Controlling home devices via the internet from anywhere",
      "Using voice commands locally",
      "Programming devices to work automatically"
    ],
    correctAnswer: 1,
    explanation: "Remote access specifically refers to controlling home devices via the internet from any location, not just local control or automation."
  },
  {
    id: 2,
    question: "Name two devices that can be controlled remotely via mobile apps.",
    options: [
      "Light bulbs and traditional switches",
      "Smart thermostats and security cameras",
      "Manual door locks and standard outlets",
      "Battery-powered radios and desk lamps"
    ],
    correctAnswer: 1,
    explanation: "Smart thermostats and security cameras are common examples of devices with remote control capabilities through mobile apps."
  },
  {
    id: 3,
    question: "What type of alerts can smart devices send to homeowners?",
    options: [
      "Only security breach notifications",
      "Push notifications, emails, and SMS alerts",
      "Just visual displays on the device",
      "Audio announcements in the home only"
    ],
    correctAnswer: 1,
    explanation: "Smart devices can send various types of alerts including push notifications to mobile devices, emails, and SMS messages for different events."
  },
  {
    id: 4,
    question: "Give one example of a push notification in a smart home context.",
    options: [
      "Monthly electricity bill reminder",
      "Front door opened while away from home",
      "Weather forecast update",
      "Software update available for phone"
    ],
    correctAnswer: 1,
    explanation: "A smart home push notification would be event-based, such as 'Front door opened while away from home' - providing immediate awareness of home activities."
  },
  {
    id: 5,
    question: "How do cloud platforms support remote access?",
    options: [
      "By storing user photos and documents",
      "By providing internet connectivity to homes",
      "By acting as a secure bridge between mobile apps and home devices",
      "By manufacturing smart home hardware"
    ],
    correctAnswer: 2,
    explanation: "Cloud platforms act as secure intermediaries, enabling communication between mobile apps and home devices over the internet."
  },
  {
    id: 6,
    question: "What is one advantage of being able to check security cameras remotely?",
    options: [
      "Reduces electricity consumption",
      "Enables immediate verification of alerts and incidents",
      "Eliminates the need for door locks",
      "Increases camera resolution quality"
    ],
    correctAnswer: 1,
    explanation: "Remote camera access allows immediate verification of security alerts, helping distinguish between genuine threats and false alarms."
  },
  {
    id: 7,
    question: "What is a risk if a client uses weak passwords for their smart home system?",
    options: [
      "Devices will consume more power",
      "Internet connection will be slower",
      "Unauthorised access by cybercriminals",
      "Warranty will become void"
    ],
    correctAnswer: 2,
    explanation: "Weak passwords create cybersecurity vulnerabilities that could allow unauthorised access to the smart home system."
  },
  {
    id: 8,
    question: "How can poor internet connectivity affect remote access?",
    options: [
      "Devices work better without internet",
      "Loss of remote control and delayed notifications",
      "Automatic device updates increase",
      "Power consumption decreases significantly"
    ],
    correctAnswer: 1,
    explanation: "Poor internet connectivity can result in loss of remote control capabilities and delayed or missed notifications, reducing system effectiveness."
  },
  {
    id: 9,
    question: "What should electricians advise customers about firmware updates?",
    options: [
      "Firmware updates should be avoided completely",
      "Updates are only needed if devices break",
      "Keep firmware updated regularly for security and performance",
      "Updates are only cosmetic improvements"
    ],
    correctAnswer: 2,
    explanation: "Regular firmware updates are essential for maintaining security patches, fixing bugs, and improving device performance."
  },
  {
    id: 10,
    question: "Why is it important to walk clients through app setup and alerts?",
    options: [
      "To increase the final bill amount",
      "Apps are too complicated for homeowners",
      "To ensure proper system usage and customer satisfaction",
      "It's a legal requirement in all installations"
    ],
    correctAnswer: 2,
    explanation: "Proper customer training ensures they can effectively use the system, reducing support calls and increasing satisfaction with the installation."
  }
];

export const SmartHomeModule5Section4Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    const newUserAnswers = [...userAnswers, selectedAnswer];
    setUserAnswers(newUserAnswers);

    if (selectedAnswer === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    setShowResult(true);
  };

  const handleContinue = () => {
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
    setUserAnswers([]);
    setQuizCompleted(false);
  };

  const getScoreColor = () => {
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  if (quizCompleted) {
    return (
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Award className="h-6 w-6 text-elec-yellow" />
            Quiz Complete!
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="text-6xl mb-4">
            {score >= 8 ? '🏆' : score >= 6 ? '🎉' : '📚'}
          </div>
          <h3 className={`text-3xl font-bold ${getScoreColor()}`}>
            {score}/{quizQuestions.length}
          </h3>
          <p className="text-foreground">
            {score >= 8 && "Excellent! You have a thorough understanding of remote access systems."}
            {score >= 6 && score < 8 && "Good job! You understand the key concepts of smart home remote access."}
            {score < 6 && "Keep studying! Review the remote access and security concepts covered in this section."}
          </p>
          <Button 
            onClick={resetQuiz}
            className="bg-elec-yellow text-elec-dark hover:bg-yellow-500"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Retake Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  const currentQ = quizQuestions[currentQuestion];

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Award className="h-6 w-6 text-elec-yellow" />
            Quiz: Remote Access & Alerts
          </span>
          <span className="text-sm text-gray-400">
            Question {currentQuestion + 1} of {quizQuestions.length}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-foreground text-lg font-semibold">
            {currentQ.question}
          </h3>

          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                className={`w-full text-left p-4 h-auto justify-start ${
                  selectedAnswer === index
                    ? 'bg-elec-yellow text-elec-dark border-elec-yellow'
                    : 'bg-elec-dark text-foreground border-gray-600 hover:bg-gray-700'
                } ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                onClick={() => !showResult && handleAnswerSelect(index)}
                disabled={showResult}
              >
                <span className="mr-3 font-bold">
                  {String.fromCharCode(65 + index)}.
                </span>
                {option}
                {showResult && index === currentQ.correctAnswer && (
                  <CheckCircle className="ml-auto h-5 w-5 text-green-400" />
                )}
                {showResult && selectedAnswer === index && index !== currentQ.correctAnswer && (
                  <XCircle className="ml-auto h-5 w-5 text-red-400" />
                )}
              </Button>
            ))}
          </div>
        </div>

        {showResult && (
          <div className={`p-4 rounded-lg border ${
            selectedAnswer === currentQ.correctAnswer 
              ? 'bg-green-600/10 border-green-600/30' 
              : 'bg-red-600/10 border-red-600/30'
          }`}>
            <div className="flex items-start gap-2 mb-2">
              {selectedAnswer === currentQ.correctAnswer ? (
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
              ) : (
                <XCircle className="h-5 w-5 text-red-400 mt-0.5" />
              )}
              <span className={`font-semibold ${
                selectedAnswer === currentQ.correctAnswer ? 'text-green-400' : 'text-red-400'
              }`}>
                {selectedAnswer === currentQ.correctAnswer ? 'Correct!' : 'Incorrect'}
              </span>
            </div>
            <p className="text-foreground text-sm">
              {currentQ.explanation}
            </p>
          </div>
        )}

        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-400">
            Score: {score}/{currentQuestion + (showResult ? 1 : 0)}
          </div>
          
          {!showResult ? (
            <Button 
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
              className="bg-elec-yellow text-elec-dark hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Answer
            </Button>
          ) : (
            <Button 
              onClick={handleContinue}
              className="bg-elec-yellow text-elec-dark hover:bg-yellow-500"
            >
              {currentQuestion < quizQuestions.length - 1 ? 'Next Question' : 'Complete Quiz'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};