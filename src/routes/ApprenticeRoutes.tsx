
import { Route, Routes } from "react-router-dom";
import Apprentice from "@/pages/apprentice/Apprentice";
import StudyPortal from "@/pages/apprentice/StudyPortal";
import MockExams from "@/pages/apprentice/MockExams";
import CourseUnit from "@/pages/apprentice/CourseUnit";
import StandardPage from "@/pages/apprentice/StandardPage";
import SectionPage from "@/pages/apprentice/SectionPage";
import SubsectionPage from "@/components/apprentice/SubsectionPage";
import CourseQuiz from "@/pages/apprentice/CourseQuiz";
import CourseDetail from "@/pages/apprentice/CourseDetail";
import ElectricalSymbols from "@/pages/apprentice/ElectricalSymbols";
import StudyTools from "@/pages/apprentice/StudyTools";
import ElectricalTheory from "@/pages/apprentice/ElectricalTheory";
import ApprenticeChat from "@/pages/apprentice/ApprenticeChat";
import ApprenticeMentalHealth from "@/pages/apprentice/ApprenticeMentalHealth";
import ApprenticeMentor from "@/pages/apprentice/ApprenticeMentor";
import ApprenticeCalculators from "@/pages/apprentice/ApprenticeCalculators";
import Certificate from "@/pages/apprentice/Certificate";
import CareerPathwaysPage from "@/pages/apprentice/CareerPathwaysPage";
import CareerCoursesPage from "@/pages/apprentice/CareerCoursesPage";
import CareerQualificationsPage from "@/pages/apprentice/CareerQualificationsPage";
import CareerAdvancementPage from "@/pages/apprentice/CareerAdvancementPage";
import TrainingProviders from "@/pages/apprentice/TrainingProviders";
import TrainingEvidence from "@/pages/apprentice/TrainingEvidence";
import TimeTracking from "@/pages/apprentice/TimeTracking";
import OffJobTraining from "@/pages/apprentice/OffJobTraining";
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

const ApprenticeRoutes = () => {
  return (
    <Routes>
      <Route index element={<Apprentice />} />
      <Route path="study" element={<StudyPortal />} />
      <Route path="study/mock-exams" element={<MockExams />} />
      <Route path="study/mock-exams/:examId" element={<StandardPage />} />
      <Route path="study/electrical-symbols" element={<ElectricalSymbols />} />
      <Route path="study/tools" element={<StudyTools />} />
      <Route path="study/electrical-theory" element={<ElectricalTheory />} />
      <Route path="study/inspection-testing" element={<InspectionTesting />} />
      <Route path="study/inspection-testing/safe-isolation" element={<SafeIsolation />} />
      <Route path="study/inspection-testing/methodology" element={<InspectionMethodology />} />
      <Route path="study/inspection-testing/principles" element={<TestingPrinciples />} />
      <Route path="study/inspection-testing/regulations" element={<RegulatoryFramework />} />
      <Route path="study/inspection-testing/result-analysis" element={<TestResultAnalysis />} />
      <Route path="study/testing-procedures" element={<TestingProcedures />} />
      
      <Route path="study/eal/:courseSlug" element={<CourseDetail />} />
      <Route path="study/eal/:courseSlug/unit/:unitSlug" element={<CourseUnit />} />
      <Route path="study/eal/:courseSlug/unit/:unitSlug/section/:sectionId" element={<SectionPage />} />
      <Route path="study/eal/:courseSlug/unit/:unitSlug/section/:sectionId/subsection/:subsectionId" element={<SubsectionPage />} />
      <Route path="study/eal/:courseSlug/unit/:unitSlug/quiz" element={<CourseQuiz />} />
      
      <Route path="study/resources/inspection-documentation" element={<InspectionDocumentation />} />
      <Route path="study/resources/inspection-areas" element={<InspectionAreas />} />
      <Route path="study/resources/inspection-types" element={<InspectionTypes />} />
      <Route path="study/resources/inspection-regulations" element={<InspectionRegulations />} />
      
      <Route path="chat" element={<ApprenticeChat />} />
      <Route path="mental-health" element={<ApprenticeMentalHealth />} />
      <Route path="mentor" element={<ApprenticeMentor />} />
      <Route path="calculators" element={<ApprenticeCalculators />} />
      <Route path="certificate" element={<Certificate />} />
      <Route path="career" element={<CareerPathwaysPage />} />
      <Route path="career/courses" element={<CareerCoursesPage />} />
      <Route path="career/qualifications" element={<CareerQualificationsPage />} />
      <Route path="career/advancement" element={<CareerAdvancementPage />} />
      <Route path="providers" element={<TrainingProviders />} />
      <Route path="evidence" element={<TrainingEvidence />} />
      <Route path="time-tracking" element={<TimeTracking />} />
      <Route path="off-job-training" element={<OffJobTraining />} />
    </Routes>
  );
};

export default ApprenticeRoutes;
