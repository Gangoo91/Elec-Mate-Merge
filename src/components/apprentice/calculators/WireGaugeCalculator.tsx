import { useState, useCallback } from 'react';
import { Copy, Check, ChevronDown, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  CalculatorCard,
  CalculatorSection,
  CalculatorInputGrid,
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
import { formatNumber } from '@/lib/format';

const CAT = 'cable' as const;
const config = CALCULATOR_CONFIG[CAT];

interface WireData {
  metric: string;
  diameter: number;
  area: number;
  resistance: number;
  ampacity: {
    free: number;
    conduit: number;
    buried: number;
  };
}

interface CalculationResult {
  wire: WireData & { awg: string };
  analysis: {
    voltageDropPercentage: number;
    voltageDrop: number;
    powerLoss: number;
    efficiency: number;
    temperatureDerating: number;
    groupingFactor: number;
    effectiveAmpacity: number;
    adequateCapacity: boolean;
    suitableForLength: boolean;
  };
  warnings: string[];
}

const awgToMetric: Record<string, WireData> = {
  '30': {
    metric: '0.05',
    diameter: 0.254,
    area: 0.0507,
    resistance: 338.6,
    ampacity: { free: 0.52, conduit: 0.3, buried: 0.4 },
  },
  '28': {
    metric: '0.08',
    diameter: 0.321,
    area: 0.0804,
    resistance: 212.9,
    ampacity: { free: 0.83, conduit: 0.5, buried: 0.65 },
  },
  '26': {
    metric: '0.13',
    diameter: 0.404,
    area: 0.128,
    resistance: 133.9,
    ampacity: { free: 1.3, conduit: 0.8, buried: 1.0 },
  },
  '24': {
    metric: '0.2',
    diameter: 0.511,
    area: 0.205,
    resistance: 84.2,
    ampacity: { free: 2.1, conduit: 1.3, buried: 1.6 },
  },
  '22': {
    metric: '0.33',
    diameter: 0.644,
    area: 0.326,
    resistance: 52.9,
    ampacity: { free: 3.3, conduit: 2.0, buried: 2.5 },
  },
  '20': {
    metric: '0.5',
    diameter: 0.812,
    area: 0.518,
    resistance: 33.3,
    ampacity: { free: 5.2, conduit: 3.2, buried: 4.0 },
  },
  '18': {
    metric: '0.75',
    diameter: 1.024,
    area: 0.823,
    resistance: 20.9,
    ampacity: { free: 8.3, conduit: 5.1, buried: 6.4 },
  },
  '16': {
    metric: '1.3',
    diameter: 1.291,
    area: 1.31,
    resistance: 13.2,
    ampacity: { free: 13, conduit: 8, buried: 10 },
  },
  '14': {
    metric: '2.0',
    diameter: 1.628,
    area: 2.08,
    resistance: 8.29,
    ampacity: { free: 20, conduit: 15, buried: 18 },
  },
  '12': {
    metric: '2.5',
    diameter: 2.053,
    area: 3.31,
    resistance: 5.21,
    ampacity: { free: 25, conduit: 20, buried: 23 },
  },
  '10': {
    metric: '4.0',
    diameter: 2.588,
    area: 5.26,
    resistance: 3.28,
    ampacity: { free: 35, conduit: 30, buried: 33 },
  },
  '8': {
    metric: '6.0',
    diameter: 3.264,
    area: 8.37,
    resistance: 2.06,
    ampacity: { free: 55, conduit: 45, buried: 50 },
  },
  '6': {
    metric: '10',
    diameter: 4.115,
    area: 13.3,
    resistance: 1.3,
    ampacity: { free: 75, conduit: 65, buried: 70 },
  },
  '4': {
    metric: '16',
    diameter: 5.189,
    area: 21.2,
    resistance: 0.815,
    ampacity: { free: 95, conduit: 85, buried: 90 },
  },
  '2': {
    metric: '25',
    diameter: 6.544,
    area: 33.6,
    resistance: 0.513,
    ampacity: { free: 130, conduit: 115, buried: 125 },
  },
  '1': {
    metric: '35',
    diameter: 7.348,
    area: 42.4,
    resistance: 0.407,
    ampacity: { free: 150, conduit: 135, buried: 145 },
  },
  '1/0': {
    metric: '50',
    diameter: 8.251,
    area: 53.5,
    resistance: 0.323,
    ampacity: { free: 170, conduit: 155, buried: 165 },
  },
  '2/0': {
    metric: '70',
    diameter: 9.266,
    area: 67.4,
    resistance: 0.256,
    ampacity: { free: 195, conduit: 180, buried: 190 },
  },
  '3/0': {
    metric: '95',
    diameter: 10.405,
    area: 85.0,
    resistance: 0.203,
    ampacity: { free: 225, conduit: 210, buried: 220 },
  },
  '4/0': {
    metric: '120',
    diameter: 11.684,
    area: 107.2,
    resistance: 0.161,
    ampacity: { free: 260, conduit: 245, buried: 255 },
  },
};

const calculateTemperatureDerating = (temp: number): number => {
  if (temp <= 30) return 1.0;
  if (temp <= 35) return 0.94;
  if (temp <= 40) return 0.87;
  if (temp <= 45) return 0.79;
  if (temp <= 50) return 0.71;
  return 0.58;
};

const calculateGroupingFactor = (grouping: number): number => {
  if (grouping <= 1) return 1.0;
  if (grouping <= 2) return 0.8;
  if (grouping <= 3) return 0.7;
  if (grouping <= 4) return 0.65;
  if (grouping <= 6) return 0.6;
  return 0.5;
};

const WireGaugeCalculator = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const [awgSize, setAwgSize] = useState('');
  const [metricSize, setMetricSize] = useState('');
  const [inputMode, setInputMode] = useState('awg');
  const [length, setLength] = useState('');
  const [loadCurrent, setLoadCurrent] = useState('');
  const [systemVoltage, setSystemVoltage] = useState('230');
  const [ambientTemp, setAmbientTemp] = useState('30');
  const [cableGrouping, setCableGrouping] = useState('1');
  const [installationType, setInstallationType] = useState('conduit');

  const [showGuidance, setShowGuidance] = useState(false);
  const [showRegs, setShowRegs] = useState(false);

  const [result, setResult] = useState<CalculationResult | null>(null);

  const performCalculation = (): CalculationResult | null => {
    let wireData: (WireData & { awg: string }) | null = null;

    if (inputMode === 'awg' && awgSize) {
      const data = awgToMetric[awgSize];
      if (data) wireData = { ...data, awg: awgSize };
    } else if (inputMode === 'metric' && metricSize) {
      const metric = parseFloat(metricSize);
      let closestAwg = '';
      let closestDiff = Infinity;

      Object.entries(awgToMetric).forEach(([awg, data]) => {
        const diff = Math.abs(parseFloat(data.metric) - metric);
        if (diff < closestDiff) {
          closestDiff = diff;
          closestAwg = awg;
        }
      });

      if (closestAwg) {
        const data = awgToMetric[closestAwg];
        wireData = { ...data, awg: closestAwg };
      }
    }

    if (!wireData) return null;

    const tempDerating = calculateTemperatureDerating(parseFloat(ambientTemp) || 30);
    const groupingFactor = calculateGroupingFactor(parseFloat(cableGrouping) || 1);

    let baseAmpacity = wireData.ampacity.conduit;
    if (installationType === 'free') baseAmpacity = wireData.ampacity.free;
    else if (installationType === 'buried') baseAmpacity = wireData.ampacity.buried;

    const effectiveAmpacity = baseAmpacity * tempDerating * groupingFactor;

    const cableLength = parseFloat(length) || 0;
    const current = parseFloat(loadCurrent) || 0;
    const voltage = parseFloat(systemVoltage) || 230;

    let voltageDropPercentage = 0;
    let voltageDrop = 0;
    let powerLoss = 0;
    let efficiency = 100;

    if (cableLength > 0 && current > 0) {
      const totalResistance = (wireData.resistance * cableLength * 2) / 1000;
      voltageDrop = current * totalResistance;
      voltageDropPercentage = (voltageDrop / voltage) * 100;
      powerLoss = current * current * totalResistance;
      efficiency = ((voltage - voltageDrop) / voltage) * 100;
    }

    const warnings: string[] = [];

    if (current > 0) {
      const adequateCapacity = effectiveAmpacity >= current * 1.25;
      if (!adequateCapacity) {
        warnings.push(
          `Current capacity insufficient: ${formatNumber(effectiveAmpacity)}A available vs ${current}A required`
        );
      }
      if (voltageDropPercentage > 5) {
        warnings.push(
          `High voltage drop: ${formatNumber(voltageDropPercentage)}% exceeds 5% limit`
        );
      } else if (voltageDropPercentage > 3) {
        warnings.push(
          `Moderate voltage drop: ${formatNumber(voltageDropPercentage)}% — consider optimisation`
        );
      }
    }

    return {
      wire: wireData,
      analysis: {
        voltageDropPercentage,
        voltageDrop,
        powerLoss,
        efficiency,
        temperatureDerating: tempDerating,
        groupingFactor,
        effectiveAmpacity,
        adequateCapacity: current > 0 ? effectiveAmpacity >= current * 1.25 : true,
        suitableForLength: voltageDropPercentage <= 5,
      },
      warnings,
    };
  };

  const handleCalculate = useCallback(() => {
    setResult(performCalculation());
  }, [awgSize, metricSize, inputMode, length, loadCurrent, systemVoltage, ambientTemp, cableGrouping, installationType]);

  const handleReset = useCallback(() => {
    setAwgSize('');
    setMetricSize('');
    setLength('');
    setLoadCurrent('');
    setSystemVoltage('230');
    setAmbientTemp('30');
    setCableGrouping('1');
    setInstallationType('conduit');
    setInputMode('awg');
    setResult(null);
  }, []);

  const handleCopy = () => {
    if (!result) return;
    const text = [
      'Wire Gauge Analysis',
      `Wire: AWG ${result.wire.awg} (${result.wire.metric}mm²)`,
      `Diameter: ${formatNumber(result.wire.diameter, 2)}mm`,
      `Resistance: ${formatNumber(result.wire.resistance, 1)} mΩ/m`,
      `Effective Capacity: ${formatNumber(result.analysis.effectiveAmpacity, 0)}A`,
      `Temp Derating: ${formatNumber(result.analysis.temperatureDerating * 100)}%`,
      ...(result.analysis.voltageDropPercentage > 0
        ? [
            `Voltage Drop: ${formatNumber(result.analysis.voltageDropPercentage, 1)}%`,
            `Power Loss: ${formatNumber(result.analysis.powerLoss, 0)}W`,
          ]
        : []),
    ].join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({ title: 'Copied to clipboard' });
    setTimeout(() => setCopied(false), 2000);
  };

  const hasValidInputs = () => {
    return inputMode === 'awg' ? !!awgSize : !!metricSize;
  };

  const getOverallStatus = (): 'pass' | 'warning' | 'fail' => {
    if (!result) return 'pass';
    if (!result.analysis.adequateCapacity) return 'fail';
    if (result.warnings.length > 0) return 'warning';
    return 'pass';
  };

  const getStatusLabel = (): string => {
    if (!result) return '';
    if (!result.analysis.adequateCapacity) return 'Insufficient';
    if (result.warnings.length > 0) return 'Review Needed';
    return 'Compliant';
  };

  const awgOptions = Object.keys(awgToMetric).map((awg) => ({
    value: awg,
    label: `AWG ${awg} (${awgToMetric[awg].metric}mm²)`,
  }));

  const hasVoltageDropData = result && parseFloat(length) > 0 && parseFloat(loadCurrent) > 0;

  return (
    <CalculatorCard
      category={CAT}
      title="Wire Gauge Calculator"
      description="AWG/metric conversion with voltage drop analysis"
    >
      {/* Input Mode Selection */}
      <CalculatorSelect
        label="Input Type"
        value={inputMode}
        onChange={setInputMode}
        options={[
          { value: 'awg', label: 'AWG Size' },
          { value: 'metric', label: 'Metric Size (mm²)' },
        ]}
      />

      {inputMode === 'awg' ? (
        <CalculatorSelect
          label="AWG Size"
          value={awgSize}
          onChange={setAwgSize}
          options={awgOptions}
          placeholder="Select AWG size"
        />
      ) : (
        <CalculatorInput
          label="Metric Size"
          unit="mm²"
          type="text"
          inputMode="decimal"
          value={metricSize}
          onChange={setMetricSize}
          placeholder="e.g., 2.5"
          hint="Cross-sectional area"
        />
      )}

      {/* Installation Analysis */}
      <CalculatorSection title="Installation Analysis">
        <CalculatorInputGrid columns={2} className="grid-cols-2">
          <CalculatorInput
            label="Cable Length"
            unit="m"
            type="text"
            inputMode="decimal"
            value={length}
            onChange={setLength}
            placeholder="e.g., 25"
            hint="One-way distance"
          />
          <CalculatorInput
            label="Load Current"
            unit="A"
            type="text"
            inputMode="decimal"
            value={loadCurrent}
            onChange={setLoadCurrent}
            placeholder="e.g., 16"
          />
        </CalculatorInputGrid>

        <CalculatorInputGrid columns={2} className="grid-cols-2">
          <CalculatorSelect
            label="System Voltage"
            value={systemVoltage}
            onChange={setSystemVoltage}
            options={[
              { value: '230', label: '230V (Single Phase)' },
              { value: '400', label: '400V (Three Phase)' },
              { value: '110', label: '110V (Site/Tools)' },
              { value: '12', label: '12V (Low Voltage)' },
              { value: '24', label: '24V (Low Voltage)' },
            ]}
          />
          <CalculatorSelect
            label="Installation Method"
            value={installationType}
            onChange={setInstallationType}
            options={[
              { value: 'conduit', label: 'In Conduit/Trunking' },
              { value: 'free', label: 'Free Air' },
              { value: 'buried', label: 'Direct Buried' },
            ]}
          />
        </CalculatorInputGrid>

        <CalculatorInputGrid columns={2} className="grid-cols-2">
          <CalculatorInput
            label="Ambient Temperature"
            unit="°C"
            type="text"
            inputMode="numeric"
            value={ambientTemp}
            onChange={setAmbientTemp}
            placeholder="30"
          />
          <CalculatorInput
            label="Cables in Group"
            type="text"
            inputMode="numeric"
            value={cableGrouping}
            onChange={setCableGrouping}
            placeholder="1"
          />
        </CalculatorInputGrid>
      </CalculatorSection>

      <CalculatorActions
        category={CAT}
        onCalculate={handleCalculate}
        onReset={handleReset}
        isDisabled={!hasValidInputs()}
        calculateLabel="Calculate"
        showReset={!!result}
      />

      {/* ── Results ── */}
      {result && (
        <div className="space-y-4 animate-fade-in">
          {/* Status + Copy */}
          <div className="flex items-center justify-between">
            <ResultBadge status={getOverallStatus()} label={getStatusLabel()} />
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
            <p className="text-sm font-medium text-white mb-1">Wire Size</p>
            <p
              className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
              }}
            >
              AWG {result.wire.awg}
            </p>
            <p className="text-sm text-white mt-2">{result.wire.metric}mm²</p>
          </div>

          {/* Wire properties */}
          <ResultsGrid columns={2}>
            <ResultValue
              label="Diameter"
              value={formatNumber(result.wire.diameter, 2)}
              unit="mm"
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="Resistance"
              value={formatNumber(result.wire.resistance, 1)}
              unit="mΩ/m"
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="Current Capacity"
              value={formatNumber(result.analysis.effectiveAmpacity, 0)}
              unit="A"
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="Temp Derating"
              value={formatNumber(result.analysis.temperatureDerating * 100)}
              unit="%"
              category={CAT}
              size="sm"
            />
          </ResultsGrid>

          {/* Voltage Drop Analysis */}
          {hasVoltageDropData && (
            <>
              <ResultsGrid columns={2}>
                <ResultValue
                  label="Voltage Drop"
                  value={formatNumber(result.analysis.voltageDropPercentage, 1)}
                  unit="%"
                  category={CAT}
                  size="sm"
                />
                <ResultValue
                  label="Drop (V)"
                  value={formatNumber(result.analysis.voltageDrop, 1)}
                  unit="V"
                  category={CAT}
                  size="sm"
                />
                <ResultValue
                  label="Power Loss"
                  value={
                    result.analysis.powerLoss >= 1000
                      ? formatNumber(result.analysis.powerLoss / 1000, 1)
                      : formatNumber(result.analysis.powerLoss, 0)
                  }
                  unit={result.analysis.powerLoss >= 1000 ? 'kW' : 'W'}
                  category={CAT}
                  size="sm"
                />
                <ResultValue
                  label="Efficiency"
                  value={formatNumber(result.analysis.efficiency, 1)}
                  unit="%"
                  category={CAT}
                  size="sm"
                />
              </ResultsGrid>

              {/* Compliance status */}
              <div
                className={cn(
                  'flex items-center gap-2 p-3 rounded-lg border text-sm',
                  result.analysis.suitableForLength && result.analysis.adequateCapacity
                    ? 'bg-green-500/5 border-green-500/20'
                    : 'bg-red-500/5 border-red-500/20'
                )}
              >
                {result.analysis.suitableForLength && result.analysis.adequateCapacity ? (
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                )}
                <span className="text-white font-medium">
                  {result.analysis.suitableForLength
                    ? 'Meets BS 7671 voltage drop requirements (≤5%)'
                    : 'Exceeds BS 7671 voltage drop limits'}
                </span>
              </div>
            </>
          )}

          {/* Warnings */}
          {result.warnings.length > 0 && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
              <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
              <div className="space-y-1">
                {result.warnings.map((warning, index) => (
                  <p key={index} className="text-sm text-white">{warning}</p>
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
                label: 'Wire identification',
                formula: `AWG ${result.wire.awg} → ${result.wire.metric}mm² (${formatNumber(result.wire.diameter, 2)}mm diameter)`,
                value: `Base resistance: ${formatNumber(result.wire.resistance, 1)} mΩ/m`,
              },
              {
                label: 'Base current capacity',
                formula: `${installationType} installation → ${formatNumber(result.analysis.effectiveAmpacity / result.analysis.temperatureDerating / result.analysis.groupingFactor, 0)}A base`,
                value: `Installation method: ${installationType}`,
              },
              {
                label: 'Derating factors',
                formula: `${formatNumber(result.analysis.effectiveAmpacity / result.analysis.temperatureDerating / result.analysis.groupingFactor, 0)}A × ${formatNumber(result.analysis.temperatureDerating, 2)} (temp) × ${formatNumber(result.analysis.groupingFactor, 2)} (grouping)`,
                value: `${formatNumber(result.analysis.effectiveAmpacity, 0)}A effective capacity`,
              },
              ...(hasVoltageDropData
                ? [
                    {
                      label: 'Voltage drop',
                      formula: `Vd = ${loadCurrent}A × ${formatNumber(result.wire.resistance, 1)} mΩ/m × 2 × ${length}m ÷ 1000`,
                      value: `${formatNumber(result.analysis.voltageDrop, 1)}V (${formatNumber(result.analysis.voltageDropPercentage, 1)}%)`,
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
                className="p-3 rounded-xl border space-y-3"
                style={{
                  borderColor: `${config.gradientFrom}15`,
                  background: `${config.gradientFrom}05`,
                }}
              >
                {parseFloat(loadCurrent) > 0 && (
                  <p className="text-sm text-white">
                    This cable can safely carry{' '}
                    <span className="font-medium">
                      {formatNumber(result.analysis.effectiveAmpacity)}A
                    </span>{' '}
                    continuous load in {installationType} installation.
                  </p>
                )}
                {result.analysis.voltageDropPercentage > 0 && (
                  <p className="text-sm text-white">
                    Voltage drop of{' '}
                    <span className="font-medium">
                      {formatNumber(result.analysis.voltageDropPercentage, 1)}%
                    </span>{' '}
                    {result.analysis.voltageDropPercentage <= 5 ? 'meets' : 'exceeds'} BS 7671
                    requirements.
                  </p>
                )}
                {result.analysis.powerLoss > 0 && (
                  <p className="text-sm text-white">
                    Power losses of{' '}
                    <span className="font-medium">{formatNumber(result.analysis.powerLoss)}W</span>{' '}
                    reduce system efficiency.
                  </p>
                )}
                <div className="space-y-1 pt-2 border-t border-white/10">
                  <p className="text-sm text-white font-medium">Practical Tips</p>
                  <ul className="space-y-1">
                    {[
                      'Verify actual installation conditions match calculations',
                      'Consider future load increases when selecting cable size',
                      'Use appropriate protective devices rated for cable ampacity',
                      'Ensure adequate mechanical protection for installation method',
                      ...(parseFloat(ambientTemp) > 40
                        ? ['High ambient temperature — consider ventilation']
                        : []),
                    ].map((tip, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-white">
                        <span
                          className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                          style={{ backgroundColor: config.gradientFrom }}
                        />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* ── BS 7671 Reference ── */}
          <Collapsible open={showRegs} onOpenChange={setShowRegs}>
            <CollapsibleTrigger className="flex items-center justify-between w-full min-h-11 py-2.5 px-3 rounded-lg text-sm font-medium text-white hover:bg-white/5 transition-all touch-manipulation">
              <span>BS 7671 Reference</span>
              <ChevronDown
                className={cn(
                  'h-4 w-4 transition-transform duration-200',
                  showRegs && 'rotate-180'
                )}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2">
              <div
                className="p-3 rounded-xl border space-y-2"
                style={{
                  borderColor: `${config.gradientFrom}15`,
                  background: `${config.gradientFrom}05`,
                }}
              >
                <ul className="space-y-2">
                  {[
                    { reg: 'Section 523', desc: 'Current-carrying capacity' },
                    { reg: 'Appendix 4', desc: 'Voltage drop limits (5%)' },
                    { reg: 'Regulation 411', desc: 'Protective measures' },
                    { reg: 'Section 433', desc: 'Overload protection' },
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
        name="Voltage Drop"
        formula="Vd = I × R × 2L"
        variables={[
          { symbol: 'Vd', description: 'Voltage drop (V)' },
          { symbol: 'I', description: 'Load current (A)' },
          { symbol: 'R', description: 'Conductor resistance (mΩ/m)' },
          { symbol: '2L', description: 'Total cable length (go and return)' },
        ]}
      />
    </CalculatorCard>
  );
};

export default WireGaugeCalculator;
