import { useState } from "react";
import { Info, BookOpen, ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import {
  CalculatorCard,
  CalculatorInputGrid,
  CalculatorActions,
  CalculatorResult,
  ResultValue,
  ResultsGrid,
  CALCULATOR_CONFIG,
} from "@/components/calculators/shared";

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

const ResistorColourCodeCalculator = () => {
  const config = CALCULATOR_CONFIG['power'];

  const [band1, setBand1] = useState("");
  const [band2, setBand2] = useState("");
  const [band3, setBand3] = useState("");
  const [band4, setBand4] = useState("");
  const [showGuidance, setShowGuidance] = useState(false);
  const [showReference, setShowReference] = useState(false);
  const [result, setResult] = useState<{
    resistance: number;
    tolerance: string;
    formattedValue: string;
  } | null>(null);

  const colorValues: Record<string, ColorValue> = {
    black: { value: 0, multiplier: 1, color: "#000000" },
    brown: { value: 1, multiplier: 10, color: "#964B00", tolerance: "±1%" },
    red: { value: 2, multiplier: 100, color: "#FF0000", tolerance: "±2%" },
    orange: { value: 3, multiplier: 1000, color: "#FFA500" },
    yellow: { value: 4, multiplier: 10000, color: "#FFFF00" },
    green: { value: 5, multiplier: 100000, color: "#008000", tolerance: "±0.5%" },
    blue: { value: 6, multiplier: 1000000, color: "#0000FF", tolerance: "±0.25%" },
    violet: { value: 7, multiplier: 10000000, color: "#8B00FF", tolerance: "±0.1%" },
    grey: { value: 8, multiplier: 100000000, color: "#808080", tolerance: "±0.05%" },
    white: { value: 9, multiplier: 1000000000, color: "#FFFFFF" },
    gold: { multiplier: 0.1, color: "#FFD700", tolerance: "±5%" },
    silver: { multiplier: 0.01, color: "#C0C0C0", tolerance: "±10%" },
  };

  const toleranceColors = {
    brown: "±1%",
    red: "±2%",
    green: "±0.5%",
    blue: "±0.25%",
    violet: "±0.1%",
    grey: "±0.05%",
    gold: "±5%",
    silver: "±10%",
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

  const calculateToleranceRange = (resistance: number, tolerance: string): { min: number; max: number } => {
    const percent = parseFloat(tolerance.replace('±', '').replace('%', '')) / 100;
    const range = resistance * percent;
    return {
      min: resistance - range,
      max: resistance + range
    };
  };

  const calculateResistance = () => {
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

    setResult({
      resistance,
      tolerance,
      formattedValue
    });
  };

  const resetCalculator = () => {
    setBand1("");
    setBand2("");
    setBand3("");
    setBand4("");
    setResult(null);
  };

  const hasValidInputs = () => band1 && band2 && band3 && band4;

  // Color band selector component
  const ColorBandSelect = ({
    label,
    value,
    onChange,
    colors,
    showTolerance = false
  }: {
    label: string;
    value: string;
    onChange: (val: string) => void;
    colors: [string, ColorValue | string][];
    showTolerance?: boolean;
  }) => (
    <div className="space-y-2">
      <label className="text-sm font-medium text-white/80">{label}</label>
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5">
        {colors.map(([name, colorData]) => {
          const bgColor = typeof colorData === 'string'
            ? colorValues[name]?.color
            : colorData.color;
          const isSelected = value === name;
          const toleranceValue = showTolerance
            ? toleranceColors[name as keyof typeof toleranceColors]
            : null;

          return (
            <button
              key={name}
              onClick={() => onChange(name)}
              className={cn(
                "relative p-1.5 rounded-lg border-2 transition-all touch-manipulation",
                isSelected
                  ? "border-amber-400 bg-amber-400/10 scale-105"
                  : "border-white/10 bg-white/5 hover:bg-white/10"
              )}
              title={`${name}${toleranceValue ? ` (${toleranceValue})` : ''}`}
            >
              <div
                className="w-full aspect-square rounded-md border border-white/20"
                style={{ backgroundColor: bgColor }}
              />
              <span className="block text-[10px] text-white/60 mt-1 capitalize truncate">
                {name}
              </span>
              {showTolerance && toleranceValue && (
                <span className="block text-[8px] text-white/40">{toleranceValue}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );

  // Get digit colors (1-9 for first band, 0-9 for second)
  const digitColorsFirst = Object.entries(colorValues).filter(
    ([name]) => !['black', 'gold', 'silver'].includes(name)
  );
  const digitColorsSecond = Object.entries(colorValues).filter(
    ([name]) => !['gold', 'silver'].includes(name)
  );
  const multiplierColors = Object.entries(colorValues);
  const toleranceColorsList = Object.entries(toleranceColors);

  return (
    <div className="space-y-4">
      <CalculatorCard
        category="power"
        title="Resistor Colour Code"
        description="Decode 4-band resistor values from colour bands"
        badge="Ω"
      >
        {/* Visual Resistor Preview */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
          <p className="text-xs text-white/60 mb-3 text-center">Resistor Preview</p>
          <div className="flex items-center justify-center">
            {/* Left lead */}
            <div className="w-8 h-1 bg-gray-400 rounded-l" />
            {/* Resistor body */}
            <div className="relative flex items-center px-2 py-3 bg-amber-100 dark:bg-amber-900/40 rounded-lg border border-amber-200/30">
              <div className="flex gap-1.5">
                <div
                  className="w-3 h-8 rounded-sm border border-black/20 shadow-inner"
                  style={{ backgroundColor: band1 ? colorValues[band1]?.color : 'rgba(255,255,255,0.2)' }}
                />
                <div
                  className="w-3 h-8 rounded-sm border border-black/20 shadow-inner"
                  style={{ backgroundColor: band2 ? colorValues[band2]?.color : 'rgba(255,255,255,0.2)' }}
                />
                <div
                  className="w-3 h-8 rounded-sm border border-black/20 shadow-inner"
                  style={{ backgroundColor: band3 ? colorValues[band3]?.color : 'rgba(255,255,255,0.2)' }}
                />
                <div className="w-3" /> {/* Gap before tolerance */}
                <div
                  className="w-3 h-8 rounded-sm border border-black/20 shadow-inner"
                  style={{ backgroundColor: band4 ? colorValues[band4]?.color : 'rgba(255,255,255,0.2)' }}
                />
              </div>
            </div>
            {/* Right lead */}
            <div className="w-8 h-1 bg-gray-400 rounded-r" />
          </div>
          <div className="flex justify-center gap-4 mt-2 text-[10px] text-white/40">
            <span>1st</span>
            <span>2nd</span>
            <span>×</span>
            <span className="ml-2">±</span>
          </div>
        </div>

        {/* Color Band Selectors */}
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

        <CalculatorActions
          category="power"
          onCalculate={calculateResistance}
          onReset={resetCalculator}
          isDisabled={!hasValidInputs()}
        />
      </CalculatorCard>

      {/* Results */}
      {result && (
        <div className="space-y-4 animate-fade-in">
          <CalculatorResult category="power">
            <div className="text-center pb-3 border-b border-white/10">
              <p className="text-sm text-white/60 mb-1">Resistance Value</p>
              <div
                className="text-4xl font-bold bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})` }}
              >
                {result.formattedValue}
              </div>
              <p className="text-sm text-white/50 mt-1">{result.tolerance} tolerance</p>
            </div>

            <ResultsGrid columns={2}>
              <ResultValue
                label="Exact Value"
                value={result.resistance.toLocaleString()}
                unit="Ω"
                category="power"
                size="sm"
              />
              <ResultValue
                label="Tolerance"
                value={result.tolerance}
                category="power"
                size="sm"
              />
            </ResultsGrid>

            {/* Tolerance Range */}
            <div className="pt-3 mt-3 border-t border-white/10">
              <p className="text-xs text-white/50 mb-2">Actual Value Range</p>
              {(() => {
                const range = calculateToleranceRange(result.resistance, result.tolerance);
                return (
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                    <span className="text-sm text-white/80">{formatResistance(range.min)}</span>
                    <span className="text-white/40">to</span>
                    <span className="text-sm text-white/80">{formatResistance(range.max)}</span>
                  </div>
                );
              })()}
            </div>
          </CalculatorResult>

          {/* How It Worked Out */}
          <Collapsible open={showGuidance} onOpenChange={setShowGuidance}>
            <div className="calculator-card overflow-hidden" style={{ borderColor: '#60a5fa15' }}>
              <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                <div className="flex items-center gap-3">
                  <Info className="h-4 w-4 text-blue-400" />
                  <span className="text-sm sm:text-base font-medium text-blue-300">How It Worked Out</span>
                </div>
                <ChevronDown className={cn(
                  "h-4 w-4 text-white/40 transition-transform duration-200",
                  showGuidance && "rotate-180"
                )} />
              </CollapsibleTrigger>

              <CollapsibleContent className="p-4 pt-0">
                <div className="space-y-3 text-sm">
                  <div className="p-3 rounded-lg bg-white/5">
                    <p className="text-white/60 mb-1">Step 1: Read digit values</p>
                    <p className="text-white font-mono">
                      Band 1 ({band1}) = {hasValue(colorValues[band1]) ? colorValues[band1].value : '?'},
                      Band 2 ({band2}) = {hasValue(colorValues[band2]) ? colorValues[band2].value : '?'}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5">
                    <p className="text-white/60 mb-1">Step 2: Form base number</p>
                    <p className="text-white font-mono">
                      {hasValue(colorValues[band1]) ? colorValues[band1].value : '?'}{hasValue(colorValues[band2]) ? colorValues[band2].value : '?'} = {hasValue(colorValues[band1]) && hasValue(colorValues[band2]) ? colorValues[band1].value * 10 + colorValues[band2].value : '?'}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5">
                    <p className="text-white/60 mb-1">Step 3: Apply multiplier</p>
                    <p className="text-white font-mono">
                      {hasValue(colorValues[band1]) && hasValue(colorValues[band2]) ? colorValues[band1].value * 10 + colorValues[band2].value : '?'} × {colorValues[band3]?.multiplier?.toLocaleString() || '?'} = {result.formattedValue}
                    </p>
                  </div>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        </div>
      )}

      {/* Quick Reference */}
      <Collapsible open={showReference} onOpenChange={setShowReference}>
        <div className="calculator-card overflow-hidden" style={{ borderColor: '#fbbf2415' }}>
          <CollapsibleTrigger className="agent-collapsible-trigger w-full">
            <div className="flex items-center gap-3">
              <BookOpen className="h-4 w-4 text-amber-400" />
              <span className="text-sm sm:text-base font-medium text-amber-300">Quick Reference</span>
            </div>
            <ChevronDown className={cn(
              "h-4 w-4 text-white/40 transition-transform duration-200",
              showReference && "rotate-180"
            )} />
          </CollapsibleTrigger>

          <CollapsibleContent className="p-4 pt-0">
            <div className="space-y-3 text-sm text-amber-200/80">
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 rounded bg-white/5">
                  <span className="text-amber-300 font-medium">Bands 1-2:</span>
                  <p className="text-xs mt-1">Significant digits (0-9)</p>
                </div>
                <div className="p-2 rounded bg-white/5">
                  <span className="text-amber-300 font-medium">Band 3:</span>
                  <p className="text-xs mt-1">Multiplier (10^n)</p>
                </div>
                <div className="p-2 rounded bg-white/5 col-span-2">
                  <span className="text-amber-300 font-medium">Band 4:</span>
                  <p className="text-xs mt-1">Tolerance: Gold (±5%), Silver (±10%), Brown (±1%)</p>
                </div>
              </div>
              <p className="text-xs text-white/50 pt-2 border-t border-white/10">
                Tip: The tolerance band usually has a gap from the others. Read resistors left to right.
              </p>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
    </div>
  );
};

export default ResistorColourCodeCalculator;
