
import { Route, Routes } from "react-router-dom";
import BusinessAdmin from "@/pages/electrician/BusinessAdmin";
import SafetyShares from "@/pages/electrician/SafetyShares";
import MajorProjects from "@/pages/electrician/safety-shares/MajorProjects";
import SafetyAlerts from "@/pages/electrician/safety-shares/SafetyAlerts";
import SafetyAlertsEnhanced from "@/pages/electrician/safety-shares/SafetyAlertsEnhanced";
import IndustryNews from "@/pages/electrician/safety-shares/IndustryNews";
import IndustryNewsEnhanced from "@/pages/electrician/safety-shares/IndustryNewsEnhanced";
import SafetyResources from "@/pages/electrician/safety-shares/SafetyResources";
import SafetyResourcesEnhanced from "@/pages/electrician/safety-shares/SafetyResourcesEnhanced";
import LearningFromExperience from "@/pages/electrician/safety-shares/LearningFromExperience";
import ApprenticeMentalHealth from "@/pages/apprentice/ApprenticeMentalHealth";
import JobVacancies from "@/pages/electrician/JobVacancies";
import ElectricalMaterials from "@/pages/electrician/ElectricalMaterials";
import ElectricalTools from "@/pages/electrician/ElectricalTools";
import LivePricing from "@/pages/electrician/LivePricing";
import ElectricalHub from "@/pages/ElectricalHub";
import CareerProgression from "@/pages/electrician/CareerProgression";
import BusinessHub from "@/pages/electrician/BusinessHub";
import BusinessDevelopment from "@/pages/electrician/BusinessDevelopment";
import BusinessCustomers from "@/pages/electrician/business-development/BusinessCustomers";
import BusinessTemplates from "@/pages/electrician/business-development/BusinessTemplates";
import BusinessStartup from "@/pages/electrician/business-development/BusinessStartup";
import BusinessApprentices from "@/pages/electrician/business-development/BusinessApprentices";
import BusinessElectricians from "@/pages/electrician/business-development/BusinessElectricians";
import BusinessGrowth from "@/pages/electrician/business-development/BusinessGrowth";
import TaxFinances from "@/pages/electrician/business-development/TaxFinances";
import DebtRecovery from "@/pages/electrician/business-development/DebtRecovery";
import ElectricianMentalHealth from "@/pages/electrician/ElectricianMentalHealth";
import WorkLifeBalance from "@/pages/electrician/mental-health/WorkLifeBalance";
import MentalHealthResources from "@/pages/electrician/mental-health/MentalHealthResources";
import BusinessCalculators from "@/pages/electrician/business-development/tools/BusinessCalculators";
import JobProfitabilityCalculator from "@/pages/electrician/business-development/tools/JobProfitabilityCalculator";
import BusinessCostCalculator from "@/pages/electrician/business-development/tools/BusinessCostCalculator";
import CashFlowPlanner from "@/pages/electrician/business-development/tools/CashFlowPlanner";
import PricingStrategyCalculator from "@/pages/electrician/business-development/tools/PricingStrategyCalculator";
import EquipmentROICalculator from "@/pages/electrician/business-development/tools/EquipmentROICalculator";
import HourlyRateCalculator from "@/pages/electrician/business-development/tools/HourlyRateCalculator";
import CapacityPlanningTool from "@/pages/electrician/business-development/tools/CapacityPlanningTool";
import TaxNIEstimator from "@/pages/electrician/business-development/tools/TaxNIEstimator";
import SupplierMaterials from "@/pages/electrician/SupplierMaterials";
import CategoryMaterials from "@/pages/electrician/CategoryMaterials";
import MaterialsSlugRedirect from "@/pages/electrician/MaterialsSlugRedirect";
import BreakEvenCalculator from "@/pages/electrician/business-development/tools/BreakEvenCalculator";
import StaffCostCalculator from "@/pages/electrician/business-development/tools/StaffCostCalculator";
import QuoteVarianceTracker from "@/pages/electrician/business-development/tools/QuoteVarianceTracker";
import MinimumChargeCalculator from "@/pages/electrician/business-development/tools/MinimumChargeCalculator";
import VATSchemeComparison from "@/pages/electrician/business-development/tools/VATSchemeComparison";
import CISDRCHelper from "@/pages/electrician/business-development/tools/CISDRCHelper";
import QuoteBuilder from "@/pages/electrician/QuoteBuilder";
import Calculations from "@/pages/electrician-tools/Calculations";
import InstallPlanner from "@/pages/electrician-tools/InstallPlanner";
import InspectionTesting from "@/pages/electrician-tools/InspectionTesting";
import SiteSafety from "@/pages/electrician-tools/SiteSafety";
import ToolCategory from "@/pages/electrician/tools/ToolCategory";
import ToolSearchPage from "@/pages/electrician/tools/ToolSearch";
import BuyingGuides from "@/pages/electrician/tools/BuyingGuides";

