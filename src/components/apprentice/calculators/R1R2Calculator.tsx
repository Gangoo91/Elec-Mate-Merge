import { useState, useMemo } from 'react';
import {
  Calculator,
  Info,
  BookOpen,
  ChevronDown,
  Zap,
  CheckCircle2,
  XCircle,
  Copy,
} from 'lucide-react';
import {
  CalculatorCard,
  CalculatorDivider,
  CalculatorInput,
  CalculatorSelect,
  CalculatorActions,
  ResultValue,
  ResultsGrid,
  CALCULATOR_CONFIG,
} from '@/components/calculators/shared';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { copyToClipboard } from '@/lib/calc-utils';
import { useToast } from '@/hooks/use-toast';

// Resistance values at 20°C (mOhm/m) — BS EN 60228
const COPPER_R20: Record<string, number> = {
  '1.0': 18.1,
  '1.5': 12.1,
  '2.5': 7.41,
  '4.0': 4.61,
  '6.0': 3.08,
  '10.0': 1.83,
  '16.0': 1.15,
  '25.0': 0.727,
  '35.0': 0.524,
  '50.0': 0.387,
  '70.0': 0.268,
  '95.0': 0.193,
  '120.0': 0.153,
  '150.0': 0.124,
  '185.0': 0.0991,
  '240.0': 0.0754,
  '300.0': 0.0601,
};

const ALUMINIUM_R20: Record<string, number> = {
  '16.0': 1.91,
  '25.0': 1.2,
  '35.0': 0.868,
  '50.0': 0.641,
  '70.0': 0.443,
  '95.0': 0.32,
  '120.0': 0.253,
  '150.0': 0.206,
  '185.0': 0.164,
  '240.0': 0.125,
  '300.0': 0.1,
};

const COPPER_CSA_OPTIONS = [
  { value: '1.0', label: '1.0 mm²' },
  { value: '1.5', label: '1.5 mm²' },
  { value: '2.5', label: '2.5 mm²' },
  { value: '4.0', label: '4.0 mm²' },
  { value: '6.0', label: '6.0 mm²' },
  { value: '10.0', label: '10.0 mm²' },
  { value: '16.0', label: '16.0 mm²' },
  { value: '25.0', label: '25.0 mm²' },
  { value: '35.0', label: '35.0 mm²' },
  { value: '50.0', label: '50.0 mm²' },
  { value: '70.0', label: '70.0 mm²' },
  { value: '95.0', label: '95.0 mm²' },
  { value: '120.0', label: '120.0 mm²' },
  { value: '150.0', label: '150.0 mm²' },
  { value: '185.0', label: '185.0 mm²' },
  { value: '240.0', label: '240.0 mm²' },
  { value: '300.0', label: '300.0 mm²' },
];

const ALUMINIUM_CSA_OPTIONS = [
  { value: '16.0', label: '16.0 mm²' },
  { value: '25.0', label: '25.0 mm²' },
  { value: '35.0', label: '35.0 mm²' },
  { value: '50.0', label: '50.0 mm²' },
  { value: '70.0', label: '70.0 mm²' },
  { value: '95.0', label: '95.0 mm²' },
  { value: '120.0', label: '120.0 mm²' },
  { value: '150.0', label: '150.0 mm²' },
  { value: '185.0', label: '185.0 mm²' },
  { value: '240.0', label: '240.0 mm²' },
  { value: '300.0', label: '300.0 mm²' },
];

const MATERIAL_OPTIONS = [
  { value: 'copper', label: 'Copper' },
  { value: 'aluminium', label: 'Aluminium' },
];

const TEMP_OPTIONS = [
  { value: '70', label: '70°C (PVC / Thermoplastic)' },
  { value: '90', label: '90°C (XLPE / LSF)' },
];

interface CalcResult {
  r1: number;
  r2: number;
  r1r2: number;
  r1r2AtAmbient: number;
  tempCorrection: number;
  r20Line: number;
  r20CPC: number;
  cableLength: number;
  lineConductorCSA: string;
  cpcConductorCSA: string;
  conductorMaterial: string;
  temperature: number;
}

