/**
 * CircuitTestView v5 — Full-Screen Guided Testing
 *
 * Uses the new CircuitDiagram component for realistic 3D SVG components.
 * Layout: instruction strip → circuit diagram (140px) → MFT instrument → progress bar
 * Circuit diagram is the star — shows realistic components with test probes.
 */

import { useCallback, useMemo, useState } from 'react';
import { ArrowLeft, FileText, Check, ChevronRight, ArrowRight, BookOpen, X } from 'lucide-react';
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
          <div className="rounded-lg px-3 py-2 border border-cyan-400/15 bg-cyan-500/[0.04]">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0">
                <span className="text-[10px] font-bold text-cyan-400">{currentTestNumber + 1}</span>
              </div>
              <p className="text-sm font-semibold text-white flex-1 min-w-0">
                {nextTest.description}
              </p>
              <span className="text-[10px] text-white/30 font-mono shrink-0">
                {currentTestNumber + 1}/{progress.totalTests}
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-1 ml-8">
              <span
                className={cn(
                  'text-[10px] font-mono px-1.5 py-0.5 rounded',
                  dialCorrect ? 'bg-green-500/15 text-green-400' : 'bg-amber-500/15 text-amber-300'
                )}
              >
                {getDialShort(nextTest.dialPosition)}
              </span>
              <span className="text-[10px] text-white/25">at</span>
              <span className="text-[10px] font-semibold text-white/50">
                {testPointForGuided?.label || nextTest.testPointId}
              </span>
              {learnContent && (
                <button
                  onClick={() => setShowLearn(!showLearn)}
                  className={cn(
                    'ml-auto flex items-center gap-1 h-7 px-2.5 rounded-full text-[10px] font-semibold touch-manipulation transition-colors',
                    showLearn
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-white/[0.06] text-white/40 border border-white/10'
                  )}
                >
                  <BookOpen className="w-3 h-3" />
                  Learn
                </button>
              )}
            </div>
          </div>
        ) : null}
      </div>

      {/* ── Learning Panel (collapsible) ── */}
      {showLearn && learnContent && (
        <div className="mx-3 mt-1 shrink-0 rounded-lg border border-amber-500/20 bg-amber-500/[0.04] overflow-hidden">
          <div className="flex items-center justify-between px-3 py-1.5 border-b border-amber-500/10">
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[11px] font-semibold text-amber-300">
                Learn — {nextTest?.description}
              </span>
            </div>
            <button
              onClick={() => setShowLearn(false)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/[0.06] touch-manipulation"
            >
              <X className="w-3.5 h-3.5 text-white/40" />
            </button>
          </div>
          <div className="px-3 py-2 space-y-2 max-h-[35vh] overflow-y-auto">
            <div>
              <p className="text-[10px] font-semibold text-amber-400/80 uppercase tracking-wider mb-0.5">
                What this test measures
              </p>
              <p className="text-[11px] text-white/70 leading-relaxed">{learnContent.whatItIs}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-amber-400/80 uppercase tracking-wider mb-0.5">
                Why it matters
              </p>
              <p className="text-[11px] text-white/70 leading-relaxed">
                {learnContent.whyItMatters}
              </p>
            </div>
            <div className="flex items-start gap-2 p-2 rounded-md bg-cyan-500/[0.06] border border-cyan-400/10">
              <FileText className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] font-semibold text-cyan-400 mb-0.5">EIC Schedule</p>
                <p className="text-[11px] text-white/70">{learnContent.eicInfo}</p>
              </div>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-green-400/80 uppercase tracking-wider mb-0.5">
                Practical tip
              </p>
              <p className="text-[11px] text-white/70 leading-relaxed">
                {learnContent.practicalTip}
              </p>
            </div>
            <div className="pt-1 border-t border-white/5">
              <p className="text-[9px] text-white/30 font-mono">{learnContent.regulation}</p>
            </div>
          </div>
        </div>
      )}

      {/* ── Circuit Diagram (realistic SVG — expands to fill) ── */}
      <div className="mx-3 mt-1 flex-1 min-h-[100px]">
        <CircuitDiagram
          testPoints={circuit.testPoints}
          diagramLayout={circuit.diagramLayout}
          activeTestPointId={activeTestPointId}
          guidedTestPointId={!manualTestPointId ? nextTest?.testPointId || null : null}
          completedTestPointIds={completedTestPointIds}
          onSelectTestPoint={handleSelectTestPoint}
        />
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
