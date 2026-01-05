
import { Brain } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import QuizQuestion from './quiz/QuizQuestion';
import QuizNavigation from './quiz/QuizNavigation';
import QuizProgress from './quiz/QuizProgress';
import QuizResults from './quiz/QuizResults';
import { QuizQuestion as QuizQuestionType } from '@/types/quiz';

const quizQuestions: QuizQuestionType[] = [
  {
    id: 1,
    question: "What's a serious risk of a loose earth terminal?",
    options: [
      "No fault path means shock risk and non-disconnection during faults",
      "It will cause RCD nuisance tripping",
      "It reduces the circuit's load capacity",
      "It affects the voltage regulation"
    ],
    correctAnswer: 0,
    explanation: "A loose earth terminal creates no fault path, meaning dangerous voltages could persist on metalwork during fault conditions, creating serious shock risks."
  },
  {
    id: 2,
    question: "Which of the following is NOT a visual defect?",
    options: [
      "Mixing of neutral and CPC conductors",
      "A fully labelled and securely terminated DB",
      "Open knockout holes in enclosures",
      "Missing IP-rated seals in wet areas"
    ],
    correctAnswer: 1,
    explanation: "A fully labelled and securely terminated distribution board represents good installation practice and compliance with regulations."
  },
  {
    id: 3,
    question: "True or False: It's acceptable to leave open knockout holes in a metal enclosure.",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation: "Open knockout holes compromise the IP rating, allow ingress of moisture/debris, and can create sharp edges that may damage cables."
  },
  {
    id: 4,
    question: "Where are visual defects most commonly found?",
    options: [
      "In cable runs only",
      "DBs, terminals, and cable entries",
      "Only in wet locations",
      "At the main incoming supply"
    ],
    correctAnswer: 1,
    explanation: "Distribution boards, terminals, and cable entries are the most common locations for visual defects due to the concentration of connections and potential for poor workmanship."
  },
  {
    id: 5,
    question: "Why must neutral and CPC conductors not be mixed in the same terminal?",
    options: [
      "It causes confusion and risks poor disconnection performance",
      "It increases the circuit impedance",
      "It violates voltage drop requirements",
      "It affects power factor correction"
    ],
    correctAnswer: 0,
    explanation: "Mixing neutral and CPC conductors causes confusion during maintenance and can compromise protective conductor continuity, affecting fault disconnection performance."
  }
];

export const CommonDefectsQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(new Array(quizQuestions.length).fill(-1));
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
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswers(new Array(quizQuestions.length).fill(-1));
    setShowResults(false);
  };

  if (showResults) {
    return (
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Brain className="h-5 w-5 text-elec-yellow" />
            Quiz Results
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
          Quick Quiz
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
          selectedAnswer={selectedAnswers[currentQuestion] !== -1 ? selectedAnswers[currentQuestion] : undefined}
          onPrevious={handlePrevious}
          onNext={handleNext}
          isLastQuestion={currentQuestion === quizQuestions.length - 1}
        />
      </CardContent>
    </Card>
  );
};
