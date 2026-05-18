/**
 * MockAM2Day
 *
 * The closest thing in-app to a real AM2 day. Runs the four simulators
 * in their real-world order with timed phases, interstitial scorecards
 * between phases, and a combined summary at the end.
 *
 * Phase order matches what an apprentice actually faces:
 *   1. Safe Isolation     (target  8 min)  — fail-instantly checkpoint
 *   2. Testing Sequence   (target 90 min)  — heaviest part by weight
 *   3. Fault Diagnosis    (target 45 min)
 *   4. Knowledge Test     (target 30 min)
 *
 * Each existing simulator is reused; the wrapper listens to its
 * `onSessionComplete` callback to advance phase. Between phases we read
 * the latest `useAM2Readiness` data so the interstitial can show the
 * just-finished phase's score. The combined summary writes a single
 * `am2_mock_sessions` row with session_type='mock_am2' so the History
 * tab picks it up.
 */

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock,
  Gauge,
  Search,
  BookOpen,
  Clock,
  CheckCircle2,
  Trophy,
  ArrowRight,
  PlayCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useAM2Readiness } from '@/hooks/am2/useAM2Readiness';
import { SafeIsolationAssessment } from '@/components/am2/safe-isolation/SafeIsolationAssessment';
import { TestingSimulator } from '@/components/am2/testing-simulator/TestingSimulator';
import { FaultFindingSimulator } from '@/components/am2/fault-finding/FaultFindingSimulator';
import { AM2KnowledgeQuiz } from '@/components/am2/AM2KnowledgeQuiz';

const db = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

type Phase = 'setup' | 'phase1' | 'phase2' | 'phase3' | 'phase4' | 'summary';

interface PhaseDef {
  number: number;
  componentKey: string;
  eyebrow: string;
  title: string;
  description: string;
  targetMinutes: number;
  icon: typeof Lock;
}

const PHASES: PhaseDef[] = [
  {
    number: 1,
    componentKey: 'safeIsolation',
    eyebrow: 'Phase one',
    title: 'Safe isolation',
    description:
      'The first checkpoint of the real AM2. Get it wrong and the rest of the day is over. 8-step procedure.',
    targetMinutes: 8,
    icon: Lock,
  },
  {
    number: 2,
    componentKey: 'testingSequence',
    eyebrow: 'Phase two',
    title: 'Testing sequence',
    description:
      'The longest phase by far — initial verification on the rig. Continuity, IR, polarity, Zs, RCD.',
    targetMinutes: 90,
    icon: Gauge,
  },
  {
    number: 3,
    componentKey: 'faultDiagnosis',
    eyebrow: 'Phase three',
    title: 'Fault diagnosis',
    description:
      'After lunch. Diagnose and rectify two faults. Logic, isolation, recovery — under time pressure.',
    targetMinutes: 45,
    icon: Search,
  },
  {
    number: 4,
    componentKey: 'knowledgeAssessment',
    eyebrow: 'Phase four',
    title: 'Knowledge test',
    description:
      'Sit-down written/MCQ exam. BS 7671, health & safety, building regs. Counts for 15% but easy marks.',
    targetMinutes: 30,
    icon: BookOpen,
  },
];

const TOTAL_TARGET_MIN = PHASES.reduce((a, p) => a + p.targetMinutes, 0);

interface MockAM2DayProps {
  onExit: () => void;
  onSessionComplete?: () => void;
}

