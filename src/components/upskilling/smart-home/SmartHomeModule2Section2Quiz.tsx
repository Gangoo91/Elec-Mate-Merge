import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, ArrowLeft, ArrowRight } from 'lucide-react';

export const SmartHomeModule2Section2Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      question: "Define mesh networking in your own words.",
      options: [
        "A single central hub connecting all devices",
        "Devices that can relay signals through each other to extend coverage",
        "Wireless devices that only work with internet",
        "A type of antenna used in smart homes"
      ],
      correct: 1
    },
    {
      question: "Which frequency does Zigbee operate on?",
      options: [
        "868 MHz",
        "908 MHz", 
        "2.4 GHz",
        "5 GHz"
      ],
      correct: 2
    },
    {
      question: "Which frequency does Z-Wave use in Europe?",
      options: [
        "2.4 GHz",
        "868 MHz",
        "908 MHz",
        "5 GHz"
      ],
      correct: 1
    },
    {
      question: "True or False: Zigbee supports more devices per network than Z-Wave.",
      options: [
        "True",
        "False"
      ],
      correct: 0
    },
    {
      question: "Which protocol is better at penetrating walls?",
      options: [
        "Zigbee",
        "Z-Wave",
        "Both are equal",
        "Neither works through walls"
      ],
      correct: 1
    },
    {
      question: "Give one example of a Zigbee-based product.",
      options: [
        "Ring Video Doorbell",
        "Philips Hue bulbs",
        "Nest Thermostat",
        "Amazon Echo"
      ],
      correct: 1
    },
    {
      question: "What's a drawback of Z-Wave compared to Zigbee?",
      options: [
        "Poor range",
        "High power consumption",
        "Limited to 232 devices per network",
        "No mesh capabilities"
      ],
      correct: 2
    },
    {
      question: "Why is Zigbee more prone to interference?",
      options: [
        "It uses old technology",
        "It operates on 2.4GHz band shared with Wi-Fi",
        "It has poor encryption",
        "It only works indoors"
      ],
      correct: 1
    },
    {
      question: "Which protocol would suit a large house with thick walls?",
      options: [
        "Zigbee",
        "Z-Wave", 
        "Bluetooth",
        "Wi-Fi"
      ],
      correct: 1
    },
    {
      question: "A client wants 80 smart bulbs in their apartment. Which protocol is best?",
      options: [
        "Z-Wave - better reliability",
        "Zigbee - supports high device count and cost-effective",
        "Wi-Fi - fastest speeds",
        "Bluetooth - easiest setup"
      ],
      correct: 1
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
            {percentage >= 80 ? "Excellent understanding of Zigbee vs Z-Wave!" : 
             percentage >= 60 ? "Good grasp of mesh protocols - review the differences." : 
             "Keep studying the protocol characteristics and use cases."}
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