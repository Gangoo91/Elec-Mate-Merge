/**
 * CircuitTestView v5 — Full-Screen Guided Testing
 *
 * Uses the new CircuitDiagram component for realistic 3D SVG components.
 * Layout: instruction strip → circuit diagram (140px) → MFT instrument → progress bar
 * Circuit diagram is the star — shows realistic components with test probes.
 */

import { useCallback, useMemo, useState } from 'react';
import {
  ArrowLeft,
  FileText,
  Check,
  ChevronRight,
  ArrowRight,
  BookOpen,
  X,
  AlertTriangle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type {
  AM2RigCircuit,
  DialPosition,
  CircuitProgress,
  TestReading,
  RequiredTest,
} from '@/types/am2-testing-simulator';
import { MFTInstrument } from './MFTInstrument';
import { CircuitDiagram } from './CircuitDiagram';
import { useMFTInstrument } from '@/hooks/am2/useMFTInstrument';
import { getTestLearning } from '@/data/am2TestLearning';

interface CircuitTestViewProps {
  circuit: AM2RigCircuit;
  progress: CircuitProgress;
  gn3Step: number;
  onReadingComplete: (reading: TestReading) => void;
  onBack: () => void;
  onOpenEIC: () => void;
}

/** Short dial label for compact display */
function getDialShort(position: DialPosition): string {
  const map: Record<string, string> = {
    OFF: 'OFF',
    CONTINUITY: 'Ω',
    IR_250V: '250V',
    IR_500V: '500V',
    LOOP_ZS: 'Zs',
    RCD_30: '30mA',
    RCD_100: '100mA',
    RCD_300: '300mA',
    PFC: 'PFC',
  };
  return map[position] || position;
}

export function CircuitTestView({
  circuit,
  progress,
  gn3Step,
  onReadingComplete,
  onBack,
  onOpenEIC,
}: CircuitTestViewProps) {
  // Find the next required test that hasn't been completed
  const nextTest = useMemo<RequiredTest | null>(() => {
    const sortedTests = [...circuit.requiredTests].sort((a, b) => a.gn3Step - b.gn3Step);
    return sortedTests.find((t) => !progress.completedTests.includes(t.id)) ?? null;
  }, [circuit.requiredTests, progress.completedTests]);

  const [manualTestPointId, setManualTestPointId] = useState<string | null>(null);
  const [manualSubTest, setManualSubTest] = useState<string | undefined>(undefined);
  const [lastReading, setLastReading] = useState<TestReading | null>(null);
  const [readingRecorded, setReadingRecorded] = useState(false);
  const [showLearn, setShowLearn] = useState(false);

  const activeTestPointId = manualTestPointId || nextTest?.testPointId || null;
  const activeSubTest = manualTestPointId ? manualSubTest : nextTest?.subTest || undefined;

  const guidedDialPosition = nextTest?.dialPosition || null;

  const {
    state: mftState,
    setDialPosition,
    runTest,
  } = useMFTInstrument({
    circuit,
    activeTestPointId,
    activeSubTest,
    onReadingComplete: (reading: TestReading) => {
      setLastReading(reading);
      setReadingRecorded(false);
      onReadingComplete(reading);
    },
  });

  const handleDialChange = useCallback(
    (pos: DialPosition) => {
      setDialPosition(pos);
      setLastReading(null);
      setReadingRecorded(false);
    },
    [setDialPosition]
  );

  const handleTest = useCallback(() => {
    runTest();
  }, [runTest]);

  const handleSelectTestPoint = useCallback((pointId: string) => {
    setManualTestPointId(pointId);
    setManualSubTest(undefined);
    setLastReading(null);
    setReadingRecorded(false);
  }, []);

  const handleRecordAndNext = useCallback(() => {
    setReadingRecorded(true);
    setManualTestPointId(null);
    setManualSubTest(undefined);
    setLastReading(null);
  }, []);

  const dialCorrect = guidedDialPosition
    ? mftState.dialPosition === guidedDialPosition
    : mftState.dialPosition !== 'OFF';

  const testDisabled =
    !activeTestPointId || mftState.dialPosition === 'OFF' || mftState.isTestActive;

  const testPointForGuided = nextTest
    ? circuit.testPoints.find((tp) => tp.id === nextTest.testPointId)
    : null;

  const allTestsComplete = progress.completedTests.length >= progress.totalTests;
  const currentTestNumber =
    progress.completedTests.length + (lastReading && !readingRecorded ? 1 : 0);

  // Compute completed test point IDs for the diagram
  const completedTestPointIds = useMemo(() => {
    const ids = new Set<string>();
    for (const testId of progress.completedTests) {
      const req = circuit.requiredTests.find((t) => t.id === testId);
      if (req) ids.add(req.testPointId);
    }
    return Array.from(ids);
  }, [progress.completedTests, circuit.requiredTests]);

  // Learning content for the current test
  const learnContent = useMemo(() => {
    if (!nextTest) return null;
    return getTestLearning(nextTest.dialPosition, nextTest.subTest);
  }, [nextTest]);

  return (
    <div className="flex flex-col h-full bg-background">
      {/* ── Header ── */}
      <div className="flex items-center justify-between px-3 py-1 border-b border-white/5 shrink-0">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-xs text-white/60 touch-manipulation h-9 px-1"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="text-center flex-1 min-w-0">
          <p className="text-xs font-semibold text-white truncate">
            {circuit.id}. {circuit.name}
          </p>
        </div>
        <button
          onClick={onOpenEIC}
          className="h-9 flex items-center gap-1 px-2 rounded-lg bg-white/[0.04] border border-white/10 touch-manipulation"
          aria-label="Open EIC schedule"
        >
          <FileText className="w-3.5 h-3.5 text-white/50" />
          <span className="text-[10px] text-white/40 font-medium">EIC</span>
        </button>
      </div>

      {/* ── Instruction Strip / Result Banner ── */}
      <div className="mx-3 mt-1 shrink-0">
        {lastReading && !readingRecorded ? (
          <div
            className={cn(
              'flex items-center gap-2 rounded-lg px-3 py-1.5 border',
              lastReading.compliant
                ? 'border-green-500/30 bg-green-500/[0.08]'
                : 'border-red-500/30 bg-red-500/[0.08]'
            )}
          >
            <span
              className={cn(
                'text-sm font-bold font-mono',
                lastReading.compliant ? 'text-green-400' : 'text-red-400'
              )}
            >
              {lastReading.displayValue} {lastReading.unit}
            </span>
            <span
              className={cn(
                'text-[9px] font-bold px-1.5 py-0.5 rounded-full',
                lastReading.compliant
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-red-500/20 text-red-400'
              )}
            >
              {lastReading.compliant ? 'PASS' : 'FAIL'}
            </span>
            <span className="flex-1" />
            <button
              onClick={handleRecordAndNext}
              className="flex items-center gap-1 h-8 px-3 rounded-md bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 text-[11px] font-semibold touch-manipulation"
            >
              Next <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        ) : allTestsComplete ? (
          <div className="flex items-center gap-2 rounded-lg px-3 py-1.5 border border-green-500/20 bg-green-500/[0.06]">
            <Check className="w-4 h-4 text-green-400 shrink-0" />
            <span className="text-[11px] font-semibold text-green-400">All tests complete</span>
            <span className="flex-1" />
            <button
              onClick={onOpenEIC}
              className="flex items-center gap-1 h-8 px-3 rounded-md bg-green-500/15 border border-green-500/30 text-green-300 text-[11px] font-semibold touch-manipulation"
            >
              <FileText className="w-3 h-3" />
              EIC
            </button>
          </div>
        ) : nextTest ? (
          <div className="rounded-xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/[0.08] to-cyan-900/[0.04] overflow-hidden">
            {/* Top row — big test number + counter */}
            <div className="flex items-center justify-between px-3 pt-2.5 pb-1">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400/20 flex items-center justify-center shrink-0">
                  <span className="text-base font-black text-cyan-400">
                    {currentTestNumber + 1}
                  </span>
                </div>
                <span className="text-[10px] font-semibold text-cyan-400/60 uppercase tracking-wider">
                  Test {currentTestNumber + 1} of {progress.totalTests}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span
                  className={cn(
                    'text-[11px] font-bold font-mono px-2 py-1 rounded-md border',
                    dialCorrect
                      ? 'bg-green-500/15 text-green-400 border-green-500/20'
                      : 'bg-amber-500/15 text-amber-300 border-amber-500/20'
                  )}
                >
                  {getDialShort(nextTest.dialPosition)}
                </span>
                <span className="text-[11px] font-semibold text-white/40">
                  {testPointForGuided?.label || nextTest.testPointId}
                </span>
              </div>
            </div>
            {/* Description — large and prominent */}
            <div className="px-3 pb-2">
              <p className="text-base font-bold text-white leading-snug">{nextTest.description}</p>
            </div>
            {/* Bottom bar — learn button */}
            {learnContent && (
              <div className="flex items-center justify-end px-3 pb-2.5">
                <button
                  onClick={() => setShowLearn(!showLearn)}
                  className={cn(
                    'flex items-center gap-1.5 h-8 px-3 rounded-lg text-[11px] font-bold touch-manipulation transition-all',
                    showLearn
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-sm shadow-amber-500/10'
                      : 'bg-white/[0.06] text-white/50 border border-white/10'
                  )}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  {showLearn ? 'Hide' : 'Learn'}
                </button>
              </div>
            )}
          </div>
        ) : null}
      </div>

      {/* ── Circuit Diagram OR Learning Panel (share the same flex space) ── */}
      <div className="mx-3 mt-1 flex-1 min-h-[100px] relative">
        {showLearn && learnContent ? (
          /* ── Learning Panel (replaces diagram) ── */
          <div className="absolute inset-0 flex flex-col rounded-xl border border-amber-500/20 bg-gradient-to-b from-amber-500/[0.06] to-background overflow-hidden z-10">
            {/* Panel header */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-amber-500/15 shrink-0">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-amber-300">Learn</span>
              </div>
              <button
                onClick={() => setShowLearn(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/[0.06] border border-white/10 touch-manipulation"
              >
                <X className="w-4 h-4 text-white/50" />
              </button>
            </div>
            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              {/* What it measures */}
              <div>
                <p className="text-[10px] font-bold text-amber-400/80 uppercase tracking-wider mb-1">
                  What this test measures
                </p>
                <p className="text-xs text-white/80 leading-relaxed text-left">
                  {learnContent.whatItIs}
                </p>
              </div>
              {/* Why it matters */}
              <div>
                <p className="text-[10px] font-bold text-amber-400/80 uppercase tracking-wider mb-1">
                  Why it matters
                </p>
                <p className="text-xs text-white/80 leading-relaxed text-left">
                  {learnContent.whyItMatters}
                </p>
              </div>
              {/* Common fail points */}
              {learnContent.failPoints && learnContent.failPoints.length > 0 && (
                <div className="rounded-lg border border-red-500/20 bg-red-500/[0.06] p-3">
                  <div className="flex items-center gap-1.5 mb-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                    <p className="text-[10px] font-bold text-red-400 uppercase tracking-wider">
                      Common Fail Points
                    </p>
                  </div>
                  <ul className="space-y-1.5">
                    {learnContent.failPoints.map((point, i) => (
                      <li key={i} className="flex items-start gap-2 text-left">
                        <span className="text-red-400/60 text-xs mt-0.5 shrink-0">&bull;</span>
                        <span className="text-xs text-red-200/80 leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {/* EIC Schedule */}
              <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-cyan-500/[0.06] border border-cyan-400/15">
                <FileText className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div className="text-left">
                  <p className="text-[10px] font-bold text-cyan-400 mb-0.5">EIC Schedule</p>
                  <p className="text-xs text-white/70 leading-relaxed">{learnContent.eicInfo}</p>
                </div>
              </div>
              {/* Practical tip */}
              <div>
                <p className="text-[10px] font-bold text-green-400/80 uppercase tracking-wider mb-1">
                  Practical tip
                </p>
                <p className="text-xs text-white/80 leading-relaxed text-left">
                  {learnContent.practicalTip}
                </p>
              </div>
              {/* Regulation */}
              <div className="pt-2 border-t border-white/5">
                <p className="text-[10px] text-white/30 font-mono text-left">
                  {learnContent.regulation}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <CircuitDiagram
            testPoints={circuit.testPoints}
            diagramLayout={circuit.diagramLayout}
            activeTestPointId={activeTestPointId}
            guidedTestPointId={!manualTestPointId ? nextTest?.testPointId || null : null}
            completedTestPointIds={completedTestPointIds}
            onSelectTestPoint={handleSelectTestPoint}
          />
        )}
      </div>

      {/* ── MFT Instrument ── */}
      <div className="px-3 py-1 shrink-0">
        <MFTInstrument
          dialPosition={mftState.dialPosition}
          displayMode={mftState.displayMode}
          reading={mftState.currentReading}
          onDialChange={handleDialChange}
          onTest={handleTest}
          testDisabled={testDisabled}
        />
      </div>

      {/* ── Bottom progress bar ── */}
      <div className="px-3 py-1.5 border-t border-white/5 flex items-center gap-2 bg-white/[0.02] shrink-0">
        <span className="text-[10px] text-white/30 font-mono">
          {progress.completedTests.length}/{progress.totalTests}
        </span>
        <div className="flex-1 h-1 bg-white/[0.06] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${(progress.completedTests.length / progress.totalTests) * 100}%`,
              background: allTestsComplete ? '#22c55e' : 'linear-gradient(90deg, #22d3ee, #06b6d4)',
            }}
          />
        </div>
        <button
          onClick={onOpenEIC}
          className="text-[10px] text-cyan-400/60 font-medium touch-manipulation px-1.5 h-7 flex items-center"
        >
          EIC <ChevronRight className="w-3 h-3 ml-0.5" />
        </button>
      </div>
    </div>
  );
}
