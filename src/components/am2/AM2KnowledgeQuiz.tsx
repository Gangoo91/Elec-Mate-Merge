/**
 * AM2KnowledgeQuiz
 *
 * Client-side knowledge test: the fixed AM2 bank plus generated calculation
 * questions whose numbers change every sitting (am2Paper / generatedQuestions).
 * Three phases: Setup → In Progress → Results
 * Saves the run to am2_mock_sessions (Section E on the AM2 home).
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import { ArrowRight, Check, RotateCcw, Timer, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AM2_EYEBROW, AM2_PRIMARY, AM2_SPLIT, AM2_TITLE } from '@/components/am2/layout';
import { computeCalibration, type Confidence } from './confidence';
import {
  am2QuestionBank,
  getQuestionsByCategory,
  type AM2Question,
} from '@/data/apprentice-courses/am2/questionBank';
import { buildAM2Paper } from '@/data/apprentice-courses/am2/am2Paper';
import {
  am2GeneratedFamilies,
  generateFamilyQuestion,
} from '@/data/apprentice-courses/am2/generatedQuestions';
import { shuffleAllQuestionOptions, createShuffleSalt } from '@/utils/shuffleOptions';
import { useAM2Readiness } from '@/hooks/am2/useAM2Readiness';
import { useAuth } from '@/contexts/AuthContext';
import { saveAM2Session } from '@/hooks/am2/saveAM2Session';
import { supabase } from '@/integrations/supabase/client';
import type { SupabaseClient } from '@supabase/supabase-js';

type Phase = 'setup' | 'quiz' | 'results';
type Difficulty = 'basic' | 'intermediate' | 'advanced' | 'mixed';

// Must match the bank's category strings exactly. These read 'BS7671 …' (no
// space) for months, so choosing any of the three BS 7671 areas drew nothing.
const CATEGORIES: AM2Question['category'][] = [
  'Health & Safety',
  'BS 7671 Fundamentals',
  'BS 7671 Selection & Erection',
  'BS 7671 Inspection & Testing',
  'Building Regulations',
  'Safe Isolation',
  'Fault Finding',
];

const QUESTION_COUNTS = [15, 20, 30];
/** The two papers NET sets for Section E (pre-assessment manuals):
 *  - AM2S v1 (March 2025) — for apprentices registered on the standard from
 *    September 2023: 45 multiple-choice questions, 1 hour 30 minutes.
 *  - AM2 (v2023.01): 30 multiple-choice questions, 1 hour. */
const PAPERS = {
  am2s: {
    label: 'AM2S v1',
    who: 'Apprentices on the standard, registered from September 2023',
    questions: 45,
    seconds: 90 * 60,
    time: '1½ hours',
    topics:
      'Health and safety, BS 7671, the Building Regulations, inspection and testing, installation practices, fault diagnosis, design and planning, and behaviours',
  },
  am2: {
    label: 'AM2',
    who: 'If your centre has booked you on the AM2',
    questions: 30,
    seconds: 60 * 60,
    time: '1 hour',
    topics: 'Health and safety, BS 7671 and the Building Regulations',
  },
} as const;
type PaperId = keyof typeof PAPERS;
const PAPER_KEY = 'am2-section-e-paper';
function savedPaper(): PaperId {
  try {
    return localStorage.getItem(PAPER_KEY) === 'am2' ? 'am2' : 'am2s';
  } catch {
    return 'am2s';
  }
}

const DIFFICULTY_WEIGHTS: Record<
  Difficulty,
  { basic: number; intermediate: number; advanced: number }
> = {
  basic: { basic: 0.8, intermediate: 0.2, advanced: 0 },
  intermediate: { basic: 0.2, intermediate: 0.6, advanced: 0.2 },
  advanced: { basic: 0.1, intermediate: 0.3, advanced: 0.6 },
  mixed: { basic: 0.3, intermediate: 0.4, advanced: 0.3 },
};

