import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BackButton from "@/components/common/BackButton";
import { useToast } from "@/hooks/use-toast";
import { Clock, PoundSterling, Calculator, CheckCircle, RefreshCw, Save, Info } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Helmet } from "react-helmet";
import WhyThisMatters from "@/components/common/WhyThisMatters";
import { RegionalRateSelector } from "@/components/business-calculator/RegionalRateSelector";
import { Market2025Insights } from "@/components/business-calculator/Market2025Insights";
interface RateInputs {
  annualSalary: number;
  workingDaysPerYear: number;
  hoursPerDay: number;
  paidLeaveDays: number;
  bankHolidays: number;
  sickDays: number;
  trainingDays: number;
  employerNI: number; // % of salary
  employerPension: number; // % of salary
  profFeesAnnual: number;
  calibrationAnnual: number;
  softwareAnnual: number;
  vehicleAnnual: number;
  overheadPercentage: number;
  profitMargin: number;
  utilizationRate: number;
  // Premiums & call-out
  callOutMinHours: number; // minimum billable hours for call-outs
  afterHoursMultiplier: number; // e.g. 1.5x
  weekendMultiplier: number; // e.g. 2.0x
}

const HourlyRateCalculator = () => {
  const { toast } = useToast();
  const [inputs, setInputs] = useState<RateInputs>({
    annualSalary: 35000, // Updated for 2025 market rates
    workingDaysPerYear: 230,
    hoursPerDay: 8,
    paidLeaveDays: 25,
    bankHolidays: 8,
    sickDays: 5,
    trainingDays: 3,
    employerNI: 13.8,
    employerPension: 3,
    profFeesAnnual: 1000, // Updated for 2025: NICEIC/ECA membership + insurance increases
    calibrationAnnual: 300, // Updated for 2025: PAT testers, multifunction testers
    softwareAnnual: 450, // Updated for 2025: EICR software, apps, cloud storage
    vehicleAnnual: 4000, // Updated for 2025: fuel, insurance, maintenance increases
    overheadPercentage: 25,
    profitMargin: 25,
    utilizationRate: 75,
    callOutMinHours: 2,
    afterHoursMultiplier: 1.5,
    weekendMultiplier: 2.0,
  });
const [calculated, setCalculated] = useState(false);
  const [vatRegistered, setVatRegistered] = useState(false);
  const [rounding, setRounding] = useState<'none' | 'nearest1' | 'nearest5' | 'nearest10'>('nearest1');

  const calculateRate = () => {
    setCalculated(true);
    toast({ title: "Rate Calculated", description: "Your hourly rate analysis is complete.", variant: "success" });
  };

  const updateInput = (field: keyof RateInputs, value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
    setCalculated(false);
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
      annualSalary: 35000, // Updated for 2025 market rates
      workingDaysPerYear: 230,
      hoursPerDay: 8,
      paidLeaveDays: 25,
      bankHolidays: 8,
      sickDays: 5,
      trainingDays: 3,
      employerNI: 13.8,
      employerPension: 3,
      profFeesAnnual: 1000, // Updated for 2025
      calibrationAnnual: 300, // Updated for 2025
      softwareAnnual: 450, // Updated for 2025
      vehicleAnnual: 4000, // Updated for 2025
      overheadPercentage: 25,
      profitMargin: 25,
      utilizationRate: 75,
      callOutMinHours: 2,
      afterHoursMultiplier: 1.5,
      weekendMultiplier: 2.0,
    });
    setCalculated(false);
  };

  // Calculations
  const effectiveWorkingDays = Math.max(
    inputs.workingDaysPerYear - inputs.paidLeaveDays - inputs.bankHolidays - inputs.sickDays - inputs.trainingDays,
    0
  );
  const totalWorkingHours = effectiveWorkingDays * inputs.hoursPerDay;
  const billableHours = Math.max((totalWorkingHours * inputs.utilizationRate) / 100, 1);

  const baseCostAnnual =
    inputs.annualSalary * (1 + (inputs.employerNI + inputs.employerPension) / 100) +
    inputs.profFeesAnnual +
    inputs.calibrationAnnual +
    inputs.softwareAnnual +
    inputs.vehicleAnnual;

  const baseCostPerHour = baseCostAnnual / billableHours;
  const overheadAnnual = baseCostAnnual * (inputs.overheadPercentage / 100);
  const overheadCostPerHour = overheadAnnual / billableHours;
  const totalCostPerHour = baseCostPerHour + overheadCostPerHour;
  const minimumRate = totalCostPerHour / Math.max(1 - inputs.profitMargin / 100, 0.01);
  const dayRate = minimumRate * inputs.hoursPerDay;

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
  const roundedHourlyExVat = applyRounding(minimumRate);
  const roundedDayExVat = applyRounding(dayRate);
  const hourlyIncVat = vatRegistered ? applyRounding(roundedHourlyExVat * (1 + VAT_RATE)) : null;
  const dayIncVat = vatRegistered ? applyRounding(roundedDayExVat * (1 + VAT_RATE)) : null;

  // Premium & call-out derived rates
  const callOutFeeExVat = applyRounding(roundedHourlyExVat * Math.max(inputs.callOutMinHours || 0, 0));
  const callOutFeeIncVat = vatRegistered ? applyRounding(callOutFeeExVat * (1 + VAT_RATE)) : null;
  const afterHoursHourlyExVat = applyRounding(roundedHourlyExVat * Math.max(inputs.afterHoursMultiplier || 0, 0));
  const afterHoursDayExVat = applyRounding(roundedDayExVat * Math.max(inputs.afterHoursMultiplier || 0, 0));
  const weekendHourlyExVat = applyRounding(roundedHourlyExVat * Math.max(inputs.weekendMultiplier || 0, 0));
  const weekendDayExVat = applyRounding(roundedDayExVat * Math.max(inputs.weekendMultiplier || 0, 0));
  const afterHoursHourlyIncVat = vatRegistered ? applyRounding(afterHoursHourlyExVat * (1 + VAT_RATE)) : null;
  const afterHoursDayIncVat = vatRegistered ? applyRounding(afterHoursDayExVat * (1 + VAT_RATE)) : null;
  const weekendHourlyIncVat = vatRegistered ? applyRounding(weekendHourlyExVat * (1 + VAT_RATE)) : null;
  const weekendDayIncVat = vatRegistered ? applyRounding(weekendDayExVat * (1 + VAT_RATE)) : null;

  const chartData = useMemo(() => [
    { name: "Base", value: Number(baseCostPerHour.toFixed(2)) },
    { name: "Overhead", value: Number(overheadCostPerHour.toFixed(2)) },
    { name: "Cost/hr", value: Number(totalCostPerHour.toFixed(2)) },
    { name: "Rate/hr", value: Number(minimumRate.toFixed(2)) },
  ], [baseCostPerHour, overheadCostPerHour, totalCostPerHour, minimumRate]);
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Helmet>
        <title>Hourly Rate Calculator UK | Electrician Pricing</title>
        <meta name="description" content="Calculate a UK electrician hourly and day rate with costs, overheads and profit. Mobile-first and fast." />
        <link rel="canonical" href="/electrician/business-development/tools/hourly-rate" />
      </Helmet>
      <div className="flex flex-col items-center justify-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-4 flex items-center gap-3">
          <Clock className="h-8 w-8 text-elec-yellow" />
          Hourly Rate Calculator
        </h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-6">
          Calculate your optimal hourly rate based on costs, overheads, and desired profit margins.
        </p>
        <BackButton customUrl="/electrician/business-development/tools" label="Back to Calculators" />
      </div>

      <WhyThisMatters
        points={[
          "Covers costs, overheads and target profit so you don’t undercharge.",
          "Aligns price with realistic utilisation (billable vs admin/travel).",
          "Builds a defendable rate for BS 7671 testing/certification time."
        ]}
      />

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="border-elec-yellow/20 bg-elec-card"> 
          <CardHeader>
            <CardTitle className="text-foreground">Rate Calculation Inputs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <MobileInput
              label="Desired Annual Salary"
              type="number"
              value={inputs.annualSalary || ""}
              onChange={(e) => updateInput('annualSalary', parseFloat(e.target.value) || 0)}
              unit="£"
              hint="Your target personal income"
            />
            <MobileInput
              label="Working Days Per Year"
              type="number"
              value={inputs.workingDaysPerYear || ""}
              onChange={(e) => updateInput('workingDaysPerYear', parseInt(e.target.value) || 0)}
              hint="Typically 230-250 days"
            />
            <MobileInput
              label="Hours Per Day"
              type="number"
              value={inputs.hoursPerDay || ""}
              onChange={(e) => updateInput('hoursPerDay', parseInt(e.target.value) || 0)}
              hint="Standard working hours"
            />
            {/* Time allowances */}
            <div className="grid sm:grid-cols-2 gap-4">
              <MobileInput
                label="Paid Leave Days"
                type="number"
                value={inputs.paidLeaveDays || ""}
                onChange={(e) => updateInput('paidLeaveDays', parseFloat(e.target.value) || 0)}
                hint="Typical 20–28 days"
              />
              <MobileInput
                label="Bank Holidays"
                type="number"
                value={inputs.bankHolidays || ""}
                onChange={(e) => updateInput('bankHolidays', parseFloat(e.target.value) || 0)}
                hint="UK standard ~8"
              />
              <MobileInput
                label="Sick Days (allowance)"
                type="number"
                value={inputs.sickDays || ""}
                onChange={(e) => updateInput('sickDays', parseFloat(e.target.value) || 0)}
              />
              <MobileInput
                label="Training/CPD Days"
                type="number"
                value={inputs.trainingDays || ""}
                onChange={(e) => updateInput('trainingDays', parseFloat(e.target.value) || 0)}
              />
            </div>

            {/* Employer on-costs & annual costs */}
            <div className="grid sm:grid-cols-2 gap-4">
              <MobileInput
                label="Employer NI"
                type="number"
                unit="%"
                value={inputs.employerNI || ""}
                onChange={(e) => updateInput('employerNI', parseFloat(e.target.value) || 0)}
                hint="Typical 13.8%"
              />
              <MobileInput
                label="Employer Pension"
                type="number"
                unit="%"
                value={inputs.employerPension || ""}
                onChange={(e) => updateInput('employerPension', parseFloat(e.target.value) || 0)}
                hint="Typical 3%"
              />
              <MobileInput
                label="Professional Fees (annual)"
                type="number"
                unit="£"
                value={inputs.profFeesAnnual || ""}
                onChange={(e) => updateInput('profFeesAnnual', parseFloat(e.target.value) || 0)}
                hint="Schemes, insurances"
              />
              <MobileInput
                label="Calibration/Tools (annual)"
                type="number"
                unit="£"
                value={inputs.calibrationAnnual || ""}
                onChange={(e) => updateInput('calibrationAnnual', parseFloat(e.target.value) || 0)}
              />
              <MobileInput
                label="Software (annual)"
                type="number"
                unit="£"
                value={inputs.softwareAnnual || ""}
                onChange={(e) => updateInput('softwareAnnual', parseFloat(e.target.value) || 0)}
              />
              <MobileInput
                label="Vehicle Allowance (annual)"
                type="number"
                unit="£"
                value={inputs.vehicleAnnual || ""}
                onChange={(e) => updateInput('vehicleAnnual', parseFloat(e.target.value) || 0)}
              />
            </div>

            <MobileInput
              label="Overhead Percentage"
              type="number"
              value={inputs.overheadPercentage || ""}
              onChange={(e) => updateInput('overheadPercentage', parseFloat(e.target.value) || 0)}
              unit="%"
              hint="Business costs (20-30%)"
            />
            <MobileInput
              label="Profit Margin"
              type="number"
              value={inputs.profitMargin || ""}
              onChange={(e) => updateInput('profitMargin', parseFloat(e.target.value) || 0)}
              unit="%"
              hint="Target profit (20-30%)"
            />
            <MobileInput
              label="Utilization Rate"
              type="number"
              value={inputs.utilizationRate || ""}
              onChange={(e) => updateInput('utilizationRate', parseFloat(e.target.value) || 0)}
              unit="%"
              hint="Billable vs total hours (70-80%)"
            />
            <div className="space-y-4">
              <h4 className="text-elec-light font-semibold">Options</h4>
              <div className="grid sm:grid-cols-2 gap-4 items-end">
                <div className="space-y-2">
                  <div className="text-sm font-semibold text-elec-light flex items-center gap-2">
                    <span className="w-1 h-4 bg-elec-yellow rounded-full"></span>
                    VAT Registered?
                  </div>
                  <div className="inline-flex w-full rounded-xl overflow-hidden border border-elec-yellow/30">
                    <Button
                      variant={vatRegistered ? "default" : "outline"}
                      size="sm"
                      onClick={() => setVatRegistered(true)}
                      className={
                        (vatRegistered ? "bg-elec-yellow text-black" : "text-elec-yellow hover:bg-elec-yellow/10") +
                        " h-14 rounded-none border-0 flex-1"
                      }
                    >
                      Yes
                    </Button>
                    <Button
                      variant={!vatRegistered ? "default" : "outline"}
                      size="sm"
                      onClick={() => setVatRegistered(false)}
                      className={
                        (!vatRegistered ? "bg-elec-yellow text-black" : "text-elec-yellow hover:bg-elec-yellow/10") +
                        " h-14 rounded-none border-0 flex-1"
                      }
                    >
                      No
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-semibold text-elec-light flex items-center gap-2">
                    <span className="w-1 h-4 bg-elec-yellow rounded-full"></span>
                    Rounding
                  </div>
                  <MobileSelectWrapper
                    value={rounding}
                    onValueChange={(v) => setRounding(v as any)}
                    options={[
                      { value: 'none', label: 'Exact (£0.01)' },
                      { value: 'nearest1', label: 'Nearest £1' },
                      { value: 'nearest5', label: 'Nearest £5' },
                      { value: 'nearest10', label: 'Nearest £10' },
                    ]}
                    hint="Applies to rates shown"
                  />
                </div>
              </div>
            </div>
              <div className="grid sm:grid-cols-3 gap-3 items-end">
                <MobileInput
                  label="Call-out min hours"
                  type="number"
                  value={inputs.callOutMinHours || ""}
                  onChange={(e) => updateInput('callOutMinHours', parseFloat(e.target.value) || 0)}
                  hint="Typical 1.5–2.0"
                />
                <MobileInput
                  label="After-hours multiplier"
                  type="number"
                  value={inputs.afterHoursMultiplier || ""}
                  onChange={(e) => updateInput('afterHoursMultiplier', parseFloat(e.target.value) || 0)}
                  hint="e.g. 1.5x"
                />
                <MobileInput
                  label="Weekend multiplier"
                  type="number"
                  value={inputs.weekendMultiplier || ""}
                  onChange={(e) => updateInput('weekendMultiplier', parseFloat(e.target.value) || 0)}
                  hint="e.g. 2.0x"
                />
              </div>
            <div className="flex flex-wrap gap-3">
              <Button onClick={calculateRate} className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
                <Calculator className="h-4 w-4 mr-2" />
                Calculate Rate
              </Button>
              <Button variant="secondary" onClick={saveScenario} className="gap-2">
                <Save className="h-4 w-4" /> Save Scenario
              </Button>
              <Button variant="outline" onClick={reset} className="gap-2">
                <RefreshCw className="h-4 w-4" /> Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <PoundSterling className="h-5 w-5 text-elec-yellow" />
              Rate Analysis
              {calculated && <Badge variant="success" className="ml-auto">Calculated</Badge>}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {calculated ? (
              <>
                <div className="text-center bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-6">
                  <h3 className="text-white font-semibold mb-2">Recommended Hourly Rate (ex VAT)</h3>
                  <p className="text-4xl font-bold text-elec-yellow">£{roundedHourlyExVat.toFixed(2)}</p>
                  {vatRegistered && (
                    <p className="text-sm text-elec-light mt-2">
                      Inc VAT: <span className="font-semibold text-elec-yellow">£{hourlyIncVat?.toFixed(2)}</span>
                    </p>
                  )}
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-white font-semibold">Rate Breakdown</h4>
                  <div className="space-y-3">
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
                    <div className="flex justify-between text-white font-semibold">
                      <span>Profit margin:</span>
                      <span className="text-green-400">£{(minimumRate - totalCostPerHour).toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="text-center bg-elec-dark/50 rounded-lg p-4 border border-elec-yellow/20">
                    <h4 className="text-white font-medium">Estimated Day Rate (ex VAT)</h4>
                    <div className="text-2xl font-bold text-elec-yellow mt-1">£{roundedDayExVat.toFixed(2)}</div>
                    {vatRegistered && (
                      <p className="text-xs text-elec-light mt-1">Inc VAT: £{dayIncVat?.toFixed(2)}</p>
                    )}
                    <p className="text-xs text-elec-light mt-1">Based on {inputs.hoursPerDay} hours/day</p>
                  </div>

                  <div className="bg-elec-dark/50 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-2">Cost vs Rate</h4>
                    <div className="h-40">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                          <XAxis dataKey="name" stroke="rgba(255,255,255,0.6)" />
                          <YAxis stroke="rgba(255,255,255,0.6)" tickFormatter={(v) => `£${v}`} />
                          <Tooltip formatter={(v: any) => `£${(v as number).toFixed(2)}`} contentStyle={{ background: "#0b0f15", border: "1px solid rgba(255,255,255,0.1)" }} />
                          <Bar dataKey="value" fill="#F7D154" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* Premium & Call-out Suggestions */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="text-center bg-elec-yellow/10 rounded-lg p-4 border border-elec-yellow/30">
                    <h4 className="text-white font-medium">Call-out minimum</h4>
                    <div className="text-xl font-bold text-elec-yellow mt-1">£{callOutFeeExVat.toFixed(2)} ex VAT</div>
                    {vatRegistered && <p className="text-xs text-elec-light mt-1">£{callOutFeeIncVat?.toFixed(2)} inc VAT</p>}
                    <p className="text-xs text-elec-light mt-1">{inputs.callOutMinHours}h minimum</p>
                  </div>
                  <div className="text-center bg-elec-dark/50 rounded-lg p-4 border border-elec-yellow/20">
                    <h4 className="text-white font-medium">After-hours</h4>
                    <div className="text-xl font-bold text-elec-yellow mt-1">£{afterHoursHourlyExVat.toFixed(2)}/h</div>
                    <p className="text-xs text-elec-light mt-1">Day: £{afterHoursDayExVat.toFixed(2)}</p>
                    {vatRegistered && (
                      <p className="text-xs text-elec-light mt-1">Inc VAT: £{afterHoursHourlyIncVat?.toFixed(2)}/h • £{afterHoursDayIncVat?.toFixed(2)}/day</p>
                    )}
                  </div>
                  <div className="text-center bg-elec-dark/50 rounded-lg p-4 border border-elec-yellow/20">
                    <h4 className="text-white font-medium">Weekend</h4>
                    <div className="text-xl font-bold text-elec-yellow mt-1">£{weekendHourlyExVat.toFixed(2)}/h</div>
                    <p className="text-xs text-elec-light mt-1">Day: £{weekendDayExVat.toFixed(2)}</p>
                    {vatRegistered && (
                      <p className="text-xs text-elec-light mt-1">Inc VAT: £{weekendHourlyIncVat?.toFixed(2)}/h • £{weekendDayIncVat?.toFixed(2)}/day</p>
                    )}
                  </div>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <Info className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <p className="text-blue-200/80 text-xs">
                      Utilisation set at {inputs.utilizationRate}%. {inputs.utilizationRate < 65 ? 'This is low; consider marketing/admin balance to improve billable hours.' : inputs.utilizationRate > 85 ? 'High utilisation may risk burnout; ensure realistic allowances for travel/admin.' : 'This is within a typical 70–80% range.'}
                    </p>
                  </div>
                </div>

                <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-3 text-green-300">
                    <CheckCircle className="h-5 w-5" />
                    <h4 className="font-medium">Rate Recommendations</h4>
                  </div>
                  <p className="text-sm text-green-200 mt-2">
                    Your calculated rate of £{roundedHourlyExVat.toFixed(2)}/hour (ex VAT){vatRegistered ? ` or £${hourlyIncVat?.toFixed(2)}/hour inc VAT` : ''} should cover all costs and deliver your target salary.
                    Consider market rates and adjust accordingly.
                  </p>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <Clock className="h-16 w-16 text-elec-yellow/50 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Ready to Calculate</h3>
                <p className="text-muted-foreground">Enter your details and click "Calculate Rate"</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HourlyRateCalculator;