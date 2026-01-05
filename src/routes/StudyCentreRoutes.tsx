import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

// Lazy load the main index page
const StudyCentreIndex = lazy(() => import("@/pages/study-centre/StudyCentreIndex"));

// Import nested route components
const ApprenticeCourseRoutes = lazy(() => import("@/routes/ApprenticeCourseRoutes"));
const UpskillingRoutes = lazy(() => import("@/routes/UpskillingRoutes"));

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
      </Routes>
    </Suspense>
  );
}
