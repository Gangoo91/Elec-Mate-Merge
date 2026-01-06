import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Zap, Info, AlertTriangle, CheckCircle2, BookOpen, ChevronDown, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { toast } from "@/hooks/use-toast";

const INVERTER_PRESETS = {
  singlePhase: [
    { value: '3.68', label: '3.68kW Single Phase', specs: { maxDcV: 600, mpptMin: 120, mpptMax: 500, mppts: 1, maxCurrent: 16 } },
    { value: '5', label: '5kW Single Phase', specs: { maxDcV: 600, mpptMin: 120, mpptMax: 500, mppts: 2, maxCurrent: 11 } },
    { value: '8', label: '8kW Single Phase', specs: { maxDcV: 1000, mpptMin: 120, mpptMax: 800, mppts: 2, maxCurrent: 13 } },
    { value: '10', label: '10kW Single Phase', specs: { maxDcV: 1000, mpptMin: 120, mpptMax: 800, mppts: 2, maxCurrent: 15 } },
  ],
  threePhase: [
    { value: '10', label: '10kW Three Phase', specs: { maxDcV: 1000, mpptMin: 200, mpptMax: 800, mppts: 2, maxCurrent: 15 } },
    { value: '15', label: '15kW Three Phase', specs: { maxDcV: 1100, mpptMin: 200, mpptMax: 900, mppts: 3, maxCurrent: 15 } },
    { value: '20', label: '20kW Three Phase', specs: { maxDcV: 1100, mpptMin: 200, mpptMax: 900, mppts: 4, maxCurrent: 20 } },
  ]
};

interface GridTieResult {
  dcArrayPower: number;
  inverterAcPower: number;
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
}

