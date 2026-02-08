import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import { lazyWithRetry } from "@/utils/lazyWithRetry";
import { ipafRoutes } from "@/routes/study-centre/ipafRoutes";
import { pasmaRoutes } from "@/routes/study-centre/pasmaRoutes";

const GeneralUpskillingIndex = lazyWithRetry(() => import("@/pages/study-centre/general-upskilling/Index"));

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-elec-dark">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-elec-yellow mx-auto mb-4" />
      <p className="text-gray-400">Loading...</p>
    </div>
  </div>
);

export default function GeneralUpskillingRoutes() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route index element={<GeneralUpskillingIndex />} />
        {ipafRoutes}
        {pasmaRoutes}
      </Routes>
    </Suspense>
  );
}
