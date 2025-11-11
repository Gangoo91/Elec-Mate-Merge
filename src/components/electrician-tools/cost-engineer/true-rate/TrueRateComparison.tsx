import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, XCircle, CheckCircle, TrendingUp } from "lucide-react";
import { formatCurrency, formatNumber } from "@/lib/format";
import { CalculatedRates } from "./TrueHourlyRateCalculator";

interface TrueRateComparisonProps {
  calculated: CalculatedRates;
}

const TrueRateComparison = ({ calculated }: TrueRateComparisonProps) => {
  const comparisonRates = [
    {
      rate: 35,
      label: "£35/hr - Cowboy Territory",
      icon: XCircle,
      color: "text-red-400",
      bg: "bg-red-500/10",
      border: "border-red-500/30",
      description: "You're losing money on every job. Going bust territory.",
    },
    {
      rate: 45,
      label: "£45/hr - The Trap Rate",
      icon: AlertTriangle,
      color: "text-orange-400",
      bg: "bg-orange-500/10",
      border: "border-orange-500/30",
      description: "Sounds okay but you're working for peanuts after costs.",
    },
    {
      rate: 55,
      label: "£55/hr - Getting Warmer",
      icon: AlertTriangle,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/30",
      description: "Still underselling yourself, no room for growth.",
    },
    {
      rate: 65,
      label: "£65/hr - Minimum Professional",
      icon: CheckCircle,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/30",
      description: "Sustainable rate for a qualified sparky. Finally making sense.",
    },
    {
      rate: 75,
      label: "£75/hr - Healthy Business",
      icon: TrendingUp,
      color: "text-green-400",
      bg: "bg-green-500/10",
      border: "border-green-500/30",
      description: "Room for growth, reinvestment, and financial security.",
    },
  ];

  const calculateTakeHome = (hourlyRate: number) => {
    const annualRevenue = hourlyRate * calculated.chargeableHours;
    const takeHome = annualRevenue - calculated.totalAnnualCosts;
    return takeHome;
  };

  const calculateEffectiveHourlyRate = (hourlyRate: number) => {
    const takeHome = calculateTakeHome(hourlyRate);
    return takeHome / calculated.totalWorkingHours;
  };

  return (
    <Card className="border-0 sm:border border-elec-yellow/20 rounded-none sm:rounded-xl">
      <CardHeader className="px-4 py-4 sm:px-6 sm:py-5">
        <CardTitle className="text-xl sm:text-lg font-bold text-white flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-orange-400" />
          Rate Comparison: What You REALLY Earn
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-5 sm:px-6 sm:pb-6 space-y-4">
        <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/30 mb-6">
          <p className="text-base sm:text-sm text-white/90 leading-relaxed">
            <strong className="text-orange-400">The Reality Check:</strong> Your "hourly rate" isn't what you actually earn. 
            After non-chargeable time and business costs, your REAL take-home per working hour is much lower. 
            Here's what common rates actually mean for your bank account.
          </p>
        </div>

        {comparisonRates.map((comparison, idx) => {
          const Icon = comparison.icon;
          const takeHome = calculateTakeHome(comparison.rate);
          const effectiveRate = calculateEffectiveHourlyRate(comparison.rate);
          const isRecommended = comparison.rate >= calculated.recommendedHourlyRate && 
                               comparison.rate <= calculated.targetHourlyRate;

          return (
            <div
              key={idx}
              className={`p-5 rounded-xl ${comparison.bg} border-2 ${
                isRecommended ? 'border-green-400' : comparison.border
              } relative`}
            >
              {isRecommended && (
                <div className="absolute -top-3 right-4 px-3 py-1 rounded-full bg-green-500 text-white text-xs font-bold">
                  YOUR TARGET ZONE
                </div>
              )}

              <div className="flex items-start gap-3 mb-3">
                <Icon className={`h-6 w-6 ${comparison.color} flex-shrink-0 mt-1`} />
                <div className="flex-1">
                  <h4 className={`text-lg font-bold ${comparison.color} mb-1`}>
                    {comparison.label}
                  </h4>
                  <p className="text-sm text-white/80 mb-3">
                    {comparison.description}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 pt-4 border-t border-white/10">
                <div>
                  <p className="text-xs text-white/60 mb-1">Chargeable Rate</p>
                  <p className={`text-xl font-bold ${comparison.color}`}>
                    {formatCurrency(comparison.rate, 0)}/hr
                  </p>
                </div>

                <div>
                  <p className="text-xs text-white/60 mb-1">Annual Take-Home</p>
                  <p className={`text-xl font-bold ${takeHome > 0 ? 'text-white' : 'text-red-400'}`}>
                    {formatCurrency(takeHome, 0)}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-white/60 mb-1">TRUE Hourly Rate</p>
                  <p className={`text-xl font-bold ${effectiveRate > 15 ? 'text-white' : 'text-red-400'}`}>
                    {formatCurrency(effectiveRate, 2)}/hr
                  </p>
                </div>
              </div>

              {takeHome < 25000 && (
                <div className="mt-4 p-3 rounded-lg bg-red-500/20 border border-red-500/30">
                  <p className="text-sm text-red-300">
                    ⚠️ Below minimum wage after all working hours. This rate will destroy your business.
                  </p>
                </div>
              )}

              {effectiveRate < 12.21 && (
                <div className="mt-4 p-3 rounded-lg bg-red-500/20 border border-red-500/30">
                  <p className="text-sm text-red-300">
                    ⚠️ Your TRUE rate is below National Living Wage (£12.21/hr). You're working for less than minimum wage!
                  </p>
                </div>
              )}
            </div>
          );
        })}

        {/* Final Wake-Up Call */}
        <div className="mt-8 p-6 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-green-500/20 border-2 border-elec-yellow/50">
          <h4 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-elec-yellow" />
            The Bottom Line
          </h4>
          <p className="text-base text-white/90 leading-relaxed mb-4">
            Based on your business costs and time reality, you need to charge between{" "}
            <span className="text-2xl font-bold text-green-400">
              {formatCurrency(calculated.recommendedHourlyRate, 0)}/hr
            </span>{" "}
            and{" "}
            <span className="text-2xl font-bold text-green-400">
              {formatCurrency(calculated.targetHourlyRate, 0)}/hr
            </span>{" "}
            to run a sustainable, profitable business.
          </p>
          <p className="text-base text-white/90 leading-relaxed">
            Anything less and you're either working for pennies, subsidising your clients, 
            or heading towards financial trouble. Don't sell yourself short. Charge what you're worth.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrueRateComparison;
