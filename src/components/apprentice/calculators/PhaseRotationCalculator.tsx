import { useState, useCallback } from 'react';
import {
  Copy,
  Check,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ChevronDown,
  RotatCw,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  CalculatorCard,
  CalculatorInput,
  CalculatorSelect,
  CalculatorActions,
  CalculatorSection,
  CalculatorDivider,
  CalculatorInputGrid,
  ResultValue,
  ResultsGrid,
  ResultBadge,
  CalculatorFormula,
  FormulaReference,
  CALCULATOR_CONFIG,
} from '@/components/calculators/shared';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const CAT = 'testing' as const;
const config = CALCULATOR_CONFIG[CAT];

type TestMethod = '' | 'phase-rotation-meter' | 'voltage-measurement' | 'motor-behaviour';

interface PhaseResult {
  sequence: string;
  isCorrect: boolean;
  recommendation: string;
  confidence: 'High' | 'Medium' | 'Low';
  motorDirection: string;
  correctionMethod: string;
  rotationDirection: 'clockwise' | 'anticlockwise';
  balanceStatus?: string;
  voltages?: { l1l2: number; l2l3: number; l3l1: number; avg: number; maxDeviation: number };
  l1Phase: number;
  l2Phase: number;
  l3Phase: number;
}

const PhaseRotationCalculator = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [result, setResult] = useState<PhaseResult | null>(null);

  // Inputs
  const [testMethod, setTestMethod] = useState<TestMethod>('');
  const [phaseRotationMeter, setPhaseRotationMeter] = useState('');
  const [motorBehaviour, setMotorBehaviour] = useState('');
  const [l1ToL2, setL1ToL2] = useState('');
  const [l2ToL3, setL2ToL3] = useState('');
  const [l3ToL1, setL3ToL1] = useState('');

  // Collapsibles
  const [showGuidance, setShowGuidance] = useState(false);
  const [showReference, setShowReference] = useState(false);
  const [showColours, setShowColours] = useState(false);

  const canCalculate = (() => {
    if (!testMethod) return false;
    if (testMethod === 'phase-rotation-meter') return phaseRotationMeter !== '';
    if (testMethod === 'motor-behaviour') return motorBehaviour !== '';
    if (testMethod === 'voltage-measurement') {
      return [l1ToL2, l2ToL3, l3ToL1].every((v) => {
        const n = parseFloat(v);
        return !isNaN(n) && n >= 100 && n <= 1000;
      });
    }
    return false;
  })();

  const handleReset = useCallback(() => {
    setTestMethod('');
    setPhaseRotationMeter('');
    setMotorBehaviour('');
    setL1ToL2('');
    setL2ToL3('');
    setL3ToL1('');
    setResult(null);
  }, []);

  const handleCalculate = useCallback(() => {
    if (testMethod === 'phase-rotation-meter') {
      const isCorrect = phaseRotationMeter === 'l1-l2-l3';
      setResult({
        sequence: isCorrect ? 'L1–L2–L3 (Correct)' : 'L1–L3–L2 (Reversed)',
        isCorrect,
        confidence: 'High',
        recommendation: isCorrect
          ? 'Phase rotation meter confirms correct L1–L2–L3 sequence. Motors will rotate clockwise.'
          : 'Phase rotation meter indicates reversed sequence. Motors will rotate anti-clockwise. Swap any two phases to correct.',
        motorDirection: isCorrect ? 'Clockwise (correct)' : 'Anti-clockwise (reversed)',
        correctionMethod: isCorrect
          ? 'No correction needed — sequence is correct'
          : 'Swap any two phases (typically L2 and L3) at the supply point. Isolate and prove dead first.',
        rotationDirection: isCorrect ? 'clockwise' : 'anticlockwise',
        l1Phase: 0,
        l2Phase: isCorrect ? 120 : 240,
        l3Phase: isCorrect ? 240 : 120,
      });
    } else if (testMethod === 'motor-behaviour') {
      const isCorrect = motorBehaviour === 'clockwise';
      setResult({
        sequence: isCorrect ? 'L1–L2–L3 (Correct)' : 'L1–L3–L2 (Reversed)',
        isCorrect,
        confidence: 'Medium',
        recommendation: isCorrect
          ? 'Motor rotates clockwise — phase sequence is correct for standard motors.'
          : 'Motor rotates anti-clockwise — phase sequence is reversed.',
        motorDirection: isCorrect ? 'Clockwise (correct)' : 'Anti-clockwise (reversed)',
        correctionMethod: isCorrect
          ? 'No correction needed'
          : 'Swap any two phases at motor terminals. Isolate and prove dead first.',
        rotationDirection: isCorrect ? 'clockwise' : 'anticlockwise',
        l1Phase: 0,
        l2Phase: isCorrect ? 120 : 240,
        l3Phase: isCorrect ? 240 : 120,
      });
    } else if (testMethod === 'voltage-measurement') {
      const v = [parseFloat(l1ToL2), parseFloat(l2ToL3), parseFloat(l3ToL1)];
      const avg = v.reduce((a, b) => a + b, 0) / 3;
      const deviations = v.map((val) => (Math.abs(val - avg) / avg) * 100);
      const maxDev = Math.max(...deviations);

      let balanceStatus: string;
      if (maxDev <= 2) balanceStatus = 'Excellent balance (≤ 2% deviation)';
      else if (maxDev <= 5) balanceStatus = 'Acceptable balance (≤ 5% deviation)';
      else balanceStatus = `Poor balance (${maxDev.toFixed(1)}% deviation — investigate supply)`;

      setResult({
        sequence: 'L1–L2–L3 (Assumed Standard UK)',
        isCorrect: maxDev <= 5,
        confidence: 'Low',
        recommendation:
          maxDev <= 5
            ? 'Voltages are balanced — consistent with standard UK supply. Note: voltage measurement alone cannot confirm phase sequence. Use a phase rotation meter for definitive results.'
            : 'Voltage imbalance detected. Investigate supply quality before motor connection. Use a phase rotation meter to confirm sequence.',
        motorDirection: 'Cannot determine from voltage measurement alone',
        correctionMethod: 'Use a phase rotation meter to confirm sequence before connecting motors',
        rotationDirection: 'clockwise',
        balanceStatus,
        voltages: { l1l2: v[0], l2l3: v[1], l3l1: v[2], avg, maxDeviation: maxDev },
        l1Phase: 0,
        l2Phase: 120,
        l3Phase: 240,
      });
    }
  }, [testMethod, phaseRotationMeter, motorBehaviour, l1ToL2, l2ToL3, l3ToL1]);

  const handleCopy = () => {
    if (!result) return;
    let text = `Phase Rotation Analysis\nSequence: ${result.sequence}\nRotation: ${result.rotationDirection}\nConfidence: ${result.confidence}\nMotor Direction: ${result.motorDirection}`;
    if (result.balanceStatus) text += `\nBalance: ${result.balanceStatus}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({ title: 'Copied to clipboard' });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <CalculatorCard
      category={CAT}
      title="Phase Rotation Calculator"
      description="Determine phase sequence for three-phase installations per BS 7671"
    >
      {/* ── Test Method ── */}
      <CalculatorSelect
        label="Testing Method"
        value={testMethod}
        onChange={(v) => {
          setTestMethod(v as TestMethod);
          setResult(null);
        }}
        options={[
          { value: 'phase-rotation-meter', label: 'Phase Rotation Meter (Most Accurate)' },
          { value: 'motor-behaviour', label: 'Motor Rotation Test' },
          { value: 'voltage-measurement', label: 'Voltage Measurement (Balance Only)' },
        ]}
        placeholder="Select test method"
      />

      {/* ── Phase Rotation Meter ── */}
      {testMethod === 'phase-rotation-meter' && (
        <>
          <CalculatorDivider category={CAT} />
          <CalculatorSelect
            label="Meter Indication"
            value={phaseRotationMeter}
            onChange={setPhaseRotationMeter}
            options={[
              { value: 'l1-l2-l3', label: 'L1–L2–L3 (Clockwise)' },
              { value: 'l1-l3-l2', label: 'L1–L3–L2 (Anti-clockwise)' },
            ]}
            placeholder="Select meter reading"
          />
        </>
      )}

      {/* ── Motor Behaviour ── */}
      {testMethod === 'motor-behaviour' && (
        <>
          <CalculatorDivider category={CAT} />
          <CalculatorSelect
            label="Observed Motor Rotation"
            value={motorBehaviour}
            onChange={setMotorBehaviour}
            options={[
              { value: 'clockwise', label: 'Clockwise (Standard for most motors)' },
              { value: 'anticlockwise', label: 'Anti-clockwise (Reversed)' },
            ]}
            placeholder="Select rotation direction"
          />
          <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
            <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
            <p className="text-sm text-white">
              Only use this method with a small test motor. Ensure proper isolation and PPE before
              energising.
            </p>
          </div>
        </>
      )}

      {/* ── Voltage Measurement ── */}
      {testMethod === 'voltage-measurement' && (
        <>
          <CalculatorDivider category={CAT} />
          <CalculatorSection title="Line-to-Line Voltages">
            <CalculatorInput
              label="L1 to L2 (Brown to Black)"
              unit="V"
              inputMode="decimal"
              value={l1ToL2}
              onChange={setL1ToL2}
              placeholder="e.g. 400"
            />
            <CalculatorInput
              label="L2 to L3 (Black to Grey)"
              unit="V"
              inputMode="decimal"
              value={l2ToL3}
              onChange={setL2ToL3}
              placeholder="e.g. 400"
            />
            <CalculatorInput
              label="L3 to L1 (Grey to Brown)"
              unit="V"
              inputMode="decimal"
              value={l3ToL1}
              onChange={setL3ToL1}
              placeholder="e.g. 400"
            />
          </CalculatorSection>
          <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
            <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
            <p className="text-sm text-white">
              Voltage measurement only checks balance, not actual phase sequence. A phase rotation
              meter gives definitive results.
            </p>
          </div>
        </>
      )}

      {/* ── Calculate / Reset ── */}
      {testMethod && (
        <CalculatorActions
          category={CAT}
          onCalculate={handleCalculate}
          onReset={handleReset}
          isDisabled={!canCalculate}
          calculateLabel="Analyse"
          showReset={!!result}
        />
      )}

      {/* ── Results ── */}
      {result && (
        <div className="space-y-4 animate-fade-in">
          {/* Status + Copy */}
          <div className="flex items-center justify-between">
            <ResultBadge
              status={result.isCorrect ? 'pass' : 'fail'}
              label={result.isCorrect ? 'Correct Sequence' : 'Incorrect Sequence'}
            />
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-medium transition-colors touch-manipulation min-h-[44px]"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>

          {/* Hero sequence */}
          <div className="text-center py-3">
            <p className="text-sm font-medium text-white mb-1">Phase Sequence</p>
            <p
              className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
              }}
            >
              {result.sequence.split('(')[0].trim()}
            </p>
            {result.sequence.includes('(') && (
              <p className="text-sm text-white mt-1">({result.sequence.split('(')[1]}</p>
            )}
          </div>

          {/* Phase diagram SVG */}
          <div className="flex justify-center py-2">
            <svg viewBox="0 0 200 200" className="w-32 h-32 sm:w-40 sm:h-40">
              {/* Circle */}
              <circle
                cx="100"
                cy="100"
                r="85"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1.5"
              />
              {/* Centre dot */}
              <circle cx="100" cy="100" r="3" fill={config.gradientFrom} />
              {/* L1 vector (Brown) — 0° = up */}
              <line
                x1="100"
                y1="100"
                x2={100 + 75 * Math.sin((result.l1Phase * Math.PI) / 180)}
                y2={100 - 75 * Math.cos((result.l1Phase * Math.PI) / 180)}
                stroke="#d97706"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {/* L2 vector (Black/dark) */}
              <line
                x1="100"
                y1="100"
                x2={100 + 75 * Math.sin((result.l2Phase * Math.PI) / 180)}
                y2={100 - 75 * Math.cos((result.l2Phase * Math.PI) / 180)}
                stroke="#94a3b8"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {/* L3 vector (Grey) */}
              <line
                x1="100"
                y1="100"
                x2={100 + 75 * Math.sin((result.l3Phase * Math.PI) / 180)}
                y2={100 - 75 * Math.cos((result.l3Phase * Math.PI) / 180)}
                stroke="#6b7280"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {/* Labels */}
              <text
                x={100 + 88 * Math.sin((result.l1Phase * Math.PI) / 180)}
                y={100 - 88 * Math.cos((result.l1Phase * Math.PI) / 180)}
                fill="#d97706"
                fontSize="11"
                fontWeight="bold"
                textAnchor="middle"
                dominantBaseline="central"
              >
                L1
              </text>
              <text
                x={100 + 88 * Math.sin((result.l2Phase * Math.PI) / 180)}
                y={100 - 88 * Math.cos((result.l2Phase * Math.PI) / 180)}
                fill="#94a3b8"
                fontSize="11"
                fontWeight="bold"
                textAnchor="middle"
                dominantBaseline="central"
              >
                L2
              </text>
              <text
                x={100 + 88 * Math.sin((result.l3Phase * Math.PI) / 180)}
                y={100 - 88 * Math.cos((result.l3Phase * Math.PI) / 180)}
                fill="#6b7280"
                fontSize="11"
                fontWeight="bold"
                textAnchor="middle"
                dominantBaseline="central"
              >
                L3
              </text>
              {/* Rotation arrow */}
              <text
                x="100"
                y="185"
                fill={result.isCorrect ? '#4ade80' : '#f87171'}
                fontSize="12"
                fontWeight="bold"
                textAnchor="middle"
              >
                {result.rotationDirection === 'clockwise' ? '↻ Clockwise' : '↺ Anti-clockwise'}
              </text>
            </svg>
          </div>

          {/* Key metrics */}
          <ResultsGrid columns={2}>
            <ResultValue
              category={CAT}
              label="Motor Direction"
              value={result.rotationDirection === 'clockwise' ? 'Clockwise' : 'Anti-CW'}
              size="sm"
            />
            <ResultValue category={CAT} label="Confidence" value={result.confidence} size="sm" />
          </ResultsGrid>

          {/* Voltage balance (if voltage method) */}
          {result.voltages && (
            <>
              <CalculatorDivider category={CAT} />
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-white">Voltage Balance</h3>
                <ResultsGrid columns={3}>
                  <ResultValue
                    category={CAT}
                    label="L1–L2"
                    value={result.voltages.l1l2.toFixed(1)}
                    unit="V"
                    size="sm"
                  />
                  <ResultValue
                    category={CAT}
                    label="L2–L3"
                    value={result.voltages.l2l3.toFixed(1)}
                    unit="V"
                    size="sm"
                  />
                  <ResultValue
                    category={CAT}
                    label="L3–L1"
                    value={result.voltages.l3l1.toFixed(1)}
                    unit="V"
                    size="sm"
                  />
                </ResultsGrid>
                <div
                  className={cn(
                    'flex items-center gap-2 p-3 rounded-lg border text-sm',
                    result.voltages.maxDeviation <= 5
                      ? 'bg-green-500/5 border-green-500/20'
                      : 'bg-red-500/5 border-red-500/20'
                  )}
                >
                  {result.voltages.maxDeviation <= 5 ? (
                    <CheckCircle className="h-4 w-4 text-green-400 shrink-0" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-red-400 shrink-0" />
                  )}
                  <span className="text-white">{result.balanceStatus}</span>
                </div>
              </div>
            </>
          )}

          {/* Recommendation */}
          <div className="p-3 rounded-lg bg-white/[0.04] border border-white/5">
            <p className="text-sm text-white font-medium mb-1">Recommendation</p>
            <p className="text-sm text-white">{result.recommendation}</p>
          </div>

          {/* Correction method */}
          <div
            className={cn(
              'p-3 rounded-lg border',
              result.isCorrect
                ? 'bg-green-500/5 border-green-500/20'
                : 'bg-amber-500/5 border-amber-500/20'
            )}
          >
            <p className="text-sm text-white font-medium mb-1">
              {result.isCorrect ? 'Verification' : 'Correction Required'}
            </p>
            <p className="text-sm text-white">{result.correctionMethod}</p>
          </div>

          {/* Safety reminder for incorrect */}
          {!result.isCorrect && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30">
              <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
              <p className="text-sm text-white">
                Always isolate supply and prove dead before making any phase corrections. Follow
                lock-off/tag-out procedures.
              </p>
            </div>
          )}

          <CalculatorDivider category={CAT} />

          {/* ── How It Worked Out ── */}
          <CalculatorFormula
            category={CAT}
            title="How It Worked Out"
            steps={[
              {
                label: `Test method: ${testMethod === 'phase-rotation-meter' ? 'Phase Rotation Meter' : testMethod === 'motor-behaviour' ? 'Motor Rotation Test' : 'Voltage Measurement'}`,
                description: `Confidence level: ${result.confidence}`,
              },
              ...(result.voltages
                ? [
                    {
                      label: 'Voltage readings',
                      formula: `L1–L2: ${result.voltages.l1l2.toFixed(1)}V, L2–L3: ${result.voltages.l2l3.toFixed(1)}V, L3–L1: ${result.voltages.l3l1.toFixed(1)}V`,
                    },
                    {
                      label: 'Average voltage',
                      value: `${result.voltages.avg.toFixed(1)}V`,
                    },
                    {
                      label: 'Max deviation',
                      value: `${result.voltages.maxDeviation.toFixed(1)}%`,
                      description: result.balanceStatus || '',
                    },
                  ]
                : []),
              {
                label: 'Phase sequence determined',
                value: result.sequence,
                description: `Rotation: ${result.rotationDirection}`,
              },
              {
                label: 'Result',
                value: result.isCorrect
                  ? 'Correct phase sequence — no action required'
                  : 'Incorrect sequence — swap any two phases to correct',
              },
            ]}
          />

          {/* ── What This Means ── */}
          <Collapsible open={showGuidance} onOpenChange={setShowGuidance}>
            <CollapsibleTrigger className="flex items-center justify-between w-full min-h-11 py-2.5 px-3 rounded-lg text-sm font-medium text-white hover:bg-white/5 transition-all touch-manipulation">
              <span>What This Means</span>
              <ChevronDown
                className={cn(
                  'h-4 w-4 transition-transform duration-200',
                  showGuidance && 'rotate-180'
                )}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2">
              <div
                className="p-3 rounded-xl border space-y-4"
                style={{
                  borderColor: `${config.gradientFrom}15`,
                  background: `${config.gradientFrom}05`,
                }}
              >
                <div className="space-y-2">
                  <p className="text-sm text-white font-medium">What is Phase Rotation?</p>
                  <p className="text-sm text-white">
                    Phase rotation (or phase sequence) is the order in which the three phases reach
                    their peak voltage. In the UK, the standard sequence is L1–L2–L3
                    (Brown–Black–Grey), which creates a clockwise rotating magnetic field. Each
                    phase is separated by 120 electrical degrees.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-white font-medium">Why Does It Matter?</p>
                  <ul className="space-y-1">
                    {[
                      'Three-phase motors rotate in the direction determined by phase sequence',
                      'Incorrect sequence reverses motor rotation — can damage pumps, fans, and machinery',
                      'Water pumps may run dry or not flow; HVAC systems lose efficiency',
                      'Conveyor systems and elevators are safety-critical — wrong direction is dangerous',
                      'Generator synchronisation requires matching phase sequence to the grid',
                    ].map((point, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-white">
                        <span
                          className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                          style={{ backgroundColor: config.gradientFrom }}
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-white font-medium">How to Correct</p>
                  <p className="text-sm text-white">
                    To reverse phase sequence: isolate the supply, prove dead, then swap any two of
                    the three phases (typically L2 and L3). This reverses the rotating magnetic
                    field direction. Never swap all three — this achieves nothing.
                  </p>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* ── Cable Colours ── */}
          <Collapsible open={showColours} onOpenChange={setShowColours}>
            <CollapsibleTrigger className="flex items-center justify-between w-full min-h-11 py-2.5 px-3 rounded-lg text-sm font-medium text-white hover:bg-white/5 transition-all touch-manipulation">
              <span>Cable Colour Reference</span>
              <ChevronDown
                className={cn(
                  'h-4 w-4 transition-transform duration-200',
                  showColours && 'rotate-180'
                )}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2">
              <div
                className="p-3 rounded-xl border space-y-4"
                style={{
                  borderColor: `${config.gradientFrom}15`,
                  background: `${config.gradientFrom}05`,
                }}
              >
                <div className="space-y-2">
                  <p className="text-sm text-white font-medium">Current UK (2004–Present)</p>
                  <div className="space-y-2">
                    {[
                      { colour: '#b45309', label: 'L1 — Brown' },
                      { colour: '#1e293b', label: 'L2 — Black', border: true },
                      { colour: '#6b7280', label: 'L3 — Grey' },
                      { colour: '#2563eb', label: 'N — Blue' },
                      { colour: '#16a34a', label: 'E — Green/Yellow', stripe: true },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center gap-3 p-2 rounded-lg bg-white/[0.04]"
                      >
                        <div
                          className={cn('w-5 h-5 rounded', item.border && 'border border-white/20')}
                          style={{ backgroundColor: item.colour }}
                        />
                        <span className="text-sm text-white font-medium">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-white font-medium">Old UK (Pre-2004)</p>
                  <div className="space-y-2">
                    {[
                      { colour: '#dc2626', label: 'L1 — Red' },
                      { colour: '#eab308', label: 'L2 — Yellow' },
                      { colour: '#2563eb', label: 'L3 — Blue' },
                      { colour: '#1e293b', label: 'N — Black', border: true },
                      { colour: '#16a34a', label: 'E — Green' },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center gap-3 p-2 rounded-lg bg-white/[0.04]"
                      >
                        <div
                          className={cn('w-5 h-5 rounded', item.border && 'border border-white/20')}
                          style={{ backgroundColor: item.colour }}
                        />
                        <span className="text-sm text-white font-medium">{item.label}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-white">
                    Old colours may still be found in installations predating March 2004. Always
                    verify before assuming phase identity.
                  </p>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* ── BS 7671 Reference ── */}
          <Collapsible open={showReference} onOpenChange={setShowReference}>
            <CollapsibleTrigger className="flex items-center justify-between w-full min-h-11 py-2.5 px-3 rounded-lg text-sm font-medium text-white hover:bg-white/5 transition-all touch-manipulation">
              <span>BS 7671 Reference</span>
              <ChevronDown
                className={cn(
                  'h-4 w-4 transition-transform duration-200',
                  showReference && 'rotate-180'
                )}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2">
              <div
                className="p-3 rounded-xl border space-y-3"
                style={{
                  borderColor: `${config.gradientFrom}15`,
                  background: `${config.gradientFrom}05`,
                }}
              >
                <ul className="space-y-2">
                  {[
                    {
                      reg: 'Regulation 612.6',
                      desc: 'Phase sequence verification required for three-phase installations',
                    },
                    {
                      reg: 'Regulation 314.1',
                      desc: 'Conductors must be identified by approved colour coding',
                    },
                    {
                      reg: 'Section 514',
                      desc: 'Correct identification and connection of conductors',
                    },
                    {
                      reg: 'Table 51.1',
                      desc: 'Conductor identification: Brown (L1), Black (L2), Grey (L3)',
                    },
                    {
                      reg: 'GN3 Chapter 12',
                      desc: 'Phase sequence testing — methods and instruments',
                    },
                  ].map((item) => (
                    <li key={item.reg} className="flex items-start gap-2 text-sm">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      <span className="text-white">
                        <span className="font-medium">{item.reg}:</span> {item.desc}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      )}

      {/* Formula reference (always visible) */}
      <FormulaReference
        category={CAT}
        name="Phase Sequence"
        formula="L1 → L2 → L3 = Clockwise (Standard UK)"
        variables={[
          { symbol: 'L1', description: 'Brown — 0° reference phase' },
          { symbol: 'L2', description: 'Black — 120° lagging' },
          { symbol: 'L3', description: 'Grey — 240° lagging' },
          { symbol: '120°', description: 'Electrical separation between phases' },
        ]}
      />
    </CalculatorCard>
  );
};

export default PhaseRotationCalculator;
