import { useState, useMemo, useCallback } from 'react';
import type { CalcReport, CalcRow, CalcVerdict } from '@/lib/calculator-report';
import { useProvideCalcReport } from '@/lib/calculator-report-context';
import { copyToClipboard } from '@/utils/clipboard';
import { Copy, Check, ChevronDown, AlertTriangle, CheckCircle } from 'lucide-react';
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
  CalculatorEditorial,
  CALCULATOR_CONFIG,
  CalculatorPanes,
  ResultHeadline,
} from '@/components/calculators/shared';
import { instrumentationContent } from './content/instrumentation';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const CAT = 'testing' as const;
const config = CALCULATOR_CONFIG[CAT];

interface CalculationResult {
  current: number;
  percentage: number;
  engineeringValue: number;
  tripPoints: { low: number; high: number };
  shuntVoltage?: number;
  supplyMargin?: number;
  cableDrop?: number;
  powerInShunt?: number;
  status: 'pass' | 'warning' | 'fail';
}

const unitOptions = [
  { value: 'bar', label: 'bar (Pressure)' },
  { value: '°C', label: '°C (Temperature)' },
  { value: '°F', label: '°F (Temperature)' },
  { value: 'L/min', label: 'L/min (Flow)' },
  { value: 'm³/h', label: 'm³/h (Flow)' },
  { value: 'rpm', label: 'rpm (Speed)' },
  { value: 'pH', label: 'pH (Acidity)' },
  { value: '%', label: '% (Level/Humidity)' },
];

const currentOptions = [
  { value: '4', label: '4.0 mA (0%)' },
  { value: '6', label: '6.0 mA (12.5%)' },
  { value: '8', label: '8.0 mA (25%)' },
  { value: '10', label: '10.0 mA (37.5%)' },
  { value: '12', label: '12.0 mA (50%)' },
  { value: '14', label: '14.0 mA (62.5%)' },
  { value: '16', label: '16.0 mA (75%)' },
  { value: '18', label: '18.0 mA (87.5%)' },
  { value: '20', label: '20.0 mA (100%)' },
];

const formatNum = (num: number | undefined, decimals = 2): string => {
  if (num === undefined) return '0';
  return num.toFixed(decimals);
};

