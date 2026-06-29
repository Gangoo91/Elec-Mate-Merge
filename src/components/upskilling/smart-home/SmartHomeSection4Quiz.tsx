import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, RotateCcw } from 'lucide-react';

export const SmartHomeSection4Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(string | null)[]>(
    new Array(10).fill(null)
  );
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      question: 'What defines a local (on-premises) smart home architecture?',
      options: [
        'Processing happens within the home itself',
        'Processing happens on the manufacturer’s cloud',
        'Processing happens on the user’s mobile phone',
        'Processing happens on a remote data centre',
      ],
      correct: 0,
      explanation:
        'In a local architecture, automation logic runs on a hub inside the home, so it keeps working independently of any internet connection.',
    },
    {
      question: 'Which of these is an example of a locally-hosted smart home platform?',
      options: ['Amazon Alexa', 'Home Assistant', 'Google Home', 'Apple iCloud'],
      correct: 1,
      explanation:
        'Home Assistant runs on hardware in the home and processes automations locally, unlike the cloud-dependent Alexa and Google Home services.',
    },
    {
      question: 'What is the biggest advantage of cloud-based smart home systems?',
      options: [
        'They give the fastest possible response',
        'They continue working with no internet',
        'They are simple to set up and access remotely',
        'They offer the strongest data privacy',
      ],
      correct: 2,
      explanation:
        'Cloud systems are easy to set up and reach from anywhere, but they depend on internet connectivity and place more data off-site.',
    },
    {
      question: 'What typically happens to a cloud-based system when the internet goes down?',
      options: [
        'It continues to work normally',
        'It responds faster than usual',
        'It switches automatically to local control',
        'It loses most of its functionality',
      ],
      correct: 3,
      explanation:
        'Because the control logic lives on remote servers, a cloud system loses most functionality when the internet connection is lost.',
    },
    {
      question: 'What are two genuine advantages of a hybrid architecture?',
      options: [
        'Lowest cost and simplest maintenance',
        'Fast local response with remote access',
        'It is purely cloud-only and local-only',
        'Easy setup plus maximum privacy',
      ],
      correct: 1,
      explanation:
        'Hybrid systems process time-critical automations locally for speed while still using the cloud for remote access and updates.',
    },
    {
      question: 'Why are local systems generally considered more private than cloud systems?',
      options: [
        'Data stays in the home rather than on external servers',
        'They encrypt the home’s Wi-Fi password',
        'They never connect to any network at all',
        'They automatically delete all recordings hourly',
      ],
      correct: 0,
      explanation:
        'Local processing keeps sensor and usage data inside the home, reducing the amount of personal data sent to third-party servers.',
    },
    {
      question: 'Which architecture usually gives the fastest response time?',
      options: ['Cloud', 'Hybrid', 'Local', 'All are equally fast'],
      correct: 2,
      explanation:
        'Local systems do not have to send commands to a remote server and back, so they respond with the lowest latency.',
    },
    {
      question: "What does 'edge computing' mean in a smart home context?",
      options: [
        'Optimising the internet connection at the network edge',
        'Boosting wireless signals around the property',
        'Designing devices with rounded edges',
        'Local processing that retains some cloud benefits',
      ],
      correct: 3,
      explanation:
        'Edge computing processes data on or near the device in the home, combining the low latency of local control with selective cloud features.',
    },
    {
      question: 'Which of these is a key factor when choosing a smart home architecture?',
      options: [
        'The colour of the devices',
        'The user’s technical expertise',
        'The brand of the homeowner’s car',
        'The size of the garden',
      ],
      correct: 1,
      explanation:
        'Local systems demand more technical skill to set up and maintain, so the user’s expertise strongly influences which architecture suits them.',
    },
    {
      question: 'Which standard is designed to improve interoperability between smart home brands?',
      options: ['Wi-Fi 7', 'Bluetooth 6', '5G', 'Matter'],
      correct: 3,
      explanation:
        'Matter is a cross-vendor connectivity standard that lets devices from different manufacturers and ecosystems work together.',
    },
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
          <div className="text-4xl font-bold text-foreground">
            {score}/{questions.length}
          </div>
          <div className="text-xl text-indigo-200">{percentage}% Correct</div>

          <div className="p-4 bg-[#1a1a1a] border border-gray-600 rounded-lg">
            {percentage >= 80 ? (
              <p className="text-green-300">
                Excellent! You have a strong understanding of smart home architectures.
              </p>
            ) : percentage >= 60 ? (
              <p className="text-yellow-300">
                Good work! Review the material to strengthen your understanding.
              </p>
            ) : (
              <p className="text-red-300">
                Consider reviewing the section material before proceeding.
              </p>
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
          <span className="text-gray-300">
            Question {currentQuestion + 1} of {questions.length}
          </span>
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
              disabled={selectedAnswers.some((answer) => answer === null)}
            >
              Submit Quiz
            </Button>
          ) : (
            <Button
              onClick={() =>
                setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))
              }
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
