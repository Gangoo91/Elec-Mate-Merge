import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Clock,
  FileCheck,
  RefreshCw,
  ChevronRight,
  Trophy,
  Target,
  Timer,
  BookOpen,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Sparkles,
  Building
} from 'lucide-react';
import { getRandomBMSMockExamQuestions } from '@/data/upskilling/bmsMockExamData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const BMSMockExam = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [examStarted, setExamStarted] = useState(false);
  const [examQuestions, setExamQuestions] = useState<any[]>([]);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(45 * 60);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (examStarted && !quizCompleted && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setQuizCompleted(true);
            setShowResults(true);
            setEndTime(new Date());
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [examStarted, quizCompleted, timeRemaining]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartExam = () => {
    const newQuestions = getRandomBMSMockExamQuestions(30);
    setExamQuestions(newQuestions);
    setExamStarted(true);
    setStartTime(new Date());
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setQuizCompleted(false);
    setEndTime(null);
    setTimeRemaining(45 * 60);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < examQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
      setShowResults(true);
      setEndTime(new Date());
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRestart = () => {
    setExamStarted(false);
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setQuizCompleted(false);
    setStartTime(null);
    setEndTime(null);
    setTimeRemaining(45 * 60);
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === examQuestions[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  const getExamDuration = () => {
    if (startTime && endTime) {
      const duration = Math.round((endTime.getTime() - startTime.getTime()) / 1000 / 60);
      return duration;
    }
    return 0;
  };

  const getGradeInfo = (score: number) => {
    const percentage = (score / examQuestions.length) * 100;
    if (percentage >= 80) {
      return {
        grade: "Distinction",
        message: "Outstanding! You've mastered BMS principles.",
        color: "text-green-400",
        bgColor: "bg-green-500/20",
        borderColor: "border-green-500/30",
        icon: Trophy
      };
    }
    if (percentage >= 65) {
      return {
        grade: "Merit",
        message: "Great work! Solid understanding of BMS systems.",
        color: "text-blue-400",
        bgColor: "bg-blue-500/20",
        borderColor: "border-blue-500/30",
        icon: CheckCircle2
      };
    }
    if (percentage >= 60) {
      return {
        grade: "Pass",
        message: "You've passed! Consider reviewing weak areas.",
        color: "text-yellow-400",
        bgColor: "bg-yellow-500/20",
        borderColor: "border-yellow-500/30",
        icon: Target
      };
    }
    return {
      grade: "Fail",
      message: "Keep studying and try again when ready.",
      color: "text-red-400",
      bgColor: "bg-red-500/20",
      borderColor: "border-red-500/30",
      icon: XCircle
    };
  };

  // Start Screen - Mobile Native Design
  if (!examStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-black to-black">
        {/* Header */}
        <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-white/70 hover:text-white active:scale-95 transition-all touch-manipulation p-2 -ml-2 rounded-xl"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="text-[15px] font-medium">Back</span>
            </button>
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
              Mock Exam
            </Badge>
          </div>
        </div>

        <div className="px-4 pb-8 pt-6 max-w-lg mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="relative inline-block mb-6">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-2xl shadow-blue-500/30">
                <Building className="h-12 w-12 text-white" />
              </div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-elec-yellow flex items-center justify-center"
              >
                <Sparkles className="h-3 w-3 text-black" />
              </motion.div>
            </div>

            <h1 className="text-3xl font-bold text-white mb-2">
              Building Management
            </h1>
            <p className="text-lg text-white/60">
              Systems Mock Examination
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-3 gap-3 mb-6"
          >
            {[
              { value: "30", label: "Questions", icon: BookOpen, color: "text-blue-400" },
              { value: "45", label: "Minutes", icon: Timer, color: "text-amber-400" },
              { value: "60%", label: "Pass Mark", icon: Target, color: "text-green-400" },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white/[0.04] backdrop-blur-sm rounded-2xl p-4 border border-white/10 text-center"
              >
                <stat.icon className={cn("h-5 w-5 mx-auto mb-2", stat.color)} />
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-white/50">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Grade Boundaries */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/[0.04] backdrop-blur-sm rounded-2xl p-4 border border-white/10 mb-6"
          >
            <h3 className="text-sm font-semibold text-white/70 mb-3 flex items-center gap-2">
              <Trophy className="h-4 w-4 text-blue-400" />
              Grade Boundaries
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { grade: "Distinction", score: "80%+", color: "bg-green-500/20 text-green-400 border-green-500/30" },
                { grade: "Merit", score: "65%+", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
                { grade: "Pass", score: "60%+", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
                { grade: "Fail", score: "<60%", color: "bg-red-500/20 text-red-400 border-red-500/30" },
              ].map((grade, i) => (
                <div
                  key={i}
                  className={cn("rounded-xl px-3 py-2 border text-center", grade.color)}
                >
                  <div className="font-semibold text-sm">{grade.grade}</div>
                  <div className="text-xs opacity-70">{grade.score}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/[0.04] backdrop-blur-sm rounded-2xl p-4 border border-white/10 mb-8"
          >
            <h3 className="text-sm font-semibold text-white/70 mb-3 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-400" />
              Before You Start
            </h3>
            <ul className="space-y-2">
              {[
                "30 questions covering all BMS modules",
                "Timer auto-submits when time expires",
                "You can navigate between questions",
                "Review answers before final submit",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                  <CheckCircle2 className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Start Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Button
              onClick={handleStartExam}
              className={cn(
                "w-full h-14 rounded-2xl text-lg font-semibold",
                "bg-gradient-to-r from-blue-500 to-indigo-600 text-white",
                "shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30",
                "active:scale-[0.98] transition-all touch-manipulation"
              )}
            >
              Start Exam
              <ChevronRight className="h-5 w-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  // Results Screen - Mobile Native Design
  if (showResults) {
    const score = calculateScore();
    const gradeInfo = getGradeInfo(score);
    const duration = getExamDuration();
    const percentage = Math.round((score / examQuestions.length) * 100);
    const passed = percentage >= 60;

    return (
      <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-black to-black">
        {/* Header */}
        <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-white/70 hover:text-white active:scale-95 transition-all touch-manipulation p-2 -ml-2 rounded-xl"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="text-[15px] font-medium">Back</span>
            </button>
            <Badge className={cn(passed ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400")}>
              {passed ? "PASSED" : "FAILED"}
            </Badge>
          </div>
        </div>

        <div className="px-4 pb-8 pt-6 max-w-lg mx-auto">
          {/* Result Hero */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-8"
          >
            <div className={cn(
              "w-24 h-24 rounded-3xl mx-auto mb-4 flex items-center justify-center",
              gradeInfo.bgColor, "border", gradeInfo.borderColor
            )}>
              <gradeInfo.icon className={cn("h-12 w-12", gradeInfo.color)} />
            </div>

            <div className="text-6xl font-bold text-white mb-1">
              {percentage}%
            </div>
            <div className="text-lg text-white/60 mb-4">
              {score} of {examQuestions.length} correct
            </div>

            <Badge className={cn("text-lg px-4 py-2", gradeInfo.bgColor, gradeInfo.color, "border", gradeInfo.borderColor)}>
              {gradeInfo.grade}
            </Badge>

            <p className={cn("mt-4 text-sm", gradeInfo.color)}>
              {gradeInfo.message}
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 gap-3 mb-8"
          >
            <div className="bg-white/[0.04] backdrop-blur-sm rounded-2xl p-4 border border-white/10 text-center">
              <Timer className="h-5 w-5 mx-auto mb-2 text-amber-400" />
              <div className="text-2xl font-bold text-white">{duration}</div>
              <div className="text-xs text-white/50">Minutes Taken</div>
            </div>
            <div className="bg-white/[0.04] backdrop-blur-sm rounded-2xl p-4 border border-white/10 text-center">
              <Target className="h-5 w-5 mx-auto mb-2 text-blue-400" />
              <div className="text-2xl font-bold text-white">{45 - Math.floor(timeRemaining / 60)}</div>
              <div className="text-xs text-white/50">Time Used</div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-3 mb-8"
          >
            <Button
              onClick={handleRestart}
              className={cn(
                "w-full h-14 rounded-2xl text-lg font-semibold",
                "bg-gradient-to-r from-blue-500 to-indigo-600 text-white",
                "shadow-lg shadow-blue-500/25",
                "active:scale-[0.98] transition-all touch-manipulation"
              )}
            >
              <RefreshCw className="h-5 w-5 mr-2" />
              Retake Exam
            </Button>
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              className="w-full h-14 rounded-2xl text-lg font-semibold border-white/20 text-white hover:bg-white/10 active:scale-[0.98] transition-all touch-manipulation"
            >
              Return to Course
            </Button>
          </motion.div>

          {/* Detailed Results */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/[0.04] backdrop-blur-sm rounded-2xl p-4 border border-white/10"
          >
            <h3 className="text-sm font-semibold text-white/70 mb-4 flex items-center gap-2">
              <FileCheck className="h-4 w-4 text-blue-400" />
              Question Review
            </h3>
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {examQuestions.map((question, index) => {
                const userAnswer = selectedAnswers[index];
                const isCorrect = userAnswer === question.correctAnswer;

                return (
                  <div key={question.id} className="bg-white/[0.04] rounded-xl p-3 border border-white/10">
                    <div className="flex items-start gap-3">
                      {isCorrect ? (
                        <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white mb-2">
                          Q{index + 1}: {question.question}
                        </p>
                        <p className="text-xs text-white/60 mb-1">
                          <span className="text-white/40">Your answer:</span>{' '}
                          <span className={isCorrect ? 'text-green-400' : 'text-red-400'}>
                            {question.options[userAnswer] || 'Not answered'}
                          </span>
                        </p>
                        {!isCorrect && (
                          <p className="text-xs text-white/60 mb-1">
                            <span className="text-white/40">Correct:</span>{' '}
                            <span className="text-green-400">{question.options[question.correctAnswer]}</span>
                          </p>
                        )}
                        {question.explanation && (
                          <p className="text-xs text-white/50 mt-2 italic">
                            {question.explanation}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Exam In Progress - Mobile Native Design
  const currentQ = examQuestions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-black to-black">
      {/* Header with Timer */}
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/70 hover:text-white active:scale-95 transition-all touch-manipulation p-2 -ml-2 rounded-xl"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-[15px] font-medium">Exit</span>
          </button>

          <div className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-xl",
            timeRemaining < 300
              ? "bg-red-500/20 border border-red-500/30"
              : "bg-white/[0.04] border border-white/10"
          )}>
            <Clock className={cn("h-4 w-4", timeRemaining < 300 ? "text-red-400" : "text-blue-400")} />
            <span className={cn(
              "font-mono text-lg font-semibold",
              timeRemaining < 300 ? "text-red-400" : "text-blue-400"
            )}>
              {formatTime(timeRemaining)}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="px-4 pb-3">
          <div className="flex items-center justify-between text-xs text-white/50 mb-2">
            <span>Question {currentQuestion + 1} of {examQuestions.length}</span>
            <span>{Math.round(((currentQuestion + 1) / examQuestions.length) * 100)}%</span>
          </div>
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestion + 1) / examQuestions.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      <div className="px-4 pb-32 pt-6 max-w-lg mx-auto">
        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-white/[0.04] backdrop-blur-sm rounded-2xl p-4 border border-white/10 mb-4">
              <h2 className="text-lg font-semibold text-white leading-relaxed">
                {currentQ.question}
              </h2>
            </div>

            <div className="space-y-3">
              {currentQ.options.map((option: string, index: number) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={cn(
                    "w-full text-left p-4 rounded-2xl border transition-all touch-manipulation active:scale-[0.98]",
                    selectedAnswers[currentQuestion] === index
                      ? "bg-blue-500/20 border-blue-500 text-blue-400"
                      : "bg-white/[0.04] border-white/10 text-white/80 hover:bg-white/[0.08]"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5",
                      selectedAnswers[currentQuestion] === index
                        ? "border-blue-500 bg-blue-500"
                        : "border-white/30"
                    )}>
                      {selectedAnswers[currentQuestion] === index && (
                        <CheckCircle2 className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <span className="text-[15px]">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Fixed Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-xl border-t border-white/10 p-4 safe-bottom">
        <div className="max-w-lg mx-auto flex gap-3">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            variant="outline"
            className="flex-1 h-12 rounded-xl border-white/20 text-white hover:bg-white/10 disabled:opacity-30 active:scale-[0.98] transition-all touch-manipulation"
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={selectedAnswers[currentQuestion] === undefined}
            className={cn(
              "flex-1 h-12 rounded-xl font-semibold",
              "bg-gradient-to-r from-blue-500 to-indigo-600 text-white",
              "disabled:opacity-30 active:scale-[0.98] transition-all touch-manipulation"
            )}
          >
            {currentQuestion === examQuestions.length - 1 ? "Finish" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BMSMockExam;
