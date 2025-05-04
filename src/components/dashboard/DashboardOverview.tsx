
import { BookOpen, Clock, Trophy, Users } from "lucide-react";
import OverviewCard from "@/components/dashboard/OverviewCard";
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
  const { user: authUser } = useAuth();
  const [completedLessons, setCompletedLessons] = useState(user.completedLessons);

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
        value="0"
        description="Active users this month"
        icon={<Users className="h-4 w-4" />}
      />
    </div>
  );
};

export default DashboardOverview;