interface AM2KnowledgeQuizProps {
  /** Fires once the run is scored; `score` is that run's result (0–100). */
  onSessionComplete?: (score?: number) => void;
  /** The Mock AM2 day sits the paper as an exam. */
  forceExam?: boolean;
  /** From "Your weak spots": start with this topic selected. */
  initialTopic?: string;
}

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function AM2KnowledgeQuiz({
  onSessionComplete,
  forceExam,
  initialTopic,
}: AM2KnowledgeQuizProps) {
  const [phase, setPhase] = useState<Phase>('setup');
  // Practise: answer shown after each question. Exam: nothing until the end,
  // and only exam sittings count towards "ready".
  const [exam, setExam] = useState(!!forceExam);
  // Which paper you're sitting — AM2S v1 unless you've said AM2. Remembered.
  const [paperId, setPaperId] = useState<PaperId>(savedPaper);
  const paper = PAPERS[paperId];
  const EXAM_QUESTIONS = paper.questions;
  const EXAM_SECONDS = paper.seconds;
  const choosePaper = (id: PaperId) => {
    setPaperId(id);
    try {
      localStorage.setItem(PAPER_KEY, id);
    } catch {
      /* not remembered — fine */
    }
  };

  // Setup state
  const [difficulty, setDifficulty] = useState<Difficulty>('mixed');
  const [questionCount, setQuestionCount] = useState(20);
  const [selectedCategories, setSelectedCategories] = useState<AM2Question['category'][]>(() =>
    initialTopic && (CATEGORIES as string[]).includes(initialTopic)
      ? [initialTopic as AM2Question['category']]
      : []
  );

  // Quiz state
  const [questions, setQuestions] = useState<AM2Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [confidences, setConfidences] = useState<(Confidence | null)[]>([]);
  const [startTime, setStartTime] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  // Results state
  const [score, setScore] = useState(0);
  const [categoryScores, setCategoryScores] = useState<
    Record<string, { correct: number; total: number }>
  >({});

  const { saveScore } = useAM2Readiness();
  const { user } = useAuth();

  // Spaced repetition from your last three papers here: questions you got
  // wrong (and haven't got right since) come back; ones you've just seen rest.
  const [historyLoaded, setHistoryLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHistoryLoaded(true), 2000);
    return () => clearTimeout(t);
  }, []);
  const [history, setHistory] = useState<{ recentIds: number[]; missedIds: number[] }>({
    recentIds: [],
    missedIds: [],
  });
  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    void (supabase as unknown as SupabaseClient)
      .from('am2_mock_sessions')
      .select('session_data')
      .eq('user_id', user.id)
      .eq('session_type', 'knowledge_test')
      .eq('status', 'completed')
      .order('completed_at', { ascending: false })
      .limit(3)
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error || !data) return setHistoryLoaded(true);
        const recent = new Set<number>();
        const missed = new Set<number>();
        const rightSince = new Set<number>();
        for (const row of data as {
          session_data: { served?: number[]; mistakes?: { id?: number }[] } | null;
        }[]) {
          const served = row.session_data?.served ?? [];
          const wrong = new Set(
            (row.session_data?.mistakes ?? [])
              .map((m) => m.id)
              .filter((x): x is number => x != null)
          );
          served.forEach((id) => recent.add(id));
          wrong.forEach((id) => {
            if (!rightSince.has(id)) missed.add(id);
          });
          served.forEach((id) => {
            if (!wrong.has(id)) rightSince.add(id);
          });
        }
        setHistory({ recentIds: [...recent], missedIds: [...missed] });
        setHistoryLoaded(true);
      });
    return () => {
      cancelled = true;
    };
  }, [user]);
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
    // Exam is the real paper (the chosen NET paper's length and time, all
    // of the syllabus) — no picking the length, the difficulty or the topics.
    const weights = DIFFICULTY_WEIGHTS[exam ? 'mixed' : difficulty];
    const count = exam ? EXAM_QUESTIONS : questionCount;
    const topics = exam ? [] : selectedCategories;

    let pool: AM2Question[];
    if (topics.length > 0) {
      // The fixed questions in those areas plus one fresh draw from each
      // generated family in them.
      pool = topics.flatMap((cat) => [
        ...getQuestionsByCategory(cat),
        ...am2GeneratedFamilies
          .filter((f) => f.verified && f.category === cat)
          .map((f) => generateFamilyQuestion(f)),
      ]);
      // Apply difficulty filtering
      if (difficulty !== 'mixed') {
        const primary = pool.filter((q) => q.difficulty === difficulty);
        const rest = pool.filter((q) => q.difficulty !== difficulty);
        pool = [...shuffleArray(primary), ...shuffleArray(rest)];
      } else {
        pool = shuffleArray(pool);
      }
      pool = pool.slice(0, count);
    } else {
      pool = buildAM2Paper({
        count,
        weights,
        recentIds: history.recentIds,
        missedIds: history.missedIds,
      });
    }

    // Options shuffled per sitting: generated questions arrive key-first, and
    // a fixed question's options in the same place every time can be learnt
    // by position rather than by knowing the answer.
    pool = shuffleAllQuestionOptions(pool, createShuffleSalt());

    setQuestions(pool);
    setAnswers(new Array(pool.length).fill(null));
    setConfidences(new Array(pool.length).fill(null));
    setCurrentIndex(0);
    setStartTime(Date.now());
    setElapsed(0);
    setPhase('quiz');
  }, [difficulty, questionCount, selectedCategories, exam, history, EXAM_QUESTIONS]);

  const handleAnswer = useCallback(
    (optionIndex: number) => {
      // Practise locks the first answer (it's revealed). Exam: change it as
      // often as you like until you hand the paper in.
      if (answers[currentIndex] !== null && !exam) return;
      // A changed answer needs its own "how sure": the old one was for a
      // different choice and would skew the confidence check.
      if (answers[currentIndex] !== null && answers[currentIndex] !== optionIndex)
        setConfidences((prev) => {
          const next = [...prev];
          next[currentIndex] = null;
          return next;
        });
      setAnswers((prev) => {
        const next = [...prev];
        next[currentIndex] = optionIndex;
        return next;
      });
      // Reveal is deferred until confidence is picked.
    },
    [currentIndex, answers, exam]
  );

  const handleConfidence = useCallback(
    (c: Confidence) => {
      if (answers[currentIndex] === null) return;
      setConfidences((prev) => {
        const next = [...prev];
        next[currentIndex] = c;
        return next;
      });
    },
    [currentIndex, answers]
  );

  const finish = useCallback(() => {
    {
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

      if (exam) saveScore('knowledgeAssessment', pct);

      if (user) {
        const timeSpent = Math.floor((Date.now() - startTime) / 1000);
        const calib = computeCalibration(
          questions,
          (q, i) => answers[i] === q.correctAnswer,
          (i) => confidences[i] ?? undefined
        );
        saveAM2Session(user.id, {
          sessionType: 'knowledge_test',
          overallScore: pct,
          componentScores: {
            correct,
            total: questions.length,
            mode: exam ? 'assessment' : 'practise',
            paper: exam ? paperId : undefined,
            // Only a sitting of the whole paper counts towards "ready". Exam
            // mode is always the whole 30-question paper now.
            fullPaper: exam,
          },
          sessionData: {
            difficulty,
            categoryScores: catScores,
            calibration: calib,
            // What was served, so the next paper can rest these and bring back misses.
            served: questions.map((q) => q.id),
            // Topics missed, for "Your weak spots".
            mistakes: questions
              .filter((q, i) => answers[i] !== q.correctAnswer)
              .map((q) => ({ tag: `topic_${q.category}`, id: q.id })),
          },
          timeSpentSeconds: timeSpent,
          startedAt: new Date(startTime).toISOString(),
        });
      }

      onSessionComplete?.(pct);
      setPhase('results');
    }
  }, [
    questions,
    answers,
    confidences,
    saveScore,
    user,
    startTime,
    difficulty,
    onSessionComplete,
    exam,
    paperId,
  ]);

  const handleNext = useCallback(() => {
    if (currentIndex < questions.length - 1) setCurrentIndex((i) => i + 1);
    else finish();
  }, [currentIndex, questions.length, finish]);

  // Exam: when the hour runs out the paper is handed in.
  useEffect(() => {
    if (exam && phase === 'quiz' && elapsed >= EXAM_SECONDS) finish();
  }, [exam, phase, elapsed, finish, EXAM_SECONDS]);

  // The Mock day goes straight into the paper — no setup to fiddle with.
  const autoStarted = useRef(false);
  useEffect(() => {
    // Waits for your recent papers (or ~2 s) so the Mock day's paper rests
    // what you've just seen and brings back what you missed.
    if (forceExam && phase === 'setup' && historyLoaded && !autoStarted.current) {
      autoStarted.current = true;
      handleStart();
    }
  }, [forceExam, phase, handleStart, historyLoaded]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  }, [currentIndex]);

  const handleRetry = useCallback(() => {
    setPhase('setup');
  }, []);

  // ── Setup Phase ────────────────────────────────────────────

  if (phase === 'setup') {
    return (
      <div className={cn(AM2_SPLIT, 'py-2 animate-fade-in')}>
        <div className="space-y-5">
          <div>
            <p className={AM2_EYEBROW}>
              Section E · {paper.time} on the day ({paper.label})
            </p>
            <h1 className={AM2_TITLE}>Knowledge test</h1>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white">
              A multiple-choice paper drawn from {am2QuestionBank.length} questions on BS 7671,
              health and safety, building regulations and installation, plus calculations whose
              numbers change every sitting. Have your BS 7671, GN3, On-Site Guide and Building
              Regulations guide to hand.
            </p>
          </div>
          <p className="max-w-xl text-[13px] leading-relaxed text-white">
            Practice bar: 70% or better, twice running — exam sittings only.
          </p>
          {!forceExam && (
            <div className="space-y-2">
              <h3 className="text-[15px] font-semibold text-white">How do you want to sit it?</h3>
              <div className="grid gap-2 sm:grid-cols-2">
                {[
                  { v: false, t: 'Practise', d: 'See the answer and why after each question.' },
                  { v: true, t: 'Exam', d: 'No answers until the end. Counts towards “ready”.' },
                ].map((o) => (
                  <button
                    key={o.t}
                    type="button"
                    onClick={() => setExam(o.v)}
                    aria-pressed={exam === o.v}
                    className={cn(
                      'min-h-[64px] rounded-xl border px-4 py-3 text-left touch-manipulation',
                      exam === o.v
                        ? 'border-elec-yellow bg-elec-yellow text-black'
                        : 'border-white/[0.18] text-white hover:border-white/[0.35]'
                    )}
                  >
                    <span className="block text-[15px] font-bold">{o.t}</span>
                    <span className="block text-[12.5px]">{o.d}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
          {exam && (
            <div className="max-w-xl rounded-xl border border-white/[0.2] px-4 py-3 text-[13px] leading-relaxed text-white">
              <p className="font-semibold">Which paper are you sitting?</p>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                {(Object.keys(PAPERS) as PaperId[]).map((id) => (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={paperId === id}
                    onClick={() => choosePaper(id)}
                    className={cn(
                      'min-h-[60px] rounded-xl border px-3 py-2 text-left touch-manipulation',
                      paperId === id
                        ? 'border-elec-yellow bg-elec-yellow text-black'
                        : 'border-white/[0.18] text-white'
                    )}
                  >
                    <span className="block text-[14px] font-bold">
                      {PAPERS[id].label} · {PAPERS[id].questions} questions, {PAPERS[id].time}
                    </span>
                    <span className="block text-[12px]">{PAPERS[id].who}</span>
                  </button>
                ))}
              </div>
              <p className="mt-2">
                {paper.topics}. In this mock you can change answers and move between questions until
                you hand it in; when the time’s up it goes in on its own.
              </p>
              <p className="mt-1">
                On the day you’re given BS 7671, Guidance Note 3, the On-Site Guide and the IET
                Electrician’s Guide to the Building Regulations — have yours open.
              </p>
            </div>
          )}
          <button onClick={handleStart} className={AM2_PRIMARY}>
            {exam ? 'Start the exam' : 'Start the paper'}
          </button>
        </div>

        <div className={cn('space-y-6', exam && 'hidden')}>
          {/* Difficulty */}
          <div className="space-y-2">
            <h3 className="text-[15px] font-semibold text-white">Difficulty</h3>
            <div className="grid grid-cols-2 gap-2 xl:grid-cols-4">
              {(['basic', 'intermediate', 'advanced', 'mixed'] as Difficulty[]).map((d) => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={cn(
                    'h-11 rounded-xl text-sm font-medium touch-manipulation transition-colors border',
                    difficulty === d
                      ? 'bg-elec-yellow border-elec-yellow text-black font-semibold'
                      : 'bg-white/[0.06] border-white/[0.12] text-white'
                  )}
                >
                  {d === 'mixed' ? 'Mixed (Recommended)' : d.charAt(0).toUpperCase() + d.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Question Count */}
          <div className="space-y-2">
            <h3 className="text-[15px] font-semibold text-white">Questions</h3>
            <div className="flex gap-2">
              {QUESTION_COUNTS.map((c) => (
                <button
                  key={c}
                  onClick={() => setQuestionCount(c)}
                  className={cn(
                    'flex-1 h-11 rounded-xl text-sm font-medium touch-manipulation transition-colors border',
                    questionCount === c
                      ? 'bg-elec-yellow border-elec-yellow text-black font-semibold'
                      : 'bg-white/[0.06] border-white/[0.12] text-white'
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <h3 className="text-[15px] font-semibold text-white">
              Topics{' '}
              <span className="text-[12.5px] font-normal text-white">— leave empty for all</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className={cn(
                    'px-3 h-11 rounded-full text-xs font-medium touch-manipulation transition-colors border',
                    selectedCategories.includes(cat)
                      ? 'bg-elec-yellow border-elec-yellow text-black font-semibold'
                      : 'bg-white/[0.06] border-white/[0.12] text-white'
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Quiz Phase ─────────────────────────────────────────────

  if (phase === 'quiz' && questions.length > 0) {
    return (
      <KnowledgeQuestion
        exam={exam}
        questions={questions}
        index={currentIndex}
        answers={answers}
        confidences={confidences}
        elapsed={elapsed}
        onAnswer={handleAnswer}
        onConfidence={handleConfidence}
        onNext={handleNext}
        onPrev={handlePrev}
        onJump={setCurrentIndex}
        secondsLeft={exam ? Math.max(0, EXAM_SECONDS - elapsed) : undefined}
      />
    );
  }

  if (phase === 'results') {
    const correct = questions.filter((q, i) => answers[i] === q.correctAnswer).length;
    const atBar = score >= 70;
    const calibration = computeCalibration(
      questions,
      (q, i) => answers[i] === q.correctAnswer,
      (i) => confidences[i] ?? undefined
    );
    const missed = questions
      .map((q, i) => ({ q, i }))
      .filter(({ q, i }) => answers[i] !== q.correctAnswer);
    const mins = Math.floor(elapsed / 60);
    const secs = elapsed % 60;
    return (
      <div className="mx-auto w-full max-w-[1100px] space-y-8 py-4 sm:py-6 animate-fade-in">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[12px] font-semibold text-white">
              Section E · knowledge test · done
            </p>
            <h1 className="mt-1 text-[28px] font-bold leading-tight tracking-tight text-white lg:text-[34px]">
              {correct} of {questions.length} right
            </h1>
            <p className="mt-1 text-[14px] text-white">
              <span className={cn('text-[20px] font-bold tabular-nums', 'text-white')}>
                {score}%
              </span>{' '}
              · {mins}m {secs}s · {atBar ? 'at the bar (70%)' : 'below the bar (70%)'}
            </p>
          </div>
          {!forceExam && (
            <button
              type="button"
              onClick={handleRetry}
              className="inline-flex h-12 items-center gap-2 self-start rounded-xl bg-elec-yellow px-6 text-[14.5px] font-bold text-black touch-manipulation sm:self-auto"
            >
              <RotateCcw className="h-4 w-4" /> Another paper
            </button>
          )}
        </div>

        {calibration.total > 0 && (
          <section className="space-y-3">
            <h2 className="text-[15px] font-semibold tracking-tight text-white">
              How sure you were
            </h2>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {[
                { v: calibration.lockedIn, l: 'Right and certain', tone: 'text-white' },
                {
                  v: calibration.overconfident,
                  l: 'Wrong but certain',
                  tone: 'text-white',
                },
                {
                  v: calibration.lucky,
                  l: 'Right on a guess',
                  tone: 'text-white',
                },
              ].map((t) => (
                <div key={t.l} className={cn(K_SURFACE, 'px-4 py-3.5')}>
                  <p className={cn('text-[28px] font-bold leading-none tabular-nums', t.tone)}>
                    {t.v}
                  </p>
                  <p className="mt-1.5 text-[12px] font-medium text-white">{t.l}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="space-y-3">
          <h2 className="text-[15px] font-semibold tracking-tight text-white">By topic</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {Object.entries(categoryScores)
              .sort((x, y) => x[1].correct / x[1].total - y[1].correct / y[1].total)
              .map(([cat, { correct: c, total: t }]) => {
                const pct = Math.round((c / t) * 100);
                return (
                  <div key={cat} className={cn(K_SURFACE, 'px-4 py-3')}>
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="text-[13.5px] font-semibold text-white">{cat}</p>
                      <p className="text-[13px] font-semibold tabular-nums text-white">
                        {c}/{t}
                      </p>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
                      <div
                        className={cn(
                          'h-full rounded-full',
                          pct >= 70 ? 'bg-emerald-400' : 'bg-amber-400'
                        )}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </section>

        {missed.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-[15px] font-semibold tracking-tight text-white">
              The {missed.length} you missed
            </h2>
            <ul className={cn(K_SURFACE, 'divide-y divide-white/[0.08] overflow-hidden')}>
              {missed.map(({ q, i }) => (
                <li key={q.id ?? i} className="space-y-1.5 px-4 py-4 sm:px-5">
                  <p className="text-[12px] font-semibold text-white">
                    {q.category}
                    {confidences[i] === 'certain' && (
                      <span className="ml-2 text-white">· you were certain</span>
                    )}
                  </p>
                  <p className="text-[14.5px] font-semibold leading-snug text-white">
                    {q.question}
                  </p>
                  <p className="text-[13px] text-white">
                    <span className="font-semibold text-white">Answer:</span>{' '}
                    {q.options[q.correctAnswer]}
                    {answers[i] != null && (
                      <span className="ml-1">
                        · you said <span className="text-white">{q.options[answers[i]!]}</span>
                      </span>
                    )}
                  </p>
                  <p className="text-[13px] leading-relaxed text-white">{q.explanation}</p>
                  {q.reference && (
                    <p className="text-[12.5px] font-semibold text-white">
                      Find it in: {q.reference}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    );
  }

  return null;
}

const K_SURFACE =
  'rounded-2xl border border-white/[0.16] bg-gradient-to-br from-white/[0.11] via-white/[0.065] to-white/[0.04] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.13),0_2px_10px_-4px_rgba(0,0,0,0.7)]';

const K_CONFIDENCE: Array<{ id: Confidence; label: string; sub: string }> = [
  { id: 'guess', label: 'Guess', sub: 'not sure' },
  { id: 'likely', label: 'Pretty sure', sub: 'likely right' },
  { id: 'certain', label: 'Certain', sub: 'would bet on it' },
];

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

/** The knowledge-paper question screen. Keyboard: 1–4 answer, 1–3 sure, Enter next. */
function KnowledgeQuestion({
  questions,
  index,
  answers,
  confidences,
  elapsed,
  onAnswer,
  onConfidence,
  onNext,
  onPrev,
  onJump,
  secondsLeft,
  exam = false,
}: {
  questions: AM2Question[];
  index: number;
  answers: (number | null)[];
  confidences: (Confidence | null)[];
  elapsed: number;
  onAnswer: (i: number) => void;
  onConfidence: (c: Confidence) => void;
  onNext: () => void;
  onPrev: () => void;
  /** Exam: no answer shown until the end of the paper. */
  exam?: boolean;
  /** Exam: go straight to a question. */
  onJump?: (i: number) => void;
  /** Exam: time left of the hour. */
  secondsLeft?: number;
}) {
  const unanswered = answers.filter((a) => a == null).length;
  const [showGrid, setShowGrid] = useState(false);
  const [confirmHandIn, setConfirmHandIn] = useState(false);
  const isLast = index === questions.length - 1;
  // Exam: handing in is for good — on the last question, ask first.
  const next = useCallback(
    () => (exam && isLast ? setConfirmHandIn(true) : onNext()),
    [exam, isLast, onNext]
  );
  const q = questions[index];
  const answer = answers[index];
  const confidence = confidences[index];
  const ready = answer != null && confidence != null;
  const revealed = ready && !exam;
  const isCorrect = revealed && answer === q.correctAnswer;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      // The hand-in sheet is open: only Escape, to close it. Keys mustn't
      // answer the question behind it (Enter on its buttons still works).
      if (confirmHandIn) {
        if (e.key === 'Escape') setConfirmHandIn(false);
        return;
      }
      const n = Number(e.key);
      if (answer == null && n >= 1 && n <= q.options.length) onAnswer(n - 1);
      else if (answer != null && confidence == null && n >= 1 && n <= 3)
        onConfidence(K_CONFIDENCE[n - 1].id);
      else if ((ready || exam) && e.key === 'Enter') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [q, answer, confidence, ready, exam, onAnswer, onConfidence, next, confirmHandIn]);

  return (
    <div className="mx-auto w-full max-w-[1300px] space-y-5 py-3 sm:py-5 animate-fade-in">
      <div className="flex items-center gap-4">
        <div className="flex flex-1 gap-[3px]">
          {questions.map((qq, i) =>
            exam && onJump ? (
              // Exam: every question reachable — answered ones filled, this one
              // ringed. A laptop has room for the row; a phone gets a thin bar
              // and the "All questions" grid below, with buttons big enough to tap.
              <span key={qq.id ?? i} className="flex min-w-0 flex-1">
                <span
                  className={cn(
                    'h-1.5 flex-1 self-center rounded-full xl:hidden',
                    answers[i] != null ? 'bg-elec-yellow' : i === index ? 'bg-white' : 'bg-white/15'
                  )}
                />
                <button
                  type="button"
                  onClick={() => onJump(i)}
                  aria-label={`Question ${i + 1}${answers[i] != null ? ', answered' : ''}`}
                  className={cn(
                    'hidden h-9 min-w-0 flex-1 rounded-md border text-[11px] font-bold tabular-nums touch-manipulation xl:block',
                    answers[i] != null
                      ? 'border-elec-yellow bg-elec-yellow text-black'
                      : 'border-white/[0.2] text-white',
                    i === index && 'ring-2 ring-white ring-offset-1 ring-offset-black'
                  )}
                >
                  {i + 1}
                </button>
              </span>
            ) : (
              <span
                key={qq.id ?? i}
                className={cn(
                  'h-1.5 flex-1 rounded-full',
                  confidences[i] != null
                    ? exam
                      ? 'bg-elec-yellow' // answered — right or wrong stays hidden until the end
                      : answers[i] === qq.correctAnswer
                        ? 'bg-emerald-400'
                        : 'bg-red-400'
                    : i === index
                      ? 'bg-white'
                      : 'bg-white/15'
                )}
              />
            )
          )}
        </div>
        <span className="flex shrink-0 items-center gap-1.5 text-[13px] font-semibold tabular-nums text-white">
          <Timer className="h-3.5 w-3.5" />
          {secondsLeft != null
            ? `${Math.floor(secondsLeft / 60)}:${String(secondsLeft % 60).padStart(2, '0')} left`
            : `${Math.floor(elapsed / 60)}:${String(elapsed % 60).padStart(2, '0')}`}
        </span>
        <span className="shrink-0 text-[13px] font-semibold tabular-nums text-white">
          {index + 1} / {questions.length}
        </span>
      </div>
      {exam && onJump && (
        <div className="xl:hidden">
          <button
            type="button"
            onClick={() => setShowGrid((v) => !v)}
            aria-expanded={showGrid}
            className="inline-flex h-11 items-center rounded-xl border border-white/[0.2] px-4 text-[13px] font-semibold text-white touch-manipulation"
          >
            {showGrid
              ? 'Hide questions'
              : `All questions · ${questions.length - unanswered} answered`}
          </button>
          {showGrid && (
            <div className="mt-2 grid grid-cols-6 gap-2">
              {questions.map((qq, i) => (
                <button
                  key={qq.id ?? i}
                  type="button"
                  onClick={() => {
                    onJump(i);
                    setShowGrid(false);
                  }}
                  aria-label={`Question ${i + 1}${answers[i] != null ? ', answered' : ''}`}
                  className={cn(
                    'h-11 rounded-lg border text-[13px] font-bold tabular-nums touch-manipulation',
                    answers[i] != null
                      ? 'border-elec-yellow bg-elec-yellow text-black'
                      : 'border-white/[0.2] text-white',
                    i === index && 'ring-2 ring-white ring-offset-1 ring-offset-black'
                  )}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-[minmax(0,1fr)] gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start lg:gap-8">
        <div className={cn(K_SURFACE, 'border-elec-yellow/40 p-5 sm:p-7 lg:sticky lg:top-4')}>
          <p className="text-[12px] font-semibold text-white">
            {q.category} · {q.difficulty}
          </p>
          <p className="mt-3 text-[17px] font-semibold leading-relaxed text-white sm:text-[19px]">
            {q.question}
          </p>
          {index > 0 && (
            <button
              type="button"
              onClick={onPrev}
              className="mt-5 h-11 text-[13px] font-medium text-white touch-manipulation"
            >
              ← Previous question
            </button>
          )}
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            {q.options.map((opt, i) => {
              const isRight = i === q.correctAnswer;
              const isPick = i === answer;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => onAnswer(i)}
                  disabled={answer != null && !exam}
                  className={cn(
                    'flex min-h-[60px] w-full items-center gap-3.5 rounded-2xl border px-4 py-3 text-left transition-colors touch-manipulation',
                    answer == null &&
                      'border-white/[0.18] bg-gradient-to-br from-white/[0.11] via-white/[0.065] to-white/[0.04] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.13),0_2px_10px_-4px_rgba(0,0,0,0.7)] hover:border-elec-yellow/60 hover:from-white/[0.15] active:scale-[0.99]',
                    answer != null &&
                      !revealed &&
                      (isPick
                        ? 'border-elec-yellow bg-gradient-to-br from-white/[0.11] via-white/[0.065] to-white/[0.04] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.13),0_2px_10px_-4px_rgba(0,0,0,0.7)]'
                        : 'border-white/[0.12] bg-gradient-to-br from-white/[0.11] via-white/[0.065] to-white/[0.04] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.13),0_2px_10px_-4px_rgba(0,0,0,0.7)]'),
                    revealed &&
                      isRight &&
                      'border-emerald-400 bg-gradient-to-br from-white/[0.11] via-white/[0.065] to-white/[0.04] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.13),0_2px_10px_-4px_rgba(0,0,0,0.7)]',
                    revealed &&
                      !isRight &&
                      isPick &&
                      'border-red-400 bg-gradient-to-br from-white/[0.11] via-white/[0.065] to-white/[0.04] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.13),0_2px_10px_-4px_rgba(0,0,0,0.7)]',
                    revealed &&
                      !isRight &&
                      !isPick &&
                      'border-white/[0.12] bg-gradient-to-br from-white/[0.11] via-white/[0.065] to-white/[0.04] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.13),0_2px_10px_-4px_rgba(0,0,0,0.7)]'
                  )}
                >
                  <span
                    className={cn(
                      'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-[13px] font-bold',
                      revealed && isRight
                        ? 'border-emerald-400 bg-emerald-400 text-black'
                        : revealed && isPick
                          ? 'border-red-400 bg-red-400 text-black'
                          : isPick
                            ? 'border-elec-yellow bg-elec-yellow text-black'
                            : 'border-white/[0.3] bg-white/[0.08] text-white'
                    )}
                  >
                    {revealed && isRight ? (
                      <Check className="h-4 w-4" />
                    ) : revealed && isPick ? (
                      <X className="h-4 w-4" />
                    ) : (
                      LETTERS[i]
                    )}
                  </span>
                  <span className="text-[15px] leading-snug text-white">{opt}</span>
                </button>
              );
            })}
          </div>

          {answer != null && confidence == null && (
            <div className="space-y-2">
              <p className="text-[13.5px] font-semibold text-white">How sure are you?</p>
              <div className="grid grid-cols-3 gap-2">
                {K_CONFIDENCE.map((c, i) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => onConfidence(c.id)}
                    className="flex min-h-[56px] flex-col items-center justify-center rounded-xl border border-white/[0.18] bg-gradient-to-br from-white/[0.11] via-white/[0.065] to-white/[0.04] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.13),0_2px_10px_-4px_rgba(0,0,0,0.7)] px-2 py-2 text-center transition-colors hover:border-elec-yellow/60 active:scale-[0.98] touch-manipulation"
                  >
                    <span className="text-[13.5px] font-semibold text-white">
                      <span className="mr-1 hidden text-[11px] lg:inline">{i + 1}</span>
                      {c.label}
                    </span>
                    <span className="text-[11px] text-white">{c.sub}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {exam && (
            <>
              {index === questions.length - 1 && unanswered > 0 && (
                <p className="text-[13px] font-semibold text-white">
                  {unanswered} question{unanswered === 1 ? '' : 's'} not answered — tap a number
                  above to go back, or hand it in as it is.
                </p>
              )}
              <button
                type="button"
                onClick={next}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-elec-yellow text-[15px] font-bold text-black touch-manipulation active:scale-[0.98] sm:w-auto sm:px-8"
              >
                {index < questions.length - 1
                  ? answer == null
                    ? 'Skip for now'
                    : 'Next question'
                  : 'Hand the paper in'}
                <ArrowRight className="h-4 w-4" />
                <span className="hidden text-[11px] font-semibold lg:inline">Enter</span>
              </button>
            </>
          )}

          {revealed && (
            <div
              className={cn(
                K_SURFACE,
                'space-y-3 p-5',
                isCorrect ? 'border-emerald-400/60' : 'border-red-400/60'
              )}
            >
              <p className={cn('text-[15px] font-bold', 'text-white')}>
                {isCorrect
                  ? confidence === 'guess'
                    ? 'Right — but you guessed'
                    : 'Right'
                  : confidence === 'certain'
                    ? 'Wrong while certain — worth going back over'
                    : `The answer is ${LETTERS[q.correctAnswer]}`}
              </p>
              <p className="text-[14px] leading-relaxed text-white">{q.explanation}</p>
              {/* NET's top Section E error is not knowing where to look — so every
                  answer says where it's found, not just what it is. */}
              {q.reference ? (
                <p className="text-[13px] font-semibold text-white">Find it in: {q.reference}</p>
              ) : (
                q.section && <p className="text-[12.5px] font-medium text-white">{q.section}</p>
              )}
              <button
                type="button"
                onClick={onNext}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-elec-yellow text-[15px] font-bold text-black touch-manipulation active:scale-[0.98] sm:w-auto sm:px-8"
              >
                {index < questions.length - 1 ? 'Next question' : 'See how you did'}
                <ArrowRight className="h-4 w-4" />
                <span className="hidden text-[11px] font-semibold lg:inline">Enter</span>
              </button>
            </div>
          )}
        </div>
      </div>
      {confirmHandIn && (
        <div
          className="fixed inset-0 z-50 flex items-end bg-black/70"
          role="dialog"
          aria-modal="true"
          aria-label="Hand the paper in?"
          onClick={() => setConfirmHandIn(false)}
        >
          <div
            className="w-full rounded-t-2xl border-t border-white/[0.12] bg-[hsl(0_0%_9%)] px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-5 sm:mx-auto sm:mb-6 sm:max-w-lg sm:rounded-2xl sm:border"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-[17px] font-bold text-white">Hand the paper in?</p>
            <p className="mt-1.5 text-[13.5px] text-white">
              {unanswered
                ? `${unanswered} question${unanswered === 1 ? '' : 's'} not answered:`
                : 'Every question is answered. You can’t change anything after this.'}
            </p>
            {unanswered > 0 && onJump && (
              <div className="mt-2 flex flex-wrap gap-2">
                {answers.map((a, i) =>
                  a == null ? (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setConfirmHandIn(false);
                        onJump(i);
                      }}
                      className="h-11 min-w-11 rounded-lg border border-white/[0.25] px-3 text-[13px] font-bold text-white touch-manipulation"
                    >
                      {i + 1}
                    </button>
                  ) : null
                )}
              </div>
            )}
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button
                type="button"
                autoFocus
                onClick={() => setConfirmHandIn(false)}
                className="h-12 rounded-xl border border-white/[0.22] text-[14.5px] font-semibold text-white touch-manipulation"
              >
                Keep going
              </button>
              <button
                type="button"
                onClick={() => {
                  setConfirmHandIn(false);
                  onNext();
                }}
                className="h-12 rounded-xl bg-elec-yellow text-[14.5px] font-bold text-black touch-manipulation"
              >
                Hand it in
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AM2KnowledgeQuiz;
