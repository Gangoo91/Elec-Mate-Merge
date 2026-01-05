
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
    question: "Why is visual inspection carried out before electrical testing?",
    options: [
      "To identify unsafe or non-compliant conditions before energising",
      "To test the electrical circuits", 
      "To measure voltage levels",
      "To calibrate test instruments"
    ],
    correctAnswer: 0,
    explanation: "Visual inspection must be completed before any electrical testing to identify potentially dangerous conditions that could pose risks during testing or normal operation."
  },
  {
    id: 2,
    question: "Which of the following is a typical visual inspection fault?",
    options: [
      "High resistance readings",
      "Missing grommets in metal enclosure",
      "Low insulation resistance",
      "RCD tripping time too long"
    ],
    correctAnswer: 1,
    explanation: "Missing grommets in metal enclosures can only be detected through visual inspection and pose a safety risk by potentially damaging cables."
  },
  {
    id: 3,
    question: "True or False: If a circuit looks fine visually, you can skip the detailed visual inspection checklist.",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation: "Visual inspection must be systematic and thorough using a proper checklist, as many defects are not immediately obvious and require careful examination."
  },
  {
    id: 4,
    question: "What should you do if you find evidence of overheating in a distribution board?",
    options: [
      "Continue with testing as planned",
      "Stop work, report it, and investigate the cause",
      "Just make a note on the certificate",
      "Ignore it if other tests pass"
    ],
    correctAnswer: 1,
    explanation: "Evidence of overheating indicates a serious safety issue that must be investigated and resolved before any further work can proceed."
  },
  {
    id: 5,
    question: "Which regulation in BS 7671 specifically requires visual inspection before testing?",
    options: [
      "Regulation 610.1",
      "Regulation 643.1",
      "Regulation 514.1",
      "Regulation 411.1"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 Regulation 643.1 specifically requires that visual inspection must be carried out before any electrical testing begins."
  }
];

export const VisualInspectionQuiz = () => {
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
