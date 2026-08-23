import { useState, useEffect, useRef } from 'react';
import { useExamExit } from '@/hooks/useExamExit';
import { useNavigate } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';
import { ExamStartPanel } from '@/components/apprentice-courses/ExamStartPanel';
import { ExamQuestionPanel } from '@/components/apprentice-courses/ExamQuestionPanel';
import { shuffleAllQuestionOptions, createShuffleSalt } from '@/utils/shuffleOptions';
import {
  getRandomQuestions,
  module5Questions,
  type Question,
  M5_SECTION_TOPIC,
} from '@/data/apprentice-courses/level3/module5/questionBank';
import { useAuth } from '@/contexts/AuthContext';
import { ExamResultsPanel } from '@/components/apprentice-courses/ExamResultsPanel';
import {
  ExamReviewPanel,
  type ExamReviewFilter,
} from '@/components/apprentice-courses/ExamReviewPanel';
import { recordMockExamAttempt } from '@/lib/mockExamTelemetry';
import { useMockExamHistory } from '@/hooks/useMockExamHistory';
import { useQuestionFailureRates } from '@/hooks/useQuestionFailureRates';

const Level3Module8MockExam5 = () => {
  useSEO(
    'Mock Exam 5: Inspection & Testing | Level 3 Electrical Course',
    'Test your knowledge of Module 5 inspection and testing with this comprehensive 30-question mock exam.'
  );

  const [examQuestions, setExamQuestions] = useState<Question[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [examStarted, setExamStarted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(60 * 45);
  const [flaggedQuestions, setFlaggedQuestions] = useState(new Set<number>());
  const [reviewMode, setReviewMode] = useState(false);
  const [reviewFilter, setReviewFilter] = useState<ExamReviewFilter>('all');
  const { user } = useAuth();
  const navigate = useNavigate();
  // Caller-aware: returns to the mock exams library when the paper
  // was opened from there, otherwise to its course module.
  const examExit = useExamExit('/study-centre/apprentice/level3-course/module8-section5');
  const missesRecordedRef = useRef(false);
  const startedAtRef = useRef<number | null>(null);

  // Answers as an array aligned to the questions, which is what the shared
  // results/review panels take.
  const answersArray = examQuestions.map((_, index) => selectedAnswers[index]);

  const history = useMockExamHistory('level3-module8-mock5', user?.id ?? null);
  const failureRates = useQuestionFailureRates(
    'level3-module8-mock5',
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
    const selectedQuestions = shuffleAllQuestionOptions(
      getRandomQuestions(30),
      createShuffleSalt()
    );
    setExamQuestions(selectedQuestions);
    setSelectedAnswers(new Array(30).fill(-1));
    setCurrentQuestion(0);
    setExamStarted(true);
    setShowResults(false);
    setTimeRemaining(60 * 45);
    setFlaggedQuestions(new Set());
    missesRecordedRef.current = false;
    startedAtRef.current = Date.now();
  };

  useEffect(() => {
    if (examStarted && !showResults && timeRemaining > 0) {
      const timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0 && examStarted && !showResults) {
      handleSubmit();
    }
  }, [timeRemaining, examStarted, showResults]);

  // Record the attempt once per sitting — the personal revision pile plus the
  // shared attempt/per-question dataset the public papers write to. Driven by
  // an effect rather than handleSubmit because on timer expiry handleSubmit
  // fires from a stale interval closure where selectedAnswers is still empty.
  useEffect(() => {
    if (!showResults || missesRecordedRef.current) return;
    missesRecordedRef.current = true;
    recordMockExamAttempt({
      examSlug: 'level3-module8-mock5',
      source: 'in_app',
      examName: 'Level 3 Mock Exam 5',
      questions: examQuestions,
      answers: selectedAnswers,
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
        title="Level 3 Mock Exam 5"
        subtitle="Inspection & Testing"
        totalQuestions={30}
        bankSize={module5Questions.length}
        timeLimitMinutes={45}
        passThreshold={60}
        topics={[
          'Initial verification',
          'Periodic inspection',
          'Test sequences',
          'Test values',
          'EICR certification',
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
          topicNames={M5_SECTION_TOPIC}
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
        topicNames={M5_SECTION_TOPIC}
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
          setTimeRemaining(60 * 45);
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
      topicNames={M5_SECTION_TOPIC}
      examTitle="Level 3 Mock Exam 5"
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

export default Level3Module8MockExam5;
