
import { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { healthAndSafetyContent } from "@/data/healthAndSafety/index";
import { legislationSubsections, rolesResponsibilitiesSubsections } from "@/data/healthAndSafety/subsections";
import LegislationRegulationsPage from "@/pages/apprentice/LegislationRegulationsPage";
import RolesResponsibilitiesPage from "@/pages/apprentice/RolesResponsibilitiesPage";
import SubsectionContentPage from "@/pages/apprentice/SubsectionContentPage";

// HealthSafetyUnit is a component that requires unitCode and onResourceClick props
const App = () => {
  const handleResourceClick = (type: string) => {
    console.log(`Resource clicked: ${type}`);
  };
  
  return (
    <BrowserRouter>
      <Routes>
        {/* Health & Safety Module Routes */}
        <Route path="/apprentice/study/eal/:courseSlug/unit/:unitSlug/legislation" element={<LegislationRegulationsPage />} />
        <Route path="/apprentice/study/eal/:courseSlug/unit/:unitSlug/roles" element={<RolesResponsibilitiesPage />} />
        <Route path="/apprentice/study/eal/:courseSlug/unit/:unitSlug/:category/:subsectionId" element={<SubsectionContentPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
