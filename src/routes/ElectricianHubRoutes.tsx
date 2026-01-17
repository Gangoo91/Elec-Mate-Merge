
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { LazyRoute } from "@/components/LazyRoute";

// Lazy-loaded pages
const BusinessAdmin = lazy(() => import("@/pages/electrician/BusinessAdmin"));
const SafetyShares = lazy(() => import("@/pages/electrician/SafetyShares"));
const MajorProjects = lazy(() => import("@/pages/electrician/safety-shares/MajorProjects"));
const SafetyAlerts = lazy(() => import("@/pages/electrician/safety-shares/SafetyAlerts"));
const SafetyAlertsEnhanced = lazy(() => import("@/pages/electrician/safety-shares/SafetyAlertsEnhanced"));
const IndustryNews = lazy(() => import("@/pages/electrician/safety-shares/IndustryNews"));
const IndustryNewsEnhanced = lazy(() => import("@/pages/electrician/safety-shares/IndustryNewsEnhanced"));
const SafetyResources = lazy(() => import("@/pages/electrician/safety-shares/SafetyResources"));
const SafetyResourcesEnhanced = lazy(() => import("@/pages/electrician/safety-shares/SafetyResourcesEnhanced"));
const LearningFromExperience = lazy(() => import("@/pages/electrician/safety-shares/LearningFromExperience"));
const ApprenticeMentalHealth = lazy(() => import("@/pages/apprentice/ApprenticeMentalHealth"));
const JobVacancies = lazy(() => import("@/pages/electrician/JobVacancies"));
const ElectricalMaterials = lazy(() => import("@/pages/electrician/ElectricalMaterials"));
const MaterialsMarketplace = lazy(() => import("@/pages/electrician/MaterialsMarketplace"));
const ToolsMarketplace = lazy(() => import("@/pages/electrician/ToolsMarketplace"));
const LivePricingHub = lazy(() => import("@/pages/electrician/LivePricingHub"));
const ElectricalHub = lazy(() => import("@/pages/ElectricalHub"));
const CareerProgression = lazy(() => import("@/pages/electrician/CareerProgression"));
const BusinessHub = lazy(() => import("@/pages/electrician/BusinessHub"));
const BusinessDevelopment = lazy(() => import("@/pages/electrician/BusinessDevelopment"));
const BusinessCustomers = lazy(() => import("@/pages/electrician/business-development/BusinessCustomers"));
const BusinessTemplates = lazy(() => import("@/pages/electrician/business-development/BusinessTemplates"));
const BusinessStartup = lazy(() => import("@/pages/electrician/business-development/BusinessStartup"));
const BusinessApprentices = lazy(() => import("@/pages/electrician/business-development/BusinessApprentices"));
const BusinessElectricians = lazy(() => import("@/pages/electrician/business-development/BusinessElectricians"));
const BusinessGrowth = lazy(() => import("@/pages/electrician/business-development/BusinessGrowth"));
const TaxFinances = lazy(() => import("@/pages/electrician/business-development/TaxFinances"));
const DebtRecovery = lazy(() => import("@/pages/electrician/business-development/DebtRecovery"));
const ElectricianMentalHealth = lazy(() => import("@/pages/electrician/ElectricianMentalHealth"));
const WorkLifeBalance = lazy(() => import("@/pages/electrician/mental-health/WorkLifeBalance"));
const MentalHealthResources = lazy(() => import("@/pages/electrician/mental-health/MentalHealthResources"));
const BusinessCalculators = lazy(() => import("@/pages/electrician/business-development/tools/BusinessCalculators"));
const JobProfitabilityCalculator = lazy(() => import("@/pages/electrician/business-development/tools/JobProfitabilityCalculator"));
const BusinessCostCalculator = lazy(() => import("@/pages/electrician/business-development/tools/BusinessCostCalculator"));
const CashFlowPlanner = lazy(() => import("@/pages/electrician/business-development/tools/CashFlowPlanner"));
const PricingStrategyCalculator = lazy(() => import("@/pages/electrician/business-development/tools/PricingStrategyCalculator"));
const EquipmentROICalculator = lazy(() => import("@/pages/electrician/business-development/tools/EquipmentROICalculator"));
const HourlyRateCalculator = lazy(() => import("@/pages/electrician/business-development/tools/HourlyRateCalculator"));
const CapacityPlanningTool = lazy(() => import("@/pages/electrician/business-development/tools/CapacityPlanningTool"));
const TaxNIEstimator = lazy(() => import("@/pages/electrician/business-development/tools/TaxNIEstimator"));
const SupplierMaterials = lazy(() => import("@/pages/electrician/SupplierMaterials"));
const CategoryMaterials = lazy(() => import("@/pages/electrician/CategoryMaterials"));
const MaterialsSlugRedirect = lazy(() => import("@/pages/electrician/MaterialsSlugRedirect"));
const MaterialPriceComparisonPage = lazy(() => import("@/pages/MaterialPriceComparison"));
const BreakEvenCalculator = lazy(() => import("@/pages/electrician/business-development/tools/BreakEvenCalculator"));
const StaffCostCalculator = lazy(() => import("@/pages/electrician/business-development/tools/StaffCostCalculator"));
const QuoteVarianceTracker = lazy(() => import("@/pages/electrician/business-development/tools/QuoteVarianceTracker"));
const MinimumChargeCalculator = lazy(() => import("@/pages/electrician/business-development/tools/MinimumChargeCalculator"));
const VATSchemeComparison = lazy(() => import("@/pages/electrician/business-development/tools/VATSchemeComparison"));
const CISDRCHelper = lazy(() => import("@/pages/electrician/business-development/tools/CISDRCHelper"));
const QuoteBuilder = lazy(() => import("@/pages/electrician/QuoteBuilder"));
const QuoteBuilderCreate = lazy(() => import("@/pages/electrician/QuoteBuilderCreate"));
const QuoteBuilderEdit = lazy(() => import("@/pages/electrician/QuoteBuilderEdit"));
const SmartQuoteBuilderPage = lazy(() => import("@/pages/electrician/SmartQuoteBuilderPage"));
const QuotesPage = lazy(() => import("@/pages/electrician/QuotesPage"));
const InvoicesPage = lazy(() => import("@/pages/electrician/InvoicesPage"));
const InvoiceBuilderCreate = lazy(() => import("@/pages/electrician/InvoiceBuilderCreate"));
const QuoteInvoiceDashboard = lazy(() => import("@/pages/electrician/QuoteInvoiceDashboard"));
const Calculations = lazy(() => import("@/pages/electrician-tools/Calculations"));
const InstallPlannerV2 = lazy(() => import("@/pages/electrician-tools/InstallPlannerV2"));
const InstallPlannerResults = lazy(() => import("@/pages/electrician-tools/InstallPlannerResults"));
const SiteSafety = lazy(() => import("@/pages/electrician-tools/SiteSafety"));
const AgentSelectorPage = lazy(() => import("@/pages/electrician-tools/AgentSelectorPage"));
const CircuitDesigner = lazy(() => import("@/pages/electrician-tools/CircuitDesigner"));
const CostEngineerPage = lazy(() => import("@/pages/electrician-tools/CostEngineerPage"));
const InstallationSpecialistPage = lazy(() => import("@/pages/electrician-tools/InstallationSpecialistPage"));
const HealthSafetyPage = lazy(() => import("@/pages/electrician-tools/HealthSafetyPage"));
const CommissioningPage = lazy(() => import("@/pages/electrician-tools/CommissioningPage"));
const ProjectManagerPage = lazy(() => import("@/pages/electrician-tools/ProjectManagerPage"));
const MaintenancePage = lazy(() => import("@/pages/electrician-tools/MaintenancePage"));
const TutorPage = lazy(() => import("@/pages/electrician-tools/TutorPage"));
const AIMethodStatementPage = lazy(() => import("@/pages/electrician-tools/AIMethodStatementPage"));
const PremiumCVBuilder = lazy(() => import("@/components/cv-builder/premium/PremiumCVBuilder"));

