import { useState, useMemo } from 'react';
import {
  Zap,
  Info,
  BookOpen,
  ChevronDown,
  PoundSterling,
  AlertTriangle,
  Calculator,
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import {
  CalculatorCard,
  CalculatorDivider,
  CalculatorInput,
  CalculatorSelect,
  CalculatorActions,
  ResultValue,
  ResultsGrid,
  CalculatorEditorial,
  CALCULATOR_CONFIG,
} from '@/components/calculators/shared';
import { powerFactorCorrectionContent } from './content/power-factor-correction';
import { standardDeviceRatings } from '@/lib/calculators/bs7671-data/protectiveDevices';

interface CorrectionResult {
  currentPF: number;
  targetPF: number;
  currentKW: number;
  currentKVA: number;
  currentKVAR: number;
  targetKVA: number;
  targetKVAR: number;
  requiredKVAR: number;
  currentBefore: number;
  currentAfter: number;
  currentSaved: number;
  percentageReduction: number;
  annualReactiveSavings: number;
  annualMDSavings: number;
  annualTotalSavings: number;
  capacitorBankSize: number;
  capacitorCurrent: number;
  protectiveDeviceLabel: string;
  stagesRecommended: number;
  warnings: string[];
}

// Standard capacitor bank sizes (kVAr)
const standardCapacitorSizes = [
  5, 10, 15, 20, 25, 30, 40, 50, 60, 75, 100, 125, 150, 200, 250, 300, 400, 500,
];

/**
 * FIX (audit 2026-08): the protective device was previously produced by ad-hoc arithmetic
 * rounding — `Math.ceil(I / 5) * 5` below 63 A and `Math.ceil(I / 10) * 10` above — which
 * yields ratings that no manufacturer makes (45 A, 55 A, 70 A, 90 A…).
 * BS 7671:2018+A4:2026 Reg 533.1.1 requires a device for protection against overcurrent to
 * comply with one or more of BS 88 series, BS 1362, BS 3036, BS EN 60898 series, BS EN 60947
 * series, BS EN 61009 series — each of which publishes a fixed rating series. We therefore
 * round up into the real series, taken from the shared, already-verified
 * `bs7671-data/protectiveDevices.ts` rather than re-inlining another private copy of it.
 *
 * NOTE on the 1.5 multiplier: BS 7671 gives no capacitor-bank uplift factor. The 1.43–1.5×
 * figure is manufacturer / IEC 61921 practice covering capacitor tolerance, harmonic current
 * and switching inrush. It is applied as a design allowance, not as a BS 7671 requirement.
 */
const CAPACITOR_DEVICE_UPLIFT = 1.5;

function selectProtectiveDevice(capacitorCurrent: number): {
  rating: number;
  label: string;
} {
  const designCurrent = capacitorCurrent * CAPACITOR_DEVICE_UPLIFT;

  // MCB to BS EN 60898 is only offered up to 125 A; beyond that use the BS 88 fuse series.
  const mcbRating = standardDeviceRatings.mcb.find((r) => r >= designCurrent);
  if (mcbRating !== undefined) {
    return { rating: mcbRating, label: `${mcbRating}A HRC fuse (BS 88) or MCB (BS EN 60898)` };
  }

  const fuseRating = standardDeviceRatings.bs88.find((r) => r >= designCurrent);
  if (fuseRating !== undefined) {
    return { rating: fuseRating, label: `${fuseRating}A HRC fuse (BS 88)` };
  }

  const largest = standardDeviceRatings.bs88[standardDeviceRatings.bs88.length - 1];
  return { rating: largest, label: `Above ${largest}A — specialist device selection required` };
}

// Power triangle SVG component
function PowerTriangle({
  kW,
  currentKVA,
  currentKVAR,
  targetKVA,
  targetKVAR,
  config,
}: {
  kW: number;
  currentKVA: number;
  currentKVAR: number;
  targetKVA: number;
  targetKVAR: number;
  config: { gradientFrom: string; gradientTo: string };
}) {
  // Normalise to fit in SVG viewBox
  const maxVal = Math.max(kW, currentKVAR, currentKVA);
  const scale = 180 / maxVal;

  const kWLen = kW * scale;
  const currentKVARLen = currentKVAR * scale;
  const targetKVARLen = targetKVAR * scale;

  // Triangle origin at bottom-left
  const ox = 30;
  const oy = 210;

  // Points for "before" triangle
  const kWEnd = { x: ox + kWLen, y: oy };
  const currentTop = { x: ox + kWLen, y: oy - currentKVARLen };
  const targetTop = { x: ox + kWLen, y: oy - targetKVARLen };

  return (
    <svg
      viewBox="0 0 280 240"
      className="w-full max-w-xs mx-auto"
      aria-label="Power triangle diagram"
    >
      {/* Before triangle (faded) */}
      <polygon
        points={`${ox},${oy} ${kWEnd.x},${oy} ${currentTop.x},${currentTop.y}`}
        fill={`${config.gradientFrom}15`}
        stroke={`${config.gradientFrom}40`}
        strokeWidth="1"
        strokeDasharray="4,4"
      />

      {/* After triangle (solid) */}
      <polygon
        points={`${ox},${oy} ${kWEnd.x},${oy} ${targetTop.x},${targetTop.y}`}
        fill={`${config.gradientFrom}25`}
        stroke={config.gradientFrom}
        strokeWidth="1.5"
      />

      {/* kW label (horizontal) */}
      <text
        x={(ox + kWEnd.x) / 2}
        y={oy + 18}
        textAnchor="middle"
        fill="white"
        fontSize="11"
        fontWeight="600"
      >
        {kW.toFixed(0)} kW
      </text>

      {/* Current kVAR label (right side, before) */}
      <text
        x={kWEnd.x + 8}
        y={(oy + currentTop.y) / 2}
        textAnchor="start"
        fill="white"
        fontSize="10"
        opacity="0.7"
      >
        {currentKVAR.toFixed(0)} kVAR
      </text>
      <text
        x={kWEnd.x + 8}
        y={(oy + currentTop.y) / 2 + 12}
        textAnchor="start"
        fill="white"
        fontSize="8"
        opacity="0.5"
      >
        (before)
      </text>

      {/* Target kVAR label (right side, after) */}
      {targetKVARLen > 10 && (
        <>
          <text
            x={kWEnd.x + 8}
            y={(oy + targetTop.y) / 2}
            textAnchor="start"
            fill={config.gradientFrom}
            fontSize="10"
            fontWeight="600"
          >
            {targetKVAR.toFixed(0)} kVAR
          </text>
          <text
            x={kWEnd.x + 8}
            y={(oy + targetTop.y) / 2 + 12}
            textAnchor="start"
            fill={config.gradientFrom}
            fontSize="8"
          >
            (after)
          </text>
        </>
      )}

      {/* Current kVA hypotenuse label (before) */}
      <text
        x={(ox + currentTop.x) / 2 - 12}
        y={(oy + currentTop.y) / 2}
        textAnchor="end"
        fill="white"
        fontSize="10"
        opacity="0.7"
      >
        {currentKVA.toFixed(0)} kVA
      </text>

      {/* Target kVA hypotenuse label (after) */}
      <text
        x={(ox + targetTop.x) / 2 - 12}
        y={(oy + targetTop.y) / 2 + 14}
        textAnchor="end"
        fill={config.gradientFrom}
        fontSize="10"
        fontWeight="600"
      >
        {targetKVA.toFixed(0)} kVA
      </text>

      {/* Legend */}
      <line
        x1={ox}
        y1={8}
        x2={ox + 20}
        y2={8}
        stroke={`${config.gradientFrom}40`}
        strokeWidth="1.5"
        strokeDasharray="4,4"
      />
      <text x={ox + 26} y={12} fill="white" fontSize="9" opacity="0.6">
        Before
      </text>

      <line
        x1={ox + 80}
        y1={8}
        x2={ox + 100}
        y2={8}
        stroke={config.gradientFrom}
        strokeWidth="1.5"
      />
      <text x={ox + 106} y={12} fill={config.gradientFrom} fontSize="9">
        After
      </text>
    </svg>
  );
}

const PowerFactorCorrectionCalculator = () => {
  const config = CALCULATOR_CONFIG['power'];

  // Inputs
  const [inputMethod, setInputMethod] = useState<'kw-pf' | 'kva-kvar'>('kw-pf');
  const [realPower, setRealPower] = useState<string>('');
  const [currentPowerFactor, setCurrentPowerFactor] = useState<string>('0.75');
  const [currentKVA, setCurrentKVA] = useState<string>('');
  const [currentKVAR, setCurrentKVAR] = useState<string>('');
  const [targetPowerFactor, setTargetPowerFactor] = useState<string>('0.95');
  const [supplyVoltage, setSupplyVoltage] = useState<string>('400');
  const [phases, setPhases] = useState<string>('3');
  // FIX (audit 2026-08): an `electricityRate` state was declared here, defaulted to £0.30/kWh,
  // reset, and listed as a useMemo dependency, but was never read by the maths and never
  // rendered as an input. Removed rather than wired up — the cost model charges on kVArh and
  // kVA demand, not on kWh, so a unit rate has no part in it.
  const [reactiveCharge, setReactiveCharge] = useState<string>('0.005');
  const [kvaChargeRate, setKvaChargeRate] = useState<string>('');
  const [operatingHours, setOperatingHours] = useState<string>('2000');

  const [showCostInputs, setShowCostInputs] = useState(false);
  const [showWorkings, setShowWorkings] = useState(false);
  const [showReference, setShowReference] = useState(false);

  const result = useMemo((): CorrectionResult | null => {
    let kW: number;
    let pfCurrent: number;
    let kVACurrent: number;
    let kVARCurrent: number;

    if (inputMethod === 'kw-pf') {
      kW = parseFloat(realPower);
      pfCurrent = parseFloat(currentPowerFactor);
      if (!kW || !pfCurrent || pfCurrent <= 0 || pfCurrent > 1) return null;

      kVACurrent = kW / pfCurrent;
      kVARCurrent = Math.sqrt(Math.pow(kVACurrent, 2) - Math.pow(kW, 2));
    } else {
      kVACurrent = parseFloat(currentKVA);
      kVARCurrent = parseFloat(currentKVAR);
      if (!kVACurrent || !kVARCurrent || kVACurrent <= 0 || kVARCurrent <= 0) return null;

      // FIX (audit 2026-08): the guard here only tested truthiness, so a meter pair with
      // kVAr >= kVA (mistyped, or read off different instruments) took the square root of a
      // negative number. kW became NaN, pfCurrent became NaN, and every downstream figure —
      // kVAr required, bank size, capacitor current, savings — rendered as NaN.
      // In a passive load kVAr can never equal or exceed kVA, so reject the pair outright.
      if (kVARCurrent >= kVACurrent) return null;

      kW = Math.sqrt(Math.pow(kVACurrent, 2) - Math.pow(kVARCurrent, 2));
      pfCurrent = kW / kVACurrent;
    }

    const pfTarget = parseFloat(targetPowerFactor);
    const voltage = parseFloat(supplyVoltage);
    const reactiveRate = parseFloat(reactiveCharge);
    const hours = parseFloat(operatingHours);
    const kvaRate = parseFloat(kvaChargeRate) || 0;
    const isThreePhase = phases === '3';

    if (!pfTarget || pfTarget <= pfCurrent || pfTarget > 1) return null;

    // Calculate target values
    const kVATarget = kW / pfTarget;
    const kVARTarget = Math.sqrt(Math.pow(kVATarget, 2) - Math.pow(kW, 2));

    // Required correction
    const kVARRequired = kVARCurrent - kVARTarget;

    // Current calculation based on phases
    let currentBefore: number;
    let currentAfter: number;
    if (isThreePhase) {
      currentBefore = (kVACurrent * 1000) / (Math.sqrt(3) * voltage);
      currentAfter = (kVATarget * 1000) / (Math.sqrt(3) * voltage);
    } else {
      currentBefore = (kVACurrent * 1000) / voltage;
      currentAfter = (kVATarget * 1000) / voltage;
    }
    const currentSaved = currentBefore - currentAfter;
    const percentageReduction = ((kVACurrent - kVATarget) / kVACurrent) * 100;

    // Annual savings
    const reactiveEnergySaved = kVARRequired * hours;
    const annualReactiveSavings = reactiveEnergySaved * reactiveRate;

    // MD (kVA) savings: if DNO charges per kVA
    const kvaReduction = kVACurrent - kVATarget;
    const annualMDSavings = kvaRate > 0 ? kvaReduction * kvaRate * 12 : 0;

    const annualTotalSavings = annualReactiveSavings + annualMDSavings;

    // Select next standard capacitor size up
    const capacitorBankSize =
      standardCapacitorSizes.find((size) => size >= kVARRequired) ||
      Math.ceil(kVARRequired / 50) * 50;

    // Capacitor current
    // FIX (audit 2026-08): this was derived from kVARRequired (the exact theoretical figure),
    // while the "Capacitor Bank Specification" panel above it specifies — and the installer
    // actually buys and connects — capacitorBankSize, the next standard size UP. The current
    // shown was therefore lower than the bank's real current, and the protective device sized
    // from it was undersized (e.g. 27.7 kVAr required -> 30 kVAr bank: 40.0 A shown against
    // 43.3 A actual). BS 7671:2018+A4:2026 Reg 512.1.2(a) requires every item of equipment to
    // be suitable for the design current "taking into account any capacitive and inductive
    // effects" — i.e. the current of the equipment installed, not of the ideal calculation.
    let capacitorCurrent: number;
    if (isThreePhase) {
      capacitorCurrent = (capacitorBankSize * 1000) / (Math.sqrt(3) * voltage);
    } else {
      capacitorCurrent = (capacitorBankSize * 1000) / voltage;
    }

    // Protective device from the real BS EN 60898 / BS 88 rating series (Reg 533.1.1)
    const { label: protectiveDeviceLabel } = selectProtectiveDevice(capacitorCurrent);

    // Recommend stages for large banks
    let stagesRecommended = 1;
    if (capacitorBankSize > 100) stagesRecommended = Math.ceil(capacitorBankSize / 50);
    if (stagesRecommended > 6) stagesRecommended = 6;

    // Warnings
    const warnings: string[] = [];
    if (kVARRequired > 500) {
      warnings.push('Large correction required — consider staged automatic switching');
    }
    if (pfTarget > 0.98) {
      warnings.push('Very high target PF may cause leading power factor at light loads');
    }
    if (kW < 50 && kVARRequired > 20) {
      warnings.push('For small loads, verify cost-benefit of correction equipment');
    }

    return {
      currentPF: pfCurrent,
      targetPF: pfTarget,
      currentKW: kW,
      currentKVA: kVACurrent,
      currentKVAR: kVARCurrent,
      targetKVA: kVATarget,
      targetKVAR: kVARTarget,
      requiredKVAR: kVARRequired,
      currentBefore,
      currentAfter,
      currentSaved,
      percentageReduction,
      annualReactiveSavings,
      annualMDSavings,
      annualTotalSavings,
      capacitorBankSize,
      capacitorCurrent,
      protectiveDeviceLabel,
      stagesRecommended,
      warnings,
    };
  }, [
    inputMethod,
    realPower,
    currentPowerFactor,
    currentKVA,
    currentKVAR,
    targetPowerFactor,
    supplyVoltage,
    phases,
    reactiveCharge,
    kvaChargeRate,
    operatingHours,
  ]);

  const reset = () => {
    setInputMethod('kw-pf');
    setRealPower('');
    setCurrentPowerFactor('0.75');
    setCurrentKVA('');
    setCurrentKVAR('');
    setTargetPowerFactor('0.95');
    setSupplyVoltage('400');
    setPhases('3');
    setReactiveCharge('0.005');
    setKvaChargeRate('');
    setOperatingHours('2000');
  };

  const hasValidInputs = () => {
    if (inputMethod === 'kw-pf') {
      return realPower && currentPowerFactor && targetPowerFactor;
    }
    return currentKVA && currentKVAR && targetPowerFactor;
  };

  const inputMethodOptions = [
    { value: 'kw-pf', label: 'kW and Power Factor' },
    { value: 'kva-kvar', label: 'kVA and kVAR readings' },
  ];

  const phaseOptions = [
    { value: '3', label: 'Three Phase (400V)' },
    { value: '1', label: 'Single Phase (230V)' },
  ];

  const targetPFOptions = [
    { value: '0.90', label: '0.90 (Minimum acceptable)' },
    { value: '0.92', label: '0.92 (Typical target)' },
    { value: '0.95', label: '0.95 (Recommended)' },
    { value: '0.97', label: '0.97 (Excellent)' },
    { value: '0.98', label: '0.98 (Near unity)' },
    { value: '1.00', label: '1.00 (Unity — theoretical)' },
  ];

  return (
    <CalculatorCard
      category="power"
      title="Power Factor Correction"
      description="Calculate capacitor bank sizing for power factor improvement"
    >
      {/* Input Method & Phases */}
      <div className="grid grid-cols-2 gap-3">
        <CalculatorSelect
          label="Input Method"
          value={inputMethod}
          onChange={(v) => setInputMethod(v as 'kw-pf' | 'kva-kvar')}
          options={inputMethodOptions}
        />
        <CalculatorSelect
          label="Supply Phases"
          value={phases}
          onChange={setPhases}
          options={phaseOptions}
        />
      </div>

      {/* Inputs based on method */}
      {inputMethod === 'kw-pf' ? (
        <>
          <CalculatorInput
            label="Real Power (kW)"
            unit="kW"
            type="text"
            inputMode="decimal"
            value={realPower}
            onChange={setRealPower}
            placeholder="e.g., 100"
            hint="From energy meter or load calculation"
          />
          <CalculatorInput
            label="Current Power Factor"
            type="text"
            inputMode="decimal"
            value={currentPowerFactor}
            onChange={setCurrentPowerFactor}
            placeholder="e.g., 0.75"
            hint="Lagging (typical industrial: 0.7-0.85)"
          />
        </>
      ) : (
        <>
          <CalculatorInput
            label="Apparent Power (kVA)"
            unit="kVA"
            type="text"
            inputMode="decimal"
            value={currentKVA}
            onChange={setCurrentKVA}
            placeholder="e.g., 133"
          />
          <CalculatorInput
            label="Reactive Power (kVAR)"
            unit="kVAR"
            type="text"
            inputMode="decimal"
            value={currentKVAR}
            onChange={setCurrentKVAR}
            placeholder="e.g., 88"
          />
        </>
      )}

      {/* Target PF */}
      <CalculatorSelect
        label="Target Power Factor"
        value={targetPowerFactor}
        onChange={setTargetPowerFactor}
        options={targetPFOptions}
      />

      {/* Cost analysis inputs */}
      <Collapsible open={showCostInputs} onOpenChange={setShowCostInputs}>
        <CollapsibleTrigger className="calculator-collapsible-trigger w-full">
          <div className="flex items-center gap-2">
            <PoundSterling className="h-4 w-4 text-amber-400" />
            <span className="text-sm text-white">Cost Analysis (Optional)</span>
          </div>
          <ChevronDown
            className={cn(
              'h-4 w-4 text-white transition-transform duration-200',
              showCostInputs && 'rotate-180'
            )}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4 p-4 mt-2 rounded-xl bg-white/[0.04] border border-white/5">
          <CalculatorInput
            label="Supply Voltage"
            unit="V"
            type="text"
            inputMode="decimal"
            value={supplyVoltage}
            onChange={setSupplyVoltage}
            placeholder="400"
          />
          <CalculatorInput
            label="Operating Hours per Year"
            unit="hrs/yr"
            type="text"
            inputMode="numeric"
            value={operatingHours}
            onChange={setOperatingHours}
            placeholder="2000"
            hint="Typical: 2000 (single shift), 4000 (double shift), 8760 (24/7)"
          />
          <CalculatorInput
            label="Reactive Power Charge"
            unit="£/kVARh"
            type="text"
            inputMode="decimal"
            value={reactiveCharge}
            onChange={setReactiveCharge}
            placeholder="0.005"
            hint="Check your electricity bill for reactive charges"
          />
          <CalculatorInput
            label="kVA Demand Charge (optional)"
            unit="£/kVA/month"
            type="text"
            inputMode="decimal"
            value={kvaChargeRate}
            onChange={setKvaChargeRate}
            placeholder="e.g. 30"
            hint="Many DNOs charge on kVA — check your bill. Leave blank if not applicable."
          />
        </CollapsibleContent>
      </Collapsible>

      <CalculatorActions
        category="power"
        onCalculate={() => {}}
        onReset={reset}
        isDisabled={!hasValidInputs()}
        calculateLabel="Live Results Below"
      />

      {/* Results */}
      {result && (
        <>
          <CalculatorDivider category="power" />

          <div className="space-y-4 animate-fade-in">
            {/* Status chip */}
            <div className="flex items-center justify-between">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
                style={{
                  backgroundColor: `${config.gradientFrom}15`,
                  border: `1px solid ${config.gradientFrom}30`,
                  color: config.gradientFrom,
                }}
              >
                {result.stagesRecommended > 1
                  ? `${result.stagesRecommended}-Stage Automatic`
                  : 'Fixed Correction'}
              </span>
            </div>

            {/* Hero value */}
            <div className="p-4 rounded-xl bg-white/[0.04] border border-white/5 text-center">
              <p className="text-sm text-white mb-1">Required Correction</p>
              <div
                className="text-4xl font-bold bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                }}
              >
                {result.requiredKVAR.toFixed(1)} kVAR
              </div>
              <p className="text-sm text-white mt-1">
                Nearest standard: {result.capacitorBankSize} kVAR
              </p>
            </div>

            {/* Power Triangle */}
            <div className="p-3 rounded-xl bg-white/[0.04] border border-white/5">
              <p className="text-xs text-white mb-2 text-center">
                Power Triangle (Before &amp; After)
              </p>
              <PowerTriangle
                kW={result.currentKW}
                currentKVA={result.currentKVA}
                currentKVAR={result.currentKVAR}
                targetKVA={result.targetKVA}
                targetKVAR={result.targetKVAR}
                config={config}
              />
            </div>

            <ResultsGrid columns={2}>
              <ResultValue
                label="Current PF"
                value={result.currentPF.toFixed(2)}
                category="power"
                size="sm"
              />
              <ResultValue
                label="Target PF"
                value={result.targetPF.toFixed(2)}
                category="power"
                size="sm"
              />
              <ResultValue
                label="Current kVA"
                value={result.currentKVA.toFixed(1)}
                unit="kVA"
                category="power"
                size="sm"
              />
              <ResultValue
                label="Target kVA"
                value={result.targetKVA.toFixed(1)}
                unit="kVA"
                category="power"
                size="sm"
              />
            </ResultsGrid>

            {/* Benefits */}
            <div className="pt-3 mt-3 border-t border-white/10">
              <p className="text-xs text-white mb-2">Benefits</p>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 rounded-lg bg-white/[0.04] border border-white/5">
                  <p className="text-xs text-white">kVA Reduction</p>
                  <p className="text-sm font-semibold text-green-400">
                    {result.percentageReduction.toFixed(1)}%
                  </p>
                </div>
                <div className="p-2 rounded-lg bg-white/[0.04] border border-white/5">
                  <p className="text-xs text-white">Current Saved</p>
                  <p className="text-sm font-semibold text-green-400">
                    {result.currentSaved.toFixed(1)} A
                  </p>
                </div>
              </div>
              {(result.annualReactiveSavings > 0 || result.annualMDSavings > 0) && (
                <div className="mt-2 space-y-1">
                  {result.annualReactiveSavings > 0 && (
                    <div className="p-2 rounded-lg bg-white/[0.04] border border-white/5 flex justify-between items-center">
                      <p className="text-xs text-white">Reactive Power Savings</p>
                      <p className="text-sm font-medium" style={{ color: config.gradientFrom }}>
                        £{result.annualReactiveSavings.toFixed(0)}/year
                      </p>
                    </div>
                  )}
                  {result.annualMDSavings > 0 && (
                    <div className="p-2 rounded-lg bg-white/[0.04] border border-white/5 flex justify-between items-center">
                      <p className="text-xs text-white">Max Demand (kVA) Savings</p>
                      <p className="text-sm font-medium" style={{ color: config.gradientFrom }}>
                        £{result.annualMDSavings.toFixed(0)}/year
                      </p>
                    </div>
                  )}
                  <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20 flex justify-between items-center">
                    <p className="text-xs text-white font-medium">Total Annual Savings</p>
                    <p className="text-lg font-semibold" style={{ color: config.gradientFrom }}>
                      £{result.annualTotalSavings.toFixed(0)}/year
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Warnings */}
          {result.warnings.length > 0 && (
            <>
              <CalculatorDivider category="power" />
              <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/30">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-orange-400 mt-0.5 shrink-0" />
                  <div className="space-y-1">
                    {result.warnings.map((warning, idx) => (
                      <p key={idx} className="text-sm text-white">
                        {warning}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Capacitor Bank Specification */}
          <CalculatorDivider category="power" />
          <div className="p-4 rounded-xl bg-white/[0.04] border border-white/5">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="h-4 w-4" style={{ color: config.gradientFrom }} />
              <span className="text-sm font-medium text-white">Capacitor Bank Specification</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between p-2 rounded-lg bg-white/[0.04]">
                <span className="text-white">Total kVAR</span>
                <span className="text-white font-medium">{result.capacitorBankSize} kVAR</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-white/[0.04]">
                <span className="text-white">System Voltage</span>
                <span className="text-white font-medium">
                  {supplyVoltage}V {phases === '3' ? '3-phase' : '1-phase'}
                </span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-white/[0.04]">
                <span className="text-white">Capacitor Current</span>
                <span className="text-white font-medium">
                  {result.capacitorCurrent.toFixed(1)}A
                </span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-white/[0.04]">
                <span className="text-white">Protection</span>
                <span className="text-white font-medium">{result.protectiveDeviceLabel}</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-white/[0.04]">
                <span className="text-white">Switching</span>
                <span className="text-white font-medium">
                  {result.stagesRecommended === 1
                    ? 'Fixed'
                    : `Automatic ${result.stagesRecommended}-stage`}
                </span>
              </div>
              {/*
                FIX (audit 2026-08): this row previously read "7% (5.67% if THDv > 5%)" as though
                it were a determinate specification, and contradicted the guidance panel below
                which said "5% or 7%". Neither BS 7671:2018+A4:2026, GN3 nor the On-Site Guide
                specifies a detuning ratio — searching bs7671/gn3/osg for "detun" and "harmonic
                resonance" returns nothing, and the printed standard has no hit for "detuning".
                The ratio follows from the site harmonic spectrum and the manufacturer's / IEC
                61921 selection, so the row now points at that rather than asserting a number.
                What BS 7671 does require is that harmonic currents be assessed (Reg 331.1(f))
                and that switching overvoltages from capacitor banks be considered (Reg 443.4.2,
                which names capacitor banks explicitly).
              */}
              <div className="flex justify-between gap-3 p-2 rounded-lg bg-white/[0.04]">
                <span className="text-white shrink-0">Detuning Reactor</span>
                <span className="text-white font-medium text-right">
                  Select from harmonic survey (manufacturer / IEC 61921)
                </span>
              </div>
              <div className="flex justify-between gap-3 p-2 rounded-lg bg-white/[0.04]">
                <span className="text-white shrink-0">Discharge &amp; Labelling</span>
                <span className="text-white font-medium text-right">
                  Means of discharge + warning label required
                </span>
              </div>
              <div className="flex justify-between gap-3 p-2 rounded-lg bg-white/[0.04]">
                <span className="text-white shrink-0">Type</span>
                <span className="text-white font-medium text-right">
                  Dry type (indoor) / Oil-filled (outdoor)
                </span>
              </div>
            </div>
            <div className="mt-3 p-2 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <p className="text-xs text-white">
                <strong>Inrush current:</strong> Capacitors draw high inrush on energisation. For
                staged banks, use contactors with pre-insertion resistors to limit inrush.
              </p>
            </div>
            {/*
              FIX (audit 2026-08): the specification block listed kVAr, voltage, current,
              protection, switching, detuning and type but said nothing about residual charge —
              the one thing about a capacitor bank that can kill someone opening the enclosure.
              Both regulations below were read verbatim from the printed A4:2026 text.
            */}
            <div className="mt-2 p-2 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-xs text-white">
                <strong>Residual charge — BS 7671 requirements:</strong> Reg 462.4 — where
                residual electrical energy is potentially present, suitable means shall be
                provided for its discharge, and where relevant a warning label indicating the
                discharge time required before the enclosure can be safely opened. Reg 416.2.5 —
                where a capacitor that may retain a dangerous charge after switch-off is installed
                behind a barrier or in an enclosure, a warning label shall be provided (a charge
                is not treated as dangerous if the static-charge voltage falls below 120 V DC in
                under 5 s). Reg 559.7 additionally requires compensation capacitors of total
                capacitance exceeding 0.5 µF to be used only with discharge resistors, though
                that clause sits in the luminaires section.
              </p>
            </div>
          </div>

          {/* How It Worked Out */}
          <Collapsible open={showWorkings} onOpenChange={setShowWorkings}>
            <CollapsibleTrigger className="calculator-collapsible-trigger w-full">
              <div className="flex items-center gap-3">
                <Calculator className="h-4 w-4 text-purple-400" />
                <span className="text-sm sm:text-base font-medium text-white">
                  How It Worked Out
                </span>
              </div>
              <ChevronDown
                className={cn(
                  'h-4 w-4 text-white transition-transform duration-200',
                  showWorkings && 'rotate-180'
                )}
              />
            </CollapsibleTrigger>

            <CollapsibleContent className="pt-2">
              <div className="text-sm font-mono text-white space-y-3 p-3 rounded-xl bg-white/[0.04] border border-white/5">
                {/* Step 1 */}
                <div>
                  <p className="text-xs text-purple-400 mb-1">Step 1: Current kVA and kVAR</p>
                  <div className="pl-3 border-l-2 border-purple-500/30 space-y-0.5">
                    <p>
                      kVA = kW / PF = {result.currentKW.toFixed(1)} / {result.currentPF.toFixed(2)}{' '}
                      = {result.currentKVA.toFixed(1)} kVA
                    </p>
                    <p>
                      kVAR = sqrt(kVA² - kW²) = sqrt({result.currentKVA.toFixed(1)}² -{' '}
                      {result.currentKW.toFixed(1)}²) = {result.currentKVAR.toFixed(1)} kVAR
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="pt-2 border-t border-purple-500/20">
                  <p className="text-xs text-purple-400 mb-1">Step 2: Target kVA and kVAR</p>
                  <div className="pl-3 border-l-2 border-purple-500/30 space-y-0.5">
                    <p>
                      Target kVA = {result.currentKW.toFixed(1)} / {result.targetPF.toFixed(2)} ={' '}
                      {result.targetKVA.toFixed(1)} kVA
                    </p>
                    <p>
                      Target kVAR = sqrt({result.targetKVA.toFixed(1)}² -{' '}
                      {result.currentKW.toFixed(1)}²) = {result.targetKVAR.toFixed(1)} kVAR
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="pt-2 border-t border-purple-500/20">
                  <p className="text-xs text-purple-400 mb-1">Step 3: Required correction kVAR</p>
                  <div className="pl-3 border-l-2 border-purple-500/30">
                    <p>
                      kVAR correction = {result.currentKVAR.toFixed(1)} -{' '}
                      {result.targetKVAR.toFixed(1)} ={' '}
                      <span className="text-white font-bold">
                        {result.requiredKVAR.toFixed(1)} kVAR
                      </span>
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="pt-2 border-t border-purple-500/20">
                  <p className="text-xs text-purple-400 mb-1">
                    Step 4: Nearest standard capacitor size
                  </p>
                  <div className="pl-3 border-l-2 border-purple-500/30">
                    <p>
                      {result.requiredKVAR.toFixed(1)} kVAR → nearest standard ={' '}
                      <span className="text-white font-bold">{result.capacitorBankSize} kVAR</span>
                    </p>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="pt-2 border-t border-purple-500/20">
                  <p className="text-xs text-purple-400 mb-1">Step 5: Current reduction</p>
                  <div className="pl-3 border-l-2 border-purple-500/30 space-y-0.5">
                    {phases === '3' ? (
                      <>
                        <p>
                          I (before) = (kVA × 1000) / (sqrt(3) × V) = (
                          {result.currentKVA.toFixed(1)} × 1000) / (1.732 × {supplyVoltage}) ={' '}
                          {result.currentBefore.toFixed(1)}A
                        </p>
                        <p>
                          I (after) = ({result.targetKVA.toFixed(1)} × 1000) / (1.732 ×{' '}
                          {supplyVoltage}) = {result.currentAfter.toFixed(1)}A
                        </p>
                      </>
                    ) : (
                      <>
                        <p>
                          I (before) = (kVA × 1000) / V = ({result.currentKVA.toFixed(1)} × 1000) /{' '}
                          {supplyVoltage} = {result.currentBefore.toFixed(1)}A
                        </p>
                        <p>
                          I (after) = ({result.targetKVA.toFixed(1)} × 1000) / {supplyVoltage} ={' '}
                          {result.currentAfter.toFixed(1)}A
                        </p>
                      </>
                    )}
                    <p>
                      Saved ={' '}
                      <span className="text-white font-bold">
                        {result.currentSaved.toFixed(1)}A ({result.percentageReduction.toFixed(1)}%)
                      </span>
                    </p>
                  </div>
                </div>

                {/* Step 6 */}
                {(result.annualReactiveSavings > 0 || result.annualMDSavings > 0) && (
                  <div className="pt-2 border-t border-purple-500/20">
                    <p className="text-xs text-purple-400 mb-1">Step 6: Annual savings</p>
                    <div className="pl-3 border-l-2 border-purple-500/30 space-y-0.5">
                      {result.annualReactiveSavings > 0 && (
                        <p>
                          Reactive savings = {result.requiredKVAR.toFixed(1)} × {operatingHours}hrs
                          × £{reactiveCharge}/kVARh = £{result.annualReactiveSavings.toFixed(0)}/yr
                        </p>
                      )}
                      {result.annualMDSavings > 0 && (
                        <p>
                          MD savings = {(result.currentKVA - result.targetKVA).toFixed(1)} kVA × £
                          {kvaChargeRate}/kVA/month × 12 = £{result.annualMDSavings.toFixed(0)}/yr
                        </p>
                      )}
                      <p>
                        Total ={' '}
                        <span className="text-white font-bold">
                          £{result.annualTotalSavings.toFixed(0)}/year
                        </span>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </>
      )}

      {/* Reference — always visible */}
      <Collapsible open={showReference} onOpenChange={setShowReference}>
        <CollapsibleTrigger className="calculator-collapsible-trigger w-full">
          <div className="flex items-center gap-3">
            <BookOpen className="h-4 w-4" style={{ color: config.gradientFrom }} />
            <span className="text-sm sm:text-base font-medium text-white">PFC Guidance</span>
          </div>
          <ChevronDown
            className={cn(
              'h-4 w-4 text-white transition-transform duration-200',
              showReference && 'rotate-180'
            )}
          />
        </CollapsibleTrigger>

        <CollapsibleContent className="p-4 pt-2">
          <div className="space-y-3 text-sm text-white">
            <p>
              <strong style={{ color: config.gradientFrom }}>Why Correct Power Factor?</strong>
            </p>
            <ul className="space-y-1 ml-4">
              <li>• Avoid reactive power charges (typically £0.003-0.01/kVARh)</li>
              <li>• Reduce cable losses (I²R)</li>
              <li>• Free up transformer capacity</li>
              <li>• Improve voltage regulation</li>
              <li>• Reduce kVA demand charges (many DNOs charge on kVA)</li>
            </ul>
            <p>
              <strong style={{ color: config.gradientFrom }}>Typical Power Factors:</strong>
            </p>
            <ul className="space-y-1 ml-4">
              <li>• Motors (part load): 0.5-0.7</li>
              <li>• Motors (full load): 0.8-0.9</li>
              <li>• Fluorescent lighting: 0.5-0.6</li>
              <li>• LED lighting: 0.9-0.95</li>
              <li>• Welders: 0.5-0.7</li>
            </ul>

            <p className="pt-2 border-t border-white/10">
              <strong style={{ color: config.gradientFrom }}>BS 7671 / IET Guidance:</strong>
            </p>
            {/*
              FIX (audit 2026-08): both citations here were wrong.
              "Section 331: Consider power factor when sizing cables" — Section 331 is
              Compatibility of Characteristics, and power factor is item (l) of the Reg 331.1
              assessment list; it says nothing about cable sizing. (The audit proposed Reg 125.8
              as the cable-sizing citation — that regulation does not exist in the printed
              A4:2026 text, so it has NOT been used.)
              "Section 555: PFC equipment must be rated for harmonics" — Section 555 is
              TRANSFORMERS (555.1 autotransformers and step-up transformers, 555.1.1–555.1.3),
              and Section 556 is NOT USED. Nothing in Section 555 concerns power-factor
              correction or harmonics. Harmonic currents are Reg 331.1(f); capacitor-bank
              switching overvoltages are Reg 443.4.2, which names capacitor banks explicitly.
            */}
            <ul className="space-y-1 ml-4 text-xs">
              <li>
                • <strong>Reg 331.1(l):</strong> Power factor shall be assessed as a characteristic
                of equipment likely to have harmful effects on other equipment or services, or to
                impair the supply
              </li>
              <li>
                • <strong>Reg 331.1(f):</strong> Harmonic currents shall be assessed — relevant
                wherever capacitors are added to a distorted supply
              </li>
              <li>
                • <strong>Reg 443.4.2:</strong> Protection against switching overvoltages shall be
                considered where capacitive equipment such as capacitor banks is installed
              </li>
              <li>
                • <strong>Reg 512.1.2(a):</strong> Equipment shall be suitable for the design
                current, taking capacitive and inductive effects into account
              </li>
              <li>
                • <strong>Regs 462.4 / 416.2.5:</strong> Means of discharge for residual energy,
                plus a warning label on enclosures holding a capacitor that may retain a dangerous
                charge
              </li>
              <li>• Target PF of 0.95+ avoids most utility penalties</li>
              <li>• Over-correction (leading PF) can cause voltage rise</li>
            </ul>

            <div className="mt-2 p-2 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-xs text-white">
                <strong>Warning:</strong> Where the supply is distorted by VFDs, LED drivers or
                switch-mode power supplies, plain capacitors can resonate with the supply
                impedance and amplify harmonics. Detuned reactors are the usual remedy — the
                detuning ratio is set by the site harmonic survey and the manufacturer&apos;s
                selection, not by BS 7671, which requires only that harmonic currents be assessed
                (Reg 331.1(f)).
              </p>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
      <CalculatorEditorial content={powerFactorCorrectionContent} category="power" />
    </CalculatorCard>
  );
};

export default PowerFactorCorrectionCalculator;
