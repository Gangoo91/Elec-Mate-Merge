
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import Layout from "./components/layout/Layout";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import ApprenticeHub from "./pages/ApprenticeHub";
import ElectricianTools from "./pages/ElectricianTools";
import VideoLessons from "./pages/VideoLessons";
import Leaderboards from "./pages/Leaderboards";
import Subscriptions from "./pages/Subscriptions";
import NotFound from "./pages/NotFound";
import ApprenticeStudy from "./pages/apprentice/ApprenticeStudy";
import ApprenticeOJT from "./pages/apprentice/ApprenticeOJT";
import ApprenticeMentalHealth from "./pages/apprentice/ApprenticeMentalHealth";
import ApprenticeMentor from "./pages/apprentice/ApprenticeMentor";
import ApprenticeToolbox from "./pages/apprentice/ApprenticeToolbox";
import ApprenticeAITools from "./pages/apprentice/ApprenticeAITools";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" forcedTheme="dark">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/apprentice" element={<ApprenticeHub />} />
              <Route path="/apprentice/study" element={<ApprenticeStudy />} />
              <Route path="/apprentice/ojt" element={<ApprenticeOJT />} />
              <Route path="/apprentice/mental-health" element={<ApprenticeMentalHealth />} />
              <Route path="/apprentice/mentor" element={<ApprenticeMentor />} />
              <Route path="/apprentice/toolbox" element={<ApprenticeToolbox />} />
              <Route path="/apprentice/ai-tools" element={<ApprenticeAITools />} />
              <Route path="/electrician" element={<ElectricianTools />} />
              <Route path="/videos" element={<VideoLessons />} />
              <Route path="/leaderboards" element={<Leaderboards />} />
              <Route path="/subscriptions" element={<Subscriptions />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
