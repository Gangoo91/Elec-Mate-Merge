import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, ArrowLeft, ArrowRight } from 'lucide-react';

export const SmartHomeModule4Section3Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      question: "Why is indoor air quality important?",
      options: [
        "It only affects temperature comfort",
        "It affects health, comfort, and productivity",
        "It only matters in industrial buildings",
        "It has no measurable impact"
      ],
      correct: 1
    },
    {
      question: "What is the ideal indoor humidity range?",
      options: [
        "20-30%",
        "40-60%",
        "70-80%",
        "80-90%"
      ],
      correct: 1
    },
    {
      question: "What problems occur if humidity is too high?",
      options: [
        "Static electricity increases",
        "Mould growth and dust mites proliferate",
        "Air becomes too dry",
        "CO₂ levels rise"
      ],
      correct: 1
    },
    {
      question: "What is the effect of high CO₂ levels on occupants?",
      options: [
        "Improved concentration",
        "Reduced concentration and drowsiness",
        "Better sleep quality",
        "No noticeable effects"
      ],
      correct: 1
    },
    {
      question: "At what CO₂ level is ventilation usually increased?",
      options: [
        "500 ppm",
        "1000 ppm",
        "1500 ppm",
        "2000 ppm"
      ],
      correct: 1
    },
    {
      question: "Name two pollutants detected by air quality sensors.",
      options: [
        "Oxygen and nitrogen",
        "PM2.5 and VOCs",
        "Water vapour and CO₂",
        "Heat and light"
      ],
      correct: 1
    },
    {
      question: "How can HVAC respond to poor indoor air quality?",
      options: [
        "Only by changing temperature",
        "Increase ventilation and activate filtration",
        "Turn off all systems",
        "Reduce air circulation"
      ],
      correct: 1
    },
    {
      question: "True or False: Sensor placement doesn't affect accuracy.",
      options: [
        "True",
        "False"
      ],
      correct: 1
    },
    {
      question: "Give one benefit of environmental sensors in energy management.",
      options: [
        "They increase energy consumption",
        "Demand-controlled ventilation reduces unnecessary HVAC operation",
        "They have no energy impact",
        "They only work during winter"
      ],
      correct: 1
    },
    {
      question: "An office reports drowsy staff and poor focus. The CO₂ sensor shows 1500 ppm. What action should the HVAC system take?",
      options: [
        "Reduce ventilation to save energy",
        "Increase fresh air supply and boost ventilation",
        "Turn off air conditioning",
        "No action needed"
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