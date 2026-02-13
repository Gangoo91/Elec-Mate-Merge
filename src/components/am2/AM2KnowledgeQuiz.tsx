/**
 * AM2KnowledgeQuiz
 *
 * Client-side knowledge test using 400 MCQ questions from questionBank.
 * Three phases: Setup → In Progress → Results
 * Saves score to AM2 readiness (15% weight) and am2_mock_sessions.
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Timer,
  Trophy,
  Target,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  am2QuestionBank,
  getRandomQuestions,
  getQuestionsByCategory,
  type AM2Question,
} from '@/data/apprentice-courses/am2/questionBank';
import { useAM2Readiness } from '@/hooks/am2/useAM2Readiness';
import { useAuth } from '@/contexts/AuthContext';
import { saveAM2Session } from '@/hooks/am2/saveAM2Session';

type Phase = 'setup' | 'quiz' | 'results';
type Difficulty = 'basic' | 'intermediate' | 'advanced' | 'mixed';

const CATEGORIES: AM2Question['category'][] = [
  'Health & Safety',
  'BS7671 Fundamentals',
  'BS7671 Selection & Erection',
  'BS7671 Inspection & Testing',
  'Building Regulations',
  'Safe Isolation',
  'Fault Finding',
];

const QUESTION_COUNTS = [15, 20, 30];

const DIFFICULTY_WEIGHTS: Record<Difficulty, { basic: number; intermediate: number; advanced: number }> = {
  basic: { basic: 0.8, intermediate: 0.2, advanced: 0 },
  intermediate: { basic: 0.2, intermediate: 0.6, advanced: 0.2 },
  advanced: { basic: 0.1, intermediate: 0.3, advanced: 0.6 },
  mixed: { basic: 0.3, intermediate: 0.4, advanced: 0.3 },
};

interface AM2KnowledgeQuizProps {
  onSessionComplete?: () => void;
}

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function AM2KnowledgeQuiz({ onSessionComplete }: AM2KnowledgeQuizProps) {
  const [phase, setPhase] = useState<Phase>('setup');

  // Setup state
  const [difficulty, setDifficulty] = useState<Difficulty>('mixed');
  const [questionCount, setQuestionCount] = useState(20);
  const [selectedCategories, setSelectedCategories] = useState<AM2Question['category'][]>([]);

  // Quiz state
  const [questions, setQuestions] = useState<AM2Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  // Results state
  const [score, setScore] = useState(0);
  const [categoryScores, setCategoryScores] = useState<Record<string, { correct: number; total: number }>>({});

  const { saveScore } = useAM2Readiness();
  const { user } = useAuth();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Timer
  useEffect(() => {
    if (phase === 'quiz') {
      timerRef.current = setInterval(() => {
        setElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase, startTime]);

  const toggleCategory = useCallback((cat: AM2Question['category']) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  }, []);

  const handleStart = useCallback(() => {
    const weights = DIFFICULTY_WEIGHTS[difficulty];

    let pool: AM2Question[];
    if (selectedCategories.length > 0) {
      pool = selectedCategories.flatMap((cat) => getQuestionsByCategory(cat));
      // Apply difficulty filtering
      if (difficulty !== 'mixed') {
        const primary = pool.filter((q) => q.difficulty === difficulty);
        const rest = pool.filter((q) => q.difficulty !== difficulty);
        pool = [...shuffleArray(primary), ...shuffleArray(rest)];
      } else {
        pool = shuffleArray(pool);
      }
      pool = pool.slice(0, questionCount);
    } else {
      pool = getRandomQuestions(questionCount, weights);
    }

    setQuestions(pool);
    setAnswers(new Array(pool.length).fill(null));
    setCurrentIndex(0);
    setShowExplanation(false);
    setStartTime(Date.now());
    setElapsed(0);
    setPhase('quiz');
  }, [difficulty, questionCount, selectedCategories]);

  const handleAnswer = useCallback(
    (optionIndex: number) => {
      if (answers[currentIndex] !== null) return; // Already answered
      setAnswers((prev) => {
        const next = [...prev];
        next[currentIndex] = optionIndex;
        return next;
      });
      setShowExplanation(true);
    },
    [currentIndex, answers]
  );

  const handleNext = useCallback(() => {
    setShowExplanation(false);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      // Calculate results
      if (timerRef.current) clearInterval(timerRef.current);

      let correct = 0;
      const catScores: Record<string, { correct: number; total: number }> = {};

      questions.forEach((q, i) => {
        if (!catScores[q.category]) catScores[q.category] = { correct: 0, total: 0 };
        catScores[q.category].total++;
        if (answers[i] === q.correctAnswer) {
          correct++;
          catScores[q.category].correct++;
        }
      });

      const pct = Math.round((correct / questions.length) * 100);
      setScore(pct);
      setCategoryScores(catScores);

      saveScore('knowledgeAssessment', pct);

      if (user) {
        const timeSpent = Math.floor((Date.now() - startTime) / 1000);
        saveAM2Session(user.id, {
          sessionType: 'knowledge_test',
          overallScore: pct,
          componentScores: { correct, total: questions.length },
          sessionData: { difficulty, categoryScores: catScores },
          timeSpentSeconds: timeSpent,
          startedAt: new Date(startTime).toISOString(),
        });
      }

      onSessionComplete?.();
      setPhase('results');
    }
  }, [currentIndex, questions, answers, saveScore, user, startTime, difficulty, onSessionComplete]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setShowExplanation(answers[currentIndex - 1] !== null);
      setCurrentIndex((i) => i - 1);
    }
  }, [currentIndex, answers]);

  const handleRetry = useCallback(() => {
    setPhase('setup');
  }, []);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${String(sec).padStart(2, '0')}`;
  };

  // ── Setup Phase ────────────────────────────────────────────

  if (phase === 'setup') {
    return (
      <div className="px-4 py-6 space-y-5 animate-fade-in">
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="h-14 w-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
            <BookOpen className="h-7 w-7 text-blue-400" />
          </div>
          <h2 className="text-xl font-bold text-white">Knowledge Test</h2>
          <p className="text-sm text-white max-w-xs">
            {am2QuestionBank.length} questions covering BS 7671, health & safety, building
            regulations, and installation techniques.
          </p>
        </div>

        {/* Difficulty */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-white uppercase tracking-wider">Difficulty</h3>
          <div className="grid grid-cols-2 gap-2">
            {(['basic', 'intermediate', 'advanced', 'mixed'] as Difficulty[]).map((d) => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={cn(
                  'h-11 rounded-xl text-sm font-medium touch-manipulation transition-colors border',
                  difficulty === d
                    ? 'bg-blue-500/20 border-blue-500/40 text-blue-300'
                    : 'bg-elec-gray border-white/10 text-white'
                )}
              >
                {d === 'mixed' ? 'Mixed (Recommended)' : d.charAt(0).toUpperCase() + d.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Question Count */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
            Questions
          </h3>
          <div className="flex gap-2">
            {QUESTION_COUNTS.map((c) => (
              <button
                key={c}
                onClick={() => setQuestionCount(c)}
                className={cn(
                  'flex-1 h-11 rounded-xl text-sm font-medium touch-manipulation transition-colors border',
                  questionCount === c
                    ? 'bg-blue-500/20 border-blue-500/40 text-blue-300'
                    : 'bg-elec-gray border-white/10 text-white'
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
            Categories{' '}
            <span className="text-white font-normal normal-case">
              (optional — leave empty for all)
            </span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                className={cn(
                  'px-3 h-9 rounded-full text-xs font-medium touch-manipulation transition-colors border',
                  selectedCategories.includes(cat)
                    ? 'bg-blue-500/20 border-blue-500/40 text-blue-300'
                    : 'bg-elec-gray border-white/10 text-white'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Start */}
        <button
          onClick={handleStart}
          className="w-full h-12 rounded-xl bg-blue-500 text-black font-bold text-sm touch-manipulation active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
        >
          <Zap className="h-4 w-4" />
          Start Quiz
        </button>
      </div>
    );
  }

  // ── Quiz Phase ─────────────────────────────────────────────

  if (phase === 'quiz' && questions.length > 0) {
    const q = questions[currentIndex];
    const userAnswer = answers[currentIndex];
    const isAnswered = userAnswer !== null;
    const isCorrect = userAnswer === q.correctAnswer;

    return (
      <div className="px-4 py-4 space-y-4 animate-fade-in">
        {/* Progress header */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-white">
            {currentIndex + 1} / {questions.length}
          </span>
          <div className="flex items-center gap-1 text-xs text-white">
            <Timer className="h-3 w-3" />
            {formatTime(elapsed)}
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full bg-blue-500 transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>

        {/* Category + Difficulty badges */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-medium text-blue-300 bg-blue-500/10 px-2 py-0.5 rounded-full">
            {q.category}
          </span>
          <span
            className={cn(
              'text-[10px] font-medium px-2 py-0.5 rounded-full',
              q.difficulty === 'basic'
                ? 'text-emerald-300 bg-emerald-500/10'
                : q.difficulty === 'intermediate'
                  ? 'text-amber-300 bg-amber-500/10'
                  : 'text-red-300 bg-red-500/10'
            )}
          >
            {q.difficulty}
          </span>
        </div>

        {/* Question */}
        <p className="text-base font-semibold text-white leading-relaxed">{q.question}</p>

        {/* Options */}
        <div className="space-y-2">
          {q.options.map((option, idx) => {
            let optionStyle = 'bg-elec-gray border-white/10 text-white';
            if (isAnswered) {
              if (idx === q.correctAnswer) {
                optionStyle = 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300';
              } else if (idx === userAnswer && !isCorrect) {
                optionStyle = 'bg-red-500/10 border-red-500/30 text-red-300';
              } else {
                optionStyle = 'bg-elec-gray border-white/5 text-white';
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                disabled={isAnswered}
                className={cn(
                  'w-full p-3.5 rounded-xl border text-left text-sm touch-manipulation transition-colors flex items-start gap-3',
                  optionStyle,
                  !isAnswered && 'active:bg-white/[0.08]'
                )}
              >
                <span className="flex items-center justify-center h-6 w-6 rounded-full bg-white/10 text-xs font-bold shrink-0">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="flex-1 pt-0.5">{option}</span>
                {isAnswered && idx === q.correctAnswer && (
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                )}
                {isAnswered && idx === userAnswer && !isCorrect && (
                  <XCircle className="h-5 w-5 text-red-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        <AnimatePresence>
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div
                className={cn(
                  'p-3.5 rounded-xl border',
                  isCorrect
                    ? 'bg-emerald-500/5 border-emerald-500/20'
                    : 'bg-red-500/5 border-red-500/20'
                )}
              >
                <p className="text-xs font-semibold text-white mb-1">
                  {isCorrect ? 'Correct!' : 'Incorrect'}
                </p>
                <p className="text-xs text-white leading-relaxed">{q.explanation}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex gap-2 pt-2">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={cn(
              'h-11 px-4 rounded-xl text-sm font-medium touch-manipulation flex items-center gap-1 border',
              currentIndex === 0
                ? 'bg-elec-gray border-white/5 text-white'
                : 'bg-elec-gray border-white/10 text-white'
            )}
          >
            <ChevronLeft className="h-4 w-4" />
            Prev
          </button>
          <button
            onClick={handleNext}
            disabled={!isAnswered}
            className={cn(
              'flex-1 h-11 rounded-xl text-sm font-bold touch-manipulation flex items-center justify-center gap-1',
              isAnswered
                ? 'bg-blue-500 text-black'
                : 'bg-elec-gray border border-white/5 text-white'
            )}
          >
            {currentIndex === questions.length - 1 ? 'See Results' : 'Next'}
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  // ── Results Phase ──────────────────────────────────────────

  if (phase === 'results') {
    const correct = questions.filter((q, i) => answers[i] === q.correctAnswer).length;
    const passed = score >= 70;
    const colour = passed ? '#22c55e' : score >= 50 ? '#f59e0b' : '#ef4444';

    // Score ring
    const ringSize = 120;
    const ringRadius = (ringSize - 12) / 2;
    const ringCirc = 2 * Math.PI * ringRadius;
    const ringOffset = ringCirc - (score / 100) * ringCirc;

    return (
      <div className="px-4 py-6 space-y-5 animate-fade-in">
        {/* Score ring */}
        <div className="flex flex-col items-center space-y-3">
          <div className="relative flex items-center justify-center">
            <svg width={ringSize} height={ringSize} className="-rotate-90">
              <circle
                cx={ringSize / 2}
                cy={ringSize / 2}
                r={ringRadius}
                fill="none"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="8"
              />
              <circle
                cx={ringSize / 2}
                cy={ringSize / 2}
                r={ringRadius}
                fill="none"
                stroke={colour}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={ringCirc}
                strokeDashoffset={ringOffset}
                style={{ transition: 'stroke-dashoffset 1s ease' }}
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-bold" style={{ color: colour }}>
                {score}%
              </span>
              <span className="text-[10px] text-white">
                {correct}/{questions.length}
              </span>
            </div>
          </div>

          <p className={cn('text-lg font-bold', passed ? 'text-emerald-400' : score >= 50 ? 'text-amber-400' : 'text-red-400')}>
            {passed ? 'Well done!' : score >= 50 ? 'Nearly there' : 'Keep studying'}
          </p>

          <div className="flex items-center gap-2 text-xs text-white">
            <Timer className="h-3 w-3" />
            {formatTime(elapsed)}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-1.5">
            <Target className="h-3.5 w-3.5" />
            Category Breakdown
          </h3>
          {Object.entries(categoryScores)
            .sort(([, a], [, b]) => {
              const aPct = a.total > 0 ? a.correct / a.total : 0;
              const bPct = b.total > 0 ? b.correct / b.total : 0;
              return aPct - bPct;
            })
            .map(([cat, s]) => {
              const pct = s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0;
              const barColour = pct >= 70 ? 'bg-emerald-500' : pct >= 50 ? 'bg-amber-500' : 'bg-red-500';
              return (
                <div key={cat} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white truncate">{cat}</span>
                    <span
                      className={cn(
                        'text-xs font-bold',
                        pct >= 70 ? 'text-emerald-400' : pct >= 50 ? 'text-amber-400' : 'text-red-400'
                      )}
                    >
                      {pct}% ({s.correct}/{s.total})
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className={cn('h-full rounded-full transition-all duration-700', barColour)}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
        </div>

        {/* Per-question Review */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
            Question Review
          </h3>
          <div className="space-y-1.5 max-h-[40vh] overflow-y-auto">
            {questions.map((q, i) => {
              const userAns = answers[i];
              const isCorrectQ = userAns === q.correctAnswer;
              return (
                <div
                  key={q.id}
                  className={cn(
                    'flex items-start gap-2.5 p-2.5 rounded-xl border',
                    isCorrectQ
                      ? 'border-emerald-500/20 bg-emerald-500/5'
                      : 'border-red-500/20 bg-red-500/5'
                  )}
                >
                  <div
                    className={cn(
                      'h-5 w-5 rounded-full flex items-center justify-center shrink-0 mt-0.5',
                      isCorrectQ ? 'bg-emerald-500/20' : 'bg-red-500/20'
                    )}
                  >
                    {isCorrectQ ? (
                      <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                    ) : (
                      <XCircle className="h-3 w-3 text-red-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-white line-clamp-2">{q.question}</p>
                    {!isCorrectQ && (
                      <p className="text-[10px] text-emerald-300 mt-0.5">
                        Correct: {q.options[q.correctAnswer]}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* AM2 Readiness note */}
        <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-3">
          <p className="text-[11px] text-blue-300">
            This score contributes 15% to your overall AM2 Readiness assessment under the
            "Knowledge" category.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={handleRetry}
            className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl bg-blue-500/15 text-blue-300 text-sm font-semibold border border-blue-400/20 touch-manipulation"
          >
            <RotateCcw className="w-4 h-4" />
            New Quiz
          </button>
        </div>
      </div>
    );
  }

  return null;
}

export default AM2KnowledgeQuiz;
