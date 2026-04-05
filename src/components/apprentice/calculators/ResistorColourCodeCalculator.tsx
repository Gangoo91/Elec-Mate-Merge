import { copyToClipboard } from '@/utils/clipboard';
import { useState, useCallback } from 'react';
import { Copy, Check, ChevronDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  CalculatorCard,
  CalculatorSection,
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

const CAT = 'utilities' as const;
const config = CALCULATOR_CONFIG[CAT];

type ColorWithValue = {
  value: number;
  multiplier: number;
  color: string;
  tolerance?: string;
};

type ColorWithoutValue = {
  multiplier: number;
  color: string;
  tolerance?: string;
};

type ColorValue = ColorWithValue | ColorWithoutValue;

const colorValues: Record<string, ColorValue> = {
  black: { value: 0, multiplier: 1, color: '#000000' },
  brown: { value: 1, multiplier: 10, color: '#964B00', tolerance: '±1%' },
  red: { value: 2, multiplier: 100, color: '#FF0000', tolerance: '±2%' },
  orange: { value: 3, multiplier: 1000, color: '#FFA500' },
  yellow: { value: 4, multiplier: 10000, color: '#FFFF00' },
  green: { value: 5, multiplier: 100000, color: '#008000', tolerance: '±0.5%' },
  blue: { value: 6, multiplier: 1000000, color: '#0000FF', tolerance: '±0.25%' },
  violet: { value: 7, multiplier: 10000000, color: '#8B00FF', tolerance: '±0.1%' },
  grey: { value: 8, multiplier: 100000000, color: '#808080', tolerance: '±0.05%' },
  white: { value: 9, multiplier: 1000000000, color: '#FFFFFF' },
  gold: { multiplier: 0.1, color: '#FFD700', tolerance: '±5%' },
  silver: { multiplier: 0.01, color: '#C0C0C0', tolerance: '±10%' },
};

const toleranceColors: Record<string, string> = {
  brown: '±1%',
  red: '±2%',
  green: '±0.5%',
  blue: '±0.25%',
  violet: '±0.1%',
  grey: '±0.05%',
  gold: '±5%',
  silver: '±10%',
};

const hasValue = (color: ColorValue): color is ColorWithValue => {
  return 'value' in color;
};

const formatResistance = (value: number): string => {
  if (value >= 1000000000000) {
    return `${(value / 1000000000000).toFixed(value % 1000000000000 === 0 ? 0 : 2)}TΩ`;
  } else if (value >= 1000000000) {
    return `${(value / 1000000000).toFixed(value % 1000000000 === 0 ? 0 : 2)}GΩ`;
  } else if (value >= 1000000) {
    return `${(value / 1000000).toFixed(value % 1000000 === 0 ? 0 : 2)}MΩ`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 2)}kΩ`;
  } else {
    return `${value.toFixed(value % 1 === 0 ? 0 : 2)}Ω`;
  }
};

const calculateToleranceRange = (
  resistance: number,
  tolerance: string
): { min: number; max: number } => {
  const percent = parseFloat(tolerance.replace('±', '').replace('%', '')) / 100;
  const range = resistance * percent;
  return {
    min: resistance - range,
    max: resistance + range,
  };
};

// Colour band selector sub-component
const ColorBandSelect = ({
  label,
  value,
  onChange,
  colors,
  showTolerance = false,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  colors: [string, ColorValue | string][];
  showTolerance?: boolean;
}) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-white">{label}</label>
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-1.5">
      {colors.map(([name, colorData]) => {
        const bgColor =
          typeof colorData === 'string' ? colorValues[name]?.color : colorData.color;
        const isSelected = value === name;
        const toleranceValue = showTolerance
          ? toleranceColors[name as keyof typeof toleranceColors]
          : null;

        return (
          <button
            key={name}
            onClick={() => onChange(name)}
            className={cn(
              'relative p-1.5 rounded-lg border-2 transition-all touch-manipulation min-h-[44px]',
              isSelected
                ? 'border-amber-400 bg-amber-400/10 scale-105'
                : 'border-white/10 bg-white/5 hover:bg-white/10'
            )}
            title={`${name}${toleranceValue ? ` (${toleranceValue})` : ''}`}
          >
            <div
              className="w-full aspect-square rounded-md border border-white/20"
              style={{ backgroundColor: bgColor }}
            />
            <span className="block text-[10px] text-white mt-1 capitalize truncate">
              {name}
            </span>
            {showTolerance && toleranceValue && (
              <span className="block text-[8px] text-white">{toleranceValue}</span>
            )}
          </button>
        );
      })}
    </div>
  </div>
);

const ResistorColourCodeCalculator = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const [band1, setBand1] = useState('');
  const [band2, setBand2] = useState('');
  const [band3, setBand3] = useState('');
  const [band4, setBand4] = useState('');
  const [showGuidance, setShowGuidance] = useState(false);
  const [showReference, setShowReference] = useState(false);
  const [result, setResult] = useState<{
    resistance: number;
    tolerance: string;
    formattedValue: string;
  } | null>(null);

  const calculateResistance = useCallback(() => {
    if (!band1 || !band2 || !band3 || !band4) return;

    const color1 = colorValues[band1];
    const color2 = colorValues[band2];
    const color3 = colorValues[band3];
    const tolerance = toleranceColors[band4 as keyof typeof toleranceColors];

    if (!hasValue(color1) || !hasValue(color2) || !color3 || !tolerance) return;

    const digit1 = color1.value;
    const digit2 = color2.value;
    const multiplier = color3.multiplier;

    const resistance = (digit1 * 10 + digit2) * multiplier;
    const formattedValue = formatResistance(resistance);

    setResult({ resistance, tolerance, formattedValue });
  }, [band1, band2, band3, band4]);

  const handleReset = useCallback(() => {
    setBand1('');
    setBand2('');
    setBand3('');
    setBand4('');
    setResult(null);
  }, []);

  const handleCopy = () => {
    if (!result) return;
    const text = [
      'Resistor Colour Code',
      `Value: ${result.formattedValue} (${result.resistance.toLocaleString()}Ω)`,
      `Tolerance: ${result.tolerance}`,
      `Range: ${formatResistance(calculateToleranceRange(result.resistance, result.tolerance).min)} to ${formatResistance(calculateToleranceRange(result.resistance, result.tolerance).max)}`,
      `Bands: ${band1} / ${band2} / ${band3} / ${band4}`,
    ].join('\n');
    copyToClipboard(text).then((ok) => {
      if (ok) {
        setCopied(true);
        toast({ title: 'Copied to clipboard' });
        setTimeout(() => setCopied(false), 2000);
      }
    });
  };

  const hasValidInputs = () => band1 && band2 && band3 && band4;

  // Digit colours (1-9 for first band, 0-9 for second)
  const digitColorsFirst = Object.entries(colorValues).filter(
    ([name]) => !['black', 'gold', 'silver'].includes(name)
  );
  const digitColorsSecond = Object.entries(colorValues).filter(
    ([name]) => !['gold', 'silver'].includes(name)
  );
  const multiplierColors = Object.entries(colorValues);
  const toleranceColorsList = Object.entries(toleranceColors);

  return (
    <CalculatorCard
      category={CAT}
      title="Resistor Colour Code"
      description="Decode 4-band resistor values from colour bands"
    >
      {/* Visual Resistor Preview */}
      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
        <p className="text-xs text-white mb-3 text-center">Resistor Preview</p>
        <div className="flex items-center justify-center">
          {/* Left lead */}
          <div className="w-8 h-1 bg-white/40 rounded-l" />
          {/* Resistor body */}
          <div className="relative flex items-center px-2 py-3 bg-amber-900/40 rounded-lg border border-amber-200/30">
            <div className="flex gap-1.5">
              <div
                className="w-3 h-8 rounded-sm border border-black/20 shadow-inner"
                style={{
                  backgroundColor: band1 ? colorValues[band1]?.color : 'rgba(255,255,255,0.2)',
                }}
              />
              <div
                className="w-3 h-8 rounded-sm border border-black/20 shadow-inner"
                style={{
                  backgroundColor: band2 ? colorValues[band2]?.color : 'rgba(255,255,255,0.2)',
                }}
              />
              <div
                className="w-3 h-8 rounded-sm border border-black/20 shadow-inner"
                style={{
                  backgroundColor: band3 ? colorValues[band3]?.color : 'rgba(255,255,255,0.2)',
                }}
              />
              <div className="w-3" />
              <div
                className="w-3 h-8 rounded-sm border border-black/20 shadow-inner"
                style={{
                  backgroundColor: band4 ? colorValues[band4]?.color : 'rgba(255,255,255,0.2)',
                }}
              />
            </div>
          </div>
          {/* Right lead */}
          <div className="w-8 h-1 bg-white/40 rounded-r" />
        </div>
        <div className="flex justify-center gap-4 mt-2 text-[10px] text-white">
          <span>1st</span>
          <span>2nd</span>
          <span>×</span>
          <span className="ml-2">±</span>
        </div>
      </div>

      {/* Colour Band Selectors */}
      <CalculatorSection title="Colour Bands">
        <div className="space-y-4">
          <ColorBandSelect
            label="1st Band (First Digit)"
            value={band1}
            onChange={setBand1}
            colors={digitColorsFirst}
          />
          <ColorBandSelect
            label="2nd Band (Second Digit)"
            value={band2}
            onChange={setBand2}
            colors={digitColorsSecond}
          />
          <ColorBandSelect
            label="3rd Band (Multiplier)"
            value={band3}
            onChange={setBand3}
            colors={multiplierColors}
          />
          <ColorBandSelect
            label="4th Band (Tolerance)"
            value={band4}
            onChange={setBand4}
            colors={toleranceColorsList}
            showTolerance
          />
        </div>
      </CalculatorSection>

      <CalculatorActions
        category={CAT}
        onCalculate={calculateResistance}
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
            <ResultBadge status="pass" label="Decoded" />
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
            <p className="text-sm font-medium text-white mb-1">Resistance Value</p>
            <p
              className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
              }}
            >
              {result.formattedValue}
            </p>
            <p className="text-sm text-white mt-2">{result.tolerance} tolerance</p>
          </div>

          {/* Result cards */}
          <ResultsGrid columns={2}>
            <ResultValue
              label="Exact Value"
              value={result.resistance.toLocaleString()}
              unit="Ω"
              category={CAT}
              size="sm"
            />
            <ResultValue label="Tolerance" value={result.tolerance} category={CAT} size="sm" />
          </ResultsGrid>

          {/* Tolerance Range */}
          {(() => {
            const range = calculateToleranceRange(result.resistance, result.tolerance);
            return (
              <div className="space-y-1.5">
                <p className="text-xs text-white font-medium">Actual Value Range</p>
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                <span className="text-sm text-white">{formatResistance(range.min)}</span>
                <span className="text-white text-sm">to</span>
                <span className="text-sm text-white">{formatResistance(range.max)}</span>
                </div>
              </div>
            );
          })()}

          <CalculatorDivider category={CAT} />

          {/* ── How It Worked Out ── */}
          <CalculatorFormula
            category={CAT}
            title="How It Worked Out"
            defaultOpen
            steps={[
              {
                label: 'Read digit values',
                formula: `Band 1 (${band1}) = ${hasValue(colorValues[band1]) ? colorValues[band1].value : '?'}, Band 2 (${band2}) = ${hasValue(colorValues[band2]) ? colorValues[band2].value : '?'}`,
                value: `Digits: ${hasValue(colorValues[band1]) ? colorValues[band1].value : '?'}${hasValue(colorValues[band2]) ? colorValues[band2].value : '?'}`,
              },
              {
                label: 'Form base number',
                formula: `${hasValue(colorValues[band1]) ? colorValues[band1].value : '?'} × 10 + ${hasValue(colorValues[band2]) ? colorValues[band2].value : '?'}`,
                value: `${hasValue(colorValues[band1]) && hasValue(colorValues[band2]) ? colorValues[band1].value * 10 + colorValues[band2].value : '?'}`,
              },
              {
                label: 'Apply multiplier',
                formula: `${hasValue(colorValues[band1]) && hasValue(colorValues[band2]) ? colorValues[band1].value * 10 + colorValues[band2].value : '?'} × ${colorValues[band3]?.multiplier?.toLocaleString() || '?'}`,
                value: result.formattedValue,
              },
              {
                label: 'Apply tolerance',
                formula: `${result.formattedValue} ${result.tolerance}`,
                value: `${formatResistance(calculateToleranceRange(result.resistance, result.tolerance).min)} to ${formatResistance(calculateToleranceRange(result.resistance, result.tolerance).max)}`,
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
                <p className="text-sm text-white">
                  This resistor has a nominal value of{' '}
                  <span className="font-medium">{result.formattedValue}</span> with a{' '}
                  {result.tolerance} tolerance. In practice, the actual resistance could be anywhere
                  between {formatResistance(calculateToleranceRange(result.resistance, result.tolerance).min)} and{' '}
                  {formatResistance(calculateToleranceRange(result.resistance, result.tolerance).max)}.
                </p>
                <p className="text-sm text-white">
                  When measuring with a multimeter, your reading should fall within this range. If
                  it does not, the resistor may be damaged or out of specification.
                </p>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* ── Quick Reference ── */}
          <Collapsible open={showReference} onOpenChange={setShowReference}>
            <CollapsibleTrigger className="flex items-center justify-between w-full min-h-11 py-2.5 px-3 rounded-lg text-sm font-medium text-white hover:bg-white/5 transition-all touch-manipulation">
              <span>Quick Reference</span>
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
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 rounded bg-white/5">
                    <span className="text-white text-sm font-medium">Bands 1-2:</span>
                    <p className="text-xs text-white mt-1">Significant digits (0-9)</p>
                  </div>
                  <div className="p-2 rounded bg-white/5">
                    <span className="text-white text-sm font-medium">Band 3:</span>
                    <p className="text-xs text-white mt-1">Multiplier (10^n)</p>
                  </div>
                  <div className="p-2 rounded bg-white/5 col-span-2">
                    <span className="text-white text-sm font-medium">Band 4:</span>
                    <p className="text-xs text-white mt-1">Tolerance: Gold (±5%), Silver (±10%), Brown (±1%)</p>
                  </div>
                </div>
                <p className="text-xs text-white pt-2 border-t border-white/10">
                  Tip: The tolerance band usually has a gap from the others. Read resistors left to
                  right.
                </p>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      )}

      {/* Formula reference (always visible) */}
      <FormulaReference
        category={CAT}
        name="Resistor Colour Code"
        formula="R = (D1 × 10 + D2) × Multiplier"
        variables={[
          { symbol: 'D1', description: 'First digit (Band 1)' },
          { symbol: 'D2', description: 'Second digit (Band 2)' },
          { symbol: '×', description: 'Multiplier (Band 3)' },
          { symbol: '±', description: 'Tolerance (Band 4)' },
        ]}
      />
    </CalculatorCard>
  );
};

export default ResistorColourCodeCalculator;
