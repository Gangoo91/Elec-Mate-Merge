/**
 * SessionSummary
 *
 * Score breakdown and feedback after completing the testing session.
 * Feeds into AM2 Readiness (25% Testing Sequence weight).
 */

import { cn } from '@/lib/utils';
import { RotateCcw, ArrowLeft, Trophy, Target, FileCheck, ListChecks } from 'lucide-react';
import type { SimulatorScore } from '@/types/am2-testing-simulator';

interface SessionSummaryProps {
  score: SimulatorScore;
  onTryAgain: () => void;
  onBackToRig: () => void;
}

function ScoreRing({ score, size = 96 }: { score: number; size?: number }) {
  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const colour = score >= 70 ? '#22c55e' : score >= 50 ? '#f59e0b' : '#ef4444';

  return (
    <div className="relative flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="6"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={colour}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1s ease' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-2xl font-bold" style={{ color: colour }}>
          {score}%
        </span>
        <span className="text-[10px] text-white/40">Overall</span>
      </div>
    </div>
  );
}

function MetricCard({
  icon: Icon,
  label,
  score,
  detail,
}: {
  icon: typeof Target;
  label: string;
  score: number;
  detail: string;
}) {
  const colour = score >= 70 ? 'text-green-400' : score >= 50 ? 'text-amber-400' : 'text-red-400';
  const bgColour =
    score >= 70
      ? 'bg-green-500/10 border-green-500/20'
      : score >= 50
        ? 'bg-amber-500/10 border-amber-500/20'
        : 'bg-red-500/10 border-red-500/20';

  return (
    <div className={cn('rounded-xl border p-3', bgColour)}>
      <div className="flex items-center gap-2 mb-1">
        <Icon className={cn('w-4 h-4', colour)} />
        <span className="text-xs font-semibold text-white/70">{label}</span>
      </div>
      <p className={cn('text-lg font-bold', colour)}>{score}%</p>
      <p className="text-[10px] text-white/40 mt-0.5">{detail}</p>
    </div>
  );
}

export function SessionSummary({ score, onTryAgain, onBackToRig }: SessionSummaryProps) {
  const overallLabel =
    score.overall >= 70
      ? 'Well done — you passed!'
      : score.overall >= 50
        ? 'Nearly there — keep practising'
        : 'More practice needed';

  return (
    <div className="px-4 py-6 space-y-5 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col items-center gap-3">
        <Trophy
          className={cn('w-10 h-10', score.overall >= 70 ? 'text-yellow-400' : 'text-white/20')}
        />
        <h2 className="text-xl font-bold text-white">Session Complete</h2>
        <p className="text-sm text-white/50">{overallLabel}</p>
      </div>

      {/* Overall score ring */}
      <div className="flex justify-center">
        <ScoreRing score={score.overall} />
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-1 gap-2">
        <MetricCard
          icon={ListChecks}
          label="Test Sequence"
          score={score.sequenceAccuracy}
          detail="Tests performed in correct GN3 order"
        />
        <MetricCard
          icon={Target}
          label="Reading Accuracy"
          score={score.readingCorrectness}
          detail="Readings within BS 7671 compliance limits"
        />
        <MetricCard
          icon={FileCheck}
          label="Schedule Completeness"
          score={score.scheduleCompleteness}
          detail="EIC test result columns populated"
        />
      </div>

      {/* AM2 Readiness note */}
      <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-3">
        <p className="text-[11px] text-cyan-300/70">
          This score contributes 25% to your overall AM2 Readiness assessment under the "Testing
          Sequence" category.
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-2">
        <button
          onClick={onTryAgain}
          className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl bg-cyan-500/15 text-cyan-300 text-sm font-semibold border border-cyan-400/20 touch-manipulation"
        >
          <RotateCcw className="w-4 h-4" />
          Try Again
        </button>
        <button
          onClick={onBackToRig}
          className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl bg-white/[0.04] text-white/60 text-sm font-semibold border border-white/10 touch-manipulation"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>
    </div>
  );
}
