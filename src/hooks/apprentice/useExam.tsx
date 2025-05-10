
import { useState, useEffect } from "react";

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface Exam {
  id: string;
  title: string;
  description: string;
  duration: number;
  questionCount: number;
  level: string;
  isPremium: boolean;
}

export const useExam = (exam: Exam | null, questions: Question[]) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isExamStarted, setIsExamStarted] = useState(false);
  const [isExamFinished, setIsExamFinished] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [exitDialogOpen, setExitDialogOpen] = useState(false);

  // Initialize timer when exam is loaded
  useEffect(() => {
    if (exam) {
      setTimeRemaining(exam.duration * 60); // Convert minutes to seconds
    }
  }, [exam]);

  // Timer countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isExamStarted && !isExamFinished && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsExamFinished(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(timer);
  }, [isExamStarted, isExamFinished, timeRemaining]);

  // Handle answer selection
  const handleSelectAnswer = (questionId: number, optionIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  // Handle navigation between questions
  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Start the exam
  const startExam = () => {
    setIsExamStarted(true);
  };

  // Finish the exam
  const finishExam = () => {
    setIsExamFinished(true);
    setShowResults(true);
  };

  return {
    currentQuestionIndex,
    selectedAnswers,
    timeRemaining,
    isExamStarted,
    isExamFinished,
    showResults,
    exitDialogOpen,
    setExitDialogOpen,
    handleSelectAnswer,
    goToNextQuestion,
    goToPreviousQuestion,
    startExam,
    finishExam,
    setShowResults
  };
};
