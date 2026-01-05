
import { useState, useEffect } from 'react';
import { useQuizQuestions } from '@/hooks/useQuizQuestions';
import { quizQuestions as fallbackQuestions } from '@/data/upskilling/inspectionTestingQuizData';
import QuizQuestion from './quiz/QuizQuestion';
import QuizResults from './quiz/QuizResults';
import QuizNavigation from './quiz/QuizNavigation';
import QuizProgress from './quiz/QuizProgress';
import { Loader2 } from 'lucide-react';

const InspectionTestingQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Fetch questions from Supabase with fallback to static data
  const { data: dbQuestions, isLoading, error } = useQuizQuestions({
    course: 'inspection-testing',
    count: 30,
    randomize: true
  });

  // Use database questions if available, otherwise fall back to static
  const quizQuestions = (dbQuestions && dbQuestions.length > 0) ? dbQuestions : fallbackQuestions;

  // Reset selected answers when questions change
  useEffect(() => {
    setSelectedAnswers([]);
    setCurrentQuestion(0);
  }, [dbQuestions]);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
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

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setQuizCompleted(false);
  };

  // Show loading state while fetching from database
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground">Loading quiz questions...</p>
      </div>
    );
  }

  if (showResults) {
    return (
      <QuizResults
        questions={quizQuestions}
        selectedAnswers={selectedAnswers}
        onRestart={handleRestart}
      />
    );
  }

  const question = quizQuestions[currentQuestion];

  // Safety check for question existence
  if (!question) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No questions available. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <QuizProgress 
        currentQuestion={currentQuestion}
        totalQuestions={quizQuestions.length}
      />

      <QuizQuestion
        question={question}
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
    </div>
  );
};

export default InspectionTestingQuiz;