const InstrumentationCalculator = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  // Core inputs
  const [minScale, setMinScale] = useState('');
  const [maxScale, setMaxScale] = useState('');
  const [inputType, setInputType] = useState<'engineering' | 'percentage'>('engineering');
  const [inputValue, setInputValue] = useState('');
  const [targetCurrent, setTargetCurrent] = useState('');
  const [unit, setUnit] = useState('bar');

  // Loop analysis inputs (always visible, sensible defaults)
  const [supplyVoltage, setSupplyVoltage] = useState('24');
  const [shuntResistor, setShuntResistor] = useState('250');
  const [cableLength, setCableLength] = useState('');
  const [cableResistance, setCableResistance] = useState('0.1');

  const [showGuidance, setShowGuidance] = useState(false);
  const [showReference, setShowReference] = useState(false);

  const result = useMemo((): CalculationResult | null => {
    if (!minScale || !maxScale) return null;

    const min = parseFloat(minScale);
    const max = parseFloat(maxScale);
    const span = max - min;

    let percentage: number;
    let engineeringValue: number;
    let current: number;

    if (inputValue) {
      const value = parseFloat(inputValue);

      if (inputType === 'percentage') {
        percentage = value;
        engineeringValue = min + (span * value) / 100;
        current = 4 + (16 * value) / 100;
      } else {
        engineeringValue = value;
        percentage = ((value - min) / span) * 100;
        current = 4 + (16 * (value - min)) / span;
      }
    } else if (targetCurrent) {
      current = parseFloat(targetCurrent);
      percentage = ((current - 4) / 16) * 100;
      engineeringValue = min + (span * (current - 4)) / 16;
    } else {
      return null;
    }

    // Trip points
    const tripPoints = {
      low: 4 + 16 * 0.1,
      high: 4 + 16 * 0.9,
    };

    // Loop analysis calculations
    let shuntVoltage: number | undefined;
    let supplyMargin: number | undefined;
    let cableDrop: number | undefined;
    let powerInShunt: number | undefined;

    if (shuntResistor) {
      const shuntR = parseFloat(shuntResistor);
      shuntVoltage = (current / 1000) * shuntR;
      powerInShunt = Math.pow(current / 1000, 2) * shuntR * 1000;
    }

    if (supplyVoltage && shuntVoltage) {
      const supply = parseFloat(supplyVoltage);
      supplyMargin = supply - shuntVoltage;

      if (cableLength && cableResistance) {
        const len = parseFloat(cableLength);
        const resistance = parseFloat(cableResistance);
        if (len > 0 && resistance > 0) {
          cableDrop = (current / 1000) * (resistance * len * 2);
          supplyMargin -= cableDrop;
        }
      }
    }

    // Determine status
    let status: 'pass' | 'warning' | 'fail' = 'pass';
    if (current < 4 || current > 20) status = 'fail';
    else if (current < 4.5 || current > 19.5) status = 'warning';
    else if (supplyMargin !== undefined && supplyMargin < 2) status = 'fail';
    else if (supplyMargin !== undefined && supplyMargin < 5) status = 'warning';

    return {
      current,
      percentage,
      engineeringValue,
      tripPoints,
      shuntVoltage,
      supplyMargin,
      cableDrop,
      powerInShunt,
      status,
    };
  }, [
    minScale,
    maxScale,
    inputValue,
    inputType,
    targetCurrent,
    supplyVoltage,
    shuntResistor,
    cableLength,
    cableResistance,
  ]);

  const handleReset = useCallback(() => {
    setMinScale('');
    setMaxScale('');
    setInputValue('');
    setTargetCurrent('');
    setInputType('engineering');
    setUnit('bar');
    setSupplyVoltage('24');
    setShuntResistor('250');
    setCableLength('');
    setCableResistance('0.1');
  }, []);

  const handleCopy = () => {
    if (!result) return;
    const text = [
      '4-20mA Instrumentation Results',
      `Current Output: ${formatNum(result.current, 2)} mA`,
      `Engineering Value: ${formatNum(result.engineeringValue, 2)} ${unit}`,
      `Percentage: ${formatNum(result.percentage, 1)}%`,
      `Trip Points: Low ${formatNum(result.tripPoints.low, 1)}mA / High ${formatNum(result.tripPoints.high, 1)}mA`,
      ...(result.shuntVoltage
        ? [`Shunt Voltage: ${formatNum(result.shuntVoltage * 1000, 0)}mV`]
        : []),
      ...(result.supplyMargin !== undefined
        ? [`Supply Margin: ${formatNum(result.supplyMargin, 1)}V`]
        : []),
    ].join('\n');
    copyToClipboard(text);
    setCopied(true);
    toast({ title: 'Copied to clipboard' });
    setTimeout(() => setCopied(false), 2000);
  };

  const hasValidInputs = () => minScale && maxScale && (inputValue || targetCurrent);

  const getStatusLabel = (): string => {
    if (!result) return '';
    if (result.status === 'pass') return 'Normal Range';
    if (result.status === 'warning') return 'Near Limits';
    return 'Out of Range';
  };

  const hasLoopData =
    result && (result.shuntVoltage !== undefined || result.supplyMargin !== undefined);

  // ── Client PDF ───────────────────────────────────────────────────────────
  // The loop can be driven from three different directions, and whichever one
  // the electrician used is an input, not a result. Selecting a target current
  // makes the current the input and the process value the answer; entering an
  // engineering value or a percentage makes the current the answer.
  const buildReport = (): CalcReport | null => {
    if (!result) return null;

    const min = parseFloat(minScale);
    const max = parseFloat(maxScale);
    const span = max - min;
    const drivenBy: 'engineering' | 'percentage' | 'current' = inputValue ? inputType : 'current';

    const verdict: CalcVerdict = result.status === 'warning' ? 'warn' : result.status;
    const unitLabel = unitOptions.find((o) => o.value === unit)?.label ?? unit;
    const currentLabel =
      currentOptions.find((o) => o.value === targetCurrent)?.label ?? `${targetCurrent} mA`;

    const currentHeadline = {
      label: 'Loop current',
      value: formatNum(result.current, 2),
      unit: 'mA',
      verdict,
    };
    const processHeadline = {
      label: 'Process value',
      value: formatNum(result.engineeringValue, 2),
      unit,
    };
    const percentHeadline = {
      label: 'Percentage of span',
      value: formatNum(result.percentage, 1),
      unit: '%',
    };

    const headline: CalcReport['headline'] =
      drivenBy === 'engineering'
        ? [currentHeadline, percentHeadline]
        : drivenBy === 'percentage'
          ? [currentHeadline, processHeadline]
          : // The current was selected from the list, so only the values it
            // converts to are calculated.
            [processHeadline, percentHeadline];

    const inputRows: CalcRow[] = [
      { label: 'Lower range value (LRV)', value: `${minScale} ${unit}` },
      { label: 'Upper range value (URV)', value: `${maxScale} ${unit}` },
      { label: 'Engineering units', value: unitLabel },
    ];
    if (drivenBy === 'engineering') {
      inputRows.push({ label: 'Trip setpoint', value: `${inputValue} ${unit}` });
    } else if (drivenBy === 'percentage') {
      inputRows.push({ label: 'Percentage', value: `${inputValue} %` });
    } else {
      inputRows.push({ label: 'Target current', value: currentLabel });
    }
    // Only list the loop values that actually fed a figure below — the shunt is
    // ignored if it is blank, and the supply only matters once it has.
    if (result.supplyMargin !== undefined) {
      inputRows.push({ label: 'Supply voltage', value: `${supplyVoltage} V` });
    }
    if (result.shuntVoltage !== undefined) {
      inputRows.push({ label: 'Shunt resistor', value: `${shuntResistor} Ω` });
    }
    if (result.cableDrop !== undefined) {
      inputRows.push({ label: 'Cable length', value: `${cableLength} m` });
      inputRows.push({ label: 'Cable resistance', value: `${cableResistance} Ω/m` });
    }

    const resultRows: CalcRow[] = [
      { label: 'Span', value: `${formatNum(span, 2)} ${unit}`, note: 'URV − LRV' },
      {
        label: 'Low alarm trip (10% of span)',
        value: `${formatNum(result.tripPoints.low, 1)} mA`,
        note: `${formatNum(min + span * 0.1, 2)} ${unit}`,
      },
      {
        label: 'High alarm trip (90% of span)',
        value: `${formatNum(result.tripPoints.high, 1)} mA`,
        note: `${formatNum(min + span * 0.9, 2)} ${unit}`,
      },
      {
        label: 'Loop status',
        value: getStatusLabel(),
        note:
          result.status === 'pass'
            ? 'Signal sits comfortably inside the 4–20 mA working range'
            : result.status === 'warning'
              ? 'Signal is close to the limits of the 4–20 mA range or the supply headroom is tight'
              : 'Signal or supply headroom falls outside the usable 4–20 mA range',
      },
    ];

    const loopRows: CalcRow[] = [];
    if (result.shuntVoltage !== undefined) {
      loopRows.push({
        label: 'Voltage across the shunt',
        value: `${formatNum(result.shuntVoltage * 1000, 0)} mV`,
        note: `${formatNum(result.current, 2)} mA through ${shuntResistor} Ω`,
      });
    }
    if (result.powerInShunt !== undefined) {
      loopRows.push({
        label: 'Power in the shunt',
        value: `${formatNum(result.powerInShunt, 1)} mW`,
      });
    }
    if (result.cableDrop !== undefined) {
      loopRows.push({
        label: 'Cable volt drop',
        value: `${formatNum(result.cableDrop, 2)} V`,
        note: `${cableLength} m out and back at ${cableResistance} Ω/m`,
      });
    }
    if (result.supplyMargin !== undefined) {
      loopRows.push({
        label: 'Supply margin',
        value: `${formatNum(result.supplyMargin, 1)} V`,
        note: 'Voltage left for the transmitter after the shunt and the cable',
      });
    }

    const notes = [
      'A 4–20 mA signal is linear across the range: 4 mA is 0% of span and 20 mA is 100%.',
      'The 4 mA live zero means a broken wire reads as 0 mA and can be told apart from a genuine zero reading.',
      result.supplyMargin !== undefined
        ? 'A supply margin under 5 V leaves little headroom for the transmitter; under 2 V the loop is unlikely to work reliably.'
        : '',
      'BS 7671: instrumentation circuits should use screened cables with proper earthing.',
    ].filter((t) => t.trim());

    return {
      meta: {
        title: '4-20 mA Loop Signal',
        subtitle: `Loop signal check for a ${minScale}–${maxScale} ${unit} transmitter`,
      },
      headline,
      sections: [
        { heading: 'Inputs', rows: inputRows },
        { heading: 'Result', rows: resultRows },
        ...(loopRows.length ? [{ heading: 'Loop analysis', rows: loopRows }] : []),
      ],
      notes,
    };
  };

  useProvideCalcReport(result ? buildReport : null);

  return (
    <CalculatorCard
      category={CAT}
      title="4-20mA Instrumentation"
      description="Calculate current output for alarm trip points and loop analysis"
    >
      <CalculatorPanes
        form={
          <>
            {/* Scale Range */}
            <CalculatorSection title="Scale Range">
              <CalculatorInputGrid columns={2} className="grid-cols-2">
                <CalculatorInput
                  label="Min Scale"
                  type="text"
                  inputMode="decimal"
                  value={minScale}
                  onChange={setMinScale}
                  placeholder="0"
                />
                <CalculatorInput
                  label="Max Scale"
                  type="text"
                  inputMode="decimal"
                  value={maxScale}
                  onChange={setMaxScale}
                  placeholder="100"
                />
              </CalculatorInputGrid>
              <CalculatorSelect
                label="Engineering Units"
                value={unit}
                onChange={setUnit}
                options={unitOptions}
              />
            </CalculatorSection>

            {/* Input Value */}
            <CalculatorSection title="Input Value">
              <CalculatorSelect
                label="Input Type"
                value={inputType}
                onChange={(v) => setInputType(v as 'engineering' | 'percentage')}
                options={[
                  { value: 'percentage', label: 'Percentage (0-100%)' },
                  { value: 'engineering', label: `Engineering Units (${unit})` },
                ]}
              />

              <CalculatorInput
                label={inputType === 'percentage' ? 'Percentage' : 'Trip Setpoint'}
                unit={inputType === 'percentage' ? '%' : unit}
                type="text"
                inputMode="decimal"
                value={inputValue}
                onChange={setInputValue}
                placeholder={inputType === 'percentage' ? '0-100' : 'Alarm value'}
                hint={
                  inputType === 'engineering'
                    ? `Value between ${minScale || '0'} and ${maxScale || '100'} ${unit}`
                    : undefined
                }
              />

              <CalculatorSelect
                label="Or Select Target Current"
                value={targetCurrent}
                onChange={setTargetCurrent}
                options={currentOptions}
                placeholder="Select mA value"
              />
            </CalculatorSection>

            {/* Loop Analysis */}
            <CalculatorSection title="Loop Analysis">
              <CalculatorInputGrid columns={2} className="grid-cols-2">
                <CalculatorInput
                  label="Supply Voltage"
                  unit="V"
                  type="text"
                  inputMode="decimal"
                  value={supplyVoltage}
                  onChange={setSupplyVoltage}
                  placeholder="24"
                />
                <CalculatorInput
                  label="Shunt Resistor"
                  unit="Ω"
                  type="text"
                  inputMode="decimal"
                  value={shuntResistor}
                  onChange={setShuntResistor}
                  placeholder="250"
                />
              </CalculatorInputGrid>
              <CalculatorInputGrid columns={2} className="grid-cols-2">
                <CalculatorInput
                  label="Cable Length"
                  unit="m"
                  type="text"
                  inputMode="decimal"
                  value={cableLength}
                  onChange={setCableLength}
                  placeholder="Optional"
                />
                <CalculatorInput
                  label="Cable R"
                  unit="Ω/m"
                  type="text"
                  inputMode="decimal"
                  value={cableResistance}
                  onChange={setCableResistance}
                  placeholder="0.1"
                />
              </CalculatorInputGrid>
            </CalculatorSection>

            <CalculatorActions
              category={CAT}
              onCalculate={() => {}}
              onReset={handleReset}
              isDisabled={!hasValidInputs()}
              calculateLabel="Calculate"
              showReset={!!(minScale || maxScale || inputValue || targetCurrent)}
            />
          </>
        }
        result={
          <>
            {/* ── Results ── */}
            {result && (
              <div className="space-y-4 animate-fade-in">
                {/* Status + Copy */}
                <div className="flex items-center justify-between">
                  <ResultBadge status={result.status} label={getStatusLabel()} />
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-medium transition-colors touch-manipulation min-h-[44px]"
                  >
                    {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>

                {/* Hero value */}
                <ResultHeadline
                  label="Current Output"
                  value={`${formatNum(result.current, 2)} mA`}
                  caption={`${formatNum(result.percentage, 1)}% of scale`}
                />

                {/* Core results */}
                <ResultsGrid columns={2}>
                  <ResultValue
                    label="Engineering Value"
                    value={formatNum(result.engineeringValue, 2)}
                    unit={unit}
                    category={CAT}
                    size="sm"
                  />
                  <ResultValue
                    label="Percentage"
                    value={formatNum(result.percentage, 1)}
                    unit="%"
                    category={CAT}
                    size="sm"
                  />
                  <ResultValue
                    label="Low Trip (10%)"
                    value={formatNum(result.tripPoints.low, 1)}
                    unit="mA"
                    category={CAT}
                    size="sm"
                  />
                  <ResultValue
                    label="High Trip (90%)"
                    value={formatNum(result.tripPoints.high, 1)}
                    unit="mA"
                    category={CAT}
                    size="sm"
                  />
                </ResultsGrid>

                {/* Loop Analysis Results */}
                {hasLoopData && (
                  <ResultsGrid columns={2}>
                    {result.shuntVoltage !== undefined && (
                      <ResultValue
                        label="Shunt Voltage"
                        value={formatNum(result.shuntVoltage * 1000, 0)}
                        unit="mV"
                        category={CAT}
                        size="sm"
                      />
                    )}
                    {result.supplyMargin !== undefined && (
                      <ResultValue
                        label="Supply Margin"
                        value={formatNum(result.supplyMargin, 1)}
                        unit="V"
                        category={CAT}
                        size="sm"
                      />
                    )}
                    {result.cableDrop !== undefined && (
                      <ResultValue
                        label="Cable Drop"
                        value={formatNum(result.cableDrop, 2)}
                        unit="V"
                        category={CAT}
                        size="sm"
                      />
                    )}
                    {result.powerInShunt !== undefined && (
                      <ResultValue
                        label="Shunt Power"
                        value={formatNum(result.powerInShunt, 1)}
                        unit="mW"
                        category={CAT}
                        size="sm"
                      />
                    )}
                  </ResultsGrid>
                )}

                {/* Status warnings */}
                {result.status === 'warning' && (
                  <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
                    <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
                    <p className="text-sm text-white">
                      Values near operating limits. Verify adequate margin for reliable operation.
                    </p>
                  </div>
                )}

                {result.status === 'fail' && (
                  <div className="flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30">
                    <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
                    <p className="text-sm text-white">
                      Values outside 4-20mA operating range. Check inputs.
                    </p>
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
                      label: 'Scale range',
                      formula: `Span = ${maxScale} − ${minScale} = ${parseFloat(maxScale) - parseFloat(minScale)} ${unit}`,
                      value: `LRV: ${minScale} ${unit}, URV: ${maxScale} ${unit}`,
                    },
                    {
                      label: 'Linear scaling',
                      formula: `I = 4 + 16 × (${formatNum(result.engineeringValue, 2)} − ${minScale}) ÷ ${parseFloat(maxScale) - parseFloat(minScale)}`,
                      value: `${formatNum(result.current, 2)} mA (${formatNum(result.percentage, 1)}%)`,
                    },
                    {
                      label: 'Engineering conversion',
                      formula: `PV = ${minScale} + ${parseFloat(maxScale) - parseFloat(minScale)} × ${formatNum(result.percentage, 1)}%`,
                      value: `${formatNum(result.engineeringValue, 2)} ${unit}`,
                    },
                    ...(result.shuntVoltage !== undefined
                      ? [
                          {
                            label: 'Loop analysis',
                            formula: `V_shunt = ${formatNum(result.current, 2)}mA × ${shuntResistor}Ω${result.cableDrop !== undefined ? ` | Cable drop = ${formatNum(result.current, 2)}mA × ${cableResistance}Ω/m × 2 × ${cableLength}m` : ''}`,
                            value: `Shunt: ${formatNum(result.shuntVoltage * 1000, 0)}mV${result.supplyMargin !== undefined ? ` | Margin: ${formatNum(result.supplyMargin, 1)}V` : ''}`,
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
                      <ul className="space-y-2">
                        {[
                          `Set calibrator to ${formatNum(result.current, 1)}mA to simulate ${formatNum(result.engineeringValue, 2)} ${unit}`,
                          `This represents ${formatNum(result.percentage, 1)}% of scale — ideal for trip testing`,
                          ...(result.shuntVoltage
                            ? [
                                `Monitor ${formatNum(result.shuntVoltage * 1000, 0)}mV across shunt to confirm signal`,
                              ]
                            : []),
                        ].map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-white">
                            <CheckCircle className="h-4 w-4 text-purple-400 mt-0.5 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                {/* ── 4-20mA Reference ── */}
                <Collapsible open={showReference} onOpenChange={setShowReference}>
                  <CollapsibleTrigger className="flex items-center justify-between w-full min-h-11 py-2.5 px-3 rounded-lg text-sm font-medium text-white hover:bg-white/5 transition-all touch-manipulation">
                    <span>4-20mA Reference</span>
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
                            term: 'Live Zero (4mA)',
                            desc: 'Allows detection of broken wires vs. zero reading',
                          },
                          {
                            term: 'Current Loop',
                            desc: 'Immune to voltage drops over long cable runs',
                          },
                          {
                            term: 'Typical Shunt',
                            desc: '250Ω gives 1-5V output for PLC analogue inputs',
                          },
                        ].map((item) => (
                          <li key={item.term} className="flex items-start gap-2 text-sm">
                            <span
                              className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                              style={{ backgroundColor: config.gradientFrom }}
                            />
                            <span className="text-white">
                              <span className="font-medium">{item.term}:</span> {item.desc}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <p className="text-xs text-white pt-2 border-t border-white/10">
                        BS 7671: Use screened cables and proper earthing for instrumentation
                        circuits.
                      </p>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            )}

            {/* Formula reference (always visible) */}
            <FormulaReference
              category={CAT}
              name="4-20mA Scaling"
              formula="I = 4 + 16 × (PV − LRV) ÷ Span"
              variables={[
                { symbol: 'I', description: 'Current output (mA)' },
                { symbol: 'PV', description: 'Process variable (engineering units)' },
                { symbol: 'LRV', description: 'Lower range value' },
                { symbol: 'Span', description: 'URV − LRV (full scale range)' },
              ]}
            />
          </>
        }
        footer={<CalculatorEditorial content={instrumentationContent} category={CAT} />}
      />
    </CalculatorCard>
  );
};

export default InstrumentationCalculator;
