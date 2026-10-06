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

import { useCallback, useEffect, useState } from 'react';
import { Loader2, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useRegAttempts } from '@/hooks/am2/useRegAttempts';
import { type Confidence } from './confidence';
import { RegQuestionScreen, RegResultsScreen, type RegQuestionData } from './RegQuestion';
import {
  buildRegOptions,
  loadRealRegs,
  pickFacets,
  redactRegNumbers,
  tidyRegText,
  type PoolReg,
} from './bs7671QuizPool';

const QUESTION_COUNT = 8;

interface AttemptRow {
  regulation_id: string;
  reg_number: string;
  last_correct: boolean;
  last_confidence: 'guess' | 'likely' | 'certain' | null;
  next_review_at: string;
  incorrect_streak: number;
}

type PriorityReason = 'blind-spot' | 'recently-wrong' | 'overdue' | 'lucky' | 'untested';

interface DrillQuestion extends RegQuestionData {
  reasonLabel: PriorityReason;
  reasonText: string;
}

/** Rank an attempt row by drill priority. */
function priorityOf(row: AttemptRow): {
  score: number;
  reason: PriorityReason;
  reasonText: string;
} {
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
  'blind-spot': 'text-white border-red-400/60',
  'recently-wrong': 'text-white border-amber-400/60',
  overdue: 'text-white border-elec-yellow/60',
  lucky: 'text-white border-amber-400/60',
  untested: 'text-white border-white/30',
};

interface AM2DrillModeProps {
  onExit?: () => void;
  /** Nothing to drill yet: straight to the spot check that builds it. */
  onOpenSpotCheck?: () => void;
  onSessionComplete?: () => void;
}

