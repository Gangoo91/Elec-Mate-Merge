
import { useState, useEffect } from "react";
import { QuizQuestion } from "@/data/unitQuizzes";
import { QuizProps } from "@/types/quiz";
import QuizNavigation from "./quiz/QuizNavigation";
import QuizQuestion from "./quiz/QuizQuestion";
import QuizControls from "./quiz/QuizControls";
import QuizResults from "./quiz/QuizResults";

const UnitQuiz = ({ 
  unitCode, 
  questions, 
  onQuizComplete,
  questionCount = 10,
  timeLimit,
  currentTime,
  isSubmitted = false
}: QuizProps) => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Select random questions from the pool when component mounts
  useEffect(() => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, questionCount);
    setQuizQuestions(selected);
    // Initialize userAnswers array with nulls
    setUserAnswers(new Array(selected.length).fill(null));
  }, [questions, questionCount]);

  // Handle auto-submission when time is up
  useEffect(() => {
    if (isSubmitted && !quizCompleted) {
      // Auto-calculate score from answered questions
      const finalScore = userAnswers.reduce((total, answer, index) => {
        if (answer === quizQuestions[index]?.correctAnswer) {
          return total + 1;
        }
        return total;
      }, 0);
      setScore(finalScore);
      setQuizCompleted(true);
      onQuizComplete(finalScore, quizQuestions.length);
    }
  }, [isSubmitted, quizCompleted, userAnswers, quizQuestions, onQuizComplete]);

  const handleAnswer = (selectedIndex: number) => {
    if (isAnswered) return;
    
    // Store the user's answer
    const updatedAnswers = [...userAnswers];
    updatedAnswers[activeQuestion] = selectedIndex;
    setUserAnswers(updatedAnswers);
    setSelectedAnswer(selectedIndex);
    setIsAnswered(true);

    // Check if answer is correct
    if (selectedIndex === quizQuestions[activeQuestion]?.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    
    if (activeQuestion < quizQuestions.length - 1) {
      setActiveQuestion(prev => prev + 1);
    } else {
      setQuizCompleted(true);
      onQuizComplete(score, quizQuestions.length);
    }
  };

  const handleNavigateToQuestion = (index: number) => {
    setActiveQuestion(index);
    setSelectedAnswer(userAnswers[index]);
    setIsAnswered(userAnswers[index] !== null);
  };

  const handleSubmitQuiz = () => {
    setQuizCompleted(true);
    onQuizComplete(score, quizQuestions.length);
  };

  const handleRetryQuiz = () => {
    setActiveQuestion(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setQuizCompleted(false);
    
    // Shuffle questions again for a new attempt
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    setQuizQuestions(shuffled.slice(0, questionCount));
    setUserAnswers(new Array(questionCount).fill(null));
  };

  if (quizQuestions.length === 0) {
    return <div>Loading quiz questions...</div>;
  }

  if (quizCompleted) {
    return (
      <QuizResults 
        score={score} 
        totalQuestions={quizQuestions.length} 
        questions={quizQuestions} 
        userAnswers={userAnswers} 
        onRetry={handleRetryQuiz} 
      />
    );
  }

  const currentQuestion = quizQuestions[activeQuestion];
  const answeredCount = userAnswers.filter(answer => answer !== null).length;
  const isLastQuestion = activeQuestion === quizQuestions.length - 1;

  return (
    <div className="bg-elec-gray p-6 rounded-lg border border-elec-yellow/20 space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h3 className="font-bold">Unit Quiz</h3>
        <span className="text-sm text-muted-foreground">
          Question {activeQuestion + 1} of {quizQuestions.length}
        </span>
      </div>
      
      {/* Question navigation */}
      <QuizNavigation 
        questionsCount={quizQuestions.length} 
        activeQuestion={activeQuestion} 
        userAnswers={userAnswers} 
        onNavigate={handleNavigateToQuestion} 
      />
      
      {/* Current question */}
      <QuizQuestion 
        question={currentQuestion} 
        selectedAnswer={selectedAnswer} 
        isAnswered={isAnswered} 
        onAnswer={handleAnswer} 
      />

      {/* Quiz controls */}
      <QuizControls 
        isAnswered={isAnswered}
        isLastQuestion={isLastQuestion}
        answeredCount={answeredCount}
        totalQuestions={quizQuestions.length}
        onNext={handleNextQuestion}
        onSubmit={handleSubmitQuiz}
      />
    </div>
  );
};

export default UnitQuiz;
