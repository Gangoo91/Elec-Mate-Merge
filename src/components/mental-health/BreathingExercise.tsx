import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Play, Pause, RotateCcw, Volume2, VolumeX, Check } from 'lucide-react';
import {
  Eyebrow,
  PrimaryButton,
  SecondaryButton,
  IconButton,
} from '@/components/college/primitives';

type PhaseKind = 'inhale' | 'hold' | 'exhale' | 'holdEmpty';

interface PatternPhase {
  kind: PhaseKind;
  duration: number;
}

interface Pattern {
  id: 'box' | '478' | 'coherent';
  name: string;
  tagline: string;
  cycles: number;
  phases: PatternPhase[];
  readyTip: string;
  completeTip: string;
}

// Three evidence-based patterns. Box breathing previously skipped the fourth
// side of the box (the empty hold) — it was in-hold-out, not a box at all.
const PATTERNS: Pattern[] = [
  {
    id: 'box',
    name: 'Box breathing',
    tagline: '4 · 4 · 4 · 4',
    cycles: 4,
    phases: [
      { kind: 'inhale', duration: 4 },
      { kind: 'hold', duration: 4 },
      { kind: 'exhale', duration: 4 },
      { kind: 'holdEmpty', duration: 4 },
    ],
    readyTip:
      'Box breathing activates your parasympathetic nervous system, reducing stress and anxiety.',
    completeTip:
      'Regular practice can help manage stress, improve focus, and promote better sleep.',
  },
  {
    id: '478',
    name: '4-7-8',
    tagline: '4 in · 7 hold · 8 out',
    cycles: 4,
    phases: [
      { kind: 'inhale', duration: 4 },
      { kind: 'hold', duration: 7 },
      { kind: 'exhale', duration: 8 },
    ],
    readyTip:
      'The long exhale of 4-7-8 acts as a natural tranquilliser — a favourite for winding down before sleep.',
    completeTip: 'Best used at the same time each day. Many people use it last thing at night.',
  },
  {
    id: 'coherent',
    name: 'Coherent',
    tagline: '5 in · 5 out',
    cycles: 6,
    phases: [
      { kind: 'inhale', duration: 5 },
      { kind: 'exhale', duration: 5 },
    ],
    readyTip:
      'Slow, even breathing at six breaths a minute balances heart-rate rhythm — steady and sustainable.',
    completeTip:
      'Coherent breathing works well as a daily habit — even two minutes makes a difference.',
  },
];

// Cool, calming per-phase tones: draw in blue, hold violet, release cyan.
const PHASE_STYLE: Record<
  PhaseKind,
  { instruction: string; circle: string; text: string; pill: string; note: number }
> = {
  inhale: {
    instruction: 'Breathe In',
    circle: 'bg-blue-500/10 border-blue-400/40',
    text: 'text-blue-200',
    pill: 'bg-blue-500/25 text-blue-100 border border-blue-400/40',
    note: 392,
  },
  hold: {
    instruction: 'Hold',
    circle: 'bg-purple-500/10 border-purple-400/40',
    text: 'text-purple-200',
    pill: 'bg-purple-500/25 text-purple-100 border border-purple-400/40',
    note: 494,
  },
  exhale: {
    instruction: 'Breathe Out',
    circle: 'bg-cyan-500/10 border-cyan-400/40',
    text: 'text-cyan-200',
    pill: 'bg-cyan-500/25 text-cyan-100 border border-cyan-400/40',
    note: 330,
  },
  holdEmpty: {
    instruction: 'Hold Empty',
    circle: 'bg-slate-500/10 border-slate-400/40',
    text: 'text-slate-200',
    pill: 'bg-slate-500/25 text-slate-100 border border-slate-400/40',
    note: 262,
  },
};

const PHASE_LABEL: Record<PhaseKind, string> = {
  inhale: 'In',
  hold: 'Hold',
  exhale: 'Out',
  holdEmpty: 'Hold',
};

interface BreathingExerciseProps {
  onClose: () => void;
  /** Lock to one pattern (hides the selector) — used by Grounding. */
  pattern?: Pattern['id'];
  /** Called once when all cycles finish — lets callers log completion. */
  onComplete?: () => void;
}

