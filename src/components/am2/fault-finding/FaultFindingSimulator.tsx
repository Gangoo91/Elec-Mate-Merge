/**
 * FaultFindingSimulator
 *
 * Interactive AM2 fault diagnosis simulation.
 * Presents 7 faults, one per circuit type, from the live (non-retired) scenarios.
 * User taps test points, reads the multimeter, and diagnoses faults.
 *
 * Features:
 *   - Three modes: Learn (tips, readings marked), Practise (untimed), Assessment (2h countdown)
 *   - Hint system that costs marks (like asking the assessor)
 *   - Contextual guided tips in Guided mode
 *   - Probe flash animation on readings
 *   - Results saved to am2_sessions (History tab)
 *   - Sound effects + haptic feedback

 */

import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Zap,
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  XCircle,
  RotateCcw,
  AlertTriangle,
  Timer,
  MapPin,
  ArrowRight,
  HelpCircle,
  BookOpen,
  Clock,
  Lightbulb,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import {
  AM2_EYEBROW,
  AM2_LIST,
  AM2_PAGE,
  AM2_PRIMARY,
  AM2_SPLIT,
  AM2_TITLE,
} from '@/components/am2/layout';
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';
import { hapticsEnabled } from '@/lib/haptics';
import { MultimeterDisplay } from './MultimeterDisplay';
import { CircuitPathDiagram } from './CircuitPathDiagram';
import {
  CONDUCTOR_OPTIONS,
  FAULT_RECORD,
  FAULT_SCENARIOS,
  PROVING_TESTS,
  markRecord,
  pickSessionFaults,
  type FaultRecordAnswer,
  type FaultRecordMark,
  type ProvingTestId,
  type FaultScenario,
  type FaultType,
  type TestMode,
  type TestPoint,
  type TestReading,
} from '@/data/am2-fault-scenarios';
import { useAM2Readiness } from '@/hooks/am2/useAM2Readiness';
import { useAuth } from '@/contexts/AuthContext';
import { saveAM2Session } from '@/hooks/am2/saveAM2Session';
import { useMultimeterSounds } from '@/hooks/am2/useMultimeterSounds';
import { storageGetJSONSync, storageSetJSONSync } from '@/utils/storage';

// ── Types ────────────────────────────────────────────────────

type Phase = 'intro' | 'testing' | 'diagnosing' | 'feedback' | 'results';
type SessionMode = 'practice' | 'exam' | 'guided';

/** Same names as the rest of the AM2 tool: only Assessment runs count towards "ready". */
const MODE_NAME: Record<SessionMode, 'learn' | 'practise' | 'assessment'> = {
  guided: 'learn',
  practice: 'practise',
  exam: 'assessment',
};

interface FaultState {
  scenario: FaultScenario;
  testsPerformed: string[];
  /** The written record, as NET asks for it: type, where, fix, proving test. */
  record: FaultRecordAnswer | null;
  marks: FaultRecordMark | null;
  /** Every part of the record right. */
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
  return storageGetJSONSync<SessionRecord[]>(HISTORY_KEY, []);
}

function saveSessionRecord(record: SessionRecord) {
  const history = loadHistory();
  history.push(record);
  // Keep last 50 sessions
  if (history.length > 50) history.splice(0, history.length - 50);
  storageSetJSONSync(HISTORY_KEY, history);
}

/** Scenarios in play (retired ones are being reworked). */
const LIVE_SCENARIOS = FAULT_SCENARIOS.filter((f) => !f.retired).length;

const PARTS = ['type', 'where', 'fix', 'proving'] as const;

/** Parts of the record right, out of four per fault, over every fault in the
 *  sitting — the same on finishing and when the time runs out. */
function scoreFaults(states: FaultState[], total: number): number {
  if (!total) return 0;
  const right = states.reduce(
    (n, f) => n + (f.marks ? PARTS.filter((k) => f.marks![k]).length : 0),
    0
  );
  return Math.round((right / (total * PARTS.length)) * 100);
}

/** Weak-spot tags: the fault type missed, and each part of the record got wrong. */
function faultMistakes(states: FaultState[]) {
  return states.flatMap((f) => {
    const scenario = f.scenario.id;
    const m = f.marks;
    if (!f.record || !m) return [{ tag: `missed_${f.scenario.faultType}`, scenario }];
    const tags = [
      !m.type && `missed_${f.scenario.faultType}`,
      !m.where && 'wrong_location',
      !m.fix && 'wrong_rectification',
      !m.proving && 'wrong_proving_test',
    ].filter(Boolean) as string[];
    return tags.map((tag) => ({ tag, scenario }));
  });
}

/** How many faults had each part right. */
function partCounts(states: FaultState[]) {
  return Object.fromEntries(
    PARTS.map((k) => [k, states.filter((f) => f.marks?.[k]).length])
  ) as Record<(typeof PARTS)[number], number>;
}

/** NET's four fault types, in its words (for labelling results). */
const NET_TYPES: { id: FaultType; label: string }[] = [
  { id: 'open_circuit', label: 'Open circuit' },
  { id: 'short_circuit', label: 'Short circuit' },
  { id: 'high_resistance', label: 'High resistance' },
  { id: 'reversed_polarity', label: 'Mis-connection (e.g. reversed polarity, crossed phases)' },
];

// ── Hint generation ──────────────────────────────────────────

