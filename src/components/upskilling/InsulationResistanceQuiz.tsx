
import { useState } from 'react';
import { Brain, RotateCcw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TestProceduresQuizQuestion } from '@/components/upskilling/quiz/TestProceduresQuizQuestion';
import { TestProceduresQuizResults } from '@/components/upskilling/quiz/TestProceduresQuizResults';
import QuizProgress from '@/components/upskilling/quiz/QuizProgress';
import QuizNavigation from '@/components/upskilling/quiz/QuizNavigation';
import { insulationResistanceQuizQuestions } from '@/data/upskilling/insulationResistanceQuizData';

export const InsulationResistanceQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < insulationResistanceQuizQuestions.length - 1) {
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
    setAnswers([]);
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
          <TestProceduresQuizResults
            questions={insulationResistanceQuizQuestions}
            selectedAnswers={answers}
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
          totalQuestions={insulationResistanceQuizQuestions.length} 
        />
        
        <TestProceduresQuizQuestion
          question={insulationResistanceQuizQuestions[currentQuestion]}
          selectedAnswer={answers[currentQuestion]}
          onAnswerSelect={handleAnswerSelect}
        />
        
        <QuizNavigation
          currentQuestion={currentQuestion}
          totalQuestions={insulationResistanceQuizQuestions.length}
          selectedAnswer={answers[currentQuestion]}
          onPrevious={handlePrevious}
          onNext={handleNext}
          isLastQuestion={currentQuestion === insulationResistanceQuizQuestions.length - 1}
        />
      </CardContent>
    </Card>
  );
};
