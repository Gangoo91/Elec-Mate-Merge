import { useState, useEffect, useMemo, useRef } from 'react';
import { useExamExit } from '@/hooks/useExamExit';
import { useExamAttempt } from '@/hooks/useExamAttempt';
import { useNavigate } from 'react-router-dom';
import { ExamStartPanel } from '@/components/apprentice-courses/ExamStartPanel';
import { ExamQuestionPanel } from '@/components/apprentice-courses/ExamQuestionPanel';
import { ExamResultsPanel } from '@/components/apprentice-courses/ExamResultsPanel';
import {
  ExamReviewPanel,
  type ExamReviewFilter,
} from '@/components/apprentice-courses/ExamReviewPanel';
import {
  getRandomQuestions,
  am2QuestionBank,
  AM2Question,
} from '@/data/apprentice-courses/am2/questionBank';
import { shuffleAllQuestionOptions, createShuffleSalt } from '@/utils/shuffleOptions';
import { toast } from 'sonner';
import useSEO from '@/hooks/useSEO';
import { useAuth } from '@/contexts/AuthContext';
import { recordMockExamAttempt } from '@/lib/mockExamTelemetry';
import { useMockExamHistory } from '@/hooks/useMockExamHistory';
import { useQuestionFailureRates } from '@/hooks/useQuestionFailureRates';

const AM2Module8 = () => {
  const navigate = useNavigate();
  // Caller-aware: returns to the mock exams library when the paper
  // was opened from there, otherwise to its course module.
  const examExit = useExamExit('/study-centre/apprentice/am2');
  useSEO(
    'Module 8: AM2 Mock Examination - AM2 Preparation Course',
    // 256, counted from the bank — the description claimed 400, which was
    // never true of this file and is a public-facing number.
    'Practice AM2 knowledge test with 30 questions, 60-minute timer from a 256 question bank covering safe isolation, BS 7671, testing and fault finding'
  );

  // Exam state
  const [examStarted, setExamStarted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [examQuestions, setExamQuestions] = useState<AM2Question[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(3600); // 60 minutes in seconds
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());
  const [reviewFilter, setReviewFilter] = useState<ExamReviewFilter>('all');
  const { user } = useAuth();
  const missesRecordedRef = useRef(false);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  // Wall clock the paper runs out. Survives a reload; see useExamAttempt.
  const [deadline, setDeadline] = useState<number | null>(null);

  // Answers as an array aligned to the questions, which is what the shared
  // exam panel takes for its navigator.
  const answersArray = examQuestions.map((_, index) => selectedAnswers[index]);

  const history = useMockExamHistory('am2-module8', user?.id ?? null);
  const failureRates = useQuestionFailureRates(
    'am2-module8',
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

  // Start exam - 30 questions matching real AM2 theory exam

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

  const { clearSaved } = useExamAttempt<AM2Question>({
    examId: 'am2-module8',
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
    const questions = shuffleAllQuestionOptions(
      getRandomQuestions(30, { basic: 0.35, intermediate: 0.45, advanced: 0.2 }),
      createShuffleSalt()
    );
    setExamQuestions(questions);
    setSelectedAnswers(new Array(30).fill(-1));
    setCurrentQuestion(0);
    setTimeRemaining(3600);
    setFlaggedQuestions(new Set());
    setExamStarted(true);
    setShowResults(false);
    setShowReview(false);
    missesRecordedRef.current = false;
    const now = Date.now();
    setStartedAt(now);
    setDeadline(now + 3600 * 1000);
    // A fresh sitting supersedes any saved one.
    clearSaved();
    toast.success('AM2 Mock Exam started! Good luck!');
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
      examSlug: 'am2-module8',
      source: 'in_app',
      examName: 'AM2 Mock Exam',
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

  // Handle answer selection
  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  // Navigation
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
    toast.success('Exam submitted successfully!');
  };

  // Flag functionality
  const toggleFlag = () => {
    const newFlagged = new Set(flaggedQuestions);
    if (newFlagged.has(currentQuestion)) {
      newFlagged.delete(currentQuestion);
    } else {
      newFlagged.add(currentQuestion);
    }
    setFlaggedQuestions(newFlagged);
  };

  // Reset exam
  const resetExam = () => {
    setExamStarted(false);
    setShowResults(false);
    setShowReview(false);
    setExamQuestions([]);
    setSelectedAnswers([]);
    setCurrentQuestion(0);
    setTimeRemaining(3600);
    setFlaggedQuestions(new Set());
    setReviewFilter('all');
  };

  // Before exam starts
  if (!examStarted) {
    return (
      <ExamStartPanel
        exitLabel={examExit.label}
        title="AM2 Mock Examination"
        subtitle="AM2 knowledge test practice"
        totalQuestions={30}
        bankSize={am2QuestionBank.length}
        timeLimitMinutes={60}
        // 21 of 30, per NET's published Section E specification. Deliberately
        // NOT the 60% used across the C&G 2365 papers: this paper mimics a real
        // assessment that publishes its own pass mark, and matching reality
        // beats matching our other papers.
        passThreshold={70}
        topics={['Health & Safety', 'BS 7671', 'Building Regulations']}
        history={history}
        // Restored — this was on the original start screen and was lost when
        // the paper moved to the shared panel. It matters: the real assessment
        // is open-book, so drilling this closed-book practises the wrong exam.
        // The four permitted documents are named because "open book" alone
        // leads people to revise with the wrong things to hand.
        note="Open book, like the real Section E. Practise with BS 7671, Guidance Note 3, the On-Site Guide and a short guide to the Building Regulations — nothing else is allowed."
        onStart={startExam}
        onExit={() => navigate(examExit.to)}
      />
    );
  }

  // Results + review — the shared panels every other paper uses. This file
  // kept its own hand-rolled versions long after the rest converged, so the
  // AM2 paper (the one with the highest stakes attached to it) was the only
  // one still showing "FAILED" in red on a translucent volt chip.
  if (showResults && !showReview) {
    return (
      <ExamResultsPanel
        exitLabel={examExit.label}
        questions={examQuestions}
        answers={answersArray}
        // Must match the start screen — 21 of 30 per NET's Section E spec.
        passThreshold={70}
        history={history}
        // This bank's `topic` is per-question granular ("Notification"), so the
        // default grouping gave 23 one-question rows. `category` is the broad
        // AM2 area and the grouping the old hand-rolled screen used.
        groupBy="category"
        onReview={() => setShowReview(true)}
        onRetake={resetExam}
        onExit={() => navigate(examExit.to)}
        onDrillMissed={drillMissed}
      />
    );
  }

  if (showReview) {
    return (
      <ExamReviewPanel
        questions={examQuestions}
        answers={answersArray}
        flagged={flaggedQuestions}
        filter={reviewFilter}
        onFilterChange={setReviewFilter}
        failureRates={failureRates}
        onBack={() => setShowReview(false)}
        onDrillMissed={drillMissed}
      />
    );
  }

  // Active exam interface
  const question = examQuestions[currentQuestion];
  if (!question) return null;

  return (
    <ExamQuestionPanel
      examTitle="AM2 Mock Exam"
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

export default AM2Module8;
