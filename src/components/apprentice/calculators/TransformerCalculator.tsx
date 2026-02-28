import { useState, useCallback } from 'react';
import { Copy, Check, ChevronDown, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  CalculatorCard,
  CalculatorInputGrid,
  CalculatorInput,
  CalculatorSelect,
  CalculatorActions,
  CalculatorDivider,
  CalculatorSection,
  ResultValue,
  ResultsGrid,
  ResultBadge,
  CalculatorFormula,
  FormulaReference,
  CALCULATOR_CONFIG,
} from '@/components/calculators/shared';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Checkbox } from '@/components/ui/checkbox';
import {
  calculateTransformer,
  transformerPresets,
  type TransformerInputs,
  type TransformerResults,
} from '@/lib/transformer-calcs';

const CAT = 'power' as const;
const config = CALCULATOR_CONFIG[CAT];

const getComplianceStatus = (result: TransformerResults) => {
  const issues: string[] = [];
  if (result.voltageRegulation > 0.05) issues.push('High voltage regulation');
  if (result.efficiency < 0.9) issues.push('Low efficiency');
  if (result.transformerFaultCurrent > 35000) issues.push('Very high fault current');

  return {
    status: issues.length === 0 ? 'compliant' : issues.length <= 1 ? 'caution' : 'review',
    issues,
  };
};

const getRecommendedMCCB = (current: number) => {
  const standardSizes = [
    16, 20, 25, 32, 40, 50, 63, 80, 100, 125, 160, 200, 250, 315, 400, 500, 630, 800, 1000, 1250,
    1600,
  ];
  return standardSizes.find((size) => size >= current * 1.25) || 'Contact manufacturer';
};

const getSwitchgearBreakingCapacity = (faultCurrent: number) => {
  if (faultCurrent <= 10000) return '10kA minimum';
  if (faultCurrent <= 25000) return '25kA minimum';
  if (faultCurrent <= 36000) return '36kA minimum';
  if (faultCurrent <= 50000) return '50kA minimum';
  return '65kA+ specialist required';
};

