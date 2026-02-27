import { useState, useCallback } from 'react';
import { Copy, Check, CheckCircle, AlertTriangle, ChevronDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
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

// Cable resistance values at 20°C (mΩ/m) per BS EN 60228
const CABLE_DATA: Record<
  string,
  { label: string; live: number; cpc: number; liveCsa: string; cpcCsa: string }
> = {
  '2.5mm-twin': {
    label: '2.5mm² Twin & Earth',
    live: 7.41,
    cpc: 12.1,
    liveCsa: '2.5mm²',
    cpcCsa: '1.5mm²',
  },
  '4mm-twin': {
    label: '4.0mm² Twin & Earth',
    live: 4.61,
    cpc: 7.41,
    liveCsa: '4.0mm²',
    cpcCsa: '2.5mm²',
  },
  '6mm-twin': {
    label: '6.0mm² Twin & Earth',
    live: 3.08,
    cpc: 4.61,
    liveCsa: '6.0mm²',
    cpcCsa: '4.0mm²',
  },
  '10mm-twin': {
    label: '10mm² Twin & Earth',
    live: 1.83,
    cpc: 3.08,
    liveCsa: '10mm²',
    cpcCsa: '6.0mm²',
  },
};

const CABLE_OPTIONS = Object.entries(CABLE_DATA).map(([value, data]) => ({
  value,
  label: data.label,
}));

const CAT = 'testing' as const;
const config = CALCULATOR_CONFIG[CAT];

interface RingResult {
  r1: number;
  rn: number;
  r2: number;
  r1PlusR2: number;
  e2eLive: number;
  e2eNeutral: number;
  e2eCpc: number;
  xLN: number;
  xLE: number;
  xNE: number;
  expectedLN: number;
  expectedLE: number;
  expectedNE: number;
  lnDiff: number;
  leDiff: number;
  neDiff: number;
  lnPass: boolean;
  lePass: boolean;
  nePass: boolean;
  e2eLiveOk: boolean;
  e2eNeutralOk: boolean;
  e2eCpcOk: boolean;
  rnSimilar: boolean;
  allCrossPass: boolean;
  allEndToEndOk: boolean;
  overallPass: boolean;
  cableComparison: {
    r1Expected: number;
    r2Expected: number;
    tolerance: number;
    r1Match: boolean;
    r2Match: boolean;
  } | null;
  temp: number;
}

const RingCircuitCalculator = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [result, setResult] = useState<RingResult | null>(null);

  // Readings
  const [endToEndLive, setEndToEndLive] = useState('');
  const [endToEndNeutral, setEndToEndNeutral] = useState('');
  const [endToEndCpc, setEndToEndCpc] = useState('');
  const [liveToNeutral, setLiveToNeutral] = useState('');
  const [liveToCpc, setLiveToCpc] = useState('');
  const [neutralToCpc, setNeutralToCpc] = useState('');

  // Cable settings (optional)
  const [cableType, setCableType] = useState('');
  const [cableLength, setCableLength] = useState('');
  const [temperature, setTemperature] = useState('20');

  // Collapsible states
  const [showGuidance, setShowGuidance] = useState(false);
  const [showReference, setShowReference] = useState(false);

  const allReadingsFilled = [
    endToEndLive,
    endToEndNeutral,
    endToEndCpc,
    liveToNeutral,
    liveToCpc,
    neutralToCpc,
  ].every((v) => v.trim() !== '' && !isNaN(parseFloat(v)) && parseFloat(v) > 0);

  const resetAll = useCallback(() => {
    setEndToEndLive('');
    setEndToEndNeutral('');
    setEndToEndCpc('');
    setLiveToNeutral('');
    setLiveToCpc('');
    setNeutralToCpc('');
    setCableType('');
    setCableLength('');
    setTemperature('20');
    setResult(null);
  }, []);

  const handleCalculate = useCallback(() => {
    const e2eLive = parseFloat(endToEndLive);
    const e2eNeutral = parseFloat(endToEndNeutral);
    const e2eCpc = parseFloat(endToEndCpc);
    const xLN = parseFloat(liveToNeutral);
    const xLE = parseFloat(liveToCpc);
    const xNE = parseFloat(neutralToCpc);

    if ([e2eLive, e2eNeutral, e2eCpc, xLN, xLE, xNE].some((v) => isNaN(v) || v <= 0)) return;

    // Core ring circuit calculations
    // For a ring, end-to-end divided by 4 gives each leg's resistance at the midpoint
    const r1 = e2eLive / 4;
    const rn = e2eNeutral / 4;
    const r2 = e2eCpc / 4;
    const r1PlusR2 = r1 + r2;

    // Cross-connection validation
    const expectedLN = r1 + rn;
    const expectedLE = r1 + r2;
    const expectedNE = rn + r2;

    const lnDiff = Math.abs(xLN - expectedLN);
    const leDiff = Math.abs(xLE - expectedLE);
    const neDiff = Math.abs(xNE - expectedNE);

    const TOLERANCE = 0.1;
    const lnPass = lnDiff < TOLERANCE;
    const lePass = leDiff < TOLERANCE;
    const nePass = neDiff < TOLERANCE;

    // End-to-end checks
    const e2eLiveOk = e2eLive > 0 && e2eLive < 10;
    const e2eNeutralOk = e2eNeutral > 0 && e2eNeutral < 10;
    const e2eCpcOk = e2eCpc > 0 && e2eCpc < 15;

    // R1 and Rn should be similar (same CSA conductors)
    const rnSimilar = Math.abs(r1 - rn) < 0.05;

    const allCrossPass = lnPass && lePass && nePass;
    const allEndToEndOk = e2eLiveOk && e2eNeutralOk && e2eCpcOk;
    const overallPass = allCrossPass && allEndToEndOk;

    // Cable comparison (optional)
    let cableComparison: RingResult['cableComparison'] = null;
    const temp = parseFloat(temperature) || 20;
    if (cableType && cableLength) {
      const cable = CABLE_DATA[cableType];
      const length = parseFloat(cableLength);
      if (cable && length > 0) {
        const tempCorrection = 1 + 0.00393 * (temp - 20);
        const totalRingLength = length * 2;
        const r1Exp = (cable.live * totalRingLength * tempCorrection) / 1000 / 4;
        const r2Exp = (cable.cpc * totalRingLength * tempCorrection) / 1000 / 4;
        const tol = Math.max(0.05, r1Exp * 0.15);
        cableComparison = {
          r1Expected: r1Exp,
          r2Expected: r2Exp,
          tolerance: tol,
          r1Match: Math.abs(r1 - r1Exp) < tol,
          r2Match: Math.abs(r2 - r2Exp) < tol,
        };
      }
    }

    setResult({
      r1,
      rn,
      r2,
      r1PlusR2,
      e2eLive,
      e2eNeutral,
      e2eCpc,
      xLN,
      xLE,
      xNE,
      expectedLN,
      expectedLE,
      expectedNE,
      lnDiff,
      leDiff,
      neDiff,
      lnPass,
      lePass,
      nePass,
      e2eLiveOk,
      e2eNeutralOk,
      e2eCpcOk,
      rnSimilar,
      allCrossPass,
      allEndToEndOk,
      overallPass,
      cableComparison,
      temp,
    });
  }, [
    endToEndLive,
    endToEndNeutral,
    endToEndCpc,
    liveToNeutral,
    liveToCpc,
    neutralToCpc,
    cableType,
    cableLength,
    temperature,
  ]);

  const handleCopy = () => {
    if (!result) return;
    const text = `Ring Circuit Test Results\nR1: ${result.r1.toFixed(3)} Ω\nRn: ${result.rn.toFixed(3)} Ω\nR2: ${result.r2.toFixed(3)} Ω\nR1+R2: ${result.r1PlusR2.toFixed(3)} Ω\nStatus: ${result.overallPass ? 'PASS' : 'FAIL'}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({ title: 'Copied to clipboard' });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <CalculatorCard
      category={CAT}
      title="Ring Circuit Calculator"
      description="Test and verify ring final circuit continuity per BS 7671"
    >
      {/* ── Cable Settings (Optional) ── */}
      <CalculatorSection title="Cable Settings (Optional)">
        <CalculatorInputGrid columns={2}>
          <CalculatorSelect
            label="Cable Type"
            value={cableType}
            onChange={setCableType}
            options={CABLE_OPTIONS}
            placeholder="Select cable type"
          />
          <CalculatorInput
            label="Total Ring Length"
            unit="m"
            placeholder="e.g. 80"
            inputMode="decimal"
            value={cableLength}
            onChange={setCableLength}
          />
        </CalculatorInputGrid>
        <CalculatorInput
          label="Test Temperature"
          unit="°C"
          placeholder="20"
          inputMode="decimal"
          value={temperature}
          onChange={setTemperature}
          hint="Default 20°C — resistance increases ~0.4% per °C above 20°C"
        />
      </CalculatorSection>

      <CalculatorDivider category={CAT} />

      {/* ── End-to-End Readings ── */}
      <CalculatorSection title="End-to-End Readings">
        <CalculatorInputGrid columns={2}>
          <CalculatorInput
            label="Live (L1–L2)"
            unit="Ω"
            placeholder="e.g. 1.20"
            inputMode="decimal"
            value={endToEndLive}
            onChange={setEndToEndLive}
          />
          <CalculatorInput
            label="Neutral (N1–N2)"
            unit="Ω"
            placeholder="e.g. 1.20"
            inputMode="decimal"
            value={endToEndNeutral}
            onChange={setEndToEndNeutral}
          />
        </CalculatorInputGrid>
        <CalculatorInput
          label="CPC / Earth (E1–E2)"
          unit="Ω"
          placeholder="e.g. 1.92"
          inputMode="decimal"
          value={endToEndCpc}
          onChange={setEndToEndCpc}
        />
      </CalculatorSection>

      <CalculatorDivider category={CAT} />

      {/* ── Cross-Connected Readings ── */}
      <CalculatorSection title="Cross-Connected Readings">
        <CalculatorInputGrid columns={2}>
          <CalculatorInput
            label="Live to Neutral"
            unit="Ω"
            placeholder="e.g. 0.60"
            inputMode="decimal"
            value={liveToNeutral}
            onChange={setLiveToNeutral}
          />
          <CalculatorInput
            label="Live to CPC"
            unit="Ω"
            placeholder="e.g. 0.78"
            inputMode="decimal"
            value={liveToCpc}
            onChange={setLiveToCpc}
          />
        </CalculatorInputGrid>
        <CalculatorInput
          label="Neutral to CPC"
          unit="Ω"
          placeholder="e.g. 0.78"
          inputMode="decimal"
          value={neutralToCpc}
          onChange={setNeutralToCpc}
        />
      </CalculatorSection>

      {/* ── Calculate / Reset ── */}
      <CalculatorActions
        category={CAT}
        onCalculate={handleCalculate}
        onReset={resetAll}
        calculateLabel="Calculate Ring Circuit"
        isDisabled={!allReadingsFilled}
        showReset={!!result}
      />

      {/* ── Results ── */}
      {result && (
        <div className="space-y-4 animate-fade-in">
          {/* Pass/Fail status */}
          <div className="flex items-center justify-between">
            <ResultBadge
              status={result.overallPass ? 'pass' : 'fail'}
              label={result.overallPass ? 'Ring Continuity Confirmed' : 'Issues Detected'}
            />
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-medium transition-colors touch-manipulation min-h-[44px]"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>

          {/* Hero R1+R2 value */}
          <div className="text-center py-3">
            <p className="text-sm font-medium text-white mb-1">R1 + R2 (at midpoint)</p>
            <p
              className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
              }}
            >
              {result.r1PlusR2.toFixed(3)} Ω
            </p>
          </div>

          {/* Individual resistances */}
          <ResultsGrid columns={3}>
            <ResultValue
              category={CAT}
              label="R1 (Live)"
              value={result.r1.toFixed(3)}
              unit="Ω"
              size="sm"
            />
            <ResultValue
              category={CAT}
              label="Rn (Neutral)"
              value={result.rn.toFixed(3)}
              unit="Ω"
              size="sm"
            />
            <ResultValue
              category={CAT}
              label="R2 (CPC)"
              value={result.r2.toFixed(3)}
              unit="Ω"
              size="sm"
            />
          </ResultsGrid>

          {/* R1 vs Rn similarity check */}
          {!result.rnSimilar && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
              <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
              <p className="text-sm text-white">
                R1 and Rn differ by {Math.abs(result.r1 - result.rn).toFixed(3)} Ω — these should be
                similar as both conductors are the same CSA. Check conductor sizes or connections.
              </p>
            </div>
          )}

          <CalculatorDivider category={CAT} />

          {/* Cross-connection verification */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-white">Cross-Connection Verification</h3>
            <div className="space-y-2">
              {[
                {
                  label: 'L–N',
                  measured: result.xLN,
                  expected: result.expectedLN,
                  pass: result.lnPass,
                },
                {
                  label: 'L–CPC (R1+R2)',
                  measured: result.xLE,
                  expected: result.expectedLE,
                  pass: result.lePass,
                },
                {
                  label: 'N–CPC',
                  measured: result.xNE,
                  expected: result.expectedNE,
                  pass: result.nePass,
                },
              ].map((check) => (
                <div
                  key={check.label}
                  className={cn(
                    'flex items-center justify-between p-3 rounded-lg border text-sm',
                    check.pass
                      ? 'bg-green-500/5 border-green-500/20'
                      : 'bg-red-500/5 border-red-500/20'
                  )}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    {check.pass ? (
                      <CheckCircle className="h-4 w-4 text-green-400 shrink-0" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-red-400 shrink-0" />
                    )}
                    <span className="text-white font-medium">{check.label}</span>
                  </div>
                  <div className="text-right shrink-0 ml-2">
                    <span className="text-white">{check.measured.toFixed(3)}</span>
                    <span className="text-white text-xs ml-1">/ {check.expected.toFixed(3)} Ω</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* End-to-end verification */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-white">End-to-End Continuity</h3>
            <div className="space-y-2">
              {[
                { label: 'Live', value: result.e2eLive, ok: result.e2eLiveOk, limit: '< 10 Ω' },
                {
                  label: 'Neutral',
                  value: result.e2eNeutral,
                  ok: result.e2eNeutralOk,
                  limit: '< 10 Ω',
                },
                { label: 'CPC', value: result.e2eCpc, ok: result.e2eCpcOk, limit: '< 15 Ω' },
              ].map((check) => (
                <div
                  key={check.label}
                  className={cn(
                    'flex items-center justify-between p-3 rounded-lg border text-sm',
                    check.ok
                      ? 'bg-green-500/5 border-green-500/20'
                      : 'bg-red-500/5 border-red-500/20'
                  )}
                >
                  <div className="flex items-center gap-2">
                    {check.ok ? (
                      <CheckCircle className="h-4 w-4 text-green-400 shrink-0" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-red-400 shrink-0" />
                    )}
                    <span className="text-white font-medium">{check.label}</span>
                  </div>
                  <div className="text-right shrink-0 ml-2">
                    <span className="text-white">{check.value.toFixed(3)} Ω</span>
                    <span className="text-white text-xs ml-1">({check.limit})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cable comparison (if cable data provided) */}
          {result.cableComparison && (
            <>
              <CalculatorDivider category={CAT} />
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-white">Cable Comparison</h3>
                <div className="space-y-2">
                  {[
                    {
                      label: `R1 vs ${CABLE_DATA[cableType]?.liveCsa || ''} expected`,
                      measured: result.r1,
                      expected: result.cableComparison.r1Expected,
                      match: result.cableComparison.r1Match,
                    },
                    {
                      label: `R2 vs ${CABLE_DATA[cableType]?.cpcCsa || ''} CPC expected`,
                      measured: result.r2,
                      expected: result.cableComparison.r2Expected,
                      match: result.cableComparison.r2Match,
                    },
                  ].map((check) => (
                    <div
                      key={check.label}
                      className={cn(
                        'flex items-center justify-between p-3 rounded-lg border text-sm',
                        check.match
                          ? 'bg-green-500/5 border-green-500/20'
                          : 'bg-amber-500/5 border-amber-500/20'
                      )}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        {check.match ? (
                          <CheckCircle className="h-4 w-4 text-green-400 shrink-0" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />
                        )}
                        <span className="text-white font-medium truncate">{check.label}</span>
                      </div>
                      <div className="text-right shrink-0 ml-2">
                        <span className="text-white">{check.measured.toFixed(3)}</span>
                        <span className="text-white text-xs ml-1">
                          / {check.expected.toFixed(3)} Ω
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          <CalculatorDivider category={CAT} />

          {/* ── How It Worked Out ── */}
          <CalculatorFormula
            category={CAT}
            title="How It Worked Out"
            steps={[
              {
                label: 'End-to-end readings',
                formula: `Live: ${result.e2eLive.toFixed(3)} Ω | Neutral: ${result.e2eNeutral.toFixed(3)} Ω | CPC: ${result.e2eCpc.toFixed(3)} Ω`,
              },
              {
                label: 'Calculate individual leg resistances',
                formula: 'R = End-to-End ÷ 4 (two parallel paths, each half total)',
                value: `R1 = ${result.e2eLive.toFixed(3)} ÷ 4 = ${result.r1.toFixed(3)} Ω`,
              },
              {
                label: 'Calculate Rn and R2',
                formula: `Rn = ${result.e2eNeutral.toFixed(3)} ÷ 4 = ${result.rn.toFixed(3)} Ω`,
                value: `R2 = ${result.e2eCpc.toFixed(3)} ÷ 4 = ${result.r2.toFixed(3)} Ω`,
              },
              {
                label: 'R1 + R2 at midpoint',
                formula: `R1 + R2 = ${result.r1.toFixed(3)} + ${result.r2.toFixed(3)}`,
                value: `${result.r1PlusR2.toFixed(3)} Ω`,
                description:
                  'This is the maximum R1+R2 value recorded on the schedule of test results',
              },
              {
                label: 'Cross-connection verification',
                formula: `L–N: ${result.xLN.toFixed(3)} Ω (expected ${result.expectedLN.toFixed(3)} Ω) | L–CPC: ${result.xLE.toFixed(3)} Ω (expected ${result.expectedLE.toFixed(3)} Ω)`,
                value: result.allCrossPass
                  ? 'All cross-connection checks passed'
                  : 'Cross-connection discrepancy detected',
              },
              ...(result.cableComparison
                ? [
                    {
                      label: `Cable comparison at ${result.temp}°C`,
                      formula: `R(temp) = R(20°C) × [1 + 0.00393 × (${result.temp} − 20)]`,
                      value: `Expected R1: ${result.cableComparison.r1Expected.toFixed(3)} Ω | Expected R2: ${result.cableComparison.r2Expected.toFixed(3)} Ω`,
                      description: `Tolerance: ±${result.cableComparison.tolerance.toFixed(3)} Ω (15% or minimum 0.05 Ω)`,
                    },
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
                  <p className="text-sm text-white font-medium">Ring Circuit Continuity Test</p>
                  <p className="text-sm text-white">
                    A ring final circuit has two parallel paths from the consumer unit to every
                    socket outlet. The end-to-end readings confirm each conductor is continuous
                    around the entire ring. Dividing by 4 gives the resistance of each leg at the
                    midpoint — the furthest point from the consumer unit.
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-white font-medium">Cross-Connection Tests</p>
                  <p className="text-sm text-white">
                    By connecting one end of the live to one end of the neutral (or CPC) at the
                    consumer unit, then measuring at each socket, you verify the ring is properly
                    wired. The reading at every socket should be approximately R1+Rn (for L–N) or
                    R1+R2 (for L–CPC). Consistent readings around the ring confirm there are no
                    breaks, cross-connections, or borrowed neutrals.
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-white font-medium">R1+R2 Value</p>
                  <p className="text-sm text-white">
                    The R1+R2 value is the maximum resistance of the live conductor and CPC combined
                    at the furthest point of the ring. This is recorded on the Schedule of Test
                    Results (columns 7/8) and used to calculate the earth fault loop impedance: Zs =
                    Ze + R1+R2. The Zs must not exceed the maximum value in BS 7671 Table 41.3 for
                    the protective device rating.
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-white font-medium">
                    Typical Values (2.5mm² T&E, 50m ring)
                  </p>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2 text-sm text-white">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 shrink-0" />
                      End-to-end Live/Neutral: ~0.74 Ω
                    </li>
                    <li className="flex items-start gap-2 text-sm text-white">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 shrink-0" />
                      End-to-end CPC (1.5mm²): ~1.21 Ω
                    </li>
                    <li className="flex items-start gap-2 text-sm text-white">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 shrink-0" />
                      R1+R2 at midpoint: ~0.49 Ω
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
                      reg: 'Regulation 612.2.2',
                      desc: 'Continuity of ring final circuit conductors',
                    },
                    {
                      reg: 'Regulation 433.1.204',
                      desc: 'Ring final circuit: max 32A, max 100m² floor area',
                    },
                    {
                      reg: 'Table 41.3',
                      desc: 'Maximum Zs values for MCBs (use R1+R2 to calculate Zs)',
                    },
                    {
                      reg: 'Regulation 543.1.1',
                      desc: 'Minimum CPC size: 1.5mm² for 2.5mm² live conductors',
                    },
                    {
                      reg: 'Section 411.3.3',
                      desc: 'RCD protection required for socket outlets up to 32A',
                    },
                    {
                      reg: 'GN3 Appendix B',
                      desc: 'Ring final circuit test procedure — step-by-step method',
                    },
                  ].map((item) => (
                    <li key={item.reg} className="flex items-start gap-2 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 shrink-0" />
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
        name="Ring Circuit Formulas"
        formula="R1 = E2E Live ÷ 4 | R2 = E2E CPC ÷ 4 | R1+R2 = R1 + R2"
        variables={[
          { symbol: 'E2E', description: 'End-to-end reading of complete ring loop' },
          { symbol: '÷ 4', description: 'Two parallel paths, each half total resistance' },
          { symbol: 'R1+R2', description: 'Maximum value at midpoint (for Zs calculation)' },
        ]}
      />
    </CalculatorCard>
  );
};

export default RingCircuitCalculator;
