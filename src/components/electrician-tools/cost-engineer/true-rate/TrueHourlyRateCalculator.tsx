import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calculator, AlertTriangle, TrendingUp, Clock, PoundSterling } from "lucide-react";
import { MobileInputWrapper } from "@/components/ui/mobile-input-wrapper";
import { MARKET_RATES_2025 } from "@/lib/constants/pricing-2025";
import TrueRateResults from "./TrueRateResults";
import TrueRateBreakdown from "./TrueRateBreakdown";
import TrueRateComparison from "./TrueRateComparison";

export interface TrueRateInputs {
  desiredAnnualIncome: number;
  chargeableHoursPerWeek: number;
  holidayWeeks: number;
  sickDays: number;
  adminHoursPerWeek: number;
  quotingHoursPerWeek: number;
  travelHoursPerWeek: number;
  callbackHoursPerMonth: number;
  trainingDaysPerYear: number;
}

export interface CalculatedRates {
  totalWorkingDays: number;
  totalWorkingHours: number;
  chargeableHours: number;
  nonChargeableHours: number;
  chargeablePercentage: number;
  totalAnnualCosts: number;
  requiredAnnualRevenue: number;
  minimumHourlyRate: number;
  recommendedHourlyRate: number;
  targetHourlyRate: number;
}

const DEFAULT_INPUTS: TrueRateInputs = {
  desiredAnnualIncome: 45000, // Realistic target for qualified sparky
  chargeableHoursPerWeek: 32, // Realistic billable hours
  holidayWeeks: 4,
  sickDays: 5,
  adminHoursPerWeek: 4,
  quotingHoursPerWeek: 3,
  travelHoursPerWeek: 5,
  callbackHoursPerMonth: 2,
  trainingDaysPerYear: 4,
};

