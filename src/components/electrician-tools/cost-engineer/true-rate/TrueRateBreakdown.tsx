import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Clock, PoundSterling } from "lucide-react";
import { formatCurrency, formatNumber } from "@/lib/format";
import { CalculatedRates, TrueRateInputs } from "./TrueHourlyRateCalculator";
import { MARKET_RATES_2025 } from "@/lib/constants/pricing-2025";

interface TrueRateBreakdownProps {
  calculated: CalculatedRates;
  inputs: TrueRateInputs;
}

const TrueRateBreakdown = ({ calculated, inputs }: TrueRateBreakdownProps) => {
  const costs = MARKET_RATES_2025.businessCosts;
  
  // Time breakdown calculations
  const workingWeeks = 52 - inputs.holidayWeeks;
  const chargeableHoursPerYear = inputs.chargeableHoursPerWeek * workingWeeks;
  const adminHours = inputs.adminHoursPerWeek * workingWeeks;
  const quotingHours = inputs.quotingHoursPerWeek * workingWeeks;
  const travelHours = inputs.travelHoursPerWeek * workingWeeks;
  const callbackHours = inputs.callbackHoursPerMonth * 12;
  const trainingHours = inputs.trainingDaysPerYear * 8;
  const holidayHours = inputs.holidayWeeks * 40;
  const sickHours = inputs.sickDays * 8;

  const timeBreakdown = [
    { label: "Chargeable Work", hours: chargeableHoursPerYear, color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/30" },
    { label: "Admin & Paperwork", hours: adminHours, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/30" },
    { label: "Quoting & Site Visits", hours: quotingHours, color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/30" },
    { label: "Travel Between Jobs", hours: travelHours, color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/30" },
    { label: "Callbacks & Warranty", hours: callbackHours, color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/30" },
    { label: "Training & Certification", hours: trainingHours, color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/30" },
    { label: "Holidays", hours: holidayHours, color: "text-pink-400", bg: "bg-pink-500/10", border: "border-pink-500/30" },
    { label: "Sick Days", hours: sickHours, color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/30" },
  ];

  // Cost breakdown by category
  const costBreakdown = [
    {
      category: "Professional Memberships & Insurance",
      items: [
        { label: "NICEIC Membership", cost: costs.niceicMembership },
        { label: "ECA Membership", cost: costs.ecaMembership },
        { label: "Public Liability Insurance", cost: costs.publicLiabilityInsurance },
        { label: "Tool Insurance", cost: costs.toolInsurance },
      ],
      color: "text-blue-400",
    },
    {
      category: "Vehicle & Travel",
      items: [
        { label: "Commercial Insurance", cost: costs.commercialInsurance },
        { label: "Fuel", cost: costs.fuel },
        { label: "Maintenance & MOT", cost: costs.maintenance },
        { label: "Vehicle Allowance", cost: costs.vehicleAllowance },
      ],
      color: "text-orange-400",
    },
    {
      category: "Equipment & Tools",
      items: [
        { label: "Multifunction Tester (amortized)", cost: costs.multifunctionTester },
        { label: "PAT Tester (amortized)", cost: costs.patTester },
        { label: "Thermal Camera (amortized)", cost: costs.thermalCamera },
        { label: "Tool Replacement", cost: costs.toolsReplacement },
      ],
      color: "text-purple-400",
    },
    {
      category: "Software & Subscriptions",
      items: [
        { label: "EICR Software", cost: costs.eicrsoftware },
        { label: "Cloud Storage", cost: costs.cloudStorage },
        { label: "Business Apps", cost: costs.businessApps },
      ],
      color: "text-cyan-400",
    },
    {
      category: "Training & Development",
      items: [
        { label: "Continuous Training", cost: costs.continuousTraining },
        { label: "Certification", cost: costs.certification },
      ],
      color: "text-green-400",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Time Breakdown */}
      <Card className="border-0 sm:border border-elec-yellow/20 rounded-none sm:rounded-xl">
        <CardHeader className="px-4 py-4 sm:px-6 sm:py-5">
          <CardTitle className="text-xl sm:text-lg font-bold text-white flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-400" />
            Where Your Time Actually Goes
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-5 sm:px-6 sm:pb-6 space-y-3">
          {timeBreakdown.map((item, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-lg ${item.bg} border ${item.border}`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className={`text-base sm:text-sm font-semibold ${item.color}`}>
                  {item.label}
                </span>
                <span className={`text-lg font-bold ${item.color}`}>
                  {formatNumber(item.hours, 0)} hrs
                </span>
              </div>
              <div className="w-full bg-elec-dark/50 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${item.bg.replace('/10', '/60')}`}
                  style={{
                    width: `${(item.hours / (calculated.totalWorkingHours + holidayHours + sickHours)) * 100}%`,
                  }}
                />
              </div>
            </div>
          ))}

          <div className="mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30">
            <p className="text-base sm:text-sm text-white/90 leading-relaxed">
              <strong className="text-red-400">The Brutal Truth:</strong> Out of {formatNumber(calculated.totalWorkingHours, 0)} working hours per year, 
              you can only charge for {formatNumber(chargeableHoursPerYear, 0)} hours ({formatNumber(calculated.chargeablePercentage, 0)}%). 
              The other {formatNumber(calculated.nonChargeableHours, 0)} hours are essential but unpaid work.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Cost Breakdown */}
      <Card className="border-0 sm:border border-elec-yellow/20 rounded-none sm:rounded-xl">
        <CardHeader className="px-4 py-4 sm:px-6 sm:py-5">
          <CardTitle className="text-xl sm:text-lg font-bold text-white flex items-center gap-2">
            <PoundSterling className="h-5 w-5 text-green-400" />
            Annual Business Costs Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-5 sm:px-6 sm:pb-6 space-y-5">
          {costBreakdown.map((category, idx) => (
            <div key={idx} className="space-y-2">
              <h4 className={`text-base sm:text-sm font-bold ${category.color} mb-3`}>
                {category.category}
              </h4>
              {category.items.map((item, itemIdx) => (
                <div
                  key={itemIdx}
                  className="flex justify-between items-center py-2 px-3 rounded bg-card/30 border border-primary/10"
                >
                  <span className="text-sm text-white/80">{item.label}</span>
                  <span className="text-sm font-semibold text-white">
                    {formatCurrency(item.cost, 0)}
                  </span>
                </div>
              ))}
              <div className="flex justify-between items-center py-2 px-3 rounded bg-card/50 border border-primary/20 font-semibold">
                <span className="text-sm text-white/90">Subtotal</span>
                <span className={`text-base ${category.color}`}>
                  {formatCurrency(
                    category.items.reduce((sum, item) => sum + item.cost, 0),
                    0
                  )}
                </span>
              </div>
            </div>
          ))}

          <div className="mt-6 p-5 rounded-xl bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/30">
            <div className="flex justify-between items-center mb-3">
              <span className="text-lg font-bold text-white">TOTAL ANNUAL COSTS</span>
              <span className="text-2xl font-bold text-red-400">
                {formatCurrency(calculated.totalAnnualCosts, 0)}
              </span>
            </div>
            <p className="text-sm text-white/80">
              This is what it costs just to stay in business before you pay yourself a penny. 
              Most sparkies forget about half of these costs when setting their rates.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrueRateBreakdown;
