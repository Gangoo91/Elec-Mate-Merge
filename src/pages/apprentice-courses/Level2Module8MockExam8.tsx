import { useState, useEffect, useMemo, useRef } from 'react';
import { useExamExit } from '@/hooks/useExamExit';
import { useExamAttempt } from '@/hooks/useExamAttempt';
import { toast } from 'sonner';
import { useNavigate, useResolvedPath } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';
import {
  getRandomQuestions,
  validateQuestionBank,
  type Question,
} from '@/data/apprentice-courses/level2/mixed/questionBank';
import { ExamStartPanel } from '@/components/apprentice-courses/ExamStartPanel';
import { ExamQuestionPanel } from '@/components/apprentice-courses/ExamQuestionPanel';
import { shuffleAllQuestionOptions, createShuffleSalt } from '@/utils/shuffleOptions';
import { useAuth } from '@/contexts/AuthContext';
import { ExamResultsPanel } from '@/components/apprentice-courses/ExamResultsPanel';
import {
  ExamReviewPanel,
  type ExamReviewFilter,
} from '@/components/apprentice-courses/ExamReviewPanel';
import { recordMockExamAttempt } from '@/lib/mockExamTelemetry';
import { useMockExamHistory } from '@/hooks/useMockExamHistory';
import { useQuestionFailureRates } from '@/hooks/useQuestionFailureRates';

