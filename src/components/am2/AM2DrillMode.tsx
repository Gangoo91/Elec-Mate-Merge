/**
 * AM2DrillMode
 *
 * Adaptive drill — surfaces the regulations this apprentice is currently
 * weakest on and quizzes them on those first. Read side of the loop
 * driven by `am2_reg_attempts`; write side is `useRegAttempts`, same as
 * the standalone BS 7671 spot check.
 *
 * Selection priority (higher = sooner):
 *   100 — wrong + certain (overconfident, the dangerous gap)
 *    70 — last attempt wrong (any confidence)
 *    50 — overdue per next_review_at
 *    30 — right + guess (lucky — not actually known)
 *    20 — untested (only used as filler if priority pool is small)
 *
 * The session is short (default 8 questions) — drill is meant to be
 * tight, daily, and repeatable. Long sessions belong in the standalone
 * BS 7671 spot check or mock day.
 */

import { useCallback, useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  BookOpen,
  Check,
  X,
  RefreshCw,
  Trophy,
  Loader2,
  AlertTriangle,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useAM2Readiness } from '@/hooks/am2/useAM2Readiness';
import { useRegAttempts } from '@/hooks/am2/useRegAttempts';
import {
  ConfidencePicker,
  CalibrationPill,
  computeCalibration,
  getCalibrationOutcome,
  type Confidence,
} from './confidence';

const QUESTION_COUNT = 8;

interface AttemptRow {
  regulation_id: string;
  reg_number: string;
  last_correct: boolean;
  last_confidence: 'guess' | 'likely' | 'certain' | null;
  next_review_at: string;
  incorrect_streak: number;
}

interface RegRow {
  id: string;
  reg_number: string;
  title: string | null;
  part: string | null;
}

interface FacetRow {
  id: string;
  content: string;
  regulation_id: string | null;
}

type PriorityReason = 'blind-spot' | 'recently-wrong' | 'overdue' | 'lucky' | 'untested';

interface DrillQuestion {
  facetId: string;
  prompt: string;
  rawContent: string;
  reasonLabel: PriorityReason;
  reasonText: string;
  correctReg: RegRow;
  options: Array<{ id: string; reg_number: string }>;
}

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** Same redaction logic as Bs7671RagQuiz — keep the answer out of the prompt. */
function redactRegNumbers(text: string, regNumber: string): string {
  if (!text) return '';
  let out = text.replace(new RegExp(regNumber.replace(/\./g, '\\.'), 'g'), '[regulation]');
  out = out.replace(/\b\d{3}\.\d+(?:\.\d+)*\b/g, '[regulation]');
  out = out.replace(/Regulation\s+\[regulation\]/gi, '[regulation]');
  out = out.replace(/Reg\.?\s+\[regulation\]/gi, '[regulation]');
  return out;
}

/** Rank an attempt row by drill priority. */
function priorityOf(row: AttemptRow): { score: number; reason: PriorityReason; reasonText: string } {
  if (!row.last_correct && row.last_confidence === 'certain') {
    return { score: 100, reason: 'blind-spot', reasonText: 'Wrong while certain — dangerous gap' };
  }
  if (!row.last_correct) {
    return { score: 70, reason: 'recently-wrong', reasonText: 'You got this wrong last time' };
  }
  if (new Date(row.next_review_at) <= new Date()) {
    return { score: 50, reason: 'overdue', reasonText: 'Time to revisit' };
  }
  if (row.last_correct && row.last_confidence === 'guess') {
    return { score: 30, reason: 'lucky', reasonText: 'You guessed right last time' };
  }
  // Not in the priority pool — well-known reg.
  return { score: 0, reason: 'untested', reasonText: '' };
}

const REASON_TONE: Record<PriorityReason, string> = {
  'blind-spot': 'text-red-300 border-red-400/30 bg-red-500/[0.08]',
  'recently-wrong': 'text-amber-300 border-amber-400/30 bg-amber-500/[0.08]',
  overdue: 'text-elec-yellow border-elec-yellow/30 bg-elec-yellow/[0.06]',
  lucky: 'text-amber-300 border-amber-400/25 bg-amber-500/[0.06]',
  untested: 'text-white/55 border-white/[0.08] bg-white/[0.02]',
};

interface AM2DrillModeProps {
  onExit?: () => void;
  onSessionComplete?: () => void;
}

