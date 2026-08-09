import { copyToClipboard } from '@/utils/clipboard';
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
  CalculatorEditorial,
  CALCULATOR_CONFIG,
  CalculatorPanes,
  ResultHeadline,
} from '@/components/calculators/shared';
import { ringCircuitContent } from './content/ring-circuit';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

// Conductor resistance at 20 °C (mΩ/m), BS EN 60228 nominal values as tabulated
// in GN3 9th Ed Table B1 / OSG Table I1: 1.5 = 12.1, 2.5 = 7.41, 4 = 4.61,
// 6 = 3.08, 10 = 1.83.
//
// FIX (BS 6004 flat twin & earth construction; GN3 9th Ed Ch 2 Reg 2.20 uses
// "2.5/1.5 mm²" as the standard domestic ring cable): the cpc paired with each
// cable size was one conductor size too large — 4 mm² was shown with a 2.5 mm²
// cpc, 6 mm² with 4.0 mm², 10 mm² with 6.0 mm². Flat twin & earth is 2.5/1.5,
// 4/1.5, 6/2.5 and 10/4. Oversizing the cpc understated its resistance, so the
// expected R2 (and therefore expected R1+R2 and Zs) came out too low.
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
    cpc: 12.1,
    liveCsa: '4.0mm²',
    cpcCsa: '1.5mm²',
  },
  '6mm-twin': {
    label: '6.0mm² Twin & Earth',
    live: 3.08,
    cpc: 7.41,
    liveCsa: '6.0mm²',
    cpcCsa: '2.5mm²',
  },
  '10mm-twin': {
    label: '10mm² Twin & Earth',
    live: 1.83,
    cpc: 4.61,
    liveCsa: '10mm²',
    cpcCsa: '4.0mm²',
  },
};

/**
 * Instrument allowance on a low-resistance reading.
 *
 * GN3 9th Ed Ch 4 Reg 4.8 requires a digital low-resistance instrument to
 * resolve at least 0.01 Ω; GN3 Ch 1 Reg 1.8 works its accuracy example on a
 * declared "±5 % ±3 digits". So ±(5 % + 0.03 Ω).
 *
 * This replaces a flat ±0.1 Ω band that appeared nowhere in BS 7671 or GN3 —
 * it was ~40 % of a typical short-ring reading and far too tight on a long one.
 */
const instrumentBand = (expected: number) => 0.05 * Math.abs(expected) + 0.03;

/**
 * Acceptance band for a step-3 cross-connected reading taken anywhere on the ring.
 *
 * GN3 9th Ed Ch 2 Reg 2.20: where the cpc is not the same csa/material as the
 * line conductors (i.e. any flat twin & earth ring), the readings around the
 * ring are NOT substantially the same — Table 2.9 quantifies the spread as a
 * percentage of the highest reading (6 % for 2.5/1.5 mm²).
 *
 * The two ends of that band follow from the ring geometry, so they are computed
 * rather than assumed. With open-loop resistances a and b cross-connected, a
 * reading at fraction x round the ring is P1·P2/(a+b) where P1 = xa + (1−x)b and
 * P2 = (1−x)a + xb. That is highest at the midpoint ((a+b)/4) and lowest at the
 * origin (ab/(a+b)). For 2.5/1.5 the two differ by 5.8 % — GN3's 6 %.
 */
