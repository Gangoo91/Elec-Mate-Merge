import { useMemo, useState, useCallback } from 'react';
import { Copy, Check, CheckCircle, AlertTriangle, ChevronDown, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  CalculatorCard,
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

const CAT = 'protection' as const;
const config = CALCULATOR_CONFIG[CAT];

const STANDARD_SIZES = [
  1, 1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120, 150, 185, 240, 300, 400,
];

const K_FACTORS: Record<string, Record<number, number>> = {
  copper: { 60: 103, 70: 115, 90: 143 },
  aluminium: { 60: 65, 70: 76, 90: 87 },
  steel: { 60: 46, 70: 50, 90: 50 },
};

const modeOptions = [
  { value: 'current', label: 'Enter Fault Current (I)' },
  { value: 'zs', label: 'Calculate I from Zs' },
];

const timePresetOptions = [
  { value: '0.1', label: '0.1 s' },
  { value: '0.2', label: '0.2 s' },
  { value: '0.4', label: '0.4 s' },
  { value: '1', label: '1 s' },
  { value: '5', label: '5 s' },
  { value: 'custom', label: 'Custom' },
];

const materialOptions = [
  { value: 'copper', label: 'Copper' },
  { value: 'aluminium', label: 'Aluminium' },
  { value: 'steel', label: 'Steel' },
];

const tempOptions = [
  { value: '60', label: '60°C (Rubber/EPR)' },
  { value: '70', label: '70°C (PVC)' },
  { value: '90', label: '90°C (XLPE)' },
];

interface AdiabaticResult {
  minimumCsa: number;
  roundedCsa: number;
  k: number;
  usedFaultCurrent: number;
  disconnectionTime: number;
  material: string;
  maxTemp: string;
  isCompliant: boolean;
  complianceNotes: string[];
  safetyMargin: number;
  zsMode: boolean;
  zsValue?: number;
  voltage?: number;
}

const AdiabaticCalculator = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const [mode, setMode] = useState<'current' | 'zs'>('current');
  const [disconnectionTime, setDisconnectionTime] = useState<string>('');
  const [timePreset, setTimePreset] = useState<string>('custom');
  const [material, setMaterial] = useState<string>('copper');
  const [maxTemp, setMaxTemp] = useState<string>('70');
  const [customK, setCustomK] = useState<string>('');
  const [faultCurrent, setFaultCurrent] = useState<string>('');
  const [zs, setZs] = useState<string>('');
  const [voltage, setVoltage] = useState<string>('230');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<AdiabaticResult | null>(null);

  // Collapsible states
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showGuidance, setShowGuidance] = useState(false);
  const [showReference, setShowReference] = useState(false);

  // Derived display values (not results)
  const effectiveK = useMemo(() => {
    const kFromMap = K_FACTORS[material]?.[parseFloat(maxTemp)] ?? 115;
    const kCustom = parseFloat(customK);
    return Number.isFinite(kCustom) && kCustom > 0 ? kCustom : kFromMap;
  }, [material, maxTemp, customK]);

  const effectiveTime = useMemo(() => {
    if (timePreset !== 'custom') return parseFloat(timePreset);
    const t = parseFloat(disconnectionTime);
    return Number.isFinite(t) && t > 0 ? t : NaN;
  }, [timePreset, disconnectionTime]);

  const computeFaultCurrent = useMemo(() => {
    if (mode === 'current') {
      const I = parseFloat(faultCurrent);
      return Number.isFinite(I) && I > 0 ? I : NaN;
    }
    const z = parseFloat(zs);
    const v = parseFloat(voltage);
    if (!Number.isFinite(z) || z <= 0 || !Number.isFinite(v) || v <= 0) return NaN;
    return v / z;
  }, [mode, faultCurrent, zs, voltage]);

  function roundUpToStandard(size: number) {
    for (const s of STANDARD_SIZES) {
      if (size <= s) return s;
    }
    return STANDARD_SIZES[STANDARD_SIZES.length - 1];
  }

  const validateInputs = () => {
    const newErrors: Record<string, string> = {};
    if (mode === 'current') {
      if (!faultCurrent || parseFloat(faultCurrent) <= 0) {
        newErrors.faultCurrent = 'Fault current must be > 0';
      }
    } else {
      if (!zs || parseFloat(zs) <= 0) newErrors.zs = 'Zs must be > 0';
      if (!voltage || parseFloat(voltage) <= 0) newErrors.voltage = 'Voltage must be > 0';
    }
    if (timePreset === 'custom' && (!disconnectionTime || parseFloat(disconnectionTime) <= 0)) {
      newErrors.disconnectionTime = 'Time must be > 0';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCalculate = useCallback(() => {
    if (!validateInputs()) return;

    const I = computeFaultCurrent;
    const t = effectiveTime;
    const k = effectiveK;

    if (
      !Number.isFinite(I) ||
      I <= 0 ||
      !Number.isFinite(t) ||
      t <= 0 ||
      !Number.isFinite(k) ||
      k <= 0
    ) {
      setResult(null);
      return;
    }

    const minimumCsa = (I * Math.sqrt(t)) / k;
    const roundedCsa = roundUpToStandard(minimumCsa);
    const safetyMargin = (roundedCsa / minimumCsa - 1) * 100;

    const complianceNotes: string[] = [];
    let isCompliant = true;

    if (t > 5) {
      complianceNotes.push(
        'Disconnection time >5s may require additional considerations per BS 7671'
      );
      isCompliant = false;
    }
    if (I > 10000) {
      complianceNotes.push(
        'Very high fault current — verify calculation method and protection coordination'
      );
    }
    if (roundedCsa < 1.5) {
      complianceNotes.push('Minimum 1.5mm² generally required for fixed wiring per BS 7671');
    }

    setResult({
      minimumCsa,
      roundedCsa,
      k,
      usedFaultCurrent: I,
      disconnectionTime: t,
      material,
      maxTemp,
      isCompliant,
      complianceNotes,
      safetyMargin,
      zsMode: mode === 'zs',
      zsValue: mode === 'zs' ? parseFloat(zs) : undefined,
      voltage: mode === 'zs' ? parseFloat(voltage) : undefined,
    });
  }, [computeFaultCurrent, effectiveTime, effectiveK, mode, zs, voltage, material, maxTemp]);

  const handleReset = useCallback(() => {
    setMode('current');
    setFaultCurrent('');
    setZs('');
    setVoltage('230');
    setDisconnectionTime('');
    setTimePreset('custom');
    setMaterial('copper');
    setMaxTemp('70');
    setCustomK('');
    setResult(null);
    setErrors({});
  }, []);

  const handleCopy = () => {
    if (!result) return;
    let text = `Adiabatic Equation Calculator\nMinimum CSA: ${result.minimumCsa.toFixed(2)} mm²`;
    text += `\nStandard Size: ${result.roundedCsa} mm²`;
    text += `\nFault Current: ${result.usedFaultCurrent.toFixed(0)} A`;
    text += `\nDisconnection Time: ${result.disconnectionTime} s`;
    text += `\nk Factor: ${result.k} (${result.material} @ ${result.maxTemp}°C)`;
    text += `\nSafety Margin: ${result.safetyMargin.toFixed(1)}%`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({ title: 'Copied to clipboard' });
    setTimeout(() => setCopied(false), 2000);
  };

  const canCalculate = mode === 'current' ? !!faultCurrent : !!zs && !!voltage;

  return (
    <CalculatorCard
      category={CAT}
      title="Adiabatic Equation Calculator"
      description="Calculate minimum cable CSA to withstand fault current per BS 7671"
    >
      <CalculatorSelect
        label="Input Mode"
        value={mode}
        onChange={(v) => setMode(v as 'current' | 'zs')}
        options={modeOptions}
      />

      {mode === 'current' ? (
        <CalculatorInput
          label="Prospective Fault Current (I)"
          unit="A"
          type="text"
          inputMode="decimal"
          value={faultCurrent}
          onChange={setFaultCurrent}
          placeholder="e.g., 1000"
          error={errors.faultCurrent}
          hint="Prospective fault current at connection point"
        />
      ) : (
        <div className="space-y-4">
          <CalculatorInputGrid columns={2}>
            <CalculatorInput
              label="Earth Fault Loop Impedance (Zs)"
              unit="Ω"
              type="text"
              inputMode="decimal"
              value={zs}
              onChange={setZs}
              placeholder="e.g., 0.35"
              error={errors.zs}
            />
            <CalculatorInput
              label="Supply Voltage (Uo)"
              unit="V"
              type="text"
              inputMode="decimal"
              value={voltage}
              onChange={setVoltage}
              placeholder="230"
              error={errors.voltage}
            />
          </CalculatorInputGrid>

          {Number.isFinite(computeFaultCurrent) && computeFaultCurrent > 0 && (
            <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20">
              <div className="flex items-center gap-2 text-sm">
                <Zap className="h-4 w-4 text-orange-400" />
                <span className="text-white">Calculated fault current:</span>
                <span className="font-mono font-bold text-orange-400">
                  {computeFaultCurrent.toFixed(0)} A
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      <CalculatorSelect
        label="Disconnection Time"
        value={timePreset}
        onChange={setTimePreset}
        options={timePresetOptions}
      />

      {timePreset === 'custom' && (
        <CalculatorInput
          label="Custom Time (t)"
          unit="s"
          type="text"
          inputMode="decimal"
          value={disconnectionTime}
          onChange={setDisconnectionTime}
          placeholder="e.g., 0.4"
          error={errors.disconnectionTime}
        />
      )}

      <CalculatorInputGrid columns={2}>
        <CalculatorSelect
          label="Conductor Material"
          value={material}
          onChange={setMaterial}
          options={materialOptions}
        />
        <CalculatorSelect
          label="Insulation / Max Temp"
          value={maxTemp}
          onChange={setMaxTemp}
          options={tempOptions}
        />
      </CalculatorInputGrid>

      {/* Advanced Options */}
      <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
        <div
          className="rounded-xl border overflow-hidden"
          style={{
            borderColor: `${config.gradientFrom}30`,
            background: `${config.gradientFrom}08`,
          }}
        >
          <CollapsibleTrigger className="flex items-center justify-between w-full min-h-11 px-4 py-2 text-sm font-medium text-white hover:bg-white/5 transition-all touch-manipulation">
            <span>Advanced Options</span>
            <ChevronDown
              className={cn(
                'h-4 w-4 transition-transform duration-200',
                showAdvanced && 'rotate-180'
              )}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="px-4 pb-4">
            <CalculatorInput
              label="Custom k Factor (optional)"
              type="text"
              inputMode="decimal"
              value={customK}
              onChange={setCustomK}
              placeholder={`Default: ${effectiveK}`}
              hint="Override material-based k factor from BS 7671 Table 54.3"
            />
          </CollapsibleContent>
        </div>
      </Collapsible>

      <CalculatorActions
        category={CAT}
        onCalculate={handleCalculate}
        onReset={handleReset}
        isDisabled={!canCalculate}
        showReset={!!result}
      />

      {/* ── Results ── */}
      {result && (
        <div className="space-y-4 animate-fade-in">
          {/* Status + Copy */}
          <div className="flex items-center justify-between">
            <ResultBadge
              status={result.isCompliant ? 'pass' : 'warning'}
              label={
                result.isCompliant
                  ? `${result.material.charAt(0).toUpperCase() + result.material.slice(1)} @ ${result.maxTemp}°C (k=${result.k})`
                  : 'Review Required'
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
            <p className="text-sm font-medium text-white mb-1">Standard Cable Size</p>
            <p
              className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
              }}
            >
              {result.roundedCsa} mm²
            </p>
            <p className="text-sm text-white mt-2">
              Minimum required: {result.minimumCsa.toFixed(2)} mm²
            </p>
          </div>

          {/* Result cards */}
          <ResultsGrid columns={2}>
            <ResultValue
              label="Minimum CSA"
              value={result.minimumCsa.toFixed(2)}
              unit="mm²"
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="Safety Margin"
              value={`${result.safetyMargin.toFixed(1)}%`}
              category={CAT}
              size="sm"
            />
          </ResultsGrid>

          {/* Safety margin indicator */}
          {result.roundedCsa !== result.minimumCsa && (
            <div className="flex items-center justify-between p-3 rounded-lg border text-sm bg-green-500/5 border-green-500/20">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 shrink-0" />
                <span className="text-white font-medium">Safety Margin</span>
              </div>
              <span className="text-white shrink-0 ml-2">
                {result.roundedCsa}mm² is {result.safetyMargin.toFixed(1)}% above minimum
              </span>
            </div>
          )}

          {/* Compliance notes */}
          {result.complianceNotes.length > 0 && (
            <div
              className={cn(
                'p-3 rounded-lg border text-sm',
                result.isCompliant
                  ? 'bg-amber-500/5 border-amber-500/20'
                  : 'bg-red-500/5 border-red-500/20'
              )}
            >
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle
                  className={cn('h-4 w-4', result.isCompliant ? 'text-amber-400' : 'text-red-400')}
                />
                <span className="text-white font-medium">Compliance Notes</span>
              </div>
              <ul className="space-y-1">
                {result.complianceNotes.map((note, index) => (
                  <li key={index} className="flex items-start gap-2 text-white">
                    <span
                      className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                      style={{ backgroundColor: config.gradientFrom }}
                    />
                    {note}
                  </li>
                ))}
              </ul>
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
                formula: `I = ${result.usedFaultCurrent.toFixed(0)} A | t = ${result.disconnectionTime} s | k = ${result.k} (${result.material} @ ${result.maxTemp}°C)`,
                description: `The k factor of ${result.k} comes from BS 7671 Table 54.3 — it represents how much energy ${result.material} can absorb per mm² before the insulation (rated ${result.maxTemp}°C) is damaged.`,
              },
              ...(result.zsMode && result.zsValue && result.voltage
                ? [
                    {
                      label: 'Fault current from Zs',
                      formula: `I = Uo / Zs = ${result.voltage} / ${result.zsValue}`,
                      value: `${result.usedFaultCurrent.toFixed(0)} A`,
                      description:
                        'Fault current calculated from measured loop impedance. This is the maximum current that would flow during a dead short at this point in the circuit.',
                    },
                  ]
                : []),
              {
                label: 'Minimum CSA',
                formula: `S = I × √t / k = ${result.usedFaultCurrent.toFixed(0)} × √${result.disconnectionTime} / ${result.k}`,
                value: `${result.minimumCsa.toFixed(2)} mm²`,
                description:
                  'This is the smallest conductor that can carry the fault current for the disconnection time without the insulation exceeding its maximum temperature.',
              },
              {
                label: 'Round up to standard size',
                formula: `${result.minimumCsa.toFixed(2)} mm² → next standard cable size`,
                value: `${result.roundedCsa} mm²`,
                description:
                  'Cables only come in standard sizes. We round up to the next available size to ensure the cable is never undersized.',
              },
              {
                label: 'Safety margin',
                value: `${result.safetyMargin.toFixed(1)}% above minimum requirement`,
                description:
                  result.safetyMargin > 50
                    ? 'Generous safety margin — the selected standard size is well above the minimum. This gives extra protection against unexpected fault conditions.'
                    : result.safetyMargin > 10
                      ? 'Adequate safety margin above the calculated minimum.'
                      : 'Tight margin — the cable only just meets the requirement. Consider using the next size up for additional protection.',
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
                  <p className="text-sm text-white font-medium">Why This Matters</p>
                  <p className="text-sm text-white">
                    During a fault, thousands of amps flow through the protective conductor for a
                    fraction of a second. The "adiabatic" calculation works out whether the cable
                    can handle that energy without its insulation melting or catching fire — it
                    assumes all the heat stays in the conductor (no time to dissipate).
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-white font-medium">When You Need This</p>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2 text-sm text-white">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      Sizing earthing conductors and main bonding conductors
                    </li>
                    <li className="flex items-start gap-2 text-sm text-white">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      Verifying protective conductors in existing installations
                    </li>
                    <li className="flex items-start gap-2 text-sm text-white">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      Checking CPCs are adequate where reduced sizes are used (e.g., 1mm² CPC in a
                      2.5mm² T&E)
                    </li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-white font-medium">Common k Factors (Table 54.3)</p>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2 text-sm text-white">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      Copper/PVC (70°C): k = 115 — most domestic cables
                    </li>
                    <li className="flex items-start gap-2 text-sm text-white">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      Copper/XLPE (90°C): k = 143 — SWA and thermosetting cables
                    </li>
                    <li className="flex items-start gap-2 text-sm text-white">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      Aluminium/PVC (70°C): k = 76 — older/commercial installations
                    </li>
                    <li className="flex items-start gap-2 text-sm text-white">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      Steel conduit (60°C): k = 46 — when used as CPC
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
                      reg: 'Regulation 543.1.3',
                      desc: 'Earthing conductor sizing using adiabatic equation',
                    },
                    {
                      reg: 'Table 54.3',
                      desc: 'k factors for protective conductors — copper, aluminium, steel at various temperatures',
                    },
                    {
                      reg: 'Regulation 434.5.2',
                      desc: 'Protection against fault current — breaking capacity requirements',
                    },
                    {
                      reg: 'Regulation 411.3.2',
                      desc: 'Maximum disconnection times for automatic disconnection of supply',
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
        name="Adiabatic Equation"
        formula="S = I × √t / k"
        variables={[
          { symbol: 'S', description: 'Minimum CSA (mm²)' },
          { symbol: 'I', description: 'Fault current (A)' },
          { symbol: 't', description: 'Disconnection time (s)' },
          { symbol: 'k', description: 'Material factor (Table 54.3)' },
        ]}
      />
    </CalculatorCard>
  );
};

export default AdiabaticCalculator;
