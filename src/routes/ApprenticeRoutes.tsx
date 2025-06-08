
import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import ApprenticeHub from "@/pages/ApprenticeHub";
import ApprenticeMentalHealth from "@/pages/apprentice/ApprenticeMentalHealth";
import ApprenticeMentor from "@/pages/apprentice/ApprenticeMentor";
import RightsAndPay from "@/pages/apprentice/RightsAndPay";
import WorkLifeBalance from "@/pages/apprentice/mental-health/WorkLifeBalance";
import MentalHealthResources from "@/pages/apprentice/mental-health/MentalHealthResources";
import ApprenticeStudy from "@/pages/apprentice/ApprenticeStudy";
import ApprenticeOJT from "@/pages/apprentice/ApprenticeOJT";
import ApprenticeToolbox from "@/pages/apprentice/ApprenticeToolbox";
import ApprenticeOnJobTools from "@/pages/apprentice/ApprenticeOnJobTools";
import ApprenticeProfessionalDevelopment from "@/pages/apprentice/ApprenticeProfessionalDevelopment";
import ApprenticeErrorBoundary from "@/components/apprentice/ApprenticeErrorBoundary";

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin h-8 w-8 border-4 border-elec-yellow border-t-transparent rounded-full"></div>
    <span className="ml-3">Loading...</span>
  </div>
);

// Wrapper component for route protection
const RouteWrapper = ({ children, title }: { children: React.ReactNode; title?: string }) => (
  <ApprenticeErrorBoundary fallbackTitle={title}>
    <Suspense fallback={<LoadingFallback />}>
      {children}
    </Suspense>
  </ApprenticeErrorBoundary>
);

const ApprenticeRoutes = () => (
  <Routes>
    <Route 
      index 
      element={
        <RouteWrapper title="Apprentice Hub Error">
          <ApprenticeHub />
        </RouteWrapper>
      } 
    />
    <Route 
      path="study" 
      element={
        <RouteWrapper title="Study Centre Error">
          <ApprenticeStudy />
        </RouteWrapper>
      } 
    />
    <Route 
      path="ojt" 
      element={
        <RouteWrapper title="Off-the-Job Training Error">
          <ApprenticeOJT />
        </RouteWrapper>
      } 
    />
    <Route 
      path="mental-health" 
      element={
        <RouteWrapper title="Mental Health Hub Error">
          <ApprenticeMentalHealth />
        </RouteWrapper>
      } 
    />
    <Route 
      path="mental-health/work-life-balance" 
      element={
        <RouteWrapper title="Work-Life Balance Error">
          <WorkLifeBalance />
        </RouteWrapper>
      } 
    />
    <Route 
      path="mental-health/resources" 
      element={
        <RouteWrapper title="Mental Health Resources Error">
          <MentalHealthResources />
        </RouteWrapper>
      } 
    />
    <Route 
      path="mentor" 
      element={
        <RouteWrapper title="Mentor Connect Error">
          <ApprenticeMentor />
        </RouteWrapper>
      } 
    />
    <Route 
      path="toolbox" 
      element={
        <RouteWrapper title="Guidance Area Error">
          <ApprenticeToolbox />
        </RouteWrapper>
      } 
    />
    <Route 
      path="on-job-tools" 
      element={
        <RouteWrapper title="On-the-Job Tools Error">
          <ApprenticeOnJobTools />
        </RouteWrapper>
      } 
    />
    <Route 
      path="professional-development" 
      element={
        <RouteWrapper title="Professional Development Error">
          <ApprenticeProfessionalDevelopment />
        </RouteWrapper>
      } 
    />
    <Route 
      path="rights-and-pay" 
      element={
        <RouteWrapper title="Rights & Pay Error">
          <RightsAndPay />
        </RouteWrapper>
      } 
    />
  </Routes>
);

export default ApprenticeRoutes;
