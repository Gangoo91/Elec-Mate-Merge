import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IOSInput } from "@/components/ui/ios-input";
import { Switch } from "@/components/ui/switch";
import {
  ChevronLeft,
  RotateCcw,
  CreditCard,
  AlertTriangle,
  Clock,
  PoundSterling,
  FileText,
  Shield,
  Users,
  TrendingDown,
  Gavel,
  Mail,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Percent
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface DebtInputs {
  totalOutstanding: number;
  numberOfDebtors: number;
  averageDebtAge: number;
  largestSingleDebt: number;
  adminCosts: number;
  legalFees: number;
  collectionAgencyFees: number;
  courtCosts: number;
  monthlyRevenue: number;
  creditTerms: number;
  badDebtProvision: number;
  earlySettlementDiscount: number;
  paymentPlanOption: boolean;
  collectionAgencyRate: number;
}

type TabType = "overview" | "recovery" | "prevention";

const DebtRecoveryCalculator = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [inputs, setInputs] = useState<DebtInputs>({
    totalOutstanding: 25000,
    numberOfDebtors: 8,
    averageDebtAge: 65,
    largestSingleDebt: 8500,
    adminCosts: 150,
    legalFees: 500,
    collectionAgencyFees: 200,
    courtCosts: 300,
    monthlyRevenue: 15000,
    creditTerms: 30,
    badDebtProvision: 2.5,
    earlySettlementDiscount: 10,
    paymentPlanOption: true,
    collectionAgencyRate: 15
  });

  const updateInput = (field: keyof DebtInputs, value: number | boolean) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const resetCalculator = () => {
    setInputs({
      totalOutstanding: 25000,
      numberOfDebtors: 8,
      averageDebtAge: 65,
      largestSingleDebt: 8500,
      adminCosts: 150,
      legalFees: 500,
      collectionAgencyFees: 200,
      courtCosts: 300,
      monthlyRevenue: 15000,
      creditTerms: 30,
      badDebtProvision: 2.5,
      earlySettlementDiscount: 10,
      paymentPlanOption: true,
      collectionAgencyRate: 15
    });
  };

  // Calculations
  const averageDebtSize = inputs.numberOfDebtors > 0 ? inputs.totalOutstanding / inputs.numberOfDebtors : 0;
  const debtToRevenueRatio = inputs.monthlyRevenue > 0 ? (inputs.totalOutstanding / (inputs.monthlyRevenue * 12)) * 100 : 0;
  const totalRecoveryCosts = inputs.adminCosts + inputs.legalFees + inputs.collectionAgencyFees + inputs.courtCosts;

  // Recovery scenarios
  const earlySettlementAmount = inputs.totalOutstanding * (1 - inputs.earlySettlementDiscount / 100);
  const collectionAgencyRecovery = inputs.totalOutstanding * (1 - inputs.collectionAgencyRate / 100);
  const expectedRecoveryRate = inputs.averageDebtAge > 90 ? 0.4 : inputs.averageDebtAge > 60 ? 0.6 : 0.8;
  const likelyRecoveryAmount = inputs.totalOutstanding * expectedRecoveryRate;

  // Net calculations
  const netRecoveryAfterCosts = likelyRecoveryAmount - totalRecoveryCosts;
  const cashFlowImpact = inputs.monthlyRevenue > 0 ? (inputs.totalOutstanding / inputs.monthlyRevenue) * 30 : 0;
  const annualBadDebtWriteOff = (inputs.monthlyRevenue * 12) * (inputs.badDebtProvision / 100);

  // Status
  const getStatus = () => {
    if (debtToRevenueRatio > 15) return { color: "red", icon: XCircle, text: "Critical debt level" };
    if (debtToRevenueRatio > 10) return { color: "amber", icon: AlertTriangle, text: "High debt exposure" };
    return { color: "green", icon: CheckCircle2, text: "Manageable debt" };
  };
  const status = getStatus();

  // Recovery timeline stages
  const recoveryStages = [
    { days: 7, label: "Reminder", icon: Mail, action: "Friendly reminder call/email" },
    { days: 14, label: "Formal", icon: FileText, action: "Formal demand letter" },
    { days: 30, label: "Escalate", icon: AlertTriangle, action: "Final warning before action" },
    { days: 45, label: "Legal", icon: Gavel, action: "Letter before action" },
    { days: 60, label: "Court", icon: Shield, action: "Court proceedings" }
  ];

  const tabs = [
    { id: "overview" as TabType, label: "Overview" },
    { id: "recovery" as TabType, label: "Recovery" },
    { id: "prevention" as TabType, label: "Prevention" }
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
          <h1 className="text-ios-headline text-white font-semibold">Debt Recovery</h1>
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
          className="bg-gradient-to-br from-red-500/20 via-orange-500/15 to-amber-500/10
                     backdrop-blur-xl border border-red-500/30 rounded-3xl p-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl" />
          <div className="relative space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-ios-caption-1 text-white/60 uppercase tracking-wide">Outstanding Debt</p>
                <p className="text-3xl sm:text-4xl font-bold text-white mt-1 tabular-nums">
                  £{inputs.totalOutstanding.toLocaleString()}
                </p>
              </div>
              <div className={`p-3 rounded-2xl bg-${status.color}-500/20 border border-${status.color}-500/30`}>
                <status.icon className={`h-6 w-6 text-${status.color}-400`} />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-ios-footnote ${
                netRecoveryAfterCosts >= 0 ? "text-green-400" : "text-red-400"
              }`}>
                Expected recovery: £{netRecoveryAfterCosts.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Summary Stats */}
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          <div className="flex-shrink-0 bg-white/5 rounded-2xl p-4 min-w-[110px] border border-white/10">
            <p className="text-ios-caption-1 text-white/50">Debtors</p>
            <p className="text-ios-title-3 font-semibold text-white mt-1">{inputs.numberOfDebtors}</p>
          </div>
          <div className="flex-shrink-0 bg-white/5 rounded-2xl p-4 min-w-[110px] border border-white/10">
            <p className="text-ios-caption-1 text-white/50">Avg Age</p>
            <p className={`text-ios-title-3 font-semibold mt-1 ${
              inputs.averageDebtAge > 90 ? "text-red-400" :
              inputs.averageDebtAge > 60 ? "text-amber-400" : "text-white"
            }`}>{inputs.averageDebtAge}d</p>
          </div>
          <div className="flex-shrink-0 bg-white/5 rounded-2xl p-4 min-w-[110px] border border-white/10">
            <p className="text-ios-caption-1 text-white/50">Recovery</p>
            <p className="text-ios-title-3 font-semibold text-green-400 mt-1">{(expectedRecoveryRate * 100).toFixed(0)}%</p>
          </div>
          <div className="flex-shrink-0 bg-white/5 rounded-2xl p-4 min-w-[110px] border border-white/10">
            <p className="text-ios-caption-1 text-white/50">Cash Impact</p>
            <p className="text-ios-title-3 font-semibold text-white mt-1">{cashFlowImpact.toFixed(0)}d</p>
          </div>
        </div>

        {/* iOS Segmented Control */}
        <div className="bg-white/10 rounded-xl p-1 flex relative">
          <motion.div
            className="absolute top-1 bottom-1 bg-elec-yellow rounded-lg"
            initial={false}
            animate={{
              left: activeTab === "overview" ? "4px" : activeTab === "recovery" ? "calc(33.33% + 2px)" : "calc(66.66% + 2px)",
              width: "calc(33.33% - 4px)"
            }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative z-10 flex-1 py-2.5 text-ios-subhead font-medium transition-colors touch-manipulation ${
                activeTab === tab.id ? "text-black" : "text-white/70"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Debt Position */}
              <section>
                <p className="text-ios-footnote text-white/50 uppercase tracking-wide px-1 mb-3">
                  Current Debt Position
                </p>
                <div className="bg-white/5 rounded-2xl overflow-hidden border border-white/10 divide-y divide-white/10">
                  <IOSInput
                    label="Total Outstanding"
                    icon={<PoundSterling className="h-5 w-5" />}
                    type="number"
                    value={inputs.totalOutstanding || ""}
                    onChange={(e) => updateInput("totalOutstanding", parseFloat(e.target.value) || 0)}
                    hint="Total owed"
                  />
                  <IOSInput
                    label="Number of Debtors"
                    icon={<Users className="h-5 w-5" />}
                    type="number"
                    value={inputs.numberOfDebtors || ""}
                    onChange={(e) => updateInput("numberOfDebtors", parseFloat(e.target.value) || 0)}
                    hint="How many owe"
                  />
                  <IOSInput
                    label="Average Debt Age"
                    icon={<Clock className="h-5 w-5" />}
                    type="number"
                    value={inputs.averageDebtAge || ""}
                    onChange={(e) => updateInput("averageDebtAge", parseFloat(e.target.value) || 0)}
                    hint="Days overdue"
                  />
                  <IOSInput
                    label="Largest Single Debt"
                    icon={<TrendingDown className="h-5 w-5" />}
                    type="number"
                    value={inputs.largestSingleDebt || ""}
                    onChange={(e) => updateInput("largestSingleDebt", parseFloat(e.target.value) || 0)}
                    hint="Biggest debtor"
                  />
                </div>
              </section>

              {/* Business Context */}
              <section>
                <p className="text-ios-footnote text-white/50 uppercase tracking-wide px-1 mb-3">
                  Business Context
                </p>
                <div className="bg-white/5 rounded-2xl overflow-hidden border border-white/10 divide-y divide-white/10">
                  <IOSInput
                    label="Monthly Revenue"
                    icon={<PoundSterling className="h-5 w-5" />}
                    type="number"
                    value={inputs.monthlyRevenue || ""}
                    onChange={(e) => updateInput("monthlyRevenue", parseFloat(e.target.value) || 0)}
                    hint="Average monthly"
                  />
                  <IOSInput
                    label="Credit Terms"
                    icon={<Clock className="h-5 w-5" />}
                    type="number"
                    value={inputs.creditTerms || ""}
                    onChange={(e) => updateInput("creditTerms", parseFloat(e.target.value) || 0)}
                    hint="Days allowed"
                  />
                  <IOSInput
                    label="Bad Debt Provision"
                    icon={<Percent className="h-5 w-5" />}
                    type="number"
                    value={inputs.badDebtProvision || ""}
                    onChange={(e) => updateInput("badDebtProvision", parseFloat(e.target.value) || 0)}
                    hint="Annual %"
                  />
                </div>
              </section>

              {/* Debt Analysis */}
              <section>
                <p className="text-ios-footnote text-white/50 uppercase tracking-wide px-1 mb-3">
                  Analysis
                </p>
                <div className="bg-white/5 rounded-2xl border border-white/10 p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-ios-body text-white/70">Average Debt Size</span>
                    <span className="text-ios-body font-medium text-white tabular-nums">
                      £{averageDebtSize.toFixed(0)}
                    </span>
                  </div>
                  <div className="h-px bg-white/10" />
                  <div className="flex justify-between items-center">
                    <span className="text-ios-body text-white/70">Debt/Revenue Ratio</span>
                    <span className={`text-ios-body font-medium tabular-nums ${
                      debtToRevenueRatio > 15 ? "text-red-400" :
                      debtToRevenueRatio > 10 ? "text-amber-400" : "text-green-400"
                    }`}>
                      {debtToRevenueRatio.toFixed(1)}%
                    </span>
                  </div>
                  <div className="h-px bg-white/10" />
                  <div className="flex justify-between items-center">
                    <span className="text-ios-body text-white/70">Annual Write-off</span>
                    <span className="text-ios-body font-medium text-white tabular-nums">
                      £{annualBadDebtWriteOff.toFixed(0)}
                    </span>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {activeTab === "recovery" && (
            <motion.div
              key="recovery"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Recovery Timeline */}
              <section>
                <p className="text-ios-footnote text-white/50 uppercase tracking-wide px-1 mb-3">
                  Recovery Timeline
                </p>
                <div className="space-y-3">
                  {recoveryStages.map((stage, index) => {
                    const isActive = inputs.averageDebtAge >= stage.days;
                    const isPast = inputs.averageDebtAge > (recoveryStages[index + 1]?.days ?? 999);
                    return (
                      <motion.div
                        key={stage.days}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`relative flex items-center gap-4 p-4 rounded-2xl border ${
                          isActive && !isPast
                            ? "bg-elec-yellow/10 border-elec-yellow/30"
                            : isPast
                            ? "bg-green-500/10 border-green-500/30"
                            : "bg-white/5 border-white/10"
                        }`}
                      >
                        <div className={`p-2.5 rounded-xl ${
                          isActive && !isPast
                            ? "bg-elec-yellow/20"
                            : isPast
                            ? "bg-green-500/20"
                            : "bg-white/10"
                        }`}>
                          <stage.icon className={`h-5 w-5 ${
                            isActive && !isPast
                              ? "text-elec-yellow"
                              : isPast
                              ? "text-green-400"
                              : "text-white/50"
                          }`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className={`text-ios-subhead font-medium ${
                              isActive ? "text-white" : "text-white/50"
                            }`}>
                              {stage.label}
                            </span>
                            <span className={`text-ios-caption-2 ${
                              isActive && !isPast ? "text-elec-yellow" : "text-white/40"
                            }`}>
                              Day {stage.days}
                            </span>
                          </div>
                          <p className="text-ios-caption-1 text-white/50 truncate">
                            {stage.action}
                          </p>
                        </div>
                        {isPast && (
                          <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0" />
                        )}
                        {isActive && !isPast && (
                          <ArrowRight className="h-5 w-5 text-elec-yellow flex-shrink-0" />
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </section>

              {/* Recovery Costs */}
              <section>
                <p className="text-ios-footnote text-white/50 uppercase tracking-wide px-1 mb-3">
                  Recovery Costs
                </p>
                <div className="bg-white/5 rounded-2xl overflow-hidden border border-white/10 divide-y divide-white/10">
                  <IOSInput
                    label="Admin Costs"
                    icon={<FileText className="h-5 w-5" />}
                    type="number"
                    value={inputs.adminCosts || ""}
                    onChange={(e) => updateInput("adminCosts", parseFloat(e.target.value) || 0)}
                    hint="Internal time"
                  />
                  <IOSInput
                    label="Legal Fees"
                    icon={<Gavel className="h-5 w-5" />}
                    type="number"
                    value={inputs.legalFees || ""}
                    onChange={(e) => updateInput("legalFees", parseFloat(e.target.value) || 0)}
                    hint="Solicitor costs"
                  />
                  <IOSInput
                    label="Collection Agency"
                    icon={<Users className="h-5 w-5" />}
                    type="number"
                    value={inputs.collectionAgencyFees || ""}
                    onChange={(e) => updateInput("collectionAgencyFees", parseFloat(e.target.value) || 0)}
                    hint="Agency fees"
                  />
                  <IOSInput
                    label="Court Costs"
                    icon={<Shield className="h-5 w-5" />}
                    type="number"
                    value={inputs.courtCosts || ""}
                    onChange={(e) => updateInput("courtCosts", parseFloat(e.target.value) || 0)}
                    hint="Filing fees"
                  />
                </div>
                <div className="mt-3 bg-white/5 rounded-2xl border border-white/10 p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-ios-body text-white/70">Total Recovery Costs</span>
                    <span className="text-ios-headline font-semibold text-red-400 tabular-nums">
                      £{totalRecoveryCosts.toFixed(0)}
                    </span>
                  </div>
                </div>
              </section>

              {/* Recovery Strategies */}
              <section>
                <p className="text-ios-footnote text-white/50 uppercase tracking-wide px-1 mb-3">
                  Strategy Options
                </p>
                <div className="bg-white/5 rounded-2xl overflow-hidden border border-white/10 divide-y divide-white/10">
                  <IOSInput
                    label="Early Settlement Discount"
                    icon={<Percent className="h-5 w-5" />}
                    type="number"
                    value={inputs.earlySettlementDiscount || ""}
                    onChange={(e) => updateInput("earlySettlementDiscount", parseFloat(e.target.value) || 0)}
                    hint="Discount offered"
                  />
                  <IOSInput
                    label="Agency Commission"
                    icon={<Percent className="h-5 w-5" />}
                    type="number"
                    value={inputs.collectionAgencyRate || ""}
                    onChange={(e) => updateInput("collectionAgencyRate", parseFloat(e.target.value) || 0)}
                    hint="Collection %"
                  />
                  <div className="flex items-center justify-between px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="text-white/50">
                        <CreditCard className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-ios-body font-medium text-white">Payment Plans</p>
                        <p className="text-ios-caption-1 text-white/50">Offer instalments</p>
                      </div>
                    </div>
                    <Switch
                      checked={inputs.paymentPlanOption}
                      onCheckedChange={(checked) => updateInput("paymentPlanOption", checked)}
                      className="data-[state=checked]:bg-elec-yellow"
                    />
                  </div>
                </div>
              </section>

              {/* Scenario Comparison */}
              <section>
                <p className="text-ios-footnote text-white/50 uppercase tracking-wide px-1 mb-3">
                  Recovery Scenarios
                </p>
                <div className="grid gap-3">
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-blue-500/20 rounded-xl">
                        <Mail className="h-4 w-4 text-blue-400" />
                      </div>
                      <span className="text-ios-subhead font-medium text-blue-300">Early Settlement</span>
                    </div>
                    <p className="text-ios-caption-1 text-blue-200/70">{inputs.earlySettlementDiscount}% discount offered</p>
                    <p className="text-xl font-bold text-white mt-1 tabular-nums">
                      £{earlySettlementAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </p>
                  </div>

                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-amber-500/20 rounded-xl">
                        <Users className="h-4 w-4 text-amber-400" />
                      </div>
                      <span className="text-ios-subhead font-medium text-amber-300">Collection Agency</span>
                    </div>
                    <p className="text-ios-caption-1 text-amber-200/70">{inputs.collectionAgencyRate}% commission</p>
                    <p className="text-xl font-bold text-white mt-1 tabular-nums">
                      £{collectionAgencyRecovery.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </p>
                  </div>

                  <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-green-500/20 rounded-xl">
                        <Gavel className="h-4 w-4 text-green-400" />
                      </div>
                      <span className="text-ios-subhead font-medium text-green-300">Legal Action</span>
                    </div>
                    <p className="text-ios-caption-1 text-green-200/70">Court + costs ({(expectedRecoveryRate * 100).toFixed(0)}% recovery)</p>
                    <p className="text-xl font-bold text-white mt-1 tabular-nums">
                      £{netRecoveryAfterCosts.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </p>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {activeTab === "prevention" && (
            <motion.div
              key="prevention"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Credit Control */}
              <section>
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-blue-500/20 rounded-xl">
                      <Shield className="h-5 w-5 text-blue-400" />
                    </div>
                    <span className="text-ios-headline font-semibold text-blue-300">Credit Control</span>
                  </div>
                  <ul className="space-y-2">
                    {[
                      "Credit checks for new customers",
                      "Clear payment terms on invoices",
                      "Regular debt aging reports",
                      "Automated reminder systems",
                      "Retention of title clauses"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-ios-body text-blue-200/80">
                        <CheckCircle2 className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* Payment Security */}
              <section>
                <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-green-500/20 rounded-xl">
                      <PoundSterling className="h-5 w-5 text-green-400" />
                    </div>
                    <span className="text-ios-headline font-semibold text-green-300">Payment Security</span>
                  </div>
                  <ul className="space-y-2">
                    {[
                      "Request deposits on large jobs",
                      "Stage payments for major projects",
                      "Direct debit arrangements",
                      "Personal guarantees where appropriate",
                      "Trade credit insurance"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-ios-body text-green-200/80">
                        <CheckCircle2 className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* Warning Signs */}
              <section>
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-amber-500/20 rounded-xl">
                      <AlertTriangle className="h-5 w-5 text-amber-400" />
                    </div>
                    <span className="text-ios-headline font-semibold text-amber-300">Early Warning Signs</span>
                  </div>
                  <ul className="space-y-2">
                    {[
                      "Payments becoming consistently late",
                      "Partial payments without explanation",
                      "Difficulty contacting customer",
                      "Changes in payment method",
                      "Complaints about work quality (delaying tactics)"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-ios-body text-amber-200/80">
                        <AlertTriangle className="h-4 w-4 text-amber-400 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* Recovery Actions */}
              <section>
                <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-red-500/20 rounded-xl">
                      <Gavel className="h-5 w-5 text-red-400" />
                    </div>
                    <span className="text-ios-headline font-semibold text-red-300">Recovery Actions</span>
                  </div>
                  <ul className="space-y-2">
                    {[
                      "Contact within 7 days of due date",
                      "Formal demand after 14 days",
                      "Consider early settlement discount",
                      "Legal letter before action",
                      "Court proceedings if economical"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-ios-body text-red-200/80">
                        <ArrowRight className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>

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

export default DebtRecoveryCalculator;
