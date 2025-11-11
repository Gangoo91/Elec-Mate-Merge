import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, AlertCircle, Target, CheckCircle } from "lucide-react";
import { formatCurrency, formatNumber } from "@/lib/format";
import { CalculatedRates, TrueRateInputs } from "./TrueHourlyRateCalculator";

interface TrueRateResultsProps {
  calculated: CalculatedRates;
  inputs: TrueRateInputs;
}

const TrueRateResults = ({ calculated, inputs }: TrueRateResultsProps) => {
  const getRateColor = (rate: number) => {
    if (rate < 50) return "text-red-400";
    if (rate < 60) return "text-orange-400";
    if (rate < 70) return "text-yellow-400";
    return "text-green-400";
  };

  const getRateMessage = (rate: number) => {
    if (rate < 50) return "Below minimum viable rate";
    if (rate < 60) return "Survival mode only";
    if (rate < 70) return "Sustainable business rate";
    return "Healthy business rate";
  };

  return (
    <div className="space-y-6">
      {/* Main Results Card */}
      <Card className="border-0 sm:border border-elec-yellow/30 rounded-none sm:rounded-xl bg-gradient-to-br from-elec-yellow/10 via-elec-dark to-elec-dark">
        <CardHeader className="px-4 py-4 sm:px-6 sm:py-5">
          <CardTitle className="text-xl sm:text-lg font-bold text-white flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-elec-yellow" />
            Your True Hourly Rate Requirements
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-5 sm:px-6 sm:pb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Minimum Rate */}
            <div className="p-5 rounded-xl bg-red-500/10 border border-red-500/30">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <p className="text-sm text-white/70 font-medium">ABSOLUTE MINIMUM</p>
              </div>
              <p className="text-3xl sm:text-4xl font-bold text-red-400 mb-1">
                {formatCurrency(calculated.minimumHourlyRate, 0)}/hr
              </p>
              <p className="text-sm text-white/80">
                Break-even rate (no buffer)
              </p>
            </div>

            {/* Recommended Rate */}
            <div className="p-5 rounded-xl bg-orange-500/10 border border-orange-500/30">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-5 w-5 text-orange-400" />
                <p className="text-sm text-white/70 font-medium">RECOMMENDED</p>
              </div>
              <p className="text-3xl sm:text-4xl font-bold text-orange-400 mb-1">
                {formatCurrency(calculated.recommendedHourlyRate, 0)}/hr
              </p>
              <p className="text-sm text-white/80">
                Safe rate with 15% buffer
              </p>
            </div>

            {/* Target Rate */}
            <div className="p-5 rounded-xl bg-green-500/10 border border-green-500/30">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <p className="text-sm text-white/70 font-medium">TARGET RATE</p>
              </div>
              <p className="text-3xl sm:text-4xl font-bold text-green-400 mb-1">
                {formatCurrency(calculated.targetHourlyRate, 0)}/hr
              </p>
              <p className="text-sm text-white/80">
                For growth & reinvestment
              </p>
            </div>
          </div>

          {/* Key Insight */}
          <div className="mt-6 p-4 rounded-xl bg-elec-yellow/10 border border-elec-yellow/30">
            <p className="text-base sm:text-sm text-white/90 leading-relaxed">
              <strong className="text-elec-yellow">Reality Check:</strong> You need to charge{" "}
              <span className="text-xl font-bold text-white">
                {formatCurrency(calculated.recommendedHourlyRate, 0)}/hr
              </span>{" "}
              to achieve your {formatCurrency(inputs.desiredAnnualIncome, 0)} annual income target 
              after accounting for {formatNumber(calculated.nonChargeableHours, 0)} hours of unpaid work 
              and {formatCurrency(calculated.totalAnnualCosts, 0)} in business costs.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* The Shocking Reality */}
      <Card className="border-0 sm:border border-orange-500/30 rounded-none sm:rounded-xl bg-gradient-to-br from-orange-500/10 to-elec-dark">
        <CardHeader className="px-4 py-4 sm:px-6 sm:py-5">
          <CardTitle className="text-xl sm:text-lg font-bold text-white flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-orange-400" />
            The Shocking Reality
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-5 sm:px-6 sm:pb-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-card/50 border border-primary/20">
              <p className="text-sm text-white/70 mb-1">Total Working Hours</p>
              <p className="text-2xl font-bold text-white">
                {formatNumber(calculated.totalWorkingHours, 0)} hrs/year
              </p>
            </div>

            <div className="p-4 rounded-lg bg-card/50 border border-primary/20">
              <p className="text-sm text-white/70 mb-1">Chargeable Hours</p>
              <p className="text-2xl font-bold text-green-400">
                {formatNumber(calculated.chargeableHours, 0)} hrs/year
              </p>
            </div>

            <div className="p-4 rounded-lg bg-card/50 border border-primary/20">
              <p className="text-sm text-white/70 mb-1">Non-Chargeable Hours</p>
              <p className="text-2xl font-bold text-red-400">
                {formatNumber(calculated.nonChargeableHours, 0)} hrs/year
              </p>
            </div>

            <div className="p-4 rounded-lg bg-card/50 border border-primary/20">
              <p className="text-sm text-white/70 mb-1">Chargeable Percentage</p>
              <p className="text-2xl font-bold text-orange-400">
                {formatNumber(calculated.chargeablePercentage, 1)}%
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/30">
            <p className="text-base sm:text-sm text-white/90 leading-relaxed">
              <strong className="text-orange-400">Wake-Up Call:</strong> You only get paid for{" "}
              <span className="text-lg font-bold text-white">
                {formatNumber(calculated.chargeablePercentage, 0)}%
              </span>{" "}
              of your working hours. The rest is admin, quoting, travel, training, and callbacks. 
              This is why £45/hr feels like good money but leaves you skint.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Annual Breakdown */}
      <Card className="border-0 sm:border border-elec-yellow/20 rounded-none sm:rounded-xl">
        <CardHeader className="px-4 py-4 sm:px-6 sm:py-5">
          <CardTitle className="text-xl sm:text-lg font-bold text-white">
            Annual Financial Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-5 sm:px-6 sm:pb-6 space-y-3">
          <div className="flex justify-between items-center py-3 border-b border-primary/20">
            <span className="text-base sm:text-sm text-white/80">Desired Take-Home Income</span>
            <span className="text-lg font-bold text-green-400">
              {formatCurrency(inputs.desiredAnnualIncome, 0)}
            </span>
          </div>

          <div className="flex justify-between items-center py-3 border-b border-primary/20">
            <span className="text-base sm:text-sm text-white/80">Total Business Costs</span>
            <span className="text-lg font-bold text-red-400">
              {formatCurrency(calculated.totalAnnualCosts, 0)}
            </span>
          </div>

          <div className="flex justify-between items-center py-4 bg-elec-yellow/10 rounded-lg px-4">
            <span className="text-base sm:text-sm font-bold text-white">Required Annual Revenue</span>
            <span className="text-xl font-bold text-elec-yellow">
              {formatCurrency(calculated.requiredAnnualRevenue, 0)}
            </span>
          </div>

          <div className="flex justify-between items-center py-3 border-t border-primary/20">
            <span className="text-base sm:text-sm text-white/80">Chargeable Hours per Year</span>
            <span className="text-lg font-bold text-white">
              {formatNumber(calculated.chargeableHours, 0)} hrs
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrueRateResults;