const R1R2Calculator = () => {
  const config = CALCULATOR_CONFIG['testing'];
  const { toast } = useToast();

  const [cableLength, setCableLength] = useState('');
  const [conductorMaterial, setConductorMaterial] = useState('copper');
  const [lineConductorCSA, setLineConductorCSA] = useState('');
  const [cpcConductorCSA, setCpcConductorCSA] = useState('');
  const [temperature, setTemperature] = useState('70');
  const [measuredValue, setMeasuredValue] = useState('');
  const [showWorkings, setShowWorkings] = useState(false);
  const [showGuidance, setShowGuidance] = useState(false);
  const [showReference, setShowReference] = useState(false);

  const csaOptions = conductorMaterial === 'aluminium' ? ALUMINIUM_CSA_OPTIONS : COPPER_CSA_OPTIONS;

  const result = useMemo((): CalcResult | null => {
    const length = parseFloat(cableLength);
    if (!length || length <= 0 || !lineConductorCSA || !cpcConductorCSA) return null;

    const resistanceData = conductorMaterial === 'copper' ? COPPER_R20 : ALUMINIUM_R20;
    const r20Line = resistanceData[lineConductorCSA];
    const r20CPC = resistanceData[cpcConductorCSA];
    if (!r20Line || !r20CPC) return null;

    const tempConstant = conductorMaterial === 'copper' ? 234.5 : 228;
    const tempCorrection = (tempConstant + parseInt(temperature)) / (tempConstant + 20);

    const r1 = (r20Line * length * tempCorrection) / 1000;
    const r2 = (r20CPC * length * tempCorrection) / 1000;
    const r1r2 = r1 + r2;
    const r1r2AtAmbient = r1r2 / tempCorrection;

    return {
      r1,
      r2,
      r1r2,
      r1r2AtAmbient,
      tempCorrection,
      r20Line,
      r20CPC,
      cableLength: length,
      lineConductorCSA,
      cpcConductorCSA,
      conductorMaterial,
      temperature: parseInt(temperature),
    };
  }, [cableLength, conductorMaterial, lineConductorCSA, cpcConductorCSA, temperature]);

  const measured = parseFloat(measuredValue);
  const hasMeasured = measuredValue && !isNaN(measured) && result;
  const measurementPasses = hasMeasured && measured <= result!.r1r2AtAmbient;

  const reset = () => {
    setCableLength('');
    setConductorMaterial('copper');
    setLineConductorCSA('');
    setCpcConductorCSA('');
    setTemperature('70');
    setMeasuredValue('');
  };

  const copyResults = async () => {
    if (!result) return;
    let text = `R1+R2 Calculation Results\n`;
    text += `Cable: ${result.cableLength}m, ${result.conductorMaterial}\n`;
    text += `Line: ${result.lineConductorCSA}mm², CPC: ${result.cpcConductorCSA}mm²\n`;
    text += `Operating temp: ${result.temperature}°C\n\n`;
    text += `R1 (Line): ${result.r1.toFixed(4)} Ohm\n`;
    text += `R2 (CPC): ${result.r2.toFixed(4)} Ohm\n`;
    text += `R1+R2 at ${result.temperature}°C: ${result.r1r2.toFixed(4)} Ohm\n`;
    text += `R1+R2 at ~20°C (test value): ${result.r1r2AtAmbient.toFixed(4)} Ohm\n`;
    if (hasMeasured) {
      text += `\nMeasured: ${measured.toFixed(4)} Ohm — ${measurementPasses ? 'PASS' : 'FAIL'}\n`;
    }
    const success = await copyToClipboard(text);
    toast({
      title: success ? 'Copied' : 'Copy failed',
      description: success ? 'R1+R2 results copied to clipboard' : 'Please try again',
      variant: success ? 'success' : 'destructive',
    });
  };

  const hasValidInputs = cableLength && lineConductorCSA && cpcConductorCSA;

  return (
    <CalculatorCard
      category="testing"
      title="R1+R2 Calculator"
      description="Calculate R1+R2 values for continuity testing per BS 7671"
    >
      {/* Inputs — flat, no container box */}
      <CalculatorInput
        label="Cable Length"
        unit="m"
        type="text"
        inputMode="decimal"
        value={cableLength}
        onChange={setCableLength}
        placeholder="e.g. 25"
        hint="Route length from DB to furthest point"
      />

      <CalculatorSelect
        label="Conductor Material"
        value={conductorMaterial}
        onChange={(v) => {
          setConductorMaterial(v);
          // Reset CSA if current selection not available for new material
          if (v === 'aluminium') {
            if (!ALUMINIUM_R20[lineConductorCSA]) setLineConductorCSA('');
            if (!ALUMINIUM_R20[cpcConductorCSA]) setCpcConductorCSA('');
          }
        }}
        options={MATERIAL_OPTIONS}
      />

      <div className="grid grid-cols-2 gap-3">
        <CalculatorSelect
          label="Line CSA"
          value={lineConductorCSA}
          onChange={setLineConductorCSA}
          options={csaOptions}
          placeholder="Select"
        />
        <CalculatorSelect
          label="CPC CSA"
          value={cpcConductorCSA}
          onChange={setCpcConductorCSA}
          options={csaOptions}
          placeholder="Select"
        />
      </div>

      <CalculatorSelect
        label="Operating Temperature"
        value={temperature}
        onChange={setTemperature}
        options={TEMP_OPTIONS}
      />

      <CalculatorInput
        label="Measured R1+R2 (Optional)"
        unit="Ω"
        type="text"
        inputMode="decimal"
        value={measuredValue}
        onChange={setMeasuredValue}
        placeholder="Your test reading"
        hint="Enter your measured value to check pass/fail"
      />

      <CalculatorActions
        category="testing"
        onCalculate={() => {}}
        onReset={reset}
        isDisabled={!hasValidInputs}
        calculateLabel="Live Results Below"
      />

      {/* Results */}
      {result && (
        <>
          <CalculatorDivider category="testing" />

          <div className="space-y-4 animate-fade-in">
            {/* Hero value */}
            <div className="rounded-xl p-4 bg-white/[0.04] text-center">
              <p className="text-sm text-white mb-1">R1+R2 Total (at {result.temperature}°C)</p>
              <div
                className="text-4xl font-bold font-mono bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                }}
              >
                {result.r1r2.toFixed(4)} Ω
              </div>
              <p className="text-sm text-white mt-2">
                Expected test reading at ~20°C:{' '}
                <span className="font-semibold font-mono">{result.r1r2AtAmbient.toFixed(4)} Ω</span>
              </p>
            </div>

            <ResultsGrid columns={2}>
              <ResultValue
                label="R1 (Line)"
                value={result.r1.toFixed(4)}
                unit="Ω"
                category="testing"
                size="sm"
              />
              <ResultValue
                label="R2 (CPC)"
                value={result.r2.toFixed(4)}
                unit="Ω"
                category="testing"
                size="sm"
              />
            </ResultsGrid>

            {/* Copy button */}
            <button
              onClick={copyResults}
              className="w-full h-11 flex items-center justify-center gap-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-medium hover:bg-white/10 transition-colors touch-manipulation"
            >
              <Copy className="h-4 w-4" />
              Copy Results
            </button>

            {/* Measured value comparison */}
            {hasMeasured && (
              <div
                className={cn(
                  'p-4 rounded-xl border',
                  measurementPasses
                    ? 'bg-emerald-500/10 border-emerald-500/20'
                    : 'bg-red-500/10 border-red-500/20'
                )}
              >
                <div className="flex items-center gap-2 mb-2">
                  {measurementPasses ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-400" />
                  )}
                  <span
                    className={cn(
                      'font-semibold text-sm',
                      measurementPasses ? 'text-emerald-300' : 'text-red-300'
                    )}
                  >
                    {measurementPasses ? 'PASS — Within Limits' : 'FAIL — Exceeds Limit'}
                  </span>
                </div>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-white">Your measured value:</span>
                    <span className="text-white font-mono font-medium">
                      {measured.toFixed(4)} Ω
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white">Maximum at ~20°C:</span>
                    <span className="text-white font-mono font-medium">
                      {result.r1r2AtAmbient.toFixed(4)} Ω
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white">Margin:</span>
                    <span
                      className={cn(
                        'font-mono font-medium',
                        measurementPasses ? 'text-emerald-400' : 'text-red-400'
                      )}
                    >
                      {measurementPasses ? '-' : '+'}
                      {Math.abs(result.r1r2AtAmbient - measured).toFixed(4)} Ω
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Circuit summary */}
            <div className="space-y-1 text-sm">
              <div className="flex justify-between p-2 rounded-lg bg-white/[0.04]">
                <span className="text-white">Cable</span>
                <span className="text-white font-medium">
                  {result.cableLength}m {result.conductorMaterial}
                </span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-white/[0.04]">
                <span className="text-white">Line / CPC</span>
                <span className="text-white font-medium">
                  {result.lineConductorCSA} / {result.cpcConductorCSA} mm²
                </span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-white/[0.04]">
                <span className="text-white">Temperature correction</span>
                <span className="text-white font-medium font-mono">
                  ×{result.tempCorrection.toFixed(4)}
                </span>
              </div>
            </div>
          </div>

          <CalculatorDivider category="testing" />

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
                  <p className="text-xs text-purple-400 mb-1">
                    Step 1: Base resistance at 20°C (BS EN 60228)
                  </p>
                  <div className="pl-3 border-l-2 border-purple-500/30 space-y-0.5">
                    <p>
                      Line ({result.lineConductorCSA}mm² {result.conductorMaterial}): r₁ ={' '}
                      {result.r20Line} mΩ/m
                    </p>
                    <p>
                      CPC ({result.cpcConductorCSA}mm² {result.conductorMaterial}): r₂ ={' '}
                      {result.r20CPC} mΩ/m
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="pt-2 border-t border-purple-500/20">
                  <p className="text-xs text-purple-400 mb-1">
                    Step 2: Temperature correction factor
                  </p>
                  <div className="pl-3 border-l-2 border-purple-500/30 space-y-0.5">
                    <p>
                      Ct = ({result.conductorMaterial === 'copper' ? '234.5' : '228'} +{' '}
                      {result.temperature}) / (
                      {result.conductorMaterial === 'copper' ? '234.5' : '228'} + 20)
                    </p>
                    <p>
                      Ct = <span className="font-bold">{result.tempCorrection.toFixed(4)}</span>
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="pt-2 border-t border-purple-500/20">
                  <p className="text-xs text-purple-400 mb-1">
                    Step 3: R1 (line conductor resistance)
                  </p>
                  <div className="pl-3 border-l-2 border-purple-500/30 space-y-0.5">
                    <p>R1 = (r₁ × L × Ct) / 1000</p>
                    <p>
                      R1 = ({result.r20Line} × {result.cableLength} ×{' '}
                      {result.tempCorrection.toFixed(4)}) / 1000
                    </p>
                    <p>
                      R1 = <span className="font-bold">{result.r1.toFixed(4)} Ω</span>
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="pt-2 border-t border-purple-500/20">
                  <p className="text-xs text-purple-400 mb-1">Step 4: R2 (CPC resistance)</p>
                  <div className="pl-3 border-l-2 border-purple-500/30 space-y-0.5">
                    <p>R2 = (r₂ × L × Ct) / 1000</p>
                    <p>
                      R2 = ({result.r20CPC} × {result.cableLength} ×{' '}
                      {result.tempCorrection.toFixed(4)}) / 1000
                    </p>
                    <p>
                      R2 = <span className="font-bold">{result.r2.toFixed(4)} Ω</span>
                    </p>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="pt-2 border-t border-purple-500/20">
                  <p className="text-xs text-purple-400 mb-1">Step 5: R1+R2 total</p>
                  <div className="pl-3 border-l-2 border-purple-500/30 space-y-0.5">
                    <p>
                      R1+R2 = {result.r1.toFixed(4)} + {result.r2.toFixed(4)}
                    </p>
                    <p>
                      R1+R2 = <span className="font-bold">{result.r1r2.toFixed(4)} Ω</span> (at{' '}
                      {result.temperature}°C)
                    </p>
                  </div>
                </div>

                {/* Step 6 */}
                <div className="pt-2 border-t border-purple-500/20">
                  <p className="text-xs text-purple-400 mb-1">
                    Step 6: Expected test reading at ~20°C
                  </p>
                  <div className="pl-3 border-l-2 border-purple-500/30 space-y-0.5">
                    <p>
                      R1+R2 (20°C) = R1+R2 / Ct = {result.r1r2.toFixed(4)} /{' '}
                      {result.tempCorrection.toFixed(4)}
                    </p>
                    <p>
                      R1+R2 (20°C) ={' '}
                      <span className="font-bold">{result.r1r2AtAmbient.toFixed(4)} Ω</span>
                    </p>
                    <p className="text-xs text-white mt-1">
                      Your measured value at ambient should be ≤ this value
                    </p>
                  </div>
                </div>

                {/* Step 7 — if measured */}
                {hasMeasured && (
                  <div className="pt-2 border-t border-purple-500/20">
                    <p className="text-xs text-purple-400 mb-1">
                      Step 7: Compare with measured value
                    </p>
                    <div className="pl-3 border-l-2 border-purple-500/30 space-y-0.5">
                      <p>
                        Measured: {measured.toFixed(4)} Ω {measurementPasses ? '≤' : '>'}{' '}
                        {result.r1r2AtAmbient.toFixed(4)} Ω
                      </p>
                      <p>
                        Result:{' '}
                        <span
                          className={cn(
                            'font-bold',
                            measurementPasses ? 'text-emerald-400' : 'text-red-400'
                          )}
                        >
                          {measurementPasses ? 'PASS' : 'FAIL'}
                        </span>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* What This Means */}
          <Collapsible open={showGuidance} onOpenChange={setShowGuidance}>
            <CollapsibleTrigger className="calculator-collapsible-trigger w-full">
              <div className="flex items-center gap-3">
                <Info className="h-4 w-4 text-blue-400" />
                <span className="text-sm sm:text-base font-medium text-white">What This Means</span>
              </div>
              <ChevronDown
                className={cn(
                  'h-4 w-4 text-white transition-transform duration-200',
                  showGuidance && 'rotate-180'
                )}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2">
              <div className="space-y-3 pl-1">
                <div className="border-l-2 border-blue-400/40 pl-3">
                  <p className="text-sm text-white">
                    <strong>R1:</strong> Resistance of the line conductor from origin to furthest
                    point of the circuit
                  </p>
                </div>
                <div className="border-l-2 border-blue-400/40 pl-3">
                  <p className="text-sm text-white">
                    <strong>R2:</strong> Resistance of the circuit protective conductor (CPC/earth)
                  </p>
                </div>
                <div className="border-l-2 border-blue-400/40 pl-3">
                  <p className="text-sm text-white">
                    <strong>R1+R2:</strong> Combined resistance used in Zs calculations — Zs = Ze +
                    (R1+R2)
                  </p>
                </div>
                <div className="border-l-2 border-blue-400/40 pl-3">
                  <p className="text-sm text-white">
                    <strong>Temperature correction:</strong> Testing is done at ambient (~20°C) but
                    cables operate at 70°C or 90°C. The correction factor accounts for resistance
                    increase under load.
                  </p>
                </div>
                <div className="border-l-2 border-blue-400/40 pl-3">
                  <p className="text-sm text-white">
                    <strong>Practical use:</strong> Compare your measured R1+R2 with the calculated
                    value at 20°C. If your reading is higher, check for loose connections, damaged
                    conductors, or incorrect terminations.
                  </p>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* BS 7671 Reference */}
          <Collapsible open={showReference} onOpenChange={setShowReference}>
            <CollapsibleTrigger className="calculator-collapsible-trigger w-full">
              <div className="flex items-center gap-3">
                <BookOpen className="h-4 w-4 text-amber-400" />
                <span className="text-sm sm:text-base font-medium text-white">
                  BS 7671 Reference
                </span>
              </div>
              <ChevronDown
                className={cn(
                  'h-4 w-4 text-white transition-transform duration-200',
                  showReference && 'rotate-180'
                )}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2">
              <div className="space-y-3 pl-1">
                <div className="border-l-2 border-amber-400/40 pl-3">
                  <p className="text-sm text-white">
                    <strong>Reg 612.2:</strong> Continuity of protective conductors including main
                    and supplementary bonding
                  </p>
                </div>
                <div className="border-l-2 border-amber-400/40 pl-3">
                  <p className="text-sm text-white">
                    <strong>Reg 411.4.5:</strong> Maximum earth fault loop impedance (Zs)
                    requirements
                  </p>
                </div>
                <div className="border-l-2 border-amber-400/40 pl-3">
                  <p className="text-sm text-white">
                    <strong>Table 54.7:</strong> Minimum CPC cross-sectional areas and resistance
                    values at 20°C
                  </p>
                </div>
                <div className="border-l-2 border-amber-400/40 pl-3">
                  <p className="text-sm text-white">
                    <strong>GN3 (9th Ed):</strong> IET Guidance Note 3 — Inspection and Testing
                    procedures for R1+R2 measurements
                  </p>
                </div>
                <div className="border-l-2 border-amber-400/40 pl-3">
                  <p className="text-sm text-white">
                    <strong>BS EN 60228:</strong> Conductor resistance values used in this
                    calculation
                  </p>
                </div>
                <div className="border-l-2 border-amber-400/40 pl-3">
                  <p className="text-sm text-white">
                    <strong>CPC sizing (Table 54.7):</strong> Line ≤ 16mm² → CPC = same size. Line
                    &gt; 16mm² → CPC = Line / 2 (minimum 16mm²)
                  </p>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </>
      )}

      {/* Formula reference — always visible */}
      <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
        <div className="flex items-start gap-2">
          <Zap className="h-4 w-4 text-blue-400 mt-0.5 shrink-0" />
          <p className="text-sm text-white">
            <strong>R1+R2</strong> = (r₁ × L × Ct) + (r₂ × L × Ct) / 1000 — where Ct = temperature
            correction factor
          </p>
        </div>
      </div>
    </CalculatorCard>
  );
};

export default R1R2Calculator;
