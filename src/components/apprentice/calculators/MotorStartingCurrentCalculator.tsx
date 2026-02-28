import { useState, useMemo } from 'react';
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
  CALCULATOR_CONFIG,
} from '@/components/calculators/shared';
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
  complianceStatus: string;
  recommendedCableSize: string;
  minimumCableSize: number;
  cableAnalysis: string;
  currentCapacityCheck: string;
  protectionAnalysis: string;
  whatThisMeans: string[];
  practicalGuidance: string[];
  recommendations: string[];
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
  const [cableSize, setCableSize] = useState('2.5');
  const [breakerRating, setBreakerRating] = useState('');
  const [supplyImpedance, setSupplyImpedance] = useState('0.1');
  const [installationMethod, setInstallationMethod] = useState('clipped');
  const [groupingFactor, setGroupingFactor] = useState('1.0');

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
      installationMethod: installationMethod as MotorStartingInputs['installationMethod'],
      groupingFactor: parseFloat(groupingFactor),
      ratedCurrent: ratedCurrent ? parseFloat(ratedCurrent) : undefined,
      startingTime: parseFloat(startingTime),
      supplyImpedance: parseFloat(supplyImpedance),
    };

    const r = calculateMotorStarting(inputs);

    const recommendedCableSize = `${r.recommendedCableSize}mm²`;
    let cableAnalysis = 'Cable sizing meets BS 7671 requirements';
    if (r.recommendedCableSize > r.minimumCableSize) {
      cableAnalysis = `Upgrade from ${r.minimumCableSize}mm² to ${r.recommendedCableSize}mm² required for voltage drop compliance`;
    }

    const currentCapacityCheck = r.currentCarryingCheck.suitable
      ? `Cable capacity: ${r.currentCarryingCheck.capacity.toFixed(0)}A (Required: ${r.currentCarryingCheck.required.toFixed(0)}A)`
      : `Cable capacity insufficient: ${r.currentCarryingCheck.capacity.toFixed(0)}A < ${r.currentCarryingCheck.required.toFixed(0)}A`;

    const protectionAnalysis = r.protectionSuitable
      ? `${r.recommendedMcbRating}A ${r.protectionType.toUpperCase()} suitable for motor protection`
      : `${r.recommendedMcbRating}A protection may be unsuitable — verify coordination`;

    let complianceStatus = 'BS 7671 Compliant';
    if (!r.bs7671Compliant) {
      if (!r.voltageDropCompliant) complianceStatus = 'Non-compliant — voltage drop exceeds limits';
      else if (!r.currentCarryingCheck.suitable)
        complianceStatus = 'Non-compliant — cable undersized';
      else complianceStatus = 'Review required for full compliance';
    }
    if (startingMethod === 'direct' && P > 11) {
      complianceStatus = 'Consider reduced starting method (BS 7671 recommendation)';
    }

    const whatThisMeans: string[] = [
      `Full load current: ${r.fullLoadCurrent.toFixed(1)}A (normal running current per BS 7671)`,
      `Starting current: ${r.startingCurrent.toFixed(0)}A (${r.startingMultiplier.toFixed(1)}× full load current)`,
      `Supply demand: ${r.startingKva.toFixed(1)}kVA during motor starting`,
      `Running voltage drop: ${r.voltageDropRunning.toFixed(1)}% (limit: 3%)`,
      `Starting voltage drop: ${r.voltageDropStarting.toFixed(1)}% (limit: 10%)`,
    ];

    const practicalGuidance: string[] = [
      'Install motor starter close to distribution board to minimise cable runs',
      'Use thermally protected motor starter for overload protection',
      startingMethod === 'direct'
        ? 'Direct starting suitable for motors <11kW only'
        : 'Reduced starting method reduces supply impact',
      'Regular testing of motor protection devices is required',
      `Use ${r.protectionType.includes('c') ? 'Type C' : 'Type D'} MCB for motor loads`,
    ];

    const allRecommendations = [...r.recommendations, ...r.notes];

    setResult({
      fullLoadCurrent: r.fullLoadCurrent,
      startingCurrent: r.startingCurrent,
      startingMultiplier: r.startingMultiplier,
      startingKva: r.startingKva,
      thermalStress: r.thermalStress,
      voltageDropRunning: r.voltageDropRunning,
      voltageDropStarting: r.voltageDropStarting,
      complianceStatus,
      recommendedCableSize,
      minimumCableSize: r.minimumCableSize,
      cableAnalysis,
      currentCapacityCheck,
      protectionAnalysis,
      whatThisMeans,
      practicalGuidance,
      recommendations:
        allRecommendations.length > 0
          ? allRecommendations
          : ['Motor installation meets BS 7671 requirements'],
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
    setCableSize('2.5');
    setBreakerRating('');
    setSupplyImpedance('0.1');
    setInstallationMethod('clipped');
    setGroupingFactor('1.0');
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
      `Voltage drop (running): ${result.voltageDropRunning.toFixed(1)}%`,
      `Voltage drop (starting): ${result.voltageDropStarting.toFixed(1)}%`,
      `Thermal stress: ${(result.thermalStress / 1000).toFixed(1)} kA²s`,
      `Recommended cable: ${result.recommendedCableSize}`,
      `Status: ${result.complianceStatus}`,
    ].join('\n');
    navigator.clipboard.writeText(text);
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

  const installationMethodOptions = [
    { value: 'clipped', label: 'Clipped Direct' },
    { value: 'conduit', label: 'In Conduit' },
    { value: 'trunking', label: 'In Trunking' },
    { value: 'underground', label: 'Underground' },
    { value: 'tray', label: 'Cable Tray' },
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
            hint="IE3: 0.85, IE4: 0.90"
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
            hint="Proposed breaker rating"
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
              placeholder="e.g., 2.5"
              hint="Proposed cable CSA"
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
            />
            <CalculatorInput
              label="Supply Impedance"
              unit="Ω"
              type="text"
              inputMode="decimal"
              value={supplyImpedance}
              onChange={setSupplyImpedance}
              placeholder="e.g., 0.1"
            />
          </CalculatorInputGrid>
          <CalculatorInputGrid columns={2}>
            <CalculatorSelect
              label="Installation Method"
              value={installationMethod}
              onChange={setInstallationMethod}
              options={installationMethodOptions}
            />
            <CalculatorInput
              label="Grouping Factor"
              type="text"
              inputMode="decimal"
              value={groupingFactor}
              onChange={setGroupingFactor}
              placeholder="e.g., 1.0"
              hint="Derating for grouped cables"
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
              value={result.minimumCableSize.toString()}
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
              <p className="text-sm text-white font-medium">Current Carrying Capacity</p>
              <p className="text-sm text-white mt-1">{result.currentCapacityCheck}</p>
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
                label: 'Voltage drop',
                value: `Running: ${result.voltageDropRunning.toFixed(1)}% (limit 3%) | Starting: ${result.voltageDropStarting.toFixed(1)}% (limit 10%)`,
              },
              {
                label: 'Thermal stress',
                formula: `I²t = I_start² × t = ${result.startingCurrent.toFixed(0)}² × ${startingTime}`,
                value: `${(result.thermalStress / 1000).toFixed(1)} kA²s`,
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
                    <p className="text-sm text-white font-medium mb-2">BS 7671 Recommendations</p>
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
                    { reg: 'Regulation 552.1', desc: 'Motor circuit requirements' },
                    { reg: 'Regulation 435.1', desc: 'Overload protection' },
                    { reg: 'Table 41.3', desc: 'Maximum disconnection times' },
                    { reg: 'Regulation 433.1', desc: 'Overcurrent protection coordination' },
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
                    <p className="text-sm text-white font-medium">Starting Multipliers</p>
                    <p className="text-sm text-white">DOL: 6-8× FLC</p>
                    <p className="text-sm text-white">Star-Delta: 2-3× FLC</p>
                    <p className="text-sm text-white">Soft Start: 2-4× FLC</p>
                    <p className="text-sm text-white">VFD: 1-2× FLC</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-white font-medium">Voltage Drop Limits</p>
                    <p className="text-sm text-white">Running: 3% max</p>
                    <p className="text-sm text-white">Starting: 10% max</p>
                    <p className="text-sm text-white">DOL: ≤11kW recommended</p>
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
            description: 'DOL=6-8×, Star-Delta=2-3×, Soft Start=2-4×, VFD=1-1.5×',
          },
          { symbol: 'I²t', description: 'Thermal stress (A²s)' },
        ]}
      />
    </CalculatorCard>
  );
};

export default MotorStartingCurrentCalculator;
