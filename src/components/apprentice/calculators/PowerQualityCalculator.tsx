import { useState, useCallback } from 'react';
import { Copy, Check, ChevronDown, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  CalculatorCard,
  CalculatorInputGrid,
  CalculatorInput,
  CalculatorSelect,
  CalculatorActions,
  CalculatorSection,
  ResultValue,
  ResultsGrid,
  ResultBadge,
  CalculatorFormula,
  FormulaReference,
  CALCULATOR_CONFIG,
} from '@/components/calculators/shared';
import {
  calculatePowerQuality,
  HARMONIC_PRESETS,
  type PowerQualityInputs,
  type PowerQualityResults,
} from '@/lib/powerquality';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const CAT = 'power' as const;
const config = CALCULATOR_CONFIG[CAT];

const systemTypeOptions = [
  { value: 'single-phase', label: 'Single Phase' },
  { value: 'three-phase', label: 'Three Phase' },
];

const loadTypeOptions = [
  { value: 'linear', label: 'Linear Loads' },
  { value: 'non-linear', label: 'Non-Linear Loads' },
  { value: 'mixed', label: 'Mixed Loads' },
];

const presetOptions = [
  { value: 'none', label: 'Manual Entry' },
  ...Object.entries(HARMONIC_PRESETS).map(([key, preset]) => ({
    value: key,
    label: preset.label,
  })),
];

