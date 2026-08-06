import { useState, useMemo } from 'react';
import { copyToClipboard } from '@/utils/clipboard';
import { ChevronDown, AlertTriangle, Copy, Check } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import {
  CalculatorCard,
  CalculatorInput,
  CalculatorSelect,
  CalculatorActions,
  CalculatorDivider,
  CalculatorInputGrid,
  CalculatorSection,
  ResultValue,
  ResultsGrid,
  ResultBadge,
  CalculatorFormula,
  FormulaReference,
  CalculatorEditorial,
  CALCULATOR_CONFIG,
} from '@/components/calculators/shared';
import { motorStartingCurrentContent } from './content/motor-starting-current';
import {
  calculateMotorStarting,
  MotorStartingInputs,
} from '@/lib/calculators/engines/motorStartingEngine';

const CAT = 'power' as const;
const config = CALCULATOR_CONFIG[CAT];

interface MotorResult {
  fullLoadCurrent: number;
  startingCurrent: number;
  startingMultiplier: number;
  startingKva: number;
  thermalStress: number;
  voltageDropRunning: number;
  voltageDropStarting: number;
  voltageDropLimit: number;
  complianceStatus: string;
  recommendedCableSize: string;
  minimumCableSize: number | null;
  referenceMethodLabel: string;
  deratingSummary: string;
  cableAnalysis: string;
  currentCapacityCheck: string;
  protectionAnalysis: string;
  whatThisMeans: string[];
  practicalGuidance: string[];
  recommendations: string[];
  notes: string[];
  warnings: string[];
  bs7671Compliant: boolean;
}

