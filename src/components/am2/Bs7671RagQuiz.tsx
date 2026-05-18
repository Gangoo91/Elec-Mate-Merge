/**
 * Bs7671RagQuiz
 *
 * RAG-backed BS 7671 spot check. Where AM2KnowledgeQuiz uses a hardcoded
 * 400-MCQ bank (created pre-RAG and not regenerated since), this quiz
 * pulls questions on demand from the canonical `bs7671_facets` /
 * `bs7671_regulations` tables — every question has a verifiable citation
 * back to a real reg, and the bank refreshes whenever the regs do.
 *
 * Question format is "Match the requirement to the regulation":
 *   - We pick N facets that have a regulation_id.
 *   - The question is the facet's `content` (with any reg number redacted
 *     so we don't give the answer away).
 *   - Options are 4 regulation numbers: the correct one plus three random
 *     distractors drawn from the same `part` so they look plausible.
 *   - On answer reveal we show reg number + title + part as the citation,
 *     letting the apprentice click straight through to the BS 7671 reader.
 *
 * Memory rule "BS 7671 must come from RAG, never invented" — this mode
 * is how that promise is kept for the AM2 surface.
 */

import { useCallback, useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, BookOpen, Check, X, RefreshCw, Trophy, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useAM2Readiness } from '@/hooks/am2/useAM2Readiness';

interface RagQuestion {
  facetId: string;
  /** Content shown as the question prompt — reg numbers redacted. */
  prompt: string;
  /** Source content before redaction, used in the answer reveal. */
  rawContent: string;
  correctReg: { id: string; reg_number: string; title: string | null; part: string | null };
  options: Array<{ id: string; reg_number: string }>; // includes correct + distractors, shuffled
}

interface FacetRow {
  id: string;
  content: string;
  regulation_id: string | null;
}

interface RegRow {
  id: string;
  reg_number: string;
  title: string | null;
  part: string | null;
}

const QUESTION_COUNT = 8;

/** Redact reg numbers like "411.3.1.1", "Regulation 411.3.1.1",
 *  "BS 7671 Section 411" so we don't leak the answer in the prompt. */
function redactRegNumbers(text: string, regNumber: string): string {
  if (!text) return '';
  // Direct match first (matches exact reg)
  let out = text.replace(new RegExp(regNumber.replace(/\./g, '\\.'), 'g'), '[regulation]');
  // Generic n.n.n.n pattern as backstop
  out = out.replace(/\b\d{3}\.\d+(?:\.\d+)*\b/g, '[regulation]');
  // Wordy variants
  out = out.replace(/Regulation\s+\[regulation\]/gi, '[regulation]');
  out = out.replace(/Reg\.?\s+\[regulation\]/gi, '[regulation]');
  return out;
}

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

interface Bs7671RagQuizProps {
  onExit?: () => void;
  onSessionComplete?: () => void;
}

