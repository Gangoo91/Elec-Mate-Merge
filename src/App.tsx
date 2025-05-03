
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
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
import EALCourses from "./pages/apprentice/EALCourses";

// Course category placeholder components
const CourseCategory = ({ category }: { category: string }) => (
  <div className="space-y-8 animate-fade-in px-2 md:px-0">
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{category} Courses</h1>
        <p className="text-muted-foreground">
          Access {category.toLowerCase()} courses and learning materials
        </p>
      </div>
      <Link to="/apprentice/study" className="flex-shrink-0">
        <Button variant="outline">
          Back to Study Centre
        </Button>
      </Link>
    </div>
    <div className="p-8 text-center text-muted-foreground bg-elec-gray rounded-lg border border-elec-yellow/20">
      <p>Course content for {category} will be available soon.</p>
    </div>
  </div>
);

// Course detail placeholder component
const CourseDetail = () => {
  const courseName = window.location.pathname.split('/').pop()?.split('-').map(
    word => word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
  
  return (
    <div className="space-y-8 animate-fade-in px-4 md:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">
            <span className="gradient-text">{courseName}</span>
          </h1>
          <p className="text-muted-foreground">
            Course materials and learning resources
          </p>
        </div>
        <Link to="/apprentice/study/eal" className="flex-shrink-0 w-full sm:w-auto">
          <Button 
            variant="outline" 
            className="border-elec-yellow/30 hover:bg-elec-yellow/10 w-full sm:w-auto"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to EAL Courses
          </Button>
        </Link>
      </div>
      
      <div className="p-8 text-center text-muted-foreground bg-elec-gray rounded-lg border border-elec-yellow/20">
        <p>Course content for {courseName} will be available soon.</p>
      </div>
    </div>
  );
};

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
              <Route path="/apprentice/study/eal" element={<EALCourses />} />
              <Route path="/apprentice/study/eal/:courseSlug" element={<CourseDetail />} />
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
