import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IOSInput } from "@/components/ui/ios-input";
import {
  ChevronLeft,
  RotateCcw,
  Building2,
  Briefcase,
  PoundSterling,
  Percent,
  Receipt,
  Package,
  Clock,
  Car,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  XCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface BusinessBreakEven {
  fixedCosts: number;
  variableCostPercentage: number;
  averageJobValue: number;
}

interface JobBreakEven {
  materialCosts: number;
  labourHours: number;
  hourlyRate: number;
  overheads: number;
  desiredProfit: number;
}

const BreakEvenCalculator = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"business" | "job">("business");

  const [businessInputs, setBusinessInputs] = useState<BusinessBreakEven>({
    fixedCosts: 4000,
    variableCostPercentage: 35,
    averageJobValue: 800
  });

  const [jobInputs, setJobInputs] = useState<JobBreakEven>({
    materialCosts: 200,
    labourHours: 8,
    hourlyRate: 45,
    overheads: 100,
    desiredProfit: 150
  });

  const updateBusinessInput = (field: keyof BusinessBreakEven, value: number) => {
    setBusinessInputs(prev => ({ ...prev, [field]: value }));
  };

  const updateJobInput = (field: keyof JobBreakEven, value: number) => {
    setJobInputs(prev => ({ ...prev, [field]: value }));
  };

  const resetCalculator = () => {
    if (activeTab === "business") {
      setBusinessInputs({
        fixedCosts: 4000,
        variableCostPercentage: 35,
        averageJobValue: 800
      });
    } else {
      setJobInputs({
        materialCosts: 200,
        labourHours: 8,
        hourlyRate: 45,
        overheads: 100,
        desiredProfit: 150
      });
    }
  };

  // Business Break-Even Calculations
  const contributionMargin = (100 - businessInputs.variableCostPercentage) / 100;
  const contributionPerJob = businessInputs.averageJobValue * contributionMargin;
  const breakEvenJobs = contributionPerJob > 0 ? businessInputs.fixedCosts / contributionPerJob : 0;
  const breakEvenRevenue = breakEvenJobs * businessInputs.averageJobValue;
  const jobsPerWeek = breakEvenJobs / 4.33;

  // Job Break-Even Calculations
  const labourCosts = jobInputs.labourHours * jobInputs.hourlyRate;
  const totalCosts = jobInputs.materialCosts + labourCosts + jobInputs.overheads;
  const breakEvenPrice = totalCosts;
  const targetPrice = totalCosts + jobInputs.desiredProfit;
  const profitMargin = targetPrice > 0 ? (jobInputs.desiredProfit / targetPrice) * 100 : 0;

  // Status helpers
  const getBusinessStatus = () => {
    if (jobsPerWeek <= 2) return { color: "green", icon: CheckCircle2, text: "Achievable target" };
    if (jobsPerWeek <= 4) return { color: "amber", icon: AlertTriangle, text: "Moderate target" };
    return { color: "red", icon: XCircle, text: "High target" };
  };

  const getJobStatus = () => {
    if (profitMargin >= 20) return { color: "green", icon: CheckCircle2, text: "Healthy margin" };
    if (profitMargin >= 10) return { color: "amber", icon: AlertTriangle, text: "Moderate margin" };
    return { color: "red", icon: XCircle, text: "Low margin" };
  };

  const businessStatus = getBusinessStatus();
  const jobStatus = getJobStatus();

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
          <h1 className="text-ios-headline text-white font-semibold">Break-Even</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={resetCalculator}
            className="text-white/70 hover:text-white hover:bg-white/10 active:scale-[0.98] touch-manipulation"
          >
            <RotateCcw className="h-5 w-5" />
          </Button>
        </div>

        {/* iOS Segmented Control */}
        <div className="px-4 pb-3 max-w-2xl mx-auto">
          <div className="bg-white/10 rounded-xl p-1 flex relative">
            <motion.div
              className="absolute top-1 bottom-1 bg-elec-yellow rounded-lg"
              initial={false}
              animate={{
                left: activeTab === "business" ? "4px" : "50%",
                width: "calc(50% - 4px)"
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
            <button
              onClick={() => setActiveTab("business")}
              className={`flex-1 py-2.5 px-4 rounded-lg text-ios-subhead font-medium relative z-10 transition-colors touch-manipulation active:scale-[0.98] ${
                activeTab === "business" ? "text-black" : "text-white/70"
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <Building2 className="h-4 w-4" />
                Business
              </span>
            </button>
            <button
              onClick={() => setActiveTab("job")}
              className={`flex-1 py-2.5 px-4 rounded-lg text-ios-subhead font-medium relative z-10 transition-colors touch-manipulation active:scale-[0.98] ${
                activeTab === "job" ? "text-black" : "text-white/70"
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <Briefcase className="h-4 w-4" />
                Job
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6 space-y-6 pb-32 sm:pb-6 max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          {activeTab === "business" ? (
            <motion.div
              key="business"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Business Hero Result */}
              <div className="bg-gradient-to-br from-elec-yellow/20 via-amber-500/15 to-orange-500/10
                             backdrop-blur-xl border border-elec-yellow/30 rounded-3xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-elec-yellow/10 rounded-full blur-3xl" />
                <div className="relative">
                  <p className="text-ios-caption-1 text-white/60 uppercase tracking-wide">Break-Even Target</p>
                  <p className="text-4xl sm:text-5xl font-bold text-elec-yellow mt-1 tabular-nums">
                    {Math.ceil(breakEvenJobs)}
                    <span className="text-lg text-white/50 font-normal"> jobs/month</span>
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <businessStatus.icon className={`h-4 w-4 text-${businessStatus.color}-400`} />
                    <span className={`text-ios-footnote text-${businessStatus.color}-400`}>{businessStatus.text}</span>
                  </div>
                </div>
              </div>

              {/* Business Stats Scroll */}
              <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
                <div className="flex-shrink-0 bg-white/5 rounded-2xl p-4 min-w-[140px] border border-white/10">
                  <p className="text-ios-caption-1 text-white/50">Jobs/Week</p>
                  <p className="text-ios-title-3 font-semibold text-white mt-1">{jobsPerWeek.toFixed(1)}</p>
                </div>
                <div className="flex-shrink-0 bg-white/5 rounded-2xl p-4 min-w-[140px] border border-white/10">
                  <p className="text-ios-caption-1 text-white/50">Revenue Target</p>
                  <p className="text-ios-title-3 font-semibold text-white mt-1">£{breakEvenRevenue.toFixed(0)}</p>
                </div>
                <div className="flex-shrink-0 bg-white/5 rounded-2xl p-4 min-w-[140px] border border-white/10">
                  <p className="text-ios-caption-1 text-white/50">Margin</p>
                  <p className="text-ios-title-3 font-semibold text-white mt-1">{(contributionMargin * 100).toFixed(0)}%</p>
                </div>
              </div>

              {/* Business Inputs */}
              <section>
                <p className="text-ios-footnote text-white/50 uppercase tracking-wide px-1 mb-3">
                  Monthly Costs
                </p>
                <div className="bg-white/5 rounded-2xl overflow-hidden border border-white/10 divide-y divide-white/10">
                  <IOSInput
                    label="Fixed Costs (£)"
                    icon={<PoundSterling className="h-5 w-5" />}
                    type="number"
                    value={businessInputs.fixedCosts || ""}
                    onChange={(e) => updateBusinessInput("fixedCosts", parseFloat(e.target.value) || 0)}
                    hint="Rent, insurance, vehicle, utilities"
                  />
                  <IOSInput
                    label="Variable Costs (%)"
                    icon={<Percent className="h-5 w-5" />}
                    type="number"
                    value={businessInputs.variableCostPercentage || ""}
                    onChange={(e) => updateBusinessInput("variableCostPercentage", parseFloat(e.target.value) || 0)}
                    hint="Materials, subs as % of job"
                  />
                  <IOSInput
                    label="Average Job Value (£)"
                    icon={<Receipt className="h-5 w-5" />}
                    type="number"
                    value={businessInputs.averageJobValue || ""}
                    onChange={(e) => updateBusinessInput("averageJobValue", parseFloat(e.target.value) || 0)}
                    hint="Typical invoice amount"
                  />
                </div>
              </section>

              {/* Business Analysis */}
              <section>
                <p className="text-ios-footnote text-white/50 uppercase tracking-wide px-1 mb-3">
                  Analysis
                </p>
                <div className="bg-white/5 rounded-2xl border border-white/10 p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-ios-body text-white/70">Contribution/Job</span>
                    <span className="text-ios-body font-medium text-white">£{contributionPerJob.toFixed(2)}</span>
                  </div>
                  <div className="h-px bg-white/10" />
                  <div className="flex justify-between items-center">
                    <span className="text-ios-body text-white/70">Monthly Revenue</span>
                    <span className="text-ios-body font-medium text-white">£{breakEvenRevenue.toFixed(0)}</span>
                  </div>
                </div>
              </section>
            </motion.div>
          ) : (
            <motion.div
              key="job"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Job Hero Result */}
              <div className="bg-gradient-to-br from-elec-yellow/20 via-amber-500/15 to-orange-500/10
                             backdrop-blur-xl border border-elec-yellow/30 rounded-3xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-elec-yellow/10 rounded-full blur-3xl" />
                <div className="relative">
                  <p className="text-ios-caption-1 text-white/60 uppercase tracking-wide">Target Quote</p>
                  <p className="text-4xl sm:text-5xl font-bold text-elec-yellow mt-1 tabular-nums">
                    £{targetPrice.toFixed(2)}
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <jobStatus.icon className={`h-4 w-4 text-${jobStatus.color}-400`} />
                    <span className={`text-ios-footnote text-${jobStatus.color}-400`}>
                      {profitMargin.toFixed(0)}% profit margin
                    </span>
                  </div>
                </div>
              </div>

              {/* Job Stats Scroll */}
              <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
                <div className="flex-shrink-0 bg-red-500/10 border border-red-500/30 rounded-2xl p-4 min-w-[140px]">
                  <p className="text-ios-caption-1 text-red-400">Minimum</p>
                  <p className="text-ios-title-3 font-semibold text-white mt-1">£{breakEvenPrice.toFixed(0)}</p>
                </div>
                <div className="flex-shrink-0 bg-white/5 rounded-2xl p-4 min-w-[140px] border border-white/10">
                  <p className="text-ios-caption-1 text-white/50">Total Costs</p>
                  <p className="text-ios-title-3 font-semibold text-white mt-1">£{totalCosts.toFixed(0)}</p>
                </div>
                <div className="flex-shrink-0 bg-green-500/10 border border-green-500/30 rounded-2xl p-4 min-w-[140px]">
                  <p className="text-ios-caption-1 text-green-400">Profit</p>
                  <p className="text-ios-title-3 font-semibold text-white mt-1">£{jobInputs.desiredProfit}</p>
                </div>
              </div>

              {/* Job Costs */}
              <section>
                <p className="text-ios-footnote text-white/50 uppercase tracking-wide px-1 mb-3">
                  Job Costs
                </p>
                <div className="bg-white/5 rounded-2xl overflow-hidden border border-white/10 divide-y divide-white/10">
                  <IOSInput
                    label="Materials (£)"
                    icon={<Package className="h-5 w-5" />}
                    type="number"
                    value={jobInputs.materialCosts || ""}
                    onChange={(e) => updateJobInput("materialCosts", parseFloat(e.target.value) || 0)}
                    hint="Cost of materials"
                  />
                  <IOSInput
                    label="Labour Hours"
                    icon={<Clock className="h-5 w-5" />}
                    type="number"
                    step="0.5"
                    value={jobInputs.labourHours || ""}
                    onChange={(e) => updateJobInput("labourHours", parseFloat(e.target.value) || 0)}
                    hint="Time required"
                  />
                  <IOSInput
                    label="Hourly Rate (£)"
                    icon={<PoundSterling className="h-5 w-5" />}
                    type="number"
                    value={jobInputs.hourlyRate || ""}
                    onChange={(e) => updateJobInput("hourlyRate", parseFloat(e.target.value) || 0)}
                    hint="Your rate"
                  />
                  <IOSInput
                    label="Overheads (£)"
                    icon={<Car className="h-5 w-5" />}
                    type="number"
                    value={jobInputs.overheads || ""}
                    onChange={(e) => updateJobInput("overheads", parseFloat(e.target.value) || 0)}
                    hint="Travel, van costs"
                  />
                </div>
              </section>

              {/* Profit Target */}
              <section>
                <p className="text-ios-footnote text-white/50 uppercase tracking-wide px-1 mb-3">
                  Profit Target
                </p>
                <div className="bg-white/5 rounded-2xl overflow-hidden border border-white/10">
                  <IOSInput
                    label="Desired Profit (£)"
                    icon={<TrendingUp className="h-5 w-5" />}
                    type="number"
                    value={jobInputs.desiredProfit || ""}
                    onChange={(e) => updateJobInput("desiredProfit", parseFloat(e.target.value) || 0)}
                    hint="Target profit for this job"
                  />
                </div>
              </section>

              {/* Job Cost Breakdown */}
              <section>
                <p className="text-ios-footnote text-white/50 uppercase tracking-wide px-1 mb-3">
                  Cost Breakdown
                </p>
                <div className="bg-white/5 rounded-2xl border border-white/10 p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-ios-body text-white/70">Materials</span>
                    <span className="text-ios-body font-medium text-white">£{jobInputs.materialCosts.toFixed(2)}</span>
                  </div>
                  <div className="h-px bg-white/10" />
                  <div className="flex justify-between items-center">
                    <span className="text-ios-body text-white/70">Labour ({jobInputs.labourHours}h × £{jobInputs.hourlyRate})</span>
                    <span className="text-ios-body font-medium text-white">£{labourCosts.toFixed(2)}</span>
                  </div>
                  <div className="h-px bg-white/10" />
                  <div className="flex justify-between items-center">
                    <span className="text-ios-body text-white/70">Overheads</span>
                    <span className="text-ios-body font-medium text-white">£{jobInputs.overheads.toFixed(2)}</span>
                  </div>
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>

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

export default BreakEvenCalculator;