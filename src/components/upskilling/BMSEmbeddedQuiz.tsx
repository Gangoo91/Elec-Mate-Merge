import { useState } from 'react';
import { bmsModule1Section1QuizData } from '@/data/upskilling/bmsModule1Section1QuizData';
import QuizQuestion from './quiz/QuizQuestion';
import QuizResults from './quiz/QuizResults';
import QuizNavigation from './quiz/QuizNavigation';
import QuizProgress from './quiz/QuizProgress';

const BMSEmbeddedQuiz = () => {
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
    if (currentQuestion === bmsModule1Section1QuizData.length - 1) {
      setQuizCompleted(true);
      setShowResults(true);
    } else {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentQuestion(prev => prev - 1);
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
        questions={bmsModule1Section1QuizData}
        selectedAnswers={selectedAnswers}
        onRestart={handleRestart}
      />
    );
  }

  return (
    <div className="space-y-6">
      <QuizProgress 
        currentQuestion={currentQuestion} 
        totalQuestions={bmsModule1Section1QuizData.length} 
      />
      
      <QuizQuestion
        question={bmsModule1Section1QuizData[currentQuestion]}
        selectedAnswer={selectedAnswers[currentQuestion]}
        onAnswerSelect={handleAnswerSelect}
      />
      
      <QuizNavigation
        currentQuestion={currentQuestion}
        totalQuestions={bmsModule1Section1QuizData.length}
        selectedAnswer={selectedAnswers[currentQuestion]}
        onPrevious={handlePrevious}
        onNext={handleNext}
        isLastQuestion={currentQuestion === bmsModule1Section1QuizData.length - 1}
      />
    </div>
  );
};

export default BMSEmbeddedQuiz;