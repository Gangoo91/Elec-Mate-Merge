import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IOSInput } from "@/components/ui/ios-input";
import {
  ChevronLeft,
  RotateCcw,
  TrendingUp,
  AlertTriangle,
  PoundSterling,
  Clock,
  Calendar,
  Percent,
  Briefcase,
  CheckCircle2,
  ChevronDown,
  Info,
  Zap
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface BusinessInputs {
  hourlyRate: number;
  hoursPerWeek: number;
  weeksPerYear: number;
  monthlyExpenses: number;
  materialMarkup: number;
}

const BusinessCalculator = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState<BusinessInputs>({
    hourlyRate: 45,
    hoursPerWeek: 35,
    weeksPerYear: 48,
    monthlyExpenses: 3000,
    materialMarkup: 20
  });
  const [showGuidance, setShowGuidance] = useState(false);
  const [showReference, setShowReference] = useState(false);

  const updateInput = (field: keyof BusinessInputs, value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const resetCalculator = () => {
    setInputs({
      hourlyRate: 45,
      hoursPerWeek: 35,
      weeksPerYear: 48,
      monthlyExpenses: 3000,
      materialMarkup: 20
    });
  };

  // Calculations
  const annualHours = inputs.hoursPerWeek * inputs.weeksPerYear;
  const annualRevenue = annualHours * inputs.hourlyRate;
  const monthlyRevenue = annualRevenue / 12;
  const annualExpenses = inputs.monthlyExpenses * 12;
  const annualProfit = annualRevenue - annualExpenses;
  const monthlyProfit = annualProfit / 12;
  const breakEvenHours = inputs.hourlyRate > 0 ? inputs.monthlyExpenses / inputs.hourlyRate : 0;
  const profitMargin = annualRevenue > 0 ? (annualProfit / annualRevenue) * 100 : 0;

  const getStatus = () => {
    if (profitMargin > 25) return { color: "green", icon: CheckCircle2, text: "Excellent margin" };
    if (profitMargin > 15) return { color: "amber", icon: TrendingUp, text: "Good margin" };
    return { color: "red", icon: AlertTriangle, text: "Needs improvement" };
  };
  const status = getStatus();

  return (
    <div className="min-h-screen bg-gradient-to-b from-elec-dark to-black">
      {/* Sticky Header */}
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
          <h1 className="text-ios-headline text-white font-semibold">Business Finance</h1>
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

      <main className="px-4 py-6 space-y-6 pb-32 sm:pb-6 max-w-2xl mx-auto">
        {/* Hero Result */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-500/20 via-indigo-500/15 to-purple-500/10
                     backdrop-blur-xl border border-blue-500/30 rounded-3xl p-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="relative space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-ios-caption-1 text-white/60 uppercase tracking-wide">Annual Profit</p>
                <p className={`text-3xl sm:text-4xl font-bold mt-1 tabular-nums ${
                  annualProfit >= 0 ? "text-white" : "text-red-400"
                }`}>
                  £{annualProfit.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
              </div>
              <div className={`p-3 rounded-2xl bg-${status.color}-500/20 border border-${status.color}-500/30`}>
                <status.icon className={`h-6 w-6 text-${status.color}-400`} />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-ios-footnote ${
                profitMargin > 15 ? "text-green-400" : "text-amber-400"
              }`}>
                {profitMargin.toFixed(1)}% profit margin • {status.text}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Summary Stats */}
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          <div className="flex-shrink-0 bg-green-500/10 border border-green-500/30 rounded-2xl p-4 min-w-[120px]">
            <p className="text-ios-caption-1 text-green-400">Revenue/yr</p>
            <p className="text-ios-title-3 font-semibold text-white mt-1 tabular-nums">
              £{(annualRevenue / 1000).toFixed(0)}k
            </p>
          </div>
          <div className="flex-shrink-0 bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 min-w-[120px]">
            <p className="text-ios-caption-1 text-amber-400">Monthly</p>
            <p className="text-ios-title-3 font-semibold text-white mt-1 tabular-nums">
              £{monthlyProfit.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </p>
          </div>
          <div className="flex-shrink-0 bg-white/5 border border-white/10 rounded-2xl p-4 min-w-[120px]">
            <p className="text-ios-caption-1 text-white/50">Break-even</p>
            <p className="text-ios-title-3 font-semibold text-white mt-1 tabular-nums">
              {breakEvenHours.toFixed(0)}h/mo
            </p>
          </div>
          <div className="flex-shrink-0 bg-white/5 border border-white/10 rounded-2xl p-4 min-w-[120px]">
            <p className="text-ios-caption-1 text-white/50">Hours/yr</p>
            <p className="text-ios-title-3 font-semibold text-white mt-1 tabular-nums">
              {annualHours.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Income Section */}
        <section>
          <p className="text-ios-footnote text-white/50 uppercase tracking-wide px-1 mb-3">
            Income Parameters
          </p>
          <div className="bg-white/5 rounded-2xl overflow-hidden border border-white/10 divide-y divide-white/10">
            <IOSInput
              label="Hourly Rate"
              icon={<PoundSterling className="h-5 w-5" />}
              type="number"
              value={inputs.hourlyRate || ""}
              onChange={(e) => updateInput("hourlyRate", parseFloat(e.target.value) || 0)}
              hint="Charge-out rate"
            />
            <IOSInput
              label="Billable Hours/Week"
              icon={<Clock className="h-5 w-5" />}
              type="number"
              value={inputs.hoursPerWeek || ""}
              onChange={(e) => updateInput("hoursPerWeek", parseFloat(e.target.value) || 0)}
              hint="Hours you can bill"
            />
            <IOSInput
              label="Working Weeks/Year"
              icon={<Calendar className="h-5 w-5" />}
              type="number"
              value={inputs.weeksPerYear || ""}
              onChange={(e) => updateInput("weeksPerYear", parseFloat(e.target.value) || 0)}
              hint="After holidays"
            />
          </div>
        </section>

        {/* Expenses Section */}
        <section>
          <p className="text-ios-footnote text-white/50 uppercase tracking-wide px-1 mb-3">
            Business Costs
          </p>
          <div className="bg-white/5 rounded-2xl overflow-hidden border border-white/10 divide-y divide-white/10">
            <IOSInput
              label="Monthly Expenses"
              icon={<Briefcase className="h-5 w-5" />}
              type="number"
              value={inputs.monthlyExpenses || ""}
              onChange={(e) => updateInput("monthlyExpenses", parseFloat(e.target.value) || 0)}
              hint="Total running costs"
            />
            <IOSInput
              label="Material Markup"
              icon={<Percent className="h-5 w-5" />}
              type="number"
              value={inputs.materialMarkup || ""}
              onChange={(e) => updateInput("materialMarkup", parseFloat(e.target.value) || 0)}
              hint="Markup on materials"
            />
          </div>
        </section>

        {/* Low Margin Warning */}
        <AnimatePresence>
          {profitMargin < 15 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-amber-500/20 rounded-xl">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                </div>
                <span className="text-ios-headline font-semibold text-amber-300">Improvement Ideas</span>
              </div>
              <ul className="space-y-2">
                {[
                  "Consider increasing your hourly rate",
                  "Look for ways to reduce monthly expenses",
                  "Increase billable hours per week",
                  "Add higher-margin specialisation services"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-ios-body text-amber-200/80">
                    <Zap className="h-4 w-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Collapsible: What This Means */}
        <section>
          <button
            onClick={() => setShowGuidance(!showGuidance)}
            className="w-full flex items-center justify-between bg-blue-500/10 border border-blue-500/30 rounded-2xl p-4 touch-manipulation active:scale-[0.99]"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-xl">
                <Info className="h-5 w-5 text-blue-400" />
              </div>
              <span className="text-ios-headline font-semibold text-blue-300">What This Means</span>
            </div>
            <motion.div animate={{ rotate: showGuidance ? 180 : 0 }}>
              <ChevronDown className="h-5 w-5 text-blue-400" />
            </motion.div>
          </button>
          <AnimatePresence>
            {showGuidance && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-blue-500/5 border-x border-b border-blue-500/20 rounded-b-2xl p-4 -mt-2 pt-6 space-y-3">
                  {[
                    { term: "Break-even hours", desc: "Minimum billable hours/month to cover expenses" },
                    { term: "Margin > 25%", desc: "Healthy buffer for growth and emergencies" },
                    { term: "15-25% margin", desc: "Sustainable but limited room for investment" },
                    { term: "< 15% margin", desc: "Risk of cash flow issues during slow periods" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-ios-subhead font-medium text-blue-300">{item.term}: </span>
                        <span className="text-ios-body text-blue-200/70">{item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Collapsible: UK Reference */}
        <section>
          <button
            onClick={() => setShowReference(!showReference)}
            className="w-full flex items-center justify-between bg-elec-yellow/10 border border-elec-yellow/30 rounded-2xl p-4 touch-manipulation active:scale-[0.99]"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-elec-yellow/20 rounded-xl">
                <PoundSterling className="h-5 w-5 text-elec-yellow" />
              </div>
              <span className="text-ios-headline font-semibold text-amber-300">UK Rate Guide</span>
            </div>
            <motion.div animate={{ rotate: showReference ? 180 : 0 }}>
              <ChevronDown className="h-5 w-5 text-elec-yellow" />
            </motion.div>
          </button>
          <AnimatePresence>
            {showReference && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-elec-yellow/5 border-x border-b border-elec-yellow/20 rounded-b-2xl p-4 -mt-2 pt-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-ios-subhead font-medium text-amber-300 mb-2">Typical Rates</p>
                      <div className="space-y-1 text-ios-caption-1 text-amber-200/70">
                        <p>Electrician: £40-60/hr</p>
                        <p>Emergency: £80-120/hr</p>
                        <p>Specialist: £60-100/hr</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-ios-subhead font-medium text-amber-300 mb-2">Expenses Guide</p>
                      <div className="space-y-1 text-ios-caption-1 text-amber-200/70">
                        <p>Van: £300-500/mo</p>
                        <p>Insurance: £100-200/mo</p>
                        <p>Tools: £100-200/mo</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-ios-subhead font-medium text-amber-300 mb-2">Utilisation</p>
                      <div className="space-y-1 text-ios-caption-1 text-amber-200/70">
                        <p>Target: 70-80%</p>
                        <p>Admin time: 20-30%</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-ios-subhead font-medium text-amber-300 mb-2">Margins</p>
                      <div className="space-y-1 text-ios-caption-1 text-amber-200/70">
                        <p>Materials: 15-25%</p>
                        <p>Overall: 20-30%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Desktop Reset */}
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

      {/* Bottom Action Bar - Mobile */}
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

export default BusinessCalculator;
