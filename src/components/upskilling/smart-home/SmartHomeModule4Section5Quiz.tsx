import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, RotateCcw } from 'lucide-react';

export const SmartHomeModule4Section5Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(string | null)[]>(new Array(10).fill(null));
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      question: "What is HVAC integration?",
      options: ["Installing multiple AC units", "Connecting heating, cooling, and ventilation into coordinated control", "Using only heating systems", "Removing ventilation systems"],
      correct: 1
    },
    {
      question: "What is an interlock in HVAC systems?",
      options: ["A type of thermostat", "A feature that prevents conflicting systems from operating together", "A ventilation fan", "A heating element"],
      correct: 1
    },
    {
      question: "Give one example of a software interlock.",
      options: ["A physical wire connection", "Programmed rule preventing heating and cooling simultaneously", "A manual switch", "A temperature sensor"],
      correct: 1
    },
    {
      question: "Why is it bad if heating and cooling run at the same time?",
      options: ["It makes noise", "It causes massive energy waste and system conflicts", "It looks unprofessional", "It requires more maintenance"],
      correct: 1
    },
    {
      question: "How can CO₂ sensors support HVAC integration?",
      options: ["By measuring temperature", "By triggering ventilation when air quality drops", "By controlling lighting", "By monitoring humidity only"],
      correct: 1
    },
    {
      question: "Name one example of linking blinds to HVAC systems.",
      options: ["Blinds control room lighting only", "Blinds close automatically to reduce cooling demand", "Blinds open for decoration", "Blinds have no HVAC connection"],
      correct: 1
    },
    {
      question: "What is the role of controllers in integration?",
      options: ["They only display temperature", "They make decisions based on sensor data and apply interlock logic", "They replace all sensors", "They only work with heating"],
      correct: 1
    },
    {
      question: "True or False: Interlocks only exist in commercial BMS systems.",
      options: ["True", "False"],
      correct: 1
    },
    {
      question: "What should always be tested during HVAC commissioning?",
      options: ["Only the heating system", "All interlocks to ensure proper function", "Only the cooling system", "Only the ventilation"],
      correct: 1
    },
    {
      question: "A client complains that their AC and heating are running together. What solution should the installer implement?",
      options: ["Remove the AC system", "Install an interlock to prevent simultaneous operation", "Remove the heating system", "Ignore the problem"],
      correct: 1
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
              <p className="text-green-300">Excellent! You have a strong understanding of HVAC integration and interlocks.</p>
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
          Knowledge Quiz: HVAC Integration and Interlocks
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