import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, RotateCcw } from 'lucide-react';
import QuizProgress from '@/components/upskilling/quiz/QuizProgress';
import QuizNavigation from '@/components/upskilling/quiz/QuizNavigation';
import QuizQuestion from '@/components/upskilling/quiz/QuizQuestion';
import QuizResults from '@/components/upskilling/quiz/QuizResults';
import { QuizQuestion as QuizQuestionType } from '@/types/quiz';

const quizQuestions: QuizQuestionType[] = [
  {
    id: 1,
    question: "What is the primary purpose of escape route lighting?",
    options: [
      "To provide ambient lighting in normal conditions",
      "To illuminate escape routes to allow safe evacuation",
      "To identify fire alarm call points",
      "To provide security lighting during power outages"
    ],
    correctAnswer: 1,
    explanation: "Escape route lighting is specifically designed to illuminate escape routes, exits, and any change of direction along the evacuation path to ensure safe evacuation during an emergency."
  },
  {
    id: 2,
    question: "Which type of emergency lighting helps people locate fire safety equipment?",
    options: [
      "Escape route lighting",
      "Open area lighting",
      "High risk task area lighting",
      "Fire safety sign lighting"
    ],
    correctAnswer: 3,
    explanation: "Fire safety sign lighting is specifically designed to illuminate safety signs and help occupants locate fire safety equipment such as fire extinguishers, alarm call points, and emergency exits."
  },
  {
    id: 3,
    question: "What is the main characteristic of a maintained emergency lighting system?",
    options: [
      "It only operates during power failures",
      "It operates continuously, whether mains power is available or not",
      "It requires manual activation",
      "It only works for 30 minutes"
    ],
    correctAnswer: 1,
    explanation: "A maintained emergency lighting system operates continuously, providing illumination at all times whether mains power is available or not. This ensures constant visibility of escape routes."
  },
  {
    id: 4,
    question: "In a non-maintained emergency lighting system, when do the lights operate?",
    options: [
      "Continuously during normal operation",
      "Only when manually activated",
      "Only when mains power fails",
      "During testing periods only"
    ],
    correctAnswer: 2,
    explanation: "Non-maintained emergency lighting operates only when mains power fails. During normal operation with mains power available, these lights remain off to conserve energy."
  },
  {
    id: 5,
    question: "What is open area lighting designed to illuminate?",
    options: [
      "Escape routes only",
      "Large open spaces to prevent panic and allow safe movement",
      "External building areas",
      "Storage rooms and plant areas"
    ],
    correctAnswer: 1,
    explanation: "Open area lighting (also known as anti-panic lighting) is designed to illuminate large open spaces to prevent panic and allow occupants to move safely to escape routes during an emergency."
  },
  {
    id: 6,
    question: "High risk task area lighting is required in areas where:",
    options: [
      "Normal lighting levels are particularly high",
      "Sudden loss of lighting could cause danger or injury",
      "Fire risk is elevated",
      "Security is particularly important"
    ],
    correctAnswer: 1,
    explanation: "High risk task area lighting is required in areas where the sudden loss of normal lighting could cause danger or injury, such as plant rooms, kitchens with cooking equipment, or areas with dangerous machinery."
  },
  {
    id: 7,
    question: "What is the typical minimum illumination level required for escape route lighting?",
    options: [
      "0.2 lux",
      "1 lux",
      "5 lux",
      "10 lux"
    ],
    correctAnswer: 1,
    explanation: "The minimum illumination level for escape route lighting is typically 1 lux measured at floor level along the centre line of the escape route, as specified in BS 5266."
  },
  {
    id: 8,
    question: "Which system allows emergency lights to be controlled from multiple locations?",
    options: [
      "Self-contained system",
      "Central battery system",
      "Maintained system",
      "Non-maintained system"
    ],
    correctAnswer: 1,
    explanation: "A central battery system allows emergency lights to be controlled and monitored from multiple locations, as all luminaires are supplied from a central battery source with control and monitoring capabilities."
  },
  {
    id: 9,
    question: "What is the main advantage of self-contained emergency lighting luminaires?",
    options: [
      "Lower initial cost",
      "Easier maintenance",
      "Independence from central systems",
      "Higher light output"
    ],
    correctAnswer: 2,
    explanation: "Self-contained emergency lighting luminaires have their own battery backup, making them independent from central systems. This means failure of one unit doesn't affect others, providing greater reliability."
  },
  {
    id: 10,
    question: "According to BS 5266, what is the minimum duration emergency lighting should operate?",
    options: [
      "30 minutes",
      "1 hour",
      "2 hours",
      "3 hours"
    ],
    correctAnswer: 1,
    explanation: "BS 5266 requires emergency lighting to operate for a minimum of 1 hour during a power failure, though some applications may require longer duration depending on the building type and evacuation procedures."
  }
];

export const EmergencyLightingTypesQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    setCurrentQuestion(currentQuestion - 1);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
  };

  if (showResults) {
    return (
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Brain className="h-5 w-5 text-elec-yellow" />
            Quiz Results - Emergency Lighting Types
          </CardTitle>
        </CardHeader>
        <CardContent>
          <QuizResults 
            questions={quizQuestions}
            selectedAnswers={selectedAnswers}
            onRestart={handleRestart}
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Brain className="h-5 w-5 text-elec-yellow" />
          Knowledge Assessment - Types of Emergency Lighting Systems
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <QuizProgress 
          currentQuestion={currentQuestion}
          totalQuestions={quizQuestions.length}
        />
        
        <QuizQuestion
          question={quizQuestions[currentQuestion]}
          selectedAnswer={selectedAnswers[currentQuestion]}
          onAnswerSelect={handleAnswerSelect}
        />
        
        <QuizNavigation
          currentQuestion={currentQuestion}
          totalQuestions={quizQuestions.length}
          selectedAnswer={selectedAnswers[currentQuestion]}
          onPrevious={handlePrevious}
          onNext={handleNext}
          isLastQuestion={currentQuestion === quizQuestions.length - 1}
        />
      </CardContent>
    </Card>
  );
};