import { useState, useMemo } from 'react';
import { ArrowUpDown, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  CalculatorCard,
  CalculatorSection,
  CalculatorSelect,
  CalculatorInput,
  CalculatorActions,
  CalculatorDivider,
  CalculatorFormula,
  ResultValue,
  ResultsGrid,
  FormulaReference,
  CALCULATOR_CONFIG,
} from '@/components/calculators/shared';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const CAT = 'utilities' as const;
const config = CALCULATOR_CONFIG[CAT];

interface ConversionCategory {
  name: string;
  units: { [key: string]: { name: string; factor: number } };
}

const conversionCategories: { [key: string]: ConversionCategory } = {
  power: {
    name: 'Power',
    units: {
      W: { name: 'Watts', factor: 1 },
      kW: { name: 'Kilowatts', factor: 1000 },
      MW: { name: 'Megawatts', factor: 1000000 },
      hp: { name: 'Horsepower', factor: 745.7 },
      BTU: { name: 'BTU/hour', factor: 0.293071 },
    },
  },
  voltage: {
    name: 'Voltage',
    units: {
      V: { name: 'Volts', factor: 1 },
      kV: { name: 'Kilovolts', factor: 1000 },
      mV: { name: 'Millivolts', factor: 0.001 },
    },
  },
  current: {
    name: 'Current',
    units: {
      A: { name: 'Amperes', factor: 1 },
      mA: { name: 'Milliamperes', factor: 0.001 },
      kA: { name: 'Kiloamperes', factor: 1000 },
    },
  },
  resistance: {
    name: 'Resistance',
    units: {
      Ω: { name: 'Ohms', factor: 1 },
      kΩ: { name: 'Kilohms', factor: 1000 },
      MΩ: { name: 'Megohms', factor: 1000000 },
      mΩ: { name: 'Milliohms', factor: 0.001 },
    },
  },
  energy: {
    name: 'Energy',
    units: {
      J: { name: 'Joules', factor: 1 },
      kJ: { name: 'Kilojoules', factor: 1000 },
      Wh: { name: 'Watt-hours', factor: 3600 },
      kWh: { name: 'Kilowatt-hours', factor: 3600000 },
    },
  },
};

const formatValue = (value: number): string => {
  if (value >= 1e6 || (value < 1e-3 && value > 0)) {
    return value.toExponential(3);
  }
  return value.toLocaleString(undefined, { maximumFractionDigits: 6 });
};

const getWhyThisMatters = (category: string): string[] => {
  const points: { [key: string]: string[] } = {
    power: [
      '1 kW = 1000 W — Essential for electrical load calculations',
      'Estimate current draw: I ≈ P/V (e.g., 3 kW ÷ 230 V ≈ 13 A)',
      'Common appliances: kettle ~3 kW, LED bulb ~10 W, oven ~2.5 kW',
    ],
    voltage: [
      'UK domestic: 230 V single-phase, 400 V three-phase',
      'Distribution: 11 kV, 33 kV for substations and networks',
      'Sensor readings: mV ranges for thermocouples and instrumentation',
    ],
    current: [
      'MCB and conductor sizing depends on current rating',
      'Typical ratings: 6A lighting, 16A sockets, 32A cooker circuits',
      'Fault current calculations require kA for discrimination',
    ],
    resistance: [
      'Continuity testing: < 0.05 Ω for protective conductors',
      'Insulation resistance: > 1 MΩ @ 500V for most circuits',
      'Earth fault loop: Zs values determine disconnection times',
    ],
    energy: [
      'Billing uses kWh: 1 kWh = 3.6 MJ (physics to practical)',
      'Quick check: 3 kW appliance × 2 hours = 6 kWh',
      'Battery storage commonly rated in kWh for capacity',
    ],
  };
  return points[category] || [];
};