const TrueHourlyRateCalculator = () => {
  const [inputs, setInputs] = useState<TrueRateInputs>(DEFAULT_INPUTS);
  const [calculated, setCalculated] = useState<CalculatedRates | null>(null);

  const updateInput = (field: keyof TrueRateInputs, value: string) => {
    const numValue = parseFloat(value) || 0;
    setInputs(prev => ({ ...prev, [field]: numValue }));
  };

  const calculateTrueRate = () => {
    // Step 1: Calculate working time
    const weeksPerYear = 52;
    const workingWeeks = weeksPerYear - inputs.holidayWeeks;
    const totalWorkingDays = workingWeeks * 5 - inputs.sickDays - inputs.trainingDaysPerYear;
    const totalWorkingHours = totalWorkingDays * 8; // 8-hour days

    // Step 2: Calculate chargeable vs non-chargeable
    const chargeableHoursPerYear = inputs.chargeableHoursPerWeek * workingWeeks;
    const adminHoursPerYear = inputs.adminHoursPerWeek * workingWeeks;
    const quotingHoursPerYear = inputs.quotingHoursPerWeek * workingWeeks;
    const travelHoursPerYear = inputs.travelHoursPerWeek * workingWeeks;
    const callbackHoursPerYear = inputs.callbackHoursPerMonth * 12;

    const nonChargeableHours = 
      adminHoursPerYear + 
      quotingHoursPerYear + 
      travelHoursPerYear + 
      callbackHoursPerYear;

    const chargeablePercentage = (chargeableHoursPerYear / totalWorkingHours) * 100;

    // Step 3: Calculate annual business costs (from pricing-2025.ts)
    const costs = MARKET_RATES_2025.businessCosts;
    const totalAnnualCosts = 
      costs.niceicMembership +
      costs.ecaMembership +
      costs.publicLiabilityInsurance +
      costs.toolInsurance +
      costs.commercialInsurance +
      costs.fuel +
      costs.maintenance +
      costs.vehicleAllowance +
      costs.multifunctionTester +
      costs.patTester +
      costs.thermalCamera +
      costs.toolsReplacement +
      costs.eicrsoftware +
      costs.cloudStorage +
      costs.businessApps +
      costs.continuousTraining +
      costs.certification;

    // Step 4: Calculate required revenue
    const requiredAnnualRevenue = inputs.desiredAnnualIncome + totalAnnualCosts;
    
    // Step 5: Calculate hourly rates
    const minimumHourlyRate = requiredAnnualRevenue / chargeableHoursPerYear;
    const recommendedHourlyRate = minimumHourlyRate * 1.15; // 15% buffer for bad debts, etc.
    const targetHourlyRate = minimumHourlyRate * 1.25; // 25% for growth/reinvestment

    setCalculated({
      totalWorkingDays,
      totalWorkingHours,
      chargeableHours: chargeableHoursPerYear,
      nonChargeableHours,
      chargeablePercentage,
      totalAnnualCosts,
      requiredAnnualRevenue,
      minimumHourlyRate,
      recommendedHourlyRate,
      targetHourlyRate,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="border-0 sm:border border-elec-yellow/30 rounded-none sm:rounded-xl bg-gradient-to-br from-orange-500/20 via-elec-dark to-elec-dark">
        <CardHeader className="px-4 py-4 sm:px-6 sm:py-5">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-orange-500/20 border border-orange-500/30">
              <AlertTriangle className="h-6 w-6 text-orange-400" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-xl sm:text-2xl font-bold text-white mb-2">
                True Hourly Rate Calculator
              </CardTitle>
              <CardDescription className="text-base sm:text-sm text-white/80 leading-relaxed">
                Most electricians undercharge because they don't account for non-chargeable time and business costs. 
                This calculator reveals your REAL hourly rate needed to achieve your income goals.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-4 pb-5 sm:px-6 sm:pb-6">
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
            <p className="text-base sm:text-sm text-white/90 leading-relaxed">
              <strong className="text-orange-400">Reality Check:</strong> If you think £45/hr sounds good, 
              you're likely earning less than minimum wage after accounting for holidays, sick days, admin, 
              quoting time, travel, and business costs. Let's find out your TRUE required rate.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Input Section */}
      <Card className="border-0 sm:border border-elec-yellow/20 rounded-none sm:rounded-xl">
        <CardHeader className="px-4 py-4 sm:px-6 sm:py-5">
          <CardTitle className="text-xl sm:text-lg font-bold text-white flex items-center gap-2">
            <PoundSterling className="h-5 w-5 text-green-400" />
            Income & Time Goals
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-5 sm:px-6 sm:pb-6 space-y-5">
          <MobileInputWrapper
            label="Desired Annual Take-Home Income"
            value={inputs.desiredAnnualIncome.toString()}
            onChange={(val) => updateInput('desiredAnnualIncome', val)}
            type="number"
            inputMode="numeric"
            unit="£"
            hint="What you want to actually earn per year (before tax)"
          />

          <MobileInputWrapper
            label="Chargeable Hours Per Week"
            value={inputs.chargeableHoursPerWeek.toString()}
            onChange={(val) => updateInput('chargeableHoursPerWeek', val)}
            type="number"
            inputMode="numeric"
            unit="hrs"
            hint="Realistic billable hours (32-35 is typical for sole traders)"
          />
        </CardContent>
      </Card>

      {/* Non-Chargeable Time */}
      <Card className="border-0 sm:border border-elec-yellow/20 rounded-none sm:rounded-xl">
        <CardHeader className="px-4 py-4 sm:px-6 sm:py-5">
          <CardTitle className="text-xl sm:text-lg font-bold text-white flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-400" />
            Non-Chargeable Time (The Hidden Killer)
          </CardTitle>
          <CardDescription className="text-base sm:text-sm text-white/80">
            Time you work but can't charge to clients
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 pb-5 sm:px-6 sm:pb-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <MobileInputWrapper
              label="Holiday Weeks Per Year"
              value={inputs.holidayWeeks.toString()}
              onChange={(val) => updateInput('holidayWeeks', val)}
              type="number"
              inputMode="numeric"
              unit="weeks"
              hint="Typical: 4-6 weeks"
            />

            <MobileInputWrapper
              label="Sick Days Per Year"
              value={inputs.sickDays.toString()}
              onChange={(val) => updateInput('sickDays', val)}
              type="number"
              inputMode="numeric"
              unit="days"
              hint="Typical: 3-7 days"
            />

            <MobileInputWrapper
              label="Admin Hours Per Week"
              value={inputs.adminHoursPerWeek.toString()}
              onChange={(val) => updateInput('adminHoursPerWeek', val)}
              type="number"
              inputMode="numeric"
              step="0.5"
              unit="hrs"
              hint="Invoicing, emails, scheduling"
            />

            <MobileInputWrapper
              label="Quoting Hours Per Week"
              value={inputs.quotingHoursPerWeek.toString()}
              onChange={(val) => updateInput('quotingHoursPerWeek', val)}
              type="number"
              inputMode="numeric"
              step="0.5"
              unit="hrs"
              hint="Site visits, estimates, follow-ups"
            />

            <MobileInputWrapper
              label="Travel Hours Per Week"
              value={inputs.travelHoursPerWeek.toString()}
              onChange={(val) => updateInput('travelHoursPerWeek', val)}
              type="number"
              inputMode="numeric"
              step="0.5"
              unit="hrs"
              hint="Driving between jobs"
            />

            <MobileInputWrapper
              label="Callback Hours Per Month"
              value={inputs.callbackHoursPerMonth.toString()}
              onChange={(val) => updateInput('callbackHoursPerMonth', val)}
              type="number"
              inputMode="numeric"
              step="0.5"
              unit="hrs"
              hint="Warranty work, snags"
            />

            <MobileInputWrapper
              label="Training Days Per Year"
              value={inputs.trainingDaysPerYear.toString()}
              onChange={(val) => updateInput('trainingDaysPerYear', val)}
              type="number"
              inputMode="numeric"
              unit="days"
              hint="18th Edition, updates"
            />
          </div>
        </CardContent>
      </Card>

      {/* Calculate Button */}
      <Card className="border-0 sm:border border-green-500/30 rounded-none sm:rounded-xl bg-gradient-to-br from-green-500/10 to-elec-dark">
        <CardContent className="px-4 py-5 sm:px-6">
          <button
            onClick={calculateTrueRate}
            className="w-full h-14 bg-green-500 hover:bg-green-600 text-white font-bold text-lg rounded-xl transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl active:scale-95"
          >
            <Calculator className="h-6 w-6" />
            Calculate My True Hourly Rate
          </button>
        </CardContent>
      </Card>

      {/* Results Section */}
      {calculated && (
        <>
          <TrueRateResults calculated={calculated} inputs={inputs} />
          <TrueRateBreakdown calculated={calculated} inputs={inputs} />
          <TrueRateComparison calculated={calculated} />
        </>
      )}
    </div>
  );
};

export default TrueHourlyRateCalculator;
