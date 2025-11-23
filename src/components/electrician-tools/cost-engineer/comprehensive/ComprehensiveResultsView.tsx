import { ParsedCostAnalysis } from "@/utils/cost-analysis-parser";
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
  const selectedTier = structuredData?.recommendedQuote?.tier || 'normal';
  const selectedAmount = structuredData?.recommendedQuote?.amount || analysis.totalCost;

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

  const breakEven = profitability?.breakEvenPoint || analysis.subtotal;
  const margin = calculateMargin(selectedAmount, breakEven);
  const profit = calculateProfit(selectedAmount, breakEven);
  const profitPerHour = calculateProfitPerHour(profit, totalLabourHours);
  
  const avgConfidence = structuredData?.confidence 
    ? Math.round((structuredData.confidence.materials?.level + structuredData.confidence.labour?.level) / 2)
    : 75;

  return (
    <div className="space-y-6 pb-6 sm:space-y-4 sm:pb-8">
      {/* 0. Original User Request */}
      {originalQuery && (
        <OriginalRequestCard 
          query={originalQuery}
          projectContext={projectContext}
          timestamp={new Date().toISOString()}
        />
      )}

      {/* 1. 💰 HERO: Recommended Quote (BIG & PROMINENT) */}
      <QuoteHeroCard
        amount={selectedAmount}
        tier={selectedTier}
        profit={profit}
        margin={margin}
        profitPerHour={profitPerHour}
        confidence={avgConfidence}
        totalLabourHours={totalLabourHours}
      />

      {/* 2. AI Analysis Summary (Formatted with Paragraphs) */}
      <AIAnalysisSummary jobDescription={structuredData?.response} />

      {/* 3. Job Snapshot (Quick Metrics) */}
      <QuickMetricsCard
        complexity={structuredData?.complexity}
        confidence={structuredData?.confidence}
        riskAssessment={structuredData?.riskAssessment}
      />

      {/* 4. Key Action Items (Top 3) */}
      <KeyActionItems structuredData={structuredData} />

      {/* 5. Trade Intelligence (RAG Self-Validation) */}
      {structuredData?.tradeIntelligence && (
        <TradeIntelligenceCard tradeIntelligence={structuredData.tradeIntelligence} />
      )}

      {/* 6. Pricing Options (3 Tiers) */}
      <PricingOptionsTiers
        profitability={profitability}
        selectedTier={selectedTier}
        explanation={structuredData?.recommendedQuote?.reasoning}
        breakEven={breakEven}
        totalLabourHours={totalLabourHours}
        projectType={projectContext?.projectType}
        jobDescription={structuredData?.response}
      />

      {/* 7. Cost Breakdown */}
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

      {/* 8. Client Quote Justification */}
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

      {/* 9. Materials Breakdown Table */}
      <MaterialsTable items={analysis.materials} />

      {/* 10. Labour Plan Table */}
      <LabourPlanTable tasks={structuredData?.labour?.tasks || []} />

      {/* 11. Job Complexity Card */}
      {structuredData?.complexity && (
        <JobComplexityCard complexity={structuredData.complexity} />
      )}

      {/* 12. Risk Assessment */}
      {structuredData?.riskAssessment?.risks?.length > 0 && (
        <RiskAssessmentTable risks={structuredData.riskAssessment.risks} />
      )}

      {/* 13. Pricing Confidence */}
      {structuredData?.confidence && (
        <PricingConfidenceCard confidence={structuredData.confidence} />
      )}

      {/* 14. Immediate Upsells (Add to Current Job) */}
      {structuredData?.upsells?.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h3 className="text-base sm:text-sm font-semibold text-green-400">💰 Immediate Upsells - Add to This Job</h3>
          </div>
          <p className="text-sm text-white/80">Premium add-ons and upgrades the client is likely to accept</p>
          <UpsellOpportunitiesCard upsells={structuredData.upsells} />
        </div>
      )}

      {/* 15. Future Work Pipeline (Long-term Opportunities) */}
      {structuredData?.pipeline?.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h3 className="text-base sm:text-sm font-semibold text-blue-400">🎯 Future Work Pipeline</h3>
          </div>
          <p className="text-sm text-white/80">Potential future jobs based on property and client discussions</p>
          <FutureWorkPipelineCard pipeline={structuredData.pipeline} />
        </div>
      )}

      {/* 16. Client Conversations */}
      {structuredData?.conversations && (
        <ClientConversationsCard conversations={structuredData.conversations} />
      )}

      {/* 17. Site Arrival Checklist */}
      {structuredData?.siteChecklist && (
        <SiteArrivalChecklist checklist={structuredData.siteChecklist} />
      )}

      {/* 18. Payment Terms */}
      {structuredData?.paymentTerms && (
        <PaymentTermsCard 
          paymentTerms={structuredData.paymentTerms}
          totalAmount={selectedAmount}
        />
      )}

      {/* 19. Job Notes (User Input) */}
      <JobNotesCard 
        projectName={projectContext?.projectName}
      />

      {/* 20. Post-Job Review (Tracking) */}
      <PostJobReviewCard
        estimatedCost={analysis.totalCost}
        estimatedHours={totalLabourHours}
        estimatedProfit={profit}
        projectName={projectContext?.projectName}
      />
    </div>
  );
};

export default ComprehensiveResultsView;