const UnitConverterCalculator = () => {
  const [category, setCategory] = useState<string>('power');
  const [fromUnit, setFromUnit] = useState<string>('W');
  const [toUnit, setToUnit] = useState<string>('kW');
  const [inputValue, setInputValue] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [equation, setEquation] = useState<string>('');
  const [showGuidance, setShowGuidance] = useState(false);
  const [showReference, setShowReference] = useState(false);

  const getEquivalentUnits = (baseValue: number) => {
    const units = conversionCategories[category].units;
    return Object.entries(units)
      .filter(([key]) => key !== toUnit)
      .map(([key, unit]) => ({
        unit: key,
        name: unit.name,
        value: baseValue / unit.factor,
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
    setEquation(
      `${formatValue(value)} ${fromUnit} × ${formatValue(conversionFactor)} = ${formatValue(convertedValue)} ${toUnit}`
    );
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
          setEquation(
            `${formatValue(value)} ${toUnit} × ${formatValue(conversionFactor)} = ${formatValue(convertedValue)} ${temp}`
          );
        }
      }, 0);
    }
  };

  const reset = () => {
    setInputValue('');
    setResult(null);
    setEquation('');
  };

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    const units = Object.keys(conversionCategories[newCategory].units);
    setFromUnit(units[0]);
    setToUnit(units[1] || units[0]);
    setInputValue('');
    setResult(null);
    setEquation('');
  };

  const isInputValid = inputValue.trim() !== '' && !isNaN(parseFloat(inputValue));

  const categoryOptions = Object.entries(conversionCategories).map(([key, cat]) => ({
    value: key,
    label: cat.name,
  }));

  const unitOptions = Object.entries(conversionCategories[category].units).map(([key, unit]) => ({
    value: key,
    label: `${unit.name} (${key})`,
  }));

  // Formula steps for result display
  const formulaSteps = useMemo(() => {
    if (result === null || !inputValue) return [];
    const value = parseFloat(inputValue);
    if (isNaN(value)) return [];

    const fromFactor = conversionCategories[category].units[fromUnit].factor;
    const toFactor = conversionCategories[category].units[toUnit].factor;
    const conversionFactor = fromFactor / toFactor;

    return [
      {
        label: 'Apply conversion factor',
        formula: `${formatValue(value)} ${fromUnit} × ${formatValue(conversionFactor)}`,
        value: `= ${formatValue(result)} ${toUnit}`,
      },
    ];
  }, [result, inputValue, category, fromUnit, toUnit]);

  return (
    <CalculatorCard
      category={CAT}
      title="Unit Converter"
      description="Convert between electrical units: power, voltage, current, resistance, energy"
    >
      {/* Category */}
      <CalculatorSelect
        label="Category"
        value={category}
        onChange={handleCategoryChange}
        options={categoryOptions}
      />

      {/* Convert From */}
      <CalculatorSection title="Convert From">
        <CalculatorSelect
          label="Unit"
          value={fromUnit}
          onChange={setFromUnit}
          options={unitOptions}
        />
        <CalculatorInput
          label="Value"
          type="text"
          inputMode="decimal"
          value={inputValue}
          onChange={setInputValue}
          placeholder="Enter value"
          error={!isInputValid && inputValue ? 'Enter a valid number' : undefined}
          onKeyDown={handleKeyPress}
        />
      </CalculatorSection>

      {/* Swap button */}
      <div className="flex justify-center">
        <button
          onClick={swapUnits}
          className="h-11 w-11 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors touch-manipulation"
          title="Swap units"
        >
          <ArrowUpDown className="h-5 w-5" />
        </button>
      </div>

      {/* Convert To */}
      <CalculatorSection title="Convert To">
        <CalculatorSelect
          label="Unit"
          value={toUnit}
          onChange={setToUnit}
          options={unitOptions}
        />
      </CalculatorSection>

      {/* Actions */}
      <CalculatorActions
        category={CAT}
        onCalculate={convert}
        onReset={reset}
        isDisabled={!isInputValid}
        calculateLabel="Convert"
        showReset={inputValue !== '' || result !== null}
      />

      {/* ── Results ── */}
      {result !== null && (
        <>
          <CalculatorDivider category={CAT} />

          <div className="space-y-4 animate-fade-in">
            {/* Hero value */}
            <div className="text-center py-3">
              <p
                className="text-4xl font-bold font-mono bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                }}
              >
                {formatValue(result)}
              </p>
              <p className="text-sm text-white mt-1">
                {conversionCategories[category].units[toUnit].name}
              </p>
            </div>

            {/* Conversion formula */}
            <CalculatorFormula
              category={CAT}
              steps={formulaSteps}
              title="Conversion"
              defaultOpen
            />

            {/* Also Equals */}
            <CalculatorSection title="Also Equals">
              <ResultsGrid columns={2}>
                {getEquivalentUnits(
                  parseFloat(inputValue) * conversionCategories[category].units[fromUnit].factor
                ).map(({ unit, name, value }) => (
                  <ResultValue
                    key={unit}
                    label={name}
                    value={formatValue(value)}
                    unit={unit}
                    category={CAT}
                    size="sm"
                  />
                ))}
              </ResultsGrid>
            </CalculatorSection>

            <CalculatorDivider category={CAT} />

            {/* Why This Matters */}
            <Collapsible open={showGuidance} onOpenChange={setShowGuidance}>
              <CollapsibleTrigger className="calculator-collapsible-trigger w-full">
                <span>Why This Matters</span>
                <ChevronDown
                  className={cn(
                    'h-4 w-4 text-white transition-transform duration-200',
                    showGuidance && 'rotate-180'
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
                    {getWhyThisMatters(category).map((point, idx) => (
                      <li key={idx} className="text-sm text-white flex items-start gap-2">
                        <span
                          className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                          style={{ backgroundColor: config.gradientFrom }}
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Common Conversions */}
            <Collapsible open={showReference} onOpenChange={setShowReference}>
              <CollapsibleTrigger className="calculator-collapsible-trigger w-full">
                <span>Common Conversions</span>
                <ChevronDown
                  className={cn(
                    'h-4 w-4 text-white transition-transform duration-200',
                    showReference && 'rotate-180'
                  )}
                />
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-2">
                <div
                  className="p-3 rounded-xl border"
                  style={{
                    borderColor: `${config.gradientFrom}15`,
                    background: `${config.gradientFrom}05`,
                  }}
                >
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="space-y-1">
                      <p className="text-white font-medium">Power</p>
                      <p className="text-white">1 kW = 1000 W</p>
                      <p className="text-white">1 hp ≈ 746 W</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-white font-medium">Voltage</p>
                      <p className="text-white">1 kV = 1000 V</p>
                      <p className="text-white">1 V = 1000 mV</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-white font-medium">Energy</p>
                      <p className="text-white">1 kWh = 3.6 MJ</p>
                      <p className="text-white">1 Wh = 3600 J</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-white font-medium">Resistance</p>
                      <p className="text-white">1 MΩ = 1000 kΩ</p>
                      <p className="text-white">1 kΩ = 1000 Ω</p>
                    </div>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </>
      )}

      {/* Formula reference (always visible) */}
      <FormulaReference
        category={CAT}
        name="Unit Conversion"
        formula="Result = Value × (From Factor ÷ To Factor)"
        variables={[
          { symbol: 'Value', description: 'The number you entered' },
          { symbol: 'From Factor', description: 'Base unit multiplier for the source unit' },
          { symbol: 'To Factor', description: 'Base unit multiplier for the target unit' },
        ]}
      />
    </CalculatorCard>
  );
};

export default UnitConverterCalculator;