const BreathingExercise = ({ onClose, pattern, onComplete }: BreathingExerciseProps) => {
  const [patternId, setPatternId] = useState<Pattern['id']>(pattern ?? 'box');
  const active = PATTERNS.find((p) => p.id === patternId) ?? PATTERNS[0];

  const [isActive, setIsActive] = useState(false);
  const [stage, setStage] = useState<'ready' | 'running' | 'complete'>('ready');
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(active.phases[0].duration);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const currentPhase = active.phases[phaseIndex] ?? active.phases[0];
  const style = PHASE_STYLE[currentPhase.kind];

  // Respect the OS-level reduce-motion setting. When on, we replace the
  // expanding/shrinking circle with a colour crossfade only, so users with
  // vestibular sensitivity can still follow the timer.
  const [reduceMotion, setReduceMotion] = useState<boolean>(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);

  // Soft sine cue at each phase change so the exercise works eyes-closed.
  const audioCtxRef = useRef<AudioContext | null>(null);
  const playTone = (freq: number) => {
    try {
      if (!audioCtxRef.current) {
        const Ctx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new Ctx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') void ctx.resume();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.65);
    } catch {
      /* audio unavailable — never interrupt the exercise */
    }
  };

  // One-shot haptic pulse on phase change — pocket/eyes-closed rhythm.
  const buzz = (ms: number) => {
    try {
      navigator.vibrate?.(ms);
    } catch {
      /* ignore */
    }
  };

  // Announce on every phase transition while running. Driven by state, not
  // called inside the interval's setState updater — updaters can be invoked
  // twice in dev StrictMode, which would double-beep.
  const announceKeyRef = useRef<string>('');
  useEffect(() => {
    if (stage !== 'running') {
      announceKeyRef.current = '';
      return;
    }
    const key = `${cyclesCompleted}-${phaseIndex}`;
    if (announceKeyRef.current === key) return;
    announceKeyRef.current = key;
    const kind = active.phases[phaseIndex]?.kind;
    if (!kind) return;
    if (soundEnabled) playTone(PHASE_STYLE[kind].note);
    buzz(kind === 'inhale' ? 30 : 15);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, phaseIndex, cyclesCompleted]);

  useEffect(() => {
    if (isActive && stage === 'running') {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev > 1) return prev - 1;

          // Advance to the next phase in the pattern
          const nextIndex = phaseIndex + 1;
          if (nextIndex < active.phases.length) {
            setPhaseIndex(nextIndex);
            return active.phases[nextIndex].duration;
          }

          // Cycle finished
          const newCycles = cyclesCompleted + 1;
          setCyclesCompleted(newCycles);
          if (newCycles >= active.cycles) {
            setStage('complete');
            setIsActive(false);
            onCompleteRef.current?.();
            return 0;
          }
          setPhaseIndex(0);
          return active.phases[0].duration;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, stage, phaseIndex, cyclesCompleted, active]);

  useEffect(() => {
    return () => {
      void audioCtxRef.current?.close().catch(() => {});
    };
  }, []);

  const startExercise = () => {
    setPhaseIndex(0);
    setTimeLeft(active.phases[0].duration);
    setCyclesCompleted(0);
    setStage('running');
    setIsActive(true);
  };

  const reset = () => {
    setIsActive(false);
    setStage('ready');
    setPhaseIndex(0);
    setTimeLeft(active.phases[0].duration);
    setCyclesCompleted(0);
  };

  const selectPattern = (id: Pattern['id']) => {
    setPatternId(id);
    const next = PATTERNS.find((p) => p.id === id) ?? PATTERNS[0];
    setPhaseIndex(0);
    setTimeLeft(next.phases[0].duration);
    setCyclesCompleted(0);
  };

  const getCircleScale = () => {
    if (stage !== 'running') return 1;
    const progress = (currentPhase.duration - timeLeft) / currentPhase.duration;
    if (currentPhase.kind === 'inhale') return 1 + progress * 0.5;
    if (currentPhase.kind === 'exhale') return 1.5 - progress * 0.5;
    if (currentPhase.kind === 'hold') return 1.5;
    return 1; // holdEmpty — lungs empty, circle small
  };

  return (
    <div className="min-h-[80vh] flex flex-col">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-[hsl(0_0%_8%)]/95 backdrop-blur-xl border-b border-white/[0.06] px-4 py-3 -mx-4 mb-4">
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full text-[13px] font-medium text-white hover:bg-white/[0.06] transition-colors touch-manipulation"
          >
            <ArrowLeft className="h-5 w-5" />
            Back
          </button>
          <IconButton
            onClick={() => setSoundEnabled(!soundEnabled)}
            aria-label={soundEnabled ? 'Mute sound' : 'Enable sound'}
          >
            {soundEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
          </IconButton>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        {stage === 'complete' ? (
          /* Completion Screen */
          <div className="text-center space-y-6 animate-fade-in max-w-sm">
            <div className="w-24 h-24 mx-auto rounded-full bg-elec-yellow flex items-center justify-center">
              <Check className="h-12 w-12 text-black" />
            </div>
            <div>
              <Eyebrow>Mental health</Eyebrow>
              <h2 className="mt-1.5 text-[22px] sm:text-[28px] font-semibold text-white tracking-tight leading-tight">
                Well done
              </h2>
              <p className="mt-3 text-[13px] text-white">
                You completed {active.cycles} cycles of {active.name.toLowerCase()}.
              </p>
              <p className="mt-1 text-[12.5px] text-white">Take a moment to notice how you feel.</p>
            </div>
            <div className="flex gap-3 justify-center">
              <SecondaryButton onClick={reset} size="lg">
                <RotateCcw className="h-5 w-5 mr-2" />
                Again
              </SecondaryButton>
              <PrimaryButton onClick={onClose} size="lg">
                Done
              </PrimaryButton>
            </div>
          </div>
        ) : (
          /* Exercise Screen */
          <>
            <div className="text-center mb-6">
              <Eyebrow>Mental health</Eyebrow>
              <h2 className="mt-1.5 text-xl sm:text-2xl font-semibold text-white tracking-tight">
                {active.name}
              </h2>
              <p className="mt-2 text-[13px] text-white">
                {stage === 'ready'
                  ? 'Find a comfortable position and relax'
                  : `Cycle ${cyclesCompleted + 1} of ${active.cycles}`}
              </p>
            </div>

            {/* Pattern selector — hidden when locked or mid-exercise */}
            {!pattern && stage === 'ready' && (
              <div className="flex gap-2 mb-8">
                {PATTERNS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => selectPattern(p.id)}
                    className={`px-4 py-2.5 rounded-2xl border text-left transition-all touch-manipulation active:scale-[0.97] ${
                      p.id === patternId
                        ? 'bg-elec-yellow/[0.12] border-elec-yellow/40'
                        : 'bg-[hsl(0_0%_12%)] border-white/[0.08] hover:bg-[hsl(0_0%_14%)]'
                    }`}
                  >
                    <span
                      className={`block text-[12.5px] font-semibold ${
                        p.id === patternId ? 'text-elec-yellow' : 'text-white'
                      }`}
                    >
                      {p.name}
                    </span>
                    <span className="block text-[10.5px] text-white/55 mt-0.5 tabular-nums">
                      {p.tagline}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* Breathing Circle - Responsive for mobile */}
            <div className="relative w-[min(16rem,80vw)] h-[min(16rem,80vw)] mb-8">
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border-4 border-white/[0.08]" />

              {/* Progress ring */}
              {stage === 'running' && (
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 256 256">
                  <circle
                    cx="128"
                    cy="128"
                    r="124"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeDasharray={780}
                    strokeDashoffset={780 - 780 * (cyclesCompleted / active.cycles)}
                    className="text-elec-yellow/40 transition-all duration-500"
                  />
                </svg>
              )}

              {/* Animated breathing circle — scale animation disabled when the
                  user has prefers-reduced-motion set (colour crossfade only) */}
              <div
                className={`absolute inset-4 rounded-full border flex items-center justify-center ${
                  stage !== 'running' ? 'bg-white/[0.04] border-white/[0.06]' : style.circle
                } ${
                  reduceMotion
                    ? 'transition-colors duration-700'
                    : 'transition-all duration-1000 ease-in-out'
                }`}
                style={{ transform: `scale(${reduceMotion ? 1.25 : getCircleScale()})` }}
              >
                <div className="text-center text-white">
                  {stage === 'ready' ? (
                    <div className="text-lg font-medium">Ready?</div>
                  ) : (
                    <>
                      <div className="text-4xl sm:text-5xl font-bold mb-1 tabular-nums">
                        {timeLeft}
                      </div>
                      <div className={`text-sm font-medium ${style.text}`}>{style.instruction}</div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Phase Indicators — one pill per phase in the pattern */}
            {stage === 'running' && (
              <div className="flex gap-2 mb-8">
                {active.phases.map((p, i) => (
                  <div
                    key={`${p.kind}-${i}`}
                    className={`text-[12.5px] px-4 py-1.5 rounded-full transition-all font-medium tabular-nums ${
                      i === phaseIndex
                        ? PHASE_STYLE[p.kind].pill
                        : 'bg-white/[0.06] text-white/60 border border-white/[0.08]'
                    }`}
                  >
                    {PHASE_LABEL[p.kind]} {p.duration}
                  </div>
                ))}
              </div>
            )}

            {/* Controls */}
            <div className="flex gap-3">
              {stage === 'ready' ? (
                <PrimaryButton onClick={startExercise} size="lg">
                  <Play className="h-5 w-5 mr-2" />
                  Start
                </PrimaryButton>
              ) : (
                <>
                  <SecondaryButton onClick={() => setIsActive(!isActive)} size="lg">
                    {isActive ? (
                      <>
                        <Pause className="h-5 w-5 mr-2" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="h-5 w-5 mr-2" />
                        Resume
                      </>
                    )}
                  </SecondaryButton>
                  <IconButton onClick={reset} aria-label="Reset">
                    <RotateCcw className="h-5 w-5" />
                  </IconButton>
                </>
              )}
            </div>
          </>
        )}
      </div>

      {/* Tips */}
      <div className="mt-auto bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-4">
        <p className="text-[12.5px] text-white text-center leading-relaxed">
          {stage === 'ready'
            ? active.readyTip
            : stage === 'complete'
              ? active.completeTip
              : 'Focus on the rhythm. Let your thoughts pass without judgment.'}
        </p>
      </div>
    </div>
  );
};

export default BreathingExercise;
