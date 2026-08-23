import { useState, useEffect, useRef } from 'react';
import { useExamExit } from '@/hooks/useExamExit';
import { useNavigate, useResolvedPath } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';
import {
  getRandomQuestions,
  module3QuestionBank,
  type QuestionBank,
} from '@/data/apprentice-courses/level2/module3/questionBank';
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

const Level2Module8MockExam3 = () => {
  useSEO(
    'Mock Exam 3: Electrical Installation Methods & Technology - Level 2 Module 8',
    'Test your knowledge of electrical installation methods, cable types, wiring systems, and technology for Level 2 electrical installation.'
  );

  // Exam state management
  const [examQuestions, setExamQuestions] = useState<QuestionBank[]>([]);
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

  const history = useMockExamHistory('level2-module8-mock3', user?.id ?? null);
  const failureRates = useQuestionFailureRates(
    'level2-module8-mock3',
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
  const startExam = () => {
    const questions = shuffleAllQuestionOptions(
      getRandomQuestions(60, { basic: 40, intermediate: 45, advanced: 15 }),
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
  }, [examStarted, showResults, timeRemaining]);

  // Record the attempt once per sitting — the personal revision pile plus the
  // shared attempt/per-question dataset the public papers write to. Driven by
  // an effect rather than handleSubmit because on timer expiry handleSubmit
  // fires from a stale interval closure where selectedAnswers is still empty.
  useEffect(() => {
    if (!showResults || missesRecordedRef.current) return;
    missesRecordedRef.current = true;
    recordMockExamAttempt({
      examSlug: 'level2-module8-mock3',
      source: 'in_app',
      examName: 'Level 2 Mock Exam 3',
      questions: examQuestions,
      answers: examQuestions.map((_, index) => selectedAnswers[index]),
      startedAt: startedAtRef.current,
      passThreshold: 70,
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
        title="Mock Exam 3"
        subtitle="Electrical Installation Methods & Technology"
        totalQuestions={60}
        bankSize={module3QuestionBank.length}
        timeLimitMinutes={90}
        passThreshold={70}
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
        passThreshold={70}
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
      examTitle="Level 2 Mock Exam 3"
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

export default Level2Module8MockExam3;
