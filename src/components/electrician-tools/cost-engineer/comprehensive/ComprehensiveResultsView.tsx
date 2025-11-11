import { ParsedCostAnalysis } from "@/utils/cost-analysis-parser";
import AIAnalysisHeader from "./AIAnalysisHeader";
import KeyActionItems from "./KeyActionItems";
import ClientQuoteSummary from "./ClientQuoteSummary";
import PricingOptionsTiers from "./PricingOptionsTiers";
import CostBreakdownCard from "./CostBreakdownCard";
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

interface ComprehensiveResultsViewProps {
  analysis: ParsedCostAnalysis;
  structuredData: any;
  projectContext: any;
  onNewAnalysis: () => void;
}

const ComprehensiveResultsView = ({ 
  analysis, 
  structuredData, 
  projectContext,
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

  return (
    <div className="space-y-6 pb-8">
      {/* 1. AI Cost Engineer Analysis Header */}
      <AIAnalysisHeader 
        jobDescription={structuredData?.response}
        complexity={structuredData?.complexity}
        confidence={structuredData?.confidence}
        riskAssessment={structuredData?.riskAssessment}
        recommendedQuote={structuredData?.recommendedQuote}
      />

      {/* 2. Key Action Items (Top 3) */}
      <KeyActionItems structuredData={structuredData} />

      {/* 3. Client Quote Summary */}
      <ClientQuoteSummary
        selectedTier={selectedTier}
        amount={selectedAmount}
        vatAmount={analysis.vatAmount}
        totalIncVat={analysis.totalCost}
        breakEven={breakEven}
        margin={margin}
        profit={profit}
        profitPerHour={profitPerHour}
      />

      {/* 4. Pricing Options (3 Tiers) */}
      <PricingOptionsTiers
        profitability={profitability}
        selectedTier={selectedTier}
        explanation={structuredData?.recommendedQuote?.reasoning}
        breakEven={breakEven}
        totalLabourHours={totalLabourHours}
      />

      {/* 5. Cost Breakdown */}
      <CostBreakdownCard
        materialsNet={analysis.materialsTotal}
        materialsMarkup={structuredData?.materials?.markup || 0}
        labourHours={totalLabourHours}
        labourTotal={analysis.labourTotal}
        overheads={profitability?.jobOverheads}
        contingencyPercent={structuredData?.confidence?.contingency?.percentage || 5}
        breakEven={breakEven}
      />

      {/* 6. Materials Breakdown Table */}
      <MaterialsTable items={analysis.materials} />

      {/* 7. Labour Plan Table */}
      <LabourPlanTable tasks={structuredData?.labour?.tasks || []} />

      {/* 8. Job Complexity Card */}
      {structuredData?.complexity && (
        <JobComplexityCard complexity={structuredData.complexity} />
      )}

      {/* 9. Risk Assessment */}
      {structuredData?.riskAssessment?.risks?.length > 0 && (
        <RiskAssessmentTable risks={structuredData.riskAssessment.risks} />
      )}

      {/* 10. Pricing Confidence */}
      {structuredData?.confidence && (
        <PricingConfidenceCard confidence={structuredData.confidence} />
      )}

      {/* 11. Immediate Upsells (Add to Current Job) */}
      {structuredData?.upsells?.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-green-400">💰 Immediate Upsells - Add to This Job</h3>
          </div>
          <p className="text-xs text-muted-foreground">Premium add-ons and upgrades the client is likely to accept</p>
          <UpsellOpportunitiesCard upsells={structuredData.upsells} />
        </div>
      )}

      {/* 12. Future Work Pipeline (Long-term Opportunities) */}
      {structuredData?.pipeline?.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-blue-400">🎯 Future Work Pipeline</h3>
          </div>
          <p className="text-xs text-muted-foreground">Potential future jobs based on property and client discussions</p>
          <FutureWorkPipelineCard pipeline={structuredData.pipeline} />
        </div>
      )}

      {/* 13. Client Conversations */}
      {structuredData?.conversations && (
        <ClientConversationsCard conversations={structuredData.conversations} />
      )}

      {/* 14. Site Arrival Checklist */}
      {structuredData?.siteChecklist && (
        <SiteArrivalChecklist checklist={structuredData.siteChecklist} />
      )}

      {/* 15. Payment Terms */}
      {structuredData?.paymentTerms && (
        <PaymentTermsCard 
          paymentTerms={structuredData.paymentTerms}
          totalAmount={selectedAmount}
        />
      )}

      {/* 16. Job Notes (User Input) */}
      <JobNotesCard 
        projectName={projectContext?.projectName}
      />

      {/* 17. Post-Job Review (Tracking) */}
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
