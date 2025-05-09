
import { Route } from "react-router-dom";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import ElectricalHub from "@/pages/ElectricalHub";
import ElectricalMaterials from "@/pages/electrician/ElectricalMaterials";
import SupplierMaterials from "@/pages/electrician/SupplierMaterials";
import LivePricing from "@/pages/electrician/LivePricing";
import JobVacancies from "@/pages/electrician/JobVacancies";
import ElectricalChat from "@/pages/electrician/ElectricalChat";
import ElectricalTools from "@/pages/electrician/ElectricalTools";
import ElectricalToolboxTalk from "@/pages/electrician/ElectricalToolboxTalk";
import ElectricianMentalHealth from "@/pages/electrician/ElectricianMentalHealth";
import MentorConnect from "@/pages/electrician/MentorConnect";
import SafetyShares from "@/pages/electrician/SafetyShares";
import SafetyAlerts from "@/pages/electrician/safety-shares/SafetyAlerts";
import IndustryNews from "@/pages/electrician/safety-shares/IndustryNews";
import LearningFromExperience from "@/pages/electrician/safety-shares/LearningFromExperience";
import MajorProjects from "@/pages/electrician/safety-shares/MajorProjects";
import SafetyResources from "@/pages/electrician/safety-shares/SafetyResources";
import ElectricianWorkLifeBalance from "@/pages/electrician/mental-health/WorkLifeBalance";

export const ElectricianRoutes = () => {
  return (
    <>
      <Route path="/electrician" element={
        <ProtectedRoute>
          <ElectricalHub />
        </ProtectedRoute>
      } />
      
      <Route path="/electrician/materials" element={
        <ProtectedRoute>
          <ElectricalMaterials />
        </ProtectedRoute>
      } />
      
      <Route path="/electrician/suppliers" element={
        <ProtectedRoute>
          <SupplierMaterials />
        </ProtectedRoute>
      } />
      
      <Route path="/electrician/pricing" element={
        <ProtectedRoute>
          <LivePricing />
        </ProtectedRoute>
      } />
      
      <Route path="/electrician/jobs" element={
        <ProtectedRoute>
          <JobVacancies />
        </ProtectedRoute>
      } />
      
      <Route path="/electrician/chat" element={
        <ProtectedRoute>
          <ElectricalChat />
        </ProtectedRoute>
      } />
      
      <Route path="/electrician/tools" element={
        <ProtectedRoute>
          <ElectricalTools />
        </ProtectedRoute>
      } />
      
      <Route path="/electrician/toolbox" element={
        <ProtectedRoute>
          <ElectricalToolboxTalk />
        </ProtectedRoute>
      } />
      
      <Route path="/electrician/mental-health" element={
        <ProtectedRoute>
          <ElectricianMentalHealth />
        </ProtectedRoute>
      } />
      
      <Route path="/electrician/mental-health/work-life-balance" element={
        <ProtectedRoute>
          <ElectricianWorkLifeBalance />
        </ProtectedRoute>
      } />
      
      <Route path="/electrician/mentor" element={
        <ProtectedRoute>
          <MentorConnect />
        </ProtectedRoute>
      } />
      
      <Route path="/electrician/safety" element={
        <ProtectedRoute>
          <SafetyShares />
        </ProtectedRoute>
      } />
      
      <Route path="/electrician/safety/alerts" element={
        <ProtectedRoute>
          <SafetyAlerts />
        </ProtectedRoute>
      } />
      
      <Route path="/electrician/safety/news" element={
        <ProtectedRoute>
          <IndustryNews />
        </ProtectedRoute>
      } />
      
      <Route path="/electrician/safety/learning" element={
        <ProtectedRoute>
          <LearningFromExperience />
        </ProtectedRoute>
      } />
      
      <Route path="/electrician/safety/projects" element={
        <ProtectedRoute>
          <MajorProjects />
        </ProtectedRoute>
      } />
      
      <Route path="/electrician/safety/resources" element={
        <ProtectedRoute>
          <SafetyResources />
        </ProtectedRoute>
      } />
    </>
  );
};
