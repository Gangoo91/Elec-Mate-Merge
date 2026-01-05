import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, RotateCcw, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export const EmergencyLightingQuizSection3_1 = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);

  const questions = [
    {
      id: 1,
      question: "What is the minimum lux requirement along the centre line of escape routes?",
      options: ["0.5 lux", "1 lux", "2 lux", "5 lux"],
      correctAnswer: 1,
      explanation: "BS 5266-1 requires a minimum of 1 lux along the centre line of escape paths to ensure safe navigation during evacuation."
    },
    {
      id: 2,
      question: "How many lux are required for high-risk task areas?",
      options: ["5 lux minimum", "10 lux minimum", "15 lux or 10% of normal lighting (whichever is greater)", "20 lux minimum"],
      correctAnswer: 2,
      explanation: "High-risk task areas require 15 lux minimum or at least 10% of the normal task lighting level, whichever is greater, to enable safe shutdown procedures."
    },
    {
      id: 3,
      question: "What is the minimum lux requirement in open areas (anti-panic lighting)?",
      options: ["0.2 lux", "0.5 lux", "1 lux", "1.5 lux"],
      correctAnswer: 1,
      explanation: "Open areas (anti-panic lighting) require a minimum of 0.5 lux across the floor area to prevent panic and enable orderly evacuation."
    },
    {
      id: 4,
      question: "Why is uniformity important in emergency lighting design?",
      options: ["To save energy", "To avoid shadows or dark patches that could cause panic", "To reduce installation costs", "To improve battery life"],
      correctAnswer: 1,
      explanation: "Uniformity prevents dark patches and shadows that could cause panic, disorientation, or accidents during emergency evacuation."
    },
    {
      id: 5,
      question: "What is the maximum ratio of maximum to minimum illuminance typically allowed?",
      options: ["20:1", "40:1", "60:1", "80:1"],
      correctAnswer: 1,
      explanation: "The uniformity ratio should typically not exceed 40:1 for escape routes to ensure adequate light distribution without excessive contrast."
    },
    {
      id: 6,
      question: "How long must emergency lighting last in general buildings?",
      options: ["30 minutes", "1 hour", "2 hours", "3 hours"],
      correctAnswer: 1,
      explanation: "General buildings require a minimum 1-hour duration, though many installations use 3-hour systems for greater safety margin and compliance flexibility."
    },
    {
      id: 7,
      question: "In public assembly spaces, how long must emergency lighting last?",
      options: ["1 hour", "2 hours", "3 hours", "4 hours"],
      correctAnswer: 2,
      explanation: "Public assembly spaces, workplaces, and premises where re-entry may be required must have emergency lighting that operates for a minimum of 3 hours."
    },
    {
      id: 8,
      question: "Why should designers allow for battery ageing in calculations?",
      options: ["To reduce costs", "To improve efficiency", "Systems must meet requirements at end of battery life, not just when new", "To comply with warranty terms"],
      correctAnswer: 2,
      explanation: "Battery performance degrades over time, so systems must be designed to still achieve required lux levels when batteries reach end of service life (typically 80% of original capacity)."
    },
    {
      id: 9,
      question: "Which instrument is used to measure lux levels during testing?",
      options: ["Multimeter", "Calibrated lux meter", "Oscilloscope", "Infrared thermometer"],
      correctAnswer: 1,
      explanation: "A calibrated lux meter is essential for accurate measurement of illumination levels at floor level during commissioning and periodic testing."
    },
    {
      id: 10,
      question: "Why is a 3-hour duration fitting often used as the default choice?",
      options: ["It's cheaper to install", "It meets requirements for most building types and future-proofs compliance", "It uses less energy", "It's required by law in all buildings"],
      correctAnswer: 1,
      explanation: "3-hour fittings meet the requirements for most commercial and public buildings, provide safety margin for complex evacuations, and future-proof against changing regulations."
    }
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizComplete(true);
      setShowResults(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setQuizComplete(false);
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const score = calculateScore();
  const percentage = Math.round((score / questions.length) * 100);

  if (showResults) {
    return (
      <Card className="bg-slate-200/20 border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Award className="h-6 w-6 text-elec-yellow" />
            Quiz Results: Minimum Illumination Levels and Durations
          </CardTitle>
        </CardHeader>
        <CardContent className="text-foreground space-y-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-elec-yellow mb-2">
              {score}/{questions.length}
            </div>
            <div className="text-2xl mb-4">
              {percentage}% Score
            </div>
            <div className={`text-lg ${percentage >= 80 ? 'text-green-400' : percentage >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
              {percentage >= 80 ? 'Excellent! Well done!' : percentage >= 60 ? 'Good effort! Review the areas below.' : 'Keep studying and try again!'}
            </div>
          </div>

          <div className="space-y-4">
            {questions.map((question, index) => {
              const userAnswer = selectedAnswers[index];
              const isCorrect = userAnswer === question.correctAnswer;
              
              return (
                <div key={index} className="bg-elec-dark/40 p-4 rounded-lg border border-gray-600">
                  <div className="flex items-start gap-3 mb-3">
                    {isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                    )}
                    <div className="flex-grow">
                      <h4 className="font-medium text-foreground mb-2">
                        Question {index + 1}: {question.question}
                      </h4>
                      
                      {!isCorrect && (
                        <div className="mb-2">
                          <span className="text-red-400 text-sm">Your answer: </span>
                          <span className="text-foreground text-sm">{question.options[userAnswer]}</span>
                        </div>
                      )}
                      
                      <div className="mb-2">
                        <span className="text-green-400 text-sm">Correct answer: </span>
                        <span className="text-foreground text-sm">{question.options[question.correctAnswer]}</span>
                      </div>
                      
                      <div className="bg-elec-gray/30 p-3 rounded border border-gray-600">
                        <p className="text-sm text-gray-300">{question.explanation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center">
            <Button 
              onClick={handleRestartQuiz}
              className="bg-elec-yellow text-elec-dark hover:bg-yellow-600"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Retake Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <Card className="bg-slate-200/20 border-elec-yellow/20">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Award className="h-6 w-6 text-elec-yellow" />
            Quiz: Minimum Illumination Levels and Durations
          </span>
          <span className="text-sm text-gray-400">
            Question {currentQuestion + 1} of {questions.length}
          </span>
        </CardTitle>
        <div className="w-full bg-gray-700 rounded-full h-2 mt-4">
          <div 
            className="bg-elec-yellow h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-6 text-foreground">
            {currentQ.question}
          </h3>

          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-4 text-left rounded-lg border transition-all duration-200 ${
                  selectedAnswers[currentQuestion] === index
                    ? 'border-elec-yellow bg-elec-yellow/10 text-foreground'
                    : 'border-gray-600 bg-elec-gray/30 text-foreground hover:border-gray-500 hover:bg-elec-gray/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    selectedAnswers[currentQuestion] === index 
                      ? 'border-elec-yellow bg-elec-yellow' 
                      : 'border-gray-400'
                  }`}>
                    {selectedAnswers[currentQuestion] === index && (
                      <div className="w-2 h-2 bg-elec-dark rounded-full"></div>
                    )}
                  </div>
                  <span>{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <Button 
            onClick={handlePreviousQuestion}
            disabled={currentQuestion === 0}
            variant="outline"
            className="border-gray-600 text-foreground hover:bg-elec-gray/50"
          >
            Previous
          </Button>
          
          <Button 
            onClick={handleNextQuestion}
            disabled={selectedAnswers[currentQuestion] === undefined}
            className="bg-elec-yellow text-elec-dark hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};