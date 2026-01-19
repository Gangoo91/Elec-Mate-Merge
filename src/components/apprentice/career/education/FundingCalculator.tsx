import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Progress } from "@/components/ui/progress";
import {
  Calculator,
  ArrowLeft,
  GraduationCap,
  PoundSterling,
  Briefcase,
  MapPin,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  ExternalLink,
  Clock,
  Building2,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

// 2025 Funding rates
const FUNDING_2025 = {
  undergraduate: { tuitionMax: 9250, maintenanceMax: 13022 },
  postgraduate: { maxLoan: 12858 },
  advancedLearner: { repaymentThreshold: 27295 },
  apprenticeship: { maxFunding: 27000 },
};

interface FundingResult {
  totalCost: number;
  totalFunding: number;
  fundingGap: number;
  coverage: number;
  sources: { name: string; amount: number; type: string }[];
  monthlyRepayment: number;
}

// Quick funding type cards
const FUNDING_TYPES = [
  {
    id: "level6",
    title: "Degree (Level 6)",
    subtitle: "Bachelor's, BEng",
    amount: "£9,250/year",
    icon: GraduationCap,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
  },
  {
    id: "level7",
    title: "Master's (Level 7)",
    subtitle: "MSc, MBA",
    amount: "£12,858",
    icon: Sparkles,
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
  },
  {
    id: "hnc",
    title: "HNC/HND (Level 4-5)",
    subtitle: "Higher National",
    amount: "£6,500-£9,250",
    icon: Building2,
    color: "text-green-400",
    bgColor: "bg-green-500/10",
  },
  {
    id: "professional",
    title: "Professional",
    subtitle: "PRINCE2, NEBOSH",
    amount: "£500-£5,000",
    icon: Briefcase,
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
  },
];

const FundingCalculator = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<FundingResult | null>(null);

  // Form state
  const [courseCost, setCourseCost] = useState("");
  const [salary, setSalary] = useState("");
  const [employerSupport, setEmployerSupport] = useState("");

  const calculateFunding = () => {
    const cost = parseFloat(courseCost) || 0;
    const currentSalary = parseFloat(salary) || 0;
    const employer = parseFloat(employerSupport) || 0;

    let totalFunding = employer;
    const sources: { name: string; amount: number; type: string }[] = [];

    if (employer > 0) {
      sources.push({ name: "Employer Support", amount: employer, type: "employer" });
    }

    // Add funding based on type
    switch (selectedType) {
      case "level6":
        const tuition = Math.min(cost - employer, FUNDING_2025.undergraduate.tuitionMax);
        if (tuition > 0) {
          sources.push({ name: "Tuition Fee Loan", amount: tuition, type: "loan" });
          totalFunding += tuition;
        }
        break;
      case "level7":
        const pgLoan = Math.min(cost - employer, FUNDING_2025.postgraduate.maxLoan);
        if (pgLoan > 0) {
          sources.push({ name: "Postgraduate Loan", amount: pgLoan, type: "loan" });
          totalFunding += pgLoan;
        }
        break;
      case "hnc":
        const allLoan = Math.min(cost - employer, 9250);
        if (allLoan > 0) {
          sources.push({ name: "Advanced Learner Loan", amount: allLoan, type: "loan" });
          totalFunding += allLoan;
        }
        break;
      case "professional":
        // Skills Bank / Professional grants
        const skillsBank = Math.min(cost * 0.5, 2000);
        if (skillsBank > 0) {
          sources.push({ name: "Skills Bank Grant", amount: skillsBank, type: "grant" });
          totalFunding += skillsBank;
        }
        break;
    }

    const fundingGap = Math.max(0, cost - totalFunding);
    const coverage = cost > 0 ? Math.min((totalFunding / cost) * 100, 100) : 0;

    // Monthly repayment (9% above threshold)
    const aboveThreshold = Math.max(0, currentSalary - FUNDING_2025.advancedLearner.repaymentThreshold);
    const monthlyRepayment = (aboveThreshold * 0.09) / 12;

    setResult({
      totalCost: cost,
      totalFunding,
      fundingGap,
      coverage,
      sources,
      monthlyRepayment,
    });
    setShowResult(true);
  };

  const resetCalculator = () => {
    setSelectedType(null);
    setShowCalculator(false);
    setShowResult(false);
    setResult(null);
    setCourseCost("");
    setSalary("");
    setEmployerSupport("");
  };

  return (
    <div className="space-y-4">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-gradient-to-br from-purple-900/40 via-background to-background border border-purple-500/20 rounded-xl"
      >
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-purple-500 via-violet-400 to-purple-500" />

        <div className="p-4 sm:p-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/20 border border-purple-400/30">
              <Calculator className="h-5 w-5 text-purple-300" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-white">
                Funding <span className="text-purple-400">Calculator</span>
              </h2>
              <p className="text-xs text-white/60 hidden sm:block">2025 rates • Find your funding options</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex gap-2 overflow-x-auto mt-3 -mx-4 px-4 pb-1 sm:mx-0 sm:px-0 scrollbar-hide">
            <div className="flex-shrink-0 flex items-center gap-2 bg-white/5 rounded-full px-3 py-1.5 border border-white/10">
              <PoundSterling className="h-4 w-4 text-green-400" />
              <span className="text-sm font-medium text-white">£9,250</span>
              <span className="text-xs text-white/50">Undergrad</span>
            </div>
            <div className="flex-shrink-0 flex items-center gap-2 bg-white/5 rounded-full px-3 py-1.5 border border-white/10">
              <TrendingUp className="h-4 w-4 text-purple-400" />
              <span className="text-sm font-medium text-white">£12,858</span>
              <span className="text-xs text-white/50">Postgrad</span>
            </div>
            <div className="flex-shrink-0 flex items-center gap-2 bg-white/5 rounded-full px-3 py-1.5 border border-white/10">
              <Clock className="h-4 w-4 text-amber-400" />
              <span className="text-sm font-medium text-white">£27,295</span>
              <span className="text-xs text-white/50">Threshold</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Funding Type Selection */}
      <div className="space-y-3">
        <p className="text-sm text-white/70 px-1">Select your qualification type:</p>

        <div className="grid grid-cols-2 gap-3">
          {FUNDING_TYPES.map((type) => (
            <motion.button
              key={type.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setSelectedType(type.id);
                setShowCalculator(true);
              }}
              className={cn(
                "relative p-4 rounded-xl text-left transition-all touch-manipulation",
                "bg-white/5 border border-white/10 hover:bg-white/10",
                selectedType === type.id && "ring-2 ring-purple-500 border-purple-500/50"
              )}
            >
              <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center mb-2", type.bgColor)}>
                <type.icon className={cn("h-5 w-5", type.color)} />
              </div>
              <h3 className="font-medium text-white text-sm">{type.title}</h3>
              <p className="text-xs text-white/50 mt-0.5">{type.subtitle}</p>
              <p className={cn("text-sm font-semibold mt-2", type.color)}>{type.amount}</p>
              <ChevronRight className="absolute top-4 right-3 h-4 w-4 text-white/30" />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="space-y-2">
        <p className="text-xs text-white/50 px-1">Official resources:</p>
        <div className="flex gap-2 overflow-x-auto -mx-4 px-4 pb-1 scrollbar-hide">
          {[
            { label: "Student Finance", url: "https://www.gov.uk/student-finance" },
            { label: "Learner Loans", url: "https://www.gov.uk/advanced-learner-loan" },
            { label: "Skills Bank", url: "https://www.gov.uk/guidance/skills-bank" },
            { label: "IET Funding", url: "https://www.theiet.org/membership/awards-scholarships/" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white/70 hover:bg-white/10 transition-colors touch-manipulation"
            >
              <ExternalLink className="h-3 w-3" />
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Calculator Bottom Sheet */}
      <Sheet open={showCalculator} onOpenChange={setShowCalculator}>
        <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl p-0 bg-background">
          <div className="flex flex-col h-full">
            <SheetHeader className="p-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowCalculator(false)}
                  className="h-9 w-9 text-white/70"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <SheetTitle className="text-lg text-white">Calculate Funding</SheetTitle>
              </div>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto p-4 space-y-5">
              {/* Selected Type Badge */}
              {selectedType && (
                <div className="flex items-center gap-2 p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl">
                  {FUNDING_TYPES.find((t) => t.id === selectedType) && (
                    <>
                      <div className="p-2 rounded-lg bg-purple-500/20">
                        {(() => {
                          const Icon = FUNDING_TYPES.find((t) => t.id === selectedType)!.icon;
                          return <Icon className="h-4 w-4 text-purple-300" />;
                        })()}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">
                          {FUNDING_TYPES.find((t) => t.id === selectedType)!.title}
                        </p>
                        <p className="text-xs text-white/50">
                          {FUNDING_TYPES.find((t) => t.id === selectedType)!.amount}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Form */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm text-white/80">Course Cost (£) *</Label>
                  <div className="relative">
                    <PoundSterling className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                    <Input
                      type="number"
                      placeholder="e.g. 9250"
                      value={courseCost}
                      onChange={(e) => setCourseCost(e.target.value)}
                      className="h-12 pl-9 bg-white/5 border-white/10 text-white text-base placeholder:text-white/40 focus:border-purple-500/50 touch-manipulation"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-white/80">Your Annual Salary (£)</Label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                    <Input
                      type="number"
                      placeholder="e.g. 32000"
                      value={salary}
                      onChange={(e) => setSalary(e.target.value)}
                      className="h-12 pl-9 bg-white/5 border-white/10 text-white text-base placeholder:text-white/40 focus:border-purple-500/50 touch-manipulation"
                    />
                  </div>
                  <p className="text-xs text-white/50">Used to calculate repayments</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-white/80">Employer Contribution (£)</Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                    <Input
                      type="number"
                      placeholder="e.g. 2000 (optional)"
                      value={employerSupport}
                      onChange={(e) => setEmployerSupport(e.target.value)}
                      className="h-12 pl-9 bg-white/5 border-white/10 text-white text-base placeholder:text-white/40 focus:border-purple-500/50 touch-manipulation"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Calculate Button */}
            <div className="p-4 border-t border-white/10 bg-background/95 backdrop-blur-lg">
              <Button
                onClick={calculateFunding}
                disabled={!courseCost}
                className="w-full h-12 bg-purple-500 hover:bg-purple-600 text-white font-medium touch-manipulation"
              >
                <Calculator className="h-4 w-4 mr-2" />
                Calculate My Funding
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Result Bottom Sheet */}
      <Sheet open={showResult} onOpenChange={setShowResult}>
        <SheetContent side="bottom" className="h-[90vh] rounded-t-2xl p-0 bg-background">
          <div className="flex flex-col h-full">
            <SheetHeader className="p-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowResult(false)}
                  className="h-9 w-9 text-white/70"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <SheetTitle className="text-lg text-white">Your Funding Plan</SheetTitle>
              </div>
            </SheetHeader>

            {result && (
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Summary Cards */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                    <p className="text-xs text-white/50 mb-1">Course Cost</p>
                    <p className="text-xl font-bold text-white">
                      £{result.totalCost.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl">
                    <p className="text-xs text-purple-300 mb-1">Available Funding</p>
                    <p className="text-xl font-bold text-purple-400">
                      £{result.totalFunding.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Coverage Progress */}
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/70">Funding Coverage</span>
                    <span className="text-sm font-semibold text-white">{result.coverage.toFixed(0)}%</span>
                  </div>
                  <Progress value={result.coverage} className="h-3 bg-white/10" />
                  {result.fundingGap > 0 ? (
                    <div className="flex items-center gap-2 text-amber-400">
                      <AlertTriangle className="h-4 w-4" />
                      <span className="text-sm">Gap: £{result.fundingGap.toLocaleString()}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-green-400">
                      <CheckCircle2 className="h-4 w-4" />
                      <span className="text-sm">Fully covered!</span>
                    </div>
                  )}
                </div>

                {/* Funding Sources */}
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-white px-1">Funding Sources</h3>
                  {result.sources.map((source, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-xl"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center",
                            source.type === "loan" && "bg-blue-500/20",
                            source.type === "grant" && "bg-green-500/20",
                            source.type === "employer" && "bg-amber-500/20"
                          )}
                        >
                          {source.type === "loan" && <PoundSterling className="h-4 w-4 text-blue-400" />}
                          {source.type === "grant" && <Sparkles className="h-4 w-4 text-green-400" />}
                          {source.type === "employer" && <Building2 className="h-4 w-4 text-amber-400" />}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{source.name}</p>
                          <p className="text-xs text-white/50 capitalize">{source.type}</p>
                        </div>
                      </div>
                      <p className="text-sm font-semibold text-white">
                        £{source.amount.toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Repayment Info */}
                {result.monthlyRepayment > 0 && (
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-blue-400" />
                      <h4 className="text-sm font-medium text-white">Estimated Repayment</h4>
                    </div>
                    <p className="text-2xl font-bold text-blue-400">
                      £{result.monthlyRepayment.toFixed(0)}<span className="text-sm font-normal">/month</span>
                    </p>
                    <p className="text-xs text-white/50 mt-1">
                      9% of earnings above £{FUNDING_2025.advancedLearner.repaymentThreshold.toLocaleString()}
                    </p>
                  </div>
                )}

                {/* Tips */}
                <div className="p-4 bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-xl">
                  <h4 className="text-sm font-medium text-white mb-2">Next Steps</h4>
                  <ul className="space-y-2 text-sm text-white/70">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                      Apply early - funding applications can take 6-8 weeks
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                      Ask your employer about training budgets
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                      Check IET/professional body grants
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="p-4 border-t border-white/10 bg-background/95 backdrop-blur-lg space-y-2">
              <Button
                onClick={resetCalculator}
                variant="outline"
                className="w-full h-11 border-white/20 text-white hover:bg-white/10 touch-manipulation"
              >
                Calculate Another
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default FundingCalculator;
