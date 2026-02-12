/**
 * SafeIsolationAssessment v2
 *
 * Interactive safe isolation procedure simulator.
 * Three phases: Intro → Sequencer (drag-and-drop) → Results
 *
 * The #1 reason candidates fail the AM2 is safe isolation errors.
 * This assessment drills the correct 8-step sequence.
 *
 * v2: Redesigned for native mobile feel — gradient hero, polished
 * drag cards with colour indicators, score ring on results, smooth
 * touch interactions throughout.
 */

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DragDropContext, Droppable, Draggable, type DropResult } from '@hello-pangea/dnd';
import {
  Lock,
  ShieldCheck,
  ShieldAlert,
  GripVertical,
  RotateCcw,
  Zap,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Timer,
  Trophy,
  Info,
  ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { useAM2Readiness } from '@/hooks/am2/useAM2Readiness';

// --- Constants ---

const CORRECT_SEQUENCE = [
  {
    id: 'step-1',
    number: 1,
    title: 'Identify the circuit',
    description: 'Identify the source of supply and the circuit to be isolated',
    detail: 'Check the distribution board schedule. Never assume labelling is correct.',
    icon: '🔍',
  },
  {
    id: 'step-2',
    number: 2,
    title: 'Select approved voltage indicator',
    description: 'Select a GS38-compliant voltage indicating device',
    detail: 'Must have fused test leads, finger guards, and be rated for the voltage.',
    icon: '⚡',
  },
  {
    id: 'step-3',
    number: 3,
    title: 'Prove the tester',
    description: 'Prove the voltage indicator works on a known live source',
    detail: 'Use a proving unit or a known live source. The tester MUST show a reading.',
    icon: '✓',
  },
  {
    id: 'step-4',
    number: 4,
    title: 'Isolate the supply',
    description: 'Switch off the isolator, lock off with a padlock',
    detail: 'Operate the circuit breaker/isolator to the OFF position.',
    icon: '🔒',
  },
  {
    id: 'step-5',
    number: 5,
    title: 'Secure the isolation',
    description: 'Lock the padlock, remove the key, place key in your pocket',
    detail: 'The #1 AM2 fail reason is leaving the key in the padlock. Key goes in YOUR pocket.',
    icon: '🔑',
  },
  {
    id: 'step-6',
    number: 6,
    title: 'Fit warning notice',
    description: 'Attach "Danger — Do Not Switch On" warning notice',
    detail: 'The notice must be visible and clearly state the danger.',
    icon: '⚠️',
  },
  {
    id: 'step-7',
    number: 7,
    title: 'Prove dead',
    description: 'Test between all conductors: L-N, L-E, N-E to prove dead',
    detail: 'All three combinations must read 0V. If any shows voltage, STOP and re-isolate.',
    icon: '0V',
  },
  {
    id: 'step-8',
    number: 8,
    title: 'Re-prove the tester',
    description: 'Prove the voltage indicator still works on the known live source',
    detail:
      "This confirms your tester didn't fail during the procedure. Many candidates forget this step.",
    icon: '✓✓',
  },
];

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

type Phase = 'intro' | 'sequencer' | 'results';

// --- Main Component ---

export function SafeIsolationAssessment() {
  const [phase, setPhase] = useState<Phase>('intro');
  const [steps, setSteps] = useState(() => shuffleArray(CORRECT_SEQUENCE));
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<boolean[]>([]);
  const [startTime, setStartTime] = useState<number>(0);
  const [timeTaken, setTimeTaken] = useState(0);
  const { saveScore } = useAM2Readiness();

  const triggerHaptic = useCallback(async (style: ImpactStyle = ImpactStyle.Light) => {
    try {
      await Haptics.impact({ style });
    } catch {
      /* web fallback */
    }
  }, []);

  const handleStart = useCallback(() => {
    setSteps(shuffleArray(CORRECT_SEQUENCE));
    setSubmitted(false);
    setResults([]);
    setStartTime(Date.now());
    setPhase('sequencer');
    triggerHaptic(ImpactStyle.Medium);
  }, [triggerHaptic]);

  const handleDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) return;
      const newSteps = [...steps];
      const [removed] = newSteps.splice(result.source.index, 1);
      newSteps.splice(result.destination.index, 0, removed);
      setSteps(newSteps);
      triggerHaptic(ImpactStyle.Light);
    },
    [steps, triggerHaptic]
  );

  const handleSubmit = useCallback(() => {
    const stepResults = steps.map((step, index) => step.number === index + 1);
    setResults(stepResults);
    setSubmitted(true);
    setTimeTaken(Math.round((Date.now() - startTime) / 1000));

    const correct = stepResults.filter(Boolean).length;
    const score = Math.round((correct / CORRECT_SEQUENCE.length) * 100);
    const isPerfect = correct === CORRECT_SEQUENCE.length;

    saveScore('safeIsolation', score);

    if (isPerfect) {
      triggerHaptic(ImpactStyle.Heavy);
    } else {
      triggerHaptic(ImpactStyle.Medium);
    }

    setTimeout(() => setPhase('results'), 600);
  }, [steps, startTime, saveScore, triggerHaptic]);

  const handleRetry = useCallback(() => {
    handleStart();
  }, [handleStart]);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <AnimatePresence mode="wait">
        {phase === 'intro' && <IntroPhase key="intro" onStart={handleStart} />}
        {phase === 'sequencer' && (
          <SequencerPhase
            key="sequencer"
            steps={steps}
            submitted={submitted}
            results={results}
            onDragEnd={handleDragEnd}
            onSubmit={handleSubmit}
          />
        )}
        {phase === 'results' && (
          <ResultsPhase
            key="results"
            steps={steps}
            results={results}
            timeTaken={timeTaken}
            onRetry={handleRetry}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Score Ring SVG ---

function ScoreRing({
  score,
  size = 100,
  strokeWidth = 6,
}: {
  score: number;
  size?: number;
  strokeWidth?: number;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const colour = score === 100 ? '#22c55e' : score >= 50 ? '#f59e0b' : '#ef4444';

  return (
    <svg width={size} height={size} className="rotate-[-90deg]">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth={strokeWidth}
      />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={colour}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
      />
    </svg>
  );
}

// --- Intro Phase ---

function IntroPhase({ onStart }: { onStart: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col flex-1 min-h-0 overflow-y-auto overscroll-auto"
      style={{ WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
    >
      <div className="px-4 py-5 space-y-4 flex-1">
        {/* Hero card */}
        <div className="relative rounded-2xl overflow-hidden border border-cyan-400/15">
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(135deg, rgba(6,182,212,0.12) 0%, rgba(6,182,212,0.03) 50%, rgba(245,158,11,0.06) 100%)',
            }}
          />
          <div className="relative px-5 py-6 flex flex-col items-center text-center space-y-3">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.1 }}
              className="h-16 w-16 rounded-2xl bg-cyan-500/15 border border-cyan-400/20 flex items-center justify-center"
            >
              <Lock className="h-8 w-8 text-cyan-400" />
            </motion.div>

            <h2 className="text-lg font-bold text-white">Safe Isolation Procedure</h2>
            <p className="text-sm text-white/60 max-w-xs leading-relaxed">
              The #1 reason candidates fail the AM2. Put the 8 steps in the correct order — zero
              tolerance for errors.
            </p>
          </div>
        </div>

        {/* Feature badges — horizontal row */}
        <div className="flex gap-2">
          <div className="flex-1 flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/8">
            <GripVertical className="h-4 w-4 text-cyan-400 shrink-0" />
            <div className="min-w-0">
              <p className="text-xs font-semibold text-foreground">Drag & drop</p>
              <p className="text-[10px] text-white/40">Reorder 8 steps</p>
            </div>
          </div>
          <div className="flex-1 flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/8">
            <Timer className="h-4 w-4 text-cyan-400 shrink-0" />
            <div className="min-w-0">
              <p className="text-xs font-semibold text-foreground">Timed</p>
              <p className="text-[10px] text-white/40">Build speed</p>
            </div>
          </div>
          <div className="flex-1 flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/8">
            <ShieldAlert className="h-4 w-4 text-amber-400 shrink-0" />
            <div className="min-w-0">
              <p className="text-xs font-semibold text-foreground">Strict</p>
              <p className="text-[10px] text-white/40">Zero tolerance</p>
            </div>
          </div>
        </div>

        {/* Warning callout */}
        <div className="flex items-start gap-3 p-3.5 rounded-xl bg-gradient-to-r from-amber-500/10 to-amber-500/5 border border-amber-500/20">
          <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-amber-300 mb-1">Top AM2 fail reasons</p>
            <ol className="text-xs text-white/60 space-y-0.5 list-decimal list-inside">
              <li>Leaving the key in the padlock</li>
              <li>Forgetting to re-prove the tester</li>
              <li>Not testing all conductor combinations (L-N, L-E, N-E)</li>
            </ol>
          </div>
        </div>
      </div>

      {/* CTA — sticky to bottom */}
      <div className="shrink-0 px-4 pb-4 pt-2">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onStart}
          className="w-full h-14 rounded-xl bg-cyan-500 text-black font-bold text-base touch-manipulation flex items-center justify-center gap-2 active:bg-cyan-600 transition-colors"
        >
          <Zap className="h-5 w-5" />
          Start Assessment
          <ArrowRight className="h-4 w-4 ml-1" />
        </motion.button>
      </div>
    </motion.div>
  );
}

