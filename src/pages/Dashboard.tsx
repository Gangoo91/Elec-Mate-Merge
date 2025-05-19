
import { useEffect, useState } from "react";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import TrialBanner from "@/components/dashboard/TrialBanner";
import CourseTabs from "@/components/dashboard/CourseTabs";
import DashboardQuickAccess from "@/components/dashboard/DashboardQuickAccess";
import { getDashboardData } from "@/data/dashboardData";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { BookOpen, Clock } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Dashboard = () => {
  // Get dashboard data from our data model
  const { user: userData, recentCourses, popularCourses } = getDashboardData();
  const { profile } = useAuth();
  const [greeting, setGreeting] = useState("Good day");
  const isMobile = useIsMobile();
  
  // Set appropriate greeting based on time of day
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  const userName = profile?.full_name || profile?.username || userData.name;

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="bg-elec-gray border border-elec-yellow/20 rounded-lg p-4 md:p-6">
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center">
          <div className="flex-1 w-full">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{greeting}, {userName}</h1>
            <p className="text-muted-foreground mt-2 text-sm md:text-base">
              Welcome to ElecMate, your electrical career companion.
            </p>
            
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-elec-yellow flex-shrink-0" />
                <span className="text-xs md:text-sm truncate">Last active: Today</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-elec-yellow flex-shrink-0" />
                <span className="text-xs md:text-sm truncate">{userData.completedLessons} of {userData.totalLessons} lessons</span>
              </div>
            </div>
          </div>
          
          {!isMobile && (
            <div className="w-24 h-24 md:w-32 md:h-32 lg:w-48 lg:h-48 flex-shrink-0 flex items-center justify-center">
              <img 
                src="/placeholder.svg" 
                alt="Dashboard illustration" 
                className="w-full h-full object-contain opacity-70" 
              />
            </div>
          )}
        </div>
      </Card>

      {/* Quick Access Section */}
      <DashboardQuickAccess />

      {/* Overview Cards */}
      <DashboardOverview user={userData} />

      {/* Trial Status */}
      <TrialBanner />

      {/* Course Tabs */}
      <CourseTabs recentCourses={recentCourses} popularCourses={popularCourses} />
    </div>
  );
};

export default Dashboard;