export function MockAM2Day({ onExit, onSessionComplete }: MockAM2DayProps) {
  const { user } = useAuth();
  const { data: readiness, recalculate } = useAM2Readiness();
  const [phase, setPhase] = useState<Phase>('setup');
  const [interstitialOpen, setInterstitialOpen] = useState(false);

  // Per-phase score snapshot — read from useAM2Readiness right after each
  // simulator's onSessionComplete fires. Captured here so the final
  // summary doesn't have to re-derive.
  const [phaseScores, setPhaseScores] = useState<Record<number, number>>({});
  const [phaseTimings, setPhaseTimings] = useState<Record<number, number>>({});

  // Wall-clock start so the summary can compute total time-on-task.
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [phaseStartedAt, setPhaseStartedAt] = useState<number | null>(null);

  const currentPhaseIndex = useMemo(() => {
    if (phase === 'phase1') return 0;
    if (phase === 'phase2') return 1;
    if (phase === 'phase3') return 2;
    if (phase === 'phase4') return 3;
    return -1;
  }, [phase]);

  const currentPhaseDef = currentPhaseIndex >= 0 ? PHASES[currentPhaseIndex] : null;

  // Listen for the live simulator to fire its session-complete callback.
  // Refresh readiness so we can pull the latest score, then open the
  // interstitial. We don't auto-advance — apprentice gets to acknowledge
  // the score before continuing.
  const handlePhaseComplete = async () => {
    if (!currentPhaseDef) return;
    const elapsed = phaseStartedAt ? Math.round((Date.now() - phaseStartedAt) / 1000) : 0;
    setPhaseTimings((p) => ({ ...p, [currentPhaseDef.number]: elapsed }));
    await recalculate();
    setInterstitialOpen(true);
  };

  // Pull the just-finished phase's score from readiness after recalculate
  useEffect(() => {
    if (!interstitialOpen || !currentPhaseDef || !readiness) return;
    const score = readiness.components[currentPhaseDef.componentKey]?.score ?? 0;
    setPhaseScores((p) => ({ ...p, [currentPhaseDef.number]: score }));
  }, [interstitialOpen, currentPhaseDef, readiness]);

  const continueToNext = () => {
    setInterstitialOpen(false);
    setPhaseStartedAt(Date.now());
    if (phase === 'phase1') setPhase('phase2');
    else if (phase === 'phase2') setPhase('phase3');
    else if (phase === 'phase3') setPhase('phase4');
    else if (phase === 'phase4') void finishMockDay();
  };

  // Write a single am2_mock_sessions row capturing the whole mock day.
  const finishMockDay = async () => {
    if (!user) {
      setPhase('summary');
      return;
    }
    const componentScores = phaseScores;
    const overall = Math.round(
      Object.values(componentScores).reduce((a, b) => a + b, 0) /
        Math.max(1, Object.values(componentScores).length)
    );
    const totalSeconds = startedAt ? Math.round((Date.now() - startedAt) / 1000) : 0;
    try {
      await db.from('am2_mock_sessions').insert({
        user_id: user.id,
        session_type: 'mock_am2',
        status: 'completed',
        overall_score: overall,
        component_scores: componentScores,
        time_spent_seconds: totalSeconds,
        completed_at: new Date().toISOString(),
      });
    } catch {
      /* History tab is non-critical; don't block the summary on a write fail */
    }
    setPhase('summary');
    onSessionComplete?.();
  };

  const startMockDay = () => {
    setPhase('phase1');
    const now = Date.now();
    setStartedAt(now);
    setPhaseStartedAt(now);
  };

  return (
    <div className="mx-auto max-w-3xl xl:max-w-4xl w-full h-full flex flex-col">
      {phase === 'setup' && <SetupScreen onStart={startMockDay} onExit={onExit} />}

      {phase === 'phase1' && (
        <PhaseRunner def={PHASES[0]} totalPhases={4}>
          <SafeIsolationAssessment onSessionComplete={handlePhaseComplete} />
        </PhaseRunner>
      )}
      {phase === 'phase2' && (
        <PhaseRunner def={PHASES[1]} totalPhases={4}>
          <TestingSimulator onSessionComplete={handlePhaseComplete} />
        </PhaseRunner>
      )}
      {phase === 'phase3' && (
        <PhaseRunner def={PHASES[2]} totalPhases={4}>
          <FaultFindingSimulator onSessionComplete={handlePhaseComplete} />
        </PhaseRunner>
      )}
      {phase === 'phase4' && (
        <PhaseRunner def={PHASES[3]} totalPhases={4}>
          <AM2KnowledgeQuiz onSessionComplete={handlePhaseComplete} />
        </PhaseRunner>
      )}

      {phase === 'summary' && (
        <SummaryScreen
          phaseScores={phaseScores}
          phaseTimings={phaseTimings}
          totalSeconds={startedAt ? Math.round((Date.now() - startedAt) / 1000) : 0}
          onExit={onExit}
        />
      )}

      {/* Interstitial — fires when a simulator's session-complete callback
          runs. Apprentice taps "Continue" to advance to the next phase. */}
      <AnimatePresence>
        {interstitialOpen && currentPhaseDef && (
          <Interstitial
            def={currentPhaseDef}
            score={phaseScores[currentPhaseDef.number] ?? 0}
            elapsedSeconds={phaseTimings[currentPhaseDef.number] ?? 0}
            isLastPhase={currentPhaseDef.number === 4}
            onContinue={continueToNext}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ──────────────────────────────────────────────────────── */

function SetupScreen({ onStart, onExit }: { onStart: () => void; onExit: () => void }) {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      <div className="space-y-2">
        <div className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80">
          Apprentice · AM2 · Mock day
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-[1.05] text-white">
          The full AM2 day
        </h1>
        <p className="text-[13px] sm:text-sm text-white/70 leading-relaxed">
          Run the four simulators back-to-back in real-world order with realistic time targets. The
          closest thing to a real AM2 day you can do at home. Roughly{' '}
          <span className="text-white font-semibold">
            {Math.round(TOTAL_TARGET_MIN / 60)} hours
          </span>{' '}
          end-to-end including the interstitials.
        </p>
      </div>

      <div className="rounded-2xl border border-elec-yellow/30 bg-elec-yellow/[0.04] p-4 sm:p-5 flex items-start gap-3">
        <Clock className="h-4 w-4 text-elec-yellow shrink-0 mt-0.5" />
        <div className="text-[12px] sm:text-[13px] text-white/85 leading-relaxed">
          You can pause between phases — the next phase doesn't start until you tap{' '}
          <span className="font-semibold text-elec-yellow">Continue</span>.
        </div>
      </div>

      <ol className="space-y-2">
        {PHASES.map((p) => (
          <li
            key={p.number}
            className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 flex items-start gap-3"
          >
            <span className="h-9 w-9 rounded-xl bg-elec-yellow/[0.08] border border-elec-yellow/20 flex items-center justify-center shrink-0">
              <p.icon className="h-4 w-4 text-elec-yellow" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-3 flex-wrap">
                <div className="flex items-baseline gap-2">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80 tabular-nums">
                    {String(p.number).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    · {p.eyebrow}
                  </span>
                </div>
                <span className="text-[11px] text-white/55 tabular-nums">
                  Target {p.targetMinutes} min
                </span>
              </div>
              <div className="mt-1 text-[15px] sm:text-[16px] font-semibold text-white tracking-tight">
                {p.title}
              </div>
              <p className="mt-1 text-[12px] text-white/65 leading-snug">{p.description}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
        <button
          type="button"
          onClick={onStart}
          className="flex-1 inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-elec-yellow text-black font-bold text-[14px] hover:bg-elec-yellow/90 transition-colors touch-manipulation"
        >
          <PlayCircle className="h-4 w-4" />
          Start mock AM2 day
        </button>
        <button
          type="button"
          onClick={onExit}
          className="h-12 px-5 rounded-xl border border-white/[0.10] bg-white/[0.04] text-white/70 hover:text-white text-[13px] font-medium touch-manipulation"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────── */

function PhaseRunner({
  def,
  totalPhases,
  children,
}: {
  def: PhaseDef;
  totalPhases: number;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-full">
      {/* Top progress strip — visible during the simulator so the
          apprentice always knows where they are in the day. */}
      <div className="shrink-0 border-b border-white/[0.06] bg-[hsl(0_0%_10%)] px-4 sm:px-6 py-2.5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-baseline gap-2 min-w-0">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80 tabular-nums">
              {String(def.number).padStart(2, '0')} of {String(totalPhases).padStart(2, '0')}
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55 truncate">
              · {def.title}
            </span>
          </div>
          <span className="text-[10.5px] tabular-nums text-white/45 shrink-0">
            Target {def.targetMinutes}m
          </span>
        </div>
        <div className="mt-2 h-1 rounded-full bg-white/[0.06] overflow-hidden">
          <div
            className="h-full bg-elec-yellow/80 transition-all duration-300"
            style={{ width: `${((def.number - 1) / totalPhases) * 100}%` }}
          />
        </div>
      </div>
      <div className="flex-1 min-h-0 overflow-auto">{children}</div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────── */

function Interstitial({
  def,
  score,
  elapsedSeconds,
  isLastPhase,
  onContinue,
}: {
  def: PhaseDef;
  score: number;
  elapsedSeconds: number;
  isLastPhase: boolean;
  onContinue: () => void;
}) {
  const tone = score >= 70 ? 'text-emerald-300' : score >= 50 ? 'text-amber-300' : 'text-red-300';
  const headline =
    score >= 70
      ? 'Phase passed'
      : score >= 50
        ? 'Phase complete · needs work'
        : 'Phase complete · big gaps';
  const mins = Math.floor(elapsedSeconds / 60);
  const secs = elapsedSeconds % 60;
  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="w-full max-w-md rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_8%)] p-6 sm:p-7 space-y-5"
        initial={{ y: 16, scale: 0.98 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 8, scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      >
        <div className="flex items-center gap-3">
          <span className="h-10 w-10 rounded-xl bg-elec-yellow/[0.12] border border-elec-yellow/30 flex items-center justify-center shrink-0">
            <CheckCircle2 className="h-5 w-5 text-elec-yellow" />
          </span>
          <div className="min-w-0">
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80">
              Phase {def.number} · {def.title}
            </div>
            <div className={cn('text-[15px] font-semibold', tone)}>{headline}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5">
            <div className="text-[10px] uppercase tracking-[0.14em] text-white/55">Score</div>
            <div className={cn('text-2xl font-semibold tabular-nums leading-none mt-1', tone)}>
              {score}%
            </div>
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5">
            <div className="text-[10px] uppercase tracking-[0.14em] text-white/55">Time</div>
            <div className="text-2xl font-semibold tabular-nums leading-none mt-1 text-white">
              {mins}:{String(secs).padStart(2, '0')}
            </div>
            <div className="mt-0.5 text-[10px] text-white/45">target {def.targetMinutes}m</div>
          </div>
        </div>

        <button
          type="button"
          onClick={onContinue}
          className="w-full h-12 rounded-xl bg-elec-yellow text-black font-bold text-[14px] hover:bg-elec-yellow/90 transition-colors touch-manipulation inline-flex items-center justify-center gap-2"
        >
          {isLastPhase ? (
            <>
              <Trophy className="h-4 w-4" />
              See full results
            </>
          ) : (
            <>
              Continue to phase {def.number + 1}
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </motion.div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────── */

function SummaryScreen({
  phaseScores,
  phaseTimings,
  totalSeconds,
  onExit,
}: {
  phaseScores: Record<number, number>;
  phaseTimings: Record<number, number>;
  totalSeconds: number;
  onExit: () => void;
}) {
  const scores = PHASES.map((p) => phaseScores[p.number] ?? 0);
  const overall = Math.round(scores.reduce((a, b) => a + b, 0) / Math.max(1, scores.length));
  const overallTone =
    overall >= 70 ? 'text-emerald-300' : overall >= 50 ? 'text-amber-300' : 'text-red-300';
  const verdict = overall >= 70 ? 'Likely competent' : overall >= 50 ? 'Catching up' : 'High risk';

  const totalMins = Math.floor(totalSeconds / 60);
  const totalSecs = totalSeconds % 60;

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-6 sm:py-10 space-y-6">
      <div className="space-y-2">
        <div className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80">
          Mock AM2 day · complete
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-[1.05] text-white">
          Combined result
        </h1>
      </div>

      <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_10%)] p-5 sm:p-6 grid grid-cols-2 gap-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.14em] text-white/55">Overall</div>
          <div
            className={cn(
              'text-5xl sm:text-6xl font-semibold tabular-nums leading-none mt-1',
              overallTone
            )}
          >
            {overall}%
          </div>
          <div className={cn('mt-2 text-[12px] font-semibold', overallTone)}>{verdict}</div>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-[0.14em] text-white/55">Time on task</div>
          <div className="text-5xl sm:text-6xl font-semibold tabular-nums leading-none mt-1 text-white">
            {totalMins}
            <span className="text-2xl text-white/55 ml-1">m</span>
          </div>
          <div className="mt-2 text-[11px] text-white/55 tabular-nums">
            target {TOTAL_TARGET_MIN}m · actual {totalMins}m {totalSecs}s
          </div>
        </div>
      </div>

      <ul className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_10%)] overflow-hidden divide-y divide-white/[0.04]">
        {PHASES.map((p) => {
          const s = phaseScores[p.number] ?? 0;
          const t = phaseTimings[p.number] ?? 0;
          const tMin = Math.floor(t / 60);
          const tSec = t % 60;
          const tone = s >= 70 ? 'text-emerald-300' : s >= 50 ? 'text-amber-300' : 'text-red-300';
          return (
            <li key={p.number} className="px-4 sm:px-5 py-3.5 flex items-center gap-3">
              <span className="h-9 w-9 rounded-xl bg-elec-yellow/[0.06] border border-elec-yellow/20 flex items-center justify-center shrink-0">
                <p.icon className="h-4 w-4 text-elec-yellow/85" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-[13.5px] font-semibold text-white">{p.title}</div>
                <div className="mt-0.5 text-[11px] text-white/55 tabular-nums">
                  {tMin}:{String(tSec).padStart(2, '0')} · target {p.targetMinutes}m
                </div>
              </div>
              <span className={cn('text-lg font-semibold tabular-nums', tone)}>{s}%</span>
            </li>
          );
        })}
      </ul>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={onExit}
          className="flex-1 h-12 rounded-xl bg-elec-yellow text-black font-bold text-[14px] hover:bg-elec-yellow/90 transition-colors touch-manipulation inline-flex items-center justify-center gap-2"
        >
          Back to readiness
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <p className="text-[10px] text-white/40 text-center">
        AM2-style simulation to identify practical gaps. Not affiliated with or endorsed by any
        awarding organisation.
      </p>
    </div>
  );
}

export default MockAM2Day;