export function AM2DrillMode({ onExit, onSessionComplete }: AM2DrillModeProps) {
  const { user } = useAuth();
  const { saveScore } = useAM2Readiness();
  const { recordAttempt } = useRegAttempts();

  const [phase, setPhase] = useState<'loading' | 'empty' | 'quiz' | 'results' | 'error'>('loading');
  const [error, setError] = useState<string | null>(null);
  const [questions, setQuestions] = useState<DrillQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [confidences, setConfidences] = useState<Record<number, Confidence>>({});
  const [revealed, setRevealed] = useState(false);
  const [startedAt, setStartedAt] = useState(Date.now());

  const buildOptions = useCallback(
    (correct: RegRow, regsByPart: Map<string, RegRow[]>, allRegs: RegRow[]) => {
      const partRegs = correct.part ? regsByPart.get(correct.part) ?? [] : [];
      const pool = partRegs.length >= 4 ? partRegs : allRegs;
      const distractors = shuffle(pool.filter((r) => r.id !== correct.id)).slice(0, 3);
      const opts = [{ id: correct.id, reg_number: correct.reg_number }];
      for (const d of distractors) opts.push({ id: d.id, reg_number: d.reg_number });
      return shuffle(opts);
    },
    []
  );

  const loadDrill = useCallback(async () => {
    if (!user?.id) {
      setPhase('empty');
      return;
    }
    setPhase('loading');
    setError(null);
    try {
      // 1. Pull this user's attempt rows.
      const { data: attemptData, error: attemptErr } = await supabase
        .from('am2_reg_attempts')
        .select('regulation_id, reg_number, last_correct, last_confidence, next_review_at, incorrect_streak')
        .eq('user_id', user.id)
        .order('last_asked_at', { ascending: false })
        .limit(80);
      if (attemptErr) throw attemptErr;
      const attempts = (attemptData ?? []) as AttemptRow[];

      // 2. Rank by drill priority and take top N.
      const ranked = attempts
        .map((row) => ({ row, ...priorityOf(row) }))
        .filter((r) => r.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, QUESTION_COUNT);

      if (ranked.length === 0) {
        // No drill candidates yet — apprentice hasn't generated any
        // weakness data. Send them to the standalone spot check first.
        setPhase('empty');
        return;
      }

      // 3. Pull the regulations for the picked attempts.
      const regIds = ranked.map((r) => r.row.regulation_id);
      const { data: regData, error: regErr } = await supabase
        .from('bs7671_regulations')
        .select('id, reg_number, title, part')
        .in('id', regIds);
      if (regErr) throw regErr;
      const allRegs = (regData ?? []) as RegRow[];
      const regById = new Map(allRegs.map((r) => [r.id, r]));

      // 4. Pull facets for those regs — pick one facet per reg as the prompt.
      const { data: facetData, error: facetErr } = await supabase
        .from('bs7671_facets')
        .select('id, content, regulation_id')
        .in('regulation_id', regIds)
        .gte('confidence_score', 0.5)
        .limit(200);
      if (facetErr) throw facetErr;
      const facetsByReg = new Map<string, FacetRow[]>();
      for (const f of (facetData ?? []) as FacetRow[]) {
        if (!f.regulation_id) continue;
        if (!f.content || f.content.length < 100) continue;
        const arr = facetsByReg.get(f.regulation_id) ?? [];
        arr.push(f);
        facetsByReg.set(f.regulation_id, arr);
      }

      // 5. Distractor pool — fetch some regs from each part for plausible options.
      const parts = Array.from(
        new Set(allRegs.map((r) => r.part).filter((p): p is string => !!p))
      );
      const regsByPart = new Map<string, RegRow[]>();
      if (parts.length > 0) {
        const { data: poolData } = await supabase
          .from('bs7671_regulations')
          .select('id, reg_number, title, part')
          .in('part', parts)
          .limit(300);
        for (const r of (poolData ?? []) as RegRow[]) {
          if (!r.part) continue;
          const arr = regsByPart.get(r.part) ?? [];
          arr.push(r);
          regsByPart.set(r.part, arr);
        }
      }

      // 6. Build MCQ for each ranked reg.
      const built: DrillQuestion[] = [];
      for (const r of ranked) {
        const reg = regById.get(r.row.regulation_id);
        if (!reg) continue;
        const facetPool = facetsByReg.get(reg.id) ?? [];
        if (facetPool.length === 0) continue;
        const facet = facetPool[Math.floor(Math.random() * facetPool.length)];
        const opts = buildOptions(reg, regsByPart, allRegs);
        if (opts.length < 4) continue;
        built.push({
          facetId: facet.id,
          prompt: redactRegNumbers(facet.content, reg.reg_number),
          rawContent: facet.content,
          reasonLabel: r.reason,
          reasonText: r.reasonText,
          correctReg: reg,
          options: opts,
        });
      }

      if (built.length === 0) {
        throw new Error('Could not build any drill questions — RAG pool too thin.');
      }

      setQuestions(built);
      setCurrentIndex(0);
      setAnswers({});
      setConfidences({});
      setRevealed(false);
      setStartedAt(Date.now());
      setPhase('quiz');
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      setPhase('error');
    }
  }, [user?.id, buildOptions]);

  useEffect(() => {
    void loadDrill();
  }, [loadDrill]);

  const currentQ = questions[currentIndex];
  const userAnswer = answers[currentIndex];
  const isAnswered = userAnswer != null;
  const userConfidence = confidences[currentIndex];
  const hasConfidence = userConfidence != null;
  const isCorrect = isAnswered && currentQ && userAnswer === currentQ.correctReg.id;
  const outcome = revealed && currentQ ? getCalibrationOutcome(!!isCorrect, userConfidence) : null;

  const handleAnswer = (optionId: string) => {
    if (isAnswered) return;
    setAnswers((a) => ({ ...a, [currentIndex]: optionId }));
  };

  const handleConfidence = (c: Confidence) => {
    if (!isAnswered || !currentQ) return;
    setConfidences((prev) => ({ ...prev, [currentIndex]: c }));
    setRevealed(true);
    const wasCorrect = userAnswer === currentQ.correctReg.id;
    void recordAttempt({
      regulationId: currentQ.correctReg.id,
      regNumber: currentQ.correctReg.reg_number,
      correct: wasCorrect,
      confidence: c,
    });
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setRevealed(false);
    } else {
      let correct = 0;
      questions.forEach((q, i) => {
        if (answers[i] === q.correctReg.id) correct += 1;
      });
      const pct = Math.round((correct / questions.length) * 100);
      if (user) void saveScore('knowledgeAssessment', pct);
      setPhase('results');
      onSessionComplete?.();
    }
  };

  /* ─── Renders ──────────────────────────────────────────────────────── */

  if (phase === 'loading') {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4 py-12">
        <Loader2 className="h-6 w-6 animate-spin text-elec-yellow" />
        <div className="text-center max-w-xs">
          <p className="text-[13px] text-white font-medium">Picking your weakest regs…</p>
          <p className="mt-1 text-[11.5px] text-white/55">
            Ranking by what'll move you fastest.
          </p>
        </div>
      </div>
    );
  }

  if (phase === 'empty') {
    return (
      <div className="mx-auto max-w-md px-4 sm:px-6 py-10 sm:py-14 text-center space-y-4">
        <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-elec-yellow/85">
          Adaptive drill
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white leading-tight">
          Nothing to drill yet.
        </h1>
        <p className="text-[13px] text-white/65 leading-relaxed">
          Run a BS 7671 spot check first. As soon as you've answered a few regs, drill mode
          ranks them by where you're weakest and feeds you the ones that'll move the needle.
        </p>
        {onExit && (
          <button
            type="button"
            onClick={onExit}
            className="inline-flex items-center gap-1.5 h-11 px-5 rounded-xl bg-elec-yellow text-black font-semibold text-[13px] touch-manipulation active:scale-[0.98]"
          >
            Back to AM2
          </button>
        )}
      </div>
    );
  }

  if (phase === 'error') {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4 py-12 text-center">
        <div className="h-12 w-12 rounded-2xl bg-red-500/[0.08] border border-red-500/30 flex items-center justify-center">
          <X className="h-6 w-6 text-red-300" />
        </div>
        <div className="max-w-xs">
          <p className="text-[14px] font-semibold text-white">Couldn't load drill</p>
          <p className="mt-1 text-[12px] text-white/65">{error}</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={loadDrill}
            className="inline-flex items-center gap-1.5 h-11 px-4 rounded-xl bg-elec-yellow text-black font-semibold text-[13px] touch-manipulation"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Retry
          </button>
          {onExit && (
            <button
              type="button"
              onClick={onExit}
              className="h-11 px-4 rounded-xl border border-white/[0.10] bg-white/[0.04] text-white/70 text-[13px] touch-manipulation"
            >
              Back
            </button>
          )}
        </div>
      </div>
    );
  }

  if (phase === 'results') {
    const correctCount = questions.filter((q, i) => answers[i] === q.correctReg.id).length;
    const pct = Math.round((correctCount / questions.length) * 100);
    const elapsed = Math.round((Date.now() - startedAt) / 1000);
    const tone = pct >= 70 ? 'text-emerald-300' : pct >= 50 ? 'text-amber-300' : 'text-red-300';
    const verdict = pct >= 70 ? 'Strong' : pct >= 50 ? 'Catching up' : 'Needs work';
    const calibration = computeCalibration(
      questions,
      (q, i) => answers[i] === q.correctReg.id,
      (i) => confidences[i]
    );
    return (
      <div className="mx-auto max-w-2xl px-4 sm:px-6 py-6 sm:py-10 space-y-6">
        <div className="space-y-1.5">
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
            Adaptive drill · complete
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-[1.05] text-white">
            {pct >= 70 ? 'Closing the gaps.' : 'More work to do.'}
          </h1>
          <p className="text-[12.5px] text-white/55 leading-relaxed">
            {pct}% on the regs you were weakest on. Drill again tomorrow — the schedule has been
            updated based on this round.
          </p>
        </div>

        <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_10%)] p-5 sm:p-6 grid grid-cols-3 gap-4">
          <div>
            <div className="text-[10px] uppercase tracking-[0.14em] text-white/55">Score</div>
            <div className={cn('text-4xl sm:text-5xl font-semibold tabular-nums leading-none mt-1', tone)}>
              {pct}%
            </div>
            <div className={cn('mt-2 text-[12px] font-semibold', tone)}>{verdict}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.14em] text-white/55">Correct</div>
            <div className="text-4xl sm:text-5xl font-semibold tabular-nums leading-none mt-1 text-white">
              {correctCount}
              <span className="text-2xl text-white/55">/{questions.length}</span>
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.14em] text-white/55">Time</div>
            <div className="text-4xl sm:text-5xl font-semibold tabular-nums leading-none mt-1 text-white">
              {Math.floor(elapsed / 60)}
              <span className="text-2xl text-white/55">m</span>
            </div>
          </div>
        </div>

        {calibration.overconfident > 0 && (
          <div className="rounded-xl border border-red-400/30 bg-red-500/[0.06] p-3 sm:p-4">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-red-300 mb-1.5">
              <AlertTriangle className="h-3.5 w-3.5" />
              {calibration.overconfident} more overconfident-wrong{' '}
              {calibration.overconfident === 1 ? 'answer' : 'answers'}
            </div>
            <p className="text-[12px] text-white/70 leading-snug">
              These get pushed to the front of tomorrow's drill. The schedule is doing its job.
            </p>
          </div>
        )}

        <ul className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_10%)] overflow-hidden divide-y divide-white/[0.04]">
          {questions.map((q, i) => {
            const correct = answers[i] === q.correctReg.id;
            const oc = getCalibrationOutcome(correct, confidences[i]);
            return (
              <li key={q.facetId} className="px-4 sm:px-5 py-3 flex items-start gap-3">
                <span
                  className={cn(
                    'h-6 w-6 rounded-full flex items-center justify-center shrink-0 mt-0.5',
                    correct ? 'bg-emerald-500/[0.12]' : 'bg-red-500/[0.12]'
                  )}
                >
                  {correct ? (
                    <Check className="h-3.5 w-3.5 text-emerald-300" />
                  ) : (
                    <X className="h-3.5 w-3.5 text-red-300" />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <div className="text-[12.5px] text-white/85 leading-snug line-clamp-2 min-w-0 flex-1">
                      Reg {q.correctReg.reg_number}
                      {q.correctReg.title && (
                        <span className="text-white/55 ml-1.5">— {q.correctReg.title}</span>
                      )}
                    </div>
                    {oc && <CalibrationPill outcome={oc} />}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={loadDrill}
            className="flex-1 h-12 rounded-xl bg-elec-yellow text-black font-bold text-[14px] hover:bg-elec-yellow/90 transition-colors touch-manipulation inline-flex items-center justify-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Drill again
          </button>
          {onExit && (
            <button
              type="button"
              onClick={onExit}
              className="h-12 px-5 rounded-xl border border-white/[0.10] bg-white/[0.04] text-white hover:bg-white/[0.08] text-[13px] font-medium touch-manipulation"
            >
              Back to readiness
            </button>
          )}
        </div>
      </div>
    );
  }

  // Quiz phase
  if (!currentQ) return null;
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-5 sm:py-6 space-y-5">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        {onExit && (
          <button
            type="button"
            onClick={onExit}
            className="inline-flex items-center gap-1.5 text-[12.5px] text-white/70 hover:text-white transition-colors touch-manipulation"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back
          </button>
        )}
        <div className="text-[10.5px] tabular-nums text-white/55">
          {currentIndex + 1} / {questions.length}
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85 inline-flex items-center gap-1.5">
          <Sparkles className="h-3 w-3" />
          Adaptive drill · picked for you
        </div>
        <h1 className="text-xl sm:text-2xl font-semibold tracking-tight leading-tight text-white">
          Which regulation governs this?
        </h1>
      </div>

      {/* Reason chip — tells the apprentice WHY this question came up */}
      <span
        className={cn(
          'inline-flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.14em] px-2 py-0.5 rounded-full border',
          REASON_TONE[currentQ.reasonLabel]
        )}
      >
        {currentQ.reasonText}
      </span>

      <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_10%)] p-4 sm:p-5">
        <div className="text-[10px] uppercase tracking-[0.16em] text-white/55 mb-2 inline-flex items-center gap-1.5">
          <BookOpen className="h-3 w-3" />
          Requirement
        </div>
        <p className="text-[13.5px] sm:text-[14px] text-white/90 leading-relaxed whitespace-pre-wrap">
          {currentQ.prompt}
        </p>
      </div>

      <div className="space-y-2">
        {currentQ.options.map((opt) => {
          const isCorrectOpt = opt.id === currentQ.correctReg.id;
          const isUserPick = opt.id === userAnswer;
          const pickedPreReveal = isAnswered && !revealed && isUserPick;
          const neutralPreReveal = !isAnswered || (isAnswered && !revealed && !isUserPick);
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => handleAnswer(opt.id)}
              disabled={isAnswered}
              className={cn(
                'w-full text-left p-3.5 sm:p-4 rounded-xl border transition-colors touch-manipulation flex items-center gap-3',
                neutralPreReveal && !isAnswered && 'border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04]',
                neutralPreReveal && isAnswered && 'border-white/[0.06] bg-white/[0.01] opacity-60',
                pickedPreReveal && 'border-elec-yellow/50 bg-elec-yellow/[0.06]',
                revealed && isCorrectOpt && 'border-emerald-400/40 bg-emerald-500/[0.08]',
                revealed && !isCorrectOpt && isUserPick && 'border-red-400/40 bg-red-500/[0.08]',
                revealed && !isCorrectOpt && !isUserPick && 'border-white/[0.04] bg-white/[0.01] opacity-50'
              )}
            >
              <span className="text-[13.5px] font-mono tabular-nums text-white/85">
                Regulation {opt.reg_number}
              </span>
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {isAnswered && !hasConfidence && <ConfidencePicker onPick={handleConfidence} />}
      </AnimatePresence>

      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-2xl border border-elec-yellow/30 bg-elec-yellow/[0.04] p-4 sm:p-5 space-y-2"
          >
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="text-[10px] uppercase tracking-[0.16em] text-elec-yellow/85 font-semibold">
                Citation · BS 7671
              </div>
              {outcome && <CalibrationPill outcome={outcome} />}
            </div>
            <div className="text-[13px] text-white font-semibold tabular-nums">
              Regulation {currentQ.correctReg.reg_number}
              {currentQ.correctReg.title && (
                <span className="font-normal text-white/85 ml-1.5">
                  — {currentQ.correctReg.title}
                </span>
              )}
            </div>
            {currentQ.correctReg.part && (
              <div className="text-[11px] text-white/55">Part {currentQ.correctReg.part}</div>
            )}
            <button
              type="button"
              onClick={handleNext}
              className="mt-1 w-full h-11 rounded-xl bg-elec-yellow text-black font-bold text-[13px] hover:bg-elec-yellow/90 transition-colors touch-manipulation inline-flex items-center justify-center gap-2"
            >
              {currentIndex < questions.length - 1 ? (
                'Next question →'
              ) : (
                <>
                  <Trophy className="h-4 w-4" />
                  See results
                </>
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress bar */}
      <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden">
        <motion.div
          className="h-full bg-elec-yellow"
          initial={{ width: 0 }}
          animate={{ width: `${((currentIndex + (revealed ? 1 : 0)) / questions.length) * 100}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </div>
  );
}

export default AM2DrillMode;
