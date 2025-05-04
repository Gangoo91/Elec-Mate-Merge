
import { Users, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { CommunityStats } from "@/hooks/leaderboards/useLeaderboardData";
import { Video } from "./VideoIcon";

interface CommunityStatsCardsProps {
  communityStats: CommunityStats | null;
  isMobile: boolean;
}

export const CommunityStatsCards = ({ communityStats, isMobile }: CommunityStatsCardsProps) => {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="pt-6 text-center">
          <Users className="h-8 w-8 text-elec-yellow mx-auto mb-3" />
          <div className="text-3xl font-bold">{communityStats?.active_users || 0}</div>
          <p className="text-sm text-muted-foreground">Active Community Members</p>
        </CardContent>
      </Card>
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="pt-6 text-center">
          <Video className="h-8 w-8 text-elec-yellow mx-auto mb-3" />
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