const crossBand = (openLoopA: number, openLoopB: number) => ({
  min: (openLoopA * openLoopB) / (openLoopA + openLoopB),
  max: (openLoopA + openLoopB) / 4,
});

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
  expectedLNMin: number;
  expectedLEMin: number;
  expectedNEMin: number;
  lnPass: boolean;
  lePass: boolean;
  nePass: boolean;
  rnSimilar: boolean;
  allCrossPass: boolean;
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

    // Cross-connection validation (GN3 9th Ed Ch 2 Regs 2.18 and 2.20).
    // The midpoint value is the highest a step-2/step-3 reading can legitimately
    // reach; where the cpc is a reduced csa the reading falls away towards the
    // ends of the ring, so the acceptance band runs from crossBand().min to
    // crossBand().max, widened by the instrument allowance at each end.
    const lnBand = crossBand(e2eLive, e2eNeutral);
    const leBand = crossBand(e2eLive, e2eCpc);
    const neBand = crossBand(e2eNeutral, e2eCpc);

    const expectedLN = lnBand.max; // = r1 + rn
    const expectedLE = leBand.max; // = r1 + r2, the value recorded as R1+R2
    const expectedNE = neBand.max;

    const inBand = (measured: number, band: { min: number; max: number }) =>
      measured >= band.min - instrumentBand(band.min) &&
      measured <= band.max + instrumentBand(band.max);

    const lnPass = inBand(xLN, lnBand);
    const lePass = inBand(xLE, leBand);
    const nePass = inBand(xNE, neBand);

    // r1 and rn are the same csa, length and material, so GN3 Ch 2 Reg 2.17
    // expects them "of the same order". The previous fixed ±0.05 Ω has no basis
    // in BS 7671 or GN3; compare on the instrument allowance instead.
    const rnSimilar =
      Math.abs(e2eLive - e2eNeutral) <= instrumentBand(Math.max(e2eLive, e2eNeutral));

    // Overall status is the GN3 acceptance criterion — the cross-connected
    // readings agreeing with the value predicted from the end-to-end figures.
    //
    // FIX: this used to also require e2e Live/Neutral < 10 Ω and e2e CPC < 15 Ω.
    // No such limits exist. BS 7671 Reg 643.2.1 requires "a measurement of
    // resistance" with no numeric acceptance value, and GN3 interprets the
    // result by comparison against the calculated conductor resistance
    // (Ch 7 Reg 7.41 worked example), not against a fixed ceiling.
    const allCrossPass = lnPass && lePass && nePass;
    const overallPass = allCrossPass;

    // Cable comparison (optional)
    let cableComparison: RingResult['cableComparison'] = null;
    const temp = parseFloat(temperature) || 20;
    if (cableType && cableLength) {
      const cable = CABLE_DATA[cableType];
      const length = parseFloat(cableLength);
      if (cable && length > 0) {
        // FIX: coefficient was 0.00393. BS 7671 Appendix 4 §6.1 NOTE: "the
        // approximate resistance-temperature coefficient of 0.004 per °C at
        // 20 °C for both copper and aluminium conductors." This also now agrees
        // with the "~0.4% per °C" hint shown on the temperature input.
        const tempCorrection = 1 + 0.004 * (temp - 20);
        // FIX: the entered ring length was being doubled before the resistance
        // was worked out. Conductor resistance is taken straight off the run
        // length — GN3 9th Ed Ch 7 Reg 7.41 worked example: (55 × 7.41)/1000 =
        // 0.41 Ω — and GN3 Ch 2 Reg 2.20 measures a ring by its "overall ring
        // length (point-to-point around the ring)", which is already the whole
        // conductor loop. The ×2 doubled every expected value, so a ring with
        // twice the correct resistance still matched.
        const r1Exp = (cable.live * length * tempCorrection) / 1000 / 4;
        const r2Exp = (cable.cpc * length * tempCorrection) / 1000 / 4;
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
      expectedLNMin: lnBand.min,
      expectedLEMin: leBand.min,
      expectedNEMin: neBand.min,
      lnPass,
      lePass,
      nePass,
      rnSimilar,
      allCrossPass,
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
    copyToClipboard(text).then((ok) => {
      if (ok) {
        setCopied(true);
        toast({ title: 'Copied to clipboard' });
        setTimeout(() => setCopied(false), 2000);
      }
    });
  };

  return (
    <CalculatorCard
      category={CAT}
      title="Ring Circuit Calculator"
      description="Test and verify ring final circuit continuity per BS 7671"
    >
      <CalculatorPanes
        form={
          <>
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
                  hint="Whole conductor loop, point-to-point around the ring (GN3 Ch 2 Reg 2.20)"
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
          </>
        }
        result={
          <>
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
                <ResultHeadline
                  label="R1 + R2 (at midpoint)"
                  value={`${result.r1PlusR2.toFixed(3)} Ω`}
                />

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
                      End-to-end r1 and rn differ by{' '}
                      {Math.abs(result.e2eLive - result.e2eNeutral).toFixed(3)} Ω — more than
                      instrument accuracy accounts for. GN3 Ch 2 Reg 2.17 expects them to be of the
                      same order, as both conductors are the same length, CSA and material. Check
                      conductor sizes and connections.
                    </p>
                  </div>
                )}

                <CalculatorDivider category={CAT} />

                {/* Cross-connection verification */}
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-white">
                    Cross-Connection Verification
                  </h3>
                  <div className="space-y-2">
                    {[
                      {
                        label: 'L–N',
                        measured: result.xLN,
                        expected: result.expectedLN,
                        expectedMin: result.expectedLNMin,
                        pass: result.lnPass,
                      },
                      {
                        label: 'L–CPC (R1+R2)',
                        measured: result.xLE,
                        expected: result.expectedLE,
                        expectedMin: result.expectedLEMin,
                        pass: result.lePass,
                      },
                      {
                        label: 'N–CPC',
                        measured: result.xNE,
                        expected: result.expectedNE,
                        expectedMin: result.expectedNEMin,
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
                          <span className="text-white text-xs ml-1">
                            /{' '}
                            {check.expected - check.expectedMin > 0.005
                              ? `${check.expectedMin.toFixed(3)}–${check.expected.toFixed(3)}`
                              : check.expected.toFixed(3)}{' '}
                            Ω
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-white">
                    Where a range is shown, the cpc is a smaller csa than the line conductors, so
                    the step-3 reading legitimately varies around the ring — lowest at the origin,
                    highest at the midpoint (GN3 Ch 2 Reg 2.20, Table 2.9: about 6% for 2.5/1.5mm²).
                  </p>
                </div>

                {/* End-to-end readings — recorded, not limit-checked */}
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-white">End-to-End Readings</h3>
                  <div className="space-y-2">
                    {[
                      { label: 'Live (r1)', value: result.e2eLive },
                      { label: 'Neutral (rn)', value: result.e2eNeutral },
                      { label: 'CPC (r2)', value: result.e2eCpc },
                    ].map((check) => (
                      <div
                        key={check.label}
                        className="flex items-center justify-between p-3 rounded-lg border border-white/[0.12] bg-white/[0.03] text-sm"
                      >
                        <span className="text-white font-medium">{check.label}</span>
                        <span className="text-white shrink-0 ml-2">{check.value.toFixed(3)} Ω</span>
                      </div>
                    ))}
                  </div>
                  {/* FIX: this panel used to assert "< 10 Ω" and "< 15 Ω" acceptance
                  limits and gate the overall pass badge on them. No such limits
                  exist — BS 7671 Reg 643.2.1 requires only a measurement of
                  resistance, and GN3 judges it by comparison with the calculated
                  conductor resistance (Ch 7 Reg 7.41), not a fixed ceiling. */}
                  <p className="text-xs text-white">
                    BS 7671 sets no numeric limit on an end-to-end reading — Regulation 643.2.1
                    calls for a measurement of resistance. Judge it by comparison with the
                    calculated resistance of the conductor (enter the cable type and ring length
                    above), and expect r1 and rn to be of the same order with r2 proportionally
                    higher on a reduced cpc (GN3 Ch 2 Reg 2.17).
                  </p>
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
                            formula: `R(temp) = R(20°C) × [1 + 0.004 × (${result.temp} − 20)]`,
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
                        <p className="text-sm text-white font-medium">
                          Ring Circuit Continuity Test
                        </p>
                        <p className="text-sm text-white">
                          A ring final circuit has two parallel paths from the consumer unit to
                          every socket outlet. The end-to-end readings confirm each conductor is
                          continuous around the entire ring. Dividing by 4 gives the resistance of
                          each leg at the midpoint — the furthest point from the consumer unit.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm text-white font-medium">Cross-Connection Tests</p>
                        <p className="text-sm text-white">
                          By connecting one end of the live to one end of the neutral (or CPC) at
                          the consumer unit, then measuring at each socket, you verify the ring is
                          properly wired. For L–N the conductors are the same CSA, so the reading is
                          substantially the same at every socket and equal to (r1 + rn) ÷ 4 (GN3 Ch
                          2 Reg 2.18).
                        </p>
                        <p className="text-sm text-white">
                          L–CPC is different. Every cable this calculator offers is flat twin &amp;
                          earth, where the cpc is a smaller CSA than the line conductor, so GN3 Ch 2
                          Reg 2.20 is explicit that the readings will <em>not</em> be substantially
                          the same: they are lowest at the origin and highest at the midpoint. Table
                          2.9 puts the spread at about 6% of the highest reading for 2.5/1.5mm²,
                          which on a ring up to 60m is smaller than the instrument can resolve. A
                          steady rise to a peak part way round and back down is the expected
                          pattern, not a fault; a local step at one socket points to a spur, break
                          or interconnection.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm text-white font-medium">R1+R2 Value</p>
                        <p className="text-sm text-white">
                          The R1+R2 value is the maximum resistance of the live conductor and CPC
                          combined at the furthest point of the ring. This is recorded on the
                          Schedule of Test Results (columns 7/8) and used to calculate the earth
                          fault loop impedance.
                        </p>
                        <p className="text-sm text-white">
                          {/* FIX: the text previously gave Zs = Ze + R1+R2 with no temperature
                          correction at all, and cited Table 41.3 for every device type. */}
                          R1+R2 is measured cold, but the Table 41 limits assume the conductor at
                          its operating temperature, so a correction factor is applied first: Zs =
                          Ze + A(R1+R2). GN3 Ch 5 Reg 5.78 works the example Ze = 0.35 Ω with an
                          (R1+R2) reading of 0.2 Ω and A = 1.20, giving Zs = 0.35 + 1.20 × 0.2 =
                          0.59 Ω.
                        </p>
                        <p className="text-sm text-white">
                          Compare the result against the maximum Zs for the protective device in BS
                          7671 Tables 41.2 to 41.4 — Table 41.2 for fuses at 0.4s, Table 41.3 for
                          circuit-breakers, Table 41.4 for fuses at 5s. Disconnection times
                          themselves come from Regulation 411.3.2.2.
                        </p>
                      </div>

                      <div className="space-y-1">
                        <p className="text-sm text-white font-medium">
                          Typical Values (2.5mm² T&E, 50m ring)
                        </p>
                        {/* FIX: these were ~0.74 / ~1.21 / ~0.49 Ω — the figures for 100m of
                        cable, i.e. the same length-doubling error that was in the cable
                        comparison. A 50m ring is 50m of cable. At 20 °C:
                        r1 = 7.41 × 50 / 1000 = 0.37 Ω; r2 = 12.1 × 50 / 1000 = 0.61 Ω;
                        R1+R2 = (0.37 + 0.61) ÷ 4 = 0.24 Ω. */}
                        <ul className="space-y-1">
                          <li className="flex items-start gap-2 text-sm text-white">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 shrink-0" />
                            End-to-end Live/Neutral: ~0.37 Ω
                          </li>
                          <li className="flex items-start gap-2 text-sm text-white">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 shrink-0" />
                            End-to-end CPC (1.5mm²): ~0.61 Ω
                          </li>
                          <li className="flex items-start gap-2 text-sm text-white">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 shrink-0" />
                            R1+R2 at midpoint: ~0.24 Ω
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                {/* Grounded standards + worked example */}
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
          </>
        }
        footer={<CalculatorEditorial content={ringCircuitContent} category={CAT} />}
      />
    </CalculatorCard>
  );
};

export default RingCircuitCalculator;
