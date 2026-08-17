import { useMemo, useState } from 'react';
import {
  Clock,
  Calculator,
  RotateCcw,
  Save,
  Info,
  ChevronDown,
  BookOpen,
  CheckCircle,
  PoundSterling,
  Settings,
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import {
  CalculatorCard,
  CalculatorInput,
  CalculatorSelect,
  CalculatorResult,
  ResultValue,
  ResultHeadline,
  ResultsGrid,
  CALCULATOR_CONFIG,
} from '@/components/calculators/shared';
import { useToast } from '@/hooks/use-toast';
import { useHaptic } from '@/hooks/useHaptic';
import { storageGetJSONSync, storageSetJSONSync } from '@/utils/storage';
import { Helmet } from 'react-helmet';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import {
  UK_EMPLOYER_COSTS,
  employerNIOn,
  employerPensionOn,
  priceFromMargin,
} from '@/data/ukRates';
import { HubMasthead } from '@/components/hub/HubPrimitives';

interface RateInputs {
  annualSalary: string;
  workingDaysPerYear: string;
  hoursPerDay: string;
  paidLeaveDays: string;
  bankHolidays: string;
  sickDays: string;
  trainingDays: string;
  employerNI: string;
  employerPension: string;
  profFeesAnnual: string;
  calibrationAnnual: string;
  softwareAnnual: string;
  vehicleAnnual: string;
  overheadPercentage: string;
  profitMargin: string;
  utilizationRate: string;
  callOutMinHours: string;
  afterHoursMultiplier: string;
  weekendMultiplier: string;
}

const HourlyRateCalculator = () => {
  const config = CALCULATOR_CONFIG['business'];
  const { toast } = useToast();
  const haptic = useHaptic();

  const [inputs, setInputs] = useState<RateInputs>({
    annualSalary: '35000',
    // GROSS weekdays in a year (52 × 5 = 260). It used to default to 230, which
    // is already a figure NET of holiday, so the leave/bank-holiday/sick/training
    // days below were being deducted a second time — 41 days of double-counting.
    workingDaysPerYear: '260',
    // 7.5, not 8 — the JIB standard week is 37.5 hours (National Working
    // Rule 3.1). Assuming 8 invents 130 unpaid hours a year and understates cost.
    hoursPerDay: '7.5',
    paidLeaveDays: '25',
    bankHolidays: '8',
    sickDays: '5',
    trainingDays: '3',
    // Employer NI is 15% from 6 April 2025, not 13.8%.
    employerNI: '15',
    employerPension: '3',
    profFeesAnnual: '1000',
    calibrationAnnual: '300',
    softwareAnnual: '450',
    vehicleAnnual: '4000',
    overheadPercentage: '25',
    profitMargin: '25',
    utilizationRate: '75',
    callOutMinHours: '2',
    afterHoursMultiplier: '1.5',
    weekendMultiplier: '2.0',
  });
  // Results are LIVE. This was `useState(false)`, so a calculator with every
  // input already populated refused to answer until you pressed a button,
  // showing a dead "Ready to Calculate" panel in the meantime. Every value
  // needed is in state on first render, so there is nothing to wait for.
  // The `isValid` guards downstream still hold results back when the inputs
  // genuinely do not make sense.

  const [calculated, setCalculated] = useState(true);
  const [vatRegistered, setVatRegistered] = useState(false);
  const [rounding, setRounding] = useState<string>('nearest1');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showPremiums, setShowPremiums] = useState(false);
  const [showGuidance, setShowGuidance] = useState(false);
  const [showReference, setShowReference] = useState(false);

  const updateInput = (field: keyof RateInputs, value: string) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  const calculateRate = () => {
    haptic.light();
    setCalculated(true);
    toast({
      title: 'Rate Calculated',
      description: 'Your hourly rate analysis is complete.',
      variant: 'success',
    });
  };

  const STORAGE_KEY = 'hourly_rate_scenarios';
  const saveScenario = () => {
    const payload = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      inputs,
      results: {
        totalWorkingHours,
        billableHours,
        baseCostPerHour,
        overheadCostPerHour,
        totalCostPerHour,
        minimumRate,
        dayRate,
      },
    };
    const existing = storageGetJSONSync<any[]>(STORAGE_KEY, []);
    storageSetJSONSync(STORAGE_KEY, [payload, ...existing].slice(0, 20));
    toast({
      title: 'Scenario saved',
      description: 'Saved locally on this device.',
      variant: 'success',
    });
  };

  const reset = () => {
    setInputs({
      annualSalary: '35000',
      // GROSS weekdays in a year (52 × 5 = 260). It used to default to 230, which
    // is already a figure NET of holiday, so the leave/bank-holiday/sick/training
    // days below were being deducted a second time — 41 days of double-counting.
    workingDaysPerYear: '260',
      // 7.5, not 8 — the JIB standard week is 37.5 hours (National Working
    // Rule 3.1). Assuming 8 invents 130 unpaid hours a year and understates cost.
    hoursPerDay: '7.5',
      paidLeaveDays: '25',
      bankHolidays: '8',
      sickDays: '5',
      trainingDays: '3',
      // Employer NI is 15% from 6 April 2025, not 13.8%.
    employerNI: '15',
      employerPension: '3',
      profFeesAnnual: '1000',
      calibrationAnnual: '300',
      softwareAnnual: '450',
      vehicleAnnual: '4000',
      overheadPercentage: '25',
      profitMargin: '25',
      utilizationRate: '75',
      callOutMinHours: '2',
      afterHoursMultiplier: '1.5',
      weekendMultiplier: '2.0',
    });
  };

  // Parse inputs
  const annualSalary = parseFloat(inputs.annualSalary) || 0;
  const workingDaysPerYear = parseFloat(inputs.workingDaysPerYear) || 0;
  const hoursPerDay = parseFloat(inputs.hoursPerDay) || 0;
  const paidLeaveDays = parseFloat(inputs.paidLeaveDays) || 0;
  const bankHolidays = parseFloat(inputs.bankHolidays) || 0;
  const sickDays = parseFloat(inputs.sickDays) || 0;
  const trainingDays = parseFloat(inputs.trainingDays) || 0;
  const employerNI = parseFloat(inputs.employerNI) || 0;
  const employerPension = parseFloat(inputs.employerPension) || 0;
  const profFeesAnnual = parseFloat(inputs.profFeesAnnual) || 0;
  const calibrationAnnual = parseFloat(inputs.calibrationAnnual) || 0;
  const softwareAnnual = parseFloat(inputs.softwareAnnual) || 0;
  const vehicleAnnual = parseFloat(inputs.vehicleAnnual) || 0;
  const overheadPercentage = parseFloat(inputs.overheadPercentage) || 0;
  const profitMargin = parseFloat(inputs.profitMargin) || 0;
  // ELE-1569 — utilisation is a share of your working time, so it cannot
  // exceed 100%. The field is free text with no bounds; without this, "750"
  // silently multiplies billable hours by 7.5 and under-prices the work.
  const utilizationRate = Math.min(Math.max(parseFloat(inputs.utilizationRate) || 0, 0), 100);
  const callOutMinHours = parseFloat(inputs.callOutMinHours) || 0;
  const afterHoursMultiplier = parseFloat(inputs.afterHoursMultiplier) || 0;
  const weekendMultiplier = parseFloat(inputs.weekendMultiplier) || 0;

  // Calculations
  const effectiveWorkingDays = Math.max(
    workingDaysPerYear - paidLeaveDays - bankHolidays - sickDays - trainingDays,
    0
  );
  const totalWorkingHours = effectiveWorkingDays * hoursPerDay;
  const billableHours = Math.max((totalWorkingHours * utilizationRate) / 100, 1);

  /**
   * ELE-1569 — why a rate of £27,150/hr was possible.
   *
   * `Math.max(…, 1)` above is a divide-by-zero guard, but it guards by
   * inventing a divisor rather than refusing to answer. Utilisation is a free
   * text field with no bounds, and `parseFloat('') || 0` turns a cleared box
   * into 0% — so billable hours collapse to a single hour and the whole annual
   * cost of running the business is reported as the hourly rate. The
   * arithmetic is correct throughout; the answer is meaningless.
   *
   * Rather than silently substitute a plausible-looking number, say the inputs
   * cannot produce a rate. A genuinely part-time electrician is unaffected:
   * this only triggers when there is effectively nothing to divide by.
   */
  const RATE_NEEDS_HOURS = 100; // ≈ two hours a week across a year
  const rateInputsUnusable =
    totalWorkingHours <= 0 || utilizationRate <= 0 || billableHours < RATE_NEEDS_HOURS;

  // Employer NI is charged only on pay ABOVE the £5,000 secondary threshold and
  // the 3% employer pension minimum only on QUALIFYING EARNINGS (£6,240 to
  // £50,270). This used to be `salary × (1 + (NI + pension) / 100)`, i.e. both
  // percentages applied to the whole salary, which overstates the pension bill
  // on every wage and the NI bill by 15% of the first £5,000.
  const employerNIAnnual = employerNIOn(annualSalary, employerNI / 100);
  const employerPensionAnnual = employerPensionOn(annualSalary, employerPension / 100);

  const baseCostAnnual =
    annualSalary +
    employerNIAnnual +
    employerPensionAnnual +
    profFeesAnnual +
    calibrationAnnual +
    softwareAnnual +
    vehicleAnnual;

  const baseCostPerHour = baseCostAnnual / billableHours;
  const overheadAnnual = baseCostAnnual * (overheadPercentage / 100);
  const overheadCostPerHour = overheadAnnual / billableHours;
  const totalCostPerHour = baseCostPerHour + overheadCostPerHour;
  // MARGIN, not markup: margin is a share of the SELLING price, so
  // price = cost / (1 − margin). `priceFromMargin` also clamps the margin at
  // 95% — the old `Math.max(1 − margin/100, 0.01)` guard turned any entry of
  // 100% or more into a silent ×100 multiplier rather than refusing it.
  const minimumRate = priceFromMargin(totalCostPerHour, profitMargin);
  const dayRate = minimumRate * hoursPerDay;

  const VAT_RATE = 0.2;
  const applyRounding = (v: number) => {
    switch (rounding) {
      case 'nearest1':
        return Math.round(v);
      case 'nearest5':
        return Math.round(v / 5) * 5;
      case 'nearest10':
        return Math.round(v / 10) * 10;
      default:
        return Number(v.toFixed(2));
    }
  };

  // Round the ex-VAT price, then apply VAT to that rounded figure. The inc-VAT
  // numbers used to be rounded a SECOND time, so at "nearest £5" a £70 ex-VAT
  // rate displayed as £85 inc VAT — which is £70.83 ex VAT. The two lines on the
  // same screen did not reconcile, and the invoice would not have either.
  const withVat = (exVat: number) => exVat * (1 + VAT_RATE);

  const roundedHourlyExVat = applyRounding(minimumRate);
  const roundedDayExVat = applyRounding(dayRate);
  const hourlyIncVat = vatRegistered ? withVat(roundedHourlyExVat) : null;
  const dayIncVat = vatRegistered ? withVat(roundedDayExVat) : null;

  // Premium rates
  const callOutFeeExVat = applyRounding(roundedHourlyExVat * Math.max(callOutMinHours, 0));
  const callOutFeeIncVat = vatRegistered ? withVat(callOutFeeExVat) : null;
  const afterHoursHourlyExVat = applyRounding(
    roundedHourlyExVat * Math.max(afterHoursMultiplier, 0)
  );
  const afterHoursDayExVat = applyRounding(roundedDayExVat * Math.max(afterHoursMultiplier, 0));
  const weekendHourlyExVat = applyRounding(roundedHourlyExVat * Math.max(weekendMultiplier, 0));
  const weekendDayExVat = applyRounding(roundedDayExVat * Math.max(weekendMultiplier, 0));
  const afterHoursHourlyIncVat = vatRegistered ? withVat(afterHoursHourlyExVat) : null;
  const weekendHourlyIncVat = vatRegistered ? withVat(weekendHourlyExVat) : null;

  const chartData = useMemo(
    () => [
      { name: 'Base', value: Number(baseCostPerHour.toFixed(2)) },
      { name: 'Overhead', value: Number(overheadCostPerHour.toFixed(2)) },
      { name: 'Cost/hr', value: Number(totalCostPerHour.toFixed(2)) },
      { name: 'Rate/hr', value: Number(minimumRate.toFixed(2)) },
    ],
    [baseCostPerHour, overheadCostPerHour, totalCostPerHour, minimumRate]
  );

  const isValid = annualSalary > 0 && workingDaysPerYear > 0 && hoursPerDay > 0;

  const roundingOptions = [
    { value: 'none', label: 'Exact (£0.01)' },
    { value: 'nearest1', label: 'Nearest £1' },
    { value: 'nearest5', label: 'Nearest £5' },
    { value: 'nearest10', label: 'Nearest £10' },
  ];

  return (
    <div className="bg-gradient-to-b from-background via-background to-background ">
      <Helmet>
        <title>Hourly Rate Calculator UK | Electrician Pricing</title>
        <meta
          name="description"
          content="Calculate a UK electrician hourly and day rate with costs, overheads and profit. Mobile-first and fast."
        />
        <link rel="canonical" href="/electrician/business-development/tools/hourly-rate" />
      </Helmet>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6  ">
        {/* Header */}
        <HubMasthead
          section="Business"
          title="Hourly Rate Calculator"
          backTo="/electrician/business-development/tools"
        />

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-4">
            <CalculatorCard
              category="business"
              title="Rate Calculation Inputs"
              description="Enter your business parameters to calculate optimal rates"
              badge={UK_EMPLOYER_COSTS.taxYear}
            >
              {/* Core Inputs */}
              <h3 className="mb-3 text-[13px] font-semibold tracking-tight text-white">Income & Time</h3>

              <CalculatorInput
                label="Desired Annual Salary"
                unit="£"
                type="text"
                inputMode="decimal"
                value={inputs.annualSalary}
                onChange={(val) => updateInput('annualSalary', val)}
                placeholder="e.g., 35000"
                hint="Your target personal income"
              />

              <div className="grid grid-cols-2 gap-3">
                <CalculatorInput
                  label="Working Days/Year"
                  type="text"
                  inputMode="numeric"
                  value={inputs.workingDaysPerYear}
                  onChange={(val) => updateInput('workingDaysPerYear', val)}
                  placeholder="e.g., 260"
                  hint="Weekdays in a year (260) — leave is deducted below"
                />
                <CalculatorInput
                  label="Hours/Day"
                  type="text"
                  inputMode="numeric"
                  value={inputs.hoursPerDay}
                  onChange={(val) => updateInput('hoursPerDay', val)}
                  placeholder="e.g., 7.5"
                  hint="JIB standard week is 37.5h — 7.5h/day"
                />
              </div>

              {/* Time Off */}
              <div className="grid grid-cols-2 gap-3">
                <CalculatorInput
                  label="Paid Leave Days"
                  type="text"
                  inputMode="numeric"
                  value={inputs.paidLeaveDays}
                  onChange={(val) => updateInput('paidLeaveDays', val)}
                  placeholder="e.g., 25"
                  hint="Annual holiday"
                />
                <CalculatorInput
                  label="Bank Holidays"
                  type="text"
                  inputMode="numeric"
                  value={inputs.bankHolidays}
                  onChange={(val) => updateInput('bankHolidays', val)}
                  placeholder="e.g., 8"
                  hint="UK standard ~8"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <CalculatorInput
                  label="Sick Days (allowance)"
                  type="text"
                  inputMode="numeric"
                  value={inputs.sickDays}
                  onChange={(val) => updateInput('sickDays', val)}
                  placeholder="e.g., 5"
                />
                <CalculatorInput
                  label="Training/CPD Days"
                  type="text"
                  inputMode="numeric"
                  value={inputs.trainingDays}
                  onChange={(val) => updateInput('trainingDays', val)}
                  placeholder="e.g., 3"
                />
              </div>

              {/* Advanced Costs - Collapsible */}
              <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
                <CollapsibleTrigger className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <h3 className="mb-3 text-[13px] font-semibold tracking-tight text-white">Advanced Costs</h3>
                  <ChevronDown
                    className={cn(
                      'h-4 w-4 text-white transition-transform duration-200',
                      showAdvanced && 'rotate-180'
                    )}
                  />
                </CollapsibleTrigger>

                <CollapsibleContent className="pt-4 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <CalculatorInput
                      label="Employer NI"
                      unit="%"
                      type="text"
                      inputMode="decimal"
                      value={inputs.employerNI}
                      onChange={(val) => updateInput('employerNI', val)}
                      placeholder="15"
                      hint={`${UK_EMPLOYER_COSTS.taxYear}: 15% above £${UK_EMPLOYER_COSTS.employerNISecondaryThresholdAnnual.toLocaleString('en-GB')}`}
                    />
                    <CalculatorInput
                      label="Employer Pension"
                      unit="%"
                      type="text"
                      inputMode="decimal"
                      value={inputs.employerPension}
                      onChange={(val) => updateInput('employerPension', val)}
                      placeholder="3"
                      hint="3% of qualifying earnings (£6,240–£50,270)"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <CalculatorInput
                      label="Professional Fees"
                      unit="£/yr"
                      type="text"
                      inputMode="decimal"
                      value={inputs.profFeesAnnual}
                      onChange={(val) => updateInput('profFeesAnnual', val)}
                      placeholder="1000"
                      hint="Schemes, insurance"
                    />
                    <CalculatorInput
                      label="Calibration/Tools"
                      unit="£/yr"
                      type="text"
                      inputMode="decimal"
                      value={inputs.calibrationAnnual}
                      onChange={(val) => updateInput('calibrationAnnual', val)}
                      placeholder="300"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <CalculatorInput
                      label="Software"
                      unit="£/yr"
                      type="text"
                      inputMode="decimal"
                      value={inputs.softwareAnnual}
                      onChange={(val) => updateInput('softwareAnnual', val)}
                      placeholder="450"
                    />
                    <CalculatorInput
                      label="Vehicle"
                      unit="£/yr"
                      type="text"
                      inputMode="decimal"
                      value={inputs.vehicleAnnual}
                      onChange={(val) => updateInput('vehicleAnnual', val)}
                      placeholder="4000"
                    />
                  </div>

                  <CalculatorInput
                    label="Overhead Percentage"
                    unit="%"
                    type="text"
                    inputMode="decimal"
                    value={inputs.overheadPercentage}
                    onChange={(val) => updateInput('overheadPercentage', val)}
                    placeholder="25"
                    hint="Business costs (20-30%)"
                  />
                </CollapsibleContent>
              </Collapsible>

              <div className="grid grid-cols-2 gap-3">
                <CalculatorInput
                  label="Profit Margin"
                  unit="%"
                  type="text"
                  inputMode="decimal"
                  value={inputs.profitMargin}
                  onChange={(val) => updateInput('profitMargin', val)}
                  placeholder="25"
                  hint="Target profit (20-30%)"
                />
                <CalculatorInput
                  label="Utilisation Rate"
                  unit="%"
                  type="text"
                  inputMode="decimal"
                  value={inputs.utilizationRate}
                  onChange={(val) => updateInput('utilizationRate', val)}
                  placeholder="75"
                  hint="Billable vs total (70-80%)"
                />
              </div>

              {/* Options */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-white">VAT Registered?</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setVatRegistered(true)}
                      className={cn(
                        'flex-1 h-11 rounded-xl text-sm font-medium transition-all touch-manipulation',
                        vatRegistered
                          ? 'text-black'
                          : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
                      )}
                      style={
                        vatRegistered
                          ? {
                              background: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                            }
                          : undefined
                      }
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setVatRegistered(false)}
                      className={cn(
                        'flex-1 h-11 rounded-xl text-sm font-medium transition-all touch-manipulation',
                        !vatRegistered
                          ? 'text-black'
                          : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
                      )}
                      style={
                        !vatRegistered
                          ? {
                              background: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                            }
                          : undefined
                      }
                    >
                      No
                    </button>
                  </div>
                </div>

                <CalculatorSelect
                  label="Rounding"
                  value={rounding}
                  onChange={setRounding}
                  options={roundingOptions}
                />
              </div>

              {/* Premium Rates - Collapsible */}
              <Collapsible open={showPremiums} onOpenChange={setShowPremiums}>
                <CollapsibleTrigger className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-amber-400" />
                    <span className="text-sm font-medium text-white">
                      Premium & Call-out Rates
                    </span>
                  </div>
                  <ChevronDown
                    className={cn(
                      'h-4 w-4 text-white transition-transform duration-200',
                      showPremiums && 'rotate-180'
                    )}
                  />
                </CollapsibleTrigger>

                <CollapsibleContent className="pt-4 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <CalculatorInput
                      label="Call-out min hrs"
                      type="text"
                      inputMode="decimal"
                      value={inputs.callOutMinHours}
                      onChange={(val) => updateInput('callOutMinHours', val)}
                      placeholder="2"
                      hint="Typical 1.5-2.0"
                    />
                    <CalculatorInput
                      label="After-hours ×"
                      type="text"
                      inputMode="decimal"
                      value={inputs.afterHoursMultiplier}
                      onChange={(val) => updateInput('afterHoursMultiplier', val)}
                      placeholder="1.5"
                      hint="e.g. 1.5x"
                    />
                    <CalculatorInput
                      label="Weekend ×"
                      type="text"
                      inputMode="decimal"
                      value={inputs.weekendMultiplier}
                      onChange={(val) => updateInput('weekendMultiplier', val)}
                      placeholder="2.0"
                      hint="e.g. 2.0x"
                    />
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <button
                  onClick={calculateRate}
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
                  onClick={saveScenario}
                  className="h-14 px-4 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors touch-manipulation"
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
          </div>

          {/* Results Section */}
          <div className="space-y-4">
            {calculated ? (
              <>
                <CalculatorResult category="business">
                  {rateInputsUnusable ? (
                    <ResultHeadline
                      label="Charge this per hour"
                      value="—"
                      caption={`Set your utilisation and working hours first. ${Math.round(billableHours)} billable hour${Math.round(billableHours) === 1 ? '' : 's'} a year is too few to spread your costs across, so any rate here would be an artefact of the sum rather than a price.`}
                    />
                  ) : (
                    <ResultHeadline
                      label="Charge this per hour"
                      value={`£${roundedHourlyExVat.toFixed(2)}`}
                      aside={vatRegistered ? `£${hourlyIncVat?.toFixed(2)} inc VAT` : undefined}
                      caption={`Covers your costs and pays you £${parseFloat(inputs.annualSalary || '0').toLocaleString('en-GB')} a year across ${Math.round(billableHours)} billable hours.`}
                    />
                  )}
                  <div className="hidden">
                    {vatRegistered && (
                      <p className="text-sm text-white mt-2">
                        Inc VAT:{' '}
                        <span className="font-semibold" style={{ color: config.gradientFrom }}>
                          £{hourlyIncVat?.toFixed(2)}
                        </span>
                      </p>
                    )}
                  </div>

                  <div className="py-4 border-b border-white/10 space-y-2">
                    <p className="text-sm font-medium text-white">Rate Breakdown</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between text-white">
                        <span>Base cost per hour:</span>
                        <span>£{baseCostPerHour.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-white">
                        <span>Overhead costs:</span>
                        <span>£{overheadCostPerHour.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-white">
                        <span>Total cost per hour:</span>
                        <span>£{totalCostPerHour.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span className="text-white">Profit margin:</span>
                        <span className="text-green-400">
                          £{(minimumRate - totalCostPerHour).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <ResultsGrid columns={2}>
                    <ResultValue
                      label="Day Rate (ex VAT)"
                      value={`£${roundedDayExVat.toFixed(2)}`}
                      category="business"
                      size="sm"
                    />
                    <ResultValue
                      label="Billable Hours/Year"
                      value={billableHours.toFixed(0)}
                      category="business"
                      size="sm"
                    />
                  </ResultsGrid>

                  {/* Chart */}
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-xs text-white mb-3">Cost vs Rate Breakdown</p>
                    <div className="h-40">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                          <XAxis
                            dataKey="name"
                            stroke="rgba(255,255,255,0.6)"
                            tick={{ fontSize: 12 }}
                          />
                          <YAxis
                            stroke="rgba(255,255,255,0.6)"
                            tickFormatter={(v) => `£${v}`}
                            tick={{ fontSize: 12 }}
                          />
                          <Tooltip
                            formatter={(v: number) => `£${v.toFixed(2)}`}
                            contentStyle={{
                              background: '#0b0f15',
                              border: '1px solid rgba(255,255,255,0.1)',
                            }}
                          />
                          <Bar dataKey="value" fill={config.gradientFrom} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </CalculatorResult>

                {/* Premium Rates Results */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl border border-amber-400/20 bg-amber-400/5 text-center">
                    <p className="text-xs text-white mb-1">Call-out min</p>
                    <p className="text-lg font-bold text-amber-400">
                      £{callOutFeeExVat.toFixed(0)}
                    </p>
                    {vatRegistered && (
                      <p className="text-xs text-white">inc VAT: £{callOutFeeIncVat?.toFixed(0)}</p>
                    )}
                    <p className="text-xs text-white">{callOutMinHours}h min</p>
                  </div>
                  <div className="p-3 rounded-xl border border-white/10 bg-white/5 text-center">
                    <p className="text-xs text-white mb-1">After-hours</p>
                    <p className="text-lg font-bold text-elec-yellow">
                      £{afterHoursHourlyExVat.toFixed(0)}/h
                    </p>
                    {vatRegistered && (
                      <p className="text-xs text-white">
                        inc VAT: £{afterHoursHourlyIncVat?.toFixed(0)}
                      </p>
                    )}
                  </div>
                  <div className="p-3 rounded-xl border border-white/10 bg-white/5 text-center">
                    <p className="text-xs text-white mb-1">Weekend</p>
                    <p className="text-lg font-bold text-white">
                      £{weekendHourlyExVat.toFixed(0)}/h
                    </p>
                    {vatRegistered && (
                      <p className="text-xs text-white">
                        inc VAT: £{weekendHourlyIncVat?.toFixed(0)}
                      </p>
                    )}
                  </div>
                </div>

                {/* Utilisation Notice */}
                <div className="p-3 rounded-xl border border-white/[0.10] bg-white/[0.04]">
                  <div className="flex items-start gap-2">
                    <Info className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-elec-yellow/80">
                      Utilisation set at {utilizationRate}%.{' '}
                      {utilizationRate < 65
                        ? 'This is low; consider marketing/admin balance to improve billable hours.'
                        : utilizationRate > 85
                          ? 'High utilisation may risk burnout; ensure realistic allowances for travel/admin.'
                          : 'This is within a typical 70-80% range.'}
                    </p>
                  </div>
                </div>

                {/* Success Message */}
                <div className="p-4 rounded-xl border border-green-500/30 bg-green-500/10">
                  <div className="flex items-center gap-3 text-green-300">
                    <CheckCircle className="h-5 w-5" />
                    <h4 className="font-medium">Rate Recommendations</h4>
                  </div>
                  <p className="text-sm text-green-200 mt-2">
                    Your calculated rate of £{roundedHourlyExVat.toFixed(2)}/hour (ex VAT)
                    {vatRegistered ? ` or £${hourlyIncVat?.toFixed(2)}/hour inc VAT` : ''} should
                    cover all costs and deliver your target salary. Consider market rates and adjust
                    accordingly.
                  </p>
                </div>
              </>
            ) : (
              <div className="calculator-card text-center py-16">
                <Clock className="h-16 w-16 text-elec-yellow/30 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Ready to Calculate</h3>
                <p className="text-white">Enter your details and click "Calculate"</p>
              </div>
            )}

            {/* What This Means */}
            <Collapsible open={showGuidance} onOpenChange={setShowGuidance}>
              <div className="calculator-card overflow-hidden" style={{ borderColor: '#FFC80015' }}>
                <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                  <div className="flex items-center gap-3">
                    <Info className="h-4 w-4 text-elec-yellow" />
                    <span className="text-sm sm:text-base font-medium text-elec-yellow">
                      What This Means
                    </span>
                  </div>
                  <ChevronDown
                    className={cn(
                      'h-4 w-4 text-white transition-transform duration-200',
                      showGuidance && 'rotate-180'
                    )}
                  />
                </CollapsibleTrigger>

                <CollapsibleContent className="p-4 pt-0">
                  <ul className="space-y-2 text-sm text-elec-yellow/80">
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow mt-1">•</span>
                      <strong className="text-elec-yellow">Base cost:</strong> Your salary + employer
                      costs + fixed expenses
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow mt-1">•</span>
                      <strong className="text-elec-yellow">Overhead:</strong> Business costs (premises,
                      admin, marketing)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow mt-1">•</span>
                      <strong className="text-elec-yellow">Utilisation:</strong> % of time you can
                      actually bill clients
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-elec-yellow mt-1">•</span>
                      <strong className="text-elec-yellow">Profit margin:</strong> Buffer for growth,
                      reinvestment, emergencies
                    </li>
                  </ul>
                </CollapsibleContent>
              </div>
            </Collapsible>

            {/* Quick Reference */}
            <Collapsible open={showReference} onOpenChange={setShowReference}>
              <div className="calculator-card overflow-hidden" style={{ borderColor: '#fbbf2415' }}>
                <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-4 w-4 text-amber-400" />
                    <span className="text-sm sm:text-base font-medium text-amber-300">
                      UK Rate Reference
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
                      <p className="text-amber-300 font-medium">Typical Rates</p>
                      <p className="text-amber-200/70">General: £40-55/hr</p>
                      <p className="text-amber-200/70">Specialist: £55-75/hr</p>
                      <p className="text-amber-200/70">Emergency: £80-120/hr</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-amber-300 font-medium">Day Rates</p>
                      <p className="text-amber-200/70">Standard: £320-400</p>
                      <p className="text-amber-200/70">After-hours: £480-600</p>
                      <p className="text-amber-200/70">Weekend: £640-800</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-amber-300 font-medium">Call-out Fees</p>
                      <p className="text-amber-200/70">Daytime: £80-120</p>
                      <p className="text-amber-200/70">Evening: £120-180</p>
                      <p className="text-amber-200/70">Emergency: £150-250</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-amber-300 font-medium">London Premium</p>
                      <p className="text-amber-200/70">Add 20-40%</p>
                      <p className="text-amber-200/70">to base rates</p>
                    </div>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HourlyRateCalculator;
