
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import TrialBanner from "@/components/dashboard/TrialBanner";
import CourseTabs from "@/components/dashboard/CourseTabs";
import DashboardQuickAccess from "@/components/dashboard/DashboardQuickAccess";
import { getDashboardData } from "@/data/dashboardData";

const Dashboard = () => {
  // Get dashboard data from our data model
  const { user, recentCourses, popularCourses } = getDashboardData();

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to ElecMate, your electrical career companion.
        </p>
      </div>

      {/* Quick Access Sections - Moved up for better mobile access */}
      <DashboardQuickAccess />

      {/* Overview Cards */}
      <DashboardOverview user={user} />

      {/* Trial Status */}
      <TrialBanner />

      {/* Course Tabs */}
      <CourseTabs recentCourses={recentCourses} popularCourses={popularCourses} />
    </div>
  );
};

export default Dashboard;
