import { ParsedCostAnalysis } from "@/utils/cost-analysis-parser";
import { motion } from "framer-motion";
import {
  Layers, PoundSterling, MessageSquare, ClipboardList,
  ChevronDown, TrendingUp, Shield, Sparkles
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import OriginalRequestCard from "./OriginalRequestCard";
import QuoteHeroCard from "./QuoteHeroCard";
import AIAnalysisSummary from "./AIAnalysisSummary";
import QuickMetricsCard from "./QuickMetricsCard";
import KeyActionItems from "./KeyActionItems";
import ClientQuoteSummary from "./ClientQuoteSummary";
import PricingOptionsTiers from "./PricingOptionsTiers";
import CostBreakdownCard from "./CostBreakdownCard";
import ClientQuoteJustificationCard from "./ClientQuoteJustificationCard";
import MaterialsTable from "./MaterialsTable";
import LabourPlanTable from "./LabourPlanTable";
import JobComplexityCard from "./JobComplexityCard";
import RiskAssessmentTable from "./RiskAssessmentTable";
import PricingConfidenceCard from "./PricingConfidenceCard";
import UpsellOpportunitiesCard from "./UpsellOpportunitiesCard";
import FutureWorkPipelineCard from "./FutureWorkPipelineCard";
import ClientConversationsCard from "./ClientConversationsCard";
import SiteArrivalChecklist from "./SiteArrivalChecklist";
import PaymentTermsCard from "./PaymentTermsCard";
import JobNotesCard from "./JobNotesCard";
import PostJobReviewCard from "./PostJobReviewCard";
import TradeIntelligenceCard from "./TradeIntelligenceCard";

interface ComprehensiveResultsViewProps {
  analysis: ParsedCostAnalysis;
  structuredData: any;
  projectContext: any;
  originalQuery?: string;
  onNewAnalysis: () => void;
}

const ComprehensiveResultsView = ({ 
  analysis, 
  structuredData, 
  projectContext,
  originalQuery,
  onNewAnalysis 
}: ComprehensiveResultsViewProps) => {
  
  const profitability = structuredData?.profitabilityAnalysis;
  const selectedTier = structuredData?.recommendedQuote?.tier || 'standard';
  const selectedAmount = profitability?.quoteTiers?.standard?.price 
    || structuredData?.recommendedQuote?.amount 
    || profitability?.quoteTiers?.target?.price  // Fallback to old tier name if exists
    || analysis.totalCost;

  // Calculate derived metrics
  const totalLabourHours = structuredData?.labour?.tasks?.reduce((sum: number, t: any) => 
    sum + (t.hours || 0), 0) || 0;
  
  const calculateMargin = (total: number, breakEven: number) => {
    if (!breakEven || breakEven === 0) return 0;
    return ((total - breakEven) / total) * 100;
  };

  const calculateProfit = (total: number, breakEven: number) => {
    return total - breakEven;
  };

  const calculateProfitPerHour = (profit: number, hours: number) => {
    if (hours === 0) return 0;
    return profit / hours;
  };

  const breakEven = profitability?.breakEvenPoint || profitability?.baseQuote?.subtotal || analysis.subtotal;
  const margin = calculateMargin(selectedAmount, breakEven);
  const profit = calculateProfit(selectedAmount, breakEven);
  const profitPerHour = calculateProfitPerHour(profit, totalLabourHours);
  
  const avgConfidence = structuredData?.confidence 
    ? Math.round((structuredData.confidence.materials?.level + structuredData.confidence.labour?.level) / 2)
    : 75;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="space-y-5 pb-6 sm:space-y-5 sm:pb-8">
      {/* ======= ALWAYS VISIBLE SECTION ======= */}

      {/* 0. Original User Request */}
      {originalQuery && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <OriginalRequestCard
            query={originalQuery}
            projectContext={projectContext}
            timestamp={new Date().toISOString()}
          />
        </motion.div>
      )}

      {/* 1. HERO: Recommended Quote (BIG & PROMINENT) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <QuoteHeroCard
          amount={selectedAmount}
          tier={selectedTier}
          profit={profit}
          margin={margin}
          profitPerHour={profitPerHour}
          confidence={avgConfidence}
          totalLabourHours={totalLabourHours}
        />
      </motion.div>

      {/* 2. AI Analysis Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <AIAnalysisSummary jobDescription={structuredData?.response} />
      </motion.div>

      {/* 3. Quick Metrics & Key Actions (Always visible) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        <QuickMetricsCard
          complexity={structuredData?.complexity}
          confidence={structuredData?.confidence}
          riskAssessment={structuredData?.riskAssessment}
        />
        <KeyActionItems structuredData={structuredData} />
      </motion.div>

      {/* ======= ACCORDION SECTIONS ======= */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Accordion type="multiple" defaultValue={["pricing"]} className="space-y-3">

          {/* PRICING & TIERS */}
          <AccordionItem value="pricing" className="border-none">
            <AccordionTrigger className="bg-gradient-to-r from-elec-yellow/10 to-amber-500/5 hover:from-elec-yellow/15 hover:to-amber-500/10 rounded-xl px-4 py-3 border border-elec-yellow/20 [&[data-state=open]]:rounded-b-none">
              <div className="flex items-center gap-3 flex-1">
                <div className="p-2 rounded-lg bg-elec-yellow/20">
                  <PoundSterling className="h-5 w-5 text-elec-yellow" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="font-semibold text-white">Pricing Options</span>
                  <span className="text-xs text-white/50">3 tier pricing strategy</span>
                </div>
                <Badge className="ml-auto mr-2 bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30">
                  {formatCurrency(selectedAmount)}
                </Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent className="bg-white/[0.02] border border-t-0 border-white/10 rounded-b-xl px-4 pt-4 pb-2">
              <PricingOptionsTiers
                profitability={profitability}
                selectedTier={selectedTier}
                explanation={structuredData?.recommendedQuote?.reasoning}
                breakEven={breakEven}
                totalLabourHours={totalLabourHours}
                projectType={projectContext?.projectType}
                jobDescription={structuredData?.response}
              />
            </AccordionContent>
          </AccordionItem>

          {/* COST BREAKDOWN */}
          <AccordionItem value="costs" className="border-none">
            <AccordionTrigger className="bg-gradient-to-r from-blue-500/10 to-cyan-500/5 hover:from-blue-500/15 hover:to-cyan-500/10 rounded-xl px-4 py-3 border border-blue-500/20 [&[data-state=open]]:rounded-b-none">
              <div className="flex items-center gap-3 flex-1">
                <div className="p-2 rounded-lg bg-blue-500/20">
                  <Layers className="h-5 w-5 text-blue-400" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="font-semibold text-white">Cost Breakdown</span>
                  <span className="text-xs text-white/50">Materials, labour & overheads</span>
                </div>
                <Badge className="ml-auto mr-2 bg-blue-500/20 text-blue-400 border-blue-500/30">
                  {formatCurrency(breakEven)}
                </Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent className="bg-white/[0.02] border border-t-0 border-white/10 rounded-b-xl px-4 pt-4 pb-2 space-y-4">
              <CostBreakdownCard
                materialsNet={analysis.materialsTotal}
                materialsMarkup={structuredData?.materials?.markup || 0}
                labourHours={totalLabourHours}
                labourTotal={analysis.labourTotal}
                overheads={profitability?.jobOverheads}
                contingencyPercent={structuredData?.confidence?.contingency?.percentage || 5}
                breakEven={breakEven}
                labourRate={totalLabourHours > 0 ? analysis.labourTotal / totalLabourHours : 0}
                region={projectContext?.region || 'other'}
                experienceLevel={projectContext?.experienceLevel || 'qualified'}
                jobDuration={totalLabourHours > 0 ? totalLabourHours / 8 : 0}
              />
              <MaterialsTable items={analysis.materials} />
              <LabourPlanTable tasks={structuredData?.labour?.tasks || []} />
            </AccordionContent>
          </AccordionItem>

          {/* BUSINESS INTELLIGENCE */}
          <AccordionItem value="intelligence" className="border-none">
            <AccordionTrigger className="bg-gradient-to-r from-purple-500/10 to-pink-500/5 hover:from-purple-500/15 hover:to-pink-500/10 rounded-xl px-4 py-3 border border-purple-500/20 [&[data-state=open]]:rounded-b-none">
              <div className="flex items-center gap-3 flex-1">
                <div className="p-2 rounded-lg bg-purple-500/20">
                  <TrendingUp className="h-5 w-5 text-purple-400" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="font-semibold text-white">Business Intelligence</span>
                  <span className="text-xs text-white/50">Profit analysis, risks & confidence</span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="bg-white/[0.02] border border-t-0 border-white/10 rounded-b-xl px-4 pt-4 pb-2 space-y-4">
              {structuredData?.tradeIntelligence && (
                <TradeIntelligenceCard tradeIntelligence={structuredData.tradeIntelligence} />
              )}
              {structuredData?.complexity && (
                <JobComplexityCard complexity={structuredData.complexity} />
              )}
              {structuredData?.riskAssessment?.risks?.length > 0 && (
                <RiskAssessmentTable risks={structuredData.riskAssessment.risks} />
              )}
              {structuredData?.confidence && (
                <PricingConfidenceCard confidence={structuredData.confidence} />
              )}
            </AccordionContent>
          </AccordionItem>

          {/* CLIENT TOOLS */}
          <AccordionItem value="client" className="border-none">
            <AccordionTrigger className="bg-gradient-to-r from-emerald-500/10 to-green-500/5 hover:from-emerald-500/15 hover:to-green-500/10 rounded-xl px-4 py-3 border border-emerald-500/20 [&[data-state=open]]:rounded-b-none">
              <div className="flex items-center gap-3 flex-1">
                <div className="p-2 rounded-lg bg-emerald-500/20">
                  <MessageSquare className="h-5 w-5 text-emerald-400" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="font-semibold text-white">Client Tools</span>
                  <span className="text-xs text-white/50">Justification, objections & upsells</span>
                </div>
                {structuredData?.upsells?.length > 0 && (
                  <Badge className="ml-auto mr-2 bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                    {structuredData.upsells.length} upsells
                  </Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent className="bg-white/[0.02] border border-t-0 border-white/10 rounded-b-xl px-4 pt-4 pb-2 space-y-4">
              <ClientQuoteJustificationCard
                materialsNet={analysis.materialsTotal}
                materialsMarkup={structuredData?.materials?.markup || 15}
                materialsTotal={analysis.materialsTotal * (1 + ((structuredData?.materials?.markup || 15) / 100))}
                labourHours={totalLabourHours}
                labourRate={totalLabourHours > 0 ? analysis.labourTotal / totalLabourHours : 0}
                labourTotal={analysis.labourTotal}
                overheads={profitability?.jobOverheads?.total || 0}
                contingency={profitability?.contingency?.amount || 0}
                breakEven={breakEven}
                recommendedPrice={selectedAmount}
                profit={profit}
                margin={margin}
                region={projectContext?.location}
                experienceLevel="qualified"
                jobDescription={structuredData?.response}
              />
              {structuredData?.conversations && (
                <ClientConversationsCard conversations={structuredData.conversations} />
              )}
              {structuredData?.upsells?.length > 0 && (
                <UpsellOpportunitiesCard upsells={structuredData.upsells} />
              )}
              {structuredData?.pipeline?.length > 0 && (
                <FutureWorkPipelineCard pipeline={structuredData.pipeline} />
              )}
            </AccordionContent>
          </AccordionItem>

          {/* JOB PREPARATION */}
          <AccordionItem value="prep" className="border-none">
            <AccordionTrigger className="bg-gradient-to-r from-orange-500/10 to-amber-500/5 hover:from-orange-500/15 hover:to-amber-500/10 rounded-xl px-4 py-3 border border-orange-500/20 [&[data-state=open]]:rounded-b-none">
              <div className="flex items-center gap-3 flex-1">
                <div className="p-2 rounded-lg bg-orange-500/20">
                  <ClipboardList className="h-5 w-5 text-orange-400" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="font-semibold text-white">Job Preparation</span>
                  <span className="text-xs text-white/50">Checklist, payment & notes</span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="bg-white/[0.02] border border-t-0 border-white/10 rounded-b-xl px-4 pt-4 pb-2 space-y-4">
              {structuredData?.siteChecklist && (
                <SiteArrivalChecklist checklist={structuredData.siteChecklist} />
              )}
              {structuredData?.paymentTerms && (
                <PaymentTermsCard
                  paymentTerms={structuredData.paymentTerms}
                  totalAmount={selectedAmount}
                />
              )}
              <JobNotesCard projectName={projectContext?.projectName} />
              <PostJobReviewCard
                estimatedCost={analysis.totalCost}
                estimatedHours={totalLabourHours}
                estimatedProfit={profit}
                projectName={projectContext?.projectName}
              />
            </AccordionContent>
          </AccordionItem>

        </Accordion>
      </motion.div>
    </div>
  );
};

export default ComprehensiveResultsView;
