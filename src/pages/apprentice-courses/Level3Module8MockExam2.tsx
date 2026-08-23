import { useState, useEffect, useRef } from 'react';
import { useExamExit } from '@/hooks/useExamExit';
import { useNavigate, useResolvedPath } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';
import { ExamStartPanel } from '@/components/apprentice-courses/ExamStartPanel';
import { ExamQuestionPanel } from '@/components/apprentice-courses/ExamQuestionPanel';
import { shuffleAllQuestionOptions, createShuffleSalt } from '@/utils/shuffleOptions';
import {
  getRandomQuestions,
  module2Questions,
  type QuestionBank,
} from '@/data/apprentice-courses/level3/module2/questionBank';
import { useAuth } from '@/contexts/AuthContext';
import { ExamResultsPanel } from '@/components/apprentice-courses/ExamResultsPanel';
import {
  ExamReviewPanel,
  type ExamReviewFilter,
} from '@/components/apprentice-courses/ExamReviewPanel';
import { recordMockExamAttempt } from '@/lib/mockExamTelemetry';
import { useMockExamHistory } from '@/hooks/useMockExamHistory';
import { useQuestionFailureRates } from '@/hooks/useQuestionFailureRates';

const Level3Module8MockExam2 = () => {
  useSEO(
    'Mock Exam 2 — Environmental Technologies (Unit 301) | Level 3 | Elec-Mate',
    'Sit a 60-question, 90-minute closed-book mock exam covering C&G 2365-03 Unit 301 Environmental Technologies, layered with 2357 Unit 312 + Unit 602 supervisor depth: BS 7671 Section 712/722/753, MCS, F-Gas, ENA G98/G99.'
  );

  const [examQuestions, setExamQuestions] = useState<QuestionBank[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [examStarted, setExamStarted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(90 * 60); // 90 minutes (C&G 2365-03 spec)
  const [flaggedQuestions, setFlaggedQuestions] = useState(new Set<number>());
  const [reviewMode, setReviewMode] = useState(false);
  const [reviewFilter, setReviewFilter] = useState<ExamReviewFilter>('all');
  const { user } = useAuth();
  const navigate = useNavigate();
  const missesRecordedRef = useRef(false);
  const startedAtRef = useRef<number | null>(null);

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

  const history = useMockExamHistory('level3-module8-mock2', user?.id ?? null);
  const failureRates = useQuestionFailureRates(
    'level3-module8-mock2',
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

  const startExam = () => {
    // Get 60 random questions from Level 3 Module 2 question bank (C&G 2365-03 spec)
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
    startedAtRef.current = Date.now();
  };

  // Timer effect
  useEffect(() => {
    if (examStarted && !showResults && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [examStarted, showResults]);

  // Record the attempt once per sitting — the personal revision pile plus the
  // shared attempt/per-question dataset the public papers write to. Driven by
  // an effect rather than handleSubmit because on timer expiry handleSubmit
  // fires from a stale interval closure where selectedAnswers is still empty.
  useEffect(() => {
    if (!showResults || missesRecordedRef.current) return;
    missesRecordedRef.current = true;
    recordMockExamAttempt({
      examSlug: 'level3-module8-mock2',
      source: 'in_app',
      examName: 'Level 3 Mock Exam 2',
      questions: examQuestions,
      answers: examQuestions.map((_, index) => selectedAnswers[index]),
      startedAt: startedAtRef.current,
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
        title="Mock Exam 2 — Environmental Technologies"
        subtitle="Level 3 — C&G 2365-03 Unit 301"
        totalQuestions={60}
        bankSize={module2Questions.length}
        timeLimitMinutes={90}
        passThreshold={60}
        topics={[
          'BS 7671 Section 712 PV',
          'Section 722 EV',
          'Section 753 heating',
          'Heat pumps',
          'MCS',
          'F-Gas',
          'G98/G99',
          'Building Regs Part L',
          'Sustainable working',
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
      examTitle="Level 3 Mock Exam 2"
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

export default Level3Module8MockExam2;
