import { useState, useCallback, useMemo } from 'react';
import { Copy, Check, ChevronDown, AlertTriangle } from 'lucide-react';
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

const CAT = 'renewable' as const;
const config = CALCULATOR_CONFIG[CAT];

interface FeedInResult {
  yearlyGeneration: number;
  generationPayment: number;
  exportPayment: number;
  selfConsumptionSaving: number;
  totalAnnualReturn: number;
  totalReturn20Years: number;
  simplePayback: number;
  roi: number;
  fitRate: number;
  exportRate: number;
  selfConsPct: number;
  exportedKwh: number;
  selfConsumedKwh: number;
  rpiRate: number;
  technologyType: string;
  capacityFactor: number;
}

const TECHNOLOGY_TYPES = [
  { value: 'solar_pv', label: 'Solar PV (Photovoltaic)' },
  { value: 'wind', label: 'Wind Power Turbine' },
  { value: 'hydro', label: 'Hydro Power' },
];

const INSTALLATION_PERIODS = [
  { value: 'before_2012', label: 'Before April 2012 (Premium)' },
  { value: '2012_2013', label: 'April 2012 - March 2013' },
  { value: '2014_2015', label: 'April 2014 - March 2015' },
  { value: '2016_2017', label: 'April 2016 - March 2017' },
  { value: '2018_2019', label: 'April 2018 - March 2019' },
  { value: 'after_2019', label: 'After March 2019 (SEG only)' },
];

const WIND_CAPACITY_FACTORS = [
  { value: '0.15', label: 'Poor site (15%)' },
  { value: '0.20', label: 'Below average (20%)' },
  { value: '0.25', label: 'Average UK (25%)' },
  { value: '0.30', label: 'Good site (30%)' },
  { value: '0.35', label: 'Excellent/coastal (35%)' },
];

const HYDRO_CAPACITY_FACTORS = [
  { value: '0.30', label: 'Low flow site (30%)' },
  { value: '0.40', label: 'Average UK (40%)' },
  { value: '0.50', label: 'Good flow (50%)' },
  { value: '0.60', label: 'Excellent/run-of-river (60%)' },
];

const FIT_RATES: Record<string, Record<string, number>> = {
  before_2012: { solar_pv: 0.431, wind: 0.341, hydro: 0.199, export: 0.032 },
  '2012_2013': { solar_pv: 0.214, wind: 0.262, hydro: 0.199, export: 0.032 },
  '2014_2015': { solar_pv: 0.128, wind: 0.239, hydro: 0.199, export: 0.047 },
  '2016_2017': { solar_pv: 0.043, wind: 0.088, hydro: 0.199, export: 0.047 },
  '2018_2019': { solar_pv: 0.037, wind: 0.088, hydro: 0.199, export: 0.047 },
  after_2019: { solar_pv: 0.0, wind: 0.0, hydro: 0.0, export: 0.055 },
};