const PowerQualityCalculator = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const [fundamentalCurrent, setFundamentalCurrent] = useState<string>('');
  const [fundamentalVoltage, setFundamentalVoltage] = useState<string>('230');
  const [systemType, setSystemType] = useState<'single-phase' | 'three-phase'>('single-phase');
  const [loadType, setLoadType] = useState<'linear' | 'non-linear' | 'mixed'>('non-linear');
  const [frequency, setFrequency] = useState<string>('50');
  const [displacementPF, setDisplacementPF] = useState<string>('0.95');
  const [selectedPreset, setSelectedPreset] = useState<string>('none');

  const [harmonic3, setHarmonic3] = useState<string>('');
  const [harmonic5, setHarmonic5] = useState<string>('');
  const [harmonic7, setHarmonic7] = useState<string>('');
  const [harmonic9, setHarmonic9] = useState<string>('');
  const [harmonic11, setHarmonic11] = useState<string>('');
  const [harmonic13, setHarmonic13] = useState<string>('');
  const [harmonic15, setHarmonic15] = useState<string>('');
  const [harmonic17, setHarmonic17] = useState<string>('');

  const [result, setResult] = useState<PowerQualityResults | null>(null);
  const [showHarmonics, setShowHarmonics] = useState(false);
  const [showGuidance, setShowGuidance] = useState(false);

  // Apply a preset — fills harmonic fields as % of fundamental
  const applyPreset = (presetKey: string) => {
    setSelectedPreset(presetKey);
    if (presetKey === 'none') return;

    const preset = HARMONIC_PRESETS[presetKey];
    if (!preset) return;

    const I1 = parseFloat(fundamentalCurrent) || 10;
    const h = preset.harmonics;
    setHarmonic3(h[3] ? ((h[3] / 100) * I1).toFixed(2) : '');
    setHarmonic5(h[5] ? ((h[5] / 100) * I1).toFixed(2) : '');
    setHarmonic7(h[7] ? ((h[7] / 100) * I1).toFixed(2) : '');
    setHarmonic9(h[9] ? ((h[9] / 100) * I1).toFixed(2) : '');
    setHarmonic11(h[11] ? ((h[11] / 100) * I1).toFixed(2) : '');
    setHarmonic13(h[13] ? ((h[13] / 100) * I1).toFixed(2) : '');
    setHarmonic15(h[15] ? ((h[15] / 100) * I1).toFixed(2) : '');
    setHarmonic17(h[17] ? ((h[17] / 100) * I1).toFixed(2) : '');
  };

  const handleCalculate = useCallback(() => {
    if (!fundamentalCurrent || parseFloat(fundamentalCurrent) <= 0) return;

    const I1 = parseFloat(fundamentalCurrent);
    const V1 = parseFloat(fundamentalVoltage) || 230;
    const freq = parseFloat(frequency) || 50;

    const harmonics = [
      { order: 3, current: parseFloat(harmonic3) || 0 },
      { order: 5, current: parseFloat(harmonic5) || 0 },
      { order: 7, current: parseFloat(harmonic7) || 0 },
      { order: 9, current: parseFloat(harmonic9) || 0 },
      { order: 11, current: parseFloat(harmonic11) || 0 },
      { order: 13, current: parseFloat(harmonic13) || 0 },
      { order: 15, current: parseFloat(harmonic15) || 0 },
      { order: 17, current: parseFloat(harmonic17) || 0 },
    ].filter((h) => h.current > 0);

    const dpf = parseFloat(displacementPF);
    const inputs: PowerQualityInputs = {
      fundamentalCurrent: I1,
      fundamentalVoltage: V1,
      harmonics,
      systemType,
      frequency: freq,
      loadType,
      displacementPF: dpf > 0 && dpf <= 1 ? dpf : 0.95,
    };

    setResult(calculatePowerQuality(inputs));
  }, [
    fundamentalCurrent,
    fundamentalVoltage,
    systemType,
    loadType,
    frequency,
    displacementPF,
    harmonic3,
    harmonic5,
    harmonic7,
    harmonic9,
    harmonic11,
    harmonic13,
    harmonic15,
    harmonic17,
  ]);

  const handleReset = useCallback(() => {
    setFundamentalCurrent('');
    setFundamentalVoltage('230');
    setSystemType('single-phase');
    setLoadType('non-linear');
    setFrequency('50');
    setDisplacementPF('0.95');
    setSelectedPreset('none');
    setHarmonic3('');
    setHarmonic5('');
    setHarmonic7('');
    setHarmonic9('');
    setHarmonic11('');
    setHarmonic13('');
    setHarmonic15('');
    setHarmonic17('');
    setResult(null);
  }, []);

  const handleCopy = () => {
    if (!result) return;
    const text = [
      'Power Quality Analysis',
      `System: ${systemType}, ${fundamentalCurrent}A @ ${fundamentalVoltage}V`,
      '',
      `THDi Current: ${result.thdiCurrent.toFixed(2)}%`,
      `RMS Current: ${result.rmsCurrentTotal.toFixed(2)}A`,
      `Crest Factor: ${result.crestFactorCurrent.toFixed(2)}`,
      `K-Factor: ${result.kFactor.toFixed(1)}`,
      `True PF: ${result.truePowerFactor}`,
      `Transformer Derating: ${result.transformerDerating}%`,
      systemType === 'three-phase' ? `Neutral Current: ${result.neutralCurrent.toFixed(2)}A` : '',
      '',
      `Rating: ${result.powerQualityRating.toUpperCase()}`,
      `Risk: ${result.riskLevel.toUpperCase()}`,
      `BS 7671: ${result.bs7671Compliance ? 'Compliant' : 'Non-compliant'}`,
      `IEEE 519: ${result.ieeeCompliance ? 'Compliant' : 'Non-compliant'}`,
    ]
      .filter(Boolean)
      .join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({ title: 'Copied to clipboard' });
    setTimeout(() => setCopied(false), 2000);
  };

  const isValid = fundamentalCurrent && parseFloat(fundamentalCurrent) > 0;

  const getOrdinal = (num: number) => {
    if (num === 1) return '1st';
    if (num === 2) return '2nd';
    if (num === 3) return '3rd';
    return `${num}th`;
  };

  return (
    <CalculatorCard
      category={CAT}
      title="Power Quality & THD Calculator"
      description="Comprehensive harmonic analysis for BS 7671 18th Edition compliance"
    >
      {/* System Configuration */}
      <CalculatorSection title="System Configuration">
        <CalculatorInputGrid columns={2}>
          <CalculatorSelect
            label="System Type"
            value={systemType}
            onChange={(v) => setSystemType(v as 'single-phase' | 'three-phase')}
            options={systemTypeOptions}
          />
          <CalculatorSelect
            label="Load Type"
            value={loadType}
            onChange={(v) => setLoadType(v as 'linear' | 'non-linear' | 'mixed')}
            options={loadTypeOptions}
          />
        </CalculatorInputGrid>
      </CalculatorSection>

      {/* Fundamental Values */}
      <CalculatorSection title="Fundamental Values">
        <CalculatorInputGrid columns={2}>
          <CalculatorInput
            label="Current (I₁)"
            unit="A"
            type="text"
            inputMode="decimal"
            value={fundamentalCurrent}
            onChange={setFundamentalCurrent}
            placeholder="e.g. 10"
          />
          <CalculatorInput
            label="Voltage (V₁)"
            unit="V"
            type="text"
            inputMode="decimal"
            value={fundamentalVoltage}
            onChange={setFundamentalVoltage}
            placeholder="230"
          />
          <CalculatorInput
            label="Frequency"
            unit="Hz"
            type="text"
            inputMode="decimal"
            value={frequency}
            onChange={setFrequency}
            placeholder="50"
          />
          <CalculatorInput
            label="Displacement PF"
            type="text"
            inputMode="decimal"
            value={displacementPF}
            onChange={setDisplacementPF}
            placeholder="0.95"
            hint="Fundamental power factor (0-1)"
          />
        </CalculatorInputGrid>
      </CalculatorSection>

      {/* Harmonic Currents */}
      <CalculatorSection title="Harmonic Currents">
        <CalculatorSelect
          label="Load Preset"
          value={selectedPreset}
          onChange={applyPreset}
          options={presetOptions}
          hint="Pre-fills typical harmonic spectra based on load type"
        />
        <CalculatorInputGrid columns={2}>
          <CalculatorInput
            label="3rd"
            unit="A"
            type="text"
            inputMode="decimal"
            value={harmonic3}
            onChange={setHarmonic3}
            placeholder="0"
          />
          <CalculatorInput
            label="5th"
            unit="A"
            type="text"
            inputMode="decimal"
            value={harmonic5}
            onChange={setHarmonic5}
            placeholder="0"
          />
          <CalculatorInput
            label="7th"
            unit="A"
            type="text"
            inputMode="decimal"
            value={harmonic7}
            onChange={setHarmonic7}
            placeholder="0"
          />
          <CalculatorInput
            label="9th"
            unit="A"
            type="text"
            inputMode="decimal"
            value={harmonic9}
            onChange={setHarmonic9}
            placeholder="0"
          />
          <CalculatorInput
            label="11th"
            unit="A"
            type="text"
            inputMode="decimal"
            value={harmonic11}
            onChange={setHarmonic11}
            placeholder="0"
          />
          <CalculatorInput
            label="13th"
            unit="A"
            type="text"
            inputMode="decimal"
            value={harmonic13}
            onChange={setHarmonic13}
            placeholder="0"
          />
          <CalculatorInput
            label="15th"
            unit="A"
            type="text"
            inputMode="decimal"
            value={harmonic15}
            onChange={setHarmonic15}
            placeholder="0"
          />
          <CalculatorInput
            label="17th"
            unit="A"
            type="text"
            inputMode="decimal"
            value={harmonic17}
            onChange={setHarmonic17}
            placeholder="0"
          />
        </CalculatorInputGrid>
      </CalculatorSection>

      <CalculatorActions
        category={CAT}
        onCalculate={handleCalculate}
        onReset={handleReset}
        isDisabled={!isValid}
        showReset={!!result}
        calculateLabel="Analyse Power Quality"
      />

      {/* Results */}
      {result && (
        <div className="space-y-4 animate-fade-in">
          {/* Status + Copy */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-wrap">
              <ResultBadge
                status={
                  result.powerQualityRating === 'excellent' || result.powerQualityRating === 'good'
                    ? 'pass'
                    : result.powerQualityRating === 'fair'
                      ? 'warning'
                      : 'fail'
                }
                label={result.powerQualityRating.toUpperCase()}
              />
              <ResultBadge
                status={
                  result.riskLevel === 'low'
                    ? 'pass'
                    : result.riskLevel === 'medium'
                      ? 'warning'
                      : 'fail'
                }
                label={`${result.riskLevel.toUpperCase()} RISK`}
              />
              <ResultBadge
                status={
                  result.complianceStatus === 'compliant'
                    ? 'pass'
                    : result.complianceStatus === 'borderline'
                      ? 'warning'
                      : 'fail'
                }
                label={result.complianceStatus.toUpperCase()}
              />
            </div>
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
            <p className="text-sm font-medium text-white mb-1">THDi Current</p>
            <p
              className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
              }}
            >
              {result.thdiCurrent.toFixed(2)}%
            </p>
            <p className="text-sm text-white mt-2">
              IEEE 519 limit: 5% | RMS: {result.rmsCurrentTotal.toFixed(2)}A
            </p>
          </div>

          {/* Key Metrics */}
          <ResultsGrid columns={2}>
            <ResultValue
              category={CAT}
              label="Crest Factor"
              value={result.crestFactorCurrent.toFixed(2)}
              size="sm"
            />
            <ResultValue
              category={CAT}
              label="K-Factor"
              value={result.kFactor.toFixed(1)}
              size="sm"
            />
            <ResultValue
              category={CAT}
              label="True Power Factor"
              value={result.truePowerFactor.toString()}
              size="sm"
            />
            <ResultValue
              category={CAT}
              label="Transformer Derating"
              value={`${result.transformerDerating}`}
              unit="%"
              size="sm"
            />
          </ResultsGrid>

          {/* Neutral Current (3-phase only) */}
          {systemType === 'three-phase' && result.neutralCurrent > 0 && (
            <ResultValue
              category={CAT}
              label="Neutral Current (triplen harmonics)"
              value={result.neutralCurrent.toFixed(2)}
              unit="A"
              size="sm"
            />
          )}

          {/* Regulatory Compliance */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'BS 7671', pass: result.bs7671Compliance },
              { label: 'IEEE 519', pass: result.ieeeCompliance },
              { label: 'G5/5 Code', pass: result.gCode5Compliance },
            ].map((reg) => (
              <div
                key={reg.label}
                className={cn(
                  'p-2.5 rounded-lg border text-center',
                  reg.pass
                    ? 'border-green-500/30 bg-green-500/10'
                    : 'border-red-500/30 bg-red-500/10'
                )}
              >
                <p className="font-medium text-xs text-white">{reg.label}</p>
                <div className="flex items-center justify-center gap-1 mt-1">
                  {reg.pass ? (
                    <CheckCircle className="h-3.5 w-3.5 text-green-400" />
                  ) : (
                    <XCircle className="h-3.5 w-3.5 text-red-400" />
                  )}
                  <p className={cn('text-xs', reg.pass ? 'text-green-400' : 'text-red-400')}>
                    {reg.pass ? 'Compliant' : 'Non-compliant'}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Individual Harmonics */}
          {result.harmonicSpectrum.length > 0 && (
            <Collapsible open={showHarmonics} onOpenChange={setShowHarmonics}>
              <CollapsibleTrigger className="flex items-center justify-between w-full min-h-11 py-2.5 px-3 rounded-lg text-sm font-medium text-white hover:bg-white/5 transition-all touch-manipulation">
                <span>Individual Harmonics ({result.harmonicSpectrum.length})</span>
                <ChevronDown
                  className={cn(
                    'h-4 w-4 transition-transform duration-200',
                    showHarmonics && 'rotate-180'
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
                  {result.harmonicSpectrum.map((harmonic) => (
                    <div
                      key={harmonic.order}
                      className="flex items-center justify-between p-2 rounded-lg bg-white/5"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-white">{getOrdinal(harmonic.order)}</span>
                        <div
                          className={cn(
                            'w-2.5 h-2.5 rounded-full',
                            harmonic.compliance === 'pass'
                              ? 'bg-green-500'
                              : harmonic.compliance === 'warning'
                                ? 'bg-yellow-500'
                                : 'bg-red-500'
                          )}
                        />
                      </div>
                      <div className="text-right">
                        <p className="font-mono text-sm text-white">
                          {harmonic.currentPercentage.toFixed(2)}%
                        </p>
                        <p className="text-xs text-white">Limit: {harmonic.limit}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          )}

          {/* Equipment Impact */}
          <CalculatorSection title="Equipment Impact Assessment">
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[
                {
                  label: 'Transformers',
                  status:
                    result.kFactor > 13
                      ? 'Critical overheating risk'
                      : result.kFactor > 9
                        ? 'Elevated temperature'
                        : 'Normal operation',
                  bad: result.kFactor > 9,
                },
                {
                  label: 'Neutral Conductor',
                  status:
                    systemType === 'three-phase' &&
                    result.neutralCurrent > parseFloat(fundamentalCurrent)
                      ? 'Oversizing required'
                      : 'Standard sizing adequate',
                  bad:
                    systemType === 'three-phase' &&
                    result.neutralCurrent > parseFloat(fundamentalCurrent),
                },
                {
                  label: 'Protection Devices',
                  status:
                    result.crestFactorCurrent > 2.5
                      ? 'RMS-sensing recommended'
                      : 'Standard devices suitable',
                  bad: result.crestFactorCurrent > 2.5,
                },
                {
                  label: 'PFC Capacitors',
                  status:
                    result.thdiCurrent > 8
                      ? 'Detuned capacitors required'
                      : 'Standard capacitors OK',
                  bad: result.thdiCurrent > 8,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-2.5 rounded-lg bg-white/5 border border-white/10"
                >
                  <p className="text-white text-xs mb-1">{item.label}</p>
                  <p
                    className={cn(
                      'text-xs font-medium',
                      item.bad ? 'text-amber-400' : 'text-green-400'
                    )}
                  >
                    {item.status}
                  </p>
                </div>
              ))}
            </div>
          </CalculatorSection>

          {/* Practical Guidance */}
          {result.practicalGuidance.length > 0 && (
            <Collapsible open={showGuidance} onOpenChange={setShowGuidance}>
              <CollapsibleTrigger className="flex items-center justify-between w-full min-h-11 py-2.5 px-3 rounded-lg text-sm font-medium text-white hover:bg-white/5 transition-all touch-manipulation">
                <span>Practical Guidance ({result.practicalGuidance.length})</span>
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
                  {result.practicalGuidance.map((tip, i) => (
                    <p key={i} className="text-sm text-white flex items-start gap-2">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      {tip}
                    </p>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          )}

          {/* Calculation Steps */}
          <CalculatorFormula
            category={CAT}
            title="How It Worked Out"
            defaultOpen
            steps={[
              {
                label: 'THDi calculation',
                formula: `THDi = √(Σ I_h²) / I₁ × 100`,
                value: `${result.thdiCurrent.toFixed(2)}%`,
              },
              {
                label: 'RMS current (true)',
                formula: `I_rms = √(I₁² + Σ I_h²)`,
                value: `${result.rmsCurrentTotal.toFixed(2)}A`,
              },
              {
                label: 'K-Factor for transformer',
                formula: `K = 1 + Σ(h² × (I_h/I₁)²)`,
                value: `K = ${result.kFactor.toFixed(1)}`,
                description:
                  result.kFactor > 4
                    ? `K-${Math.ceil(result.kFactor)} rated transformer recommended`
                    : 'Standard transformer suitable',
              },
              {
                label: 'Transformer derating (IEEE C57.110)',
                formula: `Derating = 1/√(1 + (K-1) × 0.05)`,
                value: `${result.transformerDerating}% of nameplate`,
              },
              ...(systemType === 'three-phase'
                ? [
                    {
                      label: 'Neutral current (triplen harmonics)',
                      formula: `I_N = √3 × √(Σ I_triplen²)`,
                      value: `${result.neutralCurrent.toFixed(2)}A`,
                    },
                  ]
                : []),
            ]}
          />
        </div>
      )}

      {/* Formula Reference */}
      <FormulaReference
        category={CAT}
        name="Total Harmonic Distortion"
        formula="THDi = (√(Σ I_h²) / I₁) × 100%"
        variables={[
          { symbol: 'THDi', description: 'Total harmonic distortion (current)' },
          { symbol: 'I_h', description: 'Individual harmonic current (A)' },
          { symbol: 'I₁', description: 'Fundamental current (A)' },
        ]}
      />
    </CalculatorCard>
  );
};

export default PowerQualityCalculator;
