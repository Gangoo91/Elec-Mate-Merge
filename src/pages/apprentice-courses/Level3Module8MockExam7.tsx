import { useState, useEffect, useMemo, useRef } from 'react';
import { useExamExit } from '@/hooks/useExamExit';
import { useExamAttempt } from '@/hooks/useExamAttempt';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';
import { ExamStartPanel } from '@/components/apprentice-courses/ExamStartPanel';
import { ExamQuestionPanel } from '@/components/apprentice-courses/ExamQuestionPanel';
import { shuffleAllQuestionOptions, createShuffleSalt } from '@/utils/shuffleOptions';
import {
  getRandomQuestions,
  module7Questions,
  type Question,
  M7_SECTION_TOPIC,
} from '@/data/apprentice-courses/level3/module7/questionBank';
import { useAuth } from '@/contexts/AuthContext';
import { ExamResultsPanel } from '@/components/apprentice-courses/ExamResultsPanel';
import {
  ExamReviewPanel,
  type ExamReviewFilter,
} from '@/components/apprentice-courses/ExamReviewPanel';
import { recordMockExamAttempt } from '@/lib/mockExamTelemetry';
import { useMockExamHistory } from '@/hooks/useMockExamHistory';
import { useQuestionFailureRates } from '@/hooks/useQuestionFailureRates';

const Level3Module8MockExam7 = () => {
  useSEO(
    'Mock Exam 7 — Career Awareness (Unit 308) | Level 3 | Elec-Mate',
    'Test your knowledge of Unit 308 career awareness with this 40-question mock exam covering JIB grading, scheme membership, post-AM2 routes, business setup and CPD.'
  );

  const TOTAL_QUESTIONS = 40;
  const TIME_LIMIT_SECONDS = 60 * 60; // 60 minutes

  const [examQuestions, setExamQuestions] = useState<Question[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [examStarted, setExamStarted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(TIME_LIMIT_SECONDS);
  const [flaggedQuestions, setFlaggedQuestions] = useState(new Set<number>());
  const [reviewMode, setReviewMode] = useState(false);
  const [reviewFilter, setReviewFilter] = useState<ExamReviewFilter>('all');
  const { user } = useAuth();
  const navigate = useNavigate();
  // Caller-aware: returns to the mock exams library when the paper
  // was opened from there, otherwise to its course module.
  const examExit = useExamExit('/study-centre/apprentice/level3-course/module8-section7');
  const missesRecordedRef = useRef(false);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  // Wall clock the paper runs out. Survives a reload; see useExamAttempt.
  const [deadline, setDeadline] = useState<number | null>(null);

  // Answers as an array aligned to the questions, which is what the shared
  // results/review panels take.
  const answersArray = examQuestions.map((_, index) => selectedAnswers[index]);

  const history = useMockExamHistory('level3-module8-mock7', user?.id ?? null);
  const failureRates = useQuestionFailureRates(
    'level3-module8-mock7',
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
    examId: 'level3-module8-mock7',
    userId: user?.id ?? null,
    active: examStarted && !showResults,
    snapshot,
    onRestore: (saved, secondsRemaining) => {
      setExamQuestions(saved.questions);
      setSelectedAnswers(saved.answers.map((a) => (a === undefined ? -1 : a)));
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
      getRandomQuestions(TOTAL_QUESTIONS),
      createShuffleSalt()
    );
    setExamQuestions(selectedQuestions);
    setSelectedAnswers(new Array(TOTAL_QUESTIONS).fill(-1));
    setCurrentQuestion(0);
    setExamStarted(true);
    setShowResults(false);
    setTimeRemaining(TIME_LIMIT_SECONDS);
    setFlaggedQuestions(new Set());
    missesRecordedRef.current = false;
    const now = Date.now();
    setStartedAt(now);
    setDeadline(now + TIME_LIMIT_SECONDS * 1000);
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
      examSlug: 'level3-module8-mock7',
      source: 'in_app',
      examName: 'Level 3 Mock Exam 7',
      questions: examQuestions,
      answers: selectedAnswers,
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
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
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
        title="Level 3 Mock Exam 7"
        subtitle="Career Development & Industry"
        totalQuestions={TOTAL_QUESTIONS}
        bankSize={module7Questions.length}
        timeLimitMinutes={TIME_LIMIT_SECONDS / 60}
        passThreshold={60}
        topics={[
          'Industry roles',
          'JIB grading',
          'Scheme membership',
          'Post-AM2 routes',
          'MCS',
          'Business setup',
          'Insurance',
          'CPD',
        ]}
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
          topicNames={M7_SECTION_TOPIC}
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
        topicNames={M7_SECTION_TOPIC}
        exitLabel={examExit.label}
        questions={examQuestions}
        answers={answersArray}
        passThreshold={60}
        history={history}
        onReview={() => setReviewMode(true)}
        onRetake={() => {
          setCurrentQuestion(0);
          setSelectedAnswers([]);
          setShowResults(false);
          setExamStarted(false);
          setTimeRemaining(TIME_LIMIT_SECONDS);
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
      topicNames={M7_SECTION_TOPIC}
      examTitle="Level 3 Mock Exam 7"
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

export default Level3Module8MockExam7;