// --- Sequencer Phase ---

function SequencerPhase({
  steps,
  submitted,
  results,
  onDragEnd,
  onSubmit,
}: {
  steps: typeof CORRECT_SEQUENCE;
  submitted: boolean;
  results: boolean[];
  onDragEnd: (result: DropResult) => void;
  onSubmit: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col flex-1 min-h-0"
    >
      {/* Header strip */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 shrink-0">
        <div>
          <h3 className="text-sm font-bold text-white">Arrange the sequence</h3>
          <p className="text-[10px] text-white/40 mt-0.5">
            Hold and drag each step into the correct order
          </p>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/8">
          <GripVertical className="h-3.5 w-3.5 text-cyan-400" />
          <span className="text-[10px] font-semibold text-white/50">Drag</span>
        </div>
      </div>

      {/* Scrollable card list */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="safe-isolation-steps">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex-1 overflow-y-auto overscroll-auto px-4 py-3 space-y-2"
              style={{ WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
            >
              {steps.map((step, index) => (
                <Draggable
                  key={step.id}
                  draggableId={step.id}
                  index={index}
                  isDragDisabled={submitted}
                >
                  {(provided, snapshot) => {
                    const isCorrect = submitted && results[index];
                    const isWrong = submitted && !results[index];

                    return (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          ...provided.draggableProps.style,
                          touchAction: 'none',
                          willChange: snapshot.isDragging ? 'transform' : 'auto',
                        }}
                        className={cn(
                          'flex items-center gap-3 rounded-xl border select-none touch-manipulation',
                          'transition-colors duration-150 overflow-hidden',
                          snapshot.isDragging
                            ? 'bg-cyan-500/10 border-cyan-500/30 shadow-lg shadow-cyan-500/10 scale-[1.02] z-50'
                            : 'bg-white/[0.02] border-white/8 active:bg-white/[0.05] active:border-white/15',
                          isCorrect && 'border-emerald-500/30 bg-emerald-500/[0.06]',
                          isWrong && 'border-red-500/30 bg-red-500/[0.06] animate-ios-press'
                        )}
                      >
                        {/* Left colour indicator bar */}
                        <div
                          className={cn(
                            'w-1 self-stretch shrink-0 rounded-l-xl',
                            submitted
                              ? isCorrect
                                ? 'bg-emerald-500'
                                : 'bg-red-500'
                              : snapshot.isDragging
                                ? 'bg-cyan-400'
                                : 'bg-white/10'
                          )}
                        />

                        {/* Position number */}
                        <div className="py-3 pl-1">
                          <span
                            className={cn(
                              'flex items-center justify-center h-9 w-9 rounded-xl text-sm font-bold shrink-0',
                              submitted
                                ? isCorrect
                                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                                  : 'bg-red-500/15 text-red-400 border border-red-500/20'
                                : snapshot.isDragging
                                  ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-400/20'
                                  : 'bg-white/[0.06] text-white/60 border border-white/10'
                            )}
                          >
                            {submitted ? (
                              isCorrect ? (
                                <CheckCircle2 className="h-4.5 w-4.5" />
                              ) : (
                                <XCircle className="h-4.5 w-4.5" />
                              )
                            ) : (
                              index + 1
                            )}
                          </span>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0 py-3 pr-1">
                          <p className="text-sm font-semibold text-foreground leading-tight">
                            {step.title}
                          </p>
                          <p className="text-[11px] text-white/45 leading-snug mt-0.5">
                            {step.description}
                          </p>
                          {/* Show correct position hint if wrong */}
                          {isWrong && (
                            <p className="text-[10px] text-red-400 font-semibold mt-1">
                              Correct position: Step {step.number}
                            </p>
                          )}
                        </div>

                        {/* Drag handle */}
                        {!submitted && (
                          <div className="flex flex-col items-center justify-center shrink-0 w-11 h-full pr-2 active:bg-white/[0.04]">
                            <GripVertical
                              className={cn(
                                'h-5 w-5 transition-colors',
                                snapshot.isDragging ? 'text-cyan-400' : 'text-white/20'
                              )}
                            />
                          </div>
                        )}
                      </div>
                    );
                  }}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Submit button — pinned to bottom */}
      {!submitted && (
        <div className="shrink-0 px-4 pt-2 pb-4 border-t border-white/5 bg-background">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={onSubmit}
            className="w-full h-12 rounded-xl bg-cyan-500 text-black font-bold text-sm touch-manipulation flex items-center justify-center gap-2 active:bg-cyan-600 transition-colors"
          >
            <ShieldCheck className="h-4 w-4" />
            Check My Order
          </motion.button>
        </div>
      )}
    </motion.div>
  );
}

// --- Results Phase ---

function ResultsPhase({
  steps,
  results,
  timeTaken,
  onRetry,
}: {
  steps: typeof CORRECT_SEQUENCE;
  results: boolean[];
  timeTaken: number;
  onRetry: () => void;
}) {
  const correct = results.filter(Boolean).length;
  const total = CORRECT_SEQUENCE.length;
  const isPerfect = correct === total;
  const score = Math.round((correct / total) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 180, damping: 22 }}
      className="flex flex-col flex-1 min-h-0"
    >
      <div
        className="flex-1 overflow-y-auto overscroll-auto px-4 py-5 space-y-5"
        style={{ WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
      >
        {/* Score Hero with Ring */}
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 250, damping: 20, delay: 0.1 }}
            className="relative"
          >
            <ScoreRing score={score} size={110} strokeWidth={6} />
            {/* Centred content inside ring */}
            <div className="absolute inset-0 flex flex-col items-center justify-center rotate-0">
              {isPerfect ? (
                <Trophy className="h-8 w-8 text-emerald-400" />
              ) : score >= 50 ? (
                <AlertTriangle className="h-7 w-7 text-amber-400" />
              ) : (
                <ShieldAlert className="h-7 w-7 text-red-400" />
              )}
              <span
                className={cn(
                  'text-lg font-black mt-0.5',
                  isPerfect ? 'text-emerald-400' : score >= 50 ? 'text-amber-400' : 'text-red-400'
                )}
              >
                {correct}/{total}
              </span>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-sm text-white/60 mt-3 max-w-xs"
          >
            {isPerfect
              ? 'Perfect — every step in the correct order'
              : score >= 75
                ? "Close — but close isn't good enough for safe isolation"
                : score >= 50
                  ? 'Some steps correct, but critical errors remain'
                  : 'Significant gaps — this would be an instant fail on the AM2'}
          </motion.p>

          {/* Time badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-1.5 mt-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/8"
          >
            <Timer className="h-3 w-3 text-white/40" />
            <span className="text-[11px] font-semibold text-white/50">{timeTaken}s</span>
          </motion.div>
        </div>

        {/* Correct sequence with detail shown on wrong answers */}
        <div className="space-y-2">
          <h3 className="text-[10px] font-bold text-white/50 uppercase tracking-wider px-1">
            Correct Sequence
          </h3>
          {CORRECT_SEQUENCE.map((step, index) => {
            const userStep = steps[index];
            const wasCorrect = userStep.number === step.number;

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + index * 0.04 }}
                className={cn(
                  'rounded-xl border overflow-hidden',
                  wasCorrect
                    ? 'border-emerald-500/20 bg-emerald-500/[0.04]'
                    : 'border-white/8 bg-white/[0.02]'
                )}
              >
                <div className="flex items-start gap-3 p-3">
                  <span
                    className={cn(
                      'flex items-center justify-center h-7 w-7 rounded-lg text-xs font-bold shrink-0',
                      wasCorrect
                        ? 'bg-emerald-500/15 text-emerald-400'
                        : 'bg-white/[0.06] text-white/50'
                    )}
                  >
                    {step.number}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-foreground">{step.title}</p>
                      {wasCorrect && (
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      )}
                    </div>
                    <p className="text-[11px] text-white/45 mt-0.5">{step.description}</p>
                  </div>
                </div>
                {/* Expanded detail — shown only for wrong answers to help learning */}
                {!wasCorrect && (
                  <div className="px-3 pb-3 pt-0 ml-10">
                    <div className="flex items-start gap-2 p-2.5 rounded-lg bg-cyan-500/[0.05] border border-cyan-400/10">
                      <Info className="h-3.5 w-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <p className="text-[11px] text-cyan-300/80 leading-relaxed">{step.detail}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Key learning points */}
        {!isPerfect && (
          <div className="rounded-xl bg-gradient-to-r from-amber-500/10 to-amber-500/5 border border-amber-500/20 p-4 space-y-2">
            <div className="flex items-center gap-1.5">
              <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
              <p className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                Remember
              </p>
            </div>
            <ul className="space-y-1.5 text-xs text-white/60">
              <li className="flex items-start gap-2">
                <span className="text-amber-400/50 mt-0.5 shrink-0">&bull;</span>
                Prove → Isolate → Lock → Key in pocket → Notice → Test → Re-prove
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400/50 mt-0.5 shrink-0">&bull;</span>
                The key goes in YOUR pocket, not left in the padlock
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400/50 mt-0.5 shrink-0">&bull;</span>
                Always re-prove the tester AFTER testing for dead
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400/50 mt-0.5 shrink-0">&bull;</span>
                Test ALL conductor combinations: L-N, L-E, N-E
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Retry — sticky bottom */}
      <div className="shrink-0 px-4 pt-2 pb-4 border-t border-white/5 bg-background">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onRetry}
          className="w-full h-12 rounded-xl bg-cyan-500 text-black font-bold text-sm touch-manipulation flex items-center justify-center gap-2 active:bg-cyan-600 transition-colors"
        >
          <RotateCcw className="h-4 w-4" />
          {isPerfect ? 'Practise Again' : 'Try Again'}
        </motion.button>
      </div>
    </motion.div>
  );
}

export default SafeIsolationAssessment;
