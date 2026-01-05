import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, ArrowLeft, ArrowRight } from 'lucide-react';

export const SmartHomeModule4Section1Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      question: "What is a smart thermostat?",
      options: [
        "A traditional wall thermostat",
        "An electronic device that allows app/voice/web-based temperature control",
        "A heating element for radiators",
        "A temperature sensor only"
      ],
      correct: 1
    },
    {
      question: "Give one example of a smart thermostat brand.",
      options: [
        "British Gas",
        "Worcester Bosch",
        "Nest",
        "Vaillant"
      ],
      correct: 2
    },
    {
      question: "How does a smart thermostat differ from a traditional thermostat?",
      options: [
        "It's larger in size",
        "It only works with gas boilers",
        "It offers remote access and advanced features",
        "It's more expensive to run"
      ],
      correct: 2
    },
    {
      question: "What is room zoning?",
      options: [
        "Dividing a property into independent heating zones",
        "Installing multiple boilers",
        "Using different fuel types",
        "Setting the same temperature everywhere"
      ],
      correct: 0
    },
    {
      question: "Name one method of zoning using radiators.",
      options: [
        "Motorised dampers",
        "Smart TRVs (Thermostatic Radiator Valves)",
        "Central manifolds",
        "Wireless sensors only"
      ],
      correct: 1
    },
    {
      question: "Name one method of zoning used in underfloor heating.",
      options: [
        "Smart TRVs",
        "Radiator valves",
        "Manifold zoning with actuators",
        "Duct dampers"
      ],
      correct: 2
    },
    {
      question: "What is geofencing in smart heating?",
      options: [
        "Installing fences around heating equipment",
        "Automatic control based on occupant location",
        "Setting temperature boundaries",
        "Wireless signal range limitation"
      ],
      correct: 1
    },
    {
      question: "Give one limitation of zoning systems.",
      options: [
        "They always save money",
        "Retrofit can be disruptive",
        "They work with all heating systems",
        "They never need maintenance"
      ],
      correct: 1
    },
    {
      question: "True or False: Smart thermostats cannot integrate with voice assistants.",
      options: [
        "True",
        "False"
      ],
      correct: 1
    },
    {
      question: "A homeowner wants to reduce heating costs but still keep bedrooms warm at night. What zoning approach would you recommend?",
      options: [
        "Heat the whole house at night",
        "Use smart TRVs to heat only bedrooms at night while reducing other zones",
        "Turn off all heating at night",
        "Install multiple boilers"
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