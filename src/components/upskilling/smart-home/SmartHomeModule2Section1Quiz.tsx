import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, ArrowLeft, ArrowRight } from 'lucide-react';

export const SmartHomeModule2Section1Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      question: "What is the purpose of a wireless protocol?",
      options: [
        "To provide power to smart devices",
        "To define how devices communicate and exchange data",
        "To connect devices to the internet",
        "To control device brightness"
      ],
      correct: 1
    },
    {
      question: "Name two reasons why protocols matter in smart homes.",
      options: [
        "Speed and colour",
        "Compatibility and power consumption",
        "Size and weight",
        "Price and warranty"
      ],
      correct: 1
    },
    {
      question: "Give one example of a protocol that uses mesh networking.",
      options: [
        "Wi-Fi",
        "Bluetooth",
        "Zigbee",
        "Ethernet"
      ],
      correct: 2
    },
    {
      question: "Which protocol is best for streaming cameras?",
      options: [
        "Zigbee",
        "Z-Wave",
        "Wi-Fi",
        "Bluetooth"
      ],
      correct: 2
    },
    {
      question: "Which protocol consumes the least power?",
      options: [
        "Wi-Fi",
        "Bluetooth LE",
        "Ethernet",
        "4G"
      ],
      correct: 1
    },
    {
      question: "True or False: Zigbee and Z-Wave operate on the same frequency.",
      options: [
        "True",
        "False"
      ],
      correct: 1
    },
    {
      question: "What is the main drawback of Wi-Fi in smart sensors?",
      options: [
        "Too slow",
        "Too expensive",
        "High power consumption",
        "Poor security"
      ],
      correct: 2
    },
    {
      question: "What protocol is designed specifically for IoT with mesh networking?",
      options: [
        "Wi-Fi",
        "Thread",
        "Bluetooth",
        "Ethernet"
      ],
      correct: 1
    },
    {
      question: "What is 'Matter' and why is it important?",
      options: [
        "A new type of battery",
        "An interoperability standard for cross-platform compatibility",
        "A security protocol",
        "A type of antenna"
      ],
      correct: 1
    },
    {
      question: "Scenario: You're installing a smart lock — which protocol would you likely use and why?",
      options: [
        "Wi-Fi for high speed",
        "Zigbee for mesh networking",
        "Bluetooth for smartphone integration",
        "Z-Wave for long range"
      ],
      correct: 2
    }
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: answerIndex
    });
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correct) {
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
          <div className="text-xl text-foreground">
            {percentage}% Correct
          </div>
          <div className="text-gray-300">
            {percentage >= 80 ? "Excellent understanding of wireless protocols!" : 
             percentage >= 60 ? "Good grasp of the concepts - review the areas you missed." : 
             "Keep studying the protocol characteristics and applications."}
          </div>
          <Button 
            onClick={resetQuiz}
            className="bg-elec-yellow text-elec-dark hover:bg-yellow-600"
          >
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
          Knowledge Quiz - 10 Questions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-between items-center text-sm text-gray-400">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <div className="flex gap-1">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentQuestion ? 'bg-elec-yellow' : 
                  selectedAnswers[index] !== undefined ? 'bg-green-400' : 'bg-gray-600'
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
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left justify-start p-4 border-gray-600 hover:bg-[#323232] ${
                  selectedAnswers[currentQuestion] === index
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
              disabled={selectedAnswers[currentQuestion] === undefined}
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