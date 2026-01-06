import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Info, AlertTriangle, BookOpen, ChevronDown, Clock, PoundSterling } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import {
  CalculatorCard,
  CalculatorInputGrid,
  CalculatorInput,
  CalculatorSelect,
  CalculatorActions,
  CalculatorResult,
  ResultValue,
  ResultsGrid,
  CALCULATOR_CONFIG,
} from "@/components/calculators/shared";

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
}

export function FeedInTariffCalculator() {
  const config = CALCULATOR_CONFIG['renewable'];

  const [systemSize, setSystemSize] = useState('');
  const [installationDate, setInstallationDate] = useState('');
  const [technologyType, setTechnologyType] = useState('');
  const [peakSunHours, setPeakSunHours] = useState('3.5');
  const [selfConsumption, setSelfConsumption] = useState('50');
  const [installationCost, setInstallationCost] = useState('');
  const [electricityPrice, setElectricityPrice] = useState('0.25');

  const [showGuidance, setShowGuidance] = useState(false);
  const [showRegs, setShowRegs] = useState(false);
  const [result, setResult] = useState<FeedInResult | null>(null);

  const technologyTypes = [
    { value: 'solar_pv', label: 'Solar PV (Photovoltaic)' },
    { value: 'wind', label: 'Wind Power Turbine' },
    { value: 'hydro', label: 'Hydro Power' },
  ];

  const installationPeriods = [
    { value: 'before_2012', label: 'Before April 2012 (Premium)' },
    { value: '2012_2013', label: 'April 2012 - March 2013' },
    { value: '2014_2015', label: 'April 2014 - March 2015' },
    { value: '2016_2017', label: 'April 2016 - March 2017' },
    { value: '2018_2019', label: 'April 2018 - March 2019' },
    { value: 'after_2019', label: 'After March 2019 (SEG only)' }
  ];

  const getFeedInRates = (period: string, technology: string) => {
    const rates: Record<string, Record<string, number>> = {
      'before_2012': { solar_pv: 0.431, wind: 0.341, hydro: 0.199, export: 0.032 },
      '2012_2013': { solar_pv: 0.214, wind: 0.262, hydro: 0.199, export: 0.032 },
      '2014_2015': { solar_pv: 0.128, wind: 0.239, hydro: 0.199, export: 0.047 },
      '2016_2017': { solar_pv: 0.043, wind: 0.088, hydro: 0.199, export: 0.047 },
      '2018_2019': { solar_pv: 0.037, wind: 0.088, hydro: 0.199, export: 0.047 },
      'after_2019': { solar_pv: 0.000, wind: 0.000, hydro: 0.000, export: 0.055 }
    };
    return {
      generation: rates[period]?.[technology] || 0,
      export: rates[period]?.export || 0.055
    };
  };

  const calculateFeedInTariff = () => {
    const size = parseFloat(systemSize);
    const sunHours = parseFloat(peakSunHours);
    const selfCons = parseFloat(selfConsumption) / 100;
    const cost = parseFloat(installationCost);
    const price = parseFloat(electricityPrice);

    if (!size || !sunHours || !cost || !price || !installationDate || !technologyType) return;

    const rates = getFeedInRates(installationDate, technologyType);

    let yearlyGeneration;
    if (technologyType === 'solar_pv') {
      yearlyGeneration = size * sunHours * 365;
    } else if (technologyType === 'wind') {
      yearlyGeneration = size * 24 * 365 * 0.25;
    } else {
      yearlyGeneration = size * 24 * 365 * 0.40;
    }

    const generationPayment = yearlyGeneration * rates.generation;
    const exportedEnergy = yearlyGeneration * (1 - selfCons);
    const exportPayment = exportedEnergy * rates.export;
    const selfConsumedEnergy = yearlyGeneration * selfCons;
    const selfConsumptionSaving = selfConsumedEnergy * price;

    const totalAnnualReturn = generationPayment + exportPayment + selfConsumptionSaving;
    const totalReturn20Years = totalAnnualReturn * 20;
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
      exportRate: rates.export
    });
  };

  const reset = () => {
    setSystemSize('');
    setInstallationDate('');
    setTechnologyType('');
    setPeakSunHours('3.5');
    setSelfConsumption('50');
    setInstallationCost('');
    setElectricityPrice('0.25');
    setResult(null);
  };

  const hasValidInputs = () => systemSize && installationDate && technologyType && installationCost;
  const isSchemeActive = installationDate && installationDate !== 'after_2019';

  const getPaybackColor = (years: number) => years <= 8 ? 'text-green-400' : years <= 12 ? 'text-amber-400' : 'text-red-400';
  const getROIColor = (roi: number) => roi >= 10 ? 'text-green-400' : roi >= 5 ? 'text-amber-400' : 'text-red-400';

  return (
    <div className="space-y-4">
      <CalculatorCard
        category="renewable"
        title="Feed-in Tariff Calculator"
        description="Historical FIT payments for existing installations"
        badge="FIT/SEG"
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
            options={technologyTypes}
            placeholder="Select technology"
          />
        </CalculatorInputGrid>

        <CalculatorSelect
          label="Installation Period"
          value={installationDate}
          onChange={setInstallationDate}
          options={installationPeriods}
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

        <CalculatorInput
          label="Electricity Price"
          unit="£/kWh"
          type="text"
          inputMode="decimal"
          value={electricityPrice}
          onChange={setElectricityPrice}
          placeholder="0.25"
        />

        <CalculatorActions
          category="renewable"
          onCalculate={calculateFeedInTariff}
          onReset={reset}
          isDisabled={!hasValidInputs()}
          calculateLabel="Calculate Returns"
        />
      </CalculatorCard>

      {result && (
        <div className="space-y-4 animate-fade-in">
          <CalculatorResult category="renewable">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-sm text-white/60">Feed-in Tariff Results</span>
              <Badge variant="outline" className={isSchemeActive ? "text-green-400 border-green-400/50" : "text-orange-400 border-orange-400/50"}>
                {isSchemeActive ? 'Active FIT' : 'SEG Only'}
              </Badge>
            </div>

            <div className="text-center py-4">
              <p className="text-sm text-white/60 mb-1">Total Annual Return</p>
              <div className="text-4xl font-bold bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})` }}>
                £{result.totalAnnualReturn.toFixed(0)}
              </div>
            </div>

            <ResultsGrid columns={2}>
              <ResultValue label="Generation" value={result.yearlyGeneration.toFixed(0)} unit="kWh/yr" category="renewable" size="sm" />
              <ResultValue label="FIT Rate" value={(result.fitRate * 100).toFixed(1)} unit="p/kWh" category="renewable" size="sm" />
              <ResultValue label="Generation Payment" value={`£${result.generationPayment.toFixed(0)}`} category="renewable" size="sm" />
              <ResultValue label="Export Payment" value={`£${result.exportPayment.toFixed(0)}`} category="renewable" size="sm" />
              <ResultValue label="Bill Savings" value={`£${result.selfConsumptionSaving.toFixed(0)}`} category="renewable" size="sm" />
              <ResultValue label="20-Year Total" value={`£${(result.totalReturn20Years / 1000).toFixed(0)}k`} category="renewable" size="sm" />
            </ResultsGrid>

            <div className="grid grid-cols-2 gap-3 pt-4 mt-4 border-t border-white/10">
              <div className="text-center p-3 rounded-lg bg-white/5">
                <Clock className="h-4 w-4 mx-auto mb-1 text-white/60" />
                <p className="text-xs text-white/60">Payback</p>
                <p className={cn("text-lg font-bold", getPaybackColor(result.simplePayback))}>
                  {result.simplePayback.toFixed(1)} yrs
                </p>
              </div>
              <div className="text-center p-3 rounded-lg bg-white/5">
                <TrendingUp className="h-4 w-4 mx-auto mb-1 text-white/60" />
                <p className="text-xs text-white/60">Annual ROI</p>
                <p className={cn("text-lg font-bold", getROIColor(result.roi))}>
                  {result.roi.toFixed(1)}%
                </p>
              </div>
            </div>
          </CalculatorResult>

          {!isSchemeActive && (
            <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/30">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-orange-400 mt-0.5 shrink-0" />
                <p className="text-sm text-orange-200">
                  <strong>New Installations:</strong> FIT closed March 2019. SEG rates (3-7p/kWh) apply instead.
                </p>
              </div>
            </div>
          )}

          <Collapsible open={showGuidance} onOpenChange={setShowGuidance}>
            <div className="calculator-card overflow-hidden" style={{ borderColor: '#60a5fa15' }}>
              <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                <div className="flex items-center gap-3">
                  <Info className="h-4 w-4 text-blue-400" />
                  <span className="text-sm sm:text-base font-medium text-blue-300">Understanding Returns</span>
                </div>
                <ChevronDown className={cn("h-4 w-4 text-white/70 transition-transform duration-200", showGuidance && "rotate-180")} />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 pt-0 space-y-2">
                <p className="text-sm text-blue-200/80">
                  <strong className="text-blue-300">Three income streams:</strong> Generation payments (all electricity), export payments (surplus), and bill savings (self-consumed).
                </p>
                <p className="text-sm text-blue-200/80">
                  <strong className="text-blue-300">Higher self-consumption</strong> improves returns, especially for post-2016 installations with lower FIT rates.
                </p>
              </CollapsibleContent>
            </div>
          </Collapsible>

          <Collapsible open={showRegs} onOpenChange={setShowRegs}>
            <div className="calculator-card overflow-hidden" style={{ borderColor: '#fbbf2415' }}>
              <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-4 w-4 text-amber-400" />
                  <span className="text-sm sm:text-base font-medium text-amber-300">Scheme Information</span>
                </div>
                <ChevronDown className={cn("h-4 w-4 text-white/70 transition-transform duration-200", showRegs && "rotate-180")} />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 pt-0">
                <div className="space-y-2 text-sm text-amber-200/80">
                  <p><strong className="text-amber-300">FIT Duration:</strong> 20-year guaranteed payments from installation date</p>
                  <p><strong className="text-amber-300">RPI Linked:</strong> Generation rates increase with inflation</p>
                  <p><strong className="text-amber-300">Verification:</strong> Check rates with energy supplier or Ofgem tables</p>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        </div>
      )}

      <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
        <div className="flex items-start gap-2">
          <Info className="h-4 w-4 text-green-400 mt-0.5 shrink-0" />
          <p className="text-sm text-green-200">
            <strong>FIT closed March 2019.</strong> Existing installations receive payments for full 20-year term.
          </p>
        </div>
      </div>
    </div>
  );
}

export default FeedInTariffCalculator;
