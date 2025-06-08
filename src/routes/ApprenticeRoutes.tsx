
import { Route, Routes } from "react-router-dom";
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

const ApprenticeRoutes = () => (
  <Routes>
    <Route index element={<ApprenticeHub />} />
    <Route path="study" element={<ApprenticeStudy />} />
    <Route path="ojt" element={<ApprenticeOJT />} />
    <Route path="mental-health" element={<ApprenticeMentalHealth />} />
    <Route path="mental-health/work-life-balance" element={<WorkLifeBalance />} />
    <Route path="mental-health/resources" element={<MentalHealthResources />} />
    <Route path="mentor" element={<ApprenticeMentor />} />
    <Route path="toolbox" element={<ApprenticeToolbox />} />
    <Route path="on-job-tools" element={<ApprenticeOnJobTools />} />
    <Route path="professional-development" element={<ApprenticeProfessionalDevelopment />} />
    <Route path="rights-and-pay" element={<RightsAndPay />} />
  </Routes>
);

export default ApprenticeRoutes;
