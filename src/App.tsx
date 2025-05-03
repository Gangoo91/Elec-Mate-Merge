
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

// Course category placeholder components
const CourseCategory = ({ category }: { category: string }) => (
  <div className="space-y-8 animate-fade-in">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{category} Courses</h1>
        <p className="text-muted-foreground">
          Access {category.toLowerCase()} courses and learning materials
        </p>
      </div>
      <a href="/apprentice/study">
        <button className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-10 px-4 py-2">
          Back to Study Centre
        </button>
      </a>
    </div>
    <div className="p-8 text-center text-muted-foreground">
      <p>Course content for {category} will be available soon.</p>
    </div>
  </div>
);

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
              <Route path="/apprentice/study/eal" element={<CourseCategory category="EAL" />} />
              <Route path="/apprentice/study/cityGuilds" element={<CourseCategory category="City & Guilds" />} />
              <Route path="/apprentice/study/higher" element={<CourseCategory category="Higher Learning" />} />
              <Route path="/apprentice/study/further" element={<CourseCategory category="Further Learning" />} />
              <Route path="/apprentice/study/onJob" element={<CourseCategory category="On the Job" />} />
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
