import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import {
  BarChart3,
  PoundSterling,
  Clock,
  TrendingUp,
  Calculator,
  RotateCcw,
  Save,
  ChevronDown,
  BookOpen,
  Info,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { SmartBackButton } from '@/components/ui/smart-back-button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { storageGetJSONSync, storageSetJSONSync } from '@/utils/storage';
import {
  CalculatorCard,
  CalculatorInput,
  CalculatorSelect,
  CalculatorResult,
  ResultValue,
  ResultsGrid,
  CALCULATOR_CONFIG,
} from '@/components/calculators/shared';
import { AIA_ANNUAL_LIMIT, calculateEquipmentRoi } from '@/utils/business-planning-maths';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';

interface ROIInputs {
  equipmentCost: string;
  installationCost: string;
  maintenancePerYear: string;
  lifespanYears: string;
  residualValue: string;
  annualSavings: string;
  utilisationRate: string;
  discountRate: string;
}

const STORAGE_KEY = 'equipment_roi_scenarios';

/**
 * Parse a numeric field without the classic `parseFloat(x) || fallback` bug:
 * `0` is falsy, so entering 0% utilisation silently became 100%, a 0% discount
 * rate became 5%, and a 0-year lifespan became 5 years.
 */
const num = (raw: string, fallback: number) => {
  const parsed = parseFloat(raw);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const EquipmentROICalculator = () => {
  const config = CALCULATOR_CONFIG['business'];
  const { toast } = useToast();

  const [calculated, setCalculated] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const [showReference, setShowReference] = useState(false);

  const [inputs, setInputs] = useState<ROIInputs>({
    equipmentCost: '7500',
    installationCost: '800',
    maintenancePerYear: '200',
    lifespanYears: '5',
    residualValue: '500',
    annualSavings: '3000',
    utilisationRate: '85',
    discountRate: '5',
  });

  const update = (key: keyof ROIInputs, val: string) => {
    setCalculated(false);
    setInputs((p) => ({ ...p, [key]: val }));
  };

  const discountOptions = [
    { value: '3', label: '3% - Low risk' },
    { value: '5', label: '5% - Standard' },
    { value: '7', label: '7% - Moderate' },
    { value: '10', label: '10% - High risk' },
  ];

  const lifespanOptions = [
    { value: '3', label: '3 years' },
    { value: '5', label: '5 years' },
    { value: '7', label: '7 years' },
    { value: '10', label: '10 years' },
  ];

  const equipmentCostNum = Math.max(0, num(inputs.equipmentCost, 0));
  const installationCostNum = Math.max(0, num(inputs.installationCost, 0));
  const maintenancePerYearNum = Math.max(0, num(inputs.maintenancePerYear, 0));
  // Lifespan drives loop counts, so it must be a whole number of at least 1.
  const lifespanYearsNum = Math.max(1, Math.round(num(inputs.lifespanYears, 5)));
  const residualValueNum = Math.max(0, num(inputs.residualValue, 0));
  const annualSavingsNum = num(inputs.annualSavings, 0);
  const utilisationRateNum = Math.max(0, num(inputs.utilisationRate, 100));
  const discountRateNum = num(inputs.discountRate, 5);

  const results = useMemo(
    () =>
      calculateEquipmentRoi({
        equipmentCost: equipmentCostNum,
        installationCost: installationCostNum,
        maintenancePerYear: maintenancePerYearNum,
        lifespanYears: lifespanYearsNum,
        residualValue: residualValueNum,
        annualSavings: annualSavingsNum,
        utilisationRate: utilisationRateNum,
        discountRate: discountRateNum,
      }),
    [
      equipmentCostNum,
      installationCostNum,
      maintenancePerYearNum,
      lifespanYearsNum,
      residualValueNum,
      annualSavingsNum,
      utilisationRateNum,
      discountRateNum,
    ]
  );

  const calculateROI = () => {
    setCalculated(true);
    toast({
      title: 'ROI Calculated',
      description: 'Your equipment investment analysis has been updated.',
      variant: 'success',
    });
  };

  const saveScenario = () => {
    const existing = storageGetJSONSync<any[]>(STORAGE_KEY, []);
    const payload = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      inputs,
      results,
    };
    storageSetJSONSync(STORAGE_KEY, [payload, ...existing].slice(0, 20));
    toast({
      title: 'Scenario saved',
      description: 'Saved locally on this device.',
      variant: 'success',
    });
  };

  const reset = () => {
    setInputs({
      equipmentCost: '7500',
      installationCost: '800',
      maintenancePerYear: '200',
      lifespanYears: '5',
      residualValue: '500',
      annualSavings: '3000',
      utilisationRate: '85',
      discountRate: '5',
    });
    setCalculated(false);
  };

  const currency = (n: number) => `£${(n || 0).toFixed(2)}`;
  const isValid = equipmentCostNum > 0;

  const getROIStatus = () => {
    if (results.npv >= 0 && results.roiPercent > 20)
      return {
        color: 'text-green-400',
        label: 'Good Investment',
        bg: 'bg-green-500/10 border-green-500/30',
      };
    if (results.npv >= 0)
      return {
        color: 'text-amber-400',
        label: 'Marginal Investment',
        bg: 'bg-amber-500/10 border-amber-500/30',
      };
    return {
      color: 'text-red-400',
      label: 'Poor Investment',
      bg: 'bg-red-500/10 border-red-500/30',
    };
  };

  const roiStatus = getROIStatus();

  return (
    <div className="bg-gradient-to-b from-background via-background to-background">
      <Helmet>
        <title>Equipment ROI Calculator UK | Electrician Tools</title>
        <meta
          name="description"
          content="Analyse ROI, NPV, IRR and payback for equipment purchases. UK electrician-focused, mobile friendly."
        />
        <link rel="canonical" href="/electrician/business-development/tools/equipment-roi" />
      </Helmet>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="p-2.5 rounded-xl border"
              style={{
                background: `linear-gradient(135deg, ${config.gradientFrom}20, ${config.gradientTo}20)`,
                borderColor: `${config.gradientFrom}30`,
              }}
            >
              <BarChart3 className="h-6 w-6 sm:h-7 sm:w-7" style={{ color: config.gradientFrom }} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Equipment ROI Calculator
              </h1>
              <p className="text-sm text-white">Analyse return on investment</p>
            </div>
          </div>
          <SmartBackButton />
        </header>

        <CalculatorCard
          category="business"
          title="Equipment ROI Calculator"
          description="Analyse return on investment for equipment purchases"
          badge="Investment"
        >
          {/* Investment Costs Section */}
          <div className="flex items-center gap-2 mb-3">
            <PoundSterling className="h-4 w-4 text-blue-400" />
            <span className="text-sm font-medium text-white">Investment Costs</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <CalculatorInput
              label="Equipment Cost"
              unit="£"
              type="text"
              inputMode="decimal"
              value={inputs.equipmentCost}
              onChange={(val) => update('equipmentCost', val)}
              placeholder="e.g., 7500"
              hint="Purchase price"
            />

            <CalculatorInput
              label="Installation Cost"
              unit="£"
              type="text"
              inputMode="decimal"
              value={inputs.installationCost}
              onChange={(val) => update('installationCost', val)}
              placeholder="e.g., 800"
              hint="Setup & commissioning"
            />

            <CalculatorInput
              label="Maintenance/Year"
              unit="£"
              type="text"
              inputMode="decimal"
              value={inputs.maintenancePerYear}
              onChange={(val) => update('maintenancePerYear', val)}
              placeholder="e.g., 200"
              hint="Annual running cost"
            />

            <CalculatorInput
              label="Residual Value"
              unit="£"
              type="text"
              inputMode="decimal"
              value={inputs.residualValue}
              onChange={(val) => update('residualValue', val)}
              placeholder="e.g., 500"
              hint="Value at end of life"
            />
          </div>

          {/* Revenue Section */}
          <div className="flex items-center gap-2 mb-3 mt-6 pt-4 border-t border-white/10">
            <TrendingUp className="h-4 w-4 text-green-400" />
            <span className="text-sm font-medium text-white">Revenue & Savings</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <CalculatorInput
              label="Annual Savings"
              unit="£"
              type="text"
              inputMode="decimal"
              value={inputs.annualSavings}
              onChange={(val) => update('annualSavings', val)}
              placeholder="e.g., 3000"
              hint="Revenue or cost savings"
            />

            <CalculatorInput
              label="Utilisation"
              unit="%"
              type="text"
              inputMode="decimal"
              value={inputs.utilisationRate}
              onChange={(val) => update('utilisationRate', val)}
              placeholder="e.g., 85"
              hint="Usage rate"
            />
          </div>

          {/* Financial Settings Section */}
          <div className="flex items-center gap-2 mb-3 mt-6 pt-4 border-t border-white/10">
            <Clock className="h-4 w-4 text-blue-400" />
            <span className="text-sm font-medium text-white">Financial Settings</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <CalculatorSelect
              label="Equipment Lifespan"
              value={inputs.lifespanYears}
              onChange={(val) => update('lifespanYears', val)}
              options={lifespanOptions}
            />

            <CalculatorSelect
              label="Discount Rate"
              value={inputs.discountRate}
              onChange={(val) => update('discountRate', val)}
              options={discountOptions}
              hint="For NPV calculation"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <button
              onClick={calculateROI}
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
              Calculate ROI
            </button>
            <button
              onClick={saveScenario}
              disabled={!calculated}
              className="h-14 px-4 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors touch-manipulation disabled:opacity-50"
            >
              <Save className="h-5 w-5" />
            </button>
            <button
              onClick={reset}
              className="h-14 px-4 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors touch-manipulation"
            >
              <RotateCcw className="h-5 w-5" />
            </button>
          </div>
        </CalculatorCard>

        {/* Results Section */}
        {calculated && isValid && (
          <div className="space-y-4 animate-fade-in">
            {/* Investment Status */}
            <div className={cn('flex items-center gap-2 p-3 rounded-xl border', roiStatus.bg)}>
              {results.npv >= 0 ? (
                <CheckCircle className={cn('h-5 w-5', roiStatus.color)} />
              ) : (
                <AlertCircle className={cn('h-5 w-5', roiStatus.color)} />
              )}
              <span className={cn('font-medium text-sm', roiStatus.color)}>
                {roiStatus.label} - {results.roiPercent.toFixed(1)}% ROI over {lifespanYearsNum}{' '}
                years
              </span>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <CalculatorResult category="business">
                <div className="text-center">
                  <p className="text-sm text-white mb-1">NPV @ {discountRateNum}%</p>
                  <div
                    className={cn('text-3xl font-bold', results.npv >= 0 ? '' : 'text-red-400')}
                    style={
                      results.npv >= 0
                        ? {
                            backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                          }
                        : undefined
                    }
                  >
                    {currency(results.npv)}
                  </div>
                  <p className="text-xs text-white mt-1">Net Present Value</p>
                </div>
              </CalculatorResult>

              <CalculatorResult category="business">
                <div className="text-center">
                  <p className="text-sm text-white mb-1">Payback Period</p>
                  <div
                    className="text-3xl font-bold"
                    style={{
                      backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {results.simplePaybackYears !== null
                      ? `${results.simplePaybackYears.toFixed(1)} yrs`
                      : 'Never'}
                  </div>
                  <p className="text-xs text-white mt-1">
                    Undiscounted, excludes residual value
                  </p>
                </div>
              </CalculatorResult>
            </div>

            {/* Detailed Results */}
            <CalculatorResult category="business">
              <ResultsGrid columns={3}>
                <ResultValue
                  label="Total CapEx"
                  value={currency(results.capex)}
                  category="business"
                  size="sm"
                />
                <ResultValue
                  label="Annual Net Benefit"
                  value={currency(results.annualNetBenefit)}
                  category="business"
                  size="sm"
                />
                <ResultValue
                  label="IRR"
                  value={results.irrPercent !== null ? `${results.irrPercent.toFixed(1)}%` : '—'}
                  category="business"
                  size="sm"
                />
                <ResultValue
                  label="ROI (Lifetime)"
                  value={`${results.roiPercent.toFixed(1)}%`}
                  category="business"
                  size="sm"
                />
                <ResultValue
                  label={`NPV @ ${Math.max(discountRateNum - 5, 0.1).toFixed(1)}%`}
                  value={currency(results.npvBest)}
                  category="business"
                  size="sm"
                />
                <ResultValue
                  label={`NPV @ ${(discountRateNum + 5).toFixed(1)}%`}
                  value={currency(results.npvWorst)}
                  category="business"
                  size="sm"
                />
              </ResultsGrid>
            </CalculatorResult>

            {/* Cash Flow Chart */}
            <Collapsible open={showChart} onOpenChange={setShowChart}>
              <div className="calculator-card overflow-hidden" style={{ borderColor: '#60a5fa15' }}>
                <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="h-4 w-4 text-blue-400" />
                    <span className="text-sm sm:text-base font-medium text-blue-300">
                      Cumulative Cash Flow Chart
                    </span>
                  </div>
                  <ChevronDown
                    className={cn(
                      'h-4 w-4 text-white transition-transform duration-200',
                      showChart && 'rotate-180'
                    )}
                  />
                </CollapsibleTrigger>

                <CollapsibleContent className="p-4 pt-0">
                  <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={results.cashflowSeries}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis
                          dataKey="year"
                          stroke="rgba(255,255,255,0.6)"
                          fontSize={10}
                          tickFormatter={(v) => `Y${v}`}
                        />
                        <YAxis
                          stroke="rgba(255,255,255,0.6)"
                          tickFormatter={(v) => `£${v / 1000}k`}
                          fontSize={10}
                        />
                        <ReferenceLine y={0} stroke="rgba(255,255,255,0.3)" strokeDasharray="3 3" />
                        <Tooltip
                          formatter={(v: number) => [currency(v), 'Cumulative']}
                          labelFormatter={(l) => `Year ${l}`}
                          contentStyle={{
                            background: '#1a1f2e',
                            border: '1px solid rgba(96, 165, 250, 0.3)',
                            borderRadius: '8px',
                            color: 'white',
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="cumulative"
                          stroke="#60a5fa"
                          strokeWidth={2}
                          dot={{ fill: '#60a5fa', strokeWidth: 0, r: 3 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-xs text-white mt-3 text-center">
                    Break-even occurs when the line crosses zero
                  </p>
                </CollapsibleContent>
              </div>
            </Collapsible>

            {/* NPV Sensitivity Note */}
            <div className="p-4 rounded-xl border border-blue-500/30 bg-blue-500/10">
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-blue-200/80">
                  <strong className="text-blue-300">NPV sensitivity:</strong> move the discount
                  rate 5 percentage points either way and NPV runs from{' '}
                  {currency(results.npvWorst)} at {(discountRateNum + 5).toFixed(1)}% up to{' '}
                  {currency(results.npvBest)} at{' '}
                  {Math.max(discountRateNum - 5, 0.1).toFixed(1)}%. A lower discount rate always
                  gives a higher NPV.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Prompt to Calculate */}
        {!calculated && (
          <div className="p-6 rounded-xl border border-white/10 bg-white/5 text-center">
            <Info className="h-10 w-10 text-blue-400 mx-auto mb-3 opacity-50" />
            <h3 className="text-white text-lg font-semibold mb-2">Ready to Analyse</h3>
            <p className="text-white text-sm">
              Enter your equipment costs and expected savings above, then click "Calculate ROI" to
              see NPV, IRR, payback period and more.
            </p>
          </div>
        )}

        {/* Quick Reference */}
        <Collapsible open={showReference} onOpenChange={setShowReference}>
          <div className="calculator-card overflow-hidden" style={{ borderColor: '#fbbf2415' }}>
            <CollapsibleTrigger className="agent-collapsible-trigger w-full">
              <div className="flex items-center gap-3">
                <BookOpen className="h-4 w-4 text-amber-400" />
                <span className="text-sm sm:text-base font-medium text-amber-300">
                  Investment Analysis Reference
                </span>
              </div>
              <ChevronDown
                className={cn(
                  'h-4 w-4 text-white transition-transform duration-200',
                  showReference && 'rotate-180'
                )}
              />
            </CollapsibleTrigger>

            <CollapsibleContent className="p-4 pt-0">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="space-y-1">
                  <p className="text-amber-300 font-medium">NPV (Net Present Value)</p>
                  <p className="text-amber-200/70">{'>'} £0 = worthwhile</p>
                  <p className="text-amber-200/70">Accounts for time value</p>
                  <p className="text-amber-200/70">Higher = better return</p>
                </div>
                <div className="space-y-1">
                  <p className="text-amber-300 font-medium">IRR (Internal Rate of Return)</p>
                  <p className="text-amber-200/70">{'>'} discount rate = good</p>
                  <p className="text-amber-200/70">Compare to bank rates</p>
                  <p className="text-amber-200/70">15-25% typical target</p>
                </div>
                <div className="space-y-1">
                  <p className="text-amber-300 font-medium">Payback Period</p>
                  <p className="text-amber-200/70">{'<'} 3 years = excellent</p>
                  <p className="text-amber-200/70">3-5 years = acceptable</p>
                  <p className="text-amber-200/70">{'>'} 5 years = risky</p>
                </div>
                <div className="space-y-1">
                  <p className="text-amber-300 font-medium">Discount Rates</p>
                  <p className="text-amber-200/70">3-5% low risk</p>
                  <p className="text-amber-200/70">7-10% moderate risk</p>
                  <p className="text-amber-200/70">10%+ high risk</p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-amber-500/20 space-y-2">
                <p className="text-xs text-amber-200/70">
                  <Info className="h-3 w-3 inline mr-1" />
                  <strong className="text-amber-300">What this model does not include.</strong> Every
                  figure here is <strong>pre-tax</strong> and assumes you pay cash up front.
                </p>
                <p className="text-xs text-amber-200/70">
                  <strong className="text-amber-300">Capital allowances:</strong> the Annual
                  Investment Allowance lets you deduct the full cost of qualifying plant and
                  machinery in the year of purchase, up to £
                  {AIA_ANNUAL_LIMIT.toLocaleString('en-GB')} a year. For a basic-rate sole trader
                  that is worth roughly 26% of the cost (20% income tax plus 6% Class 4 NI) in year
                  one, which shortens the real payback. Cars do not qualify.
                </p>
                <p className="text-xs text-amber-200/70">
                  <strong className="text-amber-300">Financing:</strong> if you fund the purchase on
                  finance or HP, the interest is a real cost this calculator does not deduct. Add
                  the annual interest to the maintenance figure to approximate it, or use a discount
                  rate at least equal to your borrowing rate.
                </p>
                <p className="text-xs text-amber-200/70">
                  <strong className="text-amber-300">Savings are taxable:</strong> the annual benefit
                  is modelled gross. Consult an accountant before committing to a purchase on these
                  numbers.
                </p>
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>
      </main>
    </div>
  );
};

export default EquipmentROICalculator;