const TransformerCalculator = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [result, setResult] = useState<TransformerResults | null>(null);

  // Inputs
  const [primaryVoltage, setPrimaryVoltage] = useState('');
  const [secondaryVoltage, setSecondaryVoltage] = useState('');
  const [kvaRating, setKvaRating] = useState('');
  const [powerFactor, setPowerFactor] = useState('0.85');
  const [phase, setPhase] = useState('three');
  const [percentImpedance, setPercentImpedance] = useState('6');

  // Advanced
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [frequency, setFrequency] = useState('50');
  const [connectionType, setConnectionType] = useState('Dyn11');
  const [sourceFaultLevel, setSourceFaultLevel] = useState('');
  const [ambientTemp, setAmbientTemp] = useState('40');
  const [altitude, setAltitude] = useState('0');
  const [harmonics, setHarmonics] = useState(false);

  // Collapsibles
  const [showGuidance, setShowGuidance] = useState(false);
  const [showReference, setShowReference] = useState(false);

  const handleCalculate = useCallback(() => {
    const inputs: TransformerInputs = {
      primaryVoltage: parseFloat(primaryVoltage),
      secondaryVoltage: parseFloat(secondaryVoltage),
      kvaRating: parseFloat(kvaRating),
      powerFactor: parseFloat(powerFactor),
      phase: phase as 'single' | 'three',
      frequency: parseFloat(frequency),
      percentImpedance: parseFloat(percentImpedance),
      sourceFaultLevel: sourceFaultLevel ? parseFloat(sourceFaultLevel) : undefined,
      ambientTemp: parseFloat(ambientTemp),
      altitude: parseFloat(altitude),
      harmonics,
      connectionType,
    };

    if (inputs.primaryVoltage > 0 && inputs.secondaryVoltage > 0 && inputs.kvaRating > 0) {
      const transformerResults = calculateTransformer(inputs);
      setResult(transformerResults);
    }
  }, [
    primaryVoltage,
    secondaryVoltage,
    kvaRating,
    powerFactor,
    phase,
    frequency,
    percentImpedance,
    sourceFaultLevel,
    ambientTemp,
    altitude,
    harmonics,
    connectionType,
  ]);

  const handleReset = useCallback(() => {
    setPrimaryVoltage('');
    setSecondaryVoltage('');
    setKvaRating('');
    setPowerFactor('0.85');
    setPhase('three');
    setPercentImpedance('6');
    setFrequency('50');
    setConnectionType('Dyn11');
    setSourceFaultLevel('');
    setAmbientTemp('40');
    setAltitude('0');
    setHarmonics(false);
    setResult(null);
  }, []);

  const handleCopy = useCallback(() => {
    if (!result) return;
    const compliance = getComplianceStatus(result);
    const lines = [
      'Transformer Calculator Results',
      '═══════════════════════════════',
      `Status: ${compliance.status.toUpperCase()}`,
      `Type: ${result.transformerType} (${result.voltageRatio.toFixed(2)}:1)`,
      '',
      `Primary Voltage: ${primaryVoltage} V`,
      `Secondary Voltage: ${secondaryVoltage} V`,
      `kVA Rating: ${kvaRating} kVA`,
      `Phase: ${phase === 'three' ? 'Three Phase' : 'Single Phase'}`,
      `Impedance: ${percentImpedance}%`,
      '',
      'Results:',
      `Primary Current: ${result.primaryRatedCurrent.toFixed(1)} A`,
      `Secondary Current: ${result.secondaryRatedCurrent.toFixed(1)} A`,
      `Real Power: ${result.kw.toFixed(1)} kW`,
      `Efficiency: ${(result.efficiency * 100).toFixed(1)}%`,
      `Fault Current: ${(result.transformerFaultCurrent / 1000).toFixed(2)} kA`,
      `Voltage Regulation: ${(result.voltageRegulation * 100).toFixed(2)}%`,
      '',
      'Protection:',
      `Recommended MCCB: ${getRecommendedMCCB(result.secondaryRatedCurrent)}A`,
      `Switchgear Rating: ${getSwitchgearBreakingCapacity(result.transformerFaultCurrent)}`,
      `Inrush Current: ${(result.inrushCurrent / 1000).toFixed(1)} kA for ${result.inrushDuration}s`,
    ];

    navigator.clipboard.writeText(lines.join('\n'));
    setCopied(true);
    toast({ title: 'Copied to clipboard' });
    setTimeout(() => setCopied(false), 2000);
  }, [result, primaryVoltage, secondaryVoltage, kvaRating, phase, percentImpedance, toast]);

  const canCalculate =
    primaryVoltage.trim() !== '' && secondaryVoltage.trim() !== '' && kvaRating.trim() !== '';

  // Build formula steps for "How It Worked Out"
  const getFormulaSteps = () => {
    if (!result) return [];
    const vp = parseFloat(primaryVoltage);
    const vs = parseFloat(secondaryVoltage);
    const kva = parseFloat(kvaRating);
    const pf = parseFloat(powerFactor);
    const zPct = parseFloat(percentImpedance);
    const isThreePhase = phase === 'three';

    const steps = [
      {
        label: 'Voltage Ratio',
        formula: `n = Vp ÷ Vs = ${vp} ÷ ${vs}`,
        value: `${result.voltageRatio.toFixed(2)}:1 (${result.transformerType})`,
        description: 'Ratio of primary to secondary voltage determines transformer type',
      },
      {
        label: 'Primary Current',
        formula: isThreePhase
          ? `Ip = (kVA × 1000) ÷ (√3 × Vp) = (${kva} × 1000) ÷ (1.732 × ${vp})`
          : `Ip = (kVA × 1000) ÷ Vp = (${kva} × 1000) ÷ ${vp}`,
        value: `${result.primaryRatedCurrent.toFixed(1)} A`,
        description: 'Rated current drawn from the supply at full load',
      },
      {
        label: 'Secondary Current',
        formula: isThreePhase
          ? `Is = (kVA × 1000) ÷ (√3 × Vs) = (${kva} × 1000) ÷ (1.732 × ${vs})`
          : `Is = (kVA × 1000) ÷ Vs = (${kva} × 1000) ÷ ${vs}`,
        value: `${result.secondaryRatedCurrent.toFixed(1)} A`,
        description: 'Rated current available on the secondary side',
      },
      {
        label: 'Real Power',
        formula: `P = S × pf = ${kva} × ${pf}`,
        value: `${result.kw.toFixed(1)} kW`,
        description: 'Active power delivered to the load',
      },
      {
        label: 'Fault Current',
        formula: `Zbase = Vs² ÷ (kVA × 1000) = ${vs}² ÷ (${kva} × 1000) = ${(vs ** 2 / (kva * 1000)).toFixed(4)} Ω`,
        value: `Isc = ${(result.transformerFaultCurrent / 1000).toFixed(2)} kA`,
        description: `Zt = (${zPct}% ÷ 100) × Zbase, then Isc = Vs ÷ (√3 × Zt)`,
      },
      {
        label: 'Voltage Regulation',
        formula: 'VR = (R% × cosφ + X% × sinφ) ÷ 100',
        value: `${(result.voltageRegulation * 100).toFixed(2)}%`,
        description: 'Voltage drop from no-load to full-load conditions',
      },
    ];

    return steps;
  };

  return (
    <CalculatorCard
      category={CAT}
      title="Transformer Calculator"
      description="Comprehensive transformer calculations with BS 7671 18th Edition compliance"
    >
      {/* Preset selectors */}
      <CalculatorSection>
        <CalculatorInputGrid>
          <CalculatorSelect
            label="Primary Voltage"
            value={primaryVoltage}
            onChange={setPrimaryVoltage}
            options={transformerPresets.voltages.primary}
            placeholder="Select or type below"
          />
          <CalculatorSelect
            label="Secondary Voltage"
            value={secondaryVoltage}
            onChange={setSecondaryVoltage}
            options={transformerPresets.voltages.secondary}
            placeholder="Select or type below"
          />
        </CalculatorInputGrid>
      </CalculatorSection>

      {/* Manual voltage inputs (if preset doesn't match) */}
      <CalculatorInputGrid>
        <CalculatorInput
          label="Primary Voltage (V)"
          type="number"
          inputMode="numeric"
          value={primaryVoltage}
          onChange={setPrimaryVoltage}
          placeholder="e.g. 11000"
          unit="V"
        />
        <CalculatorInput
          label="Secondary Voltage (V)"
          type="number"
          inputMode="numeric"
          value={secondaryVoltage}
          onChange={setSecondaryVoltage}
          placeholder="e.g. 400"
          unit="V"
        />
      </CalculatorInputGrid>

      <CalculatorSelect
        label="kVA Rating"
        value={kvaRating}
        onChange={setKvaRating}
        options={transformerPresets.kvaRatings}
        placeholder="Select rating"
      />

      <CalculatorInputGrid>
        <CalculatorInput
          label="Power Factor"
          type="number"
          inputMode="decimal"
          value={powerFactor}
          onChange={setPowerFactor}
          placeholder="0.85"
          hint="Load power factor (0.1–1.0)"
        />
        <CalculatorSelect
          label="Phase Configuration"
          value={phase}
          onChange={setPhase}
          options={[
            { value: 'single', label: 'Single Phase' },
            { value: 'three', label: 'Three Phase' },
          ]}
        />
      </CalculatorInputGrid>

      <CalculatorSelect
        label="Percentage Impedance"
        value={percentImpedance}
        onChange={setPercentImpedance}
        options={transformerPresets.impedances}
        hint="Transformer impedance at rated voltage"
      />

      {/* Advanced Settings Toggle */}
      <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
        <CollapsibleTrigger
          className={cn(
            'flex items-center justify-between w-full min-h-11 py-2.5 px-3 rounded-lg',
            'text-sm font-medium text-white',
            'hover:bg-white/5 transition-all touch-manipulation'
          )}
        >
          <div className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span>Advanced Settings</span>
          </div>
          <ChevronDown
            className={cn(
              'h-4 w-4 transition-transform duration-200',
              showAdvanced && 'rotate-180'
            )}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2">
          <div
            className="rounded-xl border p-3 space-y-3"
            style={{
              borderColor: `${config.gradientFrom}15`,
              background: `${config.gradientFrom}05`,
            }}
          >
            <CalculatorInputGrid>
              <CalculatorInput
                label="Frequency"
                type="number"
                inputMode="numeric"
                value={frequency}
                onChange={setFrequency}
                placeholder="50"
                unit="Hz"
              />
              <CalculatorInput
                label="Ambient Temperature"
                type="number"
                inputMode="numeric"
                value={ambientTemp}
                onChange={setAmbientTemp}
                placeholder="40"
                unit="°C"
              />
            </CalculatorInputGrid>

            <CalculatorSelect
              label="Connection Type"
              value={connectionType}
              onChange={setConnectionType}
              options={transformerPresets.connections}
              hint="Vector group notation"
            />

            <CalculatorInput
              label="Source Fault Level"
              type="number"
              inputMode="numeric"
              value={sourceFaultLevel}
              onChange={setSourceFaultLevel}
              placeholder="100"
              unit="MVA"
              hint="Upstream fault level (optional)"
            />

            <CalculatorInput
              label="Altitude"
              type="number"
              inputMode="numeric"
              value={altitude}
              onChange={setAltitude}
              placeholder="0"
              unit="m"
              hint="Installation altitude above sea level"
            />

            <div className="flex items-center gap-3 min-h-11 touch-manipulation">
              <Checkbox
                id="harmonics"
                checked={harmonics}
                onCheckedChange={(checked) => setHarmonics(checked === true)}
                className="border-white/40 data-[state=checked]:bg-amber-400 data-[state=checked]:border-amber-400 data-[state=checked]:text-black"
              />
              <label
                htmlFor="harmonics"
                className="text-sm font-medium text-white cursor-pointer touch-manipulation"
              >
                Harmonic loads present (K-factor rated)
              </label>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <CalculatorActions
        category={CAT}
        onCalculate={handleCalculate}
        onReset={handleReset}
        isDisabled={!canCalculate}
        showReset={!!result}
      />

      {/* ──────── Results ──────── */}
      {result &&
        (() => {
          const compliance = getComplianceStatus(result);
          const badgeStatus: 'pass' | 'warning' | 'fail' =
            compliance.status === 'compliant'
              ? 'pass'
              : compliance.status === 'caution'
                ? 'warning'
                : 'fail';

          return (
            <>
              <CalculatorDivider />

              {/* Status + Copy */}
              <div className="flex items-center justify-between">
                <ResultBadge status={badgeStatus} label={compliance.status.toUpperCase()} />
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 min-h-11 rounded-lg text-sm text-white hover:bg-white/5 transition-colors touch-manipulation"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>

              {/* Hero: Secondary Current */}
              <div className="text-center py-4">
                <p className="text-sm font-medium text-white mb-1">Secondary Current</p>
                <p
                  className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                  }}
                >
                  {result.secondaryRatedCurrent.toFixed(1)}
                </p>
                <p className="text-lg font-medium text-white mt-1">Amperes</p>
                <p className="text-sm text-white mt-1">
                  {result.transformerType} transformer — {result.voltageRatio.toFixed(2)}:1 ratio
                </p>
              </div>

              {/* Key Metrics */}
              <ResultsGrid columns={2}>
                <ResultValue
                  label="Primary Current"
                  value={result.primaryRatedCurrent.toFixed(1)}
                  unit="A"
                  category={CAT}
                  size="sm"
                />
                <ResultValue
                  label="Real Power"
                  value={result.kw.toFixed(1)}
                  unit="kW"
                  category={CAT}
                  size="sm"
                />
                <ResultValue
                  label="Efficiency"
                  value={`${(result.efficiency * 100).toFixed(1)}`}
                  unit="%"
                  category={CAT}
                  size="sm"
                />
                <ResultValue
                  label="Fault Current"
                  value={(result.transformerFaultCurrent / 1000).toFixed(2)}
                  unit="kA"
                  category={CAT}
                  size="sm"
                />
                <ResultValue
                  label="Voltage Regulation"
                  value={`${(result.voltageRegulation * 100).toFixed(2)}`}
                  unit="%"
                  category={CAT}
                  size="sm"
                />
                <ResultValue
                  label="Reactive Power"
                  value={result.kvar.toFixed(1)}
                  unit="kVAr"
                  category={CAT}
                  size="sm"
                />
              </ResultsGrid>

              {/* Protection Requirements */}
              <CalculatorSection>
                <p className="text-sm font-medium text-white mb-2">Protection Requirements</p>
                <ResultsGrid columns={2}>
                  <ResultValue
                    label="Recommended MCCB"
                    value={`${getRecommendedMCCB(result.secondaryRatedCurrent)}`}
                    unit="A"
                    category={CAT}
                    size="sm"
                  />
                  <ResultValue
                    label="Breaking Capacity"
                    value={getSwitchgearBreakingCapacity(result.transformerFaultCurrent)}
                    category={CAT}
                    size="sm"
                  />
                  <ResultValue
                    label="Inrush Current"
                    value={(result.inrushCurrent / 1000).toFixed(1)}
                    unit="kA"
                    category={CAT}
                    size="sm"
                  />
                  <ResultValue
                    label="Inrush Duration"
                    value={`${result.inrushDuration}`}
                    unit="s"
                    category={CAT}
                    size="sm"
                  />
                </ResultsGrid>
              </CalculatorSection>

              {/* Derating factors (if applicable) */}
              {(result.temperatureDerating ||
                result.altitudeDerating ||
                result.harmonicDerating) && (
                <CalculatorSection>
                  <p className="text-sm font-medium text-white mb-2">Derating Factors</p>
                  <ResultsGrid columns={2}>
                    {result.temperatureDerating && (
                      <ResultValue
                        label="Temperature Derating"
                        value={`${(result.temperatureDerating * 100).toFixed(0)}`}
                        unit="%"
                        category={CAT}
                        size="sm"
                      />
                    )}
                    {result.altitudeDerating && (
                      <ResultValue
                        label="Altitude Derating"
                        value={`${(result.altitudeDerating * 100).toFixed(0)}`}
                        unit="%"
                        category={CAT}
                        size="sm"
                      />
                    )}
                    {result.harmonicDerating && (
                      <ResultValue
                        label="Harmonic Derating"
                        value={`${(result.harmonicDerating * 100).toFixed(0)}`}
                        unit="%"
                        category={CAT}
                        size="sm"
                      />
                    )}
                  </ResultsGrid>
                </CalculatorSection>
              )}

              {/* Warnings */}
              {result.warnings.length > 0 && (
                <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 space-y-1">
                  {result.warnings.map((warning, idx) => (
                    <p key={idx} className="text-sm text-white flex items-start gap-2">
                      <span className="text-amber-400 mt-0.5">!</span>
                      {warning}
                    </p>
                  ))}
                </div>
              )}

              {/* How It Worked Out */}
              <CalculatorFormula
                category={CAT}
                steps={getFormulaSteps()}
                title="How It Worked Out"
                defaultOpen
              />

              {/* What This Means */}
              <Collapsible open={showGuidance} onOpenChange={setShowGuidance}>
                <CollapsibleTrigger
                  className={cn(
                    'flex items-center justify-between w-full min-h-11 py-2.5 px-3 rounded-lg',
                    'text-sm font-medium text-white',
                    'hover:bg-white/5 transition-all touch-manipulation'
                  )}
                >
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
                    className="rounded-xl border p-3 space-y-2"
                    style={{
                      borderColor: `${config.gradientFrom}15`,
                      background: `${config.gradientFrom}05`,
                    }}
                  >
                    <p className="text-sm text-white">
                      This {result.transformerType} transformer{' '}
                      {result.voltageRatio > 1
                        ? 'reduces'
                        : result.voltageRatio < 1
                          ? 'increases'
                          : 'maintains'}{' '}
                      the voltage level with a {result.voltageRatio.toFixed(2)}:1 ratio.
                    </p>
                    <p className="text-sm text-white">
                      At {(result.efficiency * 100).toFixed(1)}% efficiency, approximately{' '}
                      {((1 - result.efficiency) * 100).toFixed(1)}% of energy is lost as heat (
                      {result.totalLoss.toFixed(1)} kW total losses).
                    </p>
                    <p className="text-sm text-white">
                      The prospective fault current of{' '}
                      {(result.transformerFaultCurrent / 1000).toFixed(1)} kA requires switchgear
                      with {getSwitchgearBreakingCapacity(result.transformerFaultCurrent)} breaking
                      capacity.
                    </p>
                    <p className="text-sm text-white">
                      Install a {getRecommendedMCCB(result.secondaryRatedCurrent)}A MCCB for
                      secondary protection. Consider soft-start if inrush current (
                      {(result.inrushCurrent / 1000).toFixed(1)} kA) causes supply issues.
                    </p>
                    {result.voltageRegulation > 0.05 && (
                      <p className="text-sm text-white">
                        High voltage regulation — consider a tap changer or voltage stabiliser.
                      </p>
                    )}
                    {result.efficiency < 0.95 && (
                      <p className="text-sm text-white">
                        Consider upgrading to a higher efficiency transformer for long-term energy
                        savings.
                      </p>
                    )}
                    {compliance.issues.length > 0 && (
                      <p className="text-sm text-white">
                        Issues flagged: {compliance.issues.join(', ')}.
                      </p>
                    )}
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* BS 7671 Reference */}
              <Collapsible open={showReference} onOpenChange={setShowReference}>
                <CollapsibleTrigger
                  className={cn(
                    'flex items-center justify-between w-full min-h-11 py-2.5 px-3 rounded-lg',
                    'text-sm font-medium text-white',
                    'hover:bg-white/5 transition-all touch-manipulation'
                  )}
                >
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
                    className="rounded-xl border p-3 space-y-2"
                    style={{
                      borderColor: `${config.gradientFrom}15`,
                      background: `${config.gradientFrom}05`,
                    }}
                  >
                    {result.recommendations.map((rec, idx) => (
                      <p key={idx} className="text-sm text-white">
                        {rec}
                      </p>
                    ))}
                    <p className="text-sm text-white">
                      Reg 551.1: Transformer installation requirements
                    </p>
                    <p className="text-sm text-white">
                      Reg 555.1: Transformer selection and application
                    </p>
                    <p className="text-sm text-white">
                      Reg 434.5.2: Prospective fault current determination
                    </p>
                    <p className="text-sm text-white">
                      Transformer earthing must comply with BS 7671 411.3
                    </p>
                    <p className="text-sm text-white">
                      BS EN 60076: Power transformer specification
                    </p>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </>
          );
        })()}

      {/* Formula Reference (always visible) */}
      <FormulaReference
        category={CAT}
        name="Transformer Calculations"
        formula="Is = (kVA × 1000) / (√3 × Vs)"
        variables={[
          { symbol: 'Is', description: 'Secondary current (A)' },
          { symbol: 'kVA', description: 'Transformer rating' },
          { symbol: 'Vs', description: 'Secondary voltage (V)' },
          { symbol: 'Z%', description: 'Impedance percentage' },
          { symbol: 'Isc', description: 'Prospective fault current (A)' },
        ]}
      />
    </CalculatorCard>
  );
};

export default TransformerCalculator;
