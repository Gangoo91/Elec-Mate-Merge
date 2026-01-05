import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, ArrowLeft, ArrowRight } from 'lucide-react';

export const SmartHomeModule4Section2Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      question: "What does TRV stand for?",
      options: [
        "Temperature Regulating Valve",
        "Thermostatic Radiator Valve",
        "Thermal Regulation Valve",
        "Temperature Responsive Valve"
      ],
      correct: 1
    },
    {
      question: "How does a smart TRV differ from a manual TRV?",
      options: [
        "It's larger in size",
        "It uses different materials",
        "It has motorised control and wireless connectivity",
        "It only works with electric heating"
      ],
      correct: 2
    },
    {
      question: "Name two communication protocols used by smart TRVs.",
      options: [
        "Bluetooth and USB",
        "Zigbee and Z-Wave",
        "Ethernet and HDMI",
        "GSM and GPS"
      ],
      correct: 1
    },
    {
      question: "List the three main types of boilers.",
      options: [
        "Gas, oil, electric",
        "Combi, system, conventional",
        "Small, medium, large",
        "Indoor, outdoor, hybrid"
      ],
      correct: 1
    },
    {
      question: "What is OpenTherm?",
      options: [
        "A type of smart TRV",
        "A heating fuel",
        "A digital communication protocol for boiler control",
        "A temperature sensor"
      ],
      correct: 2
    },
    {
      question: "What's the difference between on/off and modulating boiler control?",
      options: [
        "On/off is newer technology",
        "Modulating adjusts output, on/off switches completely",
        "On/off is more efficient",
        "There's no difference"
      ],
      correct: 1
    },
    {
      question: "Why are heat pumps usually run at lower temperatures?",
      options: [
        "To save electricity",
        "For maximum efficiency and to match their operating characteristics",
        "To prevent overheating",
        "It's a legal requirement"
      ],
      correct: 1
    },
    {
      question: "True or False: All smart thermostats are compatible with all boilers.",
      options: [
        "True",
        "False"
      ],
      correct: 1
    },
    {
      question: "What's one challenge of retrofitting smart controls to older systems?",
      options: [
        "They're too expensive",
        "Older systems may lack digital communication interfaces",
        "They require too much maintenance",
        "They're too complicated to operate"
      ],
      correct: 1
    },
    {
      question: "A client installs smart TRVs but doesn't link them to the boiler. What issue might this cause?",
      options: [
        "The TRVs won't work at all",
        "Boiler may run unnecessarily when all TRVs are closed",
        "The system will overheat",
        "Nothing - they work independently"
      ],
      correct: 1
    }
  ];

  const handleAnswerSelect = (answerIndex: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: answerIndex
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
          <div className="text-xl text-foreground">
            {percentage}% Correct
          </div>
          <div className="text-gray-300">
            {percentage >= 80 ? "Excellent work!" : percentage >= 60 ? "Good effort!" : "Keep studying!"}
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
          Knowledge Quiz
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