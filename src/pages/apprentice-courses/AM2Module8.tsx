import { useState, useEffect, useRef } from 'react';
import { useExamExit } from '@/hooks/useExamExit';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Flag,
  RotateCcw,
  FileText,
  Target,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExamStartPanel } from '@/components/apprentice-courses/ExamStartPanel';
import { ExamQuestionPanel } from '@/components/apprentice-courses/ExamQuestionPanel';
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

const AM2Module8 = () => {
  const navigate = useNavigate();
  // Caller-aware: returns to the mock exams library when the paper
  // was opened from there, otherwise to its course module.
  const examExit = useExamExit('/study-centre/apprentice/am2');
  useSEO(
    'Module 8: AM2 Mock Examination - AM2 Preparation Course',
    'Practice AM2 knowledge test with 30 questions, 60-minute timer from 400 question bank covering safe isolation, BS7671, testing and fault finding'
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
  const [reviewFilter, setReviewFilter] = useState<
    'all' | 'correct' | 'incorrect' | 'unanswered' | 'flagged'
  >('all');
  const { user } = useAuth();
  const missesRecordedRef = useRef(false);
  const startedAtRef = useRef<number | null>(null);

  // Answers as an array aligned to the questions, which is what the shared
  // exam panel takes for its navigator.
  const answersArray = examQuestions.map((_, index) => selectedAnswers[index]);

  // Start exam - 30 questions matching real AM2 theory exam
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
    startedAtRef.current = Date.now();
    toast.success('AM2 Mock Exam started! Good luck!');
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
      examSlug: 'am2-module8',
      source: 'in_app',
      examName: 'AM2 Mock Exam',
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

  // Calculate score
  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      if (answer === examQuestions[index]?.correctAnswer) {
        return score + 1;
      }
      return score;
    }, 0);
  };

  // Calculate category breakdown
  const getCategoryBreakdown = () => {
    const breakdown: Record<string, { total: number; correct: number }> = {};

    examQuestions.forEach((q, index) => {
      const category = q.category || 'General';
      if (!breakdown[category]) {
        breakdown[category] = { total: 0, correct: 0 };
      }
      breakdown[category].total++;
      if (selectedAnswers[index] === q.correctAnswer) {
        breakdown[category].correct++;
      }
    });

    return Object.entries(breakdown)
      .sort((a, b) => b[1].total - a[1].total)
      .map(([category, stats]) => ({
        category,
        ...stats,
        percent: Math.round((stats.correct / stats.total) * 100),
      }));
  };

  // Get question status for review
  const getQuestionStatus = (index: number): 'correct' | 'incorrect' | 'unanswered' => {
    if (selectedAnswers[index] === -1) return 'unanswered';
    return selectedAnswers[index] === examQuestions[index].correctAnswer ? 'correct' : 'incorrect';
  };

  // Review functionality
  const getFilteredQuestions = () => {
    return examQuestions
      .map((q, index) => ({ question: q, index }))
      .filter(({ index }) => {
        const status = getQuestionStatus(index);
        const isFlagged = flaggedQuestions.has(index);

        switch (reviewFilter) {
          case 'correct':
            return status === 'correct';
          case 'incorrect':
            return status === 'incorrect';
          case 'unanswered':
            return status === 'unanswered';
          case 'flagged':
            return isFlagged;
          default:
            return true;
        }
      });
  };

  // Statistics
  const getSummaryStats = () => {
    const answered = selectedAnswers.filter((a) => a !== -1).length;
    const unanswered = examQuestions.length - answered;
    const flagged = flaggedQuestions.size;
    const correct = showResults ? calculateScore() : 0;
    const incorrect = showResults ? answered - correct : 0;

    return { answered, unanswered, flagged, correct, incorrect };
  };

  const stats = getSummaryStats();
  const score = calculateScore();
  const percentage =
    examQuestions.length > 0 ? Math.round((score / examQuestions.length) * 100) : 0;
  const passed = percentage >= 60;

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
        subtitle="Comprehensive AM2 Assessment Practice"
        totalQuestions={30}
        bankSize={am2QuestionBank.length}
        timeLimitMinutes={60}
        passThreshold={60}
        topics={['H&S', 'BS 7671', 'Building Regs', 'Safe isolation']}
        onStart={startExam}
        onExit={() => navigate(examExit.to)}
      />
    );
  }

  // Results screen
  if (showResults && !showReview) {
    return (
      <div className="bg-[#1a1a1a] p-2 sm:p-4">
        <div>
          <Card className="border-elec-yellow/30 ">
            <CardHeader className="text-center pb-4 px-4 sm:px-6">
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-lg font-semibold mb-4 ${
                  passed ? 'bg-elec-yellow/20 text-elec-yellow' : 'bg-red-500/20 text-elec-yellow'
                }`}
              >
                {passed ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                {passed ? 'PASSED' : 'FAILED'}
              </div>
              <CardTitle className="text-xl sm:text-2xl text-white mb-2">Exam Complete</CardTitle>
              <p className="text-lg text-white">
                You scored {score} out of {examQuestions.length} ({percentage}%)
              </p>
            </CardHeader>

            <CardContent className="px-4 sm:px-6">
              {/* Summary Stats */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <Card className="bg-transparent border-green-500/20">
                  <CardContent className="p-3 text-center">
                    <div className="text-xl font-bold text-green-500">{stats.correct}</div>
                    <div className="text-xs text-white">Correct</div>
                  </CardContent>
                </Card>
                <Card className="bg-transparent border-red-500/20">
                  <CardContent className="p-3 text-center">
                    <div className="text-xl font-bold text-red-400">{stats.incorrect}</div>
                    <div className="text-xs text-white">Incorrect</div>
                  </CardContent>
                </Card>
                <Card className="bg-transparent border-muted/20">
                  <CardContent className="p-3 text-center">
                    <div className="text-xl font-bold text-white">{stats.unanswered}</div>
                    <div className="text-xs text-white">Skipped</div>
                  </CardContent>
                </Card>
              </div>

              {/* Category Breakdown */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  <Target className="h-4 w-4 text-elec-yellow" />
                  Performance by Category
                </h3>
                <div className="space-y-2">
                  {getCategoryBreakdown().map(({ category, total, correct, percent }) => (
                    <div
                      key={category}
                      className="bg-white/[0.03] rounded-lg p-3 border border-white/10"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-white truncate pr-2">
                          {category}
                        </span>
                        <span
                          className={`text-sm font-bold ${percent >= 60 ? 'text-green-400' : 'text-red-400'}`}
                        >
                          {correct}/{total} ({percent}%)
                        </span>
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${percent >= 60 ? 'bg-green-500' : 'bg-red-500'}`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                {getCategoryBreakdown().filter((c) => c.percent < 60).length > 0 && (
                  <div className="mt-3 p-3 rounded-lg border border-orange-500/30 bg-orange-500/10">
                    <p className="text-xs text-orange-300">
                      <AlertTriangle className="h-3 w-3 inline mr-1" />
                      Focus on:{' '}
                      {getCategoryBreakdown()
                        .filter((c) => c.percent < 60)
                        .map((c) => c.category)
                        .join(', ')}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={() => setShowReview(true)}
                  variant="outline"
                  size="lg"
                  className="border-elec-yellow/40 hover:bg-elec-yellow/10 text-white"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Review Answers
                </Button>
                <Button
                  onClick={resetExam}
                  size="lg"
                  className="bg-elec-yellow hover:bg-elec-yellow/90 text-black"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Retake Exam
                </Button>
                <Button
                  onClick={() => navigate('/study-centre/apprentice/am2')}
                  variant="outline"
                  size="lg"
                  className="border-border/40 hover:bg-card/10 text-white"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Course
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Review screen
  if (showReview) {
    const filteredQuestions = getFilteredQuestions();

    return (
      <div className="bg-[#1a1a1a] p-2 sm:p-4">
        <div className="max-w-5xl mx-auto">
          {/* Review Header */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-lg sm:text-lg sm:text-xl font-semibold text-white">
                  Review Answers
                </h1>
                <p className="text-sm text-white">
                  Score: {percentage}% ({score}/{examQuestions.length})
                </p>
              </div>
              <Button
                onClick={() => setShowReview(false)}
                variant="ghost"
                size="sm"
                className="text-white hover:text-elec-yellow"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Results
              </Button>
            </div>

            {/* Summary Stats - Clickable Filters */}
            <div className="grid grid-cols-1 gap-4 mb-4">
              <Card
                className={`bg-transparent border-elec-yellow/30 cursor-pointer hover:bg-elec-yellow/5 active:scale-[0.98] transition-all touch-manipulation ${
                  reviewFilter === 'all' ? 'ring-2 ring-elec-yellow/50' : ''
                }`}
                onClick={() => setReviewFilter(reviewFilter === 'all' ? 'all' : 'all')}
              >
                <CardContent className="p-3 text-center">
                  <div className="text-lg font-bold text-elec-yellow">{examQuestions.length}</div>
                  <div className="text-xs text-white">All</div>
                </CardContent>
              </Card>
              <Card
                className={`bg-transparent border-green-500/20 cursor-pointer hover:bg-transparent active:scale-[0.98] transition-all touch-manipulation ${
                  reviewFilter === 'correct' ? 'ring-2 ring-green-500/50' : ''
                }`}
                onClick={() => setReviewFilter(reviewFilter === 'correct' ? 'all' : 'correct')}
              >
                <CardContent className="p-3 text-center">
                  <div className="text-lg font-bold text-green-500">{stats.correct}</div>
                  <div className="text-xs text-white">Correct</div>
                </CardContent>
              </Card>
              <Card
                className={`bg-transparent border-red-500/20 cursor-pointer hover:bg-transparent active:scale-[0.98] transition-all touch-manipulation ${
                  reviewFilter === 'incorrect' ? 'ring-2 ring-red-500/50' : ''
                }`}
                onClick={() => setReviewFilter(reviewFilter === 'incorrect' ? 'all' : 'incorrect')}
              >
                <CardContent className="p-3 text-center">
                  <div className="text-lg font-bold text-elec-yellow">{stats.incorrect}</div>
                  <div className="text-xs text-white">Incorrect</div>
                </CardContent>
              </Card>
              <Card
                className={`bg-transparent border-muted/20 cursor-pointer hover:bg-muted/10 active:scale-[0.98] transition-all touch-manipulation ${
                  reviewFilter === 'unanswered' ? 'ring-2 ring-muted/50' : ''
                }`}
                onClick={() =>
                  setReviewFilter(reviewFilter === 'unanswered' ? 'all' : 'unanswered')
                }
              >
                <CardContent className="p-3 text-center">
                  <div className="text-lg font-bold text-white">{stats.unanswered}</div>
                  <div className="text-xs text-white">Unanswered</div>
                </CardContent>
              </Card>
              <Card
                className={`bg-transparent border-elec-yellow/30 cursor-pointer hover:bg-elec-yellow/5 active:scale-[0.98] transition-all touch-manipulation ${
                  reviewFilter === 'flagged' ? 'ring-2 ring-elec-yellow/50' : ''
                }`}
                onClick={() => setReviewFilter(reviewFilter === 'flagged' ? 'all' : 'flagged')}
              >
                <CardContent className="p-3 text-center">
                  <div className="text-lg font-bold text-elec-yellow">{stats.flagged}</div>
                  <div className="text-xs text-white">Flagged</div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Question List */}
          <div className="space-y-4">
            {filteredQuestions.map(({ question, index }) => {
              const status = getQuestionStatus(index);
              const userAnswer = selectedAnswers[index];
              const correctAnswer = question.correctAnswer;
              const isFlagged = flaggedQuestions.has(index);

              return (
                <Card key={index} className="bg-transparent border-elec-yellow/30">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base text-white">Question {index + 1}</CardTitle>
                      <div className="flex items-center gap-2">
                        {isFlagged && (
                          <Badge
                            variant="outline"
                            className="text-elec-yellow border-elec-yellow/40"
                          >
                            <Flag className="h-3 w-3 mr-1 fill-current" />
                            Flagged
                          </Badge>
                        )}
                        <Badge
                          variant={status === 'correct' ? 'default' : 'destructive'}
                          className={
                            status === 'correct'
                              ? 'bg-green-500/20 text-green-500 border-green-500/40'
                              : status === 'incorrect'
                                ? 'bg-red-500/20 text-elec-yellow border-red-500/40'
                                : 'bg-muted/20 text-white border-muted/40'
                          }
                        >
                          {status === 'correct'
                            ? 'Correct'
                            : status === 'incorrect'
                              ? 'Incorrect'
                              : 'Unanswered'}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed mb-4 font-medium">{question.question}</p>

                    <div className="space-y-2">
                      {question.options.map((option, optionIndex) => {
                        const isUserAnswer = userAnswer === optionIndex;
                        const isCorrectAnswer = correctAnswer === optionIndex;

                        return (
                          <div
                            key={optionIndex}
                            className={`p-3 rounded-lg border-2 text-sm ${
                              isCorrectAnswer
                                ? 'border-green-500 text-green-500'
                                : isUserAnswer && !isCorrectAnswer
                                  ? 'border-red-500 text-elec-yellow'
                                  : 'border-muted/40 bg-muted/5'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div
                                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                                  isCorrectAnswer
                                    ? 'border-green-500 bg-green-500'
                                    : isUserAnswer && !isCorrectAnswer
                                      ? 'border-red-500 bg-red-500'
                                      : 'border-muted-foreground'
                                }`}
                              >
                                {(isUserAnswer || isCorrectAnswer) && (
                                  <div className="w-1.5 h-1.5 bg-white rounded-full" />
                                )}
                              </div>
                              <span className="flex-1 leading-relaxed">{option}</span>
                              {isCorrectAnswer && (
                                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                              )}
                              {isUserAnswer && !isCorrectAnswer && (
                                <XCircle className="h-4 w-4 text-elec-yellow flex-shrink-0" />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {question.explanation && (
                      <div className="mt-4 p-3 rounded-lg border border-elec-yellow/30">
                        <div className="flex items-start gap-2">
                          <div className="flex h-5 w-5 items-center justify-center rounded-md bg-elec-yellow/20 flex-shrink-0 mt-0.5">
                            <CheckCircle className="h-3 w-3 text-elec-yellow" />
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-white mb-1">Explanation</h4>
                            <p className="text-sm text-white leading-relaxed">
                              {question.explanation}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
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
