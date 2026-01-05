import { Brain, CheckCircle2, X, RotateCcw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export const EmergencyLightingQuizSection2 = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const questions = [
    {
      id: 1,
      question: "Emergency lighting is mandatory in which of the following locations?",
      options: ["All corridors in a building", "Only fire escape routes", "All escape routes and high-risk areas", "Only external areas"],
      correct: 2,
      explanation: "BS5266 requires emergency lighting in all escape routes, plus high-risk areas, plant rooms, toilets >8m², and other specified locations."
    },
    {
      id: 2,
      question: "What is the minimum illumination level required on escape route centre lines?",
      options: ["0.5 lux", "1 lux", "2 lux", "5 lux"],
      correct: 1,
      explanation: "BS5266 requires minimum 1 lux along the centre line of escape routes, with 0.5 lux minimum anywhere on the route."
    },
    {
      id: 3,
      question: "Operating theatres in hospitals require emergency lighting duration of:",
      options: ["1 hour", "2 hours", "3 hours", "8 hours"],
      correct: 2,
      explanation: "Critical healthcare areas like operating theatres require 3-hour emergency lighting duration for patient safety."
    },
    {
      id: 4,
      question: "Toilets exceeding what floor area require emergency lighting?",
      options: ["4m²", "6m²", "8m²", "10m²"],
      correct: 2,
      explanation: "BS5266 requires emergency lighting in toilets exceeding 8m² floor area."
    },
    {
      id: 5,
      question: "Which areas always require emergency lighting regardless of size?",
      options: ["All toilets", "All corridors", "All escape routes", "All offices"],
      correct: 2,
      explanation: "All escape routes must have emergency lighting regardless of their size or length."
    },
    {
      id: 6,
      question: "Plant rooms require emergency lighting when they contain:",
      options: ["Any equipment", "Essential services or safety equipment", "Only electrical panels", "Windows"],
      correct: 1,
      explanation: "Plant rooms need emergency lighting when they contain essential services, safety equipment, or require emergency procedures."
    },
    {
      id: 7,
      question: "Open-plan offices exceeding what area need emergency lighting?",
      options: ["30m²", "50m²", "60m²", "100m²"],
      correct: 2,
      explanation: "Open-plan offices exceeding 60m² require emergency lighting under BS5266."
    },
    {
      id: 8,
      question: "Disabled refuge areas require minimum illumination of:",
      options: ["1 lux", "2 lux", "5 lux", "10 lux"],
      correct: 2,
      explanation: "Disabled refuge areas require enhanced illumination of minimum 5 lux for clear communication and instruction visibility."
    },
    {
      id: 9,
      question: "All stairways must have emergency lighting:",
      options: ["Only at the top", "Only at the bottom", "On each flight and half-landing", "Every other flight"],
      correct: 2,
      explanation: "BS5266 requires emergency lighting to illuminate each flight of stairs and every half-landing."
    },
    {
      id: 10,
      question: "Areas of special fire risk typically include:",
      options: ["All storage areas", "Areas with significant combustible materials", "All kitchens", "All basements"],
      correct: 1,
      explanation: "Areas of special fire risk contain significant combustible materials, flammable substances, or processes that could rapidly develop fire."
    }
  ];

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex.toString());
    setShowExplanation(true);
    if (answerIndex === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizComplete(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setQuizComplete(false);
  };

  return (
    <Card className="bg-elec-gray border-gray-600 shadow-lg">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Brain className="h-5 w-5 text-purple-400" />
          Section Assessment: Required Locations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {!quizComplete ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400 text-sm">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <div className="flex space-x-1">
                {questions.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full ${
                      index < currentQuestion
                        ? 'bg-green-500'
                        : index === currentQuestion
                        ? 'bg-blue-500'
                        : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-foreground font-medium text-lg">
                {questions[currentQuestion].question}
              </h4>
              
              <div className="grid gap-3">
                {questions[currentQuestion].options.map((option, optionIndex) => {
                  let buttonClass = 'text-left p-4 rounded-lg transition-colors border ';
                  
                  if (!showExplanation) {
                    buttonClass += selectedAnswer === optionIndex.toString()
                      ? 'bg-blue-600/20 text-blue-400 border-blue-600/40'
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border-gray-600';
                  } else {
                    if (optionIndex === questions[currentQuestion].correct) {
                      buttonClass += 'bg-green-600/20 text-green-400 border-green-600/40';
                    } else if (selectedAnswer === optionIndex.toString() && optionIndex !== questions[currentQuestion].correct) {
                      buttonClass += 'bg-red-600/20 text-red-400 border-red-600/40';
                    } else {
                      buttonClass += 'bg-gray-800/30 text-gray-400 border-gray-600/30';
                    }
                  }

                  return (
                    <button
                      key={optionIndex}
                      onClick={() => !showExplanation && handleAnswer(optionIndex)}
                      disabled={showExplanation}
                      className={buttonClass}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-medium">
                          {String.fromCharCode(65 + optionIndex)}.
                        </span>
                        <span>{option}</span>
                        {showExplanation && optionIndex === questions[currentQuestion].correct && (
                          <CheckCircle2 className="h-5 w-5 text-green-400 ml-auto" />
                        )}
                        {showExplanation && selectedAnswer === optionIndex.toString() && optionIndex !== questions[currentQuestion].correct && (
                          <X className="h-5 w-5 text-red-400 ml-auto" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {showExplanation && (
                <div className={`p-4 rounded-lg border ${
                  selectedAnswer === questions[currentQuestion].correct.toString()
                    ? 'bg-green-600/10 border-green-600/30'
                    : 'bg-red-600/10 border-red-600/30'
                }`}>
                  <p className={`font-medium mb-2 ${
                    selectedAnswer === questions[currentQuestion].correct.toString()
                      ? 'text-green-400'
                      : 'text-red-400'
                  }`}>
                    {selectedAnswer === questions[currentQuestion].correct.toString() ? '✓ Correct!' : '✗ Incorrect'}
                  </p>
                  <p className="text-gray-300 text-sm">{questions[currentQuestion].explanation}</p>
                </div>
              )}
            </div>

            {showExplanation && (
              <Button 
                onClick={nextQuestion}
                className="w-full bg-elec-yellow text-elec-dark hover:bg-yellow-600"
              >
                {currentQuestion < questions.length - 1 ? 'Next Question' : 'View Results'}
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center p-6 bg-purple-600/10 border border-purple-600/30 rounded-lg">
              <h3 className="text-2xl font-bold text-foreground mb-2">Assessment Complete!</h3>
              <p className="text-xl text-purple-400">
                Final Score: {score}/{questions.length} ({Math.round((score / questions.length) * 100)}%)
              </p>
              <p className="text-gray-300 mt-2">
                {Math.round((score / questions.length) * 100) >= 80 ? "Excellent understanding!" : 
                 Math.round((score / questions.length) * 100) >= 60 ? "Good progress!" : 
                 "Consider reviewing the content and retaking the assessment."}
              </p>
            </div>

            <Button 
              onClick={resetQuiz}
              variant="outline"
              className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Retake Assessment
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};