
import { useState } from 'react';
import { quizQuestions } from '@/data/upskilling/inspectionTestingQuizData';
import QuizQuestion from './quiz/QuizQuestion';
import QuizResults from './quiz/QuizResults';
import QuizNavigation from './quiz/QuizNavigation';
import QuizProgress from './quiz/QuizProgress';

const InspectionTestingQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

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
