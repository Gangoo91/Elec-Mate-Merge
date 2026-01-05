import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, ArrowLeft, ArrowRight } from 'lucide-react';

export const SmartHomeModule2Section4NewQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      question: "What is wireless interference in smart home networks?",
      options: [
        "When devices use too much bandwidth",
        "When multiple signals compete for the same frequency space",
        "When devices are too far from the router",
        "When batteries run low in wireless devices"
      ],
      correct: 1
    },
    {
      question: "Which frequency band is most crowded in typical homes?",
      options: [
        "5 GHz",
        "900 MHz",
        "2.4 GHz",
        "868 MHz"
      ],
      correct: 2
    },
    {
      question: "Why can Zigbee and Wi-Fi interfere with each other?",
      options: [
        "They use different security protocols",
        "They both operate in the 2.4 GHz frequency band",
        "They have different power requirements",
        "They use incompatible mesh topologies"
      ],
      correct: 1
    },
    {
      question: "What is the recommended minimum distance between a Wi-Fi router and Zigbee hub?",
      options: [
        "30 cm (1 foot)",
        "60 cm (2 feet)",
        "1 metre (3 feet)",
        "2 metres (6 feet)"
      ],
      correct: 2
    },
    {
      question: "Which devices typically require high bandwidth in smart homes?",
      options: [
        "Temperature sensors and door contacts",
        "Security cameras and video doorbells",
        "Smart switches and dimmers",
        "Motion sensors and smart locks"
      ],
      correct: 1
    },
    {
      question: "What are the best Wi-Fi channels to avoid 2.4 GHz interference?",
      options: [
        "Channels 1, 6, and 11",
        "Channels 3, 8, and 13",
        "Channels 2, 7, and 12",
        "Any channels work equally well"
      ],
      correct: 0
    },
    {
      question: "If Wi-Fi is on channel 6, which Zigbee channel should you choose?",
      options: [
        "Channel 11",
        "Channel 15",
        "Channel 20",
        "Channel 25"
      ],
      correct: 2
    },
    {
      question: "What household appliance commonly interferes with 2.4 GHz devices?",
      options: [
        "Electric kettle",
        "Microwave oven",
        "Washing machine",
        "Air conditioning unit"
      ],
      correct: 1
    },
    {
      question: "Why might smart devices work during the day but fail at night?",
      options: [
        "Lower temperatures affect signal strength",
        "Devices automatically update firmware at night",
        "Higher network usage from streaming and calls",
        "Wi-Fi automatically switches to different channels"
      ],
      correct: 2
    },
    {
      question: "What advantage does Z-Wave have over Wi-Fi and Zigbee regarding interference?",
      options: [
        "It uses higher power transmission",
        "It operates in the sub-1 GHz band, avoiding 2.4 GHz congestion",
        "It has better encryption",
        "It supports more devices per network"
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
          <div className="text-foreground">
            {percentage >= 80 ? "Excellent understanding of interference and bandwidth management!" : 
             percentage >= 60 ? "Good grasp of wireless concepts - review channel planning strategies." : 
             "Keep studying interference causes and mitigation techniques."}
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
          Knowledge Quiz - {questions.length} Questions
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
                    : 'text-foreground'
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
            className="border-gray-600 text-foreground hover:bg-[#323232] hover:text-foreground disabled:opacity-50"
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