import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IOSInput } from "@/components/ui/ios-input";
import { Switch } from "@/components/ui/switch";
import {
  ChevronLeft,
  RotateCcw,
  ChevronDown,
  TrendingUp,
  Package,
  Car,
  Wrench,
  Shield,
  Briefcase,
  Building2,
  PiggyBank,
  Target,
  Lightbulb,
  AlertTriangle,
  Calendar
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface TaxInputs {
  annualRevenue: number;
  materialCosts: number;
  vehicleExpenses: number;
  toolsEquipment: number;
  insuranceCosts: number;
  professionalFees: number;
  businessType: string;
  vatRegistered: boolean;
  pensionContributions: number;
  savingsGoal: number;
}

const TaxFinancesCalculator = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState<TaxInputs>({
    annualRevenue: 180000,
    materialCosts: 36000,
    vehicleExpenses: 8400,
    toolsEquipment: 3600,
    insuranceCosts: 2400,
    professionalFees: 1800,
    businessType: "sole_trader",
    vatRegistered: true,
    pensionContributions: 0,
    savingsGoal: 10000
  });

  const [expandedSections, setExpandedSections] = useState({
    expenses: true,
    setup: false,
    insights: false
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const updateInput = (field: keyof TaxInputs, value: number | string | boolean) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const resetCalculator = () => {
    setInputs({
      annualRevenue: 180000,
      materialCosts: 36000,
      vehicleExpenses: 8400,
      toolsEquipment: 3600,
      insuranceCosts: 2400,
      professionalFees: 1800,
      businessType: "sole_trader",
      vatRegistered: true,
      pensionContributions: 0,
      savingsGoal: 10000
    });
  };

  // Calculations
  const totalExpenses = inputs.materialCosts + inputs.vehicleExpenses + inputs.toolsEquipment + inputs.insuranceCosts + inputs.professionalFees;
  const taxableProfit = inputs.annualRevenue - totalExpenses;
  const personalAllowance = 12570;

  const calculateIncomeTax = () => {
    const taxableIncome = Math.max(0, taxableProfit - personalAllowance);
    let incomeTax = 0;
    if (taxableIncome > 50270) {
      incomeTax += (taxableIncome - 50270) * 0.40;
      incomeTax += (50270 - personalAllowance) * 0.20;
    } else if (taxableIncome > 0) {
      incomeTax += taxableIncome * 0.20;
    }
    return incomeTax;
  };

  const calculateNationalInsurance = () => {
    const niableProfit = Math.max(0, taxableProfit - 6515);
    let ni = 0;
    if (taxableProfit > 6515) ni += 180;
    if (niableProfit > 12570) {
      const class4Profit = Math.min(niableProfit - 12570, 50270 - 12570);
      ni += class4Profit * 0.09;
      if (niableProfit > 50270) ni += (niableProfit - 50270) * 0.02;
    }
    return ni;
  };

  const vatDue = inputs.vatRegistered ? (inputs.annualRevenue * 0.20) - (totalExpenses * 0.20) : 0;
  const incomeTax = calculateIncomeTax();
  const nationalInsurance = calculateNationalInsurance();
  const totalTax = incomeTax + nationalInsurance + (inputs.vatRegistered ? vatDue : 0);
  const netIncome = taxableProfit - totalTax;
  const monthlyNet = netIncome / 12;
  const savingsRate = monthlyNet > 0 ? ((inputs.savingsGoal / 12) / monthlyNet) * 100 : 0;

  const businessTypes = [
    { value: "sole_trader", label: "Sole Trader" },
    { value: "limited_company", label: "Limited Company" },
    { value: "partnership", label: "Partnership" }
  ];

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
          <h1 className="text-ios-headline text-white font-semibold">Tax & Finances</h1>
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
        {/* Hero Results - Always Visible */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-elec-yellow/20 via-amber-500/15 to-orange-500/10
                     backdrop-blur-xl border border-elec-yellow/30 rounded-3xl p-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-elec-yellow/10 rounded-full blur-3xl" />
          <div className="relative space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-ios-caption-1 text-white/60 uppercase tracking-wide">Net Income</p>
                <p className="text-3xl sm:text-4xl font-bold text-green-400 mt-1 tabular-nums">
                  £{netIncome.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
              </div>
              <div className="text-right">
                <p className="text-ios-caption-1 text-white/60 uppercase tracking-wide">Total Tax</p>
                <p className="text-2xl font-bold text-red-400 mt-1 tabular-nums">
                  £{totalTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 pt-2">
              <div className="bg-white/10 rounded-xl p-2 text-center">
                <p className="text-ios-caption-2 text-white/50">Monthly</p>
                <p className="text-ios-body font-semibold text-white">£{monthlyNet.toFixed(0)}</p>
              </div>
              <div className="bg-white/10 rounded-xl p-2 text-center">
                <p className="text-ios-caption-2 text-white/50">Expenses</p>
                <p className="text-ios-body font-semibold text-white">£{totalExpenses.toLocaleString()}</p>
              </div>
              <div className="bg-white/10 rounded-xl p-2 text-center">
                <p className="text-ios-caption-2 text-white/50">Profit</p>
                <p className="text-ios-body font-semibold text-white">£{taxableProfit.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tax Breakdown Stats */}
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          <div className="flex-shrink-0 bg-white/5 rounded-2xl p-4 min-w-[120px] border border-white/10">
            <p className="text-ios-caption-1 text-white/50">Income Tax</p>
            <p className="text-ios-title-3 font-semibold text-white mt-1">£{incomeTax.toFixed(0)}</p>
          </div>
          <div className="flex-shrink-0 bg-white/5 rounded-2xl p-4 min-w-[120px] border border-white/10">
            <p className="text-ios-caption-1 text-white/50">NI</p>
            <p className="text-ios-title-3 font-semibold text-white mt-1">£{nationalInsurance.toFixed(0)}</p>
          </div>
          {inputs.vatRegistered && (
            <div className="flex-shrink-0 bg-white/5 rounded-2xl p-4 min-w-[120px] border border-white/10">
              <p className="text-ios-caption-1 text-white/50">VAT Due</p>
              <p className="text-ios-title-3 font-semibold text-white mt-1">£{vatDue.toFixed(0)}</p>
            </div>
          )}
          <div className={`flex-shrink-0 rounded-2xl p-4 min-w-[120px] border ${
            savingsRate > 20 ? "bg-green-500/10 border-green-500/30" :
            savingsRate > 10 ? "bg-amber-500/10 border-amber-500/30" :
            "bg-red-500/10 border-red-500/30"
          }`}>
            <p className="text-ios-caption-1 text-white/50">Save Rate</p>
            <p className={`text-ios-title-3 font-semibold mt-1 ${
              savingsRate > 20 ? "text-green-400" : savingsRate > 10 ? "text-amber-400" : "text-red-400"
            }`}>{savingsRate.toFixed(0)}%</p>
          </div>
        </div>

        {/* Revenue Input */}
        <section>
          <p className="text-ios-footnote text-white/50 uppercase tracking-wide px-1 mb-3">
            Revenue
          </p>
          <div className="bg-white/5 rounded-2xl overflow-hidden border border-white/10">
            <IOSInput
              label="Annual Revenue"
              icon={<TrendingUp className="h-5 w-5" />}
              type="number"
              value={inputs.annualRevenue || ""}
              onChange={(e) => updateInput("annualRevenue", Number(e.target.value) || 0)}
              hint="Total income before expenses"
            />
          </div>
        </section>

        {/* Expenses Section - Collapsible */}
        <section>
          <button
            onClick={() => toggleSection("expenses")}
            className="w-full flex items-center justify-between px-1 mb-3 touch-manipulation active:scale-[0.99]"
          >
            <p className="text-ios-footnote text-white/50 uppercase tracking-wide">
              Business Expenses
            </p>
            <motion.div
              animate={{ rotate: expandedSections.expenses ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="h-4 w-4 text-white/50" />
            </motion.div>
          </button>
          <AnimatePresence>
            {expandedSections.expenses && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="bg-white/5 rounded-2xl overflow-hidden border border-white/10 divide-y divide-white/10">
                  <IOSInput
                    label="Materials & Stock"
                    icon={<Package className="h-5 w-5" />}
                    type="number"
                    value={inputs.materialCosts || ""}
                    onChange={(e) => updateInput("materialCosts", Number(e.target.value) || 0)}
                  />
                  <IOSInput
                    label="Vehicle Expenses"
                    icon={<Car className="h-5 w-5" />}
                    type="number"
                    value={inputs.vehicleExpenses || ""}
                    onChange={(e) => updateInput("vehicleExpenses", Number(e.target.value) || 0)}
                  />
                  <IOSInput
                    label="Tools & Equipment"
                    icon={<Wrench className="h-5 w-5" />}
                    type="number"
                    value={inputs.toolsEquipment || ""}
                    onChange={(e) => updateInput("toolsEquipment", Number(e.target.value) || 0)}
                  />
                  <IOSInput
                    label="Insurance"
                    icon={<Shield className="h-5 w-5" />}
                    type="number"
                    value={inputs.insuranceCosts || ""}
                    onChange={(e) => updateInput("insuranceCosts", Number(e.target.value) || 0)}
                  />
                  <IOSInput
                    label="Professional Fees"
                    icon={<Briefcase className="h-5 w-5" />}
                    type="number"
                    value={inputs.professionalFees || ""}
                    onChange={(e) => updateInput("professionalFees", Number(e.target.value) || 0)}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Business Setup - Collapsible */}
        <section>
          <button
            onClick={() => toggleSection("setup")}
            className="w-full flex items-center justify-between px-1 mb-3 touch-manipulation active:scale-[0.99]"
          >
            <p className="text-ios-footnote text-white/50 uppercase tracking-wide">
              Business Setup & Goals
            </p>
            <motion.div
              animate={{ rotate: expandedSections.setup ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="h-4 w-4 text-white/50" />
            </motion.div>
          </button>
          <AnimatePresence>
            {expandedSections.setup && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                {/* Business Type */}
                <div className="bg-white/5 rounded-2xl border border-white/10 p-4">
                  <p className="text-ios-subhead font-medium text-white mb-3">Business Type</p>
                  <div className="grid grid-cols-3 gap-2">
                    {businessTypes.map((type) => (
                      <button
                        key={type.value}
                        onClick={() => updateInput("businessType", type.value)}
                        className={`p-3 rounded-xl border text-center transition-all touch-manipulation active:scale-[0.98] ${
                          inputs.businessType === type.value
                            ? "bg-elec-yellow/20 border-elec-yellow/50"
                            : "bg-white/5 border-white/10"
                        }`}
                      >
                        <Building2 className={`h-5 w-5 mx-auto mb-1 ${
                          inputs.businessType === type.value ? "text-elec-yellow" : "text-white/50"
                        }`} />
                        <p className={`text-ios-caption-1 ${
                          inputs.businessType === type.value ? "text-elec-yellow" : "text-white/70"
                        }`}>{type.label}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* VAT Toggle */}
                <div className="bg-white/5 rounded-2xl border border-white/10 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-ios-body font-medium text-white">VAT Registered</p>
                      <p className="text-ios-caption-1 text-white/50">Turnover &gt;£85,000</p>
                    </div>
                    <Switch
                      checked={inputs.vatRegistered}
                      onCheckedChange={(checked) => updateInput("vatRegistered", checked)}
                      className="data-[state=checked]:bg-elec-yellow"
                    />
                  </div>
                </div>

                {/* Goals */}
                <div className="bg-white/5 rounded-2xl overflow-hidden border border-white/10 divide-y divide-white/10">
                  <IOSInput
                    label="Annual Pension"
                    icon={<PiggyBank className="h-5 w-5" />}
                    type="number"
                    value={inputs.pensionContributions || ""}
                    onChange={(e) => updateInput("pensionContributions", Number(e.target.value) || 0)}
                    hint="Tax-efficient savings"
                  />
                  <IOSInput
                    label="Savings Goal"
                    icon={<Target className="h-5 w-5" />}
                    type="number"
                    value={inputs.savingsGoal || ""}
                    onChange={(e) => updateInput("savingsGoal", Number(e.target.value) || 0)}
                    hint="Annual target"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Insights - Collapsible */}
        <section>
          <button
            onClick={() => toggleSection("insights")}
            className="w-full flex items-center justify-between px-1 mb-3 touch-manipulation active:scale-[0.99]"
          >
            <p className="text-ios-footnote text-white/50 uppercase tracking-wide flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              Tax Tips & Insights
            </p>
            <motion.div
              animate={{ rotate: expandedSections.insights ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="h-4 w-4 text-white/50" />
            </motion.div>
          </button>
          <AnimatePresence>
            {expandedSections.insights && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                {/* Quick Tip Cards */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-4">
                    <p className="text-ios-caption-1 text-blue-400">Pension Savings</p>
                    <p className="text-ios-title-3 font-semibold text-white mt-1">
                      £{(incomeTax * 0.2).toFixed(0)}
                    </p>
                    <p className="text-ios-caption-2 text-white/50 mt-1">Potential tax saved</p>
                  </div>
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4">
                    <p className="text-ios-caption-1 text-amber-400">Emergency Fund</p>
                    <p className="text-ios-title-3 font-semibold text-white mt-1">
                      £{(monthlyNet * 3).toFixed(0)}
                    </p>
                    <p className="text-ios-caption-2 text-white/50 mt-1">3 months target</p>
                  </div>
                </div>

                {/* Key Dates */}
                <div className="bg-white/5 rounded-2xl border border-white/10 p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="h-4 w-4 text-elec-yellow" />
                    <p className="text-ios-subhead font-medium text-white">Key Tax Dates</p>
                  </div>
                  <div className="space-y-2">
                    {[
                      { date: "31 Jan", event: "Self-assessment deadline" },
                      { date: "31 Jul", event: "Payment on account" },
                      { date: "Quarterly", event: "VAT returns due" }
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center">
                        <span className="text-ios-caption-1 text-white/70">{item.event}</span>
                        <span className="text-ios-caption-1 font-medium text-elec-yellow">{item.date}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Warning */}
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-ios-subhead font-medium text-amber-300">Reminder</p>
                      <p className="text-ios-caption-1 text-amber-200/70 mt-1">
                        Keep receipts for 6 years. This calculator provides estimates only - consult an accountant for tax advice.
                      </p>
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

export default TaxFinancesCalculator;