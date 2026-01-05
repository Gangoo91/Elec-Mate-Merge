import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, BookOpen } from 'lucide-react';

const quizData = [
  {
    id: 1,
    question: "Define wireless interference.",
    options: [
      "When devices compete for the same frequency",
      "When signals travel too far",
      "When batteries run low",
      "When cables are damaged"
    ],
    correct: 0
  },
  {
    id: 2,
    question: "Name two common causes of interference in homes.",
    options: [
      "Power outages and internet problems",
      "Overlapping Wi-Fi routers and microwaves",
      "Cold weather and humidity",
      "Old devices and new devices"
    ],
    correct: 1
  },
  {
    id: 3,
    question: "Which frequency band do both Wi-Fi and Zigbee use?",
    options: [
      "5 GHz",
      "Sub-1 GHz",
      "2.4 GHz",
      "6 GHz"
    ],
    correct: 2
  },
  {
    id: 4,
    question: "True or False: Z-Wave avoids Wi-Fi interference by using sub-1 GHz.",
    options: [
      "True",
      "False"
    ],
    correct: 0
  },
  {
    id: 5,
    question: "What are Wi-Fi channels used for?",
    options: [
      "Increasing battery life",
      "Separating wireless signals",
      "Improving device speed",
      "Reducing power consumption"
    ],
    correct: 1
  },
  {
    id: 6,
    question: "Give an example of a high-bandwidth smart home device.",
    options: [
      "Light switch",
      "Temperature sensor",
      "Security camera",
      "Door sensor"
    ],
    correct: 2
  },
  {
    id: 7,
    question: "Give an example of a low-bandwidth smart home device.",
    options: [
      "Video doorbell",
      "Smart speaker",
      "Thermostat",
      "Security camera"
    ],
    correct: 2
  },
  {
    id: 8,
    question: "Why might devices drop offline in a crowded network?",
    options: [
      "Too much interference and competition",
      "Devices are too old",
      "Power supply issues",
      "Internet is too slow"
    ],
    correct: 0
  },
  {
    id: 9,
    question: "What is one strategy to reduce interference between Wi-Fi and Zigbee?",
    options: [
      "Use the same channels",
      "Place hubs together",
      "Separate channels and hub placement",
      "Turn off one system"
    ],
    correct: 2
  },
  {
    id: 10,
    question: "Scenario: You install 10 Wi-Fi cameras and they keep buffering. What's likely the cause?",
    options: [
      "Cameras are defective",
      "Insufficient bandwidth/overcrowded network",
      "Wrong passwords",
      "Poor lighting"
    ],
    correct: 1
  }
];

export const SmartHomeModule2Section4Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(new Array(quizData.length).fill(false));

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    
    setShowResult(true);
    const newAnsweredQuestions = [...answeredQuestions];
    newAnsweredQuestions[currentQuestion] = true;
    setAnsweredQuestions(newAnsweredQuestions);
    
    if (selectedAnswer === quizData[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions(new Array(quizData.length).fill(false));
  };

  const isQuizComplete = answeredQuestions.every(answered => answered);
  const currentQ = quizData[currentQuestion];

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-elec-yellow" />
          Knowledge Check Quiz
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress indicators */}
        <div className="flex justify-between items-center">
          <span className="text-foreground">
            Question {currentQuestion + 1} of {quizData.length}
          </span>
          <span className="text-foreground">
            Score: {score}/{quizData.length}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-600 rounded-full h-2">
          <div 
            className="bg-elec-yellow h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / quizData.length) * 100}%` }}
          ></div>
        </div>

        {/* Question */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">
            {currentQ.question}
          </h3>

          {/* Answer options */}
          <div className="space-y-2">
            {currentQ.options.map((option, index) => {
              let buttonClass = "w-full text-left p-3 rounded border transition-all duration-200 ";
              
              if (showResult) {
                if (index === currentQ.correct) {
                  buttonClass += "bg-green-600/20 border-green-500 text-foreground";
                } else if (index === selectedAnswer && index !== currentQ.correct) {
                  buttonClass += "bg-red-600/20 border-red-500 text-foreground";
                } else {
                  buttonClass += "bg-gray-600/20 border-gray-500 text-gray-300";
                }
              } else {
                if (selectedAnswer === index) {
                  buttonClass += "bg-elec-yellow/20 border-elec-yellow text-foreground";
                } else {
                  buttonClass += "bg-gray-600/20 border-gray-500 text-foreground hover:bg-gray-500/20";
                }
              }

              return (
                <Button
                  key={index}
                  variant="ghost"
                  className={buttonClass}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                >
                  <div className="flex items-center justify-between w-full">
                    <span>{option}</span>
                    {showResult && index === currentQ.correct && (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    )}
                    {showResult && index === selectedAnswer && index !== currentQ.correct && (
                      <XCircle className="h-5 w-5 text-red-400" />
                    )}
                  </div>
                </Button>
              );
            })}
          </div>

          {/* Action buttons */}
          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="border-gray-600 text-foreground hover:bg-elec-gray"
            >
              Previous
            </Button>

            <div className="flex gap-2">
              {!showResult && selectedAnswer !== null && (
                <Button
                  onClick={handleSubmit}
                  className="bg-elec-yellow text-elec-dark hover:bg-yellow-600"
                >
                  Submit Answer
                </Button>
              )}

              {showResult && currentQuestion < quizData.length - 1 && (
                <Button
                  onClick={handleNext}
                  className="bg-elec-yellow text-elec-dark hover:bg-yellow-600"
                >
                  Next Question
                </Button>
              )}

              {isQuizComplete && currentQuestion === quizData.length - 1 && (
                <Button
                  onClick={resetQuiz}
                  variant="outline"
                  className="border-gray-600 text-foreground hover:bg-elec-gray"
                >
                  Restart Quiz
                </Button>
              )}
            </div>
          </div>

          {/* Final score */}
          {isQuizComplete && showResult && currentQuestion === quizData.length - 1 && (
            <div className="mt-6 p-4 bg-elec-yellow/10 border border-elec-yellow rounded-lg">
              <h4 className="text-foreground font-bold text-lg mb-2">Quiz Complete!</h4>
              <p className="text-foreground">
                Your final score: {score} out of {quizData.length} ({Math.round((score / quizData.length) * 100)}%)
              </p>
              <p className="text-foreground mt-2">
                {score >= quizData.length * 0.8 
                  ? "Excellent work! You have a strong understanding of interference, channels, and bandwidth."
                  : score >= quizData.length * 0.6
                  ? "Good job! Consider reviewing the material to strengthen your understanding."
                  : "You may want to review the section content and try the quiz again."
                }
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};