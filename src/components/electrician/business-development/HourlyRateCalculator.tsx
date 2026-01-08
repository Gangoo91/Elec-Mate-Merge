import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IOSInput } from "@/components/ui/ios-input";
import {
  ChevronLeft,
  RotateCcw,
  PoundSterling,
  Building2,
  Wrench,
  Shield,
  Car,
  GraduationCap,
  Clock,
  Calendar,
  TrendingUp,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface BusinessInputs {
  annualSalary: number;
  annualOverheads: number;
  toolsAndEquipment: number;
  insurance: number;
  vehicleCosts: number;
  training: number;
  billableHoursPerWeek: number;
  weeksWorkedPerYear: number;
  desiredProfitMargin: number;
}

const HourlyRateCalculator = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState<BusinessInputs>({
    annualSalary: 35000,
    annualOverheads: 8000,
    toolsAndEquipment: 3000,
    insurance: 1500,
    vehicleCosts: 4000,
    training: 1000,
    billableHoursPerWeek: 35,
    weeksWorkedPerYear: 48,
    desiredProfitMargin: 20
  });

  const updateInput = (field: keyof BusinessInputs, value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const resetCalculator = () => {
    setInputs({
      annualSalary: 35000,
      annualOverheads: 8000,
      toolsAndEquipment: 3000,
      insurance: 1500,
      vehicleCosts: 4000,
      training: 1000,
      billableHoursPerWeek: 35,
      weeksWorkedPerYear: 48,
      desiredProfitMargin: 20
    });
  };

  // Calculations
  const totalAnnualCosts = inputs.annualSalary + inputs.annualOverheads + inputs.toolsAndEquipment +
                          inputs.insurance + inputs.vehicleCosts + inputs.training;
  const totalBillableHours = inputs.billableHoursPerWeek * inputs.weeksWorkedPerYear;
  const breakEvenRate = totalBillableHours > 0 ? totalAnnualCosts / totalBillableHours : 0;
  const recommendedRate = breakEvenRate * (1 + inputs.desiredProfitMargin / 100);

  // Market comparison rates
  const traineeRate = 25;
  const qualifiedRate = 45;
  const experiencedRate = 65;

  const isCompetitive = recommendedRate <= experiencedRate;

  return (
    <div className="min-h-screen bg-gradient-to-b from-elec-dark to-black">
      {/* Sticky Header - iOS Navigation Bar */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/80 border-b border-white/10">
        <div className="px-4 py-3 flex items-center justify-between max-w-2xl mx-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="text-white/70 hover:text-white hover:bg-white/10 active:scale-[0.98] touch-manipulation"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-ios-headline text-white font-semibold">Hourly Rate</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={resetCalculator}
            className="text-white/70 hover:text-white hover:bg-white/10 active:scale-[0.98] touch-manipulation"
          >
            <RotateCcw className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6 space-y-6 pb-32 sm:pb-6 max-w-2xl mx-auto">

        {/* Hero Result Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="bg-gradient-to-br from-elec-yellow/20 via-amber-500/15 to-orange-500/10
                     backdrop-blur-xl border border-elec-yellow/30 rounded-3xl p-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-elec-yellow/10 rounded-full blur-3xl" />
          <div className="relative">
            <p className="text-ios-caption-1 text-white/60 uppercase tracking-wide">Recommended Rate</p>
            <p className="text-4xl sm:text-5xl font-bold text-elec-yellow mt-1 tabular-nums">
              £{recommendedRate.toFixed(2)}
              <span className="text-lg text-white/50 font-normal">/hour</span>
            </p>
            <div className="flex items-center gap-2 mt-3">
              {isCompetitive ? (
                <>
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                  <span className="text-ios-footnote text-green-400">Competitive with market</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="h-4 w-4 text-amber-400" />
                  <span className="text-ios-footnote text-amber-400">Above market average</span>
                </>
              )}
            </div>
          </div>
        </motion.div>

        {/* Summary Stats - Horizontal Scroll */}
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex-shrink-0 bg-white/5 rounded-2xl p-4 min-w-[140px] border border-white/10"
          >
            <p className="text-ios-caption-1 text-white/50">Annual Costs</p>
            <p className="text-ios-title-3 font-semibold text-white mt-1">£{totalAnnualCosts.toLocaleString()}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="flex-shrink-0 bg-white/5 rounded-2xl p-4 min-w-[140px] border border-white/10"
          >
            <p className="text-ios-caption-1 text-white/50">Billable Hours</p>
            <p className="text-ios-title-3 font-semibold text-white mt-1">{totalBillableHours.toLocaleString()}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex-shrink-0 bg-white/5 rounded-2xl p-4 min-w-[140px] border border-white/10"
          >
            <p className="text-ios-caption-1 text-white/50">Break-Even</p>
            <p className="text-ios-title-3 font-semibold text-white mt-1">£{breakEvenRate.toFixed(2)}</p>
          </motion.div>
        </div>

        {/* Income Section */}
        <section>
          <p className="text-ios-footnote text-white/50 uppercase tracking-wide px-1 mb-3">
            Income Target
          </p>
          <div className="bg-white/5 rounded-2xl overflow-hidden border border-white/10">
            <IOSInput
              label="Annual Salary/Drawings"
              icon={<PoundSterling className="h-5 w-5" />}
              type="number"
              value={inputs.annualSalary || ""}
              onChange={(e) => updateInput("annualSalary", parseFloat(e.target.value) || 0)}
              hint="Your target annual income"
            />
          </div>
        </section>

        {/* Business Costs Section */}
        <section>
          <p className="text-ios-footnote text-white/50 uppercase tracking-wide px-1 mb-3">
            Business Costs (Annual)
          </p>
          <div className="bg-white/5 rounded-2xl overflow-hidden border border-white/10 divide-y divide-white/10">
            <IOSInput
              label="Overheads"
              icon={<Building2 className="h-5 w-5" />}
              type="number"
              value={inputs.annualOverheads || ""}
              onChange={(e) => updateInput("annualOverheads", parseFloat(e.target.value) || 0)}
              hint="Office, utilities, admin"
            />
            <IOSInput
              label="Tools & Equipment"
              icon={<Wrench className="h-5 w-5" />}
              type="number"
              value={inputs.toolsAndEquipment || ""}
              onChange={(e) => updateInput("toolsAndEquipment", parseFloat(e.target.value) || 0)}
              hint="Annual replacements"
            />
            <IOSInput
              label="Insurance"
              icon={<Shield className="h-5 w-5" />}
              type="number"
              value={inputs.insurance || ""}
              onChange={(e) => updateInput("insurance", parseFloat(e.target.value) || 0)}
              hint="Public liability, tools"
            />
            <IOSInput
              label="Vehicle Costs"
              icon={<Car className="h-5 w-5" />}
              type="number"
              value={inputs.vehicleCosts || ""}
              onChange={(e) => updateInput("vehicleCosts", parseFloat(e.target.value) || 0)}
              hint="Fuel, maintenance"
            />
            <IOSInput
              label="Training & CPD"
              icon={<GraduationCap className="h-5 w-5" />}
              type="number"
              value={inputs.training || ""}
              onChange={(e) => updateInput("training", parseFloat(e.target.value) || 0)}
              hint="Courses, certifications"
            />
          </div>
        </section>

        {/* Working Hours Section */}
        <section>
          <p className="text-ios-footnote text-white/50 uppercase tracking-wide px-1 mb-3">
            Working Hours
          </p>
          <div className="bg-white/5 rounded-2xl overflow-hidden border border-white/10 divide-y divide-white/10">
            <IOSInput
              label="Billable Hours/Week"
              icon={<Clock className="h-5 w-5" />}
              type="number"
              value={inputs.billableHoursPerWeek || ""}
              onChange={(e) => updateInput("billableHoursPerWeek", parseFloat(e.target.value) || 0)}
              hint="Hours you can charge"
            />
            <IOSInput
              label="Weeks Worked/Year"
              icon={<Calendar className="h-5 w-5" />}
              type="number"
              value={inputs.weeksWorkedPerYear || ""}
              onChange={(e) => updateInput("weeksWorkedPerYear", parseFloat(e.target.value) || 0)}
              hint="Typically 48-50 weeks"
            />
          </div>
        </section>

        {/* Profit Target Section */}
        <section>
          <p className="text-ios-footnote text-white/50 uppercase tracking-wide px-1 mb-3">
            Profit Target
          </p>
          <div className="bg-white/5 rounded-2xl overflow-hidden border border-white/10">
            <IOSInput
              label="Profit Margin %"
              icon={<TrendingUp className="h-5 w-5" />}
              type="number"
              value={inputs.desiredProfitMargin || ""}
              onChange={(e) => updateInput("desiredProfitMargin", parseFloat(e.target.value) || 0)}
              hint="Target profit percentage"
            />
          </div>
        </section>

        {/* Market Comparison */}
        <section>
          <p className="text-ios-footnote text-white/50 uppercase tracking-wide px-1 mb-3">
            UK Market Rates
          </p>
          <div className="bg-white/5 rounded-2xl border border-white/10 p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-ios-body text-white/70">Trainee</span>
              <span className="text-ios-body font-medium text-white">£{traineeRate}/hr</span>
            </div>
            <div className="h-px bg-white/10" />
            <div className="flex justify-between items-center">
              <span className="text-ios-body text-white/70">Qualified</span>
              <span className="text-ios-body font-medium text-white">£{qualifiedRate}/hr</span>
            </div>
            <div className="h-px bg-white/10" />
            <div className="flex justify-between items-center">
              <span className="text-ios-body text-white/70">Experienced</span>
              <span className="text-ios-body font-medium text-white">£{experiencedRate}/hr</span>
            </div>
          </div>
          <p className="text-ios-caption-2 text-white/40 mt-2 px-1">
            Indicative UK averages. Adjust for your location and specialisation.
          </p>
        </section>

        {/* Desktop Reset Button */}
        <div className="hidden sm:block">
          <Button
            onClick={resetCalculator}
            variant="outline"
            className="w-full h-12 border-white/20 text-white hover:bg-white/10 active:scale-[0.98] touch-manipulation"
          >
            Reset Calculator
          </Button>
        </div>
      </main>

      {/* Bottom Action Bar - Mobile Only */}
      <div className="fixed bottom-0 left-0 right-0 sm:hidden bg-black/90 backdrop-blur-xl border-t border-white/10 p-4 pb-safe">
        <Button
          onClick={resetCalculator}
          className="w-full h-14 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold text-ios-body active:scale-[0.98] touch-manipulation"
        >
          Reset Calculator
        </Button>
      </div>
    </div>
  );
};

export default HourlyRateCalculator;