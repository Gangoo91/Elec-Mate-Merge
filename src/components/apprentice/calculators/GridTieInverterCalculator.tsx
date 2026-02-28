import { useState, useCallback, useMemo } from 'react';
import { Copy, Check, ChevronDown, AlertTriangle, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
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

const CAT = 'renewable' as const;
const config = CALCULATOR_CONFIG[CAT];

const INVERTER_PRESETS = {
  singlePhase: [
    {
      value: '3.68',
      label: '3.68kW Single Phase',
      efficiency: 0.965,
      specs: { maxDcV: 600, mpptMin: 120, mpptMax: 500, mppts: 1, maxCurrent: 16 },
    },
    {
      value: '5',
      label: '5kW Single Phase',
      efficiency: 0.97,
      specs: { maxDcV: 600, mpptMin: 120, mpptMax: 500, mppts: 2, maxCurrent: 11 },
    },
    {
      value: '8',
      label: '8kW Single Phase',
      efficiency: 0.975,
      specs: { maxDcV: 1000, mpptMin: 120, mpptMax: 800, mppts: 2, maxCurrent: 13 },
    },
    {
      value: '10',
      label: '10kW Single Phase',
      efficiency: 0.975,
      specs: { maxDcV: 1000, mpptMin: 120, mpptMax: 800, mppts: 2, maxCurrent: 15 },
    },
  ],
  threePhase: [
    {
      value: '10',
      label: '10kW Three Phase',
      efficiency: 0.975,
      specs: { maxDcV: 1000, mpptMin: 200, mpptMax: 800, mppts: 2, maxCurrent: 15 },
    },
    {
      value: '15',
      label: '15kW Three Phase',
      efficiency: 0.98,
      specs: { maxDcV: 1100, mpptMin: 200, mpptMax: 900, mppts: 3, maxCurrent: 15 },
    },
    {
      value: '20',
      label: '20kW Three Phase',
      efficiency: 0.98,
      specs: { maxDcV: 1100, mpptMin: 200, mpptMax: 900, mppts: 4, maxCurrent: 20 },
    },
  ],
};

interface GridTieResult {
  dcArrayPower: number;
  inverterAcPower: number;
  inverterEfficiency: number;
  dcAcRatio: number;
  dailyGeneration: number;
  yearlyGeneration: number;
  clippingLoss: number;
  selfConsumedKwh: number;
  exportedKwh: number;
  exportIncome: number;
  billSavings: number;
  totalAnnualValue: number;
  paybackYears: number;
  acCurrent: number;
  recommendedMcb: number;
  isG98: boolean;
  requiresG99: boolean;
  losses: number;
  psh: number;
  selfConsumptionPct: number;
}

export function GridTieInverterCalculator() {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [arraySize, setArraySize] = useState('');
  const [inverterPower, setInverterPower] = useState('');
  const [systemPhase, setSystemPhase] = useState('');
  const [psh, setPsh] = useState('3.5');
  const [selfConsumption, setSelfConsumption] = useState('30');
  const [retailPrice, setRetailPrice] = useState('0.25');
  const [segRate, setSegRate] = useState('0.05');
  const [lossProfile, setLossProfile] = useState('18');
  const [systemCost, setSystemCost] = useState('');

  const [showGuidance, setShowGuidance] = useState(false);
  const [showRegs, setShowRegs] = useState(false);
  const [result, setResult] = useState<GridTieResult | null>(null);

  const getInverterOptions = () => {
    if (systemPhase === '230') return INVERTER_PRESETS.singlePhase;
    if (systemPhase === '400') return INVERTER_PRESETS.threePhase;
    return [];
  };

  const getSelectedInverter = () => {
    const options = getInverterOptions();
    return options.find((o) => o.value === inverterPower);
  };

  const canCalculate = useMemo(
    () => arraySize.trim() !== '' && systemPhase.trim() !== '' && inverterPower.trim() !== '',
    [arraySize, systemPhase, inverterPower]
  );

  const handleCalculate = useCallback(() => {
    const dcArrayPower = parseFloat(arraySize);
    const inverterAcPower = parseFloat(inverterPower);
    const actualPsh = parseFloat(psh);
    const actualSelfCons = parseFloat(selfConsumption) / 100;
    const actualRetailPrice = parseFloat(retailPrice);
    const actualSegRate = parseFloat(segRate);
    const actualLosses = parseFloat(lossProfile) / 100;
    const actualSystemCost = parseFloat(systemCost) || 0;
    const voltage = parseFloat(systemPhase);

    if (!dcArrayPower || !inverterAcPower || !actualPsh || !voltage) return;

    // Use per-preset inverter efficiency instead of hardcoded 0.96
    const selectedInverter = getInverterOptions().find((o) => o.value === inverterPower);
    const inverterEfficiency = selectedInverter?.efficiency ?? 0.96;

    const dcAcRatio = dcArrayPower / inverterAcPower;
    const grossDailyGeneration = dcArrayPower * actualPsh;
    const netDailyGeneration = grossDailyGeneration * (1 - actualLosses) * inverterEfficiency;
    const yearlyGeneration = netDailyGeneration * 365;
    const clippingFactor = Math.max(0, (dcAcRatio - 1.2) * 0.05);
    const clippingLoss = yearlyGeneration * clippingFactor;
    const actualYearlyGeneration = yearlyGeneration - clippingLoss;

    const selfConsumedKwh = actualYearlyGeneration * actualSelfCons;
    const exportedKwh = actualYearlyGeneration * (1 - actualSelfCons);
    const exportIncome = exportedKwh * actualSegRate;
    const billSavings = selfConsumedKwh * actualRetailPrice;
    const totalAnnualValue = exportIncome + billSavings;
    const paybackYears = actualSystemCost > 0 ? actualSystemCost / totalAnnualValue : 0;

    const acCurrent =
      systemPhase === '230'
        ? (inverterAcPower * 1000) / (voltage * 0.99)
        : (inverterAcPower * 1000) / (Math.sqrt(3) * voltage * 0.99);
    const recommendedMcb = Math.ceil(acCurrent / 5) * 5;
    const isG98 = acCurrent <= 16;

    setResult({
      dcArrayPower,
      inverterAcPower,
      inverterEfficiency,
      dcAcRatio,
      dailyGeneration: netDailyGeneration,
      yearlyGeneration: actualYearlyGeneration,
      clippingLoss,
      selfConsumedKwh,
      exportedKwh,
      exportIncome,
      billSavings,
      totalAnnualValue,
      paybackYears,
      acCurrent,
      recommendedMcb,
      isG98,
      requiresG99: !isG98,
      losses: actualLosses,
      psh: actualPsh,
      selfConsumptionPct: actualSelfCons,
    });
  }, [
    arraySize,
    inverterPower,
    systemPhase,
    psh,
    selfConsumption,
    retailPrice,
    segRate,
    lossProfile,
    systemCost,
  ]);

  const handleReset = useCallback(() => {
    setArraySize('');
    setInverterPower('');
    setSystemPhase('');
    setPsh('3.5');
    setSelfConsumption('30');
    setRetailPrice('0.25');
    setSegRate('0.05');
    setLossProfile('18');
    setSystemCost('');
    setResult(null);
  }, []);

  const handleCopy = () => {
    if (!result) return;
    const text = [
      'Grid-Tie Inverter Analysis',
      `DC Array: ${result.dcArrayPower} kWp`,
      `Inverter: ${result.inverterAcPower} kW (η=${(result.inverterEfficiency * 100).toFixed(1)}%)`,
      `DC:AC Ratio: ${result.dcAcRatio.toFixed(2)}`,
      `Annual Generation: ${result.yearlyGeneration.toFixed(0)} kWh`,
      `Annual Value: £${result.totalAnnualValue.toFixed(0)}`,
      result.paybackYears > 0 ? `Payback: ${result.paybackYears.toFixed(1)} years` : '',
      `AC Current: ${result.acCurrent.toFixed(1)} A`,
      `MCB Rating: ${result.recommendedMcb} A`,
      `Grid Connection: ${result.isG98 ? 'G98' : 'G99 Required'}`,
    ]
      .filter(Boolean)
      .join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({ title: 'Copied to clipboard' });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <CalculatorCard
      category={CAT}
      title="Grid-Tie Inverter Calculator"
      description="G98/G99 compliant system design with financial analysis"
    >
      <CalculatorInputGrid columns={2}>
        <CalculatorInput
          label="DC Array Size"
          unit="kWp"
          type="text"
          inputMode="decimal"
          value={arraySize}
          onChange={setArraySize}
          placeholder="e.g., 6"
        />
        <CalculatorSelect
          label="Grid Connection"
          value={systemPhase}
          onChange={(v) => {
            setSystemPhase(v);
            setInverterPower('');
          }}
          options={[
            { value: '230', label: '230V Single Phase' },
            { value: '400', label: '400V Three Phase' },
          ]}
          placeholder="Select phase"
        />
      </CalculatorInputGrid>

      {systemPhase && (
        <CalculatorSelect
          label="Inverter Selection"
          value={inverterPower}
          onChange={setInverterPower}
          options={getInverterOptions().map((i) => ({
            value: i.value,
            label: `${i.label} (η=${(i.efficiency * 100).toFixed(1)}%)`,
          }))}
          placeholder="Select inverter"
        />
      )}

      <CalculatorInputGrid columns={2}>
        <CalculatorSelect
          label="Location (PSH)"
          value={psh}
          onChange={setPsh}
          options={[
            { value: '3.8', label: 'UK South (3.8h)' },
            { value: '3.5', label: 'UK Central (3.5h)' },
            { value: '3.2', label: 'UK North (3.2h)' },
            { value: '3.0', label: 'Scotland (3.0h)' },
          ]}
        />
        <CalculatorSelect
          label="Self-Consumption"
          value={selfConsumption}
          onChange={setSelfConsumption}
          options={[
            { value: '30', label: 'Home daytime (~30%)' },
            { value: '65', label: 'Home + battery (~65%)' },
            { value: '70', label: 'SME (~70%)' },
            { value: '85', label: 'High self-use (~85%)' },
          ]}
        />
      </CalculatorInputGrid>

      {/* Advanced toggle */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="gap-2 h-11 text-sm border-white/20 text-white hover:bg-white/10 touch-manipulation w-full"
      >
        <Settings className="h-4 w-4" />
        {showAdvanced ? 'Hide Advanced' : 'Show Advanced'}
      </Button>

      {showAdvanced && (
        <>
          <CalculatorDivider category={CAT} />
          <CalculatorInputGrid columns={2}>
            <CalculatorInput
              label="Retail Price"
              unit="£/kWh"
              type="text"
              inputMode="decimal"
              value={retailPrice}
              onChange={setRetailPrice}
              placeholder="0.25"
            />
            <CalculatorInput
              label="SEG Rate"
              unit="£/kWh"
              type="text"
              inputMode="decimal"
              value={segRate}
              onChange={setSegRate}
              placeholder="0.05"
            />
            <CalculatorInput
              label="System Losses"
              unit="%"
              type="text"
              inputMode="numeric"
              value={lossProfile}
              onChange={setLossProfile}
              placeholder="18"
            />
            <CalculatorInput
              label="System Cost"
              unit="£"
              type="text"
              inputMode="numeric"
              value={systemCost}
              onChange={setSystemCost}
              placeholder="8000"
            />
          </CalculatorInputGrid>
        </>
      )}

      <CalculatorActions
        category={CAT}
        onCalculate={handleCalculate}
        onReset={handleReset}
        isDisabled={!canCalculate}
        calculateLabel="Analyse System"
        showReset={!!result}
      />

      {/* ── Results ── */}
      {result && (
        <div className="space-y-4 animate-fade-in">
          {/* Status + Copy */}
          <div className="flex items-center justify-between">
            <ResultBadge
              status={result.isG98 ? 'pass' : 'warning'}
              label={
                result.isG98 ? 'G98 — Simplified Connection' : 'G99 — DNO Application Required'
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

          {/* Hero annual value */}
          <div className="text-center py-3">
            <p className="text-sm font-medium text-white mb-1">Annual Value</p>
            <p
              className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
              }}
            >
              £{result.totalAnnualValue.toFixed(0)}
            </p>
            <p className="text-sm text-white mt-2">
              {result.yearlyGeneration.toFixed(0)} kWh/yr
              {result.paybackYears > 0 && ` · ${result.paybackYears.toFixed(1)} year payback`}
            </p>
          </div>

          {/* DC:AC and generation */}
          <ResultsGrid columns={2}>
            <ResultValue
              label="DC:AC Ratio"
              value={result.dcAcRatio.toFixed(2)}
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="Daily Generation"
              value={result.dailyGeneration.toFixed(1)}
              unit="kWh"
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="Bill Savings"
              value={`£${result.billSavings.toFixed(0)}`}
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="Export Income"
              value={`£${result.exportIncome.toFixed(0)}`}
              category={CAT}
              size="sm"
            />
          </ResultsGrid>

          <CalculatorDivider category={CAT} />

          {/* AC System & Protection */}
          <ResultsGrid columns={2}>
            <ResultValue
              label="AC Current"
              value={result.acCurrent.toFixed(1)}
              unit="A"
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="MCB Rating"
              value={`${result.recommendedMcb}`}
              unit="A"
              category={CAT}
              size="sm"
            />
          </ResultsGrid>

          {/* Clipping warning */}
          {result.clippingLoss > 0 && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
              <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
              <p className="text-sm text-white">
                Clipping loss: {result.clippingLoss.toFixed(0)} kWh/yr (
                {(
                  (result.clippingLoss / (result.yearlyGeneration + result.clippingLoss)) *
                  100
                ).toFixed(1)}
                %). DC:AC ratio of {result.dcAcRatio.toFixed(2)} causes inverter saturation during
                peak irradiance.
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
                label: 'DC:AC ratio',
                formula: `${result.dcArrayPower} kWp / ${result.inverterAcPower} kW`,
                value: `${result.dcAcRatio.toFixed(2)}`,
              },
              {
                label: 'Daily generation',
                formula: `${result.dcArrayPower} × ${result.psh} PSH × (1 - ${(result.losses * 100).toFixed(0)}%) × ${(result.inverterEfficiency * 100).toFixed(1)}% η`,
                value: `${result.dailyGeneration.toFixed(1)} kWh/day`,
              },
              ...(result.clippingLoss > 0
                ? [
                    {
                      label: 'Clipping loss',
                      formula: `DC:AC ratio ${result.dcAcRatio.toFixed(2)} > 1.2 threshold`,
                      value: `${result.clippingLoss.toFixed(0)} kWh/yr lost`,
                    },
                  ]
                : []),
              {
                label: 'Annual yield',
                formula: `${result.dailyGeneration.toFixed(1)} × 365${result.clippingLoss > 0 ? ` - ${result.clippingLoss.toFixed(0)} clipping` : ''}`,
                value: `${result.yearlyGeneration.toFixed(0)} kWh/yr`,
              },
              {
                label: 'Self-consumed vs exported',
                formula: `${result.yearlyGeneration.toFixed(0)} × ${(result.selfConsumptionPct * 100).toFixed(0)}% self-use`,
                value: `${result.selfConsumedKwh.toFixed(0)} kWh self-consumed, ${result.exportedKwh.toFixed(0)} kWh exported`,
              },
              {
                label: 'Financial value',
                formula: `(${result.selfConsumedKwh.toFixed(0)} × £${parseFloat(retailPrice).toFixed(2)}) + (${result.exportedKwh.toFixed(0)} × £${parseFloat(segRate).toFixed(2)})`,
                value: `£${result.billSavings.toFixed(0)} savings + £${result.exportIncome.toFixed(0)} export = £${result.totalAnnualValue.toFixed(0)}/yr`,
              },
              ...(result.paybackYears > 0
                ? [
                    {
                      label: 'Payback period',
                      formula: `£${parseFloat(systemCost).toFixed(0)} / £${result.totalAnnualValue.toFixed(0)}`,
                      value: `${result.paybackYears.toFixed(1)} years`,
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
                className="p-3 rounded-xl border space-y-4"
                style={{
                  borderColor: `${config.gradientFrom}15`,
                  background: `${config.gradientFrom}05`,
                }}
              >
                <div className="space-y-2">
                  <p className="text-sm text-white font-medium">
                    DC:AC Ratio ({result.dcAcRatio.toFixed(2)})
                  </p>
                  <p className="text-sm text-white">
                    {result.dcAcRatio >= 1.1 && result.dcAcRatio <= 1.3
                      ? 'Optimal balance between generation and inverter utilisation. The array slightly oversizes the inverter for better low-light performance with minimal clipping.'
                      : result.dcAcRatio > 1.3
                        ? 'High ratio — expect clipping losses during peak irradiance. Consider a larger inverter or reducing the array size.'
                        : 'Conservative ratio — the inverter has spare capacity. The array could be larger for better utilisation.'}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-white font-medium">Financial Returns</p>
                  <p className="text-sm text-white">
                    Self-consumption saves £{result.billSavings.toFixed(0)}/yr by offsetting retail
                    electricity at £{parseFloat(retailPrice).toFixed(2)}/kWh. Exported energy earns
                    £{result.exportIncome.toFixed(0)}/yr at the Smart Export Guarantee rate.
                  </p>
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
                className="p-3 rounded-xl border space-y-3"
                style={{
                  borderColor: `${config.gradientFrom}15`,
                  background: `${config.gradientFrom}05`,
                }}
              >
                <ul className="space-y-2">
                  {[
                    {
                      reg: 'Section 712',
                      desc: 'Solar photovoltaic (PV) power supply systems',
                    },
                    {
                      reg: 'Reg 712.411.3.2.1',
                      desc: 'RCD protection — Type A minimum for PV inverters',
                    },
                    {
                      reg: 'Reg 712.512.2',
                      desc: 'DC isolation — switch-disconnector required on DC side',
                    },
                    {
                      reg: result.isG98 ? 'G98' : 'G99',
                      desc: result.isG98
                        ? 'Simplified notification for ≤16A per phase connections'
                        : 'DNO application required for >16A per phase connections',
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
        name="Grid-Tie Generation Formula"
        formula="E = P_dc × PSH × (1 - L) × η_inv"
        variables={[
          { symbol: 'P_dc', description: 'DC array power (kWp)' },
          { symbol: 'PSH', description: 'Peak sun hours (h/day)' },
          { symbol: 'L', description: 'System losses (shading, soiling, wiring)' },
          { symbol: 'η_inv', description: 'Inverter efficiency' },
        ]}
      />
    </CalculatorCard>
  );
}

export default GridTieInverterCalculator;
