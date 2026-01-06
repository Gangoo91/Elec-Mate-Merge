import { useState } from "react";
import { ArrowLeftRight, RotateCcw, ArrowUpDown, Info, BookOpen, ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import {
  CalculatorCard,
  CalculatorSelect,
  CalculatorInput,
  CalculatorResult,
  CALCULATOR_CONFIG,
} from "@/components/calculators/shared";

interface ConversionCategory {
  name: string;
  units: { [key: string]: { name: string; factor: number } };
}

const conversionCategories: { [key: string]: ConversionCategory } = {
  power: {
    name: "Power",
    units: {
      W: { name: "Watts", factor: 1 },
      kW: { name: "Kilowatts", factor: 1000 },
      MW: { name: "Megawatts", factor: 1000000 },
      hp: { name: "Horsepower", factor: 745.7 },
      BTU: { name: "BTU/hour", factor: 0.293071 }
    }
  },
  voltage: {
    name: "Voltage",
    units: {
      V: { name: "Volts", factor: 1 },
      kV: { name: "Kilovolts", factor: 1000 },
      mV: { name: "Millivolts", factor: 0.001 }
    }
  },
  current: {
    name: "Current",
    units: {
      A: { name: "Amperes", factor: 1 },
      mA: { name: "Milliamperes", factor: 0.001 },
      kA: { name: "Kiloamperes", factor: 1000 }
    }
  },
  resistance: {
    name: "Resistance",
    units: {
      "Ω": { name: "Ohms", factor: 1 },
      "kΩ": { name: "Kilohms", factor: 1000 },
      "MΩ": { name: "Megohms", factor: 1000000 },
      "mΩ": { name: "Milliohms", factor: 0.001 }
    }
  },
  energy: {
    name: "Energy",
    units: {
      J: { name: "Joules", factor: 1 },
      kJ: { name: "Kilojoules", factor: 1000 },
      Wh: { name: "Watt-hours", factor: 3600 },
      kWh: { name: "Kilowatt-hours", factor: 3600000 }
    }
  }
};

const UnitConverterCalculator = () => {
  const config = CALCULATOR_CONFIG['power']; // Using power colors for utility

  const [category, setCategory] = useState<string>("power");
  const [fromUnit, setFromUnit] = useState<string>("W");
  const [toUnit, setToUnit] = useState<string>("kW");
  const [inputValue, setInputValue] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);
  const [equation, setEquation] = useState<string>("");
  const [showGuidance, setShowGuidance] = useState(false);
  const [showReference, setShowReference] = useState(false);

  const formatValue = (value: number): string => {
    if (value >= 1e6 || (value < 1e-3 && value > 0)) {
      return value.toExponential(3);
    }
    return value.toLocaleString(undefined, { maximumFractionDigits: 6 });
  };

  const getEquivalentUnits = (baseValue: number) => {
    const units = conversionCategories[category].units;
    return Object.entries(units)
      .filter(([key]) => key !== toUnit)
      .map(([key, unit]) => ({
        unit: key,
        name: unit.name,
        value: baseValue / unit.factor
      }));
  };

  const convert = () => {
    const value = parseFloat(inputValue);
    if (isNaN(value)) return;

    const fromFactor = conversionCategories[category].units[fromUnit].factor;
    const toFactor = conversionCategories[category].units[toUnit].factor;

    const baseValue = value * fromFactor;
    const convertedValue = baseValue / toFactor;

    setResult(convertedValue);

    const conversionFactor = fromFactor / toFactor;
    setEquation(`${formatValue(value)} ${fromUnit} × ${formatValue(conversionFactor)} = ${formatValue(convertedValue)} ${toUnit}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue.trim() && !isNaN(parseFloat(inputValue))) {
      convert();
    }
  };

  const swapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);

    if (result !== null && inputValue) {
      const newInput = result.toString();
      setInputValue(newInput);
      setTimeout(() => {
        const value = parseFloat(newInput);
        if (!isNaN(value)) {
          const fromFactor = conversionCategories[category].units[toUnit].factor;
          const toFactor = conversionCategories[category].units[temp].factor;

          const baseValue = value * fromFactor;
          const convertedValue = baseValue / toFactor;

          setResult(convertedValue);

          const conversionFactor = fromFactor / toFactor;
          setEquation(`${formatValue(value)} ${toUnit} × ${formatValue(conversionFactor)} = ${formatValue(convertedValue)} ${temp}`);
        }
      }, 0);
    }
  };

  const reset = () => {
    setInputValue("");
    setResult(null);
    setEquation("");
  };

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    const units = Object.keys(conversionCategories[newCategory].units);
    setFromUnit(units[0]);
    setToUnit(units[1] || units[0]);
    setInputValue("");
    setResult(null);
    setEquation("");
  };

  const getWhyThisMatters = () => {
    const points: { [key: string]: string[] } = {
      power: [
        "1 kW = 1000 W - Essential for electrical load calculations",
        "Estimate current draw: I ≈ P/V (e.g., 3 kW ÷ 230 V ≈ 13 A)",
        "Common appliances: kettle ~3 kW, LED bulb ~10 W, oven ~2.5 kW"
      ],
      voltage: [
        "UK domestic: 230 V single-phase, 400 V three-phase",
        "Distribution: 11 kV, 33 kV for substations and networks",
        "Sensor readings: mV ranges for thermocouples and instrumentation"
      ],
      current: [
        "MCB and conductor sizing depends on current rating",
        "Typical ratings: 6A lighting, 16A sockets, 32A cooker circuits",
        "Fault current calculations require kA for discrimination"
      ],
      resistance: [
        "Continuity testing: < 0.05 Ω for protective conductors",
        "Insulation resistance: > 1 MΩ @ 500V for most circuits",
        "Earth fault loop: Zs values determine disconnection times"
      ],
      energy: [
        "Billing uses kWh: 1 kWh = 3.6 MJ (physics to practical)",
        "Quick check: 3 kW appliance × 2 hours = 6 kWh",
        "Battery storage commonly rated in kWh for capacity"
      ]
    };
    return points[category] || [];
  };

  const isInputValid = inputValue.trim() && !isNaN(parseFloat(inputValue));

  const categoryOptions = Object.entries(conversionCategories).map(([key, cat]) => ({
    value: key,
    label: cat.name
  }));

  const unitOptions = Object.entries(conversionCategories[category].units).map(([key, unit]) => ({
    value: key,
    label: `${unit.name} (${key})`
  }));

  return (
    <div className="space-y-4">
      <CalculatorCard
        category="power"
        title="Unit Converter"
        description="Convert between electrical units: power, voltage, current, resistance, energy"
        badge="Utility"
      >
        {/* Category Selection */}
        <CalculatorSelect
          label="Category"
          value={category}
          onChange={handleCategoryChange}
          options={categoryOptions}
        />

        {/* From Unit */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <CalculatorSelect
                label="From"
                value={fromUnit}
                onChange={setFromUnit}
                options={unitOptions}
              />
            </div>
          </div>

          {/* Input Value */}
          <CalculatorInput
            label="Value"
            type="text"
            inputMode="decimal"
            value={inputValue}
            onChange={setInputValue}
            placeholder="Enter value"
            error={!isInputValid && inputValue ? "Enter a valid number" : undefined}
            onKeyDown={handleKeyPress}
          />

          {/* To Unit */}
          <CalculatorSelect
            label="To"
            value={toUnit}
            onChange={setToUnit}
            options={unitOptions}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={convert}
            disabled={!isInputValid}
            className={cn(
              "flex-1 h-14 rounded-xl font-semibold text-base transition-all touch-manipulation",
              isInputValid
                ? "text-black"
                : "bg-white/10 text-white/30 cursor-not-allowed"
            )}
            style={isInputValid ? {
              background: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`
            } : undefined}
          >
            Convert
          </button>
          <button
            onClick={swapUnits}
            className="h-14 w-14 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 transition-colors touch-manipulation"
            title="Swap units"
          >
            <ArrowLeftRight className="h-5 w-5" />
          </button>
          <button
            onClick={reset}
            className="h-14 w-14 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 transition-colors touch-manipulation"
            title="Reset"
          >
            <RotateCcw className="h-5 w-5" />
          </button>
        </div>
      </CalculatorCard>

      {/* Results */}
      {result !== null && (
        <div className="space-y-4 animate-fade-in">
          <CalculatorResult category="power">
            <div className="text-center pb-4 border-b border-white/10">
              <p className="text-sm text-white/60 mb-1">Result</p>
              <div
                className="text-4xl font-bold font-mono bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})` }}
              >
                {formatValue(result)}
              </div>
              <p className="text-sm text-white/80 mt-1">
                {conversionCategories[category].units[toUnit].name}
              </p>
            </div>

            {/* Equation */}
            <div className="py-3 border-b border-white/10">
              <p className="text-xs text-white/80 mb-1">Calculation</p>
              <p className="text-sm text-white/80 font-mono">{equation}</p>
            </div>

            {/* Equivalent Units */}
            <div className="pt-3">
              <p className="text-xs text-white/80 mb-3">Also equals</p>
              <div className="grid grid-cols-2 gap-2">
                {getEquivalentUnits(parseFloat(inputValue) * conversionCategories[category].units[fromUnit].factor).map(({ unit, name, value }) => (
                  <div key={unit} className="p-2 rounded-lg bg-white/5">
                    <div className="text-sm font-mono text-amber-400">{formatValue(value)}</div>
                    <div className="text-xs text-white/80">{unit}</div>
                  </div>
                ))}
              </div>
            </div>
          </CalculatorResult>

          {/* Why This Matters */}
          <Collapsible open={showGuidance} onOpenChange={setShowGuidance}>
            <div className="calculator-card overflow-hidden" style={{ borderColor: '#60a5fa15' }}>
              <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                <div className="flex items-center gap-3">
                  <Info className="h-4 w-4 text-blue-400" />
                  <span className="text-sm sm:text-base font-medium text-blue-300">Why This Matters</span>
                </div>
                <ChevronDown className={cn(
                  "h-4 w-4 text-white/70 transition-transform duration-200",
                  showGuidance && "rotate-180"
                )} />
              </CollapsibleTrigger>

              <CollapsibleContent className="p-4 pt-0">
                <ul className="space-y-2">
                  {getWhyThisMatters().map((point, idx) => (
                    <li key={idx} className="text-sm text-blue-200/80 flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
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
              <span className="text-sm sm:text-base font-medium text-amber-300">Common Conversions</span>
            </div>
            <ChevronDown className={cn(
              "h-4 w-4 text-white/70 transition-transform duration-200",
              showReference && "rotate-180"
            )} />
          </CollapsibleTrigger>

          <CollapsibleContent className="p-4 pt-0">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="space-y-1">
                <p className="text-amber-300 font-medium">Power</p>
                <p className="text-amber-200/70">1 kW = 1000 W</p>
                <p className="text-amber-200/70">1 hp ≈ 746 W</p>
              </div>
              <div className="space-y-1">
                <p className="text-amber-300 font-medium">Voltage</p>
                <p className="text-amber-200/70">1 kV = 1000 V</p>
                <p className="text-amber-200/70">1 V = 1000 mV</p>
              </div>
              <div className="space-y-1">
                <p className="text-amber-300 font-medium">Energy</p>
                <p className="text-amber-200/70">1 kWh = 3.6 MJ</p>
                <p className="text-amber-200/70">1 Wh = 3600 J</p>
              </div>
              <div className="space-y-1">
                <p className="text-amber-300 font-medium">Resistance</p>
                <p className="text-amber-200/70">1 MΩ = 1000 kΩ</p>
                <p className="text-amber-200/70">1 kΩ = 1000 Ω</p>
              </div>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
    </div>
  );
};

export default UnitConverterCalculator;
