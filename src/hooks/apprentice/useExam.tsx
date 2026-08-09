import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { trackUserEvent } from '@/hooks/useActivityTracking';

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
  const { user } = useAuth();
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
        setTimeRemaining((prev) => {
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
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
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

  /*
   * Finish the exam.
   *
   * Sitting a mock exam is one of the strongest signals of real use on the
   * platform, and it emitted nothing. Only nine features in the whole app fire
   * `feature_use`, so an apprentice who sat twenty exams scored zero on the
   * quarter of the engagement score that measures features — the metric was
   * reporting instrumentation coverage, not behaviour.
   */
  const finishExam = () => {
    setIsExamFinished(true);
    setShowResults(true);

    if (user?.id) {
      const answered = Object.keys(selectedAnswers).length;
      const correct = questions.reduce(
        (n, q, i) => n + (selectedAnswers[i] === q.correctAnswer ? 1 : 0),
        0
      );
      void trackUserEvent(user.id, 'feature_use', {
        eventName: 'mock_exam_completed',
        eventData: { questions: questions.length, answered, correct },
      });
    }
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
    setShowResults,
  };
};
