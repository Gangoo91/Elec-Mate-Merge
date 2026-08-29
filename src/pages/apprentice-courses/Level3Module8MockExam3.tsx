import { useState, useEffect, useMemo, useRef } from 'react';
import { useExamExit } from '@/hooks/useExamExit';
import { useExamAttempt } from '@/hooks/useExamAttempt';
import { toast } from 'sonner';
import { useNavigate, useResolvedPath } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';
import { ExamStartPanel } from '@/components/apprentice-courses/ExamStartPanel';
import { ExamQuestionPanel } from '@/components/apprentice-courses/ExamQuestionPanel';
import { shuffleAllQuestionOptions, createShuffleSalt } from '@/utils/shuffleOptions';
import {
  getRandomQuestions,
  module3Questions,
  M3_SECTION_TOPIC,
  type Question,
} from '@/data/apprentice-courses/level3/module3/questionBank';
import { useAuth } from '@/contexts/AuthContext';
import { ExamResultsPanel } from '@/components/apprentice-courses/ExamResultsPanel';
import {
  ExamReviewPanel,
  type ExamReviewFilter,
} from '@/components/apprentice-courses/ExamReviewPanel';
import { recordMockExamAttempt } from '@/lib/mockExamTelemetry';
import { useMockExamHistory } from '@/hooks/useMockExamHistory';
import { useQuestionFailureRates } from '@/hooks/useQuestionFailureRates';

const Level3Module8MockExam3 = () => {
  useSEO(
    'Mock Exam 3: Electrical Science | Level 3 Electrical Course',
    'Test your knowledge of Module 3 electrical science with this 60-question mock exam aligned to the C&G 2365-03 Unit 302 specification.'
  );

  const [examQuestions, setExamQuestions] = useState<Question[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [examStarted, setExamStarted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(90 * 60);
  const [flaggedQuestions, setFlaggedQuestions] = useState(new Set<number>());
  const [reviewMode, setReviewMode] = useState(false);
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

  const history = useMockExamHistory('level3-module8-mock3', user?.id ?? null);
  const failureRates = useQuestionFailureRates(
    'level3-module8-mock3',
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
    examId: 'level3-module8-mock3',
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
    const selectedQuestions = shuffleAllQuestionOptions(
      getRandomQuestions(60),
      createShuffleSalt()
    );

    setExamQuestions(selectedQuestions);
    setSelectedAnswers({});
    setCurrentQuestion(0);
    setExamStarted(true);
    setShowResults(false);
    setTimeRemaining(90 * 60);
    setFlaggedQuestions(new Set());
    missesRecordedRef.current = false;
    const now = Date.now();
    setStartedAt(now);
    setDeadline(now + 90 * 60 * 1000);
    // A fresh sitting supersedes any saved one.
    clearSaved();
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
      examSlug: 'level3-module8-mock3',
      source: 'in_app',
      examName: 'Level 3 Mock Exam 3',
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
    clearSaved();
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

  if (!examStarted) {
    return (
      <ExamStartPanel
        exitLabel={examExit.label}
        title="Mock Exam 3"
        subtitle="Electrical Science (C&G 2365-03 Unit 302 / 2357 Unit 609)"
        totalQuestions={60}
        bankSize={module3Questions.length}
        timeLimitMinutes={90}
        passThreshold={60}
        history={history}
        onStart={startExam}
        onExit={() => navigate(examExit.to)}
      />
    );
  }

  if (showResults) {
    if (reviewMode) {
      return (
        <ExamReviewPanel
          topicNames={M3_SECTION_TOPIC}
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
        topicNames={M3_SECTION_TOPIC}
        exitLabel={examExit.label}
        questions={examQuestions}
        answers={answersArray}
        passThreshold={60}
        history={history}
        onReview={() => setReviewMode(true)}
        onRetake={() => {
          setCurrentQuestion(0);
          setSelectedAnswers({});
          setShowResults(false);
          setExamStarted(false);
          setTimeRemaining(90 * 60);
          setReviewMode(false);
          setReviewFilter('all');
        }}
        onExit={() => navigate(examExit.to)}
        onDrillMissed={drillMissed}
      />
    );
  }

  const question = examQuestions[currentQuestion];
  if (!question) return null;

  return (
    <ExamQuestionPanel
      topicNames={M3_SECTION_TOPIC}
      examTitle="Level 3 Mock Exam 3"
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

export default Level3Module8MockExam3;