const FAULT_TYPE_LABELS: Record<FaultType, string> = {
  open_circuit: 'an open circuit',
  short_circuit: 'a short circuit',
  // NET's term: mis-connection (reversed polarity, crossed phases, a wire on the wrong terminal).
  reversed_polarity: 'a mis-connection',
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
    return 'Record the fault part by part: its type, where it is, the repair and the tests that prove it.';
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

interface FaultFindingSimulatorProps {
  /** Fires once the run is scored; `score` is that run's result (0–100). */
  onSessionComplete?: (score?: number) => void;
  /** The Mock AM2 day runs this as an exam (Assessment), no mode choice. */
  forceExam?: boolean;
}

export function FaultFindingSimulator({
  onSessionComplete,
  forceExam,
}: FaultFindingSimulatorProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [sessionMode, setSessionMode] = useState<SessionMode>('practice');
  const [faults, setFaults] = useState<FaultScenario[]>([]);
  const [faultStates, setFaultStates] = useState<FaultState[]>([]);
  const [currentFaultIndex, setCurrentFaultIndex] = useState(0);
  const [meterMode, setMeterMode] = useState<TestMode>('continuity');
  const [currentReading, setCurrentReading] = useState<TestReading | null>(null);
  const [expandedPoint, setExpandedPoint] = useState<string | null>(null);
  const [sessionStartTime, setSessionStartTime] = useState(0);
  // Frozen at the end, so the results' time doesn't tick on with re-renders.
  const [sessionEndTime, setSessionEndTime] = useState(0);
  // A half-filled record per fault, kept while the learner goes back to test.
  const recordDrafts = useRef<Record<number, Partial<FaultRecordAnswer>>>({});

  // Timer state (exam mode)
  const [timeRemaining, setTimeRemaining] = useState(7200); // 2 hours
  const [timerActive, setTimerActive] = useState(false);

  // Hint state
  const [currentHintLevel, setCurrentHintLevel] = useState(0); // 0 = no hint shown, 1 = hint 1, 2 = hint 2

  // Probe flash animation
  const [probeFlash, setProbeFlash] = useState(false);

  const { saveScore } = useAM2Readiness();
  const { user } = useAuth();
  const sounds = useMultimeterSounds();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const triggerHaptic = useCallback(async (style: ImpactStyle = ImpactStyle.Light) => {
    if (!hapticsEnabled()) return;
    try {
      await Haptics.impact({ style });
    } catch {
      /* web */
    }
  }, []);

  const triggerNotification = useCallback(async (type: NotificationType) => {
    if (!hapticsEnabled()) return;
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

      // Save whatever progress exists — scored exactly as a finished session.
      const correct = faultStates.filter((f) => f.isCorrect).length;
      const score = scoreFaults(faultStates, faults.length);
      saveScore('faultDiagnosis', score);

      if (user) {
        saveAM2Session(user.id, {
          sessionType: 'fault_diagnosis',
          overallScore: score,
          componentScores: {
            correct,
            total: faults.length,
            mode: MODE_NAME[sessionMode],
            parts: partCounts(faultStates),
          },
          sessionData: {
            mode: sessionMode,
            timedOut: true,
            // Each part got wrong (and faults time ran out on), for weak spots.
            mistakes: faultMistakes(faultStates),
            records: faultStates.map((f) => ({ scenario: f.scenario.id, record: f.record })),
          },
          timeSpentSeconds: 7200,
        });
      }
      onSessionComplete?.(score);

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

      setSessionEndTime(Date.now());
      setPhase('results');
    }
  }, [
    timeRemaining,
    sessionMode,
    phase,
    faultStates,
    faults.length,
    saveScore,
    user,
    onSessionComplete,
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
          record: null,
          marks: null,
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
      recordDrafts.current = {};
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

  // Mock day: straight into the exam.
  useEffect(() => {
    if (forceExam && phase === 'intro') handleStart('exam');
  }, [forceExam, phase, handleStart]);

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

        // The alert and the heavy buzz give the verdict away — Learn only.
        if (test.isAbnormal && sessionMode === 'guided') {
          setTimeout(() => sounds.abnormalAlert(), 250);
        }
      }, 150);

      if (test.isAbnormal && sessionMode === 'guided') {
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
    [currentFaultIndex, triggerHaptic, sounds, sessionMode]
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
    (record: FaultRecordAnswer) => {
      const fault = faults[currentFaultIndex];
      // Each part of NET's record marked on its own.
      const marks = markRecord(fault, record);
      const isCorrect = PARTS.every((k) => marks[k]);

      setFaultStates((prev) => {
        const next = [...prev];
        next[currentFaultIndex] = {
          ...next[currentFaultIndex],
          record,
          marks,
          isCorrect,
          timeTaken: Math.round((Date.now() - next[currentFaultIndex].startTime) / 1000),
        };
        return next;
      });

      // Exam: no verdict per fault — it's recorded and you move on; the
      // debrief comes with the results, as on the day.
      if (sessionMode !== 'exam') {
        if (isCorrect) {
          sounds.successChime();
          triggerNotification(NotificationType.Success);
        } else {
          sounds.failBuzz();
          triggerNotification(NotificationType.Error);
        }
      }

      setPhase('feedback');
    },
    [faults, currentFaultIndex, triggerNotification, sounds, sessionMode]
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
      const score = scoreFaults(faultStates, faults.length);
      if (sessionMode === 'exam') saveScore('faultDiagnosis', score);

      const timeUsed = Math.round((Date.now() - sessionStartTime) / 1000);

      if (user) {
        saveAM2Session(user.id, {
          sessionType: 'fault_diagnosis',
          overallScore: score,
          componentScores: {
            correct,
            total: faults.length,
            mode: MODE_NAME[sessionMode],
            parts: partCounts(faultStates),
          },
          sessionData: {
            mode: sessionMode,
            // Each part of the record got wrong, for "Your weak spots".
            mistakes: faultMistakes(faultStates),
            records: faultStates.map((f) => ({ scenario: f.scenario.id, record: f.record })),
          },
          timeSpentSeconds: timeUsed,
          startedAt: new Date(sessionStartTime).toISOString(),
        });
      }
      onSessionComplete?.(score);

      // Save analytics
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

      setSessionEndTime(Date.now());
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
    user,
    onSessionComplete,
    sessionMode,
    sessionStartTime,
    sounds,
    triggerHaptic,
    triggerNotification,
  ]);

  // Exam: skip the per-fault feedback screen — straight on to the next fault
  // once the diagnosis is stored.
  useEffect(() => {
    if (sessionMode === 'exam' && phase === 'feedback') handleNext();
  }, [sessionMode, phase, handleNext]);

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
            // Going back to take another reading keeps what's been filled in.
            draft={recordDrafts.current[currentFaultIndex]}
            onDraft={(d) => {
              recordDrafts.current[currentFaultIndex] = d;
            }}
          />
        )}

        {phase === 'feedback' && sessionMode !== 'exam' && currentFault && currentState && (
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
            sessionTime={Math.round((sessionEndTime - sessionStartTime) / 1000)}
            timeRemaining={timeRemaining}
            onRetry={forceExam ? undefined : handleRetry}
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
          ? 'bg-red-500/15 text-white animate-pulse'
          : isLow
            ? 'bg-red-500/10 text-white'
            : isWarning
              ? 'bg-white/[0.06] text-white'
              : 'bg-white/[0.04] text-white'
      )}
    >
      <Clock className="h-3.5 w-3.5" />
      <span>{formatTime(timeRemaining)}</span>
      {timeRemaining === 0 && <span className="text-white font-semibold ml-1">TIME UP</span>}
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
      <p className="text-xs text-white leading-relaxed">{tip}</p>
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
          className="p-3 rounded-xl bg-white/[0.06] border border-amber-500/20"
        >
          <div className="flex items-start gap-2">
            <Lightbulb className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-[11px] font-semibold text-white uppercase tracking-wider mb-1">
                Hint 1
              </p>
              <p className="text-xs text-white leading-relaxed">{generateHint(fault, 1)}</p>
            </div>
          </div>
        </motion.div>
      )}

      {hintLevel >= 2 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="p-3 rounded-xl bg-white/[0.06] border border-amber-500/20"
        >
          <div className="flex items-start gap-2">
            <Lightbulb className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-[11px] font-semibold text-white uppercase tracking-wider mb-1">
                Hint 2
              </p>
              <p className="text-xs text-white leading-relaxed">{generateHint(fault, 2)}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Use hint button */}
      {canUseMore && (
        <button
          onClick={onUseHint}
          className="flex h-11 items-center gap-2 rounded-xl border border-white/[0.22] px-3.5 text-white touch-manipulation transition-colors hover:border-white/[0.4]"
        >
          <HelpCircle className="h-3.5 w-3.5" />
          <span className="text-xs font-medium">Use Hint {hintLevel + 1} of 2</span>
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
      id: 'guided',
      icon: BookOpen,
      title: 'Learn',
      desc: 'Tips at each step, and every reading marked normal or abnormal.',
      accent: 'blue',
    },
    {
      id: 'practice',
      icon: Search,
      title: 'Practise',
      desc: 'No clock. You read the meter and judge each reading.',
      accent: 'orange',
    },
    {
      id: 'exam',
      icon: Timer,
      title: 'Assessment',
      desc: 'Two hours, the length of Section D on the day. Counts towards “ready”.',
      accent: 'red',
    },
  ];

  return (
    <div className={AM2_PAGE}>
      <div className={cn(AM2_SPLIT, 'mt-2')}>
        <div className="space-y-5">
          <div>
            <p className={AM2_EYEBROW}>Section D · 2 hours on the day</p>
            <h1 className={AM2_TITLE}>Fault diagnosis</h1>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white">
              This mock sets seven faults, each on a different circuit, drawn from {LIVE_SCENARIOS}{' '}
              scenarios — lighting, a DOL motor, bonding, smoke and CO alarms, a TPN socket circuit,
              an S-plan heating system and more. Every fault is a wiring fault: an open circuit, a
              short, a high-resistance joint or a mis-connection. Take readings, then record each
              fault as NET asks: its type, the two points it’s between and the conductor, how you’d
              put it right, and the test that proves the repair.
            </p>
          </div>
          <p className="max-w-xl text-[13px] leading-relaxed text-white">
            Each part of the record is marked. Practice bar: 80% or better. Hints are there in
            Practise if you’re stuck; there are none in Assessment, as on the day.
          </p>
          <button type="button" onClick={() => onStart(selectedMode)} className={AM2_PRIMARY}>
            {selectedMode === 'exam'
              ? 'Start the assessment — 2-hour clock'
              : selectedMode === 'guided'
                ? 'Start learning'
                : 'Start practising'}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div>
          <h2 className="mb-2.5 text-[15px] font-semibold text-white">
            How do you want to run it?
          </h2>
          <div role="radiogroup" className={AM2_LIST}>
            {modes.map((mode) => {
              const isSelected = selectedMode === mode.id;
              return (
                <button
                  key={mode.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => setSelectedMode(mode.id)}
                  className="flex min-h-[68px] w-full items-center gap-4 px-4 py-3.5 text-left transition-colors hover:bg-white/[0.04] touch-manipulation sm:px-5"
                >
                  <span
                    className={cn(
                      'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2',
                      isSelected ? 'border-elec-yellow' : 'border-white/40'
                    )}
                  >
                    {isSelected && <span className="h-2.5 w-2.5 rounded-full bg-elec-yellow" />}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[15px] font-semibold text-white">{mode.title}</span>
                    <span className="mt-0.5 block text-[13px] leading-snug text-white">
                      {mode.desc}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
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
      className="mx-auto w-full max-w-[1400px] space-y-4 px-4 py-4 pb-24 sm:px-6 lg:px-10 lg:pb-10"
    >
      {/* Header row: progress + timer */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-semibold text-white">
            Section D · fault {faultIndex + 1} of {totalFaults}
          </span>
          <div className="flex items-center gap-2">
            {hintLevel > 0 && (
              <span className="text-[11px] text-white">
                -{hintLevel} hint{hintLevel > 1 ? 's' : ''}
              </span>
            )}
            <span className="text-xs text-white">
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
                i < faultIndex ? 'bg-elec-yellow' : i === faultIndex ? 'bg-white' : 'bg-white/10'
              )}
            />
          ))}
        </div>

        {/* Timer bar for exam mode */}
        {sessionMode === 'exam' && <TimerBar timeRemaining={timeRemaining} />}
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)] gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-start lg:gap-8">
        <div className="space-y-4">
          {/* Guided tip */}
          {guidedTip && <GuidedTip tip={guidedTip} />}

          {/* Symptom card */}
          <div className="rounded-2xl border border-white/[0.14] bg-gradient-to-br from-white/[0.11] via-white/[0.065] to-white/[0.04] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.13),0_2px_10px_-4px_rgba(0,0,0,0.7)] p-4 lg:p-5">
            <div className="mb-2 flex items-start gap-2">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
              <span className="text-[13px] font-semibold text-white">{fault.circuitName}</span>
            </div>
            <p className="text-[15px] leading-relaxed text-white lg:text-[16px]">
              &ldquo;{fault.symptom}&rdquo;
            </p>
          </div>

          {/* Circuit Diagram */}
          <CircuitPathDiagram
            circuitType={fault.circuitType}
            testPoints={fault.testPoints}
            testsPerformed={testsPerformed}
            activePointId={expandedPoint}
            onTapPoint={(pointId) => onExpandPoint(expandedPoint === pointId ? null : pointId)}
            showVerdict={sessionMode === 'guided'}
          />

          {/* Findings Summary */}
          {testsPerformed.length > 0 && (
            <FindingsSummary
              fault={fault}
              testsPerformed={testsPerformed}
              showVerdict={sessionMode === 'guided'}
            />
          )}
        </div>

        <div className="space-y-4">
          {/* Multimeter with probe flash */}
          <div
            className={cn(
              'transition-all duration-150',
              probeFlash && 'ring-2 ring-elec-yellow/40 rounded-xl'
            )}
          >
            <MultimeterDisplay
              reading={currentReading?.reading ?? null}
              unit={currentReading?.unit ?? (meterMode === 'continuity' ? 'Ω' : 'MΩ')}
              mode={meterMode}
              isAbnormal={currentReading?.isAbnormal ?? false}
              showVerdict={sessionMode === 'guided'}
              testLabel={currentReading?.label}
              onModeChange={onModeChange}
            />
          </div>

          {/* Test Points */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
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
                showVerdict={sessionMode === 'guided'}
              />
            ))}
          </div>

          {/* Hints */}
          {sessionMode === 'practice' && (
            <HintCard fault={fault} hintLevel={hintLevel} onUseHint={onUseHint} />
          )}

          {/* Diagnose button */}
          {testsPerformed.length >= 2 && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileTap={{ scale: 0.97 }}
              onClick={onDiagnose}
              className="w-full h-12 rounded-xl bg-elec-yellow text-black font-bold text-sm touch-manipulation flex items-center justify-center gap-2"
            >
              <Search className="h-4 w-4" />I know the fault — diagnose
            </motion.button>
          )}
        </div>
      </div>
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
  showVerdict = true,
}: {
  point: TestPoint;
  meterMode: TestMode;
  testsPerformed: string[];
  isExpanded: boolean;
  onToggle: () => void;
  onTest: (test: TestReading) => void;
  /** Learn (guided) only: colour readings normal/abnormal. Otherwise you judge them. */
  showVerdict?: boolean;
}) {
  const availableTests = point.tests.filter((t) => t.mode === meterMode);
  const hasPerformed = point.tests.some((t) => testsPerformed.includes(t.id));

  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl border',
        isExpanded ? 'border-elec-yellow' : 'border-white/[0.16]',
        CARD_SURFACE
      )}
    >
      <button
        onClick={onToggle}
        className="flex min-h-[56px] w-full items-center gap-3 p-3.5 text-left touch-manipulation transition-colors"
      >
        <div
          className={cn(
            'h-8 w-8 rounded-lg flex items-center justify-center shrink-0',
            hasPerformed ? 'bg-white/[0.06]' : 'bg-white/10'
          )}
        >
          <MapPin className={cn('h-4 w-4', hasPerformed ? 'text-orange-400' : 'text-white')} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white">{point.location}</p>
          <p className="text-xs text-white truncate">{point.description}</p>
        </div>
        <ChevronDown
          className={cn(
            'h-4 w-4 text-white shrink-0 transition-transform',
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
                <p className="text-xs text-white py-2 text-center">
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
                          ? !showVerdict
                            ? 'bg-white/[0.06] border-white/[0.2]'
                            : test.isAbnormal
                              ? 'bg-red-500/10 border-red-500/30'
                              : 'bg-emerald-500/10 border-emerald-500/20'
                          : 'border-white/[0.16] hover:border-white/[0.35] active:bg-white/[0.08]'
                      )}
                    >
                      <div
                        className={cn(
                          'h-6 w-6 rounded flex items-center justify-center shrink-0',
                          performed
                            ? !showVerdict
                              ? 'bg-white/[0.12]'
                              : test.isAbnormal
                                ? 'bg-red-500/20'
                                : 'bg-emerald-500/20'
                            : 'bg-white/10'
                        )}
                      >
                        {performed && !showVerdict ? (
                          <CheckCircle2 className="h-3 w-3 text-white" />
                        ) : performed ? (
                          test.isAbnormal ? (
                            <AlertTriangle className="h-3 w-3 text-red-400" />
                          ) : (
                            <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                          )
                        ) : (
                          <Zap className="h-3 w-3 text-white" />
                        )}
                      </div>

                      <span className="flex-1 text-xs text-white">{test.label}</span>

                      {performed ? (
                        <span
                          className={cn(
                            'text-xs font-mono font-semibold',
                            !showVerdict
                              ? 'text-white'
                              : test.isAbnormal
                                ? 'text-red-400'
                                : 'text-emerald-400'
                          )}
                        >
                          {test.reading} {test.reading !== 'OL' ? test.unit : ''}
                        </span>
                      ) : (
                        <ArrowRight className="h-3 w-3 text-white shrink-0" />
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
  showVerdict = true,
}: {
  fault: FaultScenario;
  testsPerformed: string[];
  /** Learn (guided) only: flag abnormal readings. Otherwise a plain log. */
  showVerdict?: boolean;
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
        <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Findings</h4>
        {showVerdict && totalAbnormal > 0 && (
          <span className="text-[11px] font-semibold text-white border border-red-400 px-2 py-0.5 rounded-full">
            {totalAbnormal} abnormal
          </span>
        )}
      </div>

      <div className={cn('overflow-hidden rounded-2xl border border-white/[0.16]', CARD_SURFACE)}>
        {groups.map((group, gi) => (
          <div key={gi}>
            <div className={cn('px-3 py-1.5', gi > 0 && 'border-t border-white/[0.1]')}>
              <p className="text-[11px] font-semibold text-white uppercase tracking-wider">
                {group.location}
              </p>
            </div>

            {group.readings.map((r, ri) => {
              const hint =
                showVerdict && r.isAbnormal
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
                        !showVerdict ? 'bg-white' : r.isAbnormal ? 'bg-red-500' : 'bg-emerald-500'
                      )}
                    />
                    <span className="flex-1 text-xs text-white truncate">{r.label}</span>
                    <span
                      className={cn(
                        'text-xs font-mono font-bold shrink-0',
                        !showVerdict
                          ? 'text-white'
                          : r.isAbnormal
                            ? 'text-red-400'
                            : 'text-emerald-400'
                      )}
                    >
                      {r.reading === 'OL' ? 'OL' : `${r.reading} ${r.unit}`}
                    </span>
                  </div>
                  {hint && <p className="text-[11px] text-white mt-0.5 ml-4">{hint}</p>}
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

/** "At X" or "Between X and Y", then the conductors, from point ids. */
function describeWhere(fault: FaultScenario, at: string[], conductors: string[]): string {
  const names = at.map((id) => fault.testPoints.find((p) => p.id === id)?.location ?? id);
  const where =
    names.length === 0
      ? 'No point given'
      : names.length === 1
        ? `At ${names[0]}`
        : `Between ${names[0]} and ${names[1]}`;
  return conductors.length ? `${where} · ${conductors.join(' and ')}` : `${where} · no conductor`;
}

const provingLabel = (id: ProvingTestId) => PROVING_TESTS.find((t) => t.id === id)?.label ?? id;

const CHIP =
  'inline-flex min-h-[44px] items-center rounded-xl border px-3.5 py-2 text-left text-[13.5px] leading-snug touch-manipulation transition-colors';
const CHIP_ON = 'border-elec-yellow bg-elec-yellow font-semibold text-black';
const CHIP_OFF =
  'border-white/[0.16] bg-white/[0.06] font-medium text-white hover:border-white/[0.32]';

/** Learn: a pointer for each part of the record. */
const RECORD_TIPS = {
  type: 'OL where there should be continuity is a break. Near 0 between two conductors that should be apart is a short. A few ohms more than it should be is a high resistance. Continuity to the wrong conductor is a mis-connection.',
  where:
    'Find the last point where the readings were right and the first where they weren’t. The fault is between them — or at the termination where they change.',
  fix: 'Put the fault itself right — the smallest piece of work that does it.',
  proving:
    'BS 7671 643.1: repeat the test that failed, and any earlier test the fault may have affected. Don’t pick tests that don’t apply to this circuit.',
};

function RecordPart({
  n,
  title,
  tip,
  children,
}: {
  n: number;
  title: string;
  tip?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={cn(FF_SURFACE, 'space-y-3 p-4 sm:p-5')}>
      <h3 className="text-[15px] font-semibold text-white">
        {n}. {title}
      </h3>
      {tip && <p className="text-[13px] leading-relaxed text-white">{tip}</p>}
      {children}
    </section>
  );
}

function DiagnosisPhase({
  fault,
  sessionMode,
  timeRemaining,
  onSelect,
  onBack,
  draft,
  onDraft,
}: {
  fault: FaultScenario;
  sessionMode: SessionMode;
  timeRemaining: number;
  onSelect: (record: FaultRecordAnswer) => void;
  onBack: () => void;
  draft?: Partial<FaultRecordAnswer>;
  onDraft?: (d: Partial<FaultRecordAnswer>) => void;
}) {
  const learn = sessionMode === 'guided';
  const [type, setType] = useState<FaultType | null>(draft?.type ?? null);
  const [at, setAt] = useState<string[]>(draft?.at ?? []);
  const [conductors, setConductors] = useState<string[]>(draft?.conductors ?? []);
  const [fix, setFix] = useState<string | null>(draft?.fix ?? null);
  const [proving, setProving] = useState<ProvingTestId[]>(draft?.proving ?? []);
  useEffect(() => {
    onDraft?.({ type, at, conductors, fix, proving });
    // onDraft is a fresh closure each render; the record fields are what matter.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, at, conductors, fix, proving]);
  // Once confirmed, this screen is leaving (a short exit animation) — no
  // further key may record again or skip the next fault.
  const submitted = useRef(false);

  const fixOptions = useMemo(
    () => fault.rectificationOptions ?? [fault.rectification],
    [fault.rectificationOptions, fault.rectification]
  );
  const conductorOptions = CONDUCTOR_OPTIONS[fault.circuitType] ?? ['L', 'N', 'cpc'];
  const complete = !!type && at.length > 0 && conductors.length > 0 && !!fix && proving.length > 0;
  const missing = [
    !type && 'the type',
    at.length === 0 && 'where it is',
    conductors.length === 0 && 'the conductor',
    !fix && 'the repair',
    proving.length === 0 && 'how you’d prove it',
  ].filter(Boolean) as string[];

  const confirm = useCallback(() => {
    if (submitted.current || !complete) return;
    submitted.current = true;
    onSelect({ type, at, conductors, fix, proving });
  }, [complete, onSelect, type, at, conductors, fix, proving]);

  // A point tapped twice is cleared; a third replaces the first of two.
  const tapPoint = (id: string) =>
    setAt((cur) =>
      cur.includes(id) ? cur.filter((x) => x !== id) : cur.length < 2 ? [...cur, id] : [cur[1], id]
    );
  const toggle = <T,>(list: T[], v: T) =>
    list.includes(v) ? list.filter((x) => x !== v) : [...list, v];

  // A–D picks the repair on a keyboard; Enter records the fault once complete.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.repeat || submitted.current) return;
      if (e.target instanceof HTMLButtonElement && e.key === 'Enter') return;
      const n = e.key.length === 1 ? 'abcd'.indexOf(e.key.toLowerCase()) : -1;
      if (n >= 0 && n < fixOptions.length) setFix(fixOptions[n]);
      else if (e.key === 'Enter') confirm();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [fixOptions, confirm]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="mx-auto w-full max-w-[1300px] space-y-5 px-4 py-5 sm:px-6 lg:px-10"
    >
      {sessionMode === 'exam' && <TimerBar timeRemaining={timeRemaining} />}
      <div className="grid grid-cols-[minmax(0,1fr)] gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:items-start lg:gap-8">
        <div className={cn(FF_SURFACE, 'p-5 sm:p-6 lg:sticky lg:top-4')}>
          <p className="text-[12px] font-semibold text-white">Section D · record the fault</p>
          <p className="mt-2 text-[13px] font-semibold text-white">{fault.circuitName}</p>
          <p className="mt-2 text-[16px] leading-relaxed text-white">
            &ldquo;{fault.symptom}&rdquo;
          </p>
          <p className="mt-3 text-[13px] leading-relaxed text-white">
            As on the day: the type of fault, between which two points and on which conductor, how
            you’d put it right, and how you’d prove the repair.
          </p>
          <button
            type="button"
            onClick={onBack}
            className="mt-4 h-11 text-[13px] font-medium text-white touch-manipulation"
          >
            ← Back to testing
          </button>
        </div>

        <div className="space-y-3">
          <RecordPart n={1} title="Type of fault" tip={learn ? RECORD_TIPS.type : undefined}>
            <div className="grid gap-2 sm:grid-cols-2">
              {NET_TYPES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  aria-pressed={type === t.id}
                  onClick={() => setType(t.id)}
                  className={cn(CHIP, type === t.id ? CHIP_ON : CHIP_OFF)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </RecordPart>

          <RecordPart n={2} title="Where it is" tip={learn ? RECORD_TIPS.where : undefined}>
            <p className="text-[13px] text-white">
              Tap the point it’s at, or the two points it’s between.
            </p>
            <div className="flex flex-wrap gap-2">
              {fault.testPoints.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  aria-pressed={at.includes(p.id)}
                  onClick={() => tapPoint(p.id)}
                  className={cn(CHIP, at.includes(p.id) ? CHIP_ON : CHIP_OFF)}
                >
                  {p.location}
                </button>
              ))}
            </div>
            <p className="text-[13px] text-white">On which conductor or conductors?</p>
            <div className="flex flex-wrap gap-2">
              {conductorOptions.map((c) => (
                <button
                  key={c}
                  type="button"
                  aria-pressed={conductors.includes(c)}
                  onClick={() => setConductors((cur) => toggle(cur, c))}
                  className={cn(CHIP, conductors.includes(c) ? CHIP_ON : CHIP_OFF)}
                >
                  {c}
                </button>
              ))}
            </div>
            {(at.length > 0 || conductors.length > 0) && (
              <p className="text-[13px] font-semibold text-white">
                {describeWhere(fault, at, conductors)}
              </p>
            )}
          </RecordPart>

          <RecordPart
            n={3}
            title="How you’d put it right"
            tip={learn ? RECORD_TIPS.fix : undefined}
          >
            <div className="space-y-2">
              {fixOptions.map((f, i) => (
                <button
                  key={f}
                  type="button"
                  aria-pressed={fix === f}
                  onClick={() => setFix(f)}
                  className={cn(
                    'flex min-h-[56px] w-full items-start gap-3 rounded-2xl border px-4 py-3 text-left transition-colors touch-manipulation',
                    fix === f
                      ? 'border-elec-yellow'
                      : 'border-white/[0.16] hover:border-white/[0.32]'
                  )}
                >
                  <span
                    className={cn(
                      'flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border text-[12.5px] font-bold',
                      fix === f
                        ? 'border-elec-yellow bg-elec-yellow text-black'
                        : 'border-white/[0.2] text-white'
                    )}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="text-[14px] leading-snug text-white">{f}</span>
                </button>
              ))}
            </div>
          </RecordPart>

          <RecordPart
            n={4}
            title="How you’d prove the repair"
            tip={learn ? RECORD_TIPS.proving : undefined}
          >
            <p className="text-[13px] text-white">Choose every test you’d do. Wrong ones count.</p>
            <div className="grid gap-2 sm:grid-cols-2">
              {PROVING_TESTS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  aria-pressed={proving.includes(t.id)}
                  onClick={() => setProving((cur) => toggle(cur, t.id))}
                  className={cn(CHIP, proving.includes(t.id) ? CHIP_ON : CHIP_OFF)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </RecordPart>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <button
              type="button"
              disabled={!complete}
              onClick={confirm}
              className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-elec-yellow text-[15px] font-bold text-black touch-manipulation disabled:bg-white/[0.12] disabled:text-white sm:w-auto sm:px-8"
            >
              Record this fault
            </button>
            {!complete && (
              <p className="text-[13px] text-white">Still to do: {missing.join(', ')}.</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/** Each part of the record: what was said, what it was, and why. Used after
 *  each fault (Learn, Practise) and in the results debrief (all modes). */
function RecordReview({ st }: { st: FaultState }) {
  const f = st.scenario;
  const key = FAULT_RECORD[f.id];
  const r = st.record;
  const m = st.marks;
  const rows: { label: string; ok: boolean; said: string; right: string; why?: string }[] = [
    {
      label: 'Type',
      ok: !!m?.type,
      said: NET_TYPES.find((t) => t.id === r?.type)?.label ?? '—',
      right: NET_TYPES.find((t) => t.id === f.correctFaultType)?.label ?? '',
    },
    {
      label: 'Where',
      ok: !!m?.where,
      said: r ? describeWhere(f, r.at, r.conductors) : '—',
      right: key ? describeWhere(f, key.at[0], key.conductors[0]) : f.correctLocation,
      why: f.correctLocation,
    },
    {
      label: 'Putting it right',
      ok: !!m?.fix,
      said: r?.fix ?? '—',
      right: f.rectification,
    },
    {
      label: 'Proving the repair',
      ok: !!m?.proving,
      said: r?.proving.length ? r.proving.map(provingLabel).join('; ') : '—',
      right: key ? key.required.map((g) => g.map(provingLabel).join(' or ')).join('; ') : '',
      why: key?.why,
    },
  ];
  return (
    <ul className="space-y-2.5">
      {rows.map((row) => (
        <li key={row.label} className="flex gap-2.5">
          <span
            className={cn(
              'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-black',
              row.ok ? 'bg-emerald-400' : 'bg-red-400'
            )}
          >
            {row.ok ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
          </span>
          <div className="min-w-0 text-[13px] leading-relaxed text-white">
            <p className="font-semibold">{row.label}</p>
            {!row.ok && (
              <p>
                <span className="font-semibold">You said:</span>{' '}
                {r ? row.said : 'nothing — not recorded'}
              </p>
            )}
            <p>
              <span className="font-semibold">{row.ok ? 'Right:' : 'It was:'}</span> {row.right}
            </p>
            {row.why && row.why !== row.right && <p>{row.why}</p>}
          </div>
        </li>
      ))}
    </ul>
  );
}

// ── Feedback Phase ───────────────────────────────────────────

const FF_SURFACE =
  'rounded-2xl border border-white/[0.16] bg-gradient-to-br from-white/[0.11] via-white/[0.065] to-white/[0.04] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.13),0_2px_10px_-4px_rgba(0,0,0,0.7)]';

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
  const right = state.marks
    ? (['type', 'where', 'fix', 'proving'] as const).filter((k) => state.marks![k]).length
    : 0;
  const blocks = [
    { label: 'How the readings give it away', body: fault.explanation },
    { label: 'The quickest route to it', body: fault.optimalMethod },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="mx-auto w-full max-w-[1300px] space-y-5 px-4 py-5 sm:px-6 lg:px-10"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[12px] font-semibold text-white">
            Section D · fault {faultIndex + 1} of {totalFaults} · {fault.circuitName}
          </p>
          <p
            className={cn(
              'mt-1 flex items-center gap-2 text-[26px] font-bold leading-tight',
              'text-white'
            )}
          >
            {state.isCorrect ? (
              <CheckCircle2 className="h-7 w-7" />
            ) : (
              <XCircle className="h-7 w-7" />
            )}
            {state.isCorrect ? 'All four parts right' : `${right} of 4 parts right`}
          </p>
          <p className="mt-1 text-[13px] text-white">
            {state.testsPerformed.length} test{state.testsPerformed.length === 1 ? '' : 's'} ·{' '}
            {state.timeTaken}s
            {state.hintsUsed > 0 &&
              ` · ${state.hintsUsed} hint${state.hintsUsed > 1 ? 's' : ''} used`}
          </p>
        </div>
        <button
          type="button"
          onClick={onNext}
          className="inline-flex h-12 items-center justify-center gap-2 self-start rounded-xl bg-elec-yellow px-7 text-[15px] font-bold text-black touch-manipulation active:scale-[0.98] sm:self-auto"
        >
          {isLast ? 'See the results' : 'Next fault'}
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div className={cn(FF_SURFACE, 'p-4 sm:p-5')}>
        <p className="mb-3 text-[13px] font-semibold text-white">Your record</p>
        <RecordReview st={state} />
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {blocks.map((b) => (
          <div key={b.label} className={cn(FF_SURFACE, 'p-4 sm:p-5')}>
            <p className="text-[13px] font-semibold text-white">{b.label}</p>
            <p className="mt-1.5 whitespace-pre-line text-[14px] leading-relaxed text-white">
              {b.body}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ── Results Phase ────────────────────────────────────────────

const CIRCUIT_NAMES: Record<string, string> = {
  ring_main: 'Ring final',
  lighting: 'Lighting',
  motor_dol: 'DOL motor',
  bonding: 'Bonding',
  smoke_co: 'Smoke and CO alarms',
  data: 'Data',
  tpn_socket: 'TPN socket circuit',
  splan: 'S-plan heating',
};

/** One fault in the results: tap to see what it was, what you said and why.
 *  The Assessment debrief — nothing is shown per fault until the end. */
function ResultRow({ st }: { st: FaultState }) {
  const [open, setOpen] = useState(false);
  const f = st.scenario;
  const right = st.marks
    ? (['type', 'where', 'fix', 'proving'] as const).filter((k) => st.marks![k]).length
    : 0;
  return (
    <li>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex min-h-[56px] w-full items-center gap-3 px-4 py-3 text-left touch-manipulation sm:px-5"
      >
        <span
          className={cn(
            'flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-black',
            st.isCorrect ? 'bg-emerald-400' : 'bg-red-400'
          )}
        >
          {st.isCorrect ? (
            <CheckCircle2 className="h-3.5 w-3.5" />
          ) : (
            <XCircle className="h-3.5 w-3.5" />
          )}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[14px] font-semibold text-white">
            {f.circuitName}
          </span>
          <span className="block text-[12px] text-white">
            {st.record ? `${right} of 4 parts right` : 'Not recorded'} · {st.testsPerformed.length}{' '}
            tests · {st.timeTaken}s
            {st.hintsUsed > 0 && ` · ${st.hintsUsed} hint${st.hintsUsed > 1 ? 's' : ''}`}
          </span>
        </span>
        <ChevronDown
          className={cn('h-4 w-4 shrink-0 text-white transition-transform', open && 'rotate-180')}
        />
      </button>
      {open && (
        <div className="space-y-3 px-4 pb-4 text-[13px] leading-relaxed text-white sm:px-5">
          <RecordReview st={st} />
          <p>
            <span className="font-semibold">How the readings give it away:</span> {f.explanation}
          </p>
          <p>
            <span className="font-semibold">The quickest route:</span> {f.optimalMethod}
          </p>
        </div>
      )}
    </li>
  );
}

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
  /** Not offered on the Mock day — one go per section. */
  onRetry?: () => void;
}) {
  const correct = faultStates.filter((f) => f.isCorrect).length;
  const total = faultStates.length;
  // The same scorer as the saved run: parts of the record right.
  const pct = scoreFaults(faultStates, total);
  const atBar = pct >= 80;
  const totalHints = faultStates.reduce((sum, f) => sum + f.hintsUsed, 0);
  const ranOutOfTime = sessionMode === 'exam' && timeRemaining === 0;

  // Across every saved session on this device: which circuit types trip you up.
  const history = loadHistory();
  const circuitStats: Record<string, { correct: number; total: number }> = {};
  for (const session of history) {
    for (const f of session.faults) {
      circuitStats[f.circuitType] ??= { correct: 0, total: 0 };
      circuitStats[f.circuitType].total++;
      if (f.correct) circuitStats[f.circuitType].correct++;
    }
  }
  const byCircuit = Object.entries(circuitStats)
    .filter(([, st]) => st.total >= 2)
    .map(([type, st]) => ({
      type,
      pct: Math.round((st.correct / st.total) * 100),
      total: st.total,
    }))
    .sort((x, y) => x.pct - y.pct);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="mx-auto w-full max-w-[1300px] space-y-8 px-4 py-6 sm:px-6 lg:px-10"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[12px] font-semibold text-white">Section D · fault diagnosis · done</p>
          <h1 className="mt-1 text-[28px] font-bold leading-tight tracking-tight text-white lg:text-[34px]">
            {correct} of {total} faults recorded in full
          </h1>
          <p className="mt-1 text-[14px] text-white">
            <span className={cn('text-[20px] font-bold tabular-nums text-white')}>{pct}%</span> ·{' '}
            {Math.floor(sessionTime / 60)}m {sessionTime % 60}s
            {totalHints > 0 && ` · ${totalHints} hint${totalHints > 1 ? 's' : ''}`} ·{' '}
            {atBar ? 'at the practice bar (80%)' : 'below the practice bar (80%)'}
          </p>
          {ranOutOfTime && (
            <p className="mt-1 text-[13px] font-semibold text-white">The two hours ran out.</p>
          )}
        </div>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex h-12 items-center gap-2 self-start rounded-xl bg-elec-yellow px-6 text-[14.5px] font-bold text-black touch-manipulation sm:self-auto"
          >
            <RotateCcw className="h-4 w-4" /> New faults
          </button>
        )}
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-10">
        <section className="space-y-3">
          <h2 className="text-[15px] font-semibold tracking-tight text-white">This session</h2>
          <p className="text-[13px] text-white">
            Tap a fault for each part of your record against the right answer.
          </p>
          <ul className={cn(FF_SURFACE, 'divide-y divide-white/[0.08] overflow-hidden')}>
            {faultStates.map((st, i) => (
              <ResultRow key={i} st={st} />
            ))}
          </ul>
        </section>
        <section className="space-y-3">
          <h2 className="text-[15px] font-semibold tracking-tight text-white">
            By circuit, all sessions
          </h2>
          {byCircuit.length === 0 ? (
            <p className="text-[13.5px] leading-relaxed text-white">
              After a couple of sessions this shows which circuit types you find hardest.
            </p>
          ) : (
            <div className="space-y-2">
              {byCircuit.map((c) => (
                <div key={c.type} className={cn(FF_SURFACE, 'px-4 py-3')}>
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="text-[13.5px] font-semibold text-white">
                      {CIRCUIT_NAMES[c.type] ?? c.type}
                    </p>
                    <p className="text-[13px] font-semibold tabular-nums text-white">
                      {c.pct}% · {c.total} faults
                    </p>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
                    <div
                      className={cn(
                        'h-full rounded-full',
                        c.pct >= 80 ? 'bg-emerald-400' : 'bg-amber-400'
                      )}
                      style={{ width: `${c.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
          <p className="text-[13px] leading-relaxed text-white">
            Know how each circuit reads when it&apos;s healthy, predict the reading before you take
            it, and work through it methodically — that beats guessing every time.
          </p>
        </section>
      </div>
    </motion.div>
  );
}

export default FaultFindingSimulator;
