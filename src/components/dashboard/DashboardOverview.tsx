
import { BookOpen, Clock, Trophy, Users } from "lucide-react";
import OverviewCard from "@/components/dashboard/OverviewCard";
import { useLeaderboardData } from "@/hooks/leaderboards/useLeaderboardData";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface DashboardOverviewProps {
  user: {
    name: string;
    role: string;
    completedLessons: number;
    totalLessons: number;
  };
}

const DashboardOverview = ({ user }: DashboardOverviewProps) => {
  const { communityStats, currentUserRank } = useLeaderboardData();
  const { user: authUser } = useAuth();
  const [completedLessons, setCompletedLessons] = useState(user.completedLessons);
  const [activeUsers, setActiveUsers] = useState(0);

  // Fetch completed lessons count
  useEffect(() => {
    const fetchCompletedLessons = async () => {
      if (!authUser?.id) return;
      
      const { data, error, count } = await supabase
        .from("completed_resources")
        .select("*", { count: 'exact' })
        .eq("user_id", authUser.id)
        .eq("is_completed", true);
      
      if (error) {
        console.error("Error fetching completed lessons:", error);
        return;
      }
      
      if (count !== null) {
        setCompletedLessons(count);
      }
    };

    fetchCompletedLessons();
  }, [authUser]);

  // Set active users count
  useEffect(() => {
    if (communityStats?.active_users) {
      setActiveUsers(communityStats.active_users);
    }
  }, [communityStats]);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <OverviewCard 
        title="Your Progress" 
        value={`${completedLessons}/${user.totalLessons}`}
        description="Lessons completed"
        icon={<BookOpen className="h-4 w-4" />}
      />
      <OverviewCard 
        title="Active Streak" 
        value={`${currentUserRank?.streak || 0} days`}
        description={currentUserRank?.streak ? "Keep going!" : "Start learning to build your streak"}
        icon={<Clock className="h-4 w-4" />}
      />
      <OverviewCard 
        title="Leaderboard Rank" 
        value={currentUserRank ? "#" + (currentUserRank?.points > 0 ? "1-10" : "--") : "--"}
        description="Complete lessons to rank up"
        icon={<Trophy className="h-4 w-4" />}
      />
      <OverviewCard 
        title="Community" 
        value={activeUsers.toString()}
        description="Active users this month"
        icon={<Users className="h-4 w-4" />}
      />
    </div>
  );
};

export default DashboardOverview;
