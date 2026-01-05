
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import QuizProgress from './quiz/QuizProgress';
import QuizQuestion from './quiz/QuizQuestion';
import QuizNavigation from './quiz/QuizNavigation';
import QuizResults from './quiz/QuizResults';
import { QuizQuestion as QuizQuestionType } from '@/types/quiz';

const quizQuestions: QuizQuestionType[] = [
  {
    id: 1,
    question: "What is the maximum recommended interval for periodic inspection and testing of commercial installations under normal conditions?",
    options: [
      "1 year",
      "3 years", 
      "5 years",
      "10 years"
    ],
    correctAnswer: 2,
    explanation: "BS 7671 recommends a maximum interval of 5 years for periodic inspection and testing of commercial installations under normal conditions, though this may be reduced based on the nature of the installation and environment."
  },
  {
    id: 2,
    question: "When must initial verification be carried out on a new electrical installation?",
    options: [
      "Within 6 months of completion",
      "Before the installation is put into service",
      "After the first year of operation",
      "Only if requested by the client"
    ],
    correctAnswer: 1,
    explanation: "Initial verification must be carried out before an installation is put into service to ensure it complies with BS 7671 and is safe for use."
  },
  {
    id: 3,
    question: "Which of the following would typically require more frequent inspection and testing?",
    options: [
      "Domestic kitchen installation",
      "Office building installation", 
      "Swimming pool installation",
      "Bedroom lighting circuit"
    ],
    correctAnswer: 2,
    explanation: "Swimming pool installations require more frequent inspection due to the increased risk from water and the special requirements for electrical installations in wet locations."
  },
  {
    id: 4,
    question: "What triggers the requirement for an Electrical Installation Condition Report (EICR)?",
    options: [
      "Only when selling a property",
      "Change of occupancy, insurance requirements, or landlord obligations",
      "Every 10 years regardless of circumstances",
      "Only when electrical faults are evident"
    ],
    correctAnswer: 1,
    explanation: "EICRs may be required for various reasons including change of occupancy, insurance requirements, landlord legal obligations, or as part of due diligence processes."
  },
  {
    id: 5,
    question: "What is the typical maximum interval for periodic inspection of a domestic installation?",
    options: [
      "5 years",
      "10 years",
      "15 years",
      "20 years"
    ],
    correctAnswer: 1,
    explanation: "The typical maximum interval for periodic inspection of domestic installations is 10 years, though this may be reduced in certain circumstances or high-risk environments."
  },
  {
    id: 6,
    question: "For agricultural installations, what is the recommended maximum inspection interval?",
    options: [
      "1 year",
      "3 years",
      "5 years",
      "10 years"
    ],
    correctAnswer: 1,
    explanation: "Agricultural installations are recommended for inspection every 3 years due to the harsh environmental conditions including dust, moisture, and corrosive atmospheres from livestock."
  },
  {
    id: 7,
    question: "Which circumstance would require immediate inspection and testing?",
    options: [
      "Change of property ownership",
      "Installation of new appliances",
      "Visible damage to electrical equipment after flooding",
      "Routine maintenance schedule"
    ],
    correctAnswer: 2,
    explanation: "Visible damage to electrical equipment, especially after events like flooding, requires immediate inspection and testing before the installation can be safely re-energised."
  },
  {
    id: 8,
    question: "For rental properties in England, landlords must ensure electrical inspections are carried out at least every:",
    options: [
      "3 years",
      "5 years", 
      "7 years",
      "10 years"
    ],
    correctAnswer: 1,
    explanation: "Since July 2020, landlords in England must ensure electrical installations in residential rental properties are inspected and tested at least every 5 years."
  },
  {
    id: 9,
    question: "What factor would typically reduce the inspection interval from the standard recommendation?",
    options: [
      "Low usage of the installation",
      "Indoor installation only",
      "High humidity or corrosive atmosphere",
      "Modern wiring systems"
    ],
    correctAnswer: 2,
    explanation: "Environmental factors such as high humidity, corrosive atmospheres, extreme temperatures, or mechanical stress typically require more frequent inspection intervals."
  },
  {
    id: 10,
    question: "Following electrical installation work that requires Building Regulations notification, when should inspection and testing occur?",
    options: [
      "Within 30 days of completion",
      "Before the work is put into service and before notification to Building Control",
      "Only if specifically requested",
      "After Building Control approval"
    ],
    correctAnswer: 1,
    explanation: "Inspection and testing must be completed before the installation is put into service and the results must be available before notification to Building Control, ensuring the work complies with BS 7671."
  }
];

const WhenIsInspectionRequiredQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | undefined>(undefined);
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer !== undefined) {
      const newAnswers = [...selectedAnswers];
      newAnswers[currentQuestion] = selectedAnswer;
      setSelectedAnswers(newAnswers);

      if (currentQuestion === quizQuestions.length - 1) {
        setShowResults(true);
      } else {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(newAnswers[currentQuestion + 1]);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(selectedAnswers[currentQuestion - 1]);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setSelectedAnswer(undefined);
    setShowResults(false);
  };

  if (showResults) {
    return <QuizResults questions={quizQuestions} selectedAnswers={selectedAnswers} onRestart={handleRestart} />;
  }

  return (
    <div className="space-y-6">
      <Card className="bg-[#323232] border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground text-center">
            When Is Inspection & Testing Required? - Knowledge Check
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <QuizProgress 
            currentQuestion={currentQuestion} 
            totalQuestions={quizQuestions.length} 
          />
          
          <QuizQuestion
            question={quizQuestions[currentQuestion]}
            selectedAnswer={selectedAnswer}
            onAnswerSelect={handleAnswerSelect}
          />
          
          <QuizNavigation
            currentQuestion={currentQuestion}
            totalQuestions={quizQuestions.length}
            selectedAnswer={selectedAnswer}
            onPrevious={handlePrevious}
            onNext={handleNext}
            isLastQuestion={currentQuestion === quizQuestions.length - 1}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default WhenIsInspectionRequiredQuiz;