export function FeedInTariffCalculator() {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const [systemSize, setSystemSize] = useState('');
  const [installationDate, setInstallationDate] = useState('');
  const [technologyType, setTechnologyType] = useState('');
  const [peakSunHours, setPeakSunHours] = useState('3.5');
  const [selfConsumption, setSelfConsumption] = useState('50');
  const [installationCost, setInstallationCost] = useState('');
  const [electricityPrice, setElectricityPrice] = useState('0.25');
  const [windCapacityFactor, setWindCapacityFactor] = useState('0.25');
  const [hydroCapacityFactor, setHydroCapacityFactor] = useState('0.40');
  const [rpiRate, setRpiRate] = useState('3');

  const [showGuidance, setShowGuidance] = useState(false);
  const [showRegs, setShowRegs] = useState(false);
  const [result, setResult] = useState<FeedInResult | null>(null);

  const canCalculate = useMemo(
    () =>
      systemSize.trim() !== '' &&
      installationDate.trim() !== '' &&
      technologyType.trim() !== '' &&
      installationCost.trim() !== '',
    [systemSize, installationDate, technologyType, installationCost]
  );

  const isSchemeActive = installationDate && installationDate !== 'after_2019';

  const handleCalculate = useCallback(() => {
    const size = parseFloat(systemSize);
    const sunHours = parseFloat(peakSunHours);
    const selfCons = parseFloat(selfConsumption) / 100;
    const cost = parseFloat(installationCost);
    const price = parseFloat(electricityPrice);
    const rpi = parseFloat(rpiRate) / 100;

    if (!size || !cost || !price || !installationDate || !technologyType) return;

    const rates = {
      generation: FIT_RATES[installationDate]?.[technologyType] || 0,
      export: FIT_RATES[installationDate]?.export || 0.055,
    };

    let yearlyGeneration: number;
    let capacityFactor = 0;

    if (technologyType === 'solar_pv') {
      yearlyGeneration = size * sunHours * 365;
    } else if (technologyType === 'wind') {
      capacityFactor = parseFloat(windCapacityFactor);
      yearlyGeneration = size * 24 * 365 * capacityFactor;
    } else {
      capacityFactor = parseFloat(hydroCapacityFactor);
      yearlyGeneration = size * 24 * 365 * capacityFactor;
    }

    const generationPayment = yearlyGeneration * rates.generation;
    const exportedKwh = yearlyGeneration * (1 - selfCons);
    const exportPayment = exportedKwh * rates.export;
    const selfConsumedKwh = yearlyGeneration * selfCons;
    const selfConsumptionSaving = selfConsumedKwh * price;

    const totalAnnualReturn = generationPayment + exportPayment + selfConsumptionSaving;

    // 20-year projection with RPI compounding
    let totalReturn20Years = 0;
    for (let year = 0; year < 20; year++) {
      totalReturn20Years += totalAnnualReturn * Math.pow(1 + rpi, year);
    }

    const simplePayback = cost / totalAnnualReturn;
    const roi = (totalAnnualReturn / cost) * 100;

    setResult({
      yearlyGeneration,
      generationPayment,
      exportPayment,
      selfConsumptionSaving,
      totalAnnualReturn,
      totalReturn20Years,
      simplePayback,
      roi,
      fitRate: rates.generation,
      exportRate: rates.export,
      selfConsPct: selfCons,
      exportedKwh,
      selfConsumedKwh,
      rpiRate: rpi,
      technologyType,
      capacityFactor,
    });
  }, [
    systemSize,
    installationDate,
    technologyType,
    peakSunHours,
    selfConsumption,
    installationCost,
    electricityPrice,
    windCapacityFactor,
    hydroCapacityFactor,
    rpiRate,
  ]);

  const handleReset = useCallback(() => {
    setSystemSize('');
    setInstallationDate('');
    setTechnologyType('');
    setPeakSunHours('3.5');
    setSelfConsumption('50');
    setInstallationCost('');
    setElectricityPrice('0.25');
    setWindCapacityFactor('0.25');
    setHydroCapacityFactor('0.40');
    setRpiRate('3');
    setResult(null);
  }, []);

  const handleCopy = () => {
    if (!result) return;
    const text = [
      'Feed-in Tariff Analysis',
      `Annual Generation: ${result.yearlyGeneration.toFixed(0)} kWh`,
      `FIT Rate: ${(result.fitRate * 100).toFixed(1)} p/kWh`,
      `Generation Payment: £${result.generationPayment.toFixed(0)}/yr`,
      `Export Payment: £${result.exportPayment.toFixed(0)}/yr`,
      `Bill Savings: £${result.selfConsumptionSaving.toFixed(0)}/yr`,
      `Total Annual Return: £${result.totalAnnualReturn.toFixed(0)}`,
      `20-Year Return (${(result.rpiRate * 100).toFixed(0)}% RPI): £${result.totalReturn20Years.toFixed(0)}`,
      `Payback: ${result.simplePayback.toFixed(1)} years`,
    ].join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({ title: 'Copied to clipboard' });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <CalculatorCard
      category={CAT}
      title="Feed-in Tariff Calculator"
      description="Historical FIT payments for existing installations"
    >
      <CalculatorInputGrid columns={2}>
        <CalculatorInput
          label="System Size"
          unit="kW"
          type="text"
          inputMode="decimal"
          value={systemSize}
          onChange={setSystemSize}
          placeholder="e.g., 4"
        />
        <CalculatorSelect
          label="Technology Type"
          value={technologyType}
          onChange={setTechnologyType}
          options={TECHNOLOGY_TYPES}
          placeholder="Select technology"
        />
      </CalculatorInputGrid>

      <CalculatorSelect
        label="Installation Period"
        value={installationDate}
        onChange={setInstallationDate}
        options={INSTALLATION_PERIODS}
        placeholder="When was it installed?"
      />

      {technologyType === 'solar_pv' && (
        <CalculatorInput
          label="Peak Sun Hours"
          unit="hrs/day"
          type="text"
          inputMode="decimal"
          value={peakSunHours}
          onChange={setPeakSunHours}
          placeholder="3.5"
          hint="UK average: 2.5-4.5 hrs"
        />
      )}

      {technologyType === 'wind' && (
        <CalculatorSelect
          label="Wind Capacity Factor"
          value={windCapacityFactor}
          onChange={setWindCapacityFactor}
          options={WIND_CAPACITY_FACTORS}
          hint="Depends on site wind speed and turbine height"
        />
      )}

      {technologyType === 'hydro' && (
        <CalculatorSelect
          label="Hydro Capacity Factor"
          value={hydroCapacityFactor}
          onChange={setHydroCapacityFactor}
          options={HYDRO_CAPACITY_FACTORS}
          hint="Depends on water flow consistency"
        />
      )}

      <CalculatorInputGrid columns={2}>
        <CalculatorInput
          label="Installation Cost"
          unit="£"
          type="text"
          inputMode="numeric"
          value={installationCost}
          onChange={setInstallationCost}
          placeholder="e.g., 6000"
        />
        <CalculatorInput
          label="Self Consumption"
          unit="%"
          type="text"
          inputMode="numeric"
          value={selfConsumption}
          onChange={setSelfConsumption}
          placeholder="50"
        />
      </CalculatorInputGrid>

      <CalculatorInputGrid columns={2}>
        <CalculatorInput
          label="Electricity Price"
          unit="£/kWh"
          type="text"
          inputMode="decimal"
          value={electricityPrice}
          onChange={setElectricityPrice}
          placeholder="0.25"
        />
        <CalculatorInput
          label="RPI Rate"
          unit="%"
          type="text"
          inputMode="decimal"
          value={rpiRate}
          onChange={setRpiRate}
          placeholder="3"
          hint="Annual RPI for 20-year projection"
        />
      </CalculatorInputGrid>

      <CalculatorActions
        category={CAT}
        onCalculate={handleCalculate}
        onReset={handleReset}
        isDisabled={!canCalculate}
        calculateLabel="Calculate Returns"
        showReset={!!result}
      />

      {/* ── Results ── */}
      {result && (
        <div className="space-y-4 animate-fade-in">
          {/* Status + Copy */}
          <div className="flex items-center justify-between">
            <ResultBadge
              status={isSchemeActive ? 'pass' : 'warning'}
              label={isSchemeActive ? 'Active FIT Scheme' : 'SEG Only — No FIT'}
            />
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-medium transition-colors touch-manipulation min-h-[44px]"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>

          {/* Hero annual return */}
          <div className="text-center py-3">
            <p className="text-sm font-medium text-white mb-1">Total Annual Return</p>
            <p
              className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
              }}
            >
              £{result.totalAnnualReturn.toFixed(0)}
            </p>
            <p className="text-sm text-white mt-2">
              {result.yearlyGeneration.toFixed(0)} kWh/yr · {result.simplePayback.toFixed(1)} year
              payback · {result.roi.toFixed(1)}% ROI
            </p>
          </div>

          {/* Results grid */}
          <ResultsGrid columns={2}>
            <ResultValue
              label="Generation Payment"
              value={`£${result.generationPayment.toFixed(0)}`}
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="Export Payment"
              value={`£${result.exportPayment.toFixed(0)}`}
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="Bill Savings"
              value={`£${result.selfConsumptionSaving.toFixed(0)}`}
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="20-Year Return"
              value={`£${(result.totalReturn20Years / 1000).toFixed(1)}k`}
              category={CAT}
              size="sm"
            />
          </ResultsGrid>

          {/* Post-2019 warning */}
          {!isSchemeActive && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
              <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
              <p className="text-sm text-white">
                FIT closed March 2019. New installations receive SEG payments only (typically
                3-7p/kWh export rate). No generation tariff is available.
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
                label: 'System size and generation',
                formula:
                  result.technologyType === 'solar_pv'
                    ? `${parseFloat(systemSize)} kW × ${parseFloat(peakSunHours)} PSH × 365 days`
                    : `${parseFloat(systemSize)} kW × 8760 hrs × ${(result.capacityFactor * 100).toFixed(0)}% CF`,
                value: `${result.yearlyGeneration.toFixed(0)} kWh/yr`,
              },
              {
                label: 'FIT generation payment',
                formula: `${result.yearlyGeneration.toFixed(0)} kWh × ${(result.fitRate * 100).toFixed(1)} p/kWh`,
                value: `£${result.generationPayment.toFixed(0)}/yr`,
                description: 'Paid on ALL generation, not just exports',
              },
              {
                label: 'Export payment',
                formula: `${result.exportedKwh.toFixed(0)} kWh exported × ${(result.exportRate * 100).toFixed(1)} p/kWh`,
                value: `£${result.exportPayment.toFixed(0)}/yr`,
              },
              {
                label: 'Self-consumption savings',
                formula: `${result.selfConsumedKwh.toFixed(0)} kWh × £${parseFloat(electricityPrice).toFixed(2)}/kWh`,
                value: `£${result.selfConsumptionSaving.toFixed(0)}/yr`,
              },
              {
                label: 'Total annual return',
                formula: `£${result.generationPayment.toFixed(0)} + £${result.exportPayment.toFixed(0)} + £${result.selfConsumptionSaving.toFixed(0)}`,
                value: `£${result.totalAnnualReturn.toFixed(0)}/yr`,
              },
              {
                label: 'Payback period',
                formula: `£${parseFloat(installationCost).toFixed(0)} / £${result.totalAnnualReturn.toFixed(0)}`,
                value: `${result.simplePayback.toFixed(1)} years`,
              },
              {
                label: '20-year return with RPI',
                formula: `Σ(£${result.totalAnnualReturn.toFixed(0)} × (1 + ${(result.rpiRate * 100).toFixed(0)}%)^year) for 20 years`,
                value: `£${result.totalReturn20Years.toFixed(0)}`,
                description: `RPI compounding at ${(result.rpiRate * 100).toFixed(0)}% — FIT payments are index-linked`,
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
                  <p className="text-sm text-white font-medium">Three Income Streams</p>
                  <p className="text-sm text-white">
                    FIT provides generation payments on ALL electricity produced (not just exports),
                    export payments on surplus sent to the grid, and bill savings from self-consumed
                    energy offsetting retail electricity costs.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-white font-medium">Maximising Returns</p>
                  <p className="text-sm text-white">
                    Higher self-consumption improves overall returns, especially for post-2016
                    installations where FIT generation rates dropped significantly. Adding battery
                    storage can increase self-consumption from ~30% to ~65%.
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
                      reg: 'MCS Certification',
                      desc: 'Required for FIT/SEG eligibility — installer and equipment must be MCS certified',
                    },
                    {
                      reg: 'Ofgem FIT/SEG Rules',
                      desc: 'FIT payments guaranteed for 20 years from installation, index-linked to RPI',
                    },
                    {
                      reg: 'Section 712',
                      desc: 'BS 7671 requirements for solar PV installations',
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
        name="Feed-in Tariff Formula"
        formula="Annual Return = (E × FIT) + (E_exp × r_exp) + (E_self × r_elec)"
        variables={[
          { symbol: 'E', description: 'Total annual generation (kWh)' },
          { symbol: 'FIT', description: 'Generation tariff rate (£/kWh)' },
          { symbol: 'E_exp', description: 'Exported energy (kWh)' },
          { symbol: 'r_exp', description: 'Export rate (£/kWh)' },
          { symbol: 'E_self', description: 'Self-consumed energy (kWh)' },
          { symbol: 'r_elec', description: 'Retail electricity price (£/kWh)' },
        ]}
      />
    </CalculatorCard>
  );
}

export default FeedInTariffCalculator;
