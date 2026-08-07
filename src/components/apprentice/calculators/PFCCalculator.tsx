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
  ResultValue,
  ResultsGrid,
  ResultBadge,
  CalculatorFormula,
  CalculatorDivider,
  CalculatorEditorial,
  FormulaReference,
  CALCULATOR_CONFIG,
  CalculatorPanes,
} from '@/components/calculators/shared';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { pfcContent } from './content/pfc';

const CAT = 'protection' as const;
const config = CALCULATOR_CONFIG[CAT];

interface PFCResult {
  /** The reported PFC — the greatest of the values determined below. */
  pfcValue: number;
  /** Which fault the reported PFC comes from. */
  pfcBasis: string;
  /** Prospective earth fault current, U₀ / (Ze + R1+R2). */
  earthFaultCurrent: number;
  /** Prospective short-circuit current, line–neutral, U₀ / Z(L-N). */
  shortCircuitLN: number;
  /** Three-phase values (null on a single-phase system). */
  shortCircuit3Ph: number | null;
  shortCircuitLL: number | null;
  assessmentLevel: string;
  recommendations: string[];
  breakingCapacity: string;
  zsTotal: number;
  zeValue: number;
  r1r2Value: number;
  zLineNeutralValue: number;
  voltage: number;
  isThreePhase: boolean;
}

const systemTypeOptions = [
  { value: 'single-phase', label: 'Single Phase (230V line–neutral)' },
  { value: 'three-phase', label: 'Three Phase (400V line–line, 230V line–neutral)' },
];

/** Parse a user-entered number, returning null unless it is finite and > 0. */
const parsePositive = (raw: string): number | null => {
  const n = parseFloat(raw);
  return Number.isFinite(n) && n > 0 ? n : null;
};

