import { useState } from 'react';
import {
  RotateCcw,
  Calculator,
  CheckCircle,
  XCircle,
  Info,
  AlertTriangle,
  Cable,
  ChevronDown,
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import {
  CalculatorCard,
  CalculatorDivider,
  CalculatorInput,
  CalculatorSelect,
  CalculatorEditorial,
  ResultValue,
  ResultsGrid,
  CALCULATOR_CONFIG,
} from '@/components/calculators/shared';
import { voltageDropContent } from './content/voltage-drop';

// BS 7671 Appendix 4 mV/A/m values - accurate tabulated data
const mvamData: Record<string, Record<string, Record<number, number>>> = {
  'Copper T&E (6242Y)': {
    'Clipped direct (C)': { 1: 44, 1.5: 29, 2.5: 18, 4: 11, 6: 7.3, 10: 4.4, 16: 2.8 },
    'In conduit/trunking (B)': { 1: 44, 1.5: 29, 2.5: 18, 4: 11, 6: 7.3, 10: 4.4, 16: 2.8 },
    'Enclosed in insulation': { 1: 46, 1.5: 31, 2.5: 19, 4: 12, 6: 7.8, 10: 4.7, 16: 3.0 },
  },
  'Copper SWA (BS 5467)': {
    'Clipped direct (C)': {
      1.5: 29,
      2.5: 18,
      4: 11,
      6: 7.3,
      10: 4.4,
      16: 2.8,
      25: 1.8,
      35: 1.3,
      50: 0.93,
      70: 0.63,
      95: 0.46,
      120: 0.36,
    },
    'In tray/ladder (E)': {
      1.5: 29,
      2.5: 18,
      4: 11,
      6: 7.3,
      10: 4.4,
      16: 2.8,
      25: 1.8,
      35: 1.3,
      50: 0.93,
      70: 0.63,
      95: 0.46,
      120: 0.36,
    },
    'Buried direct (D1)': {
      1.5: 29,
      2.5: 18,
      4: 11,
      6: 7.3,
      10: 4.4,
      16: 2.8,
      25: 1.8,
      35: 1.3,
      50: 0.93,
      70: 0.63,
      95: 0.46,
      120: 0.36,
    },
    'Underground duct (D2)': {
      1.5: 31,
      2.5: 19,
      4: 12,
      6: 7.8,
      10: 4.7,
      16: 3.0,
      25: 1.9,
      35: 1.4,
      50: 0.98,
      70: 0.67,
      95: 0.49,
      120: 0.39,
    },
  },
  'Copper XLPE': {
    'Clipped direct (C)': {
      1.5: 29,
      2.5: 18,
      4: 11,
      6: 7.3,
      10: 4.4,
      16: 2.8,
      25: 1.8,
      35: 1.3,
      50: 0.93,
      70: 0.63,
      95: 0.46,
      120: 0.36,
    },
    'In tray/ladder (E)': {
      1.5: 29,
      2.5: 18,
      4: 11,
      6: 7.3,
      10: 4.4,
      16: 2.8,
      25: 1.8,
      35: 1.3,
      50: 0.93,
      70: 0.63,
      95: 0.46,
      120: 0.36,
    },
    'Buried direct (D1)': {
      1.5: 29,
      2.5: 18,
      4: 11,
      6: 7.3,
      10: 4.4,
      16: 2.8,
      25: 1.8,
      35: 1.3,
      50: 0.93,
      70: 0.63,
      95: 0.46,
      120: 0.36,
    },
  },
  'Aluminium SWA': {
    'Clipped direct (C)': {
      16: 4.6,
      25: 2.9,
      35: 2.1,
      50: 1.5,
      70: 1.1,
      95: 0.8,
      120: 0.63,
      150: 0.52,
      185: 0.41,
      240: 0.32,
      300: 0.26,
    },
    'In tray/ladder (E)': {
      16: 4.6,
      25: 2.9,
      35: 2.1,
      50: 1.5,
      70: 1.1,
      95: 0.8,
      120: 0.63,
      150: 0.52,
      185: 0.41,
      240: 0.32,
      300: 0.26,
    },
    'Buried direct (D1)': {
      16: 4.6,
      25: 2.9,
      35: 2.1,
      50: 1.5,
      70: 1.1,
      95: 0.8,
      120: 0.63,
      150: 0.52,
      185: 0.41,
      240: 0.32,
      300: 0.26,
    },
  },
};

const circuitTypeOptions = [
  { value: 'lighting', label: 'Lighting (3% limit)' },
  { value: 'other', label: 'Power/Other (5% limit)' },
];

const VoltageDropCalculator = () => {
  const config = CALCULATOR_CONFIG['cable'];

  const [circuit, setCircuit] = useState<string>('other');
  const [family, setFamily] = useState<string>('Copper T&E (6242Y)');
  const [method, setMethod] = useState<string>('Clipped direct (C)');
  const [cableSize, setCableSize] = useState<string>('');
  const [length, setLength] = useState<string>('');
  const [current, setCurrent] = useState<string>('');
  const [supplyVoltage, setSupplyVoltage] = useState<string>('230');
  const [showFormula, setShowFormula] = useState(false);
  const [result, setResult] = useState<{
    voltageDrop: number;
    percentage: number;
    voltageAtLoad: number;
    limit: number;
    compliant: boolean;
    mvam: number;
    maxLength: number;
    alternatives: Array<{ size: number; mvam: number; pct: number; compliant: boolean }>;
  } | null>(null);

  const dataForMethod = mvamData[family]?.[method] || {};
  const sizes = Object.keys(dataForMethod)
    .map(Number)
    .sort((a, b) => a - b);
  const selectedMvam = cableSize ? dataForMethod[Number(cableSize)] : null;

  const familyOptions = Object.keys(mvamData).map((k) => ({ value: k, label: k }));
  const methodOptions = Object.keys(mvamData[family] || {}).map((k) => ({ value: k, label: k }));
  const sizeOptions = sizes.map((size) => ({
    value: size.toString(),
    label: `${size}mm² (${dataForMethod[size]} mV/A/m)`,
  }));
  const voltageOptions = [
    { value: '230', label: '230V (Single Phase)' },
    { value: '400', label: '400V (Three Phase)' },
  ];

  const calculate = () => {
    const I = Number(current);
    const L = Number(length);
    const V = Number(supplyVoltage);
    const mvam = selectedMvam;

    if (!isFinite(I) || I <= 0 || !isFinite(L) || L <= 0 || !mvam) {
      setResult(null);
      return;
    }

    // BS 7671 formula: Vd = mV/A/m × Ib × L / 1000
    const voltageDrop = (mvam * I * L) / 1000;
    const percentage = (voltageDrop / V) * 100;
    const voltageAtLoad = V - voltageDrop;
    const limit = circuit === 'lighting' ? 3 : 5;
    const compliant = percentage <= limit;

    // Maximum length calculation
    const maxLength = (V * (limit / 100) * 1000) / (mvam * I);

    // Calculate alternatives
    const alternatives = sizes
      .map((size) => {
        const altMvam = dataForMethod[size];
        const altVd = (altMvam * I * L) / 1000;
        const altPct = (altVd / V) * 100;
        return { size, mvam: altMvam, pct: altPct, compliant: altPct <= limit };
      })
      .filter((alt) => alt.compliant)
      .slice(0, 4);

    setResult({
      voltageDrop,
      percentage,
      voltageAtLoad,
      limit,
      compliant,
      mvam,
      maxLength,
      alternatives,
    });
  };

  const reset = () => {
    setCircuit('other');
    setFamily('Copper T&E (6242Y)');
    setMethod('Clipped direct (C)');
    setCableSize('');
    setLength('');
    setCurrent('');
    setSupplyVoltage('230');
    setResult(null);
  };

  const isValid = selectedMvam && current && length;

  return (
    <CalculatorCard
      category="cable"
      title="Voltage Drop Calculator"
      description="Calculate voltage drop using BS 7671 Appendix 4 tabulated values"
    >
      {/* Calculator Inputs */}
      <div className="space-y-4">
        {/* Cable Selection Header */}
        <div className="flex items-center gap-2">
          <Cable className="h-4 w-4" style={{ color: config.gradientFrom }} />
          <span className="text-sm font-medium text-white">Cable Selection</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <CalculatorSelect
            label="Circuit Type"
            value={circuit}
            onChange={setCircuit}
            options={circuitTypeOptions}
          />

          <CalculatorSelect
            label="Supply Voltage"
            value={supplyVoltage}
            onChange={setSupplyVoltage}
            options={voltageOptions}
          />
        </div>

        <CalculatorSelect
          label="Cable Family"
          value={family}
          onChange={(v) => {
            setFamily(v);
            setMethod(Object.keys(mvamData[v] || {})[0] || '');
            setCableSize('');
          }}
          options={familyOptions}
        />

        <CalculatorSelect
          label="Installation Method (Reference)"
          value={method}
          onChange={(v) => {
            setMethod(v);
            setCableSize('');
          }}
          options={methodOptions}
        />

        <CalculatorSelect
          label="Cable Size"
          value={cableSize}
          onChange={setCableSize}
          options={sizeOptions}
          placeholder="Select cable size"
        />

        {/* mV/A/m Info */}
        {selectedMvam && (
          <div
            className="p-3 rounded-xl border"
            style={{
              background: `${config.gradientFrom}08`,
              borderColor: `${config.gradientFrom}20`,
            }}
          >
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4" style={{ color: config.gradientFrom }} />
              <span className="text-sm text-white">
                <strong>mV/A/m value:</strong> {selectedMvam} mV/A/m
              </span>
            </div>
            <p className="text-xs text-white mt-1 ml-6">From BS 7671 Appendix 4</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <CalculatorInput
            label="Design Current"
            unit="A"
            type="text"
            inputMode="decimal"
            value={current}
            onChange={setCurrent}
            placeholder="e.g., 16"
            hint="Ib - design current"
          />

          <CalculatorInput
            label="Cable Length"
            unit="m"
            type="text"
            inputMode="decimal"
            value={length}
            onChange={setLength}
            placeholder="e.g., 30"
            hint="One-way route length"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <button
            onClick={calculate}
            disabled={!isValid}
            className={cn(
              'flex-1 h-14 rounded-xl font-semibold text-base flex items-center justify-center gap-2 transition-all touch-manipulation',
              isValid ? 'text-black' : 'bg-white/10 text-white cursor-not-allowed'
            )}
            style={
              isValid
                ? {
                    background: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                  }
                : undefined
            }
          >
            <Calculator className="h-5 w-5" />
            Calculate
          </button>
          <button
            onClick={reset}
            className="h-14 px-4 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors touch-manipulation"
          >
            <RotateCcw className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Results Section */}
      {result && (
        <>
          <CalculatorDivider category="cable" />

          <div className="space-y-4 animate-fade-in">
            {/* Status Chip */}
            <div
              className={cn(
                'inline-flex items-center gap-2 px-3 py-1.5 rounded-full',
                result.compliant
                  ? 'bg-green-500/10 border border-green-500/20'
                  : 'bg-red-500/10 border border-red-500/20'
              )}
            >
              {result.compliant ? (
                <CheckCircle className="h-4 w-4 text-green-400" />
              ) : (
                <XCircle className="h-4 w-4 text-red-400" />
              )}
              <span
                className={cn(
                  'text-sm font-semibold',
                  result.compliant ? 'text-green-400' : 'text-red-400'
                )}
              >
                {result.compliant ? 'COMPLIANT' : 'NON-COMPLIANT'}
              </span>
            </div>

            {/* Main Results */}
            <ResultsGrid columns={2}>
              <ResultValue
                label="Voltage Drop"
                value={result.voltageDrop.toFixed(2)}
                unit="V"
                category="cable"
              />
              <ResultValue
                label="Percentage"
                value={result.percentage.toFixed(2)}
                unit="%"
                category="cable"
              />
              <ResultValue
                label="Voltage at Load"
                value={result.voltageAtLoad.toFixed(1)}
                unit="V"
                category="cable"
                size="sm"
              />
              <ResultValue
                label={`Max Length @ ${current}A`}
                value={result.maxLength.toFixed(1)}
                unit="m"
                category="cable"
                size="sm"
              />
            </ResultsGrid>

            {/* Warning if non-compliant */}
            {!result.compliant && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
                  <div className="text-sm text-white">
                    <strong>Action Required:</strong> Use a larger cable size or reduce cable
                    length.
                    {result.alternatives.length > 0 && (
                      <span>
                        {' '}
                        Recommended: {result.alternatives[0].size}mm² (
                        {result.alternatives[0].pct.toFixed(2)}%)
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <CalculatorDivider category="cable" />

          {/* Formula Breakdown */}
          <Collapsible open={showFormula} onOpenChange={setShowFormula}>
            <CollapsibleTrigger className="calculator-collapsible-trigger w-full">
              <div className="flex items-center gap-3">
                <Calculator className="h-4 w-4" style={{ color: config.gradientFrom }} />
                <span className="text-sm sm:text-base font-medium text-white">
                  How It Worked Out
                </span>
              </div>
              <ChevronDown
                className={cn(
                  'h-4 w-4 text-white transition-transform duration-200',
                  showFormula && 'rotate-180'
                )}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2">
              <div
                className="space-y-2 font-mono text-xs rounded-lg p-3 border"
                style={{
                  background: `${config.gradientFrom}08`,
                  borderColor: `${config.gradientFrom}20`,
                }}
              >
                <p className="text-white">
                  <span style={{ color: config.gradientFrom }}>Formula:</span> Vd = (mV/A/m × Ib ×
                  L) ÷ 1000
                </p>
                <p className="text-white">
                  <span style={{ color: config.gradientFrom }}>Step 1:</span> mV/A/m = {result.mvam}{' '}
                  (from Appendix 4)
                </p>
                <p className="text-white">
                  <span style={{ color: config.gradientFrom }}>Step 2:</span> Vd = ({result.mvam} ×{' '}
                  {current} × {length}) ÷ 1000
                </p>
                <p className="text-white">
                  <span style={{ color: config.gradientFrom }}>Step 3:</span> Vd ={' '}
                  {(result.mvam * Number(current) * Number(length)).toFixed(1)} ÷ 1000 ={' '}
                  <strong>{result.voltageDrop.toFixed(2)} V</strong>
                </p>
                <p className="text-white">
                  <span style={{ color: config.gradientFrom }}>Step 4:</span> % = (
                  {result.voltageDrop.toFixed(2)} ÷ {supplyVoltage}) × 100 ={' '}
                  <strong>{result.percentage.toFixed(2)}%</strong>
                </p>
                <p className={cn(result.compliant ? 'text-green-400' : 'text-red-400')}>
                  <span style={{ color: config.gradientFrom }}>Check:</span>{' '}
                  {result.percentage.toFixed(2)}% {result.compliant ? '≤' : '>'} {result.limit}%
                  limit → {result.compliant ? 'PASS ✓' : 'FAIL ✗'}
                </p>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Alternative Sizes */}
          {result.alternatives.length > 0 && (
            <>
              <CalculatorDivider category="cable" />
              <div>
                <p className="text-sm text-white mb-2">Compliant Cable Sizes</p>
                <div className="grid gap-2">
                  {result.alternatives.map((alt) => (
                    <div
                      key={alt.size}
                      className={cn(
                        'flex items-center justify-between p-2 rounded-lg',
                        alt.size === Number(cableSize) ? 'border' : 'bg-white/[0.04]'
                      )}
                      style={
                        alt.size === Number(cableSize)
                          ? {
                              background: `${config.gradientFrom}15`,
                              borderColor: `${config.gradientFrom}40`,
                            }
                          : undefined
                      }
                    >
                      <span className="text-white font-medium">
                        {alt.size}mm²
                        <span className="text-white text-xs ml-2">({alt.mvam} mV/A/m)</span>
                      </span>
                      <span className="text-green-400 font-mono">{alt.pct.toFixed(2)}% ✓</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </>
      )}

      {/* Grounded guidance + standards */}
      <CalculatorEditorial content={voltageDropContent} category="cable" />
    </CalculatorCard>
  );
};

export default VoltageDropCalculator;
