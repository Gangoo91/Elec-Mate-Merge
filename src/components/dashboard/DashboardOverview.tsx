
import { BookOpen, Clock, Trophy, Users } from "lucide-react";
import OverviewCard from "@/components/dashboard/OverviewCard";

interface DashboardOverviewProps {
  user: {
    name: string;
    role: string;
    completedLessons: number;
    totalLessons: number;
  };
}

const DashboardOverview = ({ user }: DashboardOverviewProps) => {
  return (
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
  );
};

export default DashboardOverview;