const PFCCalculator = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const [voltage, setVoltage] = useState('230');
  const [systemType, setSystemType] = useState('');
  const [zeValue, setZeValue] = useState('');
  const [r1r2Value, setR1r2Value] = useState('');
  const [zLineNeutral, setZLineNeutral] = useState('');
  const [result, setResult] = useState<PFCResult | null>(null);

  // Collapsibles
  const [showGuidance, setShowGuidance] = useState(false);

  const handleCalculate = useCallback(() => {
    if (!systemType) return;

    // FIX (audit): the previous guard used truthiness on the raw strings, so
    // Ze = '0' and R1+R2 = '0' passed it and the division produced Infinity.
    // A PFC is only defined for a loop impedance greater than zero.
    const uo = parsePositive(voltage);
    const ze = parsePositive(zeValue);
    const r1r2 = parsePositive(r1r2Value);
    const zln = parsePositive(zLineNeutral);
    if (uo === null || ze === null || r1r2 === null || zln === null) {
      toast({
        title: 'Check the inputs',
        description: 'Voltage and every impedance must be a number greater than zero.',
      });
      return;
    }

    const isThreePhase = systemType === 'three-phase';

    // U₀ is the nominal LINE-TO-NEUTRAL voltage on both single- and three-phase
    // supplies. The 400 V figure is line-to-line and is not used here — every
    // loop impedance entered is measured against neutral or Earth.
    const zsTotal = ze + r1r2;

    // BS 7671 Appendix 14: "In a single-phase system the prospective fault
    // current is the greater of either the fault current between the line
    // conductor and neutral or the fault current between line conductor and
    // Earth." The tool previously only ever computed the line–earth value.
    const earthFaultCurrent = uo / zsTotal;
    const shortCircuitLN = uo / zln;

    // BS 7671 Appendix 14: "In a three-phase installation the highest
    // prospective fault current occurs with a simultaneous fault between all
    // line conductors... determined by measurement between line and neutral
    // multiplied by 2", and the line-to-line value is the line–neutral
    // measurement multiplied by √3. Corroborated by GN3 clause 2.29 and OSG
    // clause 10.3.7 (three-phase level ≈ twice the single-phase value).
    // Previously the three-phase selection applied no multiplier at all, so a
    // three-phase board returned the single-phase figure.
    const shortCircuit3Ph = isThreePhase ? shortCircuitLN * 2 : null;
    const shortCircuitLL = isThreePhase ? shortCircuitLN * Math.sqrt(3) : null;

    const candidates: { value: number; basis: string }[] = [
      { value: earthFaultCurrent, basis: 'line–earth (earth fault loop)' },
      { value: shortCircuitLN, basis: 'line–neutral short-circuit' },
    ];
    if (shortCircuit3Ph !== null) {
      candidates.push({ value: shortCircuit3Ph, basis: 'three-phase (all line conductors)' });
    }
    const highest = candidates.reduce((a, b) => (b.value > a.value ? b : a));
    const pfcValue = highest.value;

    let assessmentLevel: string;
    let recommendations: string[];
    let breakingCapacity: string;

    // Reg 432.1/432.3: the device shall be capable of breaking any overcurrent
    // up to and including the maximum prospective fault current at the point
    // where it is installed, except as permitted by Reg 434.5.1.
    if (pfcValue < 1000) {
      assessmentLevel = 'Low';
      recommendations = [
        'PFC is low — a device with a 6 kA rated breaking capacity covers it (Reg 432.1)',
        'Still confirm the device disconnects within the time required by Reg 411.3.2.2',
        'Remember PFC is highest at the origin — check the main switch position too',
      ];
      breakingCapacity = '6 kA';
    } else if (pfcValue <= 6000) {
      assessmentLevel = 'Medium';
      recommendations = [
        'A device with a rated breaking capacity of at least 6 kA is required (Reg 432.1)',
        'Check the manufacturer’s declared breaking capacity for the actual device — not the range',
        'Where an RCCB or switch is used, its manufacturer-declared rated conditional short-circuit current (with the declared upstream device) must also exceed this value',
      ];
      breakingCapacity = '6 kA';
    } else if (pfcValue <= 10000) {
      assessmentLevel = 'High';
      recommendations = [
        'A device with a rated breaking capacity of at least 10 kA is required (Reg 432.1)',
        'Where the device standard declares both a service (Ics) and an ultimate (Icu) short-circuit breaking capacity, selection on the ultimate value for maximum fault conditions is acceptable (Reg 533.3)',
        'Verify coordination with the upstream device before relying on it',
      ];
      breakingCapacity = '10 kA';
    } else {
      assessmentLevel = 'Very High';
      // FIX (audit): this branch used to demand "16 kA MCBs". BS 7671 does not
      // publish device breaking capacities, and 16 kA appears in it only as the
      // CONDITIONAL short-circuit rating of a consumer unit assembly type-tested
      // to Annex ZB of BS EN 61439-3 (Reg 536.4.5) — not as an MCB rating.
      recommendations = [
        'Above 10 kA the device must carry a manufacturer-declared breaking capacity not less than this PFC (Reg 432.1) — typically a device to BS EN 60947-2 rather than a household MCB',
        'Alternatively, Reg 434.5.1 permits a device with a LOWER rated breaking capacity where combined short-circuit protection is provided by an upstream device; the downstream manufacturer’s instructions must declare the combination (Reg 536.4.2.1, 536.6)',
        'Assemblies are rated by conditional short-circuit current (Icc), short-time withstand (Icw) and peak withstand (Ipk) — check the assembly, not just the breaker (Reg 536.4.5)',
        'Domestic note: a consumer unit to BS EN 61439-3 carries a 16 kA conditional short-circuit rating from the Annex ZB test; that is an assembly rating, not a device breaking capacity',
      ];
      breakingCapacity = 'Above 10 kA';
    }

    setResult({
      pfcValue,
      pfcBasis: highest.basis,
      earthFaultCurrent,
      shortCircuitLN,
      shortCircuit3Ph,
      shortCircuitLL,
      assessmentLevel,
      recommendations,
      breakingCapacity,
      zsTotal,
      zeValue: ze,
      r1r2Value: r1r2,
      zLineNeutralValue: zln,
      voltage: uo,
      isThreePhase,
    });
  }, [voltage, zeValue, r1r2Value, zLineNeutral, systemType, toast]);

  const handleReset = useCallback(() => {
    setVoltage('230');
    setSystemType('');
    setZeValue('');
    setR1r2Value('');
    setZLineNeutral('');
    setResult(null);
  }, []);

  const handleCopy = () => {
    if (!result) return;
    let text = `Prospective Fault Current\nPFC: ${result.pfcValue.toFixed(0)} A (${(result.pfcValue / 1000).toFixed(2)} kA) — ${result.pfcBasis}`;
    text += `\nLine–earth: ${result.earthFaultCurrent.toFixed(0)} A (Zs ${result.zsTotal.toFixed(3)} Ω)`;
    text += `\nLine–neutral: ${result.shortCircuitLN.toFixed(0)} A (Z ${result.zLineNeutralValue} Ω)`;
    if (result.shortCircuit3Ph !== null && result.shortCircuitLL !== null) {
      text += `\nLine–line (×√3): ${result.shortCircuitLL.toFixed(0)} A`;
      text += `\nThree-phase (×2): ${result.shortCircuit3Ph.toFixed(0)} A`;
    }
    text += `\nZe: ${result.zeValue} Ω | R1+R2: ${result.r1r2Value} Ω | U₀: ${result.voltage} V`;
    text += `\nAssessment: ${result.assessmentLevel}`;
    text += `\nMinimum breaking capacity: ${result.breakingCapacity}`;
    copyToClipboard(text).then((ok) => {
      if (ok) {
        setCopied(true);
        toast({ title: 'Copied to clipboard' });
        setTimeout(() => setCopied(false), 2000);
      }
    });
  };

  const getAssessmentBadge = (level: string): 'pass' | 'fail' | 'warning' | 'info' => {
    switch (level) {
      case 'Low':
        return 'pass';
      case 'Medium':
        return 'info';
      case 'High':
        return 'warning';
      case 'Very High':
        return 'fail';
      default:
        return 'info';
    }
  };

  const isValid =
    !!systemType &&
    parsePositive(voltage) !== null &&
    parsePositive(zeValue) !== null &&
    parsePositive(r1r2Value) !== null &&
    parsePositive(zLineNeutral) !== null;

  return (
    <CalculatorCard
      category={CAT}
      title="Prospective Fault Current Calculator"
      description="Calculate prospective fault current and assess protective device requirements"
    >
      <CalculatorPanes
        form={
          <>
            <CalculatorSelect
              label="System Type"
              value={systemType}
              onChange={setSystemType}
              options={systemTypeOptions}
              placeholder="Select system type"
            />

            <CalculatorInput
              label="U₀ — Nominal Line-to-Neutral Voltage"
              unit="V"
              type="text"
              inputMode="decimal"
              value={voltage}
              onChange={setVoltage}
              placeholder="e.g., 230"
              hint="230 V on both single- and three-phase UK supplies — 400 V is the line-to-line figure and is not used here"
            />

            <CalculatorInput
              label="Ze — External Loop Impedance"
              unit="Ω"
              type="text"
              inputMode="decimal"
              value={zeValue}
              onChange={setZeValue}
              placeholder="e.g., 0.35"
              hint="External earth loop impedance (supply authority)"
            />

            <CalculatorInput
              label="R1+R2 — Circuit Impedance"
              unit="Ω"
              type="text"
              inputMode="decimal"
              value={r1r2Value}
              onChange={setR1r2Value}
              placeholder="e.g., 0.15"
              hint="Circuit conductor resistance (line + protective)"
            />

            <CalculatorInput
              label="Line–Neutral Loop Impedance"
              unit="Ω"
              type="text"
              inputMode="decimal"
              value={zLineNeutral}
              onChange={setZLineNeutral}
              placeholder="e.g., 0.30"
              hint="Measured or calculated line–neutral loop. Appendix 14 takes the PFC as the greater of the line–neutral and line–earth values, so both are needed"
            />

            <CalculatorActions
              category={CAT}
              onCalculate={handleCalculate}
              onReset={handleReset}
              isDisabled={!isValid}
              calculateLabel="Calculate PFC"
              showReset={!!result}
            />
          </>
        }
        result={
          <>
            {/* ── Results ── */}
            {result && (
              <div className="space-y-4 animate-fade-in">
                {/* Status + Copy */}
                <div className="flex items-center justify-between">
                  <ResultBadge
                    status={getAssessmentBadge(result.assessmentLevel)}
                    label={`${result.assessmentLevel} PFC Level`}
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
                  <p className="text-sm font-medium text-white mb-1">Prospective Fault Current</p>
                  <p
                    className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent"
                    style={{
                      backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                    }}
                  >
                    {result.pfcValue.toFixed(0)} A
                  </p>
                  <p className="text-sm text-white mt-2">
                    ({(result.pfcValue / 1000).toFixed(2)} kA)
                  </p>
                  <p className="text-xs text-white mt-1">Greatest value — {result.pfcBasis}</p>
                </div>

                {/* Result cards — every fault type Appendix 14 asks for, not just the loop */}
                <ResultsGrid columns={2}>
                  <ResultValue
                    label="Line–earth fault current"
                    value={result.earthFaultCurrent.toFixed(0)}
                    unit="A"
                    category={CAT}
                    size="sm"
                  />
                  <ResultValue
                    label="Line–neutral fault current"
                    value={result.shortCircuitLN.toFixed(0)}
                    unit="A"
                    category={CAT}
                    size="sm"
                  />
                </ResultsGrid>

                {result.isThreePhase &&
                  result.shortCircuit3Ph !== null &&
                  result.shortCircuitLL !== null && (
                    <ResultsGrid columns={2}>
                      <ResultValue
                        label="Line–line (× √3)"
                        value={result.shortCircuitLL.toFixed(0)}
                        unit="A"
                        category={CAT}
                        size="sm"
                      />
                      <ResultValue
                        label="All three lines (× 2)"
                        value={result.shortCircuit3Ph.toFixed(0)}
                        unit="A"
                        category={CAT}
                        size="sm"
                      />
                    </ResultsGrid>
                  )}

                <ResultsGrid columns={2}>
                  <ResultValue
                    label="Zs (Earth Fault Loop)"
                    value={result.zsTotal.toFixed(3)}
                    unit="Ω"
                    category={CAT}
                    size="sm"
                  />
                  <ResultValue
                    label="Min. Breaking Capacity"
                    value={result.breakingCapacity}
                    category={CAT}
                    size="sm"
                  />
                </ResultsGrid>

                {/* Assessment comparison */}
                <div
                  className={cn(
                    'flex items-center justify-between p-3 rounded-lg border text-sm',
                    result.assessmentLevel === 'Low' || result.assessmentLevel === 'Medium'
                      ? 'bg-green-500/5 border-green-500/20'
                      : 'bg-amber-500/5 border-amber-500/20'
                  )}
                >
                  <div className="flex items-center gap-2">
                    {result.assessmentLevel === 'Low' || result.assessmentLevel === 'Medium' ? (
                      <CheckCircle className="h-4 w-4 text-green-400 shrink-0" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />
                    )}
                    <span className="text-white font-medium">Device Requirement</span>
                  </div>
                  <span className="text-white shrink-0 ml-2">
                    {result.breakingCapacity} breaking capacity
                  </span>
                </div>

                {/* Recommendations */}
                <div className="space-y-1.5">
                  {result.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm text-white">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      {rec}
                    </div>
                  ))}
                </div>

                <CalculatorDivider category={CAT} />

                {/* ── How It Worked Out ── */}
                <CalculatorFormula
                  category={CAT}
                  title="How It Worked Out"
                  defaultOpen
                  steps={[
                    {
                      label: 'Input values',
                      formula: `U₀ = ${result.voltage} V | Ze = ${result.zeValue} Ω | R1+R2 = ${result.r1r2Value} Ω | Z(L–N) = ${result.zLineNeutralValue} Ω`,
                      description: `Ze (${result.zeValue} Ω) is the supply impedance from the DNO transformer. R1+R2 (${result.r1r2Value} Ω) is the circuit conductor resistance from the board to the furthest point. U₀ is the nominal line-to-neutral voltage — 230 V on both single- and three-phase supplies.`,
                    },
                    {
                      label: 'Earth fault loop impedance',
                      formula: `Zs = Ze + (R1+R2) = ${result.zeValue} + ${result.r1r2Value}`,
                      value: `${result.zsTotal.toFixed(3)} Ω`,
                      description:
                        'The total earth fault loop impedance determines how much current flows during a line-to-earth fault — lower impedance means higher fault current.',
                    },
                    {
                      label: 'Line–earth fault current',
                      formula: `I = U₀ / Zs = ${result.voltage} / ${result.zsTotal.toFixed(3)}`,
                      value: `${result.earthFaultCurrent.toFixed(0)} A`,
                      description: 'The prospective earth fault current at this point.',
                    },
                    {
                      label: 'Line–neutral fault current',
                      formula: `I = U₀ / Z(L–N) = ${result.voltage} / ${result.zLineNeutralValue}`,
                      value: `${result.shortCircuitLN.toFixed(0)} A`,
                      description:
                        'The prospective short-circuit current. BS 7671 Appendix 14: in a single-phase system the PFC is the greater of the line–neutral and the line–earth value, so both have to be worked out.',
                    },
                    ...(result.isThreePhase &&
                    result.shortCircuitLL !== null &&
                    result.shortCircuit3Ph !== null
                      ? [
                          {
                            label: 'Three-phase fault currents',
                            formula: `Line–line ≈ ${result.shortCircuitLN.toFixed(0)} × √3 = ${result.shortCircuitLL.toFixed(0)} A | All three lines ≈ ${result.shortCircuitLN.toFixed(0)} × 2 = ${result.shortCircuit3Ph.toFixed(0)} A`,
                            value: `${result.shortCircuit3Ph.toFixed(0)} A`,
                            description:
                              'BS 7671 Appendix 14: the highest prospective fault current in a three-phase installation occurs on a simultaneous fault between all line conductors, approximated as the line–neutral measurement × 2. The line-to-line value is the line–neutral measurement × √3.',
                          },
                        ]
                      : []),
                    {
                      label: 'Prospective fault current',
                      value: `${result.pfcValue.toFixed(0)} A (${(result.pfcValue / 1000).toFixed(2)} kA) — ${result.pfcBasis}`,
                      description:
                        'The greatest of the values above. Every protective device at this point must be able to safely interrupt it.',
                    },
                    {
                      label: 'Breaking capacity assessment',
                      value: `${result.assessmentLevel} level — minimum ${result.breakingCapacity} rated breaking capacity`,
                      description:
                        result.pfcValue <= 6000
                          ? 'A device with a declared breaking capacity of at least 6 kA satisfies Reg 432.1 here. Most domestic consumer units use 6 kA devices.'
                          : result.pfcValue <= 10000
                            ? 'A 6 kA device is not adequate. Specify a device with a declared breaking capacity of at least 10 kA (Reg 432.1).'
                            : 'Above 10 kA the device needs a manufacturer-declared breaking capacity not less than this PFC — or Reg 434.5.1 combined short-circuit protection with an upstream device, declared by the downstream manufacturer (Reg 536.4.2.1, 536.6).',
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
                        <p className="text-sm text-white font-medium">What Is PFC?</p>
                        <p className="text-sm text-white">
                          Prospective Fault Current is the maximum current that would flow if a dead
                          short circuit occurred at a given point. Think of it as the worst-case
                          scenario — every protective device must be able to safely interrupt this
                          current without exploding, arcing, or starting a fire.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-white font-medium">Which Fault Counts</p>
                        <p className="text-sm text-white">
                          BS 7671 Appendix 14: in a single-phase system the PFC is the greater of
                          the line–neutral fault current and the line–earth fault current. In a
                          three-phase installation the highest value comes from a simultaneous fault
                          between all three line conductors — roughly twice the line–neutral figure.
                          Reporting the earth fault loop value alone, or the single-phase value on a
                          three-phase board, under-states the answer.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-white font-medium">
                          What Happens If You Get It Wrong
                        </p>
                        <p className="text-sm text-white">
                          If the fault current exceeds the breaking capacity of the protective
                          device, the device cannot safely interrupt the fault. This can cause the
                          device to arc internally, weld its contacts shut, or blow apart — creating
                          fire risk and leaving the circuit unprotected.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-white font-medium">Breaking Capacity Guide</p>
                        <ul className="space-y-1">
                          <li className="flex items-start gap-2 text-sm text-white">
                            <span
                              className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                              style={{ backgroundColor: config.gradientFrom }}
                            />
                            6 kA devices: suitable for most domestic installations (PFC up to 6000
                            A)
                          </li>
                          <li className="flex items-start gap-2 text-sm text-white">
                            <span
                              className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                              style={{ backgroundColor: config.gradientFrom }}
                            />
                            10 kA devices: commercial premises or installations close to a
                            transformer
                          </li>
                          {/* FIX (audit): this list used to advertise "16kA+ devices". BS 7671
                          publishes no device breaking capacities, and 16 kA appears in it only
                          as the conditional short-circuit rating of a consumer unit assembly
                          type-tested to Annex ZB of BS EN 61439-3 (Reg 536.4.5). */}
                          <li className="flex items-start gap-2 text-sm text-white">
                            <span
                              className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                              style={{ backgroundColor: config.gradientFrom }}
                            />
                            Above 10 kA: the device must carry a manufacturer-declared breaking
                            capacity not less than the PFC (Reg 432.1) — usually a device to BS EN
                            60947-2 rather than a household MCB
                          </li>
                          <li className="flex items-start gap-2 text-sm text-white">
                            <span
                              className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                              style={{ backgroundColor: config.gradientFrom }}
                            />
                            Reg 434.5.1 also permits a LOWER breaking capacity where combined
                            short-circuit protection is provided by an upstream device — but only
                            where the downstream manufacturer declares the combination (Reg
                            536.4.2.1, 536.6)
                          </li>
                          <li className="flex items-start gap-2 text-sm text-white">
                            <span
                              className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                              style={{ backgroundColor: config.gradientFrom }}
                            />
                            &ldquo;16 kA&rdquo; is an assembly rating, not an MCB rating: a consumer
                            unit to BS EN 61439-3 carries a 16 kA conditional short-circuit rating
                            from the Annex ZB test (Reg 536.4.5)
                          </li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-white font-medium">
                          Typical Ze Values (DNO Supply)
                        </p>
                        <ul className="space-y-1">
                          <li className="flex items-start gap-2 text-sm text-white">
                            <span
                              className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                              style={{ backgroundColor: config.gradientFrom }}
                            />
                            TN-C-S (PME): 0.35Ω max — most modern UK domestic
                          </li>
                          <li className="flex items-start gap-2 text-sm text-white">
                            <span
                              className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                              style={{ backgroundColor: config.gradientFrom }}
                            />
                            TN-S (separate earth): 0.8Ω max — older properties with lead sheath
                            earth
                          </li>
                          <li className="flex items-start gap-2 text-sm text-white">
                            <span
                              className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                              style={{ backgroundColor: config.gradientFrom }}
                            />
                            TT: Varies — check with DNO, earth electrode resistance dominates
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
              name="Prospective Fault Current"
              formula="PFC = greatest of  U₀/Zs,  U₀/Z(L–N),  and (three-phase) 2 × U₀/Z(L–N)"
              variables={[
                {
                  symbol: 'PFC',
                  description: 'Prospective fault current (A) — BS 7671 Appendix 14',
                },
                {
                  symbol: 'U₀',
                  description: 'Nominal line-to-neutral voltage (V), 230 V in the UK',
                },
                { symbol: 'Zs', description: 'Earth fault loop impedance, Ze + (R1+R2) (Ω)' },
                { symbol: 'Z(L–N)', description: 'Line–neutral loop impedance (Ω)' },
                {
                  symbol: '× √3',
                  description: 'Line-to-line value from the line–neutral measurement',
                },
                { symbol: '× 2', description: 'Simultaneous fault on all three line conductors' },
              ]}
            />
          </>
        }
        footer={<CalculatorEditorial content={pfcContent} category={CAT} />}
      />
    </CalculatorCard>
  );
};

export default PFCCalculator;
