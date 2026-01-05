import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, ArrowLeft, ArrowRight } from 'lucide-react';

export const SmartHomeSection5Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      question: "What is the main advantage of retrofit smart home installations?",
      options: [
        "Professional aesthetic finish",
        "Lower upfront costs and minimal disruption",
        "Comprehensive system integration",
        "Future-proof infrastructure"
      ],
      correct: 1
    },
    {
      question: "Which installation approach is best for renters?",
      options: [
        "New build integration",
        "Hybrid approach",
        "Retrofit with portable devices",
        "Professional wired installation"
      ],
      correct: 2
    },
    {
      question: "What is a key benefit of new build smart home integration?",
      options: [
        "Lower initial costs",
        "Immediate installation",
        "Hidden wiring and professional finish",
        "Easy device replacement"
      ],
      correct: 2
    },
    {
      question: "For a budget under £3,000, which approach is typically recommended?",
      options: [
        "Comprehensive new build",
        "Retrofit installation",
        "Professional hybrid system",
        "Commercial grade system"
      ],
      correct: 1
    },
    {
      question: "What makes new build installations more future-proof?",
      options: [
        "Wireless technology",
        "Lower costs",
        "Structured cabling and spare conduits",
        "Simpler setup"
      ],
      correct: 2
    },
    {
      question: "Which factor is most important when choosing between retrofit and new build?",
      options: [
        "Brand preferences",
        "Property status and budget",
        "Colour schemes",
        "Weather conditions"
      ],
      correct: 1
    },
    {
      question: "What is typically the highest cost component in new build smart homes?",
      options: [
        "Smart bulbs",
        "Voice assistants",
        "Professional installation and structured cabling",
        "Smart plugs"
      ],
      correct: 2
    },
    {
      question: "For a growing family wanting security and energy management, which approach is recommended?",
      options: [
        "Basic retrofit only",
        "Hybrid retrofit with gradual expansion",
        "Wait for new build opportunity",
        "Commercial-grade system"
      ],
      correct: 1
    },
    {
      question: "What is the typical disruption level for retrofit installations?",
      options: [
        "Major construction work required",
        "Complete rewiring needed",
        "Minimal disruption with immediate use",
        "Property must be vacated"
      ],
      correct: 2
    },
    {
      question: "Which scenario best suits comprehensive new build integration?",
      options: [
        "Student accommodation",
        "Short-term rental property",
        "Permanent family home with high budget",
        "Temporary living situation"
      ],
      correct: 2
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