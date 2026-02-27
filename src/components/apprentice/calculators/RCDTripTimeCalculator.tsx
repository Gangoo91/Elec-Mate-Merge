import { useState, useCallback } from 'react';
import { Copy, Check, CheckCircle, XCircle, AlertTriangle, ChevronDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  CalculatorCard,
  CalculatorInput,
  CalculatorSelect,
  CalculatorActions,
  ResultValue,
  ResultsGrid,
  ResultBadge,
  CalculatorFormula,
  CalculatorDivider,
  FormulaReference,
  CALCULATOR_CONFIG,
} from '@/components/calculators/shared';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const CAT = 'protection' as const;
const config = CALCULATOR_CONFIG[CAT];

const tripTimeRequirements: Record<string, Record<string, number>> = {
  '30mA': { '1x': 300, '5x': 40 },
  '100mA': { '1x': 300, '5x': 40 },
  '300mA': { '1x': 300, '5x': 150 },
};

interface RCDResult {
  maxTripTime: number;
  rating: string;
  testCurrent: string;
  testDescription: string;
  actualTripTime?: number;
  isCompliant?: boolean;
  safetyMargin?: number;
  riskLevel?: 'low' | 'medium' | 'high' | 'critical';
}

const rcdTypeOptions = [
  { value: 'general', label: 'General Purpose RCD' },
  { value: 'socket', label: 'Socket Outlet RCD' },
  { value: 'rcbo', label: 'RCBO' },
  { value: 'main', label: 'Main Switch RCD' },
];

const rcdRatingOptions = [
  { value: '30mA', label: '30mA — Personal Protection' },
  { value: '100mA', label: '100mA — Fire Protection' },
  { value: '300mA', label: '300mA — Fire Protection (Industrial)' },
];

const testCurrentOptions = [
  { value: '1x', label: '1× Rated Current — Sensitivity Test' },
  { value: '5x', label: '5× Rated Current — Fast Trip Test' },
];

const getTestDescription = (rating: string, current: string) => {
  const descriptions: Record<string, Record<string, string>> = {
    '30mA': {
      '1x': 'Testing at 30mA — Verifies RCD operates at rated sensitivity',
      '5x': 'Testing at 150mA — Verifies rapid disconnection for faults',
    },
    '100mA': {
      '1x': 'Testing at 100mA — Verifies RCD operates at rated sensitivity',
      '5x': 'Testing at 500mA — Verifies rapid disconnection for faults',
    },
    '300mA': {
      '1x': 'Testing at 300mA — Verifies RCD operates at rated sensitivity',
      '5x': 'Testing at 1500mA — Verifies rapid disconnection for faults',
    },
  };
  return descriptions[rating]?.[current] || '';
};