export function Bs7671RagQuiz({ onExit, onSessionComplete }: Bs7671RagQuizProps) {
  const { user } = useAuth();
  const { saveScore } = useAM2Readiness();

  const [phase, setPhase] = useState<'loading' | 'quiz' | 'results' | 'error'>('loading');
  const [questions, setQuestions] = useState<RagQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [revealed, setRevealed] = useState(false);
  const [startedAt, setStartedAt] = useState<number>(Date.now());
  const [error, setError] = useState<string | null>(null);

  /** Build a 4-option set: the correct reg + three plausible distractors
   *  drawn from the same part where possible. Falls back to any reg if the
   *  part has fewer than 4 entries. */
  const buildOptions = useCallback(
    (correct: RegRow, regsByPart: Map<string, RegRow[]>, allRegs: RegRow[]) => {
      const partRegs = correct.part ? (regsByPart.get(correct.part) ?? []) : [];
      const pool = partRegs.length >= 4 ? partRegs : allRegs;
      const distractors = shuffle(pool.filter((r) => r.id !== correct.id)).slice(0, 3);
      const options = [{ id: correct.id, reg_number: correct.reg_number }];
      for (const d of distractors) options.push({ id: d.id, reg_number: d.reg_number });
      return shuffle(options);
    },
    []
  );

  const loadQuestions = useCallback(async () => {
    setPhase('loading');
    setError(null);
    try {
      // 1. Pull a wider pool of usable facets — only ones with a regulation
      //    join + meaningful content length. PostgREST doesn't support
      //    "random" directly so we grab the most-recent N and shuffle.
      const { data: facetData, error: facetErr } = await supabase
        .from('bs7671_facets')
        .select('id, content, regulation_id')
        .not('regulation_id', 'is', null)
        .gte('confidence_score', 0.5)
        .order('created_at', { ascending: false })
        .limit(200);
      if (facetErr) throw facetErr;
      const facets = ((facetData ?? []) as FacetRow[]).filter(
        (f) => f.content && f.content.length >= 100 && f.regulation_id
      );
      if (facets.length === 0) {
        throw new Error('No BS 7671 facets available yet — try again later.');
      }

      // 2. Pull the regulations referenced by the facet pool
      const regIds = Array.from(
        new Set(facets.map((f) => f.regulation_id).filter((id): id is string => !!id))
      );
      const { data: regData, error: regErr } = await supabase
        .from('bs7671_regulations')
        .select('id, reg_number, title, part')
        .in('id', regIds);
      if (regErr) throw regErr;
      const allRegs = (regData ?? []) as RegRow[];
      const regById = new Map(allRegs.map((r) => [r.id, r]));
      const regsByPart = new Map<string, RegRow[]>();
      for (const r of allRegs) {
        if (!r.part) continue;
        const arr = regsByPart.get(r.part) ?? [];
        arr.push(r);
        regsByPart.set(r.part, arr);
      }

      // 3. Pick QUESTION_COUNT distinct facets and build MCQs
      const shuffled = shuffle(facets);
      const picked: RagQuestion[] = [];
      for (const f of shuffled) {
        if (picked.length >= QUESTION_COUNT) break;
        if (!f.regulation_id) continue;
        const reg = regById.get(f.regulation_id);
        if (!reg) continue;
        const opts = buildOptions(reg, regsByPart, allRegs);
        if (opts.length < 4) continue;
        picked.push({
          facetId: f.id,
          prompt: redactRegNumbers(f.content, reg.reg_number),
          rawContent: f.content,
          correctReg: reg,
          options: opts,
        });
      }
      if (picked.length === 0) {
        throw new Error('Could not build any questions — RAG pool too sparse.');
      }
      setQuestions(picked);
      setCurrentIndex(0);
      setAnswers({});
      setRevealed(false);
      setStartedAt(Date.now());
      setPhase('quiz');
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      setPhase('error');
    }
  }, [buildOptions]);

  useEffect(() => {
    void loadQuestions();
  }, [loadQuestions]);

  const currentQ = questions[currentIndex];
  const userAnswer = answers[currentIndex];
  const isAnswered = userAnswer != null;
  const isCorrect = isAnswered && currentQ && userAnswer === currentQ.correctReg.id;

  const handleAnswer = (optionId: string) => {
    if (isAnswered) return;
    setAnswers((a) => ({ ...a, [currentIndex]: optionId }));
    setRevealed(true);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setRevealed(false);
    } else {
      // Tally + save
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

  /* ─── Render ─────────────────────────────────────────────────── */

  if (phase === 'loading') {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4 py-12">
        <Loader2 className="h-6 w-6 animate-spin text-elec-yellow" />
        <div className="text-center max-w-xs">
          <p className="text-[13px] text-white font-medium">Pulling fresh regs from BS 7671…</p>
          <p className="mt-1 text-[11.5px] text-white/55">
            Every question is grounded in a real regulation with full citation.
          </p>
        </div>
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
          <p className="text-[14px] font-semibold text-white">Couldn't load questions</p>
          <p className="mt-1 text-[12px] text-white/65">{error}</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={loadQuestions}
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
    const mins = Math.floor(elapsed / 60);
    const secs = elapsed % 60;
    const tone = pct >= 70 ? 'text-emerald-300' : pct >= 50 ? 'text-amber-300' : 'text-red-300';
    const verdict = pct >= 70 ? 'Strong' : pct >= 50 ? 'Catching up' : 'Needs work';
    return (
      <div className="mx-auto max-w-2xl px-4 sm:px-6 py-6 sm:py-10 space-y-6">
        <div className="space-y-1.5">
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80">
            BS 7671 spot check · complete
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-[1.05] text-white">
            Result
          </h1>
        </div>

        <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_10%)] p-5 sm:p-6 grid grid-cols-3 gap-4">
          <div>
            <div className="text-[10px] uppercase tracking-[0.14em] text-white/55">Score</div>
            <div className={cn('text-5xl font-semibold tabular-nums leading-none mt-1', tone)}>
              {pct}%
            </div>
            <div className={cn('mt-2 text-[12px] font-semibold', tone)}>{verdict}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.14em] text-white/55">Correct</div>
            <div className="text-5xl font-semibold tabular-nums leading-none mt-1 text-white">
              {correctCount}
              <span className="text-2xl text-white/55">/{questions.length}</span>
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.14em] text-white/55">Time</div>
            <div className="text-5xl font-semibold tabular-nums leading-none mt-1 text-white">
              {mins}
              <span className="text-2xl text-white/55">m</span>
              <span className="text-2xl text-white tabular-nums">{secs}</span>
              <span className="text-2xl text-white/55">s</span>
            </div>
          </div>
        </div>

        <ul className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_10%)] overflow-hidden divide-y divide-white/[0.04]">
          {questions.map((q, i) => {
            const correct = answers[i] === q.correctReg.id;
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
                  <div className="text-[12.5px] text-white/85 leading-snug line-clamp-2">
                    {q.prompt}
                  </div>
                  <div className="mt-1 text-[10.5px] text-elec-yellow/80 font-mono tabular-nums">
                    Reg {q.correctReg.reg_number}
                    {q.correctReg.title && (
                      <span className="text-white/55 ml-1.5 font-sans">— {q.correctReg.title}</span>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={loadQuestions}
            className="flex-1 h-12 rounded-xl bg-elec-yellow text-black font-bold text-[14px] hover:bg-elec-yellow/90 transition-colors touch-manipulation inline-flex items-center justify-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            New round
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

  // ── Quiz phase ──────────────────────────────────────────────
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
        <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80">
          BS 7671 · spot check
        </div>
        <h1 className="text-xl sm:text-2xl font-semibold tracking-tight leading-tight text-white">
          Which regulation governs this?
        </h1>
      </div>

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
          const showState = revealed;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => handleAnswer(opt.id)}
              disabled={isAnswered}
              className={cn(
                'w-full text-left p-3.5 sm:p-4 rounded-xl border transition-colors touch-manipulation flex items-center gap-3',
                !showState && 'border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04]',
                showState && isCorrectOpt && 'border-emerald-400/40 bg-emerald-500/[0.08]',
                showState && !isCorrectOpt && isUserPick && 'border-red-400/40 bg-red-500/[0.08]',
                showState &&
                  !isCorrectOpt &&
                  !isUserPick &&
                  'border-white/[0.04] bg-white/[0.01] opacity-50'
              )}
            >
              <span
                className={cn(
                  'h-7 w-7 rounded-full border flex items-center justify-center shrink-0 text-[11px] font-mono font-semibold tabular-nums',
                  showState &&
                    isCorrectOpt &&
                    'border-emerald-400/50 bg-emerald-500/[0.12] text-emerald-200',
                  showState &&
                    !isCorrectOpt &&
                    isUserPick &&
                    'border-red-400/50 bg-red-500/[0.12] text-red-200',
                  !showState && 'border-white/[0.10] bg-white/[0.04] text-white/65',
                  showState &&
                    !isCorrectOpt &&
                    !isUserPick &&
                    'border-white/[0.06] bg-white/[0.02] text-white/40'
                )}
              >
                {showState && isCorrectOpt ? (
                  <Check className="h-3.5 w-3.5" />
                ) : (
                  opt.reg_number.slice(0, 3)
                )}
              </span>
              <span
                className={cn(
                  'text-[13.5px] font-mono tabular-nums',
                  showState && isCorrectOpt && 'text-emerald-200 font-semibold',
                  showState && !isCorrectOpt && isUserPick && 'text-red-200',
                  !showState && 'text-white/85',
                  showState && !isCorrectOpt && !isUserPick && 'text-white/45'
                )}
              >
                Regulation {opt.reg_number}
              </span>
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-2xl border border-elec-yellow/30 bg-elec-yellow/[0.04] p-4 sm:p-5 space-y-2"
          >
            <div className="text-[10px] uppercase tracking-[0.16em] text-elec-yellow/85 font-semibold">
              Citation · BS 7671
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
              className={cn(
                'mt-1 w-full h-11 rounded-xl bg-elec-yellow text-black font-bold text-[13px] hover:bg-elec-yellow/90 transition-colors touch-manipulation inline-flex items-center justify-center gap-2',
                isCorrect ? '' : 'opacity-95'
              )}
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

export default Bs7671RagQuiz;
