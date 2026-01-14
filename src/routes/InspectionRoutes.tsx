import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

// Lazy load the main inspection app page
const InspectionIndex = lazy(() => import("@/pages/inspection/InspectionIndex"));
const LegacyCertificates = lazy(() => import("@/pages/inspection/LegacyCertificates"));

// Loading component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4" />
      <p className="text-muted-foreground">Loading Inspection & Testing...</p>
    </div>
  </div>
);

export default function InspectionRoutes() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Legacy certificates - standalone page */}
        <Route path="legacy-certificates" element={<LegacyCertificates />} />
        {/* All other inspection routes handled by InspectionIndex with query params */}
        <Route path="*" element={<InspectionIndex />} />
      </Routes>
    </Suspense>
  );
}
