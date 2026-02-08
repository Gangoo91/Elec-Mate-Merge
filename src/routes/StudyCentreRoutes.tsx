import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import { lazyWithRetry } from "@/utils/lazyWithRetry";

// Lazy load with retry for chunk failures
const StudyCentreIndex = lazyWithRetry(() => import("@/pages/study-centre/StudyCentreIndex"));

// Import nested route components with retry
const ApprenticeCourseRoutes = lazyWithRetry(() => import("@/routes/ApprenticeCourseRoutes"));
const UpskillingRoutes = lazyWithRetry(() => import("@/routes/UpskillingRoutes"));
const BusinessFundamentalsRoutes = lazyWithRetry(() => import("@/routes/study-centre/BusinessFundamentalsRoutes"));
const ConstructionAwarenessRoutes = lazyWithRetry(() => import("@/routes/study-centre/ConstructionAwarenessRoutes"));
const CybersecurityRoutes = lazyWithRetry(() => import("@/routes/study-centre/CybersecurityRoutes"));
const EmergingTechRoutes = lazyWithRetry(() => import("@/routes/study-centre/EmergingTechRoutes"));
const GeneralUpskillingRoutes = lazyWithRetry(() => import("@/routes/study-centre/GeneralUpskillingRoutes"));
const MultiTradeRoutes = lazyWithRetry(() => import("@/routes/study-centre/MultiTradeRoutes"));
const PersonalDevelopmentRoutes = lazyWithRetry(() => import("@/routes/study-centre/PersonalDevelopmentRoutes"));

// Loading component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-elec-dark">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-elec-yellow mx-auto mb-4" />
      <p className="text-gray-400">Loading...</p>
    </div>
  </div>
);

export default function StudyCentreRoutes() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route index element={<StudyCentreIndex />} />
        <Route path="apprentice/*" element={<ApprenticeCourseRoutes />} />
        <Route path="upskilling/*" element={<UpskillingRoutes />} />
        <Route path="business-fundamentals/*" element={<BusinessFundamentalsRoutes />} />
        <Route path="construction-awareness/*" element={<ConstructionAwarenessRoutes />} />
        <Route path="cybersecurity/*" element={<CybersecurityRoutes />} />
        <Route path="emerging-tech/*" element={<EmergingTechRoutes />} />
        <Route path="general-upskilling/*" element={<GeneralUpskillingRoutes />} />
        <Route path="multi-trade/*" element={<MultiTradeRoutes />} />
        <Route path="personal-development/*" element={<PersonalDevelopmentRoutes />} />
      </Routes>
    </Suspense>
  );
}
