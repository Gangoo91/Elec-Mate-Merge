import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, CheckCircle, XCircle, RotateCcw } from 'lucide-react';

export const SmartHomeModule2Section5Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      question: "Define what a hub is in smart homes.",
      options: [
        "A router that provides internet connectivity",
        "A central device that coordinates device communication and local automation",
        "A smart speaker with voice control",
        "A security system controller"
      ],
      correctAnswer: 1
    },
    {
      question: "Name one example of a hub-based ecosystem.",
      options: [
        "Individual Wi-Fi smart bulbs",
        "Samsung SmartThings",
        "Standalone security cameras",
        "Basic smart plugs"
      ],
      correctAnswer: 1
    },
    {
      question: "List two advantages of hub-based systems.",
      options: [
        "Cheaper setup and simpler installation",
        "Reliable mesh networking and better scalability",
        "No internet required and unlimited device support",
        "Only works with one brand and no configuration needed"
      ],
      correctAnswer: 1
    },
    {
      question: "What is a disadvantage of hub-based systems?",
      options: [
        "Cannot work with multiple protocols",
        "Too reliable for most users",
        "Higher upfront cost and technical complexity",
        "Only works during internet outages"
      ],
      correctAnswer: 2
    },
    {
      question: "Name one advantage of hubless systems.",
      options: [
        "Superior scalability and reliability",
        "Better mesh networking capabilities",
        "Simple setup with no extra hardware needed",
        "More protocol bridging options"
      ],
      correctAnswer: 2
    },
    {
      question: "What is the biggest weakness of Wi-Fi-only setups?",
      options: [
        "Too expensive for most homes",
        "Network congestion and reliability issues at scale",
        "Cannot connect to the internet",
        "Only works with one device type"
      ],
      correctAnswer: 1
    },
    {
      question: "True or False: Hubless systems are more scalable than hub-based ones.",
      options: [
        "True - Wi-Fi networks can handle unlimited devices",
        "False - hub-based systems scale better with mesh networking",
        "True - cloud services provide infinite scalability",
        "False - neither system can scale beyond 10 devices"
      ],
      correctAnswer: 1
    },
    {
      question: "What is a hybrid approach in smart homes?",
      options: [
        "Using only wireless protocols",
        "Combining hub-based devices with cloud/voice integration",
        "Installing both security and lighting systems",
        "Using half Wi-Fi and half wired ethernet"
      ],
      correctAnswer: 1
    },
    {
      question: "In what type of property would you recommend a hub-based system?",
      options: [
        "Only in commercial buildings",
        "Medium to large homes with 10+ devices",
        "Small apartments with 1-2 devices",
        "Properties without internet access"
      ],
      correctAnswer: 1
    },
    {
      question: "What future standard may reduce the need for hubs?",
      options: [
        "Wi-Fi 7",
        "5G networks",
        "Matter",
        "Bluetooth 6.0"
      ],
      correctAnswer: 2
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
    questions.forEach((q, index) => {
      if (parseInt(selectedAnswers[index]) === q.correctAnswer) {
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

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
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
        <CardContent className="text-center space-y-6">
          <div className="text-4xl font-bold text-elec-yellow">
            {score}/{questions.length}
          </div>
          
          <div className="text-2xl font-semibold text-foreground">
            {percentage}% Correct
          </div>
          
          <div className={`text-lg ${
            percentage >= 80 ? 'text-green-400' : 
            percentage >= 60 ? 'text-yellow-400' : 'text-red-400'
          }`}>
            {percentage >= 80 ? '🎉 Excellent! You have a strong understanding of hub vs hubless ecosystems.' :
             percentage >= 60 ? '👍 Good work! Review the sections on system advantages and limitations.' :
             '📚 Keep studying! Focus on the key differences between hub-based and hubless approaches.'}
          </div>
          
          <Button 
            onClick={resetQuiz}
            className="bg-elec-yellow text-elec-dark hover:bg-yellow-400"
          >
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
          Section Quiz ({currentQuestion + 1}/10)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-elec-yellow h-2 rounded-full transition-all duration-300" 
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">
            {questions[currentQuestion].question}
          </h3>
          
          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => handleAnswerSelect(index.toString())}
                className={`w-full justify-start text-left p-4 h-auto border-gray-600 hover:bg-gray-700 ${
                  selectedAnswers[currentQuestion] === index.toString()
                    ? 'bg-blue-900/20 border-blue-600 text-blue-100'
                    : 'text-gray-300'
                }`}
              >
                <span className="mr-3 font-bold">{String.fromCharCode(65 + index)})</span>
                {option}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            Previous
          </Button>
          
          <Button
            onClick={nextQuestion}
            disabled={!selectedAnswers[currentQuestion]}
            className="bg-elec-yellow text-elec-dark hover:bg-yellow-400"
          >
            {currentQuestion === questions.length - 1 ? 'Submit Quiz' : 'Next'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};