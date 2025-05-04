
import { Card, CardContent } from "@/components/ui/card";
import { Users, Star } from "lucide-react";
import { CommunityStats as CommunityStatsType } from "@/hooks/leaderboards/useLeaderboardData";
import { useAuth } from "@/contexts/AuthContext";

interface CommunityStatsProps {
  communityStats: CommunityStatsType | null;
}

export const CommunityStats = ({ communityStats }: CommunityStatsProps) => {
  const { isSubscribed } = useAuth();
  
  // Calculate active subscribers count - ensure it's at least 1 if user is subscribed
  const activeSubscribersCount = isSubscribed 
    ? Math.max((communityStats?.active_users || 0), 1)
    : (communityStats?.active_users || 0);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="pt-6 text-center">
          <Users className="h-8 w-8 text-elec-yellow mx-auto mb-3" />
          <div className="text-3xl font-bold">{activeSubscribersCount}</div>
          <p className="text-sm text-muted-foreground">Active Subscribers</p>
        </CardContent>
      </Card>
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="pt-6 text-center">
          <VideoIcon className="h-8 w-8 text-elec-yellow mx-auto mb-3" />
          <div className="text-3xl font-bold">{communityStats?.lessons_completed_today || 0}</div>
          <p className="text-sm text-muted-foreground">Lessons Completed Today</p>
        </CardContent>
      </Card>
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="pt-6 text-center">
          <Star className="h-8 w-8 text-elec-yellow mx-auto mb-3" />
          <div className="text-3xl font-bold">{communityStats?.longest_streak || 0} Days</div>
          <p className="text-sm text-muted-foreground">Longest Active Streak</p>
        </CardContent>
      </Card>
    </div>
  );
};

// Custom Icon components
const VideoIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="18" height="14" x="3" y="4" rx="2" />
    <polygon points="12,8 12,14 17,11" />
  </svg>
);
