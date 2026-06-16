/**
 * confidence
 *
 * Confidence calibration primitives for the AM2 quizzes. Why this exists:
 * apprentices who get things wrong *and* think they're right are the
 * dangerous case on AM2 day — they don't revise because they don't know
 * there's a gap. Asking "how sure?" before revealing the answer surfaces
 * exactly those overconfident-wrongs as a separate signal from the raw
 * score, so the apprentice can prioritise them.
 *
 * Three levels:
 *   guess    — coin-flip; expected to be wrong sometimes
 *   likely   — pretty sure; a soft signal
 *   certain  — locked in; should always be right
 *
 * The danger metric is "overconfident wrongs" (certain + wrong). Surface
 * that count separately from the score — it's the actionable bit.
 */

import { motion } from 'framer-motion';
import { HelpCircle, ThumbsUp, Lock, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

export type Confidence = 'guess' | 'likely' | 'certain';

export type CalibrationOutcome =
  | 'locked-in' // right + certain — ideal
  | 'solid' //     right + likely  — fine
  | 'lucky' //     right + guess   — knowledge gap masked by luck
  | 'honest-gap' //wrong + guess   — you knew you didn't know (expected)
  | 'needs-review' //wrong + likely — soft wrong, worth revising
  | 'overconfident'; //wrong + certain — DANGER

export function getCalibrationOutcome(
  correct: boolean,
  c: Confidence | undefined
): CalibrationOutcome | null {
  if (!c) return null;
  if (correct) {
    if (c === 'certain') return 'locked-in';
    if (c === 'likely') return 'solid';
    return 'lucky';
  }
  if (c === 'certain') return 'overconfident';
  if (c === 'likely') return 'needs-review';
  return 'honest-gap';
}

export const OUTCOME_META: Record<
  CalibrationOutcome,
  { label: string; tone: string; bg: string; border: string }
> = {
  'locked-in': {
    label: 'Locked in',
    tone: 'text-emerald-300',
    bg: 'bg-emerald-500/[0.08]',
    border: 'border-emerald-400/30',
  },
  solid: {
    label: 'Solid',
    tone: 'text-emerald-300/85',
    bg: 'bg-emerald-500/[0.05]',
    border: 'border-emerald-400/20',
  },
  lucky: {
    label: 'Lucky',
    tone: 'text-amber-300',
    bg: 'bg-amber-500/[0.06]',
    border: 'border-amber-400/25',
  },
  'honest-gap': {
    label: 'Honest gap',
    tone: 'text-white/65',
    bg: 'bg-white/[0.03]',
    border: 'border-white/[0.08]',
  },
  'needs-review': {
    label: 'Needs review',
    tone: 'text-amber-300',
    bg: 'bg-amber-500/[0.06]',
    border: 'border-amber-400/25',
  },
  overconfident: {
    label: 'Overconfident',
    tone: 'text-red-300',
    bg: 'bg-red-500/[0.08]',
    border: 'border-red-400/35',
  },
};

/** Aggregate stats for the results screen. */
export interface CalibrationSummary {
  /** Total questions where the user marked a confidence. */
  total: number;
  /** Right + certain count. */
  lockedIn: number;
  /** Wrong + certain count — the dangerous ones. */
  overconfident: number;
  /** Right + guess count — masked gaps. */
  lucky: number;
  /**
   * Of the questions the user said they were 'certain' on, the % that were
   * actually right. The headline calibration metric.
   */
  certainAccuracy: number | null;
  /** Number of 'certain' answers — denominator for certainAccuracy. */
  certainCount: number;
}

export function computeCalibration<T>(
  questions: T[],
  isCorrect: (q: T, i: number) => boolean,
  getConfidence: (i: number) => Confidence | undefined
): CalibrationSummary {
  let lockedIn = 0;
  let overconfident = 0;
  let lucky = 0;
  let certainCount = 0;
  let total = 0;
  questions.forEach((q, i) => {
    const c = getConfidence(i);
    if (!c) return;
    total += 1;
    const correct = isCorrect(q, i);
    if (c === 'certain') {
      certainCount += 1;
      if (correct) lockedIn += 1;
      else overconfident += 1;
    }
    if (correct && c === 'guess') lucky += 1;
  });
  return {
    total,
    lockedIn,
    overconfident,
    lucky,
    certainCount,
    certainAccuracy: certainCount > 0 ? Math.round((lockedIn / certainCount) * 100) : null,
  };
}

/* ─── Picker UI ──────────────────────────────────────────────────── */

interface ConfidencePickerProps {
  onPick: (c: Confidence) => void;
  className?: string;
}

/**
 * Pre-reveal confidence prompt. Shown after the user picks an answer but
 * before correctness is revealed. Three buttons, big tap targets.
 */
export function ConfidencePicker({ onPick, className }: ConfidencePickerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'rounded-2xl border border-elec-yellow/30 bg-elec-yellow/[0.04] p-4 sm:p-5 space-y-3',
        className
      )}
    >
      <div className="flex items-baseline justify-between gap-2 flex-wrap">
        <div className="text-[10px] uppercase tracking-[0.16em] text-elec-yellow/85 font-semibold">
          How sure are you?
        </div>
        <div className="text-[10.5px] text-white/55">Before you reveal</div>
      </div>
      <p className="text-[12px] text-white/65 leading-snug">
        Marking confidence flags the answers you'd be wrong on without realising — the ones that
        fail apprentices on AM2 day.
      </p>
      <div className="grid grid-cols-3 gap-2">
        <ConfidenceBtn
          onClick={() => onPick('guess')}
          icon={<HelpCircle className="h-3.5 w-3.5" />}
          label="Guess"
          sub="Not sure"
          accent="text-white/70"
        />
        <ConfidenceBtn
          onClick={() => onPick('likely')}
          icon={<ThumbsUp className="h-3.5 w-3.5" />}
          label="Likely"
          sub="Pretty sure"
          accent="text-amber-300"
        />
        <ConfidenceBtn
          onClick={() => onPick('certain')}
          icon={<Lock className="h-3.5 w-3.5" />}
          label="Locked in"
          sub="Certain"
          accent="text-emerald-300"
        />
      </div>
    </motion.div>
  );
}

function ConfidenceBtn({
  onClick,
  icon,
  label,
  sub,
  accent,
}: {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  sub: string;
  accent: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="h-auto rounded-xl border border-white/[0.10] bg-[hsl(0_0%_8%)] hover:border-elec-yellow/40 hover:bg-[hsl(0_0%_15%)] transition-colors py-2.5 px-2 flex flex-col items-center gap-1 touch-manipulation active:scale-[0.97]"
    >
      <span className={cn('inline-flex items-center gap-1', accent)}>
        {icon}
        <span className="text-[12px] font-semibold">{label}</span>
      </span>
      <span className="text-[10px] text-white/45">{sub}</span>
    </button>
  );
}

/** Compact outcome pill shown after reveal. */
export function CalibrationPill({ outcome }: { outcome: CalibrationOutcome }) {
  const meta = OUTCOME_META[outcome];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.12em] px-2 py-0.5 rounded-full border',
        meta.tone,
        meta.bg,
        meta.border
      )}
    >
      {outcome === 'overconfident' && <AlertTriangle className="h-2.5 w-2.5" />}
      {meta.label}
    </span>
  );
}