const ElectricianHubRoutes = () => (
  <Routes>
    {/* Default route - show Electrical Hub as the main page */}
    <Route index element={<ElectricalHub />} />
    
    <Route path="job-vacancies" element={<JobVacancies />} />
    <Route path="materials" element={<ElectricalMaterials />} />
    <Route path="materials/category/:categoryId" element={<CategoryMaterials />} />
    <Route path="materials/supplier/:supplierSlug" element={<SupplierMaterials />} />
    <Route path="materials/:slug" element={<MaterialsSlugRedirect />} />
    <Route path="tools" element={<ElectricalTools />} />
    <Route path="tools/category/:categoryId" element={<ToolCategory />} />
    <Route path="tools/search" element={<ToolSearchPage />} />
    <Route path="tools/guides" element={<BuyingGuides />} />
    <Route path="safety-shares" element={<SafetyShares />} />
    <Route path="safety-shares/projects" element={<MajorProjects />} />
    <Route path="safety-shares/alerts" element={<SafetyAlerts />} />
    <Route path="safety-shares/alerts-enhanced" element={<SafetyAlertsEnhanced />} />
    <Route path="safety-shares/news" element={<IndustryNews />} />
    <Route path="safety-shares/news-enhanced" element={<IndustryNewsEnhanced />} />
    <Route path="safety-shares/resources" element={<SafetyResources />} />
    <Route path="safety-shares/resources-enhanced" element={<SafetyResourcesEnhanced />} />
    <Route path="safety-shares/lfe" element={<LearningFromExperience />} />
    <Route path="live-pricing" element={<LivePricing />} />
    <Route path="mental-health" element={<ElectricianMentalHealth />} />
    <Route path="mental-health/work-life-balance" element={<WorkLifeBalance />} />
    <Route path="mental-health/resources" element={<MentalHealthResources />} />
    
    <Route path="career-progression" element={<CareerProgression />} />
    
    {/* Business Routes */}
    <Route path="business" element={<BusinessHub />} />
    <Route path="business-admin" element={<BusinessAdmin />} />
    <Route path="quote-builder" element={<QuoteBuilder />} />
    {/* Business Development Routes */}
    <Route path="business-development" element={<BusinessDevelopment />} />
    <Route path="business-development/startup" element={<BusinessStartup />} />
    <Route path="business-development/apprentices" element={<BusinessApprentices />} />
    <Route path="business-development/electricians" element={<BusinessElectricians />} />
    <Route path="business-development/growth" element={<BusinessGrowth />} />
    <Route path="business-development/customers" element={<BusinessCustomers />} />
    <Route path="business-development/templates" element={<BusinessTemplates />} />
    <Route path="business-development/tax-finances" element={<TaxFinances />} />
    <Route path="business-development/debt-recovery" element={<DebtRecovery />} />
    <Route path="business-development/tools" element={<BusinessCalculators />} />
    <Route path="business-development/tools/job-profitability" element={<JobProfitabilityCalculator />} />
    <Route path="business-development/tools/business-cost" element={<BusinessCostCalculator />} />
    <Route path="business-development/tools/cash-flow" element={<CashFlowPlanner />} />
    <Route path="business-development/tools/pricing-strategy" element={<PricingStrategyCalculator />} />
    <Route path="business-development/tools/roi-calculator" element={<EquipmentROICalculator />} />
    <Route path="business-development/tools/hourly-rate" element={<HourlyRateCalculator />} />
    <Route path="business-development/tools/capacity-planner" element={<CapacityPlanningTool />} />
    <Route path="business-development/tools/tax-estimator" element={<TaxNIEstimator />} />
    <Route path="business-development/tools/break-even" element={<BreakEvenCalculator />} />
    <Route path="business-development/tools/staff-cost" element={<StaffCostCalculator />} />
    <Route path="business-development/tools/quote-variance" element={<QuoteVarianceTracker />} />
    <Route path="business-development/tools/minimum-charge" element={<MinimumChargeCalculator />} />
    <Route path="business-development/tools/vat-scheme" element={<VATSchemeComparison />} />
    <Route path="business-development/tools/cis-drc" element={<CISDRCHelper />} />
    
    {/* Core Workshop Tools */}
    <Route path="calculations" element={<Calculations />} />
    <Route path="install-planner" element={<InstallPlanner />} />
    <Route path="inspection-testing" element={<InspectionTesting />} />
    <Route path="site-safety" element={<SiteSafety />} />
  </Routes>
);

export default ElectricianHubRoutes;
