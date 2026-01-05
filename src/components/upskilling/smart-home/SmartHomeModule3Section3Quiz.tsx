import { useState } from 'react';
import { Brain, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';

export const SmartHomeModule3Section3Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const questions = [
    {
      question: "What does 'dimming' mean in smart lighting?",
      options: [
        "Turning lights on and off",
        "Adjusting the brightness level of lights",
        "Changing the colour of lights",
        "Setting schedules for lights"
      ],
      correct: 1
    },
    {
      question: "Why do old-style dimmers cause problems with LEDs?",
      options: [
        "LEDs are too bright",
        "They reduce voltage instead of using digital control",
        "They are too expensive",
        "They don't work with smart phones"
      ],
      correct: 1
    },
    {
      question: "What does RGBW stand for?",
      options: [
        "Really Good Bright White",
        "Red, Green, Blue, White",
        "Remote Controlled Bright Wireless",
        "Regulated Great British Wiring"
      ],
      correct: 1
    },
    {
      question: "What is a drawback of RGB-only bulbs?",
      options: [
        "They use too much power",
        "They are too expensive",
        "They struggle to replicate natural white effectively",
        "They don't last long enough"
      ],
      correct: 2
    },
    {
      question: "Give an example of a smart lighting application using RGBW:",
      options: [
        "Basic on/off switching",
        "Mood lighting for parties with natural white for reading",
        "Timer-based switching",
        "Motion sensor activation"
      ],
      correct: 1
    },
    {
      question: "At what Kelvin is 'warm white'?",
      options: [
        "6500K",
        "4000K",
        "2700K",
        "1000K"
      ],
      correct: 2
    },
    {
      question: "At what Kelvin is 'cool white'?",
      options: [
        "2700K",
        "3500K",
        "5000-6500K",
        "8000K"
      ],
      correct: 2
    },
    {
      question: "What is circadian rhythm lighting?",
      options: [
        "Very bright lighting",
        "Colour-changing party lights",
        "Lighting that adjusts colour temperature to match natural daylight patterns",
        "Emergency lighting systems"
      ],
      correct: 2
    },
    {
      question: "Name one benefit of dimming for energy efficiency:",
      options: [
        "Lights last longer",
        "Reduced power consumption at lower brightness levels",
        "Better colour accuracy",
        "Faster switching speeds"
      ],
      correct: 1
    },
    {
      question: "A client wants mood lighting for parties and natural daylight for reading. What type of bulb would you recommend?",
      options: [
        "Standard white LED",
        "RGB-only bulb",
        "RGBW smart bulb",
        "Halogen bulb with dimmer"
      ],
      correct: 2
    }
  ];

  const handleAnswerSelect = (answerIndex: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateScore();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let newScore = 0;
    selectedAnswers.forEach((answer, index) => {
      if (parseInt(answer) === questions[index].correct) {
        newScore++;
      }
    });
    setScore(newScore);
    setShowResults(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setScore(0);
  };

  const getScoreColor = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return "text-green-400";
    if (percentage >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return "Excellent! You have a strong understanding of dimming and colour control.";
    if (percentage >= 60) return "Good work! Review the areas you missed and try again.";
    return "Keep studying! This is a complex topic that requires more review.";
  };

  if (showResults) {
    return (
      <Card className="bg-gradient-to-br from-emerald-50/10 to-green-50/10 border-emerald-200/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-emerald-300">
            <Brain className="h-6 w-6" />
            Quiz Results
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className={`text-4xl font-bold ${getScoreColor()}`}>
              {score}/{questions.length}
            </div>
            <div className="text-xl text-foreground">
              {Math.round((score / questions.length) * 100)}% Correct
            </div>
            <p className="text-foreground max-w-md mx-auto">
              {getScoreMessage()}
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-foreground font-semibold">Answer Review:</h4>
            {questions.map((question, index) => {
              const userAnswer = parseInt(selectedAnswers[index]);
              const isCorrect = userAnswer === question.correct;
              
              return (
                <div key={index} className="p-3 bg-emerald-900/20 rounded-lg border border-emerald-600/30">
                  <div className="flex items-start gap-2">
                    {isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                    )}
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-foreground">
                        Q{index + 1}: {question.question}
                      </p>
                      <p className="text-sm text-foreground">
                        <span className="text-green-400">Correct:</span> {question.options[question.correct]}
                      </p>
                      {!isCorrect && (
                        <p className="text-sm text-foreground">
                          <span className="text-red-400">Your answer:</span> {question.options[userAnswer]}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <Button 
            onClick={resetQuiz}
            className="w-full bg-emerald-600 hover:bg-emerald-700"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Retake Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-emerald-50/10 to-green-50/10 border-emerald-200/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-emerald-300">
          <Brain className="h-6 w-6" />
          Knowledge Check Quiz
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-foreground">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete</span>
          </div>
          <Progress 
            value={((currentQuestion + 1) / questions.length) * 100} 
            className="h-2"
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground leading-relaxed">
            {questions[currentQuestion].question}
          </h3>

          <RadioGroup
            value={selectedAnswers[currentQuestion] || ""}
            onValueChange={handleAnswerSelect}
            className="space-y-3"
          >
            {questions[currentQuestion].options.map((option, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-emerald-900/20 transition-colors">
                <RadioGroupItem 
                  value={index.toString()} 
                  id={`option-${index}`}
                  className="border-emerald-400 text-emerald-400"
                />
                <Label 
                  htmlFor={`option-${index}`} 
                  className="flex-1 text-foreground cursor-pointer"
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="border-gray-600 text-foreground hover:bg-gray-700"
          >
            Previous
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={!selectedAnswers[currentQuestion]}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            {currentQuestion === questions.length - 1 ? "Complete Quiz" : "Next Question"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};