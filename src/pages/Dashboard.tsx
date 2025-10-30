
import { useEffect, useState } from "react";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import TrialBanner from "@/components/dashboard/TrialBanner";
import CourseTabs from "@/components/dashboard/CourseTabs";
import DashboardQuickAccess from "@/components/dashboard/DashboardQuickAccess";
import { QuoteDashboardCard } from "@/components/dashboard/QuoteDashboardCard";
import { QuotesHistorySection } from "@/components/dashboard/QuotesHistorySection";
import { getDashboardData } from "@/data/dashboardData";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { BookOpen, Clock } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useQuoteStorage } from "@/hooks/useQuoteStorage";
import { useInvoiceStorage } from "@/hooks/useInvoiceStorage";
import { InvoicesDashboardCard } from "@/components/dashboard/InvoicesDashboardCard";

const Dashboard = () => {
  // Get dashboard data from our data model
  const { user: userData, recentCourses, popularCourses } = getDashboardData();
  const { profile } = useAuth();
  const { savedQuotes } = useQuoteStorage();
  const { invoices } = useInvoiceStorage();
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
    <div className="space-y-4 sm:space-y-5 md:space-y-6 animate-fade-in">
      <Card className="bg-elec-gray border border-elec-yellow/10 md:border-elec-yellow/20 rounded-lg p-2.5 sm:p-3.5 md:p-5">
        <div className="flex flex-col md:flex-row gap-3 md:gap-5 items-start md:items-center">
          <div className="flex-1 w-full">
            <h1 className="text-base sm:text-lg md:text-xl font-bold tracking-tight leading-tight text-left">
              {greeting}, {userName}
            </h1>
            <p className="text-muted-foreground mt-1.5 text-sm md:text-base text-left md:text-left">
              Welcome to ElecMate, your electrical career companion.
            </p>
            
            <div className="hidden md:flex items-center gap-2 min-w-0 mt-2.5">
              <Clock className="h-4 w-4 text-elec-yellow flex-shrink-0" />
              <span className="text-xs md:text-sm">Last active: Today</span>
            </div>
          </div>
          
          {!isMobile && (
            <div className="w-20 h-20 md:w-32 md:h-32 lg:w-48 lg:h-48 flex-shrink-0 flex items-center justify-center">
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

      {/* Active Quotes */}
      <QuoteDashboardCard quotes={savedQuotes} />

      {/* Completed Invoices */}
      <InvoicesDashboardCard invoices={invoices} />

      {/* Quotes History */}
      <QuotesHistorySection quotes={savedQuotes} />

      {/* Course Tabs */}
      <CourseTabs recentCourses={recentCourses} popularCourses={popularCourses} />
    </div>
  );
};

export default Dashboard;