export function GridTieInverterCalculator() {
  const config = CALCULATOR_CONFIG['renewable'];

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [arraySize, setArraySize] = useState('');
  const [inverterPower, setInverterPower] = useState('');
  const [systemPhase, setSystemPhase] = useState('');
  const [exportLimit, setExportLimit] = useState('none');
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

  const calculateGridTie = () => {
    const dcArrayPower = parseFloat(arraySize);
    const inverterAcPower = parseFloat(inverterPower);
    const actualPsh = parseFloat(psh);
    const actualSelfCons = parseFloat(selfConsumption) / 100;
    const actualRetailPrice = parseFloat(retailPrice);
    const actualSegRate = parseFloat(segRate);
    const actualLosses = parseFloat(lossProfile) / 100;
    const actualSystemCost = parseFloat(systemCost) || 0;
    const voltage = parseFloat(systemPhase);

    if (!dcArrayPower || !inverterAcPower || !actualPsh || !voltage) {
      toast({ title: "Missing inputs", description: "Please fill in all required fields", variant: "destructive" });
      return;
    }

    const dcAcRatio = dcArrayPower / inverterAcPower;
    const inverterEfficiency = 0.96;
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

    const acCurrent = systemPhase === '230' ?
      inverterAcPower * 1000 / (voltage * 0.99) :
      inverterAcPower * 1000 / (Math.sqrt(3) * voltage * 0.99);
    const recommendedMcb = Math.ceil(acCurrent / 5) * 5;
    const isG98 = acCurrent <= 16;
    const requiresG99 = !isG98;

    setResult({
      dcArrayPower,
      inverterAcPower,
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
      requiresG99
    });
  };

  const reset = () => {
    setArraySize('');
    setInverterPower('');
    setSystemPhase('');
    setExportLimit('none');
    setPsh('3.5');
    setSelfConsumption('30');
    setRetailPrice('0.25');
    setSegRate('0.05');
    setLossProfile('18');
    setSystemCost('');
    setResult(null);
  };

  const hasValidInputs = () => arraySize && systemPhase && inverterPower;

  return (
    <div className="space-y-4">
      <CalculatorCard
        category="renewable"
        title="Grid-Tie Inverter Calculator"
        description="G98/G99 compliant system design with financial analysis"
        badge="G98/G99"
        headerAction={
          <Button variant="outline" size="sm" onClick={() => setShowAdvanced(!showAdvanced)} className="gap-2 h-8 text-xs border-white/20 hover:bg-white/10">
            <Settings className="h-3 w-3" />
            {showAdvanced ? 'Basic' : 'Advanced'}
          </Button>
        }
      >
        <CalculatorInputGrid columns={2}>
          <CalculatorInput
            label="DC Array Size"
            unit="kW"
            type="text"
            inputMode="decimal"
            value={arraySize}
            onChange={setArraySize}
            placeholder="e.g., 6"
          />
          <CalculatorSelect
            label="Grid Connection"
            value={systemPhase}
            onChange={setSystemPhase}
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
            options={getInverterOptions().map(i => ({ value: i.value, label: i.label }))}
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

        {showAdvanced && (
          <div className="space-y-4 pt-4 border-t border-white/10">
            <CalculatorInputGrid columns={2}>
              <CalculatorInput label="Retail Price" unit="£/kWh" type="text" inputMode="decimal" value={retailPrice} onChange={setRetailPrice} placeholder="0.25" />
              <CalculatorInput label="SEG Rate" unit="£/kWh" type="text" inputMode="decimal" value={segRate} onChange={setSegRate} placeholder="0.05" />
              <CalculatorInput label="System Losses" unit="%" type="text" inputMode="numeric" value={lossProfile} onChange={setLossProfile} placeholder="18" />
              <CalculatorInput label="System Cost" unit="£" type="text" inputMode="numeric" value={systemCost} onChange={setSystemCost} placeholder="8000" />
            </CalculatorInputGrid>
          </div>
        )}

        <CalculatorActions
          category="renewable"
          onCalculate={calculateGridTie}
          onReset={reset}
          isDisabled={!hasValidInputs()}
          calculateLabel="Analyse System"
        />
      </CalculatorCard>

      {result && (
        <div className="space-y-4 animate-fade-in">
          <CalculatorResult category="renewable">
            <div className="text-center pb-4 border-b border-white/10">
              <p className="text-sm text-white/60 mb-1">Annual Value</p>
              <div className="text-4xl font-bold bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})` }}>
                £{result.totalAnnualValue.toFixed(0)}
              </div>
              <div className="flex justify-center gap-2 mt-2">
                <Badge variant="outline" className="text-green-400 border-green-400/50">
                  {result.yearlyGeneration.toFixed(0)} kWh/yr
                </Badge>
                {result.paybackYears > 0 && (
                  <Badge variant="outline" className="text-green-400 border-green-400/50">
                    {result.paybackYears.toFixed(1)}yr payback
                  </Badge>
                )}
              </div>
            </div>

            <ResultsGrid columns={2}>
              <ResultValue label="DC:AC Ratio" value={result.dcAcRatio.toFixed(2)} category="renewable" size="sm" />
              <ResultValue label="Daily Gen" value={result.dailyGeneration.toFixed(1)} unit="kWh" category="renewable" size="sm" />
              <ResultValue label="Bill Savings" value={`£${result.billSavings.toFixed(0)}`} category="renewable" size="sm" />
              <ResultValue label="Export Income" value={`£${result.exportIncome.toFixed(0)}`} category="renewable" size="sm" />
            </ResultsGrid>

            <div className="pt-4 mt-4 border-t border-white/10">
              <h4 className="text-sm font-medium text-white/80 mb-3">AC System & Protection</h4>
              <ResultsGrid columns={2}>
                <ResultValue label="AC Current" value={result.acCurrent.toFixed(1)} unit="A" category="renewable" size="sm" />
                <ResultValue label="MCB Rating" value={`${result.recommendedMcb}`} unit="A" category="renewable" size="sm" />
              </ResultsGrid>
              <div className="flex gap-2 mt-3">
                <Badge variant={result.isG98 ? "default" : "secondary"} className={result.isG98 ? "bg-green-500/20 text-green-400" : "bg-orange-500/20 text-orange-400"}>
                  {result.isG98 ? 'G98' : 'G99 Required'}
                </Badge>
              </div>
            </div>

            {result.clippingLoss > 0 && (
              <div className="mt-3 p-3 rounded-xl bg-orange-500/10 border border-orange-500/30">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-400 mt-0.5 shrink-0" />
                  <p className="text-sm text-orange-200">
                    Clipping loss: {result.clippingLoss.toFixed(0)} kWh/yr ({(result.clippingLoss / result.yearlyGeneration * 100).toFixed(1)}%)
                  </p>
                </div>
              </div>
            )}
          </CalculatorResult>

          <Collapsible open={showGuidance} onOpenChange={setShowGuidance}>
            <div className="calculator-card overflow-hidden" style={{ borderColor: '#60a5fa15' }}>
              <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                <div className="flex items-center gap-3">
                  <Info className="h-4 w-4 text-blue-400" />
                  <span className="text-sm sm:text-base font-medium text-blue-300">What This Means</span>
                </div>
                <ChevronDown className={cn("h-4 w-4 text-white/70 transition-transform duration-200", showGuidance && "rotate-180")} />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 pt-0 space-y-2">
                <p className="text-sm text-blue-200/80">
                  <strong className="text-blue-300">DC:AC Ratio ({result.dcAcRatio.toFixed(2)}):</strong> {result.dcAcRatio >= 1.1 && result.dcAcRatio <= 1.3 ? 'Optimal balance' : result.dcAcRatio > 1.3 ? 'High - expect clipping' : 'Conservative'}
                </p>
                <p className="text-sm text-blue-200/80">
                  <strong className="text-blue-300">Self-consumption</strong> saves £{result.billSavings.toFixed(0)}/yr vs exported energy earns £{result.exportIncome.toFixed(0)}/yr at SEG rates.
                </p>
              </CollapsibleContent>
            </div>
          </Collapsible>

          <Collapsible open={showRegs} onOpenChange={setShowRegs}>
            <div className="calculator-card overflow-hidden" style={{ borderColor: '#fbbf2415' }}>
              <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-4 w-4 text-amber-400" />
                  <span className="text-sm sm:text-base font-medium text-amber-300">Regulatory Requirements</span>
                </div>
                <ChevronDown className={cn("h-4 w-4 text-white/70 transition-transform duration-200", showRegs && "rotate-180")} />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 pt-0">
                <div className="space-y-2 text-sm text-amber-200/80">
                  <p><strong className="text-amber-300">{result.isG98 ? 'G98' : 'G99'}:</strong> {result.isG98 ? 'Simplified notification (≤16A/phase)' : 'DNO application required (>16A/phase)'}</p>
                  <p><strong className="text-amber-300">BS 7671 Section 712:</strong> RCD Type A minimum, isolation switches required</p>
                  <p><strong className="text-amber-300">MCS Certification:</strong> Required for SEG payments</p>
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
            <strong>DC:AC Ratio</strong> 1.1-1.3 is optimal. Higher ratios increase clipping but improve low-light performance.
          </p>
        </div>
      </div>
    </div>
  );
}

export default GridTieInverterCalculator;
