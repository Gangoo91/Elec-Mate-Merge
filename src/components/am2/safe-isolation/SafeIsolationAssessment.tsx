/**
 * SafeIsolationAssessment
 *
 * Interactive safe isolation procedure simulator.
 * Three phases: Intro → Sequencer (drag-and-drop) → Results
 *
 * The #1 reason candidates fail the AM2 is safe isolation errors.
 * This assessment drills the correct 8-step sequence.
 */

import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DragDropContext, Droppable, Draggable, type DropResult } from '@hello-pangea/dnd';
import {
  Lock,
  ShieldCheck,
  ShieldAlert,
  GripVertical,
  RotateCcw,
  ChevronRight,
  Zap,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Timer,
  Trophy,
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
  },
  {
    id: 'step-2',
    number: 2,
    title: 'Select approved voltage indicator',
    description: 'Select a GS38-compliant voltage indicating device',
    detail: 'Must have fused test leads, finger guards, and be rated for the voltage.',
  },
  {
    id: 'step-3',
    number: 3,
    title: 'Prove the tester',
    description: 'Prove the voltage indicator works on a known live source',
    detail: 'Use a proving unit or a known live source. The tester MUST show a reading.',
  },
  {
    id: 'step-4',
    number: 4,
    title: 'Isolate the supply',
    description: 'Switch off the isolator, lock off with a padlock',
    detail: 'Operate the circuit breaker/isolator to the OFF position.',
  },
  {
    id: 'step-5',
    number: 5,
    title: 'Secure the isolation',
    description: 'Lock the padlock, remove the key, place key in your pocket',
    detail: 'The #1 AM2 fail reason is leaving the key in the padlock. Key goes in YOUR pocket.',
  },
  {
    id: 'step-6',
    number: 6,
    title: 'Fit warning notice',
    description: 'Attach "Danger — Do Not Switch On" warning notice',
    detail: 'The notice must be visible and clearly state the danger.',
  },
  {
    id: 'step-7',
    number: 7,
    title: 'Prove dead',
    description: 'Test between all conductors: L-N, L-E, N-E to prove dead',
    detail: 'All three combinations must read 0V. If any shows voltage, STOP and re-isolate.',
  },
  {
    id: 'step-8',
    number: 8,
    title: 'Re-prove the tester',
    description: 'Prove the voltage indicator still works on the known live source',
    detail:
      "This confirms your tester didn't fail during the procedure. Many candidates forget this step.",
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

    // Save score to readiness tracker
    saveScore('safeIsolation', score);

    if (isPerfect) {
      triggerHaptic(ImpactStyle.Heavy);
    } else {
      triggerHaptic(ImpactStyle.Medium);
    }

    // Delay transition to results for animation
    setTimeout(() => setPhase('results'), 600);
  }, [steps, startTime, saveScore, triggerHaptic]);

  const handleRetry = useCallback(() => {
    handleStart();
  }, [handleStart]);

  return (
    <div className="min-h-[60vh]">
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

// --- Intro Phase ---

function IntroPhase({ onStart }: { onStart: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="px-4 py-8 space-y-6"
    >
      {/* Hero */}
      <div className="flex flex-col items-center text-center space-y-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.1 }}
          className="h-20 w-20 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center"
        >
          <Lock className="h-10 w-10 text-cyan-400" />
        </motion.div>

        <h2 className="text-xl font-bold text-white">Safe Isolation Procedure</h2>
        <p className="text-sm text-white/70 max-w-sm">
          The single biggest reason candidates fail the AM2 is getting safe isolation wrong. Put the
          8 steps in the correct order — zero tolerance for errors.
        </p>
      </div>

      {/* What you'll do */}
      <div className="space-y-3">
        <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/10">
          <GripVertical className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">Drag and drop</p>
            <p className="text-xs text-white/60">
              Arrange the 8 safe isolation steps in the correct order
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/10">
          <Timer className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">Timed</p>
            <p className="text-xs text-white/60">
              Your time is tracked — build speed and confidence
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/10">
          <ShieldAlert className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">Zero tolerance</p>
            <p className="text-xs text-white/60">
              In the real AM2, one mistake here means instant fail
            </p>
          </div>
        </div>
      </div>

      {/* Warning */}
      <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30">
        <p className="text-xs text-amber-300">
          <strong>Top tip:</strong> The most common error is leaving the key in the padlock. The
          second is forgetting to re-prove the tester afterwards.
        </p>
      </div>

      {/* CTA */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={onStart}
        className="w-full h-14 rounded-xl bg-cyan-500 text-black font-bold text-base touch-manipulation flex items-center justify-center gap-2 active:bg-cyan-600 transition-colors"
      >
        <Zap className="h-5 w-5" />
        Start Assessment
      </motion.button>
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
      transition={{ duration: 0.3 }}
      className="px-4 py-5 space-y-4"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white/80">Drag steps into the correct order</h3>
        <div className="flex items-center gap-1 text-xs text-white/40">
          <GripVertical className="h-3 w-3" />
          Hold & drag
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="safe-isolation-steps">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="space-y-2 overflow-y-auto overscroll-contain -mx-4 px-4"
              style={{ maxHeight: 'calc(100vh - 220px)' }}
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
                        }}
                        className={cn(
                          'flex items-center gap-3 p-3.5 rounded-xl border transition-all duration-200 select-none',
                          snapshot.isDragging
                            ? 'bg-cyan-500/10 border-cyan-500/40 shadow-lg shadow-cyan-500/10 scale-[1.02] z-50'
                            : 'bg-white/[0.03] border-white/10',
                          isCorrect && 'border-emerald-500/40 bg-emerald-500/10',
                          isWrong && 'border-red-500/40 bg-red-500/10 animate-ios-press'
                        )}
                      >
                        {/* Position number */}
                        <span
                          className={cn(
                            'flex items-center justify-center h-7 w-7 rounded-lg text-xs font-bold shrink-0',
                            submitted
                              ? isCorrect
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : 'bg-red-500/20 text-red-400'
                              : snapshot.isDragging
                                ? 'bg-cyan-500/20 text-cyan-400'
                                : 'bg-white/10 text-white/60'
                          )}
                        >
                          {submitted ? (
                            isCorrect ? (
                              <CheckCircle2 className="h-4 w-4" />
                            ) : (
                              <XCircle className="h-4 w-4" />
                            )
                          ) : (
                            index + 1
                          )}
                        </span>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground">{step.title}</p>
                          <p className="text-xs text-white/50 truncate">{step.description}</p>
                        </div>

                        {/* Drag handle indicator */}
                        {!submitted && (
                          <div className="flex flex-col items-center justify-center shrink-0 p-1">
                            <GripVertical
                              className={cn(
                                'h-5 w-5 transition-colors',
                                snapshot.isDragging ? 'text-cyan-400' : 'text-white/30'
                              )}
                            />
                          </div>
                        )}

                        {/* Show correct position if wrong */}
                        {isWrong && (
                          <span className="text-[10px] text-red-400 shrink-0 font-medium">
                            Should be {step.number}
                          </span>
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

      {/* Submit button */}
      {!submitted && (
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onSubmit}
          className="w-full h-12 rounded-xl bg-cyan-500 text-black font-bold text-sm touch-manipulation flex items-center justify-center gap-2"
        >
          <ShieldCheck className="h-4 w-4" />
          Check My Order
        </motion.button>
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
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      className="px-4 py-6 space-y-5"
    >
      {/* Score Hero */}
      <div className="flex flex-col items-center text-center space-y-3">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
          className={cn(
            'h-20 w-20 rounded-2xl flex items-center justify-center',
            isPerfect
              ? 'bg-emerald-500/10 border border-emerald-500/20'
              : score >= 50
                ? 'bg-amber-500/10 border border-amber-500/20'
                : 'bg-red-500/10 border border-red-500/20'
          )}
        >
          {isPerfect ? (
            <Trophy className="h-10 w-10 text-emerald-400" />
          ) : score >= 50 ? (
            <AlertTriangle className="h-10 w-10 text-amber-400" />
          ) : (
            <ShieldAlert className="h-10 w-10 text-red-400" />
          )}
        </motion.div>

        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={cn(
              'text-4xl font-bold',
              isPerfect ? 'text-emerald-400' : score >= 50 ? 'text-amber-400' : 'text-red-400'
            )}
          >
            {correct}/{total}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-sm text-white/60 mt-1"
          >
            {isPerfect
              ? 'Perfect — every step in the correct order'
              : score >= 75
                ? "Close — but close isn't good enough for safe isolation"
                : score >= 50
                  ? 'Some steps correct, but critical errors remain'
                  : 'Significant gaps — this would be an instant fail on the AM2'}
          </motion.p>
        </div>

        {/* Time */}
        <div className="flex items-center gap-1 text-xs text-white/40">
          <Timer className="h-3 w-3" />
          Completed in {timeTaken}s
        </div>
      </div>

      {/* Correct sequence with explanations */}
      <div className="space-y-2">
        <h3 className="text-xs font-semibold text-white/80 uppercase tracking-wider">
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
              transition={{ delay: 0.1 + index * 0.05 }}
              className={cn(
                'p-3 rounded-xl border',
                wasCorrect
                  ? 'border-emerald-500/20 bg-emerald-500/5'
                  : 'border-white/10 bg-white/[0.02]'
              )}
            >
              <div className="flex items-start gap-3">
                <span
                  className={cn(
                    'flex items-center justify-center h-6 w-6 rounded-lg text-xs font-bold shrink-0',
                    wasCorrect ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10 text-white/60'
                  )}
                >
                  {step.number}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{step.title}</p>
                  <p className="text-xs text-white/50 mt-0.5">{step.description}</p>
                  <p className="text-xs text-cyan-400/80 mt-1">{step.detail}</p>
                </div>
                {wasCorrect && (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Key learning points */}
      {!isPerfect && (
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-2">
          <p className="text-xs font-semibold text-amber-400">Remember</p>
          <ul className="space-y-1 text-xs text-white/70">
            <li>• Prove → Isolate → Lock → Key in pocket → Notice → Test → Re-prove</li>
            <li>• The key goes in YOUR pocket, not left in the padlock</li>
            <li>• Always re-prove the tester AFTER testing for dead</li>
            <li>• Test ALL conductor combinations: L-N, L-E, N-E</li>
          </ul>
        </div>
      )}

      {/* Actions */}
      <div className="space-y-2">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onRetry}
          className="w-full h-12 rounded-xl bg-cyan-500 text-black font-bold text-sm touch-manipulation flex items-center justify-center gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          {isPerfect ? 'Practise Again' : 'Try Again'}
        </motion.button>
      </div>
    </motion.div>
  );
}

export default SafeIsolationAssessment;
