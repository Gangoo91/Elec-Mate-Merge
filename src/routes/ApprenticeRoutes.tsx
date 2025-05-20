
import { Route, Routes } from "react-router-dom";
import InspectionDocumentation from "@/components/apprentice/resources/InspectionDocumentation";
import InspectionAreas from "@/components/apprentice/resources/InspectionAreas";
import InspectionTypes from "@/components/apprentice/resources/InspectionTypes";
import InspectionRegulations from "@/components/apprentice/resources/InspectionRegulations";

import InspectionTesting from "@/pages/apprentice/InspectionTesting";
import TestingProcedures from "@/pages/apprentice/TestingProcedures";
import SafeIsolation from "@/pages/apprentice/inspection-testing/SafeIsolation";
import InspectionMethodology from "@/pages/apprentice/inspection-testing/InspectionMethodology";
import TestingPrinciples from "@/pages/apprentice/inspection-testing/TestingPrinciples";
import RegulatoryFramework from "@/pages/apprentice/inspection-testing/RegulatoryFramework";
import TestResultAnalysis from "@/pages/apprentice/inspection-testing/TestResultAnalysis";
import ApprenticeHub from "@/pages/ApprenticeHub";

const ApprenticeRoutes = () => {
  return (
    <Routes>
      <Route index element={<ApprenticeHub />} />
      <Route path="study" element={<div>Study Portal</div>} />
      <Route path="study/mock-exams" element={<div>Mock Exams</div>} />
      <Route path="study/mock-exams/:examId" element={<div>Exam Details</div>} />
      <Route path="study/electrical-symbols" element={<div>Electrical Symbols</div>} />
      <Route path="study/tools" element={<div>Study Tools</div>} />
      <Route path="study/electrical-theory" element={<div>Electrical Theory</div>} />
      <Route path="study/inspection-testing" element={<InspectionTesting />} />
      <Route path="study/inspection-testing/safe-isolation" element={<SafeIsolation />} />
      <Route path="study/inspection-testing/methodology" element={<InspectionMethodology />} />
      <Route path="study/inspection-testing/principles" element={<TestingPrinciples />} />
      <Route path="study/inspection-testing/regulations" element={<RegulatoryFramework />} />
      <Route path="study/inspection-testing/result-analysis" element={<TestResultAnalysis />} />
      <Route path="study/testing-procedures" element={<TestingProcedures />} />
      
      <Route path="study/eal/:courseSlug" element={<div>Course Detail</div>} />
      <Route path="study/eal/:courseSlug/unit/:unitSlug" element={<div>Course Unit</div>} />
      <Route path="study/eal/:courseSlug/unit/:unitSlug/section/:sectionId" element={<div>Section Page</div>} />
      <Route path="study/eal/:courseSlug/unit/:unitSlug/section/:sectionId/subsection/:subsectionId" element={<div>Subsection Page</div>} />
      <Route path="study/eal/:courseSlug/unit/:unitSlug/quiz" element={<div>Course Quiz</div>} />
      
      <Route path="study/resources/inspection-documentation" element={<InspectionDocumentation />} />
      <Route path="study/resources/inspection-areas" element={<InspectionAreas />} />
      <Route path="study/resources/inspection-types" element={<InspectionTypes />} />
      <Route path="study/resources/inspection-regulations" element={<InspectionRegulations />} />
      
      <Route path="chat" element={<div>Apprentice Chat</div>} />
      <Route path="mental-health" element={<div>Mental Health</div>} />
      <Route path="mentor" element={<div>Mentor</div>} />
      <Route path="calculators" element={<div>Calculators</div>} />
      <Route path="certificate" element={<div>Certificate</div>} />
      <Route path="career" element={<div>Career Pathways</div>} />
      <Route path="career/courses" element={<div>Career Courses</div>} />
      <Route path="career/qualifications" element={<div>Career Qualifications</div>} />
      <Route path="career/advancement" element={<div>Career Advancement</div>} />
      <Route path="providers" element={<div>Training Providers</div>} />
      <Route path="evidence" element={<div>Training Evidence</div>} />
      <Route path="time-tracking" element={<div>Time Tracking</div>} />
      <Route path="off-job-training" element={<div>Off-Job Training</div>} />
      <Route path="toolbox" element={<div>Toolbox Talk</div>} />
      <Route path="on-job-tools" element={<div>On the Job Tools</div>} />
    </Routes>
  );
};

export default ApprenticeRoutes;
