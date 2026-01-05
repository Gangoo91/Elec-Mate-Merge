
import { useState } from 'react';
import { Brain } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { testProceduresQuizQuestions } from '@/data/upskilling/testProceduresQuizData';
import { TestProceduresQuizResults } from '@/components/upskilling/quiz/TestProceduresQuizResults';
import { TestProceduresQuizQuestion } from '@/components/upskilling/quiz/TestProceduresQuizQuestion';
import QuizNavigation from '@/components/upskilling/quiz/QuizNavigation';

export const TestProceduresQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | undefined)[]>(
    new Array(testProceduresQuizQuestions.length).fill(undefined)
  );
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    console.log('Answer selected:', answerIndex, 'for question:', currentQuestion);
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < testProceduresQuizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
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
    setSelectedAnswers(new Array(testProceduresQuizQuestions.length).fill(undefined));
    setShowResults(false);
    setQuizCompleted(false);
  };

  if (showResults) {
    return (
      <TestProceduresQuizResults
        questions={testProceduresQuizQuestions}
        selectedAnswers={selectedAnswers}
        onRestart={resetQuiz}
      />
    );
  }

  const currentQ = testProceduresQuizQuestions[currentQuestion];

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Brain className="h-5 w-5 text-elec-yellow" />
          Quick Quiz
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-between items-center text-sm text-foreground">
          <span>Question {currentQuestion + 1} of {testProceduresQuizQuestions.length}</span>
          <span>{Math.round(((currentQuestion + 1) / testProceduresQuizQuestions.length) * 100)}% Complete</span>
        </div>

        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-elec-yellow h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / testProceduresQuizQuestions.length) * 100}%` }}
          />
        </div>

        <TestProceduresQuizQuestion
          question={currentQ}
          selectedAnswer={selectedAnswers[currentQuestion]}
          onAnswerSelect={handleAnswerSelect}
        />

        <QuizNavigation
          currentQuestion={currentQuestion}
          totalQuestions={testProceduresQuizQuestions.length}
          selectedAnswer={selectedAnswers[currentQuestion]}
          onPrevious={handlePrevious}
          onNext={handleNext}
          isLastQuestion={currentQuestion === testProceduresQuizQuestions.length - 1}
        />
      </CardContent>
    </Card>
  );
};
