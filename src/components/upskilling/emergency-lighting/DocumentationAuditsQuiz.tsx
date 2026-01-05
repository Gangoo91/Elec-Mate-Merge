import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ClipboardList } from 'lucide-react';
import QuizProgress from '@/components/upskilling/quiz/QuizProgress';
import QuizQuestion from '@/components/upskilling/quiz/QuizQuestion';
import QuizNavigation from '@/components/upskilling/quiz/QuizNavigation';
import QuizResults from '@/components/upskilling/quiz/QuizResults';
import { documentationAuditsQuizQuestions } from '@/data/upskilling/documentationAuditsQuizData';

export const DocumentationAuditsQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | undefined)[]>(
    new Array(documentationAuditsQuizQuestions.length).fill(undefined)
  );
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < documentationAuditsQuizQuestions.length - 1) {
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
    setSelectedAnswers(new Array(documentationAuditsQuizQuestions.length).fill(undefined));
    setShowResults(false);
  };

  if (showResults) {
    return (
      <QuizResults
        questions={documentationAuditsQuizQuestions}
        selectedAnswers={selectedAnswers}
        onRestart={handleRestart}
      />
    );
  }

  return (
    <Card className="bg-gradient-to-br from-elec-dark via-gray-900 to-elec-dark border-elec-yellow/30">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2 text-xl">
          <ClipboardList className="h-6 w-6 text-elec-yellow" />
          Section 4 Knowledge Check: Documentation and Audits
        </CardTitle>
        <p className="text-foreground text-sm mt-2">
          Test your understanding of emergency lighting documentation requirements and fire authority audits
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <QuizProgress
          currentQuestion={currentQuestion}
          totalQuestions={documentationAuditsQuizQuestions.length}
        />

        <QuizQuestion
          question={documentationAuditsQuizQuestions[currentQuestion]}
          selectedAnswer={selectedAnswers[currentQuestion]}
          onAnswerSelect={handleAnswerSelect}
        />

        <QuizNavigation
          currentQuestion={currentQuestion}
          totalQuestions={documentationAuditsQuizQuestions.length}
          selectedAnswer={selectedAnswers[currentQuestion]}
          onPrevious={handlePrevious}
          onNext={handleNext}
          isLastQuestion={currentQuestion === documentationAuditsQuizQuestions.length - 1}
        />
      </CardContent>
    </Card>
  );
};