const MotorStartingCurrentCalculator = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const [power, setPower] = useState('');
  const [voltage, setVoltage] = useState('400');
  const [efficiency, setEfficiency] = useState('0.85');
  const [powerFactor, setPowerFactor] = useState('0.85');
  const [startingMethod, setStartingMethod] = useState('direct');
  const [phases, setPhases] = useState('3');
  const [loadType, setLoadType] = useState('standard');
  const [serviceTemperature, setServiceTemperature] = useState('40');
  const [ratedCurrent, setRatedCurrent] = useState('');
  const [startingTime, setStartingTime] = useState('2');
  const [cableLength, setCableLength] = useState('50');
  const [cableSize, setCableSize] = useState('');
  const [breakerRating, setBreakerRating] = useState('');
  const [cableType, setCableType] = useState('pvc-single');
  const [installationMethod, setInstallationMethod] = useState('clipped-direct');
  // Cg now comes from Table 4C1 via the engine — the user picks the number of
  // circuits and the arrangement instead of typing a factor from memory.
  const [groupingCircuits, setGroupingCircuits] = useState('1');
  const [groupingArrangement, setGroupingArrangement] = useState('bunched');

  const [showInstallation, setShowInstallation] = useState(false);
  const [showGuidance, setShowGuidance] = useState(false);
  const [showReference, setShowReference] = useState(false);
  const [result, setResult] = useState<MotorResult | null>(null);

  const canCalculate = useMemo(() => parseFloat(power) > 0, [power]);

  const handleCalculate = () => {
    const P = parseFloat(power);
    const V = parseFloat(voltage);
    const eff = parseFloat(efficiency);
    const pf = parseFloat(powerFactor);

    if (!(P > 0 && V > 0 && eff > 0 && pf > 0)) return;

    const inputs: MotorStartingInputs = {
      powerKw: P,
      voltage: V,
      phases: phases === '3' ? 3 : 1,
      efficiency: eff,
      powerFactor: pf,
      startingMethod: startingMethod as MotorStartingInputs['startingMethod'],
      loadType: loadType as MotorStartingInputs['loadType'],
      ambientTemp: parseFloat(serviceTemperature),
      cableLength: parseFloat(cableLength),
      cableType: cableType as MotorStartingInputs['cableType'],
      installationMethod: installationMethod as MotorStartingInputs['installationMethod'],
      groupingCircuits: parseInt(groupingCircuits, 10) || 1,
      groupingArrangement: groupingArrangement as MotorStartingInputs['groupingArrangement'],
      ratedCurrent: ratedCurrent ? parseFloat(ratedCurrent) : undefined,
      startingTime: parseFloat(startingTime),
      // Previously collected and silently discarded. Both are now checked
      // against Reg 433.1.1 by the engine.
      proposedCableSize: cableSize ? parseFloat(cableSize) : undefined,
      proposedDeviceRating: breakerRating ? parseFloat(breakerRating) : undefined,
    };

    const r = calculateMotorStarting(inputs);

    const recommendedCableSize =
      r.recommendedCableSize !== null ? `${r.recommendedCableSize}mm²` : 'Not tabulated';
    let cableAnalysis =
      r.minimumCableSize === null
        ? 'No tabulated cable size satisfies this circuit — see warnings'
        : 'Cable sizing satisfies Reg 433.1.1 and Table 4Ab';
    if (
      r.recommendedCableSize !== null &&
      r.minimumCableSize !== null &&
      r.recommendedCableSize > r.minimumCableSize
    ) {
      cableAnalysis = `Upgrade from ${r.minimumCableSize}mm² to ${r.recommendedCableSize}mm² for voltage drop (Table 4Ab, ${r.voltageDropLimit}%)`;
    }

    const cc = r.currentCarryingCheck;
    // Reg 433.1.1 has three conditions, not one. The panel used to test Iz >= Ib
    // only, which skips the device entirely.
    const currentCapacityCheck = [
      `Ib ${cc.designCurrent.toFixed(1)}A · In ${cc.deviceRating}A · Iz ${cc.capacity.toFixed(1)}A`,
      `433.1.1(a) In ≥ Ib: ${cc.inNotLessThanIb ? 'pass' : 'FAIL'}`,
      `433.1.1(b) In ≤ Iz: ${cc.inNotGreaterThanIz ? 'pass' : 'FAIL'}`,
      `433.1.1(c) I₂ ≤ 1.45 Iz: ${cc.i2WithinOneFourFiveIz ? 'pass (via 433.1.201)' : 'FAIL'}`,
    ].join(' · ');

    const deratingSummary = `Ca ${cc.deratingBreakdown.ca.toFixed(2)} (Table 4B1) × Cg ${cc.deratingBreakdown.cg.toFixed(2)} (Table 4C1) × Cc ${cc.deratingBreakdown.cc.toFixed(2)} = ${cc.derating.toFixed(3)}`;

    const protectionAnalysis = r.protectionSuitable
      ? `${r.recommendedMcbRating}A ${r.protectionTypeLabel} — coordination satisfied`
      : `${r.recommendedMcbRating}A ${r.protectionTypeLabel} — coordination NOT satisfied, see warnings`;

    let complianceStatus = 'BS 7671 Compliant';
    if (!r.bs7671Compliant) {
      if (r.minimumCableSize === null) complianceStatus = 'No compliant cable size found';
      else if (!r.voltageDropCompliant)
        complianceStatus = `Non-compliant — running voltage drop exceeds ${r.voltageDropLimit}%`;
      else if (!r.protectionSuitable)
        complianceStatus = 'Non-compliant — Reg 433.1.1 coordination not satisfied';
      else complianceStatus = 'Review required for full compliance';
    }
    // 🔴 REMOVED: a "Consider reduced starting method (BS 7671 recommendation)"
    // status forced whenever a DOL motor exceeded 11 kW. BS 7671 contains no kW
    // threshold for the choice of starting method.

    const whatThisMeans: string[] = [
      `Full load current: ${r.fullLoadCurrent.toFixed(1)}A (Ib per Reg 552.1.1, plus a 25% design margin = ${cc.designCurrent.toFixed(1)}A)`,
      `Starting current: ${r.startingCurrent.toFixed(0)}A (${r.startingMultiplier.toFixed(1)}× full load current — a typical machine value, not a BS 7671 figure)`,
      `Supply demand: ${r.startingKva.toFixed(1)}kVA during motor starting`,
      `Running voltage drop: ${r.voltageDropRunning.toFixed(1)}% (Table 4Ab limit for "other uses": ${r.voltageDropLimit}%)`,
      `Starting voltage drop: ${r.voltageDropStarting.toFixed(1)}% — BS 7671 sets no limit (Reg 525.203); check the motor's product standard or manufacturer data`,
      `Sized on ${r.referenceMethodLabel}`,
    ];

    const practicalGuidance: string[] = [
      'Install the starter close to the distribution board to keep the run short',
      'Overload protection belongs in the motor control equipment (Reg 552.1.2), not only in the upstream device',
      'Test motor protection devices at the intervals set by the maintenance regime',
      `Protective device: ${r.protectionTypeLabel}`,
    ];

    setResult({
      fullLoadCurrent: r.fullLoadCurrent,
      startingCurrent: r.startingCurrent,
      startingMultiplier: r.startingMultiplier,
      startingKva: r.startingKva,
      thermalStress: r.thermalStress,
      voltageDropRunning: r.voltageDropRunning,
      voltageDropStarting: r.voltageDropStarting,
      voltageDropLimit: r.voltageDropLimit,
      complianceStatus,
      recommendedCableSize,
      minimumCableSize: r.minimumCableSize,
      referenceMethodLabel: r.referenceMethodLabel,
      deratingSummary,
      cableAnalysis,
      currentCapacityCheck,
      protectionAnalysis,
      whatThisMeans,
      practicalGuidance,
      recommendations: r.recommendations,
      notes: r.notes,
      warnings: r.warnings,
      bs7671Compliant: r.bs7671Compliant,
    });
  };

  const handleReset = () => {
    setPower('');
    setVoltage('400');
    setEfficiency('0.85');
    setPowerFactor('0.85');
    setStartingMethod('direct');
    setPhases('3');
    setLoadType('standard');
    setServiceTemperature('40');
    setRatedCurrent('');
    setStartingTime('2');
    setCableLength('50');
    setCableSize('');
    setBreakerRating('');
    setCableType('pvc-single');
    setInstallationMethod('clipped-direct');
    setGroupingCircuits('1');
    setGroupingArrangement('bunched');
    setResult(null);
  };

  const handleCopy = () => {
    if (!result) return;
    const text = [
      'Motor Starting Current Calculator Results',
      `Motor: ${power}kW | ${voltage}V | ${phases}-phase`,
      `Starting method: ${startingMethod}`,
      `Full load current: ${result.fullLoadCurrent.toFixed(1)} A`,
      `Starting current: ${result.startingCurrent.toFixed(0)} A (${result.startingMultiplier.toFixed(1)}×)`,
      `Starting kVA: ${result.startingKva.toFixed(1)} kVA`,
      `Voltage drop (running): ${result.voltageDropRunning.toFixed(1)}% (Table 4Ab limit ${result.voltageDropLimit}%)`,
      `Voltage drop (starting): ${result.voltageDropStarting.toFixed(1)}% (no BS 7671 limit — Reg 525.203)`,
      `I²t during starting: ${(result.thermalStress / 1000).toFixed(1)} kA²s`,
      `Installation: ${result.referenceMethodLabel}`,
      `Rating factors: ${result.deratingSummary}`,
      `Recommended cable: ${result.recommendedCableSize}`,
      `Reg 433.1.1: ${result.currentCapacityCheck}`,
      `Status: ${result.complianceStatus}`,
    ].join('\n');
    copyToClipboard(text);
    setCopied(true);
    toast({ title: 'Copied to clipboard' });
    setTimeout(() => setCopied(false), 2000);
  };

  const voltageOptions = [
    { value: '230', label: '230V (Single Phase)' },
    { value: '400', label: '400V (3-Phase)' },
    { value: '415', label: '415V (3-Phase)' },
    { value: '690', label: '690V (3-Phase)' },
  ];

  const phaseOptions = [
    { value: '1', label: 'Single Phase' },
    { value: '3', label: 'Three Phase' },
  ];

  const startingMethodOptions = [
    { value: 'direct', label: 'Direct On Line (DOL)' },
    { value: 'star-delta', label: 'Star-Delta' },
    { value: 'soft-starter', label: 'Soft Starter' },
    { value: 'vfd', label: 'Variable Frequency Drive' },
    { value: 'autotransformer', label: 'Auto-transformer' },
  ];

  const loadTypeOptions = [
    { value: 'standard', label: 'Standard Load' },
    { value: 'high-torque', label: 'High Torque (Conveyors)' },
    { value: 'low-torque', label: 'Low Torque (Fans)' },
    { value: 'centrifugal', label: 'Centrifugal Pumps' },
  ];

  // Values are the engine's installation-method keys, which map to the Table 4A2
  // reference methods. They used to be strings the engine did not recognise, so
  // every option silently resolved to Reference Method C.
  const installationMethodOptions = [
    { value: 'clipped-direct', label: 'Clipped direct (Method C)' },
    { value: 'conduit-on-wall', label: 'In conduit on a wall (Method B)' },
    { value: 'trunking-on-wall', label: 'In trunking on a wall (Method B)' },
    { value: 'tray', label: 'On a cable tray (Method E/F)' },
    { value: 'buried-duct', label: 'In ducting in the ground (Method D1)' },
  ];

  const cableTypeOptions = [
    { value: 'pvc-single', label: 'Single-core PVC, non-armoured (4D1A)' },
    { value: 'swa-pvc', label: 'Multicore PVC SWA (4D4A)' },
  ];

  // Table 4C1 rows.
  const groupingCircuitOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 12, 16, 20].map((n) => ({
    value: String(n),
    label: n === 1 ? '1 circuit (no grouping)' : `${n} circuits`,
  }));

  const groupingArrangementOptions = [
    { value: 'bunched', label: 'Bunched / enclosed (4C1 item 1)' },
    { value: 'single-layer-wall', label: 'Single layer on wall or floor (item 2)' },
    { value: 'single-layer-tray', label: 'Single layer on perforated tray (item 3)' },
    { value: 'single-layer-ladder', label: 'Single layer on ladder or cleats (item 4)' },
  ];

  return (
    <CalculatorCard
      category={CAT}
      title="Motor Starting Current Calculator"
      description="Calculate starting current, cable sizing, and protection for motors per BS 7671"
    >
      {/* Motor Details */}
      <CalculatorSection title="Motor Details">
        <CalculatorInputGrid columns={2}>
          <CalculatorInput
            label="Motor Power"
            unit="kW"
            type="text"
            inputMode="decimal"
            value={power}
            onChange={setPower}
            placeholder="e.g., 15"
            hint="Rated motor power from nameplate"
          />
          <CalculatorInput
            label="Rated Current"
            unit="A"
            type="text"
            inputMode="decimal"
            value={ratedCurrent}
            onChange={setRatedCurrent}
            placeholder="Optional"
            hint="Nameplate current if known"
          />
        </CalculatorInputGrid>
        <CalculatorInputGrid columns={2}>
          <CalculatorSelect
            label="Supply Voltage"
            value={voltage}
            onChange={setVoltage}
            options={voltageOptions}
          />
          <CalculatorSelect
            label="Phases"
            value={phases}
            onChange={setPhases}
            options={phaseOptions}
          />
        </CalculatorInputGrid>
        <CalculatorInputGrid columns={2}>
          <CalculatorInput
            label="Efficiency"
            type="text"
            inputMode="decimal"
            value={efficiency}
            onChange={setEfficiency}
            placeholder="e.g., 0.85"
            /* The old hint gave "IE3: 0.85, IE4: 0.90" as if efficiency were a
               constant per IE class. It is a function of rated power and pole
               count (IEC 60034-30-1), so the nameplate is the only right
               source and no fixed figure is offered. */
            hint="From the motor nameplate"
          />
          <CalculatorInput
            label="Power Factor"
            type="text"
            inputMode="decimal"
            value={powerFactor}
            onChange={setPowerFactor}
            placeholder="e.g., 0.85"
            hint="Typical: 0.8-0.9"
          />
        </CalculatorInputGrid>
      </CalculatorSection>

      <CalculatorDivider category={CAT} />

      {/* Starting & Protection */}
      <CalculatorSection title="Starting & Protection">
        <CalculatorInputGrid columns={2}>
          <CalculatorSelect
            label="Starting Method"
            value={startingMethod}
            onChange={setStartingMethod}
            options={startingMethodOptions}
          />
          <CalculatorSelect
            label="Load Type"
            value={loadType}
            onChange={setLoadType}
            options={loadTypeOptions}
          />
        </CalculatorInputGrid>
        <CalculatorInputGrid columns={2}>
          <CalculatorInput
            label="Starting Time"
            unit="sec"
            type="text"
            inputMode="decimal"
            value={startingTime}
            onChange={setStartingTime}
            placeholder="e.g., 2"
            hint="Time to reach full speed"
          />
          <CalculatorInput
            label="MCB Rating"
            unit="A"
            type="text"
            inputMode="decimal"
            value={breakerRating}
            onChange={setBreakerRating}
            placeholder="Optional"
            hint="Checked against Reg 433.1.1"
          />
        </CalculatorInputGrid>
      </CalculatorSection>

      {/* Installation Details - Collapsible */}
      <Collapsible open={showInstallation} onOpenChange={setShowInstallation}>
        <CollapsibleTrigger className="w-full flex items-center justify-between min-h-11 py-2.5 px-3 rounded-lg text-sm font-medium text-white hover:bg-white/5 transition-all touch-manipulation">
          <span>Installation Details</span>
          <ChevronDown
            className={cn(
              'h-4 w-4 transition-transform duration-200',
              showInstallation && 'rotate-180'
            )}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2 space-y-3">
          <CalculatorInputGrid columns={2}>
            <CalculatorInput
              label="Cable Length"
              unit="m"
              type="text"
              inputMode="decimal"
              value={cableLength}
              onChange={setCableLength}
              placeholder="e.g., 50"
              hint="Distance from DB"
            />
            <CalculatorInput
              label="Cable Size"
              unit="mm²"
              type="text"
              inputMode="decimal"
              value={cableSize}
              onChange={setCableSize}
              placeholder="Optional"
              hint="Checked against Reg 433.1.1"
            />
          </CalculatorInputGrid>
          <CalculatorInputGrid columns={2}>
            <CalculatorInput
              label="Ambient Temp"
              unit="°C"
              type="text"
              inputMode="decimal"
              value={serviceTemperature}
              onChange={setServiceTemperature}
              placeholder="e.g., 40"
              hint="Table 4B1 (Ca)"
            />
            <CalculatorSelect
              label="Cable Type"
              value={cableType}
              onChange={setCableType}
              options={cableTypeOptions}
            />
          </CalculatorInputGrid>
          <CalculatorInputGrid columns={2}>
            <CalculatorSelect
              label="Installation Method"
              value={installationMethod}
              onChange={setInstallationMethod}
              options={installationMethodOptions}
            />
            <CalculatorSelect
              label="Circuits in Group"
              value={groupingCircuits}
              onChange={setGroupingCircuits}
              options={groupingCircuitOptions}
            />
          </CalculatorInputGrid>
          <CalculatorInputGrid columns={1}>
            <CalculatorSelect
              label="Grouping Arrangement"
              value={groupingArrangement}
              onChange={setGroupingArrangement}
              options={groupingArrangementOptions}
            />
          </CalculatorInputGrid>
        </CollapsibleContent>
      </Collapsible>

      {/* Actions */}
      <CalculatorActions
        category={CAT}
        onCalculate={handleCalculate}
        onReset={handleReset}
        isDisabled={!canCalculate}
        calculateLabel="Calculate"
        showReset={!!result}
      />

      {/* ── Results ── */}
      {result && (
        <div className="space-y-4 animate-fade-in">
          {/* Status + Copy */}
          <div className="flex items-center justify-between">
            <ResultBadge
              status={result.bs7671Compliant ? 'pass' : 'warning'}
              label={result.complianceStatus}
            />
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-medium transition-colors touch-manipulation min-h-[44px]"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>

          {/* Hero Value */}
          <div className="text-center py-3">
            <p className="text-sm font-medium text-white mb-1">Full Load Current</p>
            <p
              className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
              }}
            >
              {result.fullLoadCurrent.toFixed(1)} A
            </p>
            <p className="text-sm text-white mt-2">
              Starting: {result.startingCurrent.toFixed(0)}A ({result.startingMultiplier.toFixed(1)}
              ×) · Cable: {result.recommendedCableSize}
            </p>
          </div>

          {/* Result Values */}
          <ResultsGrid columns={3}>
            <ResultValue
              label="Starting Current"
              value={result.startingCurrent.toFixed(0)}
              unit="A"
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="Start Multiplier"
              value={`${result.startingMultiplier.toFixed(1)}×`}
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="Running VD"
              value={result.voltageDropRunning.toFixed(1)}
              unit="%"
              category={CAT}
              size="sm"
            />
          </ResultsGrid>

          <ResultsGrid columns={2}>
            <ResultValue
              label="Starting kVA"
              value={result.startingKva.toFixed(1)}
              unit="kVA"
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="Starting VD"
              value={result.voltageDropStarting.toFixed(1)}
              unit="%"
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="I²t Thermal"
              value={(result.thermalStress / 1000).toFixed(1)}
              unit="kA²s"
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="Min Cable"
              value={result.minimumCableSize !== null ? result.minimumCableSize.toString() : '—'}
              unit="mm²"
              category={CAT}
              size="sm"
            />
          </ResultsGrid>

          {/* Analysis */}
          <div className="space-y-2">
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-sm text-white font-medium">Cable Analysis</p>
              <p className="text-sm text-white mt-1">{result.cableAnalysis}</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-sm text-white font-medium">
                Reg 433.1.1 Coordination (Ib ≤ In ≤ Iz)
              </p>
              <p className="text-sm text-white mt-1">{result.currentCapacityCheck}</p>
              <p className="text-sm text-white mt-1">{result.deratingSummary}</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-sm text-white font-medium">Protection Device</p>
              <p className="text-sm text-white mt-1">{result.protectionAnalysis}</p>
            </div>
          </div>

          {/* Warnings */}
          {result.warnings.length > 0 && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
              <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
              <div className="space-y-1">
                {result.warnings.map((warning, idx) => (
                  <p key={idx} className="text-sm text-white">
                    {warning}
                  </p>
                ))}
              </div>
            </div>
          )}

          <CalculatorDivider category={CAT} />

          {/* ── How It Worked Out ── */}
          <CalculatorFormula
            category={CAT}
            title="How It Worked Out"
            defaultOpen
            steps={[
              {
                label: 'Input values',
                formula: `Motor: ${power}kW | ${voltage}V | ${phases}-phase | η=${efficiency} | cosφ=${powerFactor} | ${startingMethod}`,
              },
              {
                label: 'Full load current',
                formula:
                  phases === '3'
                    ? `I = P ÷ (√3 × V × η × cosφ) = ${power}000 ÷ (1.732 × ${voltage} × ${efficiency} × ${powerFactor})`
                    : `I = P ÷ (V × η × cosφ) = ${power}000 ÷ (${voltage} × ${efficiency} × ${powerFactor})`,
                value: `${result.fullLoadCurrent.toFixed(1)} A`,
              },
              {
                label: 'Starting current',
                formula: `I_start = FLC × multiplier = ${result.fullLoadCurrent.toFixed(1)} × ${result.startingMultiplier.toFixed(1)}`,
                value: `${result.startingCurrent.toFixed(0)} A`,
                description: `${startingMethod} starting method`,
              },
              {
                label: 'Starting kVA',
                formula:
                  phases === '3'
                    ? `S = √3 × V × I_start ÷ 1000 = 1.732 × ${voltage} × ${result.startingCurrent.toFixed(0)} ÷ 1000`
                    : `S = V × I_start ÷ 1000 = ${voltage} × ${result.startingCurrent.toFixed(0)} ÷ 1000`,
                value: `${result.startingKva.toFixed(1)} kVA`,
              },
              {
                label: 'Cable sizing',
                formula: `It ≥ In ÷ (Ca × Cg × Cc) — Appendix 4 §5.1.1, on ${result.referenceMethodLabel}`,
                value: result.recommendedCableSize,
                description: result.deratingSummary,
              },
              {
                label: 'Voltage drop',
                formula: 'ΔU = (mV/A/m × Ib × L) ÷ 1000 — Appendix 4 §6 (tabulated value covers all circuit conductors)',
                value: `Running: ${result.voltageDropRunning.toFixed(1)}% (Table 4Ab limit ${result.voltageDropLimit}%) | Starting: ${result.voltageDropStarting.toFixed(1)}%`,
                description:
                  'BS 7671 sets no numeric limit on the starting drop — Reg 525.203 defers to the motor product standard or the manufacturer.',
              },
              {
                label: 'Thermal stress',
                formula: `I²t = I_start² × t = ${result.startingCurrent.toFixed(0)}² × ${startingTime}`,
                value: `${(result.thermalStress / 1000).toFixed(1)} kA²s`,
                description: 'Reported only — BS 7671 sets no I²t limit for starting current.',
              },
              {
                label: 'Protection recommendation',
                value: result.protectionAnalysis,
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
                className="p-3 rounded-xl border space-y-3"
                style={{
                  borderColor: `${config.gradientFrom}15`,
                  background: `${config.gradientFrom}05`,
                }}
              >
                <ul className="space-y-2">
                  {[...result.whatThisMeans, ...result.practicalGuidance].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      <span className="text-white">{item}</span>
                    </li>
                  ))}
                </ul>

                {result.recommendations.length > 0 && (
                  <div
                    className="pt-2 border-t"
                    style={{ borderColor: `${config.gradientFrom}15` }}
                  >
                    {/* Heading was "BS 7671 Recommendations" while the list carried
                        a 552.1.2 shall softened to "recommended" and an 11 kW DOL
                        threshold BS 7671 does not contain. */}
                    <p className="text-sm text-white font-medium mb-2">BS 7671 Requirements</p>
                    <ul className="space-y-2">
                      {result.recommendations.map((rec, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <span
                            className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                            style={{ backgroundColor: config.gradientFrom }}
                          />
                          <span className="text-white">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {result.notes.length > 0 && (
                  <div
                    className="pt-2 border-t"
                    style={{ borderColor: `${config.gradientFrom}15` }}
                  >
                    <p className="text-sm text-white font-medium mb-2">
                      What this calculator does not check
                    </p>
                    <ul className="space-y-2">
                      {result.notes.map((note, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <span
                            className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                            style={{ backgroundColor: config.gradientFrom }}
                          />
                          <span className="text-white">{note}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
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
                      reg: 'Regulation 552.1.1',
                      desc: 'Equipment suitable for at least the motor full-load current; cumulative starting effects on intermittent duty',
                    },
                    {
                      reg: 'Regulation 552.1.2',
                      desc: 'Motors above 0.37 kW shall have control equipment incorporating overload protection',
                    },
                    {
                      reg: 'Regulation 552.1.3',
                      desc: 'Means to prevent automatic restarting after a supply failure',
                    },
                    // 435.1 is "Protection afforded by one device" inside Section
                    // 435, Coordination of overload and fault current protection.
                    // Overload protection is Section 433.
                    {
                      reg: 'Regulation 433.1.1',
                      desc: 'Ib ≤ In ≤ Iz, and I₂ ≤ 1.45 Iz (see 433.1.201)',
                    },
                    // Table 41.3 is maximum Zs for circuit-breakers, not
                    // disconnection times — that is Table 41.1.
                    { reg: 'Table 41.1', desc: 'Maximum disconnection times' },
                    {
                      reg: 'Regulation 411.3.2.2',
                      desc: 'Automatic disconnection times — verify Zs separately',
                    },
                    { reg: 'Table 4Ab (Appendix 4 §6.4)', desc: 'Voltage drop limits' },
                    {
                      reg: 'Regulation 525.203',
                      desc: 'A greater drop is permitted during motor starting, to the product standard or manufacturer data',
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

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="space-y-1">
                    {/* These ranges are typical machine data. BS 7671 tabulates
                        no starting multipliers, so they are not presented as a
                        BS 7671 figure. The engine now uses the mid-point of each
                        range shown here — it previously used values below every
                        range on this panel. */}
                    <p className="text-sm text-white font-medium">
                      Typical Starting Multipliers (not a BS 7671 figure)
                    </p>
                    <p className="text-sm text-white">DOL: 6-8× FLC</p>
                    <p className="text-sm text-white">Star-Delta: 2-3× FLC</p>
                    <p className="text-sm text-white">Soft Start: 2-4× FLC</p>
                    <p className="text-sm text-white">VFD: 1-2× FLC</p>
                    <p className="text-sm text-white">Auto-transformer: 3-4× FLC</p>
                  </div>
                  <div className="space-y-1">
                    {/* Table 4Ab: 3% is the LIGHTING figure. A motor is "other
                        uses" — 5%. There is no BS 7671 starting-drop limit; the
                        old panel printed "Starting: 10% max" and "DOL: ≤11kW
                        recommended", neither of which is in the standard. */}
                    <p className="text-sm text-white font-medium">Voltage Drop — Table 4Ab</p>
                    <p className="text-sm text-white">Lighting: 3%</p>
                    <p className="text-sm text-white">Other uses (incl. motors): 5%</p>
                    <p className="text-sm text-white">Private LV supply: 6% / 8%</p>
                    <p className="text-sm text-white">
                      Starting: no BS 7671 limit — Reg 525.203
                    </p>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      )}

      {/* Formula Reference (always visible) */}
      <FormulaReference
        category={CAT}
        name="Motor Starting Current"
        formula="I_start = I_FLC × Starting Multiplier"
        variables={[
          { symbol: 'I_FLC', description: 'Full load current (A)' },
          {
            symbol: 'Multiplier',
            description:
              'Typical machine data (BS 7671 tabulates none): DOL=6-8×, Star-Delta=2-3×, Soft Start=2-4×, VFD=1-2×',
          },
          { symbol: 'I²t', description: 'Thermal stress (A²s)' },
        ]}
      />
      <CalculatorEditorial content={motorStartingCurrentContent} category={CAT} />
    </CalculatorCard>
  );
};

export default MotorStartingCurrentCalculator;
