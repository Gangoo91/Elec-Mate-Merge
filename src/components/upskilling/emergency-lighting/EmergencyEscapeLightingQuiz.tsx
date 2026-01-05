import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const EmergencyEscapeLightingQuiz = () => {
  const questions: QuizQuestion[] = [
    {
      id: 1,
      question: "What is the minimum horizontal illuminance required on escape routes according to BS 5266-1?",
      options: ["0.5 lux", "1 lux", "1.5 lux", "2 lux"],
      correctAnswer: 1,
      explanation: "BS 5266-1 specifies a minimum of 1 lux horizontal illuminance on escape routes to ensure safe movement during evacuation."
    },
    {
      id: 2,
      question: "What is the maximum uniformity ratio allowed for emergency escape lighting?",
      options: ["20:1", "30:1", "40:1", "50:1"],
      correctAnswer: 2,
      explanation: "The maximum uniformity ratio is 40:1 to ensure there are no excessively dark areas that could impede safe evacuation."
    },
    {
      id: 3,
      question: "For corridors, what is the maximum spacing between emergency luminaires based on mounting height?",
      options: ["1 × mounting height", "2 × mounting height", "3 × mounting height", "4 × mounting height"],
      correctAnswer: 1,
      explanation: "For corridors and escape routes, luminaires should be spaced at a maximum of 2 times the mounting height to ensure adequate coverage."
    },
    {
      id: 4,
      question: "Where must emergency lighting be provided at exit doors?",
      options: ["Only at final exits", "At fire exits only", "At all exit doors", "Only at main entrances"],
      correctAnswer: 2,
      explanation: "Emergency lighting must be provided at all exit doors to ensure they are clearly visible and accessible during an emergency."
    },
    {
      id: 5,
      question: "What type of emergency lighting is specifically designed for escape routes?",
      options: ["Standby lighting", "Escape route lighting", "Anti-panic lighting", "High risk task area lighting"],
      correctAnswer: 1,
      explanation: "Escape route lighting is specifically designed to illuminate escape routes and exits to enable safe evacuation."
    },
    {
      id: 6,
      question: "At what height should emergency escape lighting typically be measured for illuminance levels?",
      options: ["Floor level", "0.5m above floor", "1m above floor", "2m above floor"],
      correctAnswer: 0,
      explanation: "Illuminance levels for emergency escape lighting are measured at floor level where people will be walking during evacuation."
    },
    {
      id: 7,
      question: "What is the minimum duration requirement for emergency escape lighting in most buildings?",
      options: ["1 hour", "1.5 hours", "2 hours", "3 hours"],
      correctAnswer: 2,
      explanation: "Most buildings require emergency lighting to operate for a minimum of 3 hours, though some applications may require only 1 hour."
    },
    {
      id: 8,
      question: "Emergency lighting must be provided at which of the following locations?",
      options: ["Changes of direction only", "Level changes only", "All of the above plus toilets", "Changes of direction and level changes"],
      correctAnswer: 3,
      explanation: "Emergency lighting must be provided at changes of direction, changes of level, and other key locations to guide people safely."
    },
    {
      id: 9,
      question: "What is the primary purpose of emergency escape lighting?",
      options: ["To provide working light", "To illuminate escape routes", "To prevent panic", "To save energy"],
      correctAnswer: 1,
      explanation: "The primary purpose of emergency escape lighting is to illuminate escape routes and exits to enable safe evacuation during power failure."
    },
    {
      id: 10,
      question: "According to BS 5266-1, how far should exit signs be visible from?",
      options: ["5 metres", "10 metres", "15 metres", "20 metres"],
      correctAnswer: 2,
      explanation: "Exit signs should be visible from 15 metres away to ensure people can identify escape routes from a reasonable distance."
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(new Array(questions.length).fill(-1));
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers(new Array(questions.length).fill(-1));
    setShowResults(false);
  };

  const calculateScore = () => {
    return selectedAnswers.filter((answer, index) => answer === questions[index].correctAnswer).length;
  };

  const getScoreColor = (score: number) => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreMessage = (score: number) => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return 'Excellent! You have a strong understanding of emergency escape lighting.';
    if (percentage >= 60) return 'Good work! Review the areas you missed to strengthen your knowledge.';
    return 'Keep studying! Focus on the explanations to improve your understanding.';
  };

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <Card className="bg-elec-gray border-transparent">
        <CardHeader className="text-center">
          <CardTitle className="text-foreground text-2xl">Quiz Results</CardTitle>
          <div className="text-center">
            <div className={`text-4xl font-bold ${getScoreColor(score)}`}>
              {score}/{questions.length}
            </div>
            <div className={`text-xl ${getScoreColor(score)}`}>
              {percentage}%
            </div>
            <p className="text-gray-300 mt-2">{getScoreMessage(score)}</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {questions.map((question, index) => (
              <div key={question.id} className="bg-elec-dark rounded-lg p-4 border border-gray-600">
                <div className="flex items-start gap-3">
                  {selectedAnswers[index] === question.correctAnswer ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className="text-foreground font-medium text-sm mb-2">
                      {question.id}. {question.question}
                    </p>
                    <p className="text-gray-300 text-sm mb-1">
                      <span className="font-medium">Your answer:</span> {question.options[selectedAnswers[index]]}
                    </p>
                    <p className="text-gray-300 text-sm mb-2">
                      <span className="font-medium">Correct answer:</span> {question.options[question.correctAnswer]}
                    </p>
                    <p className="text-gray-400 text-xs">{question.explanation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center pt-4">
            <Button onClick={resetQuiz} className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
              <RotateCcw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <div className="flex justify-between items-center mb-4">
          <CardTitle className="text-foreground">Emergency Escape Lighting Quiz</CardTitle>
          <Badge variant="secondary" className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30">
            Question {currentQuestion + 1} of {questions.length}
          </Badge>
        </div>
        <Progress value={progress} className="w-full" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">
            {question.question}
          </h3>
          <RadioGroup
            value={selectedAnswers[currentQuestion].toString()}
            onValueChange={(value) => handleAnswerSelect(parseInt(value))}
            className="space-y-3"
          >
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 p-3 rounded-lg bg-elec-dark border border-gray-600 hover:border-gray-500 transition-colors">
                <RadioGroupItem value={index.toString()} id={`option-${index}`} className="text-elec-yellow" />
                <Label htmlFor={`option-${index}`} className="text-gray-300 cursor-pointer flex-1">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="flex justify-between pt-4">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-elec-gray"
          >
            Previous
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={selectedAnswers[currentQuestion] === -1}
            className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
          >
            {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};