const RCDTripTimeCalculator = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const [rcdType, setRcdType] = useState('');
  const [rcdRating, setRcdRating] = useState('');
  const [testCurrent, setTestCurrent] = useState('');
  const [actualTripTime, setActualTripTime] = useState('');
  const [result, setResult] = useState<RCDResult | null>(null);

  // Collapsibles
  const [showGuidance, setShowGuidance] = useState(false);
  const [showReference, setShowReference] = useState(false);

  const handleCalculate = useCallback(() => {
    if (!rcdRating || !testCurrent) return;

    const maxTime = tripTimeRequirements[rcdRating]?.[testCurrent];
    if (!maxTime) return;

    const testDesc = getTestDescription(rcdRating, testCurrent);
    const actual = actualTripTime ? parseFloat(actualTripTime) : undefined;

    let isCompliant: boolean | undefined;
    let safetyMargin: number | undefined;
    let riskLevel: 'low' | 'medium' | 'high' | 'critical' | undefined;

    if (actual !== undefined && !isNaN(actual)) {
      isCompliant = actual <= maxTime;
      safetyMargin = ((maxTime - actual) / maxTime) * 100;

      if (actual <= maxTime * 0.5) riskLevel = 'low';
      else if (actual <= maxTime * 0.8) riskLevel = 'medium';
      else if (actual <= maxTime) riskLevel = 'high';
      else riskLevel = 'critical';
    }

    setResult({
      maxTripTime: maxTime,
      rating: rcdRating,
      testCurrent,
      testDescription: testDesc,
      actualTripTime: actual,
      isCompliant,
      safetyMargin,
      riskLevel,
    });
  }, [rcdRating, testCurrent, actualTripTime]);

  const handleReset = useCallback(() => {
    setRcdType('');
    setRcdRating('');
    setTestCurrent('');
    setActualTripTime('');
    setResult(null);
  }, []);

  const handleCopy = () => {
    if (!result) return;
    let text = `RCD Trip Time Requirements\n${result.rating} RCD — ${result.testCurrent} Test`;
    text += `\nMaximum Trip Time: ${result.maxTripTime}ms`;
    if (result.actualTripTime !== undefined) {
      text += `\nActual Trip Time: ${result.actualTripTime}ms`;
      text += `\nStatus: ${result.isCompliant ? 'COMPLIANT' : 'NON-COMPLIANT'}`;
      if (result.safetyMargin !== undefined) {
        text += `\nSafety Margin: ${result.safetyMargin.toFixed(0)}%`;
      }
    }
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({ title: 'Copied to clipboard' });
    setTimeout(() => setCopied(false), 2000);
  };

  const canCalculate = rcdRating && testCurrent;

  return (
    <CalculatorCard
      category={CAT}
      title="RCD Trip Time Chart Helper"
      description="Calculate RCD trip time requirements and verify BS 7671 compliance"
    >
      <CalculatorSelect
        label="RCD Type"
        value={rcdType}
        onChange={setRcdType}
        options={rcdTypeOptions}
        placeholder="Select RCD type"
      />

      <CalculatorSelect
        label="RCD Rating (IΔn)"
        value={rcdRating}
        onChange={setRcdRating}
        options={rcdRatingOptions}
        placeholder="Select RCD sensitivity rating"
      />

      <div className="space-y-2">
        <CalculatorSelect
          label="Test Current"
          value={testCurrent}
          onChange={setTestCurrent}
          options={testCurrentOptions}
          placeholder="Select test current multiplier"
        />
        {testCurrent && rcdRating && (
          <p className="text-xs" style={{ color: config.gradientFrom }}>
            {getTestDescription(rcdRating, testCurrent)}
          </p>
        )}
      </div>

      <CalculatorInput
        label="Actual Trip Time (Optional)"
        unit="ms"
        type="text"
        inputMode="decimal"
        value={actualTripTime}
        onChange={setActualTripTime}
        placeholder="Enter measured trip time (e.g., 25)"
        hint="Enter the measured trip time for compliance verification"
      />

      <CalculatorActions
        category={CAT}
        onCalculate={handleCalculate}
        onReset={handleReset}
        isDisabled={!canCalculate}
        calculateLabel="Get Requirements"
        showReset={!!result}
      />

      {/* ── Results ── */}
      {result && (
        <div className="space-y-4 animate-fade-in">
          {/* Status + Copy */}
          <div className="flex items-center justify-between">
            <ResultBadge
              status={
                result.isCompliant === undefined ? 'info' : result.isCompliant ? 'pass' : 'fail'
              }
              label={
                result.isCompliant === undefined
                  ? `${result.rating} — ${result.testCurrent} Test`
                  : result.isCompliant
                    ? 'COMPLIANT'
                    : 'NON-COMPLIANT'
              }
            />
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-medium transition-colors touch-manipulation min-h-[44px]"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>

          {/* Hero value */}
          <div className="text-center py-3">
            <p className="text-sm font-medium text-white mb-1">Maximum Trip Time</p>
            <p
              className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
              }}
            >
              {result.maxTripTime}ms
            </p>
            <p className="text-sm text-white mt-2">{result.testDescription}</p>
          </div>

          {/* Result cards (when actual time entered) */}
          {result.actualTripTime !== undefined && (
            <>
              <ResultsGrid columns={2}>
                <ResultValue
                  label="Your Measured Time"
                  value={`${result.actualTripTime}`}
                  unit="ms"
                  category={CAT}
                  size="sm"
                />
                <ResultValue
                  label="Maximum Allowed"
                  value={`${result.maxTripTime}`}
                  unit="ms"
                  category={CAT}
                  size="sm"
                />
              </ResultsGrid>

              {/* Compliance check */}
              <div
                className={cn(
                  'flex items-center justify-between p-3 rounded-lg border text-sm',
                  result.isCompliant
                    ? 'bg-green-500/5 border-green-500/20'
                    : 'bg-red-500/5 border-red-500/20'
                )}
              >
                <div className="flex items-center gap-2">
                  {result.isCompliant ? (
                    <CheckCircle className="h-4 w-4 text-green-400 shrink-0" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-400 shrink-0" />
                  )}
                  <span className="text-white font-medium">
                    {result.isCompliant ? 'COMPLIANT' : 'NON-COMPLIANT'}
                  </span>
                </div>
                <span className="text-white shrink-0 ml-2">
                  {result.actualTripTime}ms / {result.maxTripTime}ms
                </span>
              </div>

              {/* Risk level */}
              {result.riskLevel && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-white/[0.04] border border-white/5 text-sm">
                  <AlertTriangle
                    className={cn(
                      'h-4 w-4',
                      result.riskLevel === 'low'
                        ? 'text-green-400'
                        : result.riskLevel === 'medium'
                          ? 'text-yellow-400'
                          : result.riskLevel === 'high'
                            ? 'text-orange-400'
                            : 'text-red-400'
                    )}
                  />
                  <span className="text-white font-medium">
                    Safety Margin:{' '}
                    {result.riskLevel === 'low'
                      ? 'Excellent'
                      : result.riskLevel === 'medium'
                        ? 'Good'
                        : result.riskLevel === 'high'
                          ? 'Minimal'
                          : 'Critical — exceeds maximum'}
                  </span>
                  {result.safetyMargin !== undefined && result.safetyMargin > 0 && (
                    <span className="text-white ml-auto">
                      {result.safetyMargin.toFixed(0)}% headroom
                    </span>
                  )}
                </div>
              )}

              {/* Non-compliant warning */}
              {!result.isCompliant && (
                <div className="flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
                  <p className="text-sm text-white">
                    RCD trip time exceeds maximum allowed. Do not energise circuits protected by
                    this RCD. Replace immediately and investigate root cause.
                  </p>
                </div>
              )}
            </>
          )}

          <CalculatorDivider category={CAT} />

          {/* ── How It Worked Out ── */}
          <CalculatorFormula
            category={CAT}
            title="How It Worked Out"
            defaultOpen
            steps={[
              {
                label: 'RCD configuration',
                formula: `${result.rating} RCD | ${result.testCurrent} test current`,
                description:
                  result.testCurrent === '1x'
                    ? `Testing at 1× rated current (${result.rating}) verifies the RCD operates at its rated sensitivity — this is the basic functionality test.`
                    : `Testing at 5× rated current verifies rapid disconnection — the RCD must trip much faster at higher fault currents to protect against serious faults.`,
              },
              {
                label: 'Look up maximum trip time',
                formula: `BS 7671 Table 3A → ${result.testCurrent} at ${result.rating}`,
                value: `${result.maxTripTime}ms maximum`,
                description:
                  result.testCurrent === '1x'
                    ? 'At 1× rated current, all RCDs must trip within 300ms regardless of rating. This confirms the device is functional.'
                    : result.rating === '300mA'
                      ? 'At 5× rated current, 300mA RCDs are allowed 150ms — longer than 30/100mA because higher-rated devices have more mechanical inertia.'
                      : 'At 5× rated current, 30mA and 100mA RCDs must trip within 40ms — fast enough to prevent ventricular fibrillation from earth leakage.',
              },
              ...(result.actualTripTime !== undefined
                ? [
                    {
                      label: 'Compare actual vs maximum',
                      formula: `${result.actualTripTime}ms ${result.isCompliant ? '≤' : '>'} ${result.maxTripTime}ms`,
                      value: result.isCompliant ? 'COMPLIANT' : 'NON-COMPLIANT',
                      description: result.isCompliant
                        ? `The measured trip time of ${result.actualTripTime}ms is within the ${result.maxTripTime}ms maximum — the RCD is operating correctly.`
                        : `The measured trip time of ${result.actualTripTime}ms EXCEEDS the ${result.maxTripTime}ms maximum — this RCD must be replaced immediately.`,
                    },
                    ...(result.safetyMargin !== undefined
                      ? [
                          {
                            label: 'Safety margin',
                            value:
                              result.safetyMargin > 0
                                ? `${result.safetyMargin.toFixed(0)}% headroom below maximum`
                                : `Exceeds maximum by ${Math.abs(result.safetyMargin).toFixed(0)}%`,
                            description:
                              result.safetyMargin > 50
                                ? 'Excellent margin — the RCD is responding well within limits.'
                                : result.safetyMargin > 20
                                  ? 'Adequate margin — within limits but monitor at next periodic inspection.'
                                  : result.safetyMargin > 0
                                    ? 'Minimal margin — the RCD is close to failing. Consider replacement at next opportunity.'
                                    : 'FAILED — do not energise circuits protected by this RCD. Replace immediately and investigate root cause.',
                          },
                        ]
                      : []),
                  ]
                : []),
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
                  <p className="text-sm text-white font-medium">What the Tests Mean</p>
                  <p className="text-sm text-white">
                    RCD testing confirms the device will disconnect fast enough to prevent a fatal
                    electric shock. The three standard tests each check a different aspect of the
                    RCD's operation:
                  </p>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2 text-sm text-white">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      0.5× IΔn test: RCD must NOT trip — confirms it will not nuisance-trip under
                      normal leakage currents
                    </li>
                    <li className="flex items-start gap-2 text-sm text-white">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      1× IΔn test: RCD must trip within 300ms — basic functionality check at rated
                      sensitivity
                    </li>
                    <li className="flex items-start gap-2 text-sm text-white">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      5× IΔn test: RCD must trip within 40ms (30/100mA) or 150ms (300mA) — verifies
                      rapid disconnection for serious faults
                    </li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-white font-medium">Correct Testing Sequence</p>
                  <p className="text-sm text-white">
                    Always test in this order to avoid false results and ensure the RCD resets
                    properly between tests:
                  </p>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2 text-sm text-white">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      Confirm RCD is energised and circuits are live
                    </li>
                    <li className="flex items-start gap-2 text-sm text-white">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      Test at 0.5× IΔn — must NOT trip (if it does, investigate leakage)
                    </li>
                    <li className="flex items-start gap-2 text-sm text-white">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      Test at 1× IΔn — record trip time (must be ≤ 300ms)
                    </li>
                    <li className="flex items-start gap-2 text-sm text-white">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      Test at 5× IΔn — record trip time (must be ≤ 40ms or 150ms)
                    </li>
                    <li className="flex items-start gap-2 text-sm text-white">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      Press the RCD test button — confirms mechanical operation
                    </li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-white font-medium">When an RCD Fails Testing</p>
                  <p className="text-sm text-white">
                    A failed RCD is a serious safety issue. Do not leave circuits energised behind a
                    device that cannot protect against earth faults:
                  </p>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2 text-sm text-white">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      Isolate all circuits protected by the failed RCD immediately
                    </li>
                    <li className="flex items-start gap-2 text-sm text-white">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      Replace the RCD — do not attempt repair
                    </li>
                    <li className="flex items-start gap-2 text-sm text-white">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      Check for high earth leakage on downstream circuits (faulty appliances, damp)
                    </li>
                    <li className="flex items-start gap-2 text-sm text-white">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      Issue a danger notice (EICR code C1) if the installation cannot be made safe
                    </li>
                  </ul>
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
                      reg: 'Regulation 531.2',
                      desc: 'Selection of RCDs — type and rating requirements',
                    },
                    {
                      reg: 'Regulation 411.3.3',
                      desc: 'Additional protection by RCDs — 30mA for socket outlets',
                    },
                    {
                      reg: 'Table 3A',
                      desc: 'Maximum operating times — 1×IΔn (300ms), 5×IΔn (40ms for 30/100mA, 150ms for 300mA)',
                    },
                    {
                      reg: 'Regulation 612.13.1',
                      desc: 'RCD verification during initial verification and periodic inspection',
                    },
                    {
                      reg: 'GN3 Chapter 13',
                      desc: 'RCD testing — procedures, instruments, and recording',
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
        name="RCD Trip Time Requirements"
        formula="Actual trip ≤ Maximum trip"
        variables={[
          { symbol: '1×IΔn', description: 'Max 300ms for all ratings' },
          { symbol: '5×IΔn', description: 'Max 40ms (30/100mA) or 150ms (300mA)' },
          { symbol: '0.5×IΔn', description: 'Must NOT trip' },
        ]}
      />
    </CalculatorCard>
  );
};

export default RCDTripTimeCalculator;
