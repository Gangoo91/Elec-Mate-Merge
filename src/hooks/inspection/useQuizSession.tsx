import { useState, useCallback, useEffect } from 'react';
import { QuizSession, QuizQuestion, QuizAnswer, QuizResult, QuizMode } from '@/types/quiz';

export const useQuizSession = () => {
  const [currentSession, setCurrentSession] = useState<QuizSession | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [questionStartTime, setQuestionStartTime] = useState<Date | null>(null);

  const startQuiz = useCallback((assessmentId: string, questions: QuizQuestion[], mode: QuizMode = 'practice') => {
    const session: QuizSession = {
      id: `quiz-${Date.now()}`,
      assessmentId,
      questions,
      answers: [],
      startTime: new Date(),
      score: 0,
      totalQuestions: questions.length,
      isCompleted: false,
      mode,
      allowReview: mode === 'practice' || mode === 'study',
      showFeedback: mode === 'practice' || mode === 'study'
    };
    
    setCurrentSession(session);
    setCurrentQuestionIndex(0);
    setTimeElapsed(0);
    setShowFeedback(false);
    setSelectedAnswer(null);
    setQuestionStartTime(new Date());
  }, []);

  const selectAnswer = useCallback((answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    if (currentSession?.mode === 'practice' || currentSession?.mode === 'study') {
      setShowFeedback(true);
    }
  }, [currentSession]);

  const submitAnswer = useCallback((questionId: string, selectedAnswerIndex: number, timeSpent: number) => {
    if (!currentSession) return;

    const question = currentSession.questions.find(q => q.id === questionId);
    if (!question) return;

    const isCorrect = selectedAnswerIndex === question.correctAnswer;
    
    const answer: QuizAnswer = {
      questionId,
      selectedAnswer: selectedAnswerIndex,
      isCorrect,
      timeSpent,
      viewedFeedback: showFeedback,
      bookmarked: false
    };

    const updatedAnswers = [...currentSession.answers];
    const existingAnswerIndex = updatedAnswers.findIndex(a => a.questionId === questionId);
    
    if (existingAnswerIndex >= 0) {
      updatedAnswers[existingAnswerIndex] = answer;
    } else {
      updatedAnswers.push(answer);
    }

    const updatedSession = {
      ...currentSession,
      answers: updatedAnswers
    };

    setCurrentSession(updatedSession);
  }, [currentSession, showFeedback]);

  const nextQuestion = useCallback(() => {
    if (!currentSession) return false;
    
    if (currentQuestionIndex < currentSession.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setShowFeedback(false);
      setSelectedAnswer(null);
      setQuestionStartTime(new Date());
      return true;
    }
    return false;
  }, [currentSession, currentQuestionIndex]);

  const previousQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setShowFeedback(false);
      setSelectedAnswer(null);
      setQuestionStartTime(new Date());
      return true;
    }
    return false;
  }, [currentQuestionIndex]);

  const jumpToQuestion = useCallback((index: number) => {
    if (!currentSession || index < 0 || index >= currentSession.questions.length) return false;
    
    setCurrentQuestionIndex(index);
    setShowFeedback(false);
    setSelectedAnswer(null);
    setQuestionStartTime(new Date());
    return true;
  }, [currentSession]);

  const toggleBookmark = useCallback((questionId: string) => {
    if (!currentSession) return;

    const updatedAnswers = currentSession.answers.map(answer => 
      answer.questionId === questionId 
        ? { ...answer, bookmarked: !answer.bookmarked }
        : answer
    );

    setCurrentSession({
      ...currentSession,
      answers: updatedAnswers
    });
  }, [currentSession]);

  const finishQuiz = useCallback((): QuizResult | null => {
    if (!currentSession) return null;

    const endTime = new Date();
    const totalTimeSpent = Math.round((endTime.getTime() - currentSession.startTime.getTime()) / 1000);
    const correctAnswers = currentSession.answers.filter(a => a.isCorrect).length;
    const percentage = Math.round((correctAnswers / currentSession.totalQuestions) * 100);

    // Category breakdown
    const categoryBreakdown: Record<string, { correct: number; total: number }> = {};
    
    currentSession.questions.forEach((question, index) => {
      const answer = currentSession.answers.find(a => a.questionId === question.id);
      const category = question.category;
      
      if (!categoryBreakdown[category]) {
        categoryBreakdown[category] = { correct: 0, total: 0 };
      }
      
      categoryBreakdown[category].total++;
      if (answer && answer.isCorrect) {
        categoryBreakdown[category].correct++;
      }
    });

    const result: QuizResult = {
      score: percentage,
      totalQuestions: currentSession.totalQuestions,
      percentage,
      timeSpent: totalTimeSpent,
      correctAnswers,
      incorrectAnswers: currentSession.totalQuestions - correctAnswers,
      categoryBreakdown
    };

    // Update session as completed
    const completedSession = {
      ...currentSession,
      endTime,
      score: percentage,
      isCompleted: true
    };
    
    setCurrentSession(completedSession);
    
    return result;
  }, [currentSession]);

  const pauseQuiz = useCallback(() => {
    if (!currentSession) return;
    
    setCurrentSession({
      ...currentSession,
      pausedAt: new Date()
    });
  }, [currentSession]);

  const resumeQuiz = useCallback(() => {
    if (!currentSession) return;
    
    setCurrentSession({
      ...currentSession,
      pausedAt: undefined
    });
  }, [currentSession]);

  const resetQuiz = useCallback(() => {
    setCurrentSession(null);
    setCurrentQuestionIndex(0);
    setTimeElapsed(0);
    setShowFeedback(false);
    setSelectedAnswer(null);
    setQuestionStartTime(null);
  }, []);

  const getCurrentQuestion = useCallback((): QuizQuestion | null => {
    if (!currentSession || currentQuestionIndex >= currentSession.questions.length) {
      return null;
    }
    return currentSession.questions[currentQuestionIndex];
  }, [currentSession, currentQuestionIndex]);

  const getProgress = useCallback(() => {
    if (!currentSession) return { current: 0, total: 0, percentage: 0, answered: 0, bookmarked: 0 };
    
    const answered = currentSession.answers.length;
    const bookmarked = currentSession.answers.filter(a => a.bookmarked).length;
    
    return {
      current: currentQuestionIndex + 1,
      total: currentSession.totalQuestions,
      percentage: Math.round(((currentQuestionIndex + 1) / currentSession.totalQuestions) * 100),
      answered,
      bookmarked
    };
  }, [currentSession, currentQuestionIndex]);

  const getCurrentAnswer = useCallback(() => {
    if (!currentSession) return null;
    const currentQuestion = getCurrentQuestion();
    if (!currentQuestion) return null;
    
    return currentSession.answers.find(a => a.questionId === currentQuestion.id) || null;
  }, [currentSession, getCurrentQuestion]);

  const getQuestionStatus = useCallback((questionIndex: number) => {
    if (!currentSession) return 'unanswered';
    const question = currentSession.questions[questionIndex];
    if (!question) return 'unanswered';
    
    const answer = currentSession.answers.find(a => a.questionId === question.id);
    if (!answer) return 'unanswered';
    
    if (answer.bookmarked) return 'bookmarked';
    return answer.isCorrect ? 'correct' : 'incorrect';
  }, [currentSession]);

  return {
    currentSession,
    currentQuestionIndex,
    timeElapsed,
    showFeedback,
    selectedAnswer,
    questionStartTime,
    startQuiz,
    selectAnswer,
    submitAnswer,
    nextQuestion,
    previousQuestion,
    jumpToQuestion,
    toggleBookmark,
    finishQuiz,
    pauseQuiz,
    resumeQuiz,
    resetQuiz,
    getCurrentQuestion,
    getCurrentAnswer,
    getProgress,
    getQuestionStatus,
    setTimeElapsed,
    setShowFeedback
  };
};