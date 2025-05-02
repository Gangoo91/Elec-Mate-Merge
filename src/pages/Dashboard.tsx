
import { BookOpen, Clock, Trophy, Users } from "lucide-react";
import OverviewCard from "@/components/dashboard/OverviewCard";
import TrialBanner from "@/components/dashboard/TrialBanner";
import CourseTabs from "@/components/dashboard/CourseTabs";
import QuickAccessCard from "@/components/dashboard/QuickAccessCard";

const Dashboard = () => {
  // Mock user data - would come from auth context
  const user = {
    name: "Guest User",
    role: "visitor",
    completedLessons: 0,
    totalLessons: 48,
  };

  // Mock data for recent courses
  const recentCourses = [
    {
      id: 1,
      title: "Electrical Installation Fundamentals",
      progress: 0,
      category: "Core Units",
      image: "/placeholder.svg",
    },
    {
      id: 2,
      title: "Circuit Design & Analysis",
      progress: 0,
      category: "Theory",
      image: "/placeholder.svg",
    },
    {
      id: 3,
      title: "Safe Working Practices",
      progress: 0,
      category: "Health & Safety",
      image: "/placeholder.svg",
    },
  ];
  
  // Mock data for popular courses
  const popularCourses = [
    {
      id: 4,
      title: "Wiring Regulations BS 7671",
      students: 1245,
      category: "Regulations",
      image: "/placeholder.svg",
    },
    {
      id: 5,
      title: "Fault Finding Techniques",
      students: 987,
      category: "Practical Skills",
      image: "/placeholder.svg",
    },
    {
      id: 6,
      title: "Inspection & Testing",
      students: 762,
      category: "Certification",
      image: "/placeholder.svg",
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to ElecMate, your electrical career companion.
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <OverviewCard 
          title="Your Progress" 
          value={`${user.completedLessons}/${user.totalLessons}`}
          description="Lessons completed"
          icon={<BookOpen className="h-4 w-4" />}
        />
        <OverviewCard 
          title="Active Streak" 
          value="0 days"
          description="Start learning to build your streak"
          icon={<Clock className="h-4 w-4" />}
        />
        <OverviewCard 
          title="Leaderboard Rank" 
          value="--"
          description="Complete lessons to rank up"
          icon={<Trophy className="h-4 w-4" />}
        />
        <OverviewCard 
          title="Community" 
          value="1,452"
          description="Active users this month"
          icon={<Users className="h-4 w-4" />}
        />
      </div>

      {/* Trial Status */}
      <TrialBanner />

      {/* Course Tabs */}
      <CourseTabs recentCourses={recentCourses} popularCourses={popularCourses} />

      {/* Quick Access Sections */}
      <div className="grid gap-4 md:grid-cols-2">
        <QuickAccessCard
          title="Apprentice Hub"
          description="Access structured learning paths and study materials designed for electrical apprentices."
          linkText="Explore Hub"
          linkTo="/apprentice"
        />
        <QuickAccessCard
          title="Electrician Tools"
          description="Boost your efficiency with professional calculators, templates, and project tools."
          linkText="View Tools"
          linkTo="/electrician"
        />
      </div>
    </div>
  );
};

export default Dashboard;
