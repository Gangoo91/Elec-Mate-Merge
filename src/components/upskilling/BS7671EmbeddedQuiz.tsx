import { useState } from 'react';
import QuizQuestion from './quiz/QuizQuestion';
import QuizResults from './quiz/QuizResults';
import QuizNavigation from './quiz/QuizNavigation';
import QuizProgress from './quiz/QuizProgress';
import { QuizQuestion as QuizQuestionType } from '@/types/quiz';
// Local quiz question type for BS7671 format
interface BS7671QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface BS7671EmbeddedQuizProps {
  questions: BS7671QuizQuestion[];
  title?: string;
  description?: string;
}

const BS7671EmbeddedQuiz = ({ questions, title, description }: BS7671EmbeddedQuizProps) => {
  // Transform BS7671 format to QuizQuestion format for components
  const transformedQuestions: QuizQuestionType[] = questions.map(q => ({
    id: q.id,
    question: q.question,
    options: q.options,
    correctAnswer: q.correct,
    explanation: q.explanation
  }));

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < transformedQuestions.length - 1) {
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
    setSelectedAnswers([]);
    setShowResults(false);
  };

  if (showResults) {
    return (
      <QuizResults 
        questions={transformedQuestions}
        selectedAnswers={selectedAnswers}
        onRestart={handleRestart}
      />
    );
  }

  return (
    <div className="space-y-6">
      {title && (
        <div className="text-center">
          <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
          {description && (
            <p className="text-foreground">{description}</p>
          )}
        </div>
      )}
      
      <QuizProgress 
        currentQuestion={currentQuestion}
        totalQuestions={transformedQuestions.length}
      />
      
      <QuizQuestion 
        question={transformedQuestions[currentQuestion]}
        selectedAnswer={selectedAnswers[currentQuestion]}
        onAnswerSelect={handleAnswerSelect}
      />
      
      <QuizNavigation 
        currentQuestion={currentQuestion}
        totalQuestions={transformedQuestions.length}
        selectedAnswer={selectedAnswers[currentQuestion]}
        onPrevious={handlePrevious}
        onNext={handleNext}
        isLastQuestion={currentQuestion === transformedQuestions.length - 1}
      />
    </div>
  );
};

export default BS7671EmbeddedQuiz;