export function AM2DrillMode({ onExit, onOpenSpotCheck, onSessionComplete }: AM2DrillModeProps) {
  const { user } = useAuth();
  const { recordAttempt } = useRegAttempts();

  const [phase, setPhase] = useState<'loading' | 'empty' | 'quiz' | 'results' | 'error'>('loading');
  const [, setError] = useState<string | null>(null);
  const [questions, setQuestions] = useState<DrillQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [confidences, setConfidences] = useState<Record<number, Confidence>>({});
  const [startedAt, setStartedAt] = useState(Date.now());

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
        .select(
          'regulation_id, reg_number, last_correct, last_confidence, next_review_at, incorrect_streak'
        )
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
        .slice(0, QUESTION_COUNT * 2);

      if (ranked.length === 0) {
        // No drill candidates yet — apprentice hasn't generated any
        // weakness data. Send them to the standalone spot check first.
        setPhase('empty');
        return;
      }

      // 3–5. Real BS 7671 regs only (also the distractor pool), and one
      //      BS 7671 facet per reg that is actually about that reg. Older
      //      attempts can point at Approved Document clauses or OCR-garbled
      //      numbers from before the spot check was fixed — those drop out.
      const allRegs = await loadRealRegs();
      const regById = new Map(allRegs.map((r) => [r.id, r]));
      const rankedRegs = ranked
        .map((r) => ({ r, reg: regById.get(r.row.regulation_id) }))
        .filter((x): x is { r: (typeof ranked)[number]; reg: PoolReg } => !!x.reg);
      const facetByReg = await pickFacets(rankedRegs.map((x) => x.reg));

      // 6. Build MCQ for each ranked reg.
      const built: DrillQuestion[] = [];
      for (const { r, reg } of rankedRegs) {
        if (built.length >= QUESTION_COUNT) break;
        const facet = facetByReg.get(reg.id);
        if (!facet) continue;
        const opts = buildRegOptions(reg, allRegs);
        if (opts.length < 4) continue;
        built.push({
          key: facet.id,
          prompt: redactRegNumbers(facet.content, reg.reg_number),
          regText: null,
          reasonLabel: r.reason,
          reasonText: r.reasonText,
          correctReg: reg,
          options: opts,
        });
      }

      if (built.length === 0) {
        throw new Error('Could not build any drill questions — RAG pool too thin.');
      }

      // The regulation's own wording for the answer reveal.
      const { data: texts } = await supabase
        .from('bs7671_regulations')
        .select('id, full_text')
        .in(
          'id',
          built.map((q) => q.correctReg.id)
        );
      const textById = new Map(
        ((texts ?? []) as Array<{ id: string; full_text: string | null }>).map((t) => [
          t.id,
          t.full_text,
        ])
      );
      for (const q of built) {
        q.regText = tidyRegText(textById.get(q.correctReg.id) ?? null, q.correctReg.reg_number);
      }

      setQuestions(built);
      setCurrentIndex(0);
      setAnswers({});
      setConfidences({});
      setStartedAt(Date.now());
      setPhase('quiz');
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      setPhase('error');
    }
  }, [user?.id]);

  useEffect(() => {
    void loadDrill();
  }, [loadDrill]);

  const pickAnswer = useCallback(
    (optionId: string) => {
      if (answers[currentIndex] != null) return;
      setAnswers((a) => ({ ...a, [currentIndex]: optionId }));
    },
    [answers, currentIndex]
  );

  const pickConfidence = useCallback(
    (c: Confidence) => {
      const q = questions[currentIndex];
      if (!q || answers[currentIndex] == null || confidences[currentIndex] != null) return;
      setConfidences((prev) => ({ ...prev, [currentIndex]: c }));
      void recordAttempt({
        regulationId: q.correctReg.id,
        regNumber: q.correctReg.reg_number,
        correct: answers[currentIndex] === q.correctReg.id,
        confidence: c,
      });
    },
    [questions, answers, confidences, currentIndex, recordAttempt]
  );

  const handleNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      return;
    }
    // Not saved as the knowledge score: a short drill isn't the 30-question paper,
    // and a best-ever from one would tell the AI coach you're readier than you are.
    setPhase('results');
    onSessionComplete?.();
  }, [currentIndex, questions, onSessionComplete]);

  /* ─── Renders ──────────────────────────────────────────────────────── */

  if (phase === 'loading') {
    return (
      <div className="flex min-h-[50vh] items-center justify-center gap-3">
        <Loader2 className="h-5 w-5 animate-spin text-elec-yellow" />
        <span className="text-[14px] text-white">Picking the regs you're weakest on…</span>
      </div>
    );
  }

  if (phase === 'empty' || phase === 'error') {
    return (
      <div className="mx-auto w-full max-w-[1100px] space-y-5 py-6">
        <div>
          <p className="text-[12px] font-semibold text-white">Revision · weak regs</p>
          <h1 className="mt-1 text-[28px] font-bold leading-tight tracking-tight text-white lg:text-[34px]">
            {phase === 'empty' ? 'Nothing to drill yet' : "Couldn't load the drill"}
          </h1>
          <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-white">
            {phase === 'empty'
              ? 'The drill is built from your answers. Do a BS 7671 spot check first — anything you get wrong, or right on a guess, comes back here, with wrong-while-certain answers first.'
              : 'Something went wrong putting the drill together. Try again in a moment.'}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {phase === 'error' && (
            <button
              type="button"
              onClick={() => void loadDrill()}
              className="inline-flex h-12 items-center gap-2 rounded-xl bg-elec-yellow px-6 text-[14.5px] font-bold text-black touch-manipulation"
            >
              <RefreshCw className="h-4 w-4" /> Try again
            </button>
          )}
          {phase === 'empty' && onOpenSpotCheck && (
            <button
              type="button"
              onClick={onOpenSpotCheck}
              className="inline-flex h-12 items-center gap-2 rounded-xl bg-elec-yellow px-6 text-[14.5px] font-bold text-black touch-manipulation"
            >
              Do the spot check
            </button>
          )}
          {onExit && (
            <button
              type="button"
              onClick={onExit}
              className="h-12 rounded-xl border border-white/[0.16] px-6 text-[14.5px] font-semibold text-white touch-manipulation"
            >
              Back to AM2
            </button>
          )}
        </div>
      </div>
    );
  }

  if (phase === 'results') {
    return (
      <RegResultsScreen
        title="Weak-regs drill"
        questions={questions}
        answers={answers}
        confidences={confidences}
        seconds={Math.round((Date.now() - startedAt) / 1000)}
        onAgain={() => void loadDrill()}
        againLabel="Drill again"
        onExit={onExit}
      />
    );
  }

  const q = questions[currentIndex];
  if (!q) return null;
  return (
    <RegQuestionScreen
      questions={questions}
      index={currentIndex}
      answers={answers}
      confidences={confidences}
      onAnswer={pickAnswer}
      onConfidence={pickConfidence}
      onNext={handleNext}
      onExit={onExit}
      eyebrow="Weak-regs drill"
      aside={
        <span
          className={cn(
            'inline-flex rounded-full border px-2.5 py-0.5 text-[11.5px] font-semibold',
            REASON_TONE[q.reasonLabel]
          )}
        >
          {q.reasonText}
        </span>
      }
    />
  );
}

export default AM2DrillMode;
