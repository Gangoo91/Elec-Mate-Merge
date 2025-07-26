
import { BookOpen, Clock, Trophy, Users } from "lucide-react";
import OverviewCard from "@/components/dashboard/OverviewCard";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const [activeUsers, setActiveUsers] = useState(0);
  const isMobile = useIsMobile();

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

  // Set active users count (mock data for now)
  useEffect(() => {
    setActiveUsers(127); // Static value since leaderboards removed
  }, []);

  return (
    <div className="grid gap-2 sm:gap-3 md:gap-4 grid-cols-2 lg:grid-cols-4">
      <OverviewCard 
        title="Your Progress" 
        value={`${completedLessons}/${user.totalLessons}`}
        description="Lessons completed"
        icon={<BookOpen className="h-4 w-4" />}
        isMobile={isMobile}
      />
      <OverviewCard 
        title="Time Spent" 
        value="2.5 hrs"
        description="This week"
        icon={<Clock className="h-4 w-4" />}
        isMobile={isMobile}
      />
      <OverviewCard 
        title="Learning Goal" 
        value="4/7 days"
        description="Weekly target"
        icon={<Trophy className="h-4 w-4" />}
        isMobile={isMobile}
      />
      <OverviewCard 
        title="Community" 
        value={activeUsers.toString()}
        description="Active users this month"
        icon={<Users className="h-4 w-4" />}
        isMobile={isMobile}
      />
    </div>
  );
};

export default DashboardOverview;
