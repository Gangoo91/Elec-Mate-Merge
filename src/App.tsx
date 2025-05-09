
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import Layout from "@/components/layout/Layout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import SignIn from "@/pages/auth/SignIn";
import SignUp from "@/pages/auth/SignUp";
import Dashboard from "@/pages/Dashboard";
import Profile from "@/pages/Profile";
import Settings from "@/pages/Settings";
import Leaderboards from "@/pages/Leaderboards";
import Subscriptions from "@/pages/Subscriptions";
import VideoLessons from "@/pages/VideoLessons";
import Messenger from "@/pages/Messenger";
import NotFound from "@/pages/NotFound";
import PaymentSuccess from "@/pages/PaymentSuccess";

// Admin
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminUsers from "@/pages/admin/Users";
import AdminSettings from "@/pages/admin/Settings";
import AdminLayout from "@/components/admin/AdminLayout";

// Electrician
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

// Electrician Tools
import ElectricianTools from "@/pages/electrician-tools/Calculations";
import ProjectManagement from "@/pages/electrician-tools/ProjectManagement";
import AITooling from "@/pages/electrician-tools/AITooling";
import Admin from "@/pages/electrician-tools/Admin";
import Calculations from "@/pages/electrician-tools/Calculations";

// Apprentice
import ApprenticeHub from "@/pages/ApprenticeHub";
import ApprenticeStudy from "@/pages/apprentice/ApprenticeStudy";
import EALCourses from "@/pages/apprentice/EALCourses";
import EALLevel3Courses from "@/pages/apprentice/EALLevel3Courses";
import CityGuildsCourses from "@/pages/apprentice/CityGuildsCourses";
import CourseDetail from "@/pages/apprentice/CourseDetail";
import ApprenticeChat from "@/pages/apprentice/ApprenticeChat";
import ApprenticeOJT from "@/pages/apprentice/ApprenticeOJT";
import ApprenticeMentalHealth from "@/pages/apprentice/ApprenticeMentalHealth";
import ApprenticeMentor from "@/pages/apprentice/ApprenticeMentor";
import ApprenticeToolbox from "@/pages/apprentice/ApprenticeToolbox";
import ToolsGuide from "@/pages/apprentice/ToolsGuide";
import ApprenticeAITools from "@/pages/apprentice/ApprenticeAITools";
import CareerProgression from "@/pages/apprentice/CareerProgression";
import OnJobTools from "@/pages/apprentice/OnJobTools";
import OnJobCalculations from "@/pages/apprentice/OnJobCalculations";
import OnJobDocuments from "@/pages/apprentice/OnJobDocuments";
import OnJobAssessment from "@/pages/apprentice/OnJobAssessment";

// Mental Health
import CrisisResources from "@/pages/apprentice/mental-health/CrisisResources";
import StressManagement from "@/pages/apprentice/mental-health/StressManagement";
import SupportNetwork from "@/pages/apprentice/mental-health/SupportNetwork";
import WorkLifeBalance from "@/pages/apprentice/mental-health/WorkLifeBalance";

// Section and Subsection
import SectionContent from "@/pages/apprentice/SectionContent";
import SubsectionContent from "@/pages/apprentice/SubsectionContent";
import CraftSkillsContent from "@/pages/apprentice/CraftSkillsContent";
import CraftSkillsSubsection from "@/pages/apprentice/CraftSkillsSubsection";
import InstallationMethodContent from "@/pages/apprentice/InstallationMethodContent";
