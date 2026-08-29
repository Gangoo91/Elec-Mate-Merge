/**
 * StandardMockExam — the papers outside the Level 2 / Level 3 tree.
 *
 * HNC, MOET, Functional Skills and every upskilling / general-upskilling paper
 * come through here: 31 pages in all.
 *
 * 2026-08-29: this used to be ~1,200 lines of its OWN exam UI — a second
 * design of the same screen, sitting alongside the apprentice one. A learner
 * who sat a Level 3 paper and then an HNC paper met two different products.
 * Andrew: "the am2, hnc and functional and all the upskilling ones too … they
 * all should follow all the apprentice ones design."
 *
 * So the bespoke UI is gone and this is now a thin adapter over the same four
 * panels the Level 2 / Level 3 papers use:
 *
 *     ExamStartPanel → ExamQuestionPanel → ExamResultsPanel → ExamReviewPanel
 *
 * `StandardMockQuestion` is already structurally an `ExamPanelQuestion`
 * (id / question / options / correctAnswer / explanation / section / topic /
 * category), so the banks needed no migration.
 *
 * 🔴 THE BACK BUTTON. The old version sent every exit to `config.exitPath` —
 * always the paper's own course. `MockExamsPage` has always passed its origin
 * in router state, and this component ignored it, so opening a paper from the
 * mock exams library and pressing Back dropped you into a course you had never
 * been in. `useExamExit` reads that state, which is how the apprentice papers
 * have always behaved.
 *
 * What is kept from the old component, because it is genuinely this engine's:
 *   - `completeQuiz` result persistence with the per-category breakdown;
 *   - `recordMockExamAttempt` telemetry;
 *   - the five-minute warning toast;
 *   - per-attempt option shuffling.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { ExamStartPanel } from '@/components/apprentice-courses/ExamStartPanel';
import { ExamQuestionPanel } from '@/components/apprentice-courses/ExamQuestionPanel';
import { ExamResultsPanel } from '@/components/apprentice-courses/ExamResultsPanel';
import {
  ExamReviewPanel,
  type ExamReviewFilter,
} from '@/components/apprentice-courses/ExamReviewPanel';
import { useAuth } from '@/contexts/AuthContext';
import { useExamAttempt, type ExamAttemptSnapshot } from '@/hooks/useExamAttempt';
import { useExamExit } from '@/hooks/useExamExit';
import { useMockExamHistory } from '@/hooks/useMockExamHistory';
import { useQuizCompletion } from '@/hooks/useQuizCompletion';
import { useQuestionFailureRates } from '@/hooks/useQuestionFailureRates';
import { recordMockExamAttempt } from '@/lib/mockExamTelemetry';
import { createShuffleSalt, shuffleAllQuestionOptions } from '@/utils/shuffleOptions';
import { type MockExamConfig, type StandardMockQuestion } from '@/types/standardMockExam';

interface StandardMockExamProps {
  config: MockExamConfig;
  questionBank: StandardMockQuestion[];
  getRandomQuestions: (count: number) => StandardMockQuestion[];
}

export const StandardMockExam = ({
  config,
  questionBank,
  getRandomQuestions,
}: StandardMockExamProps) => {
  const navigate = useNavigate();
  const { completeQuiz } = useQuizCompletion();
  const { user } = useAuth();
  const missesRecordedRef = useRef(false);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  // Wall clock the paper runs out — the source of truth for the timer across a
  // reload. See the note in useExamAttempt on why this is not "seconds left".
  const [deadline, setDeadline] = useState<number | null>(null);
  const history = useMockExamHistory(config.examId, user?.id ?? null);

  // Where Back goes: the mock exams library when the paper was opened from
  // there, otherwise the paper's own course. See the note at the top.
  const examExit = useExamExit(config.exitPath);

  // Every one of the 37 configs names itself "… Mock Examination" — which,
  // under the start screen's own "MOCK EXAM" eyebrow, reads "MOCK EXAM /
  // First Aid at Work Mock Examination". The suffix was carrying the meaning
  // when these papers had no shared chrome; now the chrome says it, so the
  // title only has to name the subject. The stored `config.examTitle` is left
  // alone — telemetry and saved results key off it.
  const displayTitle = config.examTitle
    .replace(/\s*[-—]?\s*Mock Examination$/i, '')
    .replace(/\s*[-—]?\s*Mock Exam$/i, '')
    .trim();

  const [examStarted, setExamStarted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [examQuestions, setExamQuestions] = useState<StandardMockQuestion[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(config.timeLimit);
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());
  const [reviewFilter, setReviewFilter] = useState<ExamReviewFilter>('all');
  const [hasShownWarning, setHasShownWarning] = useState(false);

  // Fetched only once the paper is done — mid-exam it would be a spoiler,
  // and nobody needs it before they have an answer to compare against.
  const failureRates = useQuestionFailureRates(
    config.examId,
    examQuestions.map((q) => q.id),
    showResults
  );

  const calculateScore = useCallback(
    () =>
      selectedAnswers.reduce(
        (score, answer, index) =>
          answer === examQuestions[index]?.correctAnswer ? score + 1 : score,
        0
      ),
    [selectedAnswers, examQuestions]
  );

  const getCategoryBreakdownRecord = useCallback(() => {
    const breakdown: Record<string, { total: number; correct: number }> = {};
    examQuestions.forEach((q, index) => {
      const category = q.category || 'General';
      if (!breakdown[category]) breakdown[category] = { total: 0, correct: 0 };
      breakdown[category].total++;
      if (selectedAnswers[index] === q.correctAnswer) breakdown[category].correct++;
    });
    return breakdown;
  }, [examQuestions, selectedAnswers]);

  /**
   * Save the live attempt so a reload does not wipe it. The snapshot carries
   * the DRAWN questions, because the paper is a random draw with per-attempt
   * option shuffling — redrawing on resume would misalign every answer.
   */
  /**
   * ⚠️ MEMOISED ON PURPOSE. The clock re-renders this component once a second.
   * An inline object would be a new reference every tick, so the persist effect
   * would rewrite the entire drawn paper — all 30-odd questions with their
   * options and explanations — to storage every single second. Depending only
   * on what actually changes means a write per answer, per flag and per move,
   * which is what we want. `timeRemaining` is deliberately NOT in here: the
   * clock is reconstructed from `deadline`.
   */
  const snapshot: ExamAttemptSnapshot<StandardMockQuestion> | null = useMemo(
    () =>
      examQuestions.length && startedAt !== null && deadline !== null
        ? {
            questions: examQuestions,
            answers: selectedAnswers,
            current: currentQuestion,
            flagged: [...flaggedQuestions],
            startedAt,
            deadline,
          }
        : null,
    [examQuestions, selectedAnswers, currentQuestion, flaggedQuestions, startedAt, deadline]
  );

  const { clearSaved } = useExamAttempt<StandardMockQuestion>({
    examId: config.examId,
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
      // Under five minutes on resume: the warning has effectively been given.
      setHasShownWarning(secondsRemaining <= 300);
      missesRecordedRef.current = false;
      setExamStarted(true);
      setShowResults(false);
      setShowReview(false);
      // Say so — coming back to a paper with answers already filled in is
      // alarming if nothing explains it. The clock detail matters: it kept
      // running, so the learner knows not to expect the time back.
      toast.info('Picked up where you left off', {
        description: 'Your answers and flags were restored. The clock kept running.',
        duration: 6000,
      });
    },
  });

  const startExam = useCallback(() => {
    const picked = getRandomQuestions(config.totalQuestions);
    // Shuffle option order per question so the correct answer isn't pinned
    // to a single letter (banks were AI-generated B-heavy). Fresh salt per
    // attempt → different order on retake.
    const questions = shuffleAllQuestionOptions(picked, createShuffleSalt());
    setExamQuestions(questions);
    setSelectedAnswers(new Array(config.totalQuestions).fill(-1));
    setCurrentQuestion(0);
    setTimeRemaining(config.timeLimit);
    setFlaggedQuestions(new Set());
    setExamStarted(true);
    setShowResults(false);
    setShowReview(false);
    setReviewFilter('all');
    setHasShownWarning(false);
    missesRecordedRef.current = false;
    const now = Date.now();
    setStartedAt(now);
    setDeadline(now + config.timeLimit * 1000);
    // A fresh sitting supersedes any saved one, or the old paper could be
    // restored over the top on the next mount.
    clearSaved();
  }, [config, getRandomQuestions, clearSaved]);

  const handleSubmit = useCallback(async () => {
    setShowResults(true);
    const score = calculateScore();
    try {
      await completeQuiz({
        result: {
          score,
          totalQuestions: examQuestions.length,
          percentage: Math.round((score / examQuestions.length) * 100),
          timeSpent: config.timeLimit - timeRemaining,
          correctAnswers: score,
          incorrectAnswers: examQuestions.length - score,
          categoryBreakdown: getCategoryBreakdownRecord(),
        },
        assessmentId: config.examId,
        sessionId: `${config.examId}-${Date.now()}`,
      });
    } catch (error) {
      console.error('Failed to save quiz result:', error);
    }
    clearSaved();
  }, [
    clearSaved,
    calculateScore,
    completeQuiz,
    config.examId,
    config.timeLimit,
    examQuestions.length,
    getCategoryBreakdownRecord,
    timeRemaining,
  ]);

  /**
   * The clock is DERIVED from `deadline`, not decremented.
   *
   * Counting down by one each tick drifts: browsers throttle timers in a
   * backgrounded tab, so a learner who switched apps came back with minutes of
   * free time. Reading the wall clock each tick is correct whatever the tab
   * did, and it is the same value a resumed attempt restores from.
   */
  useEffect(() => {
    if (!examStarted || showResults || deadline === null) return;

    const tick = () => {
      const left = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
      setTimeRemaining(left);
      if (left <= 300 && left > 0 && !hasShownWarning) {
        toast.warning('5 minutes remaining', { duration: 5000 });
        setHasShownWarning(true);
      }
      if (left <= 0) handleSubmit();
    };

    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [examStarted, showResults, deadline, hasShownWarning, handleSubmit]);

  // Record the attempt once per sitting — the personal revision pile plus the
  // shared attempt/per-question dataset the public papers write to. Driven by
  // an effect rather than handleSubmit because on timer expiry handleSubmit
  // fires from a stale interval closure where selectedAnswers is still empty.
  useEffect(() => {
    if (!showResults || missesRecordedRef.current) return;
    missesRecordedRef.current = true;
    recordMockExamAttempt({
      examSlug: config.examId,
      source: 'in_app',
      examName: config.examTitle,
      questions: examQuestions,
      answers: selectedAnswers,
      startedAt,
      passThreshold: config.passThreshold,
      userId: user?.id ?? null,
    });
  }, [
    showResults,
    examQuestions,
    selectedAnswers,
    user,
    config.examId,
    config.examTitle,
    config.passThreshold,
    startedAt,
  ]);

  // Hide the tab bar while the paper is being sat — the exam screen owns the
  // whole viewport and the bar would cover the Next button.
  useEffect(() => {
    if (!examStarted || showResults) return;
    document.body.classList.add('exam-active');
    return () => document.body.classList.remove('exam-active');
  }, [examStarted, showResults]);

  const drillMissed = () =>
    navigate('/apprentice/revision', {
      state: { from: examExit.to, label: examExit.label },
    });

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswers((prev) => {
      const next = [...prev];
      next[currentQuestion] = answerIndex;
      return next;
    });
  };

  const toggleFlag = () => {
    setFlaggedQuestions((prev) => {
      const next = new Set(prev);
      if (next.has(currentQuestion)) next.delete(currentQuestion);
      else next.add(currentQuestion);
      return next;
    });
  };

  if (!examStarted) {
    return (
      <ExamStartPanel
        exitLabel={examExit.label}
        title={displayTitle}
        totalQuestions={config.totalQuestions}
        bankSize={questionBank.length}
        timeLimitMinutes={Math.round(config.timeLimit / 60)}
        passThreshold={config.passThreshold}
        topics={config.categories}
        history={history}
        onStart={startExam}
        onExit={() => navigate(examExit.to)}
      />
    );
  }

  if (showResults) {
    if (showReview) {
      return (
        <ExamReviewPanel
          questions={examQuestions}
          answers={selectedAnswers}
          flagged={flaggedQuestions}
          filter={reviewFilter}
          onFilterChange={setReviewFilter}
          failureRates={failureRates}
          onBack={() => setShowReview(false)}
          onDrillMissed={drillMissed}
        />
      );
    }

    return (
      <ExamResultsPanel
        exitLabel={examExit.label}
        questions={examQuestions}
        answers={selectedAnswers}
        passThreshold={config.passThreshold}
        history={history}
        groupBy="category"
        timeTakenSeconds={config.timeLimit - timeRemaining}
        onReview={() => setShowReview(true)}
        onRetake={startExam}
        onExit={() => navigate(examExit.to)}
        onDrillMissed={drillMissed}
      />
    );
  }

  const question = examQuestions[currentQuestion];
  if (!question) return null;

  return (
    <ExamQuestionPanel
      examTitle={displayTitle}
      question={question}
      index={currentQuestion}
      total={examQuestions.length}
      selected={selectedAnswers[currentQuestion]}
      answers={selectedAnswers}
      flagged={flaggedQuestions}
      timeRemaining={timeRemaining}
      onSelect={handleAnswerSelect}
      onPrevious={() => setCurrentQuestion((i) => Math.max(0, i - 1))}
      onNext={() => setCurrentQuestion((i) => Math.min(examQuestions.length - 1, i + 1))}
      onJump={setCurrentQuestion}
      onToggleFlag={toggleFlag}
      onSubmit={handleSubmit}
      onExit={() => navigate(examExit.to)}
    />
  );
};

export default StandardMockExam;
