/**
 * FaultFindingSimulator
 *
 * Interactive AM2 fault diagnosis simulation.
 * Presents 7 faults across different circuit types.
 * User taps test points, reads the multimeter, and diagnoses faults.
 *
 * Features:
 *   - Three modes: Practice (untimed), Exam (2h countdown), Guided (tutorial)
 *   - Hint system that costs marks (like asking the assessor)
 *   - Contextual guided tips in Guided mode
 *   - Probe flash animation on readings
 *   - Score analytics with localStorage history
 *   - Sound effects + haptic feedback
 *
 * 40% of AM2 failures are in fault finding — this is the highest-impact feature.
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Zap,
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Trophy,
  AlertTriangle,
  ShieldAlert,
  Timer,
  MapPin,
  ArrowRight,
  HelpCircle,
  BookOpen,
  Clock,
  Lightbulb,
  TrendingUp,
  Target,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';
import { MultimeterDisplay } from './MultimeterDisplay';
import { CircuitPathDiagram } from './CircuitPathDiagram';
import {
  pickSessionFaults,
  type FaultScenario,
  type FaultType,
  type TestMode,
  type TestPoint,
  type TestReading,
} from '@/data/am2-fault-scenarios';
import { useAM2Readiness } from '@/hooks/am2/useAM2Readiness';
import { useMultimeterSounds } from '@/hooks/am2/useMultimeterSounds';

// ── Types ────────────────────────────────────────────────────

type Phase = 'intro' | 'testing' | 'diagnosing' | 'feedback' | 'results';
type SessionMode = 'practice' | 'exam' | 'guided';

interface FaultState {
  scenario: FaultScenario;
  testsPerformed: string[];
  selectedDiagnosis: string | null;
  isCorrect: boolean | null;
  startTime: number;
  timeTaken: number;
  hintsUsed: number;
}

// ── Analytics persistence ────────────────────────────────────

const HISTORY_KEY = 'am2_fault_finding_history';

interface SessionRecord {
  date: string;
  mode: SessionMode;
  score: number;
  correct: number;
  total: number;
  timeUsed: number;
  faults: {
    circuitType: string;
    faultType: FaultType;
    correct: boolean;
    hintsUsed: number;
    testsPerformed: number;
    timeTaken: number;
  }[];
}

function loadHistory(): SessionRecord[] {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveSessionRecord(record: SessionRecord) {
  const history = loadHistory();
  history.push(record);
  // Keep last 50 sessions
  if (history.length > 50) history.splice(0, history.length - 50);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

// ── Hint generation ──────────────────────────────────────────

const FAULT_TYPE_LABELS: Record<FaultType, string> = {
  open_circuit: 'an open circuit',
  short_circuit: 'a short circuit',
  reversed_polarity: 'reversed polarity',
  high_resistance: 'a high resistance connection',
};

function generateHint(fault: FaultScenario, level: 1 | 2): string {
  if (level === 1) {
    return `The fault type is ${FAULT_TYPE_LABELS[fault.correctFaultType]}. Think about what readings this would produce.`;
  }

  // Level 2 — point toward the location
  const abnormalPoint = fault.testPoints.find((p) => p.tests.some((t) => t.isAbnormal));

  if (abnormalPoint) {
    return `Focus your testing at ${abnormalPoint.location}. Compare readings there with other locations to narrow down exactly where the fault is.`;
  }

  return `Test systematically from the distribution board outward. The fault is between two points where readings change.`;
}

// ── Timer formatting ─────────────────────────────────────────

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${m}:${String(s).padStart(2, '0')}`;
}

// ── Guided mode tips ─────────────────────────────────────────

function getGuidedTip(
  testsPerformed: string[],
  fault: FaultScenario,
  meterMode: TestMode,
  phase: Phase
): string | null {
  const testCount = testsPerformed.length;
  const hasAbnormal = fault.testPoints.some((p) =>
    p.tests.some((t) => testsPerformed.includes(t.id) && t.isAbnormal)
  );

  if (phase === 'diagnosing') {
    return 'Review your findings below. Which diagnosis matches the pattern of readings you measured? Think about what each abnormal reading tells you.';
  }

  if (testCount === 0) {
    return `Start by tapping a test location on the circuit diagram. Begin at the Distribution Board — it's the common reference point. Your meter is set to ${meterMode === 'continuity' ? 'continuity (Ω)' : 'insulation resistance (MΩ)'}.`;
  }

  if (testCount === 1 && !hasAbnormal) {
    return 'First reading looks normal. Move to the next test point and compare. Faults show up as differences between locations.';
  }

  if (testCount === 1 && hasAbnormal) {
    return 'You found an abnormal reading straight away! Now test at other locations to confirm and narrow down exactly where the fault is.';
  }

  if (hasAbnormal && testCount >= 2) {
    return 'You have abnormal readings. Think about what they mean together — do they point to a specific section of the circuit? When you\'re confident, tap "Diagnose".';
  }

  if (testCount >= 2 && !hasAbnormal) {
    return 'Readings are normal so far. Try switching meter mode or testing at different locations. Remember: some faults only show on insulation resistance.';
  }

  return null;
}

// ── Main Component ───────────────────────────────────────────

export function FaultFindingSimulator() {
  const [phase, setPhase] = useState<Phase>('intro');
  const [sessionMode, setSessionMode] = useState<SessionMode>('practice');
  const [faults, setFaults] = useState<FaultScenario[]>([]);
  const [faultStates, setFaultStates] = useState<FaultState[]>([]);
  const [currentFaultIndex, setCurrentFaultIndex] = useState(0);
  const [meterMode, setMeterMode] = useState<TestMode>('continuity');
  const [currentReading, setCurrentReading] = useState<TestReading | null>(null);
  const [expandedPoint, setExpandedPoint] = useState<string | null>(null);
  const [sessionStartTime, setSessionStartTime] = useState(0);

  // Timer state (exam mode)
  const [timeRemaining, setTimeRemaining] = useState(7200); // 2 hours
  const [timerActive, setTimerActive] = useState(false);

  // Hint state
  const [currentHintLevel, setCurrentHintLevel] = useState(0); // 0 = no hint shown, 1 = hint 1, 2 = hint 2

  // Probe flash animation
  const [probeFlash, setProbeFlash] = useState(false);

  const { saveScore } = useAM2Readiness();
  const sounds = useMultimeterSounds();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const triggerHaptic = useCallback(async (style: ImpactStyle = ImpactStyle.Light) => {
    try {
      await Haptics.impact({ style });
    } catch {
      /* web */
    }
  }, []);

  const triggerNotification = useCallback(async (type: NotificationType) => {
    try {
      await Haptics.notification({ type });
    } catch {
      /* web */
    }
  }, []);

  // ── Timer effect ──
  useEffect(() => {
    if (timerActive && sessionMode === 'exam') {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            setTimerActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timerActive, sessionMode]);

  // Handle time running out
  useEffect(() => {
    if (sessionMode === 'exam' && timeRemaining === 0 && phase !== 'results' && phase !== 'intro') {
      sounds.failBuzz();
      triggerNotification(NotificationType.Error);

      // Save whatever progress exists
      const correct = faultStates.filter((f) => f.isCorrect).length;
      const score = Math.round((correct / faults.length) * 100);
      saveScore('faultDiagnosis', score);

      // Save analytics
      saveSessionRecord({
        date: new Date().toISOString(),
        mode: sessionMode,
        score,
        correct,
        total: faults.length,
        timeUsed: 7200,
        faults: faultStates.map((s) => ({
          circuitType: s.scenario.circuitType,
          faultType: s.scenario.correctFaultType,
          correct: s.isCorrect ?? false,
          hintsUsed: s.hintsUsed,
          testsPerformed: s.testsPerformed.length,
          timeTaken: s.timeTaken || Math.round((Date.now() - s.startTime) / 1000),
        })),
      });

      setPhase('results');
    }
  }, [
    timeRemaining,
    sessionMode,
    phase,
    faultStates,
    faults.length,
    saveScore,
    sounds,
    triggerNotification,
  ]);

  // ── Handlers ──

  const handleStart = useCallback(
    (mode: SessionMode) => {
      const sessionFaults = pickSessionFaults(7);
      setSessionMode(mode);
      setFaults(sessionFaults);
      setFaultStates(
        sessionFaults.map((s) => ({
          scenario: s,
          testsPerformed: [],
          selectedDiagnosis: null,
          isCorrect: null,
          startTime: Date.now(),
          timeTaken: 0,
          hintsUsed: 0,
        }))
      );
      setCurrentFaultIndex(0);
      setCurrentReading(null);
      setExpandedPoint(null);
      setMeterMode('continuity');
      setSessionStartTime(Date.now());
      setCurrentHintLevel(0);

      // Timer for exam mode
      if (mode === 'exam') {
        setTimeRemaining(7200);
        setTimerActive(true);
      } else {
        setTimerActive(false);
      }

      setPhase('testing');
      triggerHaptic(ImpactStyle.Medium);
      sounds.sessionStart();
    },
    [triggerHaptic, sounds]
  );

  const handleTest = useCallback(
    (test: TestReading) => {
      setCurrentReading(test);

      // Probe flash
      setProbeFlash(true);
      setTimeout(() => setProbeFlash(false), 300);

      // Sound: probe tap first, then reading-specific sound
      sounds.probeTap();
      setTimeout(() => {
        if (test.reading === 'OL') {
          // OL = silence on real meter
        } else if (test.mode === 'continuity') {
          const value = parseFloat(test.reading);
          if (!isNaN(value) && value < 30) {
            sounds.continuityBeep();
          }
        } else {
          sounds.irWhine();
        }

        if (test.isAbnormal) {
          setTimeout(() => sounds.abnormalAlert(), 250);
        }
      }, 150);

      if (test.isAbnormal) {
        triggerHaptic(ImpactStyle.Heavy);
      } else {
        triggerHaptic(ImpactStyle.Light);
      }

      setFaultStates((prev) => {
        const next = [...prev];
        const state = { ...next[currentFaultIndex] };
        if (!state.testsPerformed.includes(test.id)) {
          state.testsPerformed = [...state.testsPerformed, test.id];
        }
        next[currentFaultIndex] = state;
        return next;
      });
    },
    [currentFaultIndex, triggerHaptic, sounds]
  );

  const handleModeChange = useCallback(
    (mode: TestMode) => {
      setMeterMode(mode);
      setCurrentReading(null);
      sounds.modeClick();
      triggerHaptic(ImpactStyle.Light);
    },
    [sounds, triggerHaptic]
  );

  const handleReadyToDiagnose = useCallback(() => {
    setPhase('diagnosing');
    triggerHaptic(ImpactStyle.Medium);
    sounds.modeClick();
  }, [triggerHaptic, sounds]);

  const handleUseHint = useCallback(() => {
    const nextLevel = currentHintLevel + 1;
    if (nextLevel > 2) return;

    setCurrentHintLevel(nextLevel);
    triggerHaptic(ImpactStyle.Medium);

    // Track hints on the fault state
    setFaultStates((prev) => {
      const next = [...prev];
      next[currentFaultIndex] = {
        ...next[currentFaultIndex],
        hintsUsed: nextLevel,
      };
      return next;
    });
  }, [currentHintLevel, currentFaultIndex, triggerHaptic]);

  const handleDiagnose = useCallback(
    (optionId: string) => {
      const fault = faults[currentFaultIndex];
      const option = fault.diagnosisOptions.find((o) => o.id === optionId);
      const isCorrect = option?.isCorrect ?? false;

      setFaultStates((prev) => {
        const next = [...prev];
        next[currentFaultIndex] = {
          ...next[currentFaultIndex],
          selectedDiagnosis: optionId,
          isCorrect,
          timeTaken: Math.round((Date.now() - next[currentFaultIndex].startTime) / 1000),
        };
        return next;
      });

      if (isCorrect) {
        sounds.successChime();
        triggerNotification(NotificationType.Success);
      } else {
        sounds.failBuzz();
        triggerNotification(NotificationType.Error);
      }

      setPhase('feedback');
    },
    [faults, currentFaultIndex, triggerNotification, sounds]
  );

  const handleNext = useCallback(() => {
    if (currentFaultIndex < faults.length - 1) {
      setCurrentFaultIndex((i) => i + 1);
      setCurrentReading(null);
      setExpandedPoint(null);
      setMeterMode('continuity');
      setCurrentHintLevel(0);
      setPhase('testing');
      triggerHaptic(ImpactStyle.Light);

      setFaultStates((prev) => {
        const next = [...prev];
        next[currentFaultIndex + 1] = {
          ...next[currentFaultIndex + 1],
          startTime: Date.now(),
        };
        return next;
      });
    } else {
      // Session complete
      if (timerRef.current) clearInterval(timerRef.current);
      setTimerActive(false);

      const correct = faultStates.filter((f) => f.isCorrect).length;
      const score = Math.round((correct / faults.length) * 100);
      saveScore('faultDiagnosis', score);

      // Save analytics
      const timeUsed = Math.round((Date.now() - sessionStartTime) / 1000);
      saveSessionRecord({
        date: new Date().toISOString(),
        mode: sessionMode,
        score,
        correct,
        total: faults.length,
        timeUsed,
        faults: faultStates.map((s) => ({
          circuitType: s.scenario.circuitType,
          faultType: s.scenario.correctFaultType,
          correct: s.isCorrect ?? false,
          hintsUsed: s.hintsUsed,
          testsPerformed: s.testsPerformed.length,
          timeTaken: s.timeTaken,
        })),
      });

      setPhase('results');

      if (correct >= 5) {
        sounds.successChime();
        triggerNotification(NotificationType.Success);
      } else {
        triggerNotification(NotificationType.Warning);
      }
    }
  }, [
    currentFaultIndex,
    faults.length,
    faultStates,
    saveScore,
    sessionMode,
    sessionStartTime,
    sounds,
    triggerHaptic,
    triggerNotification,
  ]);

  const handleRetry = useCallback(() => {
    setCurrentHintLevel(0);
    handleStart(sessionMode);
  }, [handleStart, sessionMode]);

  const currentFault = faults[currentFaultIndex];
  const currentState = faultStates[currentFaultIndex];

  return (
    <div className="h-full overflow-y-auto">
      <AnimatePresence mode="wait">
        {phase === 'intro' && <IntroPhase key="intro" onStart={handleStart} />}

        {phase === 'testing' && currentFault && (
          <TestingPhase
            key={`test-${currentFaultIndex}`}
            fault={currentFault}
            faultIndex={currentFaultIndex}
            totalFaults={faults.length}
            testsPerformed={currentState?.testsPerformed || []}
            meterMode={meterMode}
            currentReading={currentReading}
            expandedPoint={expandedPoint}
            sessionMode={sessionMode}
            timeRemaining={timeRemaining}
            hintLevel={currentHintLevel}
            probeFlash={probeFlash}
            onExpandPoint={setExpandedPoint}
            onModeChange={handleModeChange}
            onTest={handleTest}
            onDiagnose={handleReadyToDiagnose}
            onUseHint={handleUseHint}
          />
        )}

        {phase === 'diagnosing' && currentFault && (
          <DiagnosisPhase
            key={`diag-${currentFaultIndex}`}
            fault={currentFault}
            sessionMode={sessionMode}
            timeRemaining={timeRemaining}
            onSelect={handleDiagnose}
            onBack={() => setPhase('testing')}
          />
        )}

        {phase === 'feedback' && currentFault && currentState && (
          <FeedbackPhase
            key={`fb-${currentFaultIndex}`}
            fault={currentFault}
            state={currentState}
            faultIndex={currentFaultIndex}
            totalFaults={faults.length}
            onNext={handleNext}
          />
        )}

        {phase === 'results' && (
          <ResultsPhase
            key="results"
            faultStates={faultStates}
            sessionMode={sessionMode}
            sessionTime={Math.round((Date.now() - sessionStartTime) / 1000)}
            timeRemaining={timeRemaining}
            onRetry={handleRetry}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Timer Bar ────────────────────────────────────────────────

function TimerBar({ timeRemaining }: { timeRemaining: number }) {
  const isLow = timeRemaining < 600; // under 10 min
  const isWarning = timeRemaining < 1800 && !isLow; // under 30 min
  const isCritical = timeRemaining < 300; // under 5 min

  return (
    <div
      className={cn(
        'flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-bold',
        isCritical
          ? 'bg-red-500/15 text-red-400 animate-pulse'
          : isLow
            ? 'bg-red-500/10 text-red-400'
            : isWarning
              ? 'bg-amber-500/10 text-amber-400'
              : 'bg-white/[0.04] text-white/60'
      )}
    >
      <Clock className="h-3.5 w-3.5" />
      <span>{formatTime(timeRemaining)}</span>
      {timeRemaining === 0 && <span className="text-red-400 font-semibold ml-1">TIME UP</span>}
    </div>
  );
}

// ── Guided Tip ───────────────────────────────────────────────

function GuidedTip({ tip }: { tip: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="flex items-start gap-2.5 p-3 rounded-xl bg-blue-500/10 border border-blue-500/20"
    >
      <BookOpen className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
      <p className="text-xs text-blue-300/90 leading-relaxed">{tip}</p>
    </motion.div>
  );
}

// ── Hint Card ────────────────────────────────────────────────

function HintCard({
  fault,
  hintLevel,
  onUseHint,
}: {
  fault: FaultScenario;
  hintLevel: number;
  onUseHint: () => void;
}) {
  const canUseMore = hintLevel < 2;

  return (
    <div className="space-y-2">
      {/* Show revealed hints */}
      {hintLevel >= 1 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20"
        >
          <div className="flex items-start gap-2">
            <Lightbulb className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] font-semibold text-amber-400 uppercase tracking-wider mb-1">
                Hint 1 <span className="text-amber-400/50">(-1 mark)</span>
              </p>
              <p className="text-xs text-amber-200/80 leading-relaxed">{generateHint(fault, 1)}</p>
            </div>
          </div>
        </motion.div>
      )}

      {hintLevel >= 2 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20"
        >
          <div className="flex items-start gap-2">
            <Lightbulb className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] font-semibold text-amber-400 uppercase tracking-wider mb-1">
                Hint 2 <span className="text-amber-400/50">(-1 mark)</span>
              </p>
              <p className="text-xs text-amber-200/80 leading-relaxed">{generateHint(fault, 2)}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Use hint button */}
      {canUseMore && (
        <button
          onClick={onUseHint}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-500/5 border border-amber-500/15 text-amber-400/70 touch-manipulation active:bg-amber-500/10 transition-colors"
        >
          <HelpCircle className="h-3.5 w-3.5" />
          <span className="text-xs font-medium">Use Hint {hintLevel + 1} of 2</span>
          <span className="text-[10px] text-amber-400/40 ml-auto">-1 mark</span>
        </button>
      )}
    </div>
  );
}

// ── Intro Phase ──────────────────────────────────────────────

function IntroPhase({ onStart }: { onStart: (mode: SessionMode) => void }) {
  const [selectedMode, setSelectedMode] = useState<SessionMode>('practice');

  const modes: {
    id: SessionMode;
    icon: typeof Timer;
    title: string;
    desc: string;
    accent: string;
  }[] = [
    {
      id: 'practice',
      icon: Search,
      title: 'Practice Mode',
      desc: 'No timer, no pressure. Take your time learning.',
      accent: 'orange',
    },
    {
      id: 'exam',
      icon: Timer,
      title: 'Exam Mode',
      desc: '2-hour countdown. Real AM2 conditions.',
      accent: 'red',
    },
    {
      id: 'guided',
      icon: BookOpen,
      title: 'Guided Mode',
      desc: 'Step-by-step tips. Learn the diagnostic process.',
      accent: 'blue',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="px-4 py-8 space-y-5"
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.1 }}
          className="h-20 w-20 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center"
        >
          <Search className="h-10 w-10 text-orange-400" />
        </motion.div>

        <h2 className="text-xl font-bold text-white">Fault Finding Simulator</h2>
        <p className="text-sm text-white/70 max-w-sm">
          40% of AM2 failures happen here. Diagnose 7 faults from a bank of 30+ scenarios — every
          session is different.
        </p>
      </div>

      {/* Mode selection */}
      <div className="space-y-2">
        <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider">
          Select mode
        </h4>
        {modes.map((mode) => {
          const Icon = mode.icon;
          const isSelected = selectedMode === mode.id;
          return (
            <button
              key={mode.id}
              onClick={() => setSelectedMode(mode.id)}
              className={cn(
                'w-full flex items-start gap-3 p-3 rounded-xl border text-left touch-manipulation transition-all',
                isSelected
                  ? mode.accent === 'orange'
                    ? 'bg-orange-500/10 border-orange-500/30'
                    : mode.accent === 'red'
                      ? 'bg-red-500/10 border-red-500/30'
                      : 'bg-blue-500/10 border-blue-500/30'
                  : 'bg-white/[0.03] border-white/10'
              )}
            >
              <div
                className={cn(
                  'h-8 w-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5',
                  isSelected
                    ? mode.accent === 'orange'
                      ? 'bg-orange-500/20'
                      : mode.accent === 'red'
                        ? 'bg-red-500/20'
                        : 'bg-blue-500/20'
                    : 'bg-white/10'
                )}
              >
                <Icon
                  className={cn(
                    'h-4 w-4',
                    isSelected
                      ? mode.accent === 'orange'
                        ? 'text-orange-400'
                        : mode.accent === 'red'
                          ? 'text-red-400'
                          : 'text-blue-400'
                      : 'text-white/40'
                  )}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-foreground">{mode.title}</p>
                  {isSelected && (
                    <div
                      className={cn(
                        'h-2 w-2 rounded-full',
                        mode.accent === 'orange'
                          ? 'bg-orange-400'
                          : mode.accent === 'red'
                            ? 'bg-red-400'
                            : 'bg-blue-400'
                      )}
                    />
                  )}
                </div>
                <p className="text-xs text-white/50">{mode.desc}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Info cards */}
      <div className="space-y-2">
        <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/10">
          <MapPin className="h-5 w-5 text-orange-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">30+ scenarios, 8 circuit types</p>
            <p className="text-xs text-white/60">
              Ring main, lighting, motor, bonding, CO detector, data, 3-phase, S-plan
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/10">
          <Zap className="h-5 w-5 text-orange-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">
              All wiring faults — no faulty parts
            </p>
            <p className="text-xs text-white/60">
              Open circuits, short circuits, reversed polarity, high resistance. 5 of 7 to pass.
            </p>
          </div>
        </div>
      </div>

      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => onStart(selectedMode)}
        className="w-full h-14 rounded-xl bg-orange-500 text-black font-bold text-base touch-manipulation flex items-center justify-center gap-2 active:bg-orange-600 transition-colors"
      >
        <Search className="h-5 w-5" />
        {selectedMode === 'exam'
          ? 'Start Exam — 2 Hours'
          : selectedMode === 'guided'
            ? 'Start Guided Session'
            : 'Start Practice Session'}
      </motion.button>
    </motion.div>
  );
}

// ── Testing Phase ────────────────────────────────────────────

function TestingPhase({
  fault,
  faultIndex,
  totalFaults,
  testsPerformed,
  meterMode,
  currentReading,
  expandedPoint,
  sessionMode,
  timeRemaining,
  hintLevel,
  probeFlash,
  onExpandPoint,
  onModeChange,
  onTest,
  onDiagnose,
  onUseHint,
}: {
  fault: FaultScenario;
  faultIndex: number;
  totalFaults: number;
  testsPerformed: string[];
  meterMode: TestMode;
  currentReading: TestReading | null;
  expandedPoint: string | null;
  sessionMode: SessionMode;
  timeRemaining: number;
  hintLevel: number;
  probeFlash: boolean;
  onExpandPoint: (id: string | null) => void;
  onModeChange: (mode: TestMode) => void;
  onTest: (test: TestReading) => void;
  onDiagnose: () => void;
  onUseHint: () => void;
}) {
  const guidedTip =
    sessionMode === 'guided' ? getGuidedTip(testsPerformed, fault, meterMode, 'testing') : null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
      className="px-4 py-4 pb-24 space-y-4"
    >
      {/* Header row: progress + timer */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-orange-400">
            Fault {faultIndex + 1} of {totalFaults}
          </span>
          <div className="flex items-center gap-2">
            {hintLevel > 0 && (
              <span className="text-[10px] text-amber-400/60">
                -{hintLevel} hint{hintLevel > 1 ? 's' : ''}
              </span>
            )}
            <span className="text-xs text-white/40">
              {testsPerformed.length} test{testsPerformed.length === 1 ? '' : 's'}
            </span>
          </div>
        </div>

        {/* Progress dots */}
        <div className="flex gap-1.5">
          {Array.from({ length: totalFaults }).map((_, i) => (
            <div
              key={i}
              className={cn(
                'h-1.5 flex-1 rounded-full transition-colors',
                i < faultIndex
                  ? 'bg-orange-500'
                  : i === faultIndex
                    ? 'bg-orange-400'
                    : 'bg-white/10'
              )}
            />
          ))}
        </div>

        {/* Timer bar for exam mode */}
        {sessionMode === 'exam' && <TimerBar timeRemaining={timeRemaining} />}
      </div>

      {/* Guided tip */}
      {guidedTip && <GuidedTip tip={guidedTip} />}

      {/* Symptom card */}
      <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/30">
        <div className="flex items-start gap-2 mb-2">
          <AlertTriangle className="h-4 w-4 text-orange-400 shrink-0 mt-0.5" />
          <span className="text-xs font-semibold text-orange-400">{fault.circuitName}</span>
        </div>
        <p className="text-sm text-white/90 leading-relaxed">&ldquo;{fault.symptom}&rdquo;</p>
      </div>

      {/* Circuit Diagram */}
      <CircuitPathDiagram
        circuitType={fault.circuitType}
        testPoints={fault.testPoints}
        testsPerformed={testsPerformed}
        activePointId={expandedPoint}
        onTapPoint={(pointId) => onExpandPoint(expandedPoint === pointId ? null : pointId)}
      />

      {/* Multimeter with probe flash */}
      <div
        className={cn(
          'transition-all duration-150',
          probeFlash && 'ring-2 ring-cyan-400/40 rounded-xl'
        )}
      >
        <MultimeterDisplay
          reading={currentReading?.reading ?? null}
          unit={currentReading?.unit ?? (meterMode === 'continuity' ? 'Ω' : 'MΩ')}
          mode={meterMode}
          isAbnormal={currentReading?.isAbnormal ?? false}
          testLabel={currentReading?.label}
          onModeChange={onModeChange}
        />
      </div>

      {/* Test Points */}
      <div className="space-y-1.5">
        <h4 className="text-xs font-semibold text-white/60 uppercase tracking-wider">
          Test locations
        </h4>
        {fault.testPoints.map((point) => (
          <TestPointCard
            key={point.id}
            point={point}
            meterMode={meterMode}
            testsPerformed={testsPerformed}
            isExpanded={expandedPoint === point.id}
            onToggle={() => onExpandPoint(expandedPoint === point.id ? null : point.id)}
            onTest={onTest}
          />
        ))}
      </div>

      {/* Findings Summary */}
      {testsPerformed.length > 0 && (
        <FindingsSummary fault={fault} testsPerformed={testsPerformed} />
      )}

      {/* Hints */}
      {sessionMode !== 'guided' && (
        <HintCard fault={fault} hintLevel={hintLevel} onUseHint={onUseHint} />
      )}

      {/* Diagnose button */}
      {testsPerformed.length >= 2 && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          whileTap={{ scale: 0.97 }}
          onClick={onDiagnose}
          className="w-full h-12 rounded-xl bg-orange-500 text-black font-bold text-sm touch-manipulation flex items-center justify-center gap-2"
        >
          <Search className="h-4 w-4" />I Know the Fault — Diagnose
        </motion.button>
      )}
    </motion.div>
  );
}

// ── Test Point Card ──────────────────────────────────────────

function TestPointCard({
  point,
  meterMode,
  testsPerformed,
  isExpanded,
  onToggle,
  onTest,
}: {
  point: TestPoint;
  meterMode: TestMode;
  testsPerformed: string[];
  isExpanded: boolean;
  onToggle: () => void;
  onTest: (test: TestReading) => void;
}) {
  const availableTests = point.tests.filter((t) => t.mode === meterMode);
  const hasPerformed = point.tests.some((t) => testsPerformed.includes(t.id));

  return (
    <div className="rounded-xl border border-white/10 overflow-hidden">
      <button
        onClick={onToggle}
        className={cn(
          'w-full flex items-center gap-3 p-3 touch-manipulation text-left transition-colors',
          isExpanded ? 'bg-white/[0.06]' : 'bg-white/[0.02]'
        )}
      >
        <div
          className={cn(
            'h-8 w-8 rounded-lg flex items-center justify-center shrink-0',
            hasPerformed ? 'bg-orange-500/20' : 'bg-white/10'
          )}
        >
          <MapPin className={cn('h-4 w-4', hasPerformed ? 'text-orange-400' : 'text-white/40')} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground">{point.location}</p>
          <p className="text-xs text-white/50 truncate">{point.description}</p>
        </div>
        <ChevronDown
          className={cn(
            'h-4 w-4 text-white/30 shrink-0 transition-transform',
            isExpanded && 'rotate-180'
          )}
        />
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-3 space-y-1.5">
              {availableTests.length === 0 ? (
                <p className="text-xs text-white/40 py-2 text-center">
                  No {meterMode === 'continuity' ? 'continuity' : 'insulation'} tests available
                  here. Try switching mode.
                </p>
              ) : (
                availableTests.map((test) => {
                  const performed = testsPerformed.includes(test.id);
                  return (
                    <button
                      key={test.id}
                      onClick={() => onTest(test)}
                      className={cn(
                        'w-full flex items-center gap-3 p-2.5 rounded-lg border text-left touch-manipulation transition-all',
                        performed
                          ? test.isAbnormal
                            ? 'bg-red-500/10 border-red-500/30'
                            : 'bg-emerald-500/10 border-emerald-500/20'
                          : 'bg-white/[0.03] border-white/5 active:bg-white/[0.08]'
                      )}
                    >
                      <div
                        className={cn(
                          'h-6 w-6 rounded flex items-center justify-center shrink-0',
                          performed
                            ? test.isAbnormal
                              ? 'bg-red-500/20'
                              : 'bg-emerald-500/20'
                            : 'bg-white/10'
                        )}
                      >
                        {performed ? (
                          test.isAbnormal ? (
                            <AlertTriangle className="h-3 w-3 text-red-400" />
                          ) : (
                            <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                          )
                        ) : (
                          <Zap className="h-3 w-3 text-white/30" />
                        )}
                      </div>

                      <span className="flex-1 text-xs text-white/80">{test.label}</span>

                      {performed ? (
                        <span
                          className={cn(
                            'text-xs font-mono font-semibold',
                            test.isAbnormal ? 'text-red-400' : 'text-emerald-400'
                          )}
                        >
                          {test.reading} {test.reading !== 'OL' ? test.unit : ''}
                        </span>
                      ) : (
                        <ArrowRight className="h-3 w-3 text-white/20 shrink-0" />
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Findings Summary ─────────────────────────────────────────

function FindingsSummary({
  fault,
  testsPerformed,
}: {
  fault: FaultScenario;
  testsPerformed: string[];
}) {
  const groups: {
    location: string;
    readings: {
      label: string;
      reading: string;
      unit: string;
      mode: TestMode;
      isAbnormal: boolean;
    }[];
  }[] = [];

  for (const point of fault.testPoints) {
    const performed = point.tests.filter((t) => testsPerformed.includes(t.id));
    if (performed.length > 0) {
      groups.push({
        location: point.location,
        readings: performed.map((t) => ({
          label: t.label,
          reading: t.reading,
          unit: t.unit,
          mode: t.mode,
          isAbnormal: t.isAbnormal,
        })),
      });
    }
  }

  if (groups.length === 0) return null;

  const totalAbnormal = groups.reduce(
    (sum, g) => sum + g.readings.filter((r) => r.isAbnormal).length,
    0
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-2"
    >
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-semibold text-white/60 uppercase tracking-wider">Findings</h4>
        {totalAbnormal > 0 && (
          <span className="text-[10px] font-semibold text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full">
            {totalAbnormal} abnormal
          </span>
        )}
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
        {groups.map((group, gi) => (
          <div key={gi}>
            <div className={cn('px-3 py-1.5 bg-white/[0.03]', gi > 0 && 'border-t border-white/5')}>
              <p className="text-[10px] font-semibold text-white/40 uppercase tracking-wider">
                {group.location}
              </p>
            </div>

            {group.readings.map((r, ri) => {
              const hint = r.isAbnormal
                ? r.reading === 'OL'
                  ? 'Open circuit — no continuity'
                  : r.mode === 'insulation' && parseFloat(r.reading) < 1
                    ? 'Below 1 MΩ minimum'
                    : r.mode === 'continuity' && parseFloat(r.reading) < 2
                      ? 'Should not have continuity here'
                      : 'Higher than expected'
                : null;

              return (
                <div key={ri} className="px-3 py-2 border-t border-white/[0.03]">
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        'h-1.5 w-1.5 rounded-full shrink-0',
                        r.isAbnormal ? 'bg-red-500' : 'bg-emerald-500'
                      )}
                    />
                    <span className="flex-1 text-xs text-white/70 truncate">{r.label}</span>
                    <span
                      className={cn(
                        'text-xs font-mono font-bold shrink-0',
                        r.isAbnormal ? 'text-red-400' : 'text-emerald-400'
                      )}
                    >
                      {r.reading === 'OL' ? 'OL' : `${r.reading} ${r.unit}`}
                    </span>
                  </div>
                  {hint && <p className="text-[10px] text-red-400/70 mt-0.5 ml-4">{hint}</p>}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ── Diagnosis Phase ──────────────────────────────────────────

function DiagnosisPhase({
  fault,
  sessionMode,
  timeRemaining,
  onSelect,
  onBack,
}: {
  fault: FaultScenario;
  sessionMode: SessionMode;
  timeRemaining: number;
  onSelect: (id: string) => void;
  onBack: () => void;
}) {
  const guidedTip =
    sessionMode === 'guided' ? getGuidedTip([], fault, 'continuity', 'diagnosing') : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="px-4 py-5 space-y-4"
    >
      {sessionMode === 'exam' && <TimerBar timeRemaining={timeRemaining} />}

      <div>
        <h3 className="text-base font-bold text-white">What&apos;s the fault?</h3>
        <p className="text-xs text-white/60 mt-1">{fault.circuitName}</p>
      </div>

      {guidedTip && <GuidedTip tip={guidedTip} />}

      <div className="space-y-2">
        {fault.diagnosisOptions.map((option) => (
          <motion.button
            key={option.id}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(option.id)}
            className="w-full p-4 rounded-xl bg-white/[0.03] border border-white/10 text-left touch-manipulation active:bg-white/[0.08] transition-colors"
          >
            <p className="text-sm text-white/90">{option.label}</p>
          </motion.button>
        ))}
      </div>

      <button
        onClick={onBack}
        className="w-full h-11 rounded-xl text-white/50 text-sm font-medium touch-manipulation"
      >
        Back to testing
      </button>
    </motion.div>
  );
}

// ── Feedback Phase ───────────────────────────────────────────

function FeedbackPhase({
  fault,
  state,
  faultIndex,
  totalFaults,
  onNext,
}: {
  fault: FaultScenario;
  state: FaultState;
  faultIndex: number;
  totalFaults: number;
  onNext: () => void;
}) {
  const isLast = faultIndex === totalFaults - 1;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="px-4 py-5 space-y-4"
    >
      <div className="flex flex-col items-center text-center space-y-3">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className={cn(
            'h-16 w-16 rounded-2xl flex items-center justify-center',
            state.isCorrect
              ? 'bg-emerald-500/10 border border-emerald-500/20'
              : 'bg-red-500/10 border border-red-500/20'
          )}
        >
          {state.isCorrect ? (
            <CheckCircle2 className="h-8 w-8 text-emerald-400" />
          ) : (
            <XCircle className="h-8 w-8 text-red-400" />
          )}
        </motion.div>

        <p
          className={cn('text-lg font-bold', state.isCorrect ? 'text-emerald-400' : 'text-red-400')}
        >
          {state.isCorrect ? 'Correct!' : 'Incorrect'}
        </p>
        <p className="text-xs text-white/60">
          {state.testsPerformed.length} test{state.testsPerformed.length === 1 ? '' : 's'} ·{' '}
          {state.timeTaken}s
          {state.hintsUsed > 0 &&
            ` · ${state.hintsUsed} hint${state.hintsUsed > 1 ? 's' : ''} used`}
        </p>
      </div>

      <div className="space-y-3">
        <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
          <p className="text-xs font-semibold text-orange-400 mb-1">Fault</p>
          <p className="text-sm text-white/90">{fault.correctLocation}</p>
        </div>

        <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
          <p className="text-xs font-semibold text-cyan-400 mb-1">Rectification</p>
          <p className="text-sm text-white/90">{fault.rectification}</p>
        </div>

        <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
          <p className="text-xs font-semibold text-blue-400 mb-1">How to find it</p>
          <p className="text-sm text-white/80 leading-relaxed">{fault.explanation}</p>
        </div>

        <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
          <p className="text-xs font-semibold text-cyan-400 mb-1">Optimal method</p>
          <p className="text-xs text-white/70 whitespace-pre-line">{fault.optimalMethod}</p>
        </div>
      </div>

      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={onNext}
        className="w-full h-12 rounded-xl bg-orange-500 text-black font-bold text-sm touch-manipulation flex items-center justify-center gap-2"
      >
        {isLast ? (
          <>
            <Trophy className="h-4 w-4" />
            See Results
          </>
        ) : (
          <>
            Next Fault
            <ChevronRight className="h-4 w-4" />
          </>
        )}
      </motion.button>
    </motion.div>
  );
}

// ── Results Phase ────────────────────────────────────────────

function ResultsPhase({
  faultStates,
  sessionMode,
  sessionTime,
  timeRemaining,
  onRetry,
}: {
  faultStates: FaultState[];
  sessionMode: SessionMode;
  sessionTime: number;
  timeRemaining: number;
  onRetry: () => void;
}) {
  const correct = faultStates.filter((f) => f.isCorrect).length;
  const total = faultStates.length;
  const passed = correct >= 5;
  const totalHints = faultStates.reduce((sum, f) => sum + f.hintsUsed, 0);
  const ranOutOfTime = sessionMode === 'exam' && timeRemaining === 0;

  const minutes = Math.floor(sessionTime / 60);
  const seconds = sessionTime % 60;

  // Load history for analytics
  const history = loadHistory();
  const totalSessions = history.length;
  const avgScore =
    totalSessions > 0
      ? Math.round(history.reduce((sum, h) => sum + h.score, 0) / totalSessions)
      : 0;

  // Weakness analysis — group by circuit type across all history
  const circuitStats: Record<string, { correct: number; total: number }> = {};
  for (const session of history) {
    for (const f of session.faults) {
      if (!circuitStats[f.circuitType]) {
        circuitStats[f.circuitType] = { correct: 0, total: 0 };
      }
      circuitStats[f.circuitType].total++;
      if (f.correct) circuitStats[f.circuitType].correct++;
    }
  }

  const sortedCircuits = Object.entries(circuitStats)
    .map(([type, stats]) => ({
      type,
      pct: Math.round((stats.correct / stats.total) * 100),
      total: stats.total,
    }))
    .sort((a, b) => a.pct - b.pct);

  const weakest = sortedCircuits.filter((c) => c.pct < 70 && c.total >= 2);
  const strongest = sortedCircuits.filter((c) => c.pct >= 70 && c.total >= 2).reverse();

  // Pretty circuit type names
  const circuitNames: Record<string, string> = {
    ring_main: 'Ring Main',
    lighting: 'Lighting',
    motor_dol: 'Motor DOL',
    bonding: 'Bonding',
    smoke_co: 'Smoke/CO',
    data_cat5: 'Data Cat5',
    three_phase_socket: '3-Phase',
    splan: 'S-Plan',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      className="px-4 py-6 space-y-5"
    >
      {/* Score */}
      <div className="flex flex-col items-center text-center space-y-3">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
          className={cn(
            'h-20 w-20 rounded-2xl flex items-center justify-center',
            passed
              ? 'bg-emerald-500/10 border border-emerald-500/20'
              : 'bg-red-500/10 border border-red-500/20'
          )}
        >
          {passed ? (
            <Trophy className="h-10 w-10 text-emerald-400" />
          ) : (
            <ShieldAlert className="h-10 w-10 text-red-400" />
          )}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={cn('text-4xl font-bold', passed ? 'text-emerald-400' : 'text-red-400')}
        >
          {correct}/{total}
        </motion.p>

        {ranOutOfTime && <p className="text-sm font-semibold text-red-400">Time ran out!</p>}

        <p className="text-sm text-white/60">
          {passed
            ? 'You would pass the fault finding section'
            : correct >= 3
              ? 'Close, but you need 5 out of 7 to pass'
              : 'Keep practising — systematic testing is the key'}
        </p>

        <div className="flex items-center gap-3 text-xs text-white/40">
          <div className="flex items-center gap-1">
            <Timer className="h-3 w-3" />
            {minutes}m {seconds}s
          </div>
          {sessionMode === 'exam' && <span className="text-white/20">|</span>}
          {sessionMode !== 'practice' && <span className="capitalize">{sessionMode} mode</span>}
          {totalHints > 0 && (
            <>
              <span className="text-white/20">|</span>
              <span className="text-amber-400/60">
                {totalHints} hint{totalHints > 1 ? 's' : ''} used
              </span>
            </>
          )}
        </div>
      </div>

      {/* Per-fault breakdown */}
      <div className="space-y-1.5">
        <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider">Breakdown</h3>
        {faultStates.map((state, i) => (
          <div
            key={i}
            className={cn(
              'flex items-center gap-3 p-3 rounded-xl border',
              state.isCorrect
                ? 'border-emerald-500/20 bg-emerald-500/5'
                : 'border-red-500/20 bg-red-500/5'
            )}
          >
            <div
              className={cn(
                'h-6 w-6 rounded-lg flex items-center justify-center shrink-0',
                state.isCorrect ? 'bg-emerald-500/20' : 'bg-red-500/20'
              )}
            >
              {state.isCorrect ? (
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              ) : (
                <XCircle className="h-3.5 w-3.5 text-red-400" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground truncate">{state.scenario.circuitName}</p>
              <p className="text-[10px] text-white/50">
                {state.testsPerformed.length} tests · {state.timeTaken}s
                {state.hintsUsed > 0 &&
                  ` · ${state.hintsUsed} hint${state.hintsUsed > 1 ? 's' : ''}`}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Analytics — show after 2+ sessions */}
      {totalSessions >= 2 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-3"
        >
          <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider flex items-center gap-1.5">
            <TrendingUp className="h-3.5 w-3.5" />
            Your Progress
          </h3>

          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-center">
              <p className="text-2xl font-bold text-white">{totalSessions}</p>
              <p className="text-[10px] text-white/40">Sessions</p>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-center">
              <p
                className={cn(
                  'text-2xl font-bold',
                  avgScore >= 70
                    ? 'text-emerald-400'
                    : avgScore >= 50
                      ? 'text-amber-400'
                      : 'text-red-400'
                )}
              >
                {avgScore}%
              </p>
              <p className="text-[10px] text-white/40">Average</p>
            </div>
          </div>

          {/* Strengths & Weaknesses */}
          {(weakest.length > 0 || strongest.length > 0) && (
            <div className="space-y-2">
              {strongest.length > 0 && (
                <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/15">
                  <p className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Target className="h-3 w-3" />
                    Strongest
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {strongest.slice(0, 3).map((c) => (
                      <span
                        key={c.type}
                        className="text-xs text-emerald-300/80 bg-emerald-500/10 px-2 py-0.5 rounded-full"
                      >
                        {circuitNames[c.type] || c.type} ({c.pct}%)
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {weakest.length > 0 && (
                <div className="p-3 rounded-xl bg-red-500/5 border border-red-500/15">
                  <p className="text-[10px] font-semibold text-red-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    Needs Work
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {weakest.slice(0, 3).map((c) => (
                      <span
                        key={c.type}
                        className="text-xs text-red-300/80 bg-red-500/10 px-2 py-0.5 rounded-full"
                      >
                        {circuitNames[c.type] || c.type} ({c.pct}%)
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.div>
      )}

      {/* Advice */}
      <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/30">
        <p className="text-xs text-orange-300">
          <strong>Key principle:</strong> Know how each circuit works when it&apos;s healthy.
          Predict what the readings should be, then identify what&apos;s abnormal. Systematic
          elimination beats guessing every time.
        </p>
      </div>

      <div className="space-y-2">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onRetry}
          className="w-full h-12 rounded-xl bg-orange-500 text-black font-bold text-sm touch-manipulation flex items-center justify-center gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          New Session — Different Faults
        </motion.button>
      </div>
    </motion.div>
  );
}

export default FaultFindingSimulator;
