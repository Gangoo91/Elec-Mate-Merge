
import { useEffect, useState } from "react";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import TrialBanner from "@/components/dashboard/TrialBanner";
import CourseTabs from "@/components/dashboard/CourseTabs";
import DashboardQuickAccess from "@/components/dashboard/DashboardQuickAccess";
import { getDashboardData } from "@/data/dashboardData";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Clock } from "lucide-react";

const Dashboard = () => {
  // Get dashboard data from our data model
  const { user: userData, recentCourses, popularCourses } = getDashboardData();
  const { user, profile } = useAuth();
  const [greeting, setGreeting] = useState("Good day");
  
  // Set appropriate greeting based on time of day
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  const userName = profile?.full_name || profile?.username || userData.name;

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-elec-gray border border-elec-yellow/20 rounded-lg p-6 flex flex-col md:flex-row gap-6 items-center">
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">{greeting}, {userName}</h1>
          <p className="text-muted-foreground mt-2">
            Welcome to ElecMate, your electrical career companion. Here's your progress at a glance.
          </p>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-elec-yellow" />
              <span className="text-sm">Last active: Today</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-elec-yellow" />
              <span className="text-sm">{userData.completedLessons} of {userData.totalLessons} lessons completed</span>
            </div>
          </div>
        </div>
        <div className="w-32 h-32 md:w-48 md:h-48 flex-shrink-0 flex items-center justify-center">
          <img 
            src="/placeholder.svg" 
            alt="Dashboard illustration" 
            className="w-full h-full object-contain opacity-70" 
          />
        </div>
      </div>

      {/* Overview Cards */}
      <DashboardOverview user={userData} />

      {/* Quick Access Section - positioned prominently */}
      <DashboardQuickAccess />

      {/* Trial Status */}
      <TrialBanner />

      {/* Course Tabs */}
      <CourseTabs recentCourses={recentCourses} popularCourses={popularCourses} />
    </div>
  );
};

export default Dashboard;
