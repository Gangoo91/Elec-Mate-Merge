import { useMemo, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ReferenceDot,
} from 'recharts';
import { RotateCcw, Calculator, Info, AlertTriangle, Cable, ChevronDown } from 'lucide-react';
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
  ResultHeadline,
  ResultBadge,
  CALCULATOR_CONFIG,
  CalculatorPanes,
  CalculatorChart,
  chartTick,
  chartTooltip,
  CHART_GRID,
  CHART_VOLT,
  CHART_FAIL,
} from '@/components/calculators/shared';
import { voltageDropContent } from './content/voltage-drop';

// BS 7671 Appendix 4 mV/A/m values — single-phase (two-core) tabulated data.
//
// ⚠️ CONSOLIDATION DEBT: this is a hand-typed copy of data that lives canonically in
// src/lib/calculators/bs7671-data/voltageDropTables.ts (voltageDropFlatTwinEarth = Table 4D5B,
// voltageDropMulticoreArmoured = Table 4D4B). It should consume that module instead, but the
// shared module currently carries no aluminium armoured table and no XLPE multicore armoured
// (Table 4E4B) table, so two of the four families below have no canonical counterpart yet.
// Do not "correct" any number here in isolation — fix it in bs7671-data and import it.
//
// ⚠️ Rows listed in UNTABULATED_METHOD_ROWS below are NOT an Appendix 4 column. Appendix 4
// tabulates ONE mV/A/m column per multicore cable table (the values assume the conductor is at
// its maximum permitted normal operating temperature regardless of reference method); the only
// sanctioned adjustment is the Ct factor of App 4 §6.1, which is <= 1 and therefore never
// increases the tabulated value. They are retained only because deleting them would LOWER the
// calculated drop, and they are labelled in the UI as a conservative allowance, not as
// tabulated data.
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

// Reference-method rows that are a conservative allowance rather than a tabulated
// Appendix 4 column — see the note on mvamData above.
const UNTABULATED_METHOD_ROWS = new Set(['Enclosed in insulation', 'Underground duct (D2)']);

const circuitTypeOptions = [
  { value: 'lighting', label: 'Lighting' },
  { value: 'other', label: 'Power / other uses' },
];

// BS 7671 Appendix 4, Table 4Ab — voltage drop from the ORIGIN of the installation to any
// load point, as a % of nominal voltage:
//   (a) supplied directly from a public LV distribution system ... lighting 3%, other uses 5%
//   (b) supplied from a private LV supply .................... lighting 6%, other uses 8%
//   (*) the drop within each final circuit shall not exceed the values given in (a)
const supplyTypeOptions = [
  { value: 'public', label: 'Public LV supply (3% / 5%)' },
  { value: 'private', label: 'Private LV supply (6% / 8%)' },
];

/** Table 4Ab row (a) — also the per-final-circuit cap under footnote (*) for private supplies. */
const finalCircuitLimitFor = (isLighting: boolean) => (isLighting ? 3 : 5);

/** Table 4Ab installation limit: row (a) for a public supply, row (b) for a private LV supply. */
const installationBaseLimitFor = (isLighting: boolean, isPrivate: boolean) =>
  isPrivate ? (isLighting ? 6 : 8) : finalCircuitLimitFor(isLighting);

/**
 * Table 4Ab footnote: where the wiring systems of the installation are longer than 100 m the
 * tabulated drops may be increased by 0.005% per metre beyond 100 m, capped at +0.5%.
 * Only the route length of this circuit is known, so this is a lower bound on the allowance.
 */
const lengthRelaxationFor = (routeLength: number) =>
  Math.min(0.5, Math.max(0, routeLength - 100) * 0.005);

