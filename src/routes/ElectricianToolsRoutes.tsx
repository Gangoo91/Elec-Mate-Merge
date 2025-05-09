
import { Route } from "react-router-dom";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import ElectricianTools from "@/pages/electrician-tools/Calculations";
import ProjectManagement from "@/pages/electrician-tools/ProjectManagement";
import AITooling from "@/pages/electrician-tools/AITooling";
import Admin from "@/pages/electrician-tools/Admin";
import Calculations from "@/pages/electrician-tools/Calculations";

export const ElectricianToolsRoutes = () => {
  return (
    <>
      <Route path="/electrician-tools" element={
        <ProtectedRoute>
          <ElectricianTools />
        </ProtectedRoute>
      } />
      
      <Route path="/electrician-tools/project-management" element={
        <ProtectedRoute>
          <ProjectManagement />
        </ProtectedRoute>
      } />
      
      <Route path="/electrician-tools/ai" element={
        <ProtectedRoute>
          <AITooling />
        </ProtectedRoute>
      } />
      
      <Route path="/electrician-tools/admin" element={
        <ProtectedRoute>
          <Admin />
        </ProtectedRoute>
      } />
      
      <Route path="/electrician-tools/calculations" element={
        <ProtectedRoute>
          <Calculations />
        </ProtectedRoute>
      } />
    </>
  );
};
