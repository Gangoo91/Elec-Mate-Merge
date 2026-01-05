import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, RotateCcw } from 'lucide-react';

export const SmartHomeSection4Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(string | null)[]>(new Array(10).fill(null));
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      question: "What is a local smart home architecture?",
      options: ["Processing in the cloud", "Processing within the home", "Processing on mobile devices", "Processing on manufacturer servers"],
      correct: 1
    },
    {
      question: "Give one example of a local smart home platform.",
      options: ["Amazon Alexa", "Google Home", "Home Assistant", "iCloud"],
      correct: 2
    },
    {
      question: "What is the biggest advantage of cloud-based systems?",
      options: ["Fastest response", "Works offline", "Easy setup", "Maximum privacy"],
      correct: 2
    },
    {
      question: "What happens to a cloud system when the internet is down?",
      options: ["Works normally", "Limited functionality", "Completely non-functional", "Faster performance"],
      correct: 2
    },
    {
      question: "List two pros of hybrid systems.",
      options: ["Speed + offline capability", "Easy setup + maximum privacy", "Low cost + simple maintenance", "Cloud-only + local-only"],
      correct: 0
    },
    {
      question: "True or False: Local systems are more private than cloud systems.",
      options: ["True", "False"],
      correct: 0
    },
    {
      question: "Which architecture is usually the fastest in terms of response time?",
      options: ["Cloud", "Hybrid", "Local", "All are equal"],
      correct: 2
    },
    {
      question: "What is 'edge computing' in smart home contexts?",
      options: ["Internet edge optimization", "Local processing with cloud benefits", "Wireless signal boosting", "Device edge design"],
      correct: 1
    },
    {
      question: "Name one factor to consider when choosing an architecture.",
      options: ["Device colour", "User technical expertise", "Brand preference", "Room size"],
      correct: 1
    },
    {
      question: "Which future standard aims to improve interoperability in smart homes?",
      options: ["WiFi 7", "Bluetooth 6", "Matter protocol", "5G"],
      correct: 2
    }
  ];

  const handleAnswerSelect = (answerIndex: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return answer !== null && parseInt(answer) === questions[index].correct ? score + 1 : score;
    }, 0);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers(new Array(10).fill(null));
    setShowResults(false);
  };

  if (showResults) {
    const score = calculateScore();
    const percentage = (score / questions.length) * 100;
    
    return (
      <Card className="bg-elec-gray border-gray-700">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Brain className="h-5 w-5 text-elec-yellow" />
            Quiz Results
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="text-4xl font-bold text-foreground">{score}/{questions.length}</div>
          <div className="text-xl text-indigo-200">{percentage}% Correct</div>
          
          <div className="p-4 bg-[#1a1a1a] border border-gray-600 rounded-lg">
            {percentage >= 80 ? (
              <p className="text-green-300">Excellent! You have a strong understanding of smart home architectures.</p>
            ) : percentage >= 60 ? (
              <p className="text-yellow-300">Good work! Review the material to strengthen your understanding.</p>
            ) : (
              <p className="text-red-300">Consider reviewing the section material before proceeding.</p>
            )}
          </div>

          <Button onClick={resetQuiz} className="bg-elec-yellow text-elec-dark hover:bg-yellow-600">
            <RotateCcw className="mr-2 h-4 w-4" />
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
          Knowledge Quiz: Smart Home Architectures
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-300">Question {currentQuestion + 1} of {questions.length}</span>
          <div className="flex gap-1">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  selectedAnswers[index] !== null
                    ? 'bg-elec-yellow'
                    : index === currentQuestion
                    ? 'bg-gray-500'
                    : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="p-4 bg-[#1a1a1a] border border-gray-600 rounded-lg">
          <h3 className="text-foreground font-semibold text-lg mb-4">
            {questions[currentQuestion].question}
          </h3>
          
          <div className="space-y-2">
            {questions[currentQuestion].options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                className={`w-full text-left justify-start p-3 border-gray-600 ${
                  selectedAnswers[currentQuestion] === index.toString()
                    ? 'bg-elec-yellow text-elec-dark'
                    : 'text-gray-300 hover:bg-[#323232]'
                }`}
                onClick={() => handleAnswerSelect(index.toString())}
              >
                {option}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
            className="border-gray-600 text-gray-300 hover:bg-[#323232]"
          >
            Previous
          </Button>
          
          {currentQuestion === questions.length - 1 ? (
            <Button
              onClick={handleSubmit}
              className="bg-elec-yellow text-elec-dark hover:bg-yellow-600"
              disabled={selectedAnswers.some(answer => answer === null)}
            >
              Submit Quiz
            </Button>
          ) : (
            <Button
              onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
              className="bg-elec-yellow text-elec-dark hover:bg-yellow-600"
            >
              Next
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};