const VoltageDropCalculator = () => {
  const config = CALCULATOR_CONFIG['cable'];

  const [circuit, setCircuit] = useState<string>('other');
  const [supplyType, setSupplyType] = useState<string>('public');
  const [family, setFamily] = useState<string>('Copper T&E (6242Y)');
  const [method, setMethod] = useState<string>('Clipped direct (C)');
  const [cableSize, setCableSize] = useState<string>('');
  const [length, setLength] = useState<string>('');
  const [current, setCurrent] = useState<string>('');
  const [upstreamDrop, setUpstreamDrop] = useState<string>('');
  const [supplyVoltage, setSupplyVoltage] = useState<string>('230');
  const [showFormula, setShowFormula] = useState(false);
  const [result, setResult] = useState<{
    voltageDrop: number;
    percentage: number;
    upstreamPct: number;
    totalPercentage: number;
    voltageAtLoad: number;
    circuitLimit: number;
    installationLimit: number;
    relaxation: number;
    isPrivate: boolean;
    compliant: boolean;
    mvam: number;
    maxLength: number;
    // Inputs captured at the moment of calculation, so the shown working can never
    // drift from the numbers the result was actually computed from.
    atCurrent: number;
    atLength: number;
    atVoltage: number;
    alternatives: Array<{ size: number; mvam: number; pct: number; compliant: boolean }>;
  } | null>(null);

  /**
   * Drop against run length, for the cable and load actually calculated.
   *
   * Every point comes from the same expression as the headline figure —
   * mV/A/m x Ib x L / 1000, as a percentage of Uo, plus any upstream drop. The
   * curve is the calculator's own arithmetic swept over length, which is why it
   * can be read against the Table 4Ab limit line without qualification.
   */
  const dropCurve = useMemo(() => {
    if (!result) return [];
    const maxX = Math.max(result.atLength * 1.6, result.maxLength * 1.15, 5);
    const step = maxX / 24;
    const points: Array<{ length: number; pct: number }> = [];
    for (let i = 0; i <= 24; i++) {
      const L = step * i;
      const pct =
        result.upstreamPct + ((result.mvam * result.atCurrent * L) / 1000 / result.atVoltage) * 100;
      points.push({ length: Math.round(L * 10) / 10, pct: Math.round(pct * 1000) / 1000 });
    }
    return points;
  }, [result]);

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
    const upstreamPct = upstreamDrop.trim() === '' ? 0 : Number(upstreamDrop);
    const mvam = selectedMvam;

    if (!isFinite(I) || I <= 0 || !isFinite(L) || L <= 0 || !mvam) {
      setResult(null);
      return;
    }
    if (!isFinite(upstreamPct) || upstreamPct < 0) {
      setResult(null);
      return;
    }

    // BS 7671 formula: Vd = mV/A/m × Ib × L / 1000
    const voltageDrop = (mvam * I * L) / 1000;
    const percentage = (voltageDrop / V) * 100;
    const voltageAtLoad = V - voltageDrop;

    // BS 7671 App 4 §6.4: the limit applies to the drop "between the origin of an installation
    // and any load point" — the whole path, not this cable alone. The drop already used up
    // between the origin and this circuit's distribution board is added before the check.
    const totalPercentage = percentage + upstreamPct;

    const isLighting = circuit === 'lighting';
    const isPrivate = supplyType === 'private';
    // Table 4Ab row (a) — also the per-final-circuit cap for a private supply via footnote (*).
    const circuitLimit = finalCircuitLimitFor(isLighting);
    const baseInstallationLimit = installationBaseLimitFor(isLighting, isPrivate);
    const relaxation = lengthRelaxationFor(L);
    const installationLimit = baseInstallationLimit + relaxation;

    // A private LV supply gets the larger row (b) allowance overall, but Table 4Ab footnote (*)
    // still holds each final circuit to the row (a) value.
    const finalCircuitOk = isPrivate ? percentage <= circuitLimit : true;
    const compliant = totalPercentage <= installationLimit && finalCircuitOk;

    // Max length uses the un-relaxed base limit (the >100 m relaxation depends on the total
    // installation wiring length, which is not known here) so the answer stays conservative.
    const headroomPct = Math.max(
      0,
      Math.min(
        baseInstallationLimit - upstreamPct,
        isPrivate ? circuitLimit : Number.POSITIVE_INFINITY
      )
    );
    const maxLength = (V * (headroomPct / 100) * 1000) / (mvam * I);

    // Sizes that satisfy the VOLTAGE DROP limit only. Reg 433.1.1 additionally requires
    // Ib <= In <= Iz, which this calculator does not evaluate — see the caveat in the UI.
    const alternatives = sizes
      .map((size) => {
        const altMvam = dataForMethod[size];
        const altVd = (altMvam * I * L) / 1000;
        const altPct = (altVd / V) * 100;
        const altOk =
          altPct + upstreamPct <= installationLimit && (isPrivate ? altPct <= circuitLimit : true);
        return { size, mvam: altMvam, pct: altPct, compliant: altOk };
      })
      .filter((alt) => alt.compliant)
      .slice(0, 4);

    setResult({
      voltageDrop,
      percentage,
      upstreamPct,
      totalPercentage,
      voltageAtLoad,
      circuitLimit,
      installationLimit,
      relaxation,
      isPrivate,
      compliant,
      mvam,
      maxLength,
      atCurrent: I,
      atLength: L,
      atVoltage: V,
      alternatives,
    });
  };

  const reset = () => {
    setCircuit('other');
    setSupplyType('public');
    setFamily('Copper T&E (6242Y)');
    setMethod('Clipped direct (C)');
    setCableSize('');
    setLength('');
    setCurrent('');
    setUpstreamDrop('');
    setSupplyVoltage('230');
    setResult(null);
  };

  const upstreamValid = upstreamDrop.trim() === '' || Number(upstreamDrop) >= 0;
  const isValid = Boolean(selectedMvam && current && length && upstreamValid);

  return (
    <CalculatorCard
      category="cable"
      title="Voltage Drop Calculator"
      description="Calculate voltage drop using BS 7671 Appendix 4 tabulated values"
    >
      <CalculatorPanes
        form={
          <>
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
                label="Supply Type (Table 4Ab)"
                value={supplyType}
                onChange={setSupplyType}
                options={supplyTypeOptions}
              />

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
                  <p className="text-xs text-white mt-1 ml-6">
                    {UNTABULATED_METHOD_ROWS.has(method)
                      ? 'Conservative allowance — not a tabulated Appendix 4 column. Appendix 4 gives one mV/A/m column per multicore cable table, and its only sanctioned correction (Ct, App 4 §6.1) never increases it.'
                      : 'Tabulated single-phase (two-core) value, BS 7671 Appendix 4'}
                  </p>
                  {supplyVoltage === '400' && (
                    <p className="text-xs text-white mt-1 ml-6">
                      Three phase: Appendix 4 §6 states the tabulated mV/A/m relate to the line
                      voltage and assume balanced conditions, and tabulates a separate
                      three/four-core column. This tool applies the two-core value, which
                      over-states the drop — treat the result as conservative, and use the
                      three/four-core figure for a final design.
                    </p>
                  )}
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

              {/* App 4 §6.4 limits the drop from the ORIGIN to the load point, so any drop already
              used upstream of this circuit has to come out of the same budget. */}
              <CalculatorInput
                label="Voltage Drop Already Used Upstream"
                unit="%"
                type="text"
                inputMode="decimal"
                value={upstreamDrop}
                onChange={setUpstreamDrop}
                placeholder="e.g., 0.8"
                hint="Origin → this board (submains). Leave blank if this circuit starts at the origin."
              />

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
          </>
        }
        result={
          <>
            {/* Results Section */}
            {result && (
              <>
                <CalculatorDivider category="cable" />

                <div className="space-y-4 animate-fade-in">
                  {/* Status Chip */}
                  {/* Verdict, then the answer, then the supporting figures.

                      This was six ResultValue boxes of equal weight — voltage drop,
                      this circuit, total from origin, limit from origin, voltage at
                      load, max length — so the one number the check turns on (total
                      drop against the permitted limit) sat in the second box at the
                      same size as "max length". You had to work out which figure you
                      had come for. The pass/fail chip was also the only green in the
                      app, with an icon the design system does not use.

                      The compliance test is TOTAL drop from the origin against the
                      installation limit, not this circuit alone — so that is the
                      headline, with the limit alongside it. */}
                  <ResultBadge
                    status={result.compliant ? 'pass' : 'fail'}
                    label={result.compliant ? 'Within the limit' : 'Over the limit'}
                  />

                  <ResultHeadline
                    label="Total voltage drop from origin"
                    value={`${result.totalPercentage.toFixed(2)}%`}
                    aside={`limit ${result.installationLimit.toFixed(2)}%`}
                    tone={result.compliant ? 'default' : 'negative'}
                    caption={
                      result.compliant
                        ? `${result.voltageDrop.toFixed(2)} V dropped on this circuit, leaving ${result.voltageAtLoad.toFixed(1)} V at the load.`
                        : `Over the ${result.installationLimit.toFixed(2)}% limit. Shorten the run, increase the cable size, or reduce the load.`
                    }
                  />

                  <ResultsGrid columns={2}>
                    <ResultValue
                      label="Drop on this circuit"
                      value={result.voltageDrop.toFixed(2)}
                      unit="V"
                      category="cable"
                      size="sm"
                    />
                    <ResultValue
                      label="This circuit alone"
                      value={result.percentage.toFixed(2)}
                      unit="%"
                      category="cable"
                      size="sm"
                    />
                    <ResultValue
                      label="Voltage at load"
                      value={result.voltageAtLoad.toFixed(1)}
                      unit="V"
                      category="cable"
                      size="sm"
                    />
                    <ResultValue
                      label={`Max length at ${result.atCurrent} A`}
                      value={result.maxLength.toFixed(1)}
                      unit="m"
                      category="cable"
                      size="sm"
                    />
                  </ResultsGrid>

                  <CalculatorChart
                    title="Drop against run length"
                    caption={`${result.mvam} mV/A/m at ${result.atCurrent} A. The dashed line is the ${result.installationLimit.toFixed(2)}% limit; the dot is this run.`}
                  >
                    <LineChart
                      data={dropCurve}
                      margin={{ top: 6, right: 10, bottom: 4, left: -12 }}
                    >
                      <CartesianGrid stroke={CHART_GRID} vertical={false} />
                      <XAxis
                        dataKey="length"
                        tick={chartTick}
                        stroke={CHART_GRID}
                        unit="m"
                        tickLine={false}
                      />
                      <YAxis tick={chartTick} stroke={CHART_GRID} unit="%" tickLine={false} />
                      <Tooltip
                        {...chartTooltip}
                        formatter={(v: number) => [`${v.toFixed(2)}%`, 'Total drop']}
                        labelFormatter={(l) => `${l} m`}
                      />
                      <ReferenceLine
                        y={result.installationLimit}
                        stroke={CHART_FAIL}
                        strokeDasharray="4 4"
                        strokeWidth={1.5}
                      />
                      <Line
                        type="monotone"
                        dataKey="pct"
                        stroke={CHART_VOLT}
                        strokeWidth={2}
                        dot={false}
                        isAnimationActive={false}
                      />
                      <ReferenceDot
                        x={result.atLength}
                        y={result.totalPercentage}
                        r={4}
                        fill={result.compliant ? CHART_VOLT : CHART_FAIL}
                        stroke="#000"
                        strokeWidth={1}
                      />
                    </LineChart>
                  </CalculatorChart>

                  {/* Reg 433.1.1 — voltage drop is only one of the two sizing checks. This calculator
                  evaluates the App 4 §6.4 limit only; it does not know Iz or the device rating. */}
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
                      <div className="text-sm text-white">
                        <strong>Voltage drop only.</strong> A cable is not proven suitable by this
                        result alone. Regulation 433.1.1 additionally requires Ib ≤ In ≤ Iz — the
                        conductor&apos;s current-carrying capacity, derated for ambient temperature,
                        grouping and thermal insulation, must still be checked against the
                        protective device. Use the cable sizing / current capacity calculator for
                        that step.
                      </div>
                    </div>
                  </div>

                  {result.relaxation > 0 && (
                    <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10">
                      <p className="text-xs text-white">
                        Route exceeds 100 m, so the Table 4Ab limit has been increased by{' '}
                        {result.relaxation.toFixed(2)}% (0.005% per metre beyond 100 m, capped at
                        0.5%). Only this circuit&apos;s length is known, so the allowance shown is a
                        lower bound.
                      </p>
                    </div>
                  )}

                  {result.isPrivate && (
                    <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10">
                      <p className="text-xs text-white">
                        Private LV supply: Table 4Ab row (b) allows{' '}
                        {result.circuitLimit === 3 ? 6 : 8}% from the origin, but footnote (*) still
                        holds each final circuit to {result.circuitLimit}%. This circuit is at{' '}
                        {result.percentage.toFixed(2)}%.
                      </p>
                    </div>
                  )}

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
                              Smallest size that meets the voltage-drop limit:{' '}
                              {result.alternatives[0].size}mm² (
                              {result.alternatives[0].pct.toFixed(2)}%) — still to be confirmed
                              against Iz per Reg 433.1.1.
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
                        <span style={{ color: config.gradientFrom }}>Formula:</span> Vd = (mV/A/m ×
                        Ib × L) ÷ 1000
                      </p>
                      <p className="text-white">
                        <span style={{ color: config.gradientFrom }}>Step 1:</span> mV/A/m ={' '}
                        {result.mvam} (from Appendix 4)
                      </p>
                      <p className="text-white">
                        <span style={{ color: config.gradientFrom }}>Step 2:</span> Vd = (
                        {result.mvam} × {result.atCurrent} × {result.atLength}) ÷ 1000
                      </p>
                      <p className="text-white">
                        <span style={{ color: config.gradientFrom }}>Step 3:</span> Vd ={' '}
                        {(result.mvam * result.atCurrent * result.atLength).toFixed(1)} ÷ 1000 ={' '}
                        <strong>{result.voltageDrop.toFixed(2)} V</strong>
                      </p>
                      <p className="text-white">
                        <span style={{ color: config.gradientFrom }}>Step 4:</span> % = (
                        {result.voltageDrop.toFixed(2)} ÷ {result.atVoltage}) × 100 ={' '}
                        <strong>{result.percentage.toFixed(2)}%</strong>
                      </p>
                      <p className="text-white">
                        <span style={{ color: config.gradientFrom }}>Step 5:</span> total from
                        origin = {result.upstreamPct.toFixed(2)}% upstream +{' '}
                        {result.percentage.toFixed(2)}% ={' '}
                        <strong>{result.totalPercentage.toFixed(2)}%</strong>
                      </p>
                      <p className={cn(result.compliant ? 'text-green-400' : 'text-red-400')}>
                        <span style={{ color: config.gradientFrom }}>Check:</span>{' '}
                        {result.totalPercentage.toFixed(2)}% {result.compliant ? '≤' : '>'}{' '}
                        {result.installationLimit.toFixed(2)}% (Table 4Ab
                        {result.relaxation > 0 ? ', incl. >100 m relaxation' : ''}) →{' '}
                        {result.compliant ? 'PASS ✓' : 'FAIL ✗'}
                      </p>
                      <p className="text-white">
                        <span style={{ color: config.gradientFrom }}>Not checked:</span> Iz and Ib ≤
                        In ≤ Iz (Reg 433.1.1)
                      </p>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                {/* Alternative Sizes */}
                {result.alternatives.length > 0 && (
                  <>
                    <CalculatorDivider category="cable" />
                    <div>
                      {/* Qualified on voltage drop ONLY — Reg 433.1.1 (Ib ≤ In ≤ Iz) is not evaluated
                      here, so these cannot be labelled "compliant". */}
                      <p className="text-sm text-white mb-1">Sizes Within the Voltage-Drop Limit</p>
                      <p className="text-xs text-white mb-2">
                        Voltage drop only. Each still has to satisfy Ib ≤ In ≤ Iz (Reg 433.1.1) for
                        the installation method and derating factors in use.
                      </p>
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
                            <span className="text-green-400 font-mono">
                              {alt.pct.toFixed(2)}% ✓
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </>
            )}

            {/* Grounded guidance + standards */}
          </>
        }
        footer={<CalculatorEditorial content={voltageDropContent} category="cable" />}
      />
    </CalculatorCard>
  );
};

export default VoltageDropCalculator;