const ElectricianHubRoutes = () => (
  <Routes>
    {/* Default route - show Electrical Hub as the main page */}
    <Route index element={<LazyRoute><ElectricalHub /></LazyRoute>} />

    <Route path="job-vacancies" element={<LazyRoute><JobVacancies /></LazyRoute>} />
    <Route path="cv-builder" element={<LazyRoute><PremiumCVBuilder /></LazyRoute>} />
    <Route path="materials" element={<LazyRoute><MaterialsMarketplace /></LazyRoute>} />
    <Route path="materials-old" element={<LazyRoute><ElectricalMaterials /></LazyRoute>} />
    <Route path="materials/compare" element={<LazyRoute><MaterialPriceComparisonPage /></LazyRoute>} />
    <Route path="materials/category/:categoryId" element={<LazyRoute><CategoryMaterials /></LazyRoute>} />
    <Route path="materials/supplier/:supplierSlug" element={<LazyRoute><SupplierMaterials /></LazyRoute>} />
    <Route path="materials/:slug" element={<LazyRoute><MaterialsSlugRedirect /></LazyRoute>} />
    <Route path="tools" element={<LazyRoute><ToolsMarketplace /></LazyRoute>} />
    <Route path="tools-marketplace" element={<LazyRoute><ToolsMarketplace /></LazyRoute>} />
    <Route path="safety-shares" element={<LazyRoute><SafetyShares /></LazyRoute>} />
    <Route path="safety-shares/projects" element={<LazyRoute><MajorProjects /></LazyRoute>} />
    <Route path="safety-shares/alerts" element={<LazyRoute><SafetyAlerts /></LazyRoute>} />
    <Route path="safety-shares/alerts-enhanced" element={<LazyRoute><SafetyAlertsEnhanced /></LazyRoute>} />
    <Route path="safety-shares/news" element={<LazyRoute><IndustryNews /></LazyRoute>} />
    <Route path="safety-shares/news-enhanced" element={<LazyRoute><IndustryNewsEnhanced /></LazyRoute>} />
    <Route path="safety-shares/resources" element={<LazyRoute><SafetyResources /></LazyRoute>} />
    <Route path="safety-shares/resources-enhanced" element={<LazyRoute><SafetyResourcesEnhanced /></LazyRoute>} />
    <Route path="safety-shares/lfe" element={<LazyRoute><LearningFromExperience /></LazyRoute>} />
    <Route path="live-pricing" element={<LazyRoute><LivePricingHub /></LazyRoute>} />
    <Route path="mental-health" element={<LazyRoute><ElectricianMentalHealth /></LazyRoute>} />
    <Route path="mental-health/work-life-balance" element={<LazyRoute><WorkLifeBalance /></LazyRoute>} />
    <Route path="mental-health/resources" element={<LazyRoute><MentalHealthResources /></LazyRoute>} />

    <Route path="career-progression" element={<LazyRoute><CareerProgression /></LazyRoute>} />

    {/* Business Routes */}
    <Route path="business" element={<LazyRoute><BusinessHub /></LazyRoute>} />
    <Route path="business-admin" element={<LazyRoute><BusinessAdmin /></LazyRoute>} />
    <Route path="quote-builder" element={<LazyRoute><QuoteBuilder /></LazyRoute>} />
    <Route path="quote-builder/create" element={<LazyRoute><QuoteBuilderCreate /></LazyRoute>} />
    <Route path="quote-builder/:id" element={<LazyRoute><QuoteBuilderEdit /></LazyRoute>} />
    <Route path="quote-builder/smart" element={<LazyRoute><SmartQuoteBuilderPage /></LazyRoute>} />
    <Route path="quotes" element={<LazyRoute><QuotesPage /></LazyRoute>} />
    <Route path="invoices" element={<LazyRoute><InvoicesPage /></LazyRoute>} />
    <Route path="invoice-builder/create" element={<LazyRoute><InvoiceBuilderCreate /></LazyRoute>} />
    <Route path="quote-invoice-dashboard" element={<LazyRoute><QuoteInvoiceDashboard /></LazyRoute>} />
    {/* Business Development Routes */}
    <Route path="business-development" element={<LazyRoute><BusinessDevelopment /></LazyRoute>} />
    <Route path="business-development/startup" element={<LazyRoute><BusinessStartup /></LazyRoute>} />
    <Route path="business-development/apprentices" element={<LazyRoute><BusinessApprentices /></LazyRoute>} />
    <Route path="business-development/electricians" element={<LazyRoute><BusinessElectricians /></LazyRoute>} />
    <Route path="business-development/growth" element={<LazyRoute><BusinessGrowth /></LazyRoute>} />
    <Route path="business-development/customers" element={<LazyRoute><BusinessCustomers /></LazyRoute>} />
    <Route path="business-development/templates" element={<LazyRoute><BusinessTemplates /></LazyRoute>} />
    <Route path="business-development/tax-finances" element={<LazyRoute><TaxFinances /></LazyRoute>} />
    <Route path="business-development/debt-recovery" element={<LazyRoute><DebtRecovery /></LazyRoute>} />
    <Route path="business-development/tools" element={<LazyRoute><BusinessCalculators /></LazyRoute>} />
    <Route path="business-development/tools/job-profitability" element={<LazyRoute><JobProfitabilityCalculator /></LazyRoute>} />
    <Route path="business-development/tools/business-cost" element={<LazyRoute><BusinessCostCalculator /></LazyRoute>} />
    <Route path="business-development/tools/cash-flow" element={<LazyRoute><CashFlowPlanner /></LazyRoute>} />
    <Route path="business-development/tools/pricing-strategy" element={<LazyRoute><PricingStrategyCalculator /></LazyRoute>} />
    <Route path="business-development/tools/roi-calculator" element={<LazyRoute><EquipmentROICalculator /></LazyRoute>} />
    <Route path="business-development/tools/hourly-rate" element={<LazyRoute><HourlyRateCalculator /></LazyRoute>} />
    <Route path="business-development/tools/capacity-planner" element={<LazyRoute><CapacityPlanningTool /></LazyRoute>} />
    <Route path="business-development/tools/tax-estimator" element={<LazyRoute><TaxNIEstimator /></LazyRoute>} />
    <Route path="business-development/tools/break-even" element={<LazyRoute><BreakEvenCalculator /></LazyRoute>} />
    <Route path="business-development/tools/staff-cost" element={<LazyRoute><StaffCostCalculator /></LazyRoute>} />
    <Route path="business-development/tools/quote-variance" element={<LazyRoute><QuoteVarianceTracker /></LazyRoute>} />
    <Route path="business-development/tools/minimum-charge" element={<LazyRoute><MinimumChargeCalculator /></LazyRoute>} />
    <Route path="business-development/tools/vat-scheme" element={<LazyRoute><VATSchemeComparison /></LazyRoute>} />
    <Route path="business-development/tools/cis-drc" element={<LazyRoute><CISDRCHelper /></LazyRoute>} />

    {/* Core Workshop Tools */}
    <Route path="agent-selector" element={<LazyRoute><AgentSelectorPage /></LazyRoute>} />
    <Route path="circuit-designer" element={<LazyRoute><CircuitDesigner /></LazyRoute>} />
    <Route path="cost-engineer" element={<LazyRoute><CostEngineerPage /></LazyRoute>} />
    <Route path="installation-specialist" element={<LazyRoute><InstallationSpecialistPage /></LazyRoute>} />
    <Route path="health-safety" element={<LazyRoute><HealthSafetyPage /></LazyRoute>} />
    <Route path="commissioning" element={<LazyRoute><CommissioningPage /></LazyRoute>} />
    <Route path="project-manager" element={<LazyRoute><ProjectManagerPage /></LazyRoute>} />
    <Route path="maintenance" element={<LazyRoute><MaintenancePage /></LazyRoute>} />
    <Route path="tutor" element={<LazyRoute><TutorPage /></LazyRoute>} />
    <Route path="method-statement" element={<LazyRoute><AIMethodStatementPage /></LazyRoute>} />
    <Route path="calculations" element={<LazyRoute><Calculations /></LazyRoute>} />
    <Route path="install-planner" element={<LazyRoute><InstallPlannerV2 /></LazyRoute>} />
    <Route path="install-planner/results/:conversationId?" element={<LazyRoute><InstallPlannerResults /></LazyRoute>} />
    <Route path="site-safety" element={<LazyRoute><SiteSafety /></LazyRoute>} />
  </Routes>
);

export default ElectricianHubRoutes;
