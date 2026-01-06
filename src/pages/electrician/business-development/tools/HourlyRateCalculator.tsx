import { useMemo, useState } from "react";
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
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import {
  CalculatorCard,
  CalculatorInput,
  CalculatorSelect,
  CalculatorResult,
  ResultValue,
  ResultsGrid,
  CALCULATOR_CONFIG,
} from "@/components/calculators/shared";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet";
import { SmartBackButton } from "@/components/ui/smart-back-button";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

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
  const config = CALCULATOR_CONFIG["business"];
  const { toast } = useToast();

  const [inputs, setInputs] = useState<RateInputs>({
    annualSalary: "35000",
    workingDaysPerYear: "230",
    hoursPerDay: "8",
    paidLeaveDays: "25",
    bankHolidays: "8",
    sickDays: "5",
    trainingDays: "3",
    employerNI: "13.8",
    employerPension: "3",
    profFeesAnnual: "1000",
    calibrationAnnual: "300",
    softwareAnnual: "450",
    vehicleAnnual: "4000",
    overheadPercentage: "25",
    profitMargin: "25",
    utilizationRate: "75",
    callOutMinHours: "2",
    afterHoursMultiplier: "1.5",
    weekendMultiplier: "2.0",
  });

  const [calculated, setCalculated] = useState(false);
  const [vatRegistered, setVatRegistered] = useState(false);
  const [rounding, setRounding] = useState<string>("nearest1");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showPremiums, setShowPremiums] = useState(false);
  const [showGuidance, setShowGuidance] = useState(false);
  const [showReference, setShowReference] = useState(false);

  const updateInput = (field: keyof RateInputs, value: string) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
    setCalculated(false);
  };

  const calculateRate = () => {
    setCalculated(true);
    toast({
      title: "Rate Calculated",
      description: "Your hourly rate analysis is complete.",
      variant: "success",
    });
  };

  const STORAGE_KEY = "hourly_rate_scenarios";
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
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    localStorage.setItem(STORAGE_KEY, JSON.stringify([payload, ...existing].slice(0, 20)));
    toast({ title: "Scenario saved", description: "Saved locally on this device.", variant: "success" });
  };

  const reset = () => {
    setInputs({
      annualSalary: "35000",
      workingDaysPerYear: "230",
      hoursPerDay: "8",
      paidLeaveDays: "25",
      bankHolidays: "8",
      sickDays: "5",
      trainingDays: "3",
      employerNI: "13.8",
      employerPension: "3",
      profFeesAnnual: "1000",
      calibrationAnnual: "300",
      softwareAnnual: "450",
      vehicleAnnual: "4000",
      overheadPercentage: "25",
      profitMargin: "25",
      utilizationRate: "75",
      callOutMinHours: "2",
      afterHoursMultiplier: "1.5",
      weekendMultiplier: "2.0",
    });
    setCalculated(false);
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
  const utilizationRate = parseFloat(inputs.utilizationRate) || 0;
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

  const baseCostAnnual =
    annualSalary * (1 + (employerNI + employerPension) / 100) +
    profFeesAnnual +
    calibrationAnnual +
    softwareAnnual +
    vehicleAnnual;

  const baseCostPerHour = baseCostAnnual / billableHours;
  const overheadAnnual = baseCostAnnual * (overheadPercentage / 100);
  const overheadCostPerHour = overheadAnnual / billableHours;
  const totalCostPerHour = baseCostPerHour + overheadCostPerHour;
  const minimumRate = totalCostPerHour / Math.max(1 - profitMargin / 100, 0.01);
  const dayRate = minimumRate * hoursPerDay;

  const VAT_RATE = 0.2;
  const applyRounding = (v: number) => {
    switch (rounding) {
      case "nearest1":
        return Math.round(v);
      case "nearest5":
        return Math.round(v / 5) * 5;
      case "nearest10":
        return Math.round(v / 10) * 10;
      default:
        return Number(v.toFixed(2));
    }
  };

  const roundedHourlyExVat = applyRounding(minimumRate);
  const roundedDayExVat = applyRounding(dayRate);
  const hourlyIncVat = vatRegistered ? applyRounding(roundedHourlyExVat * (1 + VAT_RATE)) : null;
  const dayIncVat = vatRegistered ? applyRounding(roundedDayExVat * (1 + VAT_RATE)) : null;

  // Premium rates
  const callOutFeeExVat = applyRounding(roundedHourlyExVat * Math.max(callOutMinHours, 0));
  const callOutFeeIncVat = vatRegistered ? applyRounding(callOutFeeExVat * (1 + VAT_RATE)) : null;
  const afterHoursHourlyExVat = applyRounding(roundedHourlyExVat * Math.max(afterHoursMultiplier, 0));
  const afterHoursDayExVat = applyRounding(roundedDayExVat * Math.max(afterHoursMultiplier, 0));
  const weekendHourlyExVat = applyRounding(roundedHourlyExVat * Math.max(weekendMultiplier, 0));
  const weekendDayExVat = applyRounding(roundedDayExVat * Math.max(weekendMultiplier, 0));
  const afterHoursHourlyIncVat = vatRegistered ? applyRounding(afterHoursHourlyExVat * (1 + VAT_RATE)) : null;
  const weekendHourlyIncVat = vatRegistered ? applyRounding(weekendHourlyExVat * (1 + VAT_RATE)) : null;

  const chartData = useMemo(
    () => [
      { name: "Base", value: Number(baseCostPerHour.toFixed(2)) },
      { name: "Overhead", value: Number(overheadCostPerHour.toFixed(2)) },
      { name: "Cost/hr", value: Number(totalCostPerHour.toFixed(2)) },
      { name: "Rate/hr", value: Number(minimumRate.toFixed(2)) },
    ],
    [baseCostPerHour, overheadCostPerHour, totalCostPerHour, minimumRate]
  );

  const isValid = annualSalary > 0 && workingDaysPerYear > 0 && hoursPerDay > 0;

  const roundingOptions = [
    { value: "none", label: "Exact (£0.01)" },
    { value: "nearest1", label: "Nearest £1" },
    { value: "nearest5", label: "Nearest £5" },
    { value: "nearest10", label: "Nearest £10" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-background">
      <Helmet>
        <title>Hourly Rate Calculator UK | Electrician Pricing</title>
        <meta
          name="description"
          content="Calculate a UK electrician hourly and day rate with costs, overheads and profit. Mobile-first and fast."
        />
        <link rel="canonical" href="/electrician/business-development/tools/hourly-rate" />
      </Helmet>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 pb-safe">
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="p-2.5 rounded-xl border"
              style={{
                background: `linear-gradient(135deg, ${config.gradientFrom}20, ${config.gradientTo}20)`,
                borderColor: `${config.gradientFrom}30`,
              }}
            >
              <Clock className="h-6 w-6 sm:h-7 sm:w-7" style={{ color: config.gradientFrom }} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Hourly Rate Calculator
              </h1>
              <p className="text-sm text-white/60">Calculate your optimal charge-out rate</p>
            </div>
          </div>
          <SmartBackButton />
        </header>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-4">
            <CalculatorCard
              category="business"
              title="Rate Calculation Inputs"
              description="Enter your business parameters to calculate optimal rates"
              badge="2025"
            >
              {/* Core Inputs */}
              <div className="flex items-center gap-2 mb-3">
                <PoundSterling className="h-4 w-4 text-blue-400" />
                <span className="text-sm font-medium text-white/80">Income & Time</span>
              </div>

              <CalculatorInput
                label="Desired Annual Salary"
                unit="£"
                type="text"
                inputMode="decimal"
                value={inputs.annualSalary}
                onChange={(val) => updateInput("annualSalary", val)}
                placeholder="e.g., 35000"
                hint="Your target personal income"
              />

              <div className="grid grid-cols-2 gap-3">
                <CalculatorInput
                  label="Working Days/Year"
                  type="text"
                  inputMode="numeric"
                  value={inputs.workingDaysPerYear}
                  onChange={(val) => updateInput("workingDaysPerYear", val)}
                  placeholder="e.g., 230"
                  hint="Typically 230-250 days"
                />
                <CalculatorInput
                  label="Hours/Day"
                  type="text"
                  inputMode="numeric"
                  value={inputs.hoursPerDay}
                  onChange={(val) => updateInput("hoursPerDay", val)}
                  placeholder="e.g., 8"
                  hint="Standard working hours"
                />
              </div>

              {/* Time Off */}
              <div className="grid grid-cols-2 gap-3">
                <CalculatorInput
                  label="Paid Leave Days"
                  type="text"
                  inputMode="numeric"
                  value={inputs.paidLeaveDays}
                  onChange={(val) => updateInput("paidLeaveDays", val)}
                  placeholder="e.g., 25"
                  hint="Annual holiday"
                />
                <CalculatorInput
                  label="Bank Holidays"
                  type="text"
                  inputMode="numeric"
                  value={inputs.bankHolidays}
                  onChange={(val) => updateInput("bankHolidays", val)}
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
                  onChange={(val) => updateInput("sickDays", val)}
                  placeholder="e.g., 5"
                />
                <CalculatorInput
                  label="Training/CPD Days"
                  type="text"
                  inputMode="numeric"
                  value={inputs.trainingDays}
                  onChange={(val) => updateInput("trainingDays", val)}
                  placeholder="e.g., 3"
                />
              </div>

              {/* Advanced Costs - Collapsible */}
              <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
                <CollapsibleTrigger className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-2">
                    <Settings className="h-4 w-4 text-blue-400" />
                    <span className="text-sm font-medium text-white/80">Advanced Costs</span>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-white/40 transition-transform duration-200",
                      showAdvanced && "rotate-180"
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
                      onChange={(val) => updateInput("employerNI", val)}
                      placeholder="13.8"
                      hint="Typical 13.8%"
                    />
                    <CalculatorInput
                      label="Employer Pension"
                      unit="%"
                      type="text"
                      inputMode="decimal"
                      value={inputs.employerPension}
                      onChange={(val) => updateInput("employerPension", val)}
                      placeholder="3"
                      hint="Typical 3%"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <CalculatorInput
                      label="Professional Fees"
                      unit="£/yr"
                      type="text"
                      inputMode="decimal"
                      value={inputs.profFeesAnnual}
                      onChange={(val) => updateInput("profFeesAnnual", val)}
                      placeholder="1000"
                      hint="Schemes, insurance"
                    />
                    <CalculatorInput
                      label="Calibration/Tools"
                      unit="£/yr"
                      type="text"
                      inputMode="decimal"
                      value={inputs.calibrationAnnual}
                      onChange={(val) => updateInput("calibrationAnnual", val)}
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
                      onChange={(val) => updateInput("softwareAnnual", val)}
                      placeholder="450"
                    />
                    <CalculatorInput
                      label="Vehicle"
                      unit="£/yr"
                      type="text"
                      inputMode="decimal"
                      value={inputs.vehicleAnnual}
                      onChange={(val) => updateInput("vehicleAnnual", val)}
                      placeholder="4000"
                    />
                  </div>

                  <CalculatorInput
                    label="Overhead Percentage"
                    unit="%"
                    type="text"
                    inputMode="decimal"
                    value={inputs.overheadPercentage}
                    onChange={(val) => updateInput("overheadPercentage", val)}
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
                  onChange={(val) => updateInput("profitMargin", val)}
                  placeholder="25"
                  hint="Target profit (20-30%)"
                />
                <CalculatorInput
                  label="Utilization Rate"
                  unit="%"
                  type="text"
                  inputMode="decimal"
                  value={inputs.utilizationRate}
                  onChange={(val) => updateInput("utilizationRate", val)}
                  placeholder="75"
                  hint="Billable vs total (70-80%)"
                />
              </div>

              {/* Options */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-white/80">VAT Registered?</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setVatRegistered(true)}
                      className={cn(
                        "flex-1 h-11 rounded-xl text-sm font-medium transition-all touch-manipulation",
                        vatRegistered
                          ? "text-black"
                          : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10"
                      )}
                      style={
                        vatRegistered
                          ? { background: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})` }
                          : undefined
                      }
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setVatRegistered(false)}
                      className={cn(
                        "flex-1 h-11 rounded-xl text-sm font-medium transition-all touch-manipulation",
                        !vatRegistered
                          ? "text-black"
                          : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10"
                      )}
                      style={
                        !vatRegistered
                          ? { background: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})` }
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
                    <span className="text-sm font-medium text-white/80">Premium & Call-out Rates</span>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-white/40 transition-transform duration-200",
                      showPremiums && "rotate-180"
                    )}
                  />
                </CollapsibleTrigger>

                <CollapsibleContent className="pt-4 space-y-3">
                  <div className="grid grid-cols-3 gap-3">
                    <CalculatorInput
                      label="Call-out min hrs"
                      type="text"
                      inputMode="decimal"
                      value={inputs.callOutMinHours}
                      onChange={(val) => updateInput("callOutMinHours", val)}
                      placeholder="2"
                      hint="Typical 1.5-2.0"
                    />
                    <CalculatorInput
                      label="After-hours ×"
                      type="text"
                      inputMode="decimal"
                      value={inputs.afterHoursMultiplier}
                      onChange={(val) => updateInput("afterHoursMultiplier", val)}
                      placeholder="1.5"
                      hint="e.g. 1.5x"
                    />
                    <CalculatorInput
                      label="Weekend ×"
                      type="text"
                      inputMode="decimal"
                      value={inputs.weekendMultiplier}
                      onChange={(val) => updateInput("weekendMultiplier", val)}
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
                    "flex-1 h-14 rounded-xl font-semibold text-base flex items-center justify-center gap-2 transition-all touch-manipulation",
                    isValid ? "text-black" : "bg-white/10 text-white/30 cursor-not-allowed"
                  )}
                  style={
                    isValid
                      ? { background: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})` }
                      : undefined
                  }
                >
                  <Calculator className="h-5 w-5" />
                  Calculate
                </button>
                <button
                  onClick={saveScenario}
                  className="h-14 px-4 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 transition-colors touch-manipulation"
                >
                  <Save className="h-5 w-5" />
                </button>
                <button
                  onClick={reset}
                  className="h-14 px-4 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 transition-colors touch-manipulation"
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
                  <div className="text-center pb-4 border-b border-white/10">
                    <p className="text-sm text-white/60 mb-1">Recommended Hourly Rate (ex VAT)</p>
                    <div
                      className="text-4xl font-bold bg-clip-text text-transparent"
                      style={{
                        backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                      }}
                    >
                      £{roundedHourlyExVat.toFixed(2)}
                    </div>
                    {vatRegistered && (
                      <p className="text-sm text-white/50 mt-2">
                        Inc VAT:{" "}
                        <span
                          className="font-semibold"
                          style={{ color: config.gradientFrom }}
                        >
                          £{hourlyIncVat?.toFixed(2)}
                        </span>
                      </p>
                    )}
                  </div>

                  <div className="py-4 border-b border-white/10 space-y-2">
                    <p className="text-sm font-medium text-white/70">Rate Breakdown</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between text-white/80">
                        <span>Base cost per hour:</span>
                        <span>£{baseCostPerHour.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-white/80">
                        <span>Overhead costs:</span>
                        <span>£{overheadCostPerHour.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-white/80">
                        <span>Total cost per hour:</span>
                        <span>£{totalCostPerHour.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span className="text-white">Profit margin:</span>
                        <span className="text-green-400">£{(minimumRate - totalCostPerHour).toFixed(2)}</span>
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
                    <p className="text-xs text-white/50 mb-3">Cost vs Rate Breakdown</p>
                    <div className="h-40">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                          <XAxis dataKey="name" stroke="rgba(255,255,255,0.6)" tick={{ fontSize: 12 }} />
                          <YAxis stroke="rgba(255,255,255,0.6)" tickFormatter={(v) => `£${v}`} tick={{ fontSize: 12 }} />
                          <Tooltip
                            formatter={(v: number) => `£${v.toFixed(2)}`}
                            contentStyle={{ background: "#0b0f15", border: "1px solid rgba(255,255,255,0.1)" }}
                          />
                          <Bar dataKey="value" fill={config.gradientFrom} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </CalculatorResult>

                {/* Premium Rates Results */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl border border-amber-400/20 bg-amber-400/5 text-center">
                    <p className="text-xs text-white/50 mb-1">Call-out min</p>
                    <p className="text-lg font-bold text-amber-400">£{callOutFeeExVat.toFixed(0)}</p>
                    {vatRegistered && (
                      <p className="text-xs text-white/40">inc VAT: £{callOutFeeIncVat?.toFixed(0)}</p>
                    )}
                    <p className="text-xs text-white/40">{callOutMinHours}h min</p>
                  </div>
                  <div className="p-3 rounded-xl border border-white/10 bg-white/5 text-center">
                    <p className="text-xs text-white/50 mb-1">After-hours</p>
                    <p className="text-lg font-bold text-blue-400">£{afterHoursHourlyExVat.toFixed(0)}/h</p>
                    {vatRegistered && (
                      <p className="text-xs text-white/40">inc VAT: £{afterHoursHourlyIncVat?.toFixed(0)}</p>
                    )}
                  </div>
                  <div className="p-3 rounded-xl border border-white/10 bg-white/5 text-center">
                    <p className="text-xs text-white/50 mb-1">Weekend</p>
                    <p className="text-lg font-bold text-purple-400">£{weekendHourlyExVat.toFixed(0)}/h</p>
                    {vatRegistered && (
                      <p className="text-xs text-white/40">inc VAT: £{weekendHourlyIncVat?.toFixed(0)}</p>
                    )}
                  </div>
                </div>

                {/* Utilization Notice */}
                <div className="p-3 rounded-xl border border-blue-400/20 bg-blue-400/5">
                  <div className="flex items-start gap-2">
                    <Info className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-blue-200/80">
                      Utilisation set at {utilizationRate}%.{" "}
                      {utilizationRate < 65
                        ? "This is low; consider marketing/admin balance to improve billable hours."
                        : utilizationRate > 85
                        ? "High utilisation may risk burnout; ensure realistic allowances for travel/admin."
                        : "This is within a typical 70-80% range."}
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
                    {vatRegistered ? ` or £${hourlyIncVat?.toFixed(2)}/hour inc VAT` : ""} should cover all
                    costs and deliver your target salary. Consider market rates and adjust accordingly.
                  </p>
                </div>
              </>
            ) : (
              <div className="calculator-card text-center py-16">
                <Clock className="h-16 w-16 text-blue-400/30 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Ready to Calculate</h3>
                <p className="text-white/50">Enter your details and click "Calculate"</p>
              </div>
            )}

            {/* What This Means */}
            <Collapsible open={showGuidance} onOpenChange={setShowGuidance}>
              <div className="calculator-card overflow-hidden" style={{ borderColor: "#60a5fa15" }}>
                <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                  <div className="flex items-center gap-3">
                    <Info className="h-4 w-4 text-blue-400" />
                    <span className="text-sm sm:text-base font-medium text-blue-300">
                      What This Means
                    </span>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-white/40 transition-transform duration-200",
                      showGuidance && "rotate-180"
                    )}
                  />
                </CollapsibleTrigger>

                <CollapsibleContent className="p-4 pt-0">
                  <ul className="space-y-2 text-sm text-blue-200/80">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <strong className="text-blue-300">Base cost:</strong> Your salary + employer costs + fixed expenses
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <strong className="text-blue-300">Overhead:</strong> Business costs (premises, admin, marketing)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <strong className="text-blue-300">Utilisation:</strong> % of time you can actually bill clients
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <strong className="text-blue-300">Profit margin:</strong> Buffer for growth, reinvestment, emergencies
                    </li>
                  </ul>
                </CollapsibleContent>
              </div>
            </Collapsible>

            {/* Quick Reference */}
            <Collapsible open={showReference} onOpenChange={setShowReference}>
              <div className="calculator-card overflow-hidden" style={{ borderColor: "#fbbf2415" }}>
                <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-4 w-4 text-amber-400" />
                    <span className="text-sm sm:text-base font-medium text-amber-300">
                      UK Rate Reference 2025
                    </span>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-white/40 transition-transform duration-200",
                      showReference && "rotate-180"
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