const Level2Module8MockExam8 = () => {
  useSEO(
    'Mock Exam 8: Mixed Level 2 Examination - Level 2 Module 8',
    'Comprehensive mixed mock examination covering all Level 2 electrical installation modules including health & safety, electrical science, installation methods, and testing & certification.'
  );

  // Exam state management
  const [examQuestions, setExamQuestions] = useState<Question[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [examStarted, setExamStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(90 * 60); // 90 minutes (C&G 2365-02 spec)
  const [showResults, setShowResults] = useState(false);
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());
  const [reviewMode, setReviewMode] = useState<
    'all' | 'correct' | 'incorrect' | 'unanswered' | 'flagged' | boolean
  >(false);
  const [reviewFilter, setReviewFilter] = useState<ExamReviewFilter>('all');
  const { user } = useAuth();
  const navigate = useNavigate();
  const missesRecordedRef = useRef(false);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  // Wall clock the paper runs out. Survives a reload; see useExamAttempt.
  const [deadline, setDeadline] = useState<number | null>(null);

  // Where "back" goes. The paper is mounted under two different routes, so the
  // exit has always been a relative `..` — resolve it once to a real path so
  // the revision session can link back here too.
  const exitPath = useResolvedPath('..').pathname;
  // Caller-aware: returns to the mock exams library when the paper
  // was opened from there, otherwise to its course module.
  const examExit = useExamExit(exitPath);

  // Answers as an array aligned to the questions, which is what the shared
  // results/review panels take. This paper stores them keyed by index.
  const answersArray = examQuestions.map((_, index) => selectedAnswers[index]);

  const history = useMockExamHistory('level2-module8-mock8', user?.id ?? null);
  const failureRates = useQuestionFailureRates(
    'level2-module8-mock8',
    examQuestions.map((q) => q.id),
    showResults
  );

  const drillMissed = () =>
    navigate('/apprentice/revision', {
      // Honour where the learner actually came from — hardcoding the course
      // path dropped anyone who entered from the mock exams library into a
      // course they had never opened.
      state: { from: examExit.to, label: examExit.label },
    });

  // Initialize exam

  /**
   * Save the live attempt so a reload does not wipe it. The snapshot carries
   * the DRAWN questions: the paper is a random draw with per-attempt option
   * shuffling, so redrawing on resume would misalign every stored answer.
   *
   * ⚠️ Memoised — the clock re-renders once a second, and an inline object
   * would rewrite the whole paper to storage on every tick.
   */
  const snapshot = useMemo(
    () =>
      examQuestions.length && startedAt !== null && deadline !== null
        ? {
            questions: examQuestions,
            answers: answersArray,
            current: currentQuestion,
            flagged: [...flaggedQuestions],
            startedAt,
            deadline,
          }
        : null,
    [examQuestions, answersArray, currentQuestion, flaggedQuestions, startedAt, deadline]
  );

  const { clearSaved } = useExamAttempt<Question>({
    examId: 'level2-module8-mock8',
    userId: user?.id ?? null,
    active: examStarted && !showResults,
    snapshot,
    onRestore: (saved, secondsRemaining) => {
      setExamQuestions(saved.questions);
      setSelectedAnswers(
        saved.answers.reduce<{ [key: number]: number }>((acc, a, i) => {
          if (a !== undefined && a !== -1) acc[i] = a;
          return acc;
        }, {})
      );
      setCurrentQuestion(saved.current);
      setFlaggedQuestions(new Set(saved.flagged));
      setStartedAt(saved.startedAt);
      setDeadline(saved.deadline);
      setTimeRemaining(secondsRemaining);
      missesRecordedRef.current = false;
      setExamStarted(true);
      setShowResults(false);
      toast.info('Picked up where you left off', {
        description: 'Your answers and flags were restored. The clock kept running.',
        duration: 6000,
      });
    },
  });

  const startExam = () => {
    const questions = shuffleAllQuestionOptions(
      getRandomQuestions(60, { basic: 35, intermediate: 45, advanced: 20 }),
      createShuffleSalt()
    );
    setExamQuestions(questions);
    setSelectedAnswers({});
    setCurrentQuestion(0);
    setTimeRemaining(90 * 60);
    setShowResults(false);
    setFlaggedQuestions(new Set());
    setExamStarted(true);
    missesRecordedRef.current = false;
    const now = Date.now();
    setStartedAt(now);
    setDeadline(now + 90 * 60 * 1000);
    // A fresh sitting supersedes any saved one.
    clearSaved();
    if (import.meta.env.DEV) {
      validateQuestionBank(); // Dev-only: log mixed-bank composition
    }
  };

  /**
   * Derived from `deadline`, not decremented. A backgrounded tab throttles
   * timers, so counting down by one per tick handed back minutes of free time;
   * reading the wall clock is correct whatever the tab did, and it is the same
   * value a resumed attempt restores from.
   */
  useEffect(() => {
    if (!examStarted || showResults || deadline === null) return;
    const tick = () => {
      const left = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
      setTimeRemaining(left);
      if (left <= 0) handleSubmit();
    };
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [examStarted, showResults, deadline]);

  // Record the attempt once per sitting — the personal revision pile plus the
  // shared attempt/per-question dataset the public papers write to. Driven by
  // an effect rather than handleSubmit because on timer expiry handleSubmit
  // fires from a stale interval closure where selectedAnswers is still empty.
  useEffect(() => {
    if (!showResults || missesRecordedRef.current) return;
    missesRecordedRef.current = true;
    recordMockExamAttempt({
      examSlug: 'level2-module8-mock8',
      source: 'in_app',
      examName: 'Level 2 Mock Exam 8',
      questions: examQuestions,
      answers: examQuestions.map((_, index) => selectedAnswers[index]),
      startedAt,
      userId: user?.id ?? null,
    });
  }, [showResults, examQuestions, selectedAnswers, user]);

  // Hide the apprentice tab bar for as long as the paper is being sat — the
  // exam screen owns the whole viewport and the bar would cover the Next button.
  useEffect(() => {
    if (!examStarted || showResults) return;
    document.body.classList.add('exam-active');
    return () => document.body.classList.remove('exam-active');
  }, [examStarted, showResults]);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion]: answerIndex,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < examQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
    setExamStarted(false);
  };

  const toggleFlag = () => {
    const newFlagged = new Set(flaggedQuestions);
    if (newFlagged.has(currentQuestion)) {
      newFlagged.delete(currentQuestion);
    } else {
      newFlagged.add(currentQuestion);
    }
    setFlaggedQuestions(newFlagged);
  };

  // Exam start screen
  if (!examStarted && !showResults) {
    return (
      <ExamStartPanel
        exitLabel={examExit.label}
        title="Mock Exam 8"
        subtitle="Mixed Level 2 Examination"
        totalQuestions={60}
        timeLimitMinutes={90}
        passThreshold={60}
        topics={[
          'Health & safety',
          'Electrical science',
          'Installation methods',
          'Testing & certification',
        ]}
        history={history}
        onStart={startExam}
        onExit={() => navigate(examExit.to)}
      />
    );
  }

  // Results screen
  if (showResults) {
    if (reviewMode) {
      return (
        <ExamReviewPanel
          questions={examQuestions}
          answers={answersArray}
          flagged={flaggedQuestions}
          filter={reviewFilter}
          onFilterChange={(f) => setReviewFilter(f)}
          failureRates={failureRates}
          onBack={() => setReviewMode(false)}
          onDrillMissed={drillMissed}
        />
      );
    }

    return (
      <ExamResultsPanel
        exitLabel={examExit.label}
        questions={examQuestions}
        answers={answersArray}
        passThreshold={60}
        history={history}
        onReview={() => setReviewMode(true)}
        onRetake={startExam}
        onExit={() => navigate(examExit.to)}
        onDrillMissed={drillMissed}
      />
    );
  }
  // Active exam interface
  const question = examQuestions[currentQuestion];
  if (!question) return null;

  return (
    <ExamQuestionPanel
      examTitle="Level 2 Mock Exam 8"
      question={question}
      index={currentQuestion}
      total={examQuestions.length}
      selected={selectedAnswers[currentQuestion]}
      answers={answersArray}
      flagged={flaggedQuestions}
      timeRemaining={timeRemaining}
      onSelect={handleAnswerSelect}
      onPrevious={handlePrevious}
      onNext={handleNext}
      onJump={setCurrentQuestion}
      onToggleFlag={toggleFlag}
      onSubmit={handleSubmit}
      onExit={() => navigate(examExit.to)}
    />
  );
};

export default Level2Module8MockExam